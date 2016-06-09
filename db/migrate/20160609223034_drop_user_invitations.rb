class DropUserInvitations < ActiveRecord::Migration
  def change
    drop_table :user_invitations
  end
end
