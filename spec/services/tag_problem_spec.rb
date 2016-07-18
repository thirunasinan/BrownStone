require 'rails_helper'

describe TagProblem do

  def subject(problem_id, tags)
    TagProblem.run(problem_id, "Problem", tags)
  end

  let!(:source1) { Source.create(name: 'source1') }
  let!(:problem1) { Problem.create(question: "question1", number: 1, source: source1) }
  let!(:tag1) { Tag.create(name: 'tag1') }
  let!(:tr1) { TagRelationship.create(tag: tag1, tagged: problem1, description: 'description1') }
  let!(:tr2) { TagRelationship.create(tag: tag1, tagged: tr1, description: 'description2') }


  it 'destroys trs for those markedForRemoval' do
    tags = [
      {
        markedForRemoval: true,
        tr_id: tr1.id,
      }
    ]
    subject(problem1.id, tags)
    result = TagRelationship.where(id: [tr1.id, tr2.id])
    expect(result).to eq([])
  end

  it 'updates descriptions' do
    tags = [
      {
        markedForRemoval: false,
        tr_id: tr1.id,
        description: 'description1-edited',
        is_new: false,
        is_tag_new: false,
        name: 'tag1',
        tag_id: tag1.id,
        ho_trs: [
          {
            markedForRemoval: false,
            tr_id: tr2.id,
            description: 'description2-edited',
            is_new: false,
            is_tag_new: false,
            name: 'tag1',
            tag_id: tag1.id,
            ho_trs: []
          }
        ]
      }
    ]

    subject(problem1.id, tags)
    new1 = TagRelationship.find(tr1.id).description
    new2 = TagRelationship.find(tr2.id).description
    expect([new1, new2]).to eq([
      "description1-edited",
      "description2-edited"
    ])
  end

  context 'new trs' do
    let!(:tags) do
      [
        {
          markedForRemoval: false,
          tr_id: 87.23423,
          is_new: true,
          is_tag_new: true,
          tag_id: nil,
          name: 'tag2',
          description: 'description3',
          ho_trs: [
            {
              markedForRemoval: false,
              tr_id: 87.43,
              is_new: true,
              is_tag_new: true,
              tag_id: nil,
              ho_trs: [],
              name: 'tag3',
              description: 'description4',
            }
          ]
        },
        {
          markedForRemoval: false,
          tr_id: 8234.9,
          is_new: true,
          is_tag_new: false,
          tag_id: tag1.id,
          name: 'tag1',
          description: 'description4',
          ho_trs: []
        }
      ]

    end
    it 'creates new first-order tags' do
      subject(problem1.id, tags)
      tag2 = Tag.find_by name: 'tag2'
      expect(tag2).to_not be_nil
    end

    it 'creates new higher-order tags' do
      subject(problem1.id, tags)
      tag3 = Tag.find_by name: 'tag3'
      expect(tag3).to_not be_nil
    end

    it 'creates new first-order tag-relationships' do
      subject(problem1.id, tags)
      tag2 = Tag.find_by name: 'tag2'
      tr1 = TagRelationship.find_by(tagged_type: "Problem", tagged_id: problem1.id, tag_id: tag2.id, description: 'description3')
      expect(tr1).to_not be_nil
    end

    it 'creates new higher-order tag-relationships' do
      subject(problem1.id, tags)
      tag2 = Tag.find_by name: 'tag2'
      tr1 = TagRelationship.find_by(tagged_type: "Problem", tagged_id: problem1.id, tag_id: tag2.id, description: 'description3')
      tag3 = Tag.find_by name: 'tag3'
      tr2 = TagRelationship.find_by(tagged_type: "TagRelationship", tagged_id: tr1.id, tag_id: tag3.id, description: 'description4')
      expect(tr2).to_not be_nil
    end
  end
end