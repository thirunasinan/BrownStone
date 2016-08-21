require 'rails_helper'

describe TagGroupsController do

  def json(r)
    JSON.parse(r.body).deep_symbolize_keys
  end

  let!(:tag) { FactoryGirl.create(:tag, name: 'tag1') }
  let!(:subject) { tag.subjects.create(name: 'subject1') }
  let!(:tag_group) { tag.tag_groups.create(name: 'tag_group1') }

  let!(:url) { "/tag_groups/#{subject.id}"}


  context 'GET #tag_groups' do

    before :each do
      get url
      @json = json(response)
    end

    it 'returns tag_groups' do
      puts "@json: #{@json.to_json}"
      expect(@json[:tag_groups]).to_not be_empty
    end
  end
end
