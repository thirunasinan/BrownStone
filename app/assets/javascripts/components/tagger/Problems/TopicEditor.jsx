App.components.TopicEditor = React.createClass({

  markedForRemoval: function () {
    return this.props.topic.markedForRemoval || false
  },

  removeTag: function () {

  },

  selectSubject: function () {
    var value = this.refs.subjectSelect.getDOMNode().value
    this.props.actions.selectSubjectForTopic(this.props.problemId, this.props.topic.topic_rel_id, value)
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
    this.props.actions.selectTopic(this.props.problemId, this.props.topic.id, value)
  },

  topicSelect: function () {
    var that = this;
    console.log(this.props.store.topicOptions)
    if (this.props.topic.subject_id) {
      var topicOptions = this.props.store.topicOptions.filter(function (t) {
        return parseInt(t.subject_id) === parseInt(that.props.topic.subject_id)
      }).map(function (t) {
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
    if (topic.is_new) {
      mainSection = (
        <div>
          {this.subjectSelect()}
          {this.topicSelect()}
        </div>
      )
    } else {
      mainSection = topic.display_name
    }

    return (
      <div className='row'>
        <div className='col-xs-9'>
          {mainSection}
        </div>
        <div className='col-xs-3'>
          <span className='pull-right'>
            remove:
            <input checked={this.markedForRemoval()} ref={'remove'} onChange={this.removeTag} type='checkbox' />
          </span>
        </div>
      </div>
    )
  }
})