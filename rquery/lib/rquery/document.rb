module Document
  # Accepts a block that will be called once the document is ready. This uses
  # the underlying $(function() { ... }) mechanism. Note, multiple blocks may
  # be passed to this function and they will be called in order.
  #
  # @example
  #
  #     Document.ready? do
  #       puts "document is now ready"
  #     end
  #
  # @return [Document] returns self 
  def self.ready?
    `$(function() { #{yield}; })` if block_given?
    self
  end
end

