class TagGroupsController < ApplicationController

  def index
    tag_groups = TagGroup.includes(tags: [:tag_type, :subjects])
                          .references(tags: [:tag_type, :subjects])
                          .where("tag_types.id = ?", params[:tag_type_id])
                         .where("subjects.id = ?", params[:subject_id])

    render json: CamelizeKeys.run(tag_groups), root: false
  end

  def for_select
    render json: CamelizeKeys.run(TagGroup.all), root: false
  end
end
