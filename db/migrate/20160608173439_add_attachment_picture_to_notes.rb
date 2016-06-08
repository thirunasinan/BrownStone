class AddAttachmentPictureToNotes < ActiveRecord::Migration
  def self.up
    change_table :notes do |t|
      t.attachment :picture
    end
  end

  def self.down
    remove_attachment :notes, :picture
  end
end
