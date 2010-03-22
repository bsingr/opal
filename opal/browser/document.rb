module Document
  
  on_load_block = proc do
    @ready = true
    @ready_blocks.each do |ready_block|
      ready_block.call
    end
  end
  
  native_on_load = `function() { #{on_load_block.call} };`
  
  `if (window.addEventListener) {`
    `window.addEventListener('load', #{native_on_load}, false);`
  `}`
  `else {`                                                  
    `window.attachEvent('onload', #{native_on_load});`
  `}`
  
  @ready = false
  @ready_blocks = []
  
  def self.ready?(&block)
    if block_given?
      @ready ? yield : @ready_blocks.push(block)
      # if @ready
      #         yield
      #       else
      #         @ready_blocks << block
      #       end
    end
    @ready
  end
  
  def self.find(selector, &block)
    Element.find(selector, &block)
  end
  
  def self.[](selector)
    Element.find(selector)
  end
  
  def self.title
    `return document.title;`
  end
  
  def self.title=(title)
    `return document.title=#{title};`
  end
  
  def self.body
    `return opal_element_wrap(document.body);`
  end
  
  def self.head
    `return opal_element_wrap(document.getElementsByTagName('head')[0]);`
  end
  
  def self.html
    `return opal_element_wrap(document.getElementsByTagName('html')[0]);`
  end
  
  def self.<<(element)
    `return document.body.appendChild(#{element});`
  end
end
