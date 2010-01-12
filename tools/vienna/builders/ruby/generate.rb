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
    
    class ISEQ
      
      # some iseqs can have a dynamic frame pointer that point to a parent iseq.
      # for example, blocks can reference locals from their parent, so this will
      # let us get to them. Might be nil if this tyope cannot reference parent,
      # i.e. is not a block.
      # 
      # Depreceated
      # attr_accessor :dynamic_frame_pointer
      
      # store a list of locals
      # Array, where index is the local position (reference 0, or 1 etc) and
      # the value
      attr_reader :locals
      # stores the args for iseq
      attr_reader :args
      # for dynamics
      attr_accessor :parent_iseq
      
      attr_reader :type
      
      def initialize(type, filename, name)
        @type = type
        @filename = filename
        @name = name
        @opcodes = []
        @locals = []
        @args = []
        @label_count = 0
        @jumps = []
      end
      
      # gets the next jump label string
      def create_jump_label
        r = @label_count
        @label_count += 1
        @jumps[r] = 0
        r
      end
      
      # total required arg length for iseq
      def args_length
        @args.length
      end
      
      # total required locals length
      def locals_length
        @locals.length
      end
      
      # push the given string as an opcode onto the opcodes
      def write(opcode)
        @opcodes << opcode
      end
      
      # write a abel to this line. this opcode will be marked by the given label
      # so that any jumps to this label will change the pc to point to this op
      # code
      def write_label(label)
        @jumps[label] = @opcodes.length
      end
      
      # to_s: ready for spitting out to javascript.
      def to_s
        s = "["
        s << %{#{@args.length},}
        s << %{#{@locals.length},}
        s << %{"#{@name}",}
        s << %{"#{@filename}",}
        s << %{#{@type},}
        s << %{0,}
        # catch table
        s << %{[],}
        # jumps
        s << "["
        # s << @jumps.to_a.map { |e| %{"#{e[0]}":#{e[1]}} }.join(",")
        s << @jumps.map { |e| "#{e}" }.join(",")
        s << "],"
        # opcodes
        s << %{[#{@opcodes.join(",")}]}
        s << %{]}
        s
      end
      
      # returns the idx of a local arg or local var. returns nil if one does not
      # exist. Blocks cannot have locals, so return nil always if a block
      def local_variable(name)
        if [ISEQ_TYPE_TOP, ISEQ_TYPE_METHOD, ISEQ_TYPE_CLASS].include? @type and @locals.include?(name)
          @locals.index(name)
        else
          nil
        end
      end
      
      # returns an array if a dynamic var of name exists. If a block, then this
      # will be the case. Blocks do not reference locals, they use dynamics. The
      # array has the idx as the first param, and the level as the second param.
      # A level of 0 is the current frame, 1 is the parent of the current frame
      # etc.
      def dynamic_variable(name)
        if @type == ISEQ_TYPE_BLOCK and @locals.include?(name)
          [@locals.index(name), 0]
        else
          search_dynamic(name, 0)
        end
      end
      
      # boolean: has a local (can include dynamic...)
      def has_local?(name)
        @locals.include?(name) || @args.include?(name)
      end
      
      # returns idx of new local
      def push_local(name)
        r = @locals.length
        @locals << (name)
        r
      end
      
      # returns [idx, fp]
      # fp = 0 for local, > 1 for dynamic
      def local_index(name)
        if @args.include?(name)
          return [@args.index(name), 0]
        elsif @locals.include?(name)
          return [@locals.index(name), 0]
        else
          raise "not implemeneted.. look up dynamic"
        end
      end
      
      def search_dynamic(name, level)
        if @locals.include?(name)
          # if we have it, return array - [idx, level]
          [@locals.index(name), level]
        elsif @parent_iseq
          # if we have a parent, try there and increment level
          @parent_iseq.search_dynamic(name, level.succ)
        else
          # no parent, so it isnt in chain. return nil
          nil
        end
      end
    end
    
    # Set debug mode for generator. Debug mode on makes the opcode output nicer
    # to read using full opcode names, rather that integers, and also using full
    # label jump names, instead of abbreviated strings.
    @debug_mode = true
    
    def self.debug_mode?
      @debug_mode
    end
    
    def debug_mode?
      self.class.debug_mode?
    end
    
    if @debug_mode
      
      # ISEQ types
      ISEQ_TYPE_TOP           = 'ISEQ_TYPE_TOP'
      ISEQ_TYPE_METHOD        = 'ISEQ_TYPE_METHOD'
      ISEQ_TYPE_BLOCK         = 'ISEQ_TYPE_BLOCK'
      ISEQ_TYPE_CLASS         = 'ISEQ_TYPE_CLASS'
      ISEQ_TYPE_RESCUE        = 'ISEQ_TYPE_RESCUE'
      ISEQ_TYPE_ENSURE        = 'ISEQ_TYPE_ENSURE'
      ISEQ_TYPE_EVAL          = 'ISEQ_TYPE_EVAL'
      ISEQ_TYPE_MAIN          = 'ISEQ_TYPE_MAIN'
    
      # DEFINECLASS types
      DEFINECLASS_CLASS       = 'DEFINECLASS_CLASS'
      DEFINECLASS_OTHER       = 'DEFINECLASS_OTHER'
      DEFINECLASS_MODULE      = 'DEFINECLASS_MODULE'
      
      # for debugging..
      INOP                    = 'iNOOP'
      IGETLOCAL               = 'iGETLOCAL'
      ISETLOCAL               = 'iSETLOCAL'
      IGETSPECIAL             = 3
      ISETSPECIAL             = 4          
      IGETDYNAMIC             = 'iGETDYNAMIC'
      ISETDYNAMIC             = 6              
      IGETINSTANCEVARIABLE    = 'iGETINSTANCEVARIABLE'
      ISETINSTANCEVARIABLE    = 'iSETINSTANCEVARIABLE'             
      IGETCLASSVARIABLE       = 9
      ISETCLASSVARIABLE       = 10            
      IGETCONSTANT            = 'iGETCONSTANT'
      ISETCONSTANT            = 12             
      IGETGLOBAL              = 13
      ISETGLOBAL              = 14             
      IPUTNIL                 = 'iPUTNIL'
      IPUTSELF                = 'iPUTSELF'             
      IPUTOBJECT              = 'iPUTOBJECT'
      IPUTSTRING              = 'iPUTSTRING'             
      ICONCATSTRINGS          = 19
      ITOSTRING               = 20             
      ITOREGEXP               = 21
      INEWARRAY               = 'iNEWARRAY'             
      IDUPARRAY               = 23
      IEXPANDARRAY            = 24             
      ICONCATARRAY            = 25
      ISPLATARRAY             = 26             
      ICHECKINCLUDEARRAY      = 27
      INEWHASH                = 28             
      INEWRANGE               = 29
      IPOP                    = 'iPOP'             
      IDUP                    = 'iDUP'
      IDUPN                   = 32             
      ISWAP                   = 33
      IREPUT                  = 34             
      ITOPN                   = 35
      ISETN                   = 36             
      IADJUSTSTACK            = 37
      IDEFINEMETHOD           = 'iDEFINEMETHOD'             
      IALIAS                  = 39
      IUNDEF                  = 40             
      IDEFINED                = 41
      IPOSTEXE                = 42             
      ITRACE                  = 43
      IDEFINECLASS            = 'iDEFINECLASS'             
      ISEND                   = 'iSEND'
      IINVOKESUPER            = 46             
      IINVOKEBLOCK            = 47
      ILEAVE                  = 'iLEAVE'             
      IFINISH                 = 49
      ITHROW                  = 50             
      IJUMP                   = 'iJUMP'
      IBRANCHIF               = 'iBRANCHIF'             
      IBRANCHUNLESS           = 'iBRANCHUNLESS'
      IGETINLINECACHE         = 54             
      IONCEINLINECACHE        = 55
      ISETINLINECACHE         = 56             
      IOPT_CASE_DISPATCH      = 57
      IOPT_CHECKENV           = 58             
      IOPT_PLUS               = 'iOPT_PLUS'
      IOPT_MINUS              = 60             
      IOPT_MULT               = 61
      IOPT_DIV                = 62             
      IOPT_MOD                = 63
      IOPT_EQ                 = 64             
      IOPT_NEQ                = 65
      IOPT_LT                 = 66             
      IOPT_LE                 = 67
      IOPT_GT                 = 68             
      IOPT_GE                 = 69
      IOPT_LTLT               = 70             
      IOPT_AREF               = 71
      IOPT_ASET               = 72             
      IOPT_LENGTH             = 73
      IOPT_SUCC               = 74             
      IOPT_NOT                = 75
      IOPT_REGEXPMATCH1       = 76             
      IOPT_REGEXPMATCH2       = 77
      IOPT_CALL_C_FUNCTION    = 78             
      IBITBLT                 = 79
      IANSWER                 = 80
    
    
    else # normal mode
      
      # ISEQ types
      ISEQ_TYPE_TOP    = 1
      ISEQ_TYPE_METHOD = 2
      ISEQ_TYPE_BLOCK  = 3
      ISEQ_TYPE_CLASS  = 4
      ISEQ_TYPE_RESCUE = 5
      ISEQ_TYPE_ENSURE = 6
      ISEQ_TYPE_EVAL   = 7
      ISEQ_TYPE_MAIN   = 8
    
      # DEFINECLASS types
      DEFINECLASS_CLASS = 0
      DEFINECLASS_OTHER = 1
      DEFINECLASS_MODULE = 2
    
      # opcodes => opcode id
      INOP                    = 0
      IGETLOCAL               = 1
      ISETLOCAL               = 2
      IGETSPECIAL             = 3
      ISETSPECIAL             = 4          
      IGETDYNAMIC             = 5
      ISETDYNAMIC             = 6              
      IGETINSTANCEVARIABLE    = 7
      ISETINSTANCEVARIABLE    = 8,             
      IGETCLASSVARIABLE       = 9
      ISETCLASSVARIABLE       = 10            
      IGETCONSTANT            = 11
      ISETCONSTANT            = 12             
      IGETGLOBAL              = 13
      ISETGLOBAL              = 14             
      IPUTNIL                 = 15
      IPUTSELF                = 16             
      IPUTOBJECT              = 17
      IPUTSTRING              = 18             
      ICONCATSTRINGS          = 19
      ITOSTRING               = 20             
      ITOREGEXP               = 21
      INEWARRAY               = 22             
      IDUPARRAY               = 23
      IEXPANDARRAY            = 24             
      ICONCATARRAY            = 25
      ISPLATARRAY             = 26             
      ICHECKINCLUDEARRAY      = 27
      INEWHASH                = 28             
      INEWRANGE               = 29
      IPOP                    = 30             
      IDUP                    = 31
      IDUPN                   = 32             
      ISWAP                   = 33
      IREPUT                  = 34             
      ITOPN                   = 35
      ISETN                   = 36             
      IADJUSTSTACK            = 37
      IDEFINEMETHOD           = 38             
      IALIAS                  = 39
      IUNDEF                  = 40             
      IDEFINED                = 41
      IPOSTEXE                = 42             
      ITRACE                  = 43
      IDEFINECLASS            = 44             
      ISEND                   = 45
      IINVOKESUPER            = 46             
      IINVOKEBLOCK            = 47
      ILEAVE                  = 48             
      IFINISH                 = 49
      ITHROW                  = 50             
      IJUMP                   = 51
      IBRANCHIF               = 52             
      IBRANCHUNLESS           = 53
      IGETINLINECACHE         = 54             
      IONCEINLINECACHE        = 55
      ISETINLINECACHE         = 56             
      IOPT_CASE_DISPATCH      = 57
      IOPT_CHECKENV           = 58             
      IOPT_PLUS               = 59
      IOPT_MINUS              = 60             
      IOPT_MULT               = 61
      IOPT_DIV                = 62             
      IOPT_MOD                = 63
      IOPT_EQ                 = 64             
      IOPT_NEQ                = 65
      IOPT_LT                 = 66             
      IOPT_LE                 = 67
      IOPT_GT                 = 68             
      IOPT_GE                 = 69
      IOPT_LTLT               = 70             
      IOPT_AREF               = 71
      IOPT_ASET               = 72             
      IOPT_LENGTH             = 73
      IOPT_SUCC               = 74             
      IOPT_NOT                = 75
      IOPT_REGEXPMATCH1       = 76             
      IOPT_REGEXPMATCH2       = 77
      IOPT_CALL_C_FUNCTION    = 78             
      IBITBLT                 = 79
      IANSWER                 = 80
    end
    
    
    
    # iseq is a ruby array containing iseq structure
    def iseq_stack_push(type,name="<compiled>")
      @iseq_current = ISEQ.new(type, @build_name, name)
      @iseq_stack << @iseq_current
      @iseq_current
    end
    
    # returns full string representation of iseq
    def iseq_stack_pop
      iseq = @iseq_stack.last
      @iseq_stack.pop
      @iseq_current = @iseq_stack.last
      iseq.to_s
    end
    
    # write the opcode to the current iseq
    def write(str)
      @iseq_current.write(str)
    end
    
    # write label
    def write_label(label)
      @iseq_current.write_label(label)      
    end
    
    def generate_tree tree
      
      top_iseq = iseq_stack_push(ISEQ_TYPE_TOP)
      tree.each do |stmt|
        # until we have line numbers, between each stmt fake at line number '0'
        write "0"
        generate_stmt stmt, :full_stmt => true, :last_stmt => tree.last == stmt
      end
      iseq_stack_pop
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
      else
        write "\n[Unknown type for generate_stmt: #{stmt}]\n"
      end
    end
    
    def generate_opt_plus(stmt, context)
      # recv on stack
      generate_stmt stmt[:recv], :last_stmt => false, :full_stmt => false
      # arg0 on stack
      generate_stmt stmt[:call_args][:args][0], :last_stmt => false, 
                                                :full_stmt => false
      
      # op itself
      write %{[#{IOPT_PLUS}]}
    end
    
    def generate__FILE__ stmt, context
      write %{[#{IPUTOBJECT},"#{@build_name}"]}
    end
    
    
    
    def generate_class_shift stmt, context
      # singleton class body first
      current_iseq = @iseq_current
      class_iseq = iseq_stack_push(ISEQ_TYPE_CLASS,"singletonclass")
      # dynamics
      class_iseq.parent_iseq = current_iseq
      # generate singleton class' body stsmts
      stmt[:bodystmt].each do |b|
        generate_stmt b, :full_stmt => true, 
                         :last_stmt => stmt[:bodystmt].last == b
      end
      
      # no statements..
      if stmt[:bodystmt].length == 0
        write %{[#{IPUTNIL}]} 
        write %{[#{ILEAVE}]}
      end
      
      iseq_stack_pop
      
      # base - what are we doing a singleton on? self? etc..
      generate_stmt stmt[:expr], :full_stmt => false, :last_stmt => false
      
      # superclass: nil, fake param
      write %{[#{IPUTNIL}]}
      
      # actual defineclass
      write %{[#{IDEFINECLASS},"singletonclass",#{class_iseq},1]}    
      
      if context[:last_stmt] and context[:full_stmt]
        write %{[#{ILEAVE}]}
      end
    end
    
    
    
    
    def generate_super(stmt, context)

    end
      
    
    # Generate if, unless statemets
    def generate_if(stmt, context)
      # if expr
      generate_stmt stmt[:expr], :full_stmt => false, :last_stmt => false
      
      main_jump = @iseq_current.create_jump_label
      
      # if/unless clause
      if stmt.node == :if
        write %{[#{IBRANCHUNLESS},#{main_jump}]}
      else # unless stmt
        write %{[#{IBRANCHIF},#{main_jump}]}
      end
      
      stmt[:stmt].each do |s|
        # if the IF stmt is the last stmt, then :last_stmt should be true only
        # for the last s stmt.
        generate_stmt s, :full_stmt => true, :last_stmt => false
      end
      
      # write_label %{#{main_jump}}
      
      if stmt[:tail]
        # if we have a tail, then this jump will be a global jump destination to
        # get to the end of the IF/ELSIF/ELSE statement.
        global_end_jump = @iseq_current.create_jump_label
        
        # now we have a global, if the RTEST for IF passes, we will need to jump
        # to it, so:
        write %{[#{IJUMP},#{global_end_jump}]}
        
        # have the IF statement part fail go to after the JUMP opcode
        write_label main_jump
        
        # now, for each elsif/else part, we need to output val, branch, stmt, 
        # jump
        stmt[:tail].each do |t|
          if t.node == :elsif
            generate_stmt t[:expr], :full_stmt => false, :last_stmt => false
            cur_jump = @iseq_current.create_jump_label
            write %{[#{IBRANCHUNLESS},#{cur_jump}]}
            # stmts
            t[:stmt].each do |s|
              generate_stmt s, :full_stmt => true, :last_stmt => false
            end
            # jump to end of if/else/if
            write %{[#{IJUMP},#{global_end_jump}]}
            # label for if elsif rtest fails..
            write_label cur_jump
          else # else node
            # if we get to here, we run the else command no matter what. 'else'
            t[:stmt].each do |s|
              generate_stmt s, :full_stmt => true, :last_stmt => false
            end
          end
        end
        
        # end of IF/ELSIF/ELSE, so have global_end_jump destination here
        write_label global_end_jump
      end
    end
    
    # If/unless mod ... statement after 
    # 
    def generate_if_mod stmt, context

    end
    
    
    # Generate a class. This might be within the context of an outer module or
    # klass, and might be nested indefinately deep within such combinations
    # 
    def generate_class klass, context
      # do class body first
      current_iseq = @iseq_current
      class_iseq = iseq_stack_push(ISEQ_TYPE_CLASS,"<class:#{klass.klass_name}>")
      # for dynamics..
      class_iseq.parent_iseq = current_iseq
      # generate body stmts
      klass.bodystmt.each do |b|
        generate_stmt b, :full_stmt => false, :last_stmt => false
      end
      
      # if no stmts, put nil as return value - its not actually used
      if klass.bodystmt.length == 0
        write %{[#{IPUTNIL}]} 
        write %{[#{ILEAVE}]} 
      end
      
      iseq_stack_pop

      # base
      write %{[#{IPUTNIL}]}
      # super
      if klass.super_klass
        generate_stmt klass.super_klass[:expr], :full_stmt => false, :last_stmt => false
      else
       write %{[#{IPUTNIL}]}
      end
      
            
      
      
      # defineclass
      write %{[#{IDEFINECLASS},"#{klass.klass_name}",#{class_iseq},0]}    
      
      if context[:last_stmt] and context[:full_stmt]
        write %{[#{ILEAVE}]}
      end
      

    end
    
    # Generates a method definition statement. This can be an instance, class or
    # on a specified object that is passed to the context
    # 
    def generate_def definition, context
      
      current_iseq = @iseq_current
      def_iseq = iseq_stack_push(ISEQ_TYPE_METHOD, definition[:fname])
      # for dynamics..
      def_iseq.parent_iseq = current_iseq
      # generate body stmts
      definition[:bodystmt].each do |b|
        generate_stmt b, :last_stmt => definition[:bodystmt].last == b, :full_stmt => true
      end
      iseq_stack_pop

      # base (singleton method)
      write %{[#{IPUTNIL}]}
    
      # defineclass
      write %{[#{IDEFINEMETHOD},"#{definition[:fname]}",#{def_iseq},0]}
      
    end
    
    # Main entry point for assignments (with one lhs/rhs)
    def generate_assign stmt, context
       
      
      # if lhs is an identifier...
      if stmt[:lhs].node == :identifier
        
        # put val onto stack
        generate_stmt stmt[:rhs], :full_stmt => false, :last_stmt => false
        
        # try local
        local_idx = @iseq_current.local_variable(stmt[:lhs][:name])
        if local_idx
          # local already exsists, so just set current idx.
          abort "lhs unsupported"
        else
          # try dynamic
          if false
          
          else
            idx = @iseq_current.push_local(stmt[:lhs][:name])
            write %{[#{ISETLOCAL},#{idx}]}
          end
        end
 
        write "[#{ILEAVE}]" if context[:last_stmt] and context[:full_stmt]
      
      # If LHS is an @instance_variable
      elsif stmt[:lhs].node == :ivar
        # put val onto stack
        generate_stmt stmt[:rhs], :full_stmt => false, :last_stmt => false
        write %{[#{ISETINSTANCEVARIABLE},"#{stmt[:lhs][:name]}"]}
      else
        abort "unabled assign"
      end
    end
    
     
    # Generate method-call
    # 
    def generate_call call, context
      
      # if we have a block, do the block first
      if call[:brace_block]
        current_iseq = @iseq_current
        block_iseq = iseq_stack_push(ISEQ_TYPE_BLOCK)
        # for dynamics..
        block_iseq.parent_iseq = current_iseq
        
        # block arg names
        if call[:brace_block][:params]
          call[:brace_block][:params].each do |p|
            @iseq_current.push_local(p[:value])
          end
        end
        
        # block stmts
        if call[:brace_block][:stmt]
          call[:brace_block][:stmt].each do |a|
            generate_stmt a, :full_stmt => true, :last_stmt => call[:brace_block][:stmt].last == a
          end
        end
        
        iseq_stack_pop
      else
        block_iseq = "nil"
      end
 
      # receiver
      if call[:recv]
        # bits
        call_bit = 0
        generate_stmt call[:recv], :full_stmt => false, :last_stmt => false
      else
        call_bit = 8
        write %{[#{IPUTNIL}]}
      end
      
      # arguments
      unless call[:call_args].nil? or call[:call_args][:args].nil?
        arg_length = call[:call_args][:args].length
        call[:call_args][:args].each do |arg|
          generate_stmt arg, :full_stmt => false
        end
      else
        arg_length = 0
      end
      
      # call
      write %{[#{ISEND},"#{call[:meth]}",#{arg_length},#{block_iseq},#{call_bit},nil]}
      
      unless @iseq_current.type == ISEQ_TYPE_BLOCK
        if context[:full_stmt] and not context[:last_stmt]
          write "[#{IPOP}]"
        elsif context[:full_stmt] and context[:last_stmt]
          write %{[#{ILEAVE}]}
        end      
      end
      
      
      
      
  
    end
  
    
    
    # Generate a string
    # 
    def generate_string str, context
      write %{[#{IPUTOBJECT},"#{str[:value][0][:value]}"]}
    end
    
    # Generate an X-string
    # This basically holds Javascript code....
    # 
    def generate_xstring str, context
 
    end
    
    
    
    
    
    def generate_module mod, context
      # do class body first
      current_iseq = @iseq_current
      class_iseq = iseq_stack_push(ISEQ_TYPE_CLASS,"<module:#{mod.klass_name}>")
      # for dynamics..
      class_iseq.parent_iseq = current_iseq
      # generate body stmts
      mod.bodystmt.each do |b|
        generate_stmt b, :full_stmt => true,:last_stmt => mod.bodystmt.last == b
      end
      
      # if no stmts, put nil as return value - its not actually used
      if mod.bodystmt.length == 0
        write %{[#{IPUTNIL}]} 
        write %{[#{ILEAVE}]} 
      end
      
      iseq_stack_pop

      # base
      write %{[#{IPUTNIL}]}
      # super
      write %{[#{IPUTNIL}]}
      
      # defineclass
      write %{[#{IDEFINECLASS},"#{mod.klass_name}",#{class_iseq},2]}
      
            
      if context[:last_stmt] and context[:full_stmt]
        write %{[#{ILEAVE}]}
      end
    end
    
    
    
    
    

    
    def generate_symbol sym, context
      write "return " if context[:last_stmt] and context[:full_stmt]
      write %{ID2SYM("#{sym[:name]}")}
      
      # write "#{js_id_for_symbol(sym[:name])}"
      # write "'#{sym[:name]}'"
      write ";" if context[:full_stmt]
    end
    
    def generate_constant const, context
      # no klass searh for just constant
      write %{[#{IPUTNIL}]}
      write %{[#{IGETCONSTANT},"#{const[:name]}"]}
      
   end
    
    
    def generate_assoc_list list, context
      
    end
  
    
    
    
    def generate_array stmt, context
      
      stmt[:args].each { |a| generate_stmt a, :full_stmt => false, :last_stmt => false }
      
      write %{[#{INEWARRAY},#{stmt[:args].length}]}
      
    end
    
    
    def generate_ivar stmt, context
      write %{[#{IGETINSTANCEVARIABLE},"#{stmt[:name]}"]}

    end
    
    
    # This method must handle identifiying whether an identifier as actually
    # a varname, or a method call on self.
    def generate_identifier identifier, context
      
      
      # try local first
      local_idx = @iseq_current.local_variable(identifier[:name])
      if local_idx
        write %{[#{IGETLOCAL},#{local_idx}]}
      else
        dynamic_idx = @iseq_current.dynamic_variable(identifier[:name])
        if dynamic_idx
          write %{[#{IGETDYNAMIC},#{dynamic_idx[0]},#{dynamic_idx[1]}]}
        else
          # must be a method call
          write "n"
        end
      end

    end
    
    def generate_self identifier, context
      write %{[#{IPUTSELF}]}
    end
    
    def generate_true identifier, context
      write %{[#{IPUTOBJECT},true]}
    end
    
    def generate_false identifier, context
      write %{[#{IPUTOBJECT},false]}
    end
    
    def generate_nil identifier, context
      write %{[#{IPUTNIL}]}
    end
    
    
    def generate_numeric numeric, context
      write %{[#{IPUTOBJECT},#{numeric[:value]}]}
    end
    
    
    # ||=, &&= etc - assign methods that cannot be overridden
    # 
    def generate_op_asgn stmt, context

    end
    
    
    
    # primay::CONST
    def generate_colon2 stmt, context

    end
    
    def generate_colon3 stmt, context

    end
    
    
    # Case/when statements
    def generate_case stmt, context

    end
    
    # yield..
    def generate_yield stmt, context

    end
    
    
    def generate_cvar stmt, context

    end
    
    
    def generate_orop stmt, context

    end
    
    def generate_andop stmt, context

    end
    
    def generate_not stmt, context

    end
    
    def generate_tertiary stmt, context

    end
    
    
    def generate_dot2 stmt, context

    end
  end
end
