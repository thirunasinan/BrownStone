module TagAggregator

  def self.run(problem_id)
    first_order_trs = self.first_order_trs_query(problem_id)
    self.fetch_recursive(first_order_trs)
  end

  private

  def self.second_order_trs(tr)
    ho_trs = self.second_order_trs_query(tr.id)
    self.fetch_recursive(ho_trs)
  end

  def self.fetch_recursive(trs)
    trs2 = trs.select{ |tr| tr.tag.present? }
    trs2.map do |tr|
      {
        tag_id: tr.tag_id,
        is_new: false,
        is_tag_new: false,
        tr_id: tr.id,
        name: tr.tag.display_name,
        description: tr.description,
        ho_trs: self.second_order_trs(tr)
      }
    end
  end

  def self.first_order_trs_query(problem_id)
    TagRelationship.where(tagged_id: problem_id, tagged_type: "Problem").order("created_at ASC")
  end

  def self.second_order_trs_query(tr_id)
    TagRelationship.where(tagged_id: tr_id, tagged_type: "TagRelationship").order("created_at ASC")
  end
end