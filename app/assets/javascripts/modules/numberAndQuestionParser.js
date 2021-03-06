App.modules.numberAndQuestionParser = function (text) {
  if (!text) return {number: null, question: null}
  var regex = /(\d+\.)/
  var split = text.split(regex).filter(function (x) { return x && x.length })
  if (split.length == 0) {
    var number = null;
    var question = split[0] || null
  } else {
    var preNumber = split[0]
    var number = preNumber.slice(0, preNumber.length - 1) // remove dot
    var question = text.slice(preNumber.length, text.length).trim() // + 1 is to remove space at beginning
  }
  var result = {number: number, question: question}
  return result
}