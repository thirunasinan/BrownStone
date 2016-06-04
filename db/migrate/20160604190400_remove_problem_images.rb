class RemoveProblemImages < ActiveRecord::Migration
  def change
    drop_table :problem_images
  end
end
