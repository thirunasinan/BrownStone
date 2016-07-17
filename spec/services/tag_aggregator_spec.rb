require 'rails_helper'

describe TagAggregator do

  def subject(input)
    TagAggregator.run(input)
  end


  it 'grabs first order tags' do
    source1 = Source.create(name: 'source1')
    problem1 = Problem.create(question: "question1", number: 1, source: source1)
    tag1 = Tag.create(name: 'tag1')
    tr1 = TagRelationship.create(tag: tag1, tagged: problem1, description: 'description1')
    result = subject(problem1.id)
    expect(result).to eq([
      {
        tag_id: tag1.id,
        tr_id: tr1.id,
        name: 'tag1',
        description: 'description1',
        ho_trs: []
      }
    ])
  end

  it 'grabs second order tags' do
    source1 = Source.create(name: 'source1')
    problem1 = Problem.create(question: "question1", number: 1, source: source1)
    tag1 = Tag.create(name: 'tag1')
    tr1 = TagRelationship.create(tag: tag1, description: 'description1', tagged: problem1)

    tag2 = Tag.create(name: 'tag2')
    tr2 = TagRelationship.create(tag: tag2, tagged: tr1, description: 'description2')

    result = subject(problem1.id)
    expect(result).to eq([
      {
        tag_id: tag1.id,
        tr_id: tr1.id,
        name: 'tag1',
        description: 'description1',
        ho_trs: [
          {
            tag_id: tag2.id,
            tr_id: tr2.id,
            name: 'tag2',
            description: 'description2',
            ho_trs: []
          }
        ]
      }
    ])
  end
end