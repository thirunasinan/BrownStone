// addActions(function () {

//   return {
//     toggleTagExplorer: function (state, problemId, tag) {
//       var tagTypeId = tag ? tag.tagTypeId : null
//       var trId = tag ? tag.trId : null
//       return Object.assign({}, state, {tagExplorerActive: !this.state.tagExplorerActive, tagExplorerTrId: trId, tagExplorerProblemId: problemId, tagExplorerTagTypeId: tagTypeId})
//     },

//     updateTagExplorerQuery: function (state, value) {
//       this.setState({tagExplorerQuery: value})
//       var that = this;
//       var tagTypeId = this.state.tagExplorerTagTypeId
//       if (value) {
//         return function (bindAction) {
//           $.get(['search_tags', tagTypeId, value].join('/'), function (data) {
//             var hash = {tagExplorerSearchResults: data}
//             bindAction(function (state, data) { return Object.assign({}, state, hash)})(data)
//           }, 'json')
//         }
//       } else {
//         return Object.assign({}, state, {tagExplorerSearchResults: []})
//       }
//     },
//   }
// })