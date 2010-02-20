# 
# ruby_builder.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2010 Adam Beynon.
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
  
  module CherryKit
    
    class RubyBuilder < ::Vienna::RubyParser
      
      def initialize(source, project, build_name)
        super
      end
      
      class Iseq
        
        attr_accessor :type, :local_current
        
        def initialize(type)
          @type = type
          # names => minimized names
          @locals = { } 
          # arg name => minimized arg names
          @args = { }
          # arg types/names - these are all ordered
          @norm_arg_names = []
          @opt_arg_names = []
          @rest_arg_names = []
          @post_arg_names = []
          @block_arg_name = nil
          
          @local_current = "a"
          
          @code = []
        end
        
        # push "normal" arg name
        def push_arg_name(name)
          id = @local_current
          @local_current = @local_current.next
          @args[name] = "_#{id}"
          @norm_arg_names.push name
          "_#{id}"
        end
        
        # push optional arg name, with the node for its default value
        def push_opt_arg_name(name, stmt)
          
        end
        
        # push rest arg name
        def push_rest_arg_name(name)
          
        end
        
        # post (notmal args at end) names
        def push_post_arg_name(name)
          
        end
        
        # block.. not actually added to function
        def push_block_arg_name(name)
          @block_arg_name = name
        end
        
        def push_local_name(name)
          id = @local_current
          @local_current = @local_current.next
          @locals[name] = "_#{id}"
          "_#{id}"
        end
        
        def lookup_local(name)
          return nil if name == nil
          if @locals.has_key?(name)
            @locals[name]
          elsif @args.has_key?(name)
            @args[name]
          elsif @block_arg_name == name
            "_"
          elsif @type == RubyBuilder::ISEQ_TYPE_BLOCK
            @parent_iseq.lookup_local(name)
          else
            nil
          end
        end
        
        def parent_iseq=(other)
          @parent_iseq = other

          if @type == RubyBuilder::ISEQ_TYPE_BLOCK
            @local_current = other.local_current
          end
        end

        def finalize
          if @type == RubyBuilder::ISEQ_TYPE_BLOCK
            @parent_iseq.local_current =  @local_current
          end
        end
        
        def write(str)
          @code << str
        end
        
        def to_s
          r = ""
          
          case @type
          when RubyBuilder::ISEQ_TYPE_TOP
            r << "function($){"
            # locals
            if @locals.length > 0
              r << "var #{@locals.each_value.to_a.join(",")};"
            end
            r << @code.join("")
            r << "}"
          when RubyBuilder::ISEQ_TYPE_CLASS
            r << "function($"
            
            r << "){"
            
            # locals
            if @locals.length > 0
              r << "var #{@locals.each_value.to_a.join(",")};"
            end
            # code
            r << @code.join("")
            
            r << "}"
            
          when RubyBuilder::ISEQ_TYPE_METHOD
            r << "function($"
            @norm_arg_names.each do |a|
              r << ",#{@args[a]}"
            end
            
            r << "){"
            
            # block arg name
            if @block_arg_name != nil
              r << "var _ = opal_block; opal_block = nil;"
            end
            
            # locals
            if @locals.length > 0
              r << "var #{@locals.each_value.to_a.join(",")};"
            end
            # code
            r << @code.join("")
            
            r << "}"
            
          when RubyBuilder::ISEQ_TYPE_BLOCK
            r << %{function($$}
            @norm_arg_names.each do |a|
              r << ",#{@args[a]}"
            end
            r << %{)\{}
            # WTF? this should take "var $=$$;" but we get errors...huh!?!?
            # r << "if($$!=nil){var$=$$;}"
            # this seems to be the easiest way to do it, but its hela ugly 
            r << "with($$==nil ? {} : {$:$$}){"
            r << @code.join("")
            r << "}"
            r << "}"
          end
          r
        end
        
      end
      
      
      def generate_tree(tree)
        top_iseq = iseq_stack_push(ISEQ_TYPE_TOP)
        tree.each do |stmt|
          generate_stmt stmt, :full_stmt => true, :last_stmt => false
        end
        iseq_stack_pop
      end
      
      def iseq_stack_push type
        @iseq_current = Iseq.new type
        @iseq_stack << @iseq_current
        @iseq_current
      end

      def iseq_stack_pop
        iseq = @iseq_stack.last
        @iseq_stack.pop
        @iseq_current = @iseq_stack.last
        # finalize (var locals etc)
        iseq.finalize
        iseq.to_s
      end
      
      def generate_class(cls, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        
        current_iseq = @iseq_current
        class_iseq = iseq_stack_push(ISEQ_TYPE_CLASS)
        class_iseq.parent_iseq = current_iseq
        
        # do each bodystmt
        cls.bodystmt.each do |b|
          generate_stmt b, :full_stmt => true, :last_stmt => b == cls.bodystmt.last
        end
        
        write "return nil;" if cls.bodystmt.length == 0
        
        iseq_stack_pop
        
        write "vm_defineclass($,"
        # superclass
        if cls.super_klass
          generate_stmt cls.super_klass[:expr], :full_stmt => false
        else
          write "nil"
        end
        write %{,"#{cls.klass_name}",#{class_iseq},0)}
        
        write ";" if context[:full_stmt]
      end
      
      def generate_module(cls, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        
        current_iseq = @iseq_current
        class_iseq = iseq_stack_push(ISEQ_TYPE_CLASS)
        class_iseq.parent_iseq = current_iseq
        
        # do each bodystmt
        cls.bodystmt.each do |b|
          generate_stmt b, :full_stmt => true, :last_stmt => b == cls.bodystmt.last
        end
        
        write "return nil;" if cls.bodystmt.length == 0
        
        iseq_stack_pop
        
        write "vm_defineclass($,"
        # superclass - always nil for module
        write "nil"
        write %{,"#{cls.klass_name}",#{class_iseq},2)}
        
        write ";" if context[:full_stmt]
      end
      
      def generate_def(stmt, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        
        is_singleton = stmt[:singleton] ? 1 : 0
        
        current_iseq = @iseq_current
        def_iseq = iseq_stack_push(ISEQ_TYPE_METHOD)
        def_iseq.parent_iseq = current_iseq
        
        # normal args
        if stmt[:arglist].arg
          stmt[:arglist].arg.each do |arg|
            @iseq_current.push_arg_name arg[:value]
          end
        end
        
        # block name..
        if stmt[:arglist].block
          @iseq_current.push_block_arg_name(stmt[:arglist].block)
        end
        
        
        # body statements
        stmt[:bodystmt].each do |s|
          generate_stmt s, :full_stmt => true, :last_stmt => stmt[:bodystmt].last == s
        end
        
        iseq_stack_pop
        
        # define method
        write "vm_definemethod("
        
        # base.. singleton or self
        if stmt[:singleton]
          generate_stmt stmt[:singleton], :full_stmt => false, :last_stmt => false
        else
          # self
          write "$"
        end
        
        write %{,"#{stmt[:fname]}",#{def_iseq},#{is_singleton},#{stmt[:arglist].arg_size})}
        write ";" if context[:full_stmt]
      end
      
      def generate_identifier(stmt, context)
        write "return " if context[:full_stmt] and context[:last_stmt]
        local = @iseq_current.lookup_local(stmt[:name])
        if local
          write local
        else
          write %{vm_send($,"#{stmt[:name]}",[],nil,8)}
        end
        
        write ";" if context[:full_stmt]
      end
      
      def generate_call(call, context)
        
        write "return " if context[:full_stmt] and context[:last_stmt]
        write "vm_send("
        # receiver
        if call[:recv]
          call_bit = 0
          generate_stmt call[:recv], :full_stmt => false, :last_stmt => false
        else
          call_bit = 8
          # self as recv
          write "$"
        end
        
        # method id
        write %{,"#{call[:meth]}",}
        
        # normal args
        write "["
        unless call[:call_args].nil? or call[:call_args][:args].nil?
          call[:call_args][:args].each do |arg|
            write "," unless call[:call_args][:args].first == arg
            generate_stmt arg, :full_stmt => false
          end
        end

        # assocs
        if call[:call_args] and call[:call_args][:assocs]
        write "," unless call[:call_args].nil? or call[:call_args][:args].nil?
        write "vm_newhash("
        call[:call_args][:assocs].each do |assoc|
         write "," unless call[:call_args][:assocs].first == assoc
         generate_stmt assoc[:key], :full_stmt => false, :last_stmt => false
         write ","
         generate_stmt assoc[:value], :full_stmt => false, :last_stmt => false
        end
        write ")"
        end
     
        write "]"
        write ","
        
        # block
      if call[:brace_block]
         current_iseq = @iseq_current
         block_iseq = iseq_stack_push(ISEQ_TYPE_BLOCK)
         block_iseq.parent_iseq = current_iseq

         # block arg names
         if call[:brace_block][:params]
           call[:brace_block][:params].each do |p|
             block_iseq.push_arg_name p[:value]
           end
         end

         # block stmts
         if call[:brace_block][:stmt]
           call[:brace_block][:stmt].each do |a|
             generate_stmt a, :full_stmt => true, :last_stmt => call[:brace_block][:stmt].last == a
           end
         end

         iseq_stack_pop

         write block_iseq.to_s
         # map(&:name)
       elsif call[:call_args][:block_arg]
         write "vm_send("
         generate_stmt call[:call_args][:block_arg][:arg], :full_stmt => false
         write %{,"to_proc",[],nil,0)}
       else
         write "nil"
       end
        write ","

        # op flag
        write "#{call_bit})"
        
        
        write ";" if context[:full_stmt]
      end
      
      def generate_string(str, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        
        if str[:value].length == 0
          write %{""}
        elsif str[:value].length == 1
          write %{"#{str[:value][0][:value]}"}
        else
          write "["
          str[:value].each do |s|
            write "," unless str[:value].first == s
            if s.node == :string_content
              write %{"#{s[:value].gsub(/\"/, '\"')}"}
            else
              write %{vm_send(}
              generate_stmt s[:value][0], :full_stmt => false
              write %{,"to_s",[],nil,8)}
            end
          end
          write "].join('')"
        end
        
        write ";" if context[:full_stmt]
      end
      
      def generate_constant(cnst, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write %{vm_getconstant($,"#{cnst[:name]}")}
        write ";" if context[:full_stmt]
      end
      
      def generate_assign(stmt, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        # LHS is a local identifier
        if stmt[:lhs].node == :identifier
          local = @iseq_current.lookup_local stmt[:lhs][:name]
          unless local
            local = @iseq_current.push_local_name(stmt[:lhs][:name])
          end
          write %{#{local}=}
          generate_stmt stmt[:rhs], :last_stmt => false, :full_stmt => false
        elsif stmt[:lhs].node == :ivar
          write %{vm_ivarset($,"#{stmt[:lhs][:name]}",}
          generate_stmt stmt[:rhs], :full_stmt => false, :last_stmt => false
          write %{)}
        elsif stmt[:lhs].node == :constant
          write %{vm_setconstant($,"#{stmt[:lhs][:name]}",}
          generate_stmt stmt[:rhs], :full_stmt => false, :last_stmt => false
          write %{)}
        else
          abort "bad lhs type"
        end
        write ";" if context[:full_stmt]
      end
      
      def generate_self(stmt, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write "$"
        write ";" if context[:full_stmt]
      end
      
      def generate_symbol(sym, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write %{ID2SYM("#{sym[:name]}")}
        write ";" if context[:full_stmt]
      end
      
      def generate_numeric(num, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write num[:value]
        write ";" if context[:full_stmt]
      end
      
      def generate_ivar stmt, context
        write "return " if context[:full_stmt] and context[:last_stmt]
        write "vm_ivarget($, '#{stmt[:name]}')"
        write ";" if context[:full_stmt]
      end
      
      def generate_yield stmt, context
        write "return " if context[:full_stmt] and context[:last_stmt]
        write "vm_yield(_,["

        if stmt[:call_args] and stmt[:call_args][:args]
          stmt[:call_args][:args].each do |a|
            write "," unless stmt[:call_args][:args].first == a
            generate_stmt a, :full_stmt => false, :last_stmt => false
          end
        end

        write "])"
        write ";" if context[:full_stmt]
      end
      
      def generate_block_given stmt, context
        write "return " if context[:last_stmt] and context[:full_stmt]
        write "((_ == nil) ? false : true)"
        write ";" if context[:full_stmt]
      end
      
      def generate_if_mod(stmt, context)
        write "return " if context[:full_stmt] and context[:last_stmt]
        write "(function(){"

        # if/unless mod
        if stmt.node == :if_mod
          write "if(RTEST("
        else
          write "if(!RTEST("
        end

        generate_stmt stmt[:expr], :full_stmt => false, :last_stmt => false
        write ")){"
        generate_stmt stmt[:stmt], :full_stmt => true, :last_stmt => false
        write "}})()"
        write ";" if context[:full_stmt]
      end
      
      def generate_array(ary, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write "["
        if ary[:args]
          ary[:args].each do |a|
            write "," unless ary[:args].first == a
            generate_stmt a, :full_stmt => false, :last_stmt => false
          end
        end
        write "]"
        write ";" if context[:full_stmt]
      end
      
      def generate_opt_plus(stmt, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write %{vm_optplus(}
        generate_stmt stmt[:recv], :last_stmt => false, :full_stmt => false
        write ","
        generate_stmt stmt[:call_args][:args][0], :full_stmt => false
        write ")"
        write ";" if context[:full_stmt]
      end
      
      def generate_opt_minus(stmt, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write %{vm_optminus(}
        generate_stmt stmt[:recv], :last_stmt => false, :full_stmt => false
        write ","
        generate_stmt stmt[:call_args][:args][0], :full_stmt => false
        write ")"
        write ";" if context[:full_stmt]
      end
      
      def generate_opt_mult(stmt, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write %{vm_optmult(}
        generate_stmt stmt[:recv], :last_stmt => false, :full_stmt => false
        write ","
        generate_stmt stmt[:call_args][:args][0], :full_stmt => false
        write ")"
        write ";" if context[:full_stmt]
      end
      
      def generate_opt_div(stmt, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write %{vm_optdiv(}
        generate_stmt stmt[:recv], :last_stmt => false, :full_stmt => false
        write ","
        generate_stmt stmt[:call_args][:args][0], :full_stmt => false
        write ")"
        write ";" if context[:full_stmt]
      end
      
      def generate_nil(stmt, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write "nil"
        write ";" if context[:full_stmt]
      end
      
      def generate_true(stmt, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write "true"
        write ";" if context[:full_stmt]
      end
      
      def generate_false(stmt, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write "false"
        write ";" if context[:full_stmt]
      end
      
      def generate_regexp(stmt, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write %{/#{stmt[:value][0][:value]}/}
        write ";" if context[:full_stmt]
      end
      
      def generate_dot2(stmt, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write "true"
        write ";" if context[:full_stmt]
      end
      
      def generate_dot3(stmt, context)
        
      end
            
    end # end class
  end
end
