# Represents a DOM element in the browser.
# 
# ## Implementation Details
# 
# Native Elements are not extended due to cross browser issues. Instead, 
# instances of this class will have an instance variable '@element' which
# is the native javascript element. Extensions to this class should access
# the element in this way for modification etc. In future, this class will
# cache some information on the element, such as class name etc in an aim to
# speed up performance by reducing hits to the DOM.
class Element
  # @group Managing Elements in the Document
  
  # Creates a new element of the specified type.
  # 
  # @param [Symbol, String] type the tag name for the +Element+ to have
  # @param [Hash] options a set of options given to {#set}
  # @return [Element] returns the new element
  def initialize(type, options = {})
    `#{self}.$element = document.createElement(#{type.to_s})`
    set options
  end
  
  # An accessor for the native element. This should rarely be used externally,
  # but it is useful for interal library construction. 
  # 
  # @note This returns a native javascript element object that will not respond
  # to ruby methods/calls.
  # 
  # @return [NativeElement]
  def element
    @element
  end
  
  # Equal - returns `true` if `other` is the same element as the receiver, 
  # `false` otherwise
  # 
  # @return [Boolean]
  def ==(other)
    `return #{self}.$element === #{other.element} ?  #{true} : #{false};`
  end

  # Return an instance with the passed native element as the instance's own
  # element. This is used to return the body element, for instance
  # 
  #   Element.from_native(..some native element pointer..)
  #   # => element
  # 
  # @note The given element MUST be a Javascript element, not an Opal one.
  # 
  # @param [NativeElement] element
  # @return [Element]
  def self.from_native(native_element = nil)
    element = allocate
    # element.instance_variable_set '@element', native_element
    `#{element}.$element = #{native_element}`
    element
  end
  
  # Find the DOM selector in the given context. Context should always be 
  # given. 
  # 
  # @example
  #   Element.find_in_context('.first', Element.body)
  # 
  # @param [String, Synbol] selector
  # @param [Element] context
  # @return [Array]
  def self.find_in_context(selector, context)
    selector = `'#' + #{selector.to_s}` if selector.is_a? Symbol
    elements = `Sizzle(#{selector}, #{context}['@element'])`
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
    @tag ||= `#{self}.$element.tagName.toLowerCase()`.to_sym
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
    `#{self}.$element.innerHTML = #{html}`
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
    `var e = #{self}.$element;
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
    `var e = #{self}.$element;
    if (e.textContent !== undefined) {
      e.textContent = #{text}.toString();
    }
    else {
      e.innerText = #{text}.toString();
    }
    return #{self};`
  end
  
  alias_method :content=, :text=
  
  # Returns +true+ if the receiver is the body element, +false+ otherwise
  # 
  # @example Testing Elements
  #     Document[:foo].body?    # => false
  #     Document.body.body?     # => true
  # 
  # @return [true, false] whether the receiver is the body element
  def body?
    tag == :body
  end
  
  def to_s
    description = ["#<Element #{tag}"]
    description << " class='#{class_name}'" unless class_name == ""
    description << " id='#{id}'" if id
    description << ">"
    description.join ""
    # "#Element #{tag}"
    # description
  end
    
  # Set some options on the element
  # 
  # @example
  #   element.set :class_name => "adam", :id => "beynon"
  # 
  # ## Valid keys:
  # 
  # - class / class_name
  # - id
  # - text /content
  # - html
  # 
  # @param [Hash] options to set
  # @return [Element] returns the receiver
  def set(options)
    options.each do |key, value|
      __send__ "#{key}=", value
    end
  end
  
  # Returns `true` if the receiver is empty (contains only whitespace), `false`
  # otherwise.
  # 
  # @example HTML
  #   !!!plain
  #   <div id="foo"></div>
  #   <div id="bar"><p></p></div>
  #   <div id="baz">   </baz>
  # 
  # @example Ruby
  #   Document[:foo].empty?
  #   # => true
  #   Document[:bar].empty?
  #   # => false
  #   Document[:baz].empty?
  #   # => true
  # 
  # @return [Boolean]
  def empty?
    `return /^\s*$/.test(#{self}.$element.innerHTML) ? #{true} : #{false};`
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
  
  # Private method? generally ignore this.
  # 
  # Should this be opened up?... maybe
  # 
  # @return [NativeElement] native fragment
  def fragment_from_string(str)
    `var frag = document.createDocumentFragment();
    var div = document.createElement('div');
    div.innerHTML = #{str};
    while (div.firstChild) {
      frag.appendChild(div.firstChild);
    }
    return frag;`
  end
  
  # @group Inserting and Removing Elements
  
  # Insert the new content `element` to the end of the receiver. `element` may
  # be either another {Element}, or a string.
  # 
  # {#<<} is an alias for append, and can also take a string or element 
  # argument.
  # 
  # ## Appending String Content
  # 
  # @example HTML
  #   !!!plain
  #   <div id="foo">
  #     <div class="bar"></div>
  #     <div class="baz"></div>
  #   </div>
  # 
  # @example Ruby
  #   Document[:foo].append "<div class='buz'></div>"
  # 
  # @example Result HTML
  #   !!!plain
  #   <div id="foo">
  #     <div class="bar"></div>
  #     <div class="baz"></div>
  #     <div class="buz"></div>
  #   </div>
  # 
  # ## Appending an Element
  # 
  # @example HTML
  #   !!!plain
  #   <div id="bing">
  #     <div id="bong"></div>
  #   </div>
  #   <div id="foo">
  #     <div class="bar"></div>
  #     <div class="baz"></div>
  #   </div>
  # 
  # @example Ruby
  #   Document[:foo].append Document[:bong]
  # 
  # @example Result HTML
  #   !!!plain
  #   <div id="bing"></div>
  #   <div id="foo">
  #     <div class="bar"></div>
  #     <div class="baz"></div>
  #     <div id="bong"></div>
  #   </div>
  # 
  # Note that appending an element will remove the element from its current 
  # parent and move it into the new parent.
  # 
  # @param [Element, String] element the element or string to append
  # @return [Element] returns the receiver
  def append(element)
    e = element.is_a?(String) ? fragment_from_string(element) : `#{element}.$element`
    `#{self}.$element.appendChild(#{e})`
    self
  end
  
  alias_method :<<, :append
  
  # Insert the new content `element` to the beginning of the receiver. `element`
  # may be either another {Element}, or a string.
  # 
  # ## Prepending String Content
  # 
  # @example HTML
  #   !!!plain
  #   <div id="foo">
  #     <div class="bar"></div>
  #     <div class="baz"></div>
  #   </div>
  # 
  # @example Ruby
  #   Document[:foo].prepend "<div class='buz'></div>"
  # 
  # @example Result HTML
  #   !!!plain
  #   <div id="foo">
  #     <div class="buz"></div>
  #     <div class="bar"></div>
  #     <div class="baz"></div>
  #   </div>
  # 
  # ## Prepending an Element
  # 
  # @example HTML
  #   !!!plain
  #   <div id="bing">
  #     <div id="bong"></div>
  #   </div>
  #   <div id="foo">
  #     <div class="bar"></div>
  #     <div class="baz"></div>
  #   </div>
  # 
  # @example Ruby
  #   Document[:foo].prepend Document[:bong]
  # 
  # @example Result HTML
  #   !!!plain
  #   <div id="bing"></div>
  #   <div id="foo">
  #     <div id="bong"></div>
  #     <div class="bar"></div>
  #     <div class="baz"></div>
  #   </div>
  # 
  # Note that prepending an element will remove the element from its current 
  # parent and move it into the new parent.
  # 
  # @param [Element, String] element the element or string to prepend
  # @return [Element] returns the receiver
  def prepend(element)
    e = element.is_a?(String) ? fragment_from_string(element) : element.element
    `#{self}.$element.insertBefore(#{e}, #{self}.$element.firstChild)`
    self
  end
  
  # Insert the the new content `element` before the receiver. `element` may be
  # either another {Element}, or a string.
  # 
  # ## Inserting String Content Before
  # 
  # # @example HTML
  #   !!!plain
  #   <div id="foo">
  #     <div class="bar"></div>
  #     <div class="baz"></div>
  #   </div>
  # 
  # @example Ruby
  #   Document[:foo].before "<div class='buz'></div>"
  # 
  # @example Result HTML
  #   !!!plain
  #   <div class="buz"></div>
  #   <div id="foo">
  #     <div class="bar"></div>
  #     <div class="baz"></div>
  #   </div>
  # 
  # ## Inserting an Element Before
  # 
  # @example HTML
  #   !!!plain
  #   <div id="bing">
  #     <div id="bong"></div>
  #   </div>
  #   <div id="foo">
  #     <div class="bar"></div>
  #     <div class="baz"></div>
  #   </div>
  # 
  # @example Ruby
  #   Document[:foo].before Document[:bong]
  # 
  # @example Result HTML
  #   !!!plain
  #   <div id="bing"></div>
  #   <div id="bong"></div>
  #   <div id="foo">
  #     <div class="bar"></div>
  #     <div class="baz"></div>
  #   </div>
  # 
  # Note that prepending an element will remove the element from its current 
  # parent and move it into the new parent.
  # 
  # @param [Element, String] element the element or string to insert
  # @return [Element] returns the receiver
  def before(element)
    e = element.is_a?(String) ? fragment_from_string(element) : element.element
    parent = `#{self}.$element.parentNode`
    `#{parent} && #{parent}.insertBefore(#{e}, #{self}.$element)`
    # if (parent) {
      # parent.insertBefore(#{e}, #{self}.$element);
    # }`
    self
  end
  
  # Insert the new content `element` after the receiver. `element` may be
  # either another {Element}, or a string.
  # 
  # ## Inserting String Content After
  # 
  # # @example HTML
  #   !!!plain
  #   <div id="foo">
  #     <div class="bar"></div>
  #     <div class="baz"></div>
  #   </div>
  # 
  # @example Ruby
  #   Document[:foo].after "<div class='buz'></div>"
  # 
  # @example Result HTML
  #   !!!plain
  #   <div id="foo">
  #     <div class="bar"></div>
  #     <div class="baz"></div>
  #   </div>
  #   <div class="buz"></div>
  # 
  # ## Inserting an Element After
  # 
  # @example HTML
  #   !!!plain
  #   <div id="bing">
  #     <div id="bong"></div>
  #   </div>
  #   <div id="foo">
  #     <div class="bar"></div>
  #     <div class="baz"></div>
  #   </div>
  # 
  # @example Ruby
  #   Document[:foo].after Document[:bong]
  # 
  # @example Result HTML
  #   !!!plain
  #   <div id="bing"></div>
  #   <div id="foo">
  #     <div class="bar"></div>
  #     <div class="baz"></div>
  #   </div>
  #   <div id="bong"></div>
  # 
  # Note that prepending an element will remove the element from its current 
  # parent and move it into the new parent.
  # 
  # @param [Element, String] element the element or string to insert
  # @return [Element] returns the receiver
  def after(element)
     e = element.is_a?(String) ? fragment_from_string(element) : element.element
    parent = `#{self}.$element.parentNode`
    `#{parent} && #{parent}.insertBefore(#{e}, #{self}.$element.nextSibling)`
    self
  end
  
  # Removes the receiver from the DOM, and then returns it. The returned element
  # can then be just disposed of, or reinserted later. {#detach} can also be
  # used as an alias, and has exactly the same functionality.
  # 
  # @example HTML
  #   !!!plain
  #   <div id="foo">
  #     <div id="bing">
  #       <div>bong</div>
  #     </div>
  #     <div id="bang"></div>
  #   </div>
  # 
  # @example Ruby
  #   Document[:bing].remove
  # 
  # @example Result
  #   !!!plain
  #   <div id="foo">
  #     <div id="bang"></div>
  #   </div>
  # 
  # @return [Element] returns the receiver.
  def remove
    `var e = #{self}.$element;
    if (e.parentNode) {
      e.parentNode.removeChild(e);
    }
    return #{self};`
  end
  
  alias_method :detach, :remove
  
  # Removes all child elements from the receiver, and then returns self. This 
  # will remove all text contents as well as the child elements in the
  # receiver. Child text contents are considered child nodes, and so will be
  # removed. {#empty} can be used as an alias, but `clear` is more in line with
  # ruby naming patterns.
  # 
  # @example HTML
  #   !!!plain
  #   <div id="foo">
  #     <span class="bar"></span>
  #     <div class="baz"></div>
  #   </div>
  # 
  # @example Ruby
  #   Document[:foo].clear
  # 
  # @example Result
  #   !!!plain
  #   <div id="foo"></div>
  # 
  # @return [Element] returns receiver 
  def clear
    `var e = #{self}.$element;
    for (var children = e.childNodes, i = children.length; i > 0;) {
      var child = children[--i];
      if (child.parentNode) {
        child.parentNode.removeChild(child);
      }
    }
    return #{self};`
  end
  
  alias_method :empty, :clear
  
  # Replaces the receiver with the given `content`. The content may be either
  # another {Element}, or a string. This method will replace the receiver with
  # the given element/string, so the receiver will be removed from the DOM and
  # returned.
  # 
  # @example HTML
  #   !!!plain
  #   <div id="foo">
  #     <div id="bang"></div>
  #     <div id="bing"></div>
  #     <div id="bong"></div>
  #   </div>
  # 
  # @example Ruby
  #   Document[:bang].replace "<div id='bar'></div>"
  # 
  # @example Result HTML
  #   !!!plain
  #   <div id="foo">
  #     <div id="bar"></div>
  #     <div id="bing"></div>
  #     <div id="bong"></div>
  #   </div>
  # 
  # @param [Element, String] element the content to replace
  # @return [Element] self
  def replace(element)
    next_element = self.next
    parent = self.parent
    self.remove
    next_element ? next_element.before(element) : parent.append(element)
    self
  end
  
  # @endgroup
  
  # @group Traversing Elements in the DOM
  
  # Returns the next sibling element for the receiver, or `nil` if there is not
  # one. {#succ} can be used as an alias for this method.
  # 
  # @example HTML
  #   !!!plain
  #   <div id="foo">
  #     <div id="bing"></div>
  #     <div id="bong"></div>
  #   </div>
  # 
  # @example Ruby
  #   Document[:bing].next    # => #<Element div, id="bong">
  #   Document[:bong].next    # => nil
  # 
  # @return [Element, nil]
  def next
    Document.traverse self, 'nextSibling', nil, false
  end
  
  alias_method :succ, :next
  
  # Returns the previous sibling element for the receiver, or `nil` if one does
  # not exist.
  # 
  # @example HTML
  #   !!!plain
  #   <div id="foo">
  #     <div id="bing"></div>
  #     <div id="bong"></div>
  #   </div>
  # 
  # @example Ruby
  #   Document[:bong].prev    # => #<Element div, id="bing">
  #   Document[:bing].prev    # => nil
  # 
  # @return [Element, nil]
  def prev
    Document.traverse self, 'previousSibling', nil, false
  end
  
  # Returns the first child element of the receiver, or `nil` if the receiver 
  # has no children.
  # 
  # @example HTML
  #   !!!plain
  #   <div id="foo">
  #     <div id="bing"></div>
  #     <div id="bong"></div>
  #   </div>
  # 
  # @example Ruby
  #   Document[:foo].first    # => #<Element div, id="bing">
  #   Document[:bing].first   # => nil
  # 
  # @return [Element, nil]
  def first
    Document.traverse self, 'firstChild', nil, false
  end
  
  # Returns the last child element of the receiver, or `nil` if the receiver has
  # no children.
  # 
  # @example HTML
  #   !!!plain
  #   <div id="foo">
  #     <div id="bing"></div>
  #     <div id="bong"></div>
  #   </div>
  # 
  # @example Ruby
  #   Document[:foo].last    # => #<Element div, id="bong">
  #   Document[:bing].last   # => nil
  # 
  # @return [Element, nil]
  def last
    Document.traverse self, 'lastChild', nil, false
  end
  
  # Returns the parent element of the receiver, or `nil` if the receiver does
  # not have a parent.
  # 
  # @example Detached HTML
  #   !!!plain
  #   <div id="foo">
  #     <div id="bing"></div>
  #     <div id="bong"></div>
  #   </div>
  # 
  # @example Ruby
  #   Document[:bing].parent    # => #<Element div, id="foo">
  #   Document[:foo].parent     # => nil
  # 
  # @return [Element, nil] the parent
  def parent
    Document.traverse self, 'parentNode', nil, false
  end
  
  # Returns all the parent elements of the receiver, or an empty array if it 
  # does not have a parent. The elements in the resulting array will be each
  # parent recursively up the tree to the top. This means, usually, that the 
  # last element in the array will be the html element at the root of the
  # document.
  # 
  # @example HTML
  # !!!plain
  #   <div id="foo">
  #     <div id="bing"></div>
  #     <div id="bong"></div>
  #   </div>
  # 
  # @example Ruby
  #   Document[:foo].parents      # => [#<Element body>, #<Element html>]
  #   Element.new(:div).parents   # => []
  # 
  # @return [Array]
  def parents
    Document.traverse self, 'parentNode', nil, true
  end
  
  # @endgroup
  
  # Returns the offset of the element, taking into account the parents, scroll
  # values, etc etc. needs improving, not 100% for all browsers
  # 
  # @return [Hash] :left/:top => Number
  # 
  def element_offset
    `var element = #{self}.$element;
    #{left = 0};
    #{top = 0};
    var parent = element;
    while (parent) {
      #{left} += parent.offsetLeft;
      #{top} += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return #{Point.new left, top};`
  end
  
  # All valid html tags. These are looped over so each element instance has
  # an instance method of the same name to construct an element of that type
  # with some given options
  VALID_HTML_TAGS = [
    :html, :head, :title, :base, :meta, :link, :div, :dl, :dt, :dd, :span, :pre
  ]
  
  VALID_HTML_TAGS.each do |tag_name|
    define_method(tag_name) do |options|
      e = Element.new tag_name, options
      self << e
      e
    end
  end
end

require 'browser/element/attributes'
require 'browser/element/css'
require 'browser/element/form'
