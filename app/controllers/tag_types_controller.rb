class TagTypesController < ApplicationController

  def for_select
    render json: {
      all: TagType.all,
      actionTagTypes: TagType.where(tagger_can_create_new: false)
    }
  end

end