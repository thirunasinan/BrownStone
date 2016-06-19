class AddSourceTypeReferencesToSources < ActiveRecord::Migration
  def change
    add_reference :sources, :source_type, index: true, foreign_key: true
  end
end
