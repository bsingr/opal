# 
# graphics.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2010 Adam Beynon.
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

class Point
  
  attr_accessor :x, :y
  
  def initialize(x, y)
    @x = x
    @y = y
  end
end

class Size
  
  attr_accessor :height, :width
  
  def initialize(w, h)
    @width = w
    @height = h
  end
  
  def inspect
    "#<Size #{@width}, #{@height}>"
  end
end

class Rect
  
  attr_accessor :size, :origin
  
  def initialize(x, y, w, h)
    @origin = Point.new x, y
    @size = Size.new w, h
  end
  
  def x
    origin.x
  end
  
  def x=(x)
    origin.x = x
  end
  
  def y
    origin.y
  end
  
  def y=(y)
    origin.y = y
  end
  
  def width
    size.width
  end
  
  def width=(width)
    size.width = width
  end
  
  def height
    size.height
  end
  
  def height=(height)
    size.height = height
  end
  
  def contains_point?(point)
    `var res = (#{self.x} < #{point.x}) && (#{self.y} < #{point.y}) && ((#{self.x} + #{self.width}) > #{point.x}) && ((#{self.y} + #{self.height}) > #{point.y});
    return res ? #{true} : #{false};
    `
  end
end
