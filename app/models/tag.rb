class Tag < ActiveRecord::Base
  belongs_to :tag_type
  has_many :tag_relationships, dependent: :nullify
  has_and_belongs_to_many :tag_groups
  has_and_belongs_to_many :subjects
  has_and_belongs_to_many :problems
  validates_uniqueness_of :name
  validates_presence_of :name

  def display_name
    # if tag_type
    #   "#{tag_type.name}: #{name}"
    # else
    #   name
    # end
    name
  end

  def type_name
    tag_type.present? ? tag_type.name : ""
  end

  def tagger_can_create_new
    tag_type.present? ? tag_type.tagger_can_create_new : false
  end
end
