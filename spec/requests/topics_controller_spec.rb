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
        problemId: problem.id,
        problemsTopics: [
          {
            topicId: topic.id,
          },
          {
            topicId: topic2.id,
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
      puts "@json: #{@json.to_json}"
      expect(@json[:problemId]).to eq(problem.id.to_s)
    end

    it 'creates problems_topics' do
      pt = ProblemTopic.find_by(problem_id: problem.id, topic_id: topic.id)
      expect(pt).to be_present
    end

    it 'returns problems_topics' do
      expect(@json[:problemsTopics][0][:topicRelId]).to eq(ProblemTopic.first.id)
    end

    it 'deletes those marked for removal' do
      pt = ProblemTopic.find_by(problem_id: problem.id, topic_id: topic2.id)
      expect(pt).to be_nil
    end
  end
end