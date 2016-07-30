class Subject < ActiveRecord::Base
  has_many :sources, dependent: :nullify
  has_many :topics, dependent: :nullify
end