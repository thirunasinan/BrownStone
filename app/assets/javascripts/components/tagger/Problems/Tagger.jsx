App.components.tagger.problems.Tagger = React.createClass({

  addTagRelationship: function () {
    this.props.actions.addTagRelationship(this.props.problemId, this.props.parentTagRelationshipClientId)
  },

  saveTagRelationships: function () {
    this.props.actions.saveTagRelationships(this.props.problemId)
  },

  render: function () {
    var trt = this.props.tagRelationshipType
    var x = trt[0].toUpperCase() + trt.slice(1, trt.length)
    var key = "Edit" + x + "TagRelationship"
    var EditTagRelationship = App.components.tagger.problems[key]
    var that = this;
    var tagRelationships = this.props.tagRelationships.map(function (tagRelationship) {
      return <EditTagRelationship
              tagRelationshipSubType={that.props.tagRelationshipSubType}
              parentTagRelationshipClientId={that.props.parentTagRelationshipClientId}
              key={tagRelationship.clientId}
              store={that.props.store}
              problemId={that.props.problemId}
              actions={that.props.actions}
              tagRelationship={tagRelationship} />
    })



    var addTagRelationshipText = ['add', this.props.tagRelationshipSubType, "tag"].join(" ")
    var addTagRelationship = <a className='margined-a' onClick={this.addTagRelationship} >{addTagRelationshipText}</a>
    if (this.props.tagRelationshipType === 'action') {
      var save = <a className='margined-a save' onClick={this.saveTagRelationships}>save</a>
    } else {
      var save = null;
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