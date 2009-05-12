# 
#  objective_c_models.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-02.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna

  # This class is used to represent a file that is, or will be, parsed and 
  # tokeniszed by the parser. This class holds references to scanners used
  # to tokenize the file, the file's path, and other details that might be
  # used at some point during parsing.
  class ObjectiveCFile
    
    attr_accessor :scanner, :file_path, :current_line
    
    def initialize(file_path)
      @file_path = file_path
      @valid_file = true
      @current_line = 1
      
      if File.exists? file_path
        f = File.new(file_path)
        text = f.read
        @scanner = StringScanner.new(text)
      else
        puts "Imported file #{file_path} does not exist"
        @valid_file = false
      end
    end
    
    def valid?
      @valid_file
    end
    
  end


  # Used to make a tree of the parsed progream for walking the tree. Value is the
  # value returned by the parse tree, which should be an ParseValue type listed
  # below. Left and right are links to the relevant Nodes, and may be nil (which)
  # is often the case for leaves.
  class Node
    attr_reader :value, :left, :right, :file_path, :line_number
    
    # Creates a binary tree from an array [value, left, right],
    # where left and right may themselves be values
    def initialize(value, left, right)
      @value = value
      @left = left
      @right = right
      # file that the Node was created in
      @file_path = nil
      # line number that the Node was created at
      @line_number = nil
    end
  
    # returns true if this tree has no children
    def leaf?
      @left == nil and @right == nil      
    end
    
    # returns the array representation of the tree
    def to_s
      leaf? ? "#{@value}" : "['#{value}', '#{left}', '#{right}']"
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
  
  class ObjectiveCEnum
    
    attr_accessor :name, :enums
    
    def initialize
      @name = nil
      @enums = Hash.new
      @current_enum_value = -1
    end
    
    def deal_with_enum_list(list)
      return unless list
      
      if list.value == ","
        deal_with_enum_list(list.left)
        deal_with_enum_list(list.right)
      elsif list.value == "E"
        if list.right.nil?
          @enums.store(list.left, @current_enum_value = @current_enum_value.to_i + 1)
        else
          @current_enum_value = enum_evaluate(list.right)
          @enums.store(list.left, @current_enum_value)
        end
      end
    end
    
    def enum_evaluate(tree)
            
      if tree.class == String # or tree.class == Fixnum
        return tree
      end
      
      if tree.value == "("
        return enum_evaluate(tree.left)
      elsif tree.value == ","
        if tree.left == "-"
          return tree.right.to_i * -1
        end
        return 0
      elsif tree.value == :LEFT_OP
        return enum_evaluate(tree.left).to_i << enum_evaluate(tree.right).to_i
      else
        return tree
      end
    end
    
  end
  
end