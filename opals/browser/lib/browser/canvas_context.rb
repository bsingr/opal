# 
# canvas_context.rb
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


class Element
  
  # Represents the 2D canvas context for HTML5. An IE compatible version is
  # being tested which will inherit this interface, but use VML for drawing
  # commands.
  class CanvasContext
    
    # Initialize the receiver for the given +Element+ instance
    # 
    # @example Ruby
    #     e = Element.new :canvas
    #     Document.body << e
    #     ctx = e.context
    #     # => #<Element::CanvasContext>
    # 
    # @param [Element] element the canvas element to create a context for
    # @return [CanvasContext] returns the receiver
    def initialize(element)
      `#{self}.__ctx__ = #{element}.__element__.getContext('2d');`
      
      `var ctx = #{self}.__ctx__;`
      # ctx.fillStyle = "red";`
      
      begin_path
      move_to 30, 30
      line_to 150, 150
      bezier_curve_to 60, 70, 60, 70, 70, 150
      line_to 30, 30
      fill :fill_style => 'blue'
    end
    
    def fill_style=(style)
      `#{self}.__ctx__.fillStyle = #{style};`
      self
    end
    
    def begin_path
      `#{self}.__ctx__.beginPath();`
      self
    end
    
    def move_to(x, y)
      `#{self}.__ctx__.moveTo(#{x}, #{y});`
      self
    end
    
    def line_to(x, y)
      `#{self}.__ctx__.lineTo(#{x}, #{y});`
      self
    end
    
    def bezier_curve_to(a, b, c, d, e, f)
      `#{self}.__ctx__.bezierCurveTo(#{a}, #{b}, #{c}, #{d}, #{e}, #{f});`
      self
    end
    
    def fill(attributes = {})
      # save current context
      save
      # apply each attribute
      set attributes
      # do our actual fill
      `#{self}.__ctx__.fill();`
      # restore back to original state
      restore
      # chainability
      self
    end
    
    def save
      `#{self}.__ctx__.save();`
      self
    end
    
    def restore
      `#{self}.__ctx__.restore();`
      self
    end
    
    def set(attributes = {})
      attributes.each do |key, value|
        puts "sending #{key}="
        __send__ "#{key}=", value
      end
      self
    end
  end
end
