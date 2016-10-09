class StudentsController < ApplicationController

	def index
		subject = Subject
		@subject = subject.all
		@tags = subject.first.tags
		@sources = subject.first.sources
		@problems = Problem.all
	end

	def get_tags
		subject = Subject.find(params[:id])
		render :json => {:tags => subject.tags, :sources => subject.sources}
	end

	def get_problems
		@problems = Problem.joins(:tags).where("tags.id in (?) and problems.source_id = ?", params[:tag_id] || [], params[:source_id])

		render '_table', :layout => false 
	end
end