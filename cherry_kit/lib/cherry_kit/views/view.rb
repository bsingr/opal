# 
# view.rb
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

require File.join(File.dirname(__FILE__), '..', 'foundation', 'responder')

module CherryKit
  
  class View < Responder
    
    builder_name :view
    
    builder_defaults :frame => [0, 0, 100, 100], :display => true
    
    # for builder..
    def init_with_options(options)
      initialize(options.delete :frame)
    end
    
    def initialize(frame)
      @frame = frame
      @subviews = []
      _platform_initialize(frame)
    end
    
    def <<(view)
      unless @subviews.include? view
        @subviews << view
        _platform_add_subview view
      end
    end
    
    def add_subview(view)
      self << view
    end
  end
end