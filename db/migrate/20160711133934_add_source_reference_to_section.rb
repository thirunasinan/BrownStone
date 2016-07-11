class AddSourceReferenceToSection < ActiveRecord::Migration
  def change
    add_reference :sections, :source, index: true, foreign_key: true
  end
end
