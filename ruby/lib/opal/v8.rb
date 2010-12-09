begin
  require 'rubygems'
  require 'v8'
rescue Exception
  abort "therubyracer not available. Install it with: sudo gem install therubyracer"
end

module Opal
  class V8
    def self.run
      new
    end
    
    def initialize
      @context = ::V8::Context.new
      @opal_object = OpalV8Object.new
      load_opal
    end
    
    def load_opal
      @context["Opal"] = @opal_object
      opal = File.join File.dirname(__FILE__), "..", "..", "runtime", "opal.js"
      @context.eval(File.read opal)
      
      @context.eval "Opal.main()"
    end
  end
  
  class OpalV8Object
    
    ##
    # Print some string to stdout
    #
    def native_print(str)
      puts str
    end
    
    def native_gets
      gets
    end
  end
end
