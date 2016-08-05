class Api::V1::TagRelationshipSerializer < ActiveModel::Serializer
  attributes :id, :description, :is_new
  has_many :tag_relationships
  belongs_to :tag

  def is_new
    false
  end


end