# 
# browser.rb
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

# Browser holds all things browser related.
module Browser
  
  # Returns true/false if the browser is opera.
  # 
  # @returns true or false
  # 
  def self.opera?
    @__is_opera__ ||= `(opal.browser.opera ? #{self}.t : #{self}.f)`
  end
  
  # Returns true/false if the browser is safari.
  # 
  # @returns true or false
  # 
  def self.safari?
    @__is_safari__ ||= `(opal.browser.safari ? #{self}.t : #{self}.f)`
  end
  
  def self.msie?
    @__is_msie__ ||= `(opal.browser.msie ? #{self}.t : #{self}.f)`
  end
  
  # Returns the document element
  def self.document
    return @document_element if @document_element
    
    @document_element = Element.from_native(`document`)
    def @document_element.inspect
      "#<Element document>"
    end
    
    @document_element
  end
  
  # Returns the window element
  def self.window
    return @window_element if @window_element
    
    @window_element = Element.from_native(`window`)
    def @window_element.inspect
      "#<Element window>"
    end
    
    @window_element
  end
end

require 'browser/sizzle.js'
require 'browser/element'
require 'browser/event'
require 'browser/graphics'

# include Browser