App.components.tagger.Top = React.createClass({

  getInitialState: function () {
    this.actions = App.modules.reduxLite(this)(App.actions)

    return {
      sourceOptions: [],
      sectionOptions: [],
      subjectOptions: [],
      topicOptions: [],
      tagTypeOptions: [],
      actionTagTypeOptions: [],
      actionTagOptions: [],

      defaults: {
        subject: {},
        topic: {},
        actionTagType: {},
        actionTag: {},
      },

      problems: [],

      tagSearchQuery: null,
      searchingTag: null,
      tagSearchResults: [],
      hoveredTagSearchResult: null,

      tagExplorerActive: false,
      tagExplorerQuery: null,
      tagExplorerTagRelationship: null,
      tagExplorerProblemId: null,
      tagExplorerSearchResults: []
    }
  },

  componentDidMount: function () {
    this.actions.taggerComponentDidMount()
  },

  render: function () {
    var that = this;
    return (
      <div>
        <App.components.Modal active={this.state.tagExplorerActive} actions={this.actions} store={this.state} />
        <App.components.TaggerProblemLoader actions={this.actions} store={this.state} />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xs-12'>
              <App.components.tagger.problems.Problems store={this.state} actions={this.actions} />
            </div>
          </div>
        </div>
      </div>
    )
  }
})
