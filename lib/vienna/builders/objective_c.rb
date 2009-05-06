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
  	  @implementation_definitions = []
  	  @protocol_declarations = []
  	  @enum_declarations = []
  	  @typedef_declrations = []
  	  @struct_declarations = []
  	  
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
    
    def import_file(file_name, framework_name = nil)
      
      if framework_name.nil?
        
        # No framework, so look in local directory for files
        f = File.new(file_name)
        text = f.read
        @scanners << StringScanner.new(text)
        
      else
        
        # Look in known framework directories
        puts "Looking for framework #{framework_name} with header #{file_name}"
        f = File.new(File.expand_path(File.join(File.dirname(__FILE__), %w[.. .. .. frameworks], framework_name, file_name)).to_s)
        text = f.read
        @scanners << StringScanner.new(text)
      end
      
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


    # Look up the given identifier (type_name) and return its type for use in parser
    # This checks through class interfaces, enums, structs, typedefs and @class
    # declarations. The scope is dealt with on a per file basis. Also scopes can
    # be removed. For example, a #define statement can also be #undef'd
  	def lookup_type(type_name)
  	 
  	  if type_name == "BOOL"
  	    puts "Returning BOOL for typename"
  	    return type_name
	    end
  	 
  	  @interface_declarations.each do |interface|
  	    return interface if interface.name == type_name
      end
      
      puts "Returning nil for symbol: #{type_name}"
      
      # If cant find the type, then return nil (i.e, use it as an identifier)
      return nil
  	 
  	end
    
  end
  
end


Vienna.require_all_libs_relative_to(__FILE__)