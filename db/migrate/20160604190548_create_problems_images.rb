class CreateProblemsImages < ActiveRecord::Migration
  def change
    create_table :problems_images do |t|
      t.references :problem, index: true, foreign_key: true
      t.references :image, index: true, foreign_key: true
    end
  end
end
