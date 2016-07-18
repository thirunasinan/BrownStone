class TagsController < ApplicationController
  def search
    tags = Tag.where("name ILIKE '%#{params[:query]}%'")
    render json: tags
  end

  def tag_problem
    params2 = params.symbolize_keys
    puts "param2: #{params2.to_json}"
    problem_id = params2[:problem_id]
    tags = params2[:tags]
    TagProblem.run(problem_id, "Problem", tags)

    problems = [Problem.find(problem_id)]
    render json: DisplayProblems.run(problems)[0]
  end
end