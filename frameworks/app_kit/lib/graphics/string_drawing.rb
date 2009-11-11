# 
# string_drawing.rb
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
  
  class String
    
    def size_with_attributes attrs
      
    end
    
    def draw_at_point point, with_attributes:attrs
      
    end
    
    def draw_in_rect rect, with_attributes:attrs
      
    end
    
    def draw_with_rect rect, options:options, attributes:attributes
      
    end
    
    def bounding_rect_with_size size, options:options, attributes:attributes
      
    end
  end
  
  
  
  class AttributedString
    
    def size
      
    end
    
    def draw_at_point point
      
    end
    
    def draw_in_rect rect
      ctx = GraphicsContext.current_context.graphics_port
      `if(!window.opera){`
      `#{ctx}.font = 'bold 12px/2 Arial, sans-serif';`
      `#{ctx}.fillStyle = #{@attributes[:color].rgb_string};`
      `#{ctx}.textBaseline = 'top';`
      `#{ctx}.fillText(#{@string}, #{rect.x}, #{rect.y});`
      `}`
    end
    
    def draw_with_rect rect, options:options
      
    end
    
    def render_in_rect(rect)
      ctx = RenderContext.current_context
      ctx.frame = rect
      ctx.css :font_family => 'Arial', :font_size => '12px', :font_weight => 'bold', :color => @attributes[:color].rgb_string, :overflow_x => 'hidden', :overflow_y => 'hidden', :white_space => 'nowrap'
      ctx.inner_html = @string
    end
    
    def bounding_rect_with_size size, options:options
      
    end
  end
end
