
%token tCONSTANT
%token '.'

// %left '+' '-'
// %left '*' '/'
// %left '^'
// %left UMINUS

%prechigh
%nonassoc tLOWEST
%nonassoc tLBRACE_ARG
    
%left  tLSHFT tRSHFT
%nonassoc  kIF_MOD kUNLESS_MOD kWHILE_MOD kUNTIL_MOD
%left  kOR kAND
%right kNOT
%nonassoc kDEFined
%right '=' tOP_ASGN
%left kRESCUE_MOD
%right '?' ':'
%nonassoc tDOT2 tDOT3
%left  tOROP
%left  tANDOP
%nonassoc  tCMP tEQ tEQQ tNEQ tMATCH tNMATCH
%left  '>' tGEQ '<' tLEQ
%left  '|' '^'
%left  '&'
%left  '+' '-'
%left  '*' '/' '%'
%right tUMINUS_NUM tUMINUS
%right tPOW
%right '!' '~' tUPLUS
%preclow

%%

S
                : program EOF
                  {{
                   ruby_parser.__result = $1;
                   $$ = $1;
                  }}
                ;

         program: top_compstmt { $$ = $1; }
                ;
                  
    top_compstmt: top_stmts opt_terms { $$ = $1; }
                ;

       top_stmts: none
                  {{ $$ = []; }}
                | top_stmt
                  {{ $$ = [$1]; }}
                | top_stmts terms top_stmt
                  {{ $1.push($3); $$ = $1; }}
                ;
        
        bodystmt: compstmt opt_rescue opt_else opt_ensure
                  {{ $$ = { type:'bodystmt', stmt:$1, rescue:$2, _else:$3}; }}
                ;
        
        compstmt: stmts opt_terms {{ $$ = $1; }}
                ;
        
       opt_terms: { $$ = null; }
                | terms { $$ = null; }
                ;
      
      opt_rescue: { $$ = null; }
                ;
        
        opt_else: { $$ = null; }
                ;
        
      opt_ensure: { $$ = null; }
                ;
                
        top_stmt: stmt
                ;
            
           stmts: none {{ $$ = []; }}
                | stmt {{ $$ = [$1]; }}
                | stmts terms stmt   {{ $$ = $1; $$.push($3); }}
                ;
                
            stmt: stmt kIF_MOD expr
                  {{
                    $$ = { type:'if_mod', stmt:$1, expr:$3 };
                  }}
                | stmt kUNLESS_MOD expr
                  {{
                    $$ = { type:'unless_mod', stmt:$1, expr:$3 };
                  }}
                | expr
                ;
            
            expr: command_call
                | arg
                ;
            
             arg: variable '=' arg
                  {{
                    $$ = { type:'assign', lhs:$1, rhs:$3 };
                  }}
                | arg tDOT2 arg
                  {{
                    $$ = { type:'dot2', start:$1, ending:$3 };
                  }}
                | arg tDOT3 arg
                  {{
                    $$ = { type:'dot3', start:$1, ending:$3 };
                  }}
                | arg '+' arg
                  {{
                    $$ = { type:'opt_plus', lhs:$1, rhs:$3 };
                  }}
                | arg '-' arg
                  {{
                    $$ = { type:'opt_minus', lhs:$1, rhs:$3 };
                  }}
                | arg '*' arg
                  {{
                    $$ = { type:'opt_mult', lhs:$1, rhs:$3 };
                  }}
                | arg '/' arg
                  {{
                    $$ = { type:'opt_div', lhs:$1, rhs:$3 };
                  }}
                | primary
                ;
            
             lhs: variable
                | backref
                ;
          
         backref: tNTH_REF
                ;
                
          string: tSTRING_BEG string_contents tSTRING_END
                  {{
                    $$ = { type:'string', value:$2 }
                  }}
                ;
    
 string_contents: none
                  {{
                    $$ = [];
                  }}
                | string_contents string_content
                  {{
                    $$ = $1; $1.push($2);
                  }}
                ;
  
  string_content: tSTRING_CONTENT
                  {{
                    $$ = { type:'string_content', value:yytext };
                  }}
                | tSTRING_DBEG compstmt '}'
                  {{
                    $$ = { type:'string_dbeg', value:$2 };
                  }}
                ;
          
         xstring: tXSTRING_BEG xstring_contents tXSTRING_END
                  {{
                    $$ = { type:'xstring', value:$2 };
                  }}
                ;
      
xstring_contents: none
                  {{
                    $$ = [];
                  }}
                | xstring_contents string_content
                  {{
                    $$ = $1; $$.push($2);
                  }}
                ;
        
          regexp: tREGEXP_BEG xstring_contents tREGEXP_END
                  {{
                    $$ = { type:'regexp', value:$2 };
                  }}
                ;
            
         primary: literal
                | string
                | xstring
                | regexp
                | variable
                | method_call
                | method_call brace_block
                | primary tCOLON2 oper_constant
                  {{
                    $$ = { type:'colon2', lhs:$1, rhs:$3 };
                  }}
                | tCOLON3 oper_constant
                  {{
                    $$ = { type:'colon3', name:$2 };
                  }}
                | kIF expr then compstmt if_tail kEND
                  {{
                    $$ = { type:'if', expr:$2, stmt:$4, tail:$5 };
                  }}
                | kCASE expr opt_terms case_body kEND
                  {{
                    $$ = { type:'case', expr:$2, body:$4 };
                  }}
                | kCASE opt_terms case_body kEND
                  {{
                    $$ = { type:'case', expr:null, body:$3 };
                  }}
                | kCLASS cpath superclass bodystmt kEND
                  {{
                    $$ = { type:'class', cpath:$2, superclass:$3, bodystmt:$4 };
                  }}
                | kMODULE cpath bodystmt kEND
                  {{
                    $$ = { type:'module', cpath:$2, bodystmt:$3 };
                  }}
                | kDEF fname f_arglist bodystmt kEND
                  {{
                    $$ = { type:'def', fname:$2, arglist:$3, bodystmt:$4};
                  }}
                | kDEF singleton dot_or_colon fname f_arglist bodystmt kEND
                  {{
                    $$ = { type:'def', singleton:$2, fname:$4, arglist:$5, bodystmt:$6};
                  }}
                | tLBRACK aref_args ']'
                  {{
                    $$ = { type:'array', args:$2 };
                  }}
                | kYIELD '(' call_args ')'
                  {{
                    $$ = { type:'yield', call_args:$3 };
                  }}
                | kYIELD '(' ')'
                  {{
                    $$ = { type:'yield' };
                  }}
                | kYIELD
                  {{
                    $$ = { type:'yield' };
                  }}
                ;
                
       aref_args: none
                | args
                ;
      
       singleton: variable
                | '(' expr ')'
                ;
      
    dot_or_colon: '.'
                | tCOLON2
                ;
        
       f_arglist: '(' f_args ')'
                | f_args term
                ;
          
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
              	| none
                ;
                
           f_arg: f_arg_item
                | f_arg ',' f_arg_item
                ;
    
 opt_f_block_arg: none
                | ',' f_block_arg
                ;
    
f_block_arg_name: tIDENTIFIER
                ;

     f_block_arg: blkarg_mark f_block_arg_name
                ;
     
     blkarg_mark: '&'
                | tAMPER
                ;
    
                
      f_arg_item: tIDENTIFIER
                ;
                
     brace_block: '{' opt_block_param compstmt '}'
                | kDO opt_block_param compstmt kEND
                ;
    
 opt_block_param: none
                ;
            
         if_tail: opt_else {{ $$ = $1; }}
                | kELSIF expr then compstmt if_tail
                  {{
                    $$ = [{ type:'elsif', expr:$2, stmt:$4 }]; $$.push($5);
                  }}
                ;
        
        opt_else: none
                  {{
                    $$ = [];
                  }}
                | kELSE compstmt
                  {{
                    $$ = { type:'else', stmt:$2 };
                  }}
                ;
       
       case_body: kWHEN args then compstmt cases
                ;
          
           cases: opt_else
                | case_body
                ;
          
            then: term
                | kTHEN
                | term kTHEN
                ;
            
            args: arg {{ $$ = [$1]; }}
                | tSTAR arg {{ $$ = [{ type:'splat', val:$2 }]; }}
                | args ',' arg {{ $$ = $1; $$.push($3); }}
                | args ',' tSTAR arg 
                  {{
                    $$ = $1; $$.push([{ type:'splat', val:$4 }]);
                  }}
                ;
      
    command_call: command
                | block_command
                | kYIELD call_args
                  {{
                    $$ = { type:'yield' };
                  }}
                ;
      
         command: primary call_args
                  {{
                    $$ = { type:'call', recv:nil, meth:$1, call_args:$2};
                  }}
                | primary '.' operation2 call_args
                | primary '.' operation2 call_args cmd_brace_block
                | primary tCOLON2 operation2 call_args
                | primary tCOLON2 operation2 call_args cmd_brace_block
                | kSUPER call_args
                | kYIELD call_args
                ;
      
   block_command: block_call
                ;
    
      block_call: command do_block
                ;
                
        do_block: kDO opt_block_param compstmt kEND
                  {{ 
                    $$ = 101010102341;
                  }}
                ;
    
 opt_block_param: none
                ;
    
 cmd_brace_block: '{' '}'
                ;
                
     method_call: operation paren_args
                | primary '.' operation2 opt_paren_args
                  {{ 
                    $$ = { type:'call', recv:$1, meth:$3 }
                  }}
                ;
       
       operation: tIDENTIFIER
                  {{
                    $$ = { type:'identifier', name:yytext };
                  }}
                | tCONSTANT
                  {{
                    $$ = { type:'constant', name:yytext };
                  }}
                ;
   
      operation2: tIDENTIFIER 
                  {{ 
                    $$ = { type:'identifier', name:yytext };
                  }}
                ;
    
   oper_constant: tCONSTANT {{ $$ = yytext; }}
                ;
      
  opt_paren_args: none
                | paren_args
                ;
      
      paren_args: '(' opt_call_args ')'
                ;
      
   opt_call_args: none
                | call_args
                ;
      
       call_args: command
                  {{
                    $$ = { type:'call_args', args:[$1] };
                  }}
                | args opt_block_arg
                  {{
                    $$ = { type:'call_args', args:$1, block_arg:$2 };
                  }}
                | assocs opt_block_arg
                  {{
                    $$ = { type:'call_args', assocs:$1, block_arg:$2 };
                  }}
                | args ',' assocs opt_block_arg
                  {{
                    $$ = { type:'call_args', args:$1, assocs:$3, block_arg:$4 };
                  }}
                | block_arg
                  {{
                    $$ = { type:'call_args', block_arg:$1 };
                  }}
                ;
      
   opt_block_arg: none
                ;
        
          assocs: none
                ;
        
        variable: tIDENTIFIER {{ $$ = { type:'identifier', name:yytext }; }}
                | tIVAR {{ $$ = { type:'ivar', name:yytext }; }}
                | tGVAR
                | tCONSTANT {{ $$ = { type:'constant', name:yytext }; }}
                | tCVAR
                | kNIL {{ $$ = { type:'nil' }; }}
                | kSELF {{ $$ = { type:'self' }; }}
                | kTRUE {{ $$ = { type:'true' }; }}
                | kFALSE {{ $$ = { type:'false' }; }}
                | k__FILE__ {{ $$ = { type:'__FILE__' }; }}
                | k__LINE__
                | k__ENCODING__
                | kBLOCK_GIVEN
                  {{
                    $$ = { type:'block_given' };
                  }}
                ;
        
      superclass:
                  term {{ $$ = null; }}
                | '<' expr term {{ $$ = $2; }}
                ;
           
           cname: tIDENTIFIER { $$ = yytext; }
                | tCONSTANT { $$ = yytext; }
                ;
           
           cpath: tCOLON3 cname
                | cname { $$ = $1; }
                | primary_value tCOLON2 cname
                ;
                
         literal: numeric
                | symbol
                ;
        
          symbol: tSYMBEG sym {{ $$ = { type:'symbol', name:$2 }; }}
                ;
            
             sym: fname
                ;
            
           fname: tIDENTIFIER { $$ = yytext; }
                | tCONSTANT { $$ = yytext }
                ;
        
         numeric: tINTEGER {{ $$ = { type:'numeric', value:yytext }; }}
                | tFLOAT {{ $$ = { type:'numeric', value:yytext }; }}
                ;
          
            term: ';'
                | '\n'
                ;
                
           terms: term
                | terms ';'
                ;
            
            none: { $$ = null; }
                ;
