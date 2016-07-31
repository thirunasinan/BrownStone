addActionHelpers(function () {
  return {

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

    updateTopicRelHelper: function (state, problemId, topic_rel_id, hash) {
      var problems = state.problems
      var problem = problems.find(function (p) { return p.id === problemId})
      var topics = problem.edited.topics
      var topic = topics.find(function (t) { return t.topic_rel_id === topic_rel_id })
      var editedTopic = Object.assign({}, topic, hash)
      var editedTopics = App.actionHelpers.updateArray(topics, editedTopic, 'topic_rel_id')
      return App.actionHelpers.updateEditedProblem(state, problemId, {topics: editedTopics})
    },

    getTopicRel: function (state, problemId, topic_rel_id) {
      var ep = App.actionHelpers.getEditedProblem(state, problemId)
      var topic = ep.topics.find(function (t) { return t.topic_rel_id === topic_rel_id})
      return topic
    },

    editTagHelper: function (state, problemId, tr_id, inputFn, args) {
      var editedProblem = App.actionHelpers.getEditedProblem(state, problemId)
      var tags = editedProblem.tags

      var fn1 = function (tag, tr_id, args) {
        if (tag.tr_id === tr_id) {
          var data = inputFn(tag, args)
        } else {
          var ho_tags2 = tag.ho_trs.reduce(function (acc, tr) {
            return acc.concat(fn1(tr, tr_id, args))
          }, [])
          var data = {ho_trs: ho_tags2}
        }
        if (data === false) {
          return []
        } else {
          return [Object.assign({}, tag, data)]
        }
      }

      var tags2 = tags.reduce(function (acc, ele) {
        return acc.concat(fn1(ele, tr_id, args))
      }, [])


      return App.actionHelpers.updateEditedProblem(state, problemId, {tags: tags2})
    },

    editTagHelper2: function (state, problemId, tr_id, hash) {
      var function1 = function (tag) {
        return Object.assign({}, tag, hash)
      }
      return App.actionHelpers.editTagHelper(state, problemId, tr_id, function1)
    }
  }
})