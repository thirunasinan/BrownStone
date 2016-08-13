class TopicSerializer < ActiveModel::Serializer
  attributes :id, :name, :subject_id, :display_name
  has_one :subject

  def display_name
    subject = Subject.find_by(id: object.subject_id)
    if subject.present?
      "#{subject.name}: #{object.name}"
    else
      "#{object.name}"
    end
  end
end
