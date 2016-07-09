App.components.parser.parsedDisplay.Problem = React.createClass({

  render: function () {

    var _parseMarkdown = App.modules.parseMarkdown;
    var parsedQuestion = _parseMarkdown(this.props.problem.question)

    var answerChoices = this.props.problem.answerChoices.map(function (ac, i) {
      var letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G'][i];

      var parsedAc = _parseMarkdown(ac)
      return (
        <div key={i} className='row'>
          <strong className='col-xs-2'>{letter}</strong>
          <div className='col-xs-10 preserve-newlines'>{parsedAc}</div>
        </div>
      );
    })


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