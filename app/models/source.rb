class Source < ActiveRecord::Base
  has_attached_file :document
  validates_attachment :document, content_type: { content_type: "application/pdf" }
  has_many :problems, inverse_of: :source
end