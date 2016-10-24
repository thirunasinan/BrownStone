class StudentsController < ApplicationController

	def index
		subject = Subject
		@subject = subject.all
		@tags = Tag.all
		@sources = Source.all
		@problems = Problem.all
		# @problems = []

		@topics = Topic.joins(:problems).select('topics.id, topics.name, COUNT(problems.*) as problems_count').group('topics.id')
		@collections = Collection.all.order(:name)
	end

	def get_tags_source
		tags = []
		source =[]
		id = params[:id]

		if (id.blank?) 
			tags = Tag.all
			source = Source.all
		else
			subject = Subject.find(id)
			tags = Tag.joins(:subjects).where("subjects.id in (?)", id)
			source = Source.where("subject_id in (?)", id)
		end 

		render :json => {:tags => tags, :sources => source }
	end

	def get_problems
		source = []
		tag = []

		subject_id = params[:subject_id]

		if (subject_id.present? && params[:source_id].blank? && params[:tag_id].blank?) 
			tag = Tag.joins(:subjects).where("subjects.id in (?)", subject_id).ids
			source = Source.where("subject_id in (?)", subject_id).ids
		else
			source = (params[:source_id].blank?) ?  Source.ids : params[:source_id]
			tag = (params[:tag_id].blank?) ? Tag.ids : params[:tag_id]
		end

		@problems = Problem.joins(:tags).where("tags.id in (?) and problems.source_id in (?)", tag, source)

		render '_table', :layout => false
	end

	def get_topics_problem
		@problems = Problem.joins(:topics).where("topics.id = ?", params[:id])

		render '_table', :layout => false
	end

	def get_collection_problems
		@collection = Collection.find(params[:id])

		@students = User.where("is_admin = ? and is_teacher = ?", false, false)

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

	def student_to_collection
		collection = Collection.find(params[:id])

		add_users = collection.user_hash + params[:user_hash]
		
		if collection.update(:user_hash => add_users.uniq)
			render :json => {:success => "user has added to collection ", :student_count => collection.user_hash.length}.to_json
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

	def get_collection
		@collections = Collection.all.order(:name)

		render '_collections', :layout => false
	end

	private
		def collection_params
			params.permit(:name)
		end
end