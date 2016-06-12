class SourcesController < ApplicationController

  def index
    render json: Source.all
  end

end