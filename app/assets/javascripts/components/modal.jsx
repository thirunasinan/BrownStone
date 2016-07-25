App.components.Modal = React.createClass({

  className: function () {
    return this.props.active
    ? 'tagger-modal tagger-modal-active'
    : 'tagger-modal tagger-modal-inactive'
  },

  updateTagExplorerQuery: function () {
    var value = this.refs.tagExplorer.getDOMNode().value
    this.props.actions.updateTagExplorerQuery(value)
  },

  selectTag: function (tag_data) {
    var that = this;
    return function (e) {
      that.props.actions.selectTagSearchResult(that.props.store.tagExplorerProblemId,
                                               that.props.store.tagExplorerTrId,
                                               tag_data)
      that.props.actions.toggleTagExplorer()
    }
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
            <div className='col-xs-12'>
              <button onClick={this.props.actions.toggleTagExplorer} className='btn btn-danger pull-right'>close</button>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12'>
              <input ref={'tagExplorer'} onChange={this.updateTagExplorerQuery} value={this.props.store.tagExplorerQuery} />
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