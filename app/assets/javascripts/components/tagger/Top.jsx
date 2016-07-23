function autoresizeTextareaHelper(e) {
  $(e).css({'height':'auto','overflow-y':'hidden'}).height(e.scrollHeight);
}

App.modules.autoresizeTextarea  = function () {
  $('textarea.autoresize').each(function () {
    autoresizeTextareaHelper(this);
  }).on('input', function () {
    autoresizeTextareaHelper(this);
  });
}


App.components.tagger.Top = React.createClass({

  getInitialState: function () {
    return {
      sourceOptions: [],
      sectionOptions: [],
      problems: [],
      tagSearchQuery: null,
      searchingTag: null,
      tagSearchResults: [],
      hoveredTagSearchResult: null
    }
  },

  componentDidMount: function () {
    var that = this;
    $.get('sources_for_select', function (data) {
      var sources = [{id: null, name: 'None'}].concat(data)
      that.setState({sourceOptions: sources})
    })
    this.loadProblemsBySource(3)
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

  selectTagSearchResult: function (problemId, tr_id, tagData) {
    console.log('selectTagSearchResultHelper', problemId, tr_id, tagData)
    this.editTagHelper(problemId, tr_id, this.selectTagSearchResultHelper, tagData)
  },

  selectTagSearchResultHelper: function (tag, tagData) {
    return Object.assign({}, tag, {
      is_tag_new: false,
      name: tagData.name,
      tag_id: tagData.id
    })
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
    var ho_trs2 = tag.ho_trs.concat([this.newTag()])
    return Object.assign({}, tag, {ho_trs: ho_trs2})
  },

  newTag: function () {
    return {
      is_new: true,
      is_tag_new: true,
      tr_id: Math.random(),
      markedForRemoval: false,
      description: null,
      tag_id: null,
      name: null,
      ho_trs: []
    }
  },

  addTag: function (problemId, parent_tr_id) {
    if (parent_tr_id) {
      this.editTagHelper(problemId, parent_tr_id, this.addTagHelper1)
    } else {
      var problems = this.state.problems
      var problem = problems.find(function (p) { return p.id === problemId})
      var tags2 = problem.edited.tags.concat([
        this.newTag()
      ])
      this.updateEditedProblem(problemId, {tags: tags2})
    }
  },

  updateEditedProblem: function (problemId, hash) {
    var problem = this.state.problems.find(function (p) { return p.id === problemId})
    var editedProblem2 = Object.assign({}, problem.edited, hash)
    var problem2 = Object.assign({}, problem, {edited: editedProblem2})
    var problems2 = this.state.problems.map(function (ele) {
      if (ele.id === problemId) {
        return problem2
      } else {
        return ele;
      }
    })
    this.setState({problems: problems2})
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


    this.updateEditedProblem(problemId, {tags: tags2})
  },

  editTagDescription: function (problemId, tr_id, description) {
    this.editTagHelper(problemId, tr_id, this.editTagDescriptionHelper, description)
  },

  toggleRemoveTag: function (problemId, tr_id, bool) {
    this.editTagHelper(problemId, tr_id, this.toggleRemoveTagHelper, bool)
  },

  updateTagNameHelper: function (tag, name) {
    return Object.assign({}, tag, {tag_id: null, is_tag_new: true, name: name})
  },

  updateTagSearchQuery: function (problemId, tr_id, value) {
    this.setState({tagSearchQuery: value, searchingTag: tr_id})
    this.editTagHelper(problemId, tr_id, this.updateTagNameHelper, value)
    var that = this;
    if (value) {
      $.get('search_tags/' + value, function (data) {
        that.setState({tagSearchResults: data})
      }, 'json')
    } else {
      this.setState({tagSearchResults: []})
    }
  },

  hoverTagSearchResult: function (data) {
    this.setState({hoveredTagSearchResult: data})
  },

  stopHoverTagSearchResult: function (data) {
    var x = this.state.hoveredTagSearchResult
    if (x && x.id && x.id === data.id) {
      this.setState({hoveredTagSearchResult: null})
    }
  },

  saveTagsSuccess: function (data) {
    problems = this.state.problems
    problems2 = problems.map(function (ele) {
      if (ele.id === data.id) {
        return {id: data.id, original: data, edited: data}
      } else {
        return ele
      }
    })
    this.setState({problems: problems2})
  },

  saveTags: function (problemId) {
    var problem = this.state.problems.find(function (p) { return p.id === problemId})
    var edited = problem.edited
    var that = this;
    $.ajax({
      type: 'POST',
      url: 'tags',
      data: JSON.stringify({problem_id: edited.id, tags: edited.tags}),
      success: that.saveTagsSuccess,
      dataType: 'json',
      contentType: 'application/json'
    })
  },

  render: function () {
    var that = this;
    var actions = [
      'editTagDescription',
      'toggleRemoveTag',
      'addTag',
      'updateTagSearchQuery',
      'hoverTagSearchResult',
      'stopHoverTagSearchResult',
      'selectTagSearchResult',
      'saveTags',
    ].reduce(function (acc, ele) {
      acc[ele] = that[ele]
      return acc
    }, {})

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

