addActions(function () {

  var _newTagRelationship = function () {
    return {
      id: null,
      description: null,
      tagRelationships: [],
      tag: {
        isNew: true,
        id: null,
        name: "",
        tagType: {
          id: null,
          name: "",
          taggerCanCreateNew: false,
        }
      },
      clientId: Math.random(),
      isNew: true,
      markedForRemoval: false,
    }
  }

  var _updateTag = function (tagRelationship, hash) {
    var tag = tagRelationship.tag
    var tag2 = Object.assign({}, tag, hash)
    return Object.assign({}, tagRelationship, {tag: tag2})
  }

  var _updateTagType = function (tagRelationship, hash) {
    var tagType = tagRelationship.tag.tagType
    var tagType2 = Object.assign({}, tagType, hash)
    return _updateTag(tagRelationship, {tagType: tagType2})
  }

  var _addTagRelationshipHelper1 = function (tagRelationship) {
    var tagRelationships = tag.tagRelationships.concat([_newTagRelationship()])
    return Object.assign({}, tagRelationship, {tagRelationships: tagRelationships})
  }

  var _editTagRelationshipDescriptionHelper = function (tagRelationship, description) {
    return Object.assign({}, tagRelationship, {description: description})
  }

  var _editTagRelationshipHelper = App.actionHelpers.editTagRelationshipHelper
  var _editTagRelationshipHelper2 = App.actionHelpers.editTagRelationshipHelper2
  var _newState = App.actionHelpers.newState
  var _getEditedProblem = App.actionHelpers.getEditedProblem
  var _updateEditedProblem = App.actionHelpers.updateEditedProblem

  var toggleRemoveTagRelationshipHelper = function (tagRelationship, bool) {
    var that = this;
    if (tagRelationship.isNew) {
      return false;
    } else {
      var hoTrs = tagRelationship.tagRelationships.reduce(function (acc, tr) {
        if (tr.isNew) {
          return acc;
        } else {
          return acc.concat([that.toggleRemoveTagHelper(tr, bool)])
        }
      }, [])
      return Object.assign({}, tagRelationship, {markedForRemoval: bool, tagRelationships: hoTrs })
    }
  }

  var selectTagTypeHelper = function (state) {
    return function (tagRelationship, tagTypeId) {
      var hash;
      if (tagTypeId === "") {
        hash = {id: null, name: "", taggerCanCreateNew: false}
      } else {
        hash = state.tagTypeOptions.find(function (tagType) { return parseInt(tagType.id) === parseInt(tagTypeId)})
      }
      return _updateTagType(tagRelationship, hash)
    }
  }

  var _selectTagSearchResultHelper = function (tagRelationship, tag) {
    tag.isNew = false
    return _updateTag(tagRelationship, tag)
  }

  var _saveTagsSuccess = function (state, data) {
    problems = state.problems
    problems2 = problems.map(function (ele) {
      if (ele.id === data.id) {
        return {id: data.id, original: data, edited: data}
      } else {
        return ele
      }
    })
    return Object.assign({}, state, {problems: problems2})
  }

  var _updateTagNameHelper = function (tagRelationship, name) {
    return _updateTag(tagRelationship, {id: null, isNew: true, name: name})
  }

  var _setTagSearchResults = function (state, data) {
    return _newState(state, {tagSearchResults: data})
  }



  return {
    addTag: function (state, problemId, parentTrId) {
      if (parentTrId) {
        return _editTagRelationshipHelper(state, problemId, parentTrId, _addTagRelationshipHelper1)
      } else {
        var editedProblem = _getEditedProblem(state, problemId)
        var tags2 = editedProblem.tags.concat([
          _newTagRelationship()
        ])
        return _updateEditedProblem(state, problemId, {tags: tags2})
      }
    },

    editTagDescription: function (state, problemId, trId, description) {
      return _editTagRelationshipHelper(state, problemId, trId, _editTagRelationshipDescriptionHelper, description)
    },

    toggleRemoveTag: function (state, problemId, trId, bool) {
      return _editTagRelationshipHelper(state, problemId, trId, toggleRemoveTagHelper, bool)
    },

    selectTagType: function (state, problemId, trId, tagTypeId) {
      return _editTagRelationshipHelper(state, problemId, trId, selectTagTypeHelper(state), tagTypeId)
    },

    selectActionTag: function (state, problemId, trId, actionTagId) {
      var actionTag = state.actionTagOptions.find(function (a) { return a.id == actionTagId})
      return _editTagRelationshipHelper2(state, problemId, trId, {tagId: actionTag.id, tagName: actionTag.name, isNew: false})
    },



    saveTags: function (state, problemId) {
      var edited = _getEditedProblem(state, problemId)
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
    }
  }
})