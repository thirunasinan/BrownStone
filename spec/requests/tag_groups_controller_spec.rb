require 'rails_helper'

describe TagGroupsController do

  def json(r)
    JSON.parse(r.body)
  end

  let!(:tag_type) { FactoryGirl.create(:tag_type, name: 'tag_type_1') }
  let!(:tag) { tag_type.tags.create(name: 'tag1') }
  let!(:subject) { tag.subjects.create(name: 'subject1') }
  let!(:tag_group) { tag.tag_groups.create(name: 'tag_group1') }

  let!(:url) { "/tag_groups/#{tag_type.id}/#{subject.id}"}


  context 'GET #tag_groups' do

    before :each do
      get url
      @json = json(response)
    end

    it 'returns tag_groups' do
      puts "@json: #{@json.to_json}"
      expect(@json).to_not be_empty
    end
  end
end
