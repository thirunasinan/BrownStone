require 'rails_helper'

describe TopicsController do

  def json(r)
    JSON.parse(r.body).deep_symbolize_keys
  end

  let!(:url) { "/problems_topics"}
  let!(:source) { FactoryGirl.create(:source, name: 'source1') }
  let!(:problem) { FactoryGirl.create(:problem, source: source, question: 'q', number: '1') }
  let!(:topic) { FactoryGirl.create(:topic, name: 'topic1') }
  let!(:topic2) { problem.topics.create(name: 'topic2') }

  let!(:params) do
    {
      data: {
        problem_id: problem.id,
        problems_topics: [
          {
            topic_id: topic.id,
          },
          {
            topic_id: topic2.id,
            markedForRemoval: true
          }
        ]
      }
    }
  end

  context 'POST #problems_topics' do

    before :each do
      post url, params
      @json = json(response)
    end

    it 'returns problem_id' do
      expect(@json[:problem_id]).to eq(problem.id.to_s)
    end

    it 'creates problems_topics' do
      pt = ProblemTopic.find_by(problem_id: problem.id, topic_id: topic.id)
      expect(pt).to be_present
    end

    it 'returns problems_topics' do
      expect(@json[:problems_topics][0][:topic_rel_id]).to eq(ProblemTopic.first.id)
    end

    it 'deletes those marked for removal' do
      pt = ProblemTopic.find_by(problem_id: problem.id, topic_id: topic2.id)
      expect(pt).to be_nil
    end
  end
end