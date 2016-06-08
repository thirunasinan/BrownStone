class ProblemsController < ApplicationController
  PER_PAGE = 30
  before_action :authenticate_user!

  def index
    redirect_to root_path if params[:q].nil? and current_user.low_access?
    @q = Problem.ransack(params[:q])
    @problems = @q.result(distinct: true).includes(:source).paginate(page: params[:page], per_page: PER_PAGE)
    @show_full_problem = (current_user.low_access? or (params[:full] == "true"))
  end

  def show
    @problem = Problem.find(params[:id])
  end

  def create

  end
end