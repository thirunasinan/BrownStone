class TagSerializer < ActiveModel::Serializer
  attributes :id, :name, :is_new
  has_one :tag_type

  def name
    object.display_name
  end

  def is_new
    false
  end
end