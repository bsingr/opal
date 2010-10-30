class Range
  
  def self.new(start, ending, exclusive)
    `if (!#{exclusive}) {
      #{exclusive} = #{false};
    }
    return #{self}.R(#{start}, #{ending}, #{exclusive}.r);`
  end
  
  def length
    `return #{self}.__end__ - #{self}.__start__;`
  end
  
  # def begin
    # `return #{self}.__start__;`
  # end
  
  def end
    `return #{self}.__end__;`
  end
  
  def ===(val)
    include? val
  end
  
  def cover?(val)
    include? val
  end
  
  def include?(val)
    `return (#{self}.__start__ <= #{val} && #{val} <= #{self}.__real_end__) ? #{true} : #{false};`
  end
  
  def exclude_end?
    `return #{self}.__exclusive__ ? #{true} : #{false};`
  end
end
