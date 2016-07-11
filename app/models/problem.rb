class UniqueNumberValidator < ActiveModel::Validator

  def validate(record)
    x = Problem.where(number: record.number, source_id: record.source_id, section_id: record.section_id)
    if x.any?
      record.errors[:number] << "must be unique for this source and section"
    end
  end

end

class Problem < ActiveRecord::Base
  belongs_to :source
  belongs_to :section
  has_many :answer_choices, dependent: :destroy

  has_and_belongs_to_many :texts, dependent: :nullify
  has_and_belongs_to_many :images, dependent: :nullify

  validates_presence_of :source
  validates_presence_of :name
  validates_presence_of :question

  validates_with UniqueNumberValidator

  accepts_nested_attributes_for :answer_choices

  around_save :process_answer_choices

  attr_accessor :raw_answer_choices, :answer_choices_attributes

  ransacker :number do
    Arel.sql("to_char(\"#{table_name}\".\"number\", '9999.9999')")
  end

  def source_and_section
    "#{source.try(:id)} #{section.try(:id)}"
  end

  def source_id_enum
    Source.all.map(&:id)
  end

  def name
    section_part = section ? ", #{section_name}" : ""
    "#{self.source_name}#{section_part} : #{self.display_number}"
  end

  def source_name
    source.try(:name)
  end

  def section_name
    section.try(:name)
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


  def display_number
    return "" if self.number.nil?
    i, f = self.number.to_i, self.number.to_f
    x = (i == f ? i : f)
    "#{x}"
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
      return if acs.nil?

      texts = acs.values.map{|v| v[:text]}
      self.answer_choices.where.not(text: texts).destroy_all
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