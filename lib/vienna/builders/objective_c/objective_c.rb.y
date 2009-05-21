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
       translation_unit                                   { @result = val[0] };
 
    selector_component:
        IDENTIFIER ':'                                    { result = make_node(':', val[0], nil) }
    	| ':'                                               { result = make_node(':', nil, nil) }
    	;

    selector_with_arguments: 
        IDENTIFIER
    	| IDENTIFIER ':' expression                               { result = make_node(':', val[0], val[2]) }
    	| selector_with_arguments selector_component expression   { 
    	  val[1].right = val[2]
    	  result = make_node(',', val[0], val[1])
    	}
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
    	  IDENTIFIER                                          { result = val[0] }
    	| CONSTANT                                            { result = val[0] }
    	| STRING_LITERAL                                      { result = val[0] }
    	| '(' expression ')'                                  { result = make_node('(', val[1], nil) }
    	| AT_STRING_LITERAL                                   { result = val[0] }
    	| '[' expression selector_with_arguments ']'          { result = make_node('M', val[1], val[2]) }
      | '[' TYPE_NAME selector_with_arguments ']'           { result = make_node('M', val[1], val[2]) }
    	| AT_SELECTOR '(' selector ')'                        { result = node_set_children(val[0], val[2], nil) }
    	| AT_ENCODE '(' type_name ')'                         { result = node_set_children(val[0], val[2], nil) }
    	# these two rules allow for Objc 3.0 style blocks
    	| '^' compound_statement                              { result = make_node('b', nil, val[1]) }
    	| '^' '(' parameter_type_list ')' compound_statement  { result = make_node('b', val[2], val[4]) }
    	;

    postfix_expression:
    	  primary_expression                                  { result = val[0] }
    	| postfix_expression '[' expression ']'
    	| postfix_expression '(' ')'                          { result = make_node('f', val[0], nil) }
    	| postfix_expression '(' argument_expression_list ')' { result = make_node('f', val[0], val[2]) }
    	| postfix_expression '.' IDENTIFIER                   { result = node_set_children(val[1], val[0], val[2]) }
    	| postfix_expression PTR_OP IDENTIFIER
      | type_name IDENTIFIER                                { result = make_node('d', val[0], val[1]) }
    	| postfix_expression INC_OP
    	| postfix_expression DEC_OP
    	;

    argument_expression_list:
    	  assignment_expression                               { result = val[0] }
    	| argument_expression_list ',' assignment_expression  { result = make_node(',', val[0], val[2]) }
    	;

    unary_expression:
    	  postfix_expression                                { result = val[0] }
    	| INC_OP unary_expression                           
    	| DEC_OP unary_expression
    	| unary_operator cast_expression                    { result = make_node(',', val[0], val[1]) }
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
    	| '(' type_name ')' cast_expression                 { result = make_node('c', val[1], val[3]) }
    	| '(' type_name ')' '{' struct_component_expression '}'	/* gcc extension to create a temporary struct */
    	;

    multiplicative_expression:
    	  cast_expression                                   { result = val[0] }
    	| multiplicative_expression '*' cast_expression     { result = make_node('*', val[0], val[2]) }
    	| multiplicative_expression '/' cast_expression     { result = make_node('/', val[0], val[2]) }
    	| multiplicative_expression '%' cast_expression     { result = make_node('%', val[0], val[2]) }
    	;

    additive_expression:
    	  multiplicative_expression                         { result = val[0] }
    	| additive_expression '+' multiplicative_expression { result = make_node('+', val[0], val[2]) }
    	| additive_expression '-' multiplicative_expression { result = make_node('-', val[0], val[2]) }
    	;

    shift_expression:
    	  additive_expression                               { result = val[0] }
    	| shift_expression LEFT_OP additive_expression      { result = make_node(:LEFT_OP, val[0], val[2]) }
    	| shift_expression RIGHT_OP additive_expression     { result = make_node(:RIGHT_OP, val[0], val[2]) }
    	;

    relational_expression:
    	  shift_expression                                  { result = val[0] }
    	| relational_expression '<' shift_expression        { result = make_node('<', val[0], val[2]) }
    	| relational_expression '>' shift_expression        { result = make_node('>', val[0], val[2]) }
    	| relational_expression LE_OP shift_expression      { result = make_node(:LE_OP, val[0], val[2]) }
    	| relational_expression GE_OP shift_expression      { result = make_node(:GE_OP, val[0], val[2]) }
    	;

    equality_expression:
    	  relational_expression                             { result = val[0] }
    	| equality_expression EQ_OP relational_expression   { result = make_node(:EQ_OP, val[0], val[2]) }
    	| equality_expression NE_OP relational_expression   { result = make_node(:NE_OP, val[0], val[2]) }
    	;

    and_expression:
    	  equality_expression                               { result = val[0] }
    	| and_expression '&' equality_expression            { result = make_node('&', val[0], val[2]) }
    	;

    exclusive_or_expression:
    	  and_expression                                    { result = val[0] }
    	| exclusive_or_expression '^' and_expression        { result = make_node('^', val[0], val[2]) }
    	;

    inclusive_or_expression:
    	  exclusive_or_expression                           { result = val[0] }
    	| inclusive_or_expression '|' exclusive_or_expression { result = make_node('|', val[0], val[2]) }
    	;

    logical_and_expression:
    	  inclusive_or_expression                           { result = val[0] }
    	| logical_and_expression AND_OP inclusive_or_expression { result = make_node(:AND_OP, val[0], val[2]) }
    	;

    logical_or_expression:
    	  logical_and_expression                            { result = val[0] }
    	| logical_or_expression OR_OP logical_and_expression  { result = make_node(:OR_OP, val[0], val[2]) }
    	;

    conditional_expression:
    	  logical_or_expression                             { result = val[0] }
    	| logical_or_expression '?' expression ':' conditional_expression { result = make_node('?', val[0], make_node(',', val[2], val[4])) }
    	;

    assignment_expression:
    	  conditional_expression                            { result = val[0] }
    	| unary_expression assignment_operator assignment_expression  { result = node_set_children(val[1], val[0], val[2]) }
    	;

    assignment_operator:
    	  '='                                               { result = val[0] }
    	| MUL_ASSIGN                                        { result = val[0] }
    	| DIV_ASSIGN                                        { result = val[0] }
    	| MOD_ASSIGN                                        { result = val[0] }
    	| ADD_ASSIGN                                        { result = val[0] }
    	| SUB_ASSIGN                                        { result = val[0] }
    	| LEFT_ASSIGN                                       { result = val[0] }
    	| RIGHT_ASSIGN                                      { result = val[0] }
    	| AND_ASSIGN                                        { result = val[0] }
    	| XOR_ASSIGN                                        { result = val[0] }
    	| OR_ASSIGN                                         { result = val[0] }
    	;

    expression:
    	  assignment_expression                             { result = val[0] }
    	| expression ',' assignment_expression
    	;

    constant_expression:
    	  conditional_expression                            { result = val[0] }
    	;

    class_name_list:
    	  class_identifier_or_type_name                     { result = val[0] }
    	| class_name_list ',' class_identifier_or_type_name { result = make_node(',', val[0], val[2]) }
    	;

    class_with_superclass:
    	  class_identifier_or_type_name                     { result = make_node(',', val[0], nil) }
    	| class_identifier_or_type_name ':' class_identifier_or_type_name  { result = make_node(',', val[0], val[2]) }
    	;

    category_name:
    	  class_identifier_or_type_name                     { result = val[0] }
    	;
    
    class_identifier_or_type_name:
        IDENTIFIER                                        { result = val[0] }
      | TYPE_NAME                                         { result = val[0] }
      ;

    inherited_protocols:
    	  protocol_list                                     {result = val[0] }
    	;

    class_name_declaration:
    	  class_with_superclass {
    	    result = make_node(',', val[0], make_node(',', nil, nil))
    	    register_class_name_from_declaration(val[0].left.value)
    	  }
    	| class_with_superclass '<' inherited_protocols '>' {
    	    result = make_node(',', val[0], make_node(',', val[2], nil))
    	    register_class_name_from_declaration(val[0].left.value)
    	  }
    	| class_with_superclass '(' category_name ')' {
    	    result = make_node(',', val[0], make_node(',', nil, val[2]))
    	    register_class_name_from_declaration(val[0].left.value)
    	  }
    	| class_with_superclass '<' inherited_protocols '>' '(' category_name ')' {
    	    result = make_node(',', val[0], make_node(',', val[2], val[5]))
    	    register_class_name_from_declaration(val[0].left.value)
    	  }
    	;

    class_or_instance_method_specifier: 
        '+'                                               { result =  val[0] }
      | '-'                                               { result =  val[0] }
      ;

    do_atribute_specifier:
    	  ONEWAY                                            { result =  val[0] }
    	| IN                                                { result =  val[0] }
    	| OUT                                               { result =  val[0] }
    	| INOUT                                             { result =  val[0] }
    	| BYREF                                             { result =  val[0] }
    	| BYCOPY                                            { result =  val[0] }
    	;

    objc_declaration_specifiers:
    	  do_atribute_specifier objc_declaration_specifiers
    	| type_name                                         { result =  val[0] }
    	;

    selector_argument_declaration:
    	  '(' objc_declaration_specifiers ')' IDENTIFIER    { result =  make_node(',', val[1], val[3]) }
    	;

    selector_with_argument_declaration:
    	  IDENTIFIER                                                                            { result =  val[0] }
    	| IDENTIFIER ':' selector_argument_declaration                                          { result =  make_node(':', val[0], val[2]) }
    	| selector_with_argument_declaration IDENTIFIER ':' selector_argument_declaration    { result =  make_node(',', val[0], make_node(':', val[1], val[3])) }
    	| selector_with_argument_declaration ',' ELLIPSIS
    	;

    method_declaration:
    	  class_or_instance_method_specifier '(' objc_declaration_specifiers ')' selector_with_argument_declaration {
    	    result = make_node('m', make_node(',', val[0], val[2]), val[4])
    	  }
    	| AT_PROPERTY '(' property_attributes_list ')' specifier_qualifier_list struct_declarator_list {
    	    result = make_node(:AT_PROPERTY, val[2], make_node(',', val[4],val[5]))
    	  }
      | AT_PROPERTY specifier_qualifier_list struct_declarator_list   {
      	  result = make_node(:AT_PROPERTY, nil, make_node(',', val[1],val[2]))
      	}
      ;

    method_declaration_list:
    	  method_declaration ';'                            { result =  val[0] }
    	| AT_OPTIONAL method_declaration ';'                { result =  make_node(:AT_OPTIONAL, val[1], nil) }
    	| AT_REQUIRED method_declaration ';'                { result =  make_node(:AT_REQUIRED, val[1], nil) }
    	| method_declaration_list method_declaration ';'    { result =  make_node(',', val[0], val[1]) }
    	;

    ivar_declaration_list:
    	  '{' struct_declaration_list '}'                   { result =  val[1] }
    	| '{' '}'                                           { result =  nil }
    	;
    
    class_implementation:
    	  class_identifier_or_type_name                       { result = make_node(',', val[0], nil) }
    	| class_identifier_or_type_name '(' category_name ')' { result = make_node(',', val[0], val[2]) }
      ;
    
    method_implementation_declaration:
        class_or_instance_method_specifier '(' objc_declaration_specifiers ')' selector_with_argument_declaration {
  	      result = make_node(',', make_node(',', val[0], val[2]), val[4])
  	    }
  	  ;
  	
    method_implementation:
    	  method_implementation_declaration compound_statement      { result = make_node('m', val[0], val[1]) }
    	| method_implementation_declaration ';' compound_statement  { result = make_node('m', val[0], val[2]) }
    	| AT_SYNTHESIZE ivar_list ';'                               { result = make_node(:AT_SYNTHESIZE, val[1], nil) }
    	;

    method_implementation_list:
    	  method_implementation                             { result = val[0] }
    	| method_implementation_list method_implementation  { result = make_node(',', val[0], val[1]) }
    	;

    objc_declaration:
    	  AT_CLASS class_name_list ';'                                                                    { result = node_set_children(val[0], val[1], nil) }
    	| AT_PROTOCOL class_name_declaration AT_END                                                       { result = node_set_children(val[0], val[1], nil)	}
    	| AT_PROTOCOL class_name_declaration method_declaration_list AT_END                               { result = node_set_children(val[0], val[1], val[2]) }
    	| AT_INTERFACE class_name_declaration AT_END                                                      { result = node_set_children(val[0], make_node(',', val[1], nil), nil) }
    	| AT_INTERFACE class_name_declaration ivar_declaration_list method_declaration_list AT_END        { result = node_set_children(val[0], make_node(',', val[1], val[2]), val[3]) }
    	| AT_INTERFACE class_name_declaration ivar_declaration_list AT_END                                { result = node_set_children(val[0], make_node(',', val[1], val[2]), nil) }
    	| AT_INTERFACE class_name_declaration method_declaration_list AT_END                              { result = node_set_children(val[0], make_node(',', val[1], nil), val[2]) }
    	| AT_IMPLEMENTATION class_implementation AT_END                                                   { result = node_set_children(val[0], make_node(',', val[1], nil), nil) }
    	| AT_IMPLEMENTATION class_implementation ivar_declaration_list AT_END                             { result = node_set_children(val[0], make_node(',', val[1], val[2]), nil) }
    	| AT_IMPLEMENTATION class_implementation method_implementation_list AT_END                        { result = node_set_children(val[0], make_node(',', val[1], nil), val[2]) }
    	| AT_IMPLEMENTATION class_implementation ivar_declaration_list method_implementation_list AT_END  { result = node_set_children(val[0], make_node(',', val[1], val[2]), val[3]) }
    	;

    declaration:
    	  declaration_specifiers ';'                        { result = make_node('d', val[0], nil) }
    	| declaration_specifiers init_declarator_list ';'   { result = make_node('d', val[0], val[1]) }  
    	| objc_declaration                                  { result = val[0] }
    	;

    declaration_specifiers:
    	  storage_class_specifier                           { result = val[0] }
    	| storage_class_specifier declaration_specifiers    { result = make_node(',', val[0], val[1]) }
    	| type_specifier                                    { result = val[0] }
    	| type_specifier declaration_specifiers             { result = make_node(',', val[0], val[1]) }
    	| type_qualifier                                    { result = val[0] }
    	| type_qualifier declaration_specifiers             { result = make_node(',', val[0], val[1]) }
    	;

    init_declarator_list:
    	  init_declarator                                   { result = val[0] }
    	| init_declarator_list ',' init_declarator          { result = make_node(',', val[0], val[2]) }
    	;

    init_declarator:
    	  declarator                                        { result = val[0] }
    	| declarator '=' initializer                        { result = make_node('=', val[0], val[2]) }
    	;

    storage_class_specifier:
    	  TYPEDEF                                           { result = val[0] }  
    	| EXTERN                                            { result = val[0] }
    	| STATIC                                            { result = val[0] }
    	| AUTO                                              { result = val[0] }
    	| REGISTER                                          { result = val[0] }
    	;

    protocol_list:
    	  class_identifier_or_type_name                     { result = val[0] }
    	| protocol_list ',' class_identifier_or_type_name   { result = make_node(',', val[0], val[2]) }

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
    	  struct_or_union IDENTIFIER '{' struct_declaration_list '}'  { result = node_set_children(val[0], val[1], val[3]) }
    	| struct_or_union '{' struct_declaration_list '}'             { result = node_set_children(val[0], nil, val[2]) }
    	| struct_or_union IDENTIFIER                                  { result = node_set_children(val[0], val[1], nil) }
    	;

    struct_or_union:
    	  STRUCT                                            { result = val[0] }
    	| UNION                                             { result = val[0] }
    	;

    struct_declaration_list:
    	  struct_declaration                                { result = val[0] }
    	| struct_declaration_list struct_declaration        { result = make_node(',', val[0], val[1]) }
    	;

    property_attributes_list:
    	  IDENTIFIER                                        { result = val[0] }
    	| IDENTIFIER ',' property_attributes_list           { result = make_node(',', val[0], val[2]) }
    	;

    struct_declaration:
    	  specifier_qualifier_list struct_declarator_list ';'                                               { result = make_node('i', val[0], val[1]) }
    	| AT_PRIVATE specifier_qualifier_list struct_declarator_list ';'
    	| AT_PUBLIC specifier_qualifier_list struct_declarator_list ';'
    	| AT_PROTECTED specifier_qualifier_list struct_declarator_list ';'
    	| AT_PROPERTY '(' property_attributes_list ')' specifier_qualifier_list struct_declarator_list ';'
    	| AT_PROPERTY specifier_qualifier_list struct_declarator_list ';'
    	| AT_SYNTHESIZE ivar_list ';'
    	;

    ivar_list:
    	  ivar_list IDENTIFIER                              { result = make_node(',', val[0], val[1]) }
    	| IDENTIFIER                                        { result = val[0] }
    	;

    specifier_qualifier_list:
    	  type_specifier specifier_qualifier_list           { result = make_node(',', val[0], val[1]) }
    	| type_specifier                                    { result = val[0] }
    	| type_qualifier specifier_qualifier_list           { result = make_node(',', val[0], val[1]) }
    	| type_qualifier                                    { result = val[0] }
    	;

    struct_declarator_list:
    	  struct_declarator                                 { result = val[0] }
    	| struct_declarator_list ',' struct_declarator      { result = make_node(',', val[0], val[2]) }
    	;

    struct_declarator:
    	  declarator                                        { result = val[0] }
    	| ':' constant_expression                           { result = make_node(':', nil, val[1]) }
    	| declarator ':' constant_expression                { result = make_node(':', val[0], val[2]) }
    	;

    enum_specifier:
    	  ENUM '{' enumerator_list '}'                      { result = node_set_children(val[0], nil, val[2]) }
    	| ENUM IDENTIFIER '{' enumerator_list '}'           { result = node_set_children(val[0], val[1], val[3]) }
    	| ENUM IDENTIFIER                                   { result = node_set_children(val[0], val[1], nil) }
    	;

    enumerator_list:
    	  enumerator                                        { result = val[0] }
    	| enumerator_list ',' enumerator                    { result = make_node(',', val[0], val[2]) }
    	;

    enumerator:
    	  IDENTIFIER                                        { result = val[0] }
    	| IDENTIFIER '=' constant_expression                { result = make_node('=', val[0], val[2]) }
    	;

    type_qualifier:
    	  CONST                                             { result = val[0] }
    	| VOLATILE                                          { result = val[0] }
    	| WEAK                                              { result = val[0] }
    	| STRONG                                            { result = val[0] }
    	;

    declarator:
    	  pointer direct_declarator                         { result = make_node('*', val[0], val[1]) }   # For now ignore missing pointer ref's.
    	| direct_declarator                                 { result = val[0] }
    	;

    direct_declarator:
    	  IDENTIFIER                                        { result = val[0] }
    	| '(' declarator ')'
    	| direct_declarator '[' constant_expression ']'
    	| direct_declarator '[' ']'
    	| direct_declarator '(' parameter_type_list ')'     { result = make_node('f', val[0], val[2]) }
    	| direct_declarator '(' identifier_list ')'         { result = make_node('f', val[0], val[2]) }
    	| direct_declarator '(' ')'                         { result = make_node('f', val[0], val[2]) }
    	;

    pointer:
    	  '*'                                               { result = val[0] }
    	| '*' type_qualifier_list                           { result = make_node(val[0], val[1], nil) }
    	| '*' pointer                                       { result = make_node(val[0], val[1], nil) }
    	| '*' type_qualifier_list pointer                   { result = make_node(val[0], val[1], val[2]) }
    	;

    type_qualifier_list:
    	  type_qualifier                                    { result = val[0] }
    	| type_qualifier_list type_qualifier                { result = make_node(',', val[0], val[1]) }
    	;

    parameter_type_list:
    	  parameter_list                                    { result = val[0] }
    	| parameter_list ',' ELLIPSIS                       { result = val[0] }
    	;

    parameter_list:
    	  parameter_declaration                             { result = val[0] }
    	| parameter_list ',' parameter_declaration          { result = make_node(',', val[0], val[2]) }
    	;

    parameter_declaration:
    	  declaration_specifiers declarator                 { result = make_node('d', val[0], val[1]) }
    	| declaration_specifiers abstract_declarator        { result = make_node('d', val[0], val[1]) }
    	| declaration_specifiers                            { result = val[0] }
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
    	  labeled_statement                                 { result = val[0] }
    	# this ensures that compond statements get {} around them in js to protect scope
    	| compound_statement                                { result = make_node('{', val[0], nil) } 
    	| expression_statement                              { result = val[0] }
    	| selection_statement                               { result = val[0] }
    	| iteration_statement                               { result = val[0] }
    	| jump_statement                                    { result = val[0] }
    	| AT_CATCH                                          { result = val[0] }
    	| AT_TRY                                            { result = val[0] }
    	;

    labeled_statement:
    	  IDENTIFIER ':' statement
    	| CASE constant_expression ':' statement
    	| DEFAULT ':' statement
    	;

    compound_statement:
    	  '{' '}'                                           { result = nil }
    	| '{' statement_list '}'                            { result = val[1] }
    	| '{' declaration_list '}'                          { result = val[1] }
    	| '{' declaration_list statement_list '}'           { result = make_node(',', val[1], val[2]) }
    	;

    declaration_list:
    	  declaration                                       { result = val[0] }
    	| declaration_list declaration                      { result = make_node(',', val[0], val[1]) }
    	;

    statement_list:
    	  statement                                         { result = val[0] }
    	| statement_list statement                          { result = make_node(',', val[0], val[1]) }
    	;

    expression_statement:
    	  ';'                                               { result = node_set_children(val[0], nil, nil) }
    	| expression ';'                                    { result = node_set_children(val[1], val[0], nil) }
    	;

    selection_statement:
    	  IF '(' expression ')' statement                   { result = node_set_children(val[0], make_node(',', val[2], val[4]), nil) }
    	| IF '(' expression ')' statement ELSE statement    { result = node_set_children(val[0], make_node(',', val[2], val[4]), node_set_children(val[5], val[6], nil)) }
    	| SWITCH '(' expression ')' statement               { result = node_set_children(val[0], val[2], val[4]) }
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
    	| RETURN ';'                                        { result = node_set_children(val[0], nil, nil) }
    	| RETURN expression ';'                             { result = node_set_children(val[0], val[1], nil) }
    	;

    translation_unit:
    	  external_declaration                              { result = val[0] }
    	| translation_unit external_declaration             { result = make_node ',', val[0], val[1] }
    	;

    external_declaration:
    	  function_definition { 
    	    result = val[0]
    	    deal_with_declaration(result)
    	  }
    	| declaration {
    	    result = val[0]
    	    deal_with_declaration(result)
    	  }
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
	  
	  scanner = current_scanner()
	  return [false, false] if scanner.nil?
	  
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
        @parsing_stack.last.current_line += 1
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
        @parsing_stack.last.current_line += match.scan(/\n/).size
        return next_token()
      when scanner.scan(/\/\//)
        #single line comment. scan all input (does not include new line char, so skips)
        scanner.scan_until(/.*/)
        return next_token()
      when scanner.scan(/auto(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:AUTO, :AUTO)
      when scanner.scan(/break(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:BREAK, :BREAK)
      when scanner.scan(/case(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:CASE, :CASE)
      when scanner.scan(/char(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:CHAR, "char")
      when scanner.scan(/const(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:CONST, :CONST)
      when scanner.scan(/continue(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:CONTINUE, :CONTINUE)
      when scanner.scan(/default(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:DEFAULT, :DEFAULT)
      when scanner.scan(/do(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:DO, :DO)
      when scanner.scan(/double(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:DOUBLE, :DOUBLE)
      when scanner.scan(/else(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:ELSE, :ELSE)
      when scanner.scan(/enum(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:ENUM, :ENUM)
      when scanner.scan(/extern(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:EXTERN, :EXTERN)
      when scanner.scan(/float(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:FLOAT, "float")
      when scanner.scan(/for(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:FOR, :FOR)
      when scanner.scan(/goto(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:GOTO, :GOTO)
      when scanner.scan(/if(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:IF, :IF)
      when scanner.scan(/int(?!([a-zA-Z_]|[0-9]))/)
	      return make_token(:INT, "int")
      when scanner.scan(/long(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:LONG, :LONG)
      when scanner.scan(/register(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:REGISTER, :REGISTER)
      when scanner.scan(/return(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:RETURN, :RETURN)
      when scanner.scan(/short(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:SHORT, :SHORT)
      when scanner.scan(/signed(?!([a-zA-Z_]|[0-9]))/)
      #        return make_token(:SIGNED, :SIGNED)
          return next_token()
      when scanner.scan(/sizeof(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:SIZEOF, :SIZEOF)
      when scanner.scan(/static(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:STATIC, :STATIC)
      when scanner.scan(/struct(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:STRUCT, :STRUCT)
      when scanner.scan(/switch(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:SWITCH, :SWITCH)
      when scanner.scan(/typedef(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:TYPEDEF, :TYPEDEF)
      when scanner.scan(/union(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:UNION, :UNION)
      when scanner.scan(/unsigned(?!([a-zA-Z_]|[0-9]))/)
              # return make_token(:UNSIGNED, :UNSIGNED)
              return next_token()
      when scanner.scan(/void(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:VOID, :VOID)
      when scanner.scan(/volatile(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:VOLATILE, :VOLATILE)
      when scanner.scan(/while(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:WHILE, :WHILE)
        
      #  
      # Objective-C 1.0
      # 
      when scanner.scan(/@interface/)
        return make_token(:AT_INTERFACE, :AT_INTERFACE)
      when scanner.scan(/@implementation/)
        return make_token(:AT_IMPLEMENTATION, :AT_IMPLEMENTATION)
      when scanner.scan(/@end/)
        return make_token(:AT_END, :AT_END)
      when scanner.scan(/@class/)
        return make_token(:AT_CLASS, :AT_CLASS)
      when scanner.scan(/@protocol/)
        return make_token(:AT_PROTOCOL, :AT_PROTOCOL)
      when scanner.scan(/@selector/)
        return make_token(:AT_SELECTOR, :AT_SELECTOR)
      when scanner.scan(/@encode/)
        return make_token(:AT_ENCODE, :AT_ENCODE)
      when scanner.scan(/@try/)
        return make_token(:AT_TRY, :AT_TRY)
      when scanner.scan(/@catch/)
        return make_token(:AT_CATCH, :AT_CATCH)
      when scanner.scan(/@protected/)
        return make_token(:AT_PROTECTED, :AT_PROTECTED)
      when scanner.scan(/@private/)
        return make_token(:AT_PRIVATE, :AT_PRIVATE)
      when scanner.scan(/@public/)
        return make_token(:AT_PUBLIC, :AT_PUBLIC)

      when match = scanner.scan(/@\"(\\.|[^\\"])*\"/)
        return make_token(:AT_STRING_LITERAL, match)
      
      # when scanner.scan(/self/)
      #         return make_token(:IDENTIFIER, "self")
        # return make_token(:IDENTIFIER, "self"]
           
      #
      # Objective-C 2.0
      #
      when scanner.scan(/@property/)
        return make_token(:AT_PROPERTY, :AT_PROPERTY)
      when scanner.scan(/@synthesize/)
        return make_token(:AT_SYNTHESIZE, :AT_SYNTHESIZE)
      when scanner.scan(/@optional/)
        return make_token(:AT_OPTIONAL, :AT_OPTIONAL)
      when scanner.scan(/@required/)
        return make_token(:AT_REQUIRED, :AT_REQUIRED)
      
      #
      # C constants, identifiers and string literals
      #
      when match = scanner.scan(/id(?!([a-zA-Z_]|[0-9]))/)
       return make_token(:TYPE_NAME, match)
      when match = scanner.scan(/BOOL(?!([a-zA-Z_]|[0-9]))/)
        return make_token(:TYPE_NAME, match)
      when match = scanner.scan(/[a-zA-Z_]([a-zA-Z_]|[0-9])*/)
        return lookup_type(match)
      when match = scanner.scan(/[a-zA-Z_]([a-zA-Z_])*/)
        return lookup_type(match)
      when match = scanner.scan(/0[xX][a-fA-F0-9]+(u|U|l|L)?/)
        return make_token(:CONSTANT, match)
      when match = scanner.scan(/0[0-9]+(u|U|l|L)?/)
        return make_token(:CONSTANT, match)
      when match = scanner.scan(/[0-9]+(u|U|l|L)?/) # {D}+{IS}?
        return make_token(:CONSTANT, match)
      #when match = scanner.scan(//) # L?'(\\.|[^\\'])+'
      #  return make_token(:CONSTANT, match]
      #when match = scanner.scan(//) # {D}+{E}{FS}?
      #  return make_token(:CONSTANT, match]
      #when match = scanner.scan(//) # {D}*"."{D}+({E})?{FS}?
      #  return make_token(:CONSTANT, match]
      #when match = scanner.scan(//) # {D}+"."{D}*({E})?{FS}?
      #  return make_token(:CONSTANT, match]
      #when match = scanner.scan(//) # L?\"(\\.|[^\\"])*\"
      #  return make_token(:STRING_LITERAL, match]
      
      #
      # C operators, assignments and other syntactical bits and pieces
      #  
      when scanner.scan(/\.\.\./)
       return make_token(:ELLIPSIS, :ELLIPSES)
      when scanner.scan(/>>=/)
       return make_token(:RIGHT_ASSIGN, :RIGHT_ASSIGN)
      when scanner.scan(/<<=/)
       return make_token(:LEFT_ASSIGN, :LEFT_ASSIGN)
      when scanner.scan(/\+=/)
       return make_token(:ADD_ASSIGN, :ADD_ASSIGN)
      when scanner.scan(/-=/)
       return make_token(:SUB_ASSIGN, :SUB_ASSIGN)
      when scanner.scan(/\*=/)
       return make_token(:MUL_ASSIGN, :MUL_ASSIGN)
      when scanner.scan(/\/=/)
       return make_token(:DIV_ASSIGN, :DIV_ASSIGN)
      when scanner.scan(/%=/)
       return make_token(:MOD_ASSIGN, :MOD_ASSIGN)
      when scanner.scan(/&=/)
       return make_token(:AND_ASSIGN, :AND_ASSIGN)
      when scanner.scan(/\^=/)
       return make_token(:XOR_ASSIGN, :XOR_ASSIGN)
      when scanner.scan(/\|=/)
       return make_token(:OR_ASSIGN, :OR_ASSIGN)
      when scanner.scan(/>>/)
       return make_token(:RIGHT_OP, :RIGHT_OP)
      when scanner.scan(/<</)
       return make_token(:LEFT_OP, :LEFT_OP)
      when scanner.scan(/\+\+/)
       return make_token(:INC_OP, :INC_OP)
      when scanner.scan(/--/)
       return make_token(:DEC_OP, :DEC_OP)
      when scanner.scan(/->/)
       return make_token(:PTR_OP, :PTR_OP)
      when scanner.scan(/&&/)
       return make_token(:AND_OP, :AND_OP)
      when scanner.scan(/\|\|/)
       return make_token(:OR_OP, :OR_OP)
      when scanner.scan(/<=/)
       return make_token(:LE_OP, :LE_OP)
      when scanner.scan(/>=/)
       return make_token(:GE_OP, :GE_OP)
      when scanner.scan(/\=\=/)
       return make_token(:EQ_OP, :EQ_OP)
      when scanner.scan(/\!\=/)
       return make_token(:NE_OP, :NE_OP)
      when scanner.scan(/;/)
        return make_token(';', ';')
      when scanner.scan(/\{/)
        return make_token('{', '{')
      when scanner.scan(/\}/)
        return make_token('}', '}')
      when scanner.scan(/,/)
        return make_token(',', ',')
      when scanner.scan(/:/)
        return make_token(':', ':')
      when scanner.scan(/\=/)
        return make_token('=', '=')   
      when scanner.scan(/\(/)
        return make_token('(', '(')
      when scanner.scan(/\)/)
        return make_token(')', ')')
      when scanner.scan(/\[/)
        return make_token('[', '[')
      when scanner.scan(/\]/)
        return make_token(']', ']')
      when scanner.scan(/\./)
        return make_token('.', '.')
      when scanner.scan(/\&/)
        return make_token('&', '&')
      when scanner.scan(/\!/)
        return make_token('!', '!')
      when scanner.scan(/\~/)
        return make_token('~', '~')
      when scanner.scan(/\-/)
        return make_token('-', '-')
      when scanner.scan(/\+/)
        return make_token('+', '+')
      when scanner.scan(/\*/)
        return make_token('*', '*')
      when scanner.scan(/\//)
        return make_token('/', '/')
      when scanner.scan(/\%/)
        return make_token('%', '%')
      when scanner.scan(/\</)
        return make_token('<', '<')
      when scanner.scan(/\>/)
        return make_token('>', '>')
      when scanner.scan(/\^/)
        return make_token('^', '^')
      when scanner.scan(/\|/)
        return make_token('|', '|')
      when scanner.scan(/\?/)
        return make_token('?', '?')
      
      else
        abort "#{current_file.file_name}:#{current_file.current_line}:error: unknown token type: #{scanner.peek(5)}"
      
      #when scanner.scan(/.*/)
	      #puts "wow"
	      # throw error: bad character
    end
	end
  
---- footer ----
# stuff that will come after the definition of ObjectiveCParser