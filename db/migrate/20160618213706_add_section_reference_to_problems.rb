class AddSectionReferenceToProblems < ActiveRecord::Migration
  def change
    add_reference :problems, :section, index: true, foreign_key: true
  end
end
