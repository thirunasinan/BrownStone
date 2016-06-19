class Section < ActiveRecord::Base
  has_many :problems, dependent: :nullify
end