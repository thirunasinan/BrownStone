var DisplayParsed = React.createClass({


  render: function () {

    var parsedProblems = this.props.problems.map(function (problem, i) {
      return <ParsedProblem key={i} problem={problem} />
    })

    return (
      <div className='display-parsed col-xs-6 '>
        {parsedProblems}
      </div>
    )
  }
})