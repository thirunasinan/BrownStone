App.components.tagger.problems.Tagger = React.createClass({

  addTagRelationship: function () {
    this.props.actions.addTagRelationship(this.props.problemId, this.props.parentTagRelationshipId)
  },

  saveTagRelationships: function () {
    this.props.actions.saveTagRelationships(this.props.problemId)
  },

  render: function () {

    var EditTagRelationship = App.components.tagger.problems.EditTagRelationship
    var that = this;
    var tagRelationships = this.props.tagRelationships.map(function (tagRelationship, i) {
      return <EditTagRelationship key={i} store={that.props.store} problemId={that.props.problemId} actions={that.props.actions} tagRelationship={tagRelationship} />
    })


    var button
    if (this.props.parentTagRelationshipId) {
      addTagRelationship = null
      save = null
    } else {
      addTagRelationship = <a className='margined-a' onClick={this.addTagRelationship} >{"add tag"}</a>
      save = <a className='margined-a save' onClick={this.saveTagRelationships}>save</a>
    }

    if (this.props.tagRelationships.length) {
      return (
        <div className='panel panel-success'>
          <div className='tag-panel-body panel-body'>
            {save}
            <div className='list-group tag-list-group'>
              {tagRelationships}
            </div>
            {addTagRelationship}
          </div>
        </div>
      )
    } else {
      return addTagRelationship;
    }
  }
})