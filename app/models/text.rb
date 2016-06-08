class Text < ActiveRecord::Base
  has_and_belongs_to_many :problems
  has_many :sources, through: :problems

  def name
    return "" if content.nil?
    content = "#{self.content[0..40]}..."
    if self.sources.any?
      first = self.sources.first.name
      second = self.problems.reduce('') do |acc, ele|
        "#{acc}, #{ele.number}"
      end
      "#{first} : #{second} - #{content}"
    else
      content
    end
  end
end