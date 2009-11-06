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

  # Adds a nicer 'rubified' layer over graphicscontext.
  # 
  # All CG* functions are located in their respective vml/canvas files
  # as these implement their respective 'raw' functions, to interact
  # with canvas or vml as fit. Calling just methods within this file
  # is usally sufficient to get the benefit out of using drawing routines
  class GraphicsContext < Element
    
    # Fill the given rect
    def rect(x, y, w, h)
      `#{@ctx}.fillRect(#{x}, #{y}, #{w}, #{h});`
      
      # add_rect(Rect.new(x,y,w,h))
      # draw_path(:fill_stroke)
    end
    
      # def initialize(graphics_port, flip_state)
        # @ctx = graphics_port
        # @flip_state = flip_state
      # end
    
      def graphics_port
        @ctx
      end
    
      def graphics_port= graphics_port
        @ctx = graphics_port
      end
    
      def flipped?
        @flip_state
      end
    
      def self.current_context
        @current_context
      end

      def self.current_context= context
        @current_context = context
      end

      def save_graphics_state
  
      end
    
      def restore_graphics_state
      
      end

      def line_width= width
        `#{@ctx}.lineWidth = #{width}`
      end

      # Sets the line cap style. Valid:
      # :butt, :round, :square
      def line_cap= cap
        `#{@ctx}.lineCap = #{cap}`
      end

      # Sets the line join style. Valid values are:
      # :miter, :round, :bevel
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
        # `for (var i = 0; i < points.length; i++) {
        #         #{add_line_to_point(points[i])}
        #         add_line_to_point points[i]
        #       }`
      end
    
      def scale_ctm sx, sy
      
      end
    
      def translate_ctm tx, ty
      
      end
    
      def rotate_ctm angle
      
      end
    
      def concat_ctm transform
      
      end
    
      def ctm
      
      end
    
      def add_ellipse_in_rect rect
      
      end
    
      def add_arc point, radius, start_angle, end_angle, clock_wise
      
      end
    
      def arc_to_point point1, point2, radius
      
      end
    
      def add_path path
      
      end
    
      def path_empty?
      
      end
    
      def path_current_point
      
      end
    
      def path_bounding_box
      
      end
    
      def path_contains_point? point
      
      end
  end
end
