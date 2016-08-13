addActions(function () {

  var _newTagRelationship = App.actionHelpers.newTagRelationship

  var _addTagRelationshipHelper1 = function (state) {
    return function (tagRelationship, tagType) {
      var tagRelationships = tagRelationship.tagRelationships.concat([_newTagRelationship(state, tagType)])
      return Object.assign({}, tagRelationship, {tagRelationships: tagRelationships})
    }
  }

  var _editTagRelationshipHelper = App.actionHelpers.editTagRelationshipHelper
  var _getEditedProblem = App.actionHelpers.getEditedProblem
  var _updateEditedProblem = App.actionHelpers.updateEditedProblem

  return {
    addTagRelationship: function (state, problemId, parentTagRelationshipClientId, tagRelationshipSubType) {
      var tagType
      if (tagRelationshipSubType === 'action') {
        tagType = state.defaults.actionTagType//{id: null, name: '', taggerCanCreateNew: false}
      } else {
        tagType = state.tagTypeOptions.find(function (tt) { return tt.name === tagRelationshipSubType})
      }

      if (parentTagRelationshipClientId) {
        return _editTagRelationshipHelper(state, problemId, parentTagRelationshipClientId, _addTagRelationshipHelper1(state), tagType)
      } else {
        var editedProblem = _getEditedProblem(state, problemId)
        var tagRelationships2 = editedProblem.tagRelationships.concat([
          _newTagRelationship(state, tagType)
        ])
        return _updateEditedProblem(state, problemId, {tagRelationships: tagRelationships2})
      }
    },
  }
});
