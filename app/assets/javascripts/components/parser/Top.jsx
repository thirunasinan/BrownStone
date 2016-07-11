App.components.parser.Top = React.createClass({

  propTypes: {
  },

  getInitialState: function () {

    this.modules = {
      problemsParser: App.modules.problemsParser,
      predictDelimiters: App.modules.predictDelimiters
    }

    this.components = {
      AssociatedData: App.components.parser.input.AssociatedData,
      ParsedDisplay: App.components.parser.parsedDisplay.Problems
    }

    return {
      alerts: [],
      rawInputValue: null,
      parsedProblems: [],
      sourceOptions: [],
      sectionOptions: [],
      selectedSourceId: null,
      selectedSectionId: null
    }
  },

  rawInputChange: function (e) {
    var text = this.refs.rawInput.getDOMNode().value
    this.predictDelimitersAndParse(text)
  },

  predictDelimitersAndParse: function (text) {
    var processed = this.modules.predictDelimiters(text);
    this.setState({rawInputValue: processed})
    this.parseProblems(processed)
  },

  parseProblems: function (text) {
    var parsed = this.modules.problemsParser(text);
    var extant = this.state.parsedProblems;
    var finalP = parsed.map(function (ele) {
      var match = extant.find(function (x) { return x.number === ele.number })
      if (match) {
        var y = Object.assign({}, ele, {hasImages: match.hasImages, hasTexts: match.hasTexts})
        return y;
      } else {
        return ele;
      }
    })
    this.setState({parsedProblems: finalP}, _latexInit)
  },

  selectSource: function (e) {
    var value = this.refs.associatedData.selectedSource()
    this.setState({selectedSourceId: value})
    this.loadSections(value)
  },

  selectSection: function (e) {
    var value = this.refs.associatedData.selectedSection()
    this.setState({selectedSectionId: value})
  },

  componentDidMount: function () {
    var that = this;
    $.get('sources_for_select', function (data) {
      var sources = [{id: null, name: 'None'}].concat(data)
      that.setState({sourceOptions: sources})
    })
  },

  loadSections: function (sourceId) {
    var that = this;
    $.get('sections_by_source/' + sourceId, function (data) {
      var sections = [{id: null, name: 'None'}].concat(data)
      that.setState({sectionOptions: sections})
    })
  },

  failMessage: function (errors) {
    return Object.keys(errors).reduce(function (acc, key) {
      var value = errors[key]
      var commaOrNot = (acc === "") ? null : ","
      return [acc, commaOrNot, key, value].join(" ")
    }, "")
  },

  combineMessages: function (messages) {
    return messages.reduce(function (acc, msg) {
      var newlineOrNot = (acc === '') ? "" : "\n"
      return [acc, newlineOrNot, msg].join("")
    }, "")
  },

  clearSavedFromInput: function (numbers) {
    var keep = this.state.parsedProblems.filter(function (p) {
      return !numbers.includes(p.number)
    })

    var unParse = keep.reduce(function (acc, p) {
      var answerChoices = p.answerChoices.reduce(function (acc2, ac) {
        return [acc2, "\n", ac].join("")
      }, "")
      var separator = (acc === "") ? null : "\n\n##\n\n"
      return [acc, separator, p.number, ". ", p.question, answerChoices].join("")
    }, "")

    this.setState({rawInputValue: unParse, parsedProblems: keep})
  },

  saveSuccess: function (data) {
    var saveAttempts = data.saved;
    var saved = saveAttempts.filter(function (ele) { return ele.success === true})
    var failed = saveAttempts.filter(function (ele) { return ele.success === false})
    var that = this;

    var savedMessages = saved.map(function (ele, i) {
      return ["saved problem", ele.number, " successfully"].join(" ")
    }).concat(["these problems have been cleared from the input box"])

    var failedMessages = failed.map(function (ele, i) {
      return ["errors saving problem", ele.number, ":", that.failMessage(ele.errors)].join(" ")
    }).concat(["these problems have been left in the input box"])

    var savedMessage = this.combineMessages(savedMessages)
    var failedMessage = this.combineMessages(failedMessages)

    var savedAlerts = saved.length
    ? [{id: 1, type: 'success', messages: savedMessages}]
    : []

    var failedAlerts = failed.length
    ? [{id: 2, type: 'danger', messages: failedMessages}]
    : []
    this.setState({alerts: savedAlerts.concat(failedAlerts)})
    this.clearSavedFromInput(saved.map(function (s) { return s.number}))
  },

  saveError: function (jqXHR, textStatus, errorThrown) {
    var message = ["Save Error:", textStatus, errorThrown].join(' ')
    this.addAlert({type: 'danger', message: message})
  },

  clickSave: function (e) {

    var _process = function (ps) {
      return ps.map(function (p) {
        var p2 = Object.assign({}, p)
        p2.answerChoices = p.answerChoices.map(function (ac, i) {
          return {name: ac, order: i + 1}
        })
        return p2;
      })
    }

    var that = this;
    var data = {
      problems: _process(this.state.parsedProblems),
      sourceId: this.state.selectedSourceId,
      sectionId: this.state.selectedSectionId
    }
    $.ajax({
      type: "POST",
      url: 'problems',
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json',
      success: this.saveSuccess,
      error: this.saveError
    })
  },

  clearRawInput: function () {
    this.setState({rawInputValue: ''})
    this.parseProblems("")
  },

  alertClassName: function (type) {
    return 'alert alert-dismissible alert-' + type
  },

  addAlert: function (alert) {
    var alerts = this.state.alerts.concat([alert])
    this.setState({alerts: alerts})
  },

  removeAlert: function (id) {
    var alerts = this.state.alerts.filter(function (alert) { return alert.id !== id })
    this.setState({alerts: alerts})
  },

  clickCloseAlertFn: function (id) {
    var that = this;
    return function (e) {
      that.removeAlert(id)
    }
  },
  alertMessage: function (messages) {
    return messages.map(function (msg, i) {
      return <div className='alert-line'>{msg}</div>
    })
  },

  toggleProblemProperty: function (number, property) {
    var problems = this.state.parsedProblems.map(function (p) {
      if (p.number === number) {
        var p2 = Object.assign({}, p)
        p2[property] = !p[property]
        return p2;
      } else {
        return p;
      }
    })
    this.setState({parsedProblems: problems})
  },

  clickInvalidSave: function (e) {
    this.addAlert({type: 'danger', messages: ["Select a Source before Saving"], id: this.state.alerts.length + 1})
  },

  render: function() {
    var that = this;
    var actions = ['clearRawInput', 'clickInvalidSave', 'rawInputChange', 'clickSave', 'selectSource', 'toggleProblemProperty'].reduce(function (acc, name) {
      acc[name] = that[name]
      return acc;
    }, {})

    var alerts = this.state.alerts.map(function (alert, index) {
      return (
        <div className='row'>
          <div className='col-xs-12'>
            <div className={that.alertClassName(alert.type)} role='alert'>
              <button type="button" className="close" onClick={that.clickCloseAlertFn(alert.id)} aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <div className="preserve-newlines">{that.alertMessage(alert.messages)}</div>
            </div>
          </div>
        </div>
      )
    })

    var cheatData = [
      "x_i",
      "x^2",
      "\\frac{1}{2}",
      "\\sqrt[3]{4}"
    ]

    var rows = cheatData.map(function (ele) {
      var text = "\\(" + ele + "\\)"
      return (<tr>
        <td>{text}</td>
        <td className='mathjax-ignore'>{text}</td>
      </tr>);
    })

    var cheatsheet = (
      <div className='mathjax-cheatsheet'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            {"Separating Problems"}
          </div>
          <div className='panel-body'>
            <div>{"Separate problems with '##'"}</div>
            <div>{"System will automatically insert the ##'s based on your first paste action, but you can edit their placement after that."}</div>
          </div>
        </div>
        <div className='panel panel-default'>
        <div className='panel-heading'>
          MathJax Cheatsheet <a target="_blank" className='pull-right' href="http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference"
          >full cheatsheet</a>

        </div>
          <table className='table'>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    )

    return (
      <div>
        <div className='row'>
          <div className='col-xs-1' />
          <div className='col-xs-10'>{alerts}</div>
          <div className='col-xs-1' />
        </div>
        <div className='row'>
          <div className='col-xs-1' />
          <div className='col-xs-4'>
            {cheatsheet}
          </div>
          <div className='col-xs-6'>
             <this.components.AssociatedData ref={'associatedData'} actions={actions} store={this.state}  />
          </div>
          <div className='col-xs-1' />
        </div>
        <div className='row'>
          <div className='col-xs-1' />
          <div className='col-xs-4' >
            <div className='raw-input'>
              <div className='form-group'>
                <textarea ref='rawInput' value={this.state.rawInputValue} onChange={this.rawInputChange} className='form-control' />
              </div>
            </div>
          </div>
          <div className='col-xs-6'>
            <this.components.ParsedDisplay problems={this.state.parsedProblems} actions={actions} />
          </div>
          <div className='col-xs-1' />
        </div>
      </div>
    );
  }
});