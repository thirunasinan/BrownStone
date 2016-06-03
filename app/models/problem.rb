class Problem < ActiveRecord::Base
  belongs_to :source, inverse_of: :problems
  has_many :answer_choices, inverse_of: :problem
  has_many :texts, inverse_of: :problem
  has_many :images, inverse_of: :problem

  def source_name
    source.try(:name)
  end

  def question_extract
    question[0..((question_extract_length) -1)]
  end

  private

  def question_extract_length
    2 # couldnt make this a constant for some reason
  end
end