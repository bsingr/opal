module JSON
  
  
  
end

class String
  
  def to_json
    inspect    
  end
end

class Number
  
  def to_json
    inspect
  end
end

class Boolean
  
  def to_json
    self ? "true" : "false"
  end
end
