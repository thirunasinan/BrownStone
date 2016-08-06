App.components.tagger.problems.EditTagRelationship = React.createClass({

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
    this.props.actions.updateTagSearchQuery(this.props.problemId, this.props.tagRelationship.clientId, this.props.tagRelationship.tag.tagType.id, value)
  },

  onKeyDown: function (e) {
    // want to get tab to work as autocomplete eventually
  },

  editTagRelationshipDescription: function () {
    var value = this.refs.description.getDOMNode().value
    this.props.actions.editTagDescription(this.props.problemId, this.props.tagRelationship.clientId, value)
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
      <div className={className} onMouseOut={this.stopHoverTagSearchResult(data)} onMouseOver={this.hoverTagSearchResult(data)} onClick={this.selectTagSearchResult(data)}>{data.name}</div>
    )
  },

  oldnessText: function (text) {
    return <span className='new-tag-or-not old-tag'>{text}</span>
  },


  addSubTagRelationship: function () {
    this.props.actions.addTagRelationship(this.props.problemId, this.props.tagRelationship.clientId)
  },

  selectTagType: function () {
    var value = this.refs.selectTagType.getDOMNode().value
    this.props.actions.selectTagType(this.props.problemId, this.props.tagRelationship.clientId, value)
  },

  actionTagTypeDropDown: function () {
    var typeOptions = this.props.store.actionTagTypeOptions.map(function (tagType) {
      return <option key={tagType.id} value={tagType.id}>{tagType.name}</option>;
    })
    return (<select
              ref={'selectTagType'}
              className='tag-type-dropdown'
              selected={this.props.tagRelationship.tag.tagType.name}
              onChange={this.selectTagType}>{typeOptions}</select>)
  },

  selectActionTag: function () {
    var value = this.refs.selectTag.getDOMNode().value
    this.props.actions.selectActionTag(this.props.problemId, this.props.tagRelationship.clientId, value)
  },

  actionTagDropDown: function () {
    var that = this;
    var tagOptions = this.props.store.actionTagOptions.filter(function (t) {
      var x =  parseInt(t.tagType.id) === parseInt(that.props.tagRelationship.tag.tagType.id)
      return x
    }).concat([{id: null, name: ''}])
    .reverse()
    .map(function (option) {
      return <option key={option.id} value={option.id}>{option.name}</option>;
    })
    return (<select
              ref={'selectActionTag'}
              className='tag-type-dropdown'
              selected={this.props.tagRelationship.tag.name}
              onChange={this.selectTag}>{tagOptions}</select>)
  },

  openTagExplorer: function (e) {
    this.props.actions.toggleTagExplorer(this.props.problemId, this.props.tagRelationship)
  },

  render: function () {
    var tagRelationship = this.props.tagRelationship
    var Tagger = App.components.tagger.problems.Tagger

    var tagName, tagTypeName

    var inputTagName = (<input onBlur={this.onBlur} onFocus={this.onFocus} className='tag-search-input' placeholder={'tag name'} ref={'search'} onKeyDown={this.onKeyDown} value={tagRelationship.tag.name} onChange={this.onNameChange} />)


    if (tagRelationship.isNew) {
      tagTypeName = this.actionTagTypeDropDown()
      if (tagRelationship.tag.tagType.id) {
        tagName = this.actionTagDropDown()
      } else {
        tagName = null
      }

    } else {
      tagTypeName = (tagRelationship.tag.tagType.name ? tagRelationship.tag.tagType.name + ":" : "")
      tagName = <span>{tagRelationship.tag.name}</span>
    }

    var tagSearchResults;

    if (this.props.store.tagSearchResults.length
        && this.state.focused
        && (!tagRelationship.tag.tagType.taggerCanCreateNew)
        && this.props.store.searchingTag === tag.clientId) {
      var eles = this.props.store.tagSearchResults.map(this.searchResult)
      tagSearchResults = <div className='tag-search-results'>{eles}</div>
    } else {
      tagSearchResults = null
    }


    var crudStuff = (
      <span>
      <span className='pull-right'>X:<input checked={this.markedForRemoval()} ref={'remove'} onChange={this.removeTagRelationship} type='checkbox' /></span>
      </span>
    )

    return (
      <div className='list-group-item tag-list-item'>
        <div className='row'>
          <div className='col-xs-2'>
            {tagTypeName}
          </div>
          <div className='col-xs-2'>
            {tagName}
          </div>
          <div className='col-xs-3'>
            <textarea rows={1} className='tag-description autoresize' ref={'description'} placeholder={'data'} onChange={this.editTagRelationshipDescription}  value={tagRelationship.description}></textarea>
          </div>
          <div className='col-xs-1'>
            {crudStuff}
          </div>
        </div>
      </div>

    )
  }
})