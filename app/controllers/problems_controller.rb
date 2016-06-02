class ProblemsController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_admin_or_teacher!, only: :index

  def index
    @problems = Problem.all
  end

  def show
    @problem = Problem.find(params[:id])
  end


end