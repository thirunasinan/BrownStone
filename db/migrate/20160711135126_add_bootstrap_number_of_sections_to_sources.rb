class AddBootstrapNumberOfSectionsToSources < ActiveRecord::Migration
  def change
    add_column :sources, :bootstrap_number_of_sections, :integer
  end
end
