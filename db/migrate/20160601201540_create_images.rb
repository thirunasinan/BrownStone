class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :name
      t.text :description
      t.references :problem, index: true, foreign_key: true
    end
  end
end
