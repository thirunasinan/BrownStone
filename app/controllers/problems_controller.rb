class ProblemsController < ApplicationController
  PER_PAGE = 30
  before_action :authenticate_user!

  def index
    redirect_to root_path if params[:q].nil? and current_user.low_access?
    @q = Problem.ransack(params[:q])
    @q.sorts = ['source_name asc', 'number asc']
    @problems = @q.result.includes(:source).paginate(page: params[:page], per_page: PER_PAGE)
    @uniq = @problems.to_a.uniq
    @show_full_problem = (current_user.low_access? or (params[:full] == "true"))
  end

  def show
    @problem = Problem.find(params[:id])
  end

  def create
    puts "params : #{params.to_json}"
    source_id = params['sourceId'].to_i
    params['problems'].each do |data|
      p = Problem.create(number: data['number'],
                         question: data['question'],
                         source_id: source_id)

      data['answerChoices'].each do |ac_data|
        AnswerChoice.create(text: ac_data, problem_id: p.id)
      end
    end
    render json: {}
  end

  def parser
    render component: 'Parser'
  end
end