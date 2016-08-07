class TagRelationshipSerializer < ActiveModel::Serializer
  attributes :id, :description, :is_new, :client_id
  has_many :tag_relationships
  has_one :tag

  def is_new
    false
  end

  def client_id
    object.id
  end

end