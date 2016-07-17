App.components.tagger.problems.EditTag = React.createClass({

  editTagDescription: function () {
    var value = this.refs.description.getDOMNode().value
    this.props.actions.editTagDescription(this.props.problemId, this.props.tag.tr_id, value)
  },

  removeTag: function () {
    var checked = this.refs.remove.getDOMNode().checked
    this.props.actions.toggleRemoveTag(this.props.problemId, this.props.tag.tr_id, checked)
  },

  markedForRemoval: function () {
    return this.props.tag.markedForRemoval || false
  },

  render: function () {
    var tag = this.props.tag
    var Tagger = App.components.tagger.problems.Tagger

    var spacerOrNot = false//tag.ho_trs.length
    ? <div className='col-xs-1' />
    : null

    return (
      <div className='list-group-item'>
        <p>
          <strong>{tag.name}</strong>
          <span>&nbsp;&nbsp;&nbsp;remove: <input checked={this.markedForRemoval()} ref={'remove'} onChange={this.removeTag} type='checkbox' /></span>
        </p>
        <div className='row'>
          <div className='col-xs-12'>

            <textarea className='tag-description' ref={'description'} placeholder={'description of relationship to this tag'} onChange={this.editTagDescription}  value={tag.description}></textarea>

          </div>
        </div>
        <div className='row'>
          {spacerOrNot}
          <div className='col-xs-11'>
            <Tagger isSubTags={true} problemId={this.props.problemId} parent_tr_id={tag.tr_id} tags={tag.ho_trs} actions={this.props.actions} />
          </div>
        </div>

      </div>

    )
  }
})