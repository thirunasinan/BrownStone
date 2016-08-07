class TagsController < ApplicationController
  def search
    tags = Tag.where(tag_type_id: params[:tag_type_id])
              .where("name ILIKE '%#{params[:query]}%'")
    render json: tags, root: false
  end

  def tag_problem
    params2 = params.symbolize_keys
    problem_id = params2[:problem_id]
    tags = params2[:tags]
    TagProblem.run(problem_id, "Problem", tags)

    problems = [Problem.find(problem_id)]
    render json: DisplayProblems.run(problems)[0], root: false
  end

  def action_tags_for_select
    tts = TagType.where(tagger_can_create_new: false)
    render json: CamelizeKeys.run(Tag.where(tag_type: tts)), root: false
  end
end