# 
# document.rb
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

# The [Document] module.
module Document
  
  def self.[](selector)
    case selector
    when Symbol
      puts "need to find symbol #{selector}"
      find_by_id selector
      # puts "and here"
    when /^#/
      puts "need to find id"
      find_by_id selector
    else
      puts "need to find array of things"
      Element.find_in_context selector, self
    end
  end
  
  def self.find_by_id(id)
    puts "finding by id"
    Element.from_native `document.getElementById(#{id.to_s})`
  end
  
  @on_ready_actions = []
  @__ready__ = false
  
  def self.ready?(&proc)
    if block_given?
      if @__ready__
        yield
      else
        @on_ready_actions << proc
      end
    end
    
    @__ready__
  end
  
  # private method for when we are now ready to go! (Document is ready)
  # 
  # @private
  # 
  def self.__make_ready
    @__ready__ = true
    
    @on_ready_actions.each do |action|
      action.call
    end
  end
  
  # The body element of the page
  # 
  # @return [Element] body element of document
  def self.body
    Element.from_native `document.body`
  end
  
  # traverse the document looking for elements matching the given conditions.
  # This is mostly a private method? - uses js node names instead of opal/ruby
  # 
  # @param [Element] element the element to begin with
  # @param [String] path the path to lookup
  # @param [String] stop_state
  # @param [true, false] all boolean whether we want all results, or just first
  # @return [Element, Array<Element>] single element, or all results (all?)
  def self.traverse(element, path, stop_state, all)
    `var result = [];
    var working = #{element}.__element__[#{path}];
    while (working && (working.nodeType == 1)) {
      //console.log("working is:");
      //console.log(working);
      if (!#{all}.r) {
        return #{Element}.$from_native(working);
      } else {
        result.push(#{Element}.$from_native(working));
      }
      working = working[path];
    }
    return result`
  end
  
  # Quick hack/snippet to make document ready when opal receives triggers
  `opal.setDocumentReadyListener(function() {
    #{Document.__make_ready};
  });`

  # Document should represen the native 'document'
  `#{self}.__element__ = document;`
  
end
