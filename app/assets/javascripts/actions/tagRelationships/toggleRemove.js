addActions(function () {

  var _toggleRemoveTagRelationshipHelper = function (tagRelationship, bool) {
    var that = this;
    if (tagRelationship.isNew) {
      return false;
    } else {
      var hoTrs = tagRelationship.tagRelationships.reduce(function (acc, tr) {
        if (tr.isNew) {
          return acc;
        } else {
          return acc.concat([_toggleRemoveTagRelationshipHelper(tr, bool)])
        }
      }, [])
      return Object.assign({}, tagRelationship, {markedForRemoval: bool, tagRelationships: hoTrs })
    }
  }


  return {
    toggleRemoveTagRelationship: function (state, problemId, trId, bool) {
      return App.actionHelpers.editTagRelationshipHelper(state, problemId, trId, _toggleRemoveTagRelationshipHelper, bool)
    }
  }
})