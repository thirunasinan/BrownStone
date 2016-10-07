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

	def get_problems
		@problems = Problem.joins(:tags).where("tags.id in (?) ", params[:id])

		render '_table', :layout => false 
	end
end