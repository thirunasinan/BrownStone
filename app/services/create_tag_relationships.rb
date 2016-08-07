module CreateTagRelationships

  def self.run(tagged_id, tagged_type, tag_relationships)
    tag_relationships.each do |tag_relationship|
      self.handle_tag_relationship(tagged_id, tagged_type, tag_relationship)
    end
  end

  private

  def self.handle_tag_relationship(tagged_id, tagged_type, tag_relationship)
    tag_relationship = tag_relationship.symbolize_keys

    if tag_relationship[:marked_for_removal] == true
      self.delete_tag_relationship(tag_relationship[:id])
    else
      if tag_relationship[:is_new] == true
        tag = tag_relationship[:tag]
        if tag[:is_new] == true
          new_tag = Tag.create(name: tag[:name], tag_type_id: tag[:tag_type][:id])
          tag_id = new_tag_relationship.id
        else
          tag_id = tag[:id]
        end
        tr1 = TagRelationship.create(tag_id: tag_id,
                                     tagged_type: tagged_type,
                                     tagged_id: tagged_id,
                                     description: tag_relationship[:description])
      else
        tr1 = TagRelationship.find(tag_relationship[:id])
        tr1.update(description: tag_relationship[:description])
      end
      self.run(tr1.id, "TagRelationship", tag_relationship[:tag_relationships] || [])
    end
  end

  def self.delete_tag_relationship(id)
    trs = TagRelationship.where(tagged_id: id)
    trs.each do |tr|
      self.delete_tag_relationship(tr.id)
    end
    TagRelationship.where(id: id).destroy_all
  end
end