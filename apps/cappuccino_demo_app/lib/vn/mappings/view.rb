Vienna::Mappings.map :view => :CPView do
  
  def self.new(frame)
    alloc.initWithFrame(frame.to_rect)
  end
  
  def <<(view)
    addSubview view
  end
  
end
