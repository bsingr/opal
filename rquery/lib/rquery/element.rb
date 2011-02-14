
# jQuery objects themselves are bridged to the ruby Element class. This allows
# direct access to jquery through ruby, and makes the creation and accessing of
# jquery objects really fast and efficient (there is minimal overhead introduced
# by wrapping them).
#
# This is accomplished basically by adding the requied opal properties onto jquery
# as if they were just plugins; $m, $klass and $flags. These are the same names as
# added to the core prototypes as to avoid name confliction as much as possible.
`$opal.bridged_class($.fn, null, 'Element', $opal.Object)`

# Element is used two-fold. It is the equivalent of the jQuery object in js,
# and is used to create new element literals. Therefore, an Element instance
# can actually represent 1, many, or even 0 actual elements. Element for this
# reason is actually more like an array of elements, where its instance 
# methods are applied to 0 or more actual elements. Accessing elements 
# infividually through {#first} etc, still returns an Element instance with
# a singular element literal.
class Element
  # Top level selector. This is the equivalent of passing a selector string
  # to the jQuery object. This searches essentially in the context of the
  # document, and returns an Element instance with all matched elements.
  #
  # @example
  #
  #     Element.find 'div > p'
  #     # => #<Element 0x91232>
  #
  # @param [String] selector
  # @return [Element]
  def self.find(selector)
    from_native `$(selector)`
  end

  alias_method :[], :find

  # Initialze is used when simply creating a new Element, the equivalent of
  # document.createElement('tagName'). It is then wrapped by jquery and 
  # becomes the sole element belonging to this instance.
  #
  # Creating a new Element instance should only be used when actually creating
  # a new DOM element. For referencing already existing elements, instead use
  # one of the selector methods, {Element#find} etc.
  #
  # NOTE: initialize is not used due to limitations on creating/adding to jquery
  # objects, so we need to override .new instead.
  #
  # @return [Element]
  def self.new(type = 'div')
    `return $(document.createElement(type));`
  end

  # PRIVATE!!!!!
  #
  # Should really be a js method? Basically this takes a jquery object, which
  # is NOT a ruby object, and returns a new Element instance with the given
  # jquery object as its content. The passed jq variable should be a jquery
  # object.
  def self.from_native(elem)
    `return $(elem);`
  end

  # Returns the number of elements in the receiver. 
  #
  # @return [Numeric]
  def length
    `return self.length;`
  end

  alias_method :size, :length

  # Indexed reference - Returns the matched element at the given index, or
  # returns a slice of elements beginning at the given index for the given
  # count of elements. Negative indecies count backwards from the end of the
  # set of matched elements, so that -1 would be the last matched element. 
  # This will return nil if the given index is not in range.
  #
  # TODO: count functionality not yet implemented - only simple index
  # referencing.
  #
  # @param [Numeric] index index to start at
  # @param [Numeric] count last index
  # @return [Element, nil]
  def [](index, count = nil)
    `var size = self.length;

    if (index < 0) index += size;

    if (index >= size || index < 0) return nil;

    return $(self[index]);`
  end

  # Returns the original selector passed to find the elements. If no selector
  # was given, for example when creating a new object literal, or by passing
  # in a current element, then the selector will just be an empty string.
  #
  # @return [String]
  def selector
    `return self.selector;`
  end

  # Yields the block for each matched element in the receiver. The block is
  # passed the element as the first param, and the index as the second.
  #
  # @example
  #
  #     Element.find('div').each do |elem, idx|
  #       puts "at idx #{idx} we found: #{elem}."
  #     end
  #
  # @return [Element] returns the receiver
  def each
    `var length = self.length;

    for (var i = 0; i < length; i++) {
      try {
        #{yield `$(self[i])`, `i`};
      } catch (e) {
        throw e;
      }
    }

    return self;`
  end

  # Get or set the value of an attribute for the first element in this set of
  # matched elements. This will only happen for the first matched element, so
  # to apply this to all matches, use {#each} or loop over each item with 
  # another construct.
  #
  # 
  def attr(name, value = nil)
    if value.nil?
      `self.attr(#{name.to_s}) || ''`
    else
      `self.attr(#{name.to_s}, value)`
    end
  end

  # Returns the id attr of the first matched element. If the set of elements 
  # is empty, then nil is just returned. An optional value may be passed 
  # which will be set as the id of the first element. This is the same as
  # setting the id with {#id=} but this allows for chained calls, and it also
  # returns the receiver (to allow for chained calls).
  #
  # @example Retrieving the id
  #
  #     Element['div'].id
  #     # => 'some_id'
  #
  # @example Setting the id
  #
  #     Element['div'].id('new_id')
  #     # => #<Element 0x827>
  #
  # @param [String] value optional id to set
  # @return [Element, String]
  def id(value = nil)
    if value
      `self.attr('id', value)`
      self
    else
      `self.attr('id')`
    end
  end

  # Sets the id of the first matched element in the receiver. 
  #
  # @example
  #
  #     Element['div].id = "some_new_id"
  #
  # @param [String] value the id to set
  # @return [String] returns the set value
  def id=(value)
    `self.attr('id', value)`
    value
  end

  # Returns the html content of the first matched element in the receiver. 
  # If the optional `content` is given, then this will set the html content
  # in the same manner than {#html=} does, except that this method will 
  # return the receiver so that it can be used for chaining calls.
  #
  def html(content = nil)
    if content
      `self.html(content)`
    else
      `self.html()`
    end
  end

  def html=(content)
    `return self.html(content);`
  end

  # Return the first matched element in the receiver.
  #
  # @return [Element]
  def first
    `return self.first();`
  end

  # Remove all the child nodes from each of the matched elements in the
  # receiver. This method will remove all text contents of the receiver
  # as well, as they are also text nodes belonging to the receiver. By
  # using jQuery underpinnings, all event listeners of all children are
  # also removed first to avoid memory leaks.
  #
  # @return [Element] returns the receiver
  def clear
    `return self.empty();`
  end

  alias_method :empty, :clear

  # Removes the set of matched elements from the DOM. This method works 
  # similarly to {#clear}, but the matched element is also removed, as well
  # as its children. Also, like {#clear}, all event handlers are removed
  # first. An optional selector may be passed which removes those children
  # of the matched elements that match the given selector.
  #
  # @return [Element] returns the receiver
  def remove
    `return self.remove();`
  end

  # Inserts the given content to the end of each element in the set
  # represented by the receiver.
  #
  # @param [String, Element] content content to insert
  # @return [Element] returns the receiver
  def append(content)
    `return self.append(content);`
  end

  # Inserts the given `content` before each member in the receiver. The
  # content may be a string, or an element.
  #
  # @param [String, Element] content the content to insert
  # @return [Element] returns the receiver
  def before(content)
    `return self.before(content);`
  end

  # Inserts the `content` before each member in the receiver. Content
  # may be a string or an Element instance.
  #
  # @param [String, Element] content content to insert
  # @return [Element] returns the receiver
  def after(content)
    `return self.after(content);`
  end

  # @group Events
    
  def mouse_down
    `return self.mousedown(function(event) {
      #{yield `event`};
    });`
  end

  # @endgroup

end

