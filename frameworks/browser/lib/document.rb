# 
# document.rb
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

# `var oDocument = cObject.$c_s('Document', VN$())`

class Document
  
  # pass in a block to be run when the document is ready. these are run on a
  # 'first come first served basis', i.e. multiple blocks can be added and 
  # each will be run
  # def self.ready?(&block)
  #   blocks = @@blocks ||= []
  #   blocks << &block
  # end
  # 
  # return ready stste of browser regarless. if beowser not ready, return false,
  # or return true otherwise
  def self.ready? &block
    # `console.log('go to this point');
    # console.log(block)`
  end
  
  # Adds the element 'element' as a root element in the body tag of the document
  # 
  # - {Element} element
  # 
  def self.<< (elem)
    e = `elem.$i_g('@element')`
    
    # puts `document.body`
    `document.body.appendChild(#{e});`
  end
  
  def self.add_event_listener type, listener
    @event_listeners ||= {}
    @event_listeners[type] = listener
    `if (document.addEventListener) {
      document.body.addEventListener(#{type.to_s}, #{listener}, false);
    }
    else {
      document.body.attachEvent('on' + #{type.to_s}, #{listener});
    }`
  end
  
  def self.remove_event_listener type
    listener = @event_listeners[type]
    `if (document.addEventListener) {
      document.body.removeEventListener(#{type.to_s}, #{listener}, false);
    }
    else {
      document.body.detachEvent('on' + #{type.to_s}, #{listener});
    }`
  end
  
  def Document.age
    3
  end
end
