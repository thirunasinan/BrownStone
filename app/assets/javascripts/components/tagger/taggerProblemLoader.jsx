App.components.TaggerProblemLoader = React.createClass({

  selectSource: function (state) {
    var value = this.refs.sourceSelect.getDOMNode().value
    this.props.actions.loadSections(value)
    this.props.actions.loadProblemsBySource(value)
  },

  selectSection: function (state) {
    var value = this.refs.sectionSelect.getDOMNode().value
    this.props.actions.loadProblemsBySection(value)
  },

  render: function () {

    var sourceOptions = this.props.store.sourceOptions.map(function (source) {
      return <option key={source.id || Math.random()} value={source.id}>{source.name}</option>;
    });

    var sectionOptions = this.props.store.sectionOptions.map(function (section) {
      return <option key={section.id || Math.random()} value={section.id}>{section.name}</option>;
    })
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
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
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    )
  }
})