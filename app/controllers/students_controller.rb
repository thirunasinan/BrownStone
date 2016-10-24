class StudentsController < ApplicationController

	def index
		subject = Subject
		@subject = subject.all
		@tags = Tag.all
		@sources = subject.first.sources
		@problems = Problem.all
		# @problems = []

		@topics = Topic.joins(:problems).select('topics.id, topics.name, COUNT(problems.*) as problems_count').group('topics.id')
		@collections = Collection.all.order(:name)
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

	def get_collection_problems
		@collection = Collection.find(params[:id])

		@problems = Problem.where(:id => @collection.problems_hash)

		render '_collection_problem_table', :layout => false
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

	def problems_to_collection
		# debugger
		collection = Collection.find(params[:id])

		add_problem = collection.problems_hash +  params[:problems]

		if collection.update(:problems_hash => add_problem.uniq)
			render :json => {:value => collection.name}.to_json
		else
			render :json => {:error => "Error occered on edit"}.to_json
		end
	end

	def delete_collection
	    collection = Collection.find(params[:id])
	    name = collection.name

	    if collection.destroy
	    	render :json => {:success => name + " has deleted from collection"}.to_json
	    else
	    	render :json => {:error => "Error occered on destroy"}.to_json
	    end
	    
	end

	def remove_problem_collection
		collection = Collection.find(params[:id])

		val = collection.problems_hash.delete_if{|i| i ==  params[:problem_id].to_i }

		if collection.update(:problems_hash => val)
	    	render :json => {:success => true}.to_json
	    else
	    	render :json => {:error => "Error occered on remove product"}.to_json
	    end
	end

	private
		def collection_params
			params.permit(:name)
		end
end