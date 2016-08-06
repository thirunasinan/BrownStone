class ProblemsController < ApplicationController
  PER_PAGE = 30
  before_action :authenticate_user!

  def index
    redirect_to root_path if params[:q].nil? and current_user.low_access?
    @q = Problem.ransack(params[:q])
    # @q.sorts = ['source_name asc', 'number asc']
    @problems = @q.result.includes(:source).paginate(page: params[:page], per_page: PER_PAGE).order(:number)
    @uniq = @problems.to_a.uniq
    @show_full_problem = (current_user.low_access? or (params[:full] == "true"))
  end

  def editor
  end

  def tagger
  end

  def by_source
    respond_to do |format|
      format.html do
        source_name = Source.find(params[:id]).name
        @q = Problem.ransack({source_name_eq: source_name})
        #@q.sorts = ['number asc']
        @problems = @q.result.includes(:source).paginate(page: params[:page], per_page: PER_PAGE).order(:number)
        @uniq = @problems.to_a.uniq
        @show_full_problem = false
        render 'index'
      end

      format.json do
        problems = Problem.where(source_id: params[:id]).limit(2)
        render json: CamelizeKeys.run(problems)
      end
    end
  end

  def by_section
    problems = Problem.where(section_id: params[:id])
    render json: CamelizeKeys.run(problems.map{|p| ProblemSerializer.new(p)})
  end

  def show
    @problem = Problem.find(params[:id])
  end


  def create
    source_id = params['sourceId'] ? params['sourceId'].to_i : nil
    section_id = params['sectionId'] ? params['sectionId'].to_i : nil

    problems = params['problems'].map do |data|
      p = Problem.create(number: data['number'],
                         question: data['question'],
                         source_id: source_id,
                         section_id: section_id,
                         requires_associated_images: data['hasImages'],
                         requires_associated_texts: data['hasTexts'])

      answer_choices = data['answerChoices'] || []
      answer_choices.each do |ac_data|
        AnswerChoice.create(text: ac_data[:name], problem_id: p.id, order: ac_data[:order])
      end
      p
    end


    render json: {saved: problems.map{|p| {success: p.errors.empty?, number: p.display_number, errors: p.errors}} }
  end

  def parser
    # cant prerender components - https://github.com/reactjs/react-rails/issues/403
  end
end