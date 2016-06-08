class AddAssessmentReferenceToNotes < ActiveRecord::Migration
  def change
    add_reference :notes, :assessment, index: true, foreign_key: true
  end
end
