addActionHelpers(function () {

  var app = function (key) { return App.actionHelpers[key]}

  return {
    updateProblemTopicHelper: function (state, problemId, problemTopicClientId, hash) {

      var problemsTopics = app('getEditedProblem')(state, problemId).problemsTopics
      var problemTopic = problemsTopics.find(function (pt) { return parseFloat(pt.clientId) === parseFloat(problemTopicClientId) })
      var editedProblemTopic = Object.assign({}, problemTopic, hash)
      var editedProblemsTopics = app('updateArray')(problemsTopics, editedProblemTopic, 'clientId')
      console.log('problemTopicId', problemTopicClientId, 'problemsTopics', problemsTopics, 'problemTopic', problemTopic, 'editedProblemTopic', editedProblemTopic, 'editedProblemsTopics', editedProblemsTopics)
      return app('updateEditedProblem')(state, problemId, {problemsTopics: editedProblemsTopics})
    },

    getProblemTopic: function (state, problemId, problemTopicClientId) {
      var ep = app('getEditedProblem')(state, problemId)
      return ep.problemsTopics.find(function (pt) { return parseFloat(pt.clientId) === parseFloat(problemTopicClientId)})
    }
  }
})
