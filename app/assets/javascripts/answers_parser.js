var answersParser = function (text) {

  var regex = /\(?[BCDEFGH]\)/

  var x1 = text.split(regex)

  var x2 = x1.map(function (string) {
    return string.trim()
  })

  var x3 = x2.filter(function (string2) { return string2 && string2.length })

  return x3
}