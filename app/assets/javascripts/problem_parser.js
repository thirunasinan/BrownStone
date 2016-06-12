var problemParser = function (text) {
  var regex = /\(?[A]\)/
  var arr = text.split(regex)

  if (arr.length > 1) {
    var nqText = arr[0]
    var nq = numberAndQuestionParser(nqText)

    var answersText = arr[1]
    var answers = answersParser(answersText)
  } else {
    answers = []
    var regex = /(\d+)\./
    var x1 = arr[0].split(regex)
    var x = x1.filter(function (ele) { return ele && ele.length > 0 })
    if (x1.length > 1) {
      nq = {number: x[0], question: (x[1] ? x[1].trim() : null)}
    } else {
      nq = {number: null, question: null}
    }
  }


  return {
    number: nq.number,
    question: nq.question,
    answerChoices: answers
  }
}

