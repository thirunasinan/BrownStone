class CreateTagRelationships < ActiveRecord::Migration
  def change
    create_table :tag_relationships do |t|
      t.text :description
    end
  end
end
