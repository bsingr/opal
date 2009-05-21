# 
#  objective_c_ouput.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-13.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  class ObjectiveCParser
    
    def output_to_file(file)
      f = File.new(file, 'w')
      
      # Add symbols to symbol table for walking
      symbol_table_push()
      
      symbol_table_add('id', lookup_symbol('NSObject'))
      symbol_table_add('nil', lookup_symbol('NSObject'))
      symbol_table_add("YES", 1)
      symbol_table_add("NO", 1)
      
      @this_file.implementations.each do |i|
        symbol_table_push()
        symbol_table_add("self", lookup_symbol(i.name))
        symbol_table_add("super", lookup_symbol(lookup_symbol(i.name).super_class))
        output_implementation(f, i)
        symbol_table_pop()
      end
  	  
  	  f.close
    end
    
    # Outputs the implementation 'imp' to the file 'file'. At the moment no type
    # checking or walking takes place, and everything it output assuming that
    # the semantics are correct. Note: this means that properties/synthesizers
    # are not working, so accessing properties will be seen as accessing struct
    # values, and therefore might not be valid at runtime in Javascript.
    def output_implementation(file, imp)
      
      symbol_table_push()
      
      the_interface = lookup_symbol imp.name
      
      if imp.category
        # If the implementation is a cateogry, then just extend a class. This 
        # assumes the category class already exists, which it should do, in
        # accordance with objective-c
        file.write "var the_class = #{imp.name};\n"
        file.write "var meta_class = the_class.isa;\n"
        file.write "\n"
	    else
        # This is a normal declaration, not a category, so we must output the
        # allocation declarations as well as the ivars. This can cause problems
        # if the class imp is redefined. But it shouldnt be really....
        # 
        # Also, no super_class means that its the base class.. i.e. NSObject, so
        # objc runtime in js expects null as the super_class to define the object
        # as the base of the hierarchy
	      file.write "var the_class = objc_allocateClassPair(#{the_interface.super_class ? the_interface.super_class : "null"}, \"#{imp.name}\");\n"
        file.write "var meta_class = the_class.isa;\n"
  			file.write "objc_registerClassPair(the_class);\n"

  			the_interface.ivars.each do |i|
  			  file.write "class_addIvar(the_class, \"#{i.name}\", \"#{i.type}\");\n"
  			  symbol_table_add i.name, i.type
  		  end
  		  file.write "\n"
      end
      
      imp.instance_methods.each do |i|
        # Setup: add each parameter to the symbol table, along with its type
        symbol_table_push()
        the_names = i.param_names
        the_types = i.param_types
        (0..(i.number_params - 1)).each do |j|
          symbol_table_add the_names[j], the_types[j]
        end
        
        # basic call to add method def, by name, with self and _cmd attributes
        file.write "class_addMethod(the_class, \"#{i.name}\", function(self, _cmd"
        # add each parameter to the default objc ones, if any exist
        i.param_names.each do |p|
          file.write ", #{p}"
        end
        file.write ") {\n"
        
        output_compound_statement file, i.imp
        
        # end of method, so output types from array
        file.write "\n}, \"void\");\n\n"
        
        # Finish: pop symbol table to remove all local params to method
        symbol_table_pop()
      end
      
      imp.class_methods.each do |c|
        # Setup: add each parameter to the symbol table, along with its type
        symbol_table_push()
        the_names = c.param_names
        the_types = c.param_types
        (0..(c.number_params - 1)).each do |j|
          symbol_table_add the_names[j], the_types[j]
        end
        
        # basic call to add method def, by name, with self and _cmd attributes
        file.write "class_addMethod(meta_class, \"#{c.name}\", function(self, _cmd"
        # add each parameter to the default objc ones, if any exist
        c.param_names.each do |p|
          file.write ", #{p}"
        end
        file.write ") {\n"
        
        output_compound_statement file, c.imp
        
        # end of method, so output types from array
        file.write "\n}, \"void\");\n\n"
        
        # Finish: pop symbol table to remove all local params to method
        symbol_table_pop()
      end
      
      symbol_table_pop()
    end
    
    
    def output_compound_statement(file, statement)
      return unless statement

      if statement.value == ","
        output_compound_statement file, statement.left
        output_compound_statement file, statement.right
      else
        output_statement_list file, statement
      end
    end
    
    
    def output_statement_list(file, statement)
      return unless statement

      if statement.value == ","
        puts "output_statement_list: branching.. shouldnt really branch here.."
      elsif statement.token == ";"
        output_expression file, statement.left
        file.write ";\n"
      elsif statement.token == :IF
        output_if_statement file, statement
        file.write "\n"
      elsif statement.token == :RETURN
        output_return_statement file, statement
        file.write ";\n"
      elsif statement.value == "d"
        output_declaration_statement file, statement
        file.write ";\n"
      else
        file.write "Unhandled output_statement_list: #{statement}"
      end
    end
    
    
    def output_expression(file, statement)
      return unless statement
      
      if statement.value == 'M'
        output_objc_msgSend file, statement
      elsif statement.token == :IDENTIFIER
        if @reserved_keywords.include? statement.value
          parser_error_on_node statement, "cannot use word"
        end
        the_symbol = lookup_symbol statement.value
        parser_error_on_node(statement, "unknown symbol #{statement.value}") if the_symbol.nil?
        file.write statement.value
        return statement.value
      elsif statement.token == :TYPE_NAME
        file.write statement.value
        return statement.value
      elsif statement.token == :CONSTANT
        file.write statement.value
        return statement.value
      elsif statement.token == :AT_STRING_LITERAL
        file.write statement.value.match(/@(\".*\")/)[1]
        return statement.value
      elsif statement.token == '='
        output_assignment file, statement
      elsif statement.value == "d"
        output_declaration file, statement
      elsif statement.value == "?"
        output_ternary_expression file, statement
      elsif statement.value == "b"
        output_block_expression file, statement
      elsif statement.value == "."
        output_dot_notation file, statement
      elsif statement.value == "f"
        output_function_call file, statement
      else
        file.write "Unhandled output_expression: #{statement}"
      end
    end
    
    def output_return_statement(file, statement)
      file.write "return "
      output_expression(file, statement.left) if statement.left
    end
    
    
    def output_declaration_statement(file, d)
      if d.right.left.value == "*"
        if @reserved_keywords.include? d.right.left.right.value
          parser_error_on_node d, "'#{d.right.left.right.value}' is a reserved word"
        end
        symbol_table_add(d.right.left.right.value, lookup_symbol(d.left.value))
        file.write "var #{d.right.left.right.value} = "
      else
        if @reserved_keywords.include? d.right.left.value
          parser_error_on_node d, "'#{d.right.left.value}' is a reserved word"
        end
        symbol_table_add(d.right.left.value, lookup_symbol(d.left.value))
        file.write "var #{d.right.left.value} = "
      end
      output_expression file, d.right.right
    end
    
    def output_declaration(file, declaration)
      symbol_table_add(declaration.right.value, lookup_symbol(declaration.left.value))
      # puts (declaration.left.value)
      file.write "var #{declaration.right.value}"
    end
    
    def output_assignment(file, assignment)
      output_expression file, assignment.left
      file.write " = "
      output_expression file, assignment.right
    end
    
    def output_block_expression(file, block)
      file.write block
    end
    
    def output_ternary_expression(file, statement)
      output_expression file, statement.left
      file.write " ? "
      output_expression file, statement.right.left
      file.write " : "
      output_expression file, statement.right.right
    end
    
    def output_if_statement(file, statement)
      symbol_table_push()
      file.write "if ("
      output_expression file, statement.left.left
      file.write ")\n"
      output_statement_list file, statement.left.right
      
      if statement.right
        file.write "else\n"
        output_statement_list file, statement.right.left
      end
      symbol_table_pop()
    end
    
    def output_dot_notation(file, statement)
      output_expression file, statement.left
      file.write "."
      file.write statement.right.value
    end
    
    def output_function_call(file, statement)
      file.write statement.left.value
      file.write "("
      output_expression file, statement.right
      file.write ")"
    end
    
    
    def output_objc_msgSendSuper(file, statement)
      # FIXME: need to fix to get superclass of current self
      super_class = lookup_symbol("super").name
      file.write "objc_msgSendSuper({super_class:#{super_class}, receiver:self}"
      the_selector = get_objc_msgSend_selector(file, statement.right)
      
      file.write ", \""
      file.write the_selector
      file.write "\""
      output_objc_msgSend_arguments file, statement.right
      file.write ")"

      return super_class
    end
    
    
    def output_objc_msgSend(file, statement)
      return output_objc_msgSendSuper(file, statement) if statement.left.value == "super"

      file.write "objc_msgSend("
      the_self = output_expression file, statement.left
      
      self_symbol = lookup_symbol the_self
      
      the_selector = get_objc_msgSend_selector(file, statement.right)
      
      if self_symbol.nil?
        abort "#{the_self} does not exist"
      end
      
      unless self_symbol.class == String
        the_method = get_method_by_selector(self_symbol, the_selector)
        if the_method.nil?
          parser_warning_on_node statement, "#{the_self} may not respond to #{the_selector}"
        end
      end
      
      file.write ", \""
      file.write the_selector
      file.write "\""
      output_objc_msgSend_arguments file, statement.right
      file.write ")"
      
      # should really check here to see if its alloc/init, then return the_self
      # otherwise return the return type from the method, types[0]. alloc init
      # are different, as people use id as the return type, which will cause a
      # lot of warnings, so we assume we return the same object
      return the_self
    end
    
    
    def get_objc_msgSend_selector(file, selector)
      return "" unless selector
      if selector.value == ':'
        return "#{selector.left.value}:"
      elsif selector.value == ','
        return get_objc_msgSend_selector(file, selector.left) + get_objc_msgSend_selector(file, selector.right)
      else
        return selector.value
      end
    end
    
    
    def output_objc_msgSend_arguments(file, selector)
      return unless selector
      if selector.value == ':'
        file.write ", "
        output_expression file, selector.right
      elsif selector.value == ','
        output_objc_msgSend_arguments file, selector.left
        output_objc_msgSend_arguments file, selector.right
      end
    end
  end
end