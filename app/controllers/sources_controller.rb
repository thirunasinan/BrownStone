class SourcesController < ApplicationController
  PER_PAGE = 30


  def for_select
    render json: Source.all
  end

  def by_subject
    subject_name = Subject.find(params[:id]).name
    @q = Source.ransack({subject_name_eq: subject_name})
    @q.sorts = 'name asc'
    @sources = @q.result.paginate(page: params[:page], per_page: PER_PAGE)
    @uniq = @sources.to_a.uniq
    render 'index'
  end

  def index
    redirect_to root_path if params[:q].nil? and current_user.low_access?
    @q = Source.ransack(params[:q])
    @sources = @q.result.paginate(page: params[:page], per_page: PER_PAGE)
    @uniq = @sources.to_a.uniq
  end
end