class Topic < ActiveRecord::Base
  belongs_to :subject
  has_and_belongs_to_many :problems
  has_many :problems_topics, dependent: :destroy, class_name: "ProblemTopic"
end