class AddUserHashInCollection < ActiveRecord::Migration
  def change
  	add_column :collections, :user_hash, :integer, :array => true, :default => []
  end
end
