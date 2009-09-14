# 
# view.rb
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

require 'responder'

module Vienna
  
  class View < Responder
    
    AUTO_RESIZE_MASKS = [:none, :min_x, :width, :max_x, :min_y, :height, :max_y]
    
    display_properties :frame, :frame_size
    
    def init
      setup_render_context
      @frame = VN.Rect 0, 0, 0, 0
      self
    end
    
    def init_with_options(options)
      self.init_with_frame options.delete(:frame)
    end

    def init_with_frame(frame)
      @frame = frame
      @bounds = VN.Rect(0, 0, frame.size.width, frame.size.height)
      @subviews = []
      setup_render_context
      set :frame, frame
      self
    end
    
    def init_with_coder(coder)
      super
      setup_render_context
      
      @frame = VN.Rect(0, 0, 0, 0)
      @bounds = VN.Rect(0, 0, 0, 0)
      
      if coder.has_key? "NSFrame"
        @frame = coder.decode_rect_for_key "NSFrame"
      elsif coder.has_key? "NSFrameSize"
        @frame.size = coder.decode_rect_for_key "NSFrameSize"
      end
      
      set :frame, @frame
      
      # the_subviews = coder
    end
    
  end
  
end