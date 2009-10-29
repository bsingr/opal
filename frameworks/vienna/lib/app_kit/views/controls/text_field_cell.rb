# 
# text_field_cell.rb
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
  
  class TextFieldCell < Cell
    
    def init_text_cell(str)
      super str
      @editable = true
      @selectable = true
      @bezeled = true
      # current input type. input, if editable etc, or span if not.
      @text_input_type = :input
      @value = ""
      self
    end
    
    def class_name
      'vn-text-field'
    end
    
    def render_with_frame cell_frame, in_view:control_view
      ctx = RenderContext.current_context
      if ctx.first_time?
        ctx << "<div class='left'></div>"
        ctx << "<div class='middle'></div>"
        ctx << "<div class='right'></div>"
        
        # if controlview is a textfield, then use input, otherwise use a span
        # we do not want tableviews etc to become littered with input elements
        if control_view.is_a?(TextField)
          ctx << "<input class='input'></input>"
        else
          ctx << "<div class='input'></input>"
        end
        ctx.first_time = false
      end
            
      ctx.class_name = [class_name, theme_name].join ' '
      
      if control_view.is_a?(TextField)

      else
        ctx.selector :input do |input|
          input.inner_text = @value
        end
      end

      
    end
    
    def background_color= color
      @background_color = color
    end
    
    def background_color
      @background_color
    end
    
    def draws_background= flag
      @draws_background = flag
    end
    
    def draws_background?
      @draws_background
    end
    
    def text_color= color
      @text_color = color
    end
    
    def text_color
      @text_color
    end
    
    def set_up_field_editor_attributes text_obj
      text_obj
    end
    
    
    
    def bezel_style= style
      @bezel_style = style
    end
    
    def bezel_style
      @bezel_style
    end
    
    
    
    def placeholder_string= string
      @placeholder_string = string
    end
    
    def placeholder_string
      @placeholder_string
    end
    
    def placeholder_attributed_string= str
      @placeholder_attributed_string
    end
    
    def placeholder_attributed_string
      @placeholder_attributed_string
    end    
  end
end
