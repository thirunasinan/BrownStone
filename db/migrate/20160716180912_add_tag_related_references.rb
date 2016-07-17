class AddTagRelatedReferences < ActiveRecord::Migration
  def change
    # add_reference :sections, :source, index: true, foreign_key: true
    add_reference :tags, :tag_type, index: true, foreign_key: true
    add_reference :tag_relationships, :tagged, index: true, polymorphic: true
    add_reference :tag_relationships, :tag, index: true, foreign_key: true
  end
end
