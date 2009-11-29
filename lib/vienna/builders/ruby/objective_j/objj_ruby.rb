# 
# objj_ruby.rb
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

# Custom behaviour for writing objective J ruby files
# This should really be merged back into the main generator. This is basically
# a rewrite to make things tidier.
class Vienna::ObjjRuby < Vienna::RubyParser
  
  def initialize(source, destination, project)
    super
    @current_self = ['rb_top_self']
  end
  
  def current_self_push(s)
    @current_self << s
  end
  
  def current_self_pop
    @current_self.pop
  end
  
  def generate_tree(tree)
    push_nametable
    tree.each do |stmt|
      generate_stmt stmt, :instance => true, :full_stmt => true, :last_stmt => false, :top_level => true
    end
    pop_nametable
  end
  
  def generate_stmt stmt, context
    # write "[..#{stmt.node}..]"
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
      raise "Unknown type for generate_stmt: #{stmt}"
    end
  end
  
  def generate_def(definition, context)
    # capture if objective-c style method (as in more than one selector name)
    if label_styled_args?(definition)
      generate_label_styled_def(definition, context)
      return
    end
    
    # new nametabel scope
    push_nametable
    
    selector_has_colon = (definition[:arglist] && definition[:arglist][:arg]) ? true : false
    
    if definition[:singleton]
      write "rb_define_singleton_method("
      generate_stmt definition[:singleton], :instance => context[:instance], :full_stmt => false, :last_stmt => false
      write ",'#{definition[:fname]}',function(self,_cmd"
      
      current_self_push 'self'
    elsif context[:top_level]
      # if top level, current self will be rb_top_self
      write "rb_define_singleton_method(#{current_self},'#{definition[:fname]}',function(self,_cmd"
      current_self_push 'self'
    else
      # 'normal' def methods should be checked to objj-ify them... turn them into a selector (colons) etc. 
      # basicallt, if they are not a label_styled_arg, but only take one parameter, they should really be
      # of the form fname: .. where the def name is also camelcased.
      write "rb_define_method(#{current_self}, '#{definition[:fname]}"
      
      if definition[:arglist] and definition[:arglist][:arg] and definition[:arglist][:arg].length == 1
        write ":" unless definition[:fname].match(/[\<\>\=\+\-\*\/\[\]\!\~\^\?]/)
      end
      
      write "',function(self,_cmd"
      current_self_push 'self'
    end
    
    # arglist here..
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
    
    
    write ") {\n"
    
    # stmts
    if definition[:bodystmt]
      definition[:bodystmt].each do |stmt|
        
        generate_stmt stmt, :instance => (definition[:singleton] ? false : true),
                            :full_stmt => true,
                            :last_stmt => (definition[:bodystmt].last == stmt),
                            :fname => definition[:fname]
        
      end
    end
    
    # get rid of current self, also, pop nametable
    current_self_pop
    pop_nametable
    
    write "});\n"
  end
  
  
  # generate pbjj style name def
  def generate_label_styled_def(definition, context)
    push_nametable
    # get actual method name
    method_name = definition[:fname].vn_selectorize(true)
    definition[:arglist][:arg].each do |a|
      next if definition[:arglist][:arg].first == a 
      # method_name << a[:name].vn_selectorize(true)
      method_name << a[:name].gsub(/:/, '').vn_selectorize(true)
    end
    
    # main func def
    if definition[:singleton]
      write "rb_define_singleton_method("
      generate_stmt definition[:singleton], :instance => definition[:instance], :full_stmt => false, :last_stmt => false
      write ","
      write method_name
      write ",function(self,_cmd"
      # write ".$def_s(#{js_id_for_string(method_name)},function(self,_,"
    else
      write "rb_define_method("
      write current_self
      write ",'"
      write method_name
      write "',function(self,_cmd"
      # write "self.$def(#{js_id_for_string(method_name)},function(self,_,"
    end
    
    # js_id_for_string(method_name)
    
    # go through arglist val names
    definition[:arglist][:arg].each do |a|
      write ","
      write a[:value]
      add_to_nametable a[:value]
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
  
  
  # Generate a method call
  def generate_call(call, context)
    # puts call
    # capture objj style calls
    return generate_label_styled_call(call, context) if label_styled_call? call
    
    # Capture require calls...
    if call[:meth] == 'require' and not call[:recv]
      require_path = @project.require_path_for_file(@source, call[:call_args][:args][0][:value][0][:value])
      # puts "found require path: #{call[:call_args][:args][0][:value]}"
      write "#{require_path}\n"
      return
    end
    
    write "return " if context[:last_stmt] and context[:full_stmt]
    
    
    
    # if constant name, then just call a raw method...
    if (call[:meth].match(/^[A-Z]/))
      write call[:meth]
      write "("
    else
      # detect a block.....
      if call[:brace_block] || call[:call_args][:block_arg]
        write "rb_funcall_block("
      else
        # normal
        write "rb_funcall("
      end
      
      # Receiver.
      if call[:recv]
        # puts "....#{call[:recv]}"
        generate_stmt call[:recv], :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :top_level => context[:top_level]
      else
        write current_self
      end
      
      write ",'#{call[:meth]}"
      
      if call[:call_args] and call[:call_args][:args] and call[:call_args][:args].length == 1
        write ":" unless call[:meth].match(/[\<\>\=\+\-\*\/\[\]\!\~\^\?]/)
      end
      
      write "'"
    end
    
    # normal call args
    unless call[:call_args].nil? or call[:call_args][:args].nil?
      call[:call_args][:args].each do |arg|
        write ","
        generate_stmt arg, :instance => context[:instance], :full_stmt => false
      end
    end
    
    # assocs
    if call[:call_args] and call[:call_args][:assocs]
      write ","
      # puts call[:call_args][:assocs]
      write "rb_hash_new("
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
    
    # symbol block: &:upcase etc.
    # If symbol passed.... used symbol as block, and call to_proc on it
    if call[:call_args][:block_arg]
      write ",rb_funcall("
      generate_stmt call[:call_args][:block_arg][:arg], :instance => context[:singleton], :full_stmt => false, :last_stmt => false, :top_level => context[:top_level]
      write ",'to_proc')"  
    end
    
    write ")"
    write ";\n" if context[:full_stmt]
    
    # write call[:brace_block]
  end
  
  
  def generate_identifier identifier, context
    # puts identifier
    
    write 'return ' if context[:last_stmt] and context[:full_stmt]
    
    if nametable_include? identifier[:name]
      write identifier[:name]
    else
      # method call
      # write "#{current_self}.$('#{identifier[:name]}', [])"
      write "rb_funcall(#{current_self},'#{identifier[:name]}')"
    end
    write ";\n" if context[:full_stmt]
  end
  
  
  def generate_label_styled_call call, context
     write "return " if context[:last_stmt] and context[:full_stmt]
     
     write "rb_funcall("
     
     if call[:recv]
       generate_stmt call[:recv], :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :top_level => context[:top_level], :call_recv => true
     else
       write "self"
     end
     
     method_name = call[:meth].vn_selectorize(true)
     
     call[:call_args][:assocs].each do |a|
       method_name << a[:key].gsub(/:/, '').vn_selectorize(true)
     end
     
     write",'#{method_name}',"
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
  
  
  # Class definition
  def generate_class(klass, context)
    write "(function(self) {\n"
    # nametable stuff
    push_nametable
    current_self_push 'self'
    
    # Statements
    if klass.bodystmt
      klass.bodystmt.each do |stmt|
        generate_stmt stmt, :instance => false,
                            :full_stmt => true,
                            :last_stmt => (klass.bodystmt.last == stmt ? true : false),
                            :top_level => false
      end
    end
    
    write "})("
    if context[:top_level]
      write "rb_define_class('"
      write klass.klass_name
      write "',"
    else
       # nested
        # write "RClass.define_under(self,'#{klass.klass_name}',"
        write "#{js_replacement_function_name('rb_define_class_under')}(self,"
        write "rb_define_class_under(#{current_self},'"
        write klass.klass_name
        write "',"
    end
    
    # superclass..
    if klass.super_klass
      generate_stmt klass.super_klass[:expr], :instance => false, :full_stmt => false, :self => current_self, :last_stmt => false
      write ")"
    else
      write "rb_cObject)"
    end
    
    write ");\n"
  end
  
  
  
  
  def generate_module mod, context
    
    write "(function(self) {\n"
    
    push_nametable
    current_self_push "self"
    
    # Statements
    if mod.bodystmt
      mod.bodystmt.each do |stmt|
        # puts stmt
        # puts stmt.node
        generate_stmt stmt, :instance => false,
                            :full_stmt => true,
                            :last_stmt => (mod.bodystmt.last == stmt ? true : false),
                            :nested => true
      end
      
    end
    
    pop_nametable
    current_self_pop
    
    write "})("
    # write "RModule.define('#{mod.klass_name}')"
    write "rb_define_module('"
    # write "#{mod.klass_name}"
    write mod.klass_name
    write "')"
    write ");\n"
  end
  
  
  def generate_ivar(stmt, context)
    write 'return ' if context[:last_stmt] and context[:full_stmt]
    write "rb_ivar_get(#{current_self},'#{stmt[:name].gsub(/@/, '').vn_selectorize(false)}')"
    write ";\n" if context[:full_stmt]
  end
  
  def generate_symbol sym, context
    write 'return ' if context[:last_stmt] and context[:full_stmt]
    write "ID2SYM('#{sym[:name]}')"
    write ";\n" if context[:full_stmt]
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
      # write "#{context[:self]}.$i_s(#{js_id_for_ivar(stmt[:lhs][:name])},"
      write "rb_ivar_set(#{current_self},'#{stmt[:lhs][:name].gsub(/@/, '').vn_selectorize}',"
      generate_stmt stmt[:rhs], :instance => context[:instance], context[:full_stmt] => false, context[:last_stmt] => true, :self => context[:self]
      write ')'
    
    
    # Class var
    elsif stmt[:lhs].node == :cvar
      write "#{context[:self]}.$k_s('#{stmt[:lhs][:name]}',"
      generate_stmt stmt[:rhs], :instance => context[:instance], context[:full_stmt] => false, context[:last_stmt] => true, :self => context[:self]
      write ')'
    
    
    # IF LHS is a CONSTANT
    elsif stmt[:lhs].node == :constant
      write "rb_const_set("
      if context[:top_level]
        # puts stmt[:lhs][:name]
        write 'rb_top_self'
      elsif context[:instance]
        write "self.isa"
      else
        write "self"
      end
           
      write ",'#{stmt[:lhs][:name]}',"
      generate_stmt stmt[:rhs], :instance => context[:instance], context[:full_stmt] => false, :last_stmt => context[:last_stmt], :top_level => context[:top_level]
      write ')'
      
    # elsif LHS is a call (as the equals sign onto call method, and use rhs as param)
    elsif stmt[:lhs].node == :call
      write "#{js_replacement_function_name('rb_funcall')}("
      generate_stmt stmt[:lhs][:recv], :instance => context[:instance], context[:full_stmt] => false, :last_stmt => context[:last_stmt], :self => context[:self]
      # write ",#{js_id_for_string("#{stmt[:lhs][:meth]}="}),"
      write ","
      meth = stmt[:lhs][:meth]
      
      write "'set#{meth[0..0].upcase + meth[1..meth.length - 1]}:'"
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
  
  
  def generate_assoc_list list, context
    
    # write "/* #{context[:instance]} */"
    write 'return ' if context[:last_stmt] and context[:full_stmt]
    write "rb_hash_new("
    
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
  
  def generate_constant const, context
    write 'return ' if context[:last_stmt] and context[:full_stmt]
    
    constant_scope = context[:scope_constant] ? 'rb_const_get' : 'rb_const_get_full'
    if context[:top_level]
      # nothing else to look around, so normal check..
      # write "cObject.$c_g(#{const[:name]})"
      write "rb_const_get(rb_top_self, #{const[:name]})"
    elsif context[:instance]
      write "#{constant_scope}(#{current_self}.isa,'#{const[:name]}')"
      # write "self.$klass.#{constant_scope}(#{const[:name]})"
    else
      write "#{constant_scope}(#{current_self},'#{const[:name]}')"
      # write "self.#{constant_scope}(#{const[:name]})"
    end
    
    write ";\n" if context[:full_stmt]
  end
  
  
  def generate_orop stmt, context
    write 'return ' if context[:last_stmt] and context[:full_stmt]
    
    write "ORTEST(function(){"
    generate_stmt stmt[:lhs], :instance => context[:instance], :full_stmt => true, :last_stmt => true, :self => context[:self]
    write "},function(){"
    generate_stmt stmt[:rhs], :instance => context[:instance], :full_stmt => true, :last_stmt => true, :self => context[:self]
    write "})"
    
    write ";\n" if context[:full_stmt]
  end
  
  def generate_andop stmt, context
    write 'return ' if context[:last_stmt] and context[:full_stmt]
    
    write "ANDTEST(function(){"
    generate_stmt stmt[:lhs], :instance => context[:instance], :full_stmt => true, :last_stmt => true, :self => context[:self]
    write "},function(){"
    generate_stmt stmt[:rhs], :instance => context[:instance], :full_stmt => true, :last_stmt => true, :self => context[:self]
    write "})"
    
    write ";\n" if context[:full_stmt]
  end
  
end