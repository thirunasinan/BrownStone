class ChangeProblemNumberColumn < ActiveRecord::Migration
  def change
    remove_column :problems, :number
    add_column :problems, :number, :decimal
  end
end
