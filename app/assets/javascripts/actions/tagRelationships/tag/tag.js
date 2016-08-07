addActions(function () {
  return {
    selectActionTag: function (state, problemId, tagRelationshipClientId, actionTagId) {
      console.log('selectActionTag', problemId, tagRelationshipClientId, actionTagId)
      var actionTag = state.actionTagOptions.find(function (a) { return parseInt(a.id) == parseInt(actionTagId)})
      return App.actionHelpers.editTagRelationshipHelper2(
        state,
        problemId,
        tagRelationshipClientId,
        {tag: actionTag}
      )
    },
  }
})