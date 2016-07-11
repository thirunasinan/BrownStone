App.components.parser.input.AssociatedData = React.createClass({

  selectedSource: function () {
    return this.refs.sourceSelect.getDOMNode().value;
  },

  selectedSection: function () {
    return this.refs.sectionSelect.getDOMNode().value;
  },

  render: function () {

    var _actions = this.props.actions

    var sourceOptions = this.props.store.sourceOptions.map(function (source) {
      return <option key={source.id} value={source.id}>{source.name}</option>;
    });

    var sectionOptions = this.props.store.sectionOptions.map(function (section) {
      return <option key={section.id} value={section.id}>{section.name}</option>;
    })

    var saveBtnOrNot;
    if (this.props.store.selectedSourceId == null) {
      saveBtnOrNot = <button onClick={_actions.clickInvalidSave} className='btn btn-default'>Save</button>;
    } else if (this.props.store.parsedProblems.length) {
      saveBtnOrNot = <button onClick={_actions.clickSave} className='btn btn-success pull-left'>Save</button>
    }

    return (
      <div className='row'>
        <div className='col-xs-12'>
          <div className='row'>
            <div className='col-xs-12'>
              {saveBtnOrNot}
              <button onClick={_actions.clearRawInput} className='btn btn-danger pull-right'>Clear</button>
            </div>
          </div>
          <br />
          <br />
          <div className='row'>
            <div className='col-xs-12'>
              <div className='form-group'>
                <label>Source</label>
                <select ref={'sourceSelect'} onChange={_actions.selectSource} className='form-control'>
                  {sourceOptions}
                </select>
              </div>
              <div className='form-group'>
                <label>Section</label>
                <select ref={'sectionSelect'} onChange={_actions.selectSection} className='form-control'>
                  {sectionOptions}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})