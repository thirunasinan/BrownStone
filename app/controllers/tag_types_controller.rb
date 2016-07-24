class TagTypesController < ApplicationController

  def for_select
    render json: TagType.all
  end

end