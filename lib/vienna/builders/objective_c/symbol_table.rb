# 
#  objective_c_symbol_table.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-14.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  class ObjectiveCParser
  
    def lookup_symbol(name)
       @symbol_table.last.lookup_symbol(name)
    end
    
    def symbol_table_add(key, type)
      @symbol_table.last.store_symbol(key, type)
    end
    
    def symbol_table_push
      new_table = ObjectiveCSymbolTable.new
      new_table.parent = @symbol_table.last
      @symbol_table.push new_table
    end
    
    def symbol_table_pop
      @symbol_table.pop
    end
  end
  
  class ObjectiveCSymbolTable
    
    attr_accessor :parent
    
    def initialize
      @hash = Hash.new
      @parent = nil
    end
    
    def lookup_symbol(name)
      if @hash.has_key?(name)
        return @hash[name]
      elsif @parent
        return @parent.lookup_symbol(name)
      else
        return nil
      end
    end
    
    def store_symbol(name, type)
      @hash.store(name, type)
    end
    
    def to_s
      puts @hash.keys
      puts @parent if @parent
    end
  end
end