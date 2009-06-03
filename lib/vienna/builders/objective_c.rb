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
    
    attr_reader :tokens, :link_config

  	def initialize(source, dest, project)
  	  
  	  @source = source
  	  @destination = dest
  	  @project = project
  	  
  	  @this_file = ObjectiveCFile.new source, self
  	  
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
  	  
      # this is for things that should be output, for example id NSApp = nil;
      # should be output in the implementation file, but kept seperate from
      # the extern declarations
      # @direct_declarations = []
  	  
      # list of resevred keywords that may cause issues in Javascript
      @reserved_keywords = ["new", "function", "var"]
      
      # Linking configuration
      @link_config = { "declarations" => [], "dependencies" => [] }
  	end
  	
  	def build!
  	  symbol_table_push()
  	  
  	  symbol_table_add("void", :VOID)
  	  symbol_table_add("int", :INT)
  	  symbol_table_add("struct", :STRUCT)
  	  symbol_table_add("float", :FLOAT)
  	  symbol_table_add("double", :DOUBLE)
  	  symbol_table_add("char", :CHAR)
  	  
  	  symbol_table_add(:VOID, :VOID)
  	  symbol_table_add(:INT, :INT)
  	  symbol_table_add(:STRUCT, :STRUCT)
  	  symbol_table_add(:FLOAT, :FLOAT)
  	  symbol_table_add(:DOUBLE, :DOUBLE)
  	  symbol_table_add(:CHAR, :CHAR)
  	  
      # puts "Building: #{@this_file.file_path}"
  	  
  	  @objc_files << @this_file
      @parsing_stack << @this_file
      do_parse

  	  output_to_file @destination
  	  symbol_table_pop()
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
  	
	  
	  def add_category_declaration(category)  
	  end
	  
	  
	  def add_implementation_defintion(implementation)
    end


    def add_protocol_declaration(protocol)      
    end
    
    
    def deal_with_enum(e)
      enum = ObjectiveCEnum.new
      enum.deal_with_enum_list(e.left.right)
      # puts e.left.right
      # puts enum.enums.to_yaml
      current_file.enums << enum
      enum.enums.each do |key, value|
        symbol_table_add key, value
      end
    end
    
    
    def deal_with_typedef(t)
      # puts t
      if t.left.right.token == :STRUCT
        the_type = deal_with_struct(t.left.right)
        # puts "Dealing and got struct: #{the_type.class}"
      else
        the_type = t.left.right.token
      end
      
      if t.right.value == '*'
        # puts t
        the_typedef = ObjectiveCTypedef.new
        the_typedef.name = t.right.right.value
        the_typedef.type = the_type
        current_file().typedefs << the_typedef
        symbol_table_add the_typedef.name, the_typedef.type
      else
        the_typedef = ObjectiveCTypedef.new
        the_typedef.name = t.right.value
        the_typedef.type = the_type
        current_file().typedefs << the_typedef
        symbol_table_add the_typedef.name, the_typedef.type
        # puts "Adding #{the_typedef.name} for #{the_typedef.type.class}"
      end
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
        current_file().at_class_list << d.value
        @at_class_list << d.value
      end
    end
    
    
    def register_class_name_from_declaration(class_name)
      @at_class_list << class_name
      current_file().at_class_list << class_name
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
      # puts d
      # puts "---- #{current_file.file_path}:#{current_file.current_line}"
      #       puts d
      # if a direct declarator....
      if d.left.token == :TYPE_NAME and d.value == "d"
        # These should be added to the file for generation (they are directly defining a variable and value, so output it!)
        # @direct_declarations << d
        return
      end
      
      if d.token == :AT_CLASS
        deal_with_at_class d
      elsif d.value == 'F'
        current_file().functions << d
      elsif d.token == :AT_IMPLEMENTATION
        deal_with_implementation d
      elsif d.token == :AT_INTERFACE
        deal_with_interface d
      elsif d.token == :AT_PROTOCOL
        deal_with_protocol d
      elsif d.left.token == :ENUM
        deal_with_enum d
      elsif d.left.token == :STRUCT
        deal_with_struct d
      elsif d.left.left.token == :TYPEDEF
        deal_with_typedef d
      elsif d.left.left.token == :EXTERN
        deal_with_extern d
      else
        abort "#{@parsing_stack.last.file_name}:#{@parsing_stack.last.current_line}:error: was not expecting declaration type: #{d}"
      end
    end
    
    # Thrown on a parsing error. Racc already ends the parsing and the error is
    # printed to the user.
  	def on_error(error_token_id, error_value, value_stack)
  	  abort "#{@parsing_stack.last.file_name}:#{@parsing_stack.last.current_line}:error: was not expecting token #{error_value} after '#{value_stack.last.value}'"
    end
    
    # Imports a file both locally and from known framework directories. This
    # should really check local files based on the current directory of the
    # current file, and not hardcode framworks, but this will do for now.
    # 
    # On finding an error (file doesnt exist, etc) an error should be thrown
    # and parsing should finish (this could be reduced to just a warning??).
    def import_file(file_name, framework_name = nil)
      
      # if @imported_files.include? [framework_name, file_name]
      #   puts "Skippung for #{file_name}"
      #   return
      # end
      # 
      # @imported_files << [framework_name, file_name]
      the_file = framework_name.nil? ? File.join(File.dirname(current_file.file_path), file_name) : File.expand_path(File.join(File.dirname(__FILE__), %w[.. .. .. frameworks], framework_name, file_name)).to_s
                  
      if @project.has_objc_file? the_file
        objc_file = @project.get_objc_file the_file
        # puts "Returning with already used file: #{the_file}" 
        add_objc_file objc_file 
        current_file.imported_files << objc_file
        return
      end
      
      new_objc = ObjectiveCFile.new(the_file, self)
      @project.add_objc_file new_objc
      
      current_file().imported_files << new_objc
      # puts "Importing new file: #{the_file}" 
      if new_objc.valid?
        @objc_files << new_objc
        @parsing_stack << new_objc
      end
    end
    
    # Adds an existing objc_file to the symbol table etc. Note, this recursively
    # adds sub children's imported files and adds all their attributes to the
    # symbol table
    def add_objc_file(file)
      
      return if @objc_files.include? file
      
      @objc_files << file
      
      file.imported_files.each do |i|
        add_objc_file i
        # puts "Re-impoerting: #{i.file_path} from #{file.file_path}"
      end
      
      file.typedefs.each do |typedef|
        symbol_table_add typedef.name, typedef.type
        # puts "# Readding typedef: #{typedef.name} of type: #{typedef.type}"
      end
      
      file.interfaces.each do |int|
        # puts "   - Adding #{int.name}"
        symbol_table_add int.name, int
        # puts "Readding interface #{int.name}"
      end
      
      file.at_class_list.each do |c|
        @at_class_list << c
        # puts "Readding class #{c}"
      end
      
      file.enums.each do |e|
        e.enums.each do |key, value|
          symbol_table_add key, value
        end
      end
      
      file.extern_variables.each do |e|
        symbol_table_add e.name, lookup_symbol(e.type)
      end
      
    end
    
    
    def tokenize_string(string)
      # parse string here
      @scanners << StringScanner.new(string)
    end


  	def parse
  	 #@tokens = tokens
  	 do_parse
  	end

    # Look up type from symbol table. Any known type will be in here. the @classes
    # are checked as a last resort.. these also temporarily hold interface names
    # before the whole interface is processed
  	def lookup_type(type_name)

      # puts "Looking up type: #{type_name}"

      @at_class_list.each do |at_class|
        return make_token(:TYPE_NAME, type_name) if at_class == type_name
      end
      
      the_symbol = lookup_symbol(type_name)
                  
      # If cant find the type, then return nil (i.e, use it as an identifier)
      return make_token(:IDENTIFIER, type_name) if the_symbol.nil?
      
      # enums integers etc..
      return make_token(:CONSTANT, the_symbol) if the_symbol.class == Fixnum
      # variable declarations.. entry in table will be a string, e.g. "NSAppplication"
      return make_token(:IDENTIFIER, the_symbol) if the_symbol.class == String
      return make_token(:TYPE_NAME, type_name)
  	end
  end
end


Vienna.require_all_libs_relative_to(__FILE__)