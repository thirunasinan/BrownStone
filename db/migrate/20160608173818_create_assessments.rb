class CreateAssessments < ActiveRecord::Migration
  def change
    create_table :assessments do |t|
      t.references :source, index: true, foreign_key: true
      t.string :title
      t.text :description
      t.text :instructions
    end
  end
end
