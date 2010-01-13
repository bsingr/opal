/* 
 * parse.js
 * charles
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

    // special tokens (used for generator)
var tCALL       = 150,  tMLHS       = 151;

/**
  Parse the given ruby code, str, with the given filename. This allows us to
  dynamically set the filename, for example, with eval()'d code. This returns
  an Instruction sequence, with all of its sub sequences, opcodes etc.
*/
var vn_parser = function(filename, str) {

  // current lex state
  var lex_state = EXPR_BEG;
  // last lexerparser state
  var last_state;
  // the scanner
  var scanner; //= new vn_ruby_string_scanner(str);
  // current token
  var token = { type: false, value: false };
  // last token
  var last_token = { type: false, value: false };
  // 
  var sym_tbl = { };
  // eval string..
  var eval_arr = [];
  // valid types of stmt that are valid as the first cmd args (helps us identify if the
  // next statemebnt should be appeneded to the current identifer as a cmd arg )
  var valid_cmd_args = [tIDENTIFIER, tINTEGER, tCONSTANT, tSTRING_BEG, kDO, '{', tSYMBEG];
  // start of command (not stmt), when on new line etc
  var cmd_start = false;
  
  // all contexts
  var contexts = [];
  
  // function push_context(c) {
  //   contexts.push(c);
  // }
  
  
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
  
  var prefix = function (id, nud) {
      var s = symbol(id);
      s.nud = nud || function () {
          scope.reserve(this);
          this.first = expression(70);
          this.arity = "unary";
          return this;
      };
      return s;
  };
  
  var assignment = function (id) {
      return infixr(id, 10, function (left) {
          if (left.type !== "." && left.type !== "[" && left.type !== tIDENTIFIER && left.type != tIVAR && left.type !== tMLHS && left.type !== tCONSTANT) {
              throw 'bad lhs'
          }
          this.$lhs = left;
          this.$rhs = stmt();
          this.assignment = true;
          // this.type = "assignment";
          return this;
      });
  };
  
  assignment("=");
  
  symbol(kDO).nud = function() {
    if (token.type == '|') {
      var e;
      this.$args = [];
      // gather block params
      next_token();
      e = expr();
      this.$args.push(e);
      while (true) {
        if (token.type == "|") {
          next_token();
          break;
        }
        else if (token.type == ",") {
          next_token();
          continue;
        }
        else {
          this.$args.push(expr());
        }
        // throw "erm.."
      }
    }
    // throw token.value
    // next_token();
    // throw token.type
    this.$stmts = stmts([kEND]);
    // read over kEND
    next_token();
    return this;
  };
  
  // alt block
  symbol('{').nud = function() {
    // read over {
      this.$stmt = stmt();
      // read over }
      next_token('}');
      return this;
  };
    
  // self... simple, just return
  symbol(kSELF).nud = function() {
    return this;
  };
  
  symbol(kRETURN).nud = function() {
    return this;
  };
  
  symbol(kNIL).nud = function() {
    return this;
  };
  
  symbol(kSUPER).nud = function() {
    return this;
  };
  
  symbol(kTRUE).nud = function() {
    return this;
  };
  
  symbol(kFALSE).nud = function() {
    return this;
  };
  
  symbol(tSTRING_BEG).nud = function() {
    // console.log('in hre..');
    // these will be string_contents mixed with actual ruby parse trees
    this.$parts = [];
    // next_token();
    // throw token.value
    while (true) {
      if (token.type === false) {
        throw 'Parsing string error: not expecting EOF before end of string'
      }
      else {
        // console.log(token.value);
        if (token.type === tSTRING_END) {
          next_token();
          break;
        }
        else {
          if (token.type === tSTR_CONTENT) {
            this.$parts.push(token)
            next_token();
          }
          else if (token.type === tSTRING_DBEG) {
            var d = token;
            // skip over dbeg
            next_token();
            d.$value = stmt();
            this.$parts.push(d);
            // skip over '}'
            next_token();
          }
          // console.log('found a part');
          // this.$parts.push(token);
          // next_token();
        }
        
      }
    }
    return this;
  };
  
  // when we get identifier identifier (treat first like receiver, second like arg1)
  symbol(tIDENTIFIER).nud = function() {
    // we need to check last_state, as lex_state (current) is overridden when parsing current token
    if ((valid_cmd_args.indexOf(token.type) != -1) && (last_state == EXPR_CMDARG)) {
      // console.log("about to gather command args..");
      gather_command_args(this);
      this.type = tCALL;
      this.$recv = null;
      this.$meth = this.value;
      // this.$meth = this;
    }
    return this;
  };
  
  symbol(tCONSTANT).nud = function() {
    return this;
  };
  
  // the 'command' to apply the argumens to
  // FIXME: rewrite to asume first arg is not neceserialy a arg, it could be start
  // of assocs, or might be start of kDO
  var gather_command_args = function(cmd) {
    cmd.$call_args = {
      args: []
    };
    // console.log('tIDENTIFIER "' + token.value + '" lex state: ' + lex_state + ' last state: ' + last_state + ' ,last token: ' + last_token.value);
    if ((token.type !== kDO) && (token.type !== '{')) {
      // dont add if next statement is kDO...
      // console.log("getting exopr..");
      cmd.$call_args.args.push(expr());
    }
    
    // collect remaining params
    if (token.type === ',') {
      // read over initial commar
      next_token();
      while (true) {
        s = expr();
        // s = expr(80);
        // this.$args.push(stmt());
        // check if tok is tASSOC.. if so, , then we
        // are beginning a hash list, so dont add stmt to $args, but push it to
        // the hash arg list instead
        // console.log(token.type);
        if (token.type === tASSOC) {
          // console.log('found tassoc');
          // should we check if we already have assoc list? having it more than once per cmd call
          // might be an error
          var a_keys = [], a_values = [];
          cmd.$assocs = { '$keys': a_keys, '$values': a_values };
          a_keys.push(s);
          // read over tassoc
          next_token();
          a_values.push(expr());
          
          while (true) {
            if (token.type !== ',') {
              // end of assoc list
              break;
            }
            // read over commar
            next_token(',');
            a_keys.push(expr());
            next_token(tASSOC);
            a_values.push(expr());
          }
          
          // console.log(this);
          // throw 'hash begin!'
        }
        else {
          cmd.$call_args.args.push(s);
        }
        // CHECK HERE for do_block
        // move this outside of loop? once we have do_block, command is over
        
        
        if (token.type !== ',') {
          break;
        }
        // any other case, add it as an arg
        
        // console.log(token.type);
        next_token(',');
        // check for 'wrong' token types... a def, class, module etc are NOT valid tokens
        if ([kDEF, kCLASS, kMODULE, kIF].indexOf(token.type) !== -1) {
          throw 'Command Args: Not expecting token "' + token.type + '". Perhaps a trailing commar?'
        }
      }
    }
    if (token.type === kDO) {
      // gather do block
      cmd.$brace_block = stmt();
    }
    else if (token.type === '{') {
      // gather rlcurly block
      cmd.$brace_block = stmt();
    }
  };
  
  // kDO opt_block_param compstmt kEND
  var gather_do_block = function() {
    var result = token;
    // read over kDO
    next_token();
    // throw token.value
    result.$stmts = stmts([kEND]);
    // read over kEND
    next_token();
    return result;
  }
  
  symbol(tINTEGER).nud = function() { 
    return this; 
  };
  
  symbol(tSYMBEG).nud = function() {
    this.$name = stmt();
    return this;
  };
  
  symbol(tIVAR).nud = function() {
    return this;
  };
  
  symbol(tCVAR).nud = function() {
    return this;
  };
  
  symbol(tGVAR).nud = function() {
    return this;
  };
  
  // Catching block definitions in Def statements.
  symbol("&").nud = function() {
    this.$name = stmt();
    return this;
  }
  
  
  infix(",", 80, function(left) {
    this.type = tMLHS;
    // check if already part of a mLHS chain
    if (left.type == tMLHS) {
      // add to current chain
      throw "in here.." + token.value
    }
    else {
      // start new chain
      this.$parts = [];
      this.$parts.push(left);
      this.$parts.push(expr(10));
      // dont get next_token. expr() gets it for us.
      // next_token();
      // this.$parts.push(next_token());
    }
    // throw token.value
    // throw "in here.." + token.value
    
    
    return this;
  });
  
  
  /**
    Fixme!! this is going to break!!
    
    Argh! not sure how we are going to do mlghs, mrhs
  */
  // infix(',', 80, function(left) {
  //   this.$lhs = left;
  //   if (token.type === tSYMBEG) {
  //     // throw 'we need to parse an assoc.'
  //     next_token();
  //     next_token();
  //     next_token();
  //     next_token();
  //   }
  //   else {
  //     this.$rhs = stmt();
  //   }
  //   
  //   return this;
  // });
  
  // Dot notation
  infix(".", 80, function (left) {
    // console.log('doing dot!')
    this.$recv = left;
    this.$meth = token;
    this.type = tCALL;
    // skip over dot
    next_token();
    if ((valid_cmd_args.indexOf(token.type) != -1) && (last_state === EXPR_CMDARG)) {
      gather_command_args(this);
    }
    // else {
      // if not, check if we just have a block...... no args, just block..
      // e.g. my_array.each do ...
      // could we just add kDO to the valid_cmd_args array...?
      // throw token.value
    // }
    
    return this;
  });
  
  // m - method name
  //  b - binding power
  // used for a + a, a - a,  a << a etc. (as m)
  function meth_call(m, b) {
    return infix(m, b, function(left) {
      this.type = tCALL;
      this.$recv = left;
      this.$meth = this;
      this.$call_args = {
        args: [stmt()]
      }
      return this;
    });
  }
  
  meth_call(tPLUS, 80);
  meth_call(tMINUS, 80);
  meth_call("*", 80);
  meth_call("/", 80);
  
    
  // method calls (with paranthesis)
  infix("(", 80, function (left) {
      var args = {
        args: []
      };
      // valid left values
      if (left.type === '.') {
        // already a method call, so just set $args property
        left.$call_args = args;
      }
      else if (left.type === tIDENTIFIER || left.type === tCONSTANT || left.type === tCALL) {
        // identifier/constant - turn them into a method call, with args
        // as the args (and no receiver!)
        // will identifier already be a method call? unless an actual identifier
        left.$call_args = args;
      }
      else {
        throw left.value + ' is not a valid receiver'
      }
      
      if (token.type !== ')') {
        while (true) {
          // console.log("gaething..");
          args.args.push(expr());
          if (token.type !== ',') {
            break;
          }
          next_token(',');
        }
      }
      next_token(')');
      
      if (token.type === kDO) {
        // gather do block
        left.$block = stmt();
      }
      else if (token.type === '{') {
        // gather rlcurly block
        left.$block = stmt();
      }
      
      return left;
    });
  
  // array declarations (explicit)
  prefix(tLBRACK, function() {
    var arr = [];
    // throw token.value
    if (token.type !== ']') {
      while (true) {
        arr.push(expr());
        if (token.type !== ',') {
          break;
        }
        next_token(',');
      }
    }
    next_token(']');
    this.$values = arr;
    return this;
  });
  
  // hash literal
  prefix(tLBRACE, function () {
    this.$keys = [];
    this.$values = [];
    if (token.type !== '}') {
      while (true) {
        var t = token;
        // check for valid key?
        next_token();
        // should this be a => ?? probbaly...
        next_token();
        this.$keys.push(t);
        this.$values.push(stmt());
        if (token.type !== ',') {
          break;
        }
        next_token(',');
      }
    }
    next_token('}');
    return this;
  });
  
  prefix(kCASE, function() {
    this.$expr = stmt();
    this.$body = [];
    
    if (token.type == tNL || token.type == tSEMI) next_token();
    
    while (true) {
      if (token.type == kEND) {
        next_token();
        break;
      }
      else if (token.type == kWHEN) {
        var s, t = token;
        t.$args = [];
        next_token();
        if ([tNL, tSEMI, ","].indexOf(token.type) != -1) 
          throw "kCASE: not expecting given token type"
        while (true) {
          s = stmt();
          t.$args.push(s);
          if (token.type == ",") next_token();
          else break;
        }
        t.$stmts = stmts([kEND, kELSE, kWHEN]);
      }
      else if (token.type == kELSE) {
        var t = token;
        next_token();
        // throw "jere"
        t.$stmts = stmts([kEND]);
        // throw "erm"
      }
    }
    return this;
  });
  
  // if statment - expression, not really a statement.
  prefix(kIF, function() {
    this.$expr = stmt();
    this.$tail = [];
    
    if (token.type == tNL || token.type == tSEMI) {
      next_token();
      if (token.type == kTHEN) next_token();
    }
    else if (token.type == kTHEN) {
      next_token();
    }
    else {
      throw "kIF: expecting either term or kTHEN"
    }
    
    this.$stmts = stmts([kEND, kELSE, kELSIF]);
    
    while (true) {
      if (token.type == kEND) {
        next_token();
        break;
      }
      else if (token.type == kELSIF) {
        var t = token;
        next_token();
        t.$expr = stmt();

        if (token.type == tNL || token.type == tSEMI) {
          next_token();
          if (token.type == kTHEN) next_token();
        }
        else if (token.type == kTHEN) {
          next_token();
        }
        else {
          throw "kIF: expecting either term or kTHEN"
        }
        
        t.$stmts = stmts([kEND, kELSIF, kELSE]);
        this.$tail.push(t);
      }
      else if (token.type == kELSE) {
        var t = token;
        next_token();
        t.$stmts = stmts([kEND]);
        this.$tail.push(t);
      }
      else {
        throw "kIF: unexpected token: " + token.type + ", " + token.value
      }
    }

    return this;
  });
  
  // method definitions
  sym_stmt(kDEF, function () {
    
    if (token.type === tIDENTIFIER || token.type === tCONSTANT || token.type === kSELF) {
      this.$fname = token;
    }
    else {
      throw 'Method Defintion: expected identifier or constant as def name.'
    }
    // reads over the fname
    next_token();
    
    // check if singleton definition
    if (token.type === '.' || token.type === tCOLON2) {
      // we have a singleton, so put old $fname as singleton name
      this.$sname = this.$fname;
      // stype is either '.' or tCOLON2 - might help code generation
      this.$stype = token.type;
      // now get real fname
      next_token();
      this.$fname = token;
      // read over fname
      next_token();
    }
    else {
      // check we havent shot ourself in the foot
      if (this.$fname.type === kSELF) {
        throw "Cannot use keyword 'self' as method name"
      }
    }
    
    // ignore arglist for the moment.
    if (token.type === tNL || token.type === tSEMI) {
      // we can ignore... nothing to do
    }
    else {
      
      this.$arglist = {
        arg: [],
        rest_arg: [],
        opt_arg: [],
        opt_block_arg: null
      };
      
      if (token.type === '(') {
        // params with paranthesis
        this.$paran = true;
        next_token();
      }
      while (true) {
        if (token.type === ')') {
          // end of params..check if we actually had start paran?
          next_token();
          break;
        }
        else {
          // for now assume every stmt will be a regular arg. need to check actual types
          // later
          var s = stmt();
          this.$arglist.arg.push(s);
          if (token.type == ',') {
            // read over commar
            next_token();
          }
          else {
            
            if (token.type === ')') continue;
            else if (token.type == tNL || token.type == tSEMI) break;
            else throw "Error: def, unsupported param type " + token.type
          }
        }
      }
    }
    
    // read stmts.
    this.$stmts = stmts([kEND]);
    // read over kEND
    next_token();
    return this;
  });
  
  sym_stmt(kCLASS, function() {
    
    if (token.type === tIDENTIFIER) {
      throw 'Class defintion: cannot use tIDENTIFIER as a class name. Expected tCONSTANT'
    }
    else if(token.type === tCONSTANT) {
      this.$kname = token;
    }
    else {
      throw 'Class definition: expected constant as class name'
    }
    // read over kname
    next_token();
    
    if (token.type == '<') {
      next_token();
      // for now, only constant is valid superclass. we should allow other things..except new line.
      if (token.type == tCONSTANT) {
        this.$super = stmt();
        next_token();
      }
      else {
        throw "Class error: supername?"
      }
    }
    
    this.$stmts = stmts([kEND]);
    // read over kEND
    next_token();
    return this;
  });
  
  sym_stmt(kMODULE, function() {
    if (token.type === tIDENTIFIER) {
      throw "Module definition: cannot use tIDENTIFIER as a module name. Expected tCONSTANT"
    }
    else if (token.type === tCONSTANT) {
      this.$kname = token;
    }
    else {
      throw "Module definition: Expected tCONSTANT for module name"
    }
    
    // name
    next_token();
    
    this.$stmts = stmts([kEND]);
    // kend
    next_token();
    return this;
  });
  
  
  
  var stmts = function(t) {
    var s;
    var r = [];
    t = t || [];
    while (true) {
      if (token.type === false) {
        if (t.indexOf(false) === -1) {
          break;
        }
        else {
          throw 'stmts: got to EOF before reaching end of statements'
        }
      }
      else if (t.indexOf(token.type) != -1) {
        break;
      }
      else {
        if (token.type === tNL || token.type === tSEMI) {
          next_token();
        }
        else {
          s = stmt();
          r.push(s);
        }
      }
    }
    return r;
  };
  
  var stmt = function() {
    var c = token;
    if (c.std) {
      next_token();
      return c.std();
    }
    var e = expr(0);
    return e;
  };
  
  var expr = function(right_binding_power) {
    var old = token;
    next_token();
    // console.log(old);
    var left = old.nud();
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
    if (id && (id !== token.type)) {
      throw 'Unexpected value "' + token.value + '". Expecting: ' + id
    }
    // console.log('token: (' + t[0] + ' : ' + t[1] + ') lex_state: (' + lex_state + ')');
    // token = { type: t[0], value:t[1] };
    // token = {};
    token = object_create(sym_tbl[t[0]]);
    token.type = t[0];
    token.value = t[1];
    // console.log(token.value + ', ' + last_token.value);
    return token;
  };
  
  // actually get the next token
  var get_next_token = function() {
    var c = '', space_seen = false;
    
    last_state = lex_state;
    cmd_start = false;
        
      
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
        cmd_start = true;
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
      
      
      
      
      else if (scanner.scan(/^\//)) {
        lex_state = EXPR_BEG;
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
        if (lex_state == EXPR_FNAME) {
          lex_state = EXPR_BEG;
          r = "*";
        }
        else if (lex_state == EXPR_BEG || lex_state == EXPR_MID) {
          r = tSTAR;
        }
        else {
          lex_state = EXPR_BEG;
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
        // throw 'got to end of string'
        if (current_string_parse()) {
          current_string_parse().content = true
        }
        // check if parsing string...
        return ['}', scanner.matched];
      }
      
      // .
      else if (scanner.scan(/^\./)) {
        // should be EXPR_DOT in ALL cases?
        // if (lex_state == EXPR_FNAME) {
          lex_state = EXPR_DOT;
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
            return [kYIELD, scanner.matched];
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
        
        // console.log('current state: ' + lex_state);
        
        if ([EXPR_BEG, EXPR_DOT, EXPR_MID, EXPR_ARG, EXPR_CMDARG].indexOf(lex_state) !== -1) {
          lex_state = EXPR_CMDARG;
        }
        else {
          lex_state = EXPR_END;
        }
        
        return [matched.match(/^[A-Z]/) ? tCONSTANT : tIDENTIFIER, matched];
      }

      else {
        // false, false === end of stream
        return [false, false];      
      }
    }
  };
  
  var iseq_stack = [], iseq_stack_current = null;
  var iseq_locals_stack = [], iseq_locals_current = null;
  var iseq_jump_stack = [], iseq_jump_current = null;
  
  function iseq_jump_idx() {
    return (iseq_jump_current++).toString();
  }
  
  function iseq_stack_push(s) {
    iseq_jump_current = 0;
    iseq_jump_stack.push(iseq_jump_current);
    
    iseq_locals_stack.push(iseq_locals_current = []);
    iseq_stack.push(s);
    iseq_stack_current = s;
    return s;
  }
  
  function iseq_stack_pop() {
    // console.log(iseq_stack_current[7]);
    // throw "a"
    var f = iseq_stack_current[7].join("");
    console.log(f);
    var func = new Function(f);
    // console.log("here");
    // console.log(iseq_stack_current);
    iseq_stack_current[7] = func;
    
    
    iseq_jump_stack.pop();
    iseq_jump_current = iseq_jump_stack[iseq_jump_stack.length - 1];
    
    iseq_locals_current = iseq_locals_stack[iseq_locals_stack.length - 2];
    iseq_locals_stack.pop();
    
    iseq_stack_current = iseq_stack[iseq_stack.length - 2];
    return iseq_stack.pop();
  }
  
  function write(str) {
    iseq_stack_current[7].push(str);
  }
  
  // function iseq_opcode_push(opcode) {
    // iseq_stack_current[7].push(opcode);
    // return opcode;
  // }
  
  /**
    checks the given name to see if its in the index. If the result is 0 or above,
    it is, and the idx is the index in the locals array. -1 means it is not in the
    array (so not a local)
  */
  function iseq_locals_idx(name) {
    return iseq_locals_current.indexOf(name);
  }
  
  /**
    push locals name. the return value is the new index for the name
  */
  function iseq_locals_push(name) {
    var len = iseq_locals_current.length;
    iseq_locals_current.push(name);
    return len;
  }
  
  function generate_tree(tree) {
    console.log("tree:");
    console.log(tree);
    var top_iseq = iseq_stack_push([0,0,"<compiled>",filename,ISEQ_TYPE_TOP,0,[],[]]);
    
    var i;
    for (i = 0; i < tree.length; i++) {
      generate_stmt(tree[i], { instance: true, full_stmt: true, last_stmt:(tree.length - 1) == i, top_level: true} );
    }
    console.log(iseq_stack_pop());

    return top_iseq;
  }
  
  function generate_stmt(stmt, context) {
    switch (stmt.type) {
      case kCLASS:
        generate_class(stmt, context);
        break;
      case kMODULE:
        generate_module(stmt, context);
        break;
      case kDEF:
        generate_def(stmt, context);
        break;
      case tCALL:
        generate_call(stmt, context);
        break;
      case tSYMBEG:
        generate_symbol(stmt, context);
        break;
      case tCONSTANT:
        generate_constant(stmt, context);
        break;
      case tIDENTIFIER:
        generate_identifier(stmt, context);
        break;
      case tINTEGER:
        generate_integer(stmt, context);
        break;
      case tSTRING_BEG:
        generate_string(stmt, context);
        break;
      case kSELF:
        generate_self(stmt, context);
        break;
      case kIF:
        generate_if(stmt, context);
        break;
      case '=':
        generate_assign(stmt, context);
        break;
      case kFALSE:
        generate_false(stmt, context);
        break;
      case kTRUE:
        generate_true(stmt, context);
        break;
      case tLBRACK:
        generate_array(stmt, context);
        break;
      default:
        console.log("unknown generate_stmt type: " + stmt.type + ", " + stmt.value);
    }
  }
  
  function generate_array(stmt, context) {
    write("[");
    if (stmt.$values) {
      var i;
      for (i = 0; i < stmt.$values.length; i++) {
        if (i > 0) write(",");
        generate_stmt(stmt.$values[i], {full_stmt:false, last_stmt:false});
      }
    }
    write("]");
    // iseq_opcode_push([iNEWARRAY, stmt.$values ? stmt.$values.length : 0]);
  }
  
  function generate_assign(stmt, context) {
    
    if (context.last_stmt && context.full_stmt) write("return ");
    
    
    if (stmt.$lhs.type == tIDENTIFIER) {
      var idx;
      // iseq_opcode_push([iSETLOCAL, 0]);
      if ((idx = iseq_locals_idx(stmt.$lhs.value)) == -1) {
        // doesnt exist, so we need a new local
        // iseq_opcode_push([iSETLOCAL, iseq_locals_push(stmt.$lhs.value)]);
        write('vm_setlocal(' + iseq_locals_push(stmt.$lhs.value) + ',');
        generate_stmt(stmt.$rhs, {full_stmt: false, last_stmt: false});
        write(')');
      }
      else {
        // already a local, so just get the index
        // iseq_opcode_push([iSETLOCAL, idx]);
      }
    }
    else {
      throw "unsupported lhs, for now"
    }
    
    if (context.full_stmt) write(";");
  }
  
  function generate_if(stmt, context) {
    // if expression..
    generate_stmt(stmt.$expr, {instance:context.instance, full_stmt:false, last_stmt:false});
    var jmp_label = iseq_jump_idx();
    iseq_opcode_push([iBRANCHUNLESS, jmp_label]);
    
    // stmts
    if (stmt.$stmts) {
      var i, s = stmt.$stmts;
      for (i = 0; i < s.length; i++) {
        generate_stmt(s[i], {instance:context.instance, full_stmt:true, last_stmt:false});
      }
    }
    
    iseq_opcode_push(jmp_label);
    
    // if (context.last_stmt && context.full_stmt) write("return ");
    // write("(function(){");
    // 
    // (stmt.type == kIF) ? write("if(RTEST(") : write("if(!RTEST(");
    // 
    // // RTEST expression
    // generate_stmt(stmt.$expr, {instance:context.instance, full_stmt:false, last_stmt:false});
    // write(")){\n");
    // 
    // if (stmt.$stmts) {
    //   var i, s = stmt.$stmts;
    //   for (i = 0; i < s.length; i++) {
    //     generate_stmt(s[i], {instance:context.instance, full_stmt:true, last_stmt:(s[s.length -1] == s[i] ? true : false)});
    //   }
    // }
    // 
    // write("}\n");
    // 
    // if (stmt.$tail) {
    //   var i, t = stmt.$tail;
    //   for (i = 0; i < t.length; i++) {
    //     if (t[i].type == kELSIF) {
    //       write("else if(RTEST(");
    //       generate_stmt(t[i].$expr, {instance:context.instance, full_stmt:false, last_stmt:false});
    //       write(")){\n");
    //     }
    //     else {
    //       write("else{\n");
    //     }
    //     
    //     if (t[i].$stmts) {
    //       var j, k = t[i].$stmts;
    //       for (j = 0; j < k.length; j++) {
    //         // console.log("doing " + k[j].value);
    //         generate_stmt(k[j], {instance:context.instance, full_stmt:true, last_stmt:(k[k.length - 1] == k[i] ? true : false)});
    //       }
    //     }
    //     
    //     write("}\n");
    //   }
    // }
    // 
    // write("})()");
    // if (context.full_stmt) write(";\n");
  }
  
  function generate_false(stmt, context) {
    iseq_opcode_push([iPUTOBJECT, false]);
    
    if (context.last_stmt && context.full_stmt) {
      iseq_opcode_push([iLEAVE]);
    }
  }
  
  function generate_true(stmt, context) {
    iseq_opcode_push([iPUTOBJECT, true]);
    
    if (context.last_stmt && context.full_stmt) {
      iseq_opcode_push([iLEAVE]);
    }
  }
  
  
  function generate_self(stmt, context) {
    if (context.last_stmt && context.full_stmt) write("return ");
    write(current_self());
    if (context.full_stmt) write(";\n");
  }
  
  function generate_string(stmt, context) {
    // iseq_opcode_push([iPUTSTRING, stmt.$parts[0].value]);
    
    // if (context.last_stmt && context.full_stmt) {
      // iseq_opcode_push([iLEAVE]);
    // }
    
    write("'" + stmt.$parts[0].value + "'");
  }
  
  function generate_integer(stmt, context) {
    
    // iseq_opcode_push([iPUTOBJECT, parseInt(stmt.value)]);
    write(parseInt(stmt.value));
    
    if (context.last_stmt && context.full_stmt) {
      iseq_opcode_push([iLEAVE]);
    }
  }
  
  function generate_constant(stmt, context) {
    // iseq_opcode_push([iPUTNIL]);
    // iseq_opcode_push([iGETCONSTANT, stmt.value]);
    write("vm_getconstant(nil,'" + stmt.value + "')");
  }
  
  function generate_identifier(identifier, context) {
    // for now, assumption is that they are all method calls. should check for local or dynamic
    
    // no receiver.
    var idx;
    if ((idx = iseq_locals_idx(identifier.value)) == -1) {
      // not an identifier
      iseq_opcode_push([iPUTNIL]);
      iseq_opcode_push([iSEND, identifier.value, 0, null, 8, null]);
    }
    else {
      // its an identifier
      iseq_opcode_push([iGETLOCAL, idx]);
    }
    
    
    if (context.full_stmt && context.last_stmt) {
      iseq_opcode_push([iLEAVE]);
    }
    else if (context.full_stmt) {
      iseq_opcode_push([iPOP]);
    }
  }
  
  function generate_symbol(sym, context) {
    
    iseq_opcode_push([iPUTOBJECT, ID2SYM(sym.$name.value)]);
    
    if (context.full_stmt && context.last_stmt) {
      iseq_opcode_push([iLEAVE]);
    }
    else if (context.full_stmt) {
      iseq_opcode_push([iPOP]);
    }
  }
  
  function generate_call(call, context) {

    write("vm_send(");
    
    // receiver
    if (call.$recv) {
      generate_stmt(call.$recv, {instance:context.instance, full_stmt:false});
      // fix fcall bit..?
    }
    else {
      write("vm_putself()");
    }
    
    // mid
    var mid = call.$meth;
    if (typeof mid === 'object') { mid = mid.value; }
    write(",'" + mid + "',");
    
    // arguments (argv)
    if (call.$call_args && call.$call_args.args) {
      write("[");
      var i = 0, a = call.$call_args.args;
      for (i = 0; i < a.length; i++) {
        if (i > 0) write(",");
        generate_stmt(a[i], {instance:context.instance, full_stmt:false});
      }
      write("],");
    }
    else {
      write("[],");
    }
    
    // block
    write("null");

    
    // end
    write(")");
    
    if (context.full_stmt) write(";");
    
    
    // var mid = call.$meth;
    // if (typeof mid === 'object') {
    //   mid = mid.value;
    // }
    // 
    // var iseq = [iSEND, mid, 0, null, 8, null];
    // 
    // // receiver
    // if (call.$recv) {
    //   generate_stmt(call.$recv, {instance:context.instance, full_stmt:false});
    //   // fix fcall bit
    //   iseq[4] = 0;
    // }
    // else {
    //   iseq_opcode_push([iPUTNIL]);
    // }
    // 
    // // args..
    // if (call.$call_args && call.$call_args.args) {
    //   var i, a = call.$call_args.args;
    //   for (i = 0; i < a.length; i++) {
    //     generate_stmt(a[i], { instance:context.instance, full_stmt:false });
    //   }
    //   iseq[2] = a.length;
    // }
    // 
    // iseq_opcode_push(iseq);
    // 
    // if (context.full_stmt && context.last_stmt) {
    //   // if last stmt, we want to leave the context (with result of call on stack)
    //   iseq_opcode_push([iLEAVE]);
    // }
    // else if (context.full_stmt) {
    //   // if not last stmt, but a full stmt, remove result from stack. no-one wants it
    //   iseq_opcode_push([iPOP]);
    // }
    // 
    // // block
    // if (call.$brace_block) {
    //   var b_seq = [0, 0, "block in <compiled>", filename, ISEQ_TYPE_BLOCK, 0, [], []];
    //   iseq[3] = b_seq;
    //   
    //   if (call.$brace_block.$stmts) {
    //     // generate stmts
    //     iseq_stack_push(b_seq);
    //     
    //     var i, s = call.$brace_block.$stmts;
    //     for (i = 0; i < s.length; i++) {
    //       generate_stmt(s[i], {full_stmt:true, last_stmt:false});
    //     }
    //     
    //     iseq_stack_pop();
    //   }
    // }
    
    
    
    // iseq_opcode_push([iPUTNIL]);
    // var iseq = [0, 0, definition.$fname.value, filename, ISEQ_TYPE_METHOD, 0, [], []];
    // var opcode = [iDEFINEMETHOD, definition.$fname.value, iseq, 0];
    // iseq_opcode_push(opcode);
    // iseq_stack_push(iseq);
    // 
    // if (definition.$stmts) {
    //   var i, s = definition.$stmts;
    //   for (i = 0; i < s.length; i++) {
    //     generate_stmt(s[i], {instance:(definition.$sname ? false : true), full_stmt:true, last_stmt:(s[s.length - 1] == s[i] ? true : false), name:definition.$fname});
    //   }
    // }
    
    
    
    // if (context.last_stmt && context.last_stmt) write("return ");
    // 
    // if(call.value.match(/^[A-Z]/)) {
    //   write(call.value);
    //   write("(");
    // }
    // else {
    //   // detect block..
    //   if (call.$brace_block) {
    //     write("rb_block_funcall(");
    //   }
    //   else {
    //     write("rb_funcall(");
    //   }
    //   
    //   
    //   if (call.$recv) {
    //     generate_stmt(call.$recv, {instance:context.instance, full_stmt:false, last_stmt:context.last_stmt, top_level:context.top_level});
    //   }
    //   else {
    //     write(current_self());
    //   }
    //   
    //   write(",'" + call.$meth.value + "'");
    // }
    // 
    // // normal args
    // if (call.$call_args && call.$call_args.args) {
    //   var i, a = call.$call_args.args;
    //   for (i = 0; i < a.length; i++) {
    //     write(",");
    //     generate_stmt(a[i], {instance:context.instance, full_stmt:false});
    //   }
    // }
    // 
    // // assocs
    // if (call.$call_args && call.$call_args.assocs) {
    //   
    // }
    // 
    // // block
    // if (call.$brace_block) {
    //   
    // }
    // 
    // // sym block: &:upcase etc
    // if (call.$call_args && call.$call_args.block_arg) {
    //   write(",rb_funcall(");
    //   generate_stmt(call.$call_args.block_arg.arg, {instance:context.singleton, full_stmt:false, last_stmt:false, top_level:context.top_level});
    //   write(",'to_proc')");
    // }
    // 
    // write(")");
    // if (context.full_stmt) write(";\n");
  }
  
  function generate_def(definition, context) {
    // assume not singleton for now, so define "on nil"
    iseq_opcode_push([iPUTNIL]);
    var iseq = [0, 0, definition.$fname.value, filename, ISEQ_TYPE_METHOD, 0, [], []];
    var opcode = [iDEFINEMETHOD, definition.$fname.value, iseq, 0];
    iseq_opcode_push(opcode);
    iseq_stack_push(iseq);
    
    if (definition.$stmts) {
      var i, s = definition.$stmts;
      for (i = 0; i < s.length; i++) {
        generate_stmt(s[i], {instance:(definition.$sname ? false : true), full_stmt:true, last_stmt:(s[s.length - 1] == s[i] ? true : false), name:definition.$fname});
      }
    }
    
    
    
    // if (definition.singleton) {
    //   write("rb_define_singleton_method(");
    //   generate_stmt(definition.singleton, {instance: context.instance, full_stmt:false, last_stmt:false});
    //   write(",'" + definition.$fname + "',function(self,_cmd");
    //   current_self_push("self");
    // }
    // else if (context.top_level) {
    //   write("rb_define_singleton_method(rb_top_self, " + definition.$fname + "',function(self,_cmd");
    //   current_self_push("self");
    // }
    // else {
    //   write("rb_define_method(" + current_self() + ",'");
    //   write(definition.$fname.value);
    //   write("',function(self,_cmd");
    //   current_self_push("self");
    // }
    // 
    // // arglist
    // if (definition.$arglist && definition.$arglist.arg) {
    //   var i, a = definition.$arglist.arg;
    //   for (i = 0; i < a.length; i++) {
    //     write(",");
    //     write(a[i].value);
    //     // add_to_nametable(a[i].value);
    //   }
    // }
    // 
    // // block arg support - every method potentialy might have a block.
    // write(",$b");
    // 
    // write("){\n");
    
    // block reference goes here (so if we say &block in params, map var block to $b)
    //   if definition[:arglist] && definition[:arglist][:opt_block_arg]
    //     write "var #{definition[:arglist][:opt_block_arg]} = $b;\n"
    //     add_to_nametable definition[:arglist][:opt_block_arg]
    //   end
 
    // statements
    // push_string_buffer();
    // push_nametable();
    
    // if (definition.$stmts) {
      // var i, s = definition.$stmts;
      // for (i = 0; i < s.length; i++) {
        // generate_stmt(s[i], {instance:(definition.$sname ? false : true), full_stmt:true, last_stmt:(s[s.length - 1] == s[i] ? true : false), name:definition.$fname});
      // }
    // }
    
    // var body_contents = pop_string_buffer(), name_table = pop_nametable();
    // write each ivar statements..
    //   if name_table.length > 0
    //     write "var #{name_table.join(",")};\n"
    //   end
    
    // write(body_contents);

    // current_self_pop();
    // pop_nametable();
    // write("});\n");
    
    iseq_stack_pop();
  }
  
  function generate_class(stmt, context) {
    
    if (context.full_stmt && context.last_stmt) write("return ");
    
    write("vm_defineclass(");
    
    // base
    write("vm_putnil(),");
    
    // superclass
    if (stmt.$super) {
      generate_stmt(stmt.$super, {full_stmt:false, last_stmt:false});
    }
    else {
      write("vm_putnil()");
    }
    write(",");
    
    // class id
    write("'" + stmt.$kname.value + "'");
    write(",");
    
    // iseq
    write("function(){},")
    
    // op_flag
    write(0);
    
    write(")");
    
    if (context.full_stmt) write(";");
    
    // base (for class << Ben; ...; end)
    // iseq_opcode_push([iPUTNIL]);
    // // superclass
    // if (stmt.$super) {
    //   // console.log("super..");
    //   // console.log(stmt.$super);
    //   generate_stmt(stmt.$super, {full_stmt: false, last_stmt:false});
    // }
    // else {
    //  iseq_opcode_push([iPUTNIL]);
    // }
    // 
    // var iseq = [0, 0, "<class:" + stmt.$kname.value + ">", filename, ISEQ_TYPE_CLASS, 0, [], []];
    // var opcode = [iDEFINECLASS, stmt.$kname.value, iseq, 0];
    // iseq_opcode_push(opcode);
    // iseq_stack_push(iseq);
    // 
    // // statements.
    // if (stmt.$stmts) {
    //   var i, s = stmt.$stmts;
    //   for (i = 0; i < s.length; i++) {
    //     generate_stmt(s[i], {instance:false, full_stmt:true, last_stmt:(s[s.length - 1] == s[i] ? true : false), top_level:false});
    //   }
    // }
    // 
    // iseq_stack_pop();
    
    // write("(function(self) {\n");
    // push_nametable();
    // current_self_push("self");
    // 
    // if (stmt.$stmts) {
    //   var i, m = stmt.$stmts;
    //   for (i = 0; i < m.length; i++) {
    //     generate_stmt(m[i], {instance: false, full_stmt: true, last_stmt: (m[m.length -1] == m[i] ? true : false), top_level: false});
    //   }
    // }
    // 
    // pop_nametable();
    // current_self_pop();
    // 
    // write("})(");
    // 
    // if (context.top_level) {
    //   write("rb_define_class('")
    //   write(stmt.$kname.value);
    //   write("',");
    // }
    // else {
    //   write("rb_define_class_under(" + current_self() + ",'");
    //   write(stmt.$kname.value);
    //   write("',");
    // }
    // 
    // // superclass
    // if (stmt.$super) {
    //   write("rb_const_get(self, '" + stmt.$super.value + "'))")
    // }
    // else {
    //   write("rb_cObject)");
    // }
    // 
    // write(");\n")
  }
  
  function generate_module(mod, context) {
    write("(function(self) {\n");
    push_nametable();
    current_self_push("self");
    
    if (mod.$stmts) {
      var i, m = mod.$stmts;
      for (i = 0; i < m.length; i++) {
        generate_stmt(m[i], {instance: false, full_stmt: false, last_stmt: (m[m.length -1] == m[i] ? true : false), nested: true});
      }
    }
    
    pop_nametable();
    current_self_pop();
    
    write("})(");
    
    if (context.top_level) {
      write("rb_define_module('");
      write(mod.$kname.value);
      write("'));\n");
    }
    else {
      write("rb_define_module_under(" + current_self() + ",'");
      write(mod.$kname.value);
      write("'));\n")
    }
  }
  
  this.parse = function(str) {
    scanner = new vn_ruby_string_scanner(str);
    next_token();
    var s = stmts();
    return generate_tree(s);
  }
  
  this.contexts = function() {
    return contexts;
  }
  
  // the parser - pass is the source to actually parse
  // return function(parse_text) {
  //   scanner = new vn_ruby_string_scanner(parse_text);
  //   next_token();
  //   var s = stmts();
  //   generate_tree(s);
  //   return s;
  // }
  return this;
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

