class Subject < ActiveRecord::Base
  has_many :sources, dependent: :nullify
  has_many :topics, dependent: :nullify
  has_and_belongs_to_many :tags, dependent: :nullify
end
