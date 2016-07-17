App.components.tagger.problems.Problem = React.createClass({

  getInitialState: function () {
    return {}
  },

  render: function () {

    var originalProblem = this.props.problem.original
    var editedProblem = this.props.problem.edited
    console.log('editedProblem', editedProblem)

    var ProblemDisplay = App.components.tagger.problems.ProblemDisplay
    var Tagger = App.components.tagger.problems.Tagger
    return (
      <div className='row'>
        <div className='col-xs-5'>
          <ProblemDisplay problem={originalProblem} />
        </div>
        <div className='col-xs-7'>
          <Tagger isSubTags={false} tags={editedProblem.tags} problemId={editedProblem.id} store={this.props.store} actions={this.props.actions} />
        </div>
      </div>
    )
  }
})