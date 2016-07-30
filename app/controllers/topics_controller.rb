class TopicsController < ApplicationController

  def for_select
    render json: Topic.all
  end

  def problems_topics
    data = problems_topics_params
    problem_id = data[:problem_id]
    problems_topics = data[:problems_topics]
    saved = problems_topics.map do |pt|
      ProblemTopic.find_or_create_by(problem_id: problem_id, topic_id: pt[:topic_id])
    end


    # render json: {
    #   problem_id: problem_id,
    #   problems_topics: saved
    # }
    render json: {
      problem_id: problem_id,
      problems_topics: ProblemTopicsDisplay.run(Problem.find(problem_id))
    }
  end

  private

  def problems_topics_params
    params.require(:data).permit(:problem_id, problems_topics: [:topic_id] )
  end
end