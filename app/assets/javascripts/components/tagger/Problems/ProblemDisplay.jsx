App.components.tagger.problems.ProblemDisplay = React.createClass({

  render: function () {
    var TagsDisplay = App.components.tagger.problems.TagsDisplay
    var problem = this.props.problem
    var answerChoices = problem.answerChoices.map(function (ac, i) {
      var letter = ["A", "B", 'C', 'D', 'E', 'F', 'G'][i]
      return (
        <div key={i} className='list-group-item'>
          <div className='row'>
            <div className='col-xs-1'>
              <strong>{letter}</strong>
            </div>
            <div className='col-xs-11'>
              {ac.text}
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className='panel panel-info'>
        <div className='panel-heading'>
          {problem.name}
        </div>
        <div className='panel-body'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='list-group'>
                <div className='list-group-item'>{problem.question}</div>
              </div>
            </div>
          </div>
          <div className='list-group'>
            {answerChoices}
          </div>
        </div>
      </div>
    )
  }
})