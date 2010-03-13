module Comparable
  
  def ==(other)
    `return (#{self}===#{other});`
  end
  
  def >(other)
    c = self <=> other
    `c > 0` ? true : false
  end
  
  def >=(other)
    c = self <=> other
    `c >= 0` ? true : false
  end
  
  def <(other)
    c = self <=> other
    `c < 0` ? true : false
  end
  
  def <=(other)
    c = self <=> other
    `c <= 0` ? true : false
  end
  
  def between?(min, max)
    return false if self < min
    return false if self > max
    true
  end
  
end
