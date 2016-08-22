addActionHelpers(function () {

  var newTagRelationshipHelper = function (state, tagType) {
    var tagRelationships;
    if (tagType.name === 'KNOWLEDGE' || tagType.name === 'IS') {
      tagRelationships = []
    } else {
      tagRelationships = ['KNOWLEDGE', 'IS'].map(function (tagTypeName) {
        var tagType = state.tagTypeOptions.find(function (tt) { return tt.name === tagTypeName })
        return newTagRelationshipHelper(state, tagType)
      })
    }
    return {
      id: null,
      description: null,
      tagRelationships: tagRelationships,
      tag: {
        isNew: true,
        id: '',
        name: "",
        tagType: tagType,
      },
      clientId: Math.random(),
      isNew: true,
      markedForRemoval: false,
    }
  }

  return {
    newTagRelationship: newTagRelationshipHelper,

    updateTag: function (tagRelationship, hash) {
      var tag = tagRelationship.tag
      var tag2 = Object.assign({}, tag, hash)
      var x =  Object.assign({}, tagRelationship, {tag: tag2})
      return x
    },

    editTagRelationshipHelper: function (state, problemId, tagRelationshipClientId, inputFn, args) {
      var editedProblem = App.actionHelpers.getEditedProblem(state, problemId)
      var tagRelationships = editedProblem.tagRelationships

      var fn1 = function (tagRelationship, tagRelationshipClientId, args) {
        if (tagRelationship.clientId === tagRelationshipClientId) {
          var data = inputFn(tagRelationship, args)
        } else {
          var hoTrs2 = tagRelationship.tagRelationships.reduce(function (acc, tr) {
            return acc.concat(fn1(tr, tagRelationshipClientId, args))
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
