class CreateTexts < ActiveRecord::Migration
  def change
    create_table :texts do |t|
      t.string :name
      t.text :content
      t.references :problem
    end
  end
end
