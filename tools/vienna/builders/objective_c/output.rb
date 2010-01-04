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
    
    symbol_table_add('id', "NSObject")
    symbol_table_add('nil', "NSObject")
    symbol_table_add('NULL', "NSObject")
    symbol_table_add("YES", 1)
    symbol_table_add("NO", 1)
    
    @this_file.direct_declarations.each do |dec|
    symbol_table_push()
    output_direct_declaration(f, dec)
    symbol_table_pop()
    end
    
    @this_file.functions.each do |func|
    symbol_table_push()
    output_function_definition(f, func)
    symbol_table_pop()
    end
    
    @this_file.implementations.each do |i|
    symbol_table_push()
    symbol_table_add("self", lookup_symbol(i.name))
    symbol_table_add("super", lookup_symbol(lookup_symbol(i.name).super_class))
    output_implementation(f, i)
    symbol_table_pop()
    end
  	  
  	  f.close
  end
  
  def output_direct_declaration(file, dec)
    output_declaration_statement file, dec
    file.write ";\n"
  end
  
  def output_function_definition(file, func)
    # puts func
      file.write "function "
      if func.left.right.value == "*"
        file.write func.left.right.right.right.value
      else
    file.write func.left.right.left.value
    end
    file.write "("
    output_function_definition_params(file, func.left.right.right)
    file.write ")\n{\n"
    output_statement_list file, func.right
    file.write "}\n"
  end
  
  def output_function_definition_params(file, params)
    return unless params
      
    if params.value == ","
    output_function_definition_params file, params.left
    file.write ","
    output_function_definition_params file, params.right
    elsif params.value == "d"
    if params.right.value == "*"
      file.write params.right.right.value
    elsif params.right.value == "f"
      file.write params.right.left.right.value
    else
      file.write params.right.value
    end
    end
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
    file.write ") {\nwith(self) {\n"
    
    output_compound_statement file, i.imp
    
    # end of method, so output types from array
    file.write "}\n}, \"void\");\n\n"
    
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
    file.write ") {\nwith(self) {\n"
    
    output_compound_statement file, c.imp
    
    # end of method, so output types from array
    file.write "}\n}, \"void\");\n\n"
    
    # Finish: pop symbol table to remove all local params to method
    symbol_table_pop()
    end
    
    # Toll free bridging. do once, only when not a category, i.e. main imp
    # declaration
    unless imp.category
    if @toll_free_bridging.key? imp.name
      file.write "#{@toll_free_bridging[imp.name]}.prototype.isa = #{imp.name};\n"
    end
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
    output_statement_list file, statement.left
    output_statement_list file, statement.right
    elsif statement.token == ";"
    output_expression file, statement.left
    file.write ";\n"
    elsif statement.token == :IF
    output_if_statement file, statement
    file.write "\n"
    elsif statement.token == :WHILE
    output_while_statement file, statement
    file.write "\n"
    elsif statement.token == :RETURN
    output_return_statement file, statement
    file.write ";\n"
    elsif statement.token == :FOR
    output_for_statement file, statement
    elsif statement.token == :IN
    output_for_in_statement file, statement
    elsif statement.value == "d"
    output_declaration_statement file, statement
    file.write ";\n"
    elsif statement.value == "{"
    file.write "{\n"
    symbol_table_push()
    output_statement_list file, statement.left
    symbol_table_pop()
    file.write "\n}\n"
    else
    file.write "Unhandled output_statement_list: #{statement}"
    end
  end
  
  def output_for_in_statement(file, statement)
    file.write "var e = objc_msgSend("
    output_expression file, statement.left.right
    file.write ",\"objectEnumerator\");\n"
    
    file.write "while("
    output_expression file, statement.left.left
    
    file.write " = objc_msgSend(e,\"nextObject\"))\n"
    output_statement_list file, statement.right
  end
  
  def output_while_statement(file, statement)
    file.write "while("
    output_expression file, statement.left
    file.write ")"
    output_statement_list file, statement.right
  end
  
  
  def output_expression(file, statement)
    return unless statement
    
    if statement.value == 'M'
    output_objc_msgSend file, statement
    elsif statement.token == :IDENTIFIER
    if @reserved_keywords.include? statement.value
      parser_error_on_node statement, "cannot use word"
    end
    if statement.value == "nil" or statement.value == "NULL"
      file.write "null"
      return statement.value
    end
    the_symbol = lookup_symbol statement.value
    # parser_error_on_node(statement, "unknown symbol #{statement.value}") if the_symbol.nil?
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
    elsif statement.token == :STRING_LITERAL
    file.write statement.value
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
    elsif statement.value == :EQ_OP
    output_expression file, statement.left
    file.write " == "
    output_expression file, statement.right
    elsif statement.value == :NE_OP
    output_expression file, statement.left
    file.write " != "
    output_expression file, statement.right
    elsif statement.value == :LE_OP
    output_expression file, statement.left
    file.write " <= "
    output_expression file, statement.right
    elsif statement.value == :GE_OP
    output_expression file, statement.left
    file.write " >= "
    output_expression file, statement.right
    elsif statement.value == :LEFT_OP
    output_expression file, statement.left
    file.write " << "
    output_expression file, statement.right
    elsif statement.value == :RIGHT_OP
    output_expression file, statement.left
    file.write " >> "
    output_expression file, statement.right
    elsif statement.value == :AND_OP
    output_expression file, statement.left
    file.write " && "
    output_expression file, statement.right
    elsif statement.value == :OR_OP
    output_expression file, statement.left
    file.write " || "
    output_expression file, statement.right
    elsif statement.value == :ADD_ASSIGN
    output_expression file, statement.left
    file.write " += "
    output_expression file, statement.right
    elsif statement.value == :SUB_ASSIGN
    output_expression file, statement.left
    file.write " -= "
    output_expression file, statement.right
    elsif statement.value == :INC_OP
    output_expression file, statement.left
    file.write "++"
    elsif statement.value == :DEC_OP
    output_expression file, statement.left
    file.write "--"
    elsif statement.value == '-'
    output_expression file, statement.left
    file.write " - "
    output_expression file, statement.right
    elsif statement.value == '+'
    output_expression file, statement.left
    file.write " + "
    output_expression file, statement.right
    elsif statement.value == '*'
    output_expression file, statement.left
    file.write " * "
    output_expression file, statement.right
    elsif statement.value == '/'
    output_expression file, statement.left
    file.write " / "
    output_expression file, statement.right
    elsif statement.value == '>'
    output_expression file, statement.left
    file.write " > "
    output_expression file, statement.right
    elsif statement.value == '<'
    output_expression file, statement.left
    file.write " < "
    output_expression file, statement.right
    elsif statement.value == :AT_SELECTOR
    output_at_selector file, statement
    elsif statement.value == "("
    file.write "("
    output_expression file, statement.left
    file.write ")"
    elsif statement.value == "&"
    output_expression file, statement.left
    file.write " & "
    output_expression file, statement.right
     elsif statement.value == "|"
      output_expression file, statement.left
      file.write " | "
      output_expression file, statement.right
    elsif statement.value == ","
    if statement.left.value == "!"
      file.write "!"
      output_expression file, statement.right
    elsif statement.left.value == "-"
      file.write "-"
      output_expression file, statement.right
    else
      output_expression file, statement.left
      file.write ","
      output_expression file, statement.right
    end
    else
    file.write "Unhandled output_expression: #{statement}"
    end
  end
  
  def output_for_statement(file, statement)
    file.write "for("
    output_statement_list file, statement.left.left.left
    output_statement_list file, statement.left.left.right
    output_expression file, statement.left.right
    file.write ")"
    output_statement_list file, statement.right
  end
  
  
  def output_at_selector(file, statement)
    file.write "\""
    output_at_selector_part file, statement.left
    file.write "\""
  end
  
  def output_at_selector_part(file, statement)
    return unless statement
    
    if statement.value == ","
    output_at_selector_part file, statement.left
    output_at_selector_part file, statement.right
    elsif statement.value == ":"
    file.write statement.left.value
    file.write ":"
    else
    file.write statement.value
    end
  end
  
  def output_return_statement(file, statement)
    file.write "return "
    output_expression(file, statement.left) if statement.left
  end
  
  
  def output_declaration_statement(file, d)
    # puts d
    # declaration: NSRect theRect; .. should really output empty object
    if d.right.leaf?
    # struct type declaration
    if @reserved_keywords.include? d.right.value
      parser_error_on_node d, "'#{d.right.value}' is a reserved word"
    end
    symbol_table_add(d.right.value, d.left.value)
    file.write "var #{d.right.value}"
    the_type = lookup_symbol(d.left.value)
    if the_type
      if the_type.class == ObjectiveCStruct and d.left.value == "va_list"
      file.write " = {all:arguments, trailing:[]}"
      else
      file.write " = "
      output_declaration_initializer_object file, the_type
      end
    end
    # Toll free bridging
    # if @toll_free_bridging.value? d.left.value
    #       file.write "#{d.right.value}.isa = #{@toll_free_bridging.rassoc(d.left.value)[0]};\n"
    #     end
    return
    elsif d.right.right.leaf? and d.right.value == "*"
    # type_name declaration with no initialixer: NSString *name;
    if @reserved_keywords.include? d.right.right.value
      parser_error_on_node d, "'#{d.right.right.value}' is a reserved word"
    end
    symbol_table_add(d.right.right.value, d.left.value)
    file.write "var #{d.right.right.value}"
    return
    end
    
    
    if d.right.left.value == "*"
    if @reserved_keywords.include? d.right.left.right.value
      parser_error_on_node d, "'#{d.right.left.right.value}' is a reserved word"
    end
    symbol_table_add(d.right.left.right.value, d.left.value)
    file.write "var #{d.right.left.right.value} = "
    else
    if @reserved_keywords.include? d.right.left.value
      parser_error_on_node d, "'#{d.right.left.value}' is a reserved word"
    end
    symbol_table_add(d.right.left.value, d.left.value)
    file.write "var #{d.right.left.value} = "
    end
    output_expression file, d.right.right
  end
  
  def output_declaration_initializer_object(file, object)
    if object.class == ObjectiveCStruct
    file.write "{"
    (0..object.types.length-1).each do |p|
      file.write "#{object.properties[p]}:"
      output_declaration_initializer_object file, lookup_symbol(object.types[p])
      file.write ","
    end
    file.write "}"
    else
    file.write "0"
    end
  end
  
  def output_declaration(file, declaration)
    symbol_table_add(declaration.right.value, declaration.left.value)
    # puts (declaration.left.value)
    file.write "var #{declaration.right.value}"
  end
  
  def output_assignment(file, assignment)
    output_expression file, assignment.left
    file.write " = "
    output_expression file, assignment.right
  end
  
  def output_block_expression(file, block)
    file.write "function("
    output_function_definition_params file, block.left
    file.write "){\n"
    output_statement_list file, block.right
    file.write "}"
    # file.write block
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
    output_expression file, statement.right
  end
  
  def output_function_call(file, statement)
    file.write statement.left.value
    file.write "("
    output_function_call_params file, statement.right
    file.write ")"
  end
  
  def output_function_call_params(file, params)
    return unless params
    
    if params.value == ","
    output_function_call_params file, params.left
    file.write ","
    output_function_call_params file, params.right
    else
    output_expression file, params
    end
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
    # parser_warning_on_node statement, "#{the_self} may not respond to #{the_selector} (Cannot locate symbol)"
    end
    
    if self_symbol.class != String and self_symbol
    the_method = get_method_by_selector(self_symbol, the_selector)
    if the_method.nil?
      # parser_warning_on_node statement, "#{the_self} may not respond to #{the_selector}"
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
    # puts selector
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