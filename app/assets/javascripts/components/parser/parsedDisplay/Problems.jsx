
App.components.parser.parsedDisplay.Problems = React.createClass({


  render: function () {

    var parsedProblems = this.props.problems.map(function (problem, i) {
      return <App.components.parser.parsedDisplay.Problem key={i} problem={problem} />
    })

    return (
      <div className='display-parsed col-xs-6 '>
        {parsedProblems}
      </div>
    )
  }
})