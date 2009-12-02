Vienna::Mappings.map :scroll_view => :CPScrollView do
  
  defaults :vertical_scroller => true, :horizontal_scroller => true
  
  def init_with_options(options)
    initWithFrame options.delete(:frame).to_rect
  end
  
  def <<(view)
    setDocumentView(view)
  end

  def background=(value)
    setDrawsBackground(value)
  end
  
  def vertical_scroller=(value)
    setHasVerticalScroller(value)
  end
  
  def horizontal_scroller=(value)
    setHasHorizontalScroller(value)
  end  
end
