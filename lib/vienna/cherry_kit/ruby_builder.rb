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
        
        attr_reader :block_arg_name
        
        def initialize(type)
          @type = type
          # names => minimized names
          @locals = { } 
          # arg name => minimized arg names
          @args = { }
          # arg types/names - these are all ordered
          @norm_arg_names = []
          @opt_arg_names = []
          @rest_arg_name = nil
          @post_arg_names = []
          @block_arg_name = nil
          
          @local_current = "a"
          
          @code = []
        end
        
        def method_id=(method_id)
          @method_id = method_id
        end
        
        def method_id
          if @method_id
            @method_id
          elsif @parent_iseq
            @parent_iseq.method_id
          else
            nil
          end
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
          id = @local_current
          @local_current = @local_current.next
          @args[name] = "_#{id}"
          @rest_arg_name = name
          "_#{id}"
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
        
        def parent_iseq
          @parent_iseq
        end

        def finalize
          if @type == RubyBuilder::ISEQ_TYPE_BLOCK
            @parent_iseq.local_current =  @local_current
          end
        end
        
        def write(str)
          @code << str
        end
        
        # r is array to append strings for outputting
        def deal_with_method_args(r)
          r << "function("
          
          norm = @norm_arg_names.length
          opt = @opt_arg_names.length
          post = @post_arg_names.length
          rest = @rest_arg_name
          
          # Case 1: no args at all (block is dealt with seperately)
          # def a()
          if norm == 0 && opt == 0 && post == 0 && rest.nil?
            r << "){"
            
          # Case 2: just splat args
          # def a(*args)
          elsif norm == 0 && opt == 0 && post == 0 && rest
            r << "#{@args[@rest_arg_name]}"
            r << "){"
            r << %{#{@args[@rest_arg_name]}=Array.prototype.slice.call(arguments,3);}
          
          # Case: one norm arg, rest splat args
          # def a(name, *args)
          elsif norm == 1 && opt == 0 && post == 0 && rest
            r << "#{@args[@norm_arg_names.first]}"
            r << ",#{@args[@rest_arg_name]}"
            r << "){"
            r << "#{@args[@norm_arg_names.first]}=arguments[3];"
            r << %{#{@args[@rest_arg_name]}=Array.prototype.slice.call(arguments,4);}
            
          # Case 3: just normal args (any number)
          # def a(l,m,n,o,p)
          elsif norm > 0 && opt == 0 && post == 0 && rest.nil?
            @norm_arg_names.each do |a|
              r << "," unless a == @norm_arg_names.first
              r << "#{@args[a]}"
            end
            r << "){"
          end
        end
        
        def to_s
          r = ""
          
          case @type
          when RubyBuilder::ISEQ_TYPE_TOP
            r << "(function(){"
            # locals
            if @locals.length > 0
              r << "var #{@locals.each_value.to_a.join(",")};"
            end
            r << @code.join("")
            r << "})"
          when RubyBuilder::ISEQ_TYPE_CLASS
            r << "function(){"
            
            # locals
            if @locals.length > 0
              r << "var #{@locals.each_value.to_a.join(",")};"
            end
            # code
            r << @code.join("")
            
            r << "}"
            
          when RubyBuilder::ISEQ_TYPE_METHOD
            
            deal_with_method_args(r)
            
            
            # block arg name
            if @block_arg_name != nil
              # r << "var _ = opal_block; opal_block = nil;"
            end
            
            # locals
            if @locals.length > 0
              r << "var #{@locals.each_value.to_a.join(",")};"
            end
            # code
            r << @code.join("")
            
            r << "}"
            
          when RubyBuilder::ISEQ_TYPE_BLOCK
            r << %{function($$,__,ID}
            @norm_arg_names.each do |a|
              r << ",#{@args[a]}"
            end
            r << %{)\{}
            # locals
            if @locals.length > 0
              r << "var #{@locals.each_value.to_a.join(",")};"
            end
            # WTF? this should take "var $=$$;" but we get errors...huh!?!?
            # r << "if($$!=nil){var$=$$;}"
            # this seems to be the easiest way to do it, but its hela ugly 
            r << "with({$:($$==nil?$:$$),_:(__==nil?_:__)}){"
            r << @code.join("")
            r << "}"
            r << "}"
          end
          r
        end
        
      end
      
      
      # convert ruby style id to js property id - everything is prepended a '$'
      def mid_to_jsid(mid)
        "$#{mid}".
        gsub(/\!/, "$b").
        gsub(/\=/, "$e").
        gsub(/\?/, "$q")
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
        cls.bodystmt[:compstmt].each do |b|
          generate_stmt b, :full_stmt => true, :last_stmt => b == cls.bodystmt[:compstmt].last
        end
        
        write "return nil;" if cls.bodystmt.length == 0
        
        iseq_stack_pop
        
        write "this.define_class("
        # superclass
        if cls.super_klass
          generate_stmt cls.super_klass[:expr], :full_stmt => false
        else
          write "vnNil"
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
        cls.bodystmt[:compstmt].each do |b|
          generate_stmt b, :full_stmt => true, :last_stmt => b == cls.bodystmt[:compstmt].last
        end
        
        write "return nil;" if cls.bodystmt.length == 0
        
        iseq_stack_pop
        
        write "vm$e($,"
        # superclass - always nil for module
        write "nil"
        write %{,"#{cls.klass_name}",#{class_iseq},2)}
        
        write ";" if context[:full_stmt]
      end
      
      def generate_class_shift(cls, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        
        current_iseq = @iseq_current
        class_iseq = iseq_stack_push(ISEQ_TYPE_CLASS)
        class_iseq.parent_iseq = current_iseq
        
        # each bodystmt
        cls[:bodystmt][:compstmt].each do |b|
          generate_stmt b, :full_stmt => true, :last_stmt => b == cls[:bodystmt][:compstmt].last
        end
        
        write "return nil" if cls[:bodystmt][:compstmt].length == 0
        
        iseq_stack_pop
        
        write %{vm$e(}
        generate_stmt cls[:expr], :full_stmt => false
        write ","
        # superclass
        write "nil"
        write %{,"",#{class_iseq},1)}
        
        write ";" if context[:full_stmt]
      end
      
      def generate_def(stmt, context)
        # if stmt[:bodystmt][:opt_rescue]
          # puts "a"
        # end
        # if stmt[:fname] == "execute"
          # pp stmt[:bodystmt]
        # end
        # if stmt[:bodystmt].vn_opt_rescue
          # puts stmt[:bodystmt].vn_opt_rescue
        # end
        # puts stmt
        write "return " if context[:last_stmt] and context[:full_stmt]
        
        is_singleton = stmt[:singleton] ? 'true' : 'false'
        
        current_iseq = @iseq_current
        def_iseq = iseq_stack_push(ISEQ_TYPE_METHOD)
        def_iseq.parent_iseq = current_iseq
        def_iseq.method_id = stmt[:fname]
        
        # normal args
        if stmt[:arglist].arg
          stmt[:arglist].arg.each do |arg|
            @iseq_current.push_arg_name arg[:value]
          end
        end
        
        # rest args
        if stmt[:arglist].rest
          @iseq_current.push_rest_arg_name stmt[:arglist].rest
        end
        
        # block name..
        if stmt[:arglist].block
          @iseq_current.push_block_arg_name(stmt[:arglist].block)
        end
        
        
        # body statements
        stmt[:bodystmt][:compstmt].each do |s|
          generate_stmt s, :full_stmt => true, :last_stmt => stmt[:bodystmt][:compstmt].last == s
        end
        
        iseq_stack_pop
        
        # define method
        write "this.add_method("
        
        # base.. singleton or self
        if stmt[:singleton]
          generate_stmt stmt[:singleton], :full_stmt => false, :last_stmt => false
        else
          # self
          # write "$"
        end
        
        write %{"#{stmt[:fname]}","#{mid_to_jsid(stmt[:fname])}",#{def_iseq},#{is_singleton})}
        write ";" if context[:full_stmt]
      end
      
      def generate_identifier(stmt, context)
        write "return " if context[:full_stmt] and context[:last_stmt]
        local = @iseq_current.lookup_local(stmt[:name])
        if local
          write local
        else
          write %{vm$a($,"#{stmt[:name]}",[],nil,8)}
        end
        
        write ";" if context[:full_stmt]
      end
      
      def generate_call(call, context)
        
        write "return " if context[:full_stmt] and context[:last_stmt]
        # write "vm$a("
        # receiver
        if call[:recv]
          call_bit = 0
          generate_stmt call[:recv], :full_stmt => false, :last_stmt => false
        else
          call_bit = 8
          # self as recv
          write "this"
        end
        
        # method id
        write %{.#{mid_to_jsid(call[:meth])}(}
        
        # normal args - need to check for splats
        is_splat = false
        unless call[:call_args].nil? or call[:call_args][:args].nil?
          call[:call_args][:args].each do |arg|
            is_splat = true if arg.node == :splat
          end
        end
        
        if is_splat
          write "(function(){"
          write "var a=[],b=nil;"
          call[:call_args][:args].each do |arg|
            # puts arg
            if arg.node == :splat
              write "b = "
              generate_stmt arg[:val], :full_stmt => false
              write ";"
              write "for(var i = 0; i < b.length; i++){"
              write "a.push(b[i]);"
              write "};"
            else
              write "a.push("
              generate_stmt arg, :full_stmt => false
              write ");"
            end
          end
          write "return a;})()"
        else
          # write "["
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
     
          # write "]"
        end
        # write ","
        
        # block
      if call[:brace_block]
        write ","
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
         write "("
        generate_stmt call[:call_args][:block_arg][:arg], :full_stmt => false
        write "===nil?nil:"
         write "vm$a("
         # puts call[:call_args][:block_arg][:arg]
         generate_stmt call[:call_args][:block_arg][:arg], :full_stmt => false
         write %{,"to_proc",[],nil,0))}
       else
         # write "nil"
       end
        # write ","

        # op flag
        # write "#{call_bit})"
        
        write ")"
        
        write ";" if context[:full_stmt]
      end
      
      def generate_string(str, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        
        if str[:value].length == 0
          write %{vnS("")}
        elsif str[:value].length == 1
          write %{vnS("#{str[:value][0][:value].gsub(/\"/, '\"')}")}
        else
          write "vnS(["
          str[:value].each do |s|
            write "," unless str[:value].first == s
            if s.node == :string_content
              write %{"#{s[:value].gsub(/\"/, '\"')}"}
            else
              write %{vm$a(}
              generate_stmt s[:value][0], :full_stmt => false
              write %{,"to_s",[],nil,8)}
            end
          end
          write "].join(''))"
        end
        
        write ";" if context[:full_stmt]
      end
      
      def generate_xstring(str, context)
        # write "return " if context[:last_stmt] and context[:full_stmt]
        
        if str[:value].length == 0
          write %{}
        elsif str[:value].length == 1
          write str[:value][0][:value]
        else
          str[:value].each do |s|
            if s.node == :string_content
              write s[:value]
            else
              generate_stmt s[:value][0], :full_stmt => false
            end
          end
        end
        
        # write ";" if context[:full_stmt]
      end
      
      def generate_constant(cnst, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write %{vm$b($,"#{cnst[:name]}")}
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
          write %{vm$c($,"#{stmt[:lhs][:name]}",}
          generate_stmt stmt[:rhs], :full_stmt => false, :last_stmt => false
          write %{)}
        elsif stmt[:lhs].node == :call
          # puts stmt
          write %{vm$a(}
          # recv
          generate_stmt stmt[:lhs][:recv], :full_stmt => false
          # id
          write %{,"#{stmt[:lhs][:meth]}=",[}
          # args
          if stmt[:lhs][:args] and stmt[:lhs][:args][:args]
            stmt[:lhs][:args][:args].each do |arg|
              generate_stmt arg, :full_stmt => false
              write ","
            end
          end
          generate_stmt stmt[:rhs], :full_stmt => false
          write "],nil,0)"
          
        else
          puts stmt
          abort "bad lhs type"
        end
        write ";" if context[:full_stmt]
      end
      
      def generate_self(stmt, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write "this"
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
        # write "vm_ivarget($, '#{stmt[:name]}')"
        write "$.iv_tbl['#{stmt[:name]}']"
        write ";" if context[:full_stmt]
      end
      
      def generate_gvar(stmt, context)
        write "return " if context[:full_stmt] and context[:last_stmt]
        write "rb_gvar_get('#{stmt[:name]}')"
        write ";" if context[:full_stmt]
      end
      
      def generate_yield stmt, context
        write "return " if context[:full_stmt] and context[:last_stmt]
        
        # if we dont have the block name already, define it simply as "_"
        # unless @iseq_current.block_arg_name
          # @iseq_current.push_block_arg_name("_")
        # end
        
        # for now, normal args or a single *splat
        if stmt[:call_args] and stmt[:call_args][:args][0].node == :splat
          write "vm_yield(_,[])"
        else          
          write "vm_yield(_,["

          if stmt[:call_args] and stmt[:call_args][:args]
            stmt[:call_args][:args].each do |a|
              write "," unless stmt[:call_args][:args].first == a
              generate_stmt a, :full_stmt => false, :last_stmt => false
            end
          end
          write "])"
        end
        
        write ";" if context[:full_stmt]
      end
      
      def generate_block_given stmt, context
        write "return " if context[:last_stmt] and context[:full_stmt]
        write "((_ == nil) ? false : true)"
        write ";" if context[:full_stmt]
      end
      
      def generate_if_mod(stmt, context)
        write "return "  if context[:full_stmt] and context[:last_stmt]

        # write "(function(){"

        # if/unless mod
        if stmt.node == :if_mod
          write "if(RTEST("
        else
          write "if(!RTEST("
        end

        generate_stmt stmt[:expr], :full_stmt => false, :last_stmt => false
        write ")){"
        generate_stmt stmt[:stmt], :full_stmt => true, :last_stmt => false
        write "}"
        # write "}})()"
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
        # puts stmt
        write "return " if context[:last_stmt] and context[:full_stmt]
        write "/"
        stmt[:value].each do |part|
          write part[:value]
        end
        write "/"
        # write %{/#{stmt[:value][0][:value]}/}
        write ";" if context[:full_stmt]
      end
      
      def generate_dot2(stmt, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write "vm_newrange("
        generate_stmt stmt[:start], :full_stmt => false
        write ","
        generate_stmt stmt[:ending], :full_stmt => false
        write ",true)"
        write ";" if context[:full_stmt]
      end
      
      def generate_dot3(stmt, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write "vm_newrange("
        generate_stmt stmt[:start], :full_stmt => false
        write ","
        generate_stmt stmt[:ending], :full_stmt => false
        write ",false)"
        write ";" if context[:full_stmt]        
      end
      
      def generate_alias(stmt, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write "vm_alias($,"
        generate_stmt stmt[:lhs], :full_stmt => false
        write ","
        generate_stmt stmt[:rhs], :full_stmt => false
        write ")"
        write ";" if context[:full_stmt]
      end
      
      def generate__FILE__ stmt, context
        write "return " if context[:last_stmt] and context[:full_stmt]
        write %{"#{@build_name}"}
        write ";" if context[:full_stmt]
      end
      
      # primay::CONST
      def generate_colon2 stmt, context
        write "return " if context[:last_stmt] and context[:full_stmt]
        write %{vm$b(}
        generate_stmt stmt[:lhs], :full_stmt => false
        write %{,"#{stmt[:rhs]}")}
        write ";" if context[:full_stmt]
      end

      def generate_colon3 stmt, context

      end
      
      def generate_if(stmt, context)
        write "return " if context[:full_stmt] and context[:last_stmt]
        write "(function(){"

        # if/unless clause
        if stmt.node == :if
          write "if(RTEST("
        else # must be unless
          write "if(!RTEST("
        end

        generate_stmt stmt[:expr], :full_stmt => false, :last_stmt => false
        write ")){"
        stmt[:stmt].each do |s|
          # alays return last stmt. we output inside a function context to capture
          # the return value so that this will not return from the function itself
          generate_stmt s, :full_stmt => true, :last_stmt => stmt[:stmt].last == s
        end
        write "}"

        # now onto the tail (elsif, else etc)
        if stmt[:tail]
          stmt[:tail].each do |t|
            if t.node == :elsif
              write "else if(RTEST("
              generate_stmt t[:expr], :full_stmt => false, :last_stmt => false
              write ")){"
              t[:stmt].each do |s|
                generate_stmt s, :full_stmt => true, :last_stmt => t[:stmt].last==s
              end
              write "}"
            else # else node
              write "else{"
              t[:stmt].each do |s|
                generate_stmt s, :full_stmt => true, :last_stmt => t[:stmt].last==s
              end
              write "}"
            end
          end
        end

        write"})()"
        write ";" if context[:full_stmt]
      end
      
      def generate_op_asgn(stmt, context)
        # puts stmt
        write "return " if context[:full_stmt] and context[:last_stmt]
        
        if stmt[:lhs].node == :ivar
          if stmt[:op] == "||"
            write "(function(){var a;"
            write "if(!RTEST(a = vm_ivarget($,'#{stmt[:lhs][:name]}'))){"
            write "return vm_ivarset($,'#{stmt[:lhs][:name]}',"
            generate_stmt stmt[:rhs], :full_stmt => false
            write ");}"
            write "return a;"
            write "})()"
          elsif stmt[:op] == "+"
            write "vm_ivarset($,'#{stmt[:lhs][:name]}',vm_optplus("
            write "vm_ivarget($,'#{stmt[:lhs][:name]}'),"
            generate_stmt stmt[:rhs], :full_stmt => false
            write "))"
          elsif stmt[:op] == "-"
            write "vm_ivarset($,'#{stmt[:lhs][:name]}',vm_optminus("
            write "vm_ivarget($,'#{stmt[:lhs][:name]}'),"
            generate_stmt stmt[:rhs], :full_stmt => false
            write "))"
          elsif stmt[:op] == "*"
            write "vm_ivarset($,'#{stmt[:lhs][:name]}',vm_optmult("
            write "vm_ivarget($,'#{stmt[:lhs][:name]}'),"
            generate_stmt stmt[:rhs], :full_stmt => false
            write "))"
          elsif stmt[:op] == "/"
            write "vm_ivarset($,'#{stmt[:lhs][:name]}',vm_optdiv("
            write "vm_ivarget($,'#{stmt[:lhs][:name]}'),"
            generate_stmt stmt[:rhs], :full_stmt => false
            write "))"
          else
            abort "bas op type for op_asgn"
          end
        else
          abort "bad LHS for op_asgn"
        end
        
        write ";" if context[:full_stmt]
      end
      
      # yuck!
      def generate_case stmt, context
        write "return " if context[:full_stmt] and context[:last_stmt]
        write "(function($c){"
        stmt[:body].each do |c|
          if c.node == :when
            # clauses
            if stmt[:body].first == c
              write "if"
            else
              write "else if"
            end
            write "("
            c[:args].each do |a|
              write " || " unless c[:args].first == a
              write "vm$a("
              generate_stmt a, :full_stmt => false, :last_stmt => false
              write ",'===',[$c],nil,0)"
            end
            write") {"
            c[:stmt].each do |s|
              generate_stmt s, :full_stmt => true, :last_stmt => c[:stmt].last ==s
            end
            write "}"
          else # it is an else, so anything else goes
            write "else {"
            c[:stmt].each do |s|
              generate_stmt s, :full_stmt => true, :last_stmt => c[:stmt].last ==s
            end
            write "}"
          end
        end
        write "})("
        # case switch stmt
        if stmt[:expr]
          generate_stmt stmt[:expr], :full_stmt => false, :last_stmt => false
        else
          write "true"
        end
        write ")"
        write ";" if context[:full_stmt]
      end
      
      def generate_orop(stmt, context)
        write "return " if context[:full_stmt] and context[:last_stmt]
        # we must wrap lhs and rhs in functions. we do not want to evaluate them
        # until we need to... javascript truthyness !== ruby truthyness
        write "ORTEST(function(){"
        generate_stmt stmt[:lhs], :full_stmt => true, :last_stmt => true
        write "},function(){"
        generate_stmt stmt[:rhs], :full_stmt => true, :last_stmt => true
        write "}"

        write ")"
        write ";" if context[:full_stmt]
      end
      
      def generate_andop(stmt, context)
        write "return " if context[:full_stmt] and context[:last_stmt]
        write "ANDTEST(function(){"
        generate_stmt stmt[:lhs], :full_stmt => true, :last_stmt => true
        write "},function(){"
        generate_stmt stmt[:rhs], :full_stmt => true, :last_stmt => true
        write "}"

        write ")"
        write ";" if context[:full_stmt]
      end
      
      def generate_assoc_list stmt, context
        write "return " if context[:full_stmt] and context[:last_stmt]
        write "rb_hash_new("
        stmt[:list].each do |assoc|
          write "," unless stmt[:list].first == assoc
          generate_stmt assoc[:key], :full_stmt => false, :last_stmt => false
          write ","
          generate_stmt assoc[:value], :full_stmt => false, :last_stmt => false
        end
        write ")"
        write ";" if context[:full_stmt]
      end
      
      def generate_begin(stmt, context)
        if stmt[:stmt][:opt_rescue]
          write "try{"
          stmt[:stmt][:compstmt].each do |s|
            generate_stmt s, :full_stmt => true, :last_stmt => false
          end
          puts stmt[:stmt][:opt_rescue]
          write "}"
          write "catch(e) {"
          if stmt[:stmt][:opt_rescue][:var]
            local = @iseq_current.lookup_local(stmt[:stmt][:opt_rescue][:var][:name])
            unless local
              local = @iseq_current.push_local_name(stmt[:stmt][:opt_rescue][:var][:name])
            end
            write "#{local} = e;"
            # write "console.log('catch');console.log(e.klass);"
            if stmt[:stmt][:opt_rescue][:stmt]
              stmt[:stmt][:opt_rescue][:stmt].each do |s|
                generate_stmt s, :full_stmt => true
              end
            end
          end
          write "}"
        else
          stmt[:stmt][:compstmt].each do |stmt|
            generate_stmt stmt, :full_stmt => true, :last_stmt => false
          end
        end
      end
      
      def generate_return(stmt, context)
        write "rb_return("
        # puts stmt
        if stmt[:call_args] and stmt[:call_args][:args]
          if stmt[:call_args][:args].length == 1
            generate_stmt stmt[:call_args][:args].first, :full_stmt => false
          else
            abort "generate_return multiple args not yet done"
          end
        else
          write "nil"
        end
        write ")"
        write ";" if context[:full_stmt]
      end
      
      def generate_lparen(stmt, context)
        write "return " if context[:last_stmt] and context[:full_stmt]
        write "("
        if stmt[:stmt] and stmt[:stmt][0]
          generate_stmt stmt[:stmt][0], :full_stmt => false
        else
          write "nil"
        end
        write ")"
        write ";" if context[:full_stmt]
      end
      
      def generate_aset_op_asgn(stmt, context)
        write "return " if context[:full_stmt] and context[:last_stmt]
        if stmt[:recv].node == :identifier
          abort "unsupported. currently"
        else
          abort "bad recv node for aset_op_asgn (#{stmt[:recv]})"
        end
        write ";" if context[:full_stmt]
      end
      
      def generate_not(stmt, context)
        write "return " if context[:full_stmt] and context[:last_stmt]
        write "vm$a("
        generate_stmt stmt[:expr], :full_stmt => false
        write ",'!',[],nil, 8)"
        write ";" if context[:full_stmt]
      end
      
      def generate_super(stmt, context)
        write "return " if context[:full_stmt] and context[:last_stmt]
        write %{rb_super($,id,arguments.callee}
        
        # args, depends on is super has parens etc, simple for now: parens
        if stmt[:call_args] and stmt[:call_args][:args]
          stmt[:call_args][:args].each do |arg|
            write ","
            generate_stmt arg, :full_stmt => false
          end
        end
        
        write ")"
        write ";" if context[:full_stmt]
      end
      
      def generate_break(stmt, context)
        write "rb_break("
        if stmt[:call_args] and stmt[:call_args][:args]
          stmt[:call_args][:args].each do |arg|
            write "," unless stmt[:call_args][:args].first == arg
            generate_stmt arg, :full_stmt => false
          end
        end
        write ");"
      end
      
      def generate_tertiary(stmt, context)
        write "return " if context[:full_stmt] and context[:last_stmt]
        write "RTEST("
        generate_stmt stmt[:expr], :full_stmt => false
        write ")? "
        generate_stmt stmt[:true], :full_stmt => false
        write " : "
        generate_stmt stmt[:false], :full_stmt => false
        write ";" if context[:full_stmt]
      end
            
    end # end class
  end
end
