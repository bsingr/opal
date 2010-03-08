# The Document is actually an object, not a module.
module Document
  
  # Returns whether or not the document is fully loaded, and also queues the 
  # given blocks to run once the document is loaded. Blocks can be passed to the
  # method, and they will be executed in turn once the document is ready for 
  # interaction. This avoids possible errors of trying to interact with the 
  # document before it has finished loading. If the document has loaded, then 
  # any blocks passed will just be evaluated instantly. This method also returns
  # a simple true false value to indicate the document state. This allows the 
  # method to be used without a block, as a simple means of checking the 
  # document state.
  # 
  # Usage:
  # ------
  #  
  #     Document.ready?     # true/false
  # 
  #     Document.ready? do
  #       puts "I will be called first"
  #     end
  # 
  #     ready = Document.ready? { puts "I will be called second" }
  #     puts ready    # true/false
  # 
  # @param [Proc] block proc to execute once loaded
  # @return [Boolean] the ready state of the document
  # 
  def self.ready?(&block)
    
  end
  
  # Appends the given element to the Document.body element. Document overrides
  # Elements' implementation to add the given element to the body property, as
  # Document actually points to the entire document. As with Element#<<, this
  # method can also take a string which will be appended as a text node to the
  # document.
  # 
  # Usage:
  # ------
  # 
  # Initial HTML:
  # 
  #     <div id="append_test"></div>
  # 
  # Code:
  # 
  #     e = Element[:append_test]
  #     e << Element.new(:div, :text => "DIV text")
  #     e << "Some text content"
  # 
  # Result HTML:
  # 
  #     <div id="append_test">
  #       <div>DIV text</div>
  #       Some text content
  #     </div>
  # 
  # @param [Element] element the element (or string) to append
  # @return [Element] self
  # 
  def self.<<(element)
    
  end
end
