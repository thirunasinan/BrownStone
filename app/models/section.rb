class Section < ActiveRecord::Base
  has_many :problems, dependent: :nullify
  belongs_to :source
end