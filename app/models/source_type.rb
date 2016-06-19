class SourceType < ActiveRecord::Base
  has_many :sources, dependent: :nullify
end