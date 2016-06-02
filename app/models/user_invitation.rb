class UserInvitation < ActiveRecord::Base

  after_create :send_invitation

  def send_invitation
    User.invite!(email: self.email)
    u = User.find_by(email: self.email) # this will create user record
    return if u.nil?
    u.update(is_admin: self.is_admin, is_teacher: self.is_teacher)
  end
end