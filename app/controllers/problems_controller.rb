class ProblemsController < ApplicationController
  PER_PAGE = 30
  before_action :authenticate_user!
  before_action :authenticate_admin_or_teacher!, only: :index

  def index
    @q = Problem.ransack(params[:q])
    @problems = @q.result.paginate(page: params[:page], per_page: PER_PAGE)
  end

  def show
    @problem = Problem.find(params[:id])
  end


end