App.components.Modal = React.createClass({

  className: function () {
    return this.props.active
    ? 'tagger-modal tagger-modal-active'
    : 'tagger-modal tagger-modal-inactive'
  },

  selectSubjectForFind: function () {
    var value = this.refs.selectSubjectForFind.getDOMNode().value
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

  dropDownForCreate: function (entityName, onChange, value, refId) {
    var options = [{id: '', name: null}].concat(this.props.store[entityName + 'Options']).map(function (entity, i) {
      return <option key={i} value={entity.id}>{entity.name}</option>
    })
    var dropdown = (
      <select ref={refId} onChange={onChange} value={value}>
        {options}
      </select>
    )
    return dropdown
  },

  selectEntityInCreate: function (relationName, entityName, clientId) {
    return (function () {
      var value = this.refs[clientId].getDOMNode().value
      this.props.actions.updateRelationForNewTagInTagExplorer(clientId, relationName, entityName, value)
    }).bind(this)
  },

  addRelationToNewTag: function (relationName, entityName) {
    this.props.actions.addRelationToNewTagInTagExplorer(relationName, entityName)
  },

  removeRelationFromNewTagInTagExplorer: function (relationName, clientId) {
    return (function () {
      this.props.actions.removeRelationFromNewTagInTagExplorer(relationName, clientId)
    }).bind(this)
  },

  removeSubjectFromNewTagInTagExplorer: function (clientId) {
    return (function () {
      this.props.actions.removeSubjectFromNewTagInTagExplorer(clientId)
    }).bind(this)
  },

  dropDownsForCreate: function (relationName, entityName) {
    var dropdowns = this.props.store.tagExplorerTagRelationship.tag[relationName].map(function (r) {
      var onChange = this.selectEntityInCreate(relationName, entityName, r.clientId)
      return (
        <span>
          {this.dropDownForCreate(entityName, onChange, r[entityName].id || '', r.clientId)}
          <span>&nbsp;</span>
          <a onClick={this.removeRelationFromNewTagInTagExplorer(relationName, r.clientId)}>X</a>
          <span>&nbsp;&nbsp;</span>
        </span>
      )
    }, this)
    return (
      <div>
        {entityName + "s :"}
        {dropdowns}
        <span>&nbsp;&nbsp;</span>
        <a onClick={this.addRelationToNewTag(relationName, entityName)}>add</a>
      </div>
    )
  },

  render: function () {
    console.log('this.props.store', this.props.store)
    var that = this;
    var TagGroup = App.components.tagger.TagGroup



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
                {this.subjectSelect(this.selectSubjectForFind, this.props.store.tagExplorerSubjectId, 'selectSubjectForFind')}
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
        var taggerModalMainContent = (
          <span>
            <div className='row'>
              <div className='col-xs-12'>
                {this.dropDownsForCreate('subjectsTags', 'subject')}
              </div>
            </div>
            <br />
            <br />
            <div className='row'>
              <div className='col-xs-12'>
                <div className='tag-groups-container'>
                  {null}
                </div>
              </div>
            </div>
          </span>
        )
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
