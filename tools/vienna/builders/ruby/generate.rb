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
    #  :call_recv - when the stateent is the reciever of a method call. useful
    #             for numbers, which need to be surrounded in parantheses
    # 
    #  :scope_constant - When true, only lookup in current class. dont look up
    #             nearby when the current constant is the first in a list, or by
    #             itself. in this case, a full search must take place so that
    #             nearby and parent classes/modules are also searched. If the
    #             constant is y in X::Y, then once we have X, we know Y must be
    #             a direct child of X. IF we just had X, then X could be defined
    #             locally, or in Object, or, as we want, might be nearby in the
    #             same module, or indeed the parent module.
    def generate_tree tree
      # write "console.log('#{@source}');"
      push_nametable
      tree.each do |stmt|
        generate_stmt stmt, :instance => true, :full_stmt => true, :last_stmt => false, :top_level => true, :self => current_self
      end
      pop_nametable
    end
    
    # Generate any type of statement with the given options
    # 
    def generate_stmt stmt, context
      # puts stmt
      case stmt.node
      when :klass
        generate_class stmt, context
      when :module
        generate_module stmt, context
      when :class_shift
        generate_class_shift stmt, context
      when :def
        generate_def stmt, context
      when :numeric
        generate_numeric stmt, context
      when :call
        generate_call stmt, context
      when :super
        generate_super stmt, context
      when :identifier
        generate_identifier stmt, context
      when :ivar
        generate_ivar stmt, context
      when :cvar
        generate_cvar stmt, context
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
      when :op_asgn
        generate_op_asgn stmt, context
      when :lparen
        generate_lparen stmt, context
      when :return
        generate_return stmt, context
      when :colon2
        generate_colon2 stmt, context
      when :colon3
        generate_colon3 stmt, context
      when :case
        generate_case stmt, context
      when :yield
        generate_yield stmt, context
      when :orop
        generate_orop stmt, context
      when :andop
        generate_andop stmt, context
      when :not
        generate_not stmt, context
      when :tertiary
        generate_tertiary stmt, context
      when :dot2
        generate_dot2 stmt, context
      else
        write "\n[Unknown type for generate_stmt: #{stmt}]\n"
      end
    end
    
    
    
    def generate_class_shift stmt, context
      write "(function(self) {\n"
      push_nametable
      current_self_start_def
      
      
      if stmt[:bodystmt]
        stmt[:bodystmt].each do |bodystmt|
          bodystmt[:singleton] = node(:self, :name => 'self')
          generate_stmt bodystmt, :instance => false, :full_stmt => true, :last_stmt => bodystmt == stmt[:bodystmt].last
        end
      end
      
      current_self_end_def
      pop_nametable
      write "})("
      generate_stmt stmt[:expr], :instance => false, :full_stmt => false, :last_stmt => false
      write ")"
      write ";\n" if context[:full_stmt]
    end
    
    
    
    
    def generate_super stmt, context
      write "return " if context[:last_stmt] and context[:full_stmt]
      if stmt[:call_args] and stmt[:call_args][:args]
        # use the given arguments for super
        # write "self.$sup(arguments.callee,'#{context[:fname]}', ["
        write "rb_supcall(arguments.callee, self,_,["
        
        stmt[:call_args][:args].each do |p|
          generate_stmt p, :instance => false, :full_stmt => false, :self => current_self, :last_stmt => false
          write ',' unless p == stmt[:call_args][:args].last
        end              
        write "])"
      else
        # no args given, so just reuse provided arguments
        # write "self.$sup(arguments.callee,'#{context[:fname]}', arguments)"
        
        # here, split arguments into array, taking out the first two args (self, _cmd);
        write "rb_supcall(arguments.callee, self,_,[])"
      end
      write ";\n" if context[:full_stmt]
    end
      
    # Generate if, unless statemets
    def generate_if stmt, context
      if stmt.node == :if
        write "if(#{js_replacement_function_name('RTEST')}("
      else
        write "if(!#{js_replacement_function_name('RTEST')}("
      end
      
      generate_stmt stmt[:expr],:instance => context[:instance], :full_stmt => false, :self => current_self, :last_stmt => false
      
      write ")){\n"
      
      if stmt[:stmt]
        stmt[:stmt].each do |c|
          generate_stmt c, :instance => context[:instance], :full_stmt => true, :self => current_self, :last_stmt => context[:laststmt] && (stmt[:stmt].last == c ? true : false)  # also check if the actual 'if' statement is last?
        end
      end
      
      write "}\n"
      if stmt[:tail]
        stmt[:tail].each do |t|
          
          if t.node == :elsif
            write "else if(#{js_replacement_function_name('RTEST')}("
            generate_stmt t[:expr], :instance => context[:instance], :full_stmt => false, :self => current_self, :last_stmt => false
            write ")){\n"
          else # normal else
            write "else{\n"
          end
          
          if t[:stmt]
            t[:stmt].each do |c|
              generate_stmt c, :instance => context[:instance], :full_stmt => true,:self => current_self, :last_stmt => context[:laststmt] && (t[:stmt].last == c ? true : false) # also check if the actual 'if' statement is last?
            end
          end
                    
          write "}\n"
        end 
      end
    end
    
    # If/unless mod ... statement after 
    # 
    def generate_if_mod stmt, context
      # puts "IF node"
      # puts stmt
      if stmt.node == :if_mod
        write "if(#{js_replacement_function_name('RTEST')}("
      else
        write "if(!#{js_replacement_function_name('RTEST')}("
      end

      generate_stmt stmt[:expr],:instance => context[:instance], :full_stmt => false, :self => current_self, :last_stmt => false
      
      write ")){\n"
      
      if stmt[:stmt]
        generate_stmt stmt[:stmt], :instance => context[:instance], :full_stmt => true, :self => current_self, :last_stmt => false # also check if the actual 'if' statement is last?
      end
      
      write "}\n"
    end
    
    
    # Generate a class. This might be within the context of an outer module or
    # klass, and might be nested indefinately deep within such combinations
    # 
    def generate_class klass, context
      
      write "(function(self) {\n"
      
      
      # Statements
      if klass.bodystmt
        klass.bodystmt.each do |stmt|
          generate_stmt stmt, :instance => false,     # all class methods/references in current scope
                              :full_stmt => true,     # full statements, so insert relevant ';' etc
                              :self => current_self,  # current 'self' reference
                              :last_stmt => (klass.bodystmt.last == stmt ? true : false)
        end
      end
      
      write "})("
      if context[:top_level]
        # top level
        # write "RClass.define('#{klass.klass_name}',"
        write "#{js_replacement_function_name('rb_define_class')}("
        write js_id_for_const(klass.klass_name)
        write ","
      else
         # nested
          # write "RClass.define_under(self,'#{klass.klass_name}',"
          write "#{js_replacement_function_name('rb_define_class_under')}(self,"
          write js_id_for_const(klass.klass_name)
          write ","
      end
      
      # superclass..
      if klass.super_klass
        generate_stmt klass.super_klass[:expr], :instance => false, :full_stmt => false, :self => current_self, :last_stmt => false
        write ")"
      else
        write "cObject)"
      end
      
      write ");\n"
      
      # # top-level
      # if context[:self] == 'VN.self'
      #   push_current_self
      #   write "var #{current_self} = RClass.define('#{klass.klass_name}',"
      # else # nested class
      #   outer = context[:self]
      #   push_current_self
      #   write "var #{current_self} = RClass.define_under(#{outer}, '#{klass.klass_name}'," 
      # end
      # 
      # # superclass...
      # if klass.super_klass
      #   generate_stmt klass.super_klass[:expr], :instance => false, :full_stmt => false, :self => current_self, :last_stmt => false
      #   write ");\n"
      # else
      #   write "cObject);\n"
      # end
      # 
      # # statements
      # if klass.bodystmt
      #   klass.bodystmt.each do |stmt|
      #     generate_stmt stmt, :instance => false,     # all class methods/references in current scope
      #                         :full_stmt => true,     # full statements, so insert relevant ';' etc
      #                         :self => current_self,  # current 'self' reference
      #                         # :last_stmt => (klass.bodystmt.last == stmt ? true : false)
      #                         :last_stmt => false
      #   end
      # end
      # 
      # pop_current_self
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
      if definition[:singleton]
        generate_stmt definition[:singleton], :instance => definition[:instance], :full_stmt => false, :last_stmt => false
        write ".$def_s(#{js_id_for_string(method_name)},function(self,_,"
      else
        write "self.$def(#{js_id_for_string(method_name)},function(self,_,"
      end
      
      # js_id_for_string(method_name)
      
      # go through arglist val names
      definition[:arglist][:arg].each do |a|
        write a[:value]
        add_to_nametable a[:value]
        write ',' unless definition[:arglist][:arg].last == a
      end
      
      # TODO: check if block_var has been defined, and if label, add onto name
      
      write "){\n"
      
      self.current_self_start_def
      # def statements - note: can have block...
      if definition[:bodystmt]
        definition[:bodystmt].each do |stmt|
          generate_stmt stmt, :instance => (definition[:singleton] ? false : true), :full_stmt => true, :last_stmt => (definition[:bodystmt].last == stmt ? true : false), :self => current_self, :fname => method_name
        end
      end
      
      # TODO: check for block...
            
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
      
      # write"rb_define_method("
      # all methods in top self must be added as singleton methods
      if definition[:singleton]
        # puts definition[:singleton]
        generate_stmt definition[:singleton], :instance => definition[:instance], :full_stmt => false, :last_stmt => false
        # write "#{context[:self]}"
        write ".$def_s(#{js_id_for_string(definition[:fname])},function(self,_"
        # write ",s$#{js_id_for_string(definition[:fname])}, function(self, _cmd"
      else
        # write "self.$def(s$#{js_id_for_string(definition[:fname])},function(self,_cmd"
        write "#{js_replacement_function_name('rb_define_method')}("
        
        if context[:top_level]
          write "rb_cObject"
        else
          write "self"
        end
        
        write ",#{js_id_for_string(definition[:fname])},function(self,_"
        # write "/* #{current_self} */"
      end
      
      # js_id_for_string(definition[:fname])
      
      # write definition[:arglist]
      
      # arglist
      if definition[:arglist]
        if definition[:arglist][:arg]
          definition[:arglist][:arg].each do |arg|
            write ","
            write arg[:value]
            add_to_nametable arg[:value]
            # write ',' unless definition[:arglist][:arg].last == arg
          end
        end
        # block
        if definition[:arglist][:opt_block_arg]
          write ','
          write definition[:arglist][:opt_block_arg]
          add_to_nametable definition[:arglist][:opt_block_arg]
        end  
      end
        
      write "){\n"
      
      self.current_self_start_def
      # def statements
      if definition[:bodystmt]
        definition[:bodystmt].each do |stmt|
          
          generate_stmt stmt, :instance => (definition[:singleton] ? false : true),
                              :full_stmt => true, 
                              :last_stmt => (definition[:bodystmt].last == stmt), 
                              :self => current_self,
                              :fname => definition[:fname]
          
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
        write "#{stmt[:lhs][:name]}="
        generate_stmt stmt[:rhs], :instance => context[:instance], context[:full_stmt] => false, context[:last_stmt] => true, :self => context[:self]
        
      
      # If LHS is an @instance_variable
      elsif stmt[:lhs].node == :ivar
        write "#{context[:self]}.$i_s(#{js_id_for_ivar(stmt[:lhs][:name])},"
        generate_stmt stmt[:rhs], :instance => context[:instance], context[:full_stmt] => false, context[:last_stmt] => true, :self => context[:self]
        write ')'
      
      
      # Class var
      elsif stmt[:lhs].node == :cvar
        write "#{context[:self]}.$k_s('#{stmt[:lhs][:name]}',"
        generate_stmt stmt[:rhs], :instance => context[:instance], context[:full_stmt] => false, context[:last_stmt] => true, :self => context[:self]
        write ')'
      
      
      # IF LHS is a CONSTANT
      elsif stmt[:lhs].node == :constant
        if context[:top_level]
          # puts stmt[:lhs][:name]
          write 'cObject'
        elsif context[:instance]
          write "self.$klass"
        else
          write "self"
        end
             
        write ".$c_s('#{stmt[:lhs][:name]}',"
        generate_stmt stmt[:rhs], :instance => context[:instance], context[:full_stmt] => false, :last_stmt => context[:last_stmt], :top_level => context[:top_level]
        write ')'
        
      # elsif LHS is a call (as the equals sign onto call method, and use rhs as param)
      elsif stmt[:lhs].node == :call
        write "#{js_replacement_function_name('rb_funcall')}("
        generate_stmt stmt[:lhs][:recv], :instance => context[:instance], context[:full_stmt] => false, :last_stmt => context[:last_stmt], :self => context[:self]
        # write ",#{js_id_for_string("#{stmt[:lhs][:meth]}="}),"
        write ","
        write js_id_for_string("#{stmt[:lhs][:meth]}=")
        write ","
        # if its []= then we need to output 2 args
        if stmt[:lhs][:meth] == '[]'
          # write stmt[:]
          generate_stmt stmt[:lhs][:args][:args][0],
           :instance => context[:instance], context[:full_stmt] => false, :last_stmt => context[:last_stmt], :self => context[:self]
          write ','
        end
        generate_stmt stmt[:rhs], :instance => context[:instance], context[:full_stmt] => false, :last_stmt => context[:last_stmt], :self => context[:self]
        write ")"
      else
        write stmt
      end
      
      write ";\n" if context[:full_stmt]
      
    end
    
    # Returns true if the method call is manufactured to look like an objc style call
    # 
    def label_styled_call? call
      # puts call
      if call[:call_args] and call[:call_args][:assocs]
        return true if call[:call_args][:assocs].first.node == :label_assoc
      end
      false
    end
    
    def generate_label_styled_call call, context
      write "return " if context[:last_stmt] and context[:full_stmt]
      
      write "#{js_replacement_function_name('rb_funcall')}("
      
      if call[:recv]
        generate_stmt call[:recv], :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :top_level => context[:top_level], :call_recv => true
      else
        write "self"
      end
      
      method_name = call[:meth] << ':'
      
      call[:call_args][:assocs].each do |a|
        method_name << a[:key]
      end
      
      write",#{js_id_for_string(method_name)},"
      # js_id_for_string(method_name)
      
      # write ".$('#{method_name}',["
      
      generate_stmt call[:call_args][:args][0], :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :self =>context[:self], :top_level => context[:top_level]
      
      call[:call_args][:assocs].each do |a|
        write ","
        generate_stmt a[:value], :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :self =>context[:self], :top_level => context[:top_level]
      end
      
      # write "])"
      write ")"
      write ";\n" if context[:full_stmt]
      
    end
    
    # Generate method-call
    # 
    def generate_call call, context
      # capture objc style calls
      return generate_label_styled_call(call, context) if label_styled_call? call
      
      # Capture require calls...
      if call[:meth] == 'require' and not call[:recv]
        require_path = @project.require_path_relative_to_file(@source, call[:call_args][:args][0][:value][0][:value])
        # puts call[:args][0][:value][0][:value]
        if require_path
          # puts "requiring: #{require_path}"
          build_path = @project.build_file(require_path)
          write "\nVN.require('#{build_path}');\n"
        end
        return
      end
      
      write "return " if context[:last_stmt] and context[:full_stmt]
      
      write "#{js_replacement_function_name('rb_funcall')}("
      
      if call[:recv]
        generate_stmt call[:recv], :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :self =>context[:self], :call_recv => true, :top_level => context[:top_level]
      else
        write 'self'
        # write current_self
      end
      
      write ",#{js_id_for_string(call[:meth])}"
      # js_id_for_string(call[:meth])
        
      # write ".$('#{call[:meth]}',["
      
      # normal call args
      unless call[:call_args].nil? or call[:call_args][:args].nil?
        # write ","
        call[:call_args][:args].each do |arg|
          write ","
          generate_stmt arg, :instance => context[:instance], :full_stmt => false
          # write ',' unless arg == call[:call_args][:args].last && call[:call_args][:brace_block].nil?
        end
      end
      
      # assocs
      if call[:call_args] and call[:call_args][:assocs]
        write ","
        # puts call[:call_args][:assocs]
        write "VN.$h("
        call[:call_args][:assocs].each do |a|
          write "," unless call[:call_args][:assocs].first == a
          
          generate_stmt a[:key], :instance => context[:instance], :full_stmt => false, :top_level => context[:top_level]
          write ","
          generate_stmt a[:value], :instance => context[:instance], :full_stmt => false, :top_level => context[:top_level]
          # write a
        end
        write ")"
        
        # generate_assoc_list call[:call_args][:assocs], :instance => context[:instance], :full_stmt => false
      end
      # write call
      # if call[:meth] == 'sprite'
        # puts 'gmmm'
        # puts call[:call_args][:brace_block]
      # end
      
      # block
      unless call[:brace_block].nil?
        push_nametable
        
        write ","
        write "function("
        if call[:brace_block][:params]
          call[:brace_block][:params].each do |p|
            write "," unless call[:brace_block][:params].first == p
            write p[:value]
            add_to_nametable p[:value]
          end
        end
        write "){\n"
        
        if call[:brace_block][:stmt]
          call[:brace_block][:stmt].each do |stmt|

            generate_stmt stmt, :instance => (context[:singleton] ? false : true),
                                :full_stmt => true, 
                                :last_stmt => (call[:brace_block][:stmt].last == stmt ? true : false), 
                                :self => current_self,
                                :top_level => context[:top_level]

          end
        end        
        
        write "}"
        pop_nametable
        
      end # end block
      
      write ")"
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
        # write "'"
        write str[:beg]
        write str[:value][0][:value]
        write str[:beg]
        # write "'"
      else
        
        write "["
        
        str[:value].each do |s|
          
          case s.node
          when :string_content
            write str[:beg]
            write s[:value]
            write str[:beg]
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
      
      write "(function(self) {\n"
      
      # Statements
      if mod.bodystmt
        mod.bodystmt.each do |stmt|
          # puts stmt
          # puts stmt.node
          generate_stmt stmt, :instance => false,     # all class methods/references in current scope
                              :full_stmt => true,     # full statements, so insert relevant ';' etc
                              :self => current_self,  # current 'self' reference
                              :last_stmt => (mod.bodystmt.last == stmt ? true : false),
                              :nested => true
        end
      end
      
      write "})("
      # write "RModule.define('#{mod.klass_name}')"
      write "#{js_replacement_function_name('rb_define_module')}("
      # write "#{mod.klass_name}"
      write js_id_for_const(mod.klass_name)
      write ")"
      write ");\n"
    end
    
    
    
    
    

    
    def generate_symbol sym, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      write "#{js_id_for_symbol(sym[:name])}"
      # write "'#{sym[:name]}'"
      write ";\n" if context[:full_stmt]
    end
    
    def generate_constant const, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      
      constant_scope = context[:scope_constant] ? '$c_g' : '$c_g_full'
      if context[:top_level]
        # nothing else to look around, so normal check..
        write "cObject.$c_g(#{js_id_for_const(const[:name])})"
      elsif context[:instance]
        write "self.$klass.#{constant_scope}(#{js_id_for_const(const[:name])})"
      else
        write "self.#{constant_scope}(#{js_id_for_const(const[:name])})"
      end
      
      write ";\n" if context[:full_stmt]
    end
    
    
    def generate_assoc_list list, context
      
      # write "/* #{context[:instance]} */"
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      write "VN.$h("
      
      list[:list].each do |l|
        if l.node == :label_assoc
          key = l[:key].slice(0, l[:key].length - 1)
          write "#{js_id_for_symbol(key)}"
        else
          generate_stmt l[:key], :instance => (context[:singleton] ? false : true), :full_stmt => false, :last_stmt => false,  :self => current_self
        end
        write ', '
        # generate_stmt l[:value], :instance => (context[:singleton] ? false : true), :full_stmt => false, :last_stmt => false,  :self => current_self
        generate_stmt l[:value], :instance => context[:instance], :full_stmt => false, :last_stmt => false,  :self => current_self
        write ', ' unless list[:list].last == l
      end
      
      write ")"
      write ";\n" if context[:full_stmt]
    end
  
    
    
    
    def generate_array stmt, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      
      write '['
      if stmt[:args]
        stmt[:args].each do |a|
          write ',' unless stmt[:args].first == a
          generate_stmt a, :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt],  :self => current_self
        end
      end
      
      write ']'
      write ";\n" if context[:full_stmt]
    end
    
    
    def generate_ivar stmt, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      # write "#{current_self}.$i_g('#{stmt[:name]}')"
      # write "#{current_self}.$i_g(i$#{js_id_for_ivar(stmt[:name])})"
      write "#{js_replacement_function_name('rb_ivar_get')}(#{current_self},#{js_id_for_ivar(stmt[:name])})"
      write ";\n" if context[:full_stmt]
    end
    
    
    # This method must handle identifiying whether an identifier as actually
    # a varname, or a method call on self.
    def generate_identifier identifier, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      
      if nametable_include? identifier[:name]
        write identifier[:name]
      else
        # method call
        # write "#{current_self}.$('#{identifier[:name]}', [])"
        write "#{js_replacement_function_name('rb_funcall')}(#{current_self},#{js_id_for_string(identifier[:name])})"
      end
      write ";\n" if context[:full_stmt]
    end
    
    def generate_self identifier, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      write "self"
      write ";\n" if context[:full_stmt]
    end
    
    def generate_true identifier, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      write 'true'
      write ";\n" if context[:full_stmt]
    end
    
    def generate_false identifier, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      write 'false'
      write ";\n" if context[:full_stmt]
    end
    
    def generate_nil identifier, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      write 'nil'
      write ";\n" if context[:full_stmt]
    end
    
    
    def generate_numeric numeric, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      write '(' if context[:call_recv] # is number is the reciever of a call, we need to wrap it in params
      write "#{numeric[:value]}"
      write ')' if context[:call_recv]
      write ";\n" if context[:full_stmt]
    end
    
    
    # ||=, &&= etc - assign methods that cannot be overridden
    # 
    def generate_op_asgn stmt, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      
      op_node = case stmt[:op]
      when '||'
        node :orop, :lhs => stmt[:lhs], :rhs => stmt[:rhs]
      when '&&'
        node :andop, :lhs => stmt[:lhs], :rhs => stmt[:rhs]
      when '+'
        node :call, :recv => stmt[:lhs], :meth => '+', :call_args => { :args => [stmt[:rhs]] }
      when '-'
        node :call, :recv => stmt[:lhs], :meth => '-', :call_args => { :args => [stmt[:rhs]] }
      end

      generate_stmt node(:assign, :lhs => stmt[:lhs], :rhs => op_node), :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :self => context[:self]
      
      write ";\n" if context[:full_stmt]
    end
    
    def generate_lparen stmt, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      write '('
      stmt[:stmt].each do |s|
        generate_stmt s, :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :self => context[:self]
      end
      write ')'
      write ";\n" if context[:full_stmt]
    end
    
    def generate_return stmt, context
      write 'return '
      
      if stmt[:call_args]
        if stmt[:call_args][:args].length == 1
          generate_stmt stmt[:call_args][:args][0], :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :self => context[:self]
        else
          write '['
          stmt[:call_args][:args].each do |r|
            generate_stmt r, :instance => context[:instance], :full_stmt => false, :last_stmt => false, :self => context[:self]
            write ',' unless r == stmt[:call_args][:args].last
          end
          write ']'
        end
      end
      
      write ";\n" if context[:full_stmt]
    end
    
    
    
    # primay::CONST
    def generate_colon2 stmt, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      generate_stmt stmt[:lhs], :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :top_level => context[:top_level]
      # write '.$c_g('
      # generate_stmt stmt[:rhs], :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :self => context[:self]
      write ".$c_g('#{stmt[:rhs]}')"
      write ";\n" if context[:full_stmt]
    end
    
    def generate_colon3 stmt, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      write "cObject.$c_g('#{stmt[:rhs]}')"
      write ";\n" if context[:full_stmt]
    end
    
    
    # Case/when statements
    def generate_case stmt, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      
      write "(function($v){\n"
      
      stmt[:body].each do |w|      
        if w == stmt[:body].first
          write "if(($e = #{js_replacement_function_name('rb_funcall')}("
          generate_stmt w[:args][0], :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :self => context[:self]
          write ", '===', $v),$e!==nil && $e!==false)){\n"
          if w[:stmt]
            w[:stmt].each do |s|
              generate_stmt s, :instance => context[:instance], :full_stmt => true, :last_stmt => w[:stmt].last == s, :self => context[:self]
            end
          end
          write "}\n"
        elsif (w == stmt[:body].last) and (w.node == :else)
          write "else {\n"
          # write w
          if w[:stmt]
            w[:stmt].each do |s|
              generate_stmt s, :instance => context[:instance], :full_stmt => true, :last_stmt => w[:stmt].last == s, :self => context[:self]
            end
          end
          write "}\n"
        # end
        else
          write "else if(($e = #{js_replacement_function_name('rb_funcall')}("
          generate_stmt w[:args][0], :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :self => context[:self]
          write ", '===', $v),$e!==nil && $e!==false)){\n"
          if w[:stmt]
            w[:stmt].each do |s|
              generate_stmt s, :instance => context[:instance], :full_stmt => true, :last_stmt => w[:stmt].last == s, :self => context[:self]
            end
          end
          write "}\n"
        end
      end
            
      write "})("
      if stmt[:expr]
        generate_stmt stmt[:expr], :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :self => context[:self]
      else
        write "true"
      end
      write ")"
      
      
      write ";\n" if context[:full_stmt]
    end
    
    # yield..
    def generate_yield stmt, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      write "arguments[arguments.length -1]("
      if stmt[:call_args] and stmt[:call_args][:args]
        stmt[:call_args][:args].each do |arg|
          write "," unless stmt[:call_args][:args].first == arg
          generate_stmt arg, :instance => context[:instance], :full_stmt => false, :last_stmt => false, :self => context[:self]
        end
      end
      write ")"
      write ";\n" if context[:full_stmt]
    end
    
    
    def generate_cvar stmt, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      write "self.$k_g('#{stmt[:name]}')"
      write ";\n" if context[:full_stmt]
    end
    
    
    def generate_orop stmt, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      
      write "ORTEST("
      generate_stmt stmt[:lhs], :instance => context[:instance], :full_stmt => false, :last_stmt => false, :self => context[:self]
      write ","
      generate_stmt stmt[:rhs], :instance => context[:instance], :full_stmt => false, :last_stmt => false, :self => context[:self]
      write ")"
      
      write ";\n" if context[:full_stmt]
    end
    
    def generate_andop stmt, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      
      write "ANDTEST("
      generate_stmt stmt[:lhs], :instance => context[:instance], :full_stmt => false, :last_stmt => false, :self => context[:self]
      write ","
      generate_stmt stmt[:rhs], :instance => context[:instance], :full_stmt => false, :last_stmt => false, :self => context[:self]
      write ")"
      
      write ";\n" if context[:full_stmt]
    end
    
    def generate_not stmt, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      write "NOTTEST("
      generate_stmt stmt[:expr], :instance => context[:instance], :full_stmt => false, :last_stmt => false, :self => context[:self]
      write ")"
      write ";\n" if context[:full_stmt]
    end
    
    def generate_tertiary stmt, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      write "#{js_replacement_function_name('RTEST')}("
      generate_stmt stmt[:expr], :instance => context[:instance], :full_stmt => false, :last_stmt => false, :self => context[:self]
      write ") ? "
      generate_stmt stmt[:true], :instance => context[:instance], :full_stmt => false, :last_stmt => false, :self => context[:self]
      write " : "
      generate_stmt stmt[:false], :instance => context[:instance], :full_stmt => false, :last_stmt => false, :self => context[:self]
      write ";\n" if context[:full_stmt]
    end
    
    
    def generate_dot2 stmt, context
      write 'return ' if context[:last_stmt] and context[:full_stmt]
      
      write "VN.$r("
      generate_stmt stmt[:start], :instance => context[:instance], :full_stmt => false, :last_stmt => false, :self => context[:self]
      write ","
      generate_stmt stmt[:ending], :instance => context[:instance], :full_stmt => false, :last_stmt => false, :self => context[:self]
      write ",false)"
      write ";\n" if context[:full_stmt]
    end
    
  end
end
