App.components.Modal = React.createClass({

  className: function () {
    return this.props.active
    ? 'tagger-modal tagger-modal-active'
    : 'tagger-modal tagger-modal-inactive'
  },

  selectSubject: function () {
    var value = this.refs.subjectSelect.getDOMNode().value
    this.props.actions.filterTagExplorerBySubject(value)
  },

  selectTag: function (tagData) {
    var that = this;
    return function (e) {
      that.props.actions.selectTagSearchResult(that.props.store.tagExplorerProblemId,
                                               that.props.store.tagExplorerTagRelationship.clientId,
                                               tagData)
      setTimeout(function () {that.props.actions.toggleTagExplorer()}, 500)
    }
  },

  newTag: function () {
    var value = this.refs.tagExplorer.getDOMNode().value
    var tagData = this.props.store.tagExplorerTagRelationship.tag
    tagData.name = value
    tagData.isNew = true
    this.selectTag(tagData)()
  },

  render: function () {
    var that = this;
    var TagGroup = App.components.tagger.TagGroup

    var subjectOptions = that.props.store.subjectOptions.map(function (subject, i) {
      return <option key={i} value={subject.id}>{subject.name}</option>
    });

    var subjectSelect = (
      <select ref="subjectSelect" onChange={this.selectSubject} value={that.props.store.tagExplorerSubjectId}>
        {subjectOptions}
      </select>

    )

    var tagGroups = that.props.store.tagGroups.map(function (tagGroup, i) {
      return <TagGroup key={i} actions={that.props.actions} store={that.props.store} tagGroup={tagGroup} />
    })

    if (!this.props.active) {
      return null
    } else {

      if (this.props.store.tagExplorerMode === 'find') {
        var tagExplorerFindModeButtonClassName = 'btn btn-info'
        var tagExplorerCreateModeButtonClassName = 'btn btn-default'
        var taggerModalMainContent = (
          <span>
            <div className='row'>
              <div className='col-xs-12'>
                {subjectSelect}
              </div>
            </div>
            <br />
            <br />
            <div className='row'>
              <div className='col-xs-12'>
                <div className='tag-groups-container'>
                  {tagGroups}
                </div>
              </div>
            </div>
          </span>
        )
      } else {
        var tagExplorerFindModeButtonClassName = 'btn btn-default'
        var tagExplorerCreateModeButtonClassName = 'btn btn-info'
        var taggerModalMainContent = null
      }




      return (
        <div className={this.className()}>
          <div className='tagger-modal-content'>
            <div className='row'>
              <div className='col-xs-12'>
                <button onClick={this.props.actions.tagExplorerFindMode} className={tagExplorerFindModeButtonClassName}>Find Tag</button>
                &nbsp;&nbsp;
                <button onClick={this.props.actions.tagExplorerCreateMode} className={tagExplorerCreateModeButtonClassName}>Create Tag</button>
                <button onClick={this.props.actions.toggleTagExplorer} className='btn btn-danger pull-right'>close</button>
              </div>
            </div>
            <br />
            <br />
            {taggerModalMainContent}
          </div>
        </div>
      )
    }
  }
})
