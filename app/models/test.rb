class Test < ActiveRecord::Base
  belongs_to :source, inverse_of: :tests
  has_many :notes, inverse_of: :test
end