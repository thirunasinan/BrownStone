RailsAdmin.config do |config|

  ### Popular gems integration

  ## == Devise ==
  # config.authenticate_with do
  #   warden.authenticate! scope: :user
  # end
  # config.current_user_method(&:current_user)
  config.authenticate_with do
    redirect_to main_app.root_path unless warden.user && warden.user.is_admin
  end

  ## == Cancan ==
  # config.authorize_with :cancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.model 'User' do

    #for some reason this doesnt work unless it comes before edit
    create do
      field :email
      field :password
      field :password_confirmation
    end

    show do
      field :email
      field :is_admin
      field :is_teacher
      field :last_sign_in_at
    end

    list do
      field :email
      field :is_admin
      field :is_teacher
      field :last_sign_in_at
    end

    edit do
      field :email
      field :is_admin
      field :is_teacher
      field :password
      field :password_confirmation
    end

  end

end
