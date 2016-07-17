App.components.tagger.Top = React.createClass({

  getInitialState: function () {
    return {
      sourceOptions: [],
      sectionOptions: [],
      problems: [],
    }
  },

  componentDidMount: function () {
    var that = this;
    $.get('sources_for_select', function (data) {
      var sources = [{id: null, name: 'None'}].concat(data)
      that.setState({sourceOptions: sources})
    })
    this.loadProblemsBySource(1)
  },

  loadProblemsBySource: function (id) {
    this.loadProblems('problems_by_source/' + id)
  },

  loadProblemsBySection: function (id) {
    this.loadProblems('problems_by_section/' + id)
  },

  loadProblems: function (url) {
    var that = this;
    $.get(url, function (data) {
      var loadedProblems = data.map(function (p) {
        return {id: p.id, original: p, edited: p}
      })
      that.setState({problems: loadedProblems}, _latexInit)
    }, 'json')
  },

  loadSections: function (sourceId) {
    var that = this;
    $.get('sections_by_source/' + sourceId, function (data) {
      var sections = [{id: null, name: 'None'}].concat(data)
      that.setState({sectionOptions: sections})
    })
  },

  selectSource: function () {
    var value = this.refs.sourceSelect.getDOMNode().value
    this.loadSections(value)
    this.loadProblemsBySource(value)
  },

  selectSection: function () {
    var value = this.refs.sectionSelect.getDOMNode().value
    this.loadProblemsBySection(value)
  },

  editTagDescriptionHelper: function (tag, description) {
    return Object.assign({}, tag, {description: description})
  },

  toggleRemoveTagHelper: function (tag, bool) {
    var that = this;
    if (tag.is_new) {
      return false;
    } else {
      var ho_trs = tag.ho_trs.reduce(function (acc, tr) {
        if (tr.is_new) {
          return acc;
        } else {
          return acc.concat([that.toggleRemoveTagHelper(tr, bool)])
        }
      }, [])
      return Object.assign({}, tag, {markedForRemoval: bool, ho_trs: ho_trs })
    }
  },

  addTagHelper1: function (tag) {
    var newTag = {
      is_new: true,
      tr_id: Math.random(),
      markedForRemoval: false,
      description: null,
      tag_id: null,
      name: null,
      ho_trs: []
    }
    var ho_trs2 = tag.ho_trs.concat([newTag])
    return Object.assign({}, tag, {ho_trs: ho_trs2})
  },

  addTag: function (problemId, parent_tr_id) {
    if (parent_tr_id) {
      this.editTagHelper(problemId, parent_tr_id, this.addTagHelper1)
    }
  },

  editTagHelper: function (problemId, tr_id, inputFn, args) {
    var problems = this.state.problems
    var problem = problems.find(function (p) { return p.id === problemId })
    var editedProblem = problem.edited
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

    var editedProblem2 = Object.assign({}, editedProblem, {tags: tags2})
    var problem2 = Object.assign({}, problem, {edited: editedProblem2})
    var problems2 = problems.map(function (ele) {
      if (ele.id === problemId) {
        return problem2
      } else {
        return ele;
      }
    })
    this.setState({problems: problems2})
  },

  editTagDescription: function (problemId, tr_id, description) {
    this.editTagHelper(problemId, tr_id, this.editTagDescriptionHelper, description)
  },

  toggleRemoveTag: function (problemId, tr_id, bool) {
    this.editTagHelper(problemId, tr_id, this.toggleRemoveTagHelper, bool)
  },

  render: function () {
    var actions = {
      editTagDescription: this.editTagDescription,
      toggleRemoveTag: this.toggleRemoveTag,
      addTag: this.addTag,
    }

    var Problems = App.components.tagger.problems.Problems

    var sourceOptions = this.state.sourceOptions.map(function (source) {
      return <option key={source.id} value={source.id}>{source.name}</option>;
    });

    var sectionOptions = this.state.sectionOptions.map(function (section) {
      return <option key={section.id} value={section.id}>{section.name}</option>;
    })

    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='form-group'>
                <label>Source</label>
                <select ref={'sourceSelect'} onChange={this.selectSource} className='form-control'>
                  {sourceOptions}
                </select>
              </div>
              <div className='form-group'>
                <label>Section</label>
                <select ref={'sectionSelect'} onChange={this.selectSection} className='form-control'>
                  {sectionOptions}
                </select>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xs-12'>
              <Problems store={this.state} actions={actions} />
            </div>
          </div>
        </div>
      </div>
    )
  }
})

