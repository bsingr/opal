# 
# scroll_view.rb
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
  
  class ScrollView < View
    
    def self.frame_size_for_content_size(content_size, has_horizontal_scroller:h_flag, has_vertical_scroller:v_flag, border_type:a_type)
      
    end
    
    def self.content_size_for_frame_size(content_size, has_horizontal_scroller:h_flag, has_vertical_scroller:v_flag, border_type:a_type)
      
    end
    
    def initialize(frame)
      super frame
      @content_view = ClipView.new(Rect.new(0, 0, 100, 100))
      @border_type = :none
      add_subview(@content_view)
    end
    
    def class_name
      'vn-scroll-view'
    end
    
    def render(context)
      # This in all likelyhood only draws in the bottom right, the square
      # between the vertical and horizontal scrollers, unless the content
      # view has transparent parts. This should use the @background_color
      # and @draws_background respectively.
      context.css :background_color => 'rgb(190, 190, 190)'
    end
    
    def document_visible_rect
      
    end
    
    def content_size
      
    end
    
    def document_view=(a_view)
      @content_view.document_view = a_view
      reflect_scrolled_clip_view(@content_view)
    end
    
    def document_view
      @content_view.document_view
    end
    
    def content_view=(content_view)
      @content_view.remove_from_superview
      @content_view = content_view
      add_subview(@content_view)
      tile
    end
    
    def content_view
      @content_view
    end
    
    def document_cursor=(an_obj)
      @document_cursor = an_obj
    end
    
    def document_cursor
      @document_cursor
    end
    
    def border_type=(a_type)
      @border_type = a_type
    end
    
    def border_type
      @border_type
    end
    
    def background_color=(a_color)
      @background_color = a_color
    end
    
    def background_color
      @background_color
    end
    
    def draws_background=(flag)
      @draws_background = flag
    end
    
    def draws_background
      @draws_background
    end
    
    def has_vertical_scroller=(flag)
      if flag
        unless @has_vertical_scroller
          @has_vertical_scroller = true
          # create scroller
          unless @vertical_scroller
            @vertical_scroller = Scroller.new(Rect.new(150, 40, 40, 15))
            @vertical_scroller.target = self
            @vertical_scroller.action = :scroll_v
          end
          add_subview(@vertical_scroller)
        end
      else
        if @has_vertical_scroller
          @has_vertical_scroller = false
          @vertical_scroller.remove_from_superview
        end
      end
      
      tile
    end
    
    def has_vertical_scroller?
      @has_vertical_scroller
    end
    
    def has_horizontal_scroller=(flag)
      if flag
        unless @has_horizontal_scroller
          @has_horizontal_scroller = true
          # create scroller
          unless @horizontal_scroller
            @horizontal_scroller = Scroller.new(Rect.new(150, 20, 40, 15))
            @horizontal_scroller.target = self
            @horizontal_scroller.action = :scroll_h
          end
          add_subview(@horizontal_scroller)
        end
      else
        if @has_horizontal_scroller
          @has_horizontal_scroller = false
          @horizontal_scroller.remove_from_superview
        end
      end
      
      tile
    end
    
    def has_horizontal_scroller?
      @has_horizontal_scroller
    end
    
    def vertical_scroller=(a_scroller)
      @vertical_scroller = a_scroller
    end
    
    def vertical_scroller
      @vertical_scroller
    end
    
    def horizontal_scroller=(a_scroller)
      @horizontal_scroller = a_scroller
    end
    
    def horizontal_scroller
      @horizontal_scroller
    end
 
    def autohides_scrollers?
      @autohides_scrollers
    end
    
    def autohides_scrollers=(flag)
      @autohides_scrollers = flag
    end
    
    
    
    def horizontal_line_scroll=(value)
      @horizontal_line_scroll = value
    end
    
    def horizontal_line_scroll
      @horizontal_line_scroll
    end
    
    def vertical_line_scroll=(value)
      @vertical_line_scroll = value
    end
    
    def vertical_line_scroll
      @vertical_line_scroll
    end
    
    def line_scroll=(value)
      @line_scroll = value
    end
    
    def line_scroll
      @line_scroll
    end
    
    
    
    def horizontal_page_scroll=(value)
      @horizontal_page_scroll = value
    end
    
    def horizontal_page_scroll
      @horizontal_page_scroll
    end
    
    def vertical_page_scroll=(value)
      @vertical_page_scroll = value
    end
    
    def vertical_page_scroll
      @vertical_page_scroll
    end
    
    def page_scroll=(value)
      @page_scroll = value
    end
    
    def page_scroll
      @page_scroll
    end
    
   
   
    def scrolls_dynamically=(flag)
      @scrolls_dynamically = flag
    end
    
    def scrolls_dynamically?
      @scrolls_dynamically
    end
    
    def tile
      # get this now..?
      header_frame = Rect.new(0, 0, 0, 0)
      header_view = nil
      
      if document_view.respond_to?(:header_view)
        header_view = document_view.header_view
        header_frame = header_view.bounds
      end
      
      # ignore border style for the moment: assume 1px border around
      bounds = Rect.new(1, 1, @bounds.width - 2, @bounds.height - 2)
      
      if @has_vertical_scroller
        frame = Rect.new(0, 0, 0, 0)
        frame.x = (bounds.x + bounds.width) - Scroller.scroller_width
        frame.y = bounds.y
        frame.width = Scroller.scroller_width
        frame.height = bounds.height
        frame.height -= Scroller.scroller_width if @has_horizontal_scroller
        # make room for header view, if exists
        if header_view
          frame.y += header_frame.height
          frame.height -= header_frame.height          
        end
        
        @vertical_scroller.frame = frame
      end
      
      if @has_horizontal_scroller
        frame = Rect.new(0, 0, 0, 0)
        frame.y = (bounds.y + bounds.height) - Scroller.scroller_width
        frame.x = bounds.x
        frame.width = bounds.width
        frame.height = Scroller.scroller_width
        frame.width -= Scroller.scroller_width if @has_vertical_scroller
        
        @horizontal_scroller.frame = frame
      end
      
      if @content_view
        frame = Rect.new(0, 0, 0, 0)
        frame.x = bounds.x
        frame.y = bounds.y
        frame.width = bounds.width
        frame.width -= Scroller.scroller_width if @has_vertical_scroller
        frame.height = bounds.height
        frame.height -= Scroller.scroller_width if @has_horizontal_scroller
        
        # make room for header view, if exists
        if header_view
          frame.y += header_frame.height
          frame.height -= header_frame.height
        end
      
        @content_view.frame = frame
      end
      
      if header_view
        unless @header_clip_view
          @header_clip_view = ClipView.new(Rect.new(0, 0, 100, 100))
          self << @header_clip_view
          @header_clip_view << header_view
          header_view.needs_display = true
        end
        
        frame = Rect.new(0, 0, 0, 0)
        frame.x = bounds.x
        frame.y = bounds.y
        frame.width = bounds.width
        frame.height = header_frame.height
        
        frame.width -= Scroller.scroller_width if @has_vertical_scroller
        @header_clip_view.frame = frame
        # check if already subview........?
        # if no headerclip view, dont create it, it must already be there...we think?
      end
      
      reflect_scrolled_clip_view(content_view)
            
    end
    
    def reflect_scrolled_clip_view(clip_view)
      
      # if document_view.nil?
        # @vertical_scroller.enabled = false
        # @horizontal_scroller.enabled = false
      # else
        
      # end
      
      if document_view
        document_rect = document_view.frame
        content_rect = clip_view.bounds

        height_delta = document_rect.height - content_rect.height
        width_delta = document_rect.width - content_rect.width
                
        @vertical_scroller.float_value = (content_rect.y - document_rect.y) / height_delta
        @vertical_scroller.knob_proportion = content_rect.height / document_rect.height
        
        @horizontal_scroller.float_value = (content_rect.x - document_rect.x) / width_delta
        @horizontal_scroller.knob_proportion = content_rect.width / document_rect.width
        
        # puts "vertical knob prop: #{content_rect.height / document_rect.height}"
      end
      
    end
    
    
    def scroll_wheel(the_event)
      
    end
    
    def scroll_v(sender)
      value = @vertical_scroller.float_value * (document_view.frame.height - @content_view.frame.height)
      @content_view.scroll_to_point(Point.new(0 - document_view.frame.x, value))
    end
    
    def scroll_h(sender)
      value = @horizontal_scroller.float_value * (document_view.frame.width - @content_view.frame.width)
      @content_view.scroll_to_point(Point.new(value, 0 - document_view.frame.y))
    end
  end
end
