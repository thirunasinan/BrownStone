App.components.tagger.TagGroup = React.createClass({
  render: function () {
    var that = this;
    var TagGroupTag = App.components.tagger.TagGroupTag
    var tagGroup = this.props.tagGroup
    var tags = tagGroup.tags.map(function (tag, i) {
      return <TagGroupTag key={i} actions={that.props.actions} store={that.props.store}
                          tag={tag} />
    })
    return (<div>
      <div>
        <strong>{tagGroup.name}</strong>
      </div>
      <div>
        {tags}
      </div>
    </div>)
  }
})
