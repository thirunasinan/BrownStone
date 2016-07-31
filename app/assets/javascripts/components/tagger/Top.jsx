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
      subjectOptions: [],
      topicOptions: [],
      problems: [],
      tagSearchQuery: null,
      searchingTag: null,
      tagSearchResults: [],
      hoveredTagSearchResult: null,
      tagTypeOptions: [],
      actionTagTypeOptions: [],
      actionTagOptions: [],
      tagExplorerActive: false,
      tagExplorerQuery: null,
      tagExplorerTrId: null,
      tagExplorerProblemId: null,
      tagExplorerTagTypeId: null,
      tagExplorerSearchResults: []
    }
  },

  componentDidMount: function () {
    var that = this;
    $.get('sources_for_select', function (data) {
      var sources = [{id: null, name: 'None'}].concat(data)
      that.setState({sourceOptions: sources})
    })
    $.get('tag_types_for_select', function (data) {
      var options = [{id: null, name: ''}].concat(data.all)
      that.setState({tagTypeOptions: options})
      var options2 = [{id: null, name: ''}].concat(data.actionTagTypes)
      that.setState({actionTagTypeOptions: options2})
    })
    $.get('action_tags_for_select', function (data) {
      var options = [{id: null, name: ''}].concat(data)
      that.setState({actionTagOptions: options})
    })
    $.get('subjects_for_select', function (data) {
      var options = [{id: null, name: ''}].concat(data)
      that.setState({subjectOptions: options})
    })
    $.get('topics_for_select', function (data) {
      var options = [{id: null, name: ''}].concat(data)
      that.setState({topicOptions: options})
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

  newTopic: function () {
    return {
      topic_rel_id: Math.random(),
      topic_id: null,
      is_new: true,
      name: '',
      subject_id: null,
      markedForRemoval: false,
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

  updateArray: function (array, newEle, prop) {
    return array.map(function (ele) {
      if (ele[prop] === newEle[prop]) {
        return newEle
      } else {
        return ele
      }
    })
  },

  updateTopicRelHelper: function (problemId, topic_rel_id, hash) {
    var problems = this.state.problems
    var problem = problems.find(function (p) { return p.id === problemId})
    var topics = problem.edited.topics
    var topic = topics.find(function (t) { return t.topic_rel_id === topic_rel_id })
    var editedTopic = Object.assign({}, topic, hash)
    var editedTopics = this.updateArray(topics, editedTopic, 'topic_rel_id')
    this.updateEditedProblem(problemId, {topics: editedTopics})
  },

  selectSubjectForTopic: function (problemId, topic_rel_id, subject_id) {
    this.updateTopicRelHelper(problemId, topic_rel_id, {subject_id: subject_id})
  },

  addTopic: function (problemId) {
    var problems = this.state.problems
    var problem = problems.find(function (p) { return p.id === problemId})
    var topics = problem.edited.topics.concat([
      this.newTopic()
    ])
    this.updateEditedProblem(problemId, {topics: topics})
  },

  getEditedProblem: function (problemId) {
    return this.state.problems.find(function (p) { return parseInt(p.id) === parseInt(problemId)}).edited
  },

  getTopicRel: function (problemId, topic_rel_id) {
    var ep = this.getEditedProblem(problemId)
    var topic = ep.topics.find(function (t) { return t.topic_rel_id === topic_rel_id})
    return topic
  },

  toggleRemoveTopic: function (problemId, topic_rel_id) {
    var topic = this.getTopicRel(problemId, topic_rel_id)
    if (topic.is_new) {
      ep = this.getEditedProblem(problemId)
      topics = ep.topics.filter(function (t) { return t.topic_rel_id !== topic_rel_id})
      this.updateEditedProblem(problemId, {topics: topics})
    } else {
      this.updateTopicRelHelper(problemId, topic_rel_id, {markedForRemoval: !topic.markedForRemoval})
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

  selectTagTypeHelper: function (tag, tag_type_id) {
    if (tag_type_id === "") {
      return Object.assign({}, tag, {
        tag_type_id: null,
        tag_type_name: null,
      })
    } else {
      var tag_type = this.state.tagTypeOptions.find(function (tagType) { return parseInt(tagType.id) === parseInt(tag_type_id)})
      return Object.assign({}, tag, {
        tag_type_id: tag_type_id,
        tag_type_name: tag_type.name,
        tagger_can_create_new: tag_type.tagger_can_create_new,
      })
    }
  },

  selectTagType: function (problemId, tr_id, tag_type_id) {
    this.editTagHelper(problemId, tr_id, this.selectTagTypeHelper, tag_type_id)
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

  updateTagSearchQuery: function (problemId, tr_id, tag_type_id, value) {
    this.setState({tagSearchQuery: value, searchingTag: tr_id})
    this.editTagHelper(problemId, tr_id, this.updateTagNameHelper, value)
    var that = this;
    if (value) {
      $.get(['search_tags', tag_type_id, value].join('/'), function (data) {
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

  isProblemValid: function (editedProblem) {
    tags = editedProblem.tags
    var valid = tags.reduce(function (acc, ele) {
      var bad = (ele.is_tag_new && (ele.tag_type_name != "KNOW"))
      return acc && !bad
    }, true)
    var errors = valid
    ? []
    : ["cant create new tags unless they are KNOW tags"]

    return {valid: valid, errors: errors}
  },

  saveTags: function (problemId) {
    var problem = this.state.problems.find(function (p) { return p.id === problemId})
    var edited = problem.edited
    validHash = this.isProblemValid(edited)
    if (validHash.valid) {
      var that = this;
      $.ajax({
        type: 'POST',
        url: 'tags',
        data: JSON.stringify({problem_id: edited.id, tags: edited.tags}),
        success: that.saveTagsSuccess,
        dataType: 'json',
        contentType: 'application/json'
      })
    } else {
      var newProblems = this.state.problems.map(function (p) {
        if (p.id === problemId) {
          return Object.assign({}, p, {errors: validHash.errors})
        } else {
          return p
        }
      })
      this.setState({problems: newProblems})
    }
  },

  toggleTagExplorer: function (problemId, tag) {
    var tag_type_id = tag ? tag.tag_type_id : null
    var tr_id = tag ? tag.tr_id : null
    this.setState({tagExplorerActive: !this.state.tagExplorerActive, tagExplorerTrId: tr_id, tagExplorerProblemId: problemId, tagExplorerTagTypeId: tag_type_id})
  },

  updateTagExplorerQuery: function (value) {
    this.setState({tagExplorerQuery: value})
    var that = this;
    var tag_type_id = this.state.tagExplorerTagTypeId
    if (value) {
      $.get(['search_tags', tag_type_id, value].join('/'), function (data) {
        that.setState({tagExplorerSearchResults: data})
      }, 'json')
    } else {
      this.setState({tagExplorerSearchResults: []})
    }
  },

  selectTopic: function (problemId, topic_rel_id, topic_id) {
    this.updateTopicRelHelper(problemId, topic_rel_id, {topic_id: topic_id})
  },

  saveTopics: function (problemId) {
    var problem = this.state.problems.find(function (p) { return p.id === problemId})
    var edited = problem.edited
    var that = this;
    $.ajax({
      type: 'POST',
      url: 'problems_topics',
      data: JSON.stringify({data: {problem_id: edited.id, problems_topics: edited.topics}}),
      success: that.saveTopicsSuccess,
      dataType: 'json',
      contentType: 'application/json'
    })
  },

  saveTopicsSuccess: function (data) {
    this.updateEditedProblem(data.problem_id, {topics: data.problems_topics})
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
      'selectTagType',
      'toggleTagExplorer',
      'updateTagExplorerQuery',
      'addTopic',
      'selectSubjectForTopic',
      'selectTopic',
      'saveTopics',
      'toggleRemoveTopic'
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
        <App.components.Modal active={this.state.tagExplorerActive} actions={actions} store={this.state} />
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

