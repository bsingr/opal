# For all ajax etc calls (uses Net:HTTP)
class Request
  
  # Hash of the default options used in a {Request}. All of these can be 
  # overridden in {#initialize}, or indeed {#send}
  # 
  DEFAULT_OPTIONS = {
    :url      => '',
    :method   => 'post'
  }
  
  def initialize(options)
    @options = options.merge(DEFAULT_OPTIONS)
  end
  
  # Opens the connection with the provided options, and send the given data
  # 
  #     request = Request.new(:url => "a_url.html")
  #     request.send(:method => 'get', :data => 'user=adambeynon')
  # 
  # If the only option is the data field (<tt>:data</tt>), then a string can be
  # used instead of the options hash:
  # 
  #     Request.new(:url => "a_url.html").send("user=adambeynon")
  # 
  # @param [Hash or String] options
  # @return [Request]
  # 
  def send(options)
    
  end
  
  # Cancels the current request, then returns self.
  # 
  #     request = Request.new(:url => "a_url.html")
  #     request.send(:method => 'get', :data => 'user=adambeynon')
  #     request.cancel
  # 
  # @return [Request]
  # 
  def cancel
    
  end
  
  # Alias of {#send}, but adds <tt>:method => 'post'</tt> to the options.
  # 
  #     Request.new(:url => "a_url.html").post(:data => 'user=adambeynon')
  # 
  def post(options, &block)
    
  end
  
  # Alias of {#send}, but adds <tt>:method => 'get'</tt> to the options.
  # 
  #     Request.new(:url => "a_url.html").get(:data => 'user=adambeynon')
  #
  def get(options, &block)
    
  end
  
  # Alias of {#send}, but adds <tt>:method => 'delete'</tt> to the options.
  # 
  #     Request.new(:url => "a_url.html").delete(:data => 'user=adambeynon')
  #
  def delete(options, &block)
    
  end
  
end
