class Hash
  
  def to_json
    arr = []
    self.each do |key, value|
      arr << "#{key.to_json}:#{value.to_json}"
    end
    # str = str.join","
    # res = "{#{str}}"
    # res
    "{#{arr.join(',')}}"
  end
  
end

class String
  def to_json
    "\"#{self}\""
  end
end

class NilClass
  def to_json
    "null"
  end
end