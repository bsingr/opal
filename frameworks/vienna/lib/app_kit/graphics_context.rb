# 
# graphics_context.rb
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
  
  LINE_JOIN_MITER = 'miter'
  LINE_JOIN_ROUND = 'round'
  LINE_JOIN_BEVEL = 'bevel'
  
  LINE_CAP_BUTT = 'butt'
  LINE_CAP_ROUND = 'round'
  LINE_CAP_SQUARE = 'square'

  PATH_FILL = 0
  PATH_EOFILL = 1
  PATH_STROKE = 2
  PATH_FILL_STROKE = 3
  EOFILL_STROKE = 4

  TEXT_FILL = 0
  TEXT_STROKE = 1
  FILL_STROKE = 2
  TEXT_INVISIBLE = 3
  TEXT_FILL_CLIP = 4
  
  class GraphicsContext
    
    def initialize graphics_port, flip_state
      @ctx = graphics_port
      @flip_state = flip_state
    end
    
    def graphics_port
      @ctx
    end
    
    def flipped?
      @flip_state
    end
    
    def self.current_context
      @@current_context
    end
    
    def self.current_context= context
      @@current_context = context
    end
    
    def save_graphics_state
      
    end
    
    def line_width= width
      `#{@ctx}.lineWidth = #{width}`
    end
    
    def line_cap= cap
      `#{@ctx}.lineCap = #{cap}`
    end
    
    def line_join= join
      `#{@ctx}.lineJoin = #{join}`
    end
    
    def miter_limit= limit
      `#{@ctx}.miterLimit = #{limit}`
    end
    
    def alpha= alpha
      `#{@ctx}.globalAlpha = #{alpha}`
    end
    
    def begin_path
      `#{@ctx}.beginPath()`
    end
    
    def move_to_point point
      `#{@ctx}.moveTo(#{point.x},#{point.y})`
    end
    
    def add_line_to_point point
      `#{@ctx}.lineTo(#{point.x},#{point.y})`
    end

    def add_curve_to_point cp1, cp2, point
      `#{@ctx}.bezierCurveTo(#{cp1.x},#{cp1.y},#{cp2.x},#{cp2.y},#{point.x},#{point.y})`
    end
    
    def add_lines points
      `for (var i = 0; i < points.length; i++) {
        #{add_line_to_point(points[i])}
        add_line_to_point points[i]
      }`
    end  
  end
end
