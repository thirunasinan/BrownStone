class RemoveProblemIdFromImages < ActiveRecord::Migration
  def change
    remove_column :images, :problem_id
  end
end
