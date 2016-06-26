class AddRequiresAssociatedImagesAndRequiresAssociatedTextsToProblems < ActiveRecord::Migration
  def change
    add_column :problems, :requires_associated_images, :boolean
    add_column :problems, :requires_associated_texts, :boolean
  end
end
