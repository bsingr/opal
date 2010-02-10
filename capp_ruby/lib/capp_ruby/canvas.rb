# 
# canvas.rb
# cappruby
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

module CappRuby

  class Canvas
  
    # Access to the CGContextRef - Canvas 2d context for w3c, or CG VML context
    # for IE. Use this as you would the graphics port for raw drawing).
    attr_reader :ctx
  
    # Canvas.for_current_context(&block)
    # 
    # Creates a Canvas for the current context from CPGraphicsContext. If a block
    # is provided, then it is yield with the canvas as the sole parameter.
    # 
    # Usage:
    # 
    #   def drawRect(rect)
    #     # current context will be this view.
    #     Canvas.for_current_context do |c|
    #       c.move_to 10, 10
    #       c.line_to 100, 100
    #       ...
    #     end
    #   end
    # 
    def self.for_current_context(&block)
      c = self.new(CPGraphicsContext.currentContext.graphicsPort)
      yield c if block_given?
      c
    end
  
    def self.for_view(view, &block)
      view.lockFocus
      c = self.new(CPGraphicsContext.currentContext.graphicsPort)
      yield c if block_given?
      view.unlockFocus
      c
    end
  
    def initialize(ctx)
      @ctx = ctx
    end
  
    def fill(x, y, w, h)
      CGContextFillRect(@ctx, CGRectMake(x, y, w, h))
    end
  
    def move_to(x, y)
      CGContextMoveToPoint(@ctx, x, y)
    end
  
    def line_to(x, y)
      CGContextAddLineToPoint(@ctx, x, y)
    end
  
    def curve_to(cpx, cpy, c2x, c2y, x, y)
      CGContextAddCurveToPoint(@ctx, cpx, cpy, c2x, c2y, x, y)
    end
  
    def stroke_color=(color)
      CGContextSetStrokeColor(@ctx, color)
    end
  
    def fill_color=(color)
      CGContextSetFillColor(@ctx, color)
    end
  
    def line_width=(width)
      CGContextSetLineWidth(@ctx, width)
    end
  
    def stroke_path(x, y, &block)
      CGContextBeginPath(@ctx)
      CGContextMoveToPoint(@ctx, x, y)
      yield if block_given?
      CGContextStrokePath(@ctx)
      CGContextClosePath(@ctx)
    end
  end
end
