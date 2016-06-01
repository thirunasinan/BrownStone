class CreateAnswerChoices < ActiveRecord::Migration
  def change
    create_table :answer_choices do |t|
      t.text :text, null: false
      t.boolean :correct, default: false, null: false
      t.references :problem, index: true
    end
  end
end
