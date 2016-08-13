App.components.tagger.problems.EditActionTagRelationship = React.createClass({

  getInitialState: function () {
    return {
      focused: false
    }
  },

  componentDidMount: function () {
    App.modules.autoresizeTextarea()
  },

  editTagRelationshipDescription: function () {
    var value = this.refs.description.getDOMNode().value
    this.props.actions.editTagRelationshipDescription(this.props.problemId, this.props.tagRelationship.clientId, value)
  },

  removeTagRelationship: function () {
    var checked = this.refs.remove.getDOMNode().checked
    this.props.actions.toggleRemoveTagRelationship(this.props.problemId, this.props.tagRelationship.clientId, checked)
  },

  markedForRemoval: function () {
    return this.props.tagRelationship.markedForRemoval || false
  },


  addSubTagRelationship: function () {
    this.props.actions.addTagRelationship(this.props.problemId, this.props.tagRelationship.clientId)
  },

  selectTagType: function () {
    var value = this.refs.selectTagType.getDOMNode().value
    this.props.actions.selectTagType(this.props.problemId, this.props.tagRelationship.clientId, value)
  },

  actionTagTypeDropDown: function () {
    var typeOptions = this.props.store.actionTagTypeOptions.map(function (tagType) {
      return <option key={tagType.id} value={tagType.id}>{tagType.name}</option>;
    })
    return (<select
              ref={'selectTagType'}
              className='tag-type-dropdown'
              value={this.props.tagRelationship.tag.tagType.id}
              onChange={this.selectTagType}>{typeOptions}</select>)
  },

  selectActionTag: function () {
    var value = this.refs.selectActionTag.getDOMNode().value
    this.props.actions.selectActionTag(this.props.problemId, this.props.tagRelationship.clientId, value)
  },

  actionTagDropDown: function () {
    var that = this;

    var tagOptions = this.props.store.actionTagOptions.filter(function (t) {
      var x =  parseInt(t.tagType.id) === parseInt(that.props.tagRelationship.tag.tagType.id)
      return x
    })
    .reverse()
    .map(function (option) {
      return <option key={option.id} value={option.id}>{option.name}</option>;
    })
    return (<select
              ref={'selectActionTag'}
              className='tag-type-dropdown'
              value={this.props.tagRelationship.tag.id}
              onChange={this.selectActionTag}>{tagOptions}</select>)
  },



  render: function () {
    var tagRelationship = this.props.tagRelationship
    var Tagger = App.components.tagger.problems.Tagger

    var tagName, tagTypeName


    if (tagRelationship.isNew) {
      tagTypeName = this.actionTagTypeDropDown()
      if (tagRelationship.tag.tagType.id) {
        tagName = this.actionTagDropDown()
      } else {
        tagName = null
      }

    } else {
      tagTypeName = (tagRelationship.tag.tagType.name ? tagRelationship.tag.tagType.name + ":" : "")
      tagName = <span>{tagRelationship.tag.name}</span>
    }

    var crudStuff = (
      <span>
      <span className='pull-right'>X:<input checked={this.markedForRemoval()} ref={'remove'} onChange={this.removeTagRelationship} type='checkbox' /></span>
      </span>
    )

    var subTagRelationships = tagRelationship.tagRelationships

    var isTagRelationships = subTagRelationships.filter(function (ele) {
      return ele.tag.tagType.name === "IS"
    })

    var knowledgeTagRelationships = subTagRelationships.filter(function (ele) {
      return ele.tag.tagType.name === "KNOWLEDGE"
    })

    var isTagRelationshipsTagger = <Tagger
      tagRelationships={isTagRelationships}
      parentTagRelationshipClientId={tagRelationship.clientId}
      problemId={this.props.problemId}
      store={this.props.store}
      actions={this.props.actions}
      tagRelationshipType="notAction"
      tagRelationshipSubType="IS" />

    var knowledgeTagRelationshipsTagger = <Tagger
      tagRelationships={knowledgeTagRelationships}
      parentTagRelationshipClientId={tagRelationship.clientId}
      problemId={this.props.problemId}
      store={this.props.store}
      actions={this.props.actions}
      tagRelationshipType="notAction"
      tagRelationshipSubType="KNOWLEDGE" />



    return (
      <div className='list-group-item tag-list-item edit-action-tag-relationship'>
        <div className='row'>
          <div className='col-xs-2'>
            {tagTypeName}
          </div>
          <div className='col-xs-2'>
            {tagName}
          </div>
          <div className='col-xs-3'>
            <textarea rows={1} className='tag-description autoresize' ref={'description'} placeholder={'data'} onChange={this.editTagRelationshipDescription}  value={tagRelationship.description}></textarea>
          </div>
          <div className='col-xs-4'>
            {isTagRelationshipsTagger}
          </div>
          <div className='col-xs-1'>
            {crudStuff}
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-2' />
          <div className='col-xs-4'>
            {knowledgeTagRelationshipsTagger}
          </div>
          <div className='col-xs-6' />
        </div>
      </div>

    )
  }
})
