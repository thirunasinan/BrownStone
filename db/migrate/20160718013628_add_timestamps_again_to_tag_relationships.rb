class AddTimestampsAgainToTagRelationships < ActiveRecord::Migration
  def change
    add_column(:tag_relationships, :created_at, :datetime)
    add_column(:tag_relationships, :updated_at, :datetime)
  end
end
