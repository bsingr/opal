class MatchData
  
  def to_a
    @data
  end
  
  def inspect
    "#<MatchData '#{@data[0]}'>"
  end
  
  def [](index)
    "match_data_goes_here"
  end
end
