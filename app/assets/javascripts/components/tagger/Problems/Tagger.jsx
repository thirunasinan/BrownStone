App.components.tagger.problems.Tagger = React.createClass({

  addTag: function () {
    this.props.actions.addTag(this.props.problemId, this.props.parentTrId)
  },

  saveTags: function () {
    this.props.actions.saveTags(this.props.problemId)
  },

  render: function () {

    var EditTag = App.components.tagger.problems.EditTag
    var that = this;
    var tagRelationships = this.props.tagRelationships.map(function (tagRelationship, i) {
      return <EditTag key={i} store={that.props.store} problemId={that.props.problemId} actions={that.props.actions} tagRelationship={tagRelationship} />
    })


    var button
    if (this.props.parentTrId) {
      addTag = null
      save = null
    } else {
      addTag = <a className='margined-a' onClick={this.addTag} >{"add tag"}</a>
      save = <a className='margined-a save' onClick={this.saveTags}>save</a>
    }

    if (this.props.tagRelationships.length) {
      return (
        <div className='panel panel-success'>
          <div className='tag-panel-body panel-body'>
            {save}
            <div className='list-group tag-list-group'>
              {tagRelationships}
            </div>
            {addTag}
          </div>
        </div>
      )
    } else {
      return addTag;
    }
  }
})