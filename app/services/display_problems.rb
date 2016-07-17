module DisplayProblems

  def self.run(problems)
    problems.map do |problem|
      {
        id: problem.id,
        name: problem.name,
        number: problem.number,
        question: problem.question,
        section_id: problem.section,
        source_id: problem.source,
        answer_choices: problem.answer_choices,
        tags: TagAggregator.run(problem.id)
      }
    end
  end
end