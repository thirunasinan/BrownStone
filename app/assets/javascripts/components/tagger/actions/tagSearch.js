addActions(function () {

  var _editTagHelper
  var _newState
  var _setTagSearchResults
  var _editTagRelationshipHelper
  var _selectTagSearchResultHelper
  var _updateTagNameHelper

  return {
    updateTagSearchQuery: function (state, problemId, trId, tagTypeId, value) {
      var that = this;
      return function (bindAction) {
        var state1 = Object.assign({}, state, {tagSearchQuery: value, searchingTag: trId})
        var state2 = _editTagRelationshipHelper(state, problemId, trId, _updateTagNameHelper, value)

        if (value) {
          $.get(['search_tags', tagTypeId, value].join('/'), function (data) {
            bindAction(_setTagSearchResults)(data)
          }, 'json')
        } else {
          bindAction(_setTagSearchResults)(data)
        }
      }
    },

    selectTagSearchResult: function (state, problemId, trId, tagData) {
      return _editTagHelper(state, problemId, trId, _selectTagSearchResultHelper, tagData)
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