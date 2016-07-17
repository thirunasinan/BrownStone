class Tag < ActiveRecord::Base
  belongs_to :tag_type
  has_many :tag_relationships
  validates_uniqueness_of :name
  validates_presence_of :name

  def display_name
    if tag_type
      "#{name} (#{tag_type.name})"
    else
      name
    end
  end
end