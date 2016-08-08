class TagsController < ApplicationController
  def search
    tagType = TagType.find_by(name: params[:tag_type_name])
    tags = Tag.where(tag_type: tagType)
              .where("name ILIKE '%#{params[:query]}%'")
    render json: CamelizeKeys.run(tags), root: false
  end

  def action_tags_for_select
    tts = TagType.where(tagger_can_create_new: false)
    render json: CamelizeKeys.run(Tag.where(tag_type: tts)), root: false
  end
end