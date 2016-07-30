class SubjectsController < ApplicationController

  def index
    @sources_q = Source.ransack()

    @q = Subject.ransack()
    @subjects = @q.result
  end

  def for_select
    render json: Subject.all
  end
end