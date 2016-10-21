class AddCollectionTable < ActiveRecord::Migration
  def change
  	create_table :collections do |t|
      t.string :name
      t.integer :problems, :array => true, :default => []
    end
  end
end
