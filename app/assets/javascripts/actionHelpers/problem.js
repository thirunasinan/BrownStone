addActionHelpers(function () {

  return {
   getEditedProblem: function (state, problemId) {
      return state.problems.find(function (p) { return parseInt(p.id) === parseInt(problemId)}).edited
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
  }
})
