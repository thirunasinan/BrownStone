App.components.tagger.problems.Tagger = React.createClass({

  addTagRelationship: function () {
    this.props.actions.addTagRelationship(this.props.problemId, this.props.parentTagRelationshipClientId, this.props.tagRelationshipSubType)
  },

  saveTagRelationships: function () {
    this.props.actions.saveTagRelationships(this.props.problemId)
  },

  render: function () {
    var that = this;
    var tagRelationships = this.props.tagRelationships.map(function (tagRelationship) {

      var x = tagRelationship.tag.tagType.taggerCanCreateNew
      var trt = x
      ? 'NotAction'
      : 'Action'

      var key = "Edit" + trt + "TagRelationship"
      var EditTagRelationship = App.components.tagger.problems[key]

      return <EditTagRelationship
              tagRelationshipSubType={that.props.tagRelationshipSubType}
              parentTagRelationshipClientId={that.props.parentTagRelationshipClientId}
              key={tagRelationship.clientId}
              store={that.props.store}
              problemId={that.props.problemId}
              actions={that.props.actions}
              tagRelationship={tagRelationship} />
    })


    var nameForTag = this.props.tagRelationshipSubType === 'action'
    ? "solution process"
    : this.props.tagRelationshipSubType
    var addTagRelationshipText = ['add', nameForTag, "tag"].join(" ")
    var addTagRelationship = <a className='margined-a pull-left' onClick={this.addTagRelationship} >{addTagRelationshipText}</a>
    if (this.props.tagRelationshipType === 'action') {
      var save = <a className='margined-a save pull-right' onClick={this.saveTagRelationships}>save</a>
    } else {
      var save = null;
    }

    var title = this.props.tagRelationshipType === 'action'
    ? <p>Solution Process Tagger</p>
    : null


    if (this.props.tagRelationships.length || this.props.tagRelationshipType === 'action') {
      return (
        <div className='panel panel-success'>
          <div className='tag-panel-body panel-body'>
            {title}
            <div className='list-group tag-list-group'>
              {tagRelationships}
            </div>
            {addTagRelationship}
            {save}
          </div>
        </div>
      )
    } else {
      return addTagRelationship;
    }
  }
})
