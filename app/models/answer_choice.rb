class AnswerChoice < ActiveRecord::Base
  belongs_to :problem, inverse_of: :answer_choices
  scope :is_correct, -> {where(correct: true)}
  has_attached_file :image,
                    styles: { medium: "300x300>", thumb: "100x100>" },
                    default_url: "/images/:style/missing.png"

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  default_scope { order('answer_choices.order ASC, answer_choices.id ASC') }

  def name
    self.text
  end
end