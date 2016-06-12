var DisplayParsed = React.createClass({


  render: function () {
    var btnOrNot = (this.props.problems.length)
      ? <button onClick={this.props.actions.clickSave} className='btn btn-success'>Save</button>
      : null

    var parsedProblems = this.props.problems.map(function (problem, i) {
      return <ParsedProblem key={i} problem={problem} />
    })

    return (
      <div className='display-parsed col-xs-6 '>
        {parsedProblems}
        {btnOrNot}
      </div>
    )
  }
})