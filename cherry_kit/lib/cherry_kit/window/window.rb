# 
# window.rb
# cherry_kit
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

# require '/vendor/cherry_kit/lib/cherry_kit/foundation/responder'
# require '/vendor/cherry_kit/lib/cherry_kit/views/view'

module CherryKit
  
  # Window is the root object for displaying windows. This class uses the 
  # platform specific helper classes PlatformWindow for custom display.
  class Window < Responder
    
    def initialize(frame, style)
      
      _platform_initialize(frame)
      
      # self.window_view = _window_view_class_for_style(style).new(self, style)
      
      self.content_view = View.new(frame)
      # @frame = frame
      # @style = style
      # 
      # # determine window view style
      # @window_view = StandardWindowView.new(frame, style)
      # 
      # @display_context = RenderContext.new('div')
      # @display_context << @window_view.display_context
      # 
      # if Platform.browser?
      #   @platform_window = PlatformWindow.shared_window
      #   @platform_window << self
      # else
      #   # do not need this yet.
      #   # @platform_window = PlatformWindow.new(self)
      # end
    end
    
    def _window_view_class_for_style(style)
      # for now, assume everything is ":bridge", i.e. native windows, or a full
      # screen in the browser.. i.e. BridgeWindowView
      BridgeWindowView
    end
    
    # Sets the window view, i.e. the view that renders the windows chrome, 
    # buttons, title etc . if bridge, then nothing is actullly rendered.
    def window_view=(view)
      @window_view = view
      _platform_set_window_view(view)
    end
    
    # Set the content view of the window - root of view hierarchy
    def content_view=(view)
      @content_view = view
      _platform_set_content_view(view)
    end
    
    def display_context
      @display_context
    end
    
    # Append a view to this windows content_view
    def <<(view)
      content_view << view
    end
    
    # content view is the root view for the window. Actually a subview of the
    # private window_view.
    def content_view
      @content_view
    end

  end
end

module Kernel
  
  def window(given={})
    options = {
      :title => 'Window',
      :frame => [100, 100, 500, 600],
      :style => [:closable, :titled]
    }
    options.merge! given
    win = CherryKit::Window.new options.delete(:frame), options.delete(:style)
    yield win if block_given?
  end
  
end
