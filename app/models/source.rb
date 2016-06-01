class Source < ActiveRecord::Base
  has_many :problems, inverse_of: :source
end