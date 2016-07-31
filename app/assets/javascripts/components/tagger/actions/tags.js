addActions(function () {

  var newTag = function () {
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
  }

  var addTagHelper1 = function (tag) {
    var ho_trs2 = tag.ho_trs.concat([this.newTag()])
    return Object.assign({}, tag, {ho_trs: ho_trs2})
  }

  var editTagDescriptionHelper = function (tag, description) {
    return Object.assign({}, tag, {description: description})
  }

  var toggleRemoveTagHelper = function (tag, bool) {
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
  }

  var selectTagTypeHelper = function (state) {
    return function (tag, tag_type_id) {
      if (tag_type_id === "") {
        return Object.assign({}, tag, {
          tag_type_id: null,
          tag_type_name: null,
        })
      } else {
        var tag_type = state.tagTypeOptions.find(function (tagType) { return parseInt(tagType.id) === parseInt(tag_type_id)})
        return Object.assign({}, tag, {
          tag_type_id: tag_type_id,
          tag_type_name: tag_type.name,
          tagger_can_create_new: tag_type.tagger_can_create_new,
        })
      }
    }
  }

  var _isProblemValid = function (editedProblem) {
    tags = editedProblem.tags
    var valid = tags.reduce(function (acc, ele) {
      var bad = (ele.is_tag_new && (ele.tag_type_name != "KNOW"))
      return acc && !bad
    }, true)
    var errors = valid
    ? []
    : ["cant create new tags unless they are KNOW tags"]

    return {valid: valid, errors: errors}
  }

  var _selectTagSearchResultHelper = function (tag, tagData) {
    return Object.assign({}, tag, {
      is_tag_new: false,
      name: tagData.name,
      tag_id: tagData.id
    })
  }

  var _saveTagsSuccess = function (state, data) {
    problems = this.state.problems
    problems2 = problems.map(function (ele) {
      if (ele.id === data.id) {
        return {id: data.id, original: data, edited: data}
      } else {
        return ele
      }
    })
    return Object.assign({}, state, {problems: problems2})
  }

  var _updateTagNameHelper = function (tag, name) {
    return Object.assign({}, tag, {tag_id: null, is_tag_new: true, name: name})
  }

  var _setTagSearchResults = function (state, data) {
    return Object.assign({}, state, {tagSearchResults: data})
  }



  return {
    addTag: function (state, problemId, parent_tr_id) {
      if (parent_tr_id) {
        return App.actionHelpers.editTagHelper(state, problemId, parent_tr_id, addTagHelper1)
      } else {
        var editedProblem = App.actionHelpers.getEditedProblem(state, problemId)
        var tags2 = editedProblem.tags.concat([
          newTag()
        ])
        return App.actionHelpers.updateEditedProblem(state, problemId, {tags: tags2})
      }
    },

    editTagDescription: function (state, problemId, tr_id, description) {
      return App.actionHelpers.editTagHelper(state, problemId, tr_id, editTagDescriptionHelper, description)
    },

    toggleRemoveTag: function (state, problemId, tr_id, bool) {
      return App.actionHelpers.editTagHelper(state, problemId, tr_id, toggleRemoveTagHelper, bool)
    },

    selectTagType: function (state, problemId, tr_id, tag_type_id) {
      return App.actionHelpers.editTagHelper(state, problemId, tr_id, selectTagTypeHelper(state), tag_type_id)
    },

    selectActionTag: function (state, problemId, tr_id, action_tag_id) {
      var action_tag = state.actionTagOptions.find(function (a) { return a.id == action_tag_id})
      return App.actionHelpers.editTagHelper2(state, problemId, tr_id, {tag_type_id: action_tag.id, tag_type_name: action_tag.name})
    },

    selectTagSearchResult: function (state, problemId, tr_id, tagData) {
      App.actionHelpers.editTagHelper(state, problemId, tr_id, _selectTagSearchResultHelper, tagData)
    },


    updateTagSearchQuery: function (state, problemId, tr_id, tag_type_id, value) {
      var that = this;
      return function (bindAction) {
        var state1 = Object.assign({}, state, {tagSearchQuery: value, searchingTag: tr_id})
        var state2 = App.actionHelpers.editTagHelper(state, problemId, tr_id, _updateTagNameHelper, value)

        if (value) {
          $.get(['search_tags', tag_type_id, value].join('/'), function (data) {
            bindAction(_setTagSearchResults)(data)
          }, 'json')
        } else {
          bindAction(_setTagSearchResults)(data)
        }
      }
    },

    hoverTagSearchResult: function (state, data) {
      return Object.assign({}, state, {hoveredTagSearchResult: data})
    },

    stopHoverTagSearchResult: function (state, data) {
      var x = state.hoveredTagSearchResult
      var hash;
      if (x && x.id && x.id === data.id) {
        hash = {hoveredTagSearchResult: null}
      } else {
        hash = {}
      }
      return Object.assign({}, state, hash)
    },

    saveTags: function (state, problemId) {
      var editedProblem = App.actionHelpers.getEditedProblem(state, problemId)
      validHash = _isProblemValid(edited)
      if (validHash.valid) {
        var that = this;
        return function (bindAction) {
          $.ajax({
            type: 'POST',
            url: 'tags',
            data: JSON.stringify({problem_id: edited.id, tags: edited.tags}),
            success: function (data) {
              bindAction(_saveTagsSuccess)(data)
            },
            dataType: 'json',
            contentType: 'application/json'
          })
        }
      } else {
        var newProblems = this.state.problems.map(function (p) {
          if (p.id === problemId) {
            return Object.assign({}, p, {errors: validHash.errors})
          } else {
            return p
          }
        })
        return Object.assign({}, state, {problems: newProblems})
      }
    }
  }
})