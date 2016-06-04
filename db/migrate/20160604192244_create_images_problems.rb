class CreateImagesProblems < ActiveRecord::Migration
  def change
    create_table :images_problems do |t|
      t.references :image, index: true, foreign_key: true
      t.references :problem, index: true, foreign_key: true
    end
  end
end
