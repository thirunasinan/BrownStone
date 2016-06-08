class FixNoteColumns < ActiveRecord::Migration
  def change
    rename_column :notes, :text, :content
  end
end
