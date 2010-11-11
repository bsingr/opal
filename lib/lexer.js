if (typeof require !== 'undefined') {
  var StringScanner = require('./string_scanner').StringScanner,
      Optimizer     = require('./optimizer').Optimizer;
}
    
var EXPR_BEG    = 0,    EXPR_END    = 1,    EXPR_ENDARG = 2,    EXPR_ARG   = 3,
    EXPR_CMDARG = 4,    EXPR_MID    = 5,    EXPR_FNAME  = 6,    EXPR_DOT   = 7,
    EXPR_CLASS  = 8,    EXPR_VALUE  = 9;
    
var Lexer = exports.Lexer = function(string) {
  return this;
};

Lexer.prototype.tokenize = function(string) {
  var token;
  
  this._string = string;
  this._scanner = new StringScanner(string);
  this.lex_state = EXPR_BEG;
  this._tokens = [];
  this._string_parse_stack = [];
  this._line_number = 1;
  
  while ((token = this.next_token()) && token[0] !== false) {
    token[2] = this._line_number;
    this._tokens.push(token);
  } 
  
  // console.log("## Pre Optimize:\n");
  // for (var i = 0; i < this._tokens.length; i++) {
  //   console.log(this._tokens[i]);
  // }
  // 
  this._tokens = new Optimizer(this._tokens).optimize();
  // console.log("\n## Post Optimize:\n")
  // for (var i = 0; i < this._tokens.length; i++) {
    // console.log(this._tokens[i]);
  // }
  // console.log("\n");
  return this._tokens;
};

Lexer.prototype.current_string_parse = function() {
  if (this._string_parse_stack.length == 0) return null;
  return this._string_parse_stack[this._string_parse_stack.length - 1];
};

Lexer.prototype.push_string_parse = function(o) {
  this._string_parse_stack.push(o);
};

Lexer.prototype.pop_string_parse = function() {
  this._string_parse_stack.pop();
};

Lexer.prototype.next_string_token = function() {
  var str_parse = this.current_string_parse(), scanner = this._scanner;
  // print("string end is " + str_parse.end);
  // see if we can read end of string/xstring/regexp markers
  if (scanner.scan( new RegExp('^\\' + str_parse.end))) {
    this.pop_string_parse();
    if (str_parse.beg == '"' || str_parse.beg == "'") {
      this.lex_state = EXPR_END;
      return ['STRING_END', scanner.matched];
    }
    else if (str_parse.beg == '`') {
      // assume to be xstring
      this.lex_state = EXPR_END;
      return ['XSTRING_END', scanner.matched];
    }
    else if (str_parse.beg == '/') {
      var result = "";
      if (scanner.scan(/^\w+/)) {
        result = scanner.matched;
      }
      this.lex_state = EXPR_END;
      return ['REGEXP_END', result];
    }
    // else if (str_parse.end == '}') {
    else { // words?
      this.lex_state = EXPR_END;
      return ['STRING_END', scanner.matched];
    }
    // else {
      // throw "unknown string ending"
    // }
  }
  
  // not end of string, so we must be parsing contents
  var str_buffer = [];
  
  if (scanner.scan(/^#(\$|\@)\w+/)) {
    return ['STRING_DVAR', scanner.matched.substr(2)];
  }
  else if (scanner.scan(/^#\{/)) {
    // we are into ruby code, so stop parsing content (for the moment)
    str_parse.content = false;
    return ['STRING_DBEGIN', scanner.matched];
  }
  // causes error, so we will just collect it later on with other text
  // else if (scanner.scan(/^#/)) {
  //   str_buffer.push('#');
  // }
  
  // content regexp (what is valid content for strings..)
  var reg_exp = (str_parse.beg == '`') ?
              // xstring: CAN include new lines
              new RegExp('[^\\' + str_parse.end + '\#\0]+|.') :
              // normal string: cannot include new lines
              new RegExp('[^\\' + '\\' + str_parse.end + '\#\0\\\n]+|.');
  
  scanner.scan(reg_exp);
  var temp_slash = scanner.matched;
  
  if (scanner.matched === '\\') {
    // console.log("matched backs;ash!");
    if (scanner.scan(new RegExp('^' + str_parse.end))) {
      str_buffer.push(str_parse.end);
      // console.log("finsihed backslash append");
    }
    else {
      scanner.scan(reg_exp);
      str_buffer.push(temp_slash + scanner.matched);
    }
  }
  else {
    str_buffer.push(scanner.matched);
  }
  
  return ['STRING_CONTENT', str_buffer.join('')];
};

Lexer.prototype.next_token = function() {
  var string_scanner;
  if ((string_scanner = this.current_string_parse()) && string_scanner.content){
    return this.next_string_token();
  }
  
  var scanner    = this._scanner,
      space_seen = false,
      c          = '',
      cmd_start  = false;
      
  
  while (true) {
    if (scanner.scan(/^(\ |\t|\r)/)) {
      space_seen = true;
      continue;
    }
    else if (scanner.scan(/^(\n|#)/)) {
      c = scanner.matched;
      if (c == '#') {
        scanner.scan(/^(.*)/);
      }
      else {
        this._line_number++;
      }
      
      scanner.scan(/^(\n+)/);
      this._line_number += scanner.matched.length;
      
      if (this.lex_state == EXPR_BEG) {
        continue;
      }
      cmd_start = true;
      this.lex_state = EXPR_BEG;
      return ["\\n", "\\n"];
    }
    
    else if (scanner.scan(/^\;/)) {
      this.lex_state = EXPR_BEG;
      return [";", ";"];
    }
    
    else if (scanner.scan(/^\"/)) {
      this.push_string_parse({ beg: '"', content: true, end:'"' });
      return ['STRING_BEGIN', scanner.matched];
    }
    else if (scanner.scan(/^\'/)) {
      this.push_string_parse({ beg: "'", content: true, end:"'" });
      return ['STRING_BEGIN', scanner.matched];
    }
    else if (scanner.scan(/^\`/)) {
      this.push_string_parse({ beg: "`", content: true, end: "`" });
      return ["XSTRING_BEGIN", scanner.matched];
    }
    else if (scanner.scan(/^\%[Ww]/)) {
      var start_word = scanner.scan(/^./),
          end_word   = { '(': ')', '[': ']', '{': '}'}[start_word],
          end_word   = end_word || start_word;
      
      this.push_string_parse({ beg: start_word, content: true, end: end_word });
      return ["WORDS_BEGIN", scanner.matched]; 
    }
    
    else if (scanner.scan(/^\//)) {
      if (this.lex_state == EXPR_BEG || this.lex_state == EXPR_MID) {
        this.push_string_parse({ beg: "/", content: true, end: "/" });
        return ["REGEXP_BEGIN", scanner.matched];
      }
      else if (scanner.scan(/^\=/)) {
        this.lex_state = EXPR_BEG;
        return ["OP_ASGN", "/"];
      }
      else if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
      }
      return ["MATH_OP", scanner.matched];
    }
    
    else if (scanner.scan(/^\%/)) {
      if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
      }
      return ["MATH_OP", scanner.matched];
    }
    
    else if (scanner.scan(/^\(/)) {
      var result = 'CALL_BEGIN';
      if (this.lex_state == EXPR_BEG || this.lex_state == EXPR_MID) {
        result = 'PAREN_BEGIN';
      }
      else if (space_seen) {
        result = 'CALL_BEGIN';
      }
      this.lex_state = EXPR_BEG;
      return [result, scanner.matched];
    }
    
    else if (scanner.scan(/^\)/)) {
      this.lex_state = EXPR_END;
      return ["CALL_END", scanner.matched];
    }
    
    
    else if (scanner.scan(/^\[/)) {
      var result = scanner.matched;
      
      if (this.lex_state == EXPR_FNAME || this.lex_state == EXPR_DOT) {
        this.lex_state = EXPR_ARG;
        if (scanner.scan(/^\]\=/)) {
          return ["ASET", "[]="];
        }
        else if (scanner.scan(/^\]/)) {
          return ["AREF", "[]"];
        }
        else {
          throw "error - unexpected '[' token"
        }
      }
      else if (this.lex_state == EXPR_BEG || this.lex_state == EXPR_MID || space_seen) {
        this.lex_state = EXPR_BEG;
        return ["ARRAY_BEGIN", scanner.matched];
      }
      else {
        this.lex_state = EXPR_BEG;
        return ["INDEX_BEGIN", scanner.matched];
      }
    }
    
    else if (scanner.scan(/^\]/)) {
      this.lex_state = EXPR_END;
      return ["ARRAY_END", scanner.matched];
    }
    else if (scanner.scan(/^\}/)) {
      this.lex_state = EXPR_END;
      
      if (this.current_string_parse()) {
        this.current_string_parse().content = true
      }
      // if (string_parse) string_parse.content = true;
      return ["}", scanner.matched];
    }
    
    else if (scanner.scan(/^\.\.\./)) {
      this.lex_state = EXPR_BEG;
      return ["RANGE_OP", scanner.matched];
    }
    else if (scanner.scan(/^\.\./)) {
      this.lex_state = EXPR_BEG;
      return ["RANGE_OP", scanner.matched];
    }
    else if (scanner.scan(/^\./)) {
      if (this.lex_state !== EXPR_FNAME) this.lex_state = EXPR_DOT;
      return [".", scanner.matched];
    }
    
    else if (scanner.scan(/^\*\*\=/)) {
      this.lex_state = EXPR_BEG;
      return ["OP_ASGN", "**"];
    }
    else if (scanner.scan(/^\*\*/)) {
      return ["**", "**"];
    }
    else if (scanner.scan(/^\*\=/)) {
      this.lex_state = EXPR_BEG;
      return ["OP_ASGN", "*"];
    }
    else if (scanner.scan(/^\*/)) {
      if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
        return ["MATH_OP", scanner.matched];
      }
      else if (space_seen && scanner.check(/^\S/)) {
        return ["STAR", scanner.matched];
      }
      else if (this.lex_state == EXPR_BEG || this.lex_state == EXPR_MID) {
        return ["STAR", scanner.matched];
      }
      else {
        this.lex_state = EXPR_BEG;
        return ["MATH_OP", scanner.matched];
      }
    }
    
    else if (scanner.scan(/^\:\:/)) {
      if ([EXPR_BEG, EXPR_MID, EXPR_CLASS].indexOf(this.lex_state) !== -1) {
        this.lex_state = EXPR_BEG;
        return ["COLON3", scanner.matched];
      }
      this.lex_state = EXPR_DOT;
      return ["COLON2", scanner.matched];
    }
    else if (scanner.scan(/^\:/)) {
      if (this.lex_state == EXPR_END || this.lex_state == EXPR_ENDARG || scanner.check(/^\s/)) {
        if (!scanner.check(/^\w/)) {
          return [":", scanner.matched];
        }
        
        this.lex_state = EXPR_FNAME;
        return ["SYMBEG", scanner.matched];
      }
      
      this.lex_state = EXPR_FNAME;
      return ["SYMBEG", scanner.matched];
    }
    
    else if (scanner.check(/^\|/)) {
      if (scanner.scan(/^\|\|\=/)) {
        this.lex_state = EXPR_BEG;
        return ["OP_ASGN", "||"];
      }
      else if (scanner.scan(/^\|\|/)) {
        this.lex_state = EXPR_BEG;
        return ["||", scanner.matched];
      }
      else if (scanner.scan(/^\|\=/)) {
        this.lex_state = EXPR_BEG;
        return ["OP_ASGN", "|"];
      }
      else if (scanner.scan(/^\|/)) {
        if (this.lex_state == EXPR_FNAME) {
          this.lex_state = EXPR_END;
          return ["|", scanner.matched];
        }
        this.lex_state = EXPR_BEG;
        return ["|", scanner.matched];
      }
    }
    
    else if (scanner.scan(/^\^/)) {
      if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
        return ["^", scanner.matched];
      }
      this.lex_state = EXPR_BEG;
      return ["^", scanner.matched];
    }
    
    else if (scanner.scan(/^\&\&\=/)) {
      this.lex_state = EXPR_BEG;
      return ["OP_ASGN", "&&"];
    }
    else if (scanner.scan(/^\&\&/)) {
      this.lex_state = EXPR_BEG;
      return ["&&", scanner.matched];
    }
    else if (scanner.scan(/^\&\=/)) {
      this.lex_state = EXPR_BEG;
      return ["OP_ASGN", "&"];
    }
    else if (scanner.scan(/^\&/)) {
      if (space_seen && !scanner.check(/^\s/)) {
        if (this.lex_state == EXPR_CMDARG) {
          return ["AMPER", scanner.matched];
        }
        else {
          return ["&", scanner.matched];
        }
      }
      else if (this.lex_state == EXPR_BEG || this.lex_state == EXPR_MID) {
        return ["AMPER", scanner.matched];
      }
      else {
        return ["&", scanner.matched];
      }
    }
    
    else if (scanner.scan(/^\<\<\=/)) {
      this.lex_state = EXPR_BEG;
      return ["OP_ASGN", "<<"];
    }
    else if (scanner.scan(/^\<\</)) {
      if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
        return ["<<", "<<"];
      }
      if ([EXPR_END, EXPR_DOT, EXPR_ENDARG, EXPR_CLASS].indexOf(this.lex_state) == -1 && space_seen) {
        this.lex_state = EXPR_BEG;
        return ["<<", "<<"];
      }
      this.lex_state = EXPR_BEG;
      return ["<<", "<<"];
    }
    else if (scanner.scan(/^\<\=\>/)) {
      if (this.lex_state == EXPR_FNAME) this.lex_state = EXPR_END
      else this.lex_state = EXPR_BEG;
      return ["EQUALITY_OP", "<="];
    }
    else if (scanner.scan(/^\<\=/)) {
      if (this.lex_state == EXPR_FNAME) this.lex_state = EXPR_END
      else this.lex_state = EXPR_BEG;
      return ["COMPARE_OP", "<="];
    }
    else if (scanner.scan(/^\</)) {
      if (this.lex_state == EXPR_FNAME) this.lex_state = EXPR_END
      else this.lex_state = EXPR_BEG;
      return ["<", "<"];
    }
    
    else if (scanner.scan(/^\>\=/)) {
      if (this.lex_state == EXPR_FNAME) this.lex_state = EXPR_END
      else this.lex_state = EXPR_BEG;
      return ["COMPARE_OP", scanner.matched];
    }
    else if (scanner.scan(/^\>\>\=/)) {
      return ["OP_ASGN", ">>"];
    }
    else if (scanner.scan(/^\>\>/)) {
      return [">>", scanner.matched];
    }
    else if (scanner.scan(/^\>/)) {
      if (this.lex_state == EXPR_FNAME) this.lex_state = EXPR_END
      else this.lex_state = EXPR_BEG;
      return ["COMPARE_OP", ">"];
    }

    else if (scanner.scan(/^[+-]/)) {
      var result = scanner.matched;
      // var sign = (result == '+') ? 'UPLUS' : 'UMINUS';
      var sign = 'UNARY';
      
      if (this.lex_state == EXPR_BEG || this.lex_state == EXPR_MID) {
        this.lex_state = EXPR_BEG;
        return [sign, result];
      }
      else if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
        if (scanner.scan(/^@/)) {
          return ['IDENTIFIER', result + scanner.matched];
        }
        return [result, result];
      }
      
      if (scanner.scan(/^\=/)) {
        this.lex_state = EXPR_BEG;
        return ["OP_ASGN", result];
      }
      this.lex_state = EXPR_BEG;
      return [result, result];
    }
    
    else if (scanner.scan(/^\?/)) {
      if (this.lex_state = EXPR_END || this.lex_state == EXPR_ENDARG) {
        this.lex_state = EXPR_BEG;
      }
      return ["?", scanner.matched];
    }
    
    else if (scanner.scan(/^\=\=\=/)) {
      if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
        return ["EQUALITY_OP", "==="];
      }
      this.lex_state = EXPR_BEG;
      return ["EQUALITY_OP", "==="];
    }
    else if (scanner.scan(/^\=\=/)) {
      if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
        return ["EQUALITY_OP", "=="];
      }
      this.lex_state = EXPR_BEG;
      return ["EQUALITY_OP", "=="];
    }
    else if (scanner.scan(/^\=\~/)) {
      if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
        return ["EQUALITY_OP", "=~"];
      }
      this.lex_state = EXPR_BEG;
      return ["EQUALITY_OP", "=~"];
    }
    else if (scanner.scan(/^\=\>/)) {
      this.lex_state = EXPR_BEG;
      return ["=>", scanner.matched];
    }
    else if (scanner.scan(/^\=/)) {
      this.lex_state = EXPR_BEG;
      return ["=", "="];
    }
    
    else if (scanner.scan(/^\!\=/)) {
      if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
        return ["EQUALITY_OP", "!="];
      }
      this.lex_state = EXPR_BEG;
      return ["EQUALITY_OP", scanner.matched];
    }
    else if (scanner.scan(/^\!\~/)) {
      if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
        return ["EQUALITY_OP", "!~"];
      }
      this.lex_state = EXPR_BEG;
      return ["EQUALITY_OP", "!~"];
    }
    else if (scanner.scan(/^\!/)) {
      if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
        return ["UNARY", "!"];
      }
      this.lex_state = EXPR_BEG;
      return ["UNARY", "!"];
    }
    
    else if (scanner.scan(/^\~/)) {
      if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
        return ["UNARY", "~"];
      }
      this.lex_state = EXPR_BEG;
      return ["UNARY", "~"];
    }
    
    
    else if (scanner.scan(/^\$[!@\&\`\'\"\+~*$?\/\\:;=.,<>_]/)) {
      this.lex_state = EXPR_END;
      return ["GVAR", scanner.matched];
    }
    else if (scanner.scan(/^\$\w+/)) {
      this.lex_state = EXPR_END;
      return ["GVAR", scanner.matched];
    }
    else if (scanner.scan(/^\@\@\w*/)) {
      this.lex_state = EXPR_END;
      return ["CVAR", scanner.matched];
    }
    else if (scanner.scan(/^\@\w*/)) {
      this.lex_state = EXPR_END;
      var result = scanner.matched.substr(1);
      return ["IVAR", result];
    }
    
    else if (scanner.scan(/^\,/)) {
      this.lex_state = EXPR_BEG;
      return [",", scanner.matched];
    }
    
    else if (scanner.scan(/^\{/)) {
      var result;
      if (this.lex_state == EXPR_END || this.lex_state == EXPR_CMDARG) {
        result = 'CURLY_BEGIN';
      }
      else if (this.lex_state == EXPR_ENDARG) {
        result = 'LBRACE_ARG';
      }
      else {
        result = 'HASH_BEGIN';
      }
      
      return [result, scanner.matched];
    }
    
    else if (scanner.check(/^[0-9]/)) {
      this.lex_state = EXPR_END;
      if (scanner.scan(/^[\d_]+\.[\d_]+\b/)) {
        return ['FLOAT', scanner.matched.replace(/_/g, '')];
      }
      else if (scanner.scan(/^[\d_]+\b/)) {
        return ['INTEGER', scanner.matched.replace(/_/g, '')];
      }
      else if (scanner.scan(/^0(x|X)(\d|[a-f]|[A-F])+/)) {
        return ['INTEGER', scanner.matched.replace(/_/g, '')];
      }
      else {
        // console.log('unexpected number type');
        return [false, false];
      }
    }
    
    else if (scanner.scan(/^(\w)+[\?\!]?/)) {
      switch (scanner.matched) {
        case 'class':
          if (this.lex_state == EXPR_DOT) return ["IDENTIFIER", scanner.matched];
          this.lex_state = EXPR_CLASS;
          return ["CLASS", scanner.matched];
        case 'module':
          if (this.lex_state == EXPR_DOT) return ["IDENITFIER", scanner.matched];
          this.lex_state = EXPR_CLASS;
          return ["MODULE", scanner.matched];
        case 'def':
          this.lex_state = EXPR_FNAME;
          return ["DEF", scanner.matched];
        case 'end':
          this.lex_state = EXPR_END;
          return ["END", scanner.matched];
        
        case 'do':
          if (this.lex_state == EXPR_ENDARG) {
            this.lex_state = EXPR_BEG;
            return ["DO_BLOCK", scanner.matched];
          }
          this.lex_state = EXPR_BEG;
          return ["DO", scanner.matched];
        case 'if':
          if (this.lex_state == EXPR_BEG) return ["IF", scanner.matched];
          this.lex_state = EXPR_BEG;
          return ["IF_MOD", scanner.matched];
        case 'unless':
          if (this.lex_state == EXPR_BEG) return ["UNLESS", scanner.matched];
          this.lex_state = EXPR_BEG;
          return ["IF_MOD", scanner.matched];
        case 'else':
          return ["ELSE", scanner.matched];
        case 'elsif':
          return ["ELSIF", scanner.matched];
        case 'self':
          if (this.lex_state !== EXPR_FNAME) this.lex_state = EXPR_END;
          return ["SELF", scanner.matched];
        case 'true':
          this.lex_state = EXPR_END;
          return ["TRUE", scanner.matched];
        case 'false':
          this.lex_state = EXPR_END;
          return ["FALSE", scanner.matched];
        case 'nil':
          this.lex_state = EXPR_END;
          return ["NIL", scanner.matched];
        case '__LINE__':
          this.lex_state = EXPR_END;
          return ["LINE", this._line_number.toString()];
        case '__FILE__':
          this.lex_state = EXPR_END;
          return ["FILE", scanner.matched];
        case 'begin':
          this.lex_state = EXPR_BEG;
          return ["BEGIN", scanner.matched];
        case 'rescue':
          if (this.lex_state == EXPR_BEG) return ["RESCUE", scanner.matched];
          this.lex_state = EXPR_BEG;
          return ["RESCUE_MOD", scanner.matched];
        case 'ensure':
          this.lex_state = EXPR_BEG;
          return ["ENSURE", scanner.matched];
        case 'case':
          this.lex_state = EXPR_BEG;
          return ["CASE", scanner.matched];
        case 'when':
          this.lex_state = EXPR_BEG;
          return ["WHEN", scanner.matched];
        case 'or':
          this.lex_state = EXPR_BEG;
          return ["AND_OR_OP", scanner.matched];
        case 'and':
          this.lex_state = EXPR_BEG;
          return ["AND_OR_OP", scanner.matched];
        case 'not':
          this.lex_state = EXPR_BEG;
          return ["NOT", scanner.matched];
        case 'return':
          this.lex_state = EXPR_MID;
          return ["RETURN", scanner.matched];
        case 'next':
          if (this.lex_state == EXPR_DOT) return ["IDENTIFIER", scanner.matched];
          this.lex_state = EXPR_MID;
          return ["NEXT", scanner.matched];
        case 'break':
          this.lex_state = EXPR_MID;
          return ["BREAK", scanner.matched];
        case 'super':
          this.lex_state = EXPR_ARG;
          return ["SUPER", scanner.matched];
        case 'then':
          return ["THEN", scanner.matched];
        case 'block_given?':
          this.lex_state = EXPR_END;
          return ["BLOCK_GIVEN", scanner.matched];
        case 'yield':
          this.lex_state = EXPR_ARG;
          return ["YIELD", scanner.matched];
        case 'require':
          if (this.lex_state == EXPR_DOT || this.lex_state == EXPR_FNAME) {
            return ["IDENTIFIER", scanner.matched];
          }
          this.lex_state = EXPR_MID;
          return ['REQUIRE', scanner.matched];
      }
      
      var matched = scanner.matched;
      
      if (scanner.peek(2) !== '::' && scanner.scan(/^\:/)) {
        return["LABEL", matched];
      }
      
      if (this.lex_state == EXPR_FNAME) {
        if (scanner.scan(/^=/)) {
          this.lex_state = EXPR_END;
          return ["IDENTIFIER", matched + scanner.matched];
        }
        
        this.lex_state = EXPR_END;
        return ["IDENTIFIER", matched];
      }
      
      // IDENTIFIER2, when we have identifer() .. when we dont preceed identifier
      // with :: or .
      // this makes our parser easier and removes conflicts
      if (this.lex_state !== EXPR_DOT && scanner.peek(1) == '(') {
        this.lex_state = EXPR_CMDARG;
        return ["IDENTIFIER2", matched];
      }
      
      if ([EXPR_BEG, EXPR_DOT, EXPR_MID, EXPR_ARG, EXPR_CMDARG].indexOf(this.lex_state) !== -1) {
        this.lex_state = EXPR_CMDARG;
      }
      else {
        this.lex_state = EXPR_END;
      }
      
      return [/^[A-Z]/.exec(matched) ? "CONSTANT" : "IDENTIFIER", matched];
    }
    
    else {
      
      return [false, false];
    }
    
    return [false, false];
  }
};
