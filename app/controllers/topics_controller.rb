class TopicsController < ApplicationController

  def for_select
    render json: CamelizeKeys.run(Topic.all.map{|t| TopicSerializer.new(t)})
  end

  def problems_topics
    data = problems_topics_params.to_h.to_snake_keys.deep_symbolize_keys
    problem_id = data[:problem_id]
    problems_topics = data[:problems_topics]
    problems_topics.each do |pt|
      if ((pt[:marked_for_removal] === "true") || (pt[:marked_for_removal] === true))
        ProblemTopic.where(problem_id: problem_id, topic_id: pt[:topic_id]).destroy_all
      else
        ProblemTopic.find_or_create_by(problem_id: problem_id, topic_id: pt[:topic_id])
      end
    end

    hash = {
      problem_id: problem_id,
      problems_topics: ProblemTopicsDisplay.run(Problem.find(problem_id))
    }

    render json: CamelizeKeys.run(hash)
  end

  private

  def problems_topics_params
    params.require(:data).permit(:problemId, problemsTopics: [:topicId, :markedForRemoval] )
  end
end