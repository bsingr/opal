# 
# http.rb
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

# require File.join(File.dirname(__FILE__, 'protocol'))
# require 'uri'

module Net
  
  class HTTPBadResponse < StandardError; end
  
  class HTTPHeaderSyntaxError < StandardError; end
  
  # 
  # Core HTTP request. HTTP and HTTP request are merged here, but HTTPResponse
  # remains a seperate class.
  # 
  class HTTP
    
    # 
    # Default port for HTTP traffic
    # 
    def HTTP.default_port
      80
    end
    
    # 
    # 'GET' the given path
    # 
    def HTTP.get(uri_or_host, path, port, &block)
      get_response(uri_or_host, path, port, &block)
    end

    def HTTP.get_response(uri_or_host, path, port, &block)
      if path
        host = uri_or_host
        new(host, port || HTTP.default_port).start do |http|
          return http.request_get(path, &block)
        end
      else
        uri = uri_or_host
        new(uri.host, uri.port).start do |http|
          return http.request_get(uri.request_uri, &block)
        end
      end
    end
            
    
    # 
    # Creates a new {Net::HTTP} object for the specified address. The port is 
    # not opened here.
    # 
    # @param [String] address
    # @param [Fixnum] port
    # 
    def initialize(address, port)
      @host = address
      @port = port || 80
      @started = false
      @async = true
    end
    
    def inspect
      "#<Net::HTTP #{@address}:#{@port} open=#{@started}>"
    end
    
    def started?
      @started
    end
    
    def start(&block)
      raise("HTTP session already opened") if @started
      if block_given?
        do_start
        yield self
      else
        raise("no block given to Net::HTTP#start")
      end
      self
    end
    
    def do_start
      @started = true
      connect
    end
    
    def connect
      # @request = `r=opal_http_request_new()`
      #       `r.open("GET","http://www.google.com",true);`
      #       `r.onreadystatechange=function(){`
      #         `if(r.readyState==4){`
      #           @body = `r.responseText`
      #           finish
      #         `}`
      #       `};`
      #       `r.send(null);`
      self
    end
    
    def finish
      raise("HTTP session not yet started") unless @started
      # @do_block.call(self)
      self
    end
    
    def body
      @body
    end
    
    # 
    # Gets data from <tt>path</tt> for the current host
    # 
    # This method, unlike vanilla ruby, __MUST__ be called with a block. The 
    # current implementation will throw an error if no block is given. The block
    # will be yielded once with the final response which will be an instance of
    # {NET::HTTPResponse}. The return value for this method is also the response
    # object, which will not yet contain a body.
    # 
    # @return [NET::HTTPResponse]
    # 
    def get(path, initheader, dest, &block)
      res = request(Get.new(path, initheader)) do |r|
        # deal with response
      end
      res
    end
    
    def request_get(path, initheader, &block)
      request(Get.new(path, initheader), &block)
    end
    
    # 
    # Sends an actual HTTPRequest object to the server. When given a block will
    # yield an {HTTPResponse} object. Also returns the response object, which 
    # will not yet be initialized.
    # 
    # __MUST__ be given a block for the time being.
    # 
    def request(req, body, &block)
      unless started?
        start do
          return request(req, body, &block)
        end
      end
      # req.set_body_internal(body)
      res = transport_request(req, &block)
      res
    end
    
    # 
    # A lot of these methods are here just to be API compatible with Ruby. As
    # we can not always keep a connection open, we pretend to start connections.
    # This results a lot in "pretend actions", so thus method needs a new native
    # request object per actual request.
    # 
    def transport_request(req, &block)
      req.exec(self, &block)
    end
    
  end # class HTTP
  
  # 
  # HTTPResponse - base response class
  #
  class HTTPResponse
    
    class << self
      
      # 
      # Returns true if the response has a body
      #
      def body_permitted?; HAS_BODY; end
        
      # 
      # The exception type (on exception)
      # 
      def exception_type; EXCEPTION_TYPE; end
      
    end # << self
  end # class HTTPResponse
  
  class HTTPUnknownResponse < HTTPResponse
    HAS_BODY = true
    # EXCEPTION_TYPE = HTTPError
  end
  
  class HTTPSuccess < HTTPResponse
    HAS_BODY = true
    # EXCEPTION_TYPE = HTTPError
  end
  
  class HTTPOK < HTTPSuccess
    HAS_BODY = true
  end
  

  # 
  # Header module
  # 
  # Provides access to @header in the mixed-into class as a hash-like
  # object, except with case-insensitive keys.  Also provides
  # methods for accessing commonly-used header values in a more
  # convenient format.
  # 
  module HTTPHeader
    
    def initialize_http_header(initheader)
      @header = {}
      return unless initheader
      initheader.each do |key, value|
        @header[key.downcase] = [value] # should be value.strip
      end
    end
    
    # 
    # Returns the header field corresponding to the case-insensitive key.
    # For example, a key of "Content-Type" might return "text/html"
    # 
    def [](key)
      unless a = @header[key.downcase]
        return nil
      end
      a.join(', ')
    end
    
    # 
    # Sets the header field corresponding to the case-insensitive key.
    # 
    def []=(key, value)
      unless value
        @header.delete key.downcase
        return value
      end
      @header[key.downcase] = [value]
    end
  end # module HTTPHeader
  
  class HTTPResponse # reopen
    
    CODE_TO_OBJ = {
  
    }
    
    class << self
    
    end
    
    include HTTPHeader
    
    def initialize(version, code, message)
      @http_version = version
      @code         = code
      @message      = message
      initialize_http_header nil
      @body = nil
      @read = false
    end
    
    attr_reader :http_version, :code, :message
    
    attr_accessor :body
    
    def inspect
      "#<#{self.class} #{@code} #{@message} readbody=#{@read}>"
    end
            
  end # class HTTPResponse
  
  class HTTPGenericRequest
    include HTTPHeader
    
    def initialize(method, req_has_body, res_has_body, path, initheader)
      @method             = method
      @request_has_body   = req_has_body
      @response_has_body  = res_has_body
      raise ArgumentError, "no HTTP request path given" unless path
      raise ArgumentError, "HTTP request path is empty" if path.empty?
      @path = path
      initialize_http_header initheader
      @body = nil
    end
    
    attr_reader :method, :path, :body
    
    def body=(str)
      @body = str
    end
    
    # 
    # exec (write)
    # 
    # @param [HTTP] http
    # 
    def exec(http, &block)
      puts "need to load #{http.inspect}"
      `var r=opal_http_request_new();`
      `r.open("GET",#{@path},true);`
      `r.onreadystatechange=function(){`
        `if(r.readyState==4){`
          # @body = `r.responseText`
          # finish
        `}`
      `};`
      `r.send(null);`
    end
    
  end # class HTTPGenericRequest
  
  # 
  # request object
  # 
  class HTTPRequest < HTTPGenericRequest
  
    def initialize(path, initheader)
      super self.class::METHOD, 
            self.class::REQUEST_HAS_BODY, 
            self.class::RESPONSE_HAS_BODY,
            path, initheader
    end
  
  end # class HTTPRequest
  
  class HTTP # reopen
  
    # 
    # HTTP 1.1 methods
    # 
    
    class Get < HTTPRequest
      METHOD            = 'GET'
      REQUEST_HAS_BODY  = false
      RESPONSE_HAS_BODY = true
    end
    
    class Post < HTTPRequest
      METHOD            = 'POST'
      REQUEST_HAS_BODY  = true
      RESPONSE_HAS_BODY = true
    end
    
    class Put < HTTPRequest
      METHOD            = 'PUT'
      REQUEST_HAS_BODY  = true
      RESPONSE_HAS_BODY = true
    end
    
    class Delete < HTTPRequest
      METHOD            = 'DELETE'
      REQUEST_HAS_BODY  = false
      RESPONSE_HAS_BODY = true
    end
    
  end # class HTTP
  
  class HTTPError < StandardError; end
end
