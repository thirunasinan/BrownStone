var Parser = React.createClass({
  propTypes: {
  },

  getInitialState: function () {
    return {
        parsedProblems: [],
        sourceOptions: [],
        selectedSourceId: null
      }
  },

  rawInputChange: function (e) {
    var text = this.refs.rawInput.getDOMNode().value
    this.parseProblems(text)
  },

  parseProblems: function (text) {
    var parsed = problemsParser(text);
    this.setState({parsedProblems: parsed})
  },

  selectSource: function (e) {
    var value = this.refs.sourceSelect.getDOMNode().value;
    this.setState({selectedSourceId: value})
  },

  componentDidMount: function () {
    var that = this;
    $.get('sources', function (data) {
      var sources = [{id: null, name: 'None'}].concat(data)
      that.setState({sourceOptions: sources})
    })
  },

  clickSave: function (e) {
    var that = this;
    var data = {
      problems: this.state.parsedProblems,
      sourceId: this.state.selectedSourceId
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
    return (
      <div>
        <br />
        <div className='row'>
          <div className='col-xs-6 raw-input'>

            <div className='form-group'>
              <label>Source</label>
              <select ref={'sourceSelect'} onChange={this.selectSource} className='form-control'>
                {sourceOptions}
              </select>
            </div>

            <div className='form-group'>
              <label>Raw Text Input - Separate Problems with an Empty Line</label>
              <div><button onClick={this.clearRawInput} className='btn btn-danger'>Clear</button></div>
              <br />
              <textarea ref='rawInput' onChange={this.rawInputChange} className='form-control' />
            </div>
          </div>
          <DisplayParsed problems={this.state.parsedProblems} actions={actions} />
        </div>
      </div>
    );
  }
});