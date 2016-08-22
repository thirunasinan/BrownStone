addActions(function () {

  return {
    updateState: function (state, hash) {
      return Object.assign(state, hash)
    }
  }
})
