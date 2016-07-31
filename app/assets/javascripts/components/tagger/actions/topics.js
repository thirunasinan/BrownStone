addActions(function () {
  var newTopic = function () {
    return {
      topic_rel_id: Math.random(),
      topic_id: null,
      is_new: true,
      name: '',
      subject_id: null,
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

    selectSubjectForTopic: function (state, problemId, topic_rel_id, subject_id) {
      return _updateTopicRelHelper(state, problemId, topic_rel_id, {subject_id: subject_id})
    },

    toggleRemoveTopic: function (state, problemId, topic_rel_id) {
      var topic = _getTopicRel(state, problemId, topic_rel_id)
      if (topic.is_new) {
        var ep = _getEditedProblem(state, problemId)
        var topics = ep.topics.filter(function (t) { return t.topic_rel_id !== topic_rel_id})
        return _updateEditedProblem(state, problemId, {topics: topics})
      } else {
        return _updateTopicRelHelper(state ,problemId, topic_rel_id, {markedForRemoval: !topic.markedForRemoval})
      }
    },

    selectTopic: function (state, problemId, topic_rel_id, topic_id) {
      return _updateTopicRelHelper(state, problemId, topic_rel_id, {topic_id: topic_id})
    },

    saveTopics: function (state, problemId) {
      var edited = _getEditedProblem(state, problemId)
      var that = this;
      return function (bindAction) {
        $.ajax({
          type: 'POST',
          url: 'problems_topics',
          data: JSON.stringify({data: {problem_id: edited.id, problems_topics: edited.topics}}),
          success: function (data) {
            bindAction(App.actions.updateEditedProblem)(data.problem_id, {topics: data.problems_topics})
          },
          dataType: 'json',
          contentType: 'application/json'
        })
      }
    }
  }
})