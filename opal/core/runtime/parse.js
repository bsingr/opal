/* 
 * opal_ruby_parser.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2010 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 
   // lex states
var EXPR_BEG    = 0,    EXPR_END    = 1,    EXPR_ENDARG = 2,    EXPR_ARG   = 3,
    EXPR_CMDARG = 4,    EXPR_MID    = 5,    EXPR_FNAME  = 6,    EXPR_DOT   = 7,
    EXPR_CLASS  = 8,    EXPR_VALUE  = 9;

var OpalRubyParser = function OpalRubyParser(str, filename) {
  ruby_parser.lexer = this;
  this.scanner = new OpalStringScanner(str);
  this.str = str;
  this.filename = filename;
  this.lex_state = EXPR_BEG;
  this.string_parse_stack = [];
  return this;
};

OpalRubyParser.prototype = {
  
  /**
    Lexer function: setup input etc - generally ignored as input is set else
    where
  */
  setInput: function() {
    
  },
  
  /**
    Lexer function: get next token (calls nextToken essentially)
  */
  lex: function() {
    if (this.done) return "";
    var token = this.nextToken();
    // console.log(token.join(", "));
    if (token[0] === false) {
      this.done = true;
      return "EOF";
    } 
    console.log("yytext is " + token[1] + " for " + token[0]);
    this.yytext = token[1];
    return token[0];
  },
  
  /**
    Lexer function
  */
  upcomingInput: function() {
    return "";
  },
  
  /**
    Lexer functions
  */
  showPosition: function() {
    return 0;
  },
  
  /**
    Parse the string given on initialzation and return a string representation
    of the compiled ruby.
  */
  parse: function() {
    ruby_parser.parse(this.str);
    var res = ruby_parser.__result;
    return OpalRubyGenerator(this, res);
    // return this.filename;
  },
  
  /**
    String parsing
  */  
  push_string_parse: function(o) {
    this.string_parse_stack.push(o);
  },
  
  pop_string_parse: function() {
    this.string_parse_stack.pop();
  },
  
  current_string_parse: function() {
    if (this.string_parse_stack.length == 0) return null;
    return this.string_parse_stack[this.string_parse_stack.length - 1];
  },
  
  get_next_string_token: function() {
    var str_parse = this.current_string_parse(), scanner = this.scanner;
    
    // see if we can read end of string/xstring/regexp markers
    if (scanner.scan( new RegExp('^\\' + str_parse.beg))) {
      this.pop_string_parse();
      if (str_parse.beg == '"' || str_parse.beg == "'") {
        this.lex_state = EXPR_END;
        return ['tSTRING_END', scanner.matched];
      }
      else if (str_parse.beg == '`') {
        // assume to be xstring
        this.lex_state = EXPR_END;
        return ['tXSTRING_END', scanner.matched];
      }
      else if (str_parse.beg == '/') {
        this.lex_state = EXPR_END;
        return ['tREGEXP_END', scanner.matched];
      }
      else {
        throw "unknown string ending"
      }
    }
    
    // not end of string, so we must be parsing contents
    var str_buffer = [];
    
    if (scanner.scan(/^#(\$|\@)/)) {
      return ['tSTRING_DVAR', scanner.matched];
    }
    else if (scanner.scan(/^#\{/)) {
      // we are into ruby code, so stop parsing content (for the moment)
      str_parse.content = false;
      return ['tSTRING_DBEG', scanner.matched];
    }
    else if (scanner.scan(/^#/)) {
      str_buffer.push('#');
    }
    
    // content regexp (what is valid content for strings..)
    var reg_exp = (str_parse.beg == '`') ?
                // xstring: CAN include new lines
                new RegExp('[^\\' + str_parse.beg + '\#\0]+|.') :
                // normal string: cannot include new lines
                new RegExp('[^\\' + str_parse.beg + '\#\0\\\n]+|.');
    
    scanner.scan(reg_exp);
    str_buffer.push(scanner.matched);
    return ['tSTRING_CONTENT', str_buffer.join('')];
  },
  
  /**
    Return the next token. Result should be an array, first index is token type,
    second is lex value
  */
  nextToken: function() {
    var string_scanner;
    if ((string_scanner=this.current_string_parse())&&string_scanner.content) {
      return this.get_next_string_token();
    }
    
    var scanner = this.scanner;
    var space_seen = false, c = '', cmd_start = false;
    
    while (true) {
      if (scanner.scan(/^(\ |\t|\r)/)) {
        space_seen = true;
        continue;
      }
      else if (scanner.scan(/^(\n|#)/)) {
        // console.log('found: ' + scanner.matched);
        c = scanner.matched;
        if (c == '#') {
          scanner.scan(/^(.*\n)/);
        }
        
        // \n and #\n both mean we read one line, so..
        // line_number++;
        
        // we can skip any more blank lines..(combine them into one..)
        scanner.scan(/^(\n+)/);
        // line_number += scanner.matched.length;
        if (this.lex_state == EXPR_BEG) {
          continue;
        }
        cmd_start = true;
        this.lex_state = EXPR_BEG;
        return ['\\n', '\\n'];
      }
      else if (scanner.scan(/^[+-]/)) {
        var result = scanner.matched == '+' ? '+' : '-';
        var sign = (result == '+') ? 'tUPLUS' : 'tUMINUS';
        // method name
        if (this.lex_state == EXPR_FNAME || this.lex_state == EXPR_DOT) {
          this.lex_state = EXPR_ARG;
          if (scanner.scan(/^@/)) {
            return [sign, result + '@'];
          }
          else {
            return [sign, result];
          }
        }
        // += or -=
        if (scanner.scan(/^\=/)) {
          this.lex_state = EXPR_BEG;
          return [tOP_ASGN, result];
        }

        if (this.lex_state == EXPR_BEG || this.lex_state == EXPR_MID) {
          this.lex_state = EXPR_BEG;
          return [sign, result];
        }

        this.lex_state = EXPR_BEG;
        return [result, scanner.matched];
      }
      
      
      
      
      else if (scanner.scan(/^\//)) {
        if (this.lex_state == EXPR_BEG || this.lex_state == EXPR_MID) {
          this.push_string_parse({ beg: '/', content: true, end:'/' });
          return ['tREGEXP_BEG', scanner.matched];
        }
        this.lex_state = EXPR_BEG;
        return ['/', scanner.matched];
      }
      else if (scanner.scan(/^\*\*\=/)) {
        lex_state = EXPR_BEG;
        return [tOP_ASGN, "**"];
      }
      else if (scanner.scan(/^\*\*/)) {
        return [tPOW, "**"];
      }
      else if (scanner.scan(/^\*\=/)) {
        lex_state = EXPR_BEG;
        return [tOP_ASGN, "*"];
      }
      else if (scanner.scan(/^\*/)) {
        var r;
        if (this.lex_state == EXPR_FNAME) {
          this.lex_state = EXPR_BEG;
          r = "*";
        }
        else if (this.lex_state == EXPR_BEG || this.lex_state == EXPR_MID) {
          r = 'tSTAR';
        }
        else {
          this.lex_state = 'EXPR_BEG';
          r = "*"
        }
        return [r, scanner.matched];
      }
      
      
      
      
      
      
      else if (scanner.scan(/^\<\=\>/)) {
        return [tCMP, scanner.matched];
      }
      else if (scanner.scan(/^\<\=/)) {
        return [tLEQ, "<="];
      }
      else if (scanner.scan(/^\<\<\=/)) {
        lex_state = EXPR_BEG;
        return [tOP_ASGN, "<<"];
      }
      else if (scanner.scan(/^\<\</)) {
        if (([EXPR_END, EXPR_DOT, EXPR_ENDARG, EXPR_CLASS].indexOf(lex_state) != -1) && space_seen) {
          return [tLSHFT, "<<"];
        }
        lex_state = EXPR_BEG;
        return [tLSHFT, "<<"];
      }
      else if (scanner.scan(/^\</)) {
        lex_state = EXPR_BEG;
        return ["<", "<"];
      }
      
      
      
      
      else if (scanner.scan(/^\&\&\=/)) {
        lex_state = EXPR_BEG;
        return [tOP_ASGN, "&&"];
      }
      else if (scanner.scan(/^\&\&/)) {
        lex_state = EXPR_BEG;
        return [tANDOP, "&&"];
      }
      else if (scanner.scan(/^\&\=/)) {
        lex_state = EXPR_BEG;
        return [tOP_ASGN, "&"];
      }
      else if (scanner.scan(/^\&/)) {
        var r;
        if (space_seen && !scanner.check(/^\s/)) {
          if (lex_state == EXPR_CMDARG) r = tAMPER;
          else r = "&";
        }
        else if (lex_state == EXPR_BEG || lex_state == EXPR_MID) {
          r = tAMPER;
        }
        else {
          r = "&";
        }
        return [r, "&"];
      }
      
      
      
      
      // strings.. in order: double, single, xstring
      else if (scanner.scan(/^\"/)) {
        this.push_string_parse({ beg: '"', content: true, end:'"' });
        return ['tSTRING_BEG', scanner.matched];
      }
      else if (scanner.scan(/^\'/)) {
        this.push_string_parse({ beg: "'", content: true, end:"'" });
        return ['tSTRING_BEG', scanner.matched];
      }
      else if (scanner.scan(/^\`/)) {
        this.push_string_parse({ beg: "`", content: true, end:'`' });
        return ['tXSTRING_BEG', scanner.matched];
      }
      
      // numbers
      else if (scanner.check(/^[0-9]/)) {
        this.lex_state = EXPR_END;
        if (scanner.scan(/^[\d_]+\.[\d_]+\b/)) {
          return ['tFLOAT', scanner.matched];
        }
        else if (scanner.scan(/^[\d_]+\b/)) {
          return ['tINTEGER', scanner.matched];
        }
        else if (scanner.scan(/^0(x|X)(\d|[a-f]|[A-F])+/)) {
          return ['tINTEGER', scanner.matched];
        }
        else {
          console.log('unexpected number type');
          return [false, false];
        }
      }
      
      
      else if (scanner.scan(/^\|\|\=/)) {
        lex_state = EXPR_BEG;
        return [tOP_ASGN, '||'];
      }
      else if (scanner.scan(/^\|\|/)) {
        lex_state = EXPR_BEG;
        return [tOROP, scanner.matched];
      }
      else if (scanner.scan(/^\|\=/)) {
        lex_state = EXPR_BEG;
        return [tOP_ASGN, '|'];
      }
      else if (scanner.scan(/^\|/)) {
        lex_state = EXPR_BEG;
        return ["|", scanner.matched];
      }
      else if (scanner.scan(/^\:\:/)) {
        if (this.lex_state == EXPR_BEG || this.lex_state == EXPR_MID || this.lex_state == EXPR_CLASS) {
          this.lex_state = EXPR_BEG;
          return ['tCOLON3', scanner.matched];
        }
        this.lex_state = EXPR_DOT;
        return ['tCOLON2', scanner.matched];
      }
      else if (scanner.scan(/^\:/)) {
        // console.log ("HERE " + lex_state);
        if (this.lex_state === EXPR_END || this.lex_state === EXPR_ENDARG || scanner.check(/^\s/)) {
          // FIXME: hack for tertiary statements
          if (!scanner.check(/^\w/)) {
            return [':', scanner.matched];
          }
          
          this.lex_state = EXPR_BEG;
          return ['tSYMBEG', scanner.matched];
        }
        
        this.lex_state = EXPR_FNAME;
        return ['tSYMBEG', ':'];
      }
      
      else if (scanner.scan(/^\[/)) {
        var result = scanner.matched;
        
        if (this.lex_state == EXPR_FNAME || this.lex_state == EXPR_DOT) {
          this.lex_state = EXPR_ARG
          if (scanner.scan(/^\]\=/)) {
            return ['tASET', '[]='];
          }
          else if (this.scanner.scan(/^\]/)) {
            return ['tAREF', '[]'];
          }
          else {
            throw "error, unexpecrted '[]' token"
          }
        }
        // space seen allows for method calls with array as first param
        // otherwise it thinks its calling the '[]' method
        else if (this.lex_state == EXPR_BEG || this.lex_state == EXPR_MID || space_seen) {
          return ['tLBRACK', scanner.matched]
        }
        // hmm?
        return ['[', scanner.matched]
      }
      
      else if (scanner.scan(/^\{/)) {
        var result;
        if ([EXPR_END, EXPR_CMDARG].indexOf(lex_state) !== -1) {
          // primary block
          result = '{';
        }
        else if (lex_state == EXPR_ENDARG) {
          // expr block
          result = tLBRACE_ARG;
        }
        else {
          // hash
          result = tLBRACE;
        }
        return [result, scanner.matched];
      }
      
      // ]
      else if (scanner.scan(/^\]/)) {
        lex_state = EXPR_END;
        return [']', scanner.matched];
      }      
      
      else if (scanner.scan(/^\;/)) {
        lex_state = EXPR_BEG;
        return [';', ';'];
      }
      // #
      else if (scanner.scan(/^\(/)) {
        var result = '(';
        if (this.lex_state == EXPR_BEG || this.lex_state == EXPR_MID) {
          result = 'tLPAREN';
        }
        else if (space_seen) {
          if (this.lex_state == EXPR_CMDARG) {
            result = 'tLPAREN_ARG';
          }
          else if(this.lex_state == EXPR_ARG) {
            // dont put space before arys
            result = 'tLPAREN2';
          }
        }
        this.lex_state = EXPR_BEG;
        return [result, scanner.matched];
      }
      // )
      else if (scanner.scan(/^\)/)) {
        this.lex_state = EXPR_END;
        return [')', scanner.matched];
      }
      
      // }
      else if (scanner.scan(/^\}/)) {
        lex_state = EXPR_END;
        // throw 'got to end of string'
        if (this.current_string_parse()) {
          this.current_string_parse().content = true
        }
        // check if parsing string...
        return ['}', scanner.matched];
      }
      
      // .
      else if (scanner.scan(/^\.\.\./)) {
        this.lex_state = EXPR_BEG;
        return ['tDOT3', scanner.matched];
      }
      else if (scanner.scan(/^\.\./)) {
        this.lex_state = EXPR_BEG;
        return ['tDOT2', scanner.matched];
      }
      else if (scanner.scan(/^\./)) {
        // should be EXPR_DOT in ALL cases?
        // if (lex_state == EXPR_FNAME) {
          this.lex_state = EXPR_DOT;
        // }
        return ['.', scanner.matched];
      }
      
      // ,
      else if (scanner.scan(/^\,/)) {
        lex_state = EXPR_BEG;
        return [',', scanner.matched];
      }
      
      // Class variabled
      else if (scanner.scan(/^\@\@\w*/)) {
        lex_state = EXPR_END;
        return [tCVAR, scanner.matched];
      }
      // Instance variables
      else if (scanner.scan(/^\@\w*/)) {
        this.lex_state = EXPR_END;
        return ['tIVAR', scanner.matched];
      }
      
      else if (scanner.scan(/^\=\>/)) {
        lex_state = EXPR_BEG;
        return [tASSOC, scanner.matched];
      }
      
      else if (scanner.scan(/^\=/)) {
        this.lex_state = EXPR_BEG;
        return ['=', scanner.matched];
      }
              
      else if (scanner.scan(/^\w+[\?\!]?/)) {
        switch (scanner.matched) {
          case 'def':
            this.lex_state = EXPR_FNAME;
            return ['kDEF', scanner.matched];
          case 'end':
            this.lex_state = EXPR_END;
            return ['kEND', scanner.matched];
          case 'class':
            // console.log(lex_state);
            // catch 'class' being used as a method name. This only works when class is used
            // like object.class .. you cannot just use 'class' to call class method on self
            // without explicitly stating self as the receiver.
            if (this.lex_state == EXPR_DOT || this.lex_state == EXPR_FNAME) {
              return ['tIDENTIFIER', scanner.matched];
            }
            this.lex_state = EXPR_CLASS;
            return ['kCLASS', scanner.matched];
          case 'module':
            this.lex_state = EXPR_BEG;
            return ['kMODULE', scanner.matched];
          case 'do':
            if (this.lex_state == EXPR_ENDARG) {
              this.lex_state = EXPR_BEG;
              return ['kDO_BLOCK', scanner.matched];
            }
            return ['kDO', scanner.matched];
          case 'if':
            if (this.lex_state == EXPR_BEG) {
              return ['kIF', scanner.matched];
            }
            this.lex_state = EXPR_BEG;
            return ['kIF_MOD', scanner.matched];
          case 'then':
            return ['kTHEN', scanner.matched];
          case 'else':
            return ['kELSE', scanner.matched];
          case 'elsif':
            return ['kELSIF', scanner.matched];
          case 'unless':
            if (this.lex_state == EXPR_BEG) {
              return ['kUNLESS', scanner.matched];
            }
            this.lex_state = EXPR_BEG;
            return ['kUNLESS_MOD', scanner.matched];
          case 'self':
            if (this.lex_state != EXPR_FNAME) {
              this.lex_state = EXPR_END;
            }
            return ['kSELF', scanner.matched];
          case 'super':
            lex_state = EXPR_ARG;
            return [kSUPER, scanner.matched];
          case 'true':
            this.lex_state = EXPR_END;
            return ['kTRUE', scanner.matched];
          case 'block_given?':
            this.lex_state = EXPR_END;
            return ['kBLOCK_GIVEN', scanner.matched];
          case 'false':
            this.lex_state = EXPR_END;
            return ['kFALSE', scanner.matched];
          case 'nil':
            this.lex_state = EXPR_END;
            return ['kNIL', scanner.matched];
          case 'return':
            lex_state = EXPR_MID;
            return [kRETURN, scanner.matched];
          case 'case':
            this.lex_state = EXPR_BEG;
            return ['kCASE', scanner.matched];
          case 'when':
            this.lex_state = EXPR_BEG;
            return ['kWHEN', scanner.matched];
          case 'yield':
            this.lex_state = EXPR_ARG;
            return ['kYIELD', scanner.matched];
          case '__FILE__':
            this.lex_state = EXPR_END;
            return ['k__FILE__', scanner.matched];
        }

        var matched = scanner.matched;

        // labels - avoid picking up a mod/class divide name
        if ((scanner.peek(2) != '::') && (scanner.scan(/^\:/))) {
          return ['tLABEL', matched + scanner.matched];
        }

        if (this.lex_state == EXPR_FNAME) {
          if (scanner.scan(/^=(?:(?![~>=])|(?==>))/)) {
            this.lex_state = EXPR_END;
            return ['tIDENTIFIER', matched + scanner.matched];
          }
        }
        
        // console.log('current state: ' + lex_state);
        
        if ([EXPR_BEG, EXPR_DOT, EXPR_MID, EXPR_ARG, EXPR_CMDARG].indexOf(this.lex_state) !== -1) {
          this.lex_state = EXPR_CMDARG;
        }
        else {
          this.lex_state = EXPR_END;
        }
        
        return [matched.match(/^[A-Z]/) ? 'tCONSTANT' : 'tIDENTIFIER', matched];
      }

      else {
        // false, false === end of stream
        return [false, false];      
      }
    }
    
  }
};