# 
# geometry.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2009 Adam Beynon.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#

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
  
  def to_rect
    self
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



class Array
  
  # 
  # call-seq:
  #   arr.to_rect -> rect
  # 
  # Converts <i>arr</i> into an array, using the elements found between indexes
  # 0 and 3.
  # 
  #   a = [10, 23, 24, 35]
  #   a.to_rect   # =>  {{10, 23}, {24, 35}}
  # 
  def to_rect
    CPRect.new(self[0], self[1], self[2], self[3])
  end
  
  def to_point
    CGPoint.new(self[0], self[1])
  end
  
  def to_size
    CGSize.new(self[0], self[1])
  end
end
