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
      @implementation_definitions.each do |i|
        output_implementation(f, i)
      end
  	  f.close
    end
    
    # Outputs the implementation 'imp' to the file 'file'. At the moment no type
    # checking or walking takes place, and everything it output assuming that
    # the semantics are correct. Note: this means that properties/synthesizers
    # are not working, so accessing properties will be seen as accessing struct
    # values, and therefore might not be valid at runtime in Javascript.
    def output_implementation(file, imp)
      
      the_interface = get_interface_by_name imp.name
      
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
  		  end
  		  file.write "\n"
      end
      
      imp.instance_methods.each do |i|
        # basic call to add method def, by name, with self and _cmd attributes
        file.write "class_addMethod(the_class, \"#{i.name}\", function(self, _cmd"
        # add each parameter to the default objc ones, if any exist
        i.param_names.each do |p|
          file.write ", #{p}"
        end
        file.write ") {\n"
        
        output_compound_statement file, i.imp
        
        # end of method, so output types from array
        file.write "}, \"void\");\n\n"
      end
      
      imp.class_methods.each do |c|
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
      end
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
      else
        file.write "something else\n"
      end
    end
    
    
    def output_expression(file, statement)
      return unless statement
      
      if statement.value == 'M'
        output_objc_msgSend file, statement
      elsif statement.token == :IDENTIFIER
        file.write statement.value
      elsif statement.token == :TYPE_NAME
        file.write statement.value
      elsif statement.token == :CONSTANT
        file.write statement.value
      elsif statement.token == :AT_STRING_LITERAL
        file.write statement.value.match(/@(\".*\")/)[1]
      else
        file.write "Unhandled output_expression: #{statement}"
      end
    end
    
    def output_objc_msgSend(file, statement)
      file.write "objc_msgSend("
      output_expression file, statement.left
      file.write ", \""
      output_objc_msgSend_selector file, statement.right
      file.write "\""
      output_objc_msgSend_arguments file, statement.right
      file.write ")"
    end
    
    def output_objc_msgSend_selector(file, selector)
      return unless selector
      if selector.value == ':'
        file.write "#{selector.left.value}:"
      elsif selector.value == ','
        output_objc_msgSend_selector file, selector.left
        output_objc_msgSend_selector file, selector.right
      else
        file.write selector.value
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