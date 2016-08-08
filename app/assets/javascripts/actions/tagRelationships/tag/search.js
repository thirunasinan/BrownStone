addActions(function () {

  var _editTagHelper = App.actionHelpers.editTagHelper
  var _newState = App.actionHelpers.newState
  var _editTagRelationshipHelper = App.actionHelpers.editTagRelationshipHelper
  var _selectTagSearchResultHelper = App.actionHelpers.selectTagSearchResultHelper
  var _updateTagNameHelper = App.actionHelpers.updateTagNameHelper
  var _updateTag = App.actionHelpers.updateTag

  var _setTagSearchResults = function (state, data) {
    var x = _newState(state, {tagSearchResults: data})
    return x
  }

  var _selectTagSearchResultHelper = function (tagRelationship, tag) {
    tag.isNew = false
    return _updateTag(tagRelationship, tag)
  }

  var _updateTagNameHelper = function (tagRelationship, name) {
    var replacer = name || ''
    var x = _updateTag(tagRelationship, {id: null, isNew: true, name: name})
    return x
  }

  return {
    updateTagSearchQuery: function (state, problemId, tagRelationshipClientId, tagTypeName, value) {
      var that = this;
      return function (bindAction) {
        var state1 = Object.assign({}, state, {tagSearchQuery: value, searchingTagRelationshipClientId: tagRelationshipClientId})
        var state2 = _editTagRelationshipHelper(state1, problemId, tagRelationshipClientId, _updateTagNameHelper, value)
        bindAction(_newState)(state2)

        $.get(['search_tags', tagTypeName, value].join('/'), function (data) {
          bindAction(_setTagSearchResults)(data)
        }, 'json')
      }
    },

    selectTagSearchResult: function (state, problemId, tagRelationshipClientId, tagData) {
      return _editTagRelationshipHelper(state, problemId, tagRelationshipClientId, _selectTagSearchResultHelper, tagData)
    },

    hoverTagSearchResult: function (state, data) {
      return _newState(state, {hoveredTagSearchResult: data})
    },

    stopHoverTagSearchResult: function (state, data) {
      var x = state.hoveredTagSearchResult
      if (x && x.id && x.id === data.id) {
        return _newState(state, {hoveredTagSearchResult: null})
      } else {
        return state;
      }
    }
  }
})