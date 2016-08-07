addActionHelpers(function () {

  return {
    newState: function (state, hash) {
      return Object.assign({}, state, hash)
    },

    updateArray: function (array, newEle, prop) {
      return array.map(function (ele) {
        if (ele[prop] === newEle[prop]) {
          return newEle
        } else {
          return ele
        }
      })
    },
  }
})