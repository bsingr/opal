# The [Document] module.
module Document  
  # Search the DOM using the given CSS3 `selector`. This will return a single 
  # element when used with a symbol or a string representing an id, or an array 
  # otherwise.
  # 
  # @example HTML
  #   !!!plain
  #   <div id="foo" class="a"></div>
  #   <div class="b"></div>
  #   <div class="a"></div>
  # 
  # @example Ruby
  #   Document[:foo]
  #   # => #<Element div, id="foo">
  #   Document [:baz]
  #   # => nil
  # 
  #   Document['#foo']
  #   # => #<Element div, id="foo", class="a">
  #   Document['#bar']
  #   # => nil
  #   Document['.a']
  #   # => [#<Element div, id="foo", class="a">, #<Element div, class="a">]
  #   Document['.b']
  #   # => [#<Element div, class="b">]
  #   Document['.c']
  #   # => nil
  # 
  # @param [String, Symbol] selector the selector to search
  # @return [Array, Element] the result
  def self.[](selector)
    # puts "checking #{selector}"
    case selector
    when Symbol
      # puts "need to find symbol #{selector}"
      find_by_id selector
      # puts "and here"
    when /^#/
      # puts "need to find id"
      find_by_id selector.slice(1, selector.length)
    else
      # puts "need to find array of things"
      Element.find_in_context selector, self
    end
  end
  
  def self.find_by_id(id)
    # puts "finding by id #{id}"
    Element.from_native `document.getElementById(#{id.to_s})`
  end
  
  @on_ready_actions = []
  @__ready__ = false
  
  def self.ready?(&proc)
    if block_given?
      if @__ready__
        # yield
        `#{proc}.call(#{proc}.__self__, #{nil})`
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
  
  # Return the body element for the document. The body element is an instance
  # of this class, with some singleton methods defined, such as inspect so
  # that it gets some nicer inspect properties.
  # 
  # @return [Element] body element
  def self.body
    return @body_element if @body_element
    
    body = Element.from_native `document.body`
    # def body.to_s
      # "#<Element body>"
    # end
    
    @body_element = body
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
    // console.log(#{element});
    var working = #{element}['@element'][#{path}];
    //console.log(working.nodeType);
    while (working && working.nodeType !== 1) working = working[path == 'previousSibling' || path == 'lastChild' ? 'previousSibling' : 'nextSibling'];
    //console.log(working);
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
    return all.r ? result : (result[0] || #{nil});`
  end
  
  # Quick hack/snippet to make document ready when opal receives triggers
  `#{self}.opal.setDocumentReadyListener(function() {
    #{Document.__make_ready};
  });`

  # Document should represen the native 'document'
  @element = `document`
end
