addActions(function () {

  var _updateTagType = function (tagRelationship, hash) {
    var tagType = tagRelationship.tag.tagType
    var tagType2 = Object.assign({}, tagType, hash)
    return App.actionHelpers.updateTag(tagRelationship, {tagType: tagType2})
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

  return {
    selectTagType: function (state, problemId, tagRelationshipClientId, tagTypeId) {
      return App.actionHelpers.editTagRelationshipHelper(state, problemId, tagRelationshipClientId, selectTagTypeHelper(state), tagTypeId)
    },
  }

})