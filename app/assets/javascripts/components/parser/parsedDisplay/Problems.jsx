
App.components.parser.parsedDisplay.Problems = React.createClass({


  render: function () {
    var that = this;
    var parsedProblems = this.props.problems.map(function (problem, i) {
      return <App.components.parser.parsedDisplay.Problem actions={that.props.actions} key={i} problem={problem} />
    })

    return (
      <div className='display-parsed'>
        {parsedProblems}
      </div>
    )
  }
})