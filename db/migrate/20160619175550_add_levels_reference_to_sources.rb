class AddLevelsReferenceToSources < ActiveRecord::Migration
  def change
    add_reference :sources, :level, index: true, foreign_key: true
  end
end
