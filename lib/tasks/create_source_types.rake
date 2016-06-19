namespace :source_types do

  task create: :environment do
    ["textbook", "test"]. each do |name|
      SourceType.create(name: name)
    end
  end
end