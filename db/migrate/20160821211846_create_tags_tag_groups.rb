class CreateTagsTagGroups < ActiveRecord::Migration
  def change
    create_table :tags_tag_groups do |t|
      t.references :tag, index: true, foreign_key: true
      t.references :tag_group, index: true, foreign_key: true
    end
  end
end
