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
      # ObjectiveCFile objects of all imported objects, as well as starting file
  	  @objc_files = []
      # an array of all imported files, of type [frameworkname, filename].
      # frameworkname might be nil (look for files in same directory)
  	  @imported_files = []
      # files left to parse. parse towards the end first
  	  @parsing_stack = []
  	  
  	  @symbol_table = []

  	  @interface_declarations = []
  	  @implementation_definitions = []
  	  @protocol_declarations = []
  	  @enum_declarations = []
  	  @typedef_declarations = []
  	  @struct_declarations = []
  	  @extern_functions = []
  	  @at_class_list = []
  	  @known_classes = []
  	end
  	
  	def parser_warning_on_node(node, message)
  	  puts "#{node.file.file_name}:#{node.line_number}:warning: #{message}"
	  end
	  
	  def parser_error_on_node(node, message)
	    abort "#{node.file.file_name}:#{node.line_number}:error: #{message}"
    end
  	
  	def make_node(value, left, right)
  	  Vienna::Node.new(value, left, right, current_file, current_line)
  	end
  	
  	def make_token(type, value)
  	  the_token = Vienna::Node.new(value, nil, nil, current_file, current_line)
  	  the_token.token = type
  	  return [type, the_token]
	  end
	  
	  def node_set_children(parent, left, right)
	    parent.left = left if left
	    parent.right = right if right
	    return parent
    end
  	
    # Returns the current file object being processed. This basically just returns
    # the file at the top of the parsing stack. If a string is being processed, 
    # then it must be simulated so that it responds like a file, so inserting the
    # current file/line_number works as requested
  	def current_file
  	  @parsing_stack.last
  	end
  	
    # If the parser is finished. i.e. if there is nothing left to parse on the
    # parsing stack
  	def finished_parsing?
  	  @parsing_stack.empty?
	  end
  	
    # Returns the current line that the parser is working on. (the file object at
    # the top of the parsing stack)
  	def current_line
  	  finished_parsing? ? 1 : @parsing_stack.last.current_line
  	end
  	
  	
  	def current_scanner
  	  return nil if finished_parsing?
  	  
  	  if @parsing_stack.last.scanner.empty?
  	    @parsing_stack.slice!(@parsing_stack.size - 1)
  	    return current_scanner()
  	  end
  	  
  	  return @parsing_stack.last.scanner
	  end
  	
  	
  	def parse_file_to_output(source, output)
  	  tokenize_file(source)
  	  parse
  	    	  
  	  output_to_file(output)
  	end
	  
	  def add_category_declaration(category)  
	  end
	  
	  
	  def add_implementation_defintion(implementation)
    end


    def add_protocol_declaration(protocol)      
    end
    
    
    def deal_with_enum(e)

    end
    
    
    def deal_with_typedef(t)
      if t.right.value == '*'
        @typedef_declarations << t.right.right.value
      else
        @typedef_declarations << t.right.value
      end
    end
    
    def deal_with_extern(e)
      if e.right.value == "f"
        # puts "Found function #{e.right.left.value}"
        @extern_functions << e.right.left.value
      elsif e.right.value == "*"
        # puts "Found extern declaration1: #{e.right.right}"
      else
        # puts "Found extern declaration2: #{e.right.value}"
      end
    end
    
    def deal_with_struct(s)
      
    end
    
    # This handles @class myClass type declarations. As a new header is dealt 
    # with, this list should really be cleared. For now it is maintained.
    # Also, this currently only holds one class, i.e. one per statement
    def deal_with_at_class(d)
      # @at_class_list << d.left.value
      return if d.nil?
      
      if d.token == :AT_CLASS
        deal_with_at_class d.left
      elsif d.value == ","
        deal_with_at_class d.left
        deal_with_at_class d.right
      else
        @at_class_list << d.value
      end
    end
    
    
    def register_class_name_from_declaration(class_name)
      @known_classes << class_name
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
      
      if d.token == :AT_CLASS
        deal_with_at_class d
      elsif d.token == :AT_IMPLEMENTATION
        deal_with_implementation d
      elsif d.token == :AT_INTERFACE
        deal_with_interface d
      elsif d.token == :AT_PROTOCOL
        deal_with_protocol d
      elsif d.left.token == :ENUM
        deal_with_enum d
      elsif
        d.left.token == :STRUCT
        deal_with_struct d
      elsif d.left.left.token == :TYPEDEF
        deal_with_typedef d
      elsif d.left.left.token == :EXTERN
        deal_with_extern d
      else
        # puts d
      end
    end
    
    # Thrown on a parsing error. Racc already ends the parsing and the error is
    # printed to the user. This is currently fine for one file, but when dealing
    # with projects, one failed build should end the whole build process and
    # inform the user. This therefore needs to report back to the "project"
    # object with news of what happened.
  	def on_error(error_token_id, error_value, value_stack)
  	  msg = "#{@parsing_stack.last.file_path}"
  	  msg << "(#{@parsing_stack.last.current_line})"
      msg << " error: "
    	# msg << "after #{value_stack.last} " if value_stack.length > 1
    	#      msg << "after #{value_stack.last} " unless value_stack.empty?
    	#      msg << "on #{token_to_str(error_token_id)} #{error_value}"
    	msg << "was not expecting token #{error_value} of type #{token_to_str(error_token_id)}"
      puts msg
      # raise ParseError, msg
    end
    
    # Imports a file both locally and from known framework directories. This
    # should really check local files based on the current directory of the
    # current file, and not hardcode framworks, but this will do for now.
    # 
    # On finding an error (file doesnt exist, etc) an error should be thrown
    # and parsing should finish (this could be reduced to just a warning??).
    def import_file(file_name, framework_name = nil)
      
      if @imported_files.include? [framework_name, file_name]
        return
      end
      
      @imported_files << [framework_name, file_name]
      the_file = framework_name.nil? ? file_name : File.expand_path(File.join(File.dirname(__FILE__), %w[.. .. .. frameworks], framework_name, file_name)).to_s
      new_objc = ObjectiveCFile.new(the_file)
      
      if new_objc.valid?
        @objc_files << new_objc
        @parsing_stack << new_objc
      end
    end


    def tokenize_string(string)
      # parse string here
      @scanners << StringScanner.new(string)
    end


    def tokenize_file(file)
      new_objc = ObjectiveCFile.new(file)
      
      if new_objc.valid?
        @objc_files << new_objc
        @parsing_stack << new_objc
      end
    end


  	def parse
  	 #@tokens = tokens
  	 do_parse
  	end

    # Look up the given identifier (type_name) and return its type for use in parser
    # This checks through class interfaces, enums, structs, typedefs and @class
    # declarations. The scope is dealt with on a per file basis. Also scopes can
    # be removed. For example, a #define statement can also be #undef'd
  	def lookup_type(type_name)
  	  
  	  @known_classes.each do |class_name|
	      return class_name if class_name == type_name
	    end
  	   
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