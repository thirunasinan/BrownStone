class RenameSourceDescriptionToNotes < ActiveRecord::Migration
  def change
    rename_column :sources, :description, :notes
  end
end
