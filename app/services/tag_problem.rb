module TagProblem

  def self.run(tagged_id, tagged_type, tags)
    tags.each do |tag|
      self.handle_tag(tagged_id, tagged_type, tag)
    end
  end

  private

  def self.handle_tag(tagged_id, tagged_type, tag)
    tag = tag.symbolize_keys

    if tag[:markedForRemoval] == true
      self.delete_tag_relationship(tag[:tr_id])
    else
      if tag[:is_new] == true
        if tag[:is_tag_new] == true
          new_tag = Tag.create(name: tag[:name], tag_type_id: tag[:tag_type_id])
          tag_id = new_tag.id
        else
          tag_id = tag[:tag_id]
        end
        tr1 = TagRelationship.create(tag_id: tag_id,
                                     tagged_type: tagged_type,
                                     tagged_id: tagged_id,
                                     description: tag[:description])
      else
        tr1 = TagRelationship.find(tag[:tr_id])
        tr1.update(description: tag[:description])
      end
      self.run(tr1.id, "TagRelationship", tag[:ho_trs] || [])
    end
  end

  def self.delete_tag_relationship(tr_id)
    trs = TagRelationship.where(tagged_id: tr_id)
    trs.each do |tr|
      self.delete_tag_relationship(tr.id)
    end
    TagRelationship.where(id: tr_id).destroy_all
  end
end