# 
# window_template.rb
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
  
  class WindowTemplate
    
    def init_with_coder(coder)
      @frame = coder.decode_rect :frame
      @title = coder.decode_object :title
      @class = coder.decode_object :class
      @content_view = coder.decode_object :content_view
      # 
      # if coder.has_key?(:min_size)
      #   @min_size = coder.decode_size :min_size
      # end
      # 
      # if coder.has_key?(:max_size)
      #   @max_size = coder.decode_size :max_size
      # end
    end
    
    def encode_with_coder(coder)
      coder.encode_rect :frame, @frame
      coder.encode_object :title, @title
      coder.encode_object :class, @class
      coder.encode_object :content_view, @content_view
    end
    
    def awake_after_using_coder(coder)
      # return VN::Window instance
      win = Window.new(@frame, [:closable])
      
      win.title = @title
      win.content_view = @content_view
      win.min_size = @min_size if @min_size
      win.max_size = @max_size if @max_size

      win
    end
  end
end