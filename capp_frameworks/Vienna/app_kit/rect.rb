class CPRect
  
  attr_accessor :origin, :size
  
  def initialize(x, y, w, h)
    @origin = CPPoint.new x, y
    @size = CPSize.new w, h
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
  
  def contains_point?(point)
    (point.x > @origin.x) && (point.y > @origin.y) && (point.x < (@origin.x + @size.width)) &&  (point.y < (@origin.y + @size.height))
  end
  
end