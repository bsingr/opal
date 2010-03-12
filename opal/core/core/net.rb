module Net
  
  class HTTP
    
    def initialize(address, port)
      @address = address
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
        @do_block = block
        do_start
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
      @request = `r=opal_http_request_new()`
      `r.open("GET","http://www.google.com",true);`
      `r.onreadystatechange=function(){`
        `if(r.readyState==4){`
          @body = `r.responseText`
          finish
        `}`
      `};`
      `r.send(null);`
      self
    end
    
    def finish
      raise("HTTP session not yet started") unless @started
      @do_block.call(self)
    end
    
    def body
      @body
    end
    
  end
end
