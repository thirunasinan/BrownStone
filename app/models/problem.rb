class Problem < ActiveRecord::Base
  belongs_to :source
  has_many :answer_choices

  has_and_belongs_to_many :texts
  has_and_belongs_to_many :images

  validates_presence_of :source
  validates_presence_of :name
  validates_presence_of :question

  accepts_nested_attributes_for :answer_choices

  before_update :process_raw_answer_choices

  attr_accessor :raw_answer_choices, :answer_choices, :answer_choices_attributes

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

  def answer_choices_attributes=(attributes)
    return if attributes.nil?
    x = attributes.reject do |key, value|
      value[:text].length == 0
    end
    self.answer_choices = x
  end

  private

  def process_raw_answer_choices
    return if self.raw_answer_choices.nil?
    self.answer_choices = AnswerChoiceProcessor.run(self.raw_answer_choices).map do |string|
      AnswerChoice.create(text: string)
    end
  end


  def question_extract_length
    100 # couldnt make this a constant for some reason
  end
end