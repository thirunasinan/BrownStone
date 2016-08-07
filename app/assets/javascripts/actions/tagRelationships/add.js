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

  var _addTagRelationshipHelper1 = function (tagRelationship) {
    console.log('2')
    var tagRelationships = tagRelationship.tagRelationships.concat([_newTagRelationship()])
    return Object.assign({}, tagRelationship, {tagRelationships: tagRelationships})
  }

  var _editTagRelationshipHelper = App.actionHelpers.editTagRelationshipHelper
  var _getEditedProblem = App.actionHelpers.getEditedProblem
  var _updateEditedProblem = App.actionHelpers.updateEditedProblem

  return {
    addTagRelationship: function (state, problemId, parentTagRelationshipClientId) {
      console.log('1')
      if (parentTagRelationshipClientId) {
        return _editTagRelationshipHelper(state, problemId, parentTagRelationshipClientId, _addTagRelationshipHelper1)
      } else {
        var editedProblem = _getEditedProblem(state, problemId)
        var tagRelationships2 = editedProblem.tagRelationships.concat([
          _newTagRelationship()
        ])
        return _updateEditedProblem(state, problemId, {tagRelationships: tagRelationships2})
      }
    },
  }
});