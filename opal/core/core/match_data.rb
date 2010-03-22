class MatchData
  
  def initialize(data)
    @data = data
  end
  
  def [](index)
    @data[index]
  end
  
  def inspect
    "#<MatchData '#{@data[0]}'>"
  end
  
  def to_s
    @data[0]
  end
end
