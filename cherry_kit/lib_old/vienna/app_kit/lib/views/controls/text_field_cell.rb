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
  
  TEXTFIELD_BEZEL_STYLES = {
    :none       => -1,
    :square     => 0,
    :rounded    => 1
  }
  
  class TextFieldCell < Cell
    
    bundle = Bundle.bundle_for_class(self)
    
    BEZEL_IMAGES = {
      :square => NinePartImage.new(
          Image.new(bundle.path_for_resource('text_field/square/part_0.png'), Size.new(2, 3)),
          Image.new(bundle.path_for_resource('text_field/square/part_1.png'), Size.new(1, 3)),
          Image.new(bundle.path_for_resource('text_field/square/part_2.png'), Size.new(2, 3)),
          Image.new(bundle.path_for_resource('text_field/square/part_3.png'), Size.new(2, 1)),
          Image.new(bundle.path_for_resource('text_field/square/part_4.png'), Size.new(1, 1)),
          Image.new(bundle.path_for_resource('text_field/square/part_5.png'), Size.new(2, 1)),
          Image.new(bundle.path_for_resource('text_field/square/part_6.png'), Size.new(2, 2)),
          Image.new(bundle.path_for_resource('text_field/square/part_7.png'), Size.new(1, 2)),
          Image.new(bundle.path_for_resource('text_field/square/part_8.png'), Size.new(2, 2))),
     
      :rounded => ThreePartImage.new()
    }
    
    def init_text_cell(str)
      super str
      @editable = true
      @selectable = true
      @bezeled = true
      @bezel_style = :square
      @font = Font.control_content_font_of_size(12)
      # dom element for the input element. if nil, it doesnt exist yet (and is likely)
      # to be because this is a label (non editable) or it is inside a tableview,
      # therefore not needing an input element.
      @input_element = nil
      @value = "Hey there!"
      self
    end
    
    def init_with_coder(coder)
      super coder
      @draws_background = coder.decode_bool :draws_background
      # hack for the moment..
      if @draws_background
        @bezel_style = :square
      else
        @bezel_style = :none
      end
      # @background_color = coder.decode_object :background_color
      # @text_color = coder.decode_object :text_color
    end
    
    def class_name
      'vn-text-field'
    end
    
    # Do not draw ANY text if @input_element exists... it will draw text. If it doesnt
    # exist, then we can draw it... (tableview, label etc)
    def draw_with_frame(cell_frame, in_view:control_view)
      ctx = GraphicsContext.current_context.graphics_port
      
      # draw bezel
      case @bezel_style
      when :none
      else
        BEZEL_IMAGES[@bezel_style].draw_with_frame(cell_frame)
      end
      
      # draw background?
      
      # text....?
      if control_view.is_a?(TextField)
        # text field...draw ntohing?
      else
        attributed_value.draw_in_rect(cell_frame) # (title_rect_for_bounds(frame))
      end
    end
    
    def render_with_frame(cell_frame, in_view:control_view)
      ctx = RenderContext.current_context
      
      @control_view = control_view
      if control_view.is_a?(TextField)
        unless @input_element
          # @input_element = `document.createElement('input')`
          @input_element = Element.new(:input)
          @input_element.set_attribute :type, 'text'
          @input_element.css :z_index => 1000, :position => 'absolute', :outline =>'none', :border => 0, :background => 'none'
          @input_element.frame = cell_frame
          `#{@input_element.element}.value = "wtf!!!!!";`
          control_view.element << @input_element
        end
      end
      # if ctx.first_time?
        # ctx << "<div class='bezel' style='top:0px;right:0px;bottom:0px;left:0px'></div>"
      # end
      # render bezel
      # ctx.selector :bezel do |bezel|
        # case @bezel_style
        # when :none
        # else
          # BEZEL_IMAGES[@bezel_style].render_with_frame(cell_frame)
        # end
      # end
      ctx.build do
        # ctx.css :z_index => 0
        # draw bezel
        case @bezel_style
        when :none
        else
          BEZEL_IMAGES[@bezel_style].render_with_frame(cell_frame)
        end
        
        # title
        # we dont want to render a title if we are a textfield, as the raw input
        # element will render the title for us
        unless @input_element
          # puts rendering here..
          attributed_value.render_in_rect(Rect.new(2,2,cell_frame.width, cell_frame.height))
        end
      end
      # ctx = RenderContext.current_context
      # if ctx.first_time?
      #   ctx.css :background_color => 'white'
      #   ctx << "<div class='bezel'></div>"
      #   
      #   # if controlview is a textfield, then use input, otherwise use a span
      #   # we do not want tableviews etc to become littered with input elements
      #   if control_view.is_a?(TextField)
      #     ctx << "<input class='input' style='outline:none;border:0px;background:none;top:0px;left:0px;right:0px;bottom:0px;'/ >"
      #   else
      #     ctx << "<div class='input'></div>"
      #   end
      # end
      #             
      # ctx.selector :input do |input|
      #   if control_view.is_a?(TextField)
      #   else
      #     input.inner_text = @value
      #   end
      # end
      # 
      # 
    end
    
    def attributed_value
      return @value if @value.is_a?(AttributedString)
      
      attributes = { }
      attributes[:font] = @font if @font
      attributes[:color] = (@enabled ? Color.text_color : Color.disabled_control_text_color)
      
      paragraph_style = ParagraphStyle.default_paragraph_style
      # paragraph_style.line_break_mode = @line_break_mode
      paragraph_style.alignment = @alignment
      attributes[:paragraph_style] = paragraph_style
      
      AttributedString.new(@value, attributes)
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
