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

  var updateNewTag = function (state, hash) {
    var tr = state.tagExplorerTagRelationship
    var tag = tr.tag
    var updatedTag = Object.assign({}, tag, hash)
    var updatedTr = Object.assign({}, tr, {tag: updatedTag})
    return Object.assign({}, state, {tagExplorerTagRelationship: updatedTr})
  }

  return {

    tagExplorerFindMode: function (state) {
      return _newState(state, {tagExplorerMode: 'find'})
    },

    tagExplorerCreateMode: function (state) {
      return _newState(state, {tagExplorerMode: 'create'})
    },

    addRelationToNewTagInTagExplorer: function (state, relationName, entityName) {
      var tr = state.tagExplorerTagRelationship
      var newRelation = {clientId: Math.random()}
      newRelation[entityName] = {id: null, name: ''}
      var rs = tr.tag[relationName].concat([newRelation])
      var hash = {}
      hash[relationName] = rs
      return updateNewTag(state, hash)
    },

    removeRelationFromNewTagInTagExplorer: function (state, relationName, clientId) {
      var tr = state.tagExplorerTagRelationship
      var rs = tr.tag[relationName].filter(function (r) { return r.clientId !== clientId})
      var hash = {}
      hash[relationName] = rs
      return updateNewTag(state, hash)
    },

    updateRelationForNewTagInTagExplorer: function (state, clientId, relationName, entityName, value) {
      var tr = state.tagExplorerTagRelationship
      var rs = tr.tag[relationName].map(function (r) {
        if (r.clientId === clientId) {
          var entity = Object.assign({}, r[entityName], {id: value})
          var hash = {}
          hash[entityName] = entity
          return Object.assign({}, r, hash)
        } else {
          return r
        }
      }, this)
      var hash2 = {}
      hash2[relationName] = rs
      return updateNewTag(state, hash2)
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
