addActions(function () {

  return {
    toggleTagExplorer: function (state, problemId, tag) {
      var tag_type_id = tag ? tag.tag_type_id : null
      var tr_id = tag ? tag.tr_id : null
      return Object.assign({}, state, {tagExplorerActive: !this.state.tagExplorerActive, tagExplorerTrId: tr_id, tagExplorerProblemId: problemId, tagExplorerTagTypeId: tag_type_id})
    },

    updateTagExplorerQuery: function (state, value) {
      this.setState({tagExplorerQuery: value})
      var that = this;
      var tag_type_id = this.state.tagExplorerTagTypeId
      if (value) {
        return function (bindAction) {
          $.get(['search_tags', tag_type_id, value].join('/'), function (data) {
            var hash = {tagExplorerSearchResults: data}
            bindAction(function (state, data) { return Object.assign({}, state, hash)})(data)
          }, 'json')
        }
      } else {
        return Object.assign({}, state, {tagExplorerSearchResults: []})
      }
    },
  }
})