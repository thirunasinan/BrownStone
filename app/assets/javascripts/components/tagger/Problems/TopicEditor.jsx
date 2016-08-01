App.components.TopicEditor = React.createClass({

  markedForRemoval: function () {
    return this.props.topic.markedForRemoval || false
  },

  removeTopic: function () {
    this.props.actions.toggleRemoveTopic(this.props.problemId, this.props.topic.topicRelId)
  },

  selectSubject: function () {
    var value = this.refs.subjectSelect.getDOMNode().value
    this.props.actions.selectSubjectForTopic(this.props.problemId, this.props.topic.topicRelId, value)
  },

  subjectSelect: function () {
    var subjectOptions = this.props.store.subjectOptions.map(function (subject) {
      return <option key={subject.id} value={subject.id}>{subject.name}</option>;
    })

    return (
      <select ref={'subjectSelect'} onChange={this.selectSubject} >
        {subjectOptions}
      </select>
    );
  },

  selectTopic: function () {
    var value = this.refs.topicSelect.getDOMNode().value
    this.props.actions.selectTopic(this.props.problemId, this.props.topic.topicRelId, value)
  },

  topicSelect: function () {
    var that = this;
    if (this.props.topic.subjectId) {
      var topicOptions = this.props.store.topicOptions.filter(function (t) {
        return parseInt(t.subjectId) === parseInt(that.props.topic.subjectId)
      })
      .concat([{id: null, value: ''}])
      .reverse()
      .map(function (t) {
        return <option key={t.id} value={t.id}>{t.name}</option>
      })

      return (
        <select ref={'topicSelect'} onChange={this.selectTopic} >
          {topicOptions}
        </select>
      )
    } else {
      return null
    }
  },

  render: function () {

    var topic = this.props.topic
    var mainSection;
    if (topic.isNew) {
      mainSection = (
        <div>
          {this.subjectSelect()}
          {this.topicSelect()}
        </div>
      )
    } else {
      mainSection = topic.displayName
    }

    return (
      <div className='row'>
        <div className='col-xs-9'>
          {mainSection}
        </div>
        <div className='col-xs-3'>
          <span className='pull-right'>
            remove:
            <input checked={this.markedForRemoval()} ref={'remove'} onChange={this.removeTopic} type='checkbox' />
          </span>
        </div>
      </div>
    )
  }
})