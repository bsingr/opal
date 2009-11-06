# 
# core_graphics.rb
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
  
  LINE_JOINS = {
    :miter            => 0,
    :round            => 1,
    :bevel            => 2
  }
  
  LINE_CAPS = {
    :butt             => 0,
    :round            => 1,
    :square           => 2
  }
  
  DRAWING_MODES = {
    :fill             => 0,
    :eofill           => 1,
    :stroke           => 2,
    :fill_stroke      => 3,
    :eofill_stroke    => 4
  }

  TEXT_DRAWING_MODES = {
    :fill             => 0,
    :stroke           => 1,
    :fill_stroke      => 2,
    :invisible        => 3,
    :fill_clip        => 4,
    :stroke_clip      => 5,
    :fill_stroke_clip => 6,
    :clip             => 7
  }
  
  class GraphicsContext < Element
    
  end
end