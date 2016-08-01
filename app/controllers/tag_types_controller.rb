class TagTypesController < ApplicationController

  def for_select
    tts = TagType.all.map do |tt|
      {id: tt.id, name: tt.name, tagger_can_create_new: tt.tagger_can_create_new}
    end
    render json: CamelizeKeys.run(tts)
  end

  def actions_for_select
    tts = TagType.where(tagger_can_create_new: false).map do |tt|
      {id: tt.id, name: tt.name, tagger_can_create_new: tt.tagger_can_create_new}
    end
    render json: CamelizeKeys.run(tts)
  end
end