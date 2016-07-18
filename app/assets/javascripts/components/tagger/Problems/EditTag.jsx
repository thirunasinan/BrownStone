App.components.tagger.problems.EditTag = React.createClass({

  getInitialState: function () {
    return {
      focused: false
    }
  },

  onNameChange: function (e) {
    var value = this.refs.search.getDOMNode().value
    this.props.actions.updateTagSearchQuery(this.props.problemId, this.props.tag.tr_id, value)
  },

  onKeyDown: function (e) {
    // want to get tab to work as autocomplete eventually
  },

  editTagDescription: function () {
    var value = this.refs.description.getDOMNode().value
    this.props.actions.editTagDescription(this.props.problemId, this.props.tag.tr_id, value)
  },

  onBlur: function () {
    var that = this;
    setTimeout(function () {that.setState({focused: false})}, 300)
  },

  onFocus: function () {
    this.setState({focused: true})
  },

  removeTag: function () {
    var checked = this.refs.remove.getDOMNode().checked
    this.props.actions.toggleRemoveTag(this.props.problemId, this.props.tag.tr_id, checked)
  },

  markedForRemoval: function () {
    return this.props.tag.markedForRemoval || false
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
      that.props.actions.selectTagSearchResult(that.props.problemId, that.props.tag.tr_id, data)
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
      <div className={className} onMouseOut={this.stopHoverTagSearchResult(data)} onMouseOver={this.hoverTagSearchResult(data)} onClick={this.selectTagSearchResult(data)}>{data.name}</div>
    )
  },

  oldnessText: function (text) {
    return <span className='new-tag-or-not old-tag'>{text}</span>
  },

  newNessText: function (text) {
    return <span className='new-tag-or-not new-tag'>{text}</span>
  },

  render: function () {
    var tag = this.props.tag
    var Tagger = App.components.tagger.problems.Tagger

    var tagName = tag.is_new
    ? <input onBlur={this.onBlur} onFocus={this.onFocus} className='tag-search-input' placeholder={'tag name'} ref={'search'} onKeyDown={this.onKeyDown} value={tag.name} onChange={this.onNameChange} />
    : <span><strong>{tag.name}</strong><br /><br /></span>

    var tagSearchResults;

    if (this.props.store.tagSearchResults.length
        && this.state.focused
        && this.props.store.searchingTag === tag.tr_id) {
      var eles = this.props.store.tagSearchResults.map(this.searchResult)
      tagSearchResults = <div className='tag-search-results'>{eles}</div>
    } else {
      tagSearchResults = null
    }

    var oldTagText = this.oldnessText("old tag")
    var oldRelText = this.oldnessText("old relationship")
    var newTagText = this.newNessText("new tag")
    var newRelText = this.newNessText("new relationship")

    var relText = tag.is_new
    ? newRelText
    : oldRelText

    var tagText = tag.is_tag_new
    ? newTagText
    : oldTagText


    return (
      <div className='list-group-item'>
        <p>
          <span>{relText}</span><span>,&nbsp;&nbsp;</span><span>{tagText}</span>
          <span className='pull-right'>remove: <input checked={this.markedForRemoval()} ref={'remove'} onChange={this.removeTag} type='checkbox' /></span>
        </p>
        <div className='row'>
          <div className='col-xs-12'>
            {tagName}
          </div>
        </div>
        {tagSearchResults}
        <div className='row'>
          <div className='col-xs-12'>

            <textarea className='tag-description' ref={'description'} placeholder={'description of relationship to this tag'} onChange={this.editTagDescription}  value={tag.description}></textarea>

          </div>
        </div>
        <div className='row'>
          <div className='col-xs-11'>
            <Tagger isSubTags={true} problemId={this.props.problemId} parent_tr_id={tag.tr_id} tags={tag.ho_trs} store={this.props.store} actions={this.props.actions} />
          </div>
        </div>

      </div>

    )
  }
})