# 
# array_geometry_additions.rb
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
  
  # Additions to array so that arrays can be used instead of rects, points and
  # size classes.
  class Array
    
    def to_rect
      if length == 4
        Rect.new(`self[0]`, `self[1]`, `self[2]`, `self[3]`)
      else
        Rect.new(0,0,0,0)
      end
    end
    
    def to_size
      if length == 2
        Size.new(`self[0]`, `self[1]`)
      elsif length == 4
        Size.new(`self[2]`, `self[3]`)
      else
        Size.new(0,0)
      end
    end
    
    def to_point
      if length == 2
        Point.new(`self[0]`, `self[1]`)
      elsif length == 4
        Point.new(`self[0]`, `self[1]`)
      else
        Point.new(0,0)
      end
    end
  end
end
