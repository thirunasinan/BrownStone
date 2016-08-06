// addActions(function () {
//   var _saveTagRelationshipsSuccess = function (state, data) {
//     problems = state.problems
//     problems2 = problems.map(function (ele) {
//       if (ele.id === data.id) {
//         return {id: data.id, original: data, edited: data}
//       } else {
//         return ele
//       }
//     })
//     return Object.assign({}, state, {problems: problems2})
//   }

//   return {

//     saveTagRelationships: function (state, problemId) {
//       var edited = _getEditedProblem(state, problemId)
//       var that = this;
//       return function (bindAction) {
//         $.ajax({
//           type: 'POST',
//           url: 'tags',
//           data: JSON.stringify({problemId: edited.id, tagRelationships: edited.tagRelationships}),
//           success: function (data) {
//             bindAction(_saveTagRelationshipsSuccess)(data)
//           },
//           dataType: 'json',
//           contentType: 'application/json'
//         })
//       }
//     }
//   }
// })