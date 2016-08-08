addActions(function () {



  var _newTagRelationship = function (tagType) {
    return {
      id: null,
      description: null,
      tagRelationships: [],
      tag: {
        isNew: true,
        id: null,
        name: "",
        tagType: tagType,
      },
      clientId: Math.random(),
      isNew: true,
      markedForRemoval: false,
    }
  }

  var _addTagRelationshipHelper1 = function (tagRelationship, tagType) {
    var tagRelationships = tagRelationship.tagRelationships.concat([_newTagRelationship(tagType)])
    return Object.assign({}, tagRelationship, {tagRelationships: tagRelationships})
  }

  var _editTagRelationshipHelper = App.actionHelpers.editTagRelationshipHelper
  var _getEditedProblem = App.actionHelpers.getEditedProblem
  var _updateEditedProblem = App.actionHelpers.updateEditedProblem

  return {
    addTagRelationship: function (state, problemId, parentTagRelationshipClientId, tagRelationshipSubType) {
      var tagType
      if (tagRelationshipSubType === 'action') {
        tagType = {id: nul, name: '', taggerCanCreateNew: false}
      } else {
        tagType = state.tagTypeOptions.find(function (tt) { return tt.name === tagRelationshipSubType})
      }

      if (parentTagRelationshipClientId) {
        return _editTagRelationshipHelper(state, problemId, parentTagRelationshipClientId, _addTagRelationshipHelper1, tagType)
      } else {
        var editedProblem = _getEditedProblem(state, problemId)
        var tagRelationships2 = editedProblem.tagRelationships.concat([
          _newTagRelationship(tagType)
        ])
        return _updateEditedProblem(state, problemId, {tagRelationships: tagRelationships2})
      }
    },
  }
});