class TagTypesController < ApplicationController

  def for_select
    render json: TagType.all
  end

  def actions_for_select
    render json: TagType.where(tagger_can_create_new: false)
  end
end