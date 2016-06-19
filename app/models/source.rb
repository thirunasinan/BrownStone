class Source < ActiveRecord::Base
  belongs_to :subject
  belongs_to :level
  belongs_to :source_type
  has_attached_file :document
  validates_attachment :document, content_type: { content_type: "application/pdf" }
  has_many :assessments, inverse_of: :source, dependent: :nullify
  has_many :problems, inverse_of: :source, dependent: :nullify

  def display_publication_date
    "#{self.class.months[self.publication_month]} #{self.publication_year}"
  end

  #http://stackoverflow.com/questions/8326668/rails-admin-static-select-dropdown
  def publication_month_enum
    self.class.publication_month_options
  end

  #http://stackoverflow.com/questions/8326668/rails-admin-static-select-dropdown
  def publication_year_enum
    self.class.publication_year_options
  end

  def self.publication_month_options
    (1..12).map do |num|
      [self.months[num], num]
    end
  end

  def self.publication_year_options
    (1950..Time.now.year).to_a.reverse
  end



  def self.months
    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].each_with_index.reduce({}) do |acc, (month, index)|
      acc[index + 1] = month
      acc
    end
  end

end