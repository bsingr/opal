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
    
    attr_accessor :name, :types, :imp
    
    def initialize(parse_tree)
      @name = ""
      @types = [parse_tree.left.right]
      @imp = nil
      @instance_method = parse_tree.left.left == "-" ? true : false
      parse_selector(parse_tree.right)
    end
    
    # Parses the selector node. This could be a normal selector without params,
    # or could include multiple params. Also, this might include an ellipsis
    # as the final parameter. In which case this argument type must be dealt
    # with to accept va_args. Converting this into JS and keep compatible objc
    # code might become somewhat difficult without injecting code into the users
    # program... which probably isnt good.
    def parse_selector(parse_tree)
      return unless parse_tree
      
      if parse_tree.class == String
        # normal selector, like -(void)doSomething;
        @name << parse_tree
      elsif parse_tree.value == ","
        # split, so go left, then right
        parse_selector(parse_tree.left)
        parse_selector(parse_tree.right)
      elsif parse_tree.value == ":"
        # actual selector part: withObject:(NSString *)myString
        @name << parse_tree.left << ":"
        @types << parse_tree.right.left
      end
    end
    
    # The return type of the method. This is basically the first item in the 
    # types array. Check for an empty array, if so, return nil. 
    def return_type
      @types.empty? ? nil : @types[0]
    end
    
    # true if instance method, or false if class method. This is based on the
    # parsing. Note: this can only be checked once the tree has been parsed, 
    # so it defaults to true (instance method)
    def instance_method?
      return @instance_method
    end
    
  end
  
end