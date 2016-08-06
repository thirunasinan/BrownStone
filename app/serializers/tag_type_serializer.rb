class TagTypeSerializer < ActiveModel::Serializer
  attributes :id, :name, :tagger_can_create_new
end

