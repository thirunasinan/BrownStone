class Problem < ActiveRecord::Base
  belongs_to :source
  has_many :answer_choices

  has_and_belongs_to_many :texts
  has_and_belongs_to_many :images

  def source_name
    source.try(:name)
  end

  def question_extract
    extract = question[0..((question_extract_length) -1)]
    if extract.length < question.length
      result = "#{extract}..."
    else
      result = extract
    end
    result
  end

  private

  def question_extract_length
    100 # couldnt make this a constant for some reason
  end
end