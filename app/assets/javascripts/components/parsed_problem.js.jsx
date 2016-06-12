var ParsedProblem = React.createClass({

  render: function () {

    var answerChoices = this.props.problem.answerChoices.map(function (ac, i) {
      var letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G'][i];

      return (
        <div key={i} className='row'>
          <strong className='col-xs-2'>{letter}</strong>
          <div className='col-xs-10 latex'>{ac}</div>
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
            <div className='col-xs-10 latex'>{this.props.problem.question}</div>
          </div>

          {answerChoices}
        </div>
      </div>

    )
  }
})