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
  # @param [Symbol, String] type the tag name for the +Element+ to have
  # @param [Hash] options a set of options given to {#set}
  # @return [Element] returns the new element
  def initialize(type, options = {})
    `if (!#{options}) { #{options} = vnH()}`
    # puts "creating new element #{type}"
    `#{self}.__element__ = document.createElement(#{type.to_s});`
    set options
  end
  
  # Return an instance with the passed native element as the instance's own
  # element. This is used to return the body element, for instance
  # 
  #     Element.from_native(..some native element pointer..)
  #     # => element
  # 
  # @param [Native Element] element
  # @return [Element]
  # 
  def self.from_native(native_element)
    #`console.log("loogking up for "  + #{native_element});`
    `if(!#{native_element}) return #{nil};`
    element = allocate
    `#{element}.__element__ = #{native_element};`
    element
  end
  
  # Return the body element for the document. The body element is an instance
  # of this class, with some singleton methods defined, such as inspect so
  # that it gets some nicer inspect properties.
  # 
  # @return [Element] body element
  # 
  def self.body
    return @body_element if @body_element
    
    @body_element = from_native(`document.body`)
    def @body_element.inspect
      "#<Element body>"
    end
    
    @body_element
  end
  
  # Find the DOM selector in the given context. Context should always be 
  # given. 
  # 
  #     Element.find_in_context('.first', Element.body)
  # 
  # @param [String|Synbol] selector
  # @param [Element] context
  # @returns Array
  # 
  def self.find_in_context(selector, context)
    selector = `'#' + #{selector.to_s}` if selector.is_a? Symbol
    elements = `Sizzle(#{selector}, #{context}.__element__);`
    # if elements.length == 1
      # `return #{Element}.$from_native(#{elements}[0]);`
    # else
      # `console.log(#{elements});`
      # raise "need to handle find_in_context array"
    # end
    
    elements.map do |e|
      from_native e
    end
  end
  
  def find(selector)
    self.class.find_in_context selector, self
  end
  
  # Returns the tag name of the Element as a symbol, in lower case.
  # 
  # @example HTML
  #     <div id="my_div"></div>
  # 
  # @example Ruby
  #     Document[:my_div].tag
  #     # => :div
  # 
  # @return [Symbol] tag name of the element
  def tag
    @tag ||= `#{self}.Y(#{self}.__element__.tagName.toLowerCase())`
  end
  
  # Sets the innerHTML of the receiver.
  #
  # @example HTML
  #     <div id="foo"></foo>
  # 
  # @example Ruby
  #     Document[:foo].html = "<div></div>"
  # 
  # @example Result
  #     <div id="foo">
  #       <div></div>
  #     </div>
  # 
  # @param [String] html the html string to set
  # @return [Elements] returns the receiver
  def html=(html)
    `#{self}.__element__.innerHTML = #{html};`
    self
  end
  
  # Returns the text content of the receiver.
  # 
  # @example HTML
  #     <div id="foo">bar</div>
  # 
  # @example Ruby
  #     Document[:foo].text   # => "bar"
  # 
  # @return [String] the receivers text content
  def text
    `var e = #{self}.__element__;
    return e.innerText == null ? e.textContent : e.innerText;`
  end
  
  # Set the inner text content of the receiver.
  # 
  # @example HTML
  #     <div id="foo"></div>
  # 
  # @example Ruby
  #     Document[:foo].text = "bar"
  # 
  # @example Result
  #     <div id="foo">bar</div>
  # 
  # @param [String] text the text content to set
  # @return [Element] returns the receiver
  def text=(text)
    `var e = #{self}.__element__;
    if (e.textContent !== undefined) {
      e.textContent = #{text}.toString();
    }
    else {
      e.innerText = #{text}.toString();
    }`
    self
  end
  
  # Set the id of the receiver
  # 
  # @example HTML
  #     <div class="foo"></div>
  # 
  # @example Ruby
  #     Document['.foo'].first.id = "bar"
  # 
  # @example Result
  #     <div class="foo" id="bar"></div>
  # 
  # @param [String, Symbol] id the id to set on the element
  # @return [Element] returns the receiver
  def id=(id)
    `#{self}.__element__.id = #{id.to_s};`
    self
  end
  
  # Returns the id of the receiver as a +Symbol+, or +nil+ if no id is defined.
  # 
  # @example HTML
  #     <div id="foo" class="bar"><div>
  #     <div class="baz"</div>
  # 
  # @example Ruby
  #     Document['.bar'].first.id     # => :foo
  #     Document['.baz'].first.id     # => nil
  # 
  # @return [Symbol, nil] returns the id of the receiver
  def id
    `return #{self}.__element__.id || #{nil};`
  end
  
  # Returns +true+ if the receiver is the body element, +false+ otherwise
  # 
  # @example Testing Elements
  #     Document[:foo].body?    # => false
  #     Document.body.body?     # => true
  # 
  # @return [true, false] whether the receiver is the body element
  def body?
    false
  end
  
  def inspect
    description = ["#<Element #{tag}"]
    description << " class_name='#{class_name}'" unless class_name == ""
    description << " id='#{id}'" unless id == ""
    description << ">"
    description.join ""
  end
  
  # What to do with each option
  SET_OPTIONS = {
    :class_name => :class_name=,
    :content    => :text=,
    :id         => :id=
  }
  
  # Set some options on the element
  # 
  #     element.set :class_name => "adam", :id => "beynon"
  # 
  # @param [Hash] options to set
  # @return [Element] returns the receiver
  def set(options)
    options.each do |key, value|
      method = SET_OPTIONS[key]
      raise "Bad Element.set key #{key}" unless method
      __send__ SET_OPTIONS[key], value
    end
  end
  
  # =========================================
  # = Inserting/appending/removing children =
  # =========================================
  
  # Insert the given element in location :bottom
  # 
  # @param [Element] element the element to insert
  # @return [Element] returns the receiver
  def <<(element)
    append element
  end
  
  # Insert the given +element+ at the bottom of the receiver
  # 
  # @param [Element] element the element to append
  # @return [Element] returns the receiver
  def append(element)
    `#{self}.__element__.appendChild(#{element}.__element__);`
    self
  end
  
  # Insert the given +element+ before the receiver
  # 
  # @param [Element] element the element to insert
  # @return [Element] returns the receiver
  def before(element)
    `var parent = #{self}.__element__.parentNode;
    if (parent) {
      parent.insertBefore(#{element}.__element__, #{self}.__element__);
    }`
    self
  end
  
  # Insert the given +element+ after the receiver, but before the next sibling
  # 
  # @param [Element] element the element to insert
  # @return [Element] returns the receiver
  def after(element)
    `var parent = #{self}.__element__.parentNode;
    if (parent) {
      parent.insertBefore(#{element}.__element__, #{self}.__element__.nextSibling);
    }`
    self
  end
  
  # Removes the receiver from the DOM
  # 
  # @example HTML
  #     <div id="foo"></div>
  #     <div id="bar"></div>
  # 
  # @example Ruby
  #     Document[:foo].dispose
  # 
  # @example Result
  #     <div id="bar"></div>
  # 
  # @return [Element] returns the receiver.
  # 
  def dispose
    `var e = #{self}.__element__;
    if (e.parentNode) {
      e.parentNode.removeChild(e);
    }`
    self
  end
  
  # Removes all child elements from the receiver
  # 
  # @example HTML
  #     <div id="foo">
  #       <span class="bar"></span>
  #       <div class="baz"></div>
  #     </div>
  # 
  # @example Ruby
  #     Document[:foo].empty
  # 
  # @example Result
  #     <div id="foo"></div>
  # 
  # @return [Element] returns receiver
  def empty
    `var e = #{self}.__element__;
    for (var children = e.childNodes, i = children.length; i > 0;) {
      var child = children[--i];
      if (child.parentNode) {
        child.parentNode.removeChild(child);
      }
    }`
    self
  end
  
  # Removes all children from the receiver and then removes the receiver itself
  # from the DOM tree
  # 
  # @return [nil] returns nil
  def destroy
    # FIXME: we do not do this properly.
    dispose
  end
  
  
  # Return the graphics context of the receiver, which will be an instance of
  # [CanvasContext] or a subclass (for VML browsers). Everytime this method is
  # called, the native 'getContext' method is applied for complaince with its
  # side effects (clearing context etc)
  # 
  # @return [CanvasContext] the canvas context for the receiver
  def context
    CanvasContext.new self
  end

  
  # ========================
  # = Parent, children etc =
  # ========================
  
  
  # Get the parent of the receiver
  # 
  # @return [Element] the parent
  def parent(selector=nil)
    Document.traverse self, 'parentNode', nil, false
  end
  
  def parents(selector=nil)
    Document.traverse self, 'parentNode', nil, true
  end
  
  def next(selector=nil)
    Document.traverse self, 'nextSibling', nil, false
  end
  
  def prev(selector=nil)
    Document.traverse self, 'previousSibling', nil, false
  end
  
  def first(selector=nil)
    Document.traverse self, 'firstChild', nil, false
  end
  
  def last(selector=nil)
    Document.traverse self, 'lastChild', nil, false
  end
  
  
  # Append the element. If string passed, then add as html content
  # 
  def <<(elem)
    append elem
    self
  end
  
  # Returns the offset of the element, taking into account the parents, scroll
  # values, etc etc. needs improving, not 100% for all browsers
  # 
  # @returns {Hash} :left/:top => Number
  # 
  def element_offset
    left = 0
    top = 0
    
    `var element = #{self}.__element__;
    var parent = element;
    while (parent) {
      #{left} += parent.offsetLeft;
      #{top} += parent.offsetTop;
      parent = parent.offsetParent;
    }
    `
    Point.new left, top
  end
  
  # All valid html tags. These are looped over so each element instance has
  # an instance method of the same name to construct an element of that type
  # with some given options
  VALID_HTML_TAGS = [
    :html, :head, :title, :base, :meta, :link, :style, :script, :body, :div,
    :dl, :dt, :dd, :span, :pre
  ]
  
  VALID_HTML_TAGS.each do |tag_name|
    define_method(tag_name) do |options|
      # options are the options to se
      e = Element.new tag_name, options
      # now add to self
      self << e
      # return new element (for chaining)
      e
    end
  end
end
