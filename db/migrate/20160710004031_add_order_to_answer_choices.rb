class AddOrderToAnswerChoices < ActiveRecord::Migration
  def change
    add_column :answer_choices, :order, :integer
  end
end
