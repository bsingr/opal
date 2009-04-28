module Vienna

  class Node
    
    attr_reader :value, :left, :right
    
    # Creates a binary tree from an array [value, left, right],
    # where left and right may themselves be values
    def initialize(value, left, right)
      @value = value
      @left = left
      @right = right
    end
    
    # returns true if this tree has no children
    def leaf?
      @left == nil and @right == nil      
    end
    
    # returns the array representation of the tree
    def to_s
      if leaf?
        "#{@value}"
      else
        "[#{value}, #{left}, #{right}]"
      end
    end
    
  end

  class ObjjClass
  
    attr_reader :name, :ivar_list, :property_list, :method_list, :protocol_list
    
    attr_accessor :super_class
  
    def self.allocate_class_pair(superclass, name)
      new_class = self.new(name)
      new_class.super_class = superclass
      return new_class
    end
  
    def initialize(name)
      @name = name;
      @isa = nil
      @isa = self
      @super_class = nil
      @version = nil
      @info = nil
      @ivar_list = []
      @method_list = []
      @protocol_list = []
      @property_list = []
    end
    
    def meta_class?
      false
    end
    
    def instance_variable(name)
      @ivar_list[name]
    end
    
    def class_variable(name)
      @ivar_list[name]
    end
    
    # Add new instance variable to class
    # returns true if everything is OK (i.e. false if class has variable already)
    # name should be a string, type should also be a string
    def add_ivar(name, type)
      @ivar_list << ObjjIvar.new(name, type)
    end
    
    def property(name)
      
    end
    
    def add_method(name, imp, types)
      @method_list << ObjjMethod.new(name, imp, types)
    end
    
    def instance_method(aSelector)
      
    end
    
    def class_method(aSelector)
      
    end
    
    def replace_method(name, imp, types)
      
    end
    
    def method_implementation(name)
      @method_list[name].method_imp
    end
    
    def responds_to_selector?(sel)
      true
    end
    
    def add_protocol(protocol)
      @protocol_list << protocol
    end
    
    def conforms_to_protocol?(protocol)
      true
    end
    
  end
  
  class ObjjIvar
    
    attr_reader :name, :type
    
    def initialize(name, type)
      @name = name
      @type = type
    end
    
  end
  
  class ObjjMethod
    
    attr_reader :name, :method_types, :method_imp
    
    def initialize(name, imp, types)
      @name = name
      @method_types = imp
      @method_imp = types
    end
    
  end
  
end