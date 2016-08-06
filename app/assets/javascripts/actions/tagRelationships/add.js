// addActions(function () {


//   var _newTagRelationship = function () {
//     return {
//       id: null,
//       description: null,
//       tagRelationships: [],
//       tag: {
//         isNew: true,
//         id: null,
//         name: "",
//         tagType: {
//           id: null,
//           name: "",
//           taggerCanCreateNew: false,
//         }
//       },
//       clientId: Math.random(),
//       isNew: true,
//       markedForRemoval: false,
//     }
//   }

//   var _addTagRelationshipHelper1 = function (tagRelationship) {
//     var tagRelationships = tag.tagRelationships.concat([_newTagRelationship()])
//     return Object.assign({}, tagRelationship, {tagRelationships: tagRelationships})
//   }

//   return {
//     addTagRelationship: function (state, problemId, parentTrId) {
//       if (parentTrId) {
//         return _editTagRelationshipHelper(state, problemId, parentTrId, _addTagRelationshipHelper1)
//       } else {
//         var editedProblem = _getEditedProblem(state, problemId)
//         var tags2 = editedProblem.tags.concat([
//           _newTagRelationship()
//         ])
//         return _updateEditedProblem(state, problemId, {tags: tags2})
//       }
//     },
//   }
// });