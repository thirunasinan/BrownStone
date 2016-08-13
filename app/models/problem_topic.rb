class ProblemTopic < ActiveRecord::Base
  default_scope { where.not(topic_id: nil) }
  self.table_name = "problems_topics"
  belongs_to :problem
  belongs_to :topic
end
