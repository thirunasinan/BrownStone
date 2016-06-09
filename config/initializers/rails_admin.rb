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

  config.included_models = ["Problem", "Source", "User", "UserInvitation"]

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new do
      except ['User'] # since UserInvitation serves this purpose
    end
    #export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.model 'Problem' do
    navigation_label 'Content'
    list do
      field :source
      field :number
      field :question do
        pretty_value do
          %{<div class='latex'>#{value}</div>}.html_safe
        end
      end
    end


    show do
      field :source
      field :number
      field :question do
        pretty_value do
          %{<div class='latex'>#{value}</div>}.html_safe
        end
      end
      field :texts
      field :images
      field :answer_choices do
        label 'answer choices'
        partial 'different_name'
      end
    end

    create do
      field :source
      field :number
      field :question
      field :texts
      field :images
      field :raw_answer_choices, :text do
        html_attributes rows: 10, cols: 100
      end

      field :answer_choices do
        label 'individual answer choices'
        partial 'problem_answer_choices'
      end
    end

    edit do
      field :source
      field :number
      field :question
      field :texts
      field :images
      field :answer_choices do
        label 'individual answer choices'
        partial 'problem_answer_choices'
      end
    end

  end

  config.model 'AnswerChoice' do
    label 'Answer'
    list do
      scopes [:is_correct]
      field :problem
      field :text do
        label 'answer'
      end

      field :image
    end

    edit do
      field :text
      field :image
      field :correct
    end

    show do
      field :text
      field :image
      field :correct
    end
  end

  config.model 'Source' do
    navigation_label 'Content'
    list do
      field :name do
        pretty_value do
          %{<a href="source/#{bindings[:object].id}">#{value}</a>}.html_safe
        end
      end
      field :problems do
        pretty_value do
          value.count
        end
      end
    end
  end

  config.model 'UserInvitation' do
    navigation_label 'Users'
  end

  config.model 'Text' do
    show do
      field :content do
        pretty_value do
          %{<div class='latex'>#{value}</div>}.html_safe
        end
      end
    end
  end

  config.model 'Image' do
    show do
      field :description do
        pretty_value do
          %{<div class='latex'>#{value}</div>}.html_safe
        end
      end
    end
  end

  config.model 'Assessment' do
    show do
      field :description do
        pretty_value do
          %{<div class='latex'>#{value}</div>}.html_safe
        end
      end
      field :instructions do
        pretty_value do
          %{<div class='latex'>#{value}</div>}.html_safe
        end
      end
    end
  end

  config.model 'Note' do
    show do
      field :content do
        pretty_value do
          %{<div class='latex'>#{value}</div>}.html_safe
        end
      end
    end
  end

  config.model 'User' do
    navigation_label 'Users'

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
      field :login_as_user do
        pretty_value do
          %{<a href="#{value}">log in</a>}.html_safe
        end
      end
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
