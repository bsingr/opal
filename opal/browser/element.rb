# Element class to wrap the native Element objects from the DOM.
# 
# Implementation
# --------------
# 
# The element class simply extends the native browser element instance. Due to
# cross browser differences in element handling, this process takes place at
# two stages. It is not possible to simply extend the prototype of the Element
# class as startup to mixin Opal properties, so each element must be extended
# whenever required. {Element.find} is the logical place to do this. To make a
# native element compatible with Opal as an object, it requires two properties:
# <tt>klass</tt> and <tt>flags</tt>. These are used for message sending. The
# klass will simply be set to {Element} so that it can receive messages defined
# in this file.
# 
# To add these properties, every time an element is found using the {.find}
# method, the native element has these two peropties added. A quick check is
# used to ensure an element that is already "wrapped" is not done so again. This
# allows Opal to use the native browser element directly, instead of a default
# instance of <tt>RObject</tt>. Also, the Element.new method is overidden to
# return a new native element, pre-wrapped, instead of a simple <tt>RObject</tt>
# instance.
#
class Element
  
  # Used to wrap a native element in an opal class embrace (sets class to 
  # Element)
  `
  function opal_element_wrap(wrap) {
    if (wrap.klass) return wrap;
    wrap.hash = opal_yield_hash();
    wrap.klass = opal_cElement;
    wrap.flags = T_OBJECT;
    return wrap;
  };
  `
  
  `
  function element_has_class(el, name) {
    return (" " + el.className + " ").indexOf(" " + name + " ") > -1;
  }
  `
  
  # Find an element, with the given id, inside the document scope. 
  # {.[]} is an alias of this method. Returns nil when not found.
  # 
  #     Element.find(:my_div)             # => element
  #     Element.find('my_div')            # => element
  #     Element[:non_existing_element]    # => nil  
  # 
  # @param [Symbol or String] str the id of the element to look for
  # @return [Element] the found element
  #
  def self.find(name, &block)
    name = name.to_s if Symbol === name
    element = `document.getElementById(#{name})`
    `opal_element_wrap(#{element})` if element
    
    element.instance_eval(&block) if block_given?
    
    element
  end
  
  # Find an element, with the given id, inside the document scope. 
  # {.[]} is an alias of this method. Returns nil when not found.
  # 
  #     Element.find(:my_div)             # => element
  #     Element.find('my_div')            # => element
  #     Element[:non_existing_element]    # => nil  
  # 
  # @param [Symbol or String] str the id of the element to look for
  # @return [Element] the found element
  #
  def self.[](name)
    find(name)
  end
  
  def self.body
    `return opal_element_wrap(document.body);`
  end
  
  def self.new(type, options)
    type = type.to_s
    `return opal_element_wrap(document.createElement(#{type}));`
  end
  
  def method_missing(sym, *args)
    tag_name = sym.to_s
    tag = `document.createElement(#{tag_name});`
    args.each do |arg|
      case arg
      when String
        `#{tag}.appendChild(document.createTextNode(#{arg}));`
      when Hash
        # puts "need to set hash properties for #{arg}"
        if arg.has_key?(:class)
          `#{tag}.className = #{arg[:class]};`
        end
      end
    end    
    `#{self}.appendChild(#{tag});`
    `return opal_element_wrap(#{tag});`
  end
  
  def add_listener(type, &block)
    `var func = function(evt) { return rb_proc_call(#{block}, "", nil, evt); };
    if (#{self}.addEventListener) {
      #{self}.addEventListener(type, func, false);
    }
    else {
      #{self}.attachEvent('on' + type, func);
    }
    return #{self};
    `
  end
  
  def on_click(&block)
    add_listener('click', &block)
  end
  
  def empty
    `while (#{self}.firstChild) { #{self}.removeChild(#{self}.firstChild); }
    return #{self};`
  end
  
  def has_class?(class_name)
    `return element_has_class(#{self},#{class_name});`
  end
  
  def add_class(class_name)
    `if(!element_has_class(#{self},#{class_name})) {
      #{self}.className = #{self}.className + " " + #{class_name};
    }`
    self
  end
  
  def remove_class(class_name)
    raise "Element#remove_class not yet implemented"
  end
  
  
end
