class AddIsAdminAndIsTeacherFieldsToUserInvitations < ActiveRecord::Migration
  def change
    add_column :user_invitations, :is_admin, :boolean, default: false
    add_column :user_invitations, :is_teacher, :boolean, default: false
  end
end
