class Source < ActiveRecord::Base
  belongs_to :subject
  belongs_to :level
  belongs_to :source_type
  has_attached_file :document
  validates_attachment :document, content_type: { content_type: "application/pdf" }
  has_many :assessments, inverse_of: :source
  has_many :problems, inverse_of: :source

end