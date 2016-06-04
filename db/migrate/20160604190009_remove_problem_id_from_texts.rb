class RemoveProblemIdFromTexts < ActiveRecord::Migration
  def change
    remove_column :texts, :problem_id
  end
end
