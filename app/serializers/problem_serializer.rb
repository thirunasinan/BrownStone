class ProblemSerializer < ActiveModel::Serializer
  attributes :id, :name, :number, :question, :section_id, :source_id
  has_many :answer_choices
  has_many :problems_topics
  has_many :tag_relationships

end