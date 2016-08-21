class CreateSubjectsTags < ActiveRecord::Migration
  def change
    create_table :subjects_tags do |t|
      t.references :subject, index: true, foreign_key: true
      t.references :tag, index: true, foreign_key: true
    end
  end
end
