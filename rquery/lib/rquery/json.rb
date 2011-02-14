module JSON
  def self.parse(source, options = {})
  end
end

class String
  def to_json
    self.inspect
  end 
end

class Symbol
  def to_json
    self.to_s.inspect
  end
end

class Numeric
  def to_json
    self.to_s
  end
end

class Hash
  def to_json
    parts = []
    each do |key, value|
      parts << "#{key.to_s.to_json}: #{value.to_json}"
    end

    "{" + parts.join(', ') + "}"
  end
end

class Array
  def to_json
    parts = collect { |i| i.to_json }
    "[" + parts.join(', ') + "]"
  end
end

class TrueClass
  def to_json
    "true"
  end
end

class FalseClass
  def to_json
    "false"
  end
end

class NilClass
  def to_json
    "nil"
  end
end

