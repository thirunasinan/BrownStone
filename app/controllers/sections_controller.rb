class SectionsController < ApplicationController

  def index
    render json: Section.all, root: false
  end

  def by_source
    render json: Source.find(params[:id]).sections, root: false
  end

end