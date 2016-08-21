App.components.Modal = React.createClass({

  className: function () {
    return this.props.active
    ? 'tagger-modal tagger-modal-active'
    : 'tagger-modal tagger-modal-inactive'
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
    console.log('tagData', tagData)
    this.selectTag(tagData)()
  },

  render: function () {
    var that = this;
    var TagGroup = App.components.tagger.TagGroup
    var tagGroups = that.props.store.tagGroups.map(function (tagGroup, i) {
      return <TagGroup key={i} actions={that.props.actions} store={that.props.store} tagGroup={tagGroup} />
    })

    return (
      <div className={this.className()}>
        <div className='tagger-modal-content'>
          <div className='row'>
            <div className='col-xs-11' />
            <div className='col-xs-1' >
              <button onClick={this.props.actions.toggleTagExplorer} className='btn btn-danger pull-right'>close</button>
            </div>
          </div>
          <br />
          <br />
          <div className='row'>
            <div className='col-xs-12'>
              {tagGroups}
            </div>
          </div>
        </div>
      </div>
    )
  }
})
