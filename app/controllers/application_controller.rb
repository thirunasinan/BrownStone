class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  def admin_user?
    current_user && current_user.is_admin
  end

  def admin_or_teacher_user?
    current_user && (current_user.is_admin or current_user.is_teacher)
  end

  private

  def authenticate_admin_or_teacher!
    redirect_to root_path unless (current_user.is_admin or current_user.is_teacher)
  end

end
