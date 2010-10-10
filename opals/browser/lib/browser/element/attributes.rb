class Element
  # @group Accessing Element Attributes
  
  # Set the given attribute `name` to the given `value`, or return the current
  # value if no value given for the `element`.
  # 
  # @param [Element] element
  # @param [String, Symbol] name
  # @param [Object] value
  # @return [Object] new/current attr value
  def self.attr(element, name, value = false)
    # convert all _ to - to make our name DOM accessible
    name = `#{name.to_s}.replace(/\_/g, '-');`
    # either get or set...
    if value == false
      `return #{element}['@element'].getAttribute(#{name}) || #{nil};`
    else
      `return #{element}['@element'].setAttribute(#{name}, #{value.to_s});`
    end
  end
  
  # Sets or retrieves some attributes from the receiver.
  # 
  # @example Setting some attributes
  #   e = Document[:some_div]
  #   e.attr :id => 'new_div_id', :name => 'my_element'
  #   # => #<Element div, id='new_div_id'>
  # 
  # @example Getting an attribute value
  #   e.attr('name')
  #   # => "my_element"
  # 
  # @example Using proxy AttributeAccessor class
  #   e.attr[:id] = "original_id"
  #   e.attr['id']
  #   # => "original_id"
  # 
  # @param [Hash, String, Symbol] attribute
  # @return [Object]
  def attr(attribute = nil)
    case attribute
    when Hash
      attribute.each { |key, value| Element.attr self, key, value }
      self
    when String, Symbol
      Element.attr self, attribute
    when nil
      @attr ||= AttributeAccessor.new self
    end
  end
  
  # Set the unique identifier of the receiver
  # 
  # @example HTML
  #   !!!plain
  #   <div class="foo"></div>
  # 
  # @example Ruby
  #   Document['.foo'].first.id = "bar"
  # 
  # @example Result
  #   !!!plain
  #   <div class="foo" id="bar"></div>
  # 
  # @param [String, Symbol] id the id to set on the element
  # @return [String] returns the receiver
  def id=(id)
    Element.attr self, 'id', id
  end
  
  # Returns the id of the receiver as a symbol, or `nil` if no id is defined.
  # 
  # @example HTML
  #   <div id="foo" class="bar"><div>
  #   <div class="baz"</div>
  # 
  # @example Ruby
  #   Document['.bar'].first.id     # => :foo
  #   Document['.baz'].first.id     # => nil
  # 
  # @return [Symbol, nil] returns the id of the receiver
  def id
    `return #{@element}.id ? #{self}.Y(#{@element}.id) : #{nil};`
  end
  
  # Sets the title attribute of the receiver. The title represents advisory
  # information for the element.
  # 
  # @param [String] title
  # @return [String]
  def title=(title)
    Element.attr self, 'title', title
  end
  
  # Returns the title attribute of the receiver
  # 
  # @return [String]
  def title
    Element.attr self, 'title'
  end
  
  # Sets the src attribute of the receiver.
  # 
  # @param [String] src
  # @return [String]
  def src=(src)
    Element.attr self, 'src', src
  end
  
  # Returns the src attribute of the receiver
  # 
  # @return [String]
  def src
    Element.attr self, 'src'
  end
  
  # @endgroup
  
  # Class proxy used to access attributes for a particular element
  class AttributeAccessor
    
    # @param [Element] element the element to wrap
    def initialize(element)
      @element = element
    end
    
    def [](name)
      Element.attr @element, name
    end
    
    def []=(name, value)
      Element.attr @element, name, value
    end
  end
end
