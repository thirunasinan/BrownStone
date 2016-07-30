class ProblemTopic < ActiveRecord::Base
  self.table_name = "problems_topics"
  belongs_to :problem
  belongs_to :topic
end