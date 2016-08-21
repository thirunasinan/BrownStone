class TagGroupsController < ApplicationController

  def index
    tag_groups = TagGroup.includes(tags: [:subjects])
                          .references(tags: [:subjects])
                         .where("subjects.id = ?", params[:subject_id] || Subject.last.id)

    render json: CamelizeKeys.run(tag_groups)
  end
end
