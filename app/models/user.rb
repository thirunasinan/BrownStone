class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,  :validatable

  before_update :destroy_invitations

  def destroy_invitations
    return if self.invitation_accepted_at.nil?
    ui = UserInvitation.find_by(email: email)
    return if ui.nil?
    ui.destroy
  end
end