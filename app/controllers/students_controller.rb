class StudentsController < ApplicationController
	def index
		subject = Subject
		@subject = subject.all
		@tags = subject.first.tags
		@problems = Problem.all
	end

	def get_tags

		render :json => {:tags => Subject.find(params[:id]).tags}
	end
end