class CPRect
  
  attr_accessor :origin, :size
  
  # def self.new(x=0, y=0, w=0, h=0)
  def self.new(x, y, w, h)
    `return {
      origin:  #{CPPoint.new(x, y)},
      size:    #{CPSize.new(w, h)},
      isa:     #{CPRect}
    };`
  end
  
  def x
    @origin.x
  end
  
  def y
    @origin.y
  end
  
  def width
    @size.width
  end
  
  def height
    @size.height
  end
  
  def x= x
    @origin.x = x
  end
  
  def y= y
    @origin.y = y
  end
  
  def width= w
    @size.width = w
  end
  
  def height= h
    @size.height = h
  end
  
  def contains_point?(point)
    (point.x > @origin.x) && (point.y > @origin.y) && (point.x < (@origin.x + @size.width)) &&  (point.y < (@origin.y + @size.height))
  end
end



class CPPoint
  
  attr_accessor :x, :y
  
  # def self.new(x=0, y=0)
  def self.new(x, y)
    `return {
      x:    #{x},
      y:    #{y},
      isa:  #{CPPoint}
    };`
  end
  
  def in_rect?(rect)
    rect.contains_point? self
  end
end



class CPSize
  
  attr_accessor :width, :height
  
  # def self.new(w=0, h=0)
  def self.new(w, h)
    `return {
      width:  #{w},
      height: #{h},
      isa:    #{CPSize}
    };`
  end
end
