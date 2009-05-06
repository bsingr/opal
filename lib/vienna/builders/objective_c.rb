# 
#  objective_c.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-02.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

require 'racc/parser.rb'
require 'strscan'

module Vienna
  
  class ObjectiveCParser < Racc::Parser
    
    attr_reader :tokens

  	def initialize
  	  
  	  @scanners = []

  	  @interface_declarations = []
  	  @category_declarations = []
  	  @implementation_definitions = []
  	  @protocol_declarations = []
  	  @enum_declarations = []
  	  @typedef_declrations = []
  	  
  	 # make array of objective-c implmenetations
  	end
  	
  	def parse_file_to_output(source, output)
  	  tokenize_file(source)
  	  parse
  	end
  	
  	def add_interface_declaration(interface)
  	  
	  end
	  
	  def add_category_declaration(category)
	    
	  end
	  
	  def add_implementation_defintion(implementation)

    end

    def add_protocol_declaration(protocol)
      
    end
    
    def add_enum_declaration(enum)
      
    end
    
    def add_typedef_declaration(typedef)
      
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
      @scanners << StringScanner.new(string)
    end

    def tokenize_file(file)
      f = File.new(file)
      text = f.read
      @scanners << StringScanner.new(text)
    end

  	def parse
  	 #@tokens = tokens
  	 do_parse
  	 puts "Finished parsing"
  	end

  	# def next_token
  	#      @tokens.shift
  	#     end
    
  end
  
end


Vienna.require_all_libs_relative_to(__FILE__)