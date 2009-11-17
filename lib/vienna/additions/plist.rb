class Hash
  
  def to_vnplist
    arr = []
    self.each do |key, value|
      arr << "#{key.to_vnplist}#{value.to_vnplist}"
    end
    "h#{self.length}$#{arr.join('')}"
  end
  
end

class String
  def to_vnplist
    "s#{self.length}$#{self.to_s}"
  end
end

class NilClass
  def to_vnplist
    "~$"
  end
end

class Array
  def to_vnplist
    arr = []
    self.each do |value|
      arr << "#{value.to_vnplist}"
    end
    "a#{self.length}$#{arr.join('')}"
  end
end

class FalseClass
  def to_vnplist
    "f$"
  end
end

class TrueClass
  def to_vnplist
    "t$"
  end
end

class Fixnum
  def to_vnplist
    "d#{self.to_s.length}$#{self.to_s}"
  end
end
