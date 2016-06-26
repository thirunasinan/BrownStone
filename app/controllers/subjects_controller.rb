class SubjectsController < ApplicationController

  def index
    @sources_q = Source.ransack()

    @q = Subject.ransack()
    @subjects = @q.result
  end

end