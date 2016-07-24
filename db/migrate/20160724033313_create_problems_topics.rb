class CreateProblemsTopics < ActiveRecord::Migration
  def change
    create_table :problems_topics do |t|
      t.references :problem, index: true, foreign_key: true
      t.references :topic, index: true, foreign_key: true
    end
  end
end
