# 
# request.rb
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

require 'browser/event/trigger_events'

# Request class
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
  
  def initialize(options = {})
    @xhr = `opal.request()`
    @options = OPTIONS.merge options
    @headers = @options[:headers]
    @running = false
    @status = 0
    @text = ""
  end
  
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
    
    
    method = :post
    
    url = options[:url]
    
    request = self
    `#{@xhr}.onreadystatechange = function() {
      #{request}.$state_change();
    };`
    
    `#{@xhr}.open(#{method.to_s}.toUpperCase(), #{url}, true);`
    
    trigger :request, self
    
    `#{@xhr}.send(null);`
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
  
  # Returns +true+ if the request succeeded, +false+ otherwise
  # 
  # @return [true, false]
  def success?
    `return (#{@status} >= 200 && #{@status} < 300) ? #{true} : #{false};`
  end
  
  # Returns +true+ if the request failed, +false+ otherwise
  # 
  # @return [true, false]
  def failed?
    !success?
  end
  
  def state_change
    # only handle state change when request is done (state 4)
    `if (#{@xhr}.readyState !== 4 || !#{@running}.r) return;`
    
    `#{@xhr}.onreadystatechange = function() { };`
    
    @running = false
    @status = 0
    
    begin
      @status = `#{@xhr}.status`
    rescue Exception => e
      # warning?
    end
    
    # should be:
    # @status = `#{@xhr}.status` rescue nil
    
    if success?
      # puts "success #{@status}"
      @text = `#{@xhr}.responseText || ''`
      
      trigger :success, self
      trigger :complete, self
    else
      puts "aww :( #{@status}"
    
      trigger :failure, self
      trigger :complete, self
    end
  end
end
