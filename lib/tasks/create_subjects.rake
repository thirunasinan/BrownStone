namespace :subjects do

  task create: :environment do
    ["Math", "Physics", "English"]. each do |name|
      Subject.create(name: name)
    end
  end
end