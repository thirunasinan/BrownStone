var problemsParser = function (text) {
  var problems = problemsSplitter(text)
  var parsedProblems = problems.map(function (problemText) {
    return problemParser(problemText)
  })
  return parsedProblems;
}