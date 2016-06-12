var ParsedProblem = React.createClass({

  render: function () {

    var answerChoices = this.props.problem.answerChoices.map(function (ac, i) {
      var letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G'][i];

      return (
        <div key={i} className='form-group'>
          <label className='control-label col-xs-2'>{letter}</label>
          <div className='col-xs-10'>
            <textarea className='form-control' value={ac} />
          </div>
        </div>
      );
    })

    return (
      <div className='parsed-problem panel panel-default'>
        <form className='form-horizontal panel-body'>
          <div className='form-group'>
            <label className='control-label col-xs-2'>Number</label>
            <div className='col-xs-10'>
              <input className='form-control' value={this.props.problem.number}/>
            </div>
          </div>

          <div className='form-group'>
            <label className='col-xs-2'>Question</label>
            <div className='col-xs-10'>
              <textarea className='form-control' value={this.props.problem.question} />
            </div>
          </div>

          {answerChoices}
        </form>
      </div>

    )
  }
})