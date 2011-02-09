class Element

  # Adds the given class or classes to each element in the receiver. Multiple
  # classes may be added by seperating them with a space. These classes do not
  # replace any previously set classes, but are instead added.
  #
  # @param [String] name the class(es) name(s)
  # @return [Element] returns the receiver
  def add_class(name)
    `return self.addClass(name);`
  end

  # Removes the given class or classes to each element in the receiver. Multiple
  # classes may be removed at once by passing in a space seperated string of
  # classnames. To remove all classes, dont pass in a parameter, which will
  # remove all set classes.
  #
  # @param [String] name the classes to remove
  # @return [Element] returns the receiver
  def remove_class(name = nil)
    if name
      `self.removeClass(name)`
    else
      `self.removeClass()`
    end
  end

  # Returns `true` if any of the matched elements contain the given `name` in
  # their classes, `false` otherwise. 
  #
  # @param [String] name class name to check for
  # @return [true, false]
  def has_class?(name)
    `return self.hasClass(name) ? Qtrue : Qfalse;`
  end

  def style(key = nil, value = nil)
    if key.nil?
      # raise "need to return a StyleHash"
      @style_hash ||= StyleHash.new self
    elsif value.nil?
      raise "need to use getter for key"
    else
      raise "need to use setter"
    end
  end

  alias_method :css, :style

  # Basically used to catch method_missing calls when we try to set style
  # properties, or try to retrieve them. All calls onto style will be 
  # either trying to set or set a property, so we just do the right thing.
  class StyleHash < BasicObject
    def initialize(element)
      `return self.$element = element;`
    end

    # Method missing will be called for getting and setting properties. If we
    # are setting a property, then our css_property will have a '=' at the end
    # of it, and its value will be css_value. If we are just getting a value, 
    # then css_property will not have an '=', and css_value will remain nil.
    #
    # {#[]} and {#[]=} can handle aref and aset independantly also, so they 
    # will not be forwarded here.
    def method_missing(css_property, css_value = nil)
      `var name = #{css_property.to_s};
      console.log("===== " + name);
      if (css_value == nil) {
        console.log("getting property!");
        return self.$element.css(css_property);
      } else {
        console.log("need to remove = from css_property name");
        console.log("setting property!");
        return self.$element.css(css_property, css_value);
      }`
    end

    # We will be accessing to_s and inspect a lot during development, so lets
    # just define them here. They do not conflict with any css property, so
    # no issues will be presented.
    def to_s
      "#<StyleHash element: " + `self.$element`.inspect + ">"
    end

    def inspect
      to_s
    end

    # Again, during development we may want to put stuff to console, so we just
    # use Object's puts implementation
    def puts(str)
      Object.puts str
    end
  end
end

