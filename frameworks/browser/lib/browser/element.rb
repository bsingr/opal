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

module Browser
  
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
    #     # create a simple div. String/Symbols are accepted
    #     element = Element.new 'div'
    #     # create a simple div with some additional class and id options
    #     element2 = Element.new :div, :class_name => 'my_class', :id => 'main'
    # 
    def initialize(type, options)
      `if (!#{options}) { #{options} = vnH()}`
      # puts "creating new element #{type}"
      `#{self}.__element__ = document.createElement(#{type.to_s});`
      @tag_name = type.to_s
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
      if elements.length == 1
        `return #{Element}.$from_native(#{elements}[0]);`
      else
        # `console.log(#{elements});`
        raise "need to handle find_in_context array"
      end
    end
    
    def find(selector)
      self.class.find_in_context selector, self
    end
    
    def inspect
      description = "#<Element tag_name=#{@tag_name}"
      description << " class_name=''" unless true
      description << " id=''" unless true
      description << ">"
      description
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
    # @param [Hash] options
    # @returns self
    # 
    def set(options)
      options.each do |key, value|
        method = SET_OPTIONS[key]
        raise "Bad Element.set key #{key}" unless method
        __send__ SET_OPTIONS[key], value
      end
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
    
    def id=(id)
      `return #{self}.__element__.id = #{id};`
    end
    # Set the inner text content of the receiver
    def text=(text_content)
      `var element = #{self}.__element__;
      if (element.textContent !== undefined) {
        element.textContent = #{text_content}.toString();
      }
      else {
        element.innerText = #{text_content}.toString();
      }`
      self
    end
    
    # 
    # @param {Hash} styles
    # 
    def css(styles)
      native_element = `#{self}.__element__`
      # puts "about to style.."
      # `console.log(#{native_element});`
      styles.each do |style, value|
        # puts "setting #{style} as #{value}"
        `(#{native_element}.style || #{native_element})[#{style.to_s}] = #{value};`
      end
    end
    
    # Set the id of the element
    def id=(id)
      `#{self}.__element__.id = #{id}.toString();`
      self
    end
    
    # Append the element. If string passed, then add as html content
    # 
    def <<(append)
      if append.is_a? Element
        `#{self}.__element__.appendChild(#{append}.__element__);`
      else
        raise "bad Element <<"
      end
      
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
        # puts "in VALID_HTML_TAGS builder"
        # options are the options to se
        e = Element.new tag_name, options
        # now add to self
        self << e
        
        e
      end
    end
  end
end
