# 
# scroll_view.rb
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
  
  class ScrollViewDesktop < View
    
    register_builder :scroll_view,
      {}
    
    class_names 'ck-scroll-view'
    
    attr_accessor :vertical_scroller, :horizontal_scroller
    
    def initialize(layout)
      super layout
      
      @content_view = ClipView.new
      self << @content_view
      
      @header_clip_view = ClipView.new
      self << @header_clip_view
      
      self.has_vertical_scroller = true
      self.has_horizontal_scroller = true
    end
    
    def document_view
      @content_view.document_view
    end
    
    def document_view=(document_view)
      @content_view.document_view = document_view
      
      reflect_scrolled_clip_view @content_view
    end
    
    def reflect_scrolled_clip_view(clip_view)
      return unless @content_view == clip_view
      
      document_view = self.document_view
      
      # handle case where we have no document view..
      
      @content_view.layout = {
        :left => 0,
        :top  => 20,
        :bottom => 16,
        :right => 16
      }
      
      @header_clip_view.layout = {
        :left   => 0,
        :top    => 0,
        :right  => 16,
        :height => 20
      }
      
      if @vertical_scroller
        @vertical_scroller.layout = {
          :right  => 0,
          :top    => 20,
          :bottom => 16,
          :width  => 16
        }
      end
      
      if @horizontal_scroller
        @horizontal_scroller.layout = {
          :left   => 0,
          :bottom => 0,
          :right  => 16,
          :height => 16
        }
      end
    end
    
    def has_vertical_scroller=(flag)
      # puts "making vertical scroller"
      return if @has_vertical_scroller == flag
      # puts "need to set"
      @has_vertical_scroller = flag
      
      # if we want a scroller, but have not yet made one... make one
      if flag && !@vertical_scroller
        # self.vertical_scroller = Scroller.build({
        #           :layout => {
        #             :height => 24,
        #             :width  => layout[:width]
        #           }
        #         })
        self.vertical_scroller = Scroller.build(:vertical => true)
      end
      
      reflect_scrolled_clip_view @content_view
    end
    
    def has_horizontal_scroller=(flag)
      return if @has_horizontal_scroller == flag
      
      @has_horizontal_scroller = flag
      
      if flag && !@horizontal_scroller
        self.horizontal_scroller = Scroller.new
      end
    end
    
    def vertical_scroller=(vertical_scroller)
      # remove old..
      
      @vertical_scroller = vertical_scroller
      # vertical_scroller.on_action do
        # _vertical_scroller_did_scroll
      # end
      self << vertical_scroller
      reflect_scrolled_clip_view @clip_view
    end
    
    def horizontal_scroller=(horizontal_scroller)
      @horizontal_scroller = horizontal_scroller
      
      self << horizontal_scroller
      reflect_scrolled_clip_view @clip_view
    end
    
  end
end
