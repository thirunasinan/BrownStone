class TopicsController < ApplicationController

  def for_select
    render json: CamelizeKeys.run(Topic.all), root: false
  end
end