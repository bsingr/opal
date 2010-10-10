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
  
  # @group Browser and feature detection
  
  # Returns `true` if the current browser is Opera, `false` otherwise.
  # 
  # @return [Boolean]
  def self.opera?
    @__is_opera__ ||= `(opal.browser.opera ? #{true} : #{false})`
  end
  
  # Returns `true` if the current browser is Safari, `false` otherwise.
  # 
  # @return [Boolean]
  def self.safari?
    @__is_safari__ ||= `(opal.browser.safari ? #{true} : #{false})`
  end
  
  # Returns `true` if the current browser is Internet Explorer, `false` 
  # otherwise.
  # 
  # @return [Boolean]
  def self.msie?
    @__is_msie__ ||= `(opal.browser.msie ? #{true} : #{false})`
  end
  
  # Returns `true` if the current browser is Firefox, `false` otherwise.
  # 
  # @return [Boolean]
  def self.firefox?
    @__is_firefox__ ||= `(opal.browser.firefox ? #{true} : #{false})`
  end
  
  # Returns true or false to indicate whether this browser is on a touch
  # platform or not
  def self.touch?
    @__is_touch__ ||= `(('createTouch' in document) ? #{true} : #{false})`
  end
  
  # @endgroup
  
  # @group Platform detection
  
  
  # @endgroup
  
  # Returns the document element
  def self.document
    return @document_element if @document_element
    
    @document_element = Element.from_native(`document`)
    # def @document_element.inspect
      # "#<Element document>"
    # end
    
    @document_element
  end
  
  # Returns the window element
  def self.window
    return @window_element if @window_element
    
    @window_element = Element.from_native(`window`)
    # def @window_element.inspect
      # "#<Element window>"
    # end
    
    @window_element
  end
  
  def self.alert(message = "")
    `return alert(#{message});`
  end
end

# Browser.extend Browser
# include Browser

require 'browser/string'
require 'browser/window'
require 'browser/document'
require 'browser/sizzle.js'
require 'browser/element'
require 'browser/event/event'
require 'browser/geometry'
require 'browser/request/request'
require 'browser/builder'
require 'browser/canvas_context'
require 'browser/vml_context.js'
require 'browser/dimensions'
require 'browser/touch'
