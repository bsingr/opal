require 'racc/parser.rb'

module Vienna
  
  class ObjectiveJ < Racc::Parser
    
    attr_reader :tokens

  	def initialize
  	  @tokens = []
  	 # make array of objective-c implmenetations
  	end

  	def on_error(error_token_id, error_value, value_stack)
      msg = "parse error "
    	msg << "after #{value_stack.last} " if value_stack.length > 1
    	msg << "after #{value_stack.last} " unless value_stack.empty?
    	msg << "on #{token_to_str(error_token_id)} #{error_value}"
    	puts msg
    	#raise ParseError, msg
    end

    def tokenize_string(string)
      # parse string here
      make_tokens(string)
      @tokens << [false, false]
    end

    def tokenize_file(file)
      f = File.new(file)
      text = f.read
      tokenize_string(text)
    end

  	def parse
  	 #@tokens = tokens
  	 do_parse
  	 puts "Finished parsing"
  	end

  	def next_token
  	  @tokens.shift
    end
    
  end
  
end


Vienna.require_all_libs_relative_to(__FILE__)