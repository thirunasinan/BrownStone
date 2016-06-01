class CreateSources < ActiveRecord::Migration
  def change
    create_table :sources do |t|
      t.string :name, null: false
      t.text :description
    end
  end
end
