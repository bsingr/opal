# 
# button_cell.rb
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

require 'button_cell_images'

module Vienna
  
  # Only :rounded and :textured_rounded are supported
  BEZEL_STYLES = {
    :rounded             => 1,
    :regular_square      => 2,
    :thick_square        => 3,
    :thicker_square      => 4,
    :disclosure          => 5,
    :shadowless_square   => 6,
    :circular            => 7,
    :textured_square     => 8,
    :help_button         => 9,
    :small_square        => 10,
    :textured_rounded    => 11,
    :round_rect          => 12,
    :recessed            => 13,
    :rounded_disclosure  => 14
  }
  
  class ButtonCell < Cell
        
    def init_text_cell str
      super str
      @transparent = false
      @highlights_by = :push_in
      @shows_state_by = :none
      @alternate_title = ""
      @alternate_image = nil
      @image_dims_when_disabled = false
      @bordered = true
      @bezeled = true
      @alignment = :center
      
      @control_tint = :blue
      @control_size = :regular
      
      @key_equivalent = ""
      @key_equivalent_modifier_mask = 0   
      
      @font = Font.bold_system_font_of_size(12)
    end
    
    def init_with_coder(coder)
      super coder
      flags = coder.decode_int :button_flags
      flags2 = coder.decode_int :button_flags2
    
      @title = coder.decode_object :contents
      @alternate_title = coder.decode_object :alternate_contents
      
      @transparent = (flags & 0x00008000).nonzero? ? true : false
      @bordered = (flags & 0x00800000).nonzero? ? true : false
      @image_dims_when_disabled = (flags2 & 0x00002000).nonzero? ? false : true
      
      bezel_style = (flags2 & 0x7) | ((flags2 & 0x20) >> 2)
      @bezel_style =  case bezel_style
        when 1
          :rounded
        when 11
          :textured_rounded
        else
          # default for non supported types
          :textured_rounded
        end
    end
    
    def init_image_cell img
      
    end
    
    def initialize
      init_text_cell 'ButtonCell'
    end
    
    # Button override
    def control_tint= control_tint
      super control_tint
      _update_button_images if @type == :switch || @type == :radio
    end

    # Button override
    def control_size= size
      super size
      _update_button_images if @type == :switch || @type == :radio
    end
    
    # Updates button images only if they are built in switch/radio
    # We should really keep track if user manually sets the image or alt image
    # for the cell - if so, we should not do any of this, and just use the user
    # supplied images. - Add bool to image= and alternate_image= so we can catch
    # this. To make sure we dont accidentally set it, only use @image to set
    # images. Nice and clean?
    # FIXME: Also decide on blue or graphite as default - blue makes more sense?
    # in which case change _BLUE to _GRAPHITE so default also lies to _BLUE, as 
    # well as if the user doesnt set anything (i.e. it uses default => blue)
    def _update_button_images
          
      if @type == :switch
        @image = SWITCH_IMAGES[@control_tint][@control_size][:normal]
        @alternate_image = SWITCH_IMAGES[@control_tint][@control_size][:alternate]
      elsif @type == :radio
        # img_name = "RADIO_IMAGE#{size_str}#{tint_str}"
        # alt_img_name= "SWITCH_HIGHLIGHTED_IMAGE#{size_str}#{tint_str}"
      end
    end
    
    def title
      @title.is_a?(AttributedString) ? @title.string : @title
    end
    
    def title=(str)
      @title = str
    end
    
    def alternate_title
      @alternate_title
    end
    
    def alternate_title=(str)
      @alternate_title = str
    end
    
    
    
    def alternate_image
      @alternate_image
    end
    
    def alternate_image= img
      @alternate_image = img
    end
    
    def image_position
      @image_position
    end
    
    def image_position= position
      @image_position = position
    end
    
    def image_scaling
      @image_scaling
    end
    
    def image_scaling= image_scaling
      @image_scaling = image_scaling      
    end
    
    # Values can be - :on :off, :mixed
    def state=(val)
      @state = val
    end
    
    def state
      @state
    end
    
    def on?
      @state == :on
    end
    
    def off?
      @state == :off
    end
    
    def mixed?
      @state == :mixed
    end
    
    
    
    def highlights_by
      @highlights_by
    end
    
    def highlights_by= a_type
      @highlights_by = a_type
    end
    
    def shows_state_by= a_type
      @shows_state_by = a_type
    end
    
    def shows_state_by
      @shows_state_by
    end
    
    def type= a_type
      @type = a_type
      case a_type
      when :momentary_light
        @highlights_by = :change_background
        @shows_state_by = :none
        @image_dims_when_disabled = true
      
      when :push_on_push_off
        @highlights_by = :push_in
        @shows_state_by = :change_background
        @image_dims_when_disabled = true
      
      when :toggle
        @highlights_by = :push_in
        @shows_state_by = :contents
        @image_dims_when_disabled = true
      
      when :switch
        @highlights_by = :contents
        @shows_state_by = :contents
        # @image_dims_when_disabled = false
        # true for 'better looking'
        @image_dims_when_disabled = true
        @image_position = :left
        # @image = SWITCH_IMAGE
        # @alternate_image = SWITCH_HIGHLIGHTED_IMAGE
        _update_button_images
        @bordered = false
        @bezeled = false
        @alignment = :left
      
      when :radio
        @highlights_by = :contents
        @shows_state_by = :contents
        # @image_dims_when_disabled = false
        # true for 'better looking'
        @image_dims_when_disabled = true
        @image_position = :left
        # @image = Image.image_named :vn_radio
        # @alternate_image = Image.image_named :vn_highlighted_radio
        _update_button_images
        @bordered = false
        @bezeled = false
        @alignment = :left
      
      when :momentary_change
        @highlights_by = :contents
        @shows_state_by = :none
        @image_dims_when_disabled = true
      
      when :on_off
        @highlights_by = :change_background
        @shows_state_by = :change_background
        @image_dims_when_disabled = true
      
      when :momentary_push_in
        @highlights_by = :push_in
        @shows_state_by = :none
        @image_dims_when_disabled = true
      end
      # @control_view.update_cell self
    end
    
    def type
      @type
    end
    
    def opaque?
      @opaue
    end
    
    def font= font_obj
      @font = font_obj
    end
    
    def transparent?
      @transparent
    end
    
    def transparent= flag
      @transparent = flag
    end
    
    
    
    def set_periodic_delay delay, interval:interval
      
    end
    
    def get_periodic_delay delay, interval:interval

    end
    
    def key_equivalent
      @key_equivalent
    end
    
    def key_equivalent= equiv
      @key_equivalent = equiv
    end
    
    def key_equivalent_modifier_mask= mask
      @key_equivalent_modifier_mask = mask
    end
    
    def key_equivalent_modifier_mask
      @key_equivalent_modifier_mask
    end
    
    def key_equivalent_font= font
      @key_equivalent_font = font
    end
    
    def key_equivalent_font
      @key_equivalent_font
    end
    
    def set_key_equivalent_font font_name, size:size
      
    end
    
    def perform_click sender
      
    end
    
    
    
    def object_value= obj
      if !obj || obj == 0 || obj == :off
        obj = :off
      else
        obj = :on
      end
      
      super obj
    end
    
    
    
    def draw_with_frame(cell_frame, in_view:control_view)
      @control_view = control_view
      return if transparent?
      
      # puts 're-drawing'
      
      `#{GraphicsContext.current_context.graphics_port}.clearRect(0, 0, #{cell_frame.width}, #{cell_frame.height});`
      
      draw_bezel_with_frame(cell_frame, in_view:control_view)
      draw_interior_with_frame(cell_frame, in_view:control_view)
    end
    
    def draw_interior_with_frame(cell_frame, in_view:control_view)
      ctx = GraphicsContext.current_context
      
      unless @image_position == :image_only
        draw_title(attributed_title, with_frame:cell_frame, in_view:control_view)
      end
      
      if @image
        case @highlights_by
        when :contents
          if on?
            draw_image(@alternate_image, with_frame:cell_frame, in_view:control_view)
          else
            draw_image(@image, with_frame:cell_frame, in_view:control_view)
          end
        else
          if @highlighted
            draw_image(@alternate_image, with_frame:cell_frame, in_view:control_view)
          else
            draw_image(@image, with_frame:cell_frame, in_view:control_view)
          end          
        end
      end
    end
    
    
    
    def draw_image image, with_frame:frame, in_view:control_view
      enabled = @enabled ? true : !@image_dims_when_disabled    
      gray_mask = @highlighted # set to true when we want gray mask?
      ctx = GraphicsContext.current_context
      image.draw_in_rect Rect.new(0, 0, image.size.width, image.size.height), enabled:enabled, gray_mask:gray_mask
    end
    
    def draw_title title, with_frame:frame, in_view:control_view
      title.draw_in_rect(title_rect_for_bounds(frame))
    end
    
    def draw_bezel_with_frame frame, in_view:control_view
      ctx = GraphicsContext.current_context
      if bordered?
        bezel_img = BEZEL_IMAGES[@bezel_style][:regular][@enabled ? (@highlighted ? :highlighted : :normal) : :disabled]
        bezel_img.draw_with_frame(frame)
      end
    end
    
    # Rendering
    
    
    def render_image(image, with_frame:frame, in_view:control_view)
      if image.is_a?(ThreeStateImage)
        image.render_with_frame(Rect.new(0, 0, image.size.width, image.size.height), (@enabled ? (@highlighted ? :highlighted : :normal) : :disabled))
      else # normal image
      image.render_with_frame(Rect.new(0, 0, image.size.width, image.size.height))
      end
    end

    def title_rect_for_bounds(the_rect)
      result = Rect.new(the_rect.x, the_rect.y, the_rect.width, the_rect.height);
      image_size = @image ? @image.size : Size.new(0, 0)
      # FIXME: we should measure text here......
      
      if @bordered
        result.width -= 4
        result.height -= 4
        result.x += 2
        result.y += 2
      end
      
      
      case @image_position
      when :left
        result.x += (image_size.width + 3) 
        result.width -= (image_size.width + 3)
      when :right
      
      when :below
        
      when :above
      
      when :overlaps
        
      end
      
      result
    end
    
    
    def render_title(title, with_frame:frame, in_view:control_view)
      ctx = RenderContext.current_context
      
      # ctx.selector :title do |title_div|
        # title_div.inner_html = title
        # title_div.frame = title_rect_for_bounds(frame)
        # puts title
        title.render_in_rect(title_rect_for_bounds(frame))
      # end
    end
  
    
    # Render the button
    def render_with_frame(cell_frame, in_view:control_view)
      @control_view = control_view 
      return if transparent?
      # puts RenderContext.current_context
      RenderContext.current_context.build do
        render_bezel_with_frame cell_frame, in_view:control_view
        render_interior_with_frame cell_frame, in_view:control_view
      end
    end
    
    # Renders the bezel
    def render_bezel_with_frame(cell_frame, in_view:control_view)
      if @bordered
        RenderContext.current_context.append :div do |bezel|
          bezel.css :top => '0px', :left => '0px', :right => '0px', :bottom => '0px'

          bezel_img = BEZEL_IMAGES[@bezel_style][:regular][@enabled ? (@highlighted ? :highlighted : :normal) : :disabled]
          bezel_img.render_with_frame(cell_frame)
        end
      end
    end
    
    # Render the interior: title & image
    def render_interior_with_frame(cell_frame, in_view:control_view)
      # puts 1
      # Render title, only if we should..
      unless @image_position == :image_only
        # puts 1.5
        render_title(attributed_title, with_frame:cell_frame, in_view:control_view)
      end
      
      # puts 2
      
      if @image
        if on?
          # img = @alternate_image || @image
          render_image @alternate_image, with_frame:cell_frame, in_view:control_view
        else
          render_image @image, with_frame:cell_frame, in_view:control_view
        end
      end
      # puts 3
    end
    
    def mouse_entered(the_event)
      
    end
    
    def mouse_exited(the_event)
      
    end
    
    
    def background_color
      @background_color
    end
    
    def background_color= color
      @background_color = color
    end
    
    
    
    def attributed_title
      # puts self
      return @title if @title.is_a?(AttributedString)
      
      attributes = { }
      attributes[:font] = @font if @font
      attributes[:color] = (@enabled ? Color.control_text_color : Color.disabled_control_text_color)
      
      paragraph_style = ParagraphStyle.default_paragraph_style
      # paragraph_style.line_break_mode = @line_break_mode
      paragraph_style.alignment = @alignment
      attributes[:paragraph_style] = paragraph_style
      
      AttributedString.new(@title, attributes)
    end
    
    def attributed_title=(obj)
      @title = obj
    end
    
    def attributed_alternate_title
      @attributed_alternate_title
    end
    
    def attributed_alternate_title= obj
      @attributed_alternate_title = obj
    end
    
    
    
    def bezel_style= bezel_style
      @bezel_style = bezel_style
    end
    
    def bezel_style
      @bezel_style
    end
    
    
    
    def sound= a_sound
      @sound
    end
    
    def sound
      @sound
    end
    
  end
end
