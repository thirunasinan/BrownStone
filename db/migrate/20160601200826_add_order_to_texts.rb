class AddOrderToTexts < ActiveRecord::Migration
  def change
    add_column :texts, :order, :integer
  end
end
