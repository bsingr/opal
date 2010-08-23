# 
# scroll.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2010 Adam Beynon.
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

require 'foundation/views/view'

module CherryKit
  
  class ScrollView < View
    
    class_names 'ck-scroll-view'
    
    # Desktop (non touch) systems will have a vertical scroller (instance of
    # CherryKit::Scroller). Touch systems render the scroller themselves
    # 
    attr_reader :vertical_scroller
    
    # Again, non touch systems will have a horizontal scroller
    # 
    attr_reader :horizontal_scroller
    
    # The size of the content view's content. This is a display property/
    # 
    # @attribute {Browser::Size} content_size
    # 
    attr_accessor :content_size
    
    # The content view. Display property
    # 
    # @attribute {CherryKit::ClipView} content_view
    attr_accessor :content_view
    
    # Zoomscale. Float to determine the zoomed in scale. Default is 1.0 which
    # means the document/content is zoomed 100%, so the content is actual size.
    # 
    # @attribute {Number} zoom_scale
    # 
    attr_accessor :zoom_scale
    
    # initialize
    def initialize(layout)
      super layout
      # clip view
      self.content_view = ClipView.new(layout)
      self << self.content_view
      # these methods handle the relevant Scroller instances for desktop, or
      # just setting for touch
      self.has_vertical_scroller = true
      self.has_horizontal_scroller = true
      
      self.document_view = TestScrollingClass.new(layout)
      document_view.layout = {
        :left   => 0,
        :top    => 0,
        :width  => 700,
        :height => 700
      }
      
      # content offset - where are we. starts at 0,0
      @content_offset = Browser::Point.new 0, 0
      
      # default zoom level: 1.0 - actual size
      @zoom_scale = 1.0
      
      # we can actually receive multi touch
      @multiple_touch_enabled = true

      # we want to tile as soon as possible
      tile
    end
    
    def document_view
      @content_view.document_view
    end
    
    def document_view=(document_view)
      @content_view.document_view = document_view
      tile
    end
    
    # Set that we want a vertical scroller. (If on touch platform, this is a
    # NO-OP method)
    def has_vertical_scroller=(flag)
      return if @has_vertical_scroller == flag
      @has_vertical_scroller = flag
      # only create a Scroller instance if not on touch
      
      if flag && !Browser.touch? && !@vertical_scroller
        self.vertical_scroller = Scroller.build(:vertical => true)
      end
      
      tile
    end
    
    def capture_touches?
      true
    end
    
    # Purely for desktop
    def vertical_scroller=(scroller)
      @vertical_scroller = scroller
      self << scroller
      tile
    end
    
    def has_horizontal_scroller=(flag)
      false
    end
    
    # =========================
    # = Touch tracking/moving =
    # =========================
    
    # for now - single touch, no multitouch
    def touches_began(touches, event)
      # puts "#{self}#touches_began"
      touch = touches[0]
      content_offset = @content_offset
      location = touch.location_in_view self
      # where the last location was
      @touch_last_offset = location
      
      @tracking = true
      @dragging = false
    end
    
    def touches_moved(touches, event)
      # puts "#{self}#touches_moved"
      touch = touches[0]
      location = touch.location_in_view self
      
      # deleta is the new position and its difference from the last position
      delta_x = @touch_last_offset.x - location.x
      delta_y = @touch_last_offset.y - location.y
      
      # x direction - vertical
      if true
        @touch_last_offset.x = location.x
      end
      
      # horizontal
      if true
        @touch_last_offset.y = location.y
      end
      
      
      content_offset = @content_offset
      
      offset_x = content_offset.x - delta_x
      offset_y = content_offset.y - delta_y
      
      set_content_offset Browser::Point.new(offset_x, offset_y), false
      
  
      false
    end
    
    def touches_ended(touches, event)
      puts "#{self}#touches_ended"
    end
    
    
    def content_offset=(content_offset)
      set_content_offset content_offset, false
    end
    
    # Set the offset of the content. 0,0 implies the content will be located at
    # the origin. Animated is not yet implemented
    # 
    # @param {Browser::Point} offset for origin
    # @param {true|false} animated
    # 
    def set_content_offset(offset, animated)
      element = `#{document_view.render_context.element}.__element__`
      
      @content_offset = offset
      
      offset_x = "#{offset.x}px"
      offset_y = "#{offset.y}px"
      
      transform = "translate3d(#{offset_x}, #{offset_y}, 0px)"
      # transform = "translate"
      class_name = `#{element}.className`
      puts "setting transform to #{transform} for #{class_name}"
      `#{element}.style.webkitTransform = #{transform};`
      
      puts `#{element}.style.webkitTransform`
      
      # `#{element}.style.left = #{offset_x};`
      # `#{element}.style.top = #{offset_y};`
    end
    
    
    
    def tile
      touch = Browser.touch?
      
      vertical = @vertical_scroller
      horizontal = @horizontal_scroller
      
      # layout is the eventual layout for our clip view. This will cover the 
      # entire view for touch layouts, or will leave room for the scrollers on
      # the desktop unless the scrollers are not visible
      layout = {
        :left   => 0,
        :top    => 0
      }
      
      # tile the vertical scroller
      if vertical
        vertical.layout = {
          :width   => 20,
          :top    => 0,
          :right  => 0,
          :bottom => 0
        }
        
        layout[:right] = 20
      else
        # if no vertical scroller, then set right to 0px (fill width)
        layout[:right] = 0
      end
      
      # tile the horizontal scroller
      if horizontal
        horizontal.layout = {
          :height   => 20,
          :left    => 0,
          :right  => 0,
          :bottom => 0
        }
        
        layout[:bottom] = 20
      else
        # if no vertical scroller, then set right to 0px (fill width)
        layout[:bottom] = 0
      end

      
      @content_view.layout = layout
    end
    
    def render(render_context)
      super render_context
      
      if Browser.touch?
        # on touch browsers we get built in scrollers
        render_context << "<div class='vertical'><div class='scroller'></div></div><div class='horizontal'><div class='scroller'></div></div>"
      else
        # on non touch (desktop) browsers, we add another div for capturing
        # scroll events for native behaviour
        # render_context << "<div class='scroll-capture'></div>"
      end
    end
  end
  
  
  class TestScrollingClass < View
    
    class_names 'test-scrolling'
    
    def render(render_context)
      super render_context
      render_context << ["<div class='tl'></div>", "<div class='tr'></div>", "<div class='bl'></div>", "<div class='br'></div>"].join("")
    end
    
    def update
      super
      # render_context.element.div
    end
  end
end
