class RenameColumnInCollection < ActiveRecord::Migration
  def change
  	rename_column :collections, :problems, :problems_hash
  end
end
