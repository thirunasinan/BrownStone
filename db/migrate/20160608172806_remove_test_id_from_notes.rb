class RemoveTestIdFromNotes < ActiveRecord::Migration
  def change
    remove_column :notes, :test_id
  end
end
