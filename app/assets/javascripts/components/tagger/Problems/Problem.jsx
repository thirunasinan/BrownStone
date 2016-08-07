App.components.tagger.problems.Problem = React.createClass({

  getInitialState: function () {
    return {}
  },

  render: function () {
    var problem = this.props.problem
    var originalProblem = problem.original
    var editedProblem = problem.edited

    var alerts
    if (problem.errors) {
      var alerts = problem.errors.map(function (error, index) {
        return (
          <div className={'alert alert-dismissable alert-danger problem-tagger'} role='alert'>
            {error}
          </div>
        )
      })
    } else {
      alerts = null;
    }


    var ProblemDisplay = App.components.tagger.problems.ProblemDisplay
    var Tagger = App.components.tagger.problems.Tagger
    var ProblemsTopicsEditor = App.components.ProblemsTopicsEditor

    var taggerStuff = <Tagger tagRelationshipType={'action'}
                              tagRelationshipSubType={'action'}
                              tagRelationships={editedProblem.tagRelationships}
                              problemId={editedProblem.id}
                              store={this.props.store}
                              parentTagRelationshipClientId={null}
                              actions={this.props.actions} />

    return (
      <div className='row'>
        <div className='col-xs-5'>
          <ProblemDisplay problem={originalProblem} />
        </div>
        <div className='col-xs-7'>
          <div>
            {alerts}
          </div>
          <ProblemsTopicsEditor problemsTopics={editedProblem.problemsTopics} actions={this.props.actions} problemId={editedProblem.id} store={this.props.store}/>
          {taggerStuff}
        </div>
      </div>
    )
  }
})