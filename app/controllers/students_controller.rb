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
		tagArr = []
		source_id = []
		tagRel =[]		
		tgrelid =[]
		tag = []
		id = params[:id]

		if (id.blank?) 
			tags = Tag.all
			source = Source.all
		else
			
			    source = Source.where("subject_id in (?)", id)
			    source_id = Source.where("subject_id in (?)", id).ids
				problem_id = Problem.where("source_id in (?)",source_id).ids
			    tagArr = TagRelationship.where("tagged_id in (?) AND tagged_type = 'Problem'",problem_id).pluck(:tag_id)
			    tgrelid = TagRelationship.where("tagged_id in (?) AND tagged_type = 'Problem'",problem_id).ids
			    tagRel =  TagRelationship.where("tagged_id in (?) AND tagged_type = 'TagRelationship'",tgrelid).pluck(:tag_id)
				tagArr.push *tagRel				  
				tags = Tag.joins(:subjects).where("subjects.id in (?)", id).ids
				tags.push *tagArr
				tag  = tags.uniq{|x| x}
				tags = Tag.where(:id => tag)
			if tags.blank?
				tags = Tag.all
			end
			
		end 

		render :json => {:tags => tags , :sources => source }
	end

	def get_source_tags
		tags = []
		stags = []
		problems_id = []
		tagArr = []
		source = []
		tagRel =[]
		
		tgrelid=[]

		source_id = params[:source_id]
		subject_id =  params[:subject_id]

			if(source_id.present? && subject_id.present?)
				stags = Tag.joins(:subjects).where("subjects.id in (?)",subject_id).ids
				problem_id = Problem.where("source_id in (?)",source_id).ids
			    tags = TagRelationship.where("tagged_id in (?) AND tagged_type = 'Problem'",problem_id).pluck(:tag_id)
			    tgrelid = TagRelationship.where("tagged_id in (?) AND tagged_type = 'Problem'",problem_id).ids
			    tagRel =  TagRelationship.where("tagged_id in (?) AND tagged_type = 'TagRelationship'",tgrelid).pluck(:tag_id)
				tagArr.push *stags
				tagArr.push *tags
				tagArr.push *tagRel
			elsif (source_id.blank? && subject_id.present?)
				stags = Tag.joins(:subjects).where("subjects.id in (?)",params[:subject_id]).ids
				source = Source.where("sources.subject_id = (?)",subject_id).ids
				problem_id = Problem.where("source_id in (?)",source).ids
			    tags = TagRelationship.where("tagged_id in (?) AND tagged_type = 'Problem'",problem_id).pluck(:tag_id)
			    tgrelid = TagRelationship.where("tagged_id in (?) AND tagged_type = 'Problem'",problem_id).ids
			    tagRel =  TagRelationship.where("tagged_id in (?) AND tagged_type = 'TagRelationship'",tgrelid).pluck(:tag_id)
				
				tagArr.push *stags
				tagArr.push *tags
				tagArr.push *tagRel
			elsif (source_id.present? && subject_id.blank?)
				problem_id = Problem.where("source_id in (?)",source_id).ids
			    tags = TagRelationship.where("tagged_id in (?) AND tagged_type = 'Problem'",problem_id).pluck(:tag_id)
				tgrelid = TagRelationship.where("tagged_id in (?) AND tagged_type = 'Problem'",problem_id).ids
			    tagRel =  TagRelationship.where("tagged_id in (?) AND tagged_type = 'TagRelationship'",tgrelid).pluck(:tag_id)
			
				tagArr.push *tags
				tagArr.push *tagRel
			else
				stags= Tag.select(:id).all
				tagArr.push *stags
			end

			tag = Tag.where("id in (?)" ,tagArr)
			if tag.blank?
				tag = Tag.all
			end	
   	
		render :json => {:tags => tag}
	end



	def get_problems
		sources = []
		tag = []
		problems =[]
		tagRelproblemid =[]
		tagRelproblem =[]

		subject_id = params[:subject_id]
		tag_id =params[:tag_id]
		source_id = params[:source_id]	
		

		if (subject_id.present? && source_id.present? && tag_id.present?) 
			problems = TagRelationship.where(:tag_id => tag_id,:tagged_type => "Problem").pluck(:tagged_id)
			tagRelproblemid = TagRelationship.where(:tag_id => tag_id,:tagged_type => "TagRelationship").pluck(:tagged_id)
			if tagRelproblemid.present?
			tagRelproblem = TagRelationship.where(:id =>tagRelproblemid).pluck(:tagged_id)
			problems.push *tagRelproblem
			end
			#@problems =  Problem.where("id in (?) and source_id in (?)",problems,source_id)
			@problems =  Problem.where("id in (?)",problems)
		
		elsif(subject_id.present? && source_id.blank? && tag_id.blank?)
			sources = Source.where("subject_id in (?)", subject_id).ids
			@problems = Problem.where("problems.source_id in (?)",sources)

		elsif(subject_id.present? && source_id.present? && tag_id.blank?)
			
			@problems = Problem.where("problems.source_id in (?)",source_id)

		elsif (subject_id.present? && source_id.blank? && tag_id.present?)
			#sources = Source.where("subject_id in (?)", subject_id).ids
			problems = TagRelationship.where(:tag_id => tag_id,:tagged_type => "Problem").pluck(:tagged_id)
			tagRelproblemid = TagRelationship.where(:tag_id => tag_id,:tagged_type => "TagRelationship").pluck(:tagged_id)
			if tagRelproblemid.present?
			tagRelproblem = TagRelationship.where(:id =>tagRelproblemid).pluck(:tagged_id)
			problems.push *tagRelproblem
			end
			#@problems = Problem.where("id in (?) and source_id in (?)",problems,sources)
			@problems = Problem.where("id in (?)",problems)
		elsif (subject_id.blank? && source_id.present? && tag_id.blank?)
				@problems = Problem.where("problems.source_id in (?)",source_id)
		elsif (subject_id.blank? && source_id.present? && tag_id.present?)
			 problems = TagRelationship.where(:tag_id => tag_id,:tagged_type => "Problem").pluck(:tagged_id)
			 tagRelproblemid = TagRelationship.where(:tag_id => tag_id,:tagged_type => "TagRelationship").pluck(:tagged_id)
			if tagRelproblemid.present?
			tagRelproblem = TagRelationship.where(:id =>tagRelproblemid).pluck(:tagged_id)
			problems.push *tagRelproblem
			end
			#@problems = Problem.where("id in (?) and source_id in (?)",problems,source_id)
			@problems = Problem.where("id in (?)",problems)

		elsif (subject_id.blank? && source_id.blank? && tag_id.present?)
			problems = TagRelationship.where(:tag_id => tag_id,:tagged_type => "Problem").pluck(:tagged_id)
			tagRelproblemid = TagRelationship.where(:tag_id => tag_id,:tagged_type => "TagRelationship").pluck(:tagged_id)
			if tagRelproblemid.present?
			tagRelproblem = TagRelationship.where(:id =>tagRelproblemid).pluck(:tagged_id)
			problems.push *tagRelproblem
			end
			@problems = Problem.where("id in (?) ",problems)

		elsif (subject_id.blank? && source_id.blank? && tag_id.blank?)
			tag = Tag.select(:id).all
			sources = Source.select(:id).all
		 	problems = TagRelationship.where(:tag_id => tag,:tagged_type => "Problem").pluck(:tagged_id)
		 	tagRelproblemid = TagRelationship.where(:tag_id => tag_id,:tagged_type => "TagRelationship").pluck(:tagged_id)
			if tagRelproblemid.present?
			tagRelproblem = TagRelationship.where(:id =>tagRelproblemid).pluck(:tagged_id)
			problems.push *tagRelproblem
			end
			@problems = Problem.where("id in (?) and source_id in (?)",problems,sources)

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