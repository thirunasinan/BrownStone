class RemoveNoteTitleColumn < ActiveRecord::Migration
  def change
    remove_column :notes, :title
  end
end
