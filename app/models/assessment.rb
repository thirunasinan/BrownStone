class Assessment < ActiveRecord::Base
  belongs_to :source, inverse_of: :assessments
  has_many :notes, inverse_of: :assessment
end