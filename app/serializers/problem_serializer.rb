class ProblemSerializer < ActiveModel::Serializer
  attributes :id, :name, :number, :question, :section_id, :source_id, :answer_choices, :tag_relationships, :topics
end