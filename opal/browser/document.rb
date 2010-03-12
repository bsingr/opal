module Document
  
  on_load_block = Proc.new do
    @ready = true
    @ready_blocks.each do |ready_block|
      ready_block.call
    end
  end
  
  `var win_on_load = function() { #{on_load_block.call} };
  if (window.addEventListener) {
    window.addEventListener('load', win_on_load, false);
  }
  else {                                                  
    window.attachEvent('onload', win_on_load);
  }`
  
  @ready = false
  @ready_blocks = []
  
  def self.ready?(&block)
    if block_given?
      if @ready
        block.call
      else
        @ready_blocks << block
      end
    end
    @ready
  end
  
  def self.<<(element)
    `return document.body.appendChild(#{element});`
  end
end
