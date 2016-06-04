class CreateProblemsTexts < ActiveRecord::Migration
  def change
    create_table :problems_texts do |t|
      t.references :problem, index: true, foreign_key: true
      t.references :text, index: true, foreign_key: true
    end
  end
end
