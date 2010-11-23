class RubyParser

token CLASS MODULE DEF UNDEF BEGIN RESCUE ENSURE END IF UNLESS
      THEN ELSIF ELSE CASE WHEN WHILE UNTIL FOR BREAK NEXT
      REDO RETRY IN DO DO_COND DO_BLOCK RETURN YIELD SUPER
      SELF NIL TRUE FALSE AND OR NOT IF_MOD UNLESS_MOD WHILE_MOD
      UNTIL_MOD RESCUE_MOD ALIAS DEFINED klBEGIN klEND LINE
      FILE IDENTIFIER FID GVAR IVAR CONSTANT CVAR NTH_REF
      BACK_REF STRING_CONTENT INTEGER FLOAT REGEXP_END '+@'
      '-@' '-@NUM' '**' '<=>' '==' '===' '!=' '>=' '<=' '&&'
      '||' '=~' '!~' '.' '..' '...' '[]' '[]=' '<<' '>>'
      '::' '::@' OP_ASGN '=>' PAREN_BEG '(' ')' tLPAREN_ARG
      ARRAY_BEG ']' tLBRACE tLBRACE_ARG SPLAT '*' '&@' '&'
      '~' '%' '/' '+' '-' '<' '>' '|' '!' '^'
      '{@' '}' BACK_REF2 SYMBOL_BEG STRING_BEG XSTRING_BEG REGEXP_BEG
      tWORDS_BEG tAWORDS_BEG STRING_DBEG STRING_DVAR STRING_END STRING
      SYMBOL '\\n' '?' ':' ',' SPACE ';'

prechigh
  right    '!' '~' '+@'
  right    '**'
  right    '-@NUM' '-@'
  left     '*' '/' '%'
  left     '+' '-'
  left     '<<' '>>'
  left     '&'
  left     '|' '^'
  left     '>' '>=' '<' '<='
  nonassoc '<=>' '==' '===' '!=' '=~' '!~'
  left     '&&'
  left     '||'
  nonassoc '..' '...'
  right    '?' ':'
  left     RESCUE_MOD
  right    '=' OP_ASGN
  nonassoc DEFINED
  right    NOT
  left     OR AND
  nonassoc IF_MOD UNLESS_MOD WHILE_MOD UNTIL_MOD
  nonassoc tLBRACE_ARG
  nonassoc LOWEST
preclow

rule

         target: compstmt 
                    {
                      result = "result = val[0];"
                    }
         
        bodystmt: compstmt opt_rescue opt_else opt_ensure

        compstmt: stmts opt_terms
                    {
                      result = "result = ['compstmt', val[0]];"
                    }

           stmts: none
                    {
                      result = "result = [];"
                    }
                | stmt
                    {
                      result = "result = [val[0]];"
                    }
                | stmts terms stmt
                    {
                      result = "result = val[0].concat([val[2]]);"
                    }

            stmt: ALIAS fitem fitem
                | ALIAS GVAR GVAR
                | ALIAS GVAR BACK_REF
                | ALIAS GVAR NTH_REF
                | UNDEF undef_list
                | stmt IF_MOD expr_value
                | stmt UNLESS_MOD expr_value
                | stmt WHILE_MOD expr_value
                | stmt UNTIL_MOD expr_value
                | stmt RESCUE_MOD stmt
                | klBEGIN '{@' compstmt '}'
                | klEND '{@' compstmt '}'
                | lhs '=' command_call
                | mlhs '=' command_call
                | var_lhs OP_ASGN command_call
                | primary_value '[@' aref_args ']' OP_ASGN command_call
                | primary_value '.' IDENTIFIER OP_ASGN command_call
                | primary_value '.' CONSTANT OP_ASGN command_call
                | primary_value '::' IDENTIFIER OP_ASGN command_call
                | backref OP_ASGN command_call
                | lhs '=' mrhs
                | mlhs '=' arg_value
                | mlhs '=' mrhs
                | expr

            expr: command_call
                | expr AND expr
                | expr OR expr
                | NOT expr
                | '!' command_call
                | arg

      expr_value: expr

    command_call: command
                | block_command
                | RETURN call_args
                | BREAK call_args
                | NEXT call_args

   block_command: block_call
                | block_call '.' operation2 command_args
                | block_call '::' operation2 command_args

 cmd_brace_block: tLBRACE_ARG opt_block_var compstmt '}'

         command: operation command_args =LOWEST
                    {
                      result = "result = ['call', null, val[0], val[1]];"
                    }
                | operation command_args cmd_brace_block
                | primary_value '.' operation2 command_args =LOWEST
                | primary_value '.' operation2 command_args cmd_brace_block
                | primary_value '::' operation2 command_args =LOWEST
                | primary_value '::' operation2 command_args cmd_brace_block
                | SUPER command_args
                | YIELD command_args

            mlhs: mlhs_basic
                | PAREN_BEG mlhs_entry ')'

      mlhs_entry: mlhs_basic
                | PAREN_BEG mlhs_entry ')'

      mlhs_basic: mlhs_head
                | mlhs_head mlhs_item
                | mlhs_head SPLAT mlhs_node
                | mlhs_head SPLAT
                | SPLAT mlhs_node
                | SPLAT

       mlhs_item: mlhs_node
                | PAREN_BEG mlhs_entry ')'

       mlhs_head: mlhs_item ','
                | mlhs_head mlhs_item ','

       mlhs_node: variable
                | primary_value '[@' aref_args ']'
                | primary_value '.' IDENTIFIER
                | primary_value '::' IDENTIFIER
                | primary_value '.' CONSTANT
                | primary_value '::' CONSTANT
                | '::@' CONSTANT
                | backref

             lhs: variable
                | primary_value '[@' aref_args ']'
                | primary_value '.' IDENTIFIER
                | primary_value '::' IDENTIFIER
                | primary_value '.' CONSTANT
                | primary_value '::' CONSTANT
                | '::@' CONSTANT
                | backref

           cname: CONSTANT

           cpath: '::@' cname
                | cname
                    {
                      result = "result = [null, val[0]];"
                    }
                | primary_value '::' cname
                    {
                      result = "result = [val[0], val[2]];"
                    }

           fname: IDENTIFIER
                | CONSTANT
                | FID
                | op
                | reswords

           fitem: fname
                | symbol

      undef_list: fitem
                | undef_list ',' fitem

              op: '|'    | '^'     | '&' | '<=>'   | '=='    | '==='
                | '=~'   | '>'        | '>='    | '<'    | '<='    | '<<'
                | '>>'   | '+'      | '-'  | '*' | SPLAT   | '/'
                | '%' | '**'       | '~'  | '+@' | '-@' | '[]'
                | '[]='    | BACK_REF2

        reswords: LINE | FILE   | klBEGIN | klEND  | ALIAS  | AND
                | BEGIN    | BREAK      | CASE   | CLASS | DEF    | DEFINED
                | DO       | ELSE       | ELSIF  | END   | ENSURE | FALSE
                | FOR      | IN         | MODULE | NEXT  | NIL    | NOT
                | OR       | REDO       | RESCUE | RETRY | RETURN | SELF
                | SUPER    | THEN       | TRUE   | UNDEF | WHEN   | YIELD
                | IF_MOD   | UNLESS_MOD | WHILE_MOD | UNTIL_MOD | RESCUE_MOD

             arg: lhs '=' arg
                | lhs '=' arg RESCUE_MOD arg
                | var_lhs OP_ASGN arg
                | primary_value '[@' aref_args ']' OP_ASGN arg
                | primary_value '.' IDENTIFIER OP_ASGN arg
                | primary_value '.' CONSTANT OP_ASGN arg
                | primary_value '::' IDENTIFIER OP_ASGN arg
                | primary_value '::' CONSTANT OP_ASGN arg
                | '::@' CONSTANT OP_ASGN arg
                | backref OP_ASGN arg
                | arg '..' arg
                | arg '...' arg
                | arg '+' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '-' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '*' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '/' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '%' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '**' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | '-@NUM' INTEGER '**' arg
                | '-@NUM' FLOAT '**' arg
                | '+@' arg
                | '-@' arg
                | arg '|' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '^' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '&' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '<=>' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '>' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '>=' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '<' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '<=' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '==' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '===' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '!=' arg  
                    {
                      # FIXME: this isnt actually a call, its a ! of a call
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '=~' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '!~' arg
                    {
                      # FIXME: same as above, not actually a call
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | '!' arg
                    {
                      result = "result = ['call', val[1], val[0], [[]]];"
                    }
                | '~' arg
                    {
                      result = "result = ['call', val[1], val[0], [[]]];"
                    }
                | arg '<<' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '>>' arg
                    {
                      result = "result = ['call', val[0], val[1], [[val[2]]]];"
                    }
                | arg '&&' arg
                    {
                      result = "result = ['and', val[0], val[2]];"
                    }
                | arg '||' arg
                    {
                      result = "result = ['or', val[0], val[2]];"
                    }
                | DEFINED opt_nl arg
                | arg '?' arg ':' arg
                | primary

       arg_value: arg

       aref_args: none
                | command opt_nl
                | args trailer
                | args ',' SPLAT arg opt_nl
                | assocs trailer
                | SPLAT arg opt_nl

      paren_args: '(' none ')'
                    {
                      result = "result = [];"
                    }
                | '(' call_args opt_nl ')'
                    {
                      result = "result = val[1];"
                    }
                | '(' block_call opt_nl ')'
                | '(' args ',' block_call opt_nl ')'

  opt_paren_args: none
                | paren_args

       call_args: command
                    {
                      result = "result = [val[0], null, null, null];"
                    }
                | args opt_block_arg
                    {
                      result = "result = [val[0], null, null, val[1]];"
                    }
                | args ',' SPLAT arg_value opt_block_arg
                    {
                      result = "result = [val[0], val[3], null, val[4]];"
                    }
                | assocs opt_block_arg
                    {
                      result = "result = [null, null, val[0], val[1]];"
                    }
                | assocs ',' SPLAT arg_value opt_block_arg
                    {
                      result = "result = [null, val[3], val[0], val[4]];"
                    }
                | args ',' assocs opt_block_arg
                    {
                      result = "result = [val[0], null, val[2], val[3]];"
                    }
                | args ',' assocs ',' SPLAT arg opt_block_arg
                    {
                      result = "result = [val[0], val[5], val[2], val[6]];"
                    }
                | SPLAT arg_value opt_block_arg
                    {
                      result = "result = [null, val[1], null, val[2]];"
                    }
                | block_arg
                    {
                      result = "result = [null, null, null, val[1]];"
                    }

      call_args2: arg_value ',' args opt_block_arg
                | arg_value ',' block_arg
                | arg_value ',' SPLAT arg_value opt_block_arg
                | arg_value ',' args ',' SPLAT arg_value opt_block_arg
                | assocs opt_block_arg
                | assocs ',' SPLAT arg_value opt_block_arg
                | arg_value ',' assocs opt_block_arg
                | arg_value ',' args ',' assocs opt_block_arg
                | arg_value ',' assocs ',' SPLAT arg_value opt_block_arg
                | arg_value ',' args ',' assocs ',' SPLAT arg_value opt_block_arg
                | SPLAT arg_value opt_block_arg
                | block_arg

    command_args: 
                    {
                      result = "this.cmdarg_push(1);"
                    }
                  open_args
                    {
                      result = "this.cmdarg_pop();"
                    }
                    
       open_args: call_args
                | tLPAREN_ARG ')'
                    {
                      result = "result = [[]];"
                    }
                | tLPAREN_ARG call_args2 ')'
                    {
                      result = "result = val[1];"
                    }

       block_arg: '&@' arg_value

   opt_block_arg: ',' block_arg
                | none_block_pass

            args: arg_value
                    {
                      result = "result = [val[0]];"
                    }
                | args ',' arg_value
                    {
                      result = "result = val[0].concat([val[2]]);"
                    }

            mrhs: args ',' arg_value
                | args ',' SPLAT arg_value
                | SPLAT arg_value

         primary: literal
                | strings
                | xstring
                | regexp
                | words
                | awords
                | var_ref
                | backref
                | FID
                | BEGIN bodystmt END
                | tLPAREN_ARG expr opt_nl ')'
                | PAREN_BEG compstmt ')'
                | primary_value '::' CONSTANT
                | '::@' CONSTANT
                | primary_value '[@' aref_args ']'
                | '[' aref_args ']'
                | '{' assoc_list '}'
                | RETURN
                | YIELD '(' call_args ')'
                | YIELD '(' ')'
                | YIELD
                | DEFINED opt_nl '(' expr ')'
                | operation brace_block
                | method_call
                | method_call brace_block
                | IF expr_value then compstmt if_tail END
                | UNLESS expr_value then compstmt opt_else END
                | WHILE
                    {
                      result = "this.cond_push(1);"
                    }
                  expr_value do
                    {
                      result = "this.cond_pop();"
                    }
                  compstmt END
                | UNTIL
                    {
                      result = "this.cond_push(1);"
                    }
                  expr_value do
                    {
                      result = "this.cond_pop();"
                    }
                  compstmt END
                | CASE expr_value opt_terms case_body END
                | CASE opt_terms case_body END
                | CASE opt_terms ELSE compstmt END
                | FOR block_var IN
                    {
                      result = "this.cond_push(1);"
                    }
                  expr_value do
                    {
                      result = "this.cond_pop();"
                    }
                  compstmt END
                | CLASS cpath superclass bodystmt END
                | CLASS '<<' expr term bodystmt END
                | MODULE cpath bodystmt END
                    {
                      result = "result = ['module', val[1], val[2]];"
                    }
                | DEF fname f_arglist bodystmt END
                | DEF singleton dot_or_colon fname f_arglist bodystmt END
                | BREAK
                | NEXT
                | REDO
                | RETRY

   primary_value: primary

            then: term
                | ':'
                | THEN
                | term THEN

              do: term
                | ':'
                | DO_COND

         if_tail: opt_else
                | ELSIF expr_value then compstmt if_tail

        opt_else: none
                | ELSE compstmt

       # block_var: lhs
                # | mlhs
      
       block_var: f_arg ',' f_block_optarg ',' f_rest_arg opt_f_block_arg
                | f_arg ',' f_block_optarg opt_f_block_arg
                | f_arg ',' f_rest_arg opt_f_block_arg
                | f_arg opt_f_block_arg
                | f_block_optarg ',' f_rest_arg opt_f_block_arg
                | f_block_optarg opt_f_block_arg
                | f_rest_arg opt_f_block_arg
                | f_block_arg
                
  f_block_optarg: f_block_opt
                | f_block_optarg ',' f_block_opt
        
     f_block_opt: IDENTIFIER '=' primary_value

   opt_block_var: none
                | '|' '|'
                | '||'
                | '|' block_var '|'

        do_block: DO_BLOCK
                    {
                      result = "print('doing half command');"
                    }
                  
                  opt_block_var compstmt END

      block_call: command do_block
                | block_call '.' operation2 opt_paren_args
                | block_call '::' operation2 opt_paren_args

     method_call: operation paren_args
                    {
                      result = "result = ['call', null, val[0], val[1]];"
                    }
                | primary_value '.' operation2 opt_paren_args
                | primary_value '::' operation2 paren_args
                | primary_value '::' operation3
                | SUPER paren_args
                | SUPER

     brace_block: '{@' opt_block_var compstmt '}'
                | DO opt_block_var compstmt END

       case_body: WHEN when_args then compstmt cases

       when_args: args
                | args ',' SPLAT arg_value
                | SPLAT arg_value

           cases: opt_else 
                | case_body

      opt_rescue: RESCUE exc_list exc_var then compstmt opt_rescue
                |

        exc_list: arg_value
                | mrhs
                | none

         exc_var: '=>' lhs
                | none

      opt_ensure: ENSURE compstmt
                | none

         literal: numeric
                | symbol
                | dsym

         strings: string

          string: string1
                | string string1

         string1: STRING_BEG string_contents STRING_END
                | STRING

         xstring: XSTRING_BEG xstring_contents STRING_END

          regexp: REGEXP_BEG xstring_contents REGEXP_END

           words: tWORDS_BEG SPACE STRING_END
                | tWORDS_BEG word_list STRING_END

       word_list: none
                | word_list word SPACE
            word: string_content
                | word string_content

          awords: tAWORDS_BEG SPACE STRING_END
                | tAWORDS_BEG qword_list STRING_END

      qword_list: none
                | qword_list STRING_CONTENT SPACE

 string_contents: none
                | string_contents string_content

xstring_contents: none
                | xstring_contents string_content

  string_content: STRING_CONTENT
                | STRING_DVAR string_dvar
                | STRING_DBEG 
                    {
                      result = "this.cond_push(0); this.cmdarg_push(0);"
                    }
                compstmt '}'
                    {
                      result = "this.cond_lexpop(); this.cmdarg_lexpop();"
                    }

     string_dvar: GVAR
                | IVAR
                | CVAR
                | backref


          symbol: SYMBOL_BEG sym
                | SYMBOL

             sym: fname
                | IVAR
                | GVAR
                | CVAR

            dsym: SYMBOL_BEG xstring_contents STRING_END

         numeric: INTEGER
                    {
                      result = "result = ['numeric', val[0]];"
                    }
                | FLOAT
                    {
                      result = "result = ['numeric', val[0]];"
                    }
                | '-@NUM' INTEGER =LOWEST
                | '-@NUM' FLOAT   =LOWEST

        variable: IDENTIFIER
                | IVAR
                | GVAR
                | CONSTANT
                | CVAR
                | NIL
                | SELF
                | TRUE
                | FALSE
                | FILE
                | LINE

         var_ref: variable

         var_lhs: variable

         backref: NTH_REF
                | BACK_REF

      superclass: term
                | '<' expr_value term
                | error term

       f_arglist: '(' f_args opt_nl ')'
                | f_args term

          f_args: f_arg ',' f_optarg ',' f_rest_arg opt_f_block_arg
                | f_arg ',' f_optarg                opt_f_block_arg
                | f_arg ','              f_rest_arg opt_f_block_arg
                | f_arg                             opt_f_block_arg
                |           f_optarg ',' f_rest_arg opt_f_block_arg
                |           f_optarg                opt_f_block_arg
                |                        f_rest_arg opt_f_block_arg
                |                                       f_block_arg
                |

      f_norm_arg: CONSTANT
                | IVAR
                | CVAR
                | IDENTIFIER

           f_arg: f_norm_arg
                | f_arg ',' f_norm_arg

           f_opt: IDENTIFIER '=' arg_value

        f_optarg: f_opt
                | f_optarg ',' f_opt

    restarg_mark: '*' 
                | SPLAT

      f_rest_arg: restarg_mark IDENTIFIER
                | restarg_mark

     blkarg_mark: '&'
                | '&@'

     f_block_arg: blkarg_mark IDENTIFIER

 opt_f_block_arg: ',' f_block_arg
                |

       singleton: var_ref
                | '(' expr opt_nl ')'

      assoc_list: none
                | assocs trailer
                | args trailer

          assocs: assoc
                | assocs ',' assoc

           assoc: arg_value '=>' arg_value

       operation: IDENTIFIER
                | CONSTANT
                | FID
                
      operation2: IDENTIFIER
                | CONSTANT
                | FID
                | op
                
      operation3: IDENTIFIER
                | FID 
                | op
                
    dot_or_colon: '.'
                | '::'
                
       opt_terms:
                | terms
                
          opt_nl:
                | '\\n'
                
         trailer:
                | '\\n'
                | ','

            term: ';'
                | '\\n'

           terms: term
                | terms ';'

            none:

 none_block_pass:

end

---- inner
