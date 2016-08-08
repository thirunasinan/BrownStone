addActions(function () {

  var _newState = App.actionHelpers.newState

  return {
    toggleTagExplorer: function (state, problemId, tagRelationship) {
      var hash = {
        tagExplorerActive: !state.tagExplorerActive,
        tagExplorerTagRelationship: tagRelationship,
        tagExplorerProblemId: problemId
      }
      return _newState(state, hash)
    },

    updateTagExplorerQuery: function (state, value) {
      var tagTypeId = state.tagExplorerTagRelationship.tag.tagType.id
      if (value) {
        return function (bindAction) {
          bindAction(_newState)({tagExplorerQuery: value})
          $.get(['search_tags', tagTypeId, value].join('/'), function (data) {
            var hash = {tagExplorerSearchResults: data}
            bindAction(_newState)(hash)
          }, 'json')
        }
      } else {
        return _newState(state, {tagExplorerSearchResults: [], tagExplorerQuery: ''})
      }
    },
  }
})