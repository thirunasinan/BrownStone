class RemoveImageFromNotes < ActiveRecord::Migration
  def change
    remove_attachment :notes, :image
  end
end
