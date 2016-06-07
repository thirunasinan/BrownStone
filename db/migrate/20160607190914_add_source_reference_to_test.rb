class AddSourceReferenceToTest < ActiveRecord::Migration
  def change
    add_reference :tests, :source, index: true, foreign_key: true
  end
end
