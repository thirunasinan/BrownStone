App.components.tagger.problems.Problems = React.createClass({

  render: function () {
    var Problem = App.components.tagger.problems.Problem
    var that = this;
    var problems = this.props.store.problems.map(function (p, i) {
      return <Problem key={i} problem={p} store={that.props.store} actions={that.props.actions} />
    })
    return (
      <div>{problems}</div>
    )
  }
})