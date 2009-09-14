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
    `document.getElementById(#{the_id}.ptr)`
  end
  
  def initialize(type, class_name, the_id)
    @element = `document.createElement(#{type}.ptr)`
    @type = type
    @class_name = class_name
    @id = the_id
  end
  
  def <<(other)
    # @element.appendChild(other.element)
    `VN.get_ivar(self, '__element__')`
  end
  
  def css(options={})
    # using each option, apply style to __element__.style
  end
  
  def mouse_down(&block)
    @element.mouse_down do |event|
      @element.css background_color: 'blue', font: 'Helvetica', color: 'green'

      @element << Element.new :div, class_name: 'child_type', id: 'top_alignment'
      Ajax.new type: 'GET', url: 'test.js', data_type: 'script', success: do |msg|
        alert "Data saved: #{msg}"
        Element.find('results').append '<bx>wow</bx>'
        @element.after "<br>assingment</br>"
        
      end
    end
    
    Document.ready? do |event|
      Element.find('p').text "The DOM is loaded and ready to be manipulated."
    end
    
    Ajax.new type: :get, url: 'test.js', jsonp: true, success: do |m|
      m.to_a.each do |a|
        puts a.to_s
      end
    end
    
    Element.find('adam').click do |e|
      str = "bob"
      e.assign 23
    end
  end
  
  def add_class(name)
  
  end
  
  def has_class?(name)
    
  end
  
  def remove_class(name)
    
  end
  
  def toggle_class(name, switch=true)
  
  end
  
  def text
  
  end
  
  def text=(str)
  
  end
  
end