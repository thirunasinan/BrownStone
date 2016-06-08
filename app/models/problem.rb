class Problem < ActiveRecord::Base
  belongs_to :source
  has_many :answer_choices

  has_and_belongs_to_many :texts
  has_and_belongs_to_many :images

  validates_presence_of :source
  validates_presence_of :name
  validates_presence_of :question

  accepts_nested_attributes_for :answer_choices

  around_save :process_answer_choices

  attr_accessor :raw_answer_choices, :answer_choices_attributes

  def name
    "#{self.source_name} : #{self.number}"
  end

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

  def process_answer_choices
    if self.raw_answer_choices.present?
      self.answer_choices.destroy_all
      self.answer_choices = AnswerChoiceProcessor.run(self.raw_answer_choices).map do |string|
        AnswerChoice.find_or_create_by(text: string)
      end
      yield
    else
      acs = self.answer_choices_attributes
      yield
      texts = acs.values.map{|v| v[:text]}
      self.answer_choices.where.not(text: texts).destroy_all
      return if acs.nil?
      acs.each do |key, value|
        if value[:text].length != 0
          ac = AnswerChoice.find_or_create_by(text: value[:text], problem_id: self.id)
          correct = value[:correct].nil? ? false : value[:correct]
          ac.update(correct: correct)
          ac
        end
      end
    end
  end


  def question_extract_length
    100 # couldnt make this a constant for some reason
  end
end