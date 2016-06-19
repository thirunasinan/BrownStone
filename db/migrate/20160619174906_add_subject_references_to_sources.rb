class AddSubjectReferencesToSources < ActiveRecord::Migration
  def change
    add_reference :sources, :subject, index: true, foreign_key: true
  end
end
