module ProblemTopicsDisplay

  def self.run(problem)
    problem.problems_topics.select{|pt| pt.topic.present? }.map{|pt| self.display_problem_topic(pt)}
  end

  private

  def self.display_problem_topic(problem_topic)
    topic = problem_topic.topic
    {
      topic_rel_id: problem_topic.id,
      topic_id: topic.id,
      is_new: false,
      name: topic.name,
      subject: topic.subject,
      display_name: self.display_name(topic),
      markedForRemoval: false
    }
  end

  def self.display_name(topic)
    if topic.subject
      "#{topic.subject.name}: #{topic.name}"
    else
      topic.name
    end
  end
end