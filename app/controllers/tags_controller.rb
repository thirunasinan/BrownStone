class TagsController < ApplicationController
  def search
    tags = Tag.where(tag_type_id: params[:tag_type_id])
              .where("name ILIKE '%#{params[:query]}%'")
    render json: tags
  end

  def tag_problem
    params2 = params.symbolize_keys
    problem_id = params2[:problem_id]
    tags = params2[:tags]
    TagProblem.run(problem_id, "Problem", tags)

    problems = [Problem.find(problem_id)]
    render json: DisplayProblems.run(problems)[0]
  end

  def action_tags_for_select
    tts = TagType.where(tagger_can_create_new: false)
    ts = Tag.where(tag_type: tts)
    render json: ts
  end
end