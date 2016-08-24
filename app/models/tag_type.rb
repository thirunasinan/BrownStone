class TagType < ActiveRecord::Base
  has_many :tags, dependent: :nullify
  validates_uniqueness_of :name
  validates_presence_of :name
end
