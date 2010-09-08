# 
# attributes.rb
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
  
  # @group Accessing Element Attributes
  
  # Retreive the {DataAttributeAccessor} instance for this element.
  # 
  # The returned object can then be used to modify/retrieve data items from the
  # element itself. 
  # 
  # @example HTML
  #   !!!plain
  #   <div id="some_id" data-method="delete"></div>
  # 
  # @example Accessing data attributes
  #   elem = Document[:some_id]
  #   puts elem.data[:method]
  #   # => "delete"
  # 
  # @return [DataAttributeAccessor] the attribute accessor
  def data
    @data ||= DataAttributeAccessor.new self
  end
  
  class DataAttributeAccessor
    
    def initialize(element)
      @element = element
      `#{self}.__element__ = #{element}.__element__;`
    end
    
    # Retrieve the given `key`. Returns the key as a {String} if it exists, or 
    # `nil` otherwise.
    # 
    # @return [String, nil] the data from the element.
    def [](key)
      nil
    end
    
    # Sets the new value for the given key
    # 
    # @param [String, Symbol] key
    # @param [String] value
    def []=(key, value)
      nil
    end
    
    def has_key?(key)
      false
    end
    
    def include?(key)
      has_key? key
    end
    
    def member?(key)
      has_key? key
    end
  end
  
  # @endgroup
end
