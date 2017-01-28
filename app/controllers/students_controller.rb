class StudentsController < ApplicationController

	def index
		subject = Subject
		@subject = subject.all
		@tags = Tag.all
		@sources = Source.all
		# @problems = Problem.all
		@problems = []

		@topics = []
		# @topics = Topic.joins(:problems).select('topics.id, topics.name, COUNT(problems.*) as problems_count').group('topics.id')
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

	def get_source_tags
		tags = []
		stags = []
		problems_id = []
		tagArr = []
		tag_id = []
		source_id = params[:source_id]
			if(params[:subject_id].present?)
				stags = Tag.joins(:subjects).where("subjects.id in (?)",params[:subject_id]).ids
			end
			if (params[:source_id].present?)
			problem_id = Problem.where("source_id in (?)",source_id).ids
			tags_id= TagRelationship.where("tagged_id in (?) AND tagged_type = 'Problem'",problem_id).pluck(:tag_id)
			
			end
			if(tags_id.blank? && stags.blank?)

				tagArr = []
			elsif tags_id.blank?
				tagArr.push *stags
			elsif stags.blank?
				tagArr.push *tags_id
			else
				tagArr.push *tags_id
				tagArr.push *stags
			end

			if(tagArr.present?)	
          tags = Tag.where("id in (?)" ,tagArr)
      end
		render :json => {:tags => tags}
	end



	def get_problems
		source = []
		tag = []

		subject_id = params[:subject_id]

		if (subject_id.present? && params[:source_id].blank? && params[:tag_id].blank?) 
			tag = Tag.joins(:subjects).where("subjects.id in (?)", subject_id).ids
			source = Source.where("subject_id in (?)", subject_id).ids
		else
			source = (params[:source_id].blank?) ?  [] : params[:source_id]
			tag = (params[:tag_id].blank?) ? [] : params[:tag_id]
		end

		if(tag.blank?)
			@problems = Problem.where("source_id in (?)",source)
		else
		problem_id = TagRelationship.where(:tag_id => tag).pluck(:tagged_id)

		# @problems = Problem.joins(:tags).where("tags.id in (?) and problems.source_id in (?)", tag, source)

		@problems = Problem.where("id in (?) and source_id in (?)", problem_id, source)

		end

		render '_table', :layout => false
	end

	def get_topics
		@topics = []
		# @topics = Topic.joins(:problems).select('topics.id, topics.name, COUNT(problems.*) as problems_count').group('topics.id')
		@subject = Subject.all

		render '_topics', :layout => false
	end

	def get_subject_topic
		@topics = Topic.joins(:problems).select('topics.id, topics.name, COUNT(problems.*) as problems_count').where(:subject_id => params['subject_id']).group('topics.id')

		render '_topics_list', :layout => false
	end

	def get_topics_problem
		@topics = Topic.find(params[:id])
		@collections = Collection.all.order(:name)
		
		@problems = Problem.joins(:topics).where("topics.id = ?", params[:id])

		render '_topics_problem_table', :layout => false
	end

	def get_collection
		@collections = Collection.all.order(:name)

		render '_collections', :layout => false
	end

	def get_collection_problems
		@collection = Collection.find(params[:id])

		@students = User.where("is_admin = ? and is_teacher = ?", false, false)

		@problems = Problem.where(:id => @collection.problems_hash)

		@collection_student = @collection.students

		render '_collection_problem_table', :layout => false
	end	

	def get_students
		@collection = Collection.find(params[:id])
		@students = @collection.students

		render "student_list", :layout => false
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

	def add_problems_to_collection
		@collection = Collection.find(params[:id])

		add_problem = @collection.problems_hash +  params[:problems]

		if @collection.update(:problems_hash => add_problem.uniq)

			@students = User.where("is_admin = ? and is_teacher = ?", false, false)

			@problems = Problem.where(:id => add_problem.uniq)

			@collection_student = @collection.students

			render '_collection_problem_table', :layout => false
		else
			render :json => {:error => "Error occered on edit"}.to_json
		end
	end

	def problems_to_collection
		# debugger
		@collection = Collection.find(params[:id])

		# add_problem = @collection.problems_hash +  params[:problems]

		@selected_problems = Problem.where(:id => params[:problems])
		@problems = @collection.problems
		@students = @collection.students

		render "_collection_student_problem", :layout => false

		# if collection.update(:problems_hash => add_problem.uniq)
		# 	render :json => {:value => collection.name}.to_json
		# else
		# 	render :json => {:error => "Error occered on edit"}.to_json
		# end
	end

	def student_to_collection
		collection = Collection.find(params[:id])

		add_users = collection.user_hash + params[:user_hash].map(&:to_i)
		if collection.update(:user_hash => add_users.uniq)

			@collection_student = collection.students
			render "_student_table", :layout => false
			# render :json => {:success => "user has added to collection ", :student_count => collection.user_hash.length}.to_json
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

	def remove_student
		collection = Collection.find(params[:id])

		val = collection.user_hash.delete_if{|i| i ==  params[:student_id].to_i }

		if collection.update(:user_hash => val)
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