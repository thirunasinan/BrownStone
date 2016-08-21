class DropTagsTagGroups < ActiveRecord::Migration
  def change
    drop_table :tags_tag_groups
  end
end
