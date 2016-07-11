App.components.parser.parsedDisplay.Problem = React.createClass({

  toggleProperty: function (property) {
    var that = this;
    return function (e) {
      that.props.actions.toggleProblemProperty(that.props.problem.number, property)
    }
  },

  propertyClass: function (property) {
    return this.props.problem[property]
    ? 'btn btn-info'
    : 'btn btn-default'
  },

  render: function () {

    var _parseMarkdown = App.modules.parseMarkdown;
    var parsedQuestion = _parseMarkdown(this.props.problem.question)

    var answerChoices = this.props.problem.answerChoices.map(function (ac, i) {
      var letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G'][i];

      var parsedAc = _parseMarkdown(ac)
      return (
        <div key={i} className='row'>
          <strong className='col-xs-2'>{letter}</strong>
          <div className='col-xs-10 preserve-newlines'>{parsedAc}</div>
        </div>
      );
    })

    var aci = (
        <div className='associated-content-indicator'>
          <div className='form-group'>
            <button className={this.propertyClass('hasImages')} onClick={this.toggleProperty('hasImages')}>Has Images</button>
          </div>
          <div className='form-group'>
            <button className={this.propertyClass('hasTexts')} onClick={this.toggleProperty('hasTexts')}>Has Texts</button>
          </div>
        </div>
    )

    return (

      <div className='parsed-problem panel panel-default'>
        <div className='panel-body'>
          <div className='row'>
            <div className='col-xs-3'>
              {aci}
            </div>
            <div className='col-xs-9'>
              <div className='row'>
                <strong className='col-xs-2'>Number</strong>
                <div className='col-xs-10'>{this.props.problem.number}</div>
              </div>

              <div className='row'>
                <strong className='col-xs-2'>Question</strong>
                <div className='col-xs-10 preserve-newlines' dangerouslySetInnerHTML={{__html: parsedQuestion}} />
              </div>
              {answerChoices}
            </div>
          </div>

        </div>
      </div>
    )
  }
})