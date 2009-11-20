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
    tMINUS = 119,
    
    tNL = 120,
    tSEMI = 121;

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
          return this;
      },
      led: function (left) {
          throw ("Missing operator.");
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
  
  var sym_stmt = function (id, block) {
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
  
  infix(".", 80, function (left) {
    this.first = left;
    // need to make sure left is a valid receiver: self, true, false, nil, number, string, object, hash etc
    
    // if (token.arity !== "name") {
      // token.error("Expected a property name.");
      // throw token.value
    // }
    if (token.type !== tIDENTIFIER && token.type !== tCONSTANT) {
      throw "expected identifier or constant method name . Got: " + token.value
    }
    token.arity = "literal";
    this.second = token;
    this.arity = "binary";
    next_token();
    return this;
  });
  
  infix("[", 80, function (left) {
          this.first = left;
          this.second = expr(0);
          this.arity = "binary";
          next_token("]");
          return this;
      });
  
  infix(kIF_MOD, 10, function (left) {
    this.first = left;
    // need to make sure left is a valid receiver: self, true, false, nil, number, string, object, hash etc
    
    // if (token.arity !== "name") {
      // token.error("Expected a property name.");
      // throw token.value
    // }
    if (token.type !== tIDENTIFIER && token.type !== tCONSTANT) {
      throw "expected identifier or constant method name . Got: " + token.value
    }
    token.arity = "literal";
    this.second = token;
    this.arity = "binary";
    next_token();
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
  
  // symbols etc
  symbol(tINTEGER).nud = function() { return this; };
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
  
  symbol(']');

  // dont think we need this - correction: we do
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
  
  // use this for statements starting with identifier
  sym_stmt(tIDENTIFIER, function() {
    var result = this;
    // if commar, then we are a parameter in another command call (unless syntax error..)
    if (token.type === ',') { 
      return result;
    }
    // nesetd calls..
    else if (token.type === '.') {
      
      next_token();
      if (token.type === tNL || token.type === tSEMI) {
        throw 'No receiver given for method call.'
      }
       // var s = stmt();
       // s.$recv = result;
       // result = s;
       // FIXME: why wont this set?!?!
       result.$call = stmt();
    }
    // aref (aset maybe)
    else if (token.type === '[') {
      result.$aref = stmt();
      // next_token();
      // FIXME:: this might have to be stmt()
      // var aref = expr();
      // console.log(aref);
      // result.$aref = aref;
      // next_token(']');
      // throw 'wait a sec'
    }
    else {
      // console.log('here with ' + this.value);
      result.$args = [];
      if (token.type === tNL || token.type === tSEMI) {
        return result;
      }
      // check for paranthesis?!
      else {
        // second param is if we have parathesis (might be useful for args parsing)
        gather_command_args(result, false);
      }
    }
    
    
    return result;
  });
  
 
  
  // gather more 'command_call' args into the cmd supplied. Add each one into the array
  var gather_command_args = function(cmd, parans) {
    while (true) {
      if (token.type === false) {
        // we might get false? maybe...?
        throw 'command call: unexpected EOF'
      }
      else if (token.type === tNL || token.type === tSEMI) {
        // next_token();
        // finished
        // break;
        return;
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
    // console.log('here like ' + token.value);
    // console.log(expr());
    // throw 'first key'
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
    next_token();
    this.$stmts = [];
      var s;
      while (true) {
        if (token.type === kEND) {
          next_token();
          break;
        }
        else if (token.type === false) {
          throw "Class.. unexpectedly hit end of file without finding 'end'"
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
    
    return this;
  });
  
  // Symbol statement. When we get kDEF, parse a full def statement
  sym_stmt(kDEF, function() {
    // n = fname
    var n = token;
    
    if (n.type === tIDENTIFIER || n.type === tCONSTANT) {
      // console.log('it was!!!');
      this.$fname = n;
    }
    else {
      console.log('wasnt what we expected');
      console.log(n);
    }
    next_token();
    // console.log(token.value + '..' + token.type);
    this.$arglist = rule_arglist();
    
    // until we hit an 'end' token, parse 0 or more stmts
    this.$stmts = [];
    var bodystmt;
    
    while (true) {
      // stop when we get to end of def (kEND or EOF)
      // eof should throw error (didnt get kEND)
      if (token.type === kEND || token.type === false) {
        next_token();
        break;
      }
      
      if (bodystmt = stmt()) {
        this.$stmts.push(bodystmt);
      }
      // console.log('added stmt: current val is now ' + token.value);
      // at the end of each statement, parse a new line or a semi colon
      if (this.$stmts.length > 0) {
        if (token.type === tSEMI || token.type === tNL) {
          next_token();
        }
        else {
          if (token.type !== kEND && token.type !== false) {
            throw 'error in stmts!!! no term between stmts ' + token.value;
          }
          
        }
      }
    }    
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
  
  // ruby makes it hard for us to use this... we cant just keep going until we hit
  // 'end' as this wont always be the case.. if statements end on elsif, else, etc..
  // looks like we have to implement this ourselves as appropriate... if must check
  // for elsif, else and end statements
  var stmts = function() {
    var result = [], s;
    while (true) {
      // this probably shouldnt do kEND.. def, class etc all eat this up themselves
      // if false, we should just end here.
      if (token.type === false) {
        // console.log('got here..');
        break;
      }
      // if we have atleast one stmt, then we need to parse a 'term' (\n or ;) to
      // seperate stmt
      if (result.length > 0) {
        if (token.type === tSEMI || token.type === tNL) {
          // console.log('ahppy days, found a term in stmts');
          next_token();
          // exit this iteration, and go back to start
          continue;
        }
        else {
          throw 'error in stmts!!! no term between stmts';
        }
      }
      if (s = stmt()) {
        // easy get rid of new lines
        if (s.type !== tNL) {
          result.push(s);
        }
        
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

