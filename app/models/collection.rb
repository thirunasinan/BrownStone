class Collection < ActiveRecord::Base
	self.table_name= "collections"
	has_many :problems
	has_many :users

	def problems
	    Problem.where(:id => self.problems_hash)
	end

	def students
		User.where(:id => self.user_hash)
	end
end