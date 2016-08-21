App.components.tagger.TagGroupTag = React.createClass({
  render: function () {
    var tag = this.props.tag
    return (<div>
      {tag.name}
    </div>)
  }
})
