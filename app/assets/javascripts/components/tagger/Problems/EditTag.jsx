App.components.tagger.problems.EditTag = React.createClass({

  getInitialState: function () {
    return {
      focused: false
    }
  },

  componentDidMount: function () {
    App.modules.autoresizeTextarea()
  },

  onNameChange: function (e) {
    var value = this.refs.search.getDOMNode().value
    this.props.actions.updateTagSearchQuery(this.props.problemId, this.props.tag.tr_id, this.props.tag.tag_type_id, value)
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

  addSubTag: function () {
    this.props.actions.addTag(this.props.problemId, this.props.tag.tr_id)
  },

  selectTagType: function () {
    var value = this.refs.selectTagType.getDOMNode().value
    this.props.actions.selectTagType(this.props.problemId, this.props.tag.tr_id, value)
  },

  tagTypeDropDown: function () {
    var typeOptions = this.props.store.tagTypeOptions.map(function (tagType) {
      return <option key={tagType.id} value={tagType.id}>{tagType.name}</option>;
    })
    return (<select
              ref={'selectTagType'}
              selected={this.props.tag.tag_type_name}
              onChange={this.selectTagType}>{typeOptions}</select>)
  },

  render: function () {
    var tag = this.props.tag
    var Tagger = App.components.tagger.problems.Tagger

    var tagName, tagTypeName
    if (tag.is_new) {
      tagTypeName = this.tagTypeDropDown()
      if (tag.tag_type_id) {
        tagName = (<input onBlur={this.onBlur} onFocus={this.onFocus} className='tag-search-input' placeholder={'tag name'} ref={'search'} onKeyDown={this.onKeyDown} value={tag.name} onChange={this.onNameChange} />)
      } else {
        tagName = null
      }

    } else {
      tagTypeName = (tag.tag_type_name ? tag.tag_type_name + ":" : "")
      tagName = <span>{tag.name}</span>
    }

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

    var newNessInfo = <span><span>{relText}</span><span>,&nbsp;&nbsp;</span><span>{tagText}</span></span>

    var crudStuff = (
      <span>
      <span className='pseudo-link' onClick={this.addSubTag}>add subtag</span>
      <span className='pull-right'>remove: <input checked={this.markedForRemoval()} ref={'remove'} onChange={this.removeTag} type='checkbox' /></span>
      </span>
    )

    return (
      <div className='list-group-item tag-list-item'>
        <div className='row'>
          <div className='col-xs-1'>
            {tagTypeName}
          </div>
          <div className='col-xs-6'>
            {tagName}
          </div>
          <div className='col-xs-4'>
            {crudStuff}
          </div>
        </div>
        {tagSearchResults}
        <div className='row'>
          <div className='col-xs-12'>

            <textarea rows={1} className='tag-description autoresize' ref={'description'} placeholder={'description of relationship to this tag'} onChange={this.editTagDescription}  value={tag.description}></textarea>

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