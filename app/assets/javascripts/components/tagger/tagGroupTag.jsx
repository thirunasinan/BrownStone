App.components.tagger.TagGroupTag = React.createClass({
  onClick: function (e) {
    this.props.actions.selectTagInTagExplorer(this.props.tag)
  },
  render: function () {
    var tag = this.props.tag
    return (<a className='list-group-item' onClick={this.onClick}>
      {tag.name}
    </a>)
  }
})
