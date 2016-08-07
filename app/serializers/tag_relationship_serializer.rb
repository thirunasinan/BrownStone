class TagRelationshipSerializer < ActiveModel::Serializer
  attributes :id, :description, :is_new
  has_many :tag_relationships
  has_one :tag

  def is_new
    false
  end

end