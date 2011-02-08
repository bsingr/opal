if (typeof Opal == 'undefined')
  Opal = {};

(function(global, exports, undefined) {
  var modules = {};

  var require = function(name) {
    if (require[name]) return require[name];
    var exports = {};
    modules[name](exports, modules[name]);
    require[name] = exports;
    return exports;
  };

  //global.modules = modules;
  //global.require = require;

modules["./parser"] = function(exports, module) {
// if (typeof require !== 'undefined') {
//   var RubyParser    = require('./ruby_parser').RubyParser,
//       // Lexer         = require('./lexer').Lexer,
//       StringScanner = require('./string_scanner').StringScanner;
// } else {
//   // var RubyParser = parser;
// }

var RubyParser = require('./ruby_parser').RubyParser;
var StringScanner = require('./string_scanner').StringScanner;
var RubyGenerator = require('./generator').Generator;

exports.compile = function(source) {
  var nodes = exports.RubyParser.parse(source);
  // print('nodes are:');
  // print(nodes);
  // print('generating:');
  var g = new RubyGenerator(nodes, {});
  var res = g.generate_main_context();
  // print("GOT RESULT");
  // print(res[0]);
  // print('WOWOWOWOWOWOWOW');
  return res[0];
};

var EXPR_BEG    = 0,    EXPR_END    = 1,    EXPR_ENDARG = 2,    EXPR_ARG   = 3,
    EXPR_CMDARG = 4,    EXPR_MID    = 5,    EXPR_FNAME  = 6,    EXPR_DOT   = 7,
    EXPR_CLASS  = 8,    EXPR_VALUE  = 9;

RubyParser.prototype.parse = function(source) {
  // print('1. Lexing...');
  var token;
  
  this._string = source;
  this._scanner = new StringScanner(source);
  this.lex_state = EXPR_BEG;
  this._tokens = [];
  this._string_parse_stack = [];
  this._line_number = 1;
  
  // cond stack
  this._cond = 0;
  // cmd arg stack
  this._cmdarg = 0;
  
  // while ((token = this.next_token()) && token[0] !== false) {
    // token[2] = this._line_number;
    // this._tokens.push(token);
  // } 
  
  // console.log("## Pre Optimize:\n");
  // for (var i = 0; i < this._tokens.length; i++) {
  //   console.log(this._tokens[i]);
  // }
  // 
  // this._tokens = new Optimizer(this._tokens).optimize();
  // console.log("\n## Post Optimize:\n")
  // for (var i = 0; i < this._tokens.length; i++) {
    // console.log(this._tokens[i]);
  // }
  // console.log("\n");
  // return this._tokens;
  // print('parsing some codeeeeez');
  
  // print('1. lexing');
  // this._lexer = new Lexer();
  // this._tokens = this._lexer.tokenize(source + '\n');
  // add [false, false] to singnify EOF
  // this._tokens.push([false, false]);
  // print(this._tokens);
  
  // print('2. parsing');
  var result = this.do_parse();
  // print(result);
  return result;
};

RubyParser.prototype.next_token = function() {
  var token = this.get_next_token();
  // print('[' + token.join(', ') + '] - ' + this._line_number);
  return token;
};

RubyParser.prototype.cond_push = function(n) {
  // print('cond_push ' + n);
  return this._cond = (this._cond << 1) | ((n) & 1);
};

RubyParser.prototype.cond_pop = function() {
  // print('cond_pop');
  return this._cond = this._cond >> 1;
};

RubyParser.prototype.cond_lexpop = function() {
  // print('cond_lexpop');
  return this._cond = (this._cond >> 1) | (this._cond & 1);
};

RubyParser.prototype.cond_p = function() {
  // print('cond_p');
  return this._cond & 1;
};

RubyParser.prototype.cmdarg_push = function(n) {
  // print('cmdarg_push ' + n);
  return this._cmdarg = (this._cmdarg << 1) | ((n) & 1);
};

RubyParser.prototype.cmdarg_pop = function() {
  // print('cmdarg_pop');
  return this._cmdarg = this._cmdarg >> 1;
};

RubyParser.prototype.cmdarg_lexpop = function() {
  // print('cmdarg_lexpop');
  return this._cmdarg = (this._cmdarg >> 1) | (this._cmdarg & 1);
};

RubyParser.prototype.cmdarg_p = function() {
  // print('cmdarg_p');
  return this._cmdarg & 1;
};

RubyParser.prototype.current_string_parse = function() {
  if (this._string_parse_stack.length == 0) return null;
  return this._string_parse_stack[this._string_parse_stack.length - 1];
};

RubyParser.prototype.push_string_parse = function(o) {
  this._string_parse_stack.push(o);
};

RubyParser.prototype.pop_string_parse = function() {
  this._string_parse_stack.pop();
};

RubyParser.prototype.next_string_token = function() {
  var str_parse = this.current_string_parse(), scanner = this._scanner;
  
  var interpolate = (str_parse.beg !== "'");
  
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
      return ['STRING_END', scanner.matched];
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
    if (interpolate) {
      return ['STRING_DVAR', scanner.matched.substr(2)];
    }
    else {
      str_buffer.push(scanner.matched);
    }
  }
  else if (scanner.scan(/^#\{/)) {
    if (interpolate) {
      // we are into ruby code, so stop parsing content (for the moment)
      str_parse.content = false;
      return ['STRING_DBEG', scanner.matched];
    }
    else {
      str_buffer.push(scanner.matched);
    }
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

RubyParser.prototype.get_next_token = function() {
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
      
      if ([EXPR_BEG, EXPR_DOT].indexOf(this.lex_state) !== -1) {
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
      return ['STRING_BEG', scanner.matched];
    }
    else if (scanner.scan(/^\'/)) {
      this.push_string_parse({ beg: "'", content: true, end:"'" });
      return ['STRING_BEG', scanner.matched];
    }
    else if (scanner.scan(/^\`/)) {
      this.push_string_parse({ beg: "`", content: true, end: "`" });
      return ["XSTRING_BEG", scanner.matched];
    }
    else if (scanner.scan(/^\%[Ww]/)) {
      var start_word = scanner.scan(/^./),
          end_word   = { '(': ')', '[': ']', '{': '}'}[start_word],
          end_word   = end_word || start_word;
      
      this.push_string_parse({ beg: start_word, content: true, end: end_word });
      return ["WORDS_BEG", scanner.matched]; 
    }
    else if (scanner.scan(/^\%[Qq]/)) {
      var start_word = scanner.scan(/^./),
          end_word   = { '(': ')', '[': ']', '{': '}'}[start_word],
          end_word   = end_word || start_word;
      
      this.push_string_parse({ beg: start_word, content: true, end: end_word });
      return ["STRING_BEG", scanner.matched];
    }
    else if (scanner.scan(/^\%[Rr]/)) {
      var start_word = scanner.scan(/^./),
          end_word   = { '(': ')', '{': '}', '[': ']' }[start_word],
          end_word   = end_word || start_word;
      
      this.push_string_parse({ beg: '/', content: true, end: end_word });
      return ['REGEXP_BEG', scanner.matched];
    }
    
    else if (scanner.scan(/^\//)) {
      if (this.lex_state == EXPR_BEG || this.lex_state == EXPR_MID) {
        this.push_string_parse({ beg: "/", content: true, end: "/" });
        return ["REGEXP_BEG", scanner.matched];
      }
      else if (scanner.scan(/^\=/)) {
        this.lex_state = EXPR_BEG;
        return ["OP_ASGN", "/"];
      }
      else if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
      }
      return ["/", scanner.matched];
    }
    
    else if (scanner.scan(/^\%/)) {
      // if (scanner.scan(/^\=/)) {
        // this.lex_state = EXPR_BEG;
        // return ["OP_ASGN", "%"];
      // }
      if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
      }
      else {
        this.lex_state = EXPR_BEG;
      }
      return ["%", '%'];
    }
    
    else if (scanner.scan(/^\(/)) {
      var result = '(';
      if (this.lex_state == EXPR_BEG || this.lex_state == EXPR_MID) {
        result = 'PAREN_BEG';
      }
      else if (space_seen) {
        result = '(';
      }
      this.lex_state = EXPR_BEG;
      this.cond_push(0);
      this.cmdarg_push(0);
      return [result, scanner.matched];
    }
    
    else if (scanner.scan(/^\)/)) {
      this.cond_lexpop();
      this.cmdarg_lexpop();
      this.lex_state = EXPR_END;
      return [")", scanner.matched];
    }
    
    else if (scanner.scan(/^\[/)) {
      var result = scanner.matched;
      
      if (this.lex_state == EXPR_FNAME || this.lex_state == EXPR_DOT) {
        this.lex_state = EXPR_ARG;
        if (scanner.scan(/^\]\=/)) {
          return ["[]=", "[]="];
        }
        else if (scanner.scan(/^\]/)) {
          return ["[]", "[]"];
        }
        else {
          throw "error - unexpected '[' token"
        }
      }
      else if (this.lex_state == EXPR_BEG || this.lex_state == EXPR_MID || space_seen) {
        this.lex_state = EXPR_BEG;
        this.cond_push(0);
        this.cmdarg_push(0);
        return ["[", scanner.matched];
      }
      else {
        this.lex_state = EXPR_BEG;
        this.cond_push(0);
        this.cmdarg_push(0);
        return ["[@", scanner.matched];
      }
    }
    
    else if (scanner.scan(/^\]/)) {
      this.cond_lexpop();
      this.cmdarg_lexpop();
      this.lex_state = EXPR_END;
      return ["]", scanner.matched];
    }
    else if (scanner.scan(/^\}/)) {
      this.cond_lexpop();
      this.cmdarg_lexpop();
      this.lex_state = EXPR_END;
      
      if (this.current_string_parse()) {
        this.current_string_parse().content = true
      }
      // if (string_parse) string_parse.content = true;
      return ["}", scanner.matched];
    }
    
    else if (scanner.scan(/^\.\.\./)) {
      this.lex_state = EXPR_BEG;
      return ["...", scanner.matched];
    }
    else if (scanner.scan(/^\.\./)) {
      this.lex_state = EXPR_BEG;
      return ["..", scanner.matched];
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
        return ["*", scanner.matched];
      }
      else if (space_seen && scanner.check(/^\S/)) {
        this.lex_state = EXPR_BEG;
        return ["SPLAT", scanner.matched];
      }
      else if (this.lex_state == EXPR_BEG || this.lex_state == EXPR_MID) {
        this.lex_state = EXPR_BEG;
        return ["SPLAT", scanner.matched];
      }
      else {
        this.lex_state = EXPR_BEG;
        return ["*", scanner.matched];
      }
    }
    
    else if (scanner.scan(/^\:\:/)) {
      if ([EXPR_BEG, EXPR_MID, EXPR_CLASS].indexOf(this.lex_state) !== -1) {
        this.lex_state = EXPR_BEG;
        return ["::@", scanner.matched];
      }
      this.lex_state = EXPR_DOT;
      return ["::", scanner.matched];
    }
    else if (scanner.scan(/^\:/)) {
      if (this.lex_state == EXPR_END || this.lex_state == EXPR_ENDARG || scanner.check(/^\s/)) {
        if (!scanner.check(/^\w/)) {
          this.lex_state = EXPR_BEG;
          return [":", scanner.matched];
        }
        
        this.lex_state = EXPR_FNAME;
        return ["SYMBOL_BEG", scanner.matched];
      }
      
      if (scanner.scan(/^\'/)) {
        this.push_string_parse({ beg: "'", content: true, end: "'" });
      }
      else if (scanner.scan(/^\"/)) {
        this.push_string_parse({ beg: '"', content: true, end: '"' });
      }
      
      this.lex_state = EXPR_FNAME;
      return ["SYMBOL_BEG", scanner.matched];
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
      // print(this.lex_state);
      if (space_seen && !scanner.check(/^\s/) && this.lex_state == EXPR_CMDARG){
        return ["&@", scanner.matched];
      }
      else if (this.lex_state == EXPR_BEG || this.lex_state == EXPR_MID) {
        return ["&@", scanner.matched];
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
      return ["<=>", "<=>"];
    }
    else if (scanner.scan(/^\<\=/)) {
      if (this.lex_state == EXPR_FNAME) this.lex_state = EXPR_END
      else this.lex_state = EXPR_BEG;
      return ["<=", "<="];
    }
    else if (scanner.scan(/^\</)) {
      if (this.lex_state == EXPR_FNAME) this.lex_state = EXPR_END
      else this.lex_state = EXPR_BEG;
      return ["<", "<"];
    }
    
    else if (scanner.scan(/^\>\=/)) {
      if (this.lex_state == EXPR_FNAME) this.lex_state = EXPR_END
      else this.lex_state = EXPR_BEG;
      return [">=", scanner.matched];
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
      return [">", ">"];
    }

    else if (scanner.scan(/^[+-]/)) {
      var result = scanner.matched;
      // var sign = (result == '+') ? 'UPLUS' : 'UMINUS';
      var sign = result + '@';
      
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
        return ["===", "==="];
      }
      this.lex_state = EXPR_BEG;
      return ["===", "==="];
    }
    else if (scanner.scan(/^\=\=/)) {
      if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
        return ["==", "=="];
      }
      this.lex_state = EXPR_BEG;
      return ["==", "=="];
    }
    else if (scanner.scan(/^\=\~/)) {
      if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
        return ["=~", "=~"];
      }
      this.lex_state = EXPR_BEG;
      return ["=~", "=~"];
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
        return ["!=", "!="];
      }
      this.lex_state = EXPR_BEG;
      return ["!=", scanner.matched];
    }
    else if (scanner.scan(/^\!\~/)) {
      if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
        return ["!~", "!~"];
      }
      this.lex_state = EXPR_BEG;
      return ["!~", "!~"];
    }
    else if (scanner.scan(/^\!/)) {
      if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
        return ["!", "!"];
      }
      this.lex_state = EXPR_BEG;
      return ["!", "!"];
    }
    
    else if (scanner.scan(/^\~/)) {
      if (this.lex_state == EXPR_FNAME) {
        this.lex_state = EXPR_END;
        return ["~", "~"];
      }
      this.lex_state = EXPR_BEG;
      return ["~", "~"];
    }
    
    // FIXME: do we really need to differentiate between these. generates the
    // same code. our checks will be in the gvar getters (for the relative 
    // parts..)
    // 
    // else if (scanner.scan(/^\$([1-9]\d*)/)) {
    //   this.lex_state = EXPR_END;
    //   return ["NTH_REF", scanner.matched];
    // }
    // else if (scanner.scan(/^\$([\+\'\&\`])/)) {
    //   this.lex_state = EXPR_END;
    //   return ["BACK_REF", scanner.matched];
    // }
    // else if (scanner.scan(/^\$[!@\"~*$?\/\\:;=.,<>_]/)) {
    //   this.lex_state = EXPR_END;
    //   return ["GVAR", scanner.matched];
    // }
    else if (scanner.scan(/^\$[\+\'\`\&!@\"~*$?\/\\:;=.,<>_]/)) {
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
      return ["IVAR", scanner.matched];
    }
    
    else if (scanner.scan(/^\,/)) {
      this.lex_state = EXPR_BEG;
      return [",", scanner.matched];
    }
    
    else if (scanner.scan(/^\{/)) {
      var result;
      // print(this.lex_state);
      if (this.lex_state == EXPR_END || this.lex_state == EXPR_CMDARG) {
        result = '{@';
      }
      else if (this.lex_state == EXPR_ENDARG) {
        result = 'LBRACE_ARG';
      }
      else {
        result = '{';
      }
      
      this.lex_state = EXPR_BEG;
      this.cond_push(0);
      this.cmdarg_push(0);
      
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
          if (this.cond_p()) {
            this.lex_state = EXPR_BEG;
            return ["DO_COND", scanner.matched];
          }
          else if (this.cmdarg_p() && this.lex_state != EXPR_CMDARG) {
            this.lex_state = EXPR_BEG;
            return ["DO_BLOCK", scanner.matched];
          }

          else if (this.lex_state == EXPR_ENDARG) {
            return ["DO_BLOCK", scanner.matched];
          }
          else {
            this.lex_state = EXPR_BEG;
            return ["DO", scanner.matched];
          }
            
            // this.lex_state = EXPR_BEG;
            // return ["DO", scanner.matched];
          // }
          // this.lex_state = EXPR_BEG;
          // return ["DO_BLOCK", scanner.matched];
        case 'if':
          if (this.lex_state == EXPR_BEG) return ["IF", scanner.matched];
          this.lex_state = EXPR_BEG;
          return ["IF_MOD", scanner.matched];
        case 'unless':
          if (this.lex_state == EXPR_BEG) return ["UNLESS", scanner.matched];
          this.lex_state = EXPR_BEG;
          return ["UNLESS_MOD", scanner.matched];
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
        if (this.lex_state == EXPR_DOT || this.lex_state == EXPR_FNAME) return ["IDENTIFIER", scanner.matched];
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
          return ["OR", scanner.matched];
        case 'and':
          this.lex_state = EXPR_BEG;
          return ["AND", scanner.matched];
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
        case 'while':
          if (this.lex_state == EXPR_BEG) return ["WHILE", scanner.matched];
          this.lex_state = EXPR_BEG;
          return ["WHILE_MOD", scanner.matched];
        case 'until':
          // generator determines between while and until (mod)
          if (this.lex_state == EXPR_BEG) return ["WHILE", scanner.matched];
          this.lex_state = EXPR_BEG;
          return ["WHILE_MOD", scanner.matched];
        case 'block_given?':
          this.lex_state = EXPR_END;
          return ["BLOCK_GIVEN", scanner.matched];
        case 'yield':
          this.lex_state = EXPR_ARG;
          return ["YIELD", scanner.matched];
        // case 'require':
          // if (this.lex_state == EXPR_DOT || this.lex_state == EXPR_FNAME) {
            // return ["IDENTIFIER", scanner.matched];
          // }
          // this.lex_state = EXPR_MID;
          // return ['REQUIRE', scanner.matched];
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
        
        // this.lex_state = EXPR_END;
        // return ["IDENTIFIER", matched];
      }
      
      // IDENTIFIER2, when we have identifer() .. when we dont preceed identifier
      // with :: or .
      // this makes our parser easier and removes conflicts
      // if (this.lex_state !== EXPR_DOT && scanner.peek(1) == '(') {
        // this.lex_state = EXPR_CMDARG;
        // return ["IDENTIFIER2", matched];
      // }
      
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



exports.RubyParser = new RubyParser();

};
modules["./ruby_parser"] = function(exports, module) {
var RubyParser = (function() {
var parser = function() {
  
};

parser.prototype.do_parse = function() {
  return this.do_parse_js(parser.Racc_arg, false);
};

parser.prototype.do_parse_js = function(arg, in_debug) {
  var action_table    = arg[0],
      action_check    = arg[1],
      action_default  = arg[2],
      action_pointer  = arg[3],
      
      goto_table      = arg[4],
      goto_check      = arg[5],
      goto_default    = arg[6],
      goto_pointer    = arg[7],
      
      nt_base         = arg[8],
      reduce_table    = arg[9],
      token_table     = arg[10],
      shift_n         = arg[11],
      reduce_n        = arg[12],
      
      use_result      = arg[13];
  
  // racc sys vars
  var racc_state      = [0],
      racc_tstack     = [],
      racc_vstack     = [],
      
      racc_t          = null,
      racc_tok        = null,
      racc_val        = null,
      racc_read_next  = true,
      
      racc_user_yyerror = false,
      racc_error_status = 0;
  
  var token = null, act = null, i = null, nerr = 0, curstate = null;
  
  while (true) {
  //  console.log('looping');
    if ((i = action_pointer[racc_state[racc_state.length - 1]]) !== null) {
    //  console.log('yeap');
      if (racc_read_next) {
        if (racc_t !== 0) { // not EOF
          token = this.next_token();
          racc_tok = token[0];
          racc_val = token[1];
          
        //  console.log('token is: ' + token.join(','));
          
          if (!racc_tok) { // EOF
            racc_t = 0;
          }
          else {
            racc_t = token_table[racc_tok];
            if (racc_t === undefined) racc_t = 1;
          }
          
        //  console.log('racc_t: ' + racc_t);
          
          racc_read_next = false;
        }
      }
            
      i += racc_t;
      
    //  console.log('i is now ' + i);
      
      if ((i < 0) || ((act = action_table[i]) === null) || (action_check[i] !== racc_state[racc_state.length - 1])) {
        act = action_default[racc_state[racc_state.length - 1]];
      }
    }
    else {
      act = action_default[racc_state[racc_state.length - 1]];
    }
    
  //  console.log('act is: ' + act);
    
    // ================
    // = racc_evalact =
    // ================
    
    if (act > 0 && act < shift_n) {
    //  console.log('shift on ' + act);
      // 
      // shift
      // 
      if (racc_error_status > 0) {
        // error token
      //  console.log('err part 1');
        if (racc_t !== 1) {
        //  console.log('err part 2');
          racc_error_status -= 1;
        }
      }
      
      racc_vstack.push(racc_val);
      curstate = act;
      racc_state.push(act);
      racc_read_next = true;
    }
    else if (act < 0 && act > -reduce_n) {
    //  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ reduce on ' + act);
      // 
      // reduce
      // 
      var reduce_i    = act * -3,
          reduce_len  = reduce_table[reduce_i],
          reduce_to   = reduce_table[reduce_i + 1],
          method_id   = reduce_table[reduce_i + 2];
      
      var tmp_v = racc_vstack.slice(racc_vstack.length - reduce_len);
    //  console.log('reduce len is: ' + reduce_len);
    //  console.log('tmp_v is: ' + tmp_v.join(', '));
      
      // pop for number of reductions
      while(reduce_len--) {
      //  console.log('popping: ' + reduce_len);
        racc_state.pop();
        racc_vstack.pop();
        racc_tstack.pop();
      }
      
      if (use_result) {
        // msgsend..we push on result of method call..?
      //  console.log('reducing: ' + method_id);
      //  console.log('['+tmp_v.join(', ')+']');
      //  console.log('[' + racc_vstack.join(', ') + ']');
        // racc_vstack.push(method_id);
      //  console.log("NEED TO EXECUTE: [" + tmp_v.join(',') + ']');
      //  console.log(this[method_id]);
        var reduce_call_result = this[method_id](tmp_v, tmp_v[0]);
      //  console.log(reduce_call_result);
        racc_vstack.push(reduce_call_result);
      }
      else {
        throw "not using result?!?!?!?!?!";
      }
      
      racc_tstack.push(reduce_to);
      
    //  console.log('VSTACK: [' + racc_vstack.join(', ') + ']');
      
      var k1 = reduce_to - nt_base;
    //  console.log('k1 is ' +k1);
    //  console.log("goto pointer is: " + goto_pointer[k1]);
      if ((reduce_i = goto_pointer[k1]) !== null) {
        
        reduce_i += racc_state[racc_state.length - 1];
      //  console.log("reduce_i is now: " + reduce_i);
      //  console.log("-- potential curstate is: " + goto_table[reduce_i]);
        if ((reduce_i >= 0) && ((curstate = goto_table[reduce_i]) !== null) &&
                (curstate !== undefined) && (goto_check[reduce_i] === k1)) {
          // curstate = curstate; ..?
        //  console.log('========== return current state: ' + curstate);
          racc_state.push(curstate);
        }
        else {//
          // console.log("dont do this??");
          // curstate = k1;
        //  console.log("=========== PUSHING curstate " + curstate);
        //  console.log('=========== goto default is: ' + goto_default[k1]);
          racc_state.push(goto_default[k1]);
        }
        // tmp_v is return value from stack
        // racc_vstack.push(tmp_v[0]);
        
      }
      else {
      //  console.log('GOTO default down here init!!!!!!!!!!!');
        racc_state.push(goto_default[k1]);
      }
      
      // return;
    }
    else if (act === shift_n) {
    //  console.log('accept on ' + act);
      // 
      // accept
      // 
    //  console.log('accepting!!!!');
    //  console.log(racc_vstack[0]);
      return racc_vstack[0];
    }
    else if (act === -reduce_n) {
    //  console.log('error on ' + act);
      // 
      // error
      // 
    //  console.log('racc error status: ' + racc_error_status);
    //  console.log(racc_tok + ", " + racc_val);
      throw new Error('syntax error, unexpected ' + racc_tok);
      return;
    }
    else {
      throw "Racc - unknown action: " + act;
    }
    
    // return;
  }  
};

// default next token implementation
parser.prototype.next_token = function() {
  throw "next_token is not defined for parser."
};

parser.prototype.yyerror = function(err) {
  throw "yyerror: " + err;
};

parser.prototype._reduce_none = function(val, result) {
  return result;
};
parser.Racc_arg = [
[62,63,64,7,51,664,544,260,56,57,196,197,260,60,562,58,59,61,23,24,65,66,492,574,260,-417,22,28,27,88,87,89,90,-416,-58,17,196,197,196,197,-416,6,41,8,9,92,91,82,50,84,83,85,86,94,95,562,80,81,474,38,39,37,664,664,196,197,-69,-83,72,255,-77,-66,518,-81,564,563,73,490,491,-80,518,36,562,708,30,573,255,52,518,-416,259,473,32,727,457,259,40,100,518,518,724,100,99,663,18,-79,99,259,543,78,72,74,75,76,77,564,563,565,73,79,62,63,64,292,51,292,93,100,56,57,53,54,99,60,741,58,59,61,247,248,65,66,564,563,560,-79,246,276,280,88,87,89,90,474,-464,-464,-72,736,100,100,663,663,41,99,99,92,91,82,50,84,83,85,86,94,95,562,80,81,-417,38,39,37,100,-81,517,-81,473,99,-81,-80,100,-80,517,-72,-80,99,735,-72,100,-409,517,201,562,99,205,619,-409,52,100,100,517,517,620,99,99,-79,40,-79,562,-264,-79,567,100,-77,208,506,-264,99,505,78,72,74,75,76,77,564,563,569,73,79,62,63,64,649,51,525,93,-270,56,57,53,54,292,60,-270,58,59,61,247,248,65,66,564,563,575,714,246,276,280,88,87,89,90,416,-264,-264,619,486,564,563,417,-264,41,620,487,92,91,82,50,84,83,85,86,94,95,-412,80,81,725,38,39,37,-412,-270,196,197,-70,495,252,-270,-78,-271,-413,-404,496,253,-270,743,-271,-413,-404,201,474,292,205,244,100,52,540,418,-264,99,881,485,244,538,40,420,-271,540,-270,193,745,-81,208,-271,775,-270,194,78,72,74,75,76,77,473,795,750,73,79,62,63,64,418,51,-270,93,-271,56,57,53,54,524,60,525,58,59,61,247,248,65,66,-84,584,539,195,246,276,280,88,87,89,90,-416,-271,539,-270,192,-71,474,-416,-78,41,285,286,92,91,82,50,84,83,85,86,94,95,-415,80,81,583,38,39,37,-415,746,-73,-73,-76,-305,-81,844,-84,-269,473,-410,-305,-71,845,100,-269,-71,-410,201,99,-465,205,557,-269,52,-269,-416,-407,747,558,-269,-414,-269,40,-407,-465,-71,-465,-414,-73,-79,208,748,-73,457,679,78,72,74,75,76,77,749,492,421,73,79,62,63,64,-305,51,843,93,-269,56,57,53,54,457,60,255,58,59,61,247,248,65,66,-269,786,-269,732,246,276,280,88,87,89,90,329,328,332,331,-75,196,197,422,-83,41,679,216,92,91,82,50,84,83,85,86,94,95,-411,80,81,100,38,39,37,-411,99,506,761,649,508,329,328,332,331,216,383,255,213,451,385,384,215,214,201,506,506,205,511,508,52,329,328,332,331,216,100,761,649,40,322,99,326,324,323,325,213,208,332,331,215,214,78,72,74,75,76,77,216,419,752,73,79,62,63,64,7,51,454,93,-252,56,57,53,54,756,60,457,58,59,61,23,24,65,66,329,328,332,331,22,28,27,88,87,89,90,629,216,17,102,103,104,105,106,6,41,8,9,92,91,82,50,84,83,85,86,94,95,462,80,81,649,38,39,37,765,703,704,213,705,94,95,215,214,211,212,102,103,104,105,106,766,767,462,36,462,386,30,771,532,52,532,533,-57,776,32,710,-464,777,40,322,778,326,324,323,325,699,18,532,781,292,696,78,72,74,75,76,77,694,480,690,73,79,62,63,64,7,51,790,93,481,56,57,53,54,482,60,-253,58,59,61,23,24,65,66,329,328,332,331,22,28,27,88,87,89,90,216,374,17,488,667,525,264,659,6,41,8,9,92,91,82,50,84,83,85,86,94,95,365,80,81,362,38,39,37,292,255,213,654,796,609,215,214,211,212,649,609,800,255,255,493,235,494,216,36,609,498,30,500,635,52,292,-66,816,634,32,818,284,633,40,554,283,326,324,323,325,501,18,292,235,621,786,78,72,74,75,76,77,826,827,828,73,79,62,63,64,532,51,532,93,699,56,57,53,54,292,60,833,58,59,61,247,248,65,66,329,328,332,331,246,28,27,88,87,89,90,329,328,332,331,616,235,609,835,837,41,510,840,92,91,82,50,84,83,85,86,94,95,216,80,81,216,38,39,37,216,216,846,513,255,848,849,191,376,532,-465,582,857,-252,190,609,189,609,500,201,188,526,205,580,578,52,187,577,532,572,300,875,568,877,40,322,527,326,324,323,325,529,208,532,536,533,879,78,72,74,75,76,77,609,535,609,73,79,62,63,64,534,51,96,93,609,56,57,53,54,null,60,null,58,59,61,247,248,65,66,329,328,332,331,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,862,null,244,null,40,554,null,326,324,323,325,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,329,328,332,331,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,216,-486,-486,-486,-486,222,224,null,null,-486,-486,null,null,null,null,null,230,231,null,201,null,null,205,null,null,52,null,null,null,null,859,213,244,219,40,215,214,211,212,223,221,217,208,218,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,216,-486,-486,-486,-486,222,224,null,null,-486,-486,null,null,null,null,null,230,231,null,201,null,null,205,null,null,52,null,null,null,null,null,213,null,219,40,215,214,211,212,223,221,217,208,218,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,216,-486,-486,-486,-486,222,224,null,null,-486,-486,null,null,null,null,null,230,231,null,36,null,null,30,null,null,52,null,null,null,null,32,213,null,219,40,215,214,211,212,223,221,217,18,218,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,216,-486,-486,-486,-486,222,224,null,null,-486,-486,null,null,null,null,null,230,231,null,201,null,null,205,null,null,52,null,null,null,null,null,213,null,219,40,215,214,211,212,223,221,217,208,218,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,216,-486,-486,-486,-486,222,224,null,null,-486,-486,null,null,null,null,null,230,231,null,201,null,null,205,null,null,52,null,null,null,null,null,213,null,219,40,215,214,211,212,223,221,217,208,218,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,216,220,225,226,227,222,224,232,null,228,229,null,null,null,null,null,230,231,null,201,null,null,205,null,null,52,null,null,null,null,null,213,null,219,40,215,214,211,212,223,221,217,18,218,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,216,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,230,231,null,201,null,null,205,null,null,52,null,null,null,null,null,213,null,219,40,215,214,211,212,null,null,217,208,218,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,216,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,230,231,null,201,null,null,205,null,null,52,null,null,null,null,null,213,null,219,40,215,214,211,212,null,null,217,208,218,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,216,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,230,231,null,201,null,null,205,null,null,52,null,null,null,null,null,213,null,219,40,215,214,211,212,null,null,217,208,218,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,216,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,230,231,null,201,null,null,205,null,null,52,null,null,null,null,242,213,244,219,40,215,214,211,212,null,null,217,208,218,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,216,220,225,226,227,222,224,232,233,228,229,null,-486,-486,null,null,230,231,null,201,null,null,205,null,null,52,null,null,null,null,242,213,244,219,40,215,214,211,212,223,221,217,208,218,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,216,-486,-486,-486,-486,222,224,null,null,-486,-486,null,null,null,null,null,230,231,null,201,null,null,205,null,null,52,null,null,null,null,242,213,244,219,40,215,214,211,212,223,221,217,208,218,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,216,220,225,226,227,222,224,null,null,228,229,null,null,null,null,null,230,231,null,36,null,null,30,null,null,52,null,null,null,null,32,213,null,219,40,215,214,211,212,223,221,217,18,218,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,216,220,225,226,227,222,224,232,233,228,229,null,-486,-486,null,null,230,231,null,36,null,null,30,null,null,52,null,null,null,null,32,213,null,219,40,215,214,211,212,223,221,217,18,218,null,null,null,78,72,74,75,76,77,null,null,null,73,79,-244,-244,-244,null,-244,null,93,null,-244,-244,53,54,null,-244,null,-244,-244,-244,-244,-244,-244,-244,null,null,null,null,-244,-244,-244,-244,-244,-244,-244,null,null,null,null,null,null,null,null,null,-244,null,null,-244,-244,-244,-244,-244,-244,-244,-244,-244,-244,null,-244,-244,null,-244,-244,-244,216,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,230,231,null,-244,null,null,-244,255,null,-244,null,null,null,null,-244,213,-244,219,-244,215,214,211,212,null,null,null,-244,null,null,null,-277,-244,-244,-244,-244,-244,-244,-277,-277,-277,-244,-244,-277,-277,-277,216,-277,null,-244,null,null,null,-244,-244,null,null,-277,-277,null,null,null,230,231,null,null,-277,-277,null,-277,-277,-277,-277,-277,null,null,null,213,null,null,null,215,214,211,212,null,null,null,null,null,null,null,null,null,null,-277,-277,-277,-277,-277,-277,-277,-277,-277,-277,-277,-277,-277,-277,null,null,-277,-277,-277,null,null,-277,null,264,-277,null,null,-277,null,-277,null,-277,null,-277,null,-277,-277,-277,-277,-277,-277,-277,null,-277,null,-277,null,null,null,null,null,null,null,null,null,null,null,null,-277,-277,-277,-277,null,-277,null,null,null,-277,62,63,64,7,51,null,null,null,56,57,null,null,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,216,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,230,231,null,36,null,null,266,null,null,52,null,null,null,null,32,213,null,219,40,215,214,211,212,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,277,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,null,554,281,326,324,323,325,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,274,null,null,271,null,null,52,null,null,null,null,270,null,null,null,null,null,548,null,null,null,null,null,null,329,328,332,331,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,277,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,null,554,281,326,324,323,325,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,274,null,null,205,null,null,52,null,null,null,null,null,null,null,null,null,null,548,null,null,null,null,null,null,329,328,332,331,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,821,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,277,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,null,null,281,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,812,null,null,205,null,null,52,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,-462,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,-407,null,null,null,null,null,null,-407,36,null,null,30,-462,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,-462,null,-265,78,72,74,75,76,77,-265,-265,-265,73,79,-265,-265,-265,null,-265,null,93,null,null,-407,53,54,-265,null,-265,-265,null,null,null,null,null,null,null,-265,-265,null,-265,-265,-265,-265,-265,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-265,-265,-265,-265,-265,-265,-265,-265,-265,-265,-265,-265,-265,-265,null,null,-265,-265,-265,null,null,-265,null,null,-265,null,null,-265,null,-265,null,-265,null,-265,null,-265,-265,-265,-265,-265,-265,-265,null,-265,null,-265,null,null,null,null,null,null,null,null,null,null,null,null,-265,-265,-265,-265,null,-265,null,null,null,-265,62,63,64,7,51,null,null,null,56,57,null,null,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,300,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,806,null,244,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,579,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,216,220,225,226,227,222,224,232,233,228,229,null,209,210,null,null,230,231,null,201,null,null,205,null,null,52,null,null,null,null,null,213,null,219,40,215,214,211,212,223,221,217,18,218,null,null,null,78,72,74,75,76,77,null,null,null,73,79,100,234,null,-210,null,99,93,null,null,null,53,54,62,63,64,null,51,null,null,null,56,57,null,null,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,804,null,244,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,277,null,null,92,91,82,50,84,83,334,86,94,95,null,80,81,null,null,null,281,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,340,null,null,335,null,null,205,null,null,52,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,277,null,null,92,91,82,50,84,83,334,86,94,95,null,80,81,null,null,null,281,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,335,null,null,205,null,null,52,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,798,null,244,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,-461,-461,-461,null,-461,null,93,null,-461,-461,53,54,null,-461,null,-461,-461,-461,-461,-461,-461,-461,null,-461,null,null,-461,-461,-461,-461,-461,-461,-461,null,null,null,null,null,null,null,null,null,-461,null,null,-461,-461,-461,-461,-461,-461,-461,-461,-461,-461,null,-461,-461,null,-461,-461,-461,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-461,null,null,-461,-461,null,-461,null,null,null,null,-461,null,-461,null,-461,null,null,null,null,null,null,null,-461,null,-461,null,null,-461,-461,-461,-461,-461,-461,null,null,null,-461,-461,-462,-462,-462,null,-462,null,-461,null,-462,-462,-461,-461,null,-462,null,-462,-462,-462,-462,-462,-462,-462,null,-462,null,null,-462,-462,-462,-462,-462,-462,-462,null,null,null,null,null,null,null,null,null,-462,null,null,-462,-462,-462,-462,-462,-462,-462,-462,-462,-462,null,-462,-462,null,-462,-462,-462,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-462,null,null,-462,-462,null,-462,null,null,null,null,-462,null,-462,null,-462,null,null,null,null,null,null,null,-462,null,-462,null,null,-462,-462,-462,-462,-462,-462,null,null,null,-462,-462,62,63,64,null,51,null,-462,null,56,57,-462,-462,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,376,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,394,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,394,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,300,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,601,null,244,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,-269,78,72,74,75,76,77,-269,-269,-269,73,79,-269,-269,-269,null,-269,null,93,null,null,null,53,54,null,null,-269,-269,null,null,null,null,null,null,null,-269,-269,null,-269,-269,-269,-269,-269,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-269,-269,-269,-269,-269,-269,-269,-269,-269,-269,-269,-269,-269,-269,null,null,-269,-269,-269,null,592,-269,null,null,-269,null,null,-269,null,-269,null,-269,null,-269,null,-269,-269,-269,-269,-269,-269,-269,null,-269,null,-269,null,null,null,null,null,null,null,null,null,null,null,null,-269,-269,-269,-269,null,-269,null,-82,null,-269,62,63,64,null,51,null,null,null,56,57,null,null,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,-464,-464,-464,null,-464,null,93,null,-464,-464,53,54,null,-464,null,-464,-464,-464,-464,-464,-464,-464,null,null,null,null,-464,-464,-464,-464,-464,-464,-464,null,null,null,null,null,null,null,null,null,-464,null,null,-464,-464,-464,-464,-464,-464,-464,-464,-464,-464,null,-464,-464,null,-464,-464,-464,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-464,726,null,-464,-464,null,-464,null,null,null,null,-464,null,-464,null,-464,null,null,null,null,null,null,null,-464,null,null,null,null,-464,-464,-464,-464,-464,-464,null,null,null,-464,-464,62,63,64,null,51,null,-464,-80,56,57,-464,-464,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,242,null,244,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,471,null,null,null,null,242,null,244,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,713,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,478,52,null,null,null,null,242,null,244,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,266,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,277,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,null,null,281,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,274,null,null,205,null,null,52,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,266,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,300,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,277,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,null,null,281,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,681,null,null,205,null,null,52,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,671,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,655,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,394,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,498,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,300,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,627,52,null,null,null,null,625,null,244,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,605,null,244,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,601,null,244,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,28,27,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,300,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,-467,-467,-467,null,-467,null,93,null,-467,-467,53,54,null,-467,null,-467,-467,-467,-467,-467,-467,-467,null,null,null,null,-467,-467,-467,-467,-467,-467,-467,null,null,null,null,null,null,null,null,null,-467,null,null,-467,-467,-467,-467,-467,-467,-467,-467,-467,-467,null,-467,-467,null,-467,-467,-467,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-467,null,null,-467,-467,null,-467,null,null,null,null,-467,null,-467,null,-467,null,null,null,null,null,null,null,-467,null,null,null,null,-467,-467,-467,-467,-467,-467,null,null,null,-467,-467,-466,-466,-466,null,-466,null,-467,null,-466,-466,-467,-467,null,-466,null,-466,-466,-466,-466,-466,-466,-466,null,null,null,null,-466,-466,-466,-466,-466,-466,-466,null,null,null,null,null,null,null,null,null,-466,null,null,-466,-466,-466,-466,-466,-466,-466,-466,-466,-466,null,-466,-466,null,-466,-466,-466,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-466,null,null,-466,-466,null,-466,null,null,null,null,-466,null,-466,null,-466,null,null,null,null,null,null,null,-466,null,null,null,null,-466,-466,-466,-466,-466,-466,null,null,null,-466,-466,62,63,64,null,51,null,-466,null,56,57,-466,-466,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,-269,78,72,74,75,76,77,-269,-269,-269,73,79,null,-269,-269,null,-269,null,93,null,null,null,53,54,null,null,null,null,null,null,null,null,null,null,null,-269,-269,null,-269,-269,-269,-269,-269,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-269,-269,-269,-269,-269,-269,-269,-269,-269,-269,-269,-269,-269,-269,null,null,-269,-269,-269,null,592,null,null,null,-269,null,null,null,null,null,null,-269,null,-269,null,-269,-269,-269,-269,-269,-269,-269,null,-269,null,-269,null,null,null,null,null,null,null,null,null,null,null,null,-269,-269,null,-74,-468,-269,null,-82,null,-269,null,-468,-468,-468,null,null,null,-468,-468,null,-468,null,null,null,null,null,null,null,null,-468,null,null,null,null,null,null,null,null,null,-468,-468,null,-468,-468,-468,-468,-468,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-468,-468,-468,-468,-468,-468,-468,-468,-468,-468,-468,-468,-468,-468,null,null,-468,-468,-468,null,589,null,null,null,-468,null,null,null,null,null,null,-468,null,-468,null,-468,-468,-468,-468,-468,-468,-468,null,-468,-468,-468,null,null,null,null,null,null,null,null,null,null,null,null,-468,-468,null,-72,null,-468,null,-80,null,-468,-244,-244,-244,null,-244,null,null,null,-244,-244,null,null,null,-244,null,-244,-244,-244,-244,-244,-244,-244,null,null,null,null,-244,-244,-244,-244,-244,-244,-244,null,null,null,null,null,null,null,null,null,-244,null,null,-244,-244,-244,-244,-244,-244,-244,-244,-244,-244,null,-244,-244,null,-244,-244,-244,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-244,null,null,-244,255,null,-244,null,null,null,null,-244,null,-244,null,-244,null,null,null,null,null,null,null,-244,null,null,null,null,-244,-244,-244,-244,-244,-244,null,null,null,-244,-244,62,63,64,null,51,null,-244,null,56,57,-244,-244,null,60,null,58,59,61,247,248,65,66,null,null,null,null,246,276,280,88,87,89,90,null,null,null,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,208,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,null,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,null,41,null,null,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,201,null,null,205,null,null,52,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,null,78,72,74,75,76,77,null,null,null,73,79,62,63,64,7,51,null,93,null,56,57,53,54,null,60,null,58,59,61,23,24,65,66,null,null,null,null,22,28,27,88,87,89,90,null,null,17,null,null,null,null,null,6,41,8,9,92,91,82,50,84,83,85,86,94,95,null,80,81,null,38,39,37,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,36,null,null,30,null,null,52,null,null,null,null,32,null,null,null,40,null,null,null,null,null,null,null,18,null,null,null,-484,78,72,74,75,76,77,-484,-484,-484,73,79,-484,-484,-484,null,-484,null,93,null,null,null,53,54,null,null,-484,null,null,null,null,null,null,null,null,-484,-484,null,-484,-484,-484,-484,-484,null,null,null,null,null,null,null,null,null,null,null,-484,null,null,null,null,null,null,-484,-484,-484,null,null,-484,-484,-484,null,-484,null,null,null,null,-484,null,null,null,null,-484,null,-484,null,null,null,null,255,-484,-484,-484,null,-484,-484,-484,-484,-484,null,null,null,null,null,null,null,null,null,null,null,null,-484,null,null,null,null,null,null,null,null,null,null,null,null,-484,null,-484,null,null,-484,null,-484,null,null,null,null,null,null,-484,null,null,null,null,255,-484,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-484,null,null,null,null,null,null,null,null,null,null,null,null,-484,null,-484,null,null,-484,151,162,152,175,148,168,158,157,null,null,173,156,155,150,176,null,null,160,149,163,167,169,161,154,null,null,170,177,172,349,348,350,347,147,166,165,178,179,180,181,182,146,153,144,145,345,346,343,111,84,83,344,86,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,355,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,null,null,141,null,151,162,152,175,148,168,158,157,null,null,173,156,155,150,176,null,351,160,149,163,167,169,161,154,null,null,170,177,172,171,164,174,159,147,166,165,178,179,180,181,182,146,153,144,145,142,143,109,111,372,371,110,373,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,null,null,141,null,151,162,152,175,148,168,158,157,null,null,173,156,155,150,176,null,183,160,149,163,167,169,161,154,null,null,170,177,172,171,164,174,159,147,166,165,178,179,180,181,182,146,153,144,145,142,143,109,111,null,null,110,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,null,null,141,null,151,162,152,175,148,168,158,157,null,null,173,156,155,150,176,null,183,160,149,163,167,169,161,154,null,null,170,177,172,171,164,174,159,147,166,165,178,179,180,181,182,146,153,144,145,142,143,109,111,108,null,110,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,null,null,141,184,151,162,152,175,148,168,158,157,null,79,173,156,155,150,176,null,183,160,149,163,167,169,161,154,null,null,170,177,172,171,164,174,159,147,166,165,178,179,180,181,182,146,153,144,145,142,143,109,111,null,null,110,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,null,null,141,184,151,162,152,175,148,168,158,157,null,79,173,156,155,150,176,null,183,160,149,163,167,169,161,154,null,null,170,177,172,171,164,174,159,147,166,165,178,179,180,181,182,146,153,144,145,142,143,109,111,372,371,110,373,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,null,null,141,null,151,162,152,175,148,168,158,157,null,null,173,156,155,150,176,null,183,160,149,163,167,169,161,154,null,null,170,177,172,171,164,174,159,147,166,165,178,179,180,181,182,146,153,144,145,142,143,109,111,null,null,110,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,null,null,141,184,151,162,152,175,148,168,158,157,null,79,173,156,155,150,176,null,183,160,149,163,167,169,161,154,null,null,170,177,172,171,164,174,159,147,166,165,178,179,180,181,182,146,153,144,145,142,143,109,111,null,null,110,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,579,null,141,184,null,null,null,null,null,null,null,null,null,79,null,null,null,null,null,null,183,null,216,220,225,226,227,222,224,232,233,228,229,null,209,210,null,null,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,216,220,225,226,227,222,224,232,233,228,229,null,209,210,null,234,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,null,null,null,null,null,null,866,404,null,null,867,null,null,null,null,234,null,609,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,459,404,141,null,460,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,595,410,141,null,596,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,593,404,141,null,594,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,868,410,141,null,869,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,406,410,141,null,408,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,640,410,141,null,641,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,459,404,141,null,460,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,null,null,141,216,220,225,226,227,222,224,232,233,228,229,null,209,210,null,null,230,231,null,null,null,-210,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,null,null,null,null,null,null,637,404,null,null,638,null,null,null,null,234,null,-210,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,593,404,141,null,594,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,595,410,141,null,596,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,459,404,141,null,460,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,401,404,141,null,402,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,684,410,141,null,682,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,684,410,141,null,825,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,459,404,141,null,460,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,459,404,141,null,460,null,null,null,null,null,null,null,137,138,null,135,119,120,121,null,124,126,null,null,122,null,null,null,null,139,140,127,128,null,null,null,null,null,null,null,null,null,null,null,null,132,131,null,118,136,134,133,129,130,125,123,116,null,117,null,null,141,216,220,225,226,227,222,224,232,233,228,229,null,209,210,null,null,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,null,216,220,225,226,227,222,224,232,233,228,229,null,209,210,234,599,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,216,220,225,226,227,222,224,232,233,228,229,null,209,210,292,234,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,216,220,225,226,227,222,224,232,233,228,229,null,209,210,null,234,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,216,220,225,226,227,222,224,232,233,228,229,null,209,210,null,234,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,216,220,225,226,227,222,224,232,233,228,229,null,209,210,null,234,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,216,220,225,226,227,222,224,232,233,228,229,null,209,210,null,234,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,216,220,225,226,227,222,224,232,233,228,229,null,209,210,null,234,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,216,220,225,226,227,222,224,232,233,228,229,null,209,210,null,234,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,216,220,225,226,227,222,224,232,233,228,229,null,209,210,292,234,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,216,220,225,226,227,222,224,232,233,228,229,null,209,210,null,234,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,216,220,225,226,227,222,224,232,233,228,229,null,209,210,null,234,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,216,220,225,226,227,222,224,232,233,228,229,null,209,210,null,234,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,216,220,225,226,227,222,224,232,233,228,229,null,209,210,null,234,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,216,220,225,226,227,222,224,232,233,228,229,null,209,210,null,234,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,216,220,225,226,227,222,224,232,233,228,229,null,209,210,null,234,230,231,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,219,null,215,214,211,212,223,221,217,null,218,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234],[0,0,0,0,0,520,339,278,0,0,545,545,55,0,570,0,0,0,0,0,0,0,419,366,26,35,0,0,0,0,0,0,0,272,634,0,295,295,559,559,272,0,0,0,0,0,0,0,0,0,0,0,0,0,0,359,0,0,462,0,0,0,521,770,15,15,35,419,70,278,35,634,670,867,570,570,70,281,281,868,817,0,357,570,0,366,26,0,309,272,278,462,0,597,623,55,0,545,308,755,593,520,545,520,0,866,520,26,339,0,0,0,0,0,0,359,359,359,0,0,881,881,881,295,881,559,0,339,881,881,0,0,339,881,623,881,881,881,881,881,881,881,357,357,357,593,881,881,881,881,881,881,881,449,868,640,640,618,521,770,521,770,881,521,770,881,881,881,881,881,881,881,881,881,881,363,881,881,200,881,881,881,670,867,670,867,449,670,867,868,817,868,817,640,868,817,617,640,309,348,309,881,368,309,881,739,348,881,308,755,308,755,739,308,755,866,881,866,361,813,866,361,544,200,881,298,813,544,298,881,881,881,881,881,881,363,363,363,881,881,875,875,875,822,875,822,881,846,875,875,881,881,739,875,846,875,875,875,875,875,875,875,368,368,368,582,875,875,875,875,875,875,875,199,275,813,466,273,361,361,199,275,875,466,273,875,875,875,875,875,875,875,875,875,875,347,875,875,594,875,875,875,347,846,646,646,582,287,25,536,582,877,346,343,287,25,536,624,877,346,343,875,259,466,875,609,3,875,337,199,275,3,875,273,875,337,875,202,749,680,488,13,628,594,875,749,680,488,13,875,875,875,875,875,875,259,727,646,875,875,862,862,862,287,862,536,875,877,862,862,875,875,313,862,313,862,862,862,862,862,862,862,202,402,337,14,862,862,862,862,862,862,862,810,749,680,488,13,637,260,810,727,862,37,37,862,862,862,862,862,862,862,862,862,862,351,862,862,401,862,862,862,351,630,402,638,14,42,402,811,14,641,260,349,42,637,811,312,641,637,349,862,312,641,862,353,682,862,869,810,344,631,353,682,345,869,862,344,682,401,869,345,638,401,862,632,638,607,529,862,862,862,862,862,862,636,284,203,862,862,859,859,859,42,859,811,862,641,859,859,862,862,604,859,639,859,859,859,859,859,859,859,682,828,869,602,859,859,859,859,859,859,859,529,529,529,529,284,307,307,204,284,859,771,426,859,859,859,859,859,859,859,859,859,859,350,859,859,687,859,859,859,350,687,299,870,870,299,828,828,828,828,425,108,642,426,240,108,108,426,426,859,302,305,859,302,305,859,771,771,771,771,644,549,658,658,859,473,549,473,473,473,473,425,859,532,532,425,425,859,859,859,859,859,859,645,201,647,859,859,854,854,854,854,854,241,859,650,854,854,859,859,651,854,245,854,854,854,854,854,854,854,473,473,473,473,854,854,854,854,854,854,854,473,444,854,5,5,5,5,5,854,854,854,854,854,854,854,854,854,854,854,854,854,854,590,854,854,660,854,854,854,666,563,563,444,563,563,563,444,444,444,444,375,375,375,375,375,668,669,585,854,254,185,854,673,674,854,677,679,265,681,854,574,684,685,854,527,686,527,527,527,527,554,854,552,691,692,551,854,854,854,854,854,854,550,267,546,854,854,847,847,847,847,847,701,854,268,847,847,854,854,269,847,712,847,847,847,847,847,847,847,527,527,527,527,847,847,847,847,847,847,847,445,96,847,274,523,522,276,516,847,847,847,847,847,847,847,847,847,847,847,847,847,847,77,847,847,76,847,847,847,277,280,445,502,729,730,445,445,445,445,499,733,734,737,738,285,740,286,289,847,744,489,847,293,484,847,41,480,759,479,847,762,36,477,847,694,34,694,694,694,694,294,847,297,468,467,696,847,847,847,847,847,847,780,782,783,847,847,843,843,843,784,843,785,847,786,843,843,847,847,465,843,791,843,843,843,843,843,843,843,694,694,694,694,843,843,843,843,843,843,843,696,696,696,696,464,20,455,801,802,843,301,805,843,843,843,843,843,843,843,843,843,843,430,843,843,429,843,843,843,428,427,812,303,407,819,820,12,314,824,825,400,832,396,11,838,10,841,842,843,9,315,843,393,388,843,8,387,856,365,843,860,362,865,843,61,317,61,61,61,61,318,843,319,335,322,871,843,843,843,843,843,843,873,333,876,843,843,840,840,840,330,840,1,843,883,840,840,843,843,null,840,null,840,840,840,840,840,840,840,61,61,61,61,840,840,840,840,840,840,840,null,null,null,null,null,null,null,null,null,840,null,null,840,840,840,840,840,840,840,840,840,840,null,840,840,null,840,840,840,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,840,null,null,840,null,null,840,null,null,null,null,840,null,840,null,840,548,null,548,548,548,548,null,840,null,null,null,null,840,840,840,840,840,840,null,null,null,840,840,837,837,837,null,837,null,840,null,837,837,840,840,null,837,null,837,837,837,837,837,837,837,548,548,548,548,837,837,837,837,837,837,837,null,null,null,null,null,null,null,null,null,837,null,null,837,837,837,837,837,837,837,837,837,837,null,837,837,null,837,837,837,439,439,439,439,439,439,439,null,null,439,439,null,null,null,null,null,439,439,null,837,null,null,837,null,null,837,null,null,null,null,837,439,837,439,837,439,439,439,439,439,439,439,837,439,null,null,null,837,837,837,837,837,837,null,null,null,837,837,821,821,821,null,821,null,837,null,821,821,837,837,null,821,null,821,821,821,821,821,821,821,null,null,null,null,821,821,821,821,821,821,821,null,null,null,null,null,null,null,null,null,821,null,null,821,821,821,821,821,821,821,821,821,821,null,821,821,null,821,821,821,443,443,443,443,443,443,443,null,null,443,443,null,null,null,null,null,443,443,null,821,null,null,821,null,null,821,null,null,null,null,null,443,null,443,821,443,443,443,443,443,443,443,821,443,null,null,null,821,821,821,821,821,821,null,null,null,821,821,809,809,809,809,809,null,821,null,809,809,821,821,null,809,null,809,809,809,809,809,809,809,null,null,null,null,809,809,809,809,809,809,809,null,null,809,null,null,null,null,null,809,809,809,809,809,809,809,809,809,809,809,809,809,809,null,809,809,null,809,809,809,442,442,442,442,442,442,442,null,null,442,442,null,null,null,null,null,442,442,null,809,null,null,809,null,null,809,null,null,null,null,809,442,null,442,809,442,442,442,442,442,442,442,809,442,null,null,null,809,809,809,809,809,809,null,null,null,809,809,806,806,806,null,806,null,809,null,806,806,809,809,null,806,null,806,806,806,806,806,806,806,null,null,null,null,806,806,806,806,806,806,806,null,null,null,null,null,null,null,null,null,806,null,null,806,806,806,806,806,806,806,806,806,806,null,806,806,null,806,806,806,441,441,441,441,441,441,441,null,null,441,441,null,null,null,null,null,441,441,null,806,null,null,806,null,null,806,null,null,null,null,null,441,null,441,806,441,441,441,441,441,441,441,806,441,null,null,null,806,806,806,806,806,806,null,null,null,806,806,804,804,804,null,804,null,806,null,804,804,806,806,null,804,null,804,804,804,804,804,804,804,null,null,null,null,804,804,804,804,804,804,804,null,null,null,null,null,null,null,null,null,804,null,null,804,804,804,804,804,804,804,804,804,804,null,804,804,null,804,804,804,440,440,440,440,440,440,440,null,null,440,440,null,null,null,null,null,440,440,null,804,null,null,804,null,null,804,null,null,null,null,null,440,null,440,804,440,440,440,440,440,440,440,804,440,null,null,null,804,804,804,804,804,804,null,null,null,804,804,17,17,17,null,17,null,804,null,17,17,804,804,null,17,null,17,17,17,17,17,17,17,null,null,null,null,17,17,17,17,17,17,17,null,null,17,null,null,null,null,null,null,17,null,null,17,17,17,17,17,17,17,17,17,17,null,17,17,null,17,17,17,447,447,447,447,447,447,447,447,null,447,447,null,null,null,null,null,447,447,null,17,null,null,17,null,null,17,null,null,null,null,null,447,null,447,17,447,447,447,447,447,447,447,17,447,null,null,null,17,17,17,17,17,17,null,null,null,17,17,18,18,18,null,18,null,17,null,18,18,17,17,null,18,null,18,18,18,18,18,18,18,null,null,null,null,18,18,18,18,18,18,18,null,null,null,null,null,null,null,null,null,18,null,null,18,18,18,18,18,18,18,18,18,18,null,18,18,null,18,18,18,438,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,438,438,null,18,null,null,18,null,null,18,null,null,null,null,null,438,null,438,18,438,438,438,438,null,null,438,18,438,null,null,null,18,18,18,18,18,18,null,null,null,18,18,798,798,798,null,798,null,18,null,798,798,18,18,null,798,null,798,798,798,798,798,798,798,null,null,null,null,798,798,798,798,798,798,798,null,null,null,null,null,null,null,null,null,798,null,null,798,798,798,798,798,798,798,798,798,798,null,798,798,null,798,798,798,437,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,437,437,null,798,null,null,798,null,null,798,null,null,null,null,null,437,null,437,798,437,437,437,437,null,null,437,798,437,null,null,null,798,798,798,798,798,798,null,null,null,798,798,795,795,795,null,795,null,798,null,795,795,798,798,null,795,null,795,795,795,795,795,795,795,null,null,null,null,795,795,795,795,795,795,795,null,null,null,null,null,null,null,null,null,795,null,null,795,795,795,795,795,795,795,795,795,795,null,795,795,null,795,795,795,436,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,436,436,null,795,null,null,795,null,null,795,null,null,null,null,null,436,null,436,795,436,436,436,436,null,null,436,795,436,null,null,null,795,795,795,795,795,795,null,null,null,795,795,22,22,22,null,22,null,795,null,22,22,795,795,null,22,null,22,22,22,22,22,22,22,null,null,null,null,22,22,22,22,22,22,22,null,null,null,null,null,null,null,null,null,22,null,null,22,22,22,22,22,22,22,22,22,22,null,22,22,null,22,22,22,435,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,435,435,null,22,null,null,22,null,null,22,null,null,null,null,22,435,22,435,22,435,435,435,435,null,null,435,22,435,null,null,null,22,22,22,22,22,22,null,null,null,22,22,23,23,23,null,23,null,22,null,23,23,22,22,null,23,null,23,23,23,23,23,23,23,null,null,null,null,23,23,23,23,23,23,23,null,null,null,null,null,null,null,null,null,23,null,null,23,23,23,23,23,23,23,23,23,23,null,23,23,null,23,23,23,424,424,424,424,424,424,424,424,424,424,424,null,424,424,null,null,424,424,null,23,null,null,23,null,null,23,null,null,null,null,23,424,23,424,23,424,424,424,424,424,424,424,23,424,null,null,null,23,23,23,23,23,23,null,null,null,23,23,24,24,24,null,24,null,23,null,24,24,23,23,null,24,null,24,24,24,24,24,24,24,null,null,null,null,24,24,24,24,24,24,24,null,null,null,null,null,null,null,null,null,24,null,null,24,24,24,24,24,24,24,24,24,24,null,24,24,null,24,24,24,434,434,434,434,434,434,434,null,null,434,434,null,null,null,null,null,434,434,null,24,null,null,24,null,null,24,null,null,null,null,24,434,24,434,24,434,434,434,434,434,434,434,24,434,null,null,null,24,24,24,24,24,24,null,null,null,24,24,789,789,789,789,789,null,24,null,789,789,24,24,null,789,null,789,789,789,789,789,789,789,null,null,null,null,789,789,789,789,789,789,789,null,null,789,null,null,null,null,null,789,789,789,789,789,789,789,789,789,789,789,789,789,789,null,789,789,null,789,789,789,446,446,446,446,446,446,446,null,null,446,446,null,null,null,null,null,446,446,null,789,null,null,789,null,null,789,null,null,null,null,789,446,null,446,789,446,446,446,446,446,446,446,789,446,null,null,null,789,789,789,789,789,789,null,null,null,789,789,768,768,768,768,768,null,789,null,768,768,789,789,null,768,null,768,768,768,768,768,768,768,null,null,null,null,768,768,768,768,768,768,768,null,null,768,null,null,null,null,null,768,768,768,768,768,768,768,768,768,768,768,768,768,768,null,768,768,null,768,768,768,423,423,423,423,423,423,423,423,423,423,423,null,423,423,null,null,423,423,null,768,null,null,768,null,null,768,null,null,null,null,768,423,null,423,768,423,423,423,423,423,423,423,768,423,null,null,null,768,768,768,768,768,768,null,null,null,768,768,27,27,27,null,27,null,768,null,27,27,768,768,null,27,null,27,27,27,27,27,27,27,null,null,null,null,27,27,27,27,27,27,27,null,null,null,null,null,null,null,null,null,27,null,null,27,27,27,27,27,27,27,27,27,27,null,27,27,null,27,27,27,431,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,431,431,null,27,null,null,27,27,null,27,null,null,null,null,27,431,27,431,27,431,431,431,431,null,null,null,27,null,null,null,28,27,27,27,27,27,27,28,28,28,27,27,28,28,28,433,28,null,27,null,null,null,27,27,null,null,28,28,null,null,null,433,433,null,null,28,28,null,28,28,28,28,28,null,null,null,433,null,null,null,433,433,433,433,null,null,null,null,null,null,null,null,null,null,28,28,28,28,28,28,28,28,28,28,28,28,28,28,null,null,28,28,28,null,null,28,null,28,28,null,null,28,null,28,null,28,null,28,null,28,28,28,28,28,28,28,null,28,null,28,null,null,null,null,null,null,null,null,null,null,null,null,28,28,28,28,null,28,null,null,null,28,30,30,30,30,30,null,null,null,30,30,null,null,null,30,null,30,30,30,30,30,30,30,null,null,null,null,30,30,30,30,30,30,30,null,null,30,null,null,null,null,null,30,30,30,30,30,30,30,30,30,30,30,30,30,30,null,30,30,null,30,30,30,432,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,432,432,null,30,null,null,30,null,null,30,null,null,null,null,30,432,null,432,30,432,432,432,432,null,null,null,30,null,null,null,null,30,30,30,30,30,30,null,null,null,30,30,31,31,31,null,31,null,30,null,31,31,30,30,null,31,null,31,31,31,31,31,31,31,null,null,null,null,31,31,31,31,31,31,31,null,null,null,null,null,null,null,null,null,31,null,null,31,31,31,31,31,31,31,31,31,31,null,31,31,null,null,352,31,352,352,352,352,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,31,null,null,31,null,null,31,null,null,null,null,31,null,null,null,null,null,352,null,null,null,null,null,null,352,352,352,352,31,31,31,31,31,31,null,null,null,31,31,32,32,32,null,32,null,31,null,32,32,31,31,null,32,null,32,32,32,32,32,32,32,null,null,null,null,32,32,32,32,32,32,32,null,null,null,null,null,null,null,null,null,32,null,null,32,32,32,32,32,32,32,32,32,32,null,32,32,null,null,700,32,700,700,700,700,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,32,null,null,32,null,null,32,null,null,null,null,null,null,null,null,null,null,700,null,null,null,null,null,null,700,700,700,700,32,32,32,32,32,32,null,null,null,32,32,767,767,767,null,767,null,32,null,767,767,32,32,null,767,null,767,767,767,767,767,767,767,null,null,null,null,767,767,767,767,767,767,767,null,null,null,null,null,null,null,null,null,767,null,null,767,767,767,767,767,767,767,767,767,767,null,767,767,null,767,767,767,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,767,null,null,767,null,null,767,null,null,null,null,767,null,null,null,767,null,null,null,null,null,null,null,767,null,null,null,null,767,767,767,767,767,767,null,null,null,767,767,340,340,340,null,340,null,767,null,340,340,767,767,null,340,null,340,340,340,340,340,340,340,null,null,null,null,340,340,340,340,340,340,340,null,null,340,null,null,null,null,null,null,340,null,null,340,340,340,340,340,340,340,340,340,340,null,340,340,null,340,340,340,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,340,null,null,340,null,null,340,null,null,null,null,null,null,null,null,340,null,null,null,null,null,null,null,340,null,null,null,null,340,340,340,340,340,340,null,null,null,340,340,763,763,763,763,763,null,340,null,763,763,340,340,null,763,null,763,763,763,763,763,763,763,null,null,null,null,763,763,763,763,763,763,763,null,null,763,null,null,null,null,null,763,763,763,763,763,763,763,763,763,763,763,763,763,763,null,763,763,null,763,763,763,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,763,null,null,763,null,null,763,null,null,null,null,763,null,null,null,763,null,null,null,null,null,null,null,763,null,null,null,null,763,763,763,763,763,763,null,null,null,763,763,761,761,761,null,761,null,763,null,761,761,763,763,null,761,null,761,761,761,761,761,761,761,null,null,null,null,761,761,761,761,761,761,761,null,null,761,null,null,null,null,null,null,761,null,null,761,761,761,761,761,761,761,761,761,761,null,761,761,null,761,761,761,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,761,null,null,761,null,null,761,null,null,null,null,null,null,null,null,761,null,null,null,null,null,null,null,761,null,null,null,null,761,761,761,761,761,761,null,null,null,761,761,38,38,38,null,38,null,761,null,38,38,761,761,null,38,null,38,38,38,38,38,38,38,null,null,null,null,38,38,38,38,38,38,38,null,null,null,null,null,null,null,null,null,38,null,null,38,38,38,38,38,38,38,38,38,38,null,38,38,null,38,38,38,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,38,null,null,38,null,null,38,null,null,null,null,null,null,null,null,38,null,null,null,null,null,null,null,38,null,null,null,null,38,38,38,38,38,38,null,null,null,38,38,39,39,39,null,39,null,38,null,39,39,38,38,null,39,null,39,39,39,39,39,39,39,null,null,null,null,39,39,39,39,39,39,39,null,null,null,null,null,null,null,null,null,39,null,null,39,39,39,39,39,39,39,39,39,39,null,39,39,null,39,39,39,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,39,null,null,39,null,null,39,null,null,null,null,null,null,null,null,39,null,null,null,null,null,null,null,39,null,null,null,null,39,39,39,39,39,39,null,null,null,39,39,40,40,40,null,40,null,39,null,40,40,39,39,null,40,null,40,40,40,40,40,40,40,null,null,null,null,40,40,40,40,40,40,40,null,null,null,null,null,null,null,null,null,40,null,null,40,40,40,40,40,40,40,40,40,40,null,40,40,null,40,40,40,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,40,null,null,40,null,null,40,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,40,null,null,null,null,40,40,40,40,40,40,null,null,null,40,40,756,756,756,null,756,null,40,null,756,756,40,40,null,756,null,756,756,756,756,756,756,756,null,null,null,null,756,756,756,756,756,756,756,null,null,null,null,null,null,null,null,null,756,null,null,756,756,756,756,756,756,756,756,756,756,null,756,756,null,null,null,756,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,756,null,null,756,null,null,756,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,756,756,756,756,756,756,null,null,null,756,756,752,752,752,752,752,null,756,null,752,752,756,756,null,752,null,752,752,752,752,752,752,752,null,334,null,null,752,752,752,752,752,752,752,null,null,752,null,null,null,null,null,752,752,752,752,752,752,752,752,752,752,752,752,752,752,null,752,752,null,752,752,752,null,null,null,null,null,null,null,null,null,null,null,334,null,null,null,null,null,null,334,752,null,null,752,334,null,752,null,null,null,null,752,null,null,null,752,null,null,null,null,null,null,null,752,null,334,null,50,752,752,752,752,752,752,50,50,50,752,752,50,50,50,null,50,null,752,null,null,334,752,752,50,null,50,50,null,null,null,null,null,null,null,50,50,null,50,50,50,50,50,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,50,50,50,50,50,50,50,50,50,50,50,50,50,50,null,null,50,50,50,null,null,50,null,null,50,null,null,50,null,50,null,50,null,50,null,50,50,50,50,50,50,50,null,50,null,50,null,null,null,null,null,null,null,null,null,null,null,null,50,50,50,50,null,50,null,null,null,50,51,51,51,51,51,null,null,null,51,51,null,null,null,51,null,51,51,51,51,51,51,51,null,null,null,null,51,51,51,51,51,51,51,null,null,51,null,null,null,null,null,51,51,51,51,51,51,51,51,51,51,51,51,51,51,null,51,51,null,51,51,51,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,51,null,null,51,null,null,51,null,null,null,null,51,null,null,null,51,null,null,null,null,null,null,null,51,null,null,null,null,51,51,51,51,51,51,null,null,null,51,51,52,52,52,null,52,null,51,null,52,52,51,51,null,52,null,52,52,52,52,52,52,52,null,null,null,null,52,52,52,52,52,52,52,null,null,52,null,null,null,null,null,null,52,null,null,52,52,52,52,52,52,52,52,52,52,null,52,52,null,52,52,52,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,52,null,null,52,null,null,52,null,null,null,null,null,null,null,null,52,null,null,null,null,null,null,null,52,null,null,null,null,52,52,52,52,52,52,null,null,null,52,52,53,53,53,null,53,null,52,null,53,53,52,52,null,53,null,53,53,53,53,53,53,53,null,null,null,null,53,53,53,53,53,53,53,null,null,null,null,null,null,null,null,null,53,null,null,53,53,53,53,53,53,53,53,53,53,null,53,53,null,53,53,53,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,53,null,null,53,null,null,53,null,null,null,null,53,null,null,null,53,null,null,null,null,null,null,null,53,null,null,null,null,53,53,53,53,53,53,null,null,null,53,53,54,54,54,null,54,null,53,null,54,54,53,53,null,54,null,54,54,54,54,54,54,54,null,null,null,null,54,54,54,54,54,54,54,null,null,null,null,null,null,null,null,null,54,null,null,54,54,54,54,54,54,54,54,54,54,null,54,54,null,54,54,54,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,54,null,null,54,null,null,54,null,null,null,null,null,null,null,null,54,null,null,null,null,null,null,null,54,null,null,null,null,54,54,54,54,54,54,null,null,null,54,54,743,743,743,null,743,null,54,null,743,743,54,54,null,743,null,743,743,743,743,743,743,743,null,null,null,null,743,743,743,743,743,743,743,null,null,null,null,null,null,null,null,null,743,null,null,743,743,743,743,743,743,743,743,743,743,null,743,743,null,743,743,743,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,743,null,null,743,null,null,743,null,null,null,null,743,null,743,null,743,null,null,null,null,null,null,null,743,null,null,null,null,743,743,743,743,743,743,null,null,null,743,743,56,56,56,null,56,null,743,null,56,56,743,743,null,56,null,56,56,56,56,56,56,56,null,null,null,null,56,56,56,56,56,56,56,null,null,56,null,null,null,null,null,null,56,null,null,56,56,56,56,56,56,56,56,56,56,null,56,56,null,56,56,56,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,56,null,null,56,null,null,56,null,null,null,null,null,null,null,null,56,null,null,null,null,null,null,null,56,null,null,null,null,56,56,56,56,56,56,null,null,null,56,56,57,57,57,null,57,null,56,null,57,57,56,56,null,57,null,57,57,57,57,57,57,57,null,null,null,null,57,57,57,57,57,57,57,null,null,57,null,null,null,null,null,null,57,null,null,57,57,57,57,57,57,57,57,57,57,null,57,57,null,57,57,57,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,57,null,null,57,null,null,57,null,null,null,null,null,null,null,null,57,null,null,null,null,null,null,null,57,null,null,null,null,57,57,57,57,57,57,null,null,null,57,57,60,60,60,null,60,null,57,null,60,60,57,57,null,60,null,60,60,60,60,60,60,60,null,null,null,null,60,60,60,60,60,60,60,null,null,60,null,null,null,null,391,null,60,null,null,60,60,60,60,60,60,60,60,60,60,null,60,60,null,60,60,60,391,391,391,391,391,391,391,391,391,391,391,null,391,391,null,null,391,391,null,60,null,null,60,null,null,60,null,null,null,null,null,391,null,391,60,391,391,391,391,391,391,391,60,391,null,null,null,60,60,60,60,60,60,null,null,null,60,60,60,391,null,391,null,60,60,null,null,null,60,60,741,741,741,null,741,null,null,null,741,741,null,null,null,741,null,741,741,741,741,741,741,741,null,null,null,null,741,741,741,741,741,741,741,null,null,null,null,null,null,null,null,null,741,null,null,741,741,741,741,741,741,741,741,741,741,null,741,741,null,741,741,741,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,741,null,null,741,null,null,741,null,null,null,null,741,null,741,null,741,null,null,null,null,null,null,null,741,null,null,null,null,741,741,741,741,741,741,null,null,null,741,741,62,62,62,null,62,null,741,null,62,62,741,741,null,62,null,62,62,62,62,62,62,62,null,null,null,null,62,62,62,62,62,62,62,null,null,null,null,null,null,null,null,null,62,null,null,62,62,62,62,62,62,62,62,62,62,null,62,62,null,null,null,62,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,62,null,null,62,null,null,62,null,null,62,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,62,62,62,62,62,62,null,null,null,62,62,63,63,63,null,63,null,62,null,63,63,62,62,null,63,null,63,63,63,63,63,63,63,null,null,null,null,63,63,63,63,63,63,63,null,null,null,null,null,null,null,null,null,63,null,null,63,63,63,63,63,63,63,63,63,63,null,63,63,null,null,null,63,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,63,null,null,63,null,null,63,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,63,63,63,63,63,63,null,null,null,63,63,732,732,732,null,732,null,63,null,732,732,63,63,null,732,null,732,732,732,732,732,732,732,null,null,null,null,732,732,732,732,732,732,732,null,null,null,null,null,null,null,null,null,732,null,null,732,732,732,732,732,732,732,732,732,732,null,732,732,null,732,732,732,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,732,null,null,732,null,null,732,null,null,null,null,732,null,732,null,732,null,null,null,null,null,null,null,732,null,null,null,null,732,732,732,732,732,732,null,null,null,732,732,726,726,726,null,726,null,732,null,726,726,732,732,null,726,null,726,726,726,726,726,726,726,null,null,null,null,726,726,726,726,726,726,726,null,null,null,null,null,null,null,null,null,726,null,null,726,726,726,726,726,726,726,726,726,726,null,726,726,null,726,726,726,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,726,null,null,726,null,null,726,null,null,null,null,null,null,null,null,726,null,null,null,null,null,null,null,726,null,null,null,null,726,726,726,726,726,726,null,null,null,726,726,725,725,725,null,725,null,726,null,725,725,726,726,null,725,null,725,725,725,725,725,725,725,null,null,null,null,725,725,725,725,725,725,725,null,null,null,null,null,null,null,null,null,725,null,null,725,725,725,725,725,725,725,725,725,725,null,725,725,null,725,725,725,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,725,null,null,725,null,null,725,null,null,null,null,null,null,null,null,725,null,null,null,null,null,null,null,725,null,null,null,null,725,725,725,725,725,725,null,null,null,725,725,724,724,724,null,724,null,725,null,724,724,725,725,null,724,null,724,724,724,724,724,724,724,null,null,null,null,724,724,724,724,724,724,724,null,null,null,null,null,null,null,null,null,724,null,null,724,724,724,724,724,724,724,724,724,724,null,724,724,null,724,724,724,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,724,null,null,724,null,null,724,null,null,null,null,null,null,null,null,724,null,null,null,null,null,null,null,724,null,null,null,null,724,724,724,724,724,724,null,null,null,724,724,714,714,714,null,714,null,724,null,714,714,724,724,null,714,null,714,714,714,714,714,714,714,null,null,null,null,714,714,714,714,714,714,714,null,null,null,null,null,null,null,null,null,714,null,null,714,714,714,714,714,714,714,714,714,714,null,714,714,null,714,714,714,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,714,null,null,714,null,null,714,null,null,null,null,null,null,null,null,714,null,null,null,null,null,null,null,714,null,null,null,null,714,714,714,714,714,714,null,null,null,714,714,82,82,82,null,82,null,714,null,82,82,714,714,null,82,null,82,82,82,82,82,82,82,null,82,null,null,82,82,82,82,82,82,82,null,null,null,null,null,null,null,null,null,82,null,null,82,82,82,82,82,82,82,82,82,82,null,82,82,null,82,82,82,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,82,null,null,82,82,null,82,null,null,null,null,82,null,82,null,82,null,null,null,null,null,null,null,82,null,82,null,null,82,82,82,82,82,82,null,null,null,82,82,85,85,85,null,85,null,82,null,85,85,82,82,null,85,null,85,85,85,85,85,85,85,null,85,null,null,85,85,85,85,85,85,85,null,null,null,null,null,null,null,null,null,85,null,null,85,85,85,85,85,85,85,85,85,85,null,85,85,null,85,85,85,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,85,null,null,85,85,null,85,null,null,null,null,85,null,85,null,85,null,null,null,null,null,null,null,85,null,85,null,null,85,85,85,85,85,85,null,null,null,85,85,713,713,713,null,713,null,85,null,713,713,85,85,null,713,null,713,713,713,713,713,713,713,null,null,null,null,713,713,713,713,713,713,713,null,null,null,null,null,null,null,null,null,713,null,null,713,713,713,713,713,713,713,713,713,713,null,713,713,null,713,713,713,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,713,null,null,713,null,null,713,null,null,null,null,null,null,null,null,713,null,null,null,null,null,null,null,713,null,null,null,null,713,713,713,713,713,713,null,null,null,713,713,98,98,98,98,98,null,713,null,98,98,713,713,null,98,null,98,98,98,98,98,98,98,null,null,null,null,98,98,98,98,98,98,98,null,null,98,null,null,null,null,null,98,98,98,98,98,98,98,98,98,98,98,98,98,98,null,98,98,null,98,98,98,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,98,null,null,98,null,null,98,null,null,null,null,98,null,null,null,98,null,null,null,null,null,null,null,98,null,null,null,null,98,98,98,98,98,98,null,null,null,98,98,102,102,102,null,102,98,98,null,102,102,98,98,null,102,null,102,102,102,102,102,102,102,null,null,null,null,102,102,102,102,102,102,102,null,null,102,null,null,null,null,null,null,102,null,null,102,102,102,102,102,102,102,102,102,102,null,102,102,null,102,102,102,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,102,null,null,102,null,null,102,null,null,null,null,null,null,null,null,102,null,null,null,null,null,null,null,102,null,null,null,null,102,102,102,102,102,102,null,null,null,102,102,103,103,103,null,103,null,102,null,103,103,102,102,null,103,null,103,103,103,103,103,103,103,null,null,null,null,103,103,103,103,103,103,103,null,null,103,null,null,null,null,null,null,103,null,null,103,103,103,103,103,103,103,103,103,103,null,103,103,null,103,103,103,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,103,null,null,103,null,null,103,null,null,null,null,null,null,null,null,103,null,null,null,null,null,null,null,103,null,null,null,null,103,103,103,103,103,103,null,null,null,103,103,104,104,104,null,104,null,103,null,104,104,103,103,null,104,null,104,104,104,104,104,104,104,null,null,null,null,104,104,104,104,104,104,104,null,null,104,null,null,null,null,null,null,104,null,null,104,104,104,104,104,104,104,104,104,104,null,104,104,null,104,104,104,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,104,null,null,104,null,null,104,null,null,null,null,null,null,null,null,104,null,null,null,null,null,null,null,104,null,null,null,null,104,104,104,104,104,104,null,null,null,104,104,105,105,105,null,105,null,104,null,105,105,104,104,null,105,null,105,105,105,105,105,105,105,null,null,null,null,105,105,105,105,105,105,105,null,null,105,null,null,null,null,null,null,105,null,null,105,105,105,105,105,105,105,105,105,105,null,105,105,null,105,105,105,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,105,null,null,105,null,null,105,null,null,null,null,null,null,null,null,105,null,null,null,null,null,null,null,105,null,null,null,null,105,105,105,105,105,105,null,null,null,105,105,106,106,106,106,106,null,105,null,106,106,105,105,null,106,null,106,106,106,106,106,106,106,null,null,null,null,106,106,106,106,106,106,106,null,null,106,null,null,null,null,null,106,106,106,106,106,106,106,106,106,106,106,106,106,106,null,106,106,null,106,106,106,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,106,null,null,106,null,null,106,null,null,null,null,106,null,null,null,106,null,null,null,null,null,null,null,106,null,null,null,null,106,106,106,106,106,106,null,null,null,106,106,707,707,707,707,707,null,106,null,707,707,106,106,null,707,null,707,707,707,707,707,707,707,null,null,null,null,707,707,707,707,707,707,707,null,null,707,null,null,null,null,null,707,707,707,707,707,707,707,707,707,707,707,707,707,707,null,707,707,null,707,707,707,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,707,null,null,707,null,null,707,null,null,null,null,707,null,null,null,707,null,null,null,null,null,null,null,707,null,null,null,null,707,707,707,707,707,707,null,null,null,707,707,699,699,699,null,699,null,707,null,699,699,707,707,null,699,null,699,699,699,699,699,699,699,null,null,null,null,699,699,699,699,699,699,699,null,null,null,null,null,null,null,null,null,699,null,null,699,699,699,699,699,699,699,699,699,699,null,699,699,null,699,699,699,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,699,null,null,699,null,null,699,null,null,null,null,null,null,null,null,699,null,null,null,null,null,null,null,699,null,null,null,null,699,699,699,699,699,699,null,null,null,699,699,689,689,689,689,689,null,699,null,689,689,699,699,null,689,null,689,689,689,689,689,689,689,null,null,null,null,689,689,689,689,689,689,689,null,null,689,null,null,null,null,null,689,689,689,689,689,689,689,689,689,689,689,689,689,689,null,689,689,null,689,689,689,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,689,null,null,689,null,null,689,null,null,null,null,689,null,null,null,689,null,null,null,null,null,null,null,689,null,null,null,null,689,689,689,689,689,689,null,null,null,689,689,672,672,672,null,672,null,689,null,672,672,689,689,null,672,null,672,672,672,672,672,672,672,null,null,null,null,672,672,672,672,672,672,672,null,null,672,null,null,null,null,null,null,672,null,null,672,672,672,672,672,672,672,672,672,672,null,672,672,null,672,672,672,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,672,null,null,672,null,null,672,null,null,null,null,null,null,null,null,672,null,null,null,null,null,null,null,672,null,null,null,null,672,672,672,672,672,672,null,null,null,672,672,187,187,187,187,187,null,672,null,187,187,672,672,null,187,null,187,187,187,187,187,187,187,null,null,null,null,187,187,187,187,187,187,187,null,null,187,null,null,null,null,null,187,187,187,187,187,187,187,187,187,187,187,187,187,187,null,187,187,null,187,187,187,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,187,null,null,187,null,null,187,null,null,null,null,187,null,null,null,187,null,null,null,null,null,null,null,187,null,null,null,null,187,187,187,187,187,187,null,null,null,187,187,188,188,188,188,188,null,187,null,188,188,187,187,null,188,null,188,188,188,188,188,188,188,null,null,null,null,188,188,188,188,188,188,188,null,null,188,null,null,null,null,null,188,188,188,188,188,188,188,188,188,188,188,188,188,188,null,188,188,null,188,188,188,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,188,null,null,188,null,null,188,null,null,null,null,188,null,null,null,188,null,null,null,null,null,null,null,188,null,null,null,null,188,188,188,188,188,188,null,null,null,188,188,189,189,189,null,189,null,188,null,189,189,188,188,null,189,null,189,189,189,189,189,189,189,null,null,null,null,189,189,189,189,189,189,189,null,null,null,null,null,null,null,null,null,189,null,null,189,189,189,189,189,189,189,189,189,189,null,189,189,null,189,189,189,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,189,null,null,189,null,null,189,null,null,null,null,189,null,null,null,189,null,null,null,null,null,null,null,189,null,null,null,null,189,189,189,189,189,189,null,null,null,189,189,190,190,190,null,190,null,189,null,190,190,189,189,null,190,null,190,190,190,190,190,190,190,null,null,null,null,190,190,190,190,190,190,190,null,null,null,null,null,null,null,null,null,190,null,null,190,190,190,190,190,190,190,190,190,190,null,190,190,null,190,190,190,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,190,null,null,190,null,null,190,null,null,null,null,190,null,null,null,190,null,null,null,null,null,null,null,190,null,null,null,null,190,190,190,190,190,190,null,null,null,190,190,191,191,191,null,191,null,190,null,191,191,190,190,null,191,null,191,191,191,191,191,191,191,null,null,null,null,191,191,191,191,191,191,191,null,null,null,null,null,null,null,null,null,191,null,null,191,191,191,191,191,191,191,191,191,191,null,191,191,null,191,191,191,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,191,null,null,191,null,null,191,null,null,null,null,null,null,null,null,191,null,null,null,null,null,null,null,191,null,null,null,null,191,191,191,191,191,191,null,null,null,191,191,192,192,192,null,192,null,191,null,192,192,191,191,null,192,null,192,192,192,192,192,192,192,null,null,null,null,192,192,192,192,192,192,192,null,null,null,null,null,null,null,null,null,192,null,null,192,192,192,192,192,192,192,192,192,192,null,192,192,null,192,192,192,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,192,null,null,192,null,null,192,null,null,null,null,192,null,null,null,192,null,null,null,null,null,null,null,192,null,null,null,null,192,192,192,192,192,192,null,null,null,192,192,671,671,671,null,671,null,192,null,671,671,192,192,null,671,null,671,671,671,671,671,671,671,null,null,null,null,671,671,671,671,671,671,671,null,null,null,null,null,null,null,null,null,671,null,null,671,671,671,671,671,671,671,671,671,671,null,671,671,null,671,671,671,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,671,null,null,671,null,null,671,null,null,null,null,null,null,null,null,671,null,null,null,null,null,null,null,671,null,null,null,null,671,671,671,671,671,671,null,null,null,671,671,655,655,655,null,655,null,671,null,655,655,671,671,null,655,null,655,655,655,655,655,655,655,null,null,null,null,655,655,655,655,655,655,655,null,null,null,null,null,null,null,null,null,655,null,null,655,655,655,655,655,655,655,655,655,655,null,655,655,null,655,655,655,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,655,null,null,655,null,null,655,null,null,null,null,null,null,null,null,655,null,null,null,null,null,null,null,655,null,null,null,null,655,655,655,655,655,655,null,null,null,655,655,195,195,195,null,195,null,655,null,195,195,655,655,null,195,null,195,195,195,195,195,195,195,null,null,null,null,195,195,195,195,195,195,195,null,null,null,null,null,null,null,null,null,195,null,null,195,195,195,195,195,195,195,195,195,195,null,195,195,null,195,195,195,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,195,null,null,195,null,null,195,null,null,null,null,null,null,null,null,195,null,null,null,null,null,null,null,195,null,null,null,null,195,195,195,195,195,195,null,null,null,195,195,196,196,196,null,196,null,195,null,196,196,195,195,null,196,null,196,196,196,196,196,196,196,null,null,null,null,196,196,196,196,196,196,196,null,null,196,null,null,null,null,null,null,196,null,null,196,196,196,196,196,196,196,196,196,196,null,196,196,null,196,196,196,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,196,null,null,196,null,null,196,null,null,null,null,null,null,null,null,196,null,null,null,null,null,null,null,196,null,null,null,null,196,196,196,196,196,196,null,null,null,196,196,197,197,197,null,197,null,196,null,197,197,196,196,null,197,null,197,197,197,197,197,197,197,null,null,null,null,197,197,197,197,197,197,197,null,null,197,null,null,null,null,null,null,197,null,null,197,197,197,197,197,197,197,197,197,197,null,197,197,null,197,197,197,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,197,null,null,197,null,null,197,null,null,null,null,null,null,null,null,197,null,null,null,null,null,null,null,197,null,null,null,null,197,197,197,197,197,197,null,null,null,197,197,649,649,649,649,649,null,197,null,649,649,197,197,null,649,null,649,649,649,649,649,649,649,null,null,null,null,649,649,649,649,649,649,649,null,null,649,null,null,null,null,null,649,649,649,649,649,649,649,649,649,649,649,649,649,649,null,649,649,null,649,649,649,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,649,null,null,649,null,null,649,null,null,null,null,649,null,null,null,649,null,null,null,null,null,null,null,649,null,null,null,null,649,649,649,649,649,649,null,null,null,649,649,625,625,625,null,625,null,649,null,625,625,649,649,null,625,null,625,625,625,625,625,625,625,null,null,null,null,625,625,625,625,625,625,625,null,null,null,null,null,null,null,null,null,625,null,null,625,625,625,625,625,625,625,625,625,625,null,625,625,null,625,625,625,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,625,null,null,625,null,null,625,null,null,null,null,null,null,null,null,625,null,null,null,null,null,null,null,625,null,null,null,null,625,625,625,625,625,625,null,null,null,625,625,621,621,621,null,621,null,625,null,621,621,625,625,null,621,null,621,621,621,621,621,621,621,null,null,null,null,621,621,621,621,621,621,621,null,null,null,null,null,null,null,null,null,621,null,null,621,621,621,621,621,621,621,621,621,621,null,621,621,null,621,621,621,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,621,null,null,621,null,null,621,null,null,null,null,621,null,621,null,621,null,null,null,null,null,null,null,621,null,null,null,null,621,621,621,621,621,621,null,null,null,621,621,615,615,615,615,615,null,621,null,615,615,621,621,null,615,null,615,615,615,615,615,615,615,null,null,null,null,615,615,615,615,615,615,615,null,null,615,null,null,null,null,null,615,615,615,615,615,615,615,615,615,615,615,615,615,615,null,615,615,null,615,615,615,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,615,null,null,615,null,null,615,null,null,null,null,615,null,null,null,615,null,null,null,null,null,null,null,615,null,null,null,null,615,615,615,615,615,615,null,null,null,615,615,605,605,605,null,605,null,615,null,605,605,615,615,null,605,null,605,605,605,605,605,605,605,null,null,null,null,605,605,605,605,605,605,605,null,null,null,null,null,null,null,null,null,605,null,null,605,605,605,605,605,605,605,605,605,605,null,605,605,null,605,605,605,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,605,null,null,605,null,null,605,null,null,null,null,null,null,null,null,605,null,null,null,null,null,null,null,605,null,null,null,null,605,605,605,605,605,605,null,null,null,605,605,601,601,601,null,601,null,605,null,601,601,605,605,null,601,null,601,601,601,601,601,601,601,null,null,null,null,601,601,601,601,601,601,601,null,null,null,null,null,null,null,null,null,601,null,null,601,601,601,601,601,601,601,601,601,601,null,601,601,null,601,601,601,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,601,null,null,601,null,null,601,null,null,null,null,null,null,null,null,601,null,null,null,null,null,null,null,601,null,null,null,null,601,601,601,601,601,601,null,null,null,601,601,205,205,205,205,205,null,601,null,205,205,601,601,null,205,null,205,205,205,205,205,205,205,null,null,null,null,205,205,205,205,205,205,205,null,null,205,null,null,null,null,null,205,205,205,205,205,205,205,205,205,205,205,205,205,205,null,205,205,null,205,205,205,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,205,null,null,205,null,null,205,null,null,null,null,205,null,null,null,205,null,null,null,null,null,null,null,205,null,null,null,null,205,205,205,205,205,205,null,null,null,205,205,208,208,208,null,208,null,205,null,208,208,205,205,null,208,null,208,208,208,208,208,208,208,null,null,null,null,208,208,208,208,208,208,208,null,null,null,null,null,null,null,null,null,208,null,null,208,208,208,208,208,208,208,208,208,208,null,208,208,null,208,208,208,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,208,null,null,208,null,null,208,null,null,null,null,null,null,null,null,208,null,null,null,null,null,null,null,208,null,null,null,null,208,208,208,208,208,208,null,null,null,208,208,209,209,209,null,209,null,208,null,209,209,208,208,null,209,null,209,209,209,209,209,209,209,null,null,null,null,209,209,209,209,209,209,209,null,null,null,null,null,null,null,null,null,209,null,null,209,209,209,209,209,209,209,209,209,209,null,209,209,null,209,209,209,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,209,null,null,209,null,null,209,null,null,null,null,null,null,null,null,209,null,null,null,null,null,null,null,209,null,null,null,null,209,209,209,209,209,209,null,null,null,209,209,210,210,210,null,210,null,209,null,210,210,209,209,null,210,null,210,210,210,210,210,210,210,null,null,null,null,210,210,210,210,210,210,210,null,null,null,null,null,null,null,null,null,210,null,null,210,210,210,210,210,210,210,210,210,210,null,210,210,null,210,210,210,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,210,null,null,210,null,null,210,null,null,null,null,null,null,null,null,210,null,null,null,null,null,null,null,210,null,null,null,null,210,210,210,210,210,210,null,null,null,210,210,211,211,211,null,211,null,210,null,211,211,210,210,null,211,null,211,211,211,211,211,211,211,null,null,null,null,211,211,211,211,211,211,211,null,null,null,null,null,null,null,null,null,211,null,null,211,211,211,211,211,211,211,211,211,211,null,211,211,null,211,211,211,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,211,null,null,211,null,null,211,null,null,null,null,null,null,null,null,211,null,null,null,null,null,null,null,211,null,null,null,null,211,211,211,211,211,211,null,null,null,211,211,212,212,212,null,212,null,211,null,212,212,211,211,null,212,null,212,212,212,212,212,212,212,null,null,null,null,212,212,212,212,212,212,212,null,null,null,null,null,null,null,null,null,212,null,null,212,212,212,212,212,212,212,212,212,212,null,212,212,null,212,212,212,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,212,null,null,212,null,null,212,null,null,null,null,null,null,null,null,212,null,null,null,null,null,null,null,212,null,null,null,null,212,212,212,212,212,212,null,null,null,212,212,213,213,213,null,213,null,212,null,213,213,212,212,null,213,null,213,213,213,213,213,213,213,null,null,null,null,213,213,213,213,213,213,213,null,null,null,null,null,null,null,null,null,213,null,null,213,213,213,213,213,213,213,213,213,213,null,213,213,null,213,213,213,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,213,null,null,213,null,null,213,null,null,null,null,null,null,null,null,213,null,null,null,null,null,null,null,213,null,null,null,null,213,213,213,213,213,213,null,null,null,213,213,214,214,214,null,214,null,213,null,214,214,213,213,null,214,null,214,214,214,214,214,214,214,null,null,null,null,214,214,214,214,214,214,214,null,null,null,null,null,null,null,null,null,214,null,null,214,214,214,214,214,214,214,214,214,214,null,214,214,null,214,214,214,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,214,null,null,214,null,null,214,null,null,null,null,null,null,null,null,214,null,null,null,null,null,null,null,214,null,null,null,null,214,214,214,214,214,214,null,null,null,214,214,215,215,215,null,215,null,214,null,215,215,214,214,null,215,null,215,215,215,215,215,215,215,null,null,null,null,215,215,215,215,215,215,215,null,null,null,null,null,null,null,null,null,215,null,null,215,215,215,215,215,215,215,215,215,215,null,215,215,null,215,215,215,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,215,null,null,215,null,null,215,null,null,null,null,null,null,null,null,215,null,null,null,null,null,null,null,215,null,null,null,null,215,215,215,215,215,215,null,null,null,215,215,216,216,216,null,216,null,215,null,216,216,215,215,null,216,null,216,216,216,216,216,216,216,null,null,null,null,216,216,216,216,216,216,216,null,null,null,null,null,null,null,null,null,216,null,null,216,216,216,216,216,216,216,216,216,216,null,216,216,null,216,216,216,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,216,null,null,216,null,null,216,null,null,null,null,null,null,null,null,216,null,null,null,null,null,null,null,216,null,null,null,null,216,216,216,216,216,216,null,null,null,216,216,217,217,217,null,217,null,216,null,217,217,216,216,null,217,null,217,217,217,217,217,217,217,null,null,null,null,217,217,217,217,217,217,217,null,null,null,null,null,null,null,null,null,217,null,null,217,217,217,217,217,217,217,217,217,217,null,217,217,null,217,217,217,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,217,null,null,217,null,null,217,null,null,null,null,null,null,null,null,217,null,null,null,null,null,null,null,217,null,null,null,null,217,217,217,217,217,217,null,null,null,217,217,218,218,218,null,218,null,217,null,218,218,217,217,null,218,null,218,218,218,218,218,218,218,null,null,null,null,218,218,218,218,218,218,218,null,null,null,null,null,null,null,null,null,218,null,null,218,218,218,218,218,218,218,218,218,218,null,218,218,null,218,218,218,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,218,null,null,218,null,null,218,null,null,null,null,null,null,null,null,218,null,null,null,null,null,null,null,218,null,null,null,null,218,218,218,218,218,218,null,null,null,218,218,219,219,219,null,219,null,218,null,219,219,218,218,null,219,null,219,219,219,219,219,219,219,null,null,null,null,219,219,219,219,219,219,219,null,null,null,null,null,null,null,null,null,219,null,null,219,219,219,219,219,219,219,219,219,219,null,219,219,null,219,219,219,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,219,null,null,219,null,null,219,null,null,null,null,null,null,null,null,219,null,null,null,null,null,null,null,219,null,null,null,null,219,219,219,219,219,219,null,null,null,219,219,220,220,220,null,220,null,219,null,220,220,219,219,null,220,null,220,220,220,220,220,220,220,null,null,null,null,220,220,220,220,220,220,220,null,null,null,null,null,null,null,null,null,220,null,null,220,220,220,220,220,220,220,220,220,220,null,220,220,null,220,220,220,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,220,null,null,220,null,null,220,null,null,null,null,null,null,null,null,220,null,null,null,null,null,null,null,220,null,null,null,null,220,220,220,220,220,220,null,null,null,220,220,221,221,221,null,221,null,220,null,221,221,220,220,null,221,null,221,221,221,221,221,221,221,null,null,null,null,221,221,221,221,221,221,221,null,null,null,null,null,null,null,null,null,221,null,null,221,221,221,221,221,221,221,221,221,221,null,221,221,null,221,221,221,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,221,null,null,221,null,null,221,null,null,null,null,null,null,null,null,221,null,null,null,null,null,null,null,221,null,null,null,null,221,221,221,221,221,221,null,null,null,221,221,222,222,222,null,222,null,221,null,222,222,221,221,null,222,null,222,222,222,222,222,222,222,null,null,null,null,222,222,222,222,222,222,222,null,null,null,null,null,null,null,null,null,222,null,null,222,222,222,222,222,222,222,222,222,222,null,222,222,null,222,222,222,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,222,null,null,222,null,null,222,null,null,null,null,null,null,null,null,222,null,null,null,null,null,null,null,222,null,null,null,null,222,222,222,222,222,222,null,null,null,222,222,223,223,223,null,223,null,222,null,223,223,222,222,null,223,null,223,223,223,223,223,223,223,null,null,null,null,223,223,223,223,223,223,223,null,null,null,null,null,null,null,null,null,223,null,null,223,223,223,223,223,223,223,223,223,223,null,223,223,null,223,223,223,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,223,null,null,223,null,null,223,null,null,null,null,null,null,null,null,223,null,null,null,null,null,null,null,223,null,null,null,null,223,223,223,223,223,223,null,null,null,223,223,224,224,224,null,224,null,223,null,224,224,223,223,null,224,null,224,224,224,224,224,224,224,null,null,null,null,224,224,224,224,224,224,224,null,null,null,null,null,null,null,null,null,224,null,null,224,224,224,224,224,224,224,224,224,224,null,224,224,null,224,224,224,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,224,null,null,224,null,null,224,null,null,null,null,null,null,null,null,224,null,null,null,null,null,null,null,224,null,null,null,null,224,224,224,224,224,224,null,null,null,224,224,225,225,225,null,225,null,224,null,225,225,224,224,null,225,null,225,225,225,225,225,225,225,null,null,null,null,225,225,225,225,225,225,225,null,null,null,null,null,null,null,null,null,225,null,null,225,225,225,225,225,225,225,225,225,225,null,225,225,null,225,225,225,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,225,null,null,225,null,null,225,null,null,null,null,null,null,null,null,225,null,null,null,null,null,null,null,225,null,null,null,null,225,225,225,225,225,225,null,null,null,225,225,226,226,226,null,226,null,225,null,226,226,225,225,null,226,null,226,226,226,226,226,226,226,null,null,null,null,226,226,226,226,226,226,226,null,null,null,null,null,null,null,null,null,226,null,null,226,226,226,226,226,226,226,226,226,226,null,226,226,null,226,226,226,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,226,null,null,226,null,null,226,null,null,null,null,null,null,null,null,226,null,null,null,null,null,null,null,226,null,null,null,null,226,226,226,226,226,226,null,null,null,226,226,227,227,227,null,227,null,226,null,227,227,226,226,null,227,null,227,227,227,227,227,227,227,null,null,null,null,227,227,227,227,227,227,227,null,null,null,null,null,null,null,null,null,227,null,null,227,227,227,227,227,227,227,227,227,227,null,227,227,null,227,227,227,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,227,null,null,227,null,null,227,null,null,null,null,null,null,null,null,227,null,null,null,null,null,null,null,227,null,null,null,null,227,227,227,227,227,227,null,null,null,227,227,228,228,228,null,228,null,227,null,228,228,227,227,null,228,null,228,228,228,228,228,228,228,null,null,null,null,228,228,228,228,228,228,228,null,null,null,null,null,null,null,null,null,228,null,null,228,228,228,228,228,228,228,228,228,228,null,228,228,null,228,228,228,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,228,null,null,228,null,null,228,null,null,null,null,null,null,null,null,228,null,null,null,null,null,null,null,228,null,null,null,null,228,228,228,228,228,228,null,null,null,228,228,229,229,229,null,229,null,228,null,229,229,228,228,null,229,null,229,229,229,229,229,229,229,null,null,null,null,229,229,229,229,229,229,229,null,null,null,null,null,null,null,null,null,229,null,null,229,229,229,229,229,229,229,229,229,229,null,229,229,null,229,229,229,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,229,null,null,229,null,null,229,null,null,null,null,null,null,null,null,229,null,null,null,null,null,null,null,229,null,null,null,null,229,229,229,229,229,229,null,null,null,229,229,230,230,230,null,230,null,229,null,230,230,229,229,null,230,null,230,230,230,230,230,230,230,null,null,null,null,230,230,230,230,230,230,230,null,null,null,null,null,null,null,null,null,230,null,null,230,230,230,230,230,230,230,230,230,230,null,230,230,null,230,230,230,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,230,null,null,230,null,null,230,null,null,null,null,null,null,null,null,230,null,null,null,null,null,null,null,230,null,null,null,null,230,230,230,230,230,230,null,null,null,230,230,231,231,231,null,231,null,230,null,231,231,230,230,null,231,null,231,231,231,231,231,231,231,null,null,null,null,231,231,231,231,231,231,231,null,null,null,null,null,null,null,null,null,231,null,null,231,231,231,231,231,231,231,231,231,231,null,231,231,null,231,231,231,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,231,null,null,231,null,null,231,null,null,null,null,null,null,null,null,231,null,null,null,null,null,null,null,231,null,null,null,null,231,231,231,231,231,231,null,null,null,231,231,232,232,232,null,232,null,231,null,232,232,231,231,null,232,null,232,232,232,232,232,232,232,null,null,null,null,232,232,232,232,232,232,232,null,null,null,null,null,null,null,null,null,232,null,null,232,232,232,232,232,232,232,232,232,232,null,232,232,null,232,232,232,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,232,null,null,232,null,null,232,null,null,null,null,null,null,null,null,232,null,null,null,null,null,null,null,232,null,null,null,null,232,232,232,232,232,232,null,null,null,232,232,233,233,233,null,233,null,232,null,233,233,232,232,null,233,null,233,233,233,233,233,233,233,null,null,null,null,233,233,233,233,233,233,233,null,null,null,null,null,null,null,null,null,233,null,null,233,233,233,233,233,233,233,233,233,233,null,233,233,null,233,233,233,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,233,null,null,233,null,null,233,null,null,null,null,null,null,null,null,233,null,null,null,null,null,null,null,233,null,null,null,null,233,233,233,233,233,233,null,null,null,233,233,234,234,234,null,234,null,233,null,234,234,233,233,null,234,null,234,234,234,234,234,234,234,null,null,null,null,234,234,234,234,234,234,234,null,null,null,null,null,null,null,null,null,234,null,null,234,234,234,234,234,234,234,234,234,234,null,234,234,null,234,234,234,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,234,null,null,234,null,null,234,null,null,null,null,null,null,null,null,234,null,null,null,null,null,null,null,234,null,null,null,null,234,234,234,234,234,234,null,null,null,234,234,600,600,600,600,600,null,234,null,600,600,234,234,null,600,null,600,600,600,600,600,600,600,null,null,null,null,600,600,600,600,600,600,600,null,null,600,null,null,null,null,null,600,600,600,600,600,600,600,600,600,600,600,600,600,600,null,600,600,null,600,600,600,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,600,null,null,600,null,null,600,null,null,null,null,600,null,null,null,600,null,null,null,null,null,null,null,600,null,null,null,null,600,600,600,600,600,600,null,null,null,600,600,599,599,599,null,599,null,600,null,599,599,600,600,null,599,null,599,599,599,599,599,599,599,null,null,null,null,599,599,599,599,599,599,599,null,null,null,null,null,null,null,null,null,599,null,null,599,599,599,599,599,599,599,599,599,599,null,599,599,null,599,599,599,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,599,null,null,599,null,null,599,null,null,null,null,null,null,null,null,599,null,null,null,null,null,null,null,599,null,null,null,596,599,599,599,599,599,599,596,596,596,599,599,596,596,596,null,596,null,599,null,null,null,599,599,null,null,596,596,null,null,null,null,null,null,null,596,596,null,596,596,596,596,596,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,596,596,596,596,596,596,596,596,596,596,596,596,596,596,null,null,596,596,596,null,596,596,null,null,596,null,null,596,null,596,null,596,null,596,null,596,596,596,596,596,596,596,null,596,null,596,null,null,null,null,null,null,null,null,null,null,null,null,596,596,596,596,null,596,null,596,null,596,242,242,242,null,242,null,null,null,242,242,null,null,null,242,null,242,242,242,242,242,242,242,null,null,null,null,242,242,242,242,242,242,242,null,null,null,null,null,null,null,null,null,242,null,null,242,242,242,242,242,242,242,242,242,242,null,242,242,null,242,242,242,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,242,null,null,242,null,null,242,null,null,null,null,null,null,null,null,242,null,null,null,null,null,null,null,242,null,null,null,null,242,242,242,242,242,242,null,null,null,242,242,244,244,244,null,244,null,242,null,244,244,242,242,null,244,null,244,244,244,244,244,244,244,null,null,null,null,244,244,244,244,244,244,244,null,null,null,null,null,null,null,null,null,244,null,null,244,244,244,244,244,244,244,244,244,244,null,244,244,null,244,244,244,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,244,null,null,244,null,null,244,null,null,null,null,null,null,null,null,244,null,null,null,null,null,null,null,244,null,null,null,null,244,244,244,244,244,244,null,null,null,244,244,595,595,595,null,595,null,244,null,595,595,244,244,null,595,null,595,595,595,595,595,595,595,null,null,null,null,595,595,595,595,595,595,595,null,null,null,null,null,null,null,null,null,595,null,null,595,595,595,595,595,595,595,595,595,595,null,595,595,null,595,595,595,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,595,595,null,595,595,null,595,null,null,null,null,595,null,595,null,595,null,null,null,null,null,null,null,595,null,null,null,null,595,595,595,595,595,595,null,null,null,595,595,592,592,592,null,592,null,595,595,592,592,595,595,null,592,null,592,592,592,592,592,592,592,null,null,null,null,592,592,592,592,592,592,592,null,null,null,null,null,null,null,null,null,592,null,null,592,592,592,592,592,592,592,592,592,592,null,592,592,null,592,592,592,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,592,null,null,592,null,null,592,null,null,null,null,null,null,null,null,592,null,null,null,null,null,null,null,592,null,null,null,null,592,592,592,592,592,592,null,null,null,592,592,589,589,589,null,589,null,592,null,589,589,592,592,null,589,null,589,589,589,589,589,589,589,null,null,null,null,589,589,589,589,589,589,589,null,null,null,null,null,null,null,null,null,589,null,null,589,589,589,589,589,589,589,589,589,589,null,589,589,null,589,589,589,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,589,null,null,589,null,null,589,null,null,null,null,null,null,null,null,589,null,null,null,null,null,null,null,589,null,null,null,null,589,589,589,589,589,589,null,null,null,589,589,584,584,584,null,584,null,589,null,584,584,589,589,null,584,null,584,584,584,584,584,584,584,null,null,null,null,584,584,584,584,584,584,584,null,null,null,null,null,null,null,null,null,584,null,null,584,584,584,584,584,584,584,584,584,584,null,584,584,null,584,584,584,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,584,null,null,584,null,null,584,null,null,null,null,null,null,null,null,584,null,null,null,null,null,null,null,584,null,null,null,null,584,584,584,584,584,584,null,null,null,584,584,255,255,255,null,255,null,584,null,255,255,584,584,null,255,null,255,255,255,255,255,255,255,null,null,null,null,255,255,255,255,255,255,255,null,null,null,null,null,null,null,null,null,255,null,null,255,255,255,255,255,255,255,255,255,255,null,255,255,null,255,255,255,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,255,null,null,255,null,null,255,null,null,null,null,255,null,255,null,255,null,null,null,null,null,null,null,255,null,null,null,null,255,255,255,255,255,255,null,null,null,255,255,256,256,256,null,256,null,255,null,256,256,255,255,null,256,null,256,256,256,256,256,256,256,null,null,null,null,256,256,256,256,256,256,256,null,null,null,null,null,null,null,null,null,256,null,null,256,256,256,256,256,256,256,256,256,256,null,256,256,null,256,256,256,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,256,null,null,256,null,null,256,null,null,null,null,256,null,256,null,256,null,null,null,null,null,null,null,256,null,null,null,null,256,256,256,256,256,256,null,null,null,256,256,583,583,583,null,583,null,256,null,583,583,256,256,null,583,null,583,583,583,583,583,583,583,null,null,null,null,583,583,583,583,583,583,583,null,null,null,null,null,null,null,null,null,583,null,null,583,583,583,583,583,583,583,583,583,583,null,583,583,null,583,583,583,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,583,null,null,583,null,null,583,null,null,null,null,null,null,null,null,583,null,null,null,null,null,null,null,583,null,null,null,null,583,583,583,583,583,583,null,null,null,583,583,580,580,580,null,580,null,583,null,580,580,583,583,null,580,null,580,580,580,580,580,580,580,null,null,null,null,580,580,580,580,580,580,580,null,null,null,null,null,null,null,null,null,580,null,null,580,580,580,580,580,580,580,580,580,580,null,580,580,null,580,580,580,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,580,null,null,580,null,null,580,null,null,null,null,580,null,null,null,580,null,null,null,null,null,null,null,580,null,null,null,null,580,580,580,580,580,580,null,null,null,580,580,264,264,264,null,264,null,580,null,264,264,580,580,null,264,null,264,264,264,264,264,264,264,null,null,null,null,264,264,264,264,264,264,264,null,null,null,null,null,null,null,null,null,264,null,null,264,264,264,264,264,264,264,264,264,264,null,264,264,null,264,264,264,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,264,null,null,264,null,264,264,null,null,null,null,264,null,264,null,264,null,null,null,null,null,null,null,264,null,null,null,null,264,264,264,264,264,264,null,null,null,264,264,579,579,579,null,579,null,264,null,579,579,264,264,null,579,null,579,579,579,579,579,579,579,null,null,null,null,579,579,579,579,579,579,579,null,null,null,null,null,null,null,null,null,579,null,null,579,579,579,579,579,579,579,579,579,579,null,579,579,null,579,579,579,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,579,null,null,579,null,null,579,null,null,null,null,null,null,null,null,579,null,null,null,null,null,null,null,579,null,null,null,null,579,579,579,579,579,579,null,null,null,579,579,266,266,266,266,266,null,579,null,266,266,579,579,null,266,null,266,266,266,266,266,266,266,null,null,null,null,266,266,266,266,266,266,266,null,null,266,null,null,null,null,null,266,266,266,266,266,266,266,266,266,266,266,266,266,266,null,266,266,null,266,266,266,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,266,null,null,266,null,null,266,null,null,null,null,266,null,null,null,266,null,null,null,null,null,null,null,266,null,null,null,null,266,266,266,266,266,266,null,null,null,266,266,547,547,547,547,547,null,266,null,547,547,266,266,null,547,null,547,547,547,547,547,547,547,null,null,null,null,547,547,547,547,547,547,547,null,null,547,null,null,null,null,null,547,547,547,547,547,547,547,547,547,547,547,547,547,547,null,547,547,null,547,547,547,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,547,null,null,547,null,null,547,null,null,null,null,547,null,null,null,547,null,null,null,null,null,null,null,547,null,null,null,null,547,547,547,547,547,547,null,null,null,547,547,543,543,543,null,543,null,547,null,543,543,547,547,null,543,null,543,543,543,543,543,543,543,null,null,null,null,543,543,543,543,543,543,543,null,null,543,null,null,null,null,null,null,543,null,null,543,543,543,543,543,543,543,543,543,543,null,543,543,null,543,543,543,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,543,null,null,543,null,null,543,null,null,null,null,null,null,null,null,543,null,null,null,null,null,null,null,543,null,null,null,null,543,543,543,543,543,543,null,null,null,543,543,541,541,541,541,541,null,543,null,541,541,543,543,null,541,null,541,541,541,541,541,541,541,null,null,null,null,541,541,541,541,541,541,541,null,null,541,null,null,null,null,null,541,541,541,541,541,541,541,541,541,541,541,541,541,541,null,541,541,null,541,541,541,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,541,null,null,541,null,null,541,null,null,null,null,541,null,null,null,541,null,null,null,null,null,null,null,541,null,null,null,null,541,541,541,541,541,541,null,null,null,541,541,270,270,270,null,270,null,541,null,270,270,541,541,null,270,null,270,270,270,270,270,270,270,null,null,null,null,270,270,270,270,270,270,270,null,null,null,null,null,null,null,null,null,270,null,null,270,270,270,270,270,270,270,270,270,270,null,270,270,null,null,null,270,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,270,null,null,270,null,null,270,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,270,270,270,270,270,270,null,null,null,270,270,271,271,271,271,271,null,270,null,271,271,270,270,null,271,null,271,271,271,271,271,271,271,null,null,null,null,271,271,271,271,271,271,271,null,null,271,null,null,null,null,null,271,271,271,271,271,271,271,271,271,271,271,271,271,271,null,271,271,null,271,271,271,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,271,null,null,271,null,null,271,null,null,null,null,271,null,null,null,271,null,null,null,null,null,null,null,271,null,null,null,null,271,271,271,271,271,271,null,null,null,271,271,539,539,539,null,539,null,271,null,539,539,271,271,null,539,null,539,539,539,539,539,539,539,null,null,null,null,539,539,539,539,539,539,539,null,null,null,null,null,null,null,null,null,539,null,null,539,539,539,539,539,539,539,539,539,539,null,539,539,null,539,539,539,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,539,null,null,539,null,null,539,null,null,null,null,539,null,null,null,539,null,null,null,null,null,null,null,539,null,null,null,null,539,539,539,539,539,539,null,null,null,539,539,533,533,533,null,533,null,539,null,533,533,539,539,null,533,null,533,533,533,533,533,533,533,null,null,null,null,533,533,533,533,533,533,533,null,null,null,null,null,null,null,null,null,533,null,null,533,533,533,533,533,533,533,533,533,533,null,533,533,null,null,null,533,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,533,null,null,533,null,null,533,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,533,533,533,533,533,533,null,null,null,533,533,525,525,525,null,525,null,533,null,525,525,533,533,null,525,null,525,525,525,525,525,525,525,null,null,null,null,525,525,525,525,525,525,525,null,null,null,null,null,null,null,null,null,525,null,null,525,525,525,525,525,525,525,525,525,525,null,525,525,null,525,525,525,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,525,null,null,525,null,null,525,null,null,null,null,525,null,null,null,525,null,null,null,null,null,null,null,525,null,null,null,null,525,525,525,525,525,525,null,null,null,525,525,524,524,524,524,524,null,525,null,524,524,525,525,null,524,null,524,524,524,524,524,524,524,null,null,null,null,524,524,524,524,524,524,524,null,null,524,null,null,null,null,null,524,524,524,524,524,524,524,524,524,524,524,524,524,524,null,524,524,null,524,524,524,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,524,null,null,524,null,null,524,null,null,null,null,524,null,null,null,524,null,null,null,null,null,null,null,524,null,null,null,null,524,524,524,524,524,524,null,null,null,524,524,519,519,519,519,519,null,524,null,519,519,524,524,null,519,null,519,519,519,519,519,519,519,null,null,null,null,519,519,519,519,519,519,519,null,null,519,null,null,null,null,null,519,519,519,519,519,519,519,519,519,519,519,519,519,519,null,519,519,null,519,519,519,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,519,null,null,519,null,null,519,null,null,null,null,519,null,null,null,519,null,null,null,null,null,null,null,519,null,null,null,null,519,519,519,519,519,519,null,null,null,519,519,515,515,515,515,515,null,519,null,515,515,519,519,null,515,null,515,515,515,515,515,515,515,null,null,null,null,515,515,515,515,515,515,515,null,null,515,null,null,null,null,null,515,515,515,515,515,515,515,515,515,515,515,515,515,515,null,515,515,null,515,515,515,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,515,null,null,515,null,null,515,null,null,null,null,515,null,null,null,515,null,null,null,null,null,null,null,515,null,null,null,null,515,515,515,515,515,515,null,null,null,515,515,511,511,511,null,511,null,515,null,511,511,515,515,null,511,null,511,511,511,511,511,511,511,null,null,null,null,511,511,511,511,511,511,511,null,null,null,null,null,null,null,null,null,511,null,null,511,511,511,511,511,511,511,511,511,511,null,511,511,null,511,511,511,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,511,null,null,511,null,null,511,null,null,null,null,null,null,null,null,511,null,null,null,null,null,null,null,511,null,null,null,null,511,511,511,511,511,511,null,null,null,511,511,508,508,508,null,508,null,511,null,508,508,511,511,null,508,null,508,508,508,508,508,508,508,null,null,null,null,508,508,508,508,508,508,508,null,null,null,null,null,null,null,null,null,508,null,null,508,508,508,508,508,508,508,508,508,508,null,508,508,null,508,508,508,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,508,null,null,508,null,null,508,null,null,null,null,null,null,null,null,508,null,null,null,null,null,null,null,508,null,null,null,null,508,508,508,508,508,508,null,null,null,508,508,505,505,505,null,505,null,508,null,505,505,508,508,null,505,null,505,505,505,505,505,505,505,null,null,null,null,505,505,505,505,505,505,505,null,null,null,null,null,null,null,null,null,505,null,null,505,505,505,505,505,505,505,505,505,505,null,505,505,null,505,505,505,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,505,null,null,505,null,null,505,null,null,null,null,505,null,null,null,505,null,null,null,null,null,null,null,505,null,null,null,null,505,505,505,505,505,505,null,null,null,505,505,500,500,500,null,500,null,505,null,500,500,505,505,null,500,null,500,500,500,500,500,500,500,null,null,null,null,500,500,500,500,500,500,500,null,null,null,null,null,null,null,null,null,500,null,null,500,500,500,500,500,500,500,500,500,500,null,500,500,null,500,500,500,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,500,null,null,500,null,null,500,null,null,null,null,500,null,null,null,500,null,null,null,null,null,null,null,500,null,null,null,null,500,500,500,500,500,500,null,null,null,500,500,498,498,498,null,498,null,500,null,498,498,500,500,null,498,null,498,498,498,498,498,498,498,null,null,null,null,498,498,498,498,498,498,498,null,null,498,null,null,null,null,null,null,498,null,null,498,498,498,498,498,498,498,498,498,498,null,498,498,null,498,498,498,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,498,null,null,498,null,null,498,null,null,null,null,null,null,null,null,498,null,null,null,null,null,null,null,498,null,null,null,null,498,498,498,498,498,498,null,null,null,498,498,494,494,494,null,494,null,498,null,494,494,498,498,null,494,null,494,494,494,494,494,494,494,null,null,null,null,494,494,494,494,494,494,494,null,null,null,null,null,null,null,null,null,494,null,null,494,494,494,494,494,494,494,494,494,494,null,494,494,null,494,494,494,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,494,null,null,494,null,null,494,null,null,null,null,null,null,null,null,494,null,null,null,null,null,null,null,494,null,null,null,null,494,494,494,494,494,494,null,null,null,494,494,493,493,493,null,493,null,494,null,493,493,494,494,null,493,null,493,493,493,493,493,493,493,null,null,null,null,493,493,493,493,493,493,493,null,null,null,null,null,null,null,null,null,493,null,null,493,493,493,493,493,493,493,493,493,493,null,493,493,null,493,493,493,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,493,null,null,493,null,null,493,null,null,null,null,null,null,null,null,493,null,null,null,null,null,null,null,493,null,null,null,null,493,493,493,493,493,493,null,null,null,493,493,492,492,492,null,492,null,493,null,492,492,493,493,null,492,null,492,492,492,492,492,492,492,null,null,null,null,492,492,492,492,492,492,492,null,null,null,null,null,null,null,null,null,492,null,null,492,492,492,492,492,492,492,492,492,492,null,492,492,null,492,492,492,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,492,null,null,492,null,null,492,null,null,null,null,null,null,null,null,492,null,null,null,null,null,null,null,492,null,null,null,null,492,492,492,492,492,492,null,null,null,492,492,291,291,291,null,291,null,492,null,291,291,492,492,null,291,null,291,291,291,291,291,291,291,null,null,null,null,291,291,291,291,291,291,291,null,null,null,null,null,null,null,null,null,291,null,null,291,291,291,291,291,291,291,291,291,291,null,291,291,null,291,291,291,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,291,null,null,291,291,null,291,null,null,null,null,null,null,null,null,291,null,null,null,null,null,null,null,291,null,null,null,null,291,291,291,291,291,291,null,null,null,291,291,485,485,485,null,485,null,291,null,485,485,291,291,null,485,null,485,485,485,485,485,485,485,null,null,null,null,485,485,485,485,485,485,485,null,null,null,null,null,null,null,null,null,485,null,null,485,485,485,485,485,485,485,485,485,485,null,485,485,null,485,485,485,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,485,null,null,485,null,null,485,null,null,null,null,485,null,null,null,485,null,null,null,null,null,null,null,485,null,null,null,null,485,485,485,485,485,485,null,null,null,485,485,476,476,476,476,476,null,485,null,476,476,485,485,null,476,null,476,476,476,476,476,476,476,null,null,null,null,476,476,476,476,476,476,476,null,null,476,null,null,null,null,null,476,476,476,476,476,476,476,476,476,476,476,476,476,476,null,476,476,null,476,476,476,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,476,null,null,476,null,null,476,null,null,null,null,476,null,null,null,476,null,null,null,null,null,null,null,476,null,null,null,null,476,476,476,476,476,476,null,null,null,476,476,475,475,475,475,475,null,476,null,475,475,476,476,null,475,null,475,475,475,475,475,475,475,null,null,null,null,475,475,475,475,475,475,475,null,null,475,null,null,null,null,null,475,475,475,475,475,475,475,475,475,475,475,475,475,475,null,475,475,null,475,475,475,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,475,null,null,475,null,null,475,null,null,null,null,475,null,null,null,475,null,null,null,null,null,null,null,475,null,null,null,null,475,475,475,475,475,475,null,null,null,475,475,471,471,471,null,471,null,475,null,471,471,475,475,null,471,null,471,471,471,471,471,471,471,null,null,null,null,471,471,471,471,471,471,471,null,null,471,null,null,null,null,null,null,471,null,null,471,471,471,471,471,471,471,471,471,471,null,471,471,null,471,471,471,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,471,null,null,471,null,471,471,null,null,null,null,471,null,471,null,471,null,null,null,null,null,null,null,471,null,null,null,null,471,471,471,471,471,471,null,null,null,471,471,457,457,457,null,457,null,471,null,457,457,471,471,null,457,null,457,457,457,457,457,457,457,null,null,null,null,457,457,457,457,457,457,457,null,null,null,null,null,null,null,null,null,457,null,null,457,457,457,457,457,457,457,457,457,457,null,457,457,null,457,457,457,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,457,null,null,457,null,null,457,null,null,null,null,null,null,null,null,457,null,null,null,null,null,null,null,457,null,null,null,null,457,457,457,457,457,457,null,null,null,457,457,454,454,454,null,454,null,457,null,454,454,457,457,null,454,null,454,454,454,454,454,454,454,null,null,null,null,454,454,454,454,454,454,454,null,null,null,null,null,null,null,null,null,454,null,null,454,454,454,454,454,454,454,454,454,454,null,454,454,null,454,454,454,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,454,null,null,454,null,null,454,null,null,null,null,454,null,454,null,454,null,null,null,null,null,null,null,454,null,null,null,null,454,454,454,454,454,454,null,null,null,454,454,300,300,300,null,300,null,454,null,300,300,454,454,null,300,null,300,300,300,300,300,300,300,null,null,null,null,300,300,300,300,300,300,300,null,null,null,null,null,null,null,null,null,300,null,null,300,300,300,300,300,300,300,300,300,300,null,300,300,null,300,300,300,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,300,null,null,300,null,null,300,null,null,null,null,null,null,null,null,300,null,null,null,null,null,null,null,300,null,null,null,null,300,300,300,300,300,300,null,null,null,300,300,451,451,451,null,451,null,300,null,451,451,300,300,null,451,null,451,451,451,451,451,451,451,null,null,null,null,451,451,451,451,451,451,451,null,null,null,null,null,null,null,null,null,451,null,null,451,451,451,451,451,451,451,451,451,451,null,451,451,null,451,451,451,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,451,null,null,451,null,null,451,null,null,null,null,451,null,451,null,451,null,null,null,null,null,null,null,451,null,null,null,null,451,451,451,451,451,451,null,null,null,451,451,422,422,422,null,422,null,451,null,422,422,451,451,null,422,null,422,422,422,422,422,422,422,null,null,null,null,422,422,422,422,422,422,422,null,null,null,null,null,null,null,null,null,422,null,null,422,422,422,422,422,422,422,422,422,422,null,422,422,null,422,422,422,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,422,null,null,422,null,null,422,null,null,null,null,null,null,null,null,422,null,null,null,null,null,null,null,422,null,null,null,null,422,422,422,422,422,422,null,null,null,422,422,421,421,421,null,421,null,422,null,421,421,422,422,null,421,null,421,421,421,421,421,421,421,null,null,null,null,421,421,421,421,421,421,421,null,null,null,null,null,null,null,null,null,421,null,null,421,421,421,421,421,421,421,421,421,421,null,421,421,null,421,421,421,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,421,null,null,421,null,null,421,null,null,null,null,null,null,null,null,421,null,null,null,null,null,null,null,421,null,null,null,null,421,421,421,421,421,421,null,null,null,421,421,420,420,420,null,420,null,421,null,420,420,421,421,null,420,null,420,420,420,420,420,420,420,null,null,null,null,420,420,420,420,420,420,420,null,null,null,null,null,null,null,null,null,420,null,null,420,420,420,420,420,420,420,420,420,420,null,420,420,null,420,420,420,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,420,null,null,420,null,null,420,null,null,null,null,null,null,null,null,420,null,null,null,null,null,null,null,420,null,null,null,null,420,420,420,420,420,420,null,null,null,420,420,418,418,418,null,418,null,420,null,418,418,420,420,null,418,null,418,418,418,418,418,418,418,null,null,null,null,418,418,418,418,418,418,418,null,null,null,null,null,null,null,null,null,418,null,null,418,418,418,418,418,418,418,418,418,418,null,418,418,null,418,418,418,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,418,null,null,418,null,null,418,null,null,null,null,418,null,null,null,418,null,null,null,null,null,null,null,418,null,null,null,null,418,418,418,418,418,418,null,null,null,418,418,411,411,411,null,411,null,418,null,411,411,418,418,null,411,null,411,411,411,411,411,411,411,null,null,null,null,411,411,411,411,411,411,411,null,null,null,null,null,null,null,null,null,411,null,null,411,411,411,411,411,411,411,411,411,411,null,411,411,null,411,411,411,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,411,null,null,411,411,null,411,null,null,null,null,411,null,411,null,411,null,null,null,null,null,null,null,411,null,null,null,null,411,411,411,411,411,411,null,null,null,411,411,410,410,410,null,410,null,411,null,410,410,411,411,null,410,null,410,410,410,410,410,410,410,null,null,null,null,410,410,410,410,410,410,410,null,null,null,null,null,null,null,null,null,410,null,null,410,410,410,410,410,410,410,410,410,410,null,410,410,null,410,410,410,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,410,null,null,410,410,null,410,null,null,null,null,410,null,410,null,410,null,null,null,null,null,null,null,410,null,null,null,null,410,410,410,410,410,410,null,null,null,410,410,310,310,310,null,310,null,410,null,310,310,410,410,null,310,null,310,310,310,310,310,310,310,null,null,null,null,310,310,310,310,310,310,310,null,null,310,null,null,null,null,null,null,310,null,null,310,310,310,310,310,310,310,310,310,310,null,310,310,null,310,310,310,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,310,null,null,310,null,null,310,null,null,null,null,null,null,null,null,310,null,null,null,null,null,null,null,310,null,null,null,null,310,310,310,310,310,310,null,null,null,310,310,311,311,311,null,311,null,310,null,311,311,310,310,null,311,null,311,311,311,311,311,311,311,null,null,null,null,311,311,311,311,311,311,311,null,null,311,null,null,null,null,null,null,311,null,null,311,311,311,311,311,311,311,311,311,311,null,311,311,null,311,311,311,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,311,null,null,311,null,null,311,null,null,null,null,null,null,null,null,311,null,null,null,null,null,null,null,311,null,null,null,408,311,311,311,311,311,311,408,408,408,311,311,null,408,408,null,408,null,311,null,null,null,311,311,null,null,null,null,null,null,null,null,null,null,null,408,408,null,408,408,408,408,408,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,408,408,408,408,408,408,408,408,408,408,408,408,408,408,null,null,408,408,408,null,408,null,null,null,408,null,null,null,null,null,null,408,null,408,null,408,408,408,408,408,408,408,null,408,null,408,null,null,null,null,null,null,null,null,null,null,null,null,408,408,null,408,406,408,null,408,null,408,null,406,406,406,null,null,null,406,406,null,406,null,null,null,null,null,null,null,null,406,null,null,null,null,null,null,null,null,null,406,406,null,406,406,406,406,406,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,406,406,406,406,406,406,406,406,406,406,406,406,406,406,null,null,406,406,406,null,406,null,null,null,406,null,null,null,null,null,null,406,null,406,null,406,406,406,406,406,406,406,null,406,406,406,null,null,null,null,null,null,null,null,null,null,null,null,406,406,null,406,null,406,null,406,null,406,403,403,403,null,403,null,null,null,403,403,null,null,null,403,null,403,403,403,403,403,403,403,null,null,null,null,403,403,403,403,403,403,403,null,null,null,null,null,null,null,null,null,403,null,null,403,403,403,403,403,403,403,403,403,403,null,403,403,null,403,403,403,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,403,null,null,403,403,null,403,null,null,null,null,403,null,403,null,403,null,null,null,null,null,null,null,403,null,null,null,null,403,403,403,403,403,403,null,null,null,403,403,394,394,394,null,394,null,403,null,394,394,403,403,null,394,null,394,394,394,394,394,394,394,null,null,null,null,394,394,394,394,394,394,394,null,null,null,null,null,null,null,null,null,394,null,null,394,394,394,394,394,394,394,394,394,394,null,394,394,null,394,394,394,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,394,null,null,394,null,null,394,null,null,null,null,null,null,null,null,394,null,null,null,null,null,null,null,394,null,null,null,null,394,394,394,394,394,394,null,null,null,394,394,355,355,355,null,355,null,394,null,355,355,394,394,null,355,null,355,355,355,355,355,355,355,null,null,null,null,355,355,355,355,355,355,355,null,null,355,null,null,null,null,null,null,355,null,null,355,355,355,355,355,355,355,355,355,355,null,355,355,null,355,355,355,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,355,null,null,355,null,null,355,null,null,null,null,null,null,null,null,355,null,null,null,null,null,null,null,355,null,null,null,null,355,355,355,355,355,355,null,null,null,355,355,342,342,342,342,342,null,355,null,342,342,355,355,null,342,null,342,342,342,342,342,342,342,null,null,null,null,342,342,342,342,342,342,342,null,null,342,null,null,null,null,null,342,342,342,342,342,342,342,342,342,342,342,342,342,342,null,342,342,null,342,342,342,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,342,null,null,342,null,null,342,null,null,null,null,342,null,null,null,342,null,null,null,null,null,null,null,342,null,null,null,null,342,342,342,342,342,342,null,null,null,342,342,764,764,764,764,764,null,342,null,764,764,342,342,null,764,null,764,764,764,764,764,764,764,null,null,null,null,764,764,764,764,764,764,764,null,null,764,null,null,null,null,null,764,764,764,764,764,764,764,764,764,764,764,764,764,764,null,764,764,null,764,764,764,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,764,null,null,764,null,null,764,null,null,null,null,764,null,null,null,764,null,null,null,null,null,null,null,764,null,null,null,461,764,764,764,764,764,764,461,461,461,764,764,461,461,461,null,461,null,764,null,null,null,764,764,null,null,461,null,null,null,null,null,null,null,null,461,461,null,461,461,461,461,461,null,null,null,null,null,null,null,null,null,null,null,458,null,null,null,null,null,null,458,458,458,null,null,458,458,458,null,458,null,null,null,null,461,null,null,null,null,458,null,461,null,null,null,null,461,461,458,458,null,458,458,458,458,458,null,null,null,null,null,null,null,null,null,null,null,null,461,null,null,null,null,null,null,null,null,null,null,null,null,461,null,461,null,null,461,null,458,null,null,null,null,null,null,458,null,null,null,null,458,458,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,458,null,null,null,null,null,null,null,null,null,null,null,null,458,null,458,null,null,458,64,64,64,64,64,64,64,64,null,null,64,64,64,64,64,null,null,64,64,64,64,64,64,64,null,null,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,null,null,null,null,null,null,64,64,null,64,64,64,64,null,64,64,null,null,64,null,null,null,null,64,64,64,64,null,null,null,null,null,64,null,null,null,null,null,null,64,64,null,64,64,64,64,64,64,64,64,64,null,64,null,null,64,null,184,184,184,184,184,184,184,184,null,null,184,184,184,184,184,null,64,184,184,184,184,184,184,184,null,null,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,null,null,null,null,null,null,184,184,null,184,184,184,184,null,184,184,null,null,184,null,null,null,null,184,184,184,184,null,null,null,null,null,null,null,null,null,null,null,null,184,184,null,184,184,184,184,184,184,184,184,184,null,184,null,null,184,null,556,556,556,556,556,556,556,556,null,null,556,556,556,556,556,null,184,556,556,556,556,556,556,556,null,null,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,null,null,556,null,null,null,null,null,null,null,556,556,null,556,556,556,556,null,556,556,null,null,556,null,null,null,null,556,556,556,556,null,null,null,null,null,null,null,null,null,null,null,null,556,556,null,556,556,556,556,556,556,556,556,556,null,556,null,null,556,null,6,6,6,6,6,6,6,6,null,null,6,6,6,6,6,null,556,6,6,6,6,6,6,6,null,null,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,null,6,null,null,null,null,null,null,null,6,6,null,6,6,6,6,null,6,6,null,null,6,null,null,null,null,6,6,6,6,null,null,null,null,null,null,null,null,null,null,null,null,6,6,null,6,6,6,6,6,6,6,6,6,null,6,null,null,6,6,107,107,107,107,107,107,107,107,null,6,107,107,107,107,107,null,6,107,107,107,107,107,107,107,null,null,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107,null,null,107,null,null,null,null,null,null,null,107,107,null,107,107,107,107,null,107,107,null,null,107,null,null,null,null,107,107,107,107,null,null,null,null,null,null,null,null,null,null,null,null,107,107,null,107,107,107,107,107,107,107,107,107,null,107,null,null,107,107,78,78,78,78,78,78,78,78,null,107,78,78,78,78,78,null,107,78,78,78,78,78,78,78,null,null,78,78,78,78,78,78,78,78,78,78,78,78,78,78,78,78,78,78,78,78,78,78,78,78,78,78,78,null,null,null,null,null,null,78,78,null,78,78,78,78,null,78,78,null,null,78,null,null,null,null,78,78,78,78,null,null,null,null,null,null,null,null,null,null,null,null,78,78,null,78,78,78,78,78,78,78,78,78,null,78,null,null,78,null,386,386,386,386,386,386,386,386,null,null,386,386,386,386,386,null,78,386,386,386,386,386,386,386,null,null,386,386,386,386,386,386,386,386,386,386,386,386,386,386,386,386,386,386,386,386,386,386,386,null,null,386,null,null,null,null,null,null,null,386,386,null,386,386,386,386,null,386,386,null,null,386,null,null,null,null,386,386,386,386,null,null,null,null,null,null,null,null,null,null,null,null,386,386,null,386,386,386,386,386,386,386,386,386,null,386,null,null,386,386,7,7,7,7,7,7,7,7,null,386,7,7,7,7,7,null,386,7,7,7,7,7,7,7,null,null,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,null,null,7,null,null,null,null,null,null,null,7,7,null,7,7,7,7,null,7,7,null,null,7,null,null,null,null,7,7,7,7,null,null,null,null,null,null,null,null,null,null,null,null,7,7,null,7,7,7,7,7,7,7,7,7,null,7,598,null,7,7,null,null,null,null,null,null,null,null,null,7,null,null,null,null,null,null,7,null,598,598,598,598,598,598,598,598,598,598,598,null,598,598,null,null,598,598,null,null,null,null,null,null,null,null,null,null,null,null,null,598,null,598,null,598,598,598,598,598,598,598,null,598,834,834,834,834,834,834,834,834,834,834,834,null,834,834,null,598,834,834,null,null,null,null,null,null,null,null,null,null,null,null,null,834,null,834,null,834,834,834,834,834,834,834,null,834,null,null,null,null,null,null,844,844,null,null,844,null,null,null,null,834,null,834,844,844,null,844,844,844,844,null,844,844,null,null,844,null,null,null,null,844,844,844,844,null,null,null,null,null,null,null,null,null,null,null,null,844,844,null,844,844,844,844,844,844,844,844,844,null,844,252,252,844,null,252,null,null,null,null,null,null,null,252,252,null,252,252,252,252,null,252,252,null,null,252,null,null,null,null,252,252,252,252,null,null,null,null,null,null,null,null,null,null,null,null,252,252,null,252,252,252,252,252,252,252,252,252,null,252,496,496,252,null,496,null,null,null,null,null,null,null,496,496,null,496,496,496,496,null,496,496,null,null,496,null,null,null,null,496,496,496,496,null,null,null,null,null,null,null,null,null,null,null,null,496,496,null,496,496,496,496,496,496,496,496,496,null,496,495,495,496,null,495,null,null,null,null,null,null,null,495,495,null,495,495,495,495,null,495,495,null,null,495,null,null,null,null,495,495,495,495,null,null,null,null,null,null,null,null,null,null,null,null,495,495,null,495,495,495,495,495,495,495,495,495,null,495,845,845,495,null,845,null,null,null,null,null,null,null,845,845,null,845,845,845,845,null,845,845,null,null,845,null,null,null,null,845,845,845,845,null,null,null,null,null,null,null,null,null,null,null,null,845,845,null,845,845,845,845,845,845,845,845,845,null,845,194,194,845,null,194,null,null,null,null,null,null,null,194,194,null,194,194,194,194,null,194,194,null,null,194,null,null,null,null,194,194,194,194,null,null,null,null,null,null,null,null,null,null,null,null,194,194,null,194,194,194,194,194,194,194,194,194,null,194,487,487,194,null,487,null,null,null,null,null,null,null,487,487,null,487,487,487,487,null,487,487,null,null,487,null,null,null,null,487,487,487,487,null,null,null,null,null,null,null,null,null,null,null,null,487,487,null,487,487,487,487,487,487,487,487,487,null,487,253,253,487,null,253,null,null,null,null,null,null,null,253,253,null,253,253,253,253,null,253,253,null,null,253,null,null,null,null,253,253,253,253,null,null,null,null,null,null,null,null,null,null,null,null,253,253,null,253,253,253,253,253,253,253,253,253,null,253,null,null,253,622,622,622,622,622,622,622,622,622,622,622,null,622,622,null,null,622,622,null,null,null,622,null,null,null,null,null,null,null,null,null,622,null,622,null,622,622,622,622,622,622,622,null,622,null,null,null,null,null,null,486,486,null,null,486,null,null,null,null,622,null,622,486,486,null,486,486,486,486,null,486,486,null,null,486,null,null,null,null,486,486,486,486,null,null,null,null,null,null,null,null,null,null,null,null,486,486,null,486,486,486,486,486,486,486,486,486,null,486,416,416,486,null,416,null,null,null,null,null,null,null,416,416,null,416,416,416,416,null,416,416,null,null,416,null,null,null,null,416,416,416,416,null,null,null,null,null,null,null,null,null,null,null,null,416,416,null,416,416,416,416,416,416,416,416,416,null,416,417,417,416,null,417,null,null,null,null,null,null,null,417,417,null,417,417,417,417,null,417,417,null,null,417,null,null,null,null,417,417,417,417,null,null,null,null,null,null,null,null,null,null,null,null,417,417,null,417,417,417,417,417,417,417,417,417,null,417,619,619,417,null,619,null,null,null,null,null,null,null,619,619,null,619,619,619,619,null,619,619,null,null,619,null,null,null,null,619,619,619,619,null,null,null,null,null,null,null,null,null,null,null,null,619,619,null,619,619,619,619,619,619,619,619,619,null,619,193,193,619,null,193,null,null,null,null,null,null,null,193,193,null,193,193,193,193,null,193,193,null,null,193,null,null,null,null,193,193,193,193,null,null,null,null,null,null,null,null,null,null,null,null,193,193,null,193,193,193,193,193,193,193,193,193,null,193,538,538,193,null,538,null,null,null,null,null,null,null,538,538,null,538,538,538,538,null,538,538,null,null,538,null,null,null,null,538,538,538,538,null,null,null,null,null,null,null,null,null,null,null,null,538,538,null,538,538,538,538,538,538,538,538,538,null,538,775,775,538,null,775,null,null,null,null,null,null,null,775,775,null,775,775,775,775,null,775,775,null,null,775,null,null,null,null,775,775,775,775,null,null,null,null,null,null,null,null,null,null,null,null,775,775,null,775,775,775,775,775,775,775,775,775,null,775,540,540,775,null,540,null,null,null,null,null,null,null,540,540,null,540,540,540,540,null,540,540,null,null,540,null,null,null,null,540,540,540,540,null,null,null,null,null,null,null,null,null,null,null,null,540,540,null,540,540,540,540,540,540,540,540,540,null,540,620,620,540,null,620,null,null,null,null,null,null,null,620,620,null,620,620,620,620,null,620,620,null,null,620,null,null,null,null,620,620,620,620,null,null,null,null,null,null,null,null,null,null,null,null,620,620,null,620,620,620,620,620,620,620,620,620,null,620,null,null,620,448,448,448,448,448,448,448,448,448,448,448,null,448,448,null,null,448,448,null,null,null,null,null,null,null,null,null,null,null,null,null,448,null,448,null,448,448,448,448,448,448,448,null,448,null,509,509,509,509,509,509,509,509,509,509,509,null,509,509,448,448,509,509,null,null,null,null,null,null,null,null,null,null,null,null,null,509,null,509,null,509,509,509,509,509,509,509,null,509,794,794,794,794,794,794,794,794,794,794,794,null,794,794,509,509,794,794,null,null,null,null,null,null,null,null,null,null,null,null,null,794,null,794,null,794,794,794,794,794,794,794,null,794,413,413,413,413,413,413,413,413,413,413,413,null,413,413,null,794,413,413,null,null,null,null,null,null,null,null,null,null,null,null,null,413,null,413,null,413,413,413,413,413,413,413,null,413,238,238,238,238,238,238,238,238,238,238,238,null,238,238,null,413,238,238,null,null,null,null,null,null,null,null,null,null,null,null,null,238,null,238,null,238,238,238,238,238,238,238,null,238,19,19,19,19,19,19,19,19,19,19,19,null,19,19,null,238,19,19,null,null,null,null,null,null,null,null,null,null,null,null,null,19,null,19,null,19,19,19,19,19,19,19,null,19,711,711,711,711,711,711,711,711,711,711,711,null,711,711,null,19,711,711,null,null,null,null,null,null,null,null,null,null,null,null,null,711,null,711,null,711,711,711,711,711,711,711,null,711,643,643,643,643,643,643,643,643,643,643,643,null,643,643,null,711,643,643,null,null,null,null,null,null,null,null,null,null,null,null,null,643,null,643,null,643,643,643,643,643,643,643,null,643,758,758,758,758,758,758,758,758,758,758,758,null,758,758,null,643,758,758,null,null,null,null,null,null,null,null,null,null,null,null,null,758,null,758,null,758,758,758,758,758,758,758,null,758,497,497,497,497,497,497,497,497,497,497,497,null,497,497,758,758,497,497,null,null,null,null,null,null,null,null,null,null,null,null,null,497,null,497,null,497,497,497,497,497,497,497,null,497,728,728,728,728,728,728,728,728,728,728,728,null,728,728,null,497,728,728,null,null,null,null,null,null,null,null,null,null,null,null,null,728,null,728,null,728,728,728,728,728,728,728,null,728,716,716,716,716,716,716,716,716,716,716,716,null,716,716,null,728,716,716,null,null,null,null,null,null,null,null,null,null,null,null,null,716,null,716,null,716,716,716,716,716,716,716,null,716,718,718,718,718,718,718,718,718,718,718,718,null,718,718,null,716,718,718,null,null,null,null,null,null,null,null,null,null,null,null,null,718,null,718,null,718,718,718,718,718,718,718,null,718,723,723,723,723,723,723,723,723,723,723,723,null,723,723,null,718,723,723,null,null,null,null,null,null,null,null,null,null,null,null,null,723,null,723,null,723,723,723,723,723,723,723,null,723,399,399,399,399,399,399,399,399,399,399,399,null,399,399,null,723,399,399,null,null,null,null,null,null,null,null,null,null,null,null,null,399,null,399,null,399,399,399,399,399,399,399,null,399,721,721,721,721,721,721,721,721,721,721,721,null,721,721,null,399,721,721,null,null,null,null,null,null,null,null,null,null,null,null,null,721,null,721,null,721,721,721,721,721,721,721,null,721,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,721],[-484,-486,-1,-473,-4,-5,-486,-486,-486,-486,-486,-486,-486,-486,-264,-30,-31,-486,-486,-36,-38,-39,-274,-301,-302,-43,-244,-343,-244,-55,-484,-59,-64,-65,-486,-416,-486,-486,-486,-486,-486,-475,-209,-257,-258,-259,-260,-261,-262,-263,-463,-484,-486,-484,-484,-280,-486,-486,-284,-287,-473,-486,-486,-486,-486,-303,-304,-361,-362,-363,-364,-365,-484,-368,-484,-484,-484,-484,-484,-394,-400,-401,-404,-405,-406,-407,-408,-409,-410,-411,-412,-413,-414,-415,-418,-419,-486,-3,-474,-480,-481,-482,-486,-486,-486,-486,-486,-486,-486,-89,-90,-91,-92,-93,-94,-95,-98,-99,-100,-101,-102,-103,-104,-105,-106,-107,-108,-109,-110,-111,-112,-113,-114,-115,-116,-117,-118,-119,-120,-121,-122,-123,-124,-125,-126,-127,-128,-129,-130,-131,-132,-133,-134,-135,-136,-137,-138,-139,-140,-141,-142,-143,-144,-145,-146,-147,-148,-149,-150,-151,-152,-153,-154,-155,-156,-157,-158,-159,-160,-161,-162,-163,-164,-165,-486,-11,-96,-484,-484,-486,-486,-486,-484,-486,-486,-486,-486,-486,-34,-486,-416,-486,-264,-486,-486,-484,-35,-201,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-486,-333,-335,-40,-210,-223,-485,-485,-486,-231,-486,-252,-274,-301,-302,-458,-41,-42,-486,-486,-47,-484,-486,-279,-338,-484,-484,-53,-342,-54,-486,-55,-484,-486,-486,-60,-62,-484,-69,-486,-486,-76,-277,-475,-486,-305,-343,-486,-63,-67,-270,-402,-403,-486,-186,-187,-202,-486,-476,-353,-486,-475,-211,-475,-477,-477,-486,-486,-477,-486,-455,-477,-281,-37,-486,-486,-486,-486,-473,-486,-474,-486,-317,-452,-452,-452,-325,-326,-438,-434,-435,-436,-437,-439,-444,-445,-447,-448,-449,-486,-85,-486,-87,-486,-264,-486,-486,-416,-484,-89,-90,-124,-125,-141,-146,-153,-156,-165,-433,-486,-453,-486,-366,-486,-381,-486,-383,-486,-486,-486,-373,-486,-486,-379,-486,-393,-395,-396,-397,-398,885,-6,-483,-12,-13,-14,-15,-16,-7,-8,-9,-10,-486,-486,-486,-19,-27,-166,-252,-486,-486,-20,-28,-29,-21,-168,-486,-464,-465,-484,-466,-467,-464,-244,-465,-341,-469,-470,-26,-175,-32,-33,-486,-486,-484,-270,-486,-486,-486,-176,-177,-178,-179,-180,-181,-182,-183,-188,-189,-190,-191,-192,-193,-194,-195,-196,-197,-198,-199,-200,-203,-204,-205,-206,-486,-484,-224,-486,-251,-226,-486,-485,-249,-486,-244,-464,-465,-244,-484,-48,-486,-475,-475,-485,-223,-245,-246,-486,-329,-486,-331,-484,-484,-486,-276,-486,-56,-268,-68,-61,-486,-484,-486,-486,-75,-486,-402,-403,-486,-486,-486,-486,-486,-207,-486,-484,-484,-266,-486,-212,-213,-479,-478,-215,-479,-475,-272,-479,-457,-273,-456,-484,-306,-307,-308,-484,-486,-486,-486,-486,-484,-486,-293,-486,-321,-486,-323,-324,-486,-486,-446,-450,-85,-86,-486,-484,-486,-484,-420,-486,-486,-486,-486,-484,-433,-486,-452,-452,-452,-432,-438,-442,-486,-471,-472,-475,-367,-382,-385,-486,-387,-369,-384,-370,-371,-372,-486,-375,-377,-378,-486,-399,-97,-17,-18,-486,-486,-256,-271,-486,-486,-49,-221,-222,-339,-486,-51,-340,-486,-464,-465,-468,-465,-486,-166,-486,-484,-486,-485,-250,-253,-486,-459,-486,-230,-486,-460,-44,-336,-45,-337,-484,-217,-486,-486,-486,-486,-486,-36,-486,-485,-486,-243,-247,-486,-330,-486,-486,-486,-275,-56,-66,-486,-464,-465,-484,-468,-74,-486,-174,-184,-185,-486,-484,-315,-484,-354,-484,-355,-356,-267,-486,-253,-216,-484,-309,-484,-285,-310,-311,-312,-288,-486,-291,-486,-347,-486,-486,-486,-452,-452,-440,-451,-452,-327,-486,-328,-486,-85,-88,-468,-486,-486,-486,-422,-484,-298,-486,-475,-424,-486,-428,-486,-430,-431,-486,-433,-486,-386,-389,-390,-391,-392,-484,-374,-376,-380,-167,-254,-486,-486,-23,-170,-24,-171,-50,-25,-172,-52,-173,-486,-486,-486,-271,-208,-486,-485,-228,-486,-485,-486,-218,-219,-484,-484,-475,-486,-486,-236,-486,-485,-248,-332,-344,-345,-70,-278,-2,-484,-360,-316,-486,-486,-358,-475,-486,-313,-486,-486,-484,-484,-290,-292,-486,-484,-349,-486,-486,-319,-320,-322,-486,-270,-271,-296,-421,-486,-299,-486,-452,-452,-452,-486,-443,-441,-484,-454,-486,-255,-22,-169,-486,-334,-225,-486,-227,-46,-486,-485,-233,-486,-485,-486,-242,-359,-484,-77,-486,-486,-84,-357,-214,-282,-486,-283,-486,-486,-486,-484,-294,-452,-269,-297,-423,-486,-426,-427,-429,-486,-388,-485,-220,-232,-486,-485,-238,-486,-485,-353,-484,-486,-486,-83,-484,-286,-289,-348,-346,-350,-351,-484,-318,-452,-300,-229,-486,-485,-234,-486,-237,-352,-486,-464,-465,-468,-82,-484,-486,-425,-485,-239,-486,-485,-78,-314,-295,-235,-486,-240,-485,-241],[-2,965,null,204,null,598,21036,21476,820,814,789,787,825,266,301,29,null,1678,1798,22916,851,null,2158,2278,2398,233,-1,2758,2868,null,2998,3118,3238,null,693,-59,761,345,3838,3958,4078,686,352,null,null,null,null,null,null,null,4428,4558,4678,4798,4918,-13,5158,5278,null,null,5398,888,5650,5770,20706,null,null,null,null,null,-44,null,null,null,null,null,652,649,21256,null,null,null,6490,null,null,6610,null,null,null,null,null,null,null,null,null,null,754,null,6850,null,null,null,6970,7090,7210,7330,7450,21146,502,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,20816,558,null,8050,8170,8290,8410,8530,8650,22412,21946,9010,9130,9250,null,198,94,543,253,348,436,10090,null,null,10210,10330,10450,10570,10690,10810,10930,11050,11170,11290,11410,11530,11650,11770,11890,12010,12130,12250,12370,12490,12610,12730,12850,12970,13090,13210,13330,null,null,null,22872,null,431,480,13810,null,13930,529,null,null,null,null,null,null,21710,22064,589,14530,14650,null,null,250,327,null,null,null,15010,602,15250,628,639,607,15730,15850,-42,202,703,199,672,660,-18,null,696,19,null,null,392,733,735,232,null,736,null,17650,null,798,814,1,null,703,103,422,18490,792,440,796,null,441,null,483,86,76,19450,19570,315,358,783,899,null,813,818,820,null,null,818,null,null,null,null,null,null,null,914,null,null,907,4318,893,null,253,null,5,3478,null,20296,238,375,379,237,220,124,358,460,340,3131,370,null,20176,null,25,null,-2,null,161,815,118,null,812,-34,null,145,null,null,null,null,null,null,635,null,null,null,null,null,null,null,null,null,null,21366,820,817,null,null,5398,null,800,20056,null,790,null,null,23312,822,334,299,19936,null,null,19806,819,19680,null,19330,19210,null,22828,null,null,22235,22294,19090,-62,18970,18850,18730,2638,2278,488,460,839,838,834,831,2758,2998,2819,2398,2158,2038,1918,1798,1078,1558,1438,1318,1198,570,689,2518,1678,22695,81,null,18610,null,null,18370,754,null,18250,20580,null,null,20526,-14,null,789,730,201,702,799,null,null,18130,null,528,null,18010,17890,727,null,723,684,null,null,null,718,17770,22176,22005,265,716,null,null,17530,17410,17290,21828,21769,23092,17170,778,17050,null,697,null,null,16930,null,null,16810,22740,null,16690,null,null,null,16570,748,null,null,16450,-21,36,742,748,16330,16210,null,648,null,419,null,null,489,16090,null,null,234,null,22471,15970,22589,15610,null,15490,100,-25,708,15370,1008,451,590,583,580,null,574,null,20926,null,null,3,null,null,null,612,null,null,null,null,null,null,-43,null,null,null,567,null,null,null,null,15130,14890,null,181,14770,14410,587,null,null,null,14290,562,null,14170,16,214,14050,13680,2,21542,13570,13450,9970,380,null,407,9850,null,382,null,229,null,null,null,null,null,9730,null,108,69,22353,22648,9610,22111,9,192,9490,null,null,254,null,318,342,456,null,-54,null,384,310,337,407,68,356,467,23004,508,531,269,589,null,9370,482,527,null,null,null,8890,null,null,561,null,644,null,null,null,null,null,653,null,669,554,60,8770,7930,560,561,null,null,563,null,560,264,638,371,null,607,604,689,416,null,7810,null,697,585,null,768,null,779,null,null,7690,3251,637,null,null,null,null,null,7570,null,null,null,22960,609,6730,6370,null,23180,null,23224,null,null,23356,null,23268,6250,6130,6010,272,23136,777,662,null,5890,668,685,null,null,708,709,130,771,5530,null,5038,677,null,null,null,null,263,null,null,4318,null,null,87,4198,null,23048,801,null,3718,804,3598,20416,null,null,3358,2638,null,37,474,null,null,null,22530,null,null,null,null,826,null,748,712,718,720,718,null,null,2518,null,745,null,null,22784,2038,null,null,1918,null,null,792,756,null,1558,759,1438,null,null,1318,318,354,851,144,null,null,null,68,null,898,899,1198,229,null,786,825,null,null,454,null,null,null,905,null,21586,null,null,1078,792,null,958,794,913,838,21651,21887,172,718,null,null,null,null,null,null,598,null,805,null,null,478,808,null,358,null,null,844,93,61,67,373,532,939,null,830,null,238,832,236,null,null,null,118,null,842,null],[207,294,198,319,238,238,238,320,403,407,299,305,301,523,499,315,239,239,239,317,288,289,290,279,279,258,262,466,254,261,263,606,547,515,519,238,238,295,101,352,267,307,307,107,186,307,206,297,463,390,397,759,97,370,279,279,537,115,115,647,243,243,243,612,661,665,614,458,461,678,237,250,251,308,309,282,675,312,112,112,265,673,12,375,353,606,561,307,307,307,307,381,571,787,556,101,310,240,240,240,763,2,311,504,507,339,342,512,764,313,514,672,12,359,361,475,476,368,854,377,378,379,380,269,541,185,98,306,751,302,449,268,670,12,851,651,112,755,356,357,303,363,570,354,382,366,702,707,692,299,112,400,783,469,628,1,null,null,115,370,null,null,null,null,null,null,null,null,null,null,null,391,238,399,238,null,null,413,null,112,12,414,415,null,291,null,297,null,12,null,207,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,389,395,398,762,null,666,412,238,787,238,null,null,null,null,403,407,null,null,null,null,238,238,null,null,null,null,675,null,null,238,null,null,468,239,null,null,null,null,null,112,null,239,683,null,null,279,878,393,393,411,null,null,12,12,null,null,497,null,null,479,258,null,262,null,484,509,null,null,null,null,12,387,388,null,null,546,243,243,307,307,null,553,709,null,639,243,465,470,600,268,null,null,606,639,678,477,483,823,null,265,null,615,null,606,265,null,null,null,545,null,520,521,null,467,240,null,null,null,null,null,null,null,240,559,null,612,614,null,null,null,101,12,null,null,null,null,12,null,639,null,null,null,null,652,522,null,null,null,null,null,268,null,null,null,null,268,null,542,299,238,597,null,719,789,null,852,null,722,null,null,null,null,null,null,null,null,739,null,768,null,null,null,null,238,null,413,598,399,585,591,null,602,590,null,null,297,453,null,319,null,606,null,320,489,null,null,576,12,null,null,630,624,null,null,317,null,238,737,738,238,115,502,238,503,null,299,null,636,null,null,null,null,null,null,null,606,622,null,null,295,null,112,null,611,null,null,613,null,null,null,238,null,674,null,677,null,null,643,644,645,null,null,297,809,null,238,646,null,null,null,238,13,411,238,686,null,238,553,null,299,691,685,null,null,null,null,null,null,199,199,238,null,626,199,199,199,null,null,null,null,null,13,273,273,238,853,null,null,279,null,null,307,null,null,700,null,297,null,null,null,null,null,13,199,199,847,null,199,199,null,null,199,null,337,337,null,null,null,662,662,12,12,411,687,711,238,864,null,716,718,null,411,null,null,721,null,null,723,393,631,632,602,688,689,728,null,238,693,null,13,238,null,null,199,199,199,199,13,null,null,12,null,null,669,12,null,238,null,null,12,238,617,618,411,715,717,null,null,740,658,720,null,null,660,null,null,12,null,668,null,608,112,12,null,null,null,null,null,null,784,758,785,780,null,591,null,null,null,null,553,null,null,null,null,null,657,238,null,null,null,307,null,639,528,530,531,null,null,null,null,null,null,null,null,null,null,null,null,13,13,199,199,199,199,238,12,199,199,199,null,null,null,770,null,null,null,13,null,238,794,12,805,null,null,729,701,null,null,null,716,718,721,null,null,null,null,824,238,null,734,null,null,null,null,null,779,238,null,238,null,null,null,null,null,12,null,null,null,null,null,null,null,832,null,null,793,199,199,null,307,null,279,238,754,null,199,null,13,null,null,null,273,13,null,null,null,null,null,null,null,null,null,null,856,12,null,null,731,null,null,794,817,803,834,null,null,null,null,null,238,null,238,12,null,null,null,null,860,null,742,null,199,199,299,null,865,238,null,662,null,null,791,10,null,null,null,null,null,null,802,null,null,238,null,null,238,null,null,238,null,null,199,null,13,null,null,null,12,782,35,297,null,10,null,238,null,199,238,12,12,411,null,null,12,null,null,808,null,null,null,238,null,null,10,null,null,238,819,820,35,272,272,822,null,12,null,null,null,null,null,null,null,null,null,null,801,null,null,null,null,35,null,null,null,12,null,695,697,698,null,null,341,341,341,815,797,null,null,799,199,10,null,null,842,null,null,null,null,10,807,411,null,null,null,null,null,null,null,null,null,null,null,12,14,null,null,null,35,null,12,null,null,null,null,null,35,null,null,null,null,null,870,null,null,null,null,null,null,871,null,null,null,199,14,275,275,13,13,null,null,null,null,null,null,null,null,199,836,null,null,839,null,null,null,14,null,null,null,null,199,null,null,null,null,null,338,338,null,null,10,10,null,null,null,null,null,13,null,null,858,13,null,null,861,null,13,863,10,null,772,773,null,null,774,680,null,35,35,null,null,199,14,13,null,199,874,null,null,13,14,null,null,null,null,35,null,null,null,880,null,null,882,null,null,null,null,null,null,884,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,199,199,null,null,10,null,199,null,null,10,null,null,null,null,null,null,null,13,null,null,null,null,null,null,null,null,null,null,null,null,null,35,13,null,null,272,35,null,199,null,null,null,null,null,null,null,14,14,null,null,null,null,null,null,null,829,830,831,null,null,null,null,null,null,14,null,13,null,null,null,null,null,null,null,null,null,null,null,null,null,10,null,null,null,null,null,null,null,null,199,null,null,null,null,null,null,855,null,null,null,null,null,null,null,null,null,13,35,null,null,null,null,null,null,null,null,null,296,304,null,null,null,null,null,13,14,null,null,872,275,14,199,null,null,null,null,358,null,360,360,364,367,360,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,13,null,null,null,811,null,null,null,null,199,null,13,13,null,null,null,13,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,14,null,null,null,null,13,null,null,null,null,null,null,10,10,null,null,null,null,null,null,null,null,null,null,null,13,null,null,null,null,null,null,null,null,null,null,null,null,null,35,35,null,null,null,null,null,null,null,null,null,null,null,10,null,null,296,10,null,null,199,null,10,null,13,null,null,null,null,null,null,13,null,null,null,null,null,null,null,10,35,null,null,null,35,10,null,null,null,35,null,null,null,null,null,null,null,null,341,null,null,null,null,null,null,null,35,null,null,null,null,null,35,null,null,null,null,null,null,464,null,null,null,472,472,null,null,null,null,null,null,null,null,null,14,14,null,null,10,null,null,null,null,null,null,null,null,null,null,null,null,null,null,10,null,null,null,null,null,null,null,null,null,null,null,35,null,null,null,null,null,null,null,null,14,null,null,null,14,null,35,26,null,14,null,null,null,10,null,null,null,null,338,null,null,null,null,null,26,26,14,null,null,26,26,26,14,null,null,null,null,26,null,null,35,null,null,null,null,null,null,null,706,null,null,null,null,10,null,null,null,null,26,26,26,null,null,26,26,null,null,26,null,null,null,10,null,null,null,null,null,null,null,null,35,null,null,null,null,14,null,null,null,null,null,null,null,586,null,null,null,null,35,null,14,null,null,null,null,26,null,null,296,26,26,26,26,26,null,null,10,null,null,null,814,null,null,null,null,null,null,10,10,392,396,null,10,null,14,null,null,null,null,472,null,null,null,35,null,null,null,810,586,null,null,586,472,10,35,35,null,null,null,35,null,null,null,null,null,null,null,null,null,null,null,null,null,10,14,296,null,null,null,null,35,null,455,null,456,null,null,null,null,648,653,null,14,null,26,26,26,26,26,26,35,null,26,26,26,null,null,null,null,null,null,10,26,null,null,null,null,null,10,null,null,null,null,null,null,null,null,null,null,296,null,null,null,null,null,null,null,14,35,null,null,813,null,null,null,35,null,null,14,14,null,null,null,14,null,null,null,null,null,null,null,null,26,26,null,null,null,null,null,null,null,26,null,26,14,null,null,null,26,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,14,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,26,26,null,null,null,null,null,null,null,null,null,null,586,null,null,14,null,581,null,null,753,null,14,null,757,null,null,null,null,null,26,648,26,648,null,null,null,null,null,null,null,null,null,null,null,26,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,604,null,null,607,null,null,610,null,null,null,null,null,null,null,null,null,null,null,null,null,623,null,null,null,null,null,null,null,null,null,null,null,null,null,26,null,586,586,null,null,null,null,null,null,null,null,null,null,null,650,null,null,null,null,656,null,null,607,null,null,656,null,null,null,null,null,null,null,null,null,null,null,null,null,392,null,null,null,null,null,null,null,null,null,null,null,null,26,null,null,null,26,26,null,null,null,null,null,null,null,null,26,null,null,null,null,null,null,null,null,null,null,null,null,26,null,null,null,null,null,null,648,null,null,null,null,null,null,null,712,null,26,null,null,null,26,null,null,null,null,26,null,296,null,null,null,null,null,null,null,730,null,null,null,733,26,null,26,null,26,null,null,null,26,null,null,null,null,null,648,604,null,null,null,744,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,26,26,null,null,null,null,26,null,null,null,null,null,null,null,null,null,null,26,null,null,null,769,null,null,null,null,null,null,null,null,null,null,26,null,null,null,null,null,26,null,null,null,null,null,null,null,null,null,null,788,null,null,null,null,null,null,null,null,null,null,null,null,null,792,null,null,26,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,607,null,null,null,null,null,null,26,null,null,null,607,null,null,null,null,null,null,null,null,null,null,null,null,26,null,null,null,null,null,null,null,null,null,null,656,null,null,null,null,null,null,26,null,null,null,null,null,null,26,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,838,null,841,null,null,null,null,null,null,null,null,null,null,null,null,26,null,850,null,null,null,null,null,null,26,null,26,26,null,null,null,26,null,604,null,null,607,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,26,null,null,873,null,null,876,null,null,null,null,null,null,null,null,null,null,null,null,607,26,null,null,null,null,883,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,26,null,null,null,26,null,null,null,null,null,null,26],[25,3,24,89,25,25,25,91,30,30,51,51,20,73,4,74,26,26,26,87,25,25,25,48,48,52,52,29,31,31,31,119,77,70,70,25,25,24,76,43,36,24,24,12,12,24,16,26,32,22,22,71,8,43,48,48,41,46,46,5,55,55,55,53,72,72,53,30,30,92,28,28,28,14,14,39,115,14,44,44,35,88,18,10,78,119,108,24,24,24,24,10,108,116,79,76,80,49,49,49,81,2,82,50,50,42,42,50,83,8,50,84,18,105,105,33,33,105,85,14,14,14,14,38,75,13,11,68,6,49,94,2,96,18,97,98,44,99,103,104,67,106,107,66,12,109,110,111,113,51,44,20,114,57,56,1,null,null,46,43,null,null,null,null,null,null,null,null,null,null,null,25,25,25,25,null,null,25,null,44,18,24,24,null,47,null,26,null,18,null,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,16,16,16,5,null,73,16,25,116,25,null,null,null,null,30,30,null,null,null,null,25,25,null,null,null,null,115,null,null,25,null,null,26,26,null,null,null,null,null,44,null,26,41,null,null,48,71,49,49,44,null,null,18,18,null,null,25,null,null,36,52,null,52,null,36,25,null,null,null,null,18,2,2,null,null,3,55,55,24,24,null,91,108,null,30,55,28,28,33,2,null,null,119,30,92,28,39,72,null,35,null,33,null,119,35,null,null,null,24,null,14,14,null,49,49,null,null,null,null,null,null,null,49,24,null,53,53,null,null,null,76,18,null,null,null,null,18,null,30,null,null,null,null,22,8,null,null,null,null,null,2,null,null,null,null,2,null,76,51,25,20,null,32,77,null,5,null,32,null,null,null,null,null,null,null,null,29,null,70,null,null,null,null,25,null,25,25,25,31,52,null,51,31,null,null,26,54,null,89,null,119,null,91,47,null,null,12,18,null,null,74,51,null,null,87,null,25,30,30,25,46,47,25,47,null,51,null,20,null,null,null,null,null,null,null,119,25,null,null,24,null,44,null,31,null,null,31,null,null,null,25,null,89,null,89,null,null,25,25,25,null,null,26,70,null,25,24,null,null,null,25,19,44,25,3,null,25,91,null,51,3,20,null,null,null,null,null,null,19,19,25,null,55,19,19,19,null,null,null,null,null,19,19,19,25,73,null,null,48,null,null,24,null,null,43,null,26,null,null,null,null,null,19,19,19,70,null,19,19,null,null,19,null,19,19,null,null,null,76,76,18,18,44,14,25,25,4,null,25,25,null,44,null,null,25,null,null,25,49,2,2,51,76,76,25,null,25,76,null,19,25,null,null,19,19,19,19,19,null,null,18,null,null,49,18,null,25,null,null,18,25,47,47,44,16,16,null,null,26,2,16,null,null,2,null,null,18,null,2,null,54,44,18,null,null,null,null,null,null,89,25,89,3,null,52,null,null,null,null,91,null,null,null,null,null,47,25,null,null,null,24,null,30,90,90,90,null,null,null,null,null,null,null,null,null,null,null,null,19,19,19,19,19,19,25,18,19,19,19,null,null,null,14,null,null,null,19,null,25,25,18,51,null,null,2,47,null,null,null,25,25,25,null,null,null,null,89,25,null,2,null,null,null,null,null,76,25,null,25,null,null,null,null,null,18,null,null,null,null,null,null,null,3,null,null,16,19,19,null,24,null,48,25,2,null,19,null,19,null,null,null,19,19,null,null,null,null,null,null,null,null,null,null,89,18,null,null,54,null,null,25,14,55,25,null,null,null,null,null,25,null,25,18,null,null,null,null,51,null,54,null,19,19,51,null,20,25,null,76,null,null,2,15,null,null,null,null,null,null,49,null,null,25,null,null,25,null,null,25,null,null,19,null,19,null,null,null,18,47,40,26,null,15,null,25,null,19,25,18,18,44,null,null,18,null,null,2,null,null,null,25,null,null,15,null,null,25,2,2,40,40,40,2,null,18,null,null,null,null,null,null,null,null,null,null,47,null,null,null,null,40,null,null,null,18,null,90,90,90,null,null,40,40,40,47,54,null,null,54,19,15,null,null,2,null,null,null,null,15,54,44,null,null,null,null,null,null,null,null,null,null,null,18,21,null,null,null,40,null,18,null,null,null,null,null,40,null,null,null,null,null,2,null,null,null,null,null,null,2,null,null,null,19,21,21,21,19,19,null,null,null,null,null,null,null,null,19,54,null,null,54,null,null,null,21,null,null,null,null,19,null,null,null,null,null,21,21,null,null,15,15,null,null,null,null,null,19,null,null,54,19,null,null,54,null,19,54,15,null,90,90,null,null,90,19,null,40,40,null,null,19,21,19,null,19,54,null,null,19,21,null,null,null,null,40,null,null,null,54,null,null,54,null,null,null,null,null,null,54,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,19,19,null,null,15,null,19,null,null,15,null,null,null,null,null,null,null,19,null,null,null,null,null,null,null,null,null,null,null,null,null,40,19,null,null,40,40,null,19,null,null,null,null,null,null,null,21,21,null,null,null,null,null,null,null,90,90,90,null,null,null,null,null,null,21,null,19,null,null,null,null,null,null,null,null,null,null,null,null,null,15,null,null,null,null,null,null,null,null,19,null,null,null,null,null,null,90,null,null,null,null,null,null,null,null,null,19,40,null,null,null,null,null,null,null,null,null,9,9,null,null,null,null,null,19,21,null,null,90,21,21,19,null,null,null,null,9,null,9,9,9,9,9,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,19,null,null,null,19,null,null,null,null,19,null,19,19,null,null,null,19,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,21,null,null,null,null,19,null,null,null,null,null,null,15,15,null,null,null,null,null,null,null,null,null,null,null,19,null,null,null,null,null,null,null,null,null,null,null,null,null,40,40,null,null,null,null,null,null,null,null,null,null,null,15,null,null,9,15,null,null,19,null,15,null,19,null,null,null,null,null,null,19,null,null,null,null,null,null,null,15,40,null,null,null,40,15,null,null,null,40,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,40,null,null,null,null,null,40,null,null,null,null,null,null,9,null,null,null,9,9,null,null,null,null,null,null,null,null,null,21,21,null,null,15,null,null,null,null,null,null,null,null,null,null,null,null,null,null,15,null,null,null,null,null,null,null,null,null,null,null,40,null,null,null,null,null,null,null,null,21,null,null,null,21,null,40,34,null,21,null,null,null,15,null,null,null,null,21,null,null,null,null,null,34,34,21,null,null,34,34,34,21,null,null,null,null,34,null,null,40,null,null,null,null,null,null,null,21,null,null,null,null,15,null,null,null,null,34,34,34,null,null,34,34,null,null,34,null,null,null,15,null,null,null,null,null,null,null,null,40,null,null,null,null,21,null,null,null,null,null,null,null,9,null,null,null,null,40,null,21,null,null,null,null,34,null,null,9,34,34,34,34,34,null,null,15,null,null,null,15,null,null,null,null,null,null,15,15,23,23,null,15,null,21,null,null,null,null,9,null,null,null,40,null,null,null,40,9,null,null,9,9,15,40,40,null,null,null,40,null,null,null,null,null,null,null,null,null,null,null,null,null,15,21,9,null,null,null,null,40,null,23,null,23,null,null,null,null,9,9,null,21,null,34,34,34,34,34,34,40,null,34,34,34,null,null,null,null,null,null,15,34,null,null,null,null,null,15,null,null,null,null,null,null,null,null,null,null,9,null,null,null,null,null,null,null,21,40,null,null,21,null,null,null,40,null,null,21,21,null,null,null,21,null,null,null,null,null,null,null,null,34,34,null,null,null,null,null,null,null,34,null,34,21,null,null,null,34,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,21,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,34,34,null,null,null,null,null,null,null,null,null,null,9,null,null,21,null,23,null,null,9,null,21,null,9,null,null,null,null,null,34,9,34,9,null,null,null,null,null,null,null,null,null,null,null,34,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,23,null,null,23,null,null,23,null,null,null,null,null,null,null,null,null,null,null,null,null,23,null,null,null,null,null,null,null,null,null,null,null,null,null,34,null,9,9,null,null,null,null,null,null,null,null,null,null,null,23,null,null,null,null,23,null,null,23,null,null,23,null,null,null,null,null,null,null,null,null,null,null,null,null,23,null,null,null,null,null,null,null,null,null,null,null,null,34,null,null,null,34,34,null,null,null,null,null,null,null,null,34,null,null,null,null,null,null,null,null,null,null,null,null,34,null,null,null,null,null,null,9,null,null,null,null,null,null,null,23,null,34,null,null,null,34,null,null,null,null,34,null,9,null,null,null,null,null,null,null,23,null,null,null,23,34,null,34,null,34,null,null,null,34,null,null,null,null,null,9,23,null,null,null,23,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,34,34,null,null,null,null,34,null,null,null,null,null,null,null,null,null,null,34,null,null,null,23,null,null,null,null,null,null,null,null,null,null,34,null,null,null,null,null,34,null,null,null,null,null,null,null,null,null,null,23,null,null,null,null,null,null,null,null,null,null,null,null,null,23,null,null,34,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,23,null,null,null,null,null,null,34,null,null,null,23,null,null,null,null,null,null,null,null,null,null,null,null,34,null,null,null,null,null,null,null,null,null,null,23,null,null,null,null,null,null,34,null,null,null,null,null,null,34,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,23,null,23,null,null,null,null,null,null,null,null,null,null,null,null,34,null,23,null,null,null,null,null,null,34,null,34,34,null,null,null,34,null,23,null,null,23,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,34,null,null,23,null,null,23,null,null,null,null,null,null,null,null,null,null,null,null,23,34,null,null,null,null,23,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,34,null,null,null,34,null,null,null,null,null,null,34],[null,null,293,null,null,760,null,3,null,4,5,314,null,null,null,203,16,11,204,287,null,202,null,245,15,19,20,21,null,25,642,null,null,null,278,29,null,31,34,33,200,336,null,114,405,113,68,null,42,298,null,241,587,588,450,603,null,null,256,452,43,44,45,46,47,48,49,null,257,55,null,null,null,null,null,null,516,null,null,null,null,null,null,null,null,null,316,550,318,552,null,676,321,236,null,409,null,null,null,null,67,69,70,71,null,null,null,null,566,null,null,null,369,549,551,327,555,330,333,249],[null,155,101,-50,-279,-440,-519,null,49,1135,-15,123,37,118,17,809,28,null,82,488,-41,930,-140,1385,-15,-18,-6,null,48,-228,-185,2,-206,-144,1452,50,10,null,92,43,836,-279,43,-25,72,null,51,143,-8,75,-195,-43,-1,-395,172,38,-317,-103,null,null,null,null,null,null,null,null,79,86,72,null,-275,-607,-456,-300,-46,-215,35,-320,20,-259,38,-561,43,-557,-415,-705,null,-42,-446,-58,343,-54,-460,null,-105,null,-393,-688,-365,-514,null,null,null,68,67,39,65,-221,-271,68,-417,-417,null,-400,-542,-451,-603,null,null,-423],134,[0,0,"racc_error",1,135,"_reduce_1",4,137,"_reduce_2",2,136,"_reduce_3",1,141,"_reduce_4",1,141,"_reduce_5",3,141,"_reduce_6",3,144,"_reduce_none",3,144,"_reduce_none",3,144,"_reduce_none",3,144,"_reduce_none",2,144,"_reduce_none",3,144,"_reduce_12",3,144,"_reduce_13",3,144,"_reduce_none",3,144,"_reduce_none",3,144,"_reduce_none",4,144,"_reduce_none",4,144,"_reduce_none",3,144,"_reduce_19",3,144,"_reduce_none",3,144,"_reduce_21",6,144,"_reduce_none",5,144,"_reduce_none",5,144,"_reduce_none",5,144,"_reduce_none",3,144,"_reduce_none",3,144,"_reduce_none",3,144,"_reduce_none",3,144,"_reduce_none",1,144,"_reduce_none",1,158,"_reduce_none",3,158,"_reduce_32",3,158,"_reduce_33",2,158,"_reduce_34",2,158,"_reduce_35",1,158,"_reduce_none",1,148,"_reduce_none",1,150,"_reduce_none",1,150,"_reduce_none",2,150,"_reduce_40",2,150,"_reduce_41",2,150,"_reduce_42",1,161,"_reduce_none",4,161,"_reduce_none",4,161,"_reduce_none",4,166,"_reduce_none",2,160,"_reduce_47",3,160,"_reduce_none",4,160,"_reduce_49",5,160,"_reduce_none",4,160,"_reduce_51",5,160,"_reduce_none",2,160,"_reduce_53",2,160,"_reduce_54",1,151,"_reduce_none",3,151,"_reduce_none",1,170,"_reduce_none",3,170,"_reduce_none",1,169,"_reduce_none",2,169,"_reduce_none",3,169,"_reduce_none",2,169,"_reduce_none",2,169,"_reduce_none",1,169,"_reduce_none",1,172,"_reduce_none",3,172,"_reduce_none",2,171,"_reduce_none",3,171,"_reduce_none",1,173,"_reduce_none",4,173,"_reduce_none",3,173,"_reduce_none",3,173,"_reduce_none",3,173,"_reduce_none",3,173,"_reduce_none",2,173,"_reduce_none",1,173,"_reduce_none",1,149,"_reduce_none",4,149,"_reduce_78",3,149,"_reduce_79",3,149,"_reduce_none",3,149,"_reduce_none",3,149,"_reduce_none",2,149,"_reduce_none",1,149,"_reduce_none",1,175,"_reduce_none",2,176,"_reduce_86",1,176,"_reduce_87",3,176,"_reduce_88",1,177,"_reduce_none",1,177,"_reduce_none",1,177,"_reduce_none",1,177,"_reduce_none",1,177,"_reduce_none",1,146,"_reduce_none",1,146,"_reduce_none",1,147,"_reduce_none",3,147,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,178,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",1,179,"_reduce_none",3,159,"_reduce_166",5,159,"_reduce_none",3,159,"_reduce_168",6,159,"_reduce_none",5,159,"_reduce_none",5,159,"_reduce_none",5,159,"_reduce_none",5,159,"_reduce_none",4,159,"_reduce_none",3,159,"_reduce_none",3,159,"_reduce_176",3,159,"_reduce_177",3,159,"_reduce_178",3,159,"_reduce_179",3,159,"_reduce_180",3,159,"_reduce_181",3,159,"_reduce_182",3,159,"_reduce_183",4,159,"_reduce_none",4,159,"_reduce_none",2,159,"_reduce_186",2,159,"_reduce_187",3,159,"_reduce_188",3,159,"_reduce_189",3,159,"_reduce_190",3,159,"_reduce_191",3,159,"_reduce_192",3,159,"_reduce_193",3,159,"_reduce_194",3,159,"_reduce_195",3,159,"_reduce_196",3,159,"_reduce_197",3,159,"_reduce_198",3,159,"_reduce_199",3,159,"_reduce_200",2,159,"_reduce_201",2,159,"_reduce_202",3,159,"_reduce_203",3,159,"_reduce_204",3,159,"_reduce_205",3,159,"_reduce_206",3,159,"_reduce_none",5,159,"_reduce_208",1,159,"_reduce_none",1,157,"_reduce_none",1,154,"_reduce_211",2,154,"_reduce_none",2,154,"_reduce_213",5,154,"_reduce_214",2,154,"_reduce_none",3,154,"_reduce_216",3,186,"_reduce_217",4,186,"_reduce_218",4,186,"_reduce_none",6,186,"_reduce_none",1,187,"_reduce_221",1,187,"_reduce_none",1,162,"_reduce_223",2,162,"_reduce_224",5,162,"_reduce_225",2,162,"_reduce_226",5,162,"_reduce_227",4,162,"_reduce_228",7,162,"_reduce_229",3,162,"_reduce_230",1,162,"_reduce_231",4,190,"_reduce_none",3,190,"_reduce_none",5,190,"_reduce_none",7,190,"_reduce_none",2,190,"_reduce_none",5,190,"_reduce_none",4,190,"_reduce_none",6,190,"_reduce_none",7,190,"_reduce_none",9,190,"_reduce_none",3,190,"_reduce_none",1,190,"_reduce_none",0,192,"_reduce_244",2,165,"_reduce_245",1,191,"_reduce_none",2,191,"_reduce_247",3,191,"_reduce_248",2,189,"_reduce_249",2,188,"_reduce_250",1,188,"_reduce_251",1,183,"_reduce_252",3,183,"_reduce_253",3,156,"_reduce_none",4,156,"_reduce_none",2,156,"_reduce_none",1,182,"_reduce_none",1,182,"_reduce_none",1,182,"_reduce_none",1,182,"_reduce_none",1,182,"_reduce_none",1,182,"_reduce_none",1,182,"_reduce_none",1,182,"_reduce_none",1,182,"_reduce_none",3,182,"_reduce_266",4,182,"_reduce_none",3,182,"_reduce_268",3,182,"_reduce_269",2,182,"_reduce_none",4,182,"_reduce_271",3,182,"_reduce_272",3,182,"_reduce_273",1,182,"_reduce_274",4,182,"_reduce_275",3,182,"_reduce_276",1,182,"_reduce_277",5,182,"_reduce_none",2,182,"_reduce_279",1,182,"_reduce_none",2,182,"_reduce_281",6,182,"_reduce_282",6,182,"_reduce_283",0,214,"_reduce_284",0,215,"_reduce_285",7,182,"_reduce_286",0,216,"_reduce_287",0,217,"_reduce_288",7,182,"_reduce_289",5,182,"_reduce_290",4,182,"_reduce_291",5,182,"_reduce_none",0,218,"_reduce_293",0,219,"_reduce_294",9,182,"_reduce_none",5,182,"_reduce_296",6,182,"_reduce_297",4,182,"_reduce_298",5,182,"_reduce_299",7,182,"_reduce_300",1,182,"_reduce_301",1,182,"_reduce_302",1,182,"_reduce_none",1,182,"_reduce_none",1,153,"_reduce_none",1,204,"_reduce_none",1,204,"_reduce_none",1,204,"_reduce_none",2,204,"_reduce_none",1,206,"_reduce_none",1,206,"_reduce_none",1,206,"_reduce_none",1,205,"_reduce_313",5,205,"_reduce_314",1,139,"_reduce_315",2,139,"_reduce_316",1,208,"_reduce_317",6,220,"_reduce_318",4,220,"_reduce_319",4,220,"_reduce_320",2,220,"_reduce_321",4,220,"_reduce_322",2,220,"_reduce_323",2,220,"_reduce_324",1,220,"_reduce_325",1,222,"_reduce_326",3,222,"_reduce_327",3,226,"_reduce_328",1,167,"_reduce_329",2,167,"_reduce_330",1,167,"_reduce_331",3,167,"_reduce_332",0,228,"_reduce_333",5,227,"_reduce_334",2,163,"_reduce_335",4,163,"_reduce_none",4,163,"_reduce_none",2,203,"_reduce_338",4,203,"_reduce_339",4,203,"_reduce_none",3,203,"_reduce_none",2,203,"_reduce_342",1,203,"_reduce_343",4,202,"_reduce_344",4,202,"_reduce_345",5,207,"_reduce_346",1,230,"_reduce_347",4,230,"_reduce_348",2,230,"_reduce_349",1,231,"_reduce_none",1,231,"_reduce_none",6,138,"_reduce_352",0,138,"_reduce_353",1,232,"_reduce_none",1,232,"_reduce_none",1,232,"_reduce_none",2,233,"_reduce_357",1,233,"_reduce_358",2,140,"_reduce_none",1,140,"_reduce_none",1,194,"_reduce_none",1,194,"_reduce_none",1,194,"_reduce_none",1,195,"_reduce_none",1,236,"_reduce_none",2,236,"_reduce_none",3,237,"_reduce_367",1,237,"_reduce_none",3,196,"_reduce_369",3,197,"_reduce_370",3,198,"_reduce_none",3,198,"_reduce_none",1,240,"_reduce_none",3,240,"_reduce_none",1,241,"_reduce_none",2,241,"_reduce_none",3,199,"_reduce_none",3,199,"_reduce_none",1,243,"_reduce_none",3,243,"_reduce_none",1,238,"_reduce_381",2,238,"_reduce_382",1,239,"_reduce_383",2,239,"_reduce_384",1,242,"_reduce_385",2,242,"_reduce_386",0,245,"_reduce_387",4,242,"_reduce_388",1,244,"_reduce_none",1,244,"_reduce_none",1,244,"_reduce_none",1,244,"_reduce_none",2,180,"_reduce_393",1,180,"_reduce_none",1,246,"_reduce_none",1,246,"_reduce_none",1,246,"_reduce_none",1,246,"_reduce_none",3,235,"_reduce_399",1,234,"_reduce_400",1,234,"_reduce_401",2,234,"_reduce_none",2,234,"_reduce_none",1,174,"_reduce_404",1,174,"_reduce_405",1,174,"_reduce_406",1,174,"_reduce_407",1,174,"_reduce_408",1,174,"_reduce_409",1,174,"_reduce_410",1,174,"_reduce_411",1,174,"_reduce_412",1,174,"_reduce_413",1,174,"_reduce_414",1,174,"_reduce_415",1,200,"_reduce_none",1,152,"_reduce_none",1,155,"_reduce_none",1,155,"_reduce_none",1,209,"_reduce_420",3,209,"_reduce_421",2,209,"_reduce_422",4,211,"_reduce_423",2,211,"_reduce_424",6,247,"_reduce_425",4,247,"_reduce_426",4,247,"_reduce_427",2,247,"_reduce_428",4,247,"_reduce_429",2,247,"_reduce_430",2,247,"_reduce_431",1,247,"_reduce_432",0,247,"_reduce_433",1,249,"_reduce_434",1,249,"_reduce_435",1,249,"_reduce_436",1,249,"_reduce_437",1,249,"_reduce_none",1,221,"_reduce_439",3,221,"_reduce_440",3,250,"_reduce_441",1,248,"_reduce_442",3,248,"_reduce_443",1,251,"_reduce_none",1,251,"_reduce_none",2,223,"_reduce_446",1,223,"_reduce_447",1,252,"_reduce_none",1,252,"_reduce_none",2,225,"_reduce_450",2,224,"_reduce_451",0,224,"_reduce_452",1,212,"_reduce_453",4,212,"_reduce_454",1,201,"_reduce_455",2,201,"_reduce_456",2,201,"_reduce_457",1,185,"_reduce_458",3,185,"_reduce_459",3,253,"_reduce_460",1,168,"_reduce_none",1,168,"_reduce_none",1,168,"_reduce_none",1,164,"_reduce_none",1,164,"_reduce_none",1,164,"_reduce_none",1,164,"_reduce_none",1,229,"_reduce_none",1,229,"_reduce_none",1,229,"_reduce_none",1,213,"_reduce_none",1,213,"_reduce_none",0,142,"_reduce_none",1,142,"_reduce_none",0,181,"_reduce_none",1,181,"_reduce_none",0,184,"_reduce_none",1,184,"_reduce_none",1,184,"_reduce_none",1,210,"_reduce_none",1,210,"_reduce_none",1,145,"_reduce_none",2,145,"_reduce_none",0,143,"_reduce_none",0,193,"_reduce_none"],{"false": 0,"error": 1,"CLASS": 2,"MODULE": 3,"DEF": 4,"UNDEF": 5,"BEGIN": 6,"RESCUE": 7,"ENSURE": 8,"END": 9,"IF": 10,"UNLESS": 11,"THEN": 12,"ELSIF": 13,"ELSE": 14,"CASE": 15,"WHEN": 16,"WHILE": 17,"UNTIL": 18,"FOR": 19,"BREAK": 20,"NEXT": 21,"REDO": 22,"RETRY": 23,"IN": 24,"DO": 25,"DO_COND": 26,"DO_BLOCK": 27,"RETURN": 28,"YIELD": 29,"SUPER": 30,"SELF": 31,"NIL": 32,"TRUE": 33,"FALSE": 34,"AND": 35,"OR": 36,"NOT": 37,"IF_MOD": 38,"UNLESS_MOD": 39,"WHILE_MOD": 40,"UNTIL_MOD": 41,"RESCUE_MOD": 42,"ALIAS": 43,"DEFINED": 44,"klBEGIN": 45,"klEND": 46,"LINE": 47,"FILE": 48,"IDENTIFIER": 49,"FID": 50,"GVAR": 51,"IVAR": 52,"CONSTANT": 53,"CVAR": 54,"NTH_REF": 55,"BACK_REF": 56,"STRING_CONTENT": 57,"INTEGER": 58,"FLOAT": 59,"REGEXP_END": 60,"+@": 61,"-@": 62,"-@NUM": 63,"**": 64,"<=>": 65,"==": 66,"===": 67,"!=": 68,">=": 69,"<=": 70,"&&": 71,"||": 72,"=~": 73,"!~": 74,".": 75,"..": 76,"...": 77,"[]": 78,"[]=": 79,"<<": 80,">>": 81,"::": 82,"::@": 83,"OP_ASGN": 84,"=>": 85,"PAREN_BEG": 86,"(": 87,")": 88,"tLPAREN_ARG": 89,"ARRAY_BEG": 90,"]": 91,"tLBRACE": 92,"tLBRACE_ARG": 93,"SPLAT": 94,"*": 95,"&@": 96,"&": 97,"~": 98,"%": 99,"/": 100,"+": 101,"-": 102,"<": 103,">": 104,"|": 105,"!": 106,"^": 107,"{@": 108,"}": 109,"BACK_REF2": 110,"SYMBOL_BEG": 111,"STRING_BEG": 112,"XSTRING_BEG": 113,"REGEXP_BEG": 114,"WORDS_BEG": 115,"tAWORDS_BEG": 116,"STRING_DBEG": 117,"STRING_DVAR": 118,"STRING_END": 119,"STRING": 120,"SYMBOL": 121,"\\n": 122,"?": 123,":": 124,",": 125,"SPACE": 126,";": 127,"BLOCK_GIVEN": 128,"=": 129,"LOWEST": 130,"[@": 131,"[": 132,"{": 133},885,486,true];
        parser.prototype._reduce_1 = function(val, result) {
          result = val[0];
          return result;
        };
        parser.prototype._reduce_2 = function(val, result) {
          result =                                ['bodystmt', val[0], val[1], val[2], val[3]];
          return result;
        };
        parser.prototype._reduce_3 = function(val, result) {
          result = ['compstmt', val[0]];
          return result;
        };
        parser.prototype._reduce_4 = function(val, result) {
          result = [];
          return result;
        };
        parser.prototype._reduce_5 = function(val, result) {
          result = [val[0]];
          return result;
        };
        parser.prototype._reduce_6 = function(val, result) {
          result = val[0].concat([val[2]]);
          return result;
        };
        parser.prototype._reduce_12 = function(val, result) {
          result = ['if_mod', val[1], val[2], val[0]];
          return result;
        };
        parser.prototype._reduce_13 = function(val, result) {
          result = ['if_mod', val[1], val[2], val[0]];
          return result;
        };
        parser.prototype._reduce_19 = function(val, result) {
          result = ['assign', val[0], val[2]];
          return result;
        };
        parser.prototype._reduce_21 = function(val, result) {
          result = ['op_asgn', val[1], val[0], val[2]];
          return result;
        };
        parser.prototype._reduce_32 = function(val, result) {
          result = [val[1], val[0], val[2]];
          return result;
        };
        parser.prototype._reduce_33 = function(val, result) {
          result = [val[1], val[0], val[2]];
          return result;
        };
        parser.prototype._reduce_34 = function(val, result) {
          result = ['unary', '!', val[1]];
          return result;
        };
        parser.prototype._reduce_35 = function(val, result) {
          result = ['unary', '!', val[1]];
          return result;
        };
        parser.prototype._reduce_40 = function(val, result) {
          result = ['return', val[1]];
          return result;
        };
        parser.prototype._reduce_41 = function(val, result) {
          result = ['break', val[1]];
          return result;
        };
        parser.prototype._reduce_42 = function(val, result) {
          result = ['next', val[1]];
          return result;
        };
        parser.prototype._reduce_47 = function(val, result) {
          result = ['call', null, val[0], val[1]];
          return result;
        };
        parser.prototype._reduce_49 = function(val, result) {
          result = ['call', val[0], val[2], val[3]];
          return result;
        };
        parser.prototype._reduce_51 = function(val, result) {
          result = ['call', val[0], val[2], val[3]];
          return result;
        };
        parser.prototype._reduce_53 = function(val, result) {
          result = ['super', val[1]];
          return result;
        };
        parser.prototype._reduce_54 = function(val, result) {
          result = ['yield', val[1]];
          return result;
        };
        parser.prototype._reduce_78 = function(val, result) {
          result = ['aref', val[0], val[2]];
          return result;
        };
        parser.prototype._reduce_79 = function(val, result) {
          result = ['call', val[0], val[2], [[]]];
          return result;
        };
        parser.prototype._reduce_86 = function(val, result) {
          result = ['::', val[1]];
          return result;
        };
        parser.prototype._reduce_87 = function(val, result) {
          result = [null, val[0]];
          return result;
        };
        parser.prototype._reduce_88 = function(val, result) {
          result = [val[0], val[2]];
          return result;
        };
        parser.prototype._reduce_166 = function(val, result) {
          result = ['assign', val[0], val[2]];
          return result;
        };
        parser.prototype._reduce_168 = function(val, result) {
          result = ['op_asgn', val[1], val[0], val[2]];
          return result;
        };
        parser.prototype._reduce_176 = function(val, result) {
          result = ['range', val[1], val[0], val[2]];
          return result;
        };
        parser.prototype._reduce_177 = function(val, result) {
          result = ['range', val[1], val[0], val[2]];
          return result;
        };
        parser.prototype._reduce_178 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_179 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_180 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_181 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_182 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_183 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_186 = function(val, result) {
          result = ['call', val[1], '+@', [[]]];
          return result;
        };
        parser.prototype._reduce_187 = function(val, result) {
          result = ['call', val[1], '-@', [[]]];
          return result;
        };
        parser.prototype._reduce_188 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_189 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_190 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_191 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_192 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_193 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_194 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_195 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_196 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_197 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_198 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_199 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_200 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_201 = function(val, result) {
          result = ['call', val[1], val[0], [[]]];
          return result;
        };
        parser.prototype._reduce_202 = function(val, result) {
          result = ['call', val[1], val[0], [[]]];
          return result;
        };
        parser.prototype._reduce_203 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_204 = function(val, result) {
          result = ['call', val[0], val[1], [[val[2]]]];
          return result;
        };
        parser.prototype._reduce_205 = function(val, result) {
          result = ['and', val[0], val[2]];
          return result;
        };
        parser.prototype._reduce_206 = function(val, result) {
          result = ['or', val[0], val[2]];
          return result;
        };
        parser.prototype._reduce_208 = function(val, result) {
          result = ['ternary', val[0], val[2], val[4]];
          return result;
        };
        parser.prototype._reduce_211 = function(val, result) {
          result = [null, null];
          return result;
        };
        parser.prototype._reduce_213 = function(val, result) {
          result = [val[0], null];
          return result;
        };
        parser.prototype._reduce_214 = function(val, result) {
          result = [val[0], val[3]];
          return result;
        };
        parser.prototype._reduce_216 = function(val, result) {
          result = [null, val[1]];
          return result;
        };
        parser.prototype._reduce_217 = function(val, result) {
          result = [[]];
          return result;
        };
        parser.prototype._reduce_218 = function(val, result) {
          result = val[1];
          return result;
        };
        parser.prototype._reduce_221 = function(val, result) {
          result = [];
          return result;
        };
        parser.prototype._reduce_223 = function(val, result) {
          result = [[val[0]], null, null, null];
          return result;
        };
        parser.prototype._reduce_224 = function(val, result) {
          result = [val[0], null, null, val[1]];
          return result;
        };
        parser.prototype._reduce_225 = function(val, result) {
          result = [val[0], val[3], null, val[4]];
          return result;
        };
        parser.prototype._reduce_226 = function(val, result) {
          result = [null, null, val[0], val[1]];
          return result;
        };
        parser.prototype._reduce_227 = function(val, result) {
          result = [null, val[3], val[0], val[4]];
          return result;
        };
        parser.prototype._reduce_228 = function(val, result) {
          result = [val[0], null, val[2], val[3]];
          return result;
        };
        parser.prototype._reduce_229 = function(val, result) {
          result = [val[0], val[5], val[2], val[6]];
          return result;
        };
        parser.prototype._reduce_230 = function(val, result) {
          result = [null, val[1], null, val[2]];
          return result;
        };
        parser.prototype._reduce_231 = function(val, result) {
          result = [null, null, null, val[0]];
          return result;
        };
        parser.prototype._reduce_244 = function(val, result) {
          this.cmdarg_push(1);
          return result;
        };
        parser.prototype._reduce_245 = function(val, result) {
          this.cmdarg_pop(); result = val[1];
          return result;
        };
        parser.prototype._reduce_247 = function(val, result) {
          result = [[]];
          return result;
        };
        parser.prototype._reduce_248 = function(val, result) {
          result = val[1];
          return result;
        };
        parser.prototype._reduce_249 = function(val, result) {
          result = val[1];
          return result;
        };
        parser.prototype._reduce_250 = function(val, result) {
          result = val[1];
          return result;
        };
        parser.prototype._reduce_251 = function(val, result) {
          result = null;
          return result;
        };
        parser.prototype._reduce_252 = function(val, result) {
          result = [val[0]];
          return result;
        };
        parser.prototype._reduce_253 = function(val, result) {
          result = val[0].concat([val[2]]);
          return result;
        };
        parser.prototype._reduce_266 = function(val, result) {
          result = ['begin', val[1]];
          return result;
        };
        parser.prototype._reduce_268 = function(val, result) {
          result = ['paren', val[1]];
          return result;
        };
        parser.prototype._reduce_269 = function(val, result) {
          result = ['colon2', val[0], val[2]];
          return result;
        };
        parser.prototype._reduce_271 = function(val, result) {
          result = ['aref', val[0], val[2]];
          return result;
        };
        parser.prototype._reduce_272 = function(val, result) {
          result = ['array', val[1]];
          return result;
        };
        parser.prototype._reduce_273 = function(val, result) {
          result = ['hash', val[1]];
          return result;
        };
        parser.prototype._reduce_274 = function(val, result) {
          result = ['return', null];
          return result;
        };
        parser.prototype._reduce_275 = function(val, result) {
          result = ['yield', val[2]];
          return result;
        };
        parser.prototype._reduce_276 = function(val, result) {
          result = ['yield', [[]]];
          return result;
        };
        parser.prototype._reduce_277 = function(val, result) {
          result = ['yield', [[]]];
          return result;
        };
        parser.prototype._reduce_279 = function(val, result) {
          result = ['call', null, val[0], [[]], val[1]];
          return result;
        };
        parser.prototype._reduce_281 = function(val, result) {
          val[0][4] = val[1]; result = val[0];
          return result;
        };
        parser.prototype._reduce_282 = function(val, result) {
          result = ['if', val[1], val[3], val[4]];
          return result;
        };
        parser.prototype._reduce_283 = function(val, result) {
          result = ['unless', val[1], val[3], val[4]];
          return result;
        };
        parser.prototype._reduce_284 = function(val, result) {
          this.cond_push(1);
          return result;
        };
        parser.prototype._reduce_285 = function(val, result) {
          this.cond_pop();
          return result;
        };
        parser.prototype._reduce_286 = function(val, result) {
          result = ['while', val[0], val[2], val[5]];
          return result;
        };
        parser.prototype._reduce_287 = function(val, result) {
          this.cond_push(1);
          return result;
        };
        parser.prototype._reduce_288 = function(val, result) {
          this.cond_pop();
          return result;
        };
        parser.prototype._reduce_289 = function(val, result) {
          result = ['while', val[0], val[2], val[5]];
          return result;
        };
        parser.prototype._reduce_290 = function(val, result) {
          result = ['case', val[1], val[3]];
          return result;
        };
        parser.prototype._reduce_291 = function(val, result) {
          result = ['case', null, val[2]];
          return result;
        };
        parser.prototype._reduce_293 = function(val, result) {
          this.cond_push(1);
          return result;
        };
        parser.prototype._reduce_294 = function(val, result) {
          this.cond_pop();
          return result;
        };
        parser.prototype._reduce_296 = function(val, result) {
          result = ['class', val[1], val[2], val[3]];
          return result;
        };
        parser.prototype._reduce_297 = function(val, result) {
          result = ['class_shift', val[2], val[4]];
          return result;
        };
        parser.prototype._reduce_298 = function(val, result) {
          result = ['module', val[1], val[2]];
          return result;
        };
        parser.prototype._reduce_299 = function(val, result) {
          result = ['def', null, val[1], val[2], val[3]];
          return result;
        };
        parser.prototype._reduce_300 = function(val, result) {
          result =                                 ['def', val[1], val[3], val[4], val[5]];
          return result;
        };
        parser.prototype._reduce_301 = function(val, result) {
          result = ['break', null];
          return result;
        };
        parser.prototype._reduce_302 = function(val, result) {
          result = ['next', null];
          return result;
        };
        parser.prototype._reduce_313 = function(val, result) {
          result = val[0];
          return result;
        };
        parser.prototype._reduce_314 = function(val, result) {
          result =                         [['elsif', val[1], val[3]]].concat(val[4]);
          return result;
        };
        parser.prototype._reduce_315 = function(val, result) {
          result = [];
          return result;
        };
        parser.prototype._reduce_316 = function(val, result) {
          result = [['else', val[1]]];
          return result;
        };
        parser.prototype._reduce_317 = function(val, result) {
          result = [val[0], null];
          return result;
        };
        parser.prototype._reduce_318 = function(val, result) {
          result = [val[0], val[2], val[4], val[5]];
          return result;
        };
        parser.prototype._reduce_319 = function(val, result) {
          result = [val[0], val[2], null, val[3]];
          return result;
        };
        parser.prototype._reduce_320 = function(val, result) {
          result = [val[0], null, val[2], val[3]];
          return result;
        };
        parser.prototype._reduce_321 = function(val, result) {
          result = [val[0], null, null, val[1]];
          return result;
        };
        parser.prototype._reduce_322 = function(val, result) {
          result = [[], val[0], val[2], val[3]];
          return result;
        };
        parser.prototype._reduce_323 = function(val, result) {
          result = [[], val[0], null, val[1]];
          return result;
        };
        parser.prototype._reduce_324 = function(val, result) {
          result = [[], null, val[0], val[1]];
          return result;
        };
        parser.prototype._reduce_325 = function(val, result) {
          result = [[], null, null, val[0]];
          return result;
        };
        parser.prototype._reduce_326 = function(val, result) {
          result = [val[0]];
          return result;
        };
        parser.prototype._reduce_327 = function(val, result) {
          result = val[0].concat([val[2]]);
          return result;
        };
        parser.prototype._reduce_328 = function(val, result) {
          result = [val[0], val[2]];
          return result;
        };
        parser.prototype._reduce_329 = function(val, result) {
          result = null;
          return result;
        };
        parser.prototype._reduce_330 = function(val, result) {
          result = null;
          return result;
        };
        parser.prototype._reduce_331 = function(val, result) {
          result = null;
          return result;
        };
        parser.prototype._reduce_332 = function(val, result) {
          result = val[1];
          return result;
        };
        parser.prototype._reduce_333 = function(val, result) {
          
          return result;
        };
        parser.prototype._reduce_334 = function(val, result) {
          result = [val[2], val[3]];
          return result;
        };
        parser.prototype._reduce_335 = function(val, result) {
          val[0][4] = val[1]; result = val[0];
          return result;
        };
        parser.prototype._reduce_338 = function(val, result) {
          result = ['call', null, val[0], val[1]];
          return result;
        };
        parser.prototype._reduce_339 = function(val, result) {
          result = ['call', val[0], val[2], val[3]];
          return result;
        };
        parser.prototype._reduce_342 = function(val, result) {
          result = ['super', val[1]];
          return result;
        };
        parser.prototype._reduce_343 = function(val, result) {
          result = ['super', [[]]];
          return result;
        };
        parser.prototype._reduce_344 = function(val, result) {
          result = [val[1], val[2]];
          return result;
        };
        parser.prototype._reduce_345 = function(val, result) {
          result = [val[1], val[2]];
          return result;
        };
        parser.prototype._reduce_346 = function(val, result) {
          result = [['when', val[1], val[3]]].concat(val[4]);
          return result;
        };
        parser.prototype._reduce_347 = function(val, result) {
          result = val[0];
          return result;
        };
        parser.prototype._reduce_348 = function(val, result) {
          result = val[0];
          return result;
        };
        parser.prototype._reduce_349 = function(val, result) {
          result = [];
          return result;
        };
        parser.prototype._reduce_352 = function(val, result) {
          result =                         [['rescue', val[1], val[2], val[4]]].concat(val[5]);
          return result;
        };
        parser.prototype._reduce_353 = function(val, result) {
          result = [];
          return result;
        };
        parser.prototype._reduce_357 = function(val, result) {
          result = val[1];
          return result;
        };
        parser.prototype._reduce_358 = function(val, result) {
          result = null;
          return result;
        };
        parser.prototype._reduce_367 = function(val, result) {
          result = ['string', val[1], val[2]];
          return result;
        };
        parser.prototype._reduce_369 = function(val, result) {
          result = ['xstring', val[1]];
          return result;
        };
        parser.prototype._reduce_370 = function(val, result) {
          result = ['regexp', val[1], val[2]];
          return result;
        };
        parser.prototype._reduce_381 = function(val, result) {
          result = [];
          return result;
        };
        parser.prototype._reduce_382 = function(val, result) {
          result = val[0].concat([val[1]]);
          return result;
        };
        parser.prototype._reduce_383 = function(val, result) {
          result = [];
          return result;
        };
        parser.prototype._reduce_384 = function(val, result) {
          result = val[0].concat([val[1]]);
          return result;
        };
        parser.prototype._reduce_385 = function(val, result) {
          result = ['string_content', val[0]];
          return result;
        };
        parser.prototype._reduce_386 = function(val, result) {
          result = ['string_dvar', val[1]];
          return result;
        };
        parser.prototype._reduce_387 = function(val, result) {
          this.cond_push(0); this.cmdarg_push(0);
          return result;
        };
        parser.prototype._reduce_388 = function(val, result) {
          this.cond_lexpop(); this.cmdarg_lexpop();                        result = ['string_dbegin', val[2]];
          return result;
        };
        parser.prototype._reduce_393 = function(val, result) {
          result = ['symbol', val[1]];
          return result;
        };
        parser.prototype._reduce_399 = function(val, result) {
          result = ['dsym', val[1]];
          return result;
        };
        parser.prototype._reduce_400 = function(val, result) {
          result = ['numeric', val[0]];
          return result;
        };
        parser.prototype._reduce_401 = function(val, result) {
          result = ['numeric', val[0]];
          return result;
        };
        parser.prototype._reduce_404 = function(val, result) {
          result = ['identifier', val[0]];
          return result;
        };
        parser.prototype._reduce_405 = function(val, result) {
          result = ['ivar', val[0]];
          return result;
        };
        parser.prototype._reduce_406 = function(val, result) {
          result = ['gvar', val[0]];
          return result;
        };
        parser.prototype._reduce_407 = function(val, result) {
          result = ['constant', val[0]];
          return result;
        };
        parser.prototype._reduce_408 = function(val, result) {
          result = ['cvar', val[0]];
          return result;
        };
        parser.prototype._reduce_409 = function(val, result) {
          result = ['nil'];
          return result;
        };
        parser.prototype._reduce_410 = function(val, result) {
          result = ['self'];
          return result;
        };
        parser.prototype._reduce_411 = function(val, result) {
          result = ['true'];
          return result;
        };
        parser.prototype._reduce_412 = function(val, result) {
          result = ['false'];
          return result;
        };
        parser.prototype._reduce_413 = function(val, result) {
          result = ['file'];
          return result;
        };
        parser.prototype._reduce_414 = function(val, result) {
          result = ['line'];
          return result;
        };
        parser.prototype._reduce_415 = function(val, result) {
          result = ['block_given'];
          return result;
        };
        parser.prototype._reduce_420 = function(val, result) {
          result = null;
          return result;
        };
        parser.prototype._reduce_421 = function(val, result) {
          result = val[1];
          return result;
        };
        parser.prototype._reduce_422 = function(val, result) {
          result = null;
          return result;
        };
        parser.prototype._reduce_423 = function(val, result) {
          result = val[1];
          return result;
        };
        parser.prototype._reduce_424 = function(val, result) {
          result = val[0];
          return result;
        };
        parser.prototype._reduce_425 = function(val, result) {
          result = [val[0], val[2], val[4], val[5]];
          return result;
        };
        parser.prototype._reduce_426 = function(val, result) {
          result = [val[0], val[2], null, val[3]];
          return result;
        };
        parser.prototype._reduce_427 = function(val, result) {
          result = [val[0], [], val[2], val[3]];
          return result;
        };
        parser.prototype._reduce_428 = function(val, result) {
          result = [val[0], [], null, val[1]];
          return result;
        };
        parser.prototype._reduce_429 = function(val, result) {
          result = [[], val[0], val[2], val[3]];
          return result;
        };
        parser.prototype._reduce_430 = function(val, result) {
          result = [[], val[0], null, val[1]];
          return result;
        };
        parser.prototype._reduce_431 = function(val, result) {
          result = [[], [], val[0], val[1]];
          return result;
        };
        parser.prototype._reduce_432 = function(val, result) {
          result = [[], [], null, val[0]];
          return result;
        };
        parser.prototype._reduce_433 = function(val, result) {
          result = [[], [], null, null];
          return result;
        };
        parser.prototype._reduce_434 = function(val, result) {
          this.yyerror(                        'formal argument cannot be a constant');
          return result;
        };
        parser.prototype._reduce_435 = function(val, result) {
          this.yyerror(                        'formal argument cannot be an instance variable');
          return result;
        };
        parser.prototype._reduce_436 = function(val, result) {
          this.yyerror(                        'formal argument cannot be a class variable');
          return result;
        };
        parser.prototype._reduce_437 = function(val, result) {
          this.yyerror(                        'formal argument cannot be a global variable');
          return result;
        };
        parser.prototype._reduce_439 = function(val, result) {
          result = [val[0]];
          return result;
        };
        parser.prototype._reduce_440 = function(val, result) {
          result = val[0].concat([val[2]]);
          return result;
        };
        parser.prototype._reduce_441 = function(val, result) {
          result = [val[0], val[2]];
          return result;
        };
        parser.prototype._reduce_442 = function(val, result) {
          result = [val[0]];
          return result;
        };
        parser.prototype._reduce_443 = function(val, result) {
          result = val[0].concat([val[2]]);
          return result;
        };
        parser.prototype._reduce_446 = function(val, result) {
          result = val[1];
          return result;
        };
        parser.prototype._reduce_447 = function(val, result) {
          result = '__unamed_splat__';
          return result;
        };
        parser.prototype._reduce_450 = function(val, result) {
          result = val[1];
          return result;
        };
        parser.prototype._reduce_451 = function(val, result) {
          result = val[1];
          return result;
        };
        parser.prototype._reduce_452 = function(val, result) {
          result = null;
          return result;
        };
        parser.prototype._reduce_453 = function(val, result) {
          result = val[0];
          return result;
        };
        parser.prototype._reduce_454 = function(val, result) {
          result = val[1];
          return result;
        };
        parser.prototype._reduce_455 = function(val, result) {
          result = [];
          return result;
        };
        parser.prototype._reduce_456 = function(val, result) {
          result = val[0];
          return result;
        };
        parser.prototype._reduce_457 = function(val, result) {
          this.yyerror('unsupported assoc list type');
          return result;
        };
        parser.prototype._reduce_458 = function(val, result) {
          result = [val[0]];
          return result;
        };
        parser.prototype._reduce_459 = function(val, result) {
          result = val[0].concat([val[2]]);
          return result;
        };
        parser.prototype._reduce_460 = function(val, result) {
          result = [val[0], val[2]];
          return result;
        };
   return parser;
      })();
      
      if (typeof require !== 'undefined' && typeof module !== 'undefined') {
        exports.RubyParser = RubyParser;
      }
    

};
modules["./string_scanner"] = function(exports, module) {
var StringScanner = function(str) {
    this._str = str;
    this._at = 0;
    this.matched = "";
    return this._workingString = str;
};
StringScanner.prototype.scan = function(reg) {
    var res;
    res = reg.exec(this._workingString);
    if (res === null) {
        this.matched = "";
        return false;
    } else if (typeof res === "object") {
        this._at += res[0].length;
        this._workingString = this._workingString.substr(res[0].length);
        this.matched = res[0];
        return res;
    } else if (typeof res === "string") {
        this._at += res.length;
        this._workingString = this._workingString.substr(res.length);
        return res;
    } else {
        return false;
    };
};

StringScanner.prototype.check = function(reg) {
    return reg.exec(this._workingString);
};
StringScanner.prototype.peek = function(len) {
    return this._workingString.substr(0, len);
};

exports.StringScanner = StringScanner;

};
modules["./generator"] = function(exports, module) {

var RubyGenerator = function(tree, options) {
  this._tree = tree;
  // print(tree.constructor);
};

var BaseIseq = function() {
  this.initialize();
  return this;
};

BaseIseq.prototype = {
  initialize: function() {
    this.code = "";
    // all our temps go into locals as well....
    this.locals = [];
    this.args = [];
    
    this.norm_args = [];
    this.opt_args = [];
    this.opt_args_stmt = [];
    this.rest_args = null;
    this.block_arg = '__block__';
    // tmp stuff
    this.temp_current = 'a';
    this.temp_queue = [];


    this.using_method_ids = [];
    
    this.ensure_ivars = [];
    
    this._ensure_return = false;
  },
  
  SELF: 'self',
  NIL: 'nil',
  
  push_code: function(code) {
    this.code = code;
  },
  
  join: function() {
    var res = [];
    res.push('function(require, exports, module) {\n');
    res.push('var self = rb_top_self;\n');
    // res.push('function(self, __FILE__, require) {\n');
    // res.push('function(require, exports, module, self, __FILE__) {\n');
    
    // inner code
    this.join_variables(res);
    this.join_inner(res);
    // end inner code
    
    res.push('}');
    return res.join('');
  },
  
  join_variables: function(res) {
    //res.push('var ' + this.NIL + ' = Qnil;\n');

    for (var i = 0; i < this.ensure_ivars.length; i++) {
      res.push('if (' + this.SELF + '["' + this.ensure_ivars[i] + '"] === undefined) ' + this.SELF + '["' + this.ensure_ivars[i] + '"] = ' + this.NIL + ';\n');
    }
    if (this.locals.length > 0) {
      res.push('var ');
      res.push(this.locals.join(', '));
      res.push(';\n');
    }
  },
  
  join_inner: function(res) {
    res.push(this.code);
  },
  
  // ensures an ivar is not null or undefined at top of current iseq
  ensure_ivar: function(name) {
    if (this.ensure_ivars.indexOf(name) == -1)
      this.ensure_ivars.push(name);
  },
  
  // this iseq has a return, so if we are a block find our parent def, or if we
  // are a def, we need to makr our selves to handle return (which is a throw)
  ensure_return: function() {
    var iseq = this;
    
    while (iseq && iseq instanceof BlockIseq) {
      iseq = iseq.parent_iseq;
    }
    
    if (iseq instanceof DefIseq) {
      // print("found ensure iseq def");
      iseq._ensure_return = true;
      // make sure we handle errors
      iseq._handle_errors = true;
    }
    else {
      // error? or just leave generated code to find it..
    }
  },
  
  // return out of a while loop
  ensure_loop_return: function() {
    this._ensure_loop_return = true;
    this._handle_errors = true;
  },
  
  // return out of a block/iter - we need to pass error up to our outer def ..if
  // it exists..
  ensure_block_return: function() {
    var iseq = this;
    
    while (iseq && iseq instanceof BlockIseq) {
      iseq = iseq.parent_iseq;
    }
    
    if (iseq instanceof DefIseq) {
      // print("found ensure iseq def");
      iseq._ensure_block_return = true;
      // make sure we handle errors
      iseq._handle_errors = true;
    }
    else {
      // error? or just leave generated code to find it..
    }
  },
  
  // similar to above, but .....?
  ensure_return: function() {
    var iseq = this;
    
    while (iseq && iseq instanceof BlockIseq) {
      iseq = iseq.parent_iseq;
    }
    
    if (iseq instanceof DefIseq) {
      // print("found ensure iseq def");
      iseq._ensure_return = true;
      // make sure we handle errors
      iseq._handle_errors = true;
    }
    else {
      // error? or just leave generated code to find it..
    }
  },
  
  // write: function(str) {
    // this.code.push(str);
  // },
  
  temp_local: function() {
    if (this.temp_queue.length) {
      return this.temp_queue.pop();
    }
    var name = '__' + this.temp_current;
    this.locals.push(name);
    this.temp_current = String.fromCharCode(this.temp_current.charCodeAt(0) + 1);
    return name;
  },
  
  queue_temp: function(temp) {
    this.temp_queue.push(temp);
  },
  
  lookup_local: function(str) {
    if (this.locals.indexOf(str) !== -1) {
      return str;
    }
    else if (this.args.indexOf(str) !== -1) {
      return str;
    }
    else if (this.parent_iseq && this instanceof BlockIseq) {
      // print("looking up: "  + str);
      return this.parent_iseq.lookup_local(str);
    }
    return null;
  },

  use_method_id: function(id) {
    if (this.parent_iseq) return this.parent_iseq.use_method_id(id);
    
    if (this.using_method_ids && (this.using_method_ids.indexOf(id) == -1)) {
      this.using_method_ids.push(id);
    }
  },
  
  push_local: function(str) {
    this.locals.push(str);
    return str;
  }
};


var MainIseq = (function() {
  var ctor = function() {};
  ctor.prototype = BaseIseq.prototype;
  var result = function() { this.initialize(); return this; };
  result.prototype = new ctor();
  return result;
})();

MainIseq.prototype.join = function() {
  var res = [];
  
  // FIXME really we should only add these VM shortcuts to files that actually 
  // use them. Minimizers will remove them, but non minimized code gets filled 
  // up quickly with non used methods. 
  res.push('\nvar Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, ');
  res.push('nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, ');
  res.push('$range = Opal.G, $block = Opal.P;\n');
 
 
  // method ids
  res.push('Opal.mm([');
  for (var i = 0; i < this.using_method_ids.length; i++) {
    if (i > 0) res.push(', ');
    res.push("'" + this.using_method_ids[i] + "'");
  }
  res.push(']);\n');



  // inner code

  this.join_variables(res);
  res.push('return ');
  this.join_inner(res);
  res.push(';');
  // end inner code

  return '(function(undefined) {' + res.join('') + '})();';
};

var TempIseq = (function() {
  var ctor = function() {};
  ctor.prototype = BaseIseq.prototype;
  var result = function() { this.initialize(); return this; };
  result.prototype = new ctor();
  return result;
})();

TempIseq.prototype.join = function() {
  return this.code.join("");
};

var DefIseq = (function() {
  var ctor = function() {};
  ctor.prototype = BaseIseq.prototype;
  var result = function() { this.initialize(); return this; };
  result.prototype = new ctor();
  return result;
})();

DefIseq.prototype.uses_block = function() {
  this._uses_block = true;
};

DefIseq.prototype.push_arg = function(name) {
  this.args.push(name);
  this.norm_args.push(name);
  return name;
};

DefIseq.prototype.push_rest_arg = function(name) {
  this.args.push(name);
  this.rest_args = name;
  return name;
};

DefIseq.prototype.push_opt_arg = function(name, stmt) {
  this.args.push(name);
  this.opt_args.push(name);
  this.opt_args_stmt.push(stmt);
  return name;
};

DefIseq.prototype.push_block_arg = function(name) {
  this.args.push(name);
  this.block_arg = name;
	this.__uses_block__ = true;
  return name;
};

DefIseq.prototype.join = function() {
  var res = [];
  res.push('function(');
  this.method_args(res);
  this.join_variables(res);
  this.method_fixing(res);
  this.join_inner(res);
  res.push('}');
  return res.join('');
};

DefIseq.prototype.method_args = function(res) {
  var norm = this.norm_args.length,
      opt  = this.opt_args.length,
      rest = this.rest_args,
      done_arg = false;      
  // always need a self reference
  res.push(this.SELF);
  
  // method id reference
  //res.push(', $mid');
  
  // norm
  for (var i = 0; i < norm; i++) {
  //  if (done_arg) res.push(', ');
    //done_arg = true;
    res.push(', ' + this.norm_args[i]);
  }
  // opt
  for (var i = 0; i < opt; i++) {
    //if (done_arg) res.push(', ');
    //done_arg = true;
    res.push( ', ' + this.opt_args[i]);
  }
  // rest
  if (rest) {
    //if (done_arg) res.push(', ');
    //done_arg = true;
    res.push(', ' + rest);
  }
  // end args
  res.push(') {\n');
};

DefIseq.prototype.method_fixing = function(res) {
  var norm = this.norm_args.length,
      opt  = this.opt_args.length,
      rest = this.rest_args;
  
  // handle opt args
  for (var i = 0; i < opt; i++) {
    res.push('if (' + this.opt_args[i] + ' === undefined) ' + this.opt_args[i] + ' = ' + this.opt_args_stmt[i] + ';\n');
    // res.push(this.opt_args[i]);
  }
  // handle rest args
  if (rest) {
    var rest_offset = norm + opt + 1; // should take into account opt.. we add one to skip self
    res.push(rest + ' = Array.prototype.slice.call(arguments, ' + rest_offset + ');\n');
  }

	// block. if we got/has/used a block, then lets set it/create it here.
	if (this.__uses_block__) {
		res.push('var '+ this.block_arg + ' = ($block.f == arguments.callee)');
		res.push('? $block.p : nil;');
		res.push('$block.p = $block.f = nil;');
	}
};

var BlockIseq = (function() {
  var ctor = function() {};
  ctor.prototype = DefIseq.prototype;
  var result = function() { this.initialize(); return this; };
  result.prototype = new ctor();
  return result;
})();

var ClassIseq = (function() {
  var ctor = function() {};
  ctor.prototype = BaseIseq.prototype;
  var result = function() { this.initialize(); return this; };
  result.prototype = new ctor();
  return result;
})();

ClassIseq.prototype.join = function() {
  var res = [];
  res.push('function(self) {\n');
  this.join_inner(res);
  res.push('}');
  return res.join('');
};


RubyGenerator.prototype = {
  // constn
  SELF: 'self',
  NIL: 'nil',
  
  // clear the generator ready for action
  clear: function() {
    this.iseq_current = null;
    this.iseq_stack = [];
    this._dependencies = [];
  },
  
  // push new iseq onto stack
  push_iseq: function(klass) {
    var iseq = new klass();
    var cur = this.iseq_current;
    if (cur) iseq.parent_iseq = cur;
    this.iseq_stack.push(iseq);
    this.iseq_current = iseq;
    return iseq;
  },
  
  // pop iseq, this will return a join of the strings
  pop_iseq: function() {
    var iseq = this.iseq_current;
    this.iseq_stack.pop();
    this.iseq_current = this.iseq_stack[this.iseq_stack.length - 1];
    // print(iseq);
    return iseq.join();
  },
  
  // main generate..
  generate_top_context: function() {
    this.clear();
    return [this.generate_top(this._tree), this._dependencies];
  },
  
  generate_main_context: function() {
    this.clear();
    return [this.generate_main(this._tree), this._dependencies];
  },
  
  generate: function(iseq, options) {
    // print(iseq);
    // print(iseq);
    var name = iseq[0];
    if (this['generate_' + name]) {
      // print('doing ' + name + ': ' + iseq.join(','));
      var res = this['generate_' + name](iseq, {});
      // print('-- done ' + name);
      return res;
    }
    
    print("Unknwon iseq type: " + iseq + " (" + iseq[0] + ")");
    throw "Unknwon iseq type: " + iseq;
  },
  
  mid_to_jsid: function(id) {
    // '$' is not needed!?
    //id = '$' + id;
    
    if(/[\!\=\?\+\-\*\/\^\&\%\@\|\[\]\<\>\~]/.exec(id)) {
      return '["' + id + '"]';
    }
    return '.' + id;
  },

  // Generate some top level statements - this will clear everything else
  generate_top: function(stmt, options) {
    this.push_iseq(BaseIseq);
    // print(stmt);
    // for (var i = 0; i < stmt[1].length; i++) {
      // this.generate(stmt[1][i], { full: true, last:(stmt[1].length - 1 == i) });
      
    // }
    this.iseq_current.push_code(this.generate_compstmt(stmt[1], ';'));
    return this.pop_iseq();
  },

  // Generate some main statement - usually in a REPL scenario
  generate_main: function(stmt, options) {
    this.push_iseq(MainIseq);
    this.iseq_current.push_code(this.generate_compstmt(stmt[1], ';'));
    return this.pop_iseq();
  },
  
  generate_numeric: function(stmt) {
    return stmt[1];
  },
  
  generate_self: function(stmt) {
    return this.SELF;
  },
  
  generate_nil: function(stmt) {
    return this.NIL;
  },
  
  generate_true: function(stmt) {
    return 'Qtrue';
  },
  
  generate_false: function(stmt) {
    return 'Qfalse';
  },
  
  generate_compstmt: function(stmt, split) {
    var s, res = [];
      
    if (stmt.length == 0) {
      return '(' + this.NIL + ')';
    }
      
    for (var i = 0; i < stmt.length; i++) {
      res.push(this.generate(stmt[i]));
    }
    return '(' + res.join(', ') + ')';
  },
  
  // like above but bodystmts
  // 
  // ['bodystmt', compstmt, operescue, optelse, optensure]
  generate_bodystmt: function(stmt) {
    var s = stmt[1][1];
    
    if (s.length == 1 && s[0][0] == 'xstring') {
      return this.generate(s[0]);
    }
    // if (s.length == 1)
      // print(s[0]);
    
    return 'return ' + this.generate_compstmt(stmt[1][1]) + ';';
  },
  
  // stmt:
  //  ['call', recv, meth, args, block]
  // args:
  //  [norm, opt, rest, block]
  generate_call: function(stmt) {
    var pre = [];
    // all args (inc self, block)
    var arg_res = [];

    var done_arg = false;
		// recv
		var recv = "";
			
    if (stmt[1]) { // recv

        this.iseq_current.use_method_id(stmt[2]);

        var tmp_recv = this.iseq_current.temp_local();
        pre.push('(' + tmp_recv + ' = ' + this.generate(stmt[1]));
        

        // block support
        if (stmt[4]) {
          pre.push(', ($block.p = ' + this.generate_block(stmt[4]) + ').$self = ' + this.SELF + ', ');
          pre.push('$block.f = ' + tmp_recv + '.$m' + this.mid_to_jsid(stmt[2]) + ')');
        } 
        // &to_proc
        else if (stmt[3][3]) {
          // &to_proc MUST NOT redefine the $self for the proc
          pre.push(', ($block.p = ' + this.generate(stmt[3][3]) + '), ');
          pre.push('$block.f = ' + tmp_recv + '.$m' + this.mid_to_jsid(stmt[2]) + ')');
        }
        // no block
        else {
          pre.push(')' + '.$m' + this.mid_to_jsid(stmt[2]));
        }

        //pre.push(tmp_recv + '.$m' + this.mid_to_jsid(stmt[2]) + ')');
        arg_res.push(tmp_recv);
        this.iseq_current.queue_temp(tmp_recv);

			} else { // no recv
        //this.iseq_current.use_method_id(stmt[1]);
        this.iseq_current.use_method_id(stmt[2]);

        // block support
        if (stmt[4]) {
          pre.push('(($block.p = ' + this.generate_block(stmt[4]) + ').$self = ' + this.SELF + ', ');
          pre.push('$block.f = ' + this.SELF + '.$m' + this.mid_to_jsid(stmt[2]) + ')');
        }
        // &to_proc
        else if (stmt[3][3]) {
          // &to_proc MUST NOT reassign $self
          pre.push('($block.p = ' + this.generate(stmt[3][3]) + ', ');
          pre.push('$block.f = ' + this.SELF + '.$m' + this.mid_to_jsid(stmt[2]) + ')');
        }
        else {
          pre.push(this.SELF + '.$m' + this.mid_to_jsid(stmt[2]));
        }
        arg_res.push(this.SELF);
      }
		//}  
    
    var arg, args = stmt[3][0];
    // norm args
    if (args && args.length > 0) {
      for (var i = 0; i < args.length; i++) {
        arg_res.push(this.generate(args[i]));
      }
    }
    // hash/assocs arg
    args = stmt[3][2];
    if (args) {
      var hash_res = [];
      hash_res.push('opalhash(');
      for (var i = 0; i < args.length; i++) {
        if (i > 0) hash_res.push(', ');
        hash_res.push(this.generate(args[i][0]) + ', ' + this.generate(args[i][1]));
      }
      arg_res.push(hash_res.join('') + ')');
    }
    
    // if splat.. we concat splat args into array of normal args, then need to
    // apply() them to recv using recv (optional, but nothing else needs to be
    // used)
    if (stmt[3][1]) {
      var pre_splat_arg = '[' + arg_res.join("") + ']';
      pre.push('.apply(' + this.NIL + ', ' + pre_splat_arg);
      pre.push('.concat(' + this.generate(stmt[3][1]) + '))');
      return pre.join('');
    }
    // normal..
    else {  
      pre.push('(' + arg_res.join(', ') + ')');
      return pre.join('');
    }
  },
  
  // ['method_call', callable, args, block]
  generate_method_call: function(stmt, o) {
    stmt[1][3] = stmt[2];
    stmt[1][4] = stmt[3];
    // print(stmt[2]);
    return this.generate(stmt[1], o);
  },
  
  // ['brace_cell', method_call, braceblock]
  generate_brace_call: function(stmt, o) {
    stmt[1][3] = stmt[2];
    return this.generate(stmt[1], o);
  },
  
  // special generate block
  // ['blockvar', compstmts] 
  generate_block: function(stmt, o) {
    this.push_iseq(BlockIseq);
    
    if (stmt[0] && stmt[0][0]) {
      var args = stmt[0][0];
      
      for (var i = 0; i < args[0].length; i++) {
        this.iseq_current.push_arg(args[0][i]);
      }
    }
    
    // opt arg
    if (stmt[0] && stmt[0][1]) {
    for (var i = 0; i < stmt[0][1].length; i++) {
      // print(stmt[3][1][i]);
      var gen_opt_iseq = this.generate(stmt[0][1][i][1]);
      this.iseq_current.push_opt_arg(stmt[0][1][i][0], gen_opt_iseq);
    }
  }
    
    // rest arg
    if (stmt[0] && stmt[0][0]) {
    if (stmt[0][0][2]) {
      // print("pushing rest arg: " + stmt[0][0][2]);
      this.iseq_current.push_rest_arg(stmt[0][0][2]);
    }
  }
    
    // block arg
    if (stmt[0] && stmt[0][3]) {
    if (stmt[0][3]) {
      // print("Block arf: " + stmt[3][3]);
      this.iseq_current.push_block_arg(stmt[0][3]);
    }
  }
    // var args = stmt[3];
    
    // var stmts = stmt[1];
    // for (var i = 0; i < stmt[3][0].length; i++) {
      // this.iseq_current.push_arg(stmt[3][0][i]);
    // }
    
    this.iseq_current.push_code('return ' + this.generate_compstmt(stmt[1][1]) + ';');
    // this.write(this.generate_compstmt(stmt[1][1], ';'));
    
    var result = this.pop_iseq();
    
    // this.write(result);
    return result;
  },
  
  // ['identifier', name]
  generate_identifier: function(stmt, o) {
    var local = this.iseq_current.lookup_local(stmt[1]);

    if (local) {
      return local;
    } else {
      //return '(' + this.SELF + '.$m' + this.mid_to_jsid(stmt[1]) + ' || ' + this.SELF + '.$M("' + stmt[1] + '"))(' + this.SELF + ')';
      
      this.iseq_current.use_method_id(stmt[1]);
      return this.SELF + '.$m' + this.mid_to_jsid(stmt[1]) + '(' + this.SELF + ')';
    }


          
      //return this.SELF + this.mid_to_jsid(stmt[1]) + '()';
      //return '(' + this.SELF + '.$m' + this.mid_to_jsid(stmt[1]) + ' || ' + 'rb_vm_meth_m)(' + this.SELF + ', "' + stmt[1] + '")';
      // return this.SELF + this.mid_to_jsid(stmt[1]) + '(' + this.NIL + ')';
  },
  
  generate_constant: function(stmt, o) {
    // if (o.full && o.last) this.write('return ');
    // this.write(this.SELF + '.cg("' + stmt[1] + '")');
    // if (o.full) this.write(';\n');
    //return 'rb_vm_cg(' + this.SELF + ', "' + stmt[1] + '")';
    //return this.SELF + '.$cg("' + stmt[1] + '")';
    return 'rb_vm_cg(' + this.SELF + ', "' + stmt[1] + '")';
  },

  generate_ivar: function(stmt, o) {
    this.iseq_current.ensure_ivar(stmt[1]);
    return this.SELF + '["' + stmt[1] + '"]';
  },
  
  // ['assign', lhs, rhs]
  generate_assign: function(stmt, o) {
    var type  = stmt[1][0];
    var res = [];
    
    if (type == 'identifier') {
      if (!(local = this.iseq_current.lookup_local(stmt[1][1]))) {
        local = this.iseq_current.push_local(stmt[1][1]);
      }
      return local + ' = ' + this.generate(stmt[2]);
    }
    else if (type == 'ivar') {
      return (this.SELF + '["' + stmt[1][1] + '"] = ' + this.generate(stmt[2]));
    }
    else if (type == 'constant') {
      
      res.push('rb_vm_cs(' + this.SELF + ', "');
      res.push(stmt[1][1]);
      res.push('", ');
      res.push(this.generate(stmt[2]));
      res.push(')');
      return res.join("");
    }
    // a.b = c
    else if (type == 'call') {
      var tmp_assign = this.iseq_current.temp_local();
      res.push('((' + tmp_assign + ' = ' + this.generate(stmt[1][1]));
      res.push('), ' + tmp_assign + '.$m');
      res.push(this.mid_to_jsid(stmt[1][2] + '='));
       res.push(' || ' + tmp_assign + '.$M("' + stmt[1][2] + '=' + '"');
      //res.push(' || rb_vm_meth_m');//'("' + stmt[1][2] + '=' + '"');
      res.push('))(');
      // recv
      res.push(tmp_assign + ', ');
      //res.push('"' + stmt[1][2] + '=", ' + this.generate(stmt[2]));
      res.push(this.generate(stmt[2]));
      res.push(')');
      this.iseq_current.queue_temp(tmp_assign);
      return res.join("");

      //res.push(this.generate(stmt[1][1]) + this.mid_to_jsid(stmt[1][2] + '='));
      //res.push('(' + this.generate(stmt[2]) + ')');
      //return res.join('');
      
      //var tmp_assign = this.iseq_current.temp_local();
    }
    else if (type == 'aref'){
      return this.generate_aset(stmt[1], stmt[2]);
    }
    else if (type == 'gvar') {
      return "rb_vm_gs('" + stmt[1][1].replace('\\', '\\\\')  + "', " + this.generate(stmt[2]) + ")";
    }
    else {
      throw "Bad lhs: " + type;
    }
  },
  
  // ['op_asgn', op, lhs, rhs]
  generate_op_asgn: function(stmt, o) {
    var new_left = stmt[2];
    if (stmt[1] == '||') {
      var new_right = ['assign', stmt[2], stmt[3]];
      var assign = ['or', new_left, new_right];
    }
    else if (stmt[1] == '&&') {
      var new_right = ['assign', stmt[2], stmt[3]];
      var assign = ['and', new_left, new_right];
    }
    else if (['+', '-', '*', '/'].indexOf(stmt[1]) != -1) {
      var new_right = ['call', stmt[2], stmt[1], [[stmt[3]]]];
      var assign = ['assign', new_left, new_right];
    }
    else {
      print( "op asgn, bad OP");
      throw "op asgn, bad OP"
    }
    return this.generate(assign);
  },
  
  // kind of a fake node.. here we can pass a raw string to anythign else that
  // can use this to egnerate something. assign uses this a lot
  generate_temp_local: function(stmt) {
    return stmt[1]
  },
  
  // [massign, lhs, rhs]
  // lhs is an array 
  // idx 0 - array of mitems (variables, ivars etc) or null if there are none
  // idx 1 - the star items (all remaining args from rhs). null if none, or a
  // mitem if one exists. it may be an empty string to signigy no name was given
  // so we just retrieve it in tmp variable, and do nothing with it...
  generate_masgn: function(stmt) {
    var result = [];
    // rhs, which will be an array. fixme, need to ensure! (might be single arg)
    var tmp_rhs = this.iseq_current.temp_local();
    
    var rhs = stmt[2][0] == 'mrhs' ? this.generate(stmt[2]) : '[' + this.generate(stmt[2]) + ']';
    
    // rhs length.. so we know how many vars we are dealing with
    var tmp_rhs_len = this.iseq_current.temp_local();
    // tmp idx of where we are
    var tmp_idx = this.iseq_current.temp_local();
    // start splat at..
    var splat_start = 0;
    
    result.push('(' + tmp_rhs + ' = ' + rhs + ', ');
    result.push(tmp_rhs_len + ' = ' + tmp_rhs + '.length');
    
    // norm mitems
    if (stmt[1][0]) {
      // amend splat start
      splat_start = stmt[1][0].length;
      
      for (var i = 0; i < stmt[1][0].length; i++) {
        result.push(', (' + tmp_idx + ' = ' + i + ', ');
        // if our idx is less than our total count, then we can assign next, 
        // otherwise we must assign nil..
        result.push('(' + tmp_idx + ' < ' + tmp_rhs_len + ' ? ');
        // generate assign..
        var asgn_node = ['assign', stmt[1][0][i],
            ['temp_local', tmp_rhs + '[' + tmp_idx + ']']];
        
        result.push(this.generate(asgn_node));
        
        // if out of idx..
        asgn_node[2] = ['temp_local', this.NIL];
        result.push(' : ' + this.generate(asgn_node));
        
        result.push('))');
      }
    }
    // splat - '' means no name given (make tmp?), null means no splat, or 
    // anything else means use assign node
    if (stmt[1][1] === null) {
      // no splat - dont do anything
    }
    else if (stmt[1][1] === "") {
      // no name.. dont have to do anything??!?!
      // print("no named splat");
    }
    else {
      // norm splat
      result.push(', (' + tmp_idx + ' = ' + splat_start + ', ');
      // if our idx is less than our total count, then we can assign next, 
      // otherwise we must assign nil..
      result.push('(' + tmp_idx + ' < ' + tmp_rhs_len + ' ? ');
      // generate assign..
      var asgn_node = ['assign', stmt[1][1],
          ['temp_local', tmp_rhs + '.slice(' + splat_start + ')']];
      
      result.push(this.generate(asgn_node));
      
      // if out of idx..
      asgn_node[2] = ['temp_local', '[]'];
      result.push(' : ' + this.generate(asgn_node));
      
      result.push('))');
    }
    
    // finally return our rhs
    result.push(', ' + tmp_rhs + ')');
    
    this.iseq_current.queue_temp(tmp_rhs);
    this.iseq_current.queue_temp(tmp_rhs_len);
    this.iseq_current.queue_temp(tmp_idx);
    return result.join("");
  },
  
  // multiple rhs - this, fortunately, is completely independant of lhs.. we end
  // up returning an array of items that we leave to lhs to deal with.
  // 
  // The result of any rhs is simply an array of items. if it is splatted, then
  // we send to_ary to it, and then concat the array onto our result
  // 
  // ['mrhs', args, splat_args] - either could be null, or both could be present
  generate_mrhs: function(stmt) {
    var res = [], code = [];
    // norm, non splat args
    if (stmt[1]) {
      for (var i = 0; i < stmt[1].length; i++) {
        res.push(this.generate(stmt[1][i]));
      }
    }
    // splat args - if it responds to .to_ary, then send that and then concat
    // results from array. otherwise, just add it as a normal arg... do we need
    // to do: tmp_splat instanceof Array to make sure to_ary returns an array? 
    if (stmt[2]) {
      var tmp_splat = this.iseq_current.temp_local();
      code.push('[' + res.join(", ") + ']');
      code.push(".concat(");
      code.push('(' + tmp_splat + ' = ');
      code.push(this.generate(stmt[2]));
      code.push(', (' + tmp_splat + '.$m.$to_ary ? ' + tmp_splat + '.$m');
      code.push('.$to_ary(' + tmp_splat + ') : ' + tmp_splat + '))');
      code.push(")");
      this.iseq_current.queue_temp(tmp_splat);
    }
    else {
      code.push('[' + res.join(", ") + ']');
    }
    
    return code.join("");
  },
  
  // ['or', lhs, rhs]
  generate_or: function(stmt) {
    var res = [];
    var tmp_assign = this.iseq_current.temp_local();
    res.push('((' + tmp_assign + ' = ');
    res.push(this.generate(stmt[1]));
    res.push(', ' + tmp_assign + '.$r)');
    // this.write("(" + this.SELF + ".t(" + tmp_assign + "=");
    // this.generate(stmt[1], {});
    res.push(" ? ");
    res.push(tmp_assign);
    res.push(" : ");
    res.push(this.generate(stmt[2]));
    res.push(")");
    this.iseq_current.queue_temp(tmp_assign);
    return res.join("");
  },
  
  // ['and', lhs, rhs]
  generate_and: function(stmt, o) {
    var res = [];
    var tmp_assign = this.iseq_current.temp_local();
    res.push('((' + tmp_assign + ' = ');
    res.push(this.generate(stmt[1]));
    res.push(', ' + tmp_assign + '.$r)');
    // this.write("(" + this.SELF + ".t(" + tmp_assign + "=");
    // this.generate(stmt[1], {});
    res.push(" ? ");
    res.push(this.generate(stmt[2]));
    res.push(" : ");
    res.push(tmp_assign);
    res.push(")");
    this.iseq_current.queue_temp(tmp_assign);
    return res.join("");
  },
  
  // ['case', expr, body]
  generate_case: function(stmt) {
    var res = [];
    var tmp_case = this.iseq_current.temp_local();
    var done_else = false;
    var ternary_count = 0;
    // print(stmt);
    res.push("((" + tmp_case + " = ");
    
    if (stmt[1]) {
      res.push(this.generate(stmt[1]));
    }
    else {
      res.push('Qtrue');
    }
    res.push(', true) ? ');
    
    var when_tmp, when_part, when_part_tmp;
    for (var i = 0; i < stmt[2].length; i++) {
      when_part = stmt[2][i];
      if (when_part[0] == 'when') {
        ternary_count++;
        res.push('((');
        when_tmp = this.iseq_current.temp_local();
        when_part_tmp = this.iseq_current.temp_local();
        res.push(when_part_tmp + ' = ' + this.generate(when_part[1][0]));
        res.push(', '+when_tmp+' = ' + when_part_tmp + this.mid_to_jsid('==='));
        res.push('(' + when_part_tmp + ', ' + this.NIL + ', ');
        res.push(tmp_case + ')');
        // res.push(when_tmp + ' = ' +  );
        // res.push(this.mid_to_jsid('===') + '')
        res.push(', ' + when_tmp + ' !== ' + this.NIL + ' && ');
        res.push(when_tmp + ' !== false) ? ');
        res.push(this.generate_compstmt(when_part[2][1], ','));
        // res.push('("")');
        res.push(' : ');
        this.iseq_current.queue_temp(when_tmp);
        this.iseq_current.queue_temp(when_part_tmp);
        // ') ? ("") : ');
      }
      else {
        done_else = true;
        // do else
        // print(when_part);
        // res.push(this.NIL);
        res.push(this.generate_compstmt(when_part[1][1], ','));
      }
    }
    if (!done_else) {
      res.push(this.NIL);
    }
    // res.push('nil : nil')
    for (var i = 0; i < ternary_count; i ++) res.push(")");
    // for case, the falsy of first stmt never gets applied, so:
    res.push(': ' + this.NIL + ')');
    this.iseq_current.queue_temp(tmp_case);
    return res.join("");
  },
  
  generate_while_mod: function(stmt) {
    // FIXME: second param should be while/until dependant on while_mod/untilmod
    return this.generate_while(['while', 'while', stmt[2], ['compstmt', [stmt[3]]]]);
  },
  
  // ['while', 'while/until', expr, compstmt]
  // While is the only actual native looping system..
  generate_while: function(stmt) {
    var res = [];
    // for jumps etc, mark ourself as in a while loop
    var old_while_loop_state = this.iseq_current._in_while_loop;
    this.iseq_current._in_while_loop = true;
    // should we reevaluate our truthy condition on next pass (used by next())
    var skip_eval = this.iseq_current.temp_local();
    res.push("(function(){");
    res.push(skip_eval + " = false;");
    // while stmt is true..
    res.push("while (" + skip_eval + "||" + this.generate(stmt[2]) + ".$r) {");
    res.push(skip_eval + " = false;");
    // body condition
    res.push('try {')
    res.push(this.generate_compstmt(stmt[3][1]));
    res.push('} catch(__err__) {');
    // any errors caught here... we look for our usual break, next, return etc
    // res.push('print("catching __err__ " + __err__.$keyword);')
    // next
    res.push('if (__err__.$keyword == 3) {');
    res.push('continue;');
    res.push('}');
    
    // first, break. - should check we are right to catch it?? if break fired
    // in while loop, then catch it. if fired in a block that was yielded from
    // while loop then we should return out of while loop and return that break?
    res.push('if (__err__.__keyword__ == "break") {');
    res.push("return __err__.opal_value;");
    // res.push("break;");
    res.push('}');
    // res.push("print('rethrow..');");
    // rethrow on other errors:
    res.push('throw __err__;')
    
    res.push('}');
    
    res.push("}");
    // while returns nil (unless break returns nil, etc)
    res.push("return " + this.NIL + ";");
    
    res.push("})()");
    this.iseq_current.queue_temp(skip_eval);
    
    // we are now finished in while loop.. restore state..
    this.iseq_current._in_while_loop = old_while_loop_state;
    
    return res.join("");
  },
  
  // ['if'/'unless', expr, stmt, tail]
  generate_if: function(stmt) {
    var res = [];
    var done_else = false;
    var ternary_count = 1;
    
    // FIXME: if unless, then we need !$r (not true)
    res.push('(' + this.generate(stmt[1]) + '.$r ? ');
    
    
    var c = stmt[2][1], s;
    res.push(this.generate_compstmt(c));
    res.push(' : ');
   
    for (var i = 0; i < stmt[3].length; i++) {
      var t = stmt[3][i];

      if (t[0] == 'elsif') {
        ternary_count++;
        
        res.push('(' + this.generate(t[1]) + '.$r ? ');

        res.push(this.generate_compstmt(t[2][1]));
        res.push(' : ');
        
      }
      else {
        done_else = true;
        res.push(this.generate_compstmt(t[1][1]));
        
      }
    }
    // if we didnt have an else, do it ourselves:
    if (!done_else) {
      res.push(this.NIL);
    }
    for (var i = 0; i < ternary_count; i ++) res.push(')');
    return res.join('');
  },
  
  generate_unless: function(stmt) {
    return this.generate_if(stmt);
  },
  
  generate_if_mod: function(stmt) {    
    var recv = this.generate(stmt[2]), prefix = (stmt[1] == 'if' ? '' : '!');
    
    if (stmt[2][0] == 'numeric')
      recv = '(' + recv + ')';
    
    return '(' + prefix + '('+ recv + '.$r) ? ' + this.generate(stmt[3]) + ':' + 
              this.NIL + ')';
  },
  
  generate_ternary: function(stmt) {
    var recv = this.generate(stmt[1]);
    
    if (stmt[1][0] == 'numeric')
      recv = '(' + recv + ')';
      
    return '(' + recv + '.$r ? ' + this.generate(stmt[2]) + ' : ' +   
              this.generate(stmt[3]) + ')';
  },
  
  // ['unary', type, arg]
  // type: '+', '-', '!'
  generate_unary: function(stmt, o) {
    var meth = stmt[1];
    
    var tmp_recv = this.iseq_current.temp_local();
    
    if (meth == '+') meth = '+@';
    if (meth == '-') meth = '-@';
    
    var code = "(" + tmp_recv + ' = ' + this.generate(stmt[2]) + ', ' + tmp_recv
              + '.$m' + this.mid_to_jsid(meth) + ' || rb_vm_meth_m)(' + tmp_recv + ', "' + meth + '")';
    this.iseq_current.queue_temp(tmp_recv);
    // return this.generate(stmt[2]) + this.mid_to_jsid(meth) + '()';
    return code;
    // this.generate(stmt[2], { recv: true });
    // this.write(this.mid_to_jsid(meth));
    // this.write('()');
  },
  
  // ['aref', recv, [arefs, splat]]
  generate_aref: function(stmt, o) {
    var res = [];
    var tmp_mm = this.iseq_current.temp_local();
    res.push('(' + tmp_mm + ' = ');
    res.push(this.generate(stmt[1]));
    res.push(', ' + tmp_mm + '.$m');
    res.push(this.mid_to_jsid('[]'));
    res.push(' || ' + tmp_mm + '.$M("[]"))');
    res.push('(');
    // self
    res.push(tmp_mm);
    // mid
    //res.push(", '[]'");
    if (stmt[2][0]) {
      for (var i = 0; i < stmt[2][0].length; i++) {
        var s = stmt[2][0][i];
        res.push(', ');
        res.push(this.generate(s));
      }
    }
    res.push(')');
    this.iseq_current.queue_temp(tmp_mm);
    return res.join('');
  },
  
  // [arefs, aset]
  generate_aset: function(aref, arg) {
    var res = [];
    var tmp_mm = this.iseq_current.temp_local();
    // print(aref);
    res.push('(' + tmp_mm + ' = ')
    res.push(this.generate(aref[1]));
    res.push(', ('+ tmp_mm + '.$m');
    res.push(this.mid_to_jsid('[]='));
    res.push(' || rb_vm_meth_m');
    res.push(')');
    res.push('(');
    res.push(tmp_mm);
    //res.push(', ');
    if (aref[2][0]) {
      for (var i = 0; i < aref[2][0].length; i++) {
        var s = aref[2][0][i];
        res.push(', ');
        res.push(this.generate(s));
      }
    }
    res.push(', ');
    res.push(this.generate(arg));
    res.push('))');
    this.iseq_current.queue_temp(tmp_mm);
    return res.join("");
  },
  
  // ['array', [arefs, splat]]
  generate_array: function(stmt) {
    var res = [];
    if (stmt[1][0]) {
      for (var i = 0; i < stmt[1][0].length; i++) {
        var s = stmt[1][0][i];
        res.push(this.generate(s));
      }
    }
    // if splat, concat args onto end..
    if (stmt[1][1]) {
      var splat_str = ['[' + res.join(", ") + ']']
      splat_str.push('.concat(');
      splat_str.push(this.generate(stmt[1][1]));
      splat_str.push(')');
      return splat_str.join("");
    }
    else {
      // no splat..
      return '[' + res.join(", ") + ']';
    }
  },
  
  // ['hash', assocs]
  // assocs - [[lhs, rhs], [lhs, rhs]]
  generate_hash: function(stmt, o) {
    var res = [];
    res.push(this.SELF + '.$H(');
    
    for (var i = 0; i < stmt[1].length; i++) {
      if (i > 0) res.push(', ');
      res.push(this.generate(stmt[1][i][0]));
      res.push(', ');
      res.push(this.generate(stmt[1][i][1]));
    }
    
    res.push(')');
    // print(res.join(""));
    return res.join("");
    // return "opalhash()";
  },
  
  // ['symbol', name]
  generate_symbol: function(stmt) {
    return '$symbol("' + stmt[1] + '")';
  },
  
  generate_dsym: function(stmt, o) { 
    var res = ['opalsym'];
    res.push('(');
    var part;
    for (var i = 0; i < stmt[1].length; i++) {
      if (i > 0) res.push(' + ');
      part = stmt[1][i];
      if (part[0] == 'string_content') {
        res.push(JSON.stringify(part[1]));
      }
      else if (part[0] == 'string_dbegin') {
        var tmp_to_s = this.iseq_current.temp_local();
        res.push('(' + tmp_to_s + ' = ');
        res.push(this.generate(part[1][1][0]));
        res.push(', ' + tmp_to_s + '.$m');
        res.push(this.mid_to_jsid('to_s') + '(' + tmp_to_s + '))');
        this.iseq_current.queue_temp(tmp_to_s);
      }
      else {
        res.push(this.SELF + '.i$' + part[1] + '.$to_s(self)');
      }
    }
    res.push(')');
    
    return res.join('');
  },
  
  // ['def', singleton, def_name, arglist, bodystmts]
  generate_def: function(stmt, o) {
    var res = [];
    var is_singleton = stmt[1];
    
    this.push_iseq(DefIseq);
    this.iseq_current._method_id = stmt[2];
    
    var args = stmt[3];
    
    // norm arg
    for (var i = 0; i < stmt[3][0].length; i++) {
      this.iseq_current.push_arg(stmt[3][0][i]);
    }
    
    // opt arg
    for (var i = 0; i < stmt[3][1].length; i++) {
      // print(stmt[3][1][i]);
      var gen_opt_iseq = this.generate(stmt[3][1][i][1]);
      this.iseq_current.push_opt_arg(stmt[3][1][i][0], gen_opt_iseq);
    }
    
    // rest arg
    if (stmt[3][2]) {
      this.iseq_current.push_rest_arg(stmt[3][2]);
    }
    
    // block arg
    if (stmt[3][3]) {
      // print("Block arf: " + stmt[3][3]);
      this.iseq_current.push_block_arg(stmt[3][3]);
    }
    
    // for (var i = 0; i < stmt[1].length; i++) {
      // this.generate(stmt[1][i], { full: true, last:(stmt[1].length - 1 == i) });
    // }
    var def_code = this.generate_bodystmt(stmt[4]);
    
    // if we need to potentially catch returns etc, do it here.
    if (this.iseq_current._handle_errors) {
      var code = ['try {\n'];
      code.push('var __vm_jump_function__ = arguments.callee;');
      code.push(def_code);
      code.push('} catch(__err__) {\n');
      // code.push("print('caught..' + __err__.$keyword);");
      
      // loop return: returning from a while loop (or until loop)
      if (this.iseq_current._ensure_loop_return) {
        code.push('if (__err__.$keyword == 1) {\n');
        // code.push('print("capturing loop return");');
        code.push('return __err__["@exit_value"];');
        code.push('\n}');
      }
      
      // try our ensure return
      if (this.iseq_current._ensure_block_return) {
        code.push('if (__err__.$keyword == 0 && __err__["@jump_function"] == __vm_jump_function__) {\n');
        // code.push("print('ENSURE RETURN');");
        code.push("return __err__['@exit_value'];")
        code.push("\n}");
      }
      
      // try our ensure return
      // if (this.iseq_current._ensure_return) {
        // code.push('if (__err__.$keyword == 0) {\n');
        // code.push("print('ENSURE RETURN');");
        // code.push("return __err__['@exit_value'];")
        // code.push("\n}");
      // }
      
      // worst case, just rethrown
      // code.push("print('def rethrow');")
      code.push("throw __err__;");
      code.push("}");
      def_code = code.join("");
      // print("need to handle errors " + stmt[2]);
    }
    this.iseq_current.push_code(def_code);
    
    var result = this.pop_iseq();
    
    if (is_singleton) {
      // need to fix:
      // res.push(this.SELF + '.$dm(');
      res.push('$def(' + this.generate(stmt[1]) + ', ');
    }
    else {
      // res.push(this.SELF + '.$dm(');
      res.push('$def(' + this.SELF + ', ');
    }
    
    res.push('"' + stmt[2] + '", ' + result + ', ' + (is_singleton ? '1' : '0') + ')');
    
    return res.join('');
  },
  
  // ['class', path, super, body]
  generate_class: function(stmt, o) {
    var res = [];
    
    this.push_iseq(ClassIseq);
    
    this.iseq_current.push_code(this.generate_bodystmt(stmt[3]));
    
    var result = this.pop_iseq();
    // if path is ::CONST then we use opal.top_self as base
    // res.push(this.SELF);
    
    var base;
    
    if (stmt[1][0] == null) {
      base = this.SELF;
    }
    else if (stmt[1][0] == '::') {
      base = 'rb_cObject';
    }
    else {
      base = this.generate(stmt[1][0]);
    }
   
    //res.push(base + '.$dc('); 
    res.push('$class(' + base + ', ');
    // superclass
    if (stmt[2]) {
      res.push(this.generate(stmt[2]));
    }
    else {
      res.push(this.NIL);
    }
    res.push(', "' + stmt[1][1] + '", ' + result + ', 0)');
    
    return res.join("");
  },
  
  generate_class_shift: function(stmt) {
    var res = [];
    
    this.push_iseq(ClassIseq);
    
    this.iseq_current.push_code(this.generate_bodystmt(stmt[2]));
    
    var result = this.pop_iseq();
    // if path is ::CONST then we use opal.top_self as base
    // res.push(this.SELF);
    
    res.push('$class(' + this.generate(stmt[1]) + ', ');
    
    res.push(this.NIL);
    
    
    res.push(', ' + this.NIL + ', ' + result + ', 1)');
    
    return res.join("");
  },
  
  generate_module: function(stmt, o) {
    var res = [];
    
    this.push_iseq(ClassIseq);
    
    this.iseq_current.push_code(this.generate_bodystmt(stmt[2]));
    
    var result = this.pop_iseq();
    // if path is ::CONST then we use opal.top_self as base
    // res.push(this.SELF);
    
    // base is where we define module. basically, its module cpath upto the
    // actual name. An exception is just '::' which means we define it in the
    // top context under object.
    var base;
    
    if (stmt[1][0] == null) {
      base = this.SELF;
    }
    else if (stmt[1][0] == '::') {
      base = 'rb_cObject';
    }
    else {
      base = this.generate(stmt[1][0]);
    }
    
    //res.push(base + '.$dc(');
    res.push('$class(' + base + ', ');
        
    // superclass
    if (false) {
      
    }
    else {
      res.push(this.NIL);
    }
    res.push(', "' + stmt[1][1] + '", ' + result + ', 2)');
    
    return res.join("");
  },
  
  generate_line: function(stmt, o) {
    if (o.last && o.full) this.write('return ');
    this.write(stmt[1]);
    if (o.full) this.write(';\n');
  },
  
  generate_file: function(stmt, o) {
    return "__FILE__";
  },
  
  generate_xstring: function(stmt, o) {
    // print(stmt);
    var res = [];
    if (stmt[1].length == 0) {
      return '';
    }
    else if (stmt[1].length == 1) {
      return stmt[1][0][1];
    }
    else {
      for (var i = 0; i < stmt[1].length; i++) {
        if (stmt[1][i][0] == 'string_content') {
          res.push(stmt[1][i][1]);
        }
        else {
         res.push(this.generate(stmt[1][i][1][1][0]));
        }
      }
    }
    return res.join("");
  },
  
  // ['string', parts, beg] - beg " or '
  generate_string: function(stmt, o) {
    var res = [];
    
    if (stmt[1].length == 0) {
      return '""';
    }
    else if (stmt[1].length == 1) {
      if (stmt[1][0][0] == 'string_content') {
        // res.push(JSON.stringify(stmt[1][0][1]));
        res.push(stmt[2] + stmt[1][0][1].replace(stmt[2], '\\' + stmt[2]) + stmt[2]);
      }
      else if (stmt[1][0][0] == 'string_dbegin') {
        var tmp_to_s = this.iseq_current.temp_local();
        res.push('(' + tmp_to_s + ' = ');
        res.push(this.generate(stmt[1][0][1][1][0]));
        res.push(', ' + tmp_to_s + '.$m');
        res.push(this.mid_to_jsid('to_s') + '(' + tmp_to_s + '))');
        this.iseq_current.queue_temp(tmp_to_s);
      }
      else {
        res.push(this.SELF + '.i$' + stmt[1][0][1] + '.$to_s(self)');
      }
    }
    else {
      res.push('(');
      var part;
      for (var i = 0; i < stmt[1].length; i++) {
        if (i > 0) res.push(' + ');
        part = stmt[1][i];
        if (part[0] == 'string_content') {
          // res.push(JSON.stringify(part[1]));
          res.push(stmt[2] + part[1].replace(stmt[2], '\\' + stmt[2]) + stmt[2]);
        }
        else if (part[0] == 'string_dbegin') {
          var tmp_to_s = this.iseq_current.temp_local();
          res.push('(' + tmp_to_s + ' = ');
          res.push(this.generate(part[1][1][0]));
          res.push(', ' + tmp_to_s + '.$m');
          res.push(this.mid_to_jsid('to_s') + '(' + tmp_to_s + '))');
          this.iseq_current.queue_temp(tmp_to_s);
        }
        else {
          res.push(this.SELF + '.i$' + part[1] + '.$to_s(self)');
        }
      }
      res.push(')');
    }
    
    // print('done in string');
    return res.join("");
  },
  
  generate_regexp: function(stmt) {
    var res = ['(new RegExp('];
    
    if (stmt[1].length == 0) {
      // empty regexp in js = error
      return '/^$/';
    }
    else if (stmt[1].length == 1) {
      if (stmt[1][0][0] == 'string_content') {
        res.push(JSON.stringify(stmt[1][0][1]));
      }
      else if (stmt[1][0][0] == 'string_dbegin') {
        var tmp_to_s = this.iseq_current.temp_local();
        res.push('(' + tmp_to_s + ' = ');
        res.push(this.generate(stmt[1][0][1][1][0]));
        res.push(', ' + tmp_to_s + '.$m');
        res.push(this.mid_to_jsid('to_s') + '(' + tmp_to_s + '))');
        this.iseq_current.queue_temp(tmp_to_s);
      }
      else {
        res.push(this.SELF + '.i$' + stmt[1][0][1] + '.$to_s(self)');
      }
    }
    else {
      res.push('(');
      var part;
      for (var i = 0; i < stmt[1].length; i++) {
        if (i > 0) res.push(' + ');
        part = stmt[1][i];
        if (part[0] == 'string_content') {
          res.push(JSON.stringify(part[1]));
        }
        else if (part[0] == 'string_dbegin') {
          var tmp_to_s = this.iseq_current.temp_local();
          res.push('(' + tmp_to_s + ' = ');
          res.push(this.generate(part[1][1][0]));
          res.push(', ' + tmp_to_s + '.$m');
          res.push(this.mid_to_jsid('to_s') + '(' + tmp_to_s + '))');
          this.iseq_current.queue_temp(tmp_to_s);
        }
        else {
          res.push(this.SELF + '.i$' + part[1] + '.$to_s(self)');
        }
      }
      res.push(')');
    }
    res.push(', ');
    res.push('"' + stmt[2] + '"');
    res.push('))');
    return res.join('');
  },
  
  generate_words: function(stmt, o) {
    var res = [];
    
    var done_first = false;
    res.push('[');
    
    for (var i = 0; i < stmt[1][0].length; i++) {
      var part = stmt[1][0][i];
      if (part[0] == 'string_content') {
        var str = part[1].split(' ');
        for (var j = 0; j < str.length; j++) {
          if (done_first) {
            res.push(', "' + str[j] + '"');
          }
          else {
            done_first = true;
            res.push('"' + str[j] + '"');
          }
        }
      }
    }
    
    res.push(']');
    return res.join("");
  },
  
  generate_begin: function(stmt) {
    var res = [];
    var local;
    res.push('(function(){');
    res.push('try{');
    res.push('return ' + this.generate_compstmt(stmt[1][1][1]) + ';');
    res.push('}catch(__err__){');
    // if we are dealing with a native error (non opal/ruby error, then lets)
    // wrap it.
    res.push('if (!__err__.$klass){ __err__ = rb_vm_make_exception(__err__);}');
    
    for (var i = 0; i < stmt[1][2].length; i++) {
      var rescue = stmt[1][2][i];
      res.push('if (__err__){');
      // print(rescue);
      // if we have a var, then assign error to it:
      if (rescue[2]) {
        if (!(local = this.iseq_current.lookup_local(rescue[2][1]))) {
          local = this.iseq_current.push_local(rescue[2][1]);
        }
        res.push(local + ' = __err__;');
      }
      res.push('return ' + this.generate_compstmt(rescue[3][1]) + ';');
      res.push('}');
    }
    
    // worst case, rethrow (if nothing else catches it)
    res.push('throw __err__;');
    // print(stmt[1][2]);
    // res.push(this.generate(stmt[1][2]));
    // print(re)
    res.push('}');
    // print(stmt);
    res.push('})()')
    return res.join('');
  },
  
  generate_gvar: function(stmt) {
    return "rb_vm_gg('" + stmt[1].replace('\\', '\\\\') + "')";
  },
  
  generate_nth_ref: function(stmt) {
    return "rb_vm_gg('" + stmt[1] + "')";
  },
  
  generate_back_ref: function(stmt) {
    return "rb_vm_gg('" + stmt[1] + "')";
  },
  
  generate_colon2: function(stmt) {
    return 'rb_vm_cg(' + this.generate(stmt[1]) + ', "' + stmt[2] + '")';
  },
  
  generate_return: function(stmt) {
    // print("ensuring return in " + this.iseq_current.constructor);
    var return_arg = [];
    // this.iseq_current.ensure_return();
    // for now assume not in block
    // res.push(this.SELF + '.rbReturn(');
    // res.push('rb_return(');
    if (stmt[1]) {
      var arg, args = stmt[1][0];
      // norm args
      // print('norm args:');
      // print(args);
      // print(args.length);
      if (args && args.length > 0) {
        if (args.length == 1) {
          return_arg.push(this.generate(args[0]));
        } else {
          return_arg.push('[');
          for (var i = 0; i < args.length; i++) {
            arg = args[i];
            if (i > 0) return_arg.push(', ');
            return_arg.push(this.generate(arg));
          }
          return_arg.push(']');
        }
      }
    } else {
      return_arg.push(this.NIL);
    }
    return_arg = return_arg.join("");
    
    // if we are in block (part of an iteration for example..)
    if (this.iseq_current instanceof BlockIseq && !this.iseq_current._in_while_loop) {
      this.iseq_current.ensure_block_return();
      return 'rb_vm_block_return(' + return_arg + ', __vm_jump_function__)';
    }
    // if we are in a while loop itself. We return out of while loop and into
    // the method containing the while loop itself. We do not return back into
    // calling method (this is handled above: "block" part)
    else if (this.iseq_current._in_while_loop) {
      // inform the method containing the while loop that we need to handle it
      this.iseq_current.ensure_loop_return();
      // throw a loop return statement..
      return 'rb_vm_loop_return(' + return_arg + ')';
    }
    // normal return in a normal method context
    else {
      // inform current iseq to capture thrown return
      this.iseq_current.ensure_block_return();
      return 'rb_vm_block_return(' + return_arg + ', __vm_jump_function__)';
    }
    return return_arg + "aaaaa";
  },
  
  generate_next: function(stmt, o) {
    var res = [];
    res.push('rb_vm_next(');
    if (stmt[1]) {
      for (var i = 0; i < stmt[1][0].length; i++) {
        if (i > 0) res.push(', ');
        res.push(this.generate(stmt[1][0][i]));
      }
    }
    else {
      res.push(this.NIL);
    }
    res.push(')');
    return res.join("");
  },
  
  generate_break: function(stmt) {
    var res = [];
    res.push('$break(');
    if (stmt[1]) {
      for (var i = 0; i < stmt[1][0].length; i++) {
        if (i > 0) res.push(', ');
        res.push(this.generate(stmt[1][0][i]));
      }
    }
    else {
      res.push(this.NIL);
    }
    res.push(')');
    return res.join('');
  },
  
  generate_super: function(stmt) {
    var res = [];
    var mid = this.iseq_current._method_id;
    res.push('rb_super(arguments.callee, $mid, ' + this.SELF + ',');
    if (!stmt[1]) {
      res.push("Array.prototype.slice.call(arguments, 1)");
    }
    else {
      res.push('[');
      for (var i = 0; i < stmt[1][0].length; i++) {
        if (i > 0) res.push(', ');
        res.push(this.generate(stmt[1][0][i]));
      }
      res.push(']');
    }
    res.push(')');
    return res.join('');
  },
  
  generate_block_given: function(stmt) {
    var name = this.iseq_current.block_arg;
    this.iseq_current.__uses_block__ = true;
    return '(' + name + ' !== ' + this.NIL + ' ? Qtrue : Qfalse)';
  },
  
  generate_yield: function(stmt) {
    this.iseq_current.__uses_block__ = true;
    var block = this.iseq_current.block_arg;
    var args_res = [block + '.$self'];
    // args
    // print(stmt[1]);
    if (stmt[1][0]) {
      for (var i = 0; i < stmt[1][0].length; i++) {
        args_res.push(', ');
        args_res.push(this.generate(stmt[1][0][i]));
      }
    }
    // assocs..
    // print(stmt[1]);
    // splat..
    if (stmt[1][1]) {
      // print("using splat: " + stmt[1][1]);
      return block + '.apply(' + this.NIL + ', [' + args_res.join('') + ']' +
          '.concat(' + this.generate(stmt[1][1]) + '))';
    }
    else {
      // no splat
      return block + '(' + args_res.join('') + ')';
    }
    // res.push(')');
    // return args_res.join("");
  },
  
  generate_rescue_mod: function(stmt, o) {
    this.write('try {\n');
    this.generate(stmt[1], { full:true, last:o.last });
    var tmp_error = this.iseq_current.temp_local();
    this.write('} catch(' + tmp_error + ') {\n');
    this.generate(stmt[2], { full:true, last:o.last });
    this.write('}\n');
    this.iseq_current.queue_temp(tmp_error);
  },
  
  generate_paren: function(stmt) {
    return this.generate_compstmt(stmt[1][1]);
  },
  
  // ['range', '..' or '...', beg, end]
  generate_range: function(stmt) {
    return "$range(" + this.generate(stmt[2]) + ", " + this.generate(stmt[3]) 
            + ", " + (stmt[1] == '...') + ")";
  },
  
  generate_require: function(stmt) {
    // this._dependencies.push(stmt[1]);
    // return "require('" + stmt[1] + "')";
    // return  'require(' + this.generate(stmt[1]) + ')';
    return this.SELF + '.$m.$require(' + this.SELF + ', ' + this.NIL + ', ' +
      this.generate(stmt[1]) + ')';
  }
};



exports.Generator = RubyGenerator;

};
modules["./browser_dev"] = function(exports, module) {
/*
 * Browser dev wraps all the dev tools, for compiling etc, but adds some functionality
 * in-browser. It will automatically pick out text/ruby script tags and execute their
 * content. opal.js does not do this as the compiler is required. opal_dev.js should
 * only be used in development mode, so overhead in checking/compiling ruby code
 * in the browser will not affect production level environments.
 */

var dev_tools = require('./parser');

for (var prop in dev_tools) {
  exports[prop] = dev_tools[prop];
};

/*
 * Document ready listener can take callbacks that are fired when the document
 * and/or window are ready to run. If already loaded then the callback is just
 * called immediately.
 */
var browser_register_ready_listener = function(callback) {
  if (browser_is_ready) return callback();

  (function() {
    // w3c - chrome, safari, ff
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', callback, false);
    }
    // IE
    else {
      (function() {
        try {
          document.documentElement.doScroll('left');
        } catch (e) {
          setTimeout(arguments.callee, 0);
          return;
        }
        callback();
      })();
    }
  })();
};

/*
 * Document is not ready yet...
 */
var browser_is_ready = false;

/*
 * Find all script tags and run them.
 */
browser_register_ready_listener(function() {
  var tags = document.getElementsByTagName('script'), tag;

  for (var i = 0; i < tags.length; i++) {
    tag = tags[i];

    if (tag.type == 'text/ruby') {
      // src property - load by ajax, then run
      if (tag.src) {

      }
      // no src, so just run inner contents
      else {
        console.log('need to run content:');
        console.log(tag.innerHTML);
        var result = Opal.compile(tag.innerHTML);
        console.log(result);
        eval(result);
      }
    }
  }
});


};
  var dev_exports = require('./browser_dev');

  for (var prop in dev_exports) {
     Opal[prop] = dev_exports[prop];
  }
})(this, Opal);

