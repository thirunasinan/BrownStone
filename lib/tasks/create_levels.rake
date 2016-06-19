namespace :levels do

  task create: :environment do
    ["Lower School", "Middle School", "High School", "Post Secondary"]. each do |name|
      Level.create(name: name)
    end
  end
end