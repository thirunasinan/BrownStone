class TagRelationshipsController < ApplicationController

  def create
    params2 = params.to_snake_keys.deep_symbolize_keys
    problem_id = params2[:problem_id]
    tagRelationships = params2[:tag_relationships]
    CreateTagRelationships.run(problem_id, "Problem", tagRelationships)

    problems = Problem.where(id: problem_id)
    render json: CamelizeKeys.run(problems)[0], root: false
  end

end