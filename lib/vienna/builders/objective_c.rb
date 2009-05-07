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
  	  @imported_files = []

  	  @interface_declarations = []
  	  @implementation_definitions = []
  	  @protocol_declarations = []
  	  @enum_declarations = []
  	  @typedef_declarations = []
  	  @struct_declarations = []
  	  @at_class_list = []
  	  
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
      @typedef_declarations << typedef.right
    end
    
    # This handles @class myClass type declarations. As a new header is dealt 
    # with, this list should really be cleared. For now it is maintained.
    # Also, this currently only holds one class, i.e. one per statement
    def deal_with_at_class(d)
      puts @at_class_list << d.left
    end
    
    # This basically handles declarations sent straight from the parse tree, as
    # they are encountered. It is important to do this during the parse as we
    # need to know new definitions as we encounter them.
    # 
    # This method only works out the type of declaration, and if (as some are
    # not) relevat, then it passes the tree off to one of the above functions.
    # For example, defining variables is not declaring a type, so these can be
    # dealt with as we walk the tree through scope
    # 
    # declaration - of type Vienna::Node for the base of the declaration
    # 
    def deal_with_declaration(d)
      if d.left.left == :TYPEDEF and d.right != nil
        add_typedef_declaration(d)
      end
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
      
      if @imported_files.include? [framework_name, file_name]
        puts "Already included header: #{file_name}"
        return
      end
      
      @imported_files << [framework_name, file_name]
      
      the_file = framework_name.nil? ? file_name : File.expand_path(File.join(File.dirname(__FILE__), %w[.. .. .. frameworks], framework_name, file_name)).to_s
      
      if File.exists? the_file
        f = File.new(the_file)
        text = f.read
        @scanners << StringScanner.new(text)
      else
        puts "Imported file #{file_name} does not exist"
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
      # Just go through interface class names and return that interface
  	  @interface_declarations.each do |interface|
  	    return interface if interface.name == type_name
      end
      
      @typedef_declarations.each do |typedef|
        return typedef if typedef == type_name
      end
      
      @at_class_list.each do |at_class|
        return at_class if at_class == type_name
      end
      
      # If cant find the type, then return nil (i.e, use it as an identifier)
      return nil
  	end
    
  end
  
end


Vienna.require_all_libs_relative_to(__FILE__)