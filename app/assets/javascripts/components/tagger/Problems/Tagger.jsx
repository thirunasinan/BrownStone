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
    var headingOrNot = this.props.isSubTags
    ? (
      <div className='panel-heading'>Manage Sub-Tags</div>
    )
    : (<div className='panel-heading'>
          Manage Tags
        </div>)


    var addLabel = this.props.isSubTags
    ? "Add Sub-Tag"
    : "Add Tag"

    var save = this.props.isSubTags
    ? null
    : <div><button onClick={this.saveTags} className="btn btn-success">Save</button><br /><br /></div>

    var button = <button onClick={this.addTag} className='btn btn-default'>{addLabel}</button>

    if (this.props.tags.length) {
      return (
        <div className='panel panel-success'>
          {headingOrNot}
          <div className='panel-body'>
            {save}
            <div className='list-group'>
              {tags}
            </div>
            {button}
          </div>
        </div>
      )
    } else {
      return button;
    }
  }
})