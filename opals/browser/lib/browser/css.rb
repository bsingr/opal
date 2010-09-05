# 
# css.rb
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

class Element
  
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
    style = `#{element}.__element__.style || #{element}.__element__`
    # convert to camelCaseStyle
    name = `#{name}.replace(/[_-]\D/g, function(res) {
      return res.charAt(1).toUpperCase();
    });`
    
    if value == false
      # no value, so retrieve (nil is a good value: set to :none)
      `return #{style}[#{name}];`
    else
      # set style property
      `return #{style}[#{name}] = #{value};`
    end
  end
  # 
  # @param {Hash} styles
  # 
  def css(styles)
    # element = `#{self}.__element__`
    # element_style = `#{element}.style || #{element}`
    
    case styles
    when Hash
      # we want to set some properties
      styles.each { |style, value| Element.css self, style, value }

    when String, Symbol
      # we want to retrieve a property
      Element.css self, styles
      
    end
  end
  
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
    self.class_name += " #{class_name}" unless has_class? class_name
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
    `#{self}.__element__.className = #{self.class_name}.replace(new RegExp('(^|\\s)' + #{class_name} + '(?:\\s|$)'), '$1');`
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
  
  # Set the class name. Here we do not append, just rewrite the entire class
  # name
  # 
  def class_name=(class_name)
    `#{self}.__element__.className = #{class_name}.toString();`
    self
  end
  
  def class_name
    `return #{self}.__element__.className || "";`
  end
  
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
  
  # Set the opacity of the receiver
  # 
  # @return [Element] returns the receiver
  def opacity=(opacity)
    raise "not implemented"
  end
end
