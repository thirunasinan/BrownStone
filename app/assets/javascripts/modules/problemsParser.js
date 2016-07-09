App.modules.problemsParser = function (text) {
  var _problemsSplitter = App.modules.problemsSplitter;
  var _problemParser = App.modules.problemParser;

  var problems = _problemsSplitter(text)
  var parsedProblems = problems.map(function (problemText) {
    return _problemParser(problemText)
  })
  return parsedProblems;
}