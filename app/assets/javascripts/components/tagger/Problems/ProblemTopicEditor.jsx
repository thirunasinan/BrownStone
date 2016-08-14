App.components.ProblemTopicEditor = React.createClass({

  markedForRemoval: function () {
    return this.props.problemTopic.markedForRemoval || false
  },

  removeProblemTopic: function () {
    this.props.actions.toggleRemoveProblemTopic(this.props.problemId, this.props.problemTopic.clientId)
  },

  selectSubject: function () {
    var value = this.refs.subjectSelect.getDOMNode().value
    this.props.actions.selectSubjectForProblemTopic(this.props.problemId, this.props.problemTopic.clientId, value)
  },

  subjectSelect: function () {
    var subjectOptions = this.props.store.subjectOptions.map(function (subject) {
      return <option key={subject.id} value={subject.id}>{subject.name}</option>;
    })

    return (
      <select ref={'subjectSelect'} onChange={this.selectSubject} value={this.props.problemTopic.topic.subject.id} >
        {subjectOptions}
      </select>
    );
  },

  selectTopic: function () {
    var value = this.refs.topicSelect.getDOMNode().value
    this.props.actions.selectTopic(this.props.problemId, this.props.problemTopic.clientId, value)
  },

  topicSelect: function () {
    console.log('toic select this.props', this.props)
    var that = this;
    var subjectId = this.props.problemTopic.topic.subject.id
    if (subjectId) {
      var topicOptions = this.props.store.topicOptions.filter(function (t) {
        return parseInt(t.subjectId) === parseInt(subjectId)
      })
      .concat([{id: null, value: ''}])
      .reverse()
      .map(function (t) {
        return <option key={t.id} value={t.id}>{t.name}</option>
      })

      return (
        <select ref={'topicSelect'} onChange={this.selectTopic} value={this.props.problemTopic.topic.id}>
          {topicOptions}
        </select>
      )
    } else {
      return null
    }
  },

  render: function () {

    var problemTopic = this.props.problemTopic
    var mainSection;
    if (problemTopic.isNew) {
      mainSection = (
        <div>
          {this.subjectSelect()}
          {this.topicSelect()}
        </div>
      )
    } else {
      mainSection = problemTopic.topic.displayName
    }

    return (
      <div className='list-group-item tag-list-item edit-topic-tag'>
        <div className='row'>
          <div className='col-xs-9'>
            {mainSection}
          </div>
          <div className='col-xs-3'>
            <span className='pull-right'>
              X:
              <input checked={this.markedForRemoval()} ref={'remove'} onChange={this.removeProblemTopic} type='checkbox' />
            </span>
          </div>
        </div>
      </div>
    )
  }
})
