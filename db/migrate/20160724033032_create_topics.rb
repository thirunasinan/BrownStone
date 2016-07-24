class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.string :name
      t.text :description
      t.references :subject, index: true, foreign_key: true
    end
  end
end
