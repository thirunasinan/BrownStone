class CreateTagGroups < ActiveRecord::Migration
  def change
    create_table :tag_groups do |t|
      t.string :name
      t.text :description
    end
  end
end
