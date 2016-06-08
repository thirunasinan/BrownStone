module AnswerChoiceProcessor

  def self.run(input)
    input.lstrip.rstrip.split(/\(?[ABCDEFGH]\)/)
         .map(&:lstrip).map(&:rstrip)
         .reject{|x| x.length == 0}
  end
end