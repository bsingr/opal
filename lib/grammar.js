var Parser = require('jison').Parser;

var Operators = [
  ["left",          "<<", ">>"],
  ["right",         "IF_MOD", "WHILE_MOD"],
  ["left",          "AND_OR_OP"],
  ["right",         "NOT"],
  ["nonassoc",      "DEFINED"],
  ["right",         "=", "OP_ASGN"],
  ["left",          "RESCUE_MOD"],
  ["right",         "?", ":"],
  ["nonassoc",      "RANGE_OP"],
  ["left",          "||"],
  ["left",          "&&"],
  ["nonassoc",      "EQUALITY_OP"],
  ["left",          "<", "COMPARE_OP"],
  ["left",          "|", "^"],
  ["left",          "&"],
  ["left",          "+", "-"],
  ["left",          "MATH_OP"],
  ["right",         "UNARY"],
  ["right",         "**"]
];

var Grammar = {
  S: [
    ["CompStatements EOF",                                                      "return $1;"]
  ],
  
  BodyStatements: [
    ["CompStatements OptRescue OptElse OptEnsure",                              "$$ = ['bodystmt', $1, $2, $3, $4];"]
  ],
  
  OptRescue: [
    ["",                                                                        "$$ = [];"],
    ["RESCUE ExcList ExcVar Then CompStatements OptRescue",                     "$$ = [['rescue', $2, $3, $5]].concat($6);"]
  ],
  
  ExcList: [
    ["",                                                                        ""],
    ["ArgValue",                                                                ""]
  ],
  
  ExcVar: [
    ["",                                                                        "$$ = null;"],
    ["=> IDENTIFIER",                                                           "$$ = $2;"]
  ],
  
  OptElse: [
    ["",                                                                        ""]
  ],
  
  OptEnsure: [
    ["",                                                                        ""]
  ],
  
  CompStatements: [
    ["Statements OptTerms",                                                     "$$ = ['compstmt', $1];"]
  ],
  
  Statements: [
    ["",                                                                        "$$ = [];"],
    ["Statement",                                                               "$$ = [$1];"],
    ["Statements Terms Statement",                                              "$$ = $1; $1.push($3);"]
  ],
  
  Statement: [
    ["Statement IF_MOD Expression",                                             "$$ = ['if_mod', $2, $3, $1];"],
    ["Statement WHILE_MOD Expression",
    
      "$$ = ['while_mod', $2, $3, $1];"],
      
    ["Statement RESCUE_MOD Statement",                                          "$$ = ['rescue_mod', $1, $3];"],
    ["Expression",                                                              ""]
  ],
  
  Expression: [
    ["CommandCall",                                                             ""],
    ["Expression AND_OR_OP Expression",                                         "$$ = [$2, $1, $3];"],
    ["NOT Expression",                                                          "$$ = ['unary', '!', $2];"],
    ["Arg",                                                                     ""]
  ],
  
  Arg: [    
    ["Arg RANGE_OP Arg",
      
        "$$ = ['range', $2, $1, $3];"],
        
    ["Arg + Arg",                                                               "$$ = ['call', $1, $2, [[$3]]];"],
    ["Arg - Arg",                                                               "$$ = ['call', $1, $2, [[$3]]];"],
    ["Arg MATH_OP Arg",                                                         "$$ = ['call', $1, $2, [[$3]]];"],
    ["Arg ** Arg",                                                              "$$ = ['call', $1, $2, [[$3]]];"],
    ["UNARY Arg",                                                               "$$ = ['unary', $1, $2];"],
    ["Arg | Arg",                                                               "$$ = ['call', $1, $2, [[$3]]];"],
    ["Arg & Arg",                                                               "$$ = ['call', $1, $2, [[$3]]];"],
    ["Arg ^ Arg",                                                               "$$ = ['call', $1, $2, [[$3]]];"],
    ["Arg EQUALITY_OP Arg",                                                     "$$ = ['call', $1, $2, [[$3]]];"],
    ["Arg < Arg",                                                               "$$ = ['call', $1, $2, [[$3]]];"],
    ["Arg COMPARE_OP Arg",                                                      "$$ = ['call', $1, $2, [[$3]]];"],
    ["Arg << Arg",                                                              "$$ = ['call', $1, $2, [[$3]]];"],
    ["Arg >> Arg",                                                              "$$ = ['call', $1, $2, [[$3]]];"],
    ["Arg && Arg",                                                              "$$ = ['and', $1, $3];"],
    ["Arg || Arg",                                                              "$$ = ['or', $1, $3];"],
    ["DEFINED OptNewline Arg",                                                  ""],
    ["Arg ? Arg : Arg",                                                         "$$ = ['ternary', $1, $3, $5];"],
    ["PrimaryValue",                                                            ""]
  ],
  
  CommandCall: [
  ],
  
  PrimaryValue: [
    ["Primary",                                                                 ""]
  ],
  
  Primary: [
    ["Literal", ""],
    
    ["VarRef", ""],
    
    ["ARRAY_BEGIN ArefArgs ARRAY_END",
    
        "$$ = ['array', $2];"],
    
    ["HASH_BEGIN AssocList }",
    
        "$$ = ['hash', $2];"],
    
    ["IF Expression Then CompStatements IfTail END",
    
        "$$ = ['if', $2, $4, $5];"],
    
    ["UNLESS Expression Then CompStatements OptElse END",
    
        "$$ = ['unless', $2, $4, $5];"],
    
    ["WHILE Expression Do CompStatements END",

        "$$ = ['while', $1, $2, $4];"],

    ["BEGIN BodyStatements END",
    
        "$$ = ['begin', $2];"],
    
    ["CASE Expression OptTerms CaseBody END",
    
        "$$ = ['case', $2, $4];"],
    
    ["CASE OptTerms CaseBody END",
    
        "$$ = ['case', null, $3];"],
    
    ["Class", ""],
    
    ["Def", ""],
    
    ["MethodCall",
      
        "$$ = $1;"],
    
    ["MethodCall BraceBlock",
    
        "$$ = ['brace_call', $1, $2];"],
    
    ["Assignable", ""],
    
    ["VarRef = Arg",
    
        "$$ = ['assign', $1, $3];"],
    
    ["Assignable = Arg",                                                        
    
        "$$ = ['assign', $1, $3];"],
    
    ["VarRef MRHS= Mrhs",
    
        "$$ = ['assign', $1, $3];"],
    
    ["Assignable MRHS= Mrhs",

        "$$ = ['assign', $1, $3];"],
    
    ["VarRef OP_ASGN Arg",

        "$$ = ['op_asgn', $2, $1, $3];"],
    
    ["Assignable OP_ASGN Arg",
        
        "$$ = ['op_asgn', $2, $1, $3];"],
    
    ["PAREN_BEGIN CompStatements PAREN_END",

        "$$ = ['paren', $2];"]
  ],
  
  Mrhs: [
    ["Args", "$$ = $1[0];"],
    ["Args , STAR ArgValue", "$$ = $1[0];"],
    ["STAR ArgValue", "$$ = $2;"]
  ],
  
  Assignable: [
    ["COLON3 CONSTANT",                                                         ""],
    ["PrimaryValue COLON2 CONSTANT",                                            "$$ = ['colon2', $1, $3];"],
    ["PrimaryValue INDEX_BEGIN ArefArgs INDEX_END",                             "$$ = ['aref', $1, $3];"],
    ["Callable",                                                                ""]
  ],
  
  Callable: [
    ["PrimaryValue . IDENTIFIER",
      
        "$$ = ['call', $1, $3, []];"],
    
    ["IDENTIFIER2",
    
        "$$ = ['call', null, $1, [[]]];"],
        
    ["PrimaryValue . Op",
    
        "$$ = ['call', $1, $3, []];"]
  ],
  
  Literal: [
    ["Numeric", ""],
    ["Symbol",  ""],
    ["XString", ""],
    ["String",  ""],
    ["Words",   ""],
    ["Regexp",  ""]
  ],
  
  Regexp: [
    ["REGEXP_BEGIN XStringContents REGEXP_END",

        "$$ = ['regexp', $2, $3];"]
  ],
  
  String: [
    ["STRING_BEGIN StringContents STRING_END",                                  "$$ = ['string', $2, $3];"]
  ],
  
  XString: [
    ["XSTRING_BEGIN XStringContents XSTRING_END",                               "$$ = ['xstring', $2];"]
  ],
  
  XStringContents: [
    ["",                                                                        "$$ = [];"],
    ["XStringContents StringContent",                                           "$$ = $1.concat([$2]);"]
  ],
  
  StringContents: [
    ["",                                                                        "$$ = [];"],
    ["StringContents StringContent",                                            "$$ = $1.concat([$2]);"]
  ],
  
  StringContent: [
    ["STRING_CONTENT",                                                          "$$ = ['string_content', $1];"],
    ["STRING_DVAR",                                                             "$$ = ['string_dvar', $1];"],
    ["STRING_DBEGIN CompStatements }",                                "$$ = ['string_dbegin', $2];"]
  ],
  
  Words: [
    ["WORDS_BEGIN WordList STRING_END",                                         "$$ = ['words', $2];"]
  ],
  
  WordList: [
    ["",                                                                        "$$ = [];"],
    ["WordList Word",                                                           "$$ = $1.concat([$2]);"]
  ],
  
  Word: [
    ["StringContent",                                                           "$$ = [$1];"],
    ["Word StringContent",                                                      "$$ = $1.concat([$2]);"]
  ],
  
  Numeric: [
    ["INTEGER",                                                                 "$$ = ['numeric', $1];"],
    ["FLOAT",                                                                   "$$ = ['numeric', $1];"]
  ],
  
  Symbol: [
    ["SYMBEG Sym",                                                              "$$ = ['symbol', $2];"]
  ],
  
  Sym: [
    ["DefName",                                                                 "$$ = ['identifier', $1];"],
    ["IVAR",                                                                    "$$ = ['ivar', $1];"],
    ["GVAR",                                                                    "$$ = ['gvar', $1];"],
    ["CVAR",                                                                    "$$ = ['cvar', $1];"]
  ],
  
  DSym: [
    ["SYMBEG XStringContents STRING_END",                                       ""]
  ],
  
  MethodCall: [
    ["Callable ParenArgs",                                                      "$$ = ['method_call', $1, $2];"],
    ["SUPER ParenArgs",                                                         "$$ = ['super', $2];"],
    ["SUPER",                                                                   "$$ = ['super', null];"],
    ["RETURN ParenArgs",                                                        "$$ = ['return', $2];"],
    ["RETURN",                                                                  "$$ = ['return', null];"],
    ["NEXT ParenArgs",                                                          "$$ = ['next', $2];"],
    ["NEXT",                                                                    "$$ = ['next', null];"],
    ["BREAK ParenArgs",                                                         "$$ = ['break', $2];"],
    ["BREAK",                                                                   "$$ = ['break', null];"],
    ["YIELD ParenArgs",                                                         "$$ = ['yield', $2];"],
    ["YIELD",                                                                   "$$ = ['yield', null];"],
    // ["REQUIRE STRING_BEGIN STRING_CONTENT STRING_END",                          "$$ = ['require', $3];"]
    ["REQUIRE Arg",
    
        "$$ = ['require', $2];"]
  ],
  
  Operation: [
    ["IDENTIFIER",                                                              ""]
  ],
  
  BraceBlock: [
    ["CURLY_BEGIN OptBlockVar CompStatements }",                        "$$ = [$2, $3];"],
    ["DO OptBlockVar CompStatements END",                                       "$$ = [$2, $3];"]
  ],
  
  OptBlockVar: [
    ["",                                                                        "$$ = null;"],
    ["||",                                                                      "$$ = null;"],
    ["| BlockParamDef |",                                                       "$$ = $2;"]
  ],
  
  BlockParamDef: [
    ["OptBlockVarDef",                                                          "$$ = [null, $1];"],
    ["BlockParam OptBlockVarDef",                                               "$$ = [$1, $2];"]
  ],
  
  OptBlockVarDef: [
    ["",                                                                        ""],
    ["; BlockVarDefs",                                                          ""]
  ],
  
  BlockVarDefs: [
    ["BlockVar",                                                                ""],
    ["BlockVarDefs , BlockVar",                                                 ""]
  ],
  
  BlockVar: [
    ["IDENTIFIER",                                                              ""]
  ],
  
  BlockParam: [
    ["DefArgs",                                                                 ""]
  ],
  
  Class: [
    ["CLASS ClassPath SuperClass BodyStatements END",                           "$$ = ['class', $2, $3, $4];"],
    ["CLASS << Expression Term BodyStatements END",                             ""],
    ["MODULE ClassPath BodyStatements END",                                     "$$ = ['module', $2, $3];"]
  ],
  
  ClassPath: [
    ["COLON3 ClassName",                                                        "$$ = ['colon3', $2];"],
    ["ClassName",                                                               "$$ = ['constant', $1];"]
    // error with primaryvalue picking up our constant
    // ["PrimaryValue COLON2 ClassName",                                           ""]
  ],
  
  ClassName: [
    ["CONSTANT",                                                                ""]
  ],
  
  SuperClass: [
    ["Term",
        
        "$$ = null;"],
        
    ["< Expression Term",
      
        "$$ = $2;"]
  ],
  
  Def: [
    ["DEF DefName DefArglist BodyStatements END",                               "$$ = ['def', null, $2, $3, $4];"],
    ["SINGLETON_DEF Singleton DotOrColon DefName DefArglist BodyStatements END",          "$$ = ['def', $2, $4, $5, $6];"]
  ],
  
  DefName: [
    ["IDENTIFIER",                                                              ""],
    ["CONSTANT",                                                                ""],
    ["Op",                                                                      ""],
    ["Reswords",                                                                ""]
  ],
  
  Op: [
    ["|", ""],        ["^", ""],          ["&", ""],        ["EQUALITY_OP", ""],     
    ["<", ""],        ["COMPARE_OP", ""], ["<<", ""],       [">>", ""],
    ["+", ""],        ["-", ""],          ["MATH_OP", ""],  ["STAR", ""],
    ["**", ""],       ["UNARY", ""],      ["AREF", ""],     ["ASET", ""],
    ["`", ""]
  ],
  
  Reswords: [
    ["LINE", ""],       ["FILE", ""],       ["ENCODING", ""],
    ["AND_OR_OP", ""],  ["BEGIN", ""],      ["BREAK", ""],
    ["CASE", ""],       ["CLASS", ""],      ["DEF", ""],
    ["DEFINED", ""],    ["DO", ""],         ["ELSE", ""],
    ["ELSIF", ""],      ["END", ""],        ["ENSURE", ""],
    ["FALSE", ""],      ["FOR", ""],        ["IN", ""],
    ["MODULE", ""],     ["NEXT", ""],       ["NIL", ""],
    ["NOT", ""],        ["REDO", ""],
    ["RESCUE", ""],     ["RETRY", ""],      ["RETURN", ""],
    ["SELF", ""],       ["SUPER", ""],      ["THEN", ""],
    ["TRUE", ""],       ["UNDEF", ""],      ["WHEN", ""],
    ["YIELD", ""],      ["IF", ""],         ["UNLESS", ""],
    ["WHILE", ""],      ["UNTIL", ""],      ["BLOCK_GIVEN", ""]
  ],

  DefArglist: [
    ["CALL_BEGIN DefArgs OptNewline CALL_END",                                  "$$ = $2;"],
    ["DefArgs Term",                                                            "$$ = $1;"]
  ],
  
  DefArgs: [
    ["DefArg , DefOptArg , DefRestArg OptDefBlockArg",                          "$$ = [$1, $3, $5, $6];"],
    ["DefArg , DefOptArg OptDefBlockArg",                                       "$$ = [$1, $3, null, $4];"],
    ["DefArg , DefRestArg OptDefBlockArg",                                      "$$ = [$1, [], $3, $4];"],
    ["DefArg OptDefBlockArg",                                                   "$$ = [$1, [], null, $2];"],
    ["DefOptArg , DefRestArg OptDefBlockArg",                                   "$$ = [[], $1, $3, $4];"],
    ["DefOptArg OptDefBlockArg",                                                "$$ = [[], $1, null, $2];"],
    ["DefRestArg OptDefBlockArg",                                               "$$ = [[], [], $1, $2];"],
    ["DefBlockArg",                                                             "$$ = [[], [], null, $1];"],
    ["",                                                                        "$$ = [[], [], null, null];"]
  ],
  
  DefArg: [
    ["IDENTIFIER",                                                              "$$ = [$1];"],
    ["DefArg , IDENTIFIER",                                                     "$$ = $1.concat([$3]);"]
  ],
  
  DefOptArg: [
    ["DefOpt",                                                                  "$$ = [$1];"],
    ["DefOptArg , DefOpt",                                                      "$$ = $1.concat([$3]);"]
  ],
  
  DefOpt: [
    ["IDENTIFIER = ArgValue",                                                   "$$ = [$1, $3];"]
  ],
  
  DefRestArg: [
    ["DefRestArgMark IDENTIFIER",                                               "$$ = $2;"],
    ["DefRestArgMark",                                                          "$$ = null;"]
  ],
  
  DefRestArgMark: [
    ["STAR",                                                                    ""],
    ["STAR2",                                                                   ""]
  ],
  
  OptDefBlockArg: [
    [", DefBlockArg",                                                           "$$ = $2;"],
    ["",                                                                        "$$ = null;"]
  ],
  
  DefBlockArg: [
    ["BlockArgMark IDENTIFIER",                                                 "$$ = $2;"]
  ],
  
  BlockArgMark: [
    ["AMPER2",                                                                  ""],
    ["AMPER",                                                                   ""],
    ["&",                                                                       ""]
  ],
  
  DotOrColon: [
    [".",                                                                       ""],
    ["COLON2",                                                                  ""]
  ],
  
  Singleton: [
    // we need a way to mark singletons...
    ["Variable",
      
        "$$ = $1;"],
        
    ["PARAN_BEGIN Expression OptNewline PARAN_END",                             "$$ = $2;"],
    ["SELF",                                                                    "$$ = $1;"]
  ],
  
  Then: [
    ["Term",                                                                    ""],
    ["THEN",                                                                    ""],
    ["Term THEN",                                                               ""]
  ],
  
  IfTail: [
    ["OptElse",                                                                 "$$ = $1;"],
    ["ELSIF Expression Then CompStatements IfTail",                             "$$ = [['elsif', $2, $4]].concat($5);"]
  ],
  
  OptElse: [
    ["",                                                                        "$$ = [];"],
    ["ELSE CompStatements",                                                     "$$ = [['else', $2]];"]
  ],
  
  CaseBody: [
    ["WHEN Args Then CompStatements Cases",                                     "$$ = [['when', $2, $4]].concat($5);"]
  ],
  
  Cases: [
    ["OptElse",                                                                 "$$ = $1;"],
    ["CaseBody",                                                                "$$ = $1;"]
  ],
  
  ParenArgs: [
    ["CALL_BEGIN CALL_END",                                                     "$$ = [[]];"],
    ["CALL_BEGIN CallArgs OptNewline CALL_END",                                 "$$ = $2;"]
  ],
  
  OptCallArgs: [
    ["",                                                                        "$$ = [[]];"],
    ["CallArgs",                                                                "$$ = $1;"]
  ],
  
  CallArgs: [
    ["Args OptBlockArg",                                                        "$$ = [$1, null, null, $2];"],
    ["Args , STAR ArgValue OptBlockArg",                                        "$$ = [$1, $4, null, $5];"],
    ["Assocs OptBlockArg",                                                      "$$ = [null, null, $1, $2];"],
    ["Args , Assocs OptBlockArg",                                               "$$ = [$1, null, $3, $4];"],
    ["STAR ArgValue OptBlockArg",                                               "$$ = [null, $2, null, $3];"],
    ["BlockArg",                                                                "$$ = [null, null, null, $1];"]
  ],
  
  Args: [
    ["ArgValue",                                                                "$$ = [$1];"],
    ["Args , ArgValue",                                                         "$$ = $1.concat([$3]);"]
  ],
  
  OptBlockArg: [
    [", BlockArg",                                                              "$$ = $2;"],
    ["",                                                                        "$$ = null;"]
  ],
  
  BlockArg: [
    ["AMPER ArgValue",                                                          "$$ = $2;"],
    ["& ArgValue",                                                              "$$ = $2;"]
  ],
  
  VarRef: [
    ["Variable",                                                                ""]
  ],
  
  VarLhs: [
    ["Variable",                                                                ""]
  ],
  
  Variable: [
    ["IDENTIFIER",                                                              "$$ = ['identifier', $1];"],
    ["CONSTANT",                                                                "$$ = ['constant', $1];"],
    ["IVAR",                                                                    "$$= ['ivar', $1];"],
    ["CVAR",                                                                    ""],
    ["GVAR",                                                                    "$$ = ['gvar', $1];"],
    ["NIL",                                                                     "$$ = ['nil', $1];"],
    ["SELF",                                                                    "$$ = ['self', $1];"],
    ["TRUE",                                                                    "$$ = ['true', $1];"],
    ["FALSE",                                                                   "$$ = ['false', $1];"],
    ["FILE",                                                                    "$$ = ['file'];"],
    ["LINE",                                                                    "$$ = ['line', $1];"],
    ["BLOCK_GIVEN",                                                             "$$ = ['block_given', $1];"]
  ],
  
  Lhs: [
  ],
  
  ArefArgs: [
    ["",                                                                        "$$ = null;"],
    ["Args Trailer",                                                            "$$ = $1;"],
    ["Assocs Trailer",                                                          ""]
  ],
  
  AssocList: [
    ["",                                                                        "$$ = [];"],
    ["Assocs Trailer",                                                          "$$ = $1;"]
  ],
  
  Assocs: [
    ["Assoc",                                                                   "$$ = [$1];"],
    ["Assocs , Assoc",                                                          "$$ = $1.concat([$3]);"]
  ],
  
  Assoc: [
    ["ArgValue => ArgValue",                                                    "$$ = [$1, $3];"]
  ],
  
  ArgValue: [
    ["Arg",                                                                     ""]
  ],
  
  OptTerms: [
    ["",                                                                        ""],
    ["Terms",                                                                   ""]
  ],
  
  OptNewline: [
    ["",                                                                        ""],
    ["\\n",                                                                     ""]
  ],
  
  Trailer: [
    ["",                                                                        ""],
    ["\\n",                                                                     ""],
    [",",                                                                       ""]
  ],
  
  Terms: [
    ["Term",                                                                    ""],
    ["Terms ;",                                                                 ""]
  ],
  
  Term: [
    [";",                                                                       ""],
    ["\\n",                                                                     ""]
  ],
  
  Do: [
    ["DO",    ""],
    ["Term",  ""]
  ]
};

exports.Parser = new Parser({
  moduleName:   'RubyParser',
  bnf:          Grammar,
  operators:    Operators,
  startSymbol:  'S',
  tokens: "UNLESS + - IF END"
});
