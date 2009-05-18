# 
#  objective_c_models.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-02.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna


  # Used to make a tree of the parsed progream for walking the tree. Value is the
  # value returned by the parse tree, which should be an ParseValue type listed
  # below. Left and right are links to the relevant Nodes, and may be nil (which)
  # is often the case for leaves.
  class Node
    attr_accessor :value, :left, :right, :file, :line_number, :token
    
    # Creates a binary tree from an array [value, left, right],
    # where left and right may themselves be values
    def initialize(value, left, right, file = nil, line_number = nil)
      @value = value
      @token = nil
      @left = left
      @right = right
      # file that the Node was created in (ObjetiveCFile)
      @file = file
      # line number that the Node was created at
      @line_number = line_number
    end
  
    # returns true if this tree has no children
    def leaf?
      @left == nil and @right == nil      
    end
    
    # returns the array representation of the tree
    def to_s
      leaf? ? "#{@value} (#{@token})" : "[#{@value}(#{@token}), #{@left}, #{@right}]"
    end
  end
  
  
  class ObjectiveCIvar
    
    attr_accessor :type, :name
    
    def initialize
      @type = nil
      @name = nil
    end
  end
  
  
  class ObjectiveCProperty
    
    attr_accessor :type, :name
    
    def initialize
      @name = nil
      @type = nil
    end
  end
  
  # This model represents an enum that was defined in either the main file, or 
  # a header imported. Enums are not directly output to JS, so this class is
  # responsible for parsing the values and storing int representations of each
  # enum value. This can be accessed by :enums, which stores each name/value
  # pair in a hash (@enums).
  # 
  # @current_enum_value is used to hold the current int, so that enums that do 
  # not specify an int value can have values asigned automatically. This starts
  # from 0, and increments by 1.
  class ObjectiveCEnum
    
    attr_accessor :name, :enums
    
    def initialize
      @name = nil
      @enums = Hash.new
      @current_enum_value = -1
    end
    
    # Parse enum list.. elements begin with E, and multiple are seperated by a
    # commar, ",".
    def deal_with_enum_list(list)
      return unless list
      
      if list.value == ","
        deal_with_enum_list(list.left)
        deal_with_enum_list(list.right)
      elsif list.value == "E"
        if list.right.nil?
          @enums.store(list.left.value, @current_enum_value = @current_enum_value.to_i + 1)
        else
          @current_enum_value = enum_evaluate(list.right)
          @enums.store(list.left.value, @current_enum_value)
        end
      end
    end
    
    # Evalues the assign of an enum expression. Note: this is recursive upon 
    # itself, if the value is complex. This parses any number of times until just
    # an integer can be returned.
    def enum_evaluate(tree)
      # simply return if tree is a string(simple int, or similar)
      if tree.value.class == String # or tree.class == Fixnum
        return tree.value
      end
      
      if tree.value == "("
        # expression, so parse expression (node.left)
        return enum_evaluate(tree.left)
      elsif tree.value == ","
        # expression type. so go through. (-x)
        if tree.left == "-"
          return tree.right.value.to_i * -1
        end
        return 0
      elsif tree.token == :LEFT_OP
        # x << y, so evaluate. each x/y might also need further parsing
        return enum_evaluate(tree.left).value.to_i << enum_evaluate(tree.right).value.to_i
      else
        # return otherwise: likely an int.
        return tree
      end
    end
    
  end
  
end