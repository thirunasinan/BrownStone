App.components.ProblemsTopicsEditor = React.createClass({

  saveProblemsTopics: function (e) {
    this.props.actions.saveProblemsTopics(this.props.problemId)
  },

  addNewProblemTopic: function () {
    this.props.actions.addProblemTopic(this.props.problemId)
  },

  render: function () {
    var ProblemTopicEditor = App.components.ProblemTopicEditor
    var that = this;

    var buttons = (
      <span>
        <button onClick={this.saveProblemsTopics} className='btn btn-success'>save</button>
        <button onClick={this.addNewProblemTopic} className='btn btn-success'>add new</button>
      </span>
    )

    var problemsTopics = this.props.problemsTopics.map(function (pt) {
      return <ProblemTopicEditor problemTopic={pt}
                          key={pt.clientId}
                          problemId={that.props.problemId}
                          store={that.props.store}
                          actions={that.props.actions} />
    })
    return (
      <div>
        <div className='row'>
          <div className='col-xs-12'>
            Topics Tagger
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            {buttons}
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            {problemsTopics}
          </div>
        </div>
      </div>
    )
  }
})