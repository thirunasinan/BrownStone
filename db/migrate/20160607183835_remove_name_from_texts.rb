class RemoveNameFromTexts < ActiveRecord::Migration
  def change
    remove_column :texts, :name
  end
end
