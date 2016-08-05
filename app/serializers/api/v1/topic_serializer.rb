class Api::V1::TopicSerializer < ActiveModel::Serializer
  attributes :id, :name, :subject_id
end