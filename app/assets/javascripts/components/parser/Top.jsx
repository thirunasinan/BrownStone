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
      alert: {type: null, message: null},
      rawInputValue: null,
      parsedProblems: [],
      hasAssociatedImages: false,
      hasAssociatedTexts: false,
      sourceOptions: [],
      sectionOptions: [],
      selectedSourceId: null,
      selectedSectionId: null
    }
  },

  rawInputChange: function (e) {
    var text = this.refs.rawInput.getDOMNode().value
    var processed = this.modules.predictDelimiters(text);
    this.setState({rawInputValue: processed})
    this.parseProblems(processed)
  },

  parseProblems: function (text) {
    var parsed = this.modules.problemsParser(text);
    this.setState({parsedProblems: parsed}, _latexInit)
  },

  selectSource: function (e) {
    var value = this.refs.associatedData.selectedSource()
    this.setState({selectedSourceId: value})
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
    $.get('sections', function (data) {
      var sections = [{id: null, name: 'None'}].concat(data)
      that.setState({sectionOptions: sections})
    })
  },

  saveSuccess: function (data) {
    this.clearRawInput()
    var numberSaved = data.saved.length
    var x = (numberSaved === 1)
    ? 'problem'
    : 'problems'
    var msg = ["saved", numberSaved, x].join(" ")
    this.setState({alert: {type: 'success', message: msg}})
  },

  saveError: function (jqXHR, textStatus, errorThrown) {
    var message = ["Save Error:", textStatus, errorThrown].join(' ')
    this.setState({alert: {type: 'danger', message: message}})
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
      sectionId: this.state.selectedSectionId,
      hasAssociatedImages: this.state.hasAssociatedImages,
      hasAssociatedTexts: this.state.hasAssociatedTexts
    }
    console.log('data', data)
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

  toggleHasAssociatedImages: function () {
    this.setState({hasAssociatedImages: !this.state.hasAssociatedImages})
  },

  toggleHasAssociatedTexts: function () {
    this.setState({hasAssociatedTexts: !this.state.hasAssociatedTexts})
  },

  alertClassName: function () {
    return 'alert alert-dismissible alert-' + this.state.alert.type
  },

  closeAlert: function () {
    this.setState({alert: {type: null, message: null}})
  },

  render: function() {
    var that = this;
    var actions = ['rawInputChange', 'clickSave', 'selectSource'].reduce(function (acc, name) {
      acc[name] = that[name]
      return acc;
    }, {})

    var alertOrNot;
    if (this.state.alert.message) {
      alertOrNot = (
        <div className='row'>
          <div className='col-xs-12'>
            <div className={this.alertClassName()} role='alert'>
              <button type="button" className="close" onClick={this.closeAlert} aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <div>{this.state.alert.message}</div>
            </div>
          </div>
        </div>
      )
    } else {
      alertOrNot = null;
    }

    return (
      <div>
        <br />
        {alertOrNot}
        <br />
        <this.components.AssociatedData ref={'associatedData'} actions={actions} store={this.state} />
        <br />
        <br />
        <div className='row'>
          <div className='col-xs-6 raw-input'>
            <div className='form-group'>
              <textarea ref='rawInput' value={this.state.rawInputValue} onChange={this.rawInputChange} className='form-control' />
            </div>
          </div>
          <this.components.ParsedDisplay problems={this.state.parsedProblems} actions={actions} />
        </div>
      </div>
    );
  }
});