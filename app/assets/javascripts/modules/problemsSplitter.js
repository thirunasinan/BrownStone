App.modules.problemsSplitter = function (text) {

  var regex = '##'

  var result1 = text.split(regex)

  var result5 = result1.filter(function (ele) {
    return ele && ele.length
  }).map(function (ele) {
    return ele.trim()
  })
  return result5;
}