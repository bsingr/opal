# 
#  objective_c_method.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-11.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  # Represents a method declaration in objc. note: does not handle method 
  # definitons yet, so parsing may cause unknown errors/parsing traits.
  class ObjectiveCMethod
    
    attr_accessor :name, :types, :imp, :param_names
    
    def initialize(parse_tree)
      @name = ""
      @types = [parse_tree.left.right]
      @param_names = []
      @imp = nil
      @instance_method = parse_tree.left.left.value == "-" ? true : false
      parse_selector(parse_tree.right)
    end
    
    def to_s
      @name
    end
    
    # Parses the selector node. This could be a normal selector without params,
    # or could include multiple params. Also, this might include an ellipsis
    # as the final parameter. In which case this argument type must be dealt
    # with to accept va_args. Converting this into JS and keep compatible objc
    # code might become somewhat difficult without injecting code into the users
    # program... which probably isnt good.
    def parse_selector(parse_tree)
      return unless parse_tree
      
      if parse_tree.leaf?
        # normal selector, like -(void)doSomething;
        @name << parse_tree.value
      elsif parse_tree.value == ","
        # split, so go left, then right
        parse_selector(parse_tree.left)
        parse_selector(parse_tree.right)
      elsif parse_tree.value == ":"
        # actual selector part: withObject:(NSString *)myString
        @name << "#{parse_tree.left.value}:"
        @types << parse_tree.right.left.value
        @param_names << parse_tree.right.right.value
      end
    end
    
    # The return type of the method. This is basically the first item in the 
    # types array. Check for an empty array, if so, return nil. 
    def return_type
      @types.empty? ? nil : @types[0]
    end
    
    def param_types
      return @types.slice(1..(@types.size-1))
    end
    
    def number_params
      @param_names.size
    end
    
    # true if instance method, or false if class method. This is based on the
    # parsing. Note: this can only be checked once the tree has been parsed, 
    # so it defaults to true (instance method)
    def instance_method?
      return @instance_method
    end
  end
  
  class ObjectiveCMethodImplementation < ObjectiveCMethod
    def initialize(parse_tree)
      @name = ""
      @param_names = []
      @types = [parse_tree.left.left.right]
      @imp = parse_tree.right
      @instance_method = parse_tree.left.left.left.value == "-" ? true : false
      parse_selector(parse_tree.left.right)
    end
  end
end