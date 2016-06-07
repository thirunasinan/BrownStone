class FixProblemColumnName < ActiveRecord::Migration
  def change
    rename_column :problems, :name, :number
  end
end
