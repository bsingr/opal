# 
#  objective_c_implementation.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-12.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  class ObjectiveCParser
    
    def deal_with_implementation_declaration(parse_tree)
      name = parse_tree.left.left.left
      category = parse_tree.left.left.right
      ivar_list = parse_tree.left.right
      method_definitions = parse_tree.right
      
      if get_implementation_by_name(name, category)
        puts "already got: #{name} (#{category})"
      end
      
      new_i = ObjectiveCImplementation.new
      new_i.name = name
      new_i.category = category
      @implementation_definitions << new_i
      
    end
    
    def get_implementation_by_name(name, category = nil)
      @implementation_definitions.each do |i|
  	    if category.nil?
  	      return i if i.name == name and i.category == nil
	      else
	        return i if i.name == name and i.category == category
        end
      end
      # return nil if not found...
      return nil
    end
  end
  
  # Represents an actual implementation block discovered in the code. It maintains
  # the file to which it was discoeverd to support single parsing of files, so 
  # that headers can be shared, and do not need to be parsed more than once. 
  class ObjectiveCImplementation
    # Implementation (class) name, e.g. NSObject
    attr_accessor :name 
    # Implementation category, if one exists. This is nil most of the time
    attr_accessor :category
    # ObjectiveCFile that implementation was found in. It must be noted that
    # it is very possible that an implementation can be distributed throughout
    # multiple files/frameworks. These though should have their respective
    # category names so that the initial class declaration can be added to by
    # using category methods.
    attr_accessor :file
    
    def initialize
      @name = nil
      @category = nil
    end
    
    # Gets the instance of ObjectiveCInterface that is relevant to this object
    # Should always return a value. Its not usual not to have an interface
    # declared before the definition of the class
    def interface
      
    end
    
    def to_s
      "#{@name} (#{@category})"
    end
  end
end