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
  
  class ObjectiveCImplementation
    
    attr_accessor :name, :category
    
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