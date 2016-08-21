addActions(function () {

  var _newState = App.actionHelpers.newState

  return {
    toggleTagExplorer: function (state, problemId, tagRelationship) {
      return function (bindAction) {
        var subjectId = state.subjectOptions[0].id
        $.get('/tag_groups/' + subjectId, function (data) {
          var hash = {
            tagExplorerActive: !state.tagExplorerActive,
            tagExplorerTagRelationship: tagRelationship,
            tagExplorerProblemId: problemId,
            tagGroups: data
          }
          bindAction(_newState)(hash)
        }, 'json')
      }
    },
  }
})
