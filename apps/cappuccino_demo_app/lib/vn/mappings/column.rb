Vienna::Mappings.map :column => :CPTableColumn do

  defaults :title => 'Column'

  def init_with_options(options)
    initWithIdentifier options.delete(:id)
  end
  
  def title
    headerView.stringValue
  end

  def title=(title)
    headerView.stringValue = title
  end
end
