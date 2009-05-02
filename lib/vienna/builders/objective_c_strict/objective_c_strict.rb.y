# 
#  objective_c_strict.rb.y
#  vienna
#  
#  Created by Adam Beynon on 2009-05-02.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

class ObjectiveCParser
  
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
       translation_unit                                        { result = val[0] };
 
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
    	  IDENTIFIER
    	| IDENTIFIER ':' IDENTIFIER
    	;

    category_name:
    	  IDENTIFIER
    	;

    inherited_protocols:
    	  protocol_list
    	;

    class_name_declaration:
    	  class_with_superclass
    	| class_with_superclass '<' inherited_protocols '>'
    	| class_with_superclass '(' category_name ')'
    	| class_with_superclass '<' inherited_protocols '>' '(' category_name ')'
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
    	  class_or_instance_method_specifier '(' objc_declaration_specifiers ')' selector_with_argument_declaration

    method_declaration_list:
    	  method_declaration ';'
    	| AT_OPTIONAL method_declaration ';'
    	| AT_REQUIRED method_declaration ';'
    	| method_declaration_list method_declaration ';'
    	;

    ivar_declaration_list:
    	  '{' struct_declaration_list '}'
    	;

    class_implementation:
    	  IDENTIFIER
    	| IDENTIFIER '(' category_name ')'

    method_implementation:
    	  method_declaration compound_statement
    	| method_declaration ';' compound_statement
    	;

    method_implementation_list:
    	  method_implementation
    	| method_implementation_list method_implementation
    	;

    objc_declaration:
    	  AT_CLASS class_name_list ';'
    	| AT_PROTOCOL class_name_declaration AT_END
    	| AT_PROTOCOL class_name_declaration method_declaration_list AT_END
    	| AT_INTERFACE class_name_declaration AT_END
    	| AT_INTERFACE class_name_declaration ivar_declaration_list method_declaration_list AT_END
    	| AT_INTERFACE class_name_declaration ivar_declaration_list AT_END
    	| AT_IMPLEMENTATION class_implementation AT_END
    	| AT_IMPLEMENTATION class_implementation ivar_declaration_list AT_END
    	| AT_IMPLEMENTATION class_implementation method_implementation_list AT_END
    	| AT_IMPLEMENTATION class_implementation ivar_declaration_list method_implementation_list AT_END
    	;

    declaration:
    	  declaration_specifiers ';'
    	| declaration_specifiers init_declarator_list ';'
    	| objc_declaration
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
    	  IDENTIFIER
    	| protocol_list ',' IDENTIFIER

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
    	  struct_declaration
    	| struct_declaration_list struct_declaration
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
    	  external_declaration
    	| translation_unit external_declaration
    	;

    external_declaration:
    	  function_definition
    	| declaration
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
	
	def make_tokens str
	  scanner = StringScanner.new str
	  
	  until scanner.empty?
	    case
	      #
	      # Pre-processor macros
	      #
        when scanner.scan(/(#include|#import)/)
          include_directive = scanner.scan_until(/.*/).strip!
          puts " # Import Directive: #{include_directive}"
	      
	      when scanner.scan(/#define/)
	        define_directive = scanner.scan_until(/.*/).strip!
	        puts " # Define Directive: #{define_directive}" 
	      
	      when scanner.scan(/\n/)
	        #do nothing on new line
	      when scanner.scan(/[ \t\v\f]/)
	        #puts "hmm"
	        # do nothing
	      when scanner.scan(/[\t ]+/)
	        #puts "hmmmmmm"
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
	        @tokens << [:AUTO, nil]
	      when scanner.scan(/break/)
	        @tokens << [:BREAK, nil]
	      when scanner.scan(/case/)
	        @tokens << [:CASE, nil]
	      when scanner.scan(/char/)
	        @tokens << [:CHAR, nil]
	      when scanner.scan(/const/)
	        @tokens << [:CONST, nil]
	      when scanner.scan(/continue/)
	        @tokens << [:CONTINUE, nil]
	      when scanner.scan(/default/)
	        @tokens << [:DEFAULT, nil]
	      when scanner.scan(/do/)
	        @tokens << [:DO, nil]
	      when scanner.scan(/double/)
	        @tokens << [:DOUBLE, nil]
	      when scanner.scan(/else/)
	        @tokens << [:ELSE, nil]
	      when scanner.scan(/enum/)
	        @tokens << [:ENUM, nil]
	      when scanner.scan(/extern/)
	        @tokens << [:EXTERN, nil]
	      when scanner.scan(/float/)
	        @tokens << [:FLOAT, nil]
	      when scanner.scan(/for/)
	        @tokens << [:FOR, nil]
	      when scanner.scan(/goto/)
	        @tokens << [:GOTO, nil]
	      when scanner.scan(/if/)
	        @tokens << [:IF, nil]
	      when scanner.scan(/int/)
  	      @tokens << [:INT, nil]
	      when scanner.scan(/long/)
	        @tokens << [:LONG, nil]
	      when scanner.scan(/register/)
	        @tokens << [:REGISTER, nil]
	      when scanner.scan(/return/)
	        @tokens << [:RETURN, nil]
	      when scanner.scan(/short/)
	        @tokens << [:SHORT, nil]
	      when scanner.scan(/signed/)
	        @tokens << [:SIGNED, nil]
	      when scanner.scan(/sizeof/)
	        @tokens << [:SIZEOF, nil]
	      when scanner.scan(/static/)
	        @tokens << [:STATIC, nil]
	      when scanner.scan(/struct/)
	        @tokens << [:STRUCT, nil]
	      when scanner.scan(/switch/)
	        @tokens << [:SWITCH, nil]
	      when scanner.scan(/typedef/)
	        @tokens << [:TYPEDEF, nil]
	      when scanner.scan(/union/)
	        @tokens << [:UNION, nil]
	      when scanner.scan(/unsigned/)
	        @tokens << [:SIGNED, nil]
	      when scanner.scan(/void/)
	        @tokens << [:VOID, nil]
	      when scanner.scan(/volatile/)
	        @tokens << [:VOLATILE, nil]
	      when scanner.scan(/while/)
	        @tokens << [:WHILE, nil]
	        
	      #  
	      # Objective-C 1.0
	      # 
	      when scanner.scan(/@interface/)
	        @tokens << [:AT_INTERFACE, nil]
	      when scanner.scan(/@implementation/)
	        @tokens << [:AT_IMPLEMENTATION, nil]  
	      when scanner.scan(/@end/)
	        @tokens << [:AT_END, nil]
	      when scanner.scan(/@class/)
	        @tokens << [:AT_CLASS, nil]
	      when scanner.scan(/@protocol/)
	        @tokens << [:AT_PROTOCOL, nil]  
	      when scanner.scan(/@selector/)
	        @tokens << [:AT_SELECTOR, nil]
	      when scanner.scan(/@encode/)
	        @tokens << [:AT_ENCODE, nil]
	      when scanner.scan(/@try/)
	        @tokens << [:AT_TRY, nil]
	      when scanner.scan(/@catch/)
	        @tokens << [:AT_CATCH, nil]
	      when scanner.scan(/@protected/)
	        @tokens << [:AT_PROTECTED, nil]
	      when scanner.scan(/@private/)
	        @tokens << [:AT_PRIVATE, nil]
	      when scanner.scan(/@public/)
	        @tokens << [:AT_PUBLIC, nil]
	
        when match = scanner.scan(/@\"(\\.|[^\\"])*\"/)
          @tokens << [:AT_STRING_LITERAL, match]
        
        when scanner.scan(/self/)
	        @tokens << [:IDENTIFIER, "self"]
	           
	      #
	      # Objective-C 2.0
	      #
        when scanner.scan(/@property/)
          @tokens << [:AT_PROPERTY, nil]
        when scanner.scan(/@synthesize/)
          @tokens << [:AT_SYNTHESIZE, nil]
	      when scanner.scan(/@optional/)
          @tokens << [:AT_OPTIONAL, nil]
        when scanner.scan(/@required/)
          @tokens << [:AT_REQUIRED, nil]
	      
	      #
	      # C constants, identifiers and string literals
	      #
	      when match = scanner.scan(/[a-zA-Z_]([a-zA-Z_])*/)
	        @tokens << [:IDENTIFIER, match]
	      when match = scanner.scan(/[a-zA-Z_]([a-zA-Z_]|[0-9])*/)
	        @tokens << [:IDENTIFIER, match]
        when match = scanner.scan(/0[xX][a-fA-F0-9]+(u|U|l|L)?/)
          @tokens << [:CONSTANT, match]
	      when match = scanner.scan(/0[0-9]+(u|U|l|L)?/)
	        @tokens << [:CONSTANT, match]
	      #when match = scanner.scan(//) # {D}+{IS}?
	      #  @tokens << [:CONSTANT, match]
	      #when match = scanner.scan(//) # L?'(\\.|[^\\'])+'
	      #  @tokens << [:CONSTANT, match]
	      #when match = scanner.scan(//) # {D}+{E}{FS}?
	      #  @tokens << [:CONSTANT, match]
	      #when match = scanner.scan(//) # {D}*"."{D}+({E})?{FS}?
	      #  @tokens << [:CONSTANT, match]
	      #when match = scanner.scan(//) # {D}+"."{D}*({E})?{FS}?
	      #  @tokens << [:CONSTANT, match]
	      #when match = scanner.scan(//) # L?\"(\\.|[^\\"])*\"
	      #  @tokens << [:STRING_LITERAL, match]
	      
	      #
	      # C operators, assignments and other syntactical bits and pieces
	      #  
        when scanner.scan(/\.\.\./)
         @tokens << [:ELLIPSIS, nil]
        when scanner.scan(/>>=/)
         @tokens << [:RIGHT_ASSIGN, nil]
        when scanner.scan(/<<=/)
         @tokens << [:LEFT_ASSIGN, nil]
        when scanner.scan(/\+=/)
         @tokens << [:ADD_ASSIGN, nil]
        when scanner.scan(/-=/)
         @tokens << [:SUB_ASSIGN, nil]
        when scanner.scan(/\*=/)
         @tokens << [:MUL_ASSIGN, nil]
        when scanner.scan(/\/=/)
         @tokens << [:DIV_ASSIGN, nil]
        when scanner.scan(/%=/)
         @tokens << [:MOD_ASSIGN, nil]
        when scanner.scan(/&=/)
         @tokens << [:AND_ASSIGN, nil]
        when scanner.scan(/^=/)
         @tokens << [:XOR_ASSIGN, nil]
        when scanner.scan(/\|=/)
         @tokens << [:OR_ASSIGN, nil]
        when scanner.scan(/>>/)
         @tokens << [:RIGHT_OP, nil]
        when scanner.scan(/<</)
         @tokens << [:LEFT_OP, nil]
        when scanner.scan(/\+\+/)
         @tokens << [:INC_OP, nil]
        when scanner.scan(/--/)
         @tokens << [:DEC_OP, nil]
        when scanner.scan(/->/)
         @tokens << [:PTR_OP, nil]
        when scanner.scan(/&&/)
         @tokens << [:AND_OP, nil]
        when scanner.scan(/\|\|/)
         @tokens << [:OR_OP, nil]
        when scanner.scan(/<=/)
         @tokens << [:LE_OP, nil]
        when scanner.scan(/>=/)
         @tokens << [:GE_OP, nil]
        when scanner.scan(/\=\=/)
         @tokens << [:EQ_OP, nil]
        when scanner.scan(/\!\=/)
         @tokens << [:NE_OP, nil]
	      when scanner.scan(/;/)
          @tokens << [';', ';']
        when scanner.scan(/\{/)
          @tokens << ['{', '{']
        when scanner.scan(/\}/)
          @tokens << ['}', '}']
        when scanner.scan(/,/)
          @tokens << [',', ',']  
        when scanner.scan(/:/)
          @tokens << [':', ':']    
        when scanner.scan(/\=/)
          @tokens << ['=', '=']    
        when scanner.scan(/\(/)
          @tokens << ['(', '(']
        when scanner.scan(/\)/)
          @tokens << [')', ')']
        when scanner.scan(/\[/)
          @tokens << ['[', '[']
        when scanner.scan(/\]/)
          @tokens << [']', ']']  
        when scanner.scan(/\./)
          @tokens << ['.', '.']  
        when scanner.scan(/\&/)
          @tokens << ['&', '&']  
	      when scanner.scan(/\!/)
          @tokens << ['!', '!']
	      when scanner.scan(/\~/)
          @tokens << ['~', '~']
	      when scanner.scan(/\-/)
          @tokens << ['-', '-']
	      when scanner.scan(/\+/)
          @tokens << ['+', '+']
	      when scanner.scan(/\*/)
          @tokens << ['*', '*']
	      when scanner.scan(/\//)
          @tokens << ['/', '/']
	      when scanner.scan(/\%/)
          @tokens << ['%', '%']
	      when scanner.scan(/\</)
          @tokens << ['<', '<']
	      when scanner.scan(/\>/)
          @tokens << ['>', '>']
	      when scanner.scan(/\^/)
          @tokens << ['^', '^']
	      when scanner.scan(/\|/)
          @tokens << ['|', '|']
	      when scanner.scan(/\?/)
          @tokens << ['?', '?']
	      else
	        puts "agagagagag"
	      
	      #when scanner.scan(/.*/)
  	      #puts "wow"
  	      # throw error: bad character
	    end
    end
	end
	
	attr_reader :tokens
	
	def initialize
	  @tokens = []
	 # make array of objective-c implmenetations
	end
	
	def on_error(error_token_id, error_value, value_stack)
    msg = "parse error "
  	msg << "after #{value_stack.last} " if value_stack.length > 1
  	msg << "after #{value_stack.last} " unless value_stack.empty?
  	msg << "on #{token_to_str(error_token_id)} #{error_value}"
  	puts msg
  	#raise ParseError, msg
  end
  
  def tokenize_string(string)
    # parse string here
    make_tokens(string)
    @tokens << [false, false]
  end
  
  def tokenize_file(file)
    f = File.new(file)
    text = f.read
    tokenize_string(text)
  end
  	
	def parse
	 #@tokens = tokens
	 do_parse
	 puts "Finished parsing"
	end
	
	def next_token
	  @tokens.shift
  end
  
---- footer ----
# stuff that will come after the definition of ObjectiveCParser