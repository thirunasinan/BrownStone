class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,  :validatable

  before_update :destroy_invitations

  def login_as_user
    # https://github.com/flyerhzm/switch_user/issues/55
    next_path = ERB::Util.url_encode("/switch_user?scope_identifier=user_#{self.id}&path=/")
    "/switch_user/remember_user?remember=true&path=#{next_path}"
  end

  def low_access?
    not (is_admin or is_teacher)
  end

  private

  def destroy_invitations
    return if self.invitation_accepted_at.nil?
    ui = UserInvitation.find_by(email: email)
    return if ui.nil?
    ui.destroy
  end

end