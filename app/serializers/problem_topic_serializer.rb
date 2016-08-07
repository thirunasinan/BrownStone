class ProblemTopicSerializer < ActiveModel::Serializer
  attributes :id, :is_new, :problem_id, :client_id, :marked_for_removal
  has_one :topic

  def is_new
    false
  end

  def client_id
    object.id
  end

  def marked_for_removal
    false
  end
end