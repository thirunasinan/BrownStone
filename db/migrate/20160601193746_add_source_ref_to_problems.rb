class AddSourceRefToProblems < ActiveRecord::Migration
  def change
    add_reference :problems, :source, index: true, foreign_key: true
  end
end
