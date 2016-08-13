class ProblemsTopicsController < ApplicationController

  def create
    data = problems_topics_params.to_h.to_snake_keys.deep_symbolize_keys
    problem_id = data[:problem_id]
    problems_topics = data[:problems_topics]
    problems_topics.each do |pt|
      if ((pt[:marked_for_removal] === "true") || (pt[:marked_for_removal] === true))
        ProblemTopic.where(problem_id: problem_id, topic_id: pt[:topic][:id]).destroy_all
      else
        if pt[:topic] && pt[:topic][:id]
          ProblemTopic.find_or_create_by(problem_id: problem_id, topic_id: pt[:topic][:id])
        end
      end
    end

    hash = {
      problem_id: problem_id,
      problems_topics: Problem.find(problem_id).problems_topics
    }

    render json: CamelizeKeys.run(hash)
  end

  private

  def problems_topics_params
    params.require(:data).permit(:problemId, problemsTopics: [:id, :isNew, :clientId, :problemId, :markedForRemoval, topic: [:id, :name] ] )
  end

end
