addActions(function () {

  var newTopic = function () {
    return {
      id: null,
      clientId: Math.random(),
      name: null,
      displayName: null,
      subject: {
        id: null,
        name: null,
      }
    }
  }

  var newProblemTopic = function () {
    return {
      clientId: Math.random(),
      id: null,
      isNew: true,
      name: '',
      topic: newTopic(),
      markedForRemoval: false,
    }
  }



  var _getEditedProblem = App.actionHelpers.getEditedProblem
  var _updateEditedProblem = App.actionHelpers.updateEditedProblem
  var _updateProblemTopicHelper = App.actionHelpers.updateProblemTopicHelper
  var _getProblemTopic = App.actionHelpers.getProblemTopic

  return {
    addProblemTopic: function (state, problemId) {
      var editedProblem = _getEditedProblem(state, problemId)
      var problemsTopics = editedProblem.problemsTopics.concat([
        newProblemTopic()
      ])
      return _updateEditedProblem(state, problemId, {problemsTopics: problemsTopics})
    },

    selectSubjectForProblemTopic: function (state, problemId, problemTopicClientId, subjectId) {

      var subject = state.subjectOptions.find(function (s) { return parseFloat(s.id) === parseFloat(subjectId)})
      var topic = {id: null, clientId: Math.random(), displayName: null, subject: subject}
      return _updateProblemTopicHelper(state, problemId, problemTopicClientId, {topic: topic})
    },

    toggleRemoveProblemTopic: function (state, problemId, problemTopicClientId) {
      var problemTopic = _getProblemTopic(state, problemId, problemTopicClientId)
      if (problemTopic.isNew) {
        var ep = _getEditedProblem(state, problemId)
        var problemsTopics = ep.problemsTopics.filter(function (pt) { return parseFloat(pt.clientId) !== parseFloat(problemTopicClientId)})
        return _updateEditedProblem(state, problemId, {problemsTopics: problemsTopics})
      } else {
        return _updateProblemTopicHelper(state, problemId, problemTopicClientId, {markedForRemoval: !problemTopic.markedForRemoval})
      }
    },

    selectTopic: function (state, problemId, problemTopicClientId, topicId) {
      var pt = _getProblemTopic(state, problemId, problemTopicClientId)
      var topic = pt.topic
      var newTopic = Object.assign({}, topic, {id: topicId})
      return _updateProblemTopicHelper(state, problemId, problemTopicClientId, {topic: newTopic})
    },

    saveProblemsTopics: function (state, problemId) {
      var edited = _getEditedProblem(state, problemId)
      var that = this;
      return function (bindAction) {
        $.ajax({
          type: 'POST',
          url: 'problems_topics',
          data: JSON.stringify({data: {problemId: edited.id, problemsTopics: edited.problemsTopics}}),
          success: function (data) {
            bindAction(_updateEditedProblem)(data.problemId, {problemsTopics: data.problemsTopics})
          },
          dataType: 'json',
          contentType: 'application/json'
        })
      }
    }
  }
})