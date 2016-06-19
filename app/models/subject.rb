class Subject < ActiveRecord::Base
  has_many :sources, dependent: :nullify
end