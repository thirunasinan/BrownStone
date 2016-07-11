class SectionsController < ApplicationController

  def index
    render json: Section.all
  end

  def by_source
    render json: Source.find(params[:id]).sections
  end

end