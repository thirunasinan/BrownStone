class Text < ActiveRecord::Base
  belongs_to :problem, inverse_of: :texts
end