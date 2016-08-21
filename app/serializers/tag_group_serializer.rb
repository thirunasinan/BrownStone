class TagGroupSerializer < ActiveModel::Serializer
  attributes :name
  has_many :tags

end
