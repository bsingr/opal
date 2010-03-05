# 
#  canvas.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-09-09.
#  Copyright 2009 Adam Beynon. All rights reserved.
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

# Creates canvas element, or VML context for IE browsers. Drawing methods will
# use VML if needed
class Canvas < Element
  
  def initialize(options={}, &block)
    if options[:size]
      options[:width] = options[:size][0]
      options[:height] = options[:size][1]
    end
  end
  
  def save
    
  end
  
  def restore
    
  end
  
  def scale
    
  end
  
  def clear_rect
    
  end
  
  def stroke_rect
    
  end
  
  def fill_rect
    
  end
  
end