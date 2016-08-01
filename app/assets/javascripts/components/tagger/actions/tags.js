addActions(function () {

  var newTag = function () {
    return {
      isNew: true,
      isTagNew: true,
      trId: Math.random(),
      markedForRemoval: false,
      description: null,
      tagId: null,
      name: null,
      hoTrs: []
    }
  }

  var addTagHelper1 = function (tag) {
    var hoTrs2 = tag.hoTrs.concat([this.newTag()])
    return Object.assign({}, tag, {hoTrs: hoTrs2})
  }

  var editTagDescriptionHelper = function (tag, description) {
    return Object.assign({}, tag, {description: description})
  }

  var toggleRemoveTagHelper = function (tag, bool) {
    var that = this;
    if (tag.isNew) {
      return false;
    } else {
      var hoTrs = tag.hoTrs.reduce(function (acc, tr) {
        if (tr.isNew) {
          return acc;
        } else {
          return acc.concat([that.toggleRemoveTagHelper(tr, bool)])
        }
      }, [])
      return Object.assign({}, tag, {markedForRemoval: bool, hoTrs: hoTrs })
    }
  }

  var selectTagTypeHelper = function (state) {
    return function (tag, tagTypeId) {
      if (tagTypeId === "") {
        return Object.assign({}, tag, {
          tagTypeId: null,
          tagTypeName: null,
        })
      } else {
        var tagType = state.tagTypeOptions.find(function (tagType) { return parseInt(tagType.id) === parseInt(tagTypeId)})
        return Object.assign({}, tag, {
          tagTypeId: tagTypeId,
          tagTypeName: tagType.name,
          taggerCanCreateNew: tagType.taggerCanCreateNew,
        })
      }
    }
  }

  var _isProblemValid = function (editedProblem) {
    tags = editedProblem.tags
    var valid = tags.reduce(function (acc, ele) {
      var bad = (ele.isTagNew && (ele.tagTypeName != "KNOW"))
      return acc && !bad
    }, true)
    var errors = valid
    ? []
    : ["cant create new tags unless they are KNOW tags"]

    return {valid: valid, errors: errors}
  }

  var _selectTagSearchResultHelper = function (tag, tagData) {
    return Object.assign({}, tag, {
      isTagNew: false,
      name: tagData.name,
      tagId: tagData.id
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
    return Object.assign({}, tag, {tagId: null, isTagNew: true, name: name})
  }

  var _setTagSearchResults = function (state, data) {
    return Object.assign({}, state, {tagSearchResults: data})
  }



  return {
    addTag: function (state, problemId, parentTrId) {
      if (parentTrId) {
        return App.actionHelpers.editTagHelper(state, problemId, parentTrId, addTagHelper1)
      } else {
        var editedProblem = App.actionHelpers.getEditedProblem(state, problemId)
        var tags2 = editedProblem.tags.concat([
          newTag()
        ])
        return App.actionHelpers.updateEditedProblem(state, problemId, {tags: tags2})
      }
    },

    editTagDescription: function (state, problemId, trId, description) {
      return App.actionHelpers.editTagHelper(state, problemId, trId, editTagDescriptionHelper, description)
    },

    toggleRemoveTag: function (state, problemId, trId, bool) {
      return App.actionHelpers.editTagHelper(state, problemId, trId, toggleRemoveTagHelper, bool)
    },

    selectTagType: function (state, problemId, trId, tagTypeId) {
      return App.actionHelpers.editTagHelper(state, problemId, trId, selectTagTypeHelper(state), tagTypeId)
    },

    selectActionTag: function (state, problemId, trId, actionTagId) {
      var actionTag = state.actionTagOptions.find(function (a) { return a.id == actionTagId})
      return App.actionHelpers.editTagHelper2(state, problemId, trId, {tagTypeId: actionTag.id, tagTypeName: actionTag.name})
    },

    selectTagSearchResult: function (state, problemId, trId, tagData) {
      App.actionHelpers.editTagHelper(state, problemId, trId, _selectTagSearchResultHelper, tagData)
    },


    updateTagSearchQuery: function (state, problemId, trId, tagTypeId, value) {
      var that = this;
      return function (bindAction) {
        var state1 = Object.assign({}, state, {tagSearchQuery: value, searchingTag: trId})
        var state2 = App.actionHelpers.editTagHelper(state, problemId, trId, _updateTagNameHelper, value)

        if (value) {
          $.get(['search_tags', tagTypeId, value].join('/'), function (data) {
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
            data: JSON.stringify({problemId: edited.id, tags: edited.tags}),
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