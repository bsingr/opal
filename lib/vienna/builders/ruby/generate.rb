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

require File.join(File.dirname(__FILE__), 'ruby_parser.rb')

module Vienna
  
  class RubyParser < ::Racc::Parser
    
    # class ISEQ
    #   
    #   # some iseqs can have a dynamic frame pointer that point to a parent iseq.
    #   # for example, blocks can reference locals from their parent, so this will
    #   # let us get to them. Might be nil if this tyope cannot reference parent,
    #   # i.e. is not a block.
    #   # 
    #   # Depreceated
    #   # attr_accessor :dynamic_frame_pointer
    #   
    #   # store a list of locals
    #   # Array, where index is the local position (reference 0, or 1 etc) and
    #   # the value
    #   attr_reader :locals
    #   # stores the args for iseq
    #   attr_reader :args
    #   # for dynamics
    #   attr_accessor :parent_iseq
    #   
    #   attr_reader :type
    #   
    #   attr_writer :args_list
    #   
    #   def initialize(type, filename, name)
    #     @type = type
    #     @filename = filename
    #     @name = name
    #     @opcodes = []
    #     @locals = []
    #     @args = []
    #     @label_count = 0
    #     @jumps = []
    #   end
    #   
    #   # gets the next jump label string
    #   def create_jump_label
    #     r = @label_count
    #     @label_count += 1
    #     @jumps[r] = 0
    #     r
    #   end
    #   
    #   # total required arg length for iseq
    #   def args_length
    #     @args.length
    #   end
    #   
    #   # total required locals length
    #   def locals_length
    #     @locals.length
    #   end
    #   
    #   # push the given string as an opcode onto the opcodes
    #   def write(opcode)
    #     @opcodes << opcode
    #   end
    #   
    #   # write a abel to this line. this opcode will be marked by the given label
    #   # so that any jumps to this label will change the pc to point to this op
    #   # code
    #   def write_label(label)
    #     @jumps[label] = @opcodes.length
    #   end
    #   
    #   # to_s: ready for spitting out to javascript.
    #   def to_s
    #     s = "["
    #     s << %{#{@args.length},}
    #     s << %{#{@locals.length},}
    #     s << %{"#{@name}",}
    #     s << %{"#{@filename}",}
    #     s << %{#{@type},}
    #     # local names
    #     s << "["
    #     s << @locals.map { |l| %{"#{l}"} }.join(",")
    #     s << "],"
    #     # argslist
    #     s << (@args_list ? %{#{@args_list.to_s},} : %{0,})
    #     # catch table
    #     s << %{[],}
    #     # jumps
    #     s << "["
    #     # s << @jumps.to_a.map { |e| %{"#{e[0]}":#{e[1]}} }.join(",")
    #     s << @jumps.map { |e| "#{e}" }.join(",")
    #     s << "],"
    #     # opcodes
    #     s << %{[#{@opcodes.join(",")}]}
    #     s << %{]}
    #     s
    #   end
    #   
    #   # returns the idx of a local arg or local var. returns nil if one does not
    #   # exist. Blocks cannot have locals, so return nil always if a block
    #   def local_variable(name)
    #     if [ISEQ_TYPE_TOP, ISEQ_TYPE_METHOD, ISEQ_TYPE_CLASS].include? @type and @locals.include?(name)
    #       @locals.index(name)
    #     else
    #       nil
    #     end
    #   end
    #   
    #   # returns an array if a dynamic var of name exists. If a block, then this
    #   # will be the case. Blocks do not reference locals, they use dynamics. The
    #   # array has the idx as the first param, and the level as the second param.
    #   # A level of 0 is the current frame, 1 is the parent of the current frame
    #   # etc.
    #   def dynamic_variable(name)
    #     if @type == ISEQ_TYPE_BLOCK and @locals.include?(name)
    #       [@locals.index(name), 0]
    #     else
    #       search_dynamic(name, 0)
    #     end
    #   end
    #   
    #   # boolean: has a local (can include dynamic...)
    #   def has_local?(name)
    #     @locals.include?(name) || @args.include?(name)
    #   end
    #   
    #   # returns idx of new local
    #   def push_local(name)
    #     r = @locals.length
    #     @locals << (name)
    #     r
    #   end
    #   
    #   # returns [idx, fp]
    #   # fp = 0 for local, > 1 for dynamic
    #   def local_index(name)
    #     if @args.include?(name)
    #       return [@args.index(name), 0]
    #     elsif @locals.include?(name)
    #       return [@locals.index(name), 0]
    #     else
    #       raise "not implemeneted.. look up dynamic"
    #     end
    #   end
    #   
    #   def search_dynamic(name, level)
    #     if @locals.include?(name)
    #       # if we have it, return array - [idx, level]
    #       [@locals.index(name), level]
    #     elsif @parent_iseq
    #       # if we have a parent, try there and increment level
    #       @parent_iseq.search_dynamic(name, level.succ)
    #     else
    #       # no parent, so it isnt in chain. return nil
    #       nil
    #     end
    #   end
    # end
    # 
    # # Set debug mode for generator. Debug mode on makes the opcode output nicer
    # # to read using full opcode names, rather that integers, and also using full
    # # label jump names, instead of abbreviated strings.
    # @debug_mode = true
    # 
    # def self.debug_mode?
    #   @debug_mode
    # end
    # 
    # def debug_mode?
    #   self.class.debug_mode?
    # end
    # 
    # if @debug_mode
    #   
    #   # ISEQ types
    #   ISEQ_TYPE_TOP           = 'ISEQ_TYPE_TOP'
    #   ISEQ_TYPE_METHOD        = 'ISEQ_TYPE_METHOD'
    #   ISEQ_TYPE_BLOCK         = 'ISEQ_TYPE_BLOCK'
    #   ISEQ_TYPE_CLASS         = 'ISEQ_TYPE_CLASS'
    #   ISEQ_TYPE_RESCUE        = 'ISEQ_TYPE_RESCUE'
    #   ISEQ_TYPE_ENSURE        = 'ISEQ_TYPE_ENSURE'
    #   ISEQ_TYPE_EVAL          = 'ISEQ_TYPE_EVAL'
    #   ISEQ_TYPE_MAIN          = 'ISEQ_TYPE_MAIN'
    # 
    #   # DEFINECLASS types
    #   DEFINECLASS_CLASS       = 'DEFINECLASS_CLASS'
    #   DEFINECLASS_OTHER       = 'DEFINECLASS_OTHER'
    #   DEFINECLASS_MODULE      = 'DEFINECLASS_MODULE'
    #   
    #   # for debugging..
    #   INOP                    = 'iNOOP'
    #   IGETLOCAL               = 'iGETLOCAL'
    #   ISETLOCAL               = 'iSETLOCAL'
    #   IGETSPECIAL             = 3
    #   ISETSPECIAL             = 4          
    #   IGETDYNAMIC             = 'iGETDYNAMIC'
    #   ISETDYNAMIC             = 6              
    #   IGETINSTANCEVARIABLE    = 'iGETINSTANCEVARIABLE'
    #   ISETINSTANCEVARIABLE    = 'iSETINSTANCEVARIABLE'             
    #   IGETCLASSVARIABLE       = 9
    #   ISETCLASSVARIABLE       = 10            
    #   IGETCONSTANT            = 'iGETCONSTANT'
    #   ISETCONSTANT            = 'iSETCONSTANT'             
    #   IGETGLOBAL              = 13
    #   ISETGLOBAL              = 14             
    #   IPUTNIL                 = 'iPUTNIL'
    #   IPUTSELF                = 'iPUTSELF'             
    #   IPUTOBJECT              = 'iPUTOBJECT'
    #   IPUTSTRING              = 'iPUTSTRING'             
    #   ICONCATSTRINGS          = 19
    #   ITOSTRING               = 20             
    #   ITOREGEXP               = 21
    #   INEWARRAY               = 'iNEWARRAY'             
    #   IDUPARRAY               = 23
    #   IEXPANDARRAY            = 24             
    #   ICONCATARRAY            = 25
    #   ISPLATARRAY             = 26             
    #   ICHECKINCLUDEARRAY      = 27
    #   INEWHASH                = 'iNEWHASH'             
    #   INEWRANGE               = 29
    #   IPOP                    = 'iPOP'             
    #   IDUP                    = 'iDUP'
    #   IDUPN                   = 32             
    #   ISWAP                   = 33
    #   IREPUT                  = 34             
    #   ITOPN                   = 35
    #   ISETN                   = 36             
    #   IADJUSTSTACK            = 37
    #   IDEFINEMETHOD           = 'iDEFINEMETHOD'             
    #   IALIAS                  = 39
    #   IUNDEF                  = 40             
    #   IDEFINED                = 41
    #   IPOSTEXE                = 42             
    #   ITRACE                  = 43
    #   IDEFINECLASS            = 'iDEFINECLASS'             
    #   ISEND                   = 'iSEND'
    #   IINVOKESUPER            = 'iINVOKESUPER'             
    #   IINVOKEBLOCK            = 'iINVOKEBLOCK'
    #   ILEAVE                  = 'iLEAVE'             
    #   IFINISH                 = 49
    #   ITHROW                  = 50             
    #   IJUMP                   = 'iJUMP'
    #   IBRANCHIF               = 'iBRANCHIF'             
    #   IBRANCHUNLESS           = 'iBRANCHUNLESS'
    #   IGETINLINECACHE         = 54             
    #   IONCEINLINECACHE        = 55
    #   ISETINLINECACHE         = 56             
    #   IOPT_CASE_DISPATCH      = 57
    #   IOPT_CHECKENV           = 58             
    #   IOPT_PLUS               = 'iOPT_PLUS'
    #   IOPT_MINUS              = 60             
    #   IOPT_MULT               = 61
    #   IOPT_DIV                = 62             
    #   IOPT_MOD                = 63
    #   IOPT_EQ                 = 64             
    #   IOPT_NEQ                = 65
    #   IOPT_LT                 = 66             
    #   IOPT_LE                 = 67
    #   IOPT_GT                 = 68             
    #   IOPT_GE                 = 69
    #   IOPT_LTLT               = 70             
    #   IOPT_AREF               = 71
    #   IOPT_ASET               = 72             
    #   IOPT_LENGTH             = 73
    #   IOPT_SUCC               = 74             
    #   IOPT_NOT                = 75
    #   IOPT_REGEXPMATCH1       = 76             
    #   IOPT_REGEXPMATCH2       = 77
    #   IOPT_CALL_C_FUNCTION    = 78             
    #   IBITBLT                 = 79
    #   IANSWER                 = 80
    #   # JARV additions to YARV
    #   IPUTSYMBOL              = 'iPUTSYMBOL'
    # 
    # else # normal mode
      
      # ISEQ types
      ISEQ_TYPE_TOP    = 1
      ISEQ_TYPE_METHOD = 2
      ISEQ_TYPE_BLOCK  = 3
      ISEQ_TYPE_CLASS  = 4
      ISEQ_TYPE_RESCUE = 5
      ISEQ_TYPE_ENSURE = 6
      ISEQ_TYPE_EVAL   = 7
      ISEQ_TYPE_MAIN   = 8
    
    #   # DEFINECLASS types
    #   DEFINECLASS_CLASS = 0
    #   DEFINECLASS_OTHER = 1
    #   DEFINECLASS_MODULE = 2
    # 
    #   # opcodes => opcode id
    #   INOP                    = 0
    #   IGETLOCAL               = 1
    #   ISETLOCAL               = 2
    #   IGETSPECIAL             = 3
    #   ISETSPECIAL             = 4          
    #   IGETDYNAMIC             = 5
    #   ISETDYNAMIC             = 6              
    #   IGETINSTANCEVARIABLE    = 7
    #   ISETINSTANCEVARIABLE    = 8,             
    #   IGETCLASSVARIABLE       = 9
    #   ISETCLASSVARIABLE       = 10            
    #   IGETCONSTANT            = 11
    #   ISETCONSTANT            = 12             
    #   IGETGLOBAL              = 13
    #   ISETGLOBAL              = 14             
    #   IPUTNIL                 = 15
    #   IPUTSELF                = 16             
    #   IPUTOBJECT              = 17
    #   IPUTSTRING              = 18             
    #   ICONCATSTRINGS          = 19
    #   ITOSTRING               = 20             
    #   ITOREGEXP               = 21
    #   INEWARRAY               = 22             
    #   IDUPARRAY               = 23
    #   IEXPANDARRAY            = 24             
    #   ICONCATARRAY            = 25
    #   ISPLATARRAY             = 26             
    #   ICHECKINCLUDEARRAY      = 27
    #   INEWHASH                = 28             
    #   INEWRANGE               = 29
    #   IPOP                    = 30             
    #   IDUP                    = 31
    #   IDUPN                   = 32             
    #   ISWAP                   = 33
    #   IREPUT                  = 34             
    #   ITOPN                   = 35
    #   ISETN                   = 36             
    #   IADJUSTSTACK            = 37
    #   IDEFINEMETHOD           = 38             
    #   IALIAS                  = 39
    #   IUNDEF                  = 40             
    #   IDEFINED                = 'iDEFINED'
    #   IPOSTEXE                = 42             
    #   ITRACE                  = 43
    #   IDEFINECLASS            = 44             
    #   ISEND                   = 45
    #   IINVOKESUPER            = 46             
    #   IINVOKEBLOCK            = 47
    #   ILEAVE                  = 48             
    #   IFINISH                 = 49
    #   ITHROW                  = 50             
    #   IJUMP                   = 51
    #   IBRANCHIF               = 52             
    #   IBRANCHUNLESS           = 53
    #   IGETINLINECACHE         = 54             
    #   IONCEINLINECACHE        = 55
    #   ISETINLINECACHE         = 56             
    #   IOPT_CASE_DISPATCH      = 57
    #   IOPT_CHECKENV           = 58             
    #   IOPT_PLUS               = 59
    #   IOPT_MINUS              = 60             
    #   IOPT_MULT               = 61
    #   IOPT_DIV                = 62             
    #   IOPT_MOD                = 63
    #   IOPT_EQ                 = 64             
    #   IOPT_NEQ                = 65
    #   IOPT_LT                 = 66             
    #   IOPT_LE                 = 67
    #   IOPT_GT                 = 68             
    #   IOPT_GE                 = 69
    #   IOPT_LTLT               = 70             
    #   IOPT_AREF               = 71
    #   IOPT_ASET               = 72             
    #   IOPT_LENGTH             = 73
    #   IOPT_SUCC               = 74             
    #   IOPT_NOT                = 75
    #   IOPT_REGEXPMATCH1       = 76             
    #   IOPT_REGEXPMATCH2       = 77
    #   IOPT_CALL_C_FUNCTION    = 78             
    #   IBITBLT                 = 79
    #   IANSWER                 = 80
    #   # JARV additions to YARV
    #   IPUTSYMBOL              = 81
    # end
    # 
    # 
    # 
    # # iseq is a ruby array containing iseq structure
    # def iseq_stack_push(type,name="<compiled>")
    #   @iseq_current = ISEQ.new(type, @build_name, name)
    #   @iseq_stack << @iseq_current
    #   @iseq_current
    # end
    # 
    # # returns full string representation of iseq
    # def iseq_stack_pop
    #   iseq = @iseq_stack.last
    #   @iseq_stack.pop
    #   @iseq_current = @iseq_stack.last
    #   iseq.to_s
    # end
    # 
    # # write the opcode to the current iseq
    # def write(str)
    #   @iseq_current.write(str)
    # end
    # 
    # # write label
    # def write_label(label)
    #   @iseq_current.write_label(label)      
    # end
    # 
    # def generate_tree tree
    #   
    #   top_iseq = iseq_stack_push(ISEQ_TYPE_TOP)
    #   tree.each do |stmt|
    #     # until we have line numbers, between each stmt fake at line number '0'
    #     write "0"
    #     generate_stmt stmt, :full_stmt => true, :last_stmt => tree.last == stmt
    #   end
    #   iseq_stack_pop
    # end
    
    # Generate any type of statement with the given options
    # 
    def generate_stmt stmt, context
      return if stmt.is_a?(Array)
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
      when :break
        generate_break stmt, context
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
      when :dot3
        generate_dot3 stmt, context
      when :__FILE__
        generate__FILE__ stmt, context
      when :opt_plus
        generate_opt_plus stmt, context
      when :opt_minus
        generate_opt_minus stmt, context
      when :opt_mult
        generate_opt_mult stmt, context
      when :opt_div
        generate_opt_div stmt, context
      when :opt_mod
        generate_opt_mod stmt, context
      when :block_given
        generate_block_given stmt, context
      when :regexp
        generate_regexp stmt, context
      when :alias
        generate_alias stmt, context
      when :begin
        generate_begin stmt, context
      when :aset_op_asgn
        generate_aset_op_asgn stmt, context
      when :gvar
        generate_gvar stmt, context
      else
        write "\n[Unknown type for generate_stmt: #{stmt.inspect}]\n"
      end
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
        elsif @type == RubyParser::ISEQ_TYPE_BLOCK
          @parent_iseq.lookup_local(name)
        else
          nil
        end
      end
      
      def parent_iseq=(other)
        @parent_iseq = other

        if @type == RubyParser::ISEQ_TYPE_BLOCK
          @local_current = other.local_current
        end
      end
      
      def parent_iseq
        @parent_iseq
      end

      def finalize
        if @type == RubyParser::ISEQ_TYPE_BLOCK
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
        
        # Case 1: no args at all (block is dealt with seperately) - def a()
        if norm == 0 && opt == 0 && post == 0 && rest.nil?
          r << "){var $ = this;"
          
        # Case 2: just splat args - def a(*args)
        elsif norm == 0 && opt == 0 && post == 0 && rest
          r << "#{@args[@rest_arg_name]}"
          r << "){var $ = this;"
          r << %{#{@args[@rest_arg_name]}=vnA(Array.prototype.slice.call(arguments));}
        
        # Case: one norm arg, rest splat args - def a(name, *args)
        elsif norm == 1 && opt == 0 && post == 0 && rest
          r << "#{@args[@norm_arg_names.first]}"
          r << ",#{@args[@rest_arg_name]}"
          r << "){var $ = this;"
          r << "#{@args[@norm_arg_names.first]}=arguments[0];"
          r << %{#{@args[@rest_arg_name]}=vnA(Array.prototype.slice.call(arguments,1));}
          
        # Case 3: just normal args (any number) - def a(l,m,n,o,p)
        elsif norm > 0 && opt == 0 && post == 0 && rest.nil?
          @norm_arg_names.each do |a|
            r << "," unless a == @norm_arg_names.first
            r << "#{@args[a]}"
          end
          r << "){var $ = this;"
        end
      end
      
      def to_s
        r = ""
        
        case @type
        when RubyParser::ISEQ_TYPE_TOP
          r << "(function(){var $ = this;"
          # locals
          if @locals.length > 0
            r << "var #{@locals.each_value.to_a.join(",")};"
          end
          r << @code.join("")
          r << "})"
        when RubyParser::ISEQ_TYPE_CLASS
          r << "function(){var $ = this;"
          
          # locals
          if @locals.length > 0
            r << "var #{@locals.each_value.to_a.join(",")};"
          end
          # code
          r << @code.join("")
          
          r << "}"
          
        when RubyParser::ISEQ_TYPE_METHOD
          
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
          
        when RubyParser::ISEQ_TYPE_BLOCK
          r << %{vnP(function(}
          @norm_arg_names.each do |a|
            r << "," unless @norm_arg_names.first == a
            r << "#{@args[a]}"
          end
          r << %{)\{}
          # locals
          if @locals.length > 0
            r << "var #{@locals.each_value.to_a.join(",")};"
          end
          # WTF? this should take "var $=$$;" but we get errors...huh!?!?
          # r << "if($$!=nil){var$=$$;}"
          # this seems to be the easiest way to do it, but its hela ugly 
          # r << "with({$:($$==nil?$:$$),_:(__==nil?_:__)}){"
          r << @code.join("")
          # r << "}"
          r << "})"
        end
        r
      end
      
    end
    
    def write(str)
      @iseq_current.write str
    end
    
    
    # convert ruby style id to js property id - everything is prepended a '$'
    def mid_to_jsid(mid)
      "$#{mid}".
      gsub(/\!/, "$b").
      gsub(/\=/, "$e").
      gsub(/\?/, "$q").
      gsub(/\+/, "$p").
      gsub(/\-/, "$m").
      gsub(/\|/, '$r').
      gsub(/\&/, "$a")
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
      
      write "#{SELF}.define_class("
      # superclass
      if cls.super_klass
        generate_stmt cls.super_klass[:expr], :full_stmt => false
      else
        write "#{NIL}"
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
      
      write "#{SELF}.define_class(#{NIL},'#{cls.klass_name}',#{class_iseq},2)"
      
      # write "vm$e($,"
      # superclass - always nil for module
      # write "nil"
      # write %{,"#{cls.klass_name}",#{class_iseq},2)}
      
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
      
      
      # base.. singleton or self
      if stmt[:singleton]
        generate_stmt stmt[:singleton], :full_stmt => false, :last_stmt => false
        write ".dm("
      else
        write "#{SELF}.dm("
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
        # write %{vm$a($,"#{stmt[:name]}",[],nil,8)}
        write "#{SELF}.#{mid_to_jsid(stmt[:name])}()"
      end
      
      write ";" if context[:full_stmt]
    end
    
    def generate_call(call, context)
      used_param = false
      write "return " if context[:full_stmt] and context[:last_stmt]
      # write "vm$a("
      # receiver
      if call[:recv]
        call_bit = 0
        generate_stmt call[:recv], :full_stmt => false, :last_stmt => false
      else
        call_bit = 8
        # self as recv
        write "#{SELF}"
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
            used_param = true
            write "," unless call[:call_args][:args].first == arg
            generate_stmt arg, :full_stmt => false
          end
        end

        # assocs
        if call[:call_args] and call[:call_args][:assocs]
        used_param = true
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
      write "," if used_param
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
        write %{#{SELF}.S("")}
      elsif str[:value].length == 1
        write %{#{SELF}.S("#{str[:value][0][:value].gsub(/\"/, '\"')}")}
      else
        write "#{SELF}.S(["
        str[:value].each do |s|
          write "," unless str[:value].first == s
          if s.node == :string_content
            write %{"#{s[:value].gsub(/\"/, '\"')}"}
          else
            # write %{vm$a(}
            generate_stmt s[:value][0], :full_stmt => false
            # write %{,"to_s",[],nil,8)}
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
      write "#{SELF}.const_get('#{cnst[:name]}')"
      # write %{vm$b($,"#{cnst[:name]}")}
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
    
    # how we replace "self/this"
    SELF = "$"
    # how we replace nil
    NIL = "#{SELF}.n"
    
    def generate_self(stmt, context)
      write "return " if context[:last_stmt] and context[:full_stmt]
      write "#{SELF}"
      write ";" if context[:full_stmt]
    end
    
    def generate_symbol(sym, context)
      write "return " if context[:last_stmt] and context[:full_stmt]
      write %{vnY("#{sym[:name]}")}
      write ";" if context[:full_stmt]
    end
    
    def generate_numeric(num, context)
      write "return " if context[:last_stmt] and context[:full_stmt]
      write "vnN(#{num[:value]})"
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
      write "vnA("
      if ary[:args]
        ary[:args].each do |a|
          write "," unless ary[:args].first == a
          generate_stmt a, :full_stmt => false, :last_stmt => false
        end
      end
      write ")"
      write ";" if context[:full_stmt]
    end
    
    def generate_opt_plus(stmt, context)
      write "return " if context[:last_stmt] and context[:full_stmt]
      # write %{vm_optplus(}
      generate_stmt stmt[:recv], :last_stmt => false, :full_stmt => false
      write ".#{mid_to_jsid('+')}("
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
      write NIL
      write ";" if context[:full_stmt]
    end
    
    def generate_true(stmt, context)
      write "return " if context[:last_stmt] and context[:full_stmt]
      write "#{SELF}.t"
      write ";" if context[:full_stmt]
    end
    
    def generate_false(stmt, context)
      write "return " if context[:last_stmt] and context[:full_stmt]
      write "vnFalse"
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
        write "if("
      else # must be unless
        write "if(!"
      end

      generate_stmt stmt[:expr], :full_stmt => false, :last_stmt => false
      write ".rtest()){"
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

      write"}).apply(this)"
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
      generate_stmt stmt[:lhs], :full_stmt => false, :last_stmt => true
      write ".ortest("
      write "(function(){"
      generate_stmt stmt[:rhs], :full_stmt => true, :last_stmt => true
      write "})"

      write ")"
      write ";" if context[:full_stmt]
    end
    
    def generate_andop(stmt, context)
      write "return " if context[:full_stmt] and context[:last_stmt]
      generate_stmt stmt[:lhs], :full_stmt => false, :last_stmt => true
      write ".a("
      write "(function(){"
      generate_stmt stmt[:rhs], :full_stmt => true, :last_stmt => true
      write "})"

      write ")"
      write ";" if context[:full_stmt]
    end
    
    def generate_assoc_list stmt, context
      write "return " if context[:full_stmt] and context[:last_stmt]
      write "vnH("
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
  end
end
