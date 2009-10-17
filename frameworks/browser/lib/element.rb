# 
# element.js
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

class Element
  
  attr_accessor :element
  
  def self.find(the_id)
    # document.getElementById(the_id)
    `document.getElementById(#{the_id})`
  end
  
  def initialize(type, class_name, the_id)
    # puts type
    @element = `document.createElement(#{type})`
    @type = type
    @class_name = class_name
    @id = the_id
  end
  
  def self.element_with_type type, class_name:class_name, id:the_id
    new type, class_name, the_id
  end
  
  def element
    @element
  end
  
  def origin= new_origin
    `#{element}.style.x = #{new_origin.x};`
    `#{element}.style.y = #{new_origin.y};`
  end
  
  def size= new_size
    # puts 'settig size to'
    # puts new_size
    if @type == :canvas
      `#{element}.width = #{new_size.width};`
      `#{element}.height = #{new_size.height};`
    else
      `#{element}.style.width = #{new_size.width};`
      `#{element}.style.height = #{new_size.height};`
    end
  end
  
  def <<(other)
    if other.instance_of? String
      `#{element}.innerHTML += other`
    else
      # must be an element
      `#{element}.appendChild(#{other.element})`
    end
    
  end
  
  def add_event_listener type, listener
    `if (document.addEventListener) {
      #{element}.addEventListener(#{type}, #{listener}, false);
    }
    else {
      #{element}.attachEvent(#{type}, #{listener});
    }`
  end
end