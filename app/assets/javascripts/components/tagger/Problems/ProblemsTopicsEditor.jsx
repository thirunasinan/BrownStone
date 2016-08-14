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
    var problemsTopics = this.props.problemsTopics.map(function (pt) {
      return <ProblemTopicEditor problemTopic={pt}
                          key={pt.clientId}
                          problemId={that.props.problemId}
                          store={that.props.store}
                          actions={that.props.actions} />
    })
    return (
      <div className='panel panel-success'>
        <div className='tag-panel-body panel-body'>
          <p>Topic Tagger</p>
          <div className='list-group tag-list-group'>
            {problemsTopics}
          </div>
          <a onClick={this.addNewProblemTopic} className='margined-a pull-left'>add topic tag</a>
          <a onClick={this.saveProblemsTopics} className='margined-a pull-right save'>save</a>
        </div>
      </div>
    )
  }
})
