class DropProblemsImages < ActiveRecord::Migration
  def change
    drop_table :problems_images
  end
end
