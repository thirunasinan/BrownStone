class StudentsController < ApplicationController

	def index
		subject = Subject
		@subject = subject.all
		@tags = subject.first.tags
		@sources = subject.first.sources
		@problems = Problem.all
		# @problems = []

		@topics = Topic.joins(:problems).select('topics.id, topics.name, COUNT(problems.*) as problems_count').group('topics.id')
		@collections = Collection.all
	end

	def get_tags
		id = (params[:id].blank?) ? [] : params[:id]
		subject = Subject.find(id)
		tags = Tag.joins(:subjects).where("subjects.id in (?)", id)

		render :json => {:tags => tags, :sources => Source.all }
	end

	def get_problems
		@problems = Problem.joins(:tags).where("tags.id in (?) and problems.source_id in (?)", params[:tag_id] || [], params[:source_id])

		render '_table', :layout => false
	end

	def get_topics_problem
		@problems = Problem.joins(:topics).where("topics.id = ?", params[:id])

		render '_table', :layout => false
	end		

	def add_collection
		@collection = Collection.new(collection_params)

		if @collection.save
			render :layout => false
		else
			render :json => {:error => "Error occered on create"}.to_json
		end
	end

	def edit_collection
		collection = Collection.find(params[:id])

		if collection.update(collection_params)
			render :json => {:value => collection.name}.to_json
		else
			render :json => {:error => "Error occered on edit"}.to_json
		end

	end

	private
		def collection_params
			params.permit(:name)
		end

end