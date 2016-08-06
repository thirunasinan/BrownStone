
  // var _updateTagType = function (tagRelationship, hash) {
  //   var tagType = tagRelationship.tag.tagType
  //   var tagType2 = Object.assign({}, tagType, hash)
  //   return _updateTag(tagRelationship, {tagType: tagType2})
  // }





  // var selectTagTypeHelper = function (state) {
  //   return function (tagRelationship, tagTypeId) {
  //     var hash;
  //     if (tagTypeId === "") {
  //       hash = {id: null, name: "", taggerCanCreateNew: false}
  //     } else {
  //       hash = state.tagTypeOptions.find(function (tagType) { return parseInt(tagType.id) === parseInt(tagTypeId)})
  //     }
  //     return _updateTagType(tagRelationship, hash)
  //   }
  // }



  //   selectTagType: function (state, problemId, trId, tagTypeId) {
  //     return _editTagRelationshipHelper(state, problemId, trId, selectTagTypeHelper(state), tagTypeId)
  //   },