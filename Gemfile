source 'https://rubygems.org'
ruby "2.3.1"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.5.1'
# Use postgresql as the database for Active Record
gem 'pg', '~> 0.15'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

#gem 'rails_admin'
# to fix upload issue : https://github.com/hampelm/brickbeam/pull/177/files
gem 'rails_admin', :github => 'sferik/rails_admin', :ref => 'c860b2f'

gem "paperclip", "~> 5.0.0.beta1"

# sign up / sign in
gem 'devise',           '~> 3.5.2'
# set password through email invite
gem 'devise_invitable', '~> 1.5.2'

# search
gem 'ransack'

#gem 'will_paginate'
gem 'will_paginate-bootstrap'

gem 'switch_user'

gem 'bootstrap-sass', '~> 3.2.0'
# adds vendor prefixes to vendor assets
gem 'autoprefixer-rails'

gem 'monadic'

# apparently needs :
#gem 'therubyracer'

# react.js
gem 'react-rails'

# dev env variables
gem 'dotenv-rails', :groups => [:development, :test]

# s3 storage for paperclip (uploading pdfs, images, etc)
gem 'aws-sdk'

gem 'plissken'

gem 'active_model_serializers'

group :production do
  gem 'rails_12factor'
end

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  # gem 'byebug'

  # testing
  gem 'rspec-rails'

  # javascript-testing
  gem 'teaspoon-jasmine'

  gem 'factory_girl_rails'

  gem 'byebug'

end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end
