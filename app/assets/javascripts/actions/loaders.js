addActions(function () {


  var _newState = App.actionHelpers.newState

  var _loadProblems = function (url) {
    var that = this;
    return function (bindAction) {
      $.get(url, function (data) {
        var loadedProblems = data.map(function (p) {
          return {id: p.id, original: p, edited: p}
        })
        bindAction(_newState, _latexInit)({problems: loadedProblems})
      }, 'json')
    }
  }

  return {

    loadProblemsBySource: function (state, id) {
      return _loadProblems('problems_by_source/' + id)
    },

    loadProblemsBySection: function (state, id) {
      return _loadProblems('problems_by_section/' + id)
    },


    loadSections: function (state, sourceId) {
      var that = this;
      return function (bindAction) {
        $.get('sections_by_source/' + sourceId, function (data) {
          //var sections = [{id: null, name: ''}].concat(data)
          bindAction(App.actionHelpers.newState)({sectionOptions: data})
        })
      }
    },

    taggerComponentDidMount: function (state) {
      var that = this;
      return function (bindAction) {
        ['sources', 'tag_types', 'action_tag_types', 'action_tags', 'subjects', 'topics'].map(function (name) {
          var url = name + "_for_select"
          var stateKeyPart1 = camelCase(name.slice(0, name.length -1))
          var stateKey = stateKeyPart1 + "Options"
          $.get(url, function (data) {
            var total = data
            hash = state
            hash.defaults = hash.defaults || {}
            hash[stateKey] = data
            hash['defaults'][stateKeyPart1] = data[0]
            bindAction(_newState)(hash)
          })
        })
        bindAction(App.actions.loadProblemsBySource)(3)
      }
    }
  }
})
