
/* description: Parses end executes mathematical expressions. */

%token tCONSTANT
%token '.'

// %left '+' '-'
// %left '*' '/'
// %left '^'
// %left UMINUS

%%

S
                :
                  program EOF
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
            
           stmts: none {{ $$ = $1; }}
                | stmt
                | stmts terms stmt  
                ;
                
            stmt:
                  expr
                ;
            
            expr: command_call
                | arg
                ;
            
             arg:
                  arg '+' arg
                | primary
                ;
            
         primary:
                  literal
                | variable
                | method_call
                | kIF expr then compstmt if_tail kEND
                  {{
                    $$ = { type:'if', expr:$2, stmt:$4, tail:$5 };
                  }}
                | kCLASS cpath superclass bodystmt kEND
                  {{
                    $$ = { type:'class', cpath:$2, superclass:$3, bodystmt:$4 };
                  }}
                | kMODULE cpath bodystmt kEND
                  {{
                    $$ = { type:'module', cpath:$2, bodystmt:$3 };
                  }}
                ;
            
         if_tail: opt_else
                | kELSIF expr then compstmt if_tail
                ;
        
        opt_else: none
                | kELSE compstmt
                ;
          
            then: term
                | kTHEN
                | term kTHEN
                ;
      
    command_call: command
                ;
      
         command: primary '.' operation2 call_args
                | primary '.' operation2 call_args cmd_brace_block
                | primary tCOLON2 operation2 call_args
                | primary tCOLON2 operation2 call_args cmd_brace_block
                | kSUPER call_args
                | kYIELD call_args
                ;
    
 cmd_brace_block: '{' '}'
                ;
                
     method_call: primary '.' operation2 opt_paren_args
                  {{ 
                    $$ = { type:'call', recv:$1, meth:$3 }
                  }}
                ;
       
       operation: tIDENTIFIER { $$ = yytext; }
                | tCONSTANT { $$ = yytext; }
                ;
   
      operation2: tIDENTIFIER { $$ = yytext; }
                ;
      
  opt_paren_args: none
                | paren_args
                ;
      
      paren_args: '(' opt_call_args rparen
                ;
      
   opt_call_args: none
                ;
      
       call_args: '(' ')'
                ;
        
        variable: tIDENTIFIER {{ $$ = { type:'identifier', name:yytext }; }}
                | tIVAR {{ $$ = { type:'ivar', name:yytext }; }}
                | tGVAR
                | tCONSTANT {{ $$ = { type:'constant', name:yytext }; }}
                | tCVAR
                | kNIL
                | kSELF
                | kTRUE
                | kFALSE
                | k__FILE__
                | k__LINE__
                | k__ENCODING__
                | kBLOCK_GIVEN
                ;
        
      superclass:
                  term
                | '<' expr term
                ;
           
           cname: tIDENTIFIER { $$ = yytext; }
                | tCONSTANT { $$ = yytext; }
                ;
           
           cpath: tCOLON3 cname
                | cname { $$ = $1; }
                | primary_value tCOLON2 cname
                ;
                
         literal:
                  numeric
                ;
        
         numeric: tINTEGER { $$ = yytext; }
                | tFLOAT { $$ = yytext; }
                ;
          
            term: ';'
                | '\n'
                ;
                
           terms: term
                | terms ';'
                ;
            
            none: { $$ = null; }
                ;
