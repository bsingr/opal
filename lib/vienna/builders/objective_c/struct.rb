# 
#  objective_c_struct.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-15.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  class ObjectiveCParser
    
    def deal_with_struct(parse_tree)
      # puts parse_tree
      new_struct = ObjectiveCStruct.new
      new_struct.name = parse_tree.left.value if parse_tree.left
      new_struct.deal_with_ivar_list parse_tree.right
      # puts parse_tree
      return new_struct
    end
    
  end
  
  # struct in c. types are the types of properties, int, char etc and the properties
  # array stores the names of the actual properties. defaults are default values
  # set on each property, and are optional. when parsing, if no default is given,
  # then they are assigned a null value (nil), so null in JS should be output..
  # depending on the type. if the type is a struct, then output that, an array, then
  # do that etc
  class ObjectiveCStruct
    
    attr_accessor :types, :properties, :defaults, :name
    
    def initialize
      @name = ""
      @types = []
      @properties = []
      @defaults = []
    end
    
    def deal_with_ivar_list(list)
      return unless list
      
      if list.value == ","
        deal_with_ivar_list list.left
        deal_with_ivar_list list.right
      elsif list.value == "i"
        @types << list.left.value
        @properties << list.right.value
      end
    end
    
  end
end
