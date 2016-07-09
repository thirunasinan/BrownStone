App.modules.problemParser = function (text) {
  var _numberAndQuestionParser = App.modules.numberAndQuestionParser;
  var _answersParser = App.modules.answersParser;
  var _parseNewlines = App.modules.parseNewlines;

  var regex = /\(?[A]\)/
  var arr = text.split(regex)
  var nqText = arr[0]
  var nq = _numberAndQuestionParser(nqText)
  var answers;

  if (arr.length > 1) {
    var answersText = arr[1]
    var answers = _answersParser(answersText)
  } else {
    answers = []
  }

  return {
    number: nq.number,
    question: nq.question,
    answerChoices: answers
  }
}

