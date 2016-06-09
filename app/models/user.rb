class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable#,  :validatable | so password can be blank

  # from http://jessewolgamott.com/blog/2011/12/08/the-one-where-devise-validations-are-customized/
  validates_uniqueness_of    :email,     :case_sensitive => false, :allow_blank => true, :if => :email_changed?
  validates_format_of    :email,    :with  => Devise.email_regexp, :allow_blank => true, :if => :email_changed?
  #validates_presence_of    :password, :on=>:create
  #validates_confirmation_of    :password, :on=>:create
  #validates_length_of    :password, :within => Devise.password_length, :allow_blank => true

  before_update :destroy_invitations

  after_create :send_the_invite

  def login_as_user
    # https://github.com/flyerhzm/switch_user/issues/55
    next_path = ERB::Util.url_encode("/switch_user?scope_identifier=user_#{self.id}&path=/")
    "/switch_user/remember_user?remember=true&path=#{next_path}"
  end

  def low_access?
    not (is_admin or is_teacher)
  end

  private

  def send_the_invite
    #User.invite!(email: self.email)
    # https://github.com/scambra/devise_invitable/wiki/Invite-a-Resource-(or-User)-that-Has-Already-Signed-Up-without-Invitation
    self.invite!(User.find_or_create_by(email: "joshalbro@gmail.com"))
  end


  def destroy_invitations
    return if self.invitation_accepted_at.nil?
    ui = UserInvitation.find_by(email: email)
    return if ui.nil?
    ui.destroy
  end

end