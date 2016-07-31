App.modules.reduxLite = function (component) {

  _bindAction = function (fn, callback) {
    return function () {
      argArray = Array.prototype.slice.call(arguments)
      argArray.unshift(component.state)
      var result = fn.apply(null, argArray)
      if (isFunction(result)) {
        result(_bindAction)
      } else {
        component.setState(result, callback)
      }
    }
  }

  return function (actions) {
    return Object.keys(actions).reduce(function (acc, ele) {
      var action = actions[ele]
      acc[ele] = _bindAction(action)
      return acc;
    }, {})
  }
}