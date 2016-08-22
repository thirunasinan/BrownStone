App.components.tagger.problems.EditNotActionTagRelationship = React.createClass({

  getInitialState: function () {
    return {
      focused: false
    }
  },

  onNameChange: function (e) {
    var value = this.refs.search.getDOMNode().value
    this.props.actions.updateTagSearchQuery(this.props.problemId, this.props.tagRelationship.clientId, this.props.tagRelationshipSubType, value)
  },

  onBlur: function () {
    var that = this;
    setTimeout(function () {that.setState({focused: false})}, 300)
    var tag = this.props.tagRelationship.tag
    if (!(tag.id || tag.createdInTagExplorer)) {
      this.props.actions.updateTagSearchQuery(this.props.problemId, this.props.tagRelationship.clientId, this.props.tagRelationshipSubType, '')
    }
  },

  onFocus: function () {
    this.setState({focused: true})
  },

  removeTagRelationship: function () {
    var checked = this.refs.remove.getDOMNode().checked
    this.props.actions.toggleRemoveTagRelationship(this.props.problemId, this.props.tagRelationship.clientId, checked)
  },

  markedForRemoval: function () {
    return this.props.tagRelationship.markedForRemoval || false
  },

  hoverTagSearchResult: function (data) {
    var that = this;
    return function (e) {
      that.props.actions.hoverTagSearchResult(data)
    }
  },

  stopHoverTagSearchResult: function (data) {
    var that = this;
    return function (e) {
      that.props.actions.stopHoverTagSearchResult(data)
    }
  },

  selectTagSearchResult: function (data) {
    var that = this;
    return function (e) {
      that.props.actions.selectTagSearchResult(that.props.problemId, that.props.tagRelationship.clientId, data)
    }
  },

  searchResult: function (data, i) {
    var className;
    var normal = 'tag-search-result'
    var hovered = 'tag-search-result tag-search-result-hovered'
    if (this.props.store.hoveredTagSearchResult) {
      if (data.id === this.props.store.hoveredTagSearchResult.id) {
        className = hovered
      } else {
        className = normal
      }
    } else if (i === 0) {
      className = hovered
    } else {
      className = normal
    }
    return (
      <div className={className}
           onMouseOut={this.stopHoverTagSearchResult(data)}
           onMouseOver={this.hoverTagSearchResult(data)}
           onClick={this.selectTagSearchResult(data)}>
        {data.name}
      </div>
    )
  },

  openTagExplorer: function (e) {
    this.props.actions.toggleTagExplorer(this.props.problemId, this.props.tagRelationship)
  },

  render: function () {
    var tagRelationship = this.props.tagRelationship
    var tagName
    var inputTagName = <input
                          onBlur={this.onBlur}
                          onFocus={this.onFocus}
                          className='tag-search-input'
                          placeholder={this.props.tagRelationshipSubType + " tag"}
                          ref={'search'}
                          onKeyDown={this.onKeyDown}
                          value={tagRelationship.tag.name || ''}
                          onChange={this.onNameChange} />

    var tagSearchResults;

    if (this.props.store.tagSearchResults.length
        && this.state.focused
        && this.props.store.searchingTagRelationshipClientId === tagRelationship.clientId) {
      var eles = this.props.store.tagSearchResults.map(this.searchResult)
      tagSearchResults = <div className='tag-search-results'>{eles}</div>
    } else {
      tagSearchResults = null
    }

    if (tagRelationship.isNew) {
      tagName = <span>{inputTagName}{tagSearchResults}</span>
      openTagExplorer = <a onClick={this.openTagExplorer}>TE</a>
    } else {
      openTagExplorer = null
      if (tagRelationship.taggedType === 'Problem') {
        tagName = <span>{tagRelationship.tag.tagType.name + ": " + tagRelationship.tag.name}</span>
      } else {
        tagName = <span>{tagRelationship.tag.name}</span>

      }
    }





    var crudStuff = (
      <span>
      <span className='pull-right'>X:<input checked={this.markedForRemoval()} ref={'remove'} onChange={this.removeTagRelationship} type='checkbox' /></span>
      </span>
    )

    return (
      <div className='list-group-item tag-list-item'>
        <div className='row'>
          <div className='col-xs-8'>
            {tagName}
          </div>
          <div className='col-xs-2'>
            {openTagExplorer}
          </div>
          <div className='col-xs-2'>
            {crudStuff}
          </div>
        </div>
      </div>

    )
  }
})
