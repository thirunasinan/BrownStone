class CreateSourceTypes < ActiveRecord::Migration
  def change
    create_table :source_types do |t|
      t.string :name
    end
  end
end
