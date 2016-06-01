class AnswerChoice < ActiveRecord::Base
  belongs_to :problem, inverse_of: :answer_choices
end