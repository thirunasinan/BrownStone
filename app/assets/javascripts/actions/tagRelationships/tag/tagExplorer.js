addActions(function () {

  var _newState = App.actionHelpers.newState
  var _getEditedProblem = App.actionHelpers.getEditedProblem


  return {
    toggleTagExplorer: function (state, problemId, tagRelationship) {
      return function (bindAction) {

        var subjectId;
        var problem = _getEditedProblem(state, problemId)
        if (problem.problemsTopics.length) {
          subjectId = problem.problemsTopics[0].topic.subject.id
        } else {
          subjectId = state.subjectOptions[0].id
        }

        $.get('/tag_groups/' + subjectId, function (data) {
          var hash = {
            tagExplorerActive: !state.tagExplorerActive,
            tagExplorerTagRelationship: tagRelationship,
            tagExplorerProblemId: problemId,
            tagExplorerSelectedSubject: subjectId,
            tagGroups: data
          }
          bindAction(_newState)(hash)
        }, 'json')
      }
    },
  }
})
