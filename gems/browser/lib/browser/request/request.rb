require 'browser/event/trigger_events'

# Request class
# -------------
# 
# The Request class is responsible for making and handling AJAX calls through
# the browser.
# 
# ## Events
# 
# ### request
# 
# Triggered when request is initially sent.
# 
# ### complete
# 
# Triggered when the request completes. Last callback to be triggered (it is
# fired after :success/:failure)
# 
# ### cancel
# 
# Triggered if request cancels
# 
# ### success
# 
# Triggered if the event completes successfully
# 
# ### failure
# 
# Triggered if the request failed (got a response, but it was an error code)
# 
class Request
  
  include Event::TriggerEvents
  
  OPTIONS = {
    :url            => '',
    :data           => {},
    # :headers        => {
    #   'X-Requested-With'  => 'XMLHttpRequest',
    #   'Accept'  =>' text/javascript, text/html, application/xml, text/xml, */*'
    # },
    :async          => true,
    :format         => nil,
    :method         => 'POST',
    :link           => 'ignore',
    :is_success     => nil,
    :emulation      => true,
    :url_encoded    => true,
    :encoding       => 'utf-8',
    :eval_scripts   => false,
    :eval_response  => false,
    :timeout        => 0,
    :no_cache       => false
  }
  
  # Get the current status of the request
  attr_reader :status
  
  def initialize(options = {})
    @xhr = `#{self}.opal.request()`
    # `#{self}.__xhr__ = opal.request();`
    @options = OPTIONS.merge options
    @headers = @options[:headers]
    @running = false
    @status = 0
    @text = ""
  end
  
  # FIXME: Do we want lowercase? good practice to use uppercase?
  %W{get post put delete GET POST PUT DELETE}.each do |method|
    define_method(method) do |data|
      send :data => data, :method => method
    end
  end
  
  # Sends the request with the given data and options. Can also take a block
  # that acts as the on :complete proc callback handler.
  # 
  # @example
  #     request = Request.new :url => 'clients.html, :method => 'get'
  # 
  # @param [Hash] options to set on receiver before sending
  # @return [Request] returns receiver
  def send(options = {}, &block)
    @running = true
    
    method = 'POST'
    
    url = options[:url] || ""
    
    request = self
    `#{@xhr}.onreadystatechange = function() {
      #{request.state_change};
    }`
    
    `#{@xhr}.open(#{method.to_s}.toUpperCase(), #{url}, true)`
    
    trigger :request, self
    
    `#{@xhr}.send(null)`
  end
  
  # Returns +true+ if the +Request+ is running, +false+ otherwise
  # 
  # @example
  #     req = Request.new
  #     req.running?        # => false
  #     req.send
  #     req.running?        # => true
  # 
  # @return [true, false]
  def running?
    @running
  end
  
  # Returns `true` if the request succeeded, `false` otherwise
  # 
  # @return [true, false]
  def success?
    status = @status
    
    return true if @status >= 200 && @status < 300
    
    `(status === 0 && #{self}.__xhr__.responseText && #{self}.__xhr__.responseText.length ? #{true} : #{false})`
  end
  
  # Returns +true+ if the request failed, +false+ otherwise
  # 
  # @return [true, false]
  def failed?
    !success?
  end
  
  def state_change
    # only handle state change when request is done (state 4)
    # `if (#{self}.__xhr__.readyState !== 4 || !#{@running}.r) #{return}`
    
    `#{@xhr}.onreadystatechange = function() { }`
    
    @running = false
    @status = 0
    
    begin
      @status = `#{@xhr}.status`
    rescue Exception => e
      # warning?
      puts "warning"
    end
    
    # puts "our status is now #{@status}"
    
    # should be:
    # @status = `#{@xhr}.status` rescue nil
    
    if success?
      # puts "success #{@status}"
      @text = `#{@xhr}.responseText || ''`
      
      trigger :success, self
      trigger :complete, self
    else
      # `console.log(#{@status});`
      # puts "aww :( #{@status}"
    
      trigger :failure, self
      trigger :complete, self
    end
  end
  
  # Returns the response text from the request, or an empty string if the 
  # request has not been sent or was not successfull. {#response_text} can also
  # be used as an alias.
  # 
  # @return [String]
  def text
    `return #{self}.__xhr__.responseText || "";`
  end
  
  alias_method :response_text, :text
  
  # Returns the status for the request. This is the HTTP result code, so for
  # instance 200 would be a successfull request.
  # 
  # As a caution, making requests to the local file system (if allowed) will
  # always return 0 as a response, regardless of whether it was actually
  # successful or not.
  # 
  # @return [Number]
  def status
    @status
  end
  
  def cancel
    return self unless @running
    @running = false
    `#{self}.__xhr__.abort()`
    `#{self}.__xhr__.onreadystatechange = function() {}`
    `#{self}.__xhr__ = opal.request()`
    trigger :cancel
    self
  end  
end
