# 
#  objective_c.rb.y
#  vienna
#  
#  Created by Adam Beynon on 2009-05-02.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

class Vienna::ObjectiveCParser
 
  #
  # C keywords and operators..
  #
 
  token ';' '{' '}' ',' ':' '=' '(' ')' '[' ']' '.' '&' '!' '~' '-' '+' '*' '/' '%' '<' '>' '^' '|' '?'
	token IDENTIFIER CONSTANT STRING_LITERAL SYSTEM_LOC SIZEOF
	token PTR_OP INC_OP DEC_OP LEFT_OP RIGHT_OP LE_OP GE_OP EQ_OP NE_OP
  token AND_OP OR_OP MUL_ASSIGN DIV_ASSIGN MOD_ASSIGN ADD_ASSIGN
  token SUB_ASSIGN LEFT_ASSIGN RIGHT_ASSIGN AND_ASSIGN
  token XOR_ASSIGN OR_ASSIGN TYPE_NAME BOOLEAN

  token TYPEDEF EXTERN STATIC AUTO REGISTER
  token CHAR SHORT INT LONG SIGNED UNSIGNED FLOAT DOUBLE CONST VOLATILE VOID
  token STRUCT UNION ENUM ELLIPSIS 

  token CASE DEFAULT IF ELSE SWITCH WHILE DO FOR GOTO CONTINUE BREAK RETURN

  token DECLSPEC DLLIMPORT DLLEXPORT IMPORT

  #
  # Objective-C 1.0/2.0 keywords
  #

  token AT_INTERFACE AT_IMPLEMENTATION AT_PROTOCOL AT_END AT_CLASS
  token AT_PRIVATE AT_PUBLIC AT_PROTECTED
  token AT_ENCODE AT_SELECTOR
  token AT_TRY AT_CATCH AT_THROW
  token AT_PROPERTY AT_SYNTHESIZE AT_OPTIONAL AT_REQUIRED WEAK STRONG
  token SELF
  token AT_STRING_LITERAL
  token ID SEL BOOL UNICHAR CLASS
  token IN OUT INOUT BYREF BYCOPY ONEWAY

  rule
    target:
       translation_unit                                        { @result = val[0] };
 
    selector_component:
        IDENTIFIER ':'
    	| ':'
    	;

    selector_with_arguments: 
        IDENTIFIER
    	| IDENTIFIER ':' expression 
    	| selector_with_arguments selector_component expression
    	| selector_with_arguments ',' ELLIPSIS
    	;

    struct_component_expression:
    	  conditional_expression
    	| struct_component_expression conditional_expression
    	;

    selector:
    	  IDENTIFIER
    	| ':' 
    	| IDENTIFIER ':'
    	| selector ':'
    	;

    primary_expression:
    	  IDENTIFIER                                        { result = val[0] }
    	| CONSTANT                                          { result = val[0] }
    	| STRING_LITERAL                                    { result = val[0] }
    	| '(' expression ')'                                { result = Vienna::Node.new('(', val[1], nil) }
    	| AT_STRING_LITERAL
    	| '[' expression selector_with_arguments ']'
    	| AT_SELECTOR '(' selector ')'
    	| AT_ENCODE '(' type_name ')'
    	# these two rules allow for Objc 3.0 style blocks
    	| '^' compound_statement
    	| '^' '(' parameter_type_list ')' compound_statement
    	;

    postfix_expression:
    	  primary_expression                                { result = val[0] }
    	| postfix_expression '[' expression ']'
    	| postfix_expression '(' ')'
    	| postfix_expression '(' argument_expression_list ')'
    	| postfix_expression '.' IDENTIFIER
    	| postfix_expression PTR_OP IDENTIFIER
    	| postfix_expression INC_OP
    	| postfix_expression DEC_OP
    	;

    argument_expression_list:
    	  assignment_expression
    	| argument_expression_list ',' assignment_expression
    	;

    unary_expression:
    	  postfix_expression                                { result = val[0] }
    	| INC_OP unary_expression
    	| DEC_OP unary_expression
    	| unary_operator cast_expression                    { result = Vienna::Node.new(',', val[0], val[1]) }
    	| SIZEOF unary_expression
    	| SIZEOF '(' type_name ')'
    	;

    unary_operator:
    	  '&'                                               { result = val[0] }
    	| '*'                                               { result = val[0] }
    	| '+'                                               { result = val[0] }
    	| '-'                                               { result = val[0] }
    	| '~'                                               { result = val[0] }
    	| '!'                                               { result = val[0] }
    	;

    cast_expression:
    	  unary_expression                                  { result = val[0] }
    	| '(' type_name ')' cast_expression
    	| '(' type_name ')' '{' struct_component_expression '}'	/* gcc extension to create a temporary struct */
    	;

    multiplicative_expression:
    	  cast_expression                                   { result = val[0] }
    	| multiplicative_expression '*' cast_expression
    	| multiplicative_expression '/' cast_expression
    	| multiplicative_expression '%' cast_expression
    	;

    additive_expression:
    	  multiplicative_expression                         { result = val[0] }
    	| additive_expression '+' multiplicative_expression
    	| additive_expression '-' multiplicative_expression
    	;

    shift_expression:
    	  additive_expression                               { result = val[0] }
    	| shift_expression LEFT_OP additive_expression      { result = Vienna::Node.new(:LEFT_OP, val[0], val[2]) }
    	| shift_expression RIGHT_OP additive_expression     { result = Vienna::Node.new(:LEFT_OP, val[0], val[2]) }
    	;

    relational_expression:
    	  shift_expression                                  { result = val[0] }
    	| relational_expression '<' shift_expression
    	| relational_expression '>' shift_expression
    	| relational_expression LE_OP shift_expression      
    	| relational_expression GE_OP shift_expression
    	;

    equality_expression:
    	  relational_expression                             { result = val[0] }
    	| equality_expression EQ_OP relational_expression
    	| equality_expression NE_OP relational_expression
    	;

    and_expression:
    	  equality_expression                               { result = val[0] }
    	| and_expression '&' equality_expression
    	;

    exclusive_or_expression:
    	  and_expression                                    { result = val[0] }
    	| exclusive_or_expression '^' and_expression
    	;

    inclusive_or_expression:
    	  exclusive_or_expression                           { result = val[0] }
    	| inclusive_or_expression '|' exclusive_or_expression
    	;

    logical_and_expression:
    	  inclusive_or_expression                           { result = val[0] }
    	| logical_and_expression AND_OP inclusive_or_expression
    	;

    logical_or_expression:
    	  logical_and_expression                            { result = val[0] }
    	| logical_or_expression OR_OP logical_and_expression
    	;

    conditional_expression:
    	  logical_or_expression                             { result = val[0] }
    	| logical_or_expression '?' expression ':' conditional_expression
    	;

    assignment_expression:
    	  conditional_expression                            { result = val[0] }
    	| unary_expression assignment_operator assignment_expression
    	;

    assignment_operator:
    	  '='
    	| MUL_ASSIGN
    	| DIV_ASSIGN
    	| MOD_ASSIGN
    	| ADD_ASSIGN
    	| SUB_ASSIGN
    	| LEFT_ASSIGN
    	| RIGHT_ASSIGN
    	| AND_ASSIGN
    	| XOR_ASSIGN
    	| OR_ASSIGN
    	;

    expression:
    	  assignment_expression                             { result = val[0] }
    	| expression ',' assignment_expression
    	;

    constant_expression:
    	  conditional_expression                            { result = val[0] }
    	;

    class_name_list:
    	  class_identifier_or_type_name
    	| class_name_list ',' class_identifier_or_type_name
    	;

    class_with_superclass:
    	  class_identifier_or_type_name                     { result = Vienna::Node.new(',', val[0], nil) }
    	| class_identifier_or_type_name ':' class_identifier_or_type_name  { result = Vienna::Node.new(',', val[0], val[2]) }
    	;

    category_name:
    	  class_identifier_or_type_name                     { result = val[0] }
    	;
    
    class_identifier_or_type_name:
        IDENTIFIER                                        { result = val[0] }
      | TYPE_NAME                                         { result = val[0] }
      ;

    inherited_protocols:
    	  protocol_list {
    	    result = val[0]
    	  }
    	;

    class_name_declaration:
    	  class_with_superclass {
    	    result = Vienna::Node.new(',', val[0], Vienna::Node.new(',', nil, nil))
    	    register_class_name_from_declaration(val[0].left)
    	  }
    	| class_with_superclass '<' inherited_protocols '>' {
    	    result = Vienna::Node.new(',', val[0], Vienna::Node.new(',', val[2], nil))
    	    register_class_name_from_declaration(val[0].left)
    	  }
    	| class_with_superclass '(' category_name ')' {
    	    result = Vienna::Node.new(',', val[0], Vienna::Node.new(',', nil, val[2]))
    	    register_class_name_from_declaration(val[0].left)
    	  }
    	| class_with_superclass '<' inherited_protocols '>' '(' category_name ')' {
    	    result = Vienna::Node.new(',', val[0], Vienna::Node.new(',', val[2], val[5]))
    	    register_class_name_from_declaration(val[0].left)
    	  }
    	;

    class_or_instance_method_specifier: 
        '+' 
      | '-'
      ;

    do_atribute_specifier:
    	  ONEWAY
    	| IN
    	| OUT
    	| INOUT
    	| BYREF
    	| BYCOPY
    	;

    objc_declaration_specifiers:
    	  do_atribute_specifier objc_declaration_specifiers
    	| type_name                                                                             { result =  val[0] }
    	;

    selector_argument_declaration:
    	  '(' objc_declaration_specifiers ')' IDENTIFIER                                        { result =  Vienna::Node.new(',', val[1], val[3]) }
    	;

    selector_with_argument_declaration:
    	  IDENTIFIER                                                                            { result =  val[0] }
    	| IDENTIFIER ':' selector_argument_declaration                                          { result =  Vienna::Node.new(':', val[0], val[2]) }
    	| selector_with_argument_declaration selector_component selector_argument_declaration   { result =  Vienna::Node.new(',', val[0], Vienna::Node.new(':', val[1], val[2])) }
    	| selector_with_argument_declaration ',' ELLIPSIS
    	;

    method_declaration:
    	  class_or_instance_method_specifier '(' objc_declaration_specifiers ')' selector_with_argument_declaration {
    	    result = Vienna::Node.new('m', Vienna::Node.new(',', val[0], val[2]), val[4])
    	  }
    	| AT_PROPERTY '(' property_attributes_list ')' specifier_qualifier_list struct_declarator_list {
    	    result = Vienna::Node.new(:AT_PROPERTY, val[2], Vienna::Node.new(',', val[4],val[5]))
    	  }
      | AT_PROPERTY specifier_qualifier_list struct_declarator_list   {
      	  result = Vienna::Node.new(:AT_PROPERTY, nil, Vienna::Node.new(',', val[1],val[2]))
      	}
      ;

    method_declaration_list:
    	  method_declaration ';'                            { result =  val[0] }
    	| AT_OPTIONAL method_declaration ';'                { result =  Vienna::Node.new(:AT_OPTIONAL, val[1], nil) }
    	| AT_REQUIRED method_declaration ';'                { result =  Vienna::Node.new(:AT_REQUIRED, val[1], nil) }
    	| method_declaration_list method_declaration ';'    { result =  Vienna::Node.new(',', val[0], val[1]) }
    	;

    ivar_declaration_list:
    	  '{' struct_declaration_list '}'                   { result =  val[1] }
    	| '{' '}'                                           { result =  nil }
    	;
    
    class_implementation:
    	  class_identifier_or_type_name {
    	    result = Vienna::Node.new(',', val[0], nil)
    	  }
    	| class_identifier_or_type_name '(' category_name ')' {
    	    result = Vienna::Node.new(',', val[0], val[2])
    	  }
      ;
    
    method_implementation_declaration:
        class_or_instance_method_specifier '(' objc_declaration_specifiers ')' selector_with_argument_declaration {
  	      result = Vienna::Node.new(',', Vienna::Node.new(',', val[0], val[2]), val[4])
  	    }
  	  ;
  	
    method_implementation:
    	  method_implementation_declaration compound_statement {
    	    result = Vienna::Node.new('M', val[0], val[1])
    	  }
    	| method_implementation_declaration ';' compound_statement {
    	    result = Vienna::Node.new('M', val[0], val[2])
    	  }
    	| AT_SYNTHESIZE ivar_list ';' {
    	    result = Vienna::Node.new(:AT_SYNTHESIZE, val[1], nil)
    	  }
    	;

    method_implementation_list:
    	  method_implementation {
    	    result = val[0]
    	  }
    	| method_implementation_list method_implementation {
    	    result = Vienna::Node.new(',', val[0], val[1])
    	  }
    	;

    objc_declaration:
    	  AT_CLASS class_name_list ';' {
      	  result = Vienna::Node.new(:AT_CLASS, val[1], nil)
      	  deal_with_at_class(result)
      	}
    	| AT_PROTOCOL class_name_declaration AT_END {
      	  result = Vienna::Node.new(:AT_PROTOCOL, val[1], nil)
    	    new_protocol = ObjectiveCProtocol.new_from_parse_tree(result)
    	    add_protocol_declaration(new_protocol)
      	}
    	| AT_PROTOCOL class_name_declaration method_declaration_list AT_END {
    	    result = Vienna::Node.new(:AT_PROTOCOL, val[1], val[2])
    	    # new_protocol = ObjectiveCProtocol.new_from_parse_tree(result)
    	    #          add_protocol_declaration(new_protocol)
    	  }
    	| AT_INTERFACE class_name_declaration AT_END {
    	    result = Vienna::Node.new(:AT_INTERFACE, Vienna::Node.new(',', val[1], nil), nil)
    	    deal_with_interface_declaration(result)
    	  }
    	| AT_INTERFACE class_name_declaration ivar_declaration_list method_declaration_list AT_END {
    	    result = Vienna::Node.new(:AT_INTERFACE, Vienna::Node.new(',', val[1], val[2]), val[3])
    	    deal_with_interface_declaration(result)
    	  }
    	| AT_INTERFACE class_name_declaration ivar_declaration_list AT_END {
    	    result = Vienna::Node.new(:AT_INTERFACE, Vienna::Node.new(',', val[1], val[2]), nil)
    	    deal_with_interface_declaration(result)
    	  }
    	| AT_INTERFACE class_name_declaration method_declaration_list AT_END {
    	    result = Vienna::Node.new(:AT_INTERFACE, Vienna::Node.new(',', val[1], nil), val[2])
    	    deal_with_interface_declaration(result)
    	  }
    	| AT_IMPLEMENTATION class_implementation AT_END { 
    	    result = Vienna::Node.new(:AT_IMPLEMENTATION, Vienna::Node.new(',', val[1], nil), nil)
    	    deal_with_implementation_declaration(result)
    	  }
    	| AT_IMPLEMENTATION class_implementation ivar_declaration_list AT_END {
    	    result = Vienna::Node.new(:AT_IMPLEMENTATION, Vienna::Node.new(',', val[1], val[2]), nil)
    	    deal_with_implementation_declaration(result)
    	  }
    	| AT_IMPLEMENTATION class_implementation method_implementation_list AT_END {
    	    result = Vienna::Node.new(:AT_IMPLEMENTATION, Vienna::Node.new(',', val[1], nil), val[2])
    	    deal_with_implementation_declaration(result)
    	  }
    	| AT_IMPLEMENTATION class_implementation ivar_declaration_list method_implementation_list AT_END {
    	    result = Vienna::Node.new(:AT_IMPLEMENTATION, Vienna::Node.new(',', val[1], val[2]), val[3])
    	    deal_with_implementation_declaration(result)
    	  }
    	;

    declaration:
    	  declaration_specifiers ';' {
          # Normal declaration
    	    result = Vienna::Node.new('d', val[0], nil)
    	    deal_with_declaration(result)
    	  }
    	| declaration_specifiers init_declarator_list ';'   {
    	     # This will be like a typedef or something like extern const nsstring bob = @"hey";
    	     result = Vienna::Node.new('d', val[0], val[1])
    	     deal_with_declaration(result)
    	  }  
    	| objc_declaration                                  { result = val[0] }
    	;

    declaration_specifiers:
    	  storage_class_specifier                           { result = val[0] }
    	| storage_class_specifier declaration_specifiers    { result = Vienna::Node.new(',', val[0], val[1]) }
    	| type_specifier                                    { result = val[0] }   # This will be a typename, void, int, id etc
    	| type_specifier declaration_specifiers             { result = Vienna::Node.new(',', val[0], val[1]) }
    	| type_qualifier                                    { result = val[0] }   # This will be const, volatile etc
    	| type_qualifier declaration_specifiers             { result = Vienna::Node.new(',', val[0], val[1]) }
    	;

    init_declarator_list:
    	  init_declarator                                   { result = val[0] }
    	| init_declarator_list ',' init_declarator          { result = Vienna::Node.new(',', val[0], val[2]) }
    	;

    init_declarator:
    	  declarator                                        { result = val[0] }
    	| declarator '=' initializer
    	;

    storage_class_specifier:
    	  TYPEDEF   { result = val[0] }  
    	| EXTERN    { result = val[0] }
    	| STATIC    { result = val[0] }
    	| AUTO      { result = val[0] }
    	| REGISTER  { result = val[0] }
    	;

    protocol_list:
    	  class_identifier_or_type_name                     { result = val[0] }
    	| protocol_list ',' class_identifier_or_type_name   { result = Vienna::Node.new(',', val[0], val[2]) }

    type_specifier:
    	  VOID                                              { result = val[0] }
    	| CHAR                                              { result = val[0] }
    	| SHORT                                             { result = val[0] }
    	| INT                                               { result = val[0] }
    	| LONG                                              { result = val[0] }
    	| FLOAT                                             { result = val[0] }
    	| DOUBLE                                            { result = val[0] }
    	| SIGNED                                            { result = val[0] }
    	| UNSIGNED                                          { result = val[0] }
    	| struct_or_union_specifier                         { result = val[0] }
    	| enum_specifier                                    { result = val[0] }
    	| TYPE_NAME                                         { result = val[0] }
    	| ID                                                { result = val[0] }
    	| ID '<' protocol_list '>'                          { result = val[0] }
    	| SEL                                               { result = val[0] }
    	| BOOL                                              { result = val[0] }
    	| UNICHAR                                           { result = val[0] }
    	| CLASS                                             { result = val[0] }
    	;

    struct_or_union_specifier:
    	  struct_or_union IDENTIFIER '{' struct_declaration_list '}'
    	| struct_or_union '{' struct_declaration_list '}'
    	| struct_or_union IDENTIFIER
    	;

    struct_or_union:
    	  STRUCT
    	| UNION
    	;

    struct_declaration_list:
    	  struct_declaration                                                            { result = val[0] }
    	| struct_declaration_list struct_declaration                                    { result = Vienna::Node.new(',', val[0], val[1]) }
    	;

    property_attributes_list:
    	  IDENTIFIER
    	| IDENTIFIER ',' property_attributes_list
    	;

    struct_declaration:
    	  specifier_qualifier_list struct_declarator_list ';'                           { result = Vienna::Node.new('i', val[0], val[1]) }
    	| AT_PRIVATE specifier_qualifier_list struct_declarator_list ';'
    	| AT_PUBLIC specifier_qualifier_list struct_declarator_list ';'
    	| AT_PROTECTED specifier_qualifier_list struct_declarator_list ';'
    	| AT_PROPERTY '(' property_attributes_list ')' specifier_qualifier_list struct_declarator_list ';'
    	| AT_PROPERTY specifier_qualifier_list struct_declarator_list ';'
    	| AT_SYNTHESIZE ivar_list ';'
    	;

    ivar_list:
    	  ivar_list IDENTIFIER
    	| IDENTIFIER
    	;

    specifier_qualifier_list:
    	  type_specifier specifier_qualifier_list                                       { result = Vienna::Node.new(',', val[0], val[1]) }
    	| type_specifier                                                                { result = val[0] }
    	| type_qualifier specifier_qualifier_list                                       { result = Vienna::Node.new(',', val[0], val[1]) }
    	| type_qualifier                                                                { result = val[0] }
    	;

    struct_declarator_list:
    	  struct_declarator                                                             { result = val[0] }
    	| struct_declarator_list ',' struct_declarator                                  { result = Vienna::Node.new(',', val[0], val[2]) }
    	;

    struct_declarator:
    	  declarator                                                                    { result = val[0] }
    	| ':' constant_expression
    	| declarator ':' constant_expression
    	;

    enum_specifier:
    	  ENUM '{' enumerator_list '}'                      { result = Vienna::Node.new('e', Vienna::Node.new(',', val[0], nil), val[2]) }
    	| ENUM IDENTIFIER '{' enumerator_list '}'           { result = Vienna::Node.new('e', Vienna::Node.new(',', val[0], val[1]), val[2]) }
    	| ENUM IDENTIFIER                                   { result = Vienna::Node.new('e', Vienna::Node.new(',', val[0], val[1]), nil) }
    	;

    enumerator_list:
    	  enumerator                                        { result = val[0] }
    	| enumerator_list ',' enumerator                    { result = Vienna::Node.new(',', val[0], val[2]) }
    	;

    enumerator:
    	  IDENTIFIER                                        { result = Vienna::Node.new('E', val[0], nil) }
    	| IDENTIFIER '=' constant_expression                { result = Vienna::Node.new('E', val[0], val[2]) }
    	;

    type_qualifier:
    	  CONST                                             { result = val[0] }
    	| VOLATILE                                          { result = val[0] }
    	| WEAK                                              { result = val[0] }
    	| STRONG                                            { result = val[0] }
    	;

    declarator:
    	  pointer direct_declarator                         { result = val[1] }   # For now ignore missing pointer ref's.
    	| direct_declarator                                 { result = val[0] }
    	;

    direct_declarator:
    	  IDENTIFIER                                        { result = val[0] }
    	| '(' declarator ')'
    	| direct_declarator '[' constant_expression ']'
    	| direct_declarator '[' ']'
    	| direct_declarator '(' parameter_type_list ')'
    	| direct_declarator '(' identifier_list ')'
    	| direct_declarator '(' ')'
    	;

    pointer:
    	  '*'                                               { result = nil }
    	| '*' type_qualifier_list                           { result = val[1] }
    	| '*' pointer                                       { result = val[1] }
    	| '*' type_qualifier_list pointer                   { result = Vienna::Node.new(',', val[1], val[2]) }
    	;

    type_qualifier_list:
    	  type_qualifier
    	| type_qualifier_list type_qualifier
    	;

    parameter_type_list:
    	  parameter_list
    	| parameter_list ',' ELLIPSIS
    	;

    parameter_list:
    	  parameter_declaration
    	| parameter_list ',' parameter_declaration
    	;

    parameter_declaration:
    	  declaration_specifiers declarator
    	| declaration_specifiers abstract_declarator
    	| declaration_specifiers
    	;

    identifier_list:
    	  IDENTIFIER
    	| identifier_list ',' IDENTIFIER
    	;

    type_name:
    	  specifier_qualifier_list
    	| specifier_qualifier_list abstract_declarator
    	;

    abstract_declarator:
    	  pointer
    	| direct_abstract_declarator
    	| pointer direct_abstract_declarator
    	;

    direct_abstract_declarator:
    	  '(' abstract_declarator ')'
    	| '[' ']'
    	| '[' constant_expression ']'
    	| direct_abstract_declarator '[' ']'
    	| direct_abstract_declarator '[' constant_expression ']'
    	| '(' ')'
    	| '(' parameter_type_list ')'
    	| direct_abstract_declarator '(' ')'
    	| direct_abstract_declarator '(' parameter_type_list ')'
    	;

    initializer:
    	  assignment_expression
    	| '{' initializer_list '}'
    	| '{' initializer_list ',' '}'
    	;

    initializer_list:
    	  initializer
    	| initializer_list ',' initializer
    	;

    statement:
    	  labeled_statement
    	| compound_statement
    	| expression_statement
    	| selection_statement
    	| iteration_statement
    	| jump_statement
    	| AT_CATCH
    	| AT_TRY
    	;

    labeled_statement:
    	  IDENTIFIER ':' statement
    	| CASE constant_expression ':' statement
    	| DEFAULT ':' statement
    	;

    compound_statement:
    	  '{' '}'
    	| '{' statement_list '}'
    	| '{' declaration_list '}'
    	| '{' declaration_list statement_list '}'
    	;

    declaration_list:
    	  declaration
    	| declaration_list declaration
    	;

    statement_list:
    	  statement
    	| statement_list statement
    	;

    expression_statement:
    	  ';'
    	| expression ';'
    	;

    selection_statement:
    	  IF '(' expression ')' statement
    	| IF '(' expression ')' statement ELSE statement
    	| SWITCH '(' expression ')' statement
    	;

    iteration_statement:
    	  WHILE '(' expression ')' statement
    	| DO statement WHILE '(' expression ')' ';'
    	| FOR '(' expression_statement expression_statement ')' statement
    	| FOR '(' expression_statement expression_statement expression ')' statement
    	| FOR '(' declaration expression_statement expression ')' statement	
    	| FOR '(' declaration IN expression ')' statement
    	;

    jump_statement:
    	  GOTO IDENTIFIER ';'
    	| CONTINUE ';'
    	| BREAK ';'
    	| RETURN ';'
    	| RETURN expression ';'
    	;

    translation_unit:
    	  external_declaration { result = val[0] }
    	| translation_unit external_declaration { result = Vienna::Node.new ',', val[0], val[1] }
    	;

    external_declaration:
    	  function_definition { result = val[0] }
    	| declaration { result = val[0] }
    	;

    function_definition:
    	  declaration_specifiers declarator declaration_list compound_statement
    	| declaration_specifiers declarator compound_statement
    	| declarator declaration_list compound_statement
    	| declarator compound_statement
    	;
    
end
---- header ----
# stuff that will come before the definition of ObjectiveCParser
require 'strscan'
---- inner ----
	# inside the class definition of ObjectiveCParser
	
	attr_reader :result
	
	def next_token
	  
	  if @objc_files.size == 0
	    return [false, false]
    end
	  
	  objc_file = @objc_files.last
	  
	  if !objc_file
      return [false, false]
    end
	  
	  if objc_file.scanner.empty?
	    @objc_files.slice!(@objc_files.size - 1)
	    return next_token()
	  end
	  
	  scanner = objc_file.scanner
	  
	  case
      #
      # Pre-processor macros
      #
      when scanner.scan(/(#include|#import)/)
        pp_directive = scanner.scan_until(/.*/).strip!
        re = /[\<|\"](.*)\/(.*\.h)[\>|\"]/
        md = re.match(pp_directive)
        if md
          import_file(md[2], md[1])
        else
          re = /\"(.*\.h)\"/
          md = re.match(pp_directive)
          if md
            import_file(md[1], nil)
          else
            puts "Should throw error: malformed import declaration"
          end
        end
        return next_token()
      
      when scanner.scan(/#define/)
        pp_directive = scanner.scan_until(/.*/).strip!
        # puts " # Define Directive: #{pp_directive}"
        return next_token()
        
      when scanner.scan(/#undef/)
        pp_directive = scanner.scan_until(/.*/).strip!
        # puts " # Undef Directive: #{pp_directive}" 
      
      when scanner.scan(/\n/)
        @objc_files.last.current_line += 1
        return next_token()
      when scanner.scan(/[ \t\v\f]/)
        return next_token()
      when scanner.scan(/[\t ]+/)
        return next_token()
        
      #
      # Plain good old C key words
      #
      when scanner.scan(/\/\*/)
        # multi-line comment. scan input until end of multi line comment is found
        match = scanner.scan_until(/\*\//)
        @objc_files.last.current_line += match.scan(/\n/).size
        return next_token()
      when scanner.scan(/\/\//)
        #single line comment. scan all input (does not include new line char, so skips)
        scanner.scan_until(/.*/)
        return next_token()
      when scanner.scan(/auto(?!([a-zA-Z_]|[0-9]))/)
        return [:AUTO, :AUTO]
      when scanner.scan(/break(?!([a-zA-Z_]|[0-9]))/)
        return [:BREAK, :BREAK]
      when scanner.scan(/case(?!([a-zA-Z_]|[0-9]))/)
        return [:CASE, :CASE]
      when scanner.scan(/char(?!([a-zA-Z_]|[0-9]))/)
        return [:CHAR, :CHAR]
      when scanner.scan(/const(?!([a-zA-Z_]|[0-9]))/)
        return [:CONST, :CONST]
      when scanner.scan(/continue(?!([a-zA-Z_]|[0-9]))/)
        return [:CONTINUE, :CONTINUE]
      when scanner.scan(/default(?!([a-zA-Z_]|[0-9]))/)
        return [:DEFAULT, :DEFAULT]
      when scanner.scan(/do(?!([a-zA-Z_]|[0-9]))/)
        return [:DO, :DO]
      when scanner.scan(/double(?!([a-zA-Z_]|[0-9]))/)
        return [:DOUBLE, :DOUBLE]
      when scanner.scan(/else(?!([a-zA-Z_]|[0-9]))/)
        return [:ELSE, :ELSE]
      when scanner.scan(/enum(?!([a-zA-Z_]|[0-9]))/)
        return [:ENUM, :ENUM]
      when scanner.scan(/extern(?!([a-zA-Z_]|[0-9]))/)
        return [:EXTERN, :EXTERN]
      when scanner.scan(/float(?!([a-zA-Z_]|[0-9]))/)
        return [:FLOAT, :FLOAT]
      when scanner.scan(/for(?!([a-zA-Z_]|[0-9]))/)
        return [:FOR, :FOR]
      when scanner.scan(/goto(?!([a-zA-Z_]|[0-9]))/)
        return [:GOTO, :GOTO]
      when scanner.scan(/if(?!([a-zA-Z_]|[0-9]))/)
        return [:IF, :IF]
      when scanner.scan(/int(?!([a-zA-Z_]|[0-9]))/)
	      return [:INT, :INT]
      when scanner.scan(/long(?!([a-zA-Z_]|[0-9]))/)
        return [:LONG, :LONG]
      when scanner.scan(/register(?!([a-zA-Z_]|[0-9]))/)
        return [:REGISTER, :REGISTER]
      when scanner.scan(/return(?!([a-zA-Z_]|[0-9]))/)
        return [:RETURN, :RETURN]
      when scanner.scan(/short(?!([a-zA-Z_]|[0-9]))/)
        return [:SHORT, :SHORT]
      when scanner.scan(/signed(?!([a-zA-Z_]|[0-9]))/)
        return [:SIGNED, :SIGNED]
      when scanner.scan(/sizeof(?!([a-zA-Z_]|[0-9]))/)
        return [:SIZEOF, :SIZEOF]
      when scanner.scan(/static(?!([a-zA-Z_]|[0-9]))/)
        return [:STATIC, :STATIC]
      when scanner.scan(/struct(?!([a-zA-Z_]|[0-9]))/)
        return [:STRUCT, :STRUCT]
      when scanner.scan(/switch(?!([a-zA-Z_]|[0-9]))/)
        return [:SWITCH, :SWITCH]
      when scanner.scan(/typedef(?!([a-zA-Z_]|[0-9]))/)
        return [:TYPEDEF, :TYPEDEF]
      when scanner.scan(/union(?!([a-zA-Z_]|[0-9]))/)
        return [:UNION, :UNION]
      when scanner.scan(/unsigned(?!([a-zA-Z_]|[0-9]))/)
        return [:SIGNED, :UNSIGNED]
      when scanner.scan(/void(?!([a-zA-Z_]|[0-9]))/)
        return [:VOID, :VOID]
      when scanner.scan(/volatile(?!([a-zA-Z_]|[0-9]))/)
        return [:VOLATILE, :VOLATILE]
      when scanner.scan(/while(?!([a-zA-Z_]|[0-9]))/)
        return [:WHILE, :WHILE]
        
      #  
      # Objective-C 1.0
      # 
      when scanner.scan(/@interface/)
        return [:AT_INTERFACE, :AT_INTERFACE]
      when scanner.scan(/@implementation/)
        return [:AT_IMPLEMENTATION, :AT_IMPLEMENTATION]  
      when scanner.scan(/@end/)
        return [:AT_END, :AT_END]
      when scanner.scan(/@class/)
        return [:AT_CLASS, :AT_CLASS]
      when scanner.scan(/@protocol/)
        return [:AT_PROTOCOL, :AT_PROTOCOL]
      when scanner.scan(/@selector/)
        return [:AT_SELECTOR, :AT_SELECTOR]
      when scanner.scan(/@encode/)
        return [:AT_ENCODE, :AT_ENCODE]
      when scanner.scan(/@try/)
        return [:AT_TRY, :AT_TRY]
      when scanner.scan(/@catch/)
        return [:AT_CATCH, :AT_CATCH]
      when scanner.scan(/@protected/)
        return [:AT_PROTECTED, :AT_PROTECTED]
      when scanner.scan(/@private/)
        return [:AT_PRIVATE, :AT_PRIVATE]
      when scanner.scan(/@public/)
        return [:AT_PUBLIC, :AT_PUBLIC]

      when match = scanner.scan(/@\"(\\.|[^\\"])*\"/)
        return [:AT_STRING_LITERAL, match]
      
      when scanner.scan(/self/)
        return [:IDENTIFIER, "self"]
           
      #
      # Objective-C 2.0
      #
      when scanner.scan(/@property/)
        return [:AT_PROPERTY, :AT_PROPERTY]
      when scanner.scan(/@synthesize/)
        return [:AT_SYNTHESIZE, :AT_SYNTHESIZE]
      when scanner.scan(/@optional/)
        return [:AT_OPTIONAL, :AT_OPTIONAL]
      when scanner.scan(/@required/)
        return [:AT_REQUIRED, :AT_REQUIRED]
      
      #
      # C constants, identifiers and string literals
      #
        
      when match = scanner.scan(/[a-zA-Z_]([a-zA-Z_]|[0-9])*/)
        return (lookup_type(match) == nil) ? [:IDENTIFIER, match] : [:TYPE_NAME, match]
      when match = scanner.scan(/[a-zA-Z_]([a-zA-Z_])*/)
        return (lookup_type(match) == nil) ? [:IDENTIFIER, match] : [:TYPE_NAME, match]
      when match = scanner.scan(/0[xX][a-fA-F0-9]+(u|U|l|L)?/)
        return [:CONSTANT, match]
      when match = scanner.scan(/0[0-9]+(u|U|l|L)?/)
        return [:CONSTANT, match]
      when match = scanner.scan(/[0-9]+(u|U|l|L)?/) # {D}+{IS}?
        return [:CONSTANT, match]
      #when match = scanner.scan(//) # L?'(\\.|[^\\'])+'
      #  return [:CONSTANT, match]
      #when match = scanner.scan(//) # {D}+{E}{FS}?
      #  return [:CONSTANT, match]
      #when match = scanner.scan(//) # {D}*"."{D}+({E})?{FS}?
      #  return [:CONSTANT, match]
      #when match = scanner.scan(//) # {D}+"."{D}*({E})?{FS}?
      #  return [:CONSTANT, match]
      #when match = scanner.scan(//) # L?\"(\\.|[^\\"])*\"
      #  return [:STRING_LITERAL, match]
      
      #
      # C operators, assignments and other syntactical bits and pieces
      #  
      when scanner.scan(/\.\.\./)
       return [:ELLIPSIS, :ELLIPSIS]
      when scanner.scan(/>>=/)
       return [:RIGHT_ASSIGN, :RIGHT_ASSIGN]
      when scanner.scan(/<<=/)
       return [:LEFT_ASSIGN, :LEFT_ASSIGN]
      when scanner.scan(/\+=/)
       return [:ADD_ASSIGN, :ADD_ASSIGN]
      when scanner.scan(/-=/)
       return [:SUB_ASSIGN, :SUB_ASSIGN]
      when scanner.scan(/\*=/)
       return [:MUL_ASSIGN, :MUL_ASSIGN]
      when scanner.scan(/\/=/)
       return [:DIV_ASSIGN, :DIV_ASSIGN]
      when scanner.scan(/%=/)
       return [:MOD_ASSIGN, :MOD_ASSIGN]
      when scanner.scan(/&=/)
       return [:AND_ASSIGN, :AND_ASSIGN]
      when scanner.scan(/\^=/)
       return [:XOR_ASSIGN, :XOR_ASSIGN]
      when scanner.scan(/\|=/)
       return [:OR_ASSIGN, :OR_ASSIGN]
      when scanner.scan(/>>/)
       return [:RIGHT_OP, :RIGHT_OP]
      when scanner.scan(/<</)
       return [:LEFT_OP, :LEFT_OP]
      when scanner.scan(/\+\+/)
       return [:INC_OP, :INC_OP]
      when scanner.scan(/--/)
       return [:DEC_OP, :DEC_OP]
      when scanner.scan(/->/)
       return [:PTR_OP, :PTR_OP]
      when scanner.scan(/&&/)
       return [:AND_OP, :AND_OP]
      when scanner.scan(/\|\|/)
       return [:OR_OP, :OR_OP]
      when scanner.scan(/<=/)
       return [:LE_OP, :LE_OP]
      when scanner.scan(/>=/)
       return [:GE_OP, :GE_OP]
      when scanner.scan(/\=\=/)
       return [:EQ_OP, :EQ_OP]
      when scanner.scan(/\!\=/)
       return [:NE_OP, :NE_OP]
      when scanner.scan(/;/)
        return [';', ';']
      when scanner.scan(/\{/)
        return ['{', '{']
      when scanner.scan(/\}/)
        return ['}', '}']
      when scanner.scan(/,/)
        return [',', ',']  
      when scanner.scan(/:/)
        return [':', ':']    
      when scanner.scan(/\=/)
        return ['=', '=']    
      when scanner.scan(/\(/)
        return ['(', '(']
      when scanner.scan(/\)/)
        return [')', ')']
      when scanner.scan(/\[/)
        return ['[', '[']
      when scanner.scan(/\]/)
        return [']', ']']  
      when scanner.scan(/\./)
        return ['.', '.']  
      when scanner.scan(/\&/)
        return ['&', '&']  
      when scanner.scan(/\!/)
        return ['!', '!']
      when scanner.scan(/\~/)
        return ['~', '~']
      when scanner.scan(/\-/)
        return ['-', '-']
      when scanner.scan(/\+/)
        return ['+', '+']
      when scanner.scan(/\*/)
        return ['*', '*']
      when scanner.scan(/\//)
        return ['/', '/']
      when scanner.scan(/\%/)
        return ['%', '%']
      when scanner.scan(/\</)
        return ['<', '<']
      when scanner.scan(/\>/)
        return ['>', '>']
      when scanner.scan(/\^/)
        return ['^', '^']
      when scanner.scan(/\|/)
        return ['|', '|']
      when scanner.scan(/\?/)
        return ['?', '?']
      
      else
        puts "Error: unkown token: #{scanner.peek(5)}"
      
      #when scanner.scan(/.*/)
	      #puts "wow"
	      # throw error: bad character
    end
	end
  
---- footer ----
# stuff that will come after the definition of ObjectiveCParser