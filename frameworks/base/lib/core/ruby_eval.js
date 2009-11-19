/* 
 * ruby_eval.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
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
 
 // Inspiration
 // ===========
 // parse.js
 // Parser for Simplified JavaScript written in Simplified JavaScript
 // From Top Down Operator Precedence
 // http://javascript.crockford.com/tdop/index.html
 // Douglas Crockford
 // 2008-07-07

var EXPR_BEG    = 0,
    EXPR_END    = 1,
    EXPR_ENDARG = 2,
    EXPR_ARG    = 3,
    EXPR_CMDARG = 4,
    EXPR_MID    = 5,
    EXPR_FNAME  = 6,
    EXPR_DOT    = 7,
    EXPR_CLASS  = 8,
    EXPR_VALUE  = 9;

var kCLASS = 0,
    kMODULE = 1,
    kDEF = 2,
    kUNDEF = 3,
    kBEGIN = 4,
    kRESCUE = 5,
    kENSURE = 6,
    kEND = 7,
    kIF = 8,
    kUNLESS = 9,
    kTHEN = 10,
    kELSIF = 11,
    kELSE = 12,
    kCASE = 13,
    kWHEN = 14,
    kWHILE = 15,
    kUNTIL = 16,
    kFOR = 17,
    kBREAK = 18,
    kNEXT = 19,
    kREDO = 20,
    kELSIF = 21,
    kELSE = 22,
    kCASE = 23, 
    kWHEN = 24, 
    kWHILE = 25, 
    kUNTIL = 26,
    kFOR = 27,
    kBREAK = 28,
    kNEXT= 29,
    kREDO = 30,
    kRETRY = 31,
    kIN = 32,
    kDO_COND = 33,
    kDO_BLOCK = 34,
    kDO_LAMBDA = 35,
    kRETURN = 36,
    kYIELD= 37,
    kSUPER = 38,
    kSELF = 39,
    kNIL = 40,
    kTRUE = 41,
    kFALSE = 42,
    kAND = 43,
    kOR = 44,
    kNOT = 45,
    kIF_MOD = 46,
    kUNLESS_MOD= 47,
    kWHILE_MOD = 48,
    kUNTIL_MOD = 49,
    kRESCUE_MOD = 50,
    kALIAS = 51,
    kDEFINED = 52,
    klBEGIN = 53,
    klEND= 54,
    k__LINE__ = 55,
    k__FILE__ = 56,
    kDO = 57,
    kDEFined= 58,
    
    tIDENTIFIER = 59,
    tFID = 60,
    tGVAR = 61,
    tIVAR = 62,
    tCONSTANT = 63,
    tCVAR = 64,
    tLABEL = 65,
    tINTEGER = 66,
    tFLOAT= 67,
    tSTRING_CONTENT= 68, 
    tCHAR = 69,
    tNTH_REF = 70,
    tBACK_REF = 71,
    tREGEXP_END = 72,
    tUPLUS = 73,
    tUMINUS= 74,
    tPOW = 75,
    tCMP = 76,
    tEQ = 77,
    tEQQ = 78,
    tNEQ = 79,
    tGEQ = 80,
    tLEQ = 81,
    tANDOP = 82,
    tOROP = 83,
    tMATCH = 84,
    tNMATCH	= 85,
    tDOT2= 86,
    tDOT3 = 87,
    tAREF = 88,
    tASET = 89,
    tLSHFT = 90,
    tRSHFT = 91,
    tCOLON2 = 92,
    tCOLON3 = 93,
    tOP_ASGN = 94,
    tASSOC= 95,
    tLPAREN	= 96,
    tLPAREN_ARG	= 97,
    tRPAREN = 98,
    tLBRACK = 99,
    tLBRACE = 100,
    tLBRACE_ARG = 101,
    tSTAR = 102,
    tAMPER= 103,
    tLAMBDA = 104,
    tSYMBEG = 105,
    tSTRING_BEG = 106,
    tXSTRING_BEG = 107,
    tREGEXP_BEG = 108,
    tWORDS_BEG= 109,
    tQWORDS_BEG = 110,
    tSTRING_DBEG = 111,
    tSTRING_DVAR = 112,
    tSTRING_END = 113,
    tLAMBEG = 114,
    tUMINUS_NUM= 115,
    tSTRING = 116,
    tXSTRING_END = 117,
    
    tPLUS = 118,
    tMINUS = 119;
    
// Provides functions for parsing simple ruby directly within the browser. This 
// is very experimental, and should only be used for simple statements, like eval()
// for adding methods to classes. Supported language features are listed where
// relevant.

var vn_ruby_parser = function(str) {

  // current lex state
  var lex_state = EXPR_BEG;
  // the scanner
  var scanner; //= new vn_ruby_string_scanner(str);
  // current token
  var token;
  // 
  var sym_tbl = { };
  
  // create object dup
  var object_create = function(obj) {
    var targ = { };
    for (var prop in obj) {
      targ[prop] = obj[prop];
    }
    
    return targ;
  };
  
  var original_symbol = {
      nud: function () {
          throw ("Undefined.");
      },
      led: function (left) {
          throw ("Missing operator.");
      }
  };
  
  var symbol = function(id, binding_power) {
    var sym = sym_tbl[id];
    binding_power = binding_power || 0;
    if (sym) {
      if (binding_power >= sym.left_binding_power) {
        sym.left_binding_power = binding_power;
      }
    }
    else {
      sym = object_create(original_symbol);
      sym.type = sym.value = id;
      sym.left_binding_power = binding_power;
      sym_tbl[id] = sym;
    }
    return sym;
  };
  
  var sym_stmt = function (id, block) {
    var sym = symbol(id);
    sym.std = block;
    return sym;
  };
  
  // make a function for us that has a 'usual beahiour' (saves making a function
  // over and over) - +/-/*// all do the same thing etc
  var infix = function (id, bp, led) {
      var s = symbol(id, bp);
      s.led = led || function (left) {
          this.$lhs = left;
          this.$rhs = expr(bp);
          this.arity = "binary";
          return this;
      };
      return s;
  };
  
  // From ruby_parser.y - high => low
  // infixr(tUPLUS, 90);
  // right    '!' tTILDE tUPLUS
  // right    tPOW
  // infixr(tUMINUS, 70);
  // right    tUMINUS_NUM tUMINUS
  // left     tSTAR2 tDIVIDE tPERCENT
  infix(tPLUS, 50); // '+'
  infix(tMINUS, 50); // '-'
  // left     tPLUS tMINUS
  // left     tLSHFT tRSHFT
  // left     tAMPER2
  // left     tPIPE tCARET
  // left     '>' tGEQ '<' tLEQ
  // nonassoc tCMP tEQ tEQQ tNEQ tMATCH tNMATCH
  // left     tANDOP
  // left     tOROP
  // nonassoc tDOT2 tDOT3
  // right    '?' ':'
  // left     kRESCUE_MOD
  // right    '=' tOP_ASGN
  // # nonassoc kDEFINED
  // right    kNOT
  // left     kOR kAND
  // nonassoc kIF_MOD kUNLESS_MOD kWHILE_MOD kUNTIL_MOD
  // nonassoc tLBRACE_ARG
  // nonassoc tLOWEST
  
  // symbols etc
  symbol(tINTEGER).nud = function() { return this; };
  // infix("+", 50);
  
  sym_stmt(kDEF, function() {
    // n = fname
    var n = token;
    
    if (n.type === tIDENTIFIER || n.type === tCONSTANT) {
      console.log('it was!!!');
    }
    else {
      console.log('wasnt what we expected');
      console.log(n);
    }
    next_token();
    this.arglist = rule_arglist();
    
    // until we hit an 'end' token, parse 0 or more stmts
    var bodystmts = [];
    var bodystmt;
    
    while (true) {
      if (token.type === kEND || token.type === false) {
        console.log('token type..' + token.value);
        next_token();
        break;
        // return this;
      }
      if (bodystmt = stmt()) {
        bodystmts.push(bodystmt);
      }
    }
    
    
    return this;
  });
  
  // parse an arglist
  var rule_arglist = function() {
    // if we have a term (\n or ;) then no args, so return empty array??
    if (token.type === ';' || token.type === '\n') {
      next_token();
      return [];
    }
  };
  
  var stmts = function() {
    var result = [], s;
    while (true) {
      if (token.type === kEND || token.type === false) {
        next_token();
        console.log('breaking stmts with ' + token.value);
        break;
      }
      // if we have atleast one stmt, then we need to parse a 'term' (\n or ;) to
      // seperate stmt
      if (result.length > 0) {
        if (token.type === ';' || token.type === '\n') {
          console.log('ahppy days, found a term in stmts');
          next_token();
        }
        else {
          throw 'error in stmts!!! no term between stmts';
        }
      }
      if (s = stmt()) {
        result.push(s);
      };
    }
    return result;
  };
  
  var stmt = function() {
    var cur = token;
    
    if (cur.std) {
      next_token();
      return cur.std();
    }
    var e = expr(0);
    return e;
    // console.log('expression? ' + cur.value);
    // could be command_call, x && y, x || y, not x, !x or an arg
    // arg have assingments removed and put in stmt ^^
    
  };
  
  var expr = function(right_binding_power) {
    var old = token;
    console.log(old);
    var left = old.nud();
    next_token();
    while (right_binding_power < token.left_binding_power) {
      old = token;
      next_token();
      left = old.led(left);
    }
    return left;
  };

  
  // checks id of current token to make sure it matches, only if id is defined.
  var next_token = function(id) {
    var t = get_next_token();
    // console.log('token: (' + t[0] + ' : ' + t[1] + ') lex_state: (' + lex_state + ')');
    // token = { type: t[0], value:t[1] };
    // token = {};
    token = object_create(sym_tbl[t[0]]);
    token.type = t[0];
    token.value = t[1];
    // console.log(token);
    return token;
  };
  
  // actually get the next token
  var get_next_token = function() {
    var c = '',
        space_seen = false,
        last_state = lex_state;

    while (true) {
      if (scanner.scan(/\ |\t|\r/)) {
        space_seen = true;
        // console.log('found space: "' + scanner.matched + '"');
        continue;
      }
      else if (scanner.scan(/^\n|#/)) {
        c = scanner.matched;
        if (c == '#') {
          scanner.scan(/^.*\n/);
        }
        // we can skip any more blank lines..(combine them into one..)
        scanner.scan(/^\n+/);


        this.lex_state = EXPR_BEG;
        return ['\n', '\n'];
      }
      else if (scanner.scan(/[+-]/)) {
        var result = scanner.matched == '+' ? tPLUS : tMINUS;
        var sign = (result == tPLUS) ? tUPLUS : tUMINUS;
        // method name
        if (this.lex_state == EXPR_FNAME || this.lex_state == EXPR_DOT) {
          this.lex_state = EXPR_ARG;
          if (scanner.scan(/@/)) {
            return [sign, result + '@'];
          }
          else {
            return [sign, result];
          }
        }
        // += or -=
        if (scanner.scan(/\=/)) {
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
      else if (scanner.check(/[0-9]/)) {
        this.lex_state = EXPR_END;
        if (scanner.scan(/[\d_]+\.[\d_]+\b/)) {
          return [tFLOAT, scanner.matched];
        }
        else if (scanner.scan(/[\d_]+\b/)) {
          return [tINTEGER, scanner.matched];
        }
        else if (scanner.scan(/0(x|X)(\d|[a-f]|[A-F])+/)) {
          return [tINTEGER, scanner.matched];
        }
        else {
          console.log('unexpected number type');
          return [false, false];
        }
      }
      else if (scanner.scan(/\;/)) {
        this.lex_state = EXPR_BEG;
        return [';', ';'];
      }
      else if (scanner.scan(/\w+[\?\!]?/)) {
        switch (scanner.matched) {
          case 'def':
            this.lex_state = EXPR_FNAME;
            return [kDEF, scanner.matched];
          case 'end':
            this.lex_state = EXPR_END;
            return [kEND, scanner.matched];
          case 'class':
            // catch 'class' being used as a method name. This only works when class is used
            // like object.class .. you cannot just use 'class' to call class method on self
            // without explicitly stating self as the receiver.
            if (this.lex_state == EXPR_DOT) {
              return [tIDENTIFIER, scanner.matched];
            }
            this.lex_state = EXPR_CLASS;
            return [kCLASS, scanner.matched];
          case 'module':
            this.lex_state = EXPR_BEG;
            return [kMODULE, scanner.matched];
          case 'do':
            if (this.lex_state == EXPR_ENDARG) {
              this.lex_state = EXPR_BEG;
              return [kDO_BLOCK, scanner.matched];
            }
            return [kDO, scanner.matched];
          case 'if':
            if (this.lex_state == EXPR_BEG) {
              return [kIF, scanner.matched];
            }
            this.lex_state = EXPR_BEG;
            return [kIF_MOD, scanner.matched];
          case 'then':
            return [kTHEN, scanner.matched];
          case 'else':
            return [kELSE, scanner.matched];
          case 'elsif':
            return [kELSIF, scanner.matched];
          case 'unless':
            if (this.lex_state == EXPR_BEG) {
              return [kUNLESS, scanner.matched];
            }
            this.lex_state = EXPR_BEG;
            return [kUNLESS_MOD, scanner.matched];
          case 'self':
            if (this.lex_state != EXPR_FNAME) {
              this.lex_state = EXPR_END;
            }
            return [kSELF, scanner.matched];
          case 'super':
            this.lex_state = EXPR_ARG;
            return [kSUPER, scanner.matched];
          case 'true':
            this.lex_state = EXPR_END;
            return [kTRUE, scanner.matched];
          case 'false':
            this.lex_state = EXPR_END;
            return [kFALSE, scanner.matched];
          case 'nil':
            this.lex_state = EXPR_END;
            return [kNIL, scanner.matched];
          case 'return':
            this.lex_state = EXPR_MID;
            return [kRETURN, scanner.matched];
          case 'case':
            this.lex_state = EXPR_BEG;
            return [kCASE, scanner.matched];
          case 'when':
            this.lex_state = EXPR_BEG;
            return [kWHEN, scanner.matched];
          case 'yield':
            this.lex_state = EXPR_ARG;
            return [kYIELD, scanner.matched]
        }

        var matched = scanner.matched;

        // labels - avoid picking up a mod/class divide name
        if ((scanner.peek(2) != '::') && (scanner.scan(/\:/))) {
          return [tLABEL, matched + scanner.matched];
        }

        if (this.lex_state == EXPR_FNAME) {
          if (scanner.scan(/=(?:(?![~>=])|(?==>))/)) {
            this.lex_state = EXPR_END;
            return [tIDENTIFIER, matched + scanner.matched];
          }
        }

        this.lex_state = EXPR_END;
        return [matched.match(/^[A-Z]/) ? tCONSTANT : tIDENTIFIER, matched];
      }

      else {
        // false, false === end of stream
        return [false, false];      
      }
    }
  };
  

  
  
  
  
  
  // def
  // currenly assume no singleton
  // stmt(kDEF, function () {
  //   this.node = "def";
  //   var name = singleton();
  //   if (token[0] == kDOT) {
  //     // we are in singleton method.., so name is the singleton
  //     
  //     // pass through the dot
  //     next_token(kDOT);
  //     var f_name = fname();
  //   }
  //   else {
  //     // we are not in a singleton define. name should be a valid fname only.
  //     // we checked for any singleton, so it might not be, in which case throw
  //     // error (self can be singleton, but not fname)
  //   }    
  //   return this;
  // });
  
  // the parser - pass is the source to actually parse
  return function(parse_text) {
    scanner = new vn_ruby_string_scanner(parse_text);
    next_token();
    var s = stmts();
    return s;
  }
};


// String scanner
var vn_ruby_string_scanner = function(str) {
  // whole string
  this.str = str;
  // current index
  this.at = 0;
  // last matched data
  this.matched = "";
  // working string (basically str substr'd from the 'at' index to the end)
  this.working_string = str;
};

// adjusts the regexp so that it MUST start scanning from the beginning of the string.
vn_ruby_string_scanner.prototype._fix_regexp_to_match_beg = function(reg) {
  var old = reg.toString();
  if (old.substr(0, 2) == "/^") {
    return reg;
  }
  else {
    return new RegExp("^" + old.substr(1, old.length - 2));
  }
};

vn_ruby_string_scanner.prototype.scan = function(reg) {
  reg = this._fix_regexp_to_match_beg(reg);
  var res = reg.exec(this.working_string);
  if (res == null) {
    return false;
  }
  else if (typeof res == "object") {
    // array.
    this.at += res[0].length;
    this.working_string = this.working_string.substr(res[0].length);
    this.matched = res[0];
    return res;
  }
  else if (typeof res == "string") {
    this.at += res.length;
    this.working_string = this.working_string.substr(res.length);
    return res;
  }
  return false;
};

vn_ruby_string_scanner.prototype.check = function(reg) {
  reg = this._fix_regexp_to_match_beg(reg);
  var res = reg.exec(this.working_string);
  return res;
};

vn_ruby_string_scanner.prototype.matched = function() {
  
};

vn_ruby_string_scanner.prototype.peek = function(len) {
  return this.working_string.substr(0, len);
};

