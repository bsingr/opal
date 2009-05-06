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
    	  IDENTIFIER
    	| CONSTANT
    	| STRING_LITERAL
    	| '(' expression ')'
    	| AT_STRING_LITERAL
    	| '[' expression selector_with_arguments ']'
    	| AT_SELECTOR '(' selector ')'
    	| AT_ENCODE '(' type_name ')'
    	# these two rules allow for Objc 3.0 style blocks
    	| '^' compound_statement
    	| '^' '(' parameter_type_list ')' compound_statement
    	;

    postfix_expression:
    	  primary_expression
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
    	  postfix_expression
    	| INC_OP unary_expression
    	| DEC_OP unary_expression
    	| unary_operator cast_expression
    	| SIZEOF unary_expression
    	| SIZEOF '(' type_name ')'
    	;

    unary_operator:
    	  '&'
    	| '*'
    	| '+'
    	| '-'
    	| '~'
    	| '!'
    	;

    cast_expression:
    	  unary_expression
    	| '(' type_name ')' cast_expression
    	| '(' type_name ')' '{' struct_component_expression '}'	/* gcc extension to create a temporary struct */
    	;

    multiplicative_expression:
    	  cast_expression
    	| multiplicative_expression '*' cast_expression
    	| multiplicative_expression '/' cast_expression
    	| multiplicative_expression '%' cast_expression
    	;

    additive_expression:
    	  multiplicative_expression
    	| additive_expression '+' multiplicative_expression
    	| additive_expression '-' multiplicative_expression
    	;

    shift_expression:
    	  additive_expression
    	| shift_expression LEFT_OP additive_expression
    	| shift_expression RIGHT_OP additive_expression
    	;

    relational_expression:
    	  shift_expression
    	| relational_expression '<' shift_expression
    	| relational_expression '>' shift_expression
    	| relational_expression LE_OP shift_expression
    	| relational_expression GE_OP shift_expression
    	;

    equality_expression:
    	  relational_expression
    	| equality_expression EQ_OP relational_expression
    	| equality_expression NE_OP relational_expression
    	;

    and_expression:
    	  equality_expression
    	| and_expression '&' equality_expression
    	;

    exclusive_or_expression:
    	  and_expression
    	| exclusive_or_expression '^' and_expression
    	;

    inclusive_or_expression:
    	  exclusive_or_expression
    	| inclusive_or_expression '|' exclusive_or_expression
    	;

    logical_and_expression:
    	  inclusive_or_expression
    	| logical_and_expression AND_OP inclusive_or_expression
    	;

    logical_or_expression:
    	  logical_and_expression
    	| logical_or_expression OR_OP logical_and_expression
    	;

    conditional_expression:
    	  logical_or_expression
    	| logical_or_expression '?' expression ':' conditional_expression
    	;

    assignment_expression:
    	  conditional_expression
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
    	  assignment_expression
    	| expression ',' assignment_expression
    	;

    constant_expression:
    	  conditional_expression
    	;

    class_name_list:
    	  IDENTIFIER
    	| class_name_list ',' IDENTIFIER
    	;

    class_with_superclass:
    	  IDENTIFIER                                                                    { result = Vienna::Node.new(',', val[0], nil) }
    	| IDENTIFIER ':' IDENTIFIER                                                     { result = Vienna::Node.new(',', val[0], val[2]) }
    	;

    category_name:
    	  IDENTIFIER { 
    	    result = val[0] 
    	  }
    	;

    inherited_protocols:
    	  protocol_list {
    	    result = val[0]
    	  }
    	;

    class_name_declaration:
    	  class_with_superclass {
    	    result = Vienna::Node.new(',', val[0], nil)
    	  }
    	| class_with_superclass '<' inherited_protocols '>' {
    	    result = Vienna::Node.new(',', val[0], Vienna::Node.new(',', val[2], nil))
    	  }
    	| class_with_superclass '(' category_name ')' {
    	    result = Vienna::Node.new(',', val[0], Vienna::Node.new(',', nil, val[2]))
    	  }
    	| class_with_superclass '<' inherited_protocols '>' '(' category_name ')' {
    	    result = Vienna::Node.new(',', val[0], Vienna::Node.new(',', val[2], val[5]))
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
    	| type_name
    	;

    selector_argument_declaration:
    	  '(' objc_declaration_specifiers ')' IDENTIFIER
    	;

    selector_with_argument_declaration:
    	  IDENTIFIER
    	| IDENTIFIER ':' selector_argument_declaration 
    	| selector_with_argument_declaration selector_component selector_argument_declaration
    	| selector_with_argument_declaration ',' ELLIPSIS
    	;

    method_declaration:
    	  class_or_instance_method_specifier '(' objc_declaration_specifiers ')' selector_with_argument_declaration {
    	    result = Vienna::Node.new(',', Vienna::Node.new(',', val[0], val[2]), val[4])
    	  }
    	| AT_PROPERTY '(' property_attributes_list ')' specifier_qualifier_list struct_declarator_list {
    	    result = Vienna::Node.new(:AT_PROPERTY, val[2], Vienna::Node.new(',', val[4],val[5]))
    	  }
      | AT_PROPERTY specifier_qualifier_list struct_declarator_list   {
      	  result = Vienna::Node.new(:AT_PROPERTY, nil, Vienna::Node.new(',', val[1],val[2]))
      	}
      ;

    method_declaration_list:
    	  method_declaration ';'
    	| AT_OPTIONAL method_declaration ';'
    	| AT_REQUIRED method_declaration ';'
    	| method_declaration_list method_declaration ';'
    	;

    ivar_declaration_list:
    	  '{' struct_declaration_list '}' {
    	    result =  val[2]
    	  }
    	;
    
    class_implementation:
    	  IDENTIFIER {
    	    result = val[1]
    	  }
    	| IDENTIFIER '(' category_name ')' {
    	    result = Vienna::Node.new(',', val[1], val[3])
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
      	}
    	| AT_PROTOCOL class_name_declaration AT_END {
      	  result = Vienna::Node.new(:AT_PROTOCOL, val[1], nil)
    	    new_protocol = ObjectiveCProtocol.new_from_parse_tree(result)
    	    add_protocol_declaration(new_protocol)
      	}
    	| AT_PROTOCOL class_name_declaration method_declaration_list AT_END {
    	    result = Vienna::Node.new(:AT_PROTOCOL, val[1], val[2])
    	    new_protocol = ObjectiveCProtocol.new_from_parse_tree(result)
    	    add_protocol_declaration(new_protocol)
    	  }
    	| AT_INTERFACE class_name_declaration AT_END {
    	    result = Vienna::Node.new(:AT_INTERFACE, Vienna::Node.new(',', val[1], nil), nil)
    	    new_interface = ObjectiveCInterface.new_from_parse_tree(result)
    	    add_interface_declaration(new_interface)
    	  }
    	| AT_INTERFACE class_name_declaration ivar_declaration_list method_declaration_list AT_END {
    	    result = Vienna::Node.new(:AT_INTERFACE, Vienna::Node.new(',', val[1], val[2]), val[3])
    	    new_interface = ObjectiveCInterface.new_from_parse_tree(result)
    	    add_interface_declaration(new_interface)
    	  }
    	| AT_INTERFACE class_name_declaration ivar_declaration_list AT_END {
    	    result = Vienna::Node.new(:AT_INTERFACE, Vienna::Node.new(',', val[1], val[2]), nil)
    	    new_interface = ObjectiveCInterface.new_from_parse_tree(result)
    	    add_interface_declaration(new_interface)
    	  }
    	| AT_IMPLEMENTATION class_implementation AT_END { 
    	    result = Vienna::Node.new(:AT_IMPLEMENTATION, Vienna::Node.new(',', val[1], nil), nil)
    	    new_implementation = ObjectiveCImplementation.new_from_parse_tree(result)
    	    add_implementation_defintion(new_implementation)
    	  }
    	| AT_IMPLEMENTATION class_implementation ivar_declaration_list AT_END {
    	    result = Vienna::Node.new(:AT_IMPLEMENTATION, Vienna::Node.new(',', val[1], val[2]), nil)
    	    new_implementation = ObjectiveCImplementation.new_from_parse_tree(result)
    	    add_implementation_defintion(new_implementation)
    	  }
    	| AT_IMPLEMENTATION class_implementation method_implementation_list AT_END {
    	    result = Vienna::Node.new(:AT_IMPLEMENTATION, Vienna::Node.new(',', val[1], nil), val[2])
    	    new_implementation = ObjectiveCImplementation.new_from_parse_tree(result)
    	    add_implementation_defintion(new_implementation)
    	  }
    	| AT_IMPLEMENTATION class_implementation ivar_declaration_list method_implementation_list AT_END {
    	    result = Vienna::Node.new(:AT_IMPLEMENTATION, Vienna::Node.new(',', val[1], val[2]), val[3])
    	    new_implementation = ObjectiveCImplementation.new_from_parse_tree(result)
    	    add_implementation_defintion(new_implementation)
    	  }
    	;

    declaration:
    	  declaration_specifiers ';'
    	| declaration_specifiers init_declarator_list ';'
    	| objc_declaration { 
    	    result = val[0]
    	  }
    	;

    declaration_specifiers:
    	  storage_class_specifier
    	| storage_class_specifier declaration_specifiers
    	| type_specifier
    	| type_specifier declaration_specifiers
    	| type_qualifier
    	| type_qualifier declaration_specifiers
    	;

    init_declarator_list:
    	  init_declarator
    	| init_declarator_list ',' init_declarator
    	;

    init_declarator:
    	  declarator
    	| declarator '=' initializer
    	;

    storage_class_specifier:
    	  TYPEDEF
    	| EXTERN
    	| STATIC
    	| AUTO
    	| REGISTER
    	;

    protocol_list:
    	  IDENTIFIER                                                                    { result = val[0] }
    	| protocol_list ',' IDENTIFIER                                                  { result = Vienna::Node.new(',', val[0], val[2]) }

    type_specifier:
    	  VOID
    	| CHAR
    	| SHORT
    	| INT
    	| LONG
    	| FLOAT
    	| DOUBLE
    	| SIGNED
    	| UNSIGNED
    	| struct_or_union_specifier
    	| enum_specifier
    	| TYPE_NAME
    	| ID
    	| ID '<' protocol_list '>'
    	| SEL
    	| BOOL
    	| UNICHAR
    	| CLASS
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
    	  specifier_qualifier_list struct_declarator_list ';'
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
    	  type_specifier specifier_qualifier_list
    	| type_specifier
    	| type_qualifier specifier_qualifier_list
    	| type_qualifier
    	;

    struct_declarator_list:
    	  struct_declarator
    	| struct_declarator_list ',' struct_declarator
    	;

    struct_declarator:
    	  declarator
    	| ':' constant_expression
    	| declarator ':' constant_expression
    	;

    enum_specifier:
    	  ENUM '{' enumerator_list '}'
    	| ENUM IDENTIFIER '{' enumerator_list '}'
    	| ENUM IDENTIFIER
    	;

    enumerator_list:
    	  enumerator
    	| enumerator_list ',' enumerator
    	;

    enumerator:
    	  IDENTIFIER
    	| IDENTIFIER '=' constant_expression
    	;

    type_qualifier:
    	  CONST
    	| VOLATILE
    	| WEAK
    	| STRONG
    	;

    declarator:
    	  pointer direct_declarator
    	| direct_declarator
    	;

    direct_declarator:
    	  IDENTIFIER
    	| '(' declarator ')'
    	| direct_declarator '[' constant_expression ']'
    	| direct_declarator '[' ']'
    	| direct_declarator '(' parameter_type_list ')'
    	| direct_declarator '(' identifier_list ')'
    	| direct_declarator '(' ')'
    	;

    pointer:
    	  '*'
    	| '*' type_qualifier_list
    	| '*' pointer
    	| '*' type_qualifier_list pointer
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
	  
	  if @scanners.size == 0
	    puts" No more scanners"
	    return [false, false]
    end
	  
	  scanner = @scanners.last
	  
	  if !scanner
      return [false, false]
    end
	  
	  if scanner.empty?
	    puts "Reached end of file. Swap to next file"
	    @scanners.slice!(@scanners.size - 1)
	    return next_token()
	  end
	  
	  case
      #
      # Pre-processor macros
      #
      when scanner.scan(/(#include|#import)/)
        pp_directive = scanner.scan_until(/.*/).strip!
        puts " # Import Directive: #{pp_directive}"
        tokenize_file("MyFile.h")
        return next_token()
      
      when scanner.scan(/#define/)
        pp_directive = scanner.scan_until(/.*/).strip!
        puts " # Define Directive: #{pp_directive}"
        return next_token()
        
      when scanner.scan(/#undef/)
        pp_directive = scanner.scan_until(/.*/).strip!
        puts " # Undef Directive: #{pp_directive}" 
      
      when scanner.scan(/\n/)
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
        scanner.scan_until(/\*\//)
      when scanner.scan(/\/\//)
        #single line comment. scan all input (does not include new line char, so skips)
        scanner.scan_until(/.*/)
      when scanner.scan(/auto/)
        return [:AUTO, :AUTO]
      when scanner.scan(/break/)
        return [:BREAK, :BREAK]
      when scanner.scan(/case/)
        return [:CASE, :CASE]
      when scanner.scan(/char/)
        return [:CHAR, :CHAR]
      when scanner.scan(/const/)
        return [:CONST, :CONST]
      when scanner.scan(/continue/)
        return [:CONTINUE, :CONTINUE]
      when scanner.scan(/default/)
        return [:DEFAULT, :DEFAULT]
      when scanner.scan(/do/)
        return [:DO, :DO]
      when scanner.scan(/double/)
        return [:DOUBLE, :DOUBLE]
      when scanner.scan(/else/)
        return [:ELSE, :ELSE]
      when scanner.scan(/enum/)
        return [:ENUM, :ENUM]
      when scanner.scan(/extern/)
        return [:EXTERN, :EXTERN]
      when scanner.scan(/float/)
        return [:FLOAT, :FLOAT]
      when scanner.scan(/for/)
        return [:FOR, :FOR]
      when scanner.scan(/goto/)
        return [:GOTO, :GOTO]
      when scanner.scan(/if/)
        return [:IF, :IF]
      when scanner.scan(/int/)
	      return [:INT, :INT]
      when scanner.scan(/long/)
        return [:LONG, :LONG]
      when scanner.scan(/register/)
        return [:REGISTER, :REGISTER]
      when scanner.scan(/return/)
        return [:RETURN, :RETURN]
      when scanner.scan(/short/)
        return [:SHORT, :SHORT]
      when scanner.scan(/signed/)
        return [:SIGNED, :SIGNED]
      when scanner.scan(/sizeof/)
        return [:SIZEOF, :SIZEOF]
      when scanner.scan(/static/)
        return [:STATIC, :STATIC]
      when scanner.scan(/struct/)
        return [:STRUCT, :STRUCT]
      when scanner.scan(/switch/)
        return [:SWITCH, :SWITCH]
      when scanner.scan(/typedef/)
        return [:TYPEDEF, :TYPEDEF]
      when scanner.scan(/union/)
        return [:UNION, :UNION]
      when scanner.scan(/unsigned/)
        return [:SIGNED, :UNSIGNED]
      when scanner.scan(/void/)
        return [:VOID, :VOID]
      when scanner.scan(/volatile/)
        return [:VOLATILE, :VOLATILE]
      when scanner.scan(/while/)
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
      when match = scanner.scan(/[a-zA-Z_]([a-zA-Z_])*/)
        return [:IDENTIFIER, match]
      when match = scanner.scan(/[a-zA-Z_]([a-zA-Z_]|[0-9])*/)
        return [:IDENTIFIER, match]
      when match = scanner.scan(/0[xX][a-fA-F0-9]+(u|U|l|L)?/)
        return [:CONSTANT, match]
      when match = scanner.scan(/0[0-9]+(u|U|l|L)?/)
        return [:CONSTANT, match]
      #when match = scanner.scan(//) # {D}+{IS}?
      #  return [:CONSTANT, match]
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