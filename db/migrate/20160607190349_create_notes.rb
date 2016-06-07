class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title
      t.text :text
      t.references :test, index: true, foreign_key: true
    end
  end
end
