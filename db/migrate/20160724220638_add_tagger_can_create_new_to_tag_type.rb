class AddTaggerCanCreateNewToTagType < ActiveRecord::Migration
  def change
    add_column :tag_types, :tagger_can_create_new, :boolean, default: false
  end
end
