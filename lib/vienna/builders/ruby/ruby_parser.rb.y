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

  prechigh
  	nonassoc tLOWEST
    nonassoc tLBRACE_ARG

    nonassoc  kIF_MOD kUNLESS_MOD kWHILE_MOD kUNTIL_MOD
    left  kOR kAND
    right kNOT
    nonassoc kDEFined
    right '=' tOP_ASGN
    left kRESCUE_MOD
    right '?' ':'
    nonassoc tDOT2 tDOT3
    left  tOROP
    left  tANDOP
    nonassoc  tCMP tEQ tEQQ tNEQ tMATCH tNMATCH
    left  '>' tGEQ '<' tLEQ
    left  '|' '^'
    left  '&'
    left  tLSHFT tRSHFT
    left  '+' '-'
    left  '*' '/' '%'
    right tUMINUS_NUM tUMINUS
    right tPOW
    right '!' '~' tUPLUS
	preclow
	  
  token kCLASS kMODULE kDEF kUNDEF kBEGIN kRESCUE kENSURE kEND kIF kUNLESS
  token kTHEN kELSIF kELSE kCASE kWHEN kWHILE kUNTIL kFOR kBREAK kNEXT
  token kREDO kRETRY kIN kDO kDO_COND kDO_BLOCK kDO_LAMBDA kRETURN kYIELD
  token kSUPER kSELF kNIL kTRUE kFALSE kAND kOR kNOT kIF_MOD kUNLESS_MOD
  token kWHILE_MOD kUNTIL_MOD kRESCUE_MOD kALIAS kDEFINED klBEGIN klEND
  token k__LINE__ k__FILE__ k__ENCODING__

  token tIDENTIFIER tFID tGVAR tIVAR tCONSTANT tCVAR tLABEL tINTEGER tFLOAT
  token tSTRING_CONTENT tCHAR tNTH_REF tBACK_REF tREGEXP_END tUPLUS tUMINUS
  token tPOW tCMP tEQ tEQQ tNEQ tGEQ tLEQ tANDOP tOROP tMATCH tNMATCH	tDOT2
  token tDOT3 tAREF tASET tLSHFT tRSHFT tCOLON2 tCOLON3 tOP_ASGN tASSOC
  token tLPAREN	tLPAREN_ARG	tRPAREN tLBRACK tLBRACE tLBRACE_ARG tSTAR tAMPER
  token tLAMBDA tSYMBEG tSTRING_BEG tXSTRING_BEG tREGEXP_BEG tWORDS_BEG
  token tQWORDS_BEG tSTRING_DBEG tSTRING_DVAR tSTRING_END tLAMBEG tUMINUS_NUM
	

rule

          target: program
			
         program:
                  {
                    self.lex_state = :EXPR_BEG
                  }
                top_compstmt
                  {
                    result = val[0]
                    puts "result///"
                    puts result
                  }

    top_compstmt: top_stmts opt_terms

       top_stmts: none
                | top_stmt
                | top_stmts terms top_stmt
                | error top_stmt

        top_stmt: stmt
  	            | kBEGIN

        bodystmt: compstmt opt_rescue opt_else opt_ensure

        compstmt:
                # none opt_terms
        stmts opt_terms

           stmts: none
                | stmt
		            | stmts terms stmt
		            | error stmt

            stmt: kALIAS fitem
                  {
                    self.lex_state = :EXPR_FNAME
                  }
                  fitem
                  {
                    
                  }
            		| kALIAS tGVAR tGVAR
            		| kALIAS tGVAR tBACK_REF
            		| kALIAS tGVAR tNTH_REF
            		| kUNDEF undef_list
            		| stmt kIF_MOD expr_value
            		| stmt kUNLESS_MOD expr_value
            		| stmt kWHILE_MOD expr_value
            		| stmt kUNTIL_MOD expr_value
            		| stmt kRESCUE_MOD stmt
                | klEND '{' compstmt '}'
            		| lhs '=' command_call
            		  {
            		    result = self.node_assign(val[0], val[2])
            		  }
            		| mlhs '=' command_call
            		| var_lhs tOP_ASGN command_call
            		| primary_value '[' opt_call_args rbracket tOP_ASGN command_call
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
              	| expr kOR expr
              	| kNOT opt_nl expr
              	| '!' command_call
              	| arg

      expr_value: expr

    command_call: command
              	| block_command
              	| kRETURN call_args
            	  | kBREAK call_args
            	  | kNEXT call_args

   block_command: block_call
             	  | block_call '.' operation2 command_args
                | block_call tCOLON2 operation2 command_args

 cmd_brace_block: tLBRACE_ARG opt_block_param compstmt '}'

         command: operation command_args
        	      | operation command_args cmd_brace_block
        	      | primary_value '.' operation2 command_args
        	      | primary_value '.' operation2 command_args cmd_brace_block
        	      | primary_value tCOLON2 operation2 command_args
      		      | primary_value tCOLON2 operation2 command_args cmd_brace_block
      		      | kSUPER command_args
        	      | kYIELD command_args

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
            		| primary_value '.' tIDENTIFIER
            		| primary_value tCOLON2 tIDENTIFIER
            		| primary_value '.' tCONSTANT
            		| primary_value tCOLON2 tCONSTANT
            		| tCOLON3 tCONSTANT
            		| backref

           cname: tIDENTIFIER
                  {
                    puts 'ERROR: cant use identifier for class/mod name'
                  }
            		| tCONSTANT
            		  {
            		    return val[0]
            		  }

           cpath: tCOLON3 cname
                  {
                    
                  }
  	            | cname
  	              {
  	                return node_generic :path, :cname => val[0]
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
            		| kWHILE             | kUNTIL

             arg: lhs '=' arg
            		| lhs '=' arg kRESCUE_MOD arg
            		| var_lhs tOP_ASGN arg
            		| var_lhs tOP_ASGN arg kRESCUE_MOD arg
            		| primary_value '[' opt_call_args rbracket tOP_ASGN arg
            		| primary_value '.' tIDENTIFIER tOP_ASGN arg
            		| primary_value '.' tCONSTANT tOP_ASGN arg
            		| primary_value tCOLON2 tIDENTIFIER tOP_ASGN arg
            		| primary_value tCOLON2 tCONSTANT tOP_ASGN arg
            		| tCOLON3 tCONSTANT tOP_ASGN arg
            		| backref tOP_ASGN arg
            		| arg tDOT2 arg
            		| arg tDOT3 arg
            		| arg '+' arg
            		| arg '-' arg
            		| arg '*' arg
            		| arg '/' arg
            		| arg '%' arg
            		| arg tPOW arg
            		| tUMINUS_NUM tINTEGER tPOW arg
            		| tUMINUS_NUM tFLOAT tPOW arg
            		| tUPLUS arg
            		| tUMINUS arg
            		| arg '|' arg
            		| arg '^' arg
            		| arg '&' arg
            		| arg tCMP arg
            		| arg '>' arg
            		| arg tGEQ arg
            		| arg '<' arg
            		| arg tLEQ arg
            		| arg tEQ arg
            		| arg tEQQ arg
            		| arg tNEQ arg
            		| arg tMATCH arg
            		| arg tNMATCH arg
            		| '~' arg
            		| arg tLSHFT arg
            		| arg tRSHFT arg
            		| arg tANDOP arg
            		| arg tOROP arg
            		| kDEFined opt_nl arg
            		| arg '?' arg opt_nl ':' arg
            		| primary

       arg_value: arg

       aref_args: none
              	| args trailer
            		| args ',' assocs trailer
            		| assocs trailer

      paren_args: '(' opt_call_args rparen

  opt_paren_args: none
  	            | paren_args

   opt_call_args: none
  	            | call_args

       call_args: command
            		| args opt_block_arg
		            | assocs opt_block_arg
		            | args ',' assocs opt_block_arg
		            | block_arg

    command_args: call_args

       block_arg: tAMPER arg_value

   opt_block_arg: ',' block_arg
		            | ','
		            | none

            args: arg_value
		            | tSTAR arg_value
		            | args ',' arg_value
		            | args ',' tSTAR arg_value

            mrhs: args ',' arg_value
		            | args ',' tSTAR arg_value
		            | tSTAR arg_value

         primary: literal
  	            | strings
  	            | xstring
  	            | regexp
  	            | words
  	            | qwords
  	            | var_ref
  	            | backref
  	            | tFID
              	| k_begin bodystmt k_end
            		| tLPAREN_ARG expr rparen
            		| tLPAREN compstmt ')'
            		| primary_value tCOLON2 tCONSTANT
            		| tCOLON3 tCONSTANT
            		| tLBRACK aref_args ']'
            		| tLBRACE assoc_list '}'
            		| kRETURN
            		| kYIELD '(' call_args rparen
            		| kYIELD '(' rparen
            		| kYIELD
            		| kDEFined opt_nl '(' expr rparen
            		| kNOT '(' expr rparen
            		| kNOT '(' rparen
            		| operation brace_block
            		| method_call
            		| method_call brace_block
            		| tLAMBDA lambda
            		| k_if expr_value then compstmt if_tail k_end
            		| k_unless expr_value then compstmt opt_else k_end
            		| k_while expr_value do compstmt k_end
            		| k_until expr_value do compstmt k_end
            		| k_case expr_value opt_terms case_body k_end
            		| k_case opt_terms case_body k_end
            		| k_for for_var kIN expr_value do compstmt k_end
            		| k_class cpath superclass bodystmt k_end
            		  {
            		    result = self.node_class(:cpath => val[1], :superclass => val[2], :bodystmt => val[3])
            		  }
            		| k_class tLSHFT expr term bodystmt k_end
            		| k_module cpath bodystmt k_end
            		  {
                    # result = self.node_module(val[1], val[2])
            		    result = self.node_module(:cpath => val[1], :body => val[2])
            		  }
            		| k_def fname f_arglist bodystmt k_end
            		  {
            		    result = self.node_def(val[1], val[2], val[3])
            		  }
            		| k_def singleton dot_or_colon fname f_arglist bodystmt k_end
            		  {
            		    result = self.node_defs(val[1], val[3], val[4], val[5])
            		  }
            		| kBREAK
            		| kNEXT
            		| kREDO
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

         if_tail: opt_else
              	| kELSIF expr_value then compstmt if_tail

        opt_else: none
              	| kELSE compstmt

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
              	| block_param_def

 block_param_def: '|' opt_bv_decl '|'
            		| tOROP
            		| '|' block_param opt_bv_decl '|'

     opt_bv_decl: none
              	| ';' bv_decls

        bv_decls: bvar
                | bv_decls ',' bvar

            bvar: tIDENTIFIER
            		| f_bad_arg

          lambda: f_larglist lambda_body

      f_larglist: '(' f_args opt_bv_decl rparen
		            | f_args

     lambda_body: tLAMBEG compstmt '}'
            		| kDO_LAMBDA compstmt kEND

        do_block: kDO_BLOCK opt_block_param compstmt kEND

      block_call: command do_block
            		| block_call '.' operation2 opt_paren_args
            		| block_call tCOLON2 operation2 opt_paren_args

     method_call: operation paren_args
              	| primary_value '.' operation2 opt_paren_args
              	| primary_value tCOLON2 operation2 paren_args
            		| primary_value tCOLON2 operation3
            		| primary_value '.' paren_args
            		| primary_value tCOLON2 paren_args
            		| kSUPER paren_args
            		| kSUPER
            		| primary_value '[' opt_call_args rbracket

     brace_block: '{' opt_block_param compstmt '}'
            		| kDO opt_block_param compstmt kEND

       case_body: kWHEN args then compstmt cases

           cases: opt_else
              	| case_body

      opt_rescue: kRESCUE exc_list exc_var then compstmt opt_rescue
            		| none

        exc_list: arg_value
            		| mrhs
            		| none

         exc_var: tASSOC lhs
            		| none

      opt_ensure: kENSURE compstmt
            		| none

         literal: numeric
              	| symbol
            		| dsym

         strings: string

          string: tCHAR
  	            | string1
              	| string string1

         string1: tSTRING_BEG string_contents tSTRING_END

         xstring: tXSTRING_BEG xstring_contents tSTRING_END

          regexp: tREGEXP_BEG xstring_contents tREGEXP_END

           words: tWORDS_BEG ' ' tSTRING_END
            		| tWORDS_BEG word_list tSTRING_END

       word_list: /* none */
            		| word_list word ' '

            word: string_content
            		| word string_content

          qwords: tQWORDS_BEG ' ' tSTRING_END
            		| tQWORDS_BEG qword_list tSTRING_END

      qword_list: /* none */
              	| qword_list tSTRING_CONTENT ' '

 string_contents: /* none */
            		| string_contents string_content

xstring_contents: /* none */
              	| xstring_contents string_content

  string_content: tSTRING_CONTENT
              	| tSTRING_DVAR string_dvar
              	| tSTRING_DBEG compstmt '}'

     string_dvar: tGVAR
            		| tIVAR
            		| tCVAR
            		| backref

          symbol: tSYMBEG sym

             sym: fname
              	| tIVAR
              	| tGVAR
              	| tCVAR

            dsym: tSYMBEG xstring_contents tSTRING_END

         numeric: tINTEGER
              	| tFLOAT
              	| tUMINUS_NUM tINTEGER
            		| tUMINUS_NUM tFLOAT

        variable: tIDENTIFIER
            		| tIVAR
            		| tGVAR
            		| tCONSTANT
            		| tCVAR
            		| kNIL
            		| kSELF
            		| kTRUE
            		| kFALSE
            		| k__FILE__
            		| k__LINE__
            		| k__ENCODING__

         var_ref: variable

         var_lhs: variable

         backref: tNTH_REF
  	            | tBACK_REF

      superclass: term
            		| '<' expr_value term
            		| error term { puts 'OMFG' }

       f_arglist: '(' f_args rparen
                  {
                    self.lex_state = :EXPR_BEG
                  }
              	| f_args term
              	  {
                    puts 'so, yteah, done this'
                    self.lex_state = :EXPR_BEG
                  }

          f_args: f_arg ',' f_optarg ',' f_rest_arg opt_f_block_arg
              	| f_arg ',' f_optarg ',' f_rest_arg ',' f_arg opt_f_block_arg
              	| f_arg ',' f_optarg opt_f_block_arg
            		| f_arg ',' f_optarg ',' f_arg opt_f_block_arg
            		| f_arg ',' f_rest_arg opt_f_block_arg
             		| f_arg ',' f_rest_arg ',' f_arg opt_f_block_arg
             		| f_arg opt_f_block_arg
            		| f_optarg ',' f_rest_arg opt_f_block_arg
            		| f_optarg ',' f_rest_arg ',' f_arg opt_f_block_arg
             		| f_optarg opt_f_block_arg
            		| f_optarg ',' f_arg opt_f_block_arg
              	| f_rest_arg opt_f_block_arg
            		| f_rest_arg ',' f_arg opt_f_block_arg
            		| f_block_arg
              	| /* none */

       f_bad_arg: tCONSTANT
              	| tIVAR
              	| tGVAR
              	| tCVAR

      f_norm_arg: f_bad_arg
              	| tIDENTIFIER

      f_arg_item: f_norm_arg
            		| tLPAREN f_margs rparen

           f_arg: f_arg_item
            		| f_arg ',' f_arg_item

           f_opt: tIDENTIFIER '=' arg_value

     f_block_opt: tIDENTIFIER '=' primary_value

  f_block_optarg: f_block_opt
            		| f_block_optarg ',' f_block_opt

        f_optarg: f_opt
            		| f_optarg ',' f_opt

    restarg_mark: '*'
  	            | tSTAR

      f_rest_arg: restarg_mark tIDENTIFIER
              	| restarg_mark

     blkarg_mark: '&'
              	| tAMPER

     f_block_arg: blkarg_mark tIDENTIFIER

 opt_f_block_arg: ',' f_block_arg
            		| none

       singleton: var_ref
            		| '(' expr rparen

      assoc_list: none
              	| assocs trailer

          assocs: assoc
            		| assocs ',' assoc

           assoc: arg_value tASSOC arg_value
                | tLABEL arg_value

       operation: tIDENTIFIER
              	| tCONSTANT
              	| tFID

      operation2: tIDENTIFIER
              	| tCONSTANT
              	| tFID
              	| op

      operation3: tIDENTIFIER
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
