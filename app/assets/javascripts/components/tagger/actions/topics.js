addActions(function () {
  var newTopic = function () {
    return {
      topicRelId: Math.random(),
      topicId: null,
      isNew: true,
      name: '',
      subjectId: null,
      markedForRemoval: false,
    }
  }

  var _getEditedProblem = App.actionHelpers.getEditedProblem
  var _updateEditedProblem = App.actionHelpers.updateEditedProblem
  var _updateTopicRelHelper = App.actionHelpers.updateTopicRelHelper
  var _getTopicRel = App.actionHelpers.getTopicRel

  return {
    addTopic: function (state, problemId) {
      var editedProblem = _getEditedProblem(state, problemId)
      var topics = editedProblem.topics.concat([
        newTopic()
      ])
      return _updateEditedProblem(state, problemId, {topics: topics})
    },

    selectSubjectForTopic: function (state, problemId, topicRelId, subjectId) {
      return _updateTopicRelHelper(state, problemId, topicRelId, {subjectId: subjectId})
    },

    toggleRemoveTopic: function (state, problemId, topicRelId) {
      var topic = _getTopicRel(state, problemId, topicRelId)
      if (topic.isNew) {
        var ep = _getEditedProblem(state, problemId)
        var topics = ep.topics.filter(function (t) { return t.topicRelId !== topicRelId})
        return _updateEditedProblem(state, problemId, {topics: topics})
      } else {
        return _updateTopicRelHelper(state ,problemId, topicRelId, {markedForRemoval: !topic.markedForRemoval})
      }
    },

    selectTopic: function (state, problemId, topicRelId, topicId) {
      return _updateTopicRelHelper(state, problemId, topicRelId, {topicId: topicId})
    },

    saveTopics: function (state, problemId) {
      var edited = _getEditedProblem(state, problemId)
      var that = this;
      return function (bindAction) {
        $.ajax({
          type: 'POST',
          url: 'problems_topics',
          data: JSON.stringify({data: {problemId: edited.id, problemsTopics: edited.topics}}),
          success: function (data) {
            bindAction(App.actions.updateEditedProblem)(data.problemId, {topics: data.problemsTopics})
          },
          dataType: 'json',
          contentType: 'application/json'
        })
      }
    }
  }
})