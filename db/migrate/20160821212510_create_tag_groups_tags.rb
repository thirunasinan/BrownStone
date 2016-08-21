class CreateTagGroupsTags < ActiveRecord::Migration
  def change
    create_table :tag_groups_tags do |t|
      t.references :tag_group, index: true, foreign_key: true
      t.references :tag, index: true, foreign_key: true
    end
  end
end
