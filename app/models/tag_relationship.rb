class TagRelationship < ActiveRecord::Base
  belongs_to :tag
  belongs_to :tagged, polymorphic: true # problems or other tag_relationships
  has_many :tag_relationships, as: :tagged
end