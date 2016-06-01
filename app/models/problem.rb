class Problem < ActiveRecord::Base
  belongs_to :source, inverse_of: :problems
  has_many :answer_choices, inverse_of: :problem
  has_many :texts, inverse_of: :problem
  has_many :images, inverse_of: :problem
end