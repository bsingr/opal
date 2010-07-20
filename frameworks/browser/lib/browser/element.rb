# 
# element.rb
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

module Browser
  
  # Represents a DOM element in the browser.
  # 
  # Native Elements are not extended due to cross browser issues. Instead, 
  # instances of this class will have an instance property '__element__' which
  # is the native javascript element. Extensions to this class should access
  # the element in this way for modification etc. In future, this class will
  # cache some information on the element, such as class name etc in an aim to
  # speed up performance by reducing hits to the DOM.
  # 
  class Element
    
    # Creates a new element of the specified type.
    # 
    #     # create a simple div. String/Symbols are accepted
    #     element = Element.new 'div'
    #     # create a simple div with some additional class and id options
    #     element2 = Element.new :div, :class_name => 'my_class', :id => 'main'
    # 
    def initialize(type, options)
      puts "creating new element #{type}"
      `#{self}.__element__ = document.createElement(#{type.to_s});`
      set options
    end
    
    # Set some options on the element
    # 
    #     element.set :class_name => "adam", :id => "beynon"
    # 
    # @param [Hash] options
    # @returns self
    # 
    def set(options)
      options.each do |key, value|
        puts "setting #{key} with #{value}"
      end
    end
    
    # All valid html tags. These are looped over so each element instance has
    # an instance method of the same name to construct an element of that type
    # with some given options
    VALID_HTML_TAGS = [
      :html, :head, :title, :base, :meta, :link, :style, :script, :body, :div
    ]
    
    VALID_HTML_TAGS.each do |tag_name|
      define_method(tag_name) do |options|
        # options are the options to se
        e = Element.new tag_name, options
        # now add to self
        self << e
      end
    end
  end
end

puts "am i running opera?"
puts Browser.opera?

puts "am i running sfari?"
puts Browser.safari?

Browser::Element.new :div, :class => "some_class", :id => "some_title"
