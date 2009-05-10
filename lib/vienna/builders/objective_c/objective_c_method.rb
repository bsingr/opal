module Vienna
  
  class ObjectiveCMethod
    
    attr_accessor :name, :types, :imp
    
    def initialize(parse_tree)
      @name = ""
      @types = [parse_tree.left.right]
      @imp = nil
      @instance_method = parse_tree.left.left == "-" ? true : false
      parse_selector(parse_tree.right)
      puts @name
      puts @types
    end
    
    def parse_selector(parse_tree)
      return unless parse_tree
      
      if parse_tree.class == String
        @name << parse_tree
      elsif parse_tree.value == ","
        parse_selector(parse_tree.left)
        parse_selector(parse_tree.right)
      elsif parse_tree.value == ":"
        @name << parse_tree.left << ":"
        @types << parse_tree.right.left
      end
    end
    
    def return_type
      @types.empty? ? nil : @types[0]
    end
    
    def instance_method?
      return @instance_method
    end
    
  end
  
end