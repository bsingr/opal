# 
# ruby_builder.rb
# cappruby
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

module CappRuby
  
  class RubyBuilder < ::Vienna::RubyParser
    
    def initialize(source, project, build_name)
      super
    end
    
    class CappIseq
      
      attr_reader :arg_names
      
      def initialize(type)
        # iseq type
        @type = type
        # names => minimixed names (i.e. letters)
        @local_names = { }
        # same, for args
        @arg_names = { }
        @arg_names_ordered = []
        # has a value, other than nil, of the str used to set the block param
        # e.g. def method(&adam)' end ... this will be "adam", incase we 
        # reference it. The block always points to _$, whether we name it or not
        @block_name = nil
        # current to use for minimized. 'a' is always self, so we start there
        # and increment one time for every new local in context.
        @local_current = 'a'
        # Also, if type is a method, then we need room for a selector aswell:
        if type == RubyBuilder::ISEQ_TYPE_METHOD
          @local_current = @local_current.next
        end
        
        
        # to store code strings
        @code = []
      end
      
      def type
        @type
      end
      
      def local_current
        @local_current
      end
      
      def local_current=(s)
        @local_current = s
      end
      
      def write(str)
        @code << str
      end
      
      # When we set this, if we are a blcok, then we need to set our 
      # @local current to that of the parent, and then, when we finish, set the
      # parents to be what ours finishes at. This avoids clashing local var 
      # names.
      # 
      # Doing it this way avoids us including these vars, declared in the block
      # as vars in the method. they are vas just for the block.
      def parent_iseq=(other)
        @parent_iseq = other
        
        if @type == RubyBuilder::ISEQ_TYPE_BLOCK
          @local_current = other.local_current
        end
      end
      
      # finalizes, as described above
      def finalize
        if @type == RubyBuilder::ISEQ_TYPE_BLOCK
          @parent_iseq.local_current =  @local_current
        end
      end
      
      # looks u; the local name "str". This checks method arguments as well as
      # local variables defined. If we have the local, then the string version
      # of the minimized name is returned (e.g. _a, _b..... etc), or if we do
      # not have it, then nil is returned.
      # 
      # Also of note, this also checks if the str is the name of the block that
      # was declared (if a method). A block &block is not an arg or a local, but
      # can be referecenced if declared as a method "argument". These are stored
      # as the local var _$, if present.
      def lookup_local(str)
        if @local_names.has_key? str
          @local_names[str]
        elsif @arg_names.has_key? str
          @arg_names[str]
        elsif @block_name == str
          "_$"
        else
          if @type == RubyBuilder::ISEQ_TYPE_BLOCK
            return @parent_iseq.lookup_local(str)
          end
          # if we are a block, check parent...
          nil
        end
      end
      
      # push arg name, and returns the "minimized version"
      def push_arg_name(str)
        @local_current = @local_current.next
        @arg_names[str] = "_#{@local_current}"
        @arg_names_ordered.push str
        "_#{@local_current}"
      end
      
      # push local name, and returns the "minimized version"
      def push_local_name(str)
        @local_current = @local_current.next
        @local_names[str] = "_#{@local_current}"
        "_#{@local_current}"
      end
      
      # set the block name, if present
      def push_block_name(str)
        @block_name = str
        "_$"
      end
      
      def to_s
        r = ""
        # function should accept self. if a method type, then accept "sel" for
        # selector, if block, dont add self, just args. top and class also 
        # accept just "self" - self is always _a
        # puts @code
        case @type
        when RubyBuilder::ISEQ_TYPE_TOP
          # _a is self (top self)
          r << "function(_a"
        when RubyBuilder::ISEQ_TYPE_METHOD
          # _a is self, _b is the selector
          # pp @arg_names
          r << "function(_a,_b"
          @arg_names_ordered.each do |a|
            r << ",#{@arg_names[a]}"
          end
          # @arg_names.each_value { |v| r << ",#{v}" }
        when RubyBuilder::ISEQ_TYPE_CLASS
          # _a is self (the class just created/modified)
          r << "function(_a"
        when RubyBuilder::ISEQ_TYPE_BLOCK
          # no self, just args etc..
          r << "function("
          @arg_names_ordered.each do |a|
            r << "," unless @arg_names_ordered.first == a
            r << "#{@arg_names[a]}"
          end
        else
          abort "erm, unknwon iseq type"
        end
        
        r << "){"
        # locals
        if @local_names.length > 0
          r << "var #{@local_names.each_value.to_a.join(", ")};"
        end
        
        # block
        if @block_name
          r << "var _$ = cappruby_block; cappruby_block = nil;"
        end
        
        r << "#{@code.join("")}}"
        
        r
      end
      
    end
    
    def iseq_stack_push type
      @iseq_current = CappIseq.new type
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
    
    def generate_tree(tree)
      top_iseq = iseq_stack_push ISEQ_TYPE_TOP
      tree.each do |stmt|
        generate_stmt stmt, :full_stmt => true, :last_stmt => tree.last == stmt
      end
      iseq_stack_pop
    end
    
    def generate_class(cls, context)
      write "return " if context[:last_stmt] and context[:full_stmt]
      
      current_iseq = @iseq_current
      class_iseq = iseq_stack_push ISEQ_TYPE_CLASS
      class_iseq.parent_iseq = current_iseq
      
      # do each body stmt, but for now, assume nonoe
      cls.bodystmt.each do |b|
        generate_stmt b, :full_stmt => true, :last_stmt => b == cls.bodystmt.last
      end
      
      if cls.bodystmt.length == 0
        write "return nil;"
      end
      
      iseq_stack_pop
      # puts [:expr]
      write %{cr_defineclass(_a,}
      # superclass
      if cls.super_klass
        generate_stmt cls.super_klass[:expr], :full_stmt => false
      else
        write "nil"
      end
      write %{,"#{cls.klass_name}",#{class_iseq},0)}
      
      write ";" if context[:full_stmt]
    end
    
    def def_is_objj_def?(stmt)
      if stmt[:arglist].arg and stmt[:arglist].arg[1] and stmt[:arglist].arg[1].node == :label_arg
        return true
      end
      false
    end
    
    # def gen_objj_style_def(stmt, context)
      # p stmt
    # end
    
    def generate_def stmt, context
      

      write "return " if context[:last_stmt] and context[:full_stmt]
      
      #    work out if its an objj style method call..
      objj_style = def_is_objj_def?(stmt)
      
      # catch using a param  with init
      if stmt[:fname] == "init"
        if gen_def_should_use_colon?(stmt[:arglist])
          abort "init cannot take params: use initialize instead."
        end
      end
      
      is_singleton = stmt[:singleton] ? 1 : 0
      
      # should the method auto return?
      should_return = stmt[:fname] != "initialize"
      
      current_iseq = @iseq_current
      def_iseq = iseq_stack_push(ISEQ_TYPE_METHOD)
      def_iseq.parent_iseq = current_iseq
      
      # arg names
      if stmt[:arglist].arg
        stmt[:arglist].arg.each do |a| 
          @iseq_current.push_arg_name a[:value]
        
          # if objj_style
            # puts a[:value]
          # end
        end
      end
      
      # block name..
      if stmt[:arglist].block
        @iseq_current.push_block_name(stmt[:arglist].block)
      end
      
      # body stmts
      if should_return
        stmt[:bodystmt].each do |b|
          generate_stmt b, :full_stmt => true, :last_stmt => b == stmt[:bodystmt].last
        end
      else
        stmt[:bodystmt].each do |b|
          generate_stmt b, :full_stmt => true, :last_stmt => false
        end
        # we need to autoreturn "self"
        write "return _a;"
      end
      
      iseq_stack_pop
      
      # definemethod
      write "cr_definemethod("
      
      # base (singleton?)
      if stmt[:singleton]
        generate_stmt stmt[:singleton], :full_stmt => false, :last_stmt => false
      else
        # self
        write "_a"
      end
      
      # method returns true if our normal method should add a colon onto the
      # selector name (i.e. it takes either exactly 1 param, or it takes a 
      # single default param.. this might be the case, we just add a defailt
      # value to the selector:)
      # 
      # Also, always map initialize to "init" .. note, no semicolon EVER.
      if stmt[:fname] == "initialize"
        sel_name = "init"
      elsif stmt[:fname].match(/^([a-zA-Z_]*)\=$/)
        # name of form key= needs to go to setKey:
        sel_name = stmt[:fname].match(/^([a-zA-Z_]*)\=$/)[1]
        sel_name = "set#{sel_name[0..0].upcase}#{sel_name[1..-1]}:"
      else
        if objj_style
          sel_name = "#{stmt[:fname]}:"
          stmt[:arglist].arg.each do |arg|
            next if stmt[:arglist].arg.first == arg
            sel_name << arg[:name]
          end
        else
          if stmt[:fname].match(/(\<|\!|\?|\>|\=|\!|\[|\])/)
            sel_name = "#{stmt[:fname]}"
          else
            sel_colon = gen_def_should_use_colon?(stmt[:arglist]) ? ":" : ""
            sel_name = "#{stmt[:fname]}#{sel_colon}"
          end
        end
      end
      write %{,"#{sel_name}",#{def_iseq},#{is_singleton})}
      
      write ";" if context[:full_stmt]
    end
    
    # method returns true if our normal method should add a colon onto the
    # selector name (i.e. it takes either exactly 1 param, or it takes a 
    # single default param.. this might be the case, we just add a defailt
    # value to the selector:)
    def gen_def_should_use_colon?(a)
      
      # one normal arg, nothing else (block is irrelevant)
      if a.arg_size > 0 || a.opt_size > 0 || a.rest_size > 0 || a.post_size > 0
        true
      else
        false
      end
    end
    
    def call_is_objj_call?(call)
      if call[:call_args] and call[:call_args][:assocs]
        call[:call_args][:assocs].first.node == :label_assoc
      else
        false
      end
    end
    
    def generate_objj_call(call, context)
      write "return " if context[:last_stmt] and context[:full_stmt]
      
      write %{cr_send(}
      # receiver
      if call[:recv]
        call_bit = 0
        generate_stmt call[:recv], :full_stmt => false, :last_stmt => false
      else
        call_bit = 8
        # self as recv
        write "_a"
      end
      
      write ","
      # method id 
      method_id = "#{call[:meth]}:"
      call[:call_args][:assocs].each { |a| method_id << a[:key] }
            
      write %{"#{method_id}"}
      
      write ","
      
      # arguments
      write "["
      unless call[:call_args].nil? or call[:call_args][:args].nil?
        call[:call_args][:args].each do |arg|
          write "," unless call[:call_args][:args].last == arg
          generate_stmt arg, :full_stmt => false
        end
      end
      
      call[:call_args][:assocs].each do |a|
        write ","
        generate_stmt a[:value], :full_stmt => false, :last_stmt => false
      end
            
      write "]"
      write ","
      
      # block
      write "nil"
      write ","
      
      # op flag
      write "#{call_bit})"
      
      write ";" if context[:full_stmt]
    end
    
    def generate_true stmt, context
      write "return " if context[:full_stmt] and context[:last_stmt]
     
      write "true"
       write ";" if context[:full_stmt]
    end
    
    def generate_false stmt, context
      write "return " if context[:full_stmt] and context[:last_stmt]
      write "false"
      write ";" if context[:full_stmt]
    end
    
    
    def generate_call call, context
      # capture objj style calls
      return generate_objj_call(call, context) if call_is_objj_call?(call)

      # capture "function calls"
      if call[:meth].match(/^[A-Z](.*)$/)
        return generate_function_call call, context
      end
      # capture objj
      
      write "return " if context[:last_stmt] and context[:full_stmt]
      
      write %{cr_send(}
      # receiver
      if call[:recv]
        call_bit = 0
        generate_stmt call[:recv], :full_stmt => false, :last_stmt => false
      else
        call_bit = 8
        # self as recv
        write "_a"
      end
      
      write ","
      # method id - we should look for adding a selector here..
      sel_colon = gen_call_should_use_colon?(call) ? ":" : ""
      write %{"#{call[:meth]}#{sel_colon}"}
      
      write ","
      
      # arguments
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
        write "cr_newhash("
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
      else
        write "nil"
      end
      write ","
      
      # op flag
      write "#{call_bit})"
      
      write ";" if context[:full_stmt]
    end
    
    def generate_function_call call, context
      write "return " if context[:last_stmt] and context[:full_stmt]
      
      write "cr_functioncall(\""
      write call[:meth]
      write "\",["
      
      unless call[:call_args].nil? or call[:call_args][:args].nil?
        call[:call_args][:args].each do |arg|
          write "," unless call[:call_args][:args].first == arg
          generate_stmt arg, :full_stmt => false
        end
      end
      
      write "])"
      
      write ";" if context[:full_stmt]
    end
    
    def generate_identifier id, context
      write "return " if context[:last_stmt] and context[:full_stmt]
      
      local = @iseq_current.lookup_local id[:name]
      if local
        write local
      else
        # cannot find local, so we assume it is a function call...
        write %{cr_send(_a,"#{id[:name]}",[],nil,8)}
      end
      
      write ";" if context[:full_stmt]
    end
    
    # similar to def, but for calls (not objj style calls..)
    def gen_call_should_use_colon?(c)
      # basically, if a "special" method using ruby only things, then dont use
      # a colon
      return false if c[:meth].match(/(\<|\!|\?|\>|\=|\!|\[|\]|\|)/)
      
      args_len = 0
      if c[:call_args] and c[:call_args][:args]
        args_len = args_len + c[:call_args][:args].length
      end
      
      if c[:call_args] and c[:call_args][:assocs]
        args_len = args_len + 1
      end
      
      # essentially, true if only one arg..
      (args_len > 0) ? true : false
    end
    
    def generate_self stmt, context
      write "return " if context[:last_stmt] and context[:full_stmt]
      write "_a"
      write ";" if context[:full_stmt]
    end
    
    # Generate a yield stmt. This makes sure the current iseq is a method, as
    # only methods can "yield".. also, sets the current iseq to "get block". We
    # know the method uses a block, so we need to make sure we can get it, and
    # put it into a local var.
    def generate_yield stmt, context
      write "return " if context[:last_stmt] and context[:full_stmt]
      write "cr_yield(_$,["
      
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
      write "(_$ ? true :  false)"
      write ";" if context[:full_stmt]
    end
    
    def generate_string str, context
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
            write %{objj_msgSend(}
            generate_stmt s[:value][0], :full_stmt => false, :last_stmt => false
            write %{,"to_s")}
          end
        end
        write "].join('')"
      end
      write ";" if context[:full_stmt]
    end
    
    def generate_symbol sym, context
      write "return " if context[:last_stmt] and context[:full_stmt]
      write %{ID2SYM("#{sym[:name]}")}
      write ";" if context[:full_stmt]
    end
    
    def generate_constant cnst, context
      write "return " if context[:last_stmt] and context[:full_stmt]
      write %{cr_getconstant(_a,"#{cnst[:name]}")}
      write ";" if context[:full_stmt]
    end
    
    def generate_numeric num, context
      write "return " if context[:last_stmt] and context[:full_stmt]
      write num[:value]
      write ";" if context[:full_stmt]
    end
    
    def generate_array ary, context
      write "["
      if ary[:args]
        ary[:args].each do |a|
          write "," unless ary[:args].first == a
          generate_stmt a, :full_stmt => false, :last_stmt => false
        end
      end
      
      write "]"
    end
    
    def generate_xstring stmt, context
      write "return " if context[:last_stmt] and context[:full_stmt]
      write stmt[:value][0][:value]
      write ";" if context[:full_stmt]
    end
    
    def generate_assign stmt, context
      write "return " if context[:last_stmt] and context[:full_stmt]
      
      # LHS is an identifier (local)
      if stmt[:lhs].node == :identifier
        # check to see if it already exists, i.e. reusing old name
        local = @iseq_current.lookup_local stmt[:lhs][:name]
        unless local
          # cannot find local, so we must make it
          local = @iseq_current.push_local_name stmt[:lhs][:name]
        end
        
        write "#{local} = "
        # RHS
        generate_stmt stmt[:rhs], :full_stmt => false, :last_stmt => false
      
      # LHS is an ivar
      elsif stmt[:lhs].node == :ivar
        write "rb_ivar_set(_a,'#{stmt[:lhs][:name]}',"
        generate_stmt stmt[:rhs], :full_stmt => false, :last_stmt => false
        write ")"
      
      # LHS is an constant
      elsif stmt[:lhs].node == :constant
        write "rb_const_set(_a,'#{stmt[:lhs][:name]}',"
        generate_stmt stmt[:rhs], :full_stmt => false, :last_stmt => false
        write ")"
      
      # LHS is a method call 
      elsif stmt[:lhs].node == :call
        
        write %{cr_send(}
        # receiver
        generate_stmt stmt[:lhs][:recv],:full_stmt => false, :last_stmt => false

        write ","
        # method id 
        write "\"set#{stmt[:lhs][:meth][0..0].capitalize}#{stmt[:lhs][:meth][1..-1]}:\""

        write ","

        # arguments
        write "["
        # puts stmt
        generate_stmt stmt[:rhs], :full_stmt => false, :last_stmt => false
        
        write "]"
        write ","

        # block
        write "nil"
        write ","

        # op flag
        write "0)"
      
      else
        abort "unknown assign type: #{stmt[:lhs].node}"
      end
      
      write ";" if context[:full_stmt]
    end
    
    def generate_op_asgn(stmt, context)
      write "return " if context[:full_stmt] and context[:last_stmt]
      
      if stmt[:lhs].node == :ivar
        write %{(function(asgn)\{if(asgn!==nil && asgn!==undefined)\{}
        write %{return asgn;\}else\{return }
        write "rb_ivar_set(_a, '#{stmt[:lhs][:name]}',"
        generate_stmt stmt[:rhs], :full_stmt => false, :last_stmt => false
        write ");"
        write %{\}\})(rb_ivar_get(_a,"#{stmt[:lhs][:name]}"))}
      
      else
        abort "bad op_asgn lhs: #{stmt[:lhs].node}"
      end
      
      write ";" if context[:full_stmt]
    end
    
    def generate_super(stmt, context)
      write "return " if context[:full_stmt] and context[:last_stmt]
      
      if stmt[:call_args] and stmt[:call_args][:args]
        # super 10 or super(10) - custom args
        write %{cr_invokesuper(_a,_b}
        stmt[:call_args][:args].each do |arg|
          write ","
          generate_stmt arg, :full_stmt => false, :last_stmt => false
        end
        write ")"
      elsif stmt[:call_args]
        # super() - send NO args to super
        write %{cr_invokesuper(_a,_b)}
      else
        # super ... use args just given by current method
        write %{cr_invokesuper(_a,_b}
        @iseq_current.arg_names.each_value do |name|
          write ","
          write name
        end
        write ")"
      end
      
      write ";" if context[:full_stmt]
    end
    
    def generate__FILE__ stmt, context
      write "return " if context[:full_stmt] and context[:last_stmt]
      write %{"#{@build_name}"}
      write ";" if context[:full_stmt]
    end
    
    def generate_opt_plus stmt, context
      write "return " if context[:full_stmt] and context[:last_stmt]
      write %{cr_optplus(}
      generate_stmt stmt[:recv], :last_stmt => false, :full_stmt => false
      write ","
      generate_stmt stmt[:call_args][:args][0], :full_stmt => false
      write ")"
      write ";" if context[:full_stmt]
    end
    
    def generate_opt_minus stmt, context
      write "return " if context[:full_stmt] and context[:last_stmt]
      write %{cr_optminus(}
      generate_stmt stmt[:recv], :last_stmt => false, :full_stmt => false
      write ","
      generate_stmt stmt[:call_args][:args][0], :full_stmt => false
      write ")"
      write ";" if context[:full_stmt]
    end
    
    def generate_opt_mult stmt, context
      write "return " if context[:full_stmt] and context[:last_stmt]
      write %{cr_optmult(}
      generate_stmt stmt[:recv], :last_stmt => false, :full_stmt => false
      write ","
      generate_stmt stmt[:call_args][:args][0], :full_stmt => false
      write ")"
      write ";" if context[:full_stmt]
    end
    
    def generate_opt_div stmt, context
      write "return " if context[:full_stmt] and context[:last_stmt]
      write %{cr_optdiv(}
      generate_stmt stmt[:recv], :last_stmt => false, :full_stmt => false
      write ","
      generate_stmt stmt[:call_args][:args][0], :full_stmt => false
      write ")"
      write ";" if context[:full_stmt]
    end
    
    def generate_if stmt, context
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
    
    def generate_orop stmt, context
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
    
    def generate_andop stmt, context
      write "return " if context[:full_stmt] and context[:last_stmt]
      write "ANDTEST(function(){"
      generate_stmt stmt[:lhs], :full_stmt => true, :last_stmt => true
      write "},function(){"
      generate_stmt stmt[:rhs], :full_stmt => true, :last_stmt => true
      write "}"
      
      write ")"
      write ";" if context[:full_stmt]
    end
    
    def generate_not stmt, context
      write "return " if context[:full_stmt] and context[:last_stmt]
      write ";" if context[:full_stmt]
    end
    
    def generate_tertiary stmt, context
      write "return " if context[:full_stmt] and context[:last_stmt]
      write ";" if context[:full_stmt]
    end
    
    # break stmt. we MUST be in a loop, so throw error to escape into calling
    # context. if not in ISEQ_TYPE_BLOCK, then throw error (syntax error), or,
    # we could infact just let it propgate up through and let Javascript just
    # push out our error. break can be called with args.
    def generate_break stmt, context
      write "vm_break("
      
      write ");"
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
    
    def generate_ivar stmt, context
      write "return " if context[:full_stmt] and context[:last_stmt]
      write "rb_ivar_get(_a, '#{stmt[:name]}')"
      write ";" if context[:full_stmt]
    end
    
    def generate_module cls, context
      write "return " if context[:last_stmt] and context[:full_stmt]
      
      current_iseq = @iseq_current
      class_iseq = iseq_stack_push ISEQ_TYPE_CLASS
      class_iseq.parent_iseq = current_iseq
      
      # do each body stmt, but for now, assume nonoe
      cls.bodystmt.each do |b|
        generate_stmt b, :full_stmt => true, :last_stmt => b == cls.bodystmt.last
      end
      
      if cls.bodystmt.length == 0
        write "return nil;"
      end
      
      iseq_stack_pop
      # puts [:expr]
      write %{cr_defineclass(_a,}
      # superclass - always nil for module
      # if cls.super_klass
        # generate_stmt cls.super_klass[:expr], :full_stmt => false
      # else
        write "nil"
      # end
      write %{,"#{cls.klass_name}",#{class_iseq},2)}
      
      write ";" if context[:full_stmt]
    end
    
    def generate_nil stmt, context
      write "return " if context[:full_stmt] and context[:last_stmt]
      write "nil"
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
            write "cr_send("
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
    
    def generate_colon2 stmt, context
      write "return " if context[:full_stmt] and context[:last_stmt]
      write "cr_getconstant("
      generate_stmt stmt[:lhs], :full_stmt => false, :last_stmt => false
      write ",\""
      write stmt[:rhs]
      write "\")"
      write ";" if context[:full_stmt]
    end
    
  end
end
