class AddPublicationMonthAndYearToSources < ActiveRecord::Migration
  def change
    add_column :sources, :publication_month, :integer
    add_column :sources, :publication_year, :integer
  end
end
