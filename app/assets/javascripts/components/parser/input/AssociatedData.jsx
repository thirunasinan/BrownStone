App.components.parser.input.AssociatedData = React.createClass({

  associatedImagesClassName: function () {
    return this.props.store.hasAssociatedImages
    ? "btn btn-info"
    : "btn btn-default"
  },

  associatedTextsClassName: function () {
    return this.props.store.hasAssociatedTexts
    ? "btn btn-info"
    : "btn btn-default"
  },

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
      saveBtnOrNot = <div className='danger'>Select a Source before saving</div>
    } else if (this.props.store.parsedProblems.length) {
      saveBtnOrNot = <button onClick={_actions.clickSave} className='btn btn-success pull-left'>Save</button>
    } else {
      saveBtnOrNot = null;
    }

    return (
      <div className='row'>
        <div className='col-xs-6'>
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
          <div className='form-group'>
            <button className={this.associatedImagesClassName()} onClick={_actions.toggleHasAssociatedImages}>Has Associated Images</button>
          </div>
          <div className='form-group'>
            <button className={this.associatedTextsClassName()} onClick={_actions.toggleHasAssociatedTexts}>Has Associated Texts</button>
          </div>

          <label>Raw Text Input - Separate Problems with an Empty Line</label>
          <br />
          <br />
          <div className='row'>
            <div className='col-xs-2'>
              <button onClick={_actions.clearRawInput} className='btn btn-danger'>Clear</button>
            </div>
            <div className='col-xs-10'>
              {saveBtnOrNot}
            </div>
          </div>
        </div>
      </div>
    )
  }
})