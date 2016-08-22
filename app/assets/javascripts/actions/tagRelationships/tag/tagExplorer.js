addActions(function () {

  var _newState = App.actionHelpers.newState
  var _getEditedProblem = App.actionHelpers.getEditedProblem
  var _editTagRelationshipHelper2 = App.actionHelpers.editTagRelationshipHelper2

  var emptyTagExplorer = {
    tagExplorerActive: false,
    tagExplorerTagRelationship: null,
    tagExplorerProblemId: null,
    tagExplorerSelectedSubject: null,
    tagGroups: []
  }

  return {

    tagExplorerFindMode: function (state) {
      return _newState(state, {tagExplorerMode: 'find'})
    },

    tagExplorerCreateMode: function (state) {
      return _newState(state, {tagExplorerMode: 'create'})
    },

    selectTagInTagExplorer: function (state, tag) {
      return function (bindAction) {
        var problemId = state.tagExplorerProblemId;
        var trcid = state.tagExplorerTagRelationship.clientId
        bindAction(_editTagRelationshipHelper2)(problemId, trcid, {tag: tag})
        setTimeout(function () {
          bindAction(_newState)(emptyTagExplorer)
        }, 1000)
      }
    },

    filterTagExplorerBySubject: function (state, subjectId) {
      return function (bindAction) {
        var tagTypeId = state.tagExplorerTagRelationship.tag.tagType.id
        $.get(['/tag_groups', tagTypeId, subjectId].join('/'), function (data) {
          var hash = {
            tagExplorerSubjectId: subjectId,
            tagGroups: data
          }
          bindAction(_newState)(hash)
        }, 'json')
      }
    },

    toggleTagExplorer: function (state, problemId, tagRelationship) {
      if (state.tagExplorerActive) {
        return _newState(state, emptyTagExplorer)
      } else {
        return function (bindAction) {
          var subjectId;
          if (state.tagExplorerSubjectId) {
            subjectId = state.tagExplorerSubjectId
          } else {
            var problem = _getEditedProblem(state, problemId)
            if (problem.problemsTopics.length) {
              subjectId = problem.problemsTopics[0].topic.subject.id
            } else {
              subjectId = state.subjectOptions[0].id
            }
          }

          var tagTypeId = tagRelationship.tag.tagType.id

          $.get(['/tag_groups', tagTypeId, subjectId].join('/'), function (data) {
            var hash = {
              tagExplorerActive: !state.tagExplorerActive,
              tagExplorerTagRelationship: tagRelationship,
              tagExplorerProblemId: problemId,
              tagExplorerSubjectId: subjectId,
              tagGroups: data
            }
            bindAction(_newState)(hash)
          }, 'json')
        }
      }
    },
  }
})
