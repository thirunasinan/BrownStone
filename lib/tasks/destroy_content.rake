namespace :destroy do

  task content: :environment do
    Problem.destroy_all
    AnswerChoice.destroy_all
    Image.destroy_all
    Text.destroy_all
    Source.destroy_all
  end
end