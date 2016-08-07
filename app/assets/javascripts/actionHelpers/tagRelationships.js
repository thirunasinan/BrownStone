addActionHelpers(function () {

  return {

    updateTag: function (tagRelationship, hash) {
      var tag = tagRelationship.tag
      var tag2 = Object.assign({}, tag, hash)
      return Object.assign({}, tagRelationship, {tag: tag2})
    },

    editTagRelationshipHelper: function (state, problemId, tagRelationshipClientId, inputFn, args) {
      var editedProblem = App.actionHelpers.getEditedProblem(state, problemId)
      var tagRelationships = editedProblem.tagRelationships

      var fn1 = function (tagRelationship, tagRelationshipClientId, args) {
        if (tagRelationship.clientId === tagRelationshipClientId) {
          var data = inputFn(tagRelationship, args)
        } else {
          var hoTrs2 = tagRelationship.tagRelationships.reduce(function (acc, tr) {
            return acc.concat(fn1(tr, tagRelationshipId, args))
          }, [])
          var data = {tagRelationships: hoTrs2}
        }
        if (data === false) {
          return []
        } else {
          return [Object.assign({}, tagRelationship, data)]
        }
      }

      var tagRelationships2 = tagRelationships.reduce(function (acc, ele) {
        return acc.concat(fn1(ele, tagRelationshipClientId, args))
      }, [])


      return App.actionHelpers.updateEditedProblem(state, problemId, {tagRelationships: tagRelationships2})
    },

    editTagRelationshipHelper2: function (state, problemId, tagRelationshipClientId, hash) {
      var function1 = function (tagRelationship) {
        return Object.assign({}, tagRelationship, hash)
      }
      return App.actionHelpers.editTagRelationshipHelper(state, problemId, tagRelationshipClientId, function1)
    }
  }
})