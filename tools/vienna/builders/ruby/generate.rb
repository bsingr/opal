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
      
      def initialize(type, filename)
        @type = type
        @filename = filename
        @opcodes = []
        @locals = []
        @args = []
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
      def write(str)
        @opcodes << str
      end
      
      # to_s: ready for spitting out to javascript.
      def to_s
        s = "["
        s << %{#{@args.length},}
        s << %{#{@locals.length},}
        s << %{"<compiled>",}
        s << %{"#{@filename}",}
        s << %{#{@type},}
        s << %{0,}
        s << %{[],}
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
    # INOP                    = 0
    # IGETLOCAL               = 1
    # ISETLOCAL               = 2
    # IGETSPECIAL             = 3
    # ISETSPECIAL             = 4          
    # IGETDYNAMIC             = 5
    # ISETDYNAMIC             = 6              
    # IGETINSTANCEVARIABLE    = 7
    # ISETINSTANCEVARIABLE    = 8,             
    # IGETCLASSVARIABLE       = 9
    # ISETCLASSVARIABLE       = 10            
    # IGETCONSTANT            = 11
    # ISETCONSTANT            = 12             
    # IGETGLOBAL              = 13
    # ISETGLOBAL              = 14             
    # IPUTNIL                 = 15
    # IPUTSELF                = 16             
    # IPUTOBJECT              = 17
    # IPUTSTRING              = 18             
    # ICONCATSTRINGS          = 19
    # ITOSTRING               = 20             
    # ITOREGEXP               = 21
    # INEWARRAY               = 22             
    # IDUPARRAY               = 23
    # IEXPANDARRAY            = 24             
    # ICONCATARRAY            = 25
    # ISPLATARRAY             = 26             
    # ICHECKINCLUDEARRAY      = 27
    # INEWHASH                = 28             
    # INEWRANGE               = 29
    # IPOP                    = 30             
    # IDUP                    = 31
    # IDUPN                   = 32             
    # ISWAP                   = 33
    # IREPUT                  = 34             
    # ITOPN                   = 35
    # ISETN                   = 36             
    # IADJUSTSTACK            = 37
    # IDEFINEMETHOD           = 38             
    # IALIAS                  = 39
    # IUNDEF                  = 40             
    # IDEFINED                = 41
    # IPOSTEXE                = 42             
    # ITRACE                  = 43
    # IDEFINECLASS            = 44             
    # ISEND                   = 45
    # IINVOKESUPER            = 46             
    # IINVOKEBLOCK            = 47
    # ILEAVE                  = 48             
    # IFINISH                 = 49
    # ITHROW                  = 50             
    # IJUMP                   = 51
    # IBRANCHIF               = 52             
    # IBRANCHUNLESS           = 53
    # IGETINLINECACHE         = 54             
    # IONCEINLINECACHE        = 55
    # ISETINLINECACHE         = 56             
    # IOPT_CASE_DISPATCH      = 57
    # IOPT_CHECKENV           = 58             
    # IOPT_PLUS               = 59
    # IOPT_MINUS              = 60             
    # IOPT_MULT               = 61
    # IOPT_DIV                = 62             
    # IOPT_MOD                = 63
    # IOPT_EQ                 = 64             
    # IOPT_NEQ                = 65
    # IOPT_LT                 = 66             
    # IOPT_LE                 = 67
    # IOPT_GT                 = 68             
    # IOPT_GE                 = 69
    # IOPT_LTLT               = 70             
    # IOPT_AREF               = 71
    # IOPT_ASET               = 72             
    # IOPT_LENGTH             = 73
    # IOPT_SUCC               = 74             
    # IOPT_NOT                = 75
    # IOPT_REGEXPMATCH1       = 76             
    # IOPT_REGEXPMATCH2       = 77
    # IOPT_CALL_C_FUNCTION    = 78             
    # IBITBLT                 = 79
    # IANSWER                 = 80
    
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
    IDEFINEMETHOD           = 38             
    IALIAS                  = 39
    IUNDEF                  = 40             
    IDEFINED                = 41
    IPOSTEXE                = 42             
    ITRACE                  = 43
    IDEFINECLASS            = 'iDEFINECLASS'             
    ISEND                   = 'iSEND'
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
    
    
    # iseq is a ruby array containing iseq structure
    def iseq_stack_push(type)
      @iseq_current = ISEQ.new(type, @build_name)
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
    
    def generate_tree tree
      
      top_iseq = iseq_stack_push(ISEQ_TYPE_TOP)
      tree.each do |stmt|
        # until we have line numbers, between each stmt fake at line number '0'
        write "0"
        generate_stmt stmt, :instance => true, :full_stmt => true, :last_stmt => false, :top_level => true
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
      else
        write "\n[Unknown type for generate_stmt: #{stmt}]\n"
      end
    end
    
    def generate__FILE__ stmt, context
      write "return " if context[:last_stmt] and context[:full_stmt]
      write %{"#{@build_name}"}
      write ";" if context[:full_stmt]
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
      # do class body first
      current_iseq = @iseq_current
      class_iseq = iseq_stack_push(ISEQ_TYPE_CLASS)
      # for dynamics..
      class_iseq.parent_iseq = current_iseq
      # generate body stmts
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
      
      # write "vm_defineclass();"
      # write "(function(self) {\n"
      #    
      #    
      #    # Statements
      #    if klass.bodystmt
      #      klass.bodystmt.each do |stmt|
      #        generate_stmt stmt, :instance => false,     # all class methods/references in current scope
      #                            :full_stmt => true,     # full statements, so insert relevant ';' etc
      #                            :self => current_self,  # current 'self' reference
      #                            :last_stmt => (klass.bodystmt.last == stmt ? true : false)
      #      end
      #    end
      #    
      #    write "})("
      #    if context[:top_level]
      #      # top level
      #      # write "RClass.define('#{klass.klass_name}',"
      #      write "#{js_replacement_function_name('rb_define_class')}("
      #      write js_id_for_const(klass.klass_name)
      #      write ","
      #    else
      #       # nested
      #        # write "RClass.define_under(self,'#{klass.klass_name}',"
      #        write "#{js_replacement_function_name('rb_define_class_under')}(self,"
      #        write js_id_for_const(klass.klass_name)
      #        write ","
      #    end
      #    
      #    # superclass..
      #    if klass.super_klass
      #      generate_stmt klass.super_klass[:expr], :instance => false, :full_stmt => false, :self => current_self, :last_stmt => false
      #      write ")"
      #    else
      #      write "cObject)"
      #    end
      #    
      #    write ");\n"
      #    
      #    # # top-level
      #    # if context[:self] == 'VN.self'
      #    #   push_current_self
      #    #   write "var #{current_self} = RClass.define('#{klass.klass_name}',"
      #    # else # nested class
      #    #   outer = context[:self]
      #    #   push_current_self
      #    #   write "var #{current_self} = RClass.define_under(#{outer}, '#{klass.klass_name}'," 
      #    # end
      #    # 
      #    # # superclass...
      #    # if klass.super_klass
      #    #   generate_stmt klass.super_klass[:expr], :instance => false, :full_stmt => false, :self => current_self, :last_stmt => false
      #    #   write ");\n"
      #    # else
      #    #   write "cObject);\n"
      #    # end
      #    # 
      #    # # statements
      #    # if klass.bodystmt
      #    #   klass.bodystmt.each do |stmt|
      #    #     generate_stmt stmt, :instance => false,     # all class methods/references in current scope
      #    #                         :full_stmt => true,     # full statements, so insert relevant ';' etc
      #    #                         :self => current_self,  # current 'self' reference
      #    #                         # :last_stmt => (klass.bodystmt.last == stmt ? true : false)
      #    #                         :last_stmt => false
      #    #   end
      #    # end
      #    # 
      #    # pop_current_self
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
        # elsif stmt[:lhs].node == :ivar
        #   write "#{context[:self]}.$i_s(#{js_id_for_ivar(stmt[:lhs][:name])},"
        #   generate_stmt stmt[:rhs], :instance => context[:instance], context[:full_stmt] => false, context[:last_stmt] => true, :self => context[:self]
        #   write ')'
      
      else
        abort "unabled assign"
      end
      
      # write "," if context[:full_stmt]
        
        # if already in var table, just put name = ...
        # if not in var table, make new var, and add it
        # we do not write var if we have just put a return before it....js error
        # write 'var ' unless (context[:last_stmt] and context[:full_stmt]) or nametable_include? stmt[:lhs][:name]
        # add_to_nametable(stmt[:lhs][:name]) unless nametable_include? stmt[:lhs][:name]
        # write "#{stmt[:lhs][:name]}="
        # generate_stmt stmt[:rhs], :instance => context[:instance], context[:full_stmt] => false, context[:last_stmt] => true, :self => context[:self]
        
      
      # # If LHS is an @instance_variable
      # elsif stmt[:lhs].node == :ivar
      #   write "#{context[:self]}.$i_s(#{js_id_for_ivar(stmt[:lhs][:name])},"
      #   generate_stmt stmt[:rhs], :instance => context[:instance], context[:full_stmt] => false, context[:last_stmt] => true, :self => context[:self]
      #   write ')'
      # 
      # 
      # # Class var
      # elsif stmt[:lhs].node == :cvar
      #   write "#{context[:self]}.$k_s('#{stmt[:lhs][:name]}',"
      #   generate_stmt stmt[:rhs], :instance => context[:instance], context[:full_stmt] => false, context[:last_stmt] => true, :self => context[:self]
      #   write ')'
      # 
      # 
      # # IF LHS is a CONSTANT
      # elsif stmt[:lhs].node == :constant
      #   if context[:top_level]
      #     # puts stmt[:lhs][:name]
      #     write 'cObject'
      #   elsif context[:instance]
      #     write "self.$klass"
      #   else
      #     write "self"
      #   end
      #        
      #   write ".$c_s('#{stmt[:lhs][:name]}',"
      #   generate_stmt stmt[:rhs], :instance => context[:instance], context[:full_stmt] => false, :last_stmt => context[:last_stmt], :top_level => context[:top_level]
      #   write ')'
      #   
      # # elsif LHS is a call (as the equals sign onto call method, and use rhs as param)
      # elsif stmt[:lhs].node == :call
      #   write "#{js_replacement_function_name('rb_funcall')}("
      #   generate_stmt stmt[:lhs][:recv], :instance => context[:instance], context[:full_stmt] => false, :last_stmt => context[:last_stmt], :self => context[:self]
      #   # write ",#{js_id_for_string("#{stmt[:lhs][:meth]}="}),"
      #   write ","
      #   write js_id_for_string("#{stmt[:lhs][:meth]}=")
      #   write ","
      #   # if its []= then we need to output 2 args
      #   if stmt[:lhs][:meth] == '[]'
      #     # write stmt[:]
      #     generate_stmt stmt[:lhs][:args][:args][0],
      #      :instance => context[:instance], context[:full_stmt] => false, :last_stmt => context[:last_stmt], :self => context[:self]
      #     write ','
      #   end
      #   generate_stmt stmt[:rhs], :instance => context[:instance], context[:full_stmt] => false, :last_stmt => context[:last_stmt], :self => context[:self]
      #   write ")"
      # else
      #   write stmt
      # end      
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
      
      # if we have a block, do the block first
      if call[:brace_block]
        current_iseq = @iseq_current
        block_iseq = iseq_stack_push(ISEQ_TYPE_BLOCK)
        # for dynamics..
        block_iseq.parent_iseq = current_iseq
        
        if call[:brace_block][:stmt]
          call[:brace_block][:stmt].each do |a|
            generate_stmt a, :full_stmt => true, :last_stmt => call[:brace_block][:stmt].last == a
          end
        end
        
        # top_iseq = iseq_stack_push(ISEQ_TYPE_TOP)
        # tree.each do |stmt|
        #   # until we have line numbers, between each stmt fake at line number '0'
        #   write "0"
        #   generate_stmt stmt, :instance => true, :full_stmt => true, :last_stmt => false, :top_level => true
        # end
        iseq_stack_pop
      else
        block_iseq = "null"
      end
      # unless call[:brace_block].nil?
      #   push_nametable
      #   
      #   write ","
      #   write "function("
      #   if call[:brace_block][:params]
      #     call[:brace_block][:params].each do |p|
      #       write "," unless call[:brace_block][:params].first == p
      #       write p[:value]
      #       add_to_nametable p[:value]
      #     end
      #   end
      #   write "){\n"
      #   
      #   if call[:brace_block][:stmt]
      #     call[:brace_block][:stmt].each do |stmt|
      # 
      #       generate_stmt stmt, :instance => (context[:singleton] ? false : true),
      #                           :full_stmt => true, 
      #                           :last_stmt => (call[:brace_block][:stmt].last == stmt ? true : false), 
      #                           :self => current_self,
      #                           :top_level => context[:top_level]
      # 
      #     end
      #   end        
      #   
      #   write "}"
      #   pop_nametable
      #   
      # end # end block
      
      
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
      write %{[#{ISEND},"#{call[:meth]}",#{arg_length},#{block_iseq},#{call_bit},null]}
      
      if context[:full_stmt] and not context[:last_stmt]
        write "[#{IPOP}]"
      end
      
      
      
      
      # write %{[#{ISEND},}
      # put receiver onto stack
      # if call[:recv]
      #   # generate stmt
      # else
      #   write 
      # 
      
      
      # return
      # write "return " if context[:last_stmt] and context[:full_stmt]
      # write "vm_send("
      # 
      # if call[:recv]
      #   generate_stmt call[:recv], :full_stmt => false, :last_stmt => context[:last_stmt]
      # else
      #   write "vm_self()"
      # end
      # 
      # write %{,"#{call[:meth]}",[}
      # 
      # # normal call args
      # unless call[:call_args].nil? or call[:call_args][:args].nil?
      #   call[:call_args][:args].each do |arg|
      #     write "," unless arg == call[:call_args][:args].first
      #     generate_stmt arg, :full_stmt => false
      #     # write ',' unless arg == call[:call_args][:args].last && call[:call_args][:brace_block].nil?
      #   end
      # end
      # 
      # write %{],nil)}
      
      
      
      
      
      
      
      # write "," if context[:full_stmt]
      
      # puts call
      # write "vm_send();"
      # write "return " if context[:last_stmt] and context[:full_stmt]
      # 
      # write "#{js_replacement_function_name('rb_funcall')}("
      # 
      # if call[:recv]
      #   generate_stmt call[:recv], :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :self =>context[:self], :call_recv => true, :top_level => context[:top_level]
      # else
      #   write 'self'
      #   # write current_self
      # end
      # 
      # write ",#{js_id_for_string(call[:meth])}"
      # # js_id_for_string(call[:meth])
      #   
      # # write ".$('#{call[:meth]}',["
      # 
      # # normal call args
      # unless call[:call_args].nil? or call[:call_args][:args].nil?
      #   # write ","
      #   call[:call_args][:args].each do |arg|
      #     write ","
      #     generate_stmt arg, :instance => context[:instance], :full_stmt => false
      #     # write ',' unless arg == call[:call_args][:args].last && call[:call_args][:brace_block].nil?
      #   end
      # end
      # 
      # # assocs
      # if call[:call_args] and call[:call_args][:assocs]
      #   write ","
      #   # puts call[:call_args][:assocs]
      #   write "VN.$h("
      #   call[:call_args][:assocs].each do |a|
      #     write "," unless call[:call_args][:assocs].first == a
      #     
      #     generate_stmt a[:key], :instance => context[:instance], :full_stmt => false, :top_level => context[:top_level]
      #     write ","
      #     generate_stmt a[:value], :instance => context[:instance], :full_stmt => false, :top_level => context[:top_level]
      #     # write a
      #   end
      #   write ")"
      #   
      #   # generate_assoc_list call[:call_args][:assocs], :instance => context[:instance], :full_stmt => false
      # end
      # # write call
      # # if call[:meth] == 'sprite'
      #   # puts 'gmmm'
      #   # puts call[:call_args][:brace_block]
      # # end
      # 
      # # block
      # unless call[:brace_block].nil?
      #   push_nametable
      #   
      #   write ","
      #   write "function("
      #   if call[:brace_block][:params]
      #     call[:brace_block][:params].each do |p|
      #       write "," unless call[:brace_block][:params].first == p
      #       write p[:value]
      #       add_to_nametable p[:value]
      #     end
      #   end
      #   write "){\n"
      #   
      #   if call[:brace_block][:stmt]
      #     call[:brace_block][:stmt].each do |stmt|
      # 
      #       generate_stmt stmt, :instance => (context[:singleton] ? false : true),
      #                           :full_stmt => true, 
      #                           :last_stmt => (call[:brace_block][:stmt].last == stmt ? true : false), 
      #                           :self => current_self,
      #                           :top_level => context[:top_level]
      # 
      #     end
      #   end        
      #   
      #   write "}"
      #   pop_nametable
      #   
      # end # end block
      # 
      # write ")"
      # write ";\n" if context[:full_stmt]
      # 
      # # write call[:brace_block]
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
      
      # mod_iseq = iseq_stack_push(ISEQ_TYPE_CLASS)
      # tree.each do |stmt|
        # generate_stmt stmt, :instance => true, :full_stmt => true, :last_stmt => false, :top_level => true
      # end
      # mod_str = iseq_stack_pop
      # puts mod_str
      
      # write %{vm_defineclass(nil,nil,"#{mod.klass_name}",nil,#{DEFINECLASS_MODULE});}
      
      # write "(function(self) {\n"
      # 
      # # Statements
      # if mod.bodystmt
      #   mod.bodystmt.each do |stmt|
      #     # puts stmt
      #     # puts stmt.node
      #     generate_stmt stmt, :instance => false,     # all class methods/references in current scope
      #                         :full_stmt => true,     # full statements, so insert relevant ';' etc
      #                         :self => current_self,  # current 'self' reference
      #                         :last_stmt => (mod.bodystmt.last == stmt ? true : false),
      #                         :nested => true
      #   end
      # end
      # 
      # write "})("
      # # write "RModule.define('#{mod.klass_name}')"
      # write "#{js_replacement_function_name('rb_define_module')}("
      # # write "#{mod.klass_name}"
      # write js_id_for_const(mod.klass_name)
      # write ")"
      # write ");\n"
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
      
      # write "return " if context[:last_stmt] and context[:full_stmt]
      # write %{vm_getconstant(nil,"#{const[:name]}")}
      # write ";" if context[:full_stmt]
      # write 'return ' if context[:last_stmt] and context[:full_stmt]
      # 
      # constant_scope = context[:scope_constant] ? '$c_g' : '$c_g_full'
      # if context[:top_level]
      #   # nothing else to look around, so normal check..
      #   write "cObject.$c_g(#{js_id_for_const(const[:name])})"
      # elsif context[:instance]
      #   write "self.$klass.#{constant_scope}(#{js_id_for_const(const[:name])})"
      # else
      #   write "self.#{constant_scope}(#{js_id_for_const(const[:name])})"
      # end
      # 
      # write ";\n" if context[:full_stmt]
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
      
      stmt[:args].each { |a| generate_stmt a, :full_stmt => false, :last_stmt => false }
      
      write %{[#{INEWARRAY},#{stmt[:args].length}]}
      
      # write 'return ' if context[:last_stmt] and context[:full_stmt]
      # 
      # write '['
      # if stmt[:args]
      #   stmt[:args].each do |a|
      #     write ',' unless stmt[:args].first == a
      #     generate_stmt a, :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt],  :self => current_self
      #   end
      # end
      # 
      # write ']'
      # write ";\n" if context[:full_stmt]
    end
    
    
    def generate_ivar stmt, context
      write %{[#{IGETINSTANCEVARIABLE},"#{stmt[:name]}"]}
      # write 'return ' if context[:last_stmt] and context[:full_stmt]
      # # write "#{current_self}.$i_g('#{stmt[:name]}')"
      # # write "#{current_self}.$i_g(i$#{js_id_for_ivar(stmt[:name])})"
      # write "#{js_replacement_function_name('rb_ivar_get')}(#{current_self},#{js_id_for_ivar(stmt[:name])})"
      # write ";\n" if context[:full_stmt]
    end
    
    
    # This method must handle identifiying whether an identifier as actually
    # a varname, or a method call on self.
    def generate_identifier identifier, context
      
      # if context[:last_stmt] and context[:full_stmt]
      #   write 'return '
      # end     
      # 
      # # if lhs is an identifier...
      # if stmt[:lhs].node == :identifier
      #   
      #   if @iseq_current.has_local?(stmt[:lhs][:name])
      #     write %{"yes!"}
      #   else
      #     # write %{"no!"}
      #     idx = @iseq_current.push_local(stmt[:lhs][:name])
      #     write %{vm_setlocal(#{idx},}
      #     generate_stmt stmt[:rhs], :full_stmt => false, :last_stmt => false
      #     write ")"
      #   end
      
      # write 'return ' if context[:last_stmt] and context[:full_stmt]
      
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
      
      # if @iseq_current.has_local?(identifier[:name])
      #   # idx is index, fp is the lfp or dynamic frame. if 0, local, if > 0
      #   # then it is a dynamic frame pointer
      #   idx, fp = @iseq_current.local_index(identifier[:name])
      #   if fp == 0
      #     write %{[#{IGETLOCAL},#{idx}]}
      #     # write %{vm_getlocal(#{idx})}
      #   else
      #     # dynamic
      #     write "erm, fix"
      #   end
      # else
      #   write "yada"
      # end
      
      # write ";" if context[:full_stmt]
    end
    
    def generate_self identifier, context
      write %{[#{IPUTSELF}]}
      # write 'return ' if context[:last_stmt] and context[:full_stmt]
      # write "self"
      # write ";\n" if context[:full_stmt]
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
      write %{[#{IPUTOBJECT},#{numeric[:value]}]}
      
      # write 'return ' if context[:last_stmt] and context[:full_stmt]
      # write '(' if context[:call_recv] # is number is the reciever of a call, we need to wrap it in params
      # write "#{numeric[:value]}"
      # write ')' if context[:call_recv]
      # write ";\n" if context[:full_stmt]
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
