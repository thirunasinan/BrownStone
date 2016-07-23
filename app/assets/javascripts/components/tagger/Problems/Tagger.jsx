App.components.tagger.problems.Tagger = React.createClass({

  addTag: function () {
    this.props.actions.addTag(this.props.problemId, this.props.parent_tr_id)
  },

  saveTags: function () {
    this.props.actions.saveTags(this.props.problemId)
  },

  render: function () {

    var EditTag = App.components.tagger.problems.EditTag
    var that = this;
    var tags = this.props.tags.map(function (tag) {
      return <EditTag store={that.props.store} problemId={that.props.problemId} actions={that.props.actions} tag={tag} />
    })

    var addLabel = this.props.isSubTags
    ? "add sub-tag"
    : "add tag"




    if (this.props.tags.length) {
      var button = <a className='margined-a' onClick={this.addTag} >{addLabel}</a>
      return (
        <div className='panel panel-success'>
          <div className='tag-panel-body panel-body'>
            <div className='list-group'>
              {tags}
            </div>
            {button}
          </div>
        </div>
      )
    } else {
      var button = <a onClick={this.addTag} >{addLabel}</a>
      return button;
    }
  }
})