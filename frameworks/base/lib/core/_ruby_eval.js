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

    // lex states
var EXPR_BEG    = 0,    EXPR_END    = 1,    EXPR_ENDARG = 2,    EXPR_ARG    = 3,
    EXPR_CMDARG = 4,    EXPR_MID    = 5,    EXPR_FNAME  = 6,    EXPR_DOT    = 7,
    EXPR_CLASS  = 8,    EXPR_VALUE  = 9;

    // keywords
var kCLASS      = 0,    kMODULE     = 1,    kDEF        = 2,    kUNDEF      = 3,
    kBEGIN      = 4,    kRESCUE     = 5,    kENSURE     = 6,    kEND        = 7,
    kIF         = 8,    kUNLESS     = 9,    kTHEN       = 10,   kELSIF      = 11,
    kELSE       = 12,   kCASE       = 13,   kWHEN       = 14,   kWHILE      = 15,
    kUNTIL      = 16,   kFOR        = 17,   kBREAK      = 18,   kNEXT       = 19,
    kREDO       = 20,   kELSIF      = 21,   kELSE       = 22,   kCASE       = 23, 
    kWHEN       = 24,   kWHILE      = 25,   kUNTIL      = 26,   kFOR        = 27,
    kBREAK      = 28,   kNEXT       = 29,   kREDO       = 30,   kRETRY      = 31,
    kIN         = 32,   kDO_COND    = 33,   kDO_BLOCK   = 34,   kDO_LAMBDA  = 35,
    kRETURN     = 36,   kYIELD      = 37,   kSUPER      = 38,   kSELF       = 39,
    kNIL        = 40,   kTRUE       = 41,   kFALSE      = 42,   kAND        = 43,
    kOR         = 44,   kNOT        = 45,   kIF_MOD     = 46,   kUNLESS_MOD = 47,
    kWHILE_MOD  = 48,   kUNTIL_MOD  = 49,   kRESCUE_MOD = 50,   kALIAS      = 51,
    kDEFINED    = 52,   klBEGIN     = 53,   klEND       = 54,   k__LINE__   = 55,
    k__FILE__   = 56,   kDO         = 57,   kDEFined    = 58,
    // tokens
    tIDENTIFIER = 59,   tFID        = 60,   tGVAR       = 61,   tIVAR       = 62,
    tCONSTANT   = 63,   tCVAR       = 64,   tLABEL      = 65,   tINTEGER    = 66,
    tFLOAT      = 67,   tSTR_CONTENT= 68,   tCHAR       = 69,   tNTH_REF    = 70,
    tBACK_REF   = 71,   tREGEXP_END = 72,   tUPLUS      = 73,   tUMINUS     = 74,
    tPOW        = 75,   tCMP        = 76,   tEQ         = 77,   tEQQ        = 78, 
    tNEQ        = 79,   tGEQ        = 80,   tLEQ        = 81,   tANDOP      = 82,
    tOROP       = 83,   tMATCH      = 84,   tNMATCH	    = 85,   tDOT2       = 86, 
    tDOT3       = 87,   tAREF       = 88,   tASET       = 89,   tLSHFT      = 90, 
    tRSHFT      = 91,   tCOLON2     = 92,   tCOLON3     = 93,   tOP_ASGN    = 94, 
    tASSOC      = 95,   tLPAREN	    = 96,   tLPAREN_ARG	= 97,   tRPAREN     = 98,  
    tLBRACK     = 99,   tLBRACE     = 100,  tLBRACE_ARG = 101,  tSTAR       = 102,
    tAMPER      = 103,  tLAMBDA     = 104,  tSYMBEG     = 105,  tSTRING_BEG = 106,
    tXSTRING_BEG= 107,  tREGEXP_BEG = 108,  tWORDS_BEG  = 109,  tQWORDS_BEG = 110,
    tSTRING_DBEG= 111,  tSTRING_DVAR= 112,  tSTRING_END = 113,  tLAMBEG     = 114,
    tUMINUS_NUM = 115,  tSTRING     = 116,  tXSTRING_END= 117,
        
    tPLUS       = 118,  tMINUS      = 119,  tNL         = 120,  tSEMI       = 121;

var vn_ruby_parser = function(str) {

  // current lex state
  var lex_state = EXPR_BEG;
  // the scanner
  var scanner; //= new vn_ruby_string_scanner(str);
  // current token
  var token;
  // last token
  var last_token;
  // 
  var sym_tbl = { };
  // eval string..
  var eval_arr = [];
  
  /**
    String parsing
  */
  var string_parse_stack = [];
  
  var push_string_parse = function(o) {
    string_parse_stack.push(o);
  };
  
  var pop_string_parse = function() {
    string_parse_stack.pop();
  };
  
  var current_string_parse = function() {
    if (string_parse_stack.length == 0) {
      return null;
    }
    return string_parse_stack[string_parse_stack.length - 1];
  };
  
  
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
          return this;
      },
      led: function (left) {
          throw 'led unimplemented';
      }
  };
  
  var symbol = function(id, binding_power) {
    var sym = sym_tbl[id];
    binding_power = binding_power || 0;
    if (sym) {
      if (binding_power >= sym.lbp) {
        sym.lbp = binding_power;
      }
    }
    else {
      sym = object_create(original_symbol);
      sym.type = sym.value = id;
      sym.lbp = binding_power;
      sym_tbl[id] = sym;
    }
    return sym;
  };
  
  var sym_stmt = function (id, bp, block) {
    if (!block) {
      block = bp;
      bp = 0;
    }

    var sym = symbol(id);
    sym.std = block;
    return sym;
  };
  
  var infixr = function (id, bp, led) {
      var s = symbol(id, bp);
      s.led = led || function (left) {
          this.first = left;
          this.second = expr(bp - 1);
          this.arity = "binary";
          return this;
      };
      return s;
  };
  
  // make a function for us that has a 'usual beahiour' (saves making a function
  // over and over) - +/-/*// all do the same thing etc
  var infix = function (id, bp, led) {
      var s = symbol(id, bp);
      s.led = led || function (left) {
          this.$lhs = left;
          this.$rhs = expr(bp);
          this.type = id;
          return this;
      };
      return s;
  };
  
  var assignment = function (id) {
      return infixr(id, 10, function (left) {
          if (left.type !== "." && left.type !== "[" && left.type !== tIDENTIFIER && left.type != tIVAR) {
              left.error("Bad lvalue.");
          }
          this.$lhs = left;
          this.$rhs = stmt();
          this.assignment = true;
          // this.type = "assignment";
          return this;
      });
  };
  
  assignment("=");
  
  // General case method call. used for integers etc
  infix(".", 80, function (left) {
    // console.log("'.' infix");
    this.$recv = left;
    // need to make sure left is a valid receiver: self, true, false, nil, number, string, object, hash etc
    
    if (token.type !== tIDENTIFIER && token.type !== tCONSTANT) {
      throw "expected identifier or constant method name . Got: " + token.value
    }
    // this.$call = stmt();
    this.$call = token;
    next_token();
    
    // this should check for ANY valid param value..str, stmt etc etc... might be
    // easier to check for non-valid values.. maybe check for paranthesis first..
    // makes it easier..
    // if ([tIDENTIFIER, tINTEGER, tFLOAT, tSTRING_BEG].indexOf(token.type) != -1) {
      // console.log(token.value + ' is an identifier, use it as a param');
      // parse call args..
      // this.$arg =
      // this.$arg = stmt();
      // console.log(this.$arg);
      // gather_command_args(this);
    // }
    // check for params (if not new line, semi or commar then we should read it??)
    return this;
  });
  
  infix("[", 80, function (left) {
    // Fixme.. can probably take this out.
    this.$recv = left;
    this.$aref = expr(0);
    next_token("]");
    return this;
  });
  
  infix(kIF_MOD, 10, function (left) {
    this.$stmt = left;
    // need to make sure left is a valid receiver: self, true, false, nil, number, string, object, hash etc
    
    // if (token.arity !== "name") {
      // token.error("Expected a property name.");
      // throw token.value
    // }
    // if (token.type !== tIDENTIFIER && token.type !== tCONSTANT) {
      // throw "expected identifier or constant method name . Got: " + token.value
    // }
    this.$expr = stmt();
    // next_token();
    return this;
  });
  
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
  
  // string parsing
  symbol(tSTRING_BEG).nud = function() {

    // these will be string_contents mixed with actual ruby parse trees
    this.$parts = [];
    next_token();
    // throw token.value
    while (true) {
      if (token.type === false) {
        throw 'Parsing string error: not expecting EOF before end of string'
      }
      else {
        // console.log(token.value);
        if (token.type === tSTRING_END) {
          break;
        }
        else {
          this.$parts.push(token);
          next_token();
        }
        
      }
    }
    return this;
  };
  
  // symbols etc
  symbol(tINTEGER).nud = function() {
    return this;
  };
  
  symbol(tSEMI).nud = function() { return this; };
  symbol(tNL).nud = function() { return this; };
  symbol(false).nud = function() { return this; };
  symbol(tIVAR).nud = function() { return this; };
  
  symbol(tSYMBEG).nud = function() {
    //  we expect a next token
    
    next_token(); 
    this.$name = token; 
    // console.log('yeap. here ' + token.value);
    return this;
  };
  
  // This is basically where we handle all method calls which have a receiver. This
  // is called from identifiers, arrays, strings, numbers ans hashes all as the recv.
  // sym_stmt('.', function() {
  //   // should allow any op as well
  //   if (token.type !== tIDENTIFIER && token.type !== tCONSTANT) {
  //     throw 'Bad operation for dot notation: expected identifer, constant or op'
  //   }
  //   this.$meth = token.value;
  //   
  //   
  //   // console.log('dot notation ' + token.value);
  //   // temp naming schema
  //   // this.$desc = 'method_call';
  //   // this.$call = stmt();
  //   // console.log(this);
  //   // throw 'here..? ' + token.value
  //   return this;
  // });
  
  // array literal
  symbol(tLBRACK).nud = function() {
    this.$values = [];
    // throw next_token().value
    next_token();
    while (true) {
      if (token.type === false) {
        throw 'unexpected EOF in array literal'
      }
      else if (token.type === ']') {
        next_token();
        break;
      }
      else {
        this.$values.push(stmt());
        if (token.type === ',') {
          next_token();
          if (token.type === ']') {
            throw 'trailing "," in array definition'
          }
        }
      }
    }
    
    // If this array is then used as the recv in a mesage call, set this all up.
    // return the message_call, as thats the correct scope.
    if (token.type === '.') {
      var s = stmt();
      s.$recv = this
      return s;
    }
    return this;
  };
  
  
  symbol(']');
  
  // dont think we need this - correction: we do
  // aref
  symbol('[').nud = function() {
    next_token();
    this.$aref = stmt();
    // skip past closing bracket
    next_token(']');
    // catch aset
    if (token.type === '=') {
      next_token();
      this.$aset = stmt();
    }
    return this;
  };
  
  symbol(tIDENTIFIER).nud = function() { 
    console.log('tIDENTIFIER ' + this.value + '....' + token.value);
    return this;
  };
  
  infix(tIDENTIFIER, 80, function (left) {
    console.log('infix identifier: ' + this.value + '        , left is ' + left.value + ' token is, ' + token.type);
    console.log(left);
    left.$args = left.$args || [];
    left.$args.push([this]);
    return left;
    // this.$args = [];
    // this.$args.push(left);
    // return this;
  });
  
  // infixr(tIDENTIFIER, 90, function (left) {
    // throw left.value + ', ' + this.value
  // });
  
  // use this for statements starting with identifier
  // sym_stmt(tIDENTIFIER, 0, function() {
  //   return this;
  // // infixr(tIDENTIFIER, 0, function() {
  //   console.log('in identifier...');
  //   // throw token.value;
  //   // If commar, then we are a parameter in another command call (unless syntax error..)
  //   if (token.type === ',') {
  //     console.log('ignoring commar');
  //     return this;
  //   }
  //   // assignment
  //   if (token.type === '=') {
  //     // throw this.value + ' /// ' + token.value
  //     // go through assignment
  //     next_token();
  //     // value to se
  //     var s = stmt();
  //     console.log(s);
  //     throw 'end stmt'
  //   }
  //   // Handle nested called
  //   else if (token.type === '.') {
  //     var s = stmt();
  //     s.$recv = this
  //     return s;      
  //   }
  //   // Handle aref (possible aset as well, unless we leave that to expr)
  //   // currentl leave it to expr();
  //   else if (token.type === '[') {
  //     this.$aref = stmt();
  //     // next_token();
  //     // FIXME:: this might have to be stmt()
  //     // var aref = expr();
  //     // console.log(aref);
  //     // result.$aref = aref;
  //     // next_token(']');
  //     // throw 'wait a sec'
  //   }
  //   else {
  //     // console.log('here with ' + this.value);
  //     this.$args = [];
  //     if (token.type === tNL || token.type === tSEMI) {
  //       return this;
  //     }
  //     // check for paranthesis?!
  //     else {
  //       // paranthesized mehod
  //       if (token.type === '(') {
  //         // throw 'parannss'
  //         this.$paran = true;
  //         next_token();
  //       }
  //       // second param is if we have parathesis (might be useful for args parsing)
  //       gather_command_args(this, this.$paran);
  //     }
  //   }
  //   
  //   // throw token.value
  //   
  //   
  //   return this;
  // });
  
 
  
  // gather more 'command_call' args into the cmd supplied. Add each one into the array
  var gather_command_args = function(cmd, parans) {
    cmd.$args = [];
    while (true) {
      // console.log(token.type);
      if (token.type === false) {
        // we might get false? maybe...?
        throw 'command call: unexpected EOF'
      }
      else if (token.type === tNL || token.type === tSEMI) {
        // console.log('last token : ' + last_token.value);
        // if last token was a semi colon, we are allowed a new line (for params on seperate lines).
        // note: the commar must NOT start on the new line, it must be before tNL to indicate its
        // part of the method call
        
        // next_token();
        // finished
        // break;
        return;
      }
      else if (token.type === ')') {
        if (parans) {
          // end params..
          next_token();
          return;
        }
        else {
          throw 'Not expecting rparen ")" at end of args list'
        }
      }
      // hack: dont pick up these tokens...
      else if (token.type === ']') {
        return;
      }
      else {
        // console.log('in else with: ' + token.type);
        if (s = stmt()) {
          // console.log(s);
          cmd.$args.push(s);
          if (token.type === ',') {
            next_token();
          }
        }
        else {
          throw 'expected a stmt..(or expr)'
        };
      }

    }
  };
  
  
  sym_stmt(kIF, function() {
    this.$expr = expr();
    
    var seen = false;
    // pass optional term
    if (token.type === tNL || token.type === tSEMI) {
      next_token();
      seen = true;
    }
    if (token.type === kTHEN) {
      next_token();
      seen = true;
    }    
    // either new line or then. neither is a syntax error (we can have both)
    if (!seen) {
      throw 'if statement did not have new line or kTHEN'
    }
    // now into body of if statement
    this.$stmts = [];
    // tails... made up of elsifs and one else (optional)
    var opt_else = false;
      var s;
      while (true) {
        if (token.type === kEND) {
          next_token();
          // if we hit end here just return... dont check for elsif/else etc
          return this;
        }
        else if (token.type === kELSIF || token.type === kELSE) {
          // break here, now go onto if tail (dont next_token as we want to carry on)
          // from here.
          break;
        }
        else if (token.type === false) {
          throw "IF.. unexpectedly hit end of file without finding 'end'"
        }
        else {
          if (s = stmt()) {
            // easy get rid of new lines
            if (s.type !== tNL) {
              this.$stmts.push(s);
            }
            
          }
        }
      }
      // tail - elsif, else
      while (true) {
        if (token.type === kEND) {
          next_token();
          // we can end here
          return this;
        }
        else if (token.type === kELSIF || token.type === kELSE) {
          throw 'elsif/end unimplemented'
        }
        else if (token.type === false) {
          throw "If.. unexpeced End of file"
        }
        else {
          throw "unexpectred token within if: " + token.value
        }
      }
    
    // console.log(this);
    // throw 1
    return this;
  });
  
  // hash
  sym_stmt(tLBRACE, function() {
    // all key value pairs
    this.$keys = [];
    this.$values = [];
    var key, value;
    
    while (true) {
      // console.log('LOOPING ' + token.type);
      if (token.type === false) {
        throw 'in hash declaration: unexpectedly hit EOF.'
      }
      else if (token.type === tNL) {
        next_token();
        continue;
      }
      else if (token.type === '}') {
        // console.log('hit end!!');
        // hit end of hash
        next_token();
        break;
      }
      else {
        key = stmt();
        // pass tassoc
        next_token(tASSOC);
        value = stmt();
        this.$keys.push(key);
        this.$values.push(value);
        
        if (token.type === ',') {
          next_token();
          if (token.type === '}') {
            throw 'trailing commar in hash definition'
          }
        }
      }
    }
    // Handle nested call
    if (token.type === '.') {
      var s = stmt();
      s.$recv = this
      return s;      
    }
    return this;
  });
  
  sym_stmt(kCLASS, function() {
    var n = token;
    // class path
    if (token.type === tCONSTANT) {
      this.$cname = token;
      next_token();
    }
    else if (token.type === tIDENTIFIER) {
      throw "cannot use identifer as class name"
    }
    // temp get rid of new line/semi colon
    new_line();
    // get statements until we hit a kEND
    this.$stmts = stmts([kEND]);
    // eat up end token
    next_token(kEND);
    
    return this;
  });
  
  // Symbol statement. When we get kDEF, parse a full def statement
  sym_stmt(kDEF, function() {
    
    if (token.type === tIDENTIFIER || token.type === tCONSTANT) {
      this.$fname = token;
    }
    else {
      throw 'DEF: expected identifier or constant as def name'
    }
    // read over fname
    next_token();
    
    // arglist deals with the tNL/tSEMI after arglist for us
    this.$arglist = rule_arglist();
    
    // parse stmts until we hit kEND - end of def
    this.$stmts = stmts([kEND]);
    // read over kEND token
    next_token(kEND);
    
    return this;
  });
  
  // parse an arglist
  var rule_arglist = function() {
    // p true if we fidn paran
    var result = { }, p = false;
    // check for left param..
    if (token.type === '(') {
      p = true;
      next_token();
    }
    
    // parse args
    result.$args = rule_args();
    
    
    if (p && token.type === ')') {
      // console.log('skipping over rparen');
      next_token();
    }
    
    // if we have a term (\n or ;) then no args, so return empty array??
    if (token.type === tSEMI || token.type === tNL) {
      next_token();
      // return [];
    }
    
    // set this ready for the next line... only if we had no rparen
    // lex_state = EXPR_BEG;
    return result;
  };
  
  // parse args (not do block, just 'normal' argdefs)
  var rule_args = function() {
    var result = []
    while (true) {
      // console.log(token.value);
      if (token.type == ')' || token.type === tSEMI || token.type === tNL) {
        // console.log('breaking here');
        break;
      }
      else {
        // if not, must be an arg, so parse each (commar seperated)
        if (token.type === tIDENTIFIER) {
          result.push(token);
          next_token();
        }
        else if (token.type === tCONSTANT) {
          throw "Contants cannt be used as names for methods"
        }
        else if (token.type === tCVAR) {
          throw "Class Variables cannt be used as names for methods"
        }
        else if (token.type === tIVAR) {
          throw "Instance Variables cannt be used as names for methods"
        }
        else if (token.type === tGVAR) {
          throw "Global Variables cannt be used as names for methods"
        }
        
        if (token.type === ',') {
          next_token();
        }
        else if (token.type == ')' || token.type === tSEMI || token.type === tNL) {
          // these are all ok....
        }
        else {
          throw "arg, unexpected " + token.value();
        }
      }
    }
    return result;
  };
  
  /**
    Get an array of valid statements.
    
    @param u - an array of ending points.. when a token of one of these types is hit,
            the collection process stops. This is useful for stating an ending point.
            For example, class ends on a kEND token, so once we hit this, stop. This
            token is not collected, i.e. when control returns, kEND will be the 
            current token, so the caller deals with it as appropriate. If the EOF is
            hit before the end token is found, then an exception is thrown. If no
            ending points are provided, stmts are collected until EOF, but no 
            exception is thrown in that case. Stmts *MUST* be seperated by either tNL
            or tSEMI tokens.
  */
  var stmts = function(u) {
    u = u || [];
    var result = [], s;
    while (true) {
      // console.log('STARTING LOOP ' + token.type + "...." + token.value);
      // this probably shouldnt do kEND.. def, class etc all eat this up themselves
      // if false, we should just end here.
      if (token.type === false) {
        // throw error unless false is in 'u' ... EOF might be valid for top level statements
        console.log('got to end of file..');
        break;
      }
      else if (u.indexOf(token.type) != -1) {
        // the token is in the array, so we must finish...
        // dont read next token!!!! caller might need it.. (elsif etc)
        break;
      }
      else {
        // valid token stream..
        // console.log('getting stmt ' + token.type);
        s = stmt();
        console.log('found statement: ' + s.type + ', ' + s.value);
        // console.log(s.type);
        // FIXME: this should really check for stmt, new line, stmt, new line .. etc
        if (s.type !== tNL && s.type !== tSEMI) {
          result.push(s);
        }
        
      }
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
  
  /**
    Simply parses the next token ensuring it is a new line (tNL) and
    returns. Throws an error if not a new line. Note: this also
    allows the tSEMI token to parse, as this is a valid replacement
    for tNL
  */
  var new_line = function() {
    if (token.type === tNL || token.type === tSEMI) {
      next_token();
      return;
    }
    else {
      throw 'Parsing error: did not get expected new line token.'
    }
  };
  
  var expr = function(right_binding_power) {
    var old = token;
    // console.log(old);
    var left = old.nud();
    next_token();
    while (right_binding_power < token.lbp) {
      old = token;
      next_token();
      left = old.led(left);
    }
    return left;
  };
  
  var get_next_string_token = function() {
    var str_parse = current_string_parse();
    
    // see if we can read end of string/xstring/regexp markers
    if (scanner.scan( new RegExp('^\\' + str_parse.beg))) {
      pop_string_parse();
      if (str_parse.beg == '"' || str_parse.beg == "'") {
        lex_state = EXPR_END;
        return [tSTRING_END, scanner.matched];
      }
      else {
        // assume to be xstring
        return [tXSTRING_END, scanner.matched]
      }
    }
    
    // not end of string, so we must be parsing contents
    var str_buffer = [];
    
    if (scanner.scan(/^#(\$|\@)/)) {
      return [tSTRING_DVAR, scanner.matched];
    }
    else if (scanner.scan(/^#\{/)) {
      // we are into ruby code, so stop parsing content (for the moment)
      str_parse.content = false;
      return [tSTRING_DBEG, scanner.matched];
    }
    else if (scanner.scan(/^#/)) {
      str_buffer.push('#');
    }
    
    // content regexp (what is valid content for strings..)
    var reg_exp = (str_parse.beg == '`') ?
                // xstring: CAN include new lines
                new RegExp('[^\\' + str_parse.beg + '\#\0\\]+|.') :
                // normal string: cannot include new lines
                new RegExp('[^\\' + str_parse.beg + '\#\0\\\n]+|.');
    
    scanner.scan(reg_exp);
    str_buffer.push(scanner.matched);
    return [tSTR_CONTENT, str_buffer.join('')];
  };

  
  // checks id of current token to make sure it matches, only if id is defined.
  var next_token = function(id) {
    // last token support
    last_token = token;
    // capture string stuff
    if (current_string_parse() && current_string_parse().content) {
      // console.log('geting str token');
      var t = get_next_string_token();
      // console.log('string token: (' + t[0] + ' : ' + t[1] + ') lex_state: (' + lex_state + ')');
      // token = object_create(sym_tblt);
      token = { };
      token.type = t[0];
      token.value = t[1];
      return token;
    }    
    
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
      // console.log(scanner.working_string);
      // if (scanner.scan(/\ |\t|\r/)) {
        if(scanner.scan(/^(\ |\t|\r)/)) {
        space_seen = true;
        // console.log('found space: "' + scanner.matched + '"');
        // console.log(scanner.working_string);
        continue;
      }
      else if (scanner.scan(/^(\n|#)/)) {
        // console.log('found: ' + scanner.matched);
        c = scanner.matched;
        if (c == '#') {
          scanner.scan(/^(.*\n)/);
        }
        // we can skip any more blank lines..(combine them into one..)
        scanner.scan(/^(\n+)/);
        // console.log('we scanned lots');
        // console.log(scanner.matched);
        
        if (lex_state == EXPR_BEG) {
          continue;
        }

        lex_state = EXPR_BEG;
        return [tNL, '\n'];
      }
      else if (scanner.scan(/^[+-]/)) {
        var result = scanner.matched == '+' ? tPLUS : tMINUS;
        var sign = (result == tPLUS) ? tUPLUS : tUMINUS;
        // method name
        if (lex_state == EXPR_FNAME || lex_state == EXPR_DOT) {
          lex_state = EXPR_ARG;
          if (scanner.scan(/^@/)) {
            return [sign, result + '@'];
          }
          else {
            return [sign, result];
          }
        }
        // += or -=
        if (scanner.scan(/^\=/)) {
          lex_state = EXPR_BEG;
          return [tOP_ASGN, result];
        }

        if (lex_state == EXPR_BEG || lex_state == EXPR_MID) {
          lex_state = EXPR_BEG;
          return [sign, result];
        }

        lex_state = EXPR_BEG;
        return [result, scanner.matched];
      }
      
      // strings.. in order: double, single, xstring
      else if (scanner.scan(/^\"/)) {
        push_string_parse({ beg: '"', content: true });
        return [tSTRING_BEG, scanner.matched];
      }
      else if (scanner.scan(/^\'/)) {
        push_string_parse({ beg: "'", content: true });
        return [tSTRING_BEG, scanner.matched];
      }
      else if (scanner.scan(/^\`/)) {
        push_string_parse({ beg: "`", content: true });
        return [tXSTRING_BEG, scanner.matched];
      }
      
      // numbers
      else if (scanner.check(/^[0-9]/)) {
        lex_state = EXPR_END;
        if (scanner.scan(/^[\d_]+\.[\d_]+\b/)) {
          return [tFLOAT, scanner.matched];
        }
        else if (scanner.scan(/^[\d_]+\b/)) {
          return [tINTEGER, scanner.matched];
        }
        else if (scanner.scan(/^0(x|X)(\d|[a-f]|[A-F])+/)) {
          return [tINTEGER, scanner.matched];
        }
        else {
          console.log('unexpected number type');
          return [false, false];
        }
      }
      
      else if (scanner.scan(/^\:/)) {
        // console.log ("HERE " + lex_state);
        if (lex_state === EXPR_END || lex_state === EXPR_ENDARG || scanner.check(/^\s/)) {
          // FIXME: hack for tertiary statements
          if (!scanner.check(/^\w/)) {
            return [':', scanner.matched];
          }
          
          lex_state = EXPR_BEG;
          return [tSYMBEG, scanner.matched];
        }
        
        lex_state = EXPR_FNAME;
        return [tSYMBEG, ':'];
      }
      
      else if (scanner.scan(/^\[/)) {
        result = scanner.matched;
        
        if (lex_state == EXPR_FNAME || lex_state == EXPR_DOT) {
          lex_state = EXPR_ARG
          if (scanner.scan(/^\]\=/)) {
            return [tASET, '[]='];
          }
          else if (scanner.scan(/^\]/)) {
            return [tAREF, '[]'];
          }
          else {
            throw "error, unexpecrted '[]' token"
          }
        }
        // space seen allows for method calls with array as first param
        // otherwise it thinks its calling the '[]' method
        else if (lex_state == EXPR_BEG || lex_state == EXPR_MID || space_seen) {
          return [tLBRACK, scanner.matched]
        }
        // hmm?
        return ['[', scanner.matched]
      }
      
      else if (scanner.scan(/^\{/)) {
        var result;
        if (lex_state == EXPR_END) {
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
        return [tSEMI, ';'];
      }
      // #
      else if (scanner.scan(/^\(/)) {
        var result = '(';
        if (lex_state == EXPR_BEG || lex_state == EXPR_MID) {
          result = tLPAREN;
        }
        else if (space_seen) {
          if (lex_state == EXPR_CMDARG) {
            result = tLPAREN_ARG;
          }
          else if(lex_state == EXPR_ARG) {
            // dont put space before arys
            result = tLPAREN2;
          }
        }
        lex_state = EXPR_BEG;
        return [result, scanner.matched];
      }
      // )
      else if (scanner.scan(/^\)/)) {
        lex_state = EXPR_END;
        return [')', scanner.matched];
      }
      
      // }
      else if (scanner.scan(/^\}/)) {
        lex_state = EXPR_END;
        // check if parsing string...
        return ['}', scanner.matched];
      }
      
      // .
      else if (scanner.scan(/^\./)) {
        if (lex_state == EXPR_FNAME) {
          lex_state = EXPR_DOT;
        }
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
        lex_state = EXPR_END;
        return [tIVAR, scanner.matched];
      }
      
      else if (scanner.scan(/^\=\>/)) {
        lex_state = EXPR_BEG;
        return [tASSOC, scanner.matched];
      }
      
      else if (scanner.scan(/^\=/)) {
        lex_state = EXPR_BEG;
        return ['=', scanner.matched];
      }
              
      else if (scanner.scan(/^\w+[\?\!]?/)) {
        switch (scanner.matched) {
          case 'def':
            lex_state = EXPR_FNAME;
            return [kDEF, scanner.matched];
          case 'end':
            lex_state = EXPR_END;
            return [kEND, scanner.matched];
          case 'class':
            // catch 'class' being used as a method name. This only works when class is used
            // like object.class .. you cannot just use 'class' to call class method on self
            // without explicitly stating self as the receiver.
            if (lex_state == EXPR_DOT) {
              return [tIDENTIFIER, scanner.matched];
            }
            lex_state = EXPR_CLASS;
            return [kCLASS, scanner.matched];
          case 'module':
            lex_state = EXPR_BEG;
            return [kMODULE, scanner.matched];
          case 'do':
            if (lex_state == EXPR_ENDARG) {
              lex_state = EXPR_BEG;
              return [kDO_BLOCK, scanner.matched];
            }
            return [kDO, scanner.matched];
          case 'if':
            if (lex_state == EXPR_BEG) {
              return [kIF, scanner.matched];
            }
            lex_state = EXPR_BEG;
            return [kIF_MOD, scanner.matched];
          case 'then':
            return [kTHEN, scanner.matched];
          case 'else':
            return [kELSE, scanner.matched];
          case 'elsif':
            return [kELSIF, scanner.matched];
          case 'unless':
            if (lex_state == EXPR_BEG) {
              return [kUNLESS, scanner.matched];
            }
            lex_state = EXPR_BEG;
            return [kUNLESS_MOD, scanner.matched];
          case 'self':
            if (lex_state != EXPR_FNAME) {
              lex_state = EXPR_END;
            }
            return [kSELF, scanner.matched];
          case 'super':
            lex_state = EXPR_ARG;
            return [kSUPER, scanner.matched];
          case 'true':
            lex_state = EXPR_END;
            return [kTRUE, scanner.matched];
          case 'false':
            lex_state = EXPR_END;
            return [kFALSE, scanner.matched];
          case 'nil':
            lex_state = EXPR_END;
            return [kNIL, scanner.matched];
          case 'return':
            lex_state = EXPR_MID;
            return [kRETURN, scanner.matched];
          case 'case':
            lex_state = EXPR_BEG;
            return [kCASE, scanner.matched];
          case 'when':
            lex_state = EXPR_BEG;
            return [kWHEN, scanner.matched];
          case 'yield':
            lex_state = EXPR_ARG;
            return [kYIELD, scanner.matched]
        }

        var matched = scanner.matched;

        // labels - avoid picking up a mod/class divide name
        if ((scanner.peek(2) != '::') && (scanner.scan(/^\:/))) {
          return [tLABEL, matched + scanner.matched];
        }

        if (lex_state == EXPR_FNAME) {
          if (scanner.scan(/^=(?:(?![~>=])|(?==>))/)) {
            lex_state = EXPR_END;
            return [tIDENTIFIER, matched + scanner.matched];
          }
        }

        lex_state = EXPR_END;
        return [matched.match(/^[A-Z]/) ? tCONSTANT : tIDENTIFIER, matched];
      }

      else {
        // false, false === end of stream
        return [false, false];      
      }
    }
  };
  
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

vn_ruby_string_scanner.prototype.scan = function(reg) {
  // reg = this._fix_regexp_to_match_beg(reg);
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
  // reg = this._fix_regexp_to_match_beg(reg);
  var res = reg.exec(this.working_string);
  return res;
};

vn_ruby_string_scanner.prototype.matched = function() {
  
};

vn_ruby_string_scanner.prototype.peek = function(len) {
  return this.working_string.substr(0, len);
};

