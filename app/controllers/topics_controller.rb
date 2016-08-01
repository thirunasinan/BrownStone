class TopicsController < ApplicationController

  def for_select
    render json: CamelizeKeys.run(Topic.all)
  end

  def problems_topics
    data = problems_topics_params.to_snake_case
    problem_id = data[:problem_id]
    problems_topics = data[:problems_topics]
    problems_topics.each do |pt|
      if ((pt[:markedForRemoval] === "true") || (pt[:markedForRemoval] === true))
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