Vienna::Mappings.map :view => :CPView do

  def <<(view)
    addSubview view
  end
  
end
