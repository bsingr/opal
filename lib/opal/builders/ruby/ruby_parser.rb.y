# 
# ruby_parser.rb.y
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

class Vienna::RubyParser

  #   prechigh
  #     nonassoc tLOWEST
  #     nonassoc tLBRACE_ARG
  #     
  #     left  tLSHFT tRSHFT
  #     nonassoc  kIF_MOD kUNLESS_MOD kWHILE_MOD kUNTIL_MOD
  #     left  kOR kAND
  #     right kNOT
  #     nonassoc kDEFined
  #     right '=' tOP_ASGN
  #     left kRESCUE_MOD
  #     right '?' ':'
  #     nonassoc tDOT2 tDOT3
  #     left  tOROP
  #     left  tANDOP
  #     nonassoc  tCMP tEQ tEQQ tNEQ tMATCH tNMATCH
  #     left  '>' tGEQ '<' tLEQ
  #     left  '|' '^'
  #     left  '&'
  #     left  '+' '-'
  #     left  '*' '/' '%'
  #     right tUMINUS_NUM tUMINUS
  #     right tPOW
  #     right '!' '~' tUPLUS
  # preclow
  
  prechigh
    right    '!' tTILDE tUPLUS
    right    tPOW
    right    tUMINUS_NUM tUMINUS
    left     tSTAR2 tDIVIDE tPERCENT
    left     tPLUS tMINUS
    left     tLSHFT tRSHFT
    left     tAMPER2
    left     tPIPE tCARET
    left     '>' tGEQ '<' tLEQ
    nonassoc tCMP tEQ tEQQ tNEQ tMATCH tNMATCH
    left     tANDOP
    left     tOROP
    nonassoc tDOT2 tDOT3
    right    '?' ':'
    left     kRESCUE_MOD
    right    '=' tOP_ASGN
    # left     tANDOP
    # left     tOROP
    nonassoc kDEFINED
    right    kNOT
    left     kOR kAND
    nonassoc kIF_MOD kUNLESS_MOD kWHILE_MOD kUNTIL_MOD
    nonassoc tLBRACE_ARG
    nonassoc tLOWEST
  preclow
	  
  token kCLASS kMODULE kDEF kUNDEF kBEGIN kRESCUE kENSURE kEND kIF kUNLESS
  token kTHEN kELSIF kELSE kCASE kWHEN kWHILE kUNTIL kFOR kBREAK kNEXT
  token kREDO kRETRY kIN kDO kDO_COND kDO_BLOCK kDO_LAMBDA kRETURN kYIELD
  token kSUPER kSELF kNIL kTRUE kFALSE kAND kOR kNOT kIF_MOD kUNLESS_MOD
  token kWHILE_MOD kUNTIL_MOD kRESCUE_MOD kALIAS kDEFINED klBEGIN klEND
  token k__LINE__ k__FILE__ k__ENCODING__ 
  token kDEFined kBLOCK_GIVEN

  token tIDENTIFIER tFID tGVAR tIVAR tCONSTANT tCVAR tLABEL tINTEGER tFLOAT
  token tSTRING_CONTENT tCHAR tNTH_REF tBACK_REF tREGEXP_END tUPLUS tUMINUS
  token tPOW tCMP tEQ tEQQ tNEQ tGEQ tLEQ tANDOP tOROP tMATCH tNMATCH	tDOT2
  token tDOT3 tAREF tASET tLSHFT tRSHFT tCOLON2 tCOLON3 tOP_ASGN tASSOC
  token tLPAREN	tLPAREN_ARG	tRPAREN tLBRACK tLBRACE tLBRACE_ARG tSTAR tAMPER
  token tLAMBDA tSYMBEG tSTRING_BEG tXSTRING_BEG tREGEXP_BEG tWORDS_BEG
  token tQWORDS_BEG tSTRING_DBEG tSTRING_DVAR tSTRING_END tLAMBEG tUMINUS_NUM
  token tSTRING tXSTRING_END
	

rule

          target: program
                  {
                    # puts 'well, we got here..'
                    # puts val[0]
                    @parser_result = val[0]
                    result = val[0]
                  }
			
         program:
                  {
                    self.lex_state = :EXPR_BEG
                  }
                  top_compstmt
                  {
                    # puts 'program'
                    # puts val[1]
                    result = val[1]
                  }

    top_compstmt: top_stmts opt_terms
                  {
                    # puts 'top_compstmt'
                    # puts val[0]
                    # puts val[1]
                    result = val[0]
                  }

       top_stmts: none
                  {
                    result = []
                  }
                | top_stmt
                  {
                    result = [val[0]]
                  }
                | top_stmts terms top_stmt
                  {
                    result = val[0] + [val[2]]
                  }
                | error top_stmt
                  {
                    result = val[1]
                  }

        top_stmt: stmt
                  {
                    result = val[0]
                  }
  	            | kBEGIN

        bodystmt: compstmt opt_rescue opt_else opt_ensure
                  {
                    # puts "erm wtf?!"
                    # puts val[1]
                    result = self.node_bodystmt(val[0], val[1], val[2], val[3])
                    # if val[1]
                      # pp result
                    # end
                  }

        compstmt: stmts opt_terms
                  {
                    result = val[0]
                  }

           stmts: none
                  {
                    result = []
                  }
                | stmt
                  {
                    result = [val[0]]
                  }
		            | stmts terms stmt
		              {
                    result = val[0] + [val[2]]
		              }
		            | error stmt

            stmt: kALIAS fitem
                  {
                    self.lex_state = :EXPR_FNAME
                  }
                  fitem
                  {
                    result = node :alias, :lhs => val[1], :rhs => val[3] 
                  }
            		| kALIAS tGVAR tGVAR
            		| kALIAS tGVAR tBACK_REF
            		| kALIAS tGVAR tNTH_REF
            		| kUNDEF undef_list
            		| stmt kIF_MOD expr_value
            		  {
                    result = node :if, :expr => val[2], :stmt => [val[0]], :tail => []
            		  }
            		| stmt kUNLESS_MOD expr_value
            		  {
            		    result = node :unless, :expr => val[2], :stmt => [val[0]], :tail => []
            		  }
            		| stmt kWHILE_MOD expr_value
            		  {
            		    result = node :while, :expr => val[2], :stmt => [val[0]]
            		  }
            		| stmt kUNTIL_MOD expr_value
            		  {
            		    result = node :until, :expr => val[2], :stmt => [val[0]]
            		  }
            		| stmt kRESCUE_MOD stmt
                | klEND '{' compstmt '}'
            		| lhs '=' command_call
            		  {
            		    result = node :assign, :lhs => val[0], :rhs => val[2]
            		  }
            		| mlhs '=' command_call
            		| var_lhs tOP_ASGN command_call
            		  {
            		    result = node :op_asgn, :lhs => val[0], :op => val[1], :rhs => val[2]
            		  }
            		| primary_value '[' opt_call_args rbracket tOP_ASGN command_call
            		  {
            		    puts "in here for #{val[0]}"
            		  }
            		| primary_value '.' tIDENTIFIER tOP_ASGN command_call
            		| primary_value '.' tCONSTANT tOP_ASGN command_call
            		| primary_value tCOLON2 tIDENTIFIER tOP_ASGN command_call
            		| backref tOP_ASGN command_call
            		| lhs '=' mrhs
            		| mlhs '=' arg_value
            		| mlhs '=' mrhs
            		| expr

            expr: command_call
              	| expr kAND expr
              	  {
              	    result = node :andop, :lhs => val[0], :rhs => val[2]
              	  }
              	| expr kOR expr
              	  {
              	    result = node :orop, :lhs => val[0], :rhs => val[2]
              	  }
              	| kNOT opt_nl expr
              	  {
              	    result = node :not, :expr => val[2]
              	  }
              	| '!' command_call
              	| arg

      expr_value: expr

    command_call: command
              	| block_command
              	| kRETURN call_args
              	  {
              	    result = node :return, :call_args => val[1]
              	  }
            	  | kBREAK call_args
            	    {
            	      result = node :break, :call_args => val[1]
            	    }
            	  | kNEXT call_args
            	    {
            	      result = node :next, :call_args => val[1]
            	    }

   block_command: block_call
             	  | block_call '.' operation2 command_args
                | block_call tCOLON2 operation2 command_args

 cmd_brace_block: tLBRACE_ARG opt_block_param compstmt '}'

         command: operation command_args =tLOWEST
                  {
                    # command call - no brackets/recv
          		      result = node :call, :recv => nil, :meth => val[0], :call_args => val[1]
                  }
        	      | operation command_args cmd_brace_block
        	      | primary_value '.' operation2 command_args =tLOWEST
        	        {
          		      result = node :call, :recv => val[0], :meth => val[2], :call_args => val[3]
                  }
        	      | primary_value '.' operation2 command_args cmd_brace_block
        	      | primary_value tCOLON2 operation2 command_args =tLOWEST
      		      | primary_value tCOLON2 operation2 command_args cmd_brace_block
      		      | kSUPER command_args
      		        {
      		          result = node :super, :call_args => val[1]
      		        }
        	      | kYIELD command_args
        	        {
        	          result = node :yield, :call_args => val[1]
        	        }

            mlhs: mlhs_basic
  	            | tLPAREN mlhs_inner rparen

      mlhs_inner: mlhs_basic
  	            | tLPAREN mlhs_inner rparen

      mlhs_basic: mlhs_head
    		        | mlhs_head mlhs_item
      	        | mlhs_head tSTAR mlhs_node
      	        | mlhs_head tSTAR mlhs_node ',' mlhs_post
      	        | mlhs_head tSTAR
      	        | mlhs_head tSTAR ',' mlhs_post
      	        | tSTAR mlhs_node
      	        | tSTAR mlhs_node ',' mlhs_post
      	        | tSTAR
      	        | tSTAR ',' mlhs_post

       mlhs_item: mlhs_node
  	            | tLPAREN mlhs_inner rparen

       mlhs_head: mlhs_item ','
  	            | mlhs_head mlhs_item ','

       mlhs_post: mlhs_item
  	            | mlhs_post ',' mlhs_item

       mlhs_node: variable
              	| primary_value '[' opt_call_args rbracket
              	| primary_value '.' tIDENTIFIER
              	| primary_value tCOLON2 tIDENTIFIER
              	| primary_value '.' tCONSTANT
              	| primary_value tCOLON2 tCONSTANT
              	| tCOLON3 tCONSTANT
              	| backref

             lhs: variable
		            | primary_value '[' opt_call_args rbracket
		              {
		                result = node :call, :recv => val[0], :meth => '[]', :args => val[2]
		              }
            		| primary_value '.' tIDENTIFIER
            		  {
          		      result = node :call, :recv => val[0], :meth => val[2], :call_args => {}
                  }
            		| primary_value tCOLON2 tIDENTIFIER
            		| primary_value '.' tCONSTANT
            		| primary_value tCOLON2 tCONSTANT
            		| tCOLON3 tCONSTANT
            		  {
            		    result = node :colon3, :name => val[1]
            		  }
            		| backref

           cname: tIDENTIFIER
                  {
                    puts 'ERROR: cant use identifier for class/mod name'
                  }
            		| tCONSTANT
            		  {
            		    result = val[0]
            		  }

           cpath: tCOLON3 cname
                  {
                    
                  }
  	            | cname
  	              {
  	                result = node :path, :cname => val[0]
  	              }
              	| primary_value tCOLON2 cname

           fname: tIDENTIFIER
		            | tCONSTANT
		            | tFID
		            | op
		              {
		                self.lex_state = :EXPR_END
		                result = val[0]
		              }
		            | reswords
		              {
		                self.lex_state = :EXPR_END
		                result = val[0]
		              }

            fsym: fname
              	| symbol

           fitem: fsym
  	            | dsym

      undef_list: fitem
		            | undef_list ',' fitem

              op: '|'      | '^'      | '&'      | tCMP     | tEQ      | tEQQ
                | tMATCH   | tNMATCH  | '>'      | tGEQ     | '<'      | tLEQ
                | tNEQ     | tLSHFT   | tRSHFT   | '+'      | '-'      | '*'
		            | tSTAR	   | '/'      | '%'      | tPOW     | '!'      | '~'
		            | tUPLUS   | tUMINUS  | tAREF    | tASET    | '`'

        reswords: k__LINE__          | k__FILE__          | k__ENCODING__
		            | kBEGIN             | kEND               | kALIAS 
		            | kAND               | kBEGIN             | kBREAK 
            		| kCASE              | kCLASS             | kDEF
            		| kDEFined           | kDO                | kELSE 
            		| kELSIF             | kEND               | kENSURE 
            		| kFALSE             | kFOR               | kIN 
            		| kMODULE            | kNEXT              | kNIL 
            		| kNOT               | kOR                | kREDO
            		| kRESCUE            | kRETRY             | kRETURN
            		| kSELF              | kSUPER             | kTHEN 
            		| kTRUE    	         | kUNDEF             | kWHEN 
            		| kYIELD 	           | kIF                | kUNLESS
            		| kWHILE             | kUNTIL             | kBLOCK_GIVEN

             arg: lhs '=' arg
                  {
                    result = node :assign, :lhs => val[0], :rhs => val[2]
                  }
            		| lhs '=' arg kRESCUE_MOD arg
            		| var_lhs tOP_ASGN arg
            		  {
            		    result = node :op_asgn, :lhs => val[0], :op => val[1], :rhs => val[2]
            		  }
            		| var_lhs tOP_ASGN arg kRESCUE_MOD arg
            		| primary_value '[' opt_call_args rbracket tOP_ASGN arg
            		  {
            		    result = node :aset_op_asgn, :recv => val[0], :call_args => val[2], :op => val[4], :arg => val[5]
            		  }
            		| primary_value '.' tIDENTIFIER tOP_ASGN arg
            		  {
            		    result = node :op_asgn, :lhs => node(:call, :recv => val[0], :meth => val[2], :call_args => {}), :op => val[3], :rhs => val[4]
                    # result = node :dot_identifier_op_asgn, :lhs => node(:call, :recv => val[0], :meth => val[2]), :op => val[3], :rhs => val[4]
            		  }
            		| primary_value '.' tCONSTANT tOP_ASGN arg
            		| primary_value tCOLON2 tIDENTIFIER tOP_ASGN arg
            		| primary_value tCOLON2 tCONSTANT tOP_ASGN arg
            		| tCOLON3 tCONSTANT tOP_ASGN arg
            		| backref tOP_ASGN arg
            		| arg tDOT2 arg
            		  {
            		    result = node :dot2, :start => val[0], :ending => val[2]
            		  }
            		| arg tDOT3 arg
            		  {
            		    result = node :dot3, :start => val[0], :ending => val[2]
            		  }
            		| arg '+' arg
            		  {
            		    result = node :opt_plus, :recv => val[0], :meth => '+', :call_args => { :args => [val[2]]}
            		  }
            		| arg '-' arg
            		  {
            		    result = node :opt_minus, :recv => val[0], :meth => '-', :call_args => { :args => [val[2]]}
            		  }
            		| arg '*' arg
            		  {
            		    result = node :opt_mult, :recv => val[0], :meth => '*', :call_args => { :args => [val[2]]}
            		  }
            		| arg '/' arg
            		  {
            		    result = node :opt_div, :recv => val[0], :meth => '/', :call_args => { :args => [val[2]]}
            		  }
            		| arg '%' arg
            		  {
            		    result = node :call, :recv => val[0], :meth => '%', :call_args => { :args => [val[2]]}
            		  }
            		| arg tPOW arg
            		  {
            		    result = node :call, :recv => val[0], :meth => '**', :call_args => { :args => [val[2]]}
            		  }
            		| tUMINUS_NUM tINTEGER tPOW arg
            		| tUMINUS_NUM tFLOAT tPOW arg
            		| tUPLUS arg
            		  {
            		    result = node :call, :recv => val[1], :meth => '+@', :call_args => { :args => []}
            		  }
            		| tUMINUS arg
            		  {
            		    result = node :call, :recv => val[1], :meth => '-@', :call_args => { :args => []}
            		  }
            		| arg '|' arg
            		  {
            		    result = node :call, :recv => val[0], :meth => '|', :call_args => { :args => [val[2]]}
            		  }
            		| arg '^' arg
            		  {
            		    result = node :call, :recv => val[0], :meth => '^', :call_args => { :args => [val[2]]}
            		  }
            		| arg '&' arg
            		  {
            		    result = node :call, :recv => val[0], :meth => '&', :call_args => { :args => [val[2]]}
            		  }
            		| arg tCMP arg
            		  {
            		    result = node :call, :recv => val[0], :meth => '<=>', :call_args => { :args => [val[2]]}
            		  }
            		| arg '>' arg
            		  {
            		    result = node :call, :recv => val[0], :meth => '>', :call_args => { :args => [val[2]]}
            		  }
            		| arg tGEQ arg
            		  {
            		    result = node :call, :recv => val[0], :meth => '>=', :call_args => { :args => [val[2]]}
            		  }
            		| arg '<' arg
            		  {
            		    result = node :call, :recv => val[0], :meth => '<', :call_args => { :args => [val[2]]}
            		  }
            		| arg tLEQ arg
            		  {
            		    result = node :call, :recv => val[0], :meth => '<=', :call_args => { :args => [val[2]]}
            		  }
            		| arg tEQ arg
            		  {
            		    result = node :call, :recv => val[0], :meth => '==', :call_args => { :args => [val[2]]}
            		  }
            		| arg tEQQ arg
            		  {
            		    result = node :call, :recv => val[0], :meth => '===', :call_args => { :args => [val[2]]}
            		  }
            		| arg tNEQ arg
            		  {
            		    result = node :call, :recv => val[0], :meth => '!=', :call_args => { :args => [val[2]]}
            		  }
            		| arg tMATCH arg
            		  {
            		    result = node :call, :recv => val[0], :meth => '=~', :call_args => { :args => [val[2]]}
            		  }
            		| arg tNMATCH arg
            		  {
            		    result = node :call, :recv => val[0], :meth => '!~', :call_args => { :args => [val[2]]}
            		  }
            		| '!' arg
              	  {
              	    result = node :not, :expr => val[1]
              	  }
            		| '~' arg
            		  {
            		    result = node :call, :recv => val[1], :meth => '~', :call_args => { :args => []}
            		  }
            		| arg tLSHFT arg
            		  {
            		    result = node :call, :recv => val[0], :meth => '<<', :call_args => { :args => [val[2]]}
            		  }
            		| arg tRSHFT arg
            		  {
            		    result = node :call, :recv => val[0], :meth => '>>', :call_args => { :args => [val[2]]}
            		  }
          		  | arg tANDOP arg
            		  {
            		    result = node :andop, :lhs => val[0], :rhs => val[2]
            		  }
            		| arg tOROP arg
            		  {
            		    result = node :orop, :lhs => val[0], :rhs => val[2]
            		  }
            		| kDEFined opt_nl arg
            		| arg '?' arg opt_nl ':' arg
            		  {
            		    result = node :tertiary, :expr => val[0], :true => val[2], :false => val[5]
            		  }
            		| primary

       arg_value: arg

       aref_args: none
              	| args trailer
            		| args ',' assocs trailer
            		| assocs trailer

      paren_args: '(' opt_call_args rparen
                  {
                    result = val[1]
                  }

  opt_paren_args: none
                  {
                    result = node :call_args, :args => nil
                  }
  	            | paren_args

   opt_call_args: none
                  {
                    result = node :call_args, :args => nil
                  }
  	            | call_args

       call_args: command
                  {
            		    result = node :call_args, :args => [val[0]]
            		  }
            		| args opt_block_arg
            		  {
            		    result = node :call_args, :args => val[0], :block_arg => val[1]
            		  }
		            | assocs opt_block_arg
		              {
            		    result = node :call_args, :assocs => val[0], :block_arg => val[1]
            		  }
		            | args ',' assocs opt_block_arg
		              {
            		    result = node :call_args, :args => val[0], :assocs => val[2], :block_arg => val[3]
            		  }
		            | block_arg
		              {
            		    result = node :call_args, :block_arg => val[0]
            		  }

    command_args: call_args

       block_arg: tAMPER arg_value
                  {
                    # puts "here for #{val[1]}"
                    # puts val[1]
                    result = self.node :block_arg, :arg => val[1]
                  }
                | '&' arg_value
                  {
                    # puts val[1]
                    result = self.node :block_arg, :arg => val[1]
                  }

   opt_block_arg: ',' block_arg
                  {
                    result = val[1]
                  }
		            | ','
		            | none

            args: arg_value
                  {
                    result = [val[0]]
                  }
		            | tSTAR arg_value
		              {
		                result = [node(:splat, :val => val[1])]
		              }
		            | args ',' arg_value
		              {
		                result = val[0] + [val[2]]
		              }
		            | args ',' tSTAR arg_value
		              {
		                result = val[0] + [node(:splat, :val => val[3])]
		              }

            mrhs: args ',' arg_value
		            | args ',' tSTAR arg_value
		            | tSTAR arg_value

         primary: literal
  	            | strings
  	            | xstring
  	            | regexp
  	            | words
  	            | qwords
                | tIDENTIFIER do_block
                  {
                    # if val[0].node == :self
                      # result = val[0]
                    # else
                      # HACK: this rule shouldnt even exist. But for now it must for "identifier do .. end"
                      result = node :call, :recv => nil, :meth => val[0], :brace_block => val[1]
                    # end
                  }
  	            | var_ref
  	            | backref
  	            | tFID
              	| k_begin bodystmt k_end
              	  {
              	    result = node :begin, :stmt => val[1]
              	  }
            		| tLPAREN_ARG expr rparen
            		| tLPAREN compstmt ')'
            		  {
            		    result = node :lparen, :stmt => val[1]
            		  }
            		| primary_value tCOLON2 tCONSTANT
            		  {
            		    result = node :colon2, :lhs => val[0], :rhs => val[2]
            		  }
            		| tCOLON3 tCONSTANT
            		  {
            		    result = node :colon3, :name => val[1]
            		  }
            		| tLBRACK aref_args ']'
            		  {
            		    result = node :array, :args => val[1]
            		  }
            		| tLBRACE assoc_list '}'
            		  {
            		    result = node :assoc_list, :list => val[1]
            		  }
            		| kRETURN
            		  {
            		    result = node :return
            		  }
            		| kYIELD '(' call_args rparen
            		  {
        	          result = node :yield, :call_args => val[2]
        	        }
            		| kYIELD '(' rparen
            		  {
        	          result = node :yield
        	        }
            		| kYIELD
            		  {
        	          result = node :yield
        	        }
            		| kDEFined opt_nl '(' expr rparen
            		| kNOT '(' expr rparen
            		| kNOT '(' rparen
            		| operation brace_block
            		  {
            		    result = node :call, :recv => nil, :meth => val[0], :brace_block => val[1]
            		  }
            		| method_call
            		  {
            		    # puts 2
            		  }
            		| method_call brace_block
            		  {
            		    val[0][:brace_block] = val[1]
            		    result = val[0]
            		  }
            		| tLAMBDA lambda
            		  {
            		    result = node :lambda, :args => val[1][:args], :body => val[1][:body]
            		  }
            		| k_if expr_value then compstmt if_tail k_end
            		  {
            		    result = self.node :if, :expr => val[1], :stmt => val[3], :tail => val[4]
            		  }
            		| k_unless expr_value then compstmt opt_else k_end
            		  {
            		    result = self.node :unless, :expr => val[1], :stmt => val[3], :tail => val[4]
            		  }
            		| k_while expr_value do compstmt k_end
            		  {
                    # puts "in node while"
            		    result = node :while, :expr => val[1], :stmt => val[3]
            		  }
            		| k_until expr_value do compstmt k_end
            		  {
            		    result = node :until, :expr => val[1], :stmt => val[3]
            		  }
            		| k_case expr_value opt_terms case_body k_end
            		  {
            		    result = node :case, :expr => val[1], :body => val[3]
            		  }
            		| k_case opt_terms case_body k_end
            		  {
            		    result = node :case, :expr => nil, :body => val[2]
            		  }
            		| k_for for_var kIN expr_value do compstmt k_end
            		| k_class cpath superclass bodystmt k_end
            		  {
            		    result = self.node_class(:cpath => val[1], :superclass => val[2], :bodystmt => val[3])
            		  }
            		| k_class tLSHFT expr term bodystmt k_end
            		  {
            		    result = node :class_shift, :expr => val[2], :bodystmt => val[4]
            		  }
            		| k_module cpath bodystmt k_end
            		  {
            		    result = self.node_module(:cpath => val[1], :body => val[2])
            		  }
            		| k_def fname f_arglist bodystmt k_end
            		  {
            		    result = self.node :def, :fname => val[1], :arglist => val[2], :bodystmt => val[3], :line_number => @current_def_linenumber
            		  }
            		| k_def singleton dot_or_colon fname f_arglist bodystmt k_end
            		  {
            		    result = self.node :def, :singleton => val[1], :fname => val[3], :arglist => val[4], :bodystmt => val[5], :line_number => @current_def_linenumber
            		  }
            		| kBREAK
            		  {
            		    result = node :break, :call_args => nil
            		  }
            		| kNEXT
            		  {
            		    result = node :next, :call_args => nil
            		  }
            		| kREDO
            		  {
            		    result = node :redo
            		  }
            		| kRETRY

   primary_value: primary

         k_begin: kBEGIN

            k_if: kIF

        k_unless: kUNLESS

         k_while: kWHILE
    
         k_until: kUNTIL
    
          k_case: kCASE
  
           k_for: kFOR
    
         k_class: kCLASS
    
        k_module: kMODULE
  
           k_def: kDEF
  
           k_end: kEND
  
            then: term
		            | kTHEN
		            | term kTHEN

              do: term
		            | kDO_COND
		            | kDO

         if_tail: opt_else
                  {
                    result = val[0]
                  }
              	| kELSIF expr_value then compstmt if_tail
              	  {
              	    result = [self.node(:elsif, :expr => val[1], :stmt => val[3])] + val[4]
              	  }

        opt_else: none
                  {
                    result = []
                  }
              	| kELSE compstmt
              	  {
              	    result = [self.node(:else, :stmt => val[1])]
              	  }

         for_var: lhs
              	| mlhs

          f_marg: f_norm_arg
              	| tLPAREN f_margs rparen

     f_marg_list: f_marg
  	            | f_marg_list ',' f_marg

         f_margs: f_marg_list
            		| f_marg_list ',' tSTAR f_norm_arg
            		| f_marg_list ',' tSTAR f_norm_arg ',' f_marg_list
            		| f_marg_list ',' tSTAR
            		| f_marg_list ',' tSTAR ',' f_marg_list
            		| tSTAR f_norm_arg
            		| tSTAR f_norm_arg ',' f_marg_list
            		| tSTAR
            		| tSTAR ',' f_marg_list

     block_param: f_arg ',' f_block_optarg ',' f_rest_arg opt_f_block_arg
  	            | f_arg ',' f_block_optarg ',' f_rest_arg ',' f_arg opt_f_block_arg
              	| f_arg ',' f_block_optarg opt_f_block_arg
              	| f_arg ',' f_block_optarg ',' f_arg opt_f_block_arg
              	| f_arg ',' f_rest_arg opt_f_block_arg
              	| f_arg ','
            		| f_arg ',' f_rest_arg ',' f_arg opt_f_block_arg
            		| f_arg opt_f_block_arg
            		| f_block_optarg ',' f_rest_arg opt_f_block_arg
            		| f_block_optarg ',' f_rest_arg ',' f_arg opt_f_block_arg
            		| f_block_optarg opt_f_block_arg
            		| f_block_optarg ',' f_arg opt_f_block_arg
            		| f_rest_arg opt_f_block_arg
            		| f_rest_arg ',' f_arg opt_f_block_arg
            		| f_block_arg

 opt_block_param: none
                  {
                    result = nil
                  }
              	| block_param_def

 block_param_def: '|' opt_bv_decl '|'
            		| tOROP
            		| '|' block_param opt_bv_decl '|'
            		  {
            		    result = val[1]
            		  }

     opt_bv_decl: none
              	| ';' bv_decls

        bv_decls: bvar
                | bv_decls ',' bvar

            bvar: tIDENTIFIER
            		| f_bad_arg

          lambda: f_larglist lambda_body
                  {
                    result = {:args => val[0], :body => val[1]}
                  }

      f_larglist: '(' f_args opt_bv_decl rparen
		            | f_args

     lambda_body: tLBRACE compstmt '}'
                  {
                    result = val[1]
                  }
            		| kDO_LAMBDA compstmt kEND
            		  {
            		    result = val[1]
            		  }

        do_block: kDO_BLOCK opt_block_param compstmt kEND
                | kDO opt_block_param compstmt kEND
                  {
                    result = node :brace_block, :params => val[1], :stmt => val[2]
                  }

      block_call: command do_block
                  {
                    val[0][:brace_block] = val[1]
                    result = val[0]
                  }
            		| block_call '.' operation2 opt_paren_args
            		| block_call tCOLON2 operation2 opt_paren_args

     method_call: operation paren_args
                  {
                    result = node :call, :recv => nil, :meth => val[0], :call_args => val[1]
                  }
              	| primary_value '.' operation2 opt_paren_args
              	  {
                    result = node :call, :recv => val[0], :meth => val[2], :call_args => val[3]
                  }
              	| primary_value tCOLON2 operation2 paren_args
              	  {
              	    result = node :tCOLON2call, :recv => val[0], :meth => val[2], :args => val[3]
              	    puts "tCOLON2call"
              	  }
            		| primary_value tCOLON2 operation3
            		  {
              	    result = node :tCOLON2call, :recv => val[0], :meth => val[2]
              	    puts "tCOLON2call.noargs."
              	  }
            		| primary_value '.' paren_args
            		| primary_value tCOLON2 paren_args
            		| kSUPER paren_args
            		  {
            		    result = node :super, :call_args => val[1], :paren => true
            		  }
            		| kSUPER
            		  {
            		    result = node :super, :call_args => nil, :inherit => true
            		  }
            		| primary_value '[' opt_call_args rbracket
            		  {
                    result = node :call, :recv => val[0], :meth => '[]', :call_args => val[2]
                  }


     brace_block: '{' opt_block_param compstmt '}'
                  {
            		    result = node :brace_block, :params => val[1], :stmt => val[2]
            		  }
            		| kDO opt_block_param compstmt kEND
            		  {
            		    result = node :brace_block, :params => val[1], :stmt => val[2]
            		  }

       case_body: kWHEN args then compstmt cases
                  {
                    result = [node(:when, :args => val[1], :stmt => val[3])] + val[4]
                  }

           cases: opt_else
                  {
                    result = val[0]
                  }
              	| case_body

      opt_rescue: kRESCUE exc_list exc_var then compstmt opt_rescue
                  {
                    result = node :rescue, :list => val[1], :var => val[2], :stmt => val[4], :opt_rescue => val[5]
                    # puts result
                  }
            		| none
            		  {
            		    result = nil
            		  }

        exc_list: arg_value
                  {
                    result = val[0]
                  }
            		| mrhs
            		  {
            		    result = val[0]
            		  }
            		| none
            		  {
            		    result = nil
            		  }

         exc_var: tASSOC lhs
                  {
                    result = val[1]
                  }
            		| none
            		  {
            		    result = nil
            		  }

      opt_ensure: kENSURE compstmt
                  {
                    result = val[1]
                  }
            		| none
            		  {
            		    result = nil
            		  }

         literal: numeric
              	| symbol
            		| dsym

         strings: string

          string: tCHAR
  	            | string1
              	| string string1

         string1: tSTRING_BEG string_contents tSTRING_END
                  {
                    result = node :string, :value => val[1], :beg => val[0]
                  }  

         xstring: tXSTRING_BEG xstring_contents tXSTRING_END
                  {
                    result = node :xstring, :value => val[1]
                  }

          regexp: tREGEXP_BEG xstring_contents tREGEXP_END
                  {
                    result = node :regexp, :value => val[1], :flags => val[2]
                  }

           words: tWORDS_BEG ' ' tSTRING_END
            		| tWORDS_BEG word_list tSTRING_END
            		  {
            		    result = node :words, :list => val[1]
            		  }

       word_list: /* none */
                  {
                    result = []
                  }
            		| word_list word
            		  {
            		    result = val[0] + [val[1]]
            		  }

            word: string_content
                  {
                    result = [val[0]]
                  }
            		| word string_content
                  {
                    result = val[0] + [val[1]]
                  }
                  
          qwords: tQWORDS_BEG ' ' tSTRING_END
            		| tQWORDS_BEG qword_list tSTRING_END

      qword_list:
                  {
                    # none..
                    result = []
                  }
              	| qword_list tSTRING_CONTENT ' '

 string_contents: 
                  {
                    # none..
                    result = []
                  }
            		| string_contents string_content
            		  {
            		    result = val[0] + [val[1]]
            		  }

xstring_contents: 
                  {
                    # none..
                    result = []
                  }
              	| xstring_contents string_content
              	  {
            		    result = val[0] + [val[1]]
            		  }

  string_content: tSTRING_CONTENT
                  {
                    result = node :string_content, :value => val[0]
                  }
              	| tSTRING_DVAR string_dvar
              	  {
                    result = node :string_dvar, :value => val[1]
                  }
              	| tSTRING_DBEG compstmt '}'
              	  {
                    result = node :string_dbeg, :value => val[1]
                  }

     string_dvar: tGVAR
            		| tIVAR
            		| tCVAR
            		| backref

          symbol: tSYMBEG sym
                  {
                    result = node :symbol, :name => val[1]
                  }

             sym: fname
              	| tIVAR
              	| tGVAR
              	| tCVAR

            dsym: tSYMBEG xstring_contents tSTRING_END
                  {
                    result = node :dsym, :contents => val[1]
                  }

         numeric: tINTEGER
                  {
                    result = node :numeric, :value => val[0], :float => false
                  }
              	| tFLOAT
              	  {
                    result = node :numeric, :value => val[0], :float => true
                  }
              	| tUMINUS_NUM tINTEGER
            		| tUMINUS_NUM tFLOAT

        variable: tIDENTIFIER
                  {
                    
                    result = node :identifier, :name => val[0]
                  }
            		| tIVAR
            		  {
                    result = node :ivar, :name => val[0]
                  }
            		| tGVAR
            		  {
                    result = node :gvar, :name => val[0]
                  }
            		| tCONSTANT
            		  {
                    result = node :constant, :name => val[0]
                  }
            		| tCVAR
            		  {
                    result = node :cvar, :name => val[0]
                  }
            		| kNIL
            		  {
                    result = node :nil, :name => val[0]
                  }
            		| kSELF
            		  {
                    result = node :self, :name => val[0]
                  }
            		| kTRUE
            		  {
                    result = node :true, :name => val[0]
                  }
            		| kFALSE
            		  {
                    result = node :false, :name => val[0]
                  }
            		| k__FILE__
            		  {
                    result = node :__FILE__, :name => val[0]
                  }
            		| k__LINE__
            		  {
                    result = node :__LINE__, :name => val[0]
                  }
            		| k__ENCODING__
            		  {
                    result = node :__ENCODING__, :name => val[0]
                  }
                | kBLOCK_GIVEN
                  {
                    # added for block_given? support.. :D
                    result = node :block_given, :name => val[0]
                  }

         var_ref: variable

         var_lhs: variable

         backref: tNTH_REF
  	            | tBACK_REF

      superclass: term
                  {
                    result = nil
                  }
            		| '<' expr_value term
            		  {
            		    result = node :superclass, :expr => val[1]
            		  }
            		| error term { puts 'OMFG' }

       f_arglist: '(' f_args rparen
                  {
                    result = val[1]
                    self.lex_state = :EXPR_BEG
                  }
              	| f_args term
              	  {
                    result = val[0]
                    self.lex_state = :EXPR_BEG
                  }

          f_args: f_arg ',' f_optarg ',' f_rest_arg opt_f_block_arg
                  {
                    result = node_args(val[0], val[2], val[4], nil, val[5])
             		  }
              	| f_arg ',' f_optarg ',' f_rest_arg ',' f_arg opt_f_block_arg
              	  {
             		    result = node_args(val[0], val[2], val[4], val[6], val[7])
             		  }
              	| f_arg ',' f_optarg opt_f_block_arg
              	  {
              	    result = node_args(val[0], val[2], nil, nil, val[3])
              	  }
            		| f_arg ',' f_optarg ',' f_arg opt_f_block_arg
            		  {
            		    result = node_args(val[0], val[2], nil, val[4], val[5])
              	  }
            		| f_arg ',' f_rest_arg opt_f_block_arg
            		  {
            		    result = node_args(val[0], nil, val[2], nil, val[3])
            		  }
             		| f_arg ',' f_rest_arg ',' f_arg opt_f_block_arg
             		  {
            		    result = node_args(val[0], nil, val[2], val[4], val[5])
            		  }
             		| f_arg opt_f_block_arg
             		  {
             		    result = node_args(val[0], nil, nil, nil, val[1])
             		  }
            		| f_optarg ',' f_rest_arg opt_f_block_arg
            		  {
            		    result = node_args(nil, val[0], val[2], nil, val[3])
            		  }
            		| f_optarg ',' f_rest_arg ',' f_arg opt_f_block_arg
            		  {
            		    result = node_args(nil, val[0], val[2], val[4], val[5])
            		  }
             		| f_optarg opt_f_block_arg
             		  {
             		    result = node_args(nil, val[0], nil, nil, val[1])
             		  }
            		| f_optarg ',' f_arg opt_f_block_arg
            		  {
             		    result = node_args(nil, val[0], nil, val[2], val[3])
             		  }
              	| f_rest_arg opt_f_block_arg
            	    {
             		    result = node_args(nil, nil, val[0], nil, val[1])
             		  }
            		| f_rest_arg ',' f_arg opt_f_block_arg
            		  {
             		    result = node_args(nil, nil, val[0], val[2], val[3])
             		  }
            		| f_block_arg
            		  {
             		    result = node_args(nil, nil, nil, nil, val[0])
             		  }
              	| # none ..
              	  {
              	    result = node_args(nil, nil, nil, nil, nil)
              	  }

       f_bad_arg: tCONSTANT
              	| tIVAR
              	| tGVAR
              	| tCVAR

      f_norm_arg: f_bad_arg
              	| tIDENTIFIER
              	  {
                    # result = val[0]
              	    result = node :norm_arg, :value => val[0]
              	  }
              	| tIDENTIFIER tASSOC tIDENTIFIER
                  {
                  
                  }
                | tLABEL tIDENTIFIER
                  {
                    result = node :label_arg, :name => val[0], :value => val[1]
                  }

      f_arg_item: f_norm_arg
                  {
                    result = val[0]
                  }
            		| tLPAREN f_margs rparen

           f_arg: f_arg_item
                  {
                    result = [val[0]]
                  }
            		| f_arg ',' f_arg_item
            		  {
                    # val[0] + val[2]
                    result = val[0] + [val[2]]
            		  }

           f_opt: tIDENTIFIER '=' arg_value
                  {
                    result = [val[0], val[2]]
                  }

     f_block_opt: tIDENTIFIER '=' primary_value

  f_block_optarg: f_block_opt
            		| f_block_optarg ',' f_block_opt

        f_optarg: f_opt
                  {
                    result = [val[0]]
                  }
            		| f_optarg ',' f_opt
            		  {
            		    result = val[0] + [val[2]]
            		  }

    restarg_mark: '*'
  	            | tSTAR

      f_rest_arg: restarg_mark tIDENTIFIER
                  {
                    result = val[1]
                  }
              	| restarg_mark

     blkarg_mark: '&'
              	| tAMPER

     f_block_arg: blkarg_mark tIDENTIFIER
                  {
                    result = val[1]
                  }
                | tLABEL blkarg_mark tIDENTIFIER
                  {
                    result = node :label_arg, :name => val[0], :value => val[1]
                  }

 opt_f_block_arg: ',' f_block_arg
                  {
                    result = val[1]
                  }
            		| none

       singleton: var_ref
            		| '(' expr rparen

      assoc_list: none
                  {
                    result = []
                  }
              	| assocs trailer
              	  {
              	    result = val[0]
              	  }

          assocs: assoc
                  {
                    result = [val[0]]
                  }
            		| assocs ',' assoc
            		  {
            		    result = val[0] + [val[2]]
            		  }

           assoc: arg_value tASSOC arg_value
                  {
                    result = node :assoc, :key => val[0], :value => val[2]
                  }
                | tLABEL arg_value
                  {
                    result = node :label_assoc, :key => val[0], :value => val[1]
                  }

       operation: tIDENTIFIER
              	| tCONSTANT
              	| tFID

      operation2: tIDENTIFIER
                  {
                    
                  }
              	| tCONSTANT
              	| tFID
              	| op

      operation3: tIDENTIFIER
                  {
                    puts 4
                  }
              	| tFID
              	| op

    dot_or_colon: '.'
            		| tCOLON2

       opt_terms: 
              	| terms

          opt_nl: /* none */
              	| '\n'

          rparen: opt_nl ')'

        rbracket: opt_nl ']'

         trailer: /* none */
              	| '\n'
              	| ','

            term: ';'
              	| '\n'

           terms: term
              	| terms ';'

            none:
            
end

---- header ----

# require 'ctokenizer'
require 'strscan'

---- inner ----


---- footer ----
