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
    var items = this.props.store.tagExplorerSearchResults.map(function (sr) {
      return (
        <a onClick={that.selectTag(sr)} className='list-group-item'>{sr.name}</a>
      )
    })

    var searchResults = <div className='list-group'>{items}</div>

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
          <div className='row'>
            <div className='col-xs-11'>
              <input ref={'tagExplorer'} onChange={this.updateTagExplorerQuery} value={this.props.store.tagExplorerQuery} />
            </div>
              <div className='col-xs-1'>
                <button className='btn btn-success pull-right' onClick={this.newTag}>new</button>
              </div>
          </div>
          <br />
          <div className='row'>
            <div className='col-xs-12'>
              {searchResults}
            </div>
          </div>
        </div>
      </div>
    )
  }
})
