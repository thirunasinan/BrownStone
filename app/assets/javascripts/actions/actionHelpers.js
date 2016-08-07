addActionHelpers(function () {
  return {


    _updateTag: function (tagRelationship, hash) {
      var tag = tagRelationship.tag
      var tag2 = Object.assign({}, tag, hash)
      return Object.assign({}, tagRelationship, {tag: tag2})
    },


    newState: function (state, hash) {
      return Object.assign({}, state, hash)
    },


    updateEditedProblem: function (state, problemId, hash) {
      var problem = state.problems.find(function (p) { return p.id === problemId})
      var editedProblem2 = Object.assign({}, problem.edited, hash)
      var problem2 = Object.assign({}, problem, {edited: editedProblem2})
      var problems2 = state.problems.map(function (ele) {
        if (ele.id === problemId) {
          return problem2
        } else {
          return ele;
        }
      })
      return Object.assign({}, state, {problems: problems2})
    },

    updateArray: function (array, newEle, prop) {
      return array.map(function (ele) {
        if (ele[prop] === newEle[prop]) {
          return newEle
        } else {
          return ele
        }
      })
    },

    getEditedProblem: function (state, problemId) {
      return state.problems.find(function (p) { return parseInt(p.id) === parseInt(problemId)}).edited
    },


    editTagHelper: function (state, problemId, trId, inputFn, args) {
      var editedProblem = App.actionHelpers.getEditedProblem(state, problemId)
      var tags = editedProblem.tags

      var fn1 = function (tag, trId, args) {
        if (tag.trId === trId) {
          var data = inputFn(tag, args)
        } else {
          var hoTags2 = tag.hoTrs.reduce(function (acc, tr) {
            return acc.concat(fn1(tr, trId, args))
          }, [])
          var data = {hoTrs: hoTags2}
        }
        if (data === false) {
          return []
        } else {
          return [Object.assign({}, tag, data)]
        }
      }

      var tags2 = tags.reduce(function (acc, ele) {
        return acc.concat(fn1(ele, trId, args))
      }, [])


      return App.actionHelpers.updateEditedProblem(state, problemId, {tags: tags2})
    },

    editTagHelper2: function (state, problemId, trId, hash) {
      var function1 = function (tag) {
        return Object.assign({}, tag, hash)
      }
      return App.actionHelpers.editTagHelper(state, problemId, trId, function1)
    }
  }
})