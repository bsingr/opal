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

module Vienna
  
  class Rect
    
    def initialize x, y, w, h
      @origin = Point.new(x, y)
      @size = Size.new(w, h)
    end
    
    def to_rect
      self
    end
    
    def copy
      Rect.new(x, y, width, height)
    end
    
    def size
      @size
    end
    
    def size= size
      @size = size
    end
    
    def origin
      @origin
    end
    
    def origin= point
      @origin = point
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
    
    def x=(x)
      @origin.x = x
    end
    
    def y=(y)
      @origin.y = y
    end
    
    def width=(w)
      @size.width = w
    end
    
    def height=(h)
      @size.height = h
    end
    
    def to_a
      [x, y, w, h]
    end
    
    def center
      
    end
    
    def contain?
      
    end
    
    def to_s
      "{{#{x}, #{y}}, {#{width}, #{height}}}"
    end
    
    def inspect
      # "#<#{self.class} x=#{x}, y=#{y}, width=#{width}, height=#{height}"
    end
    
    def eql? (other)
      @size.eql?(other.size) && @origin.eql?(other.origin)
    end
  end
  
  
  
  
  class Point
    
    def initialize x, y
      @x = x
      @y = y
    end
    
    def to_point
      self
    end
    
    def x
      @x
    end
    
    def x=(x)
      @x = x
    end
    
    def y
      @y
    end
    
    def y=(y)
      @y = y
    end
    
    def eql? (other)
      @x == other.x && @y == other.y
    end
    
    def in_rect? a_rect
      x > a_rect.x && y > a_rect.y && x <= a_rect.x + a_rect.width && y <= a_rect.y + a_rect.height
    end
  end
  
  
  
  
  class Size
    
    def initialize w, h
      @width = w
      @height = h
    end
    
    def to_size
      self
    end
    
    def width
      @width
    end
    
    def width=(w)
      @width = w
    end
    
    def height
      @height
    end
    
    def height=(h)
      @height = h
    end
    
    def eql? (other)
      @width == other.width && @height == other.height
    end
  end
  
end
