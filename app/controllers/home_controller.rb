class HomeController < ApplicationController
  def index
    if current_user
      if current_user.is_admin
        render 'admin'
      elsif current_user.is_teacher
        render 'teacher'
      else
        # render 'student'
        redirect_to '/students'
      end
    else
      redirect_to new_user_session_path
    end
  end
end