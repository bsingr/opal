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
      push_nametable
      tree.each do |stmt|
        generate_stmt stmt, :instance => true, :full_stmt => true, :last_stmt => false, :self => current_self
      end
      pop_nametable
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
      when :ivar
        generate_ivar stmt, context
      when :constant
        generate_constant stmt, context
      when :symbol
        generate_symbol stmt, context
      when :self
        generate_self stmt, context
      when :true
        generate_true stmt, context
      when :false
        generate_false stmt, context
      when :nil
        generate_nil stmt, context
      when :if
        generate_if stmt, context
      when :unless
        generate_if stmt, context
      when :if_mod
        generate_if_mod stmt, context
      when :unless_mod
        generate_if_mod stmt, context  
      when :string
        generate_string stmt, context
      when :xstring
        generate_xstring stmt, context
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
      
    # Generate if, unless statemets
    def generate_if stmt, context
      write 'if((e='
      generate_stmt stmt[:expr],:instance => false, :full_stmt => false, :self => current_self, :last_stmt => false
                                
      if stmt.node == :if
        # falseiness determined by not nil or false
        write ",e!==nil && e!==false)){\n"
      else # unless
        write ",e==nil || e==false)){\n"
      end
      
      if stmt[:compstmt]
        stmt[:compstmt].each do |c|
          generate_stmt c, :instance => true, :full_stmt => true, :self => current_self, :last_stmt => (stmt[:compstmt].last == c ? true : false) # also check if the actual 'if' statement is last?
        end
      end
      
      write "}\n"
      if stmt[:tail]
        stmt[:tail].each do |t|
          
          if t.node == :elsif
            write 'else if((e='
            generate_stmt t[:expr], :instance => false, :full_stmt => false, :self => current_self, :last_stmt => false
            write ",e!==nil && e!==false)){\n"
          else # normal else
            write "else{\n"
          end
          
          if t[:compstmt]
            t[:compstmt].each do |c|
              generate_stmt c, :instance => true, :full_stmt => true,:self => current_self, :last_stmt => (t[:compstmt].last == c ? true : false) # also check if the actual 'if' statement is last?
            end
          end
                    
          write "}\n"
        end 
      end
    end
    
    # If/unless mod ... statement after 
    # 
    def generate_if_mod stmt, context
      write 'if((e='
      generate_stmt stmt[:expr],:instance => false, :full_stmt => false, :self => current_self, :last_stmt => false
      
      if stmt.node == :if_mod
        write ",e!==nil && e!==false)){\n"
      else
        write ",e==nil || e==false)){\n"
      end
      
      if stmt[:stmt]
        generate_stmt stmt[:stmt], :instance => true, :full_stmt => true, :self => current_self, :last_stmt => true # also check if the actual 'if' statement is last?
      end
      
      write "}\n"
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
                              # :last_stmt => (klass.bodystmt.last == stmt ? true : false)
                              :last_stmt => false
        end
      end
      
      pop_current_self
    end
    
    # Returns true if the method uses obj-c style named arguments
    def label_styled_args?(definition)
      if definition[:arglist] and definition[:arglist][:arg]
        definition[:arglist][:arg].last.node == :label_arg
      end
    end
    
    # generate objc style name def
    def generate_label_styled_def definition, context
      push_nametable
      # get actual method name
      method_name = definition[:fname] << ':'
      definition[:arglist][:arg].each do |a|
        next if definition[:arglist][:arg].first == a 
        method_name << a[:name]
      end
      
      # main func def
      if definition[:singleton] or context[:self] == 'VN.self'
        write "#{context[:self]}.$def_s('#{method_name}',function("
      else
        write "#{context[:self]}.$def('#{method_name}',function("
      end
      
      # go through arglist val names
      definition[:arglist][:arg].each do |a|
        write a[:value]
        add_to_nametable a[:value]
        write ',' unless definition[:arglist][:arg].last == a
      end
      
      write "){\n"
      write "var self=this;\n"
      
      self.current_self_start_def
      # def statements - note: can have block...
      if definition[:bodystmt]
        definition[:bodystmt].each do |stmt|
          generate_stmt stmt, :instance => (definition[:singleton] ? false : true), :full_stmt => true, :last_stmt => (definition[:bodystmt].last == stmt ? true : false), :self => current_self
        end
      end
            
      self.current_self_end_def
      pop_nametable # pop new nametable
      
      write "});\n"
    end
    
    
    
    
    # Generates a method definition statement. This can be an instance, class or
    # on a specified object that is passed to the context
    # 
    def generate_def definition, context
      
      if label_styled_args? definition
        generate_label_styled_def definition, context
        return
      end
      
      push_nametable # push new nametable
      
      # all methods in top self must be added as singleton methods
      if definition[:singleton] or context[:self] == 'VN.self'
        write "#{context[:self]}.$def_s('#{definition[:fname]}',function("
      else
        write "#{context[:self]}.$def('#{definition[:fname]}',function("
      end
      
      # write definition[:arglist]
      
      # arglist
      if definition[:arglist]
        if definition[:arglist][:arg]
          definition[:arglist][:arg].each do |arg|
            write arg[:value]
            add_to_nametable arg[:value]
            write ',' unless definition[:arglist][:arg].last == arg
          end
        end
        
        if definition[:arglist][:opt_block_arg]
          write ',' if definition[:arglist][:arg]
          write definition[:arglist][:opt_block_arg]
          add_to_nametable definition[:arglist][:opt_block_arg]
        end  
      end
        
      write "){\n"
      # use self inside functions, to avoid blocks/functions from overwriting meaning
      # of 'this'
      write "var self=this;\n"
      
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
      pop_nametable # pop new nametable
      
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
        write 'var ' unless (context[:last_stmt] and context[:full_stmt]) or nametable_include? stmt[:lhs][:name]
        add_to_nametable(stmt[:lhs][:name]) unless nametable_include? stmt[:lhs][:name]
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
          puts stmt[:lhs][:name]
          write 'cObject'
        elsif context[:instance]
          write "#{context[:self]}.$klass"
        else
          write context[:self]
        end
             
        write ".$c_s('#{stmt[:lhs][:name]}',"
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
      # Capture require calls...
      if call[:meth] == 'require' and not call[:recv]
        require_path = @project.file_for_require_relative_to(@source, call[:args][0][:value][0][:value])
        # puts call[:args][0][:value][0][:value]
        build_path = @project.build_file(require_path)
        write "\nVN.require('#{build_path}');\n"
        return
      end
      
      if call[:recv]
        generate_stmt call[:recv], :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :self =>context[:self]
      else
        write current_self
      end
        
      write ".$('#{call[:meth]}',["
      # normal call args
      unless call[:args].nil?
        call[:args].each do |arg|
          generate_stmt arg, :instance => context[:instance], :full_stmt => false
          write ',' unless arg == call[:args].last && call[:brace_block].nil?
        end
      end
      # block
      unless call[:brace_block].nil?
        write "function("
        write "){\n"
        
        if call[:brace_block][:compstmt]
          call[:brace_block][:compstmt].each do |stmt|

            generate_stmt stmt, :instance => (context[:singleton] ? false : true),
                                :full_stmt => true, 
                                :last_stmt => (call[:brace_block][:compstmt].last == stmt ? true : false), 
                                :self => current_self

          end
        end        
        
        write "}"
      end
      write "])"
      write ";\n" if context[:full_stmt]
      
      # write call[:brace_block]
    end
  
    
    
    # Generate a string
    # 
    def generate_string str, context
      write "return " if context[:last_stmt] and context[:full_stmt]

      case str[:value].length
      when 0
        write "''"
      when 1
        write "'"
        write str[:value][0][:value]
        write "'"
      else
        
        write "["
        
        str[:value].each do |s|
          
          case s.node
          when :string_content
            write "'"
            write s[:value]
            write "'"
          when :string_dbeg
            write "("
                    
            s[:value].each do |stmt|
              generate_stmt stmt, :instance => (context[:singleton] ? false : true), :full_stmt => false, :last_stmt => false,  :self => current_self
            end
            
            write ")"
          end
          
          write "," unless str[:value].last == s
        end
        
        write "].join('')"        
      end

      write ";\n" if context[:full_stmt]
    end
    
    # Generate an X-string
    # This basically holds Javascript code....
    # 
    def generate_xstring str, context
      case str[:value].length
      when 0
      when 1
        write str[:value][0][:value]
      else
        str[:value].each do |s|
          case s.node
          when :string_content
            write s[:value]
          when :string_dbeg
            s[:value].each do |stmt|
              generate_stmt stmt, :instance => (context[:singleton] ? false : true), :full_stmt => false, :last_stmt => false,  :self => current_self
            end
          end
        end
      end
    end
    
    
    
    
    
    def generate_module mod, context
      push_current_self
      
      write "var #{current_self} = RModule.define('#{mod.klass_name}');\n"
      
      if mod.bodystmt
        mod.bodystmt.each do |b|
          generate_stmt b, :instance => false,     # all class methods/references in current scope
                              :full_stmt => true,     # full statements, so insert relevant ';' etc
                              :self => current_self  # current 'self' reference
                              # :last_stmt => (mod.bodystmt.last == b ? true : false)
                              
          # write ";\n" unless [:klass, :module].include? b.node
        end
      end
      
      pop_current_self
    end
    
    
    
    
    

    
    def generate_symbol sym, context
      write "'#{sym[:name]}'"
    end
    
    def generate_constant const, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      
      if current_self == 'VN.self'
        write "cObject.$c_g('#{const[:name]}')"
      elsif context[:instance]
        write "#{current_self}.$klass.$c_g('#{const[:name]}')"
      else
        write "#{current_self}.$c_g('#{const[:name]}')"
      end
      
      write ";\n" if context[:full_stmt]
    end
    
    
    def generate_assoc_list list, context
      write "VN.$h("
      
      list[:list].each do |l|
        generate_stmt l[:key], context
        write ', '
        generate_stmt l[:value], context
        write ', ' unless list[:list].last == l
      end
      
      write ")"
    end
  
    
    
    
    def generate_array stmt, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      
      write '['
      
      stmt[:args].each do |a|
        write ',' unless stmt[:args].first == a
        generate_stmt a, context
      end
      
      write ']'
      write ";\n" if context[:full_stmt]
    end
    
    
    def generate_ivar stmt, context
      write "#{current_self}.$i_g('#{stmt[:name]}')"
    end
    
    
    # This method must handle identifiying whether an identifier as actually
    # a varname, or a method call on self.
    def generate_identifier identifier, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      
      if nametable_include? identifier[:name]
        write identifier[:name]
      else
        # method call
        write "#{current_self}.$('#{identifier[:name]}', [])"
      end
      write ";\n" if context[:full_stmt]
    end
    
    def generate_self identifier, context
      write current_self
    end
    
    def generate_true identifier, context
      write 'true'
    end
    
    def generate_false identifier, context
      write 'false'
    end
    
    def generate_nil identifier, context
      write 'nil'
    end
    
    
    def generate_numeric numeric, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      write numeric[:value]
      write ";\n" if context[:full_stmt]
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
