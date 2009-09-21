# 
# generate.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2009 Adam Beynon.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#

module Vienna
  
  class RubyParser
    
    # Generates the given parse tree. A context is maintained for each stage to
    # ensure that the correct format is kept for developing the tree. This
    # involves keeping a track of aspects such as is the current context an
    # instance or class method (or in the top self, which is instance). This is
    # useful for catching @ivars and @@cvars in the wrong place, knowing where
    # to reference Constants etc. The context is maintained as a hash. All keys
    # used as listed here:
    # 
    #  :instance - if present, then the current context is inside an instance
    #              method def, or the top self context. If not present, then
    #              the context is inside a class/module definition
    #  :last_stmt - the current stmt is the last in some context/block, so an
    #              implicit return is required. This is handled differently by
    #              different types of stmt. If statements, for example, need 
    #              to apply this to each of it's last statements, for each
    #              possible if/elsif/else value.
    #  :full_stmt - the current stmt is a full statement (in real terms, this
    #              means that we need to insert a ';\n' after the currently
    #              processed statement, as to complete it).
    # 
    def generate_tree tree
      tree.each do |stmt|
        generate_stmt stmt, :instance => true, :full_stmt => true, :last_stmt => false, :self => current_self
      end
    end
    
    # Generate any type of statement with the given options
    # 
    def generate_stmt stmt, context
      case stmt.node
      when :klass
        generate_class stmt, context
      when :module
        generate_module stmt, context
      when :def
        generate_def stmt, context
      when :numeric
        generate_numeric stmt, context
      when :call
        generate_call stmt, context
      when :identifier
        generate_identifier stmt, context
      when :constant
        generate_constant stmt, context
      when :symbol
        generate_symbol stmt, context
      when :self
        generate_self stmt, context
      when :array
        generate_array stmt, context
      when :assign
        generate_assign stmt, context
      when :assoc_list
        generate_assoc_list stmt, context
      else
        write "\n[Unknown type for generate_stmt: #{stmt}]\n"
      end
    end
    
    
    # Generate a class. This might be within the context of an outer module or
    # klass, and might be nested indefinately deep within such combinations
    # 
    def generate_class klass, context
      # top-level
      if context[:self] == 'VN.self'
        push_current_self
        write "var #{current_self} = RClass.define('#{klass.klass_name}', #{klass.super_klass});\n"
      else # nested class
        outer = context[:self]
        push_current_self
        write "var #{current_self} = RClass.define_under(#{outer}, '#{klass.klass_name}', #{klass.super_klass});\n"
      end
      
      # statements
      if klass.bodystmt
        klass.bodystmt.each do |stmt|
          generate_stmt stmt, :instance => false,     # all class methods/references in current scope
                              :full_stmt => true,     # full statements, so insert relevant ';' etc
                              :self => current_self,  # current 'self' reference
                              :last_stmt => (klass.bodystmt.last == stmt ? true : false)
        end
      end
      
      pop_current_self
    end
    
    
    # Generates a method definition statement. This can be an instance, class or
    # on a specified object that is passed to the context
    # 
    def generate_def definition, context
      # all methods in top self must be added as singleton methods
      if definition[:singleton] or context[:self] == 'VN.self'
        write "#{context[:self]}.$def_s('#{definition[:fname]}',function("
      else
        write "#{context[:self]}.$def('#{definition[:fname]}',function("
      end
      
      # arglist
      if definition[:arglist]
        definition[:arglist][:arg].each do |arg|
          write arg
          write ',' unless definition[:arglist][:arg].last == arg
        end
      end
      
      write "){\n"
      
      self.current_self_start_def
      # def statements
      if definition[:bodystmt]
        definition[:bodystmt].each do |stmt|
          
          generate_stmt stmt, :instance => (definition[:singleton] ? false : true),
                              :full_stmt => true, 
                              :last_stmt => (definition[:bodystmt].last == stmt ? true : false), 
                              :self => current_self
          
        end
      end
            
      self.current_self_end_def
      
      write "});\n"
    end
    
    # Main entry point for assignments (with one lhs/rhs)
    def generate_assign stmt, context
      
      if context[:last_stmt] and context[:full_stmt]
        write 'return '
      end     
      
      # if lhs is an identifier...
      if stmt[:lhs].node == :identifier
        # if already in var table, just put name = ...
        # if not in var table, make new var, and add it
        # we do not write var if we have just put a return before it....js error
        write 'var ' unless context[:last_stmt] and context[:full_stmt]
        write "#{stmt[:lhs][:name]} = "
        generate_stmt stmt[:rhs], :instance => context[:instance], context[:full_stmt] => false, context[:last_stmt] => true, :self => context[:self]
      
      # If LHS is an @instance_variable
      elsif stmt[:lhs].node == :ivar
        write "#{context[:self]}.$i_s('#{stmt[:lhs][:name]}',"
        generate_stmt stmt[:rhs], :instance => context[:instance], context[:full_stmt] => false, context[:last_stmt] => true, :self => context[:self]
        write ')'
      
      # IF LHS is a CONSTANT
      elsif stmt[:lhs].node == :constant
        if context[:self] == 'VN.self'
          write 'cObject'
        elsif context[:instance]
          write "#{context[:self]}.$klass"
        else
          write context[:self]
        end
             
        write ".$const_set('#{stmt[:lhs][:name]}',"
        generate_stmt stmt[:rhs], :instance => context[:instance], context[:full_stmt] => false, :last_stmt => context[:last_stmt], :self => context[:self]
        write ')'
      else
        write stmt
      end
      
      write ";\n" if context[:full_stmt]
      
    end
    
    # Generate method-call
    # 
    def generate_call call, context
      if call[:recv]
        generate_stmt call[:recv], :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :self =>context[:self]
      else
        write current_self
      end
        
      write ".$('#{call[:meth]}',["
      unless call[:args].nil?
        call[:args].each do |arg|
          generate_stmt arg, :instance => context[:instance], :full_stmt => false
          write ',' unless arg == call[:args].last
        end
      end
      write "])"
      write ";\n" if context[:full_stmt]
    end
    
    
    
    
    
    
    
    def generate_module mod, context
      push_current_self
      
      write "var #{current_self} = RModule.define('#{mod.klass_name}');\n"
      
      if mod.bodystmt
        mod.bodystmt.each do |b|
          generate_stmt b
          write ";\n" unless [:klass, :module].include? b.node
        end
      end
      
      pop_current_self
    end
    
    
    
    
    

    
    def generate_symbol sym, context
      write "'#{sym[:name]}'"
    end
    
    def generate_constant const, context
      if current_self == 'VN.self'
        write "cObject.$const_get('#{const[:name]}')"
      else
        write "#{current_self}.$klass.$const_get('#{const[:name]}')"
      end
    end
    
    
    def generate_assoc_list list, context
      write "VN.$h("
      
      list[:list].each do |l|
        generate_stmt l[:key]
        write ', '
        generate_stmt l[:value]
        write ', ' unless list[:list].last == l
      end
      
      write ")"
    end
  
    
    
    
    def generate_array stmt, context
      write '['
      
      stmt[:args].each do |a|
        write ',' unless stmt[:args].first == a
        generate_stmt a
      end
      
      write ']'
    end
    
    # This method must handle identifiying whether an identifier as actually
    # a varname, or a method call on self.
    def generate_identifier identifier, context
      # method call
      write "#{current_self}.$('#{identifier[:name]}', [])"
      write ";\n" if context[:full_stmt]
      # varname
      # write identifier[:name]
    end
    
    def generate_self identifier, context
      write current_self
    end
    
    
    
    
    def generate_numeric numeric, context
      write numeric[:value]
    end
    
  end
end








# 
# f_arg: 1 or more normal args, with commars
# f_optarg: name = val, with a commar
# f_rest_arg: *args
# opt_f_block: &block
# 

# f_arg ',' f_optarg ',' f_rest_arg opt_f_block_arg
# f_arg ',' f_optarg ',' f_rest_arg ',' f_arg opt_f_block_arg
# f_arg ',' f_optarg opt_f_block_arg
# f_arg ',' f_optarg ',' f_arg opt_f_block_arg
# f_arg ',' f_rest_arg opt_f_block_arg
# f_arg ',' f_rest_arg ',' f_arg opt_f_block_arg
# f_arg opt_f_block_arg

# f_optarg ',' f_rest_arg opt_f_block_arg
# f_optarg ',' f_rest_arg ',' f_arg opt_f_block_arg
# f_optarg opt_f_block_arg
# f_optarg ',' f_arg opt_f_block_arg

# f_rest_arg opt_f_block_arg
# f_rest_arg ',' f_arg opt_f_block_arg

# f_block_arg
# none...
#
