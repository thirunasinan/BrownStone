App.components.tagger.problems.Tagger = React.createClass({

  addTag: function () {
    this.props.actions.addTag(this.props.problemId, this.props.parent_tr_id)
  },

  render: function () {

    var EditTag = App.components.tagger.problems.EditTag
    var that = this;
    var tags = this.props.tags.map(function (tag) {
      return <EditTag problemId={that.props.problemId} actions={that.props.actions} tag={tag} />
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

    var button = <button onClick={this.addTag} className='btn btn-default'>{addLabel}</button>

    if (this.props.tags.length) {
      return (
        <div className='panel panel-success'>
          {headingOrNot}
          <div className='panel-body'>
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