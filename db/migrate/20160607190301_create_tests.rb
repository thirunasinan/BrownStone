class CreateTests < ActiveRecord::Migration
  def change
    create_table :tests do |t|
      t.string :title
      t.text :description
      t.text :instructions
    end
  end
end
