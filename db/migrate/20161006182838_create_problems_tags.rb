class CreateProblemsTags < ActiveRecord::Migration
  def change
    create_table :problems_tags do |t|
      t.references :problem, index: true, foreign_key: true
      t.references :tag, index: true, foreign_key: true
    end
  end
end
