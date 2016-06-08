require 'rails_helper'

describe AnswerChoiceProcessor do

  def subject(input)
    AnswerChoiceProcessor.run(input)
  end

  it 'works for A) answer format' do
    test1 = "A) answer choice 1 B) answer choice 2"
    result = subject(test1)
    expect(result).to eq([
      "answer choice 1",
      "answer choice 2"
    ])
  end

  it 'works for (A) answer format' do
    test1 = "(A) answer choice 1 (B) answer choice 2"
    result = subject(test1)
    expect(result).to eq([
      "answer choice 1",
      "answer choice 2"
    ])
  end
end