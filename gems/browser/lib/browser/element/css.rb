class Element
  
  # @group Styling of the Element
  
  # Set the given style property +name+ to the given +value+ for +element+. 
  # Name should/can be ruby case, or css-property or camelcase. Every property
  # will be converted to the correct format within this method.
  # 
  # @param [Element] element the element to set the style on
  # @param [Symbol, String] name the style property name to set
  # @param [String, Number] value the value to set
  # @return [Element] returns +element+
  def self.css(element, name, value = false)
    # FIXME: should really check if comment or text node, and then skip if so.

    # make sure we are dealing with a string
    name = name.to_s
    # get the actual style property (IE uses the element itself)
    style = `#{element}['@element'].style || #{element}['@element']`
    # convert to camelCaseStyle
    name = `#{name}.replace(/[_-]\D/g, function(res) {
      return res.charAt(1).toUpperCase();
    })`
    
    if value == false
      # no value, so retrieve (nil is a good value: set to :none)
      `#{style}[#{name}] || ""`
    else
      # set style property
      `#{style}[#{name}] = #{value}`
    end
  end
  
  # 
  # @param {Hash} styles
  # 
  def css(styles = nil)
    case styles
    when nil
      @style ||= StyleDeclaration.new self
    when Hash
      styles.each { |style, value| Element.css self, style, value }
    when String, Symbol
      Element.css self, styles
    end
  end
  
  alias_method :style, :css
  
  # @group Class Attributes
  
  # Checks whether the receiver has the passed in class_name
  # 
  # @example Checking for classes
  #   # Assuming the following HTML
  #   # <div id="some_id" class="first second"></div>
  #   
  #   elem = Document['some_id']
  #   
  #   elem.has_class? 'first'
  #   # => true
  # 
  #   elem.has_class? 'third'
  #   # => false
  # 
  # @param [String, Symbol] class_name the class_name to check
  # @return [true, false] if the element has the given class_name
  def has_class?(class_name)
    self.class_name.__contains__ class_name.to_s, " "
  end
  
  # Adds the given class_name to the receivers' classes, unless the class 
  # already have the class
  # 
  # @param [String, Symbol] class_name the class_name to add
  # @return [Element] returns the receiver
  def add_class(class_name)
    # self.class_name += " #{class_name}" unless has_class? class_name
    self
  end
  
  # Adds each of the given class_names using {#add_class}.
  # 
  # @param [Array<String, Symbol>] class_names the list of class_names
  # @return [Element] returns the receiver
  def add_classes(*class_names)
    class_names.each do |class_name|
      add_class class_name
    end
    self
  end
  
  # Remove the given class_name from the element, if it has the class_name
  # 
  # @param [String, Symbol] class_name the class_name to remove
  # @return [Element] returns the receiver
  def remove_class(class_name)
    class_name = class_name.to_s
    `#{@element}.className = #{self.class_name}.replace(new RegExp('(^|\\s)' + #{class_name} + '(?:\\s|$)'), '$1')`
    self
  end
  
  # Adds the given class_name to the receiver if it does not already have the 
  # class_name, otherwise removes it.
  # 
  # @param [String, Symbol] class_name the class_name to toggle
  # @return [Element] returns the receiver
  def toggle_class(class_name)
    class_name = class_name.to_s
    has_class?(class_name) ? remove_class(class_name) : add_class(class_name)
    self
  end
  
  # As we overwrite #class, this allows us to still access its functionality
  alias_method :__class__, :class
  
  # Set the class name. Here we do not append, just rewrite the entire class
  # name.
  # 
  # @param [String] class_name the class to set
  # @return [Elements] returns the receiver
  def class_name=(class_name)
    `#{@element}.className = #{class_name}.toString()`
    self
  end
  
  # alias_method `#{self}.Y('class=')`, :class_name=
  
  # Returns the CSS class name for the receiver. See {#__class__} for default
  # access.
  # 
  # @return [String] returns class name
  def class
    `return #{@element}.className || "";`
  end
  
  alias_method :class_name, :class
  
  # set class names from hash
  def set_class_names(class_names)
    current = self.class_name.split ' '
    
    class_names.each do |name, flag|
      if current.include? name
        unless flag
          current.delete name 
        end
      else
        if flag
          current << name
        end
      end
    end
    
    self.class_name = current.join(" ")
  end
  
  # Returns `true` if the receiver is visible, or `false` otherwise.
  # 
  # @example HTML
  #   !!!plain
  #   <div id="foo" style="display: none;"></div>
  #   <div id="bar"></div>
  # 
  # @example Ruby
  #   Document[:foo].visible?
  #   # => false
  #   Document[:bar].visible?
  #   # => true
  # 
  # @return [Boolean]
  def visible?
    Element.css(self, 'display') != "none"
  end
  
  # Returns `true` if the receiver is hidden, `false` otherwise.
  # 
  # @example HTML
  #   !!!plain
  #   <div id="foo" style="display: none;"></div>
  #   <div id="bar"></div>
  # 
  # @example Ruby
  #   Document[:foo].hidden?
  #   # => true
  #   Document[:bar].hidden?
  #   # => false
  # 
  # @return [Boolean]
  def hidden?
    Element.css(self, 'display') == "none"
  end
  
  # Hides the receiver in the DOM using the `display = none;` property. Returns
  # the receiver for chaining.
  # 
  # @example HTML
  #   !!!plain
  #   <div id='foo'></div>
  # 
  # @example Ruby
  #   Document[:foo].hide
  #   # => #<Element div, id='foo'> (and is now hidden)
  # 
  # @return [Element] returns the receiver
  def hide
    Element.css self, :display, 'none'
    self
  end
  
  # Shows the receiver in the DOM using the `display = ''` property. Returns the
  # receiver for chaining.
  # 
  # @example HTML
  #   !!!plain
  #   <div id='foo' style='display:none'></div>
  # 
  # @example Ruby
  #   Document[:foo].show
  #   # => #<Element div, id='foo'> (and is now visible)
  # 
  # @return [Element] returns the receiver
  def show
    Element.css self, :display, ''
    self
  end
  
  # Toggles the visible state of the receiver by checking its current 
  # {#visible?} state. If currently visible, the element will become hidden, or
  # if currently hidden, the element will become visible.
  # 
  # @return [Element] returns the receiver
  def toggle
    visible? ? hide : show
    self
  end
  
  # Set the opacity of the receiver
  # 
  # @return [Element] returns the receiver
  def opacity=(opacity)
    raise "not implemented"
  end
  
  # A hash like interface for setting and retreiving CSS properties for the
  # dom element it represents.
  class StyleDeclaration
    
    # Initialize witht he given {Element} instance.
    # 
    # @param [Element] element
    def initialize(element)
      @element = `#{element}['@element']`
      @style = `#{@element}.style || #{@element}`
    end
    
    def [](style_name)
      Element.css self, style_name
    end
    
    def []=(style_name, value)
      Element.css self, style_name, value
    end
  end
end
