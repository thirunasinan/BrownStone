App.components.tagger.problems.TagDisplay = React.createClass({

  render: function () {
    var TagsDisplay = App.components.tagger.problems.TagsDisplay
    var tag = this.props.tag
    return (
      <div>
        <p><strong>{tag.name}</strong></p>
        <p>{tag.description}</p>
        <TagsDisplay isSubTags={true} tags={tag.ho_trs} />
      </div>
    )
  }
})