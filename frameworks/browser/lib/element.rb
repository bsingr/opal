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
  
  def initialize(type, options)
    # puts type
    @element = `document.createElement(#{type.to_s})`
    @type = type
    # @class_name = class_name
    # @id = the_id
  end
  
  def element
    @element
  end
  
  def class_name= name
    `#{element}.className = name;`
  end
  
  # Sets the CSS style on the element with the given hash of CSS selector names
  # These will override any CSS class defintions as per usual
  def css options
    options.each do |key, value|
      `#{element}.style[#{key.to_s.camelize}] = value;`
    end
    self
  end
  
  def set_attribute(key, value)
    `#{element}.setAttribute(#{key.to_s}, value);`
  end
  
  def src= obj
    `#{element}.src = obj;`
  end
  
  def inner_text=(str)
    `#{element}.innerHTML = str;`
  end
  
  def frame= new_frame
    # puts 'Setting element frame to'
    # puts new_frame
    self.origin = new_frame.origin
    self.size = new_frame.size
  end
  
  def origin= new_origin
    `#{element}.style.left = #{new_origin.x} + 'px';`
    `#{element}.style.top = #{new_origin.y} + 'px';`
  end
  
  def size= new_size
    # puts 'settig size to'
    # puts new_size
    if @type == 'canvas'
      `#{element}.width = #{new_size.width};`
      `#{element}.height = #{new_size.height};`
    else
      `#{element}.style.width = #{new_size.width} + 'px';`
      `#{element}.style.height = #{new_size.height} + 'px';`
    end
  end
  
  def remove(other)
    `#{element}.removeChild(#{other.element});`
  end
  
  def <<(other)
    if other.instance_of?(String) || other.instance_of?(Number)
      `#{element}.innerHTML += other;`
    elsif other.nil?
      # do nothing..
    else
      # must be an element
      `#{element}.appendChild(#{other.element});`
    end
  end
  
  def append_raw_element(raw_element)
    `#{element}.appendChild(#{raw_element});`
  end
  
  def inner_html= str
     `#{element}.innerHTML = str;`
  end
  
  # New preferred way to add events to the element. Event handles are stored
  # within the element object, so they can be easily removed.
  def observe(type, &block)
    @event_listeners ||= {}
    @event_listeners[type] = block
    `if (document.addEventListener) {
      #{element}.addEventListener(#{type.to_s}, #{listener}, false);
    }
    else {
      #{element}.attachEvent('on' + #{type.to_s}, #{listener});
    }`
  end
  
  def add_event_listener type, listener
    `if (document.addEventListener) {
      #{element}.addEventListener(#{type.to_s}, #{listener}, false);
    }
    else {
      #{element}.attachEvent('on' + #{type.to_s}, #{listener});
    }`
  end
  
  # def self.add_event_listener type, listener
  #   @event_listeners ||= {}
  #   @event_listeners[type] = listener
  #   `if (document.addEventListener) {
  #     document.body.addEventListener(#{type}, #{listener}, false);
  #   }
  #   else {
  #     document.body.attachEvent('on' + #{type}, #{listener});
  #   }`
  # end
  # 
  # def self.remove_event_listener type
  #   listener = @event_listeners[type]
  #   `if (document.addEventListener) {
  #     document.body.removeEventListener(#{type}, #{listener}, false);
  #   }
  #   else {
  #     document.body.detachEvent('on' + #{type}, #{listener});
  #   }`
  # end
end