addActions(function () {

  var _editTagRelationshipDescriptionHelper = function (tagRelationship, description) {
    return Object.assign({}, tagRelationship, {description: description})
  }

  return {
    editTagRelationshipDescription: function (state, problemId, tagRelationshipClientId, description) {
      return App.actionHelpers.editTagRelationshipHelper(state, problemId, tagRelationshipClientId, _editTagRelationshipDescriptionHelper, description)
    },
  }
})