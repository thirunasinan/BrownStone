class AddDescriptionToTagTypes < ActiveRecord::Migration
  def change
    add_column :tag_types, :description, :text
  end
end
