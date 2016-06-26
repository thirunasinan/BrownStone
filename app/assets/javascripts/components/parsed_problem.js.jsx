var pmHelper = function (start, end, length) {
  return function (match) {
    return start + match.slice(length, match.length - length) + end
  }
}

var parseMarkdown = function (string) {
  if (!string) {
    return ""
  } else {
    // bold, italic, underline
    var parsedBold = string.replace(/\*\*[\s\S]*\*\*/g, pmHelper('<strong>', '</strong>', 2))
    var parsedItalics = parsedBold.replace(/\*[\s\S]*\*/g, pmHelper('<i>', '</i>', 1))
    var parsedUnderline = parsedItalics.replace(/\_[\s\S]*\_/g, pmHelper('<u>', '</u>', 1))
    return parsedUnderline;
  }
}


var ParsedProblem = React.createClass({

  render: function () {

    var answerChoices = this.props.problem.answerChoices.map(function (ac, i) {
      var letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G'][i];

      var parsedAc = parseMarkdown(ac)
      return (
        <div key={i} className='row'>
          <strong className='col-xs-2'>{letter}</strong>
          <div className='col-xs-10 preserve-newlines'>{parsedAc}</div>
        </div>
      );
    })

    var parsedQuestion = parseMarkdown(this.props.problem.question)

    return (
      <div className='parsed-problem panel panel-default'>
        <div className='panel-body'>
          <div className='row'>
            <strong className='col-xs-2'>Number</strong>
            <div className='col-xs-10'>{this.props.problem.number}</div>
          </div>

          <div className='row'>
            <strong className='col-xs-2'>Question</strong>
            <div className='col-xs-10 preserve-newlines' dangerouslySetInnerHTML={{__html: parsedQuestion}} />
          </div>

          {answerChoices}
        </div>
      </div>

    )
  }
})