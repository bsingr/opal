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
    
    # Actual document view
    # 
    # @attribuye {CherryKit::View} document_view
    # 
    attr_accessor :document_view
    
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

      # we want to tile as soon as possible
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
  end
end
