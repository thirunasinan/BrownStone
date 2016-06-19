var Parser = React.createClass({
  propTypes: {
  },

  getInitialState: function () {
    return {
        parsedProblems: [],
        sourceOptions: [],
        sectionOptions: [],
        selectedSourceId: null,
        selectedSectionId: null
      }
  },

  rawInputChange: function (e) {
    var text = this.refs.rawInput.getDOMNode().value
    this.parseProblems(text)
  },

  parseProblems: function (text) {
    var parsed = problemsParser(text);
    this.setState({parsedProblems: parsed}, _latexInit)
  },

  selectSource: function (e) {
    var value = this.refs.sourceSelect.getDOMNode().value;
    this.setState({selectedSourceId: value})
  },

  selectSection: function (e) {
    var value = this.refs.sectionSelect.getDOMNode().value;
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

  clickSave: function (e) {
    var that = this;
    var data = {
      problems: this.state.parsedProblems,
      sourceId: this.state.selectedSourceId,
      sectionId: this.state.selectedSectionId
    }
    $.ajax({
      type: "POST",
      url: 'problems',
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json'
    })
  },

  clearRawInput: function () {
    this.refs.rawInput.value = null
    this.parseProblems("")
  },

  render: function() {
    var that = this;
    var actions = ['rawInputChange', 'clickSave', 'selectSource'].reduce(function (acc, name) {
      acc[name] = that[name]
      return acc;
    }, {})

    var sourceOptions = this.state.sourceOptions.map(function (source) {
      return <option key={source.id} value={source.id}>{source.name}</option>;
    });

    var sectionOptions = this.state.sectionOptions.map(function (section) {
      return <option key={section.id} value={section.id}>{section.name}</option>;
    })

    var saveBtnOrNot;
    if (this.state.selectedSourceId == null) {
      saveBtnOrNot = <div className='danger'>Select a Source before saving</div>
    } else if (this.state.parsedProblems.length) {
      saveBtnOrNot = <button onClick={this.clickSave} className='btn btn-success pull-left'>Save</button>
    } else {
      saveBtnOrNot = null;
    }

    return (
      <div>
        <br />
        <div className='row'>
          <div className='col-xs-6'>
            <div className='form-group'>
              <label>Source</label>
              <select ref={'sourceSelect'} onChange={this.selectSource} className='form-control'>
                {sourceOptions}
              </select>
            </div>
            <div className='form-group'>
              <label>Section</label>
              <select ref={'sectionSelect'} onChange={this.selectSection} className='form-control'>
                {sectionOptions}
              </select>
            </div>
            <label>Raw Text Input - Separate Problems with an Empty Line</label>
            <br />
            <br />
            <div className='row'>
              <div className='col-xs-2'>
                <button onClick={this.clearRawInput} className='btn btn-danger'>Clear</button>
              </div>
              <div className='col-xs-10'>
                {saveBtnOrNot}
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-xs-6 raw-input'>
            <div className='form-group'>
              <textarea ref='rawInput' onChange={this.rawInputChange} className='form-control' />
            </div>
          </div>
          <DisplayParsed problems={this.state.parsedProblems} actions={actions} />
        </div>
      </div>
    );
  }
});