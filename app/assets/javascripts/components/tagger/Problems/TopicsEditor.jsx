App.components.TopicsEditor = React.createClass({

  saveTopics: function (e) {
    this.props.actions.saveTopics(this.props.problemId)
  },

  addNewTopic: function () {
    this.props.actions.addTopic(this.props.problemId)
  },

  render: function () {
    var TopicEditor = App.components.TopicEditor
    var that = this;

    var buttons = (
      <span>
        <button onClick={this.saveTopics} className='btn btn-success'>save</button>
        <button onClick={this.addNewTopic} className='btn btn-success'>add new</button>
      </span>
    )

    var topics = this.props.topics.map(function (t, i) {
      return <TopicEditor topic={t}
                          key={i}
                          problemId={that.props.problemId}
                          store={that.props.store}
                          actions={that.props.actions} />
    })
    return (
      <div>
        <div className='row'>
          <div className='col-xs-12'>
            {buttons}
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            {topics}
          </div>
        </div>
      </div>
    )
  }
})