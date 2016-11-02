class Collection < ActiveRecord::Base
	# self.table_name= "collections"
	# has_many :problems

	# def problems
	#     Problem.where(:id => self.problems)
	# end
	has_many :users

	def users
		User.where(:id => self.user_hash)
	end
end