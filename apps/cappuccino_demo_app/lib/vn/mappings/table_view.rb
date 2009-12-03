Vienna::Mappings.map :table_view => :CPTableView do
  
  defaults :frame => [0,0,0,0]
  
  def init_with_options(options)
    initWithFrame options.delete(:frame).to_rect
  end
  
  def column=(a_column)
    addTableColumn(a_column)
  end
  
  def data=(data)
    setDataSource(data)
    
    case data
    when Array
      
    end
  end
end
