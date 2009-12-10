# 
# core_graphics_canvas.rb
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
  
  # This file only includes stuff for Canvas based rendering
  if ENV[:graphics_context_platform] == :canvas
    
    CANVAS_LINE_JOINS = {
      :miter            => 'miter',
      :round            => 'round',
      :bevel            => 'bevel'
    }

    CANVAS_LINE_CAPS = {
      :butt             => 'butt',
      :round            => 'round',
      :square           => 'square'
    }
    
    class GraphicsContext < Element
      
      
      def initialize
        tag_name = 'canvas'
        @first_time = true
        @element = `document.createElement('canvas')`
        @ctx = `#{@element}.getContext('2d')`
        @type = tag_name
      end
      
      
      def save_g_state
        `#{@ctx}.save();`
      end
      
      def restore_g_state
        `#{@ctx}.restore();`
      end
      
      def scale_ctm(sx, sy)
        
      end
      
      def translate_ctm(tx, ty)
        
      end
      
      def rotate_ctm(angle)
        
      end
      
      def concat_ctm(transform)
        
      end

      def line_width=(width)
        `#{@ctx}.lineWidth = #{width};`
      end
      
      def line_cap=(cap)
        `#{@ctx}.lineCap = #{CANVAS_LINE_CAPS[cap]};`
      end
      
      def line_join=(join)
        `#{@ctx}.lineJoin = #{CANVAS_LINE_JOINS[join]};`
      end

      def miter_limit=(limit)
        
      end
      
      def alpha=(alpha)
        
      end
      
      def blend_mode=(mode)
        
      end
      
      def begin_path
        
      end
      
      def move_to_point(x, y)
        
      end
      
      def add_line_to_point(x, y)
        
      end
      
      def add_curve_to_point(cp1x, cp1y, cp2x, cp2y, x, y)
        
      end
      
      def add_quad_curve_to_point(cpx, cpy, x, y)
        
      end
      
      def close_path
        
      end
      
      def add_rect(rect)
        
      end
      
      def add_rects(rects)
        
      end
      
      def add_lines(points)
        
      end

      def add_ellipse_in_rect(rect)
        
      end

      def add_arc(x, y, radius, start_angle, end_angle, clockwise)
        
      end
      
      def add_arc_to_point(x1, y1, x2, y2, radius)
        
      end
      
      def add_path(path)
        
      end

      def replace_path_with_stroked_path
        
      end

      def path_empty?
        
      end
      
      def current_point
        
      end

      def path_bounding_box
        
      end
      
      def copy_path
        
      end
      
      def path_contains_point?(point, mode)
        
      end
      
      def draw_path(mode)
        
      end
      
      def fill_path
        
      end

      def eofill_path
        
      end
      
      def stroke_path
        
      end
      
      def fill_rect(rect)
        
      end
      
      def fill_rects(rects)
        
      end
      
      def stroke_rect(rect)
        
      end
      
      def stroke_rect_with_width(rect, width)
        
      end
      
      def clear_rect(rect)
        
      end
      
      def fill_ellipse_in_rect(rect)
        
      end
      
      def stroke_ellipse_in_rect(rect)
        
      end

      def stroke_line_segments(points)
        
      end
      
      def clip
        
      end
      
      def eoclip
        
      end

      def clip_bounding_box
        
      end
      
      def clip_to_rect(rect)
        
      end
      
      def clip_to_rects(rects)
        
      end

      def set_fill_color_with_color(color)
        
      end
      
      def set_stroke_color_with_color(color)
        
      end

      def set_fill_color(components)
        
      end
      
      def set_stroke_color(components)
        
      end

      def set_gray_fill_color(gray, alpha)
        
      end
      
      def set_gray_stroke_color(gray, alpha)
        
      end
      
      def set_rgb_fill_color(r, g, b, a)
        
      end
      
      def set_rgb_stroke_color(r, g, b, a)
        
      end

      def set_cmyk_fill_color(c, m, y, b, a)
        
      end
      
      def set_cmyk_stroke_color(c, m, y, b, a)
        
      end

      def draw_image(rect, image)
        
      end
      
      def draw_tiled_image(rect, image)
        
      end

      def set_shadow_with_color(offset, blur, color)
        
      end
      
      def set_shadow(offset, blur)
        
      end

      def draw_linear_gradient(gradient, start_point, end_point, options)
        
      end
      
      def draw_radial_gradient(gradient, start_center, start_radius, end_center, end_radius, options)
        
      end
    end
  end
end
