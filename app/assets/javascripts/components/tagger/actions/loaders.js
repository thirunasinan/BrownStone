addActions(function () {


  var _loadProblems = function (url) {
    var that = this;
    return function (bindAction) {
      $.get(url, function (data) {
        console.log('data', data)
        var loadedProblems = data.map(function (p) {
          return {id: p.id, original: p, edited: p}
        })
        bindAction(App.actionHelpers.newState, _latexInit)({problems: loadedProblems})
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
          var sections = [{id: null, name: ''}].concat(data)
          bindAction(App.actionHelpers.newState)({sectionOptions: sections})
        })
      }
    },

    taggerComponentDidMount: function (state) {
      var that = this;
      return function (bindAction) {
        ['sources', 'tag_types', 'action_tag_types', 'action_tags', 'subjects', 'topics'].map(function (name) {
          var url = name + "_for_select"
          var stateKey = camelCase(name.slice(0, name.length -1)) + "Options"
          $.get(url, function (data) {
            var total = [{id: null, name: ''}].concat(data)
            var hash = {}
            hash[stateKey] = total
            bindAction(App.actionHelpers.newState)(hash)
          })
        })
        bindAction(App.actions.loadProblemsBySource)(3)
      }
    }
  }
})