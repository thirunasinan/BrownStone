App.components.tagger.problems.TagsDisplay = React.createClass({

  render: function () {

    if (this.props.tags.length) {
      var TagDisplay = App.components.tagger.problems.TagDisplay;
      var tagDisplays = this.props.tags.map(function (tag, key) {
        return <TagDisplay key={key} tag={tag} />
      })
      var headingOrNot = this.props.isSubTags
      ? null
      : (<div className='panel-heading'>
                Tags
              </div>)

      return (
        <div className='row'>
          <div className='col-xs-12'>
            <div className='panel panel-warning'>
              {headingOrNot}
              <div className='panel-body'>
                {tagDisplays}
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
})