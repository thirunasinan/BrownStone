class TagRelationshipSerializer < ActiveModel::Serializer
  attributes :id, :description, :is_new, :tag
  has_many :tag_relationships
  #belongs_to :tag

  def is_new
    false
  end

  def tag
    Tag.find_by(id: object.tag_id)
  end


end