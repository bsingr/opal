
var RubyGenerator = function(tree, options) {
  this._tree = tree;
  // console.log(tree.constructor);
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
    
    this.ensure_ivars = [];
  },
  
  SELF: 'self',
  NIL: 'nil',
  
  push_code: function(code) {
    this.code = code;
  },
  
  join: function() {
    var res = [];
    res.push('function(require, exports, module) {\n');
    res.push('var self = opal_top_self;\n');
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
    res.push('var ' + this.NIL + ' = ' + this.SELF + '.nil;\n');

    for (var i = 0; i < this.ensure_ivars.length; i++) {
      res.push('if (' + this.SELF + '.i$' + this.ensure_ivars[i] + ' === undefined) ' + this.SELF + '.i$' + this.ensure_ivars[i] + ' = ' + this.NIL + ';\n');
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
    return null;
  },
  
  push_local: function(str) {
    this.locals.push(str);
    return str;
  }
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
      rest = this.rest_args;
      
  // always need a self reference
  res.push(this.SELF + ', ');
  
  // always need a block arg
  res.push(this.block_arg);
  
  // norm
  for (var i = 0; i < norm; i++) {
    res.push(', ');
    res.push(this.norm_args[i]);
  }
  // opt
  for (var i = 0; i < opt; i++) {
    res.push(', ');
    res.push(this.opt_args[i]);
  }
  // rest
  if (rest) {
    res.push(', ');
    res.push(rest);
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
    var rest_offset = norm + opt + 2; // should take into account opt.. we add one to skip block
    res.push(rest + ' = Array.prototype.slice.call(arguments, ' + rest_offset + ');\n');
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
    this.iseq_stack.push(iseq);
    this.iseq_current = iseq;
    return iseq;
  },
  
  // pop iseq, this will return a join of the strings
  pop_iseq: function() {
    var iseq = this.iseq_current;
    this.iseq_stack.pop();
    this.iseq_current = this.iseq_stack[this.iseq_stack.length - 1];
    // console.log(iseq);
    return iseq.join();
  },
  
  // main generate..
  generate_top_context: function() {
    this.clear();
    return [this.generate_top(this._tree), this._dependencies];
  },
  
  generate: function(iseq, options) {
    // console.log(iseq);
    var name = iseq[0];
    if (this['generate_' + name]) {
      return this['generate_' + name](iseq, {});
    }
    
    console.log("Unknwon iseq type: " + iseq);
    throw "Unknwon iseq type: " + iseq;
  },
  
  mid_to_jsid: function(id) {
    id = '$' + id;
    
    if(/[\!\=\?\+\-\*\/\^\&\%\@\|\[\]\<\>\~]/.exec(id)) {
      return '["' + id + '"]';
    }
    return '.' + id;
  },

  // Generate some top level statements - this will clear everything else
  generate_top: function(stmt, options) {
    this.push_iseq(BaseIseq);
    // console.log(stmt);
    // for (var i = 0; i < stmt[1].length; i++) {
      // this.generate(stmt[1][i], { full: true, last:(stmt[1].length - 1 == i) });
      
    // }
    this.iseq_current.push_code(this.generate_compstmt(stmt[1], ';'));
    return this.pop_iseq();
  },

  // Generate some main statement - usually in a REPL scenario
  generate_main: function(stmt, options) {
    
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
    return 'true';
  },
  
  generate_false: function(stmt) {
    return 'false';
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
    var res = [];
    // receiver
    if (stmt[1]) {
      // res.push(this.generate(stmt[1]));
      // res.push(this.mid_to_jsid(stmt[2]))
      var tmp_recv = this.iseq_current.temp_local();
      res.push('(' + tmp_recv + ' = ');
      res.push(this.generate(stmt[1]));
      res.push(', ' + tmp_recv + this.mid_to_jsid(stmt[2]) + ' || ' + tmp_recv);
      res.push('.m$("' + stmt[2] + '"))(');
      res.push(tmp_recv + ', ');
      this.iseq_current.queue_temp(tmp_recv);
    }
    else { // no recv
      res.push('(' + this.SELF + this.mid_to_jsid(stmt[2]) + ' || ' + this.SELF);
      res.push('.m$("' + stmt[2] + '"))(');
      res.push(this.SELF + ', ');
    }
    
    // method
    // res.push(this.mid_to_jsid(stmt[2]));
    // args - splat not yet handled
    // res.push('(');
    // block
    if (stmt[4]) {
      var tmp_block = this.iseq_current.temp_local();
      res.push('(' + tmp_block + ' = ');
      res.push(this.generate_block(stmt[4]));
      res.push(', ' + tmp_block + '.__self__ = ' + this.SELF + ', ' + tmp_block + ')');
      this.iseq_current.queue_temp(tmp_block);
    }
    else {
      res.push(this.NIL);
    }    
    
    
    var arg, args = stmt[3][0];
    // norm args
    if (args && args.length > 0) {
      for (var i = 0; i < args.length; i++) {
        res.push(', ' + this.generate(args[i]));
        // arg = args[i];
        // this.write(', ');
        // this.generate(arg, {});
      }
    }
    // hash/assocs arg
    args = stmt[3][2];
    if (args) {
      res.push(', opalhash(');
      for (var i = 0; i < args.length; i++) {
        if (i > 0) res.push(', ');
        res.push(this.generate(args[i][0]) + ', ' + this.generate(args[i][1]));
      }
      res.push(')');
    }
    
    res.push(')');
    return res.join('');
  },
  
  // ['method_call', callable, args, block]
  generate_method_call: function(stmt, o) {
    stmt[1][3] = stmt[2];
    stmt[1][4] = stmt[3];
    // console.log(stmt[2]);
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

    if (local)
      return local;
    else
      return '(' + this.SELF + this.mid_to_jsid(stmt[1]) + ' || ' + this.SELF + '.m$("' + stmt[1] + '"))(' + this.SELF + ', ' + this.NIL + ')';
      // return this.SELF + this.mid_to_jsid(stmt[1]) + '(' + this.NIL + ')';
  },
  
  generate_constant: function(stmt, o) {
    // if (o.full && o.last) this.write('return ');
    // this.write(this.SELF + '.cg("' + stmt[1] + '")');
    // if (o.full) this.write(';\n');
    return this.SELF + '.cg("' + stmt[1] + '")';
  },

  generate_ivar: function(stmt, o) {
    this.iseq_current.ensure_ivar(stmt[1]);
    return this.SELF + '.i$' + stmt[1];
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
      return (this.SELF + '.i$' + stmt[1][1] + ' = ' + this.generate(stmt[2]));
    }
    else if (type == 'constant') {
      
      res.push(this.SELF + '.cs("');
      res.push(stmt[1][1]);
      res.push('", ');
      res.push(this.generate(stmt[2]));
      res.push(')');
      return res.join("");
    }
    else if (type == 'call') {
      res.push(this.generate(stmt[1][1]));
      res.push(this.mid_to_jsid(stmt[1][2] + '='));
      res.push('(');
      res.push(this.generate(stmt[2]));
      res.push(')');
      return res.join("");
    }
    else if (type == 'aref'){
      return this.generate_aset(stmt[1], stmt[2]);
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
      console.log( "op asgn, bad OP");
      throw "op asgn, bad OP"
    }
    return this.generate(assign);
  },
  
  // ['or', lhs, rhs]
  generate_or: function(stmt) {
    var res = [];
    var tmp_assign = this.iseq_current.temp_local();
    res.push('((' + tmp_assign + ' = ');
    res.push(this.generate(stmt[1]));
    res.push(', ' + tmp_assign + ' !== ' + this.NIL + ' && ' + tmp_assign + ' !== false)');
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
    res.push(', ' + tmp_assign + ' !== ' + this.NIL + ' && ' + tmp_assign + ' !== false)');
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
  
  // ['case', expr, body]
  generate_case: function(stmt) {
    var res = [];
    var tmp_case = this.iseq_current.temp_local();
    var done_else = false;
    var ternary_count = 0;
    // console.log(stmt);
    res.push("((" + tmp_case + " = ");
    res.push(this.generate(stmt[1]));
    res.push(', true) ? ');
    
    var when_tmp, when_part;
    for (var i = 0; i < stmt[2].length; i++) {
      when_part = stmt[2][i];
      if (when_part[0] == 'when') {
        ternary_count++;
        res.push('((');
        when_tmp = this.iseq_current.temp_local();
        res.push(when_tmp + ' = ' +  this.generate(when_part[1][0]));
        res.push(', ' + when_tmp + ' !== ' + this.NIL + ' && ');
        res.push(when_tmp + ' !== false) ? ');
        res.push(this.generate_compstmt(when_part[2][1], ','));
        // res.push('("")');
        res.push(' : ');
        this.iseq_current.queue_temp(when_tmp);
        // ') ? ("") : ');
      }
      else {
        done_else = true;
        // do else
        // console.log(when_part);
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
  
  // ['if'/'unless', expr, stmt, tail]
  generate_if: function(stmt) {
    var res = [];
    var tmp_assign = this.iseq_current.temp_local();
    var done_else = false;
    var ternary_count = 1;
    res.push('((' + tmp_assign + ' = ');
    // this.write(stmt[0] == 'if' ? 'if(' : 'if(!');
    // this.write(this.SELF + '.t(')
    res.push(this.generate(stmt[1]));
    if (stmt[0] == 'if') {
      res.push(', ' + tmp_assign + ' !== ' + this.NIL + ' && ' + tmp_assign + ' !== false) ? ');
    }
    else {
      res.push(', ' + tmp_assign + ' === ' + this.NIL + ' || ' + tmp_assign + ' === false) ? ');
    }
    this.iseq_current.queue_temp(tmp_assign);
    var c = stmt[2][1], s;
    res.push(this.generate_compstmt(c, ','));
    res.push(' : ');
       // this.write('}\n');
    //    
    for (var i = 0; i < stmt[3].length; i++) {
      var t = stmt[3][i];
      // console.log(t);
      if (t[0] == 'elsif') {
        ternary_count++;
        res.push('((' + tmp_assign + ' = ' + this.generate(t[1]));
        res.push(', ' + tmp_assign + ' !== ' + this.NIL + ' && ' + tmp_assign + ' !== false) ? ');
        this.iseq_current.queue_temp(tmp_assign);
        res.push(this.generate_compstmt(t[2][1], ','));
        res.push(' : ');
        // this.write('else if (');
        // this.write(this.SELF + '.t(')
        // this.generate(t[1], {});
        // this.write(')) {\n');
        // c = t[2][1];
        // this.generate_compstmt(c, o);
        // this.write('}\n');
      }
      else {
        done_else = true;
        res.push(this.generate_compstmt(t[1][1], ','));
        // this.write('else {\n');
        // c = t[1][1];
        // this.generate_compstmt(c, o);
        // this.write('}\n');
      }
    }
    // if we didnt have an else, do it ourselves:
    if (!done_else) {
      res.push(this.NIL);
    }
    for (var i = 0; i < ternary_count; i ++) res.push(')');
    return res.join('');
  },
  
  generate_unless: function(stmt, o) {
    return this.generate_if(stmt, o);
  },
  
  generate_if_mod: function(stmt) {
    var res = [];
    var tmp_assign = this.iseq_current.temp_local();
    res.push('((' + tmp_assign + ' = ');
    
    res.push(this.generate(stmt[2]));
    if (stmt[1] == 'if') {
      res.push(', ' + tmp_assign + ' !== ' + this.NIL + ' && ' + tmp_assign + ' !== false) ? ');
    }
    else {
      res.push(', ' + tmp_assign + ' === ' + this.NIL + ' || ' + tmp_assign + ' === false) ? ');
    }
    this.iseq_current.queue_temp(tmp_assign);
    res.push(this.generate(stmt[3]));
    res.push(' : ' + this.NIL + ')');
    // this.write('}\n');
    return res.join('');
  },
  
  generate_ternary: function(stmt) {
    var res = [];  
    res.push('((');
    var tmp_assign = this.iseq_current.temp_local();
    res.push(tmp_assign + ' = ');
    res.push(this.generate(stmt[1]));
    res.push(', ' + tmp_assign + ' !== ' + this.NIL + ' && ' + tmp_assign + ' !== false) ? ');
    res.push(this.generate(stmt[2]));
    res.push(' : ');
    res.push(this.generate(stmt[3]));
    res.push(')');
    this.iseq_current.queue_temp(tmp_assign);
    return res.join("");
  },
  
  // ['unary', type, arg]
  // type: '+', '-', '!'
  generate_unary: function(stmt, o) {
    var meth = stmt[1];
    
    if (meth == '+') meth = '+@';
    if (meth == '-') meth = '-@';

    return this.generate(stmt[2]) + this.mid_to_jsid(meth) + '()';
    // this.generate(stmt[2], { recv: true });
    // this.write(this.mid_to_jsid(meth));
    // this.write('()');
  },
  
  // ['aref', recv, arefs]
  generate_aref: function(stmt, o) {
    var res = [];
    var tmp_mm = this.iseq_current.temp_local();
    res.push('(' + tmp_mm + ' = ');
    res.push(this.generate(stmt[1]));
    res.push(', ' + tmp_mm);
    res.push(this.mid_to_jsid('[]'));
    res.push(' || ' + tmp_mm + '.m$("[]"))');
    res.push('(');
    // self
    res.push(tmp_mm);
    res.push(', ');
    // block
    res.push(this.NIL);
    if (stmt[2]) {
      for (var i = 0; i < stmt[2].length; i++) {
        var s = stmt[2][i];
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
    // console.log(aref);
    res.push(this.generate(aref[1]));
    res.push(this.mid_to_jsid('[]='));
    res.push('(');
    res.push(this.NIL);
    if (aref[2]) {
      for (var i = 0; i < aref[2].length; i++) {
        var s = aref[2][i];
        res.push(', ');
        res.push(this.generate(s));
      }
    }
    res.push(', ');
    res.push(this.generate(arg));
    res.push(')');
    return res.join("");
  },
  
  // ['array', arefs]
  generate_array: function(stmt, o) {
    var res = [];
    if (stmt[1]) {
      for (var i = 0; i < stmt[1].length; i++) {
        var s = stmt[1][i];
        res.push(this.generate(s));
      }
    }
    return '[' + res.join(", ") + ']';
  },
  
  // ['hash', assocs]
  // assocs - [[lhs, rhs], [lhs, rhs]]
  generate_hash: function(stmt, o) {
    var res = [];
    res.push('opalhash(');
    
    for (var i = 0; i < stmt[1].length; i++) {
      if (i > 0) res.push(', ');
      res.push(this.generate(stmt[1][i][0]));
      res.push(', ');
      res.push(this.generate(stmt[1][i][1]));
    }
    
    res.push(')');
    return res.join("");
  },
  
  // ['symbol', part]
  // part: identifier, ivar, gvar or cvar
  generate_symbol: function(stmt, o) {    
    if (stmt[1][0] == 'identifier') {
      return 'opalsym("' + stmt[1][1] + '")';
    }
    else {
      this.write("Bad Symbol Part: " + stmt[1][0]);
    }
  },
  
  // ['def', singleton, def_name, arglist, bodystmts]
  generate_def: function(stmt, o) {
    var res = [];
    var is_singleton = stmt[1];
    
    this.push_iseq(DefIseq);
    
    var args = stmt[3];
    
    // norm arg
    for (var i = 0; i < stmt[3][0].length; i++) {
      this.iseq_current.push_arg(stmt[3][0][i]);
    }
    
    // opt arg
    for (var i = 0; i < stmt[3][1].length; i++) {
      // console.log(stmt[3][1][i]);
      var gen_opt_iseq = this.generate(stmt[3][1][i][1]);
      this.iseq_current.push_opt_arg(stmt[3][1][i][0], gen_opt_iseq);
    }
    
    // rest arg
    if (stmt[3][2]) {
      this.iseq_current.push_rest_arg(stmt[3][2]);
    }
    
    // block arg
    if (stmt[3][3]) {
      // console.log("Block arf: " + stmt[3][3]);
      this.iseq_current.push_block_arg(stmt[3][3]);
    }
    
    // for (var i = 0; i < stmt[1].length; i++) {
      // this.generate(stmt[1][i], { full: true, last:(stmt[1].length - 1 == i) });
    // }
    this.iseq_current.push_code(this.generate_bodystmt(stmt[4]));
    
    var result = this.pop_iseq();
    
    if (is_singleton) {
      // need to fix:
      res.push(this.SELF + '.dm(');
    }
    else {
      res.push(this.SELF + '.dm(');
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
    res.push(this.SELF);
    
    res.push('.dc(');
    // superclass
    if (false) {
      
    }
    else {
      res.push(this.NIL);
    }
    res.push(', "' + stmt[1][1] + '", ' + result + ', 0)');
    
    return res.join("");
  },
  
  generate_module: function(stmt, o) {
    var res = [];
    
    this.push_iseq(ClassIseq);
    
    this.iseq_current.push_code(this.generate_bodystmt(stmt[2]));
    
    var result = this.pop_iseq();
    // if path is ::CONST then we use opal.top_self as base
    res.push(this.SELF);
    
    res.push('.dc(');
    // superclass
    if (false) {
      
    }
    else {
      res.push(this.NIL);
    }
    res.push(', "' + stmt[1][1] + '", ' + result + ', 0)');
    
    return res.join("");
  },
  
  generate_line: function(stmt, o) {
    if (o.last && o.full) this.write('return ');
    this.write(stmt[1]);
    if (o.full) this.write(';\n');
  },
  
  generate_file: function(stmt, o) {
    if (o.last && o.full) this.write('return ');
    this.write('__FILE__');
    if (o.full) this.write(';\n');
  },
  
  generate_xstring: function(stmt, o) {
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
        res.push('"' + stmt[1][0][1] + '"');
      }
      else if (stmt[1][0][0] == 'string_dbegin') {
        var tmp_to_s = this.iseq_current.temp_local();
        res.push('(' + tmp_to_s + ' = ');
        res.push(this.generate(stmt[1][0][1][1][0]));
        res.push(', ' + tmp_to_s);
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
          res.push('"' + part[1] + '"');
        }
        else if (part[0] == 'string_dbegin') {
          var tmp_to_s = this.iseq_current.temp_local();
          res.push('(' + tmp_to_s + ' = ');
          res.push(this.generate(part[1][1][0]));
          res.push(', ' + tmp_to_s);
          res.push(this.mid_to_jsid('to_s') + '(' + tmp_to_s + '))');
          this.iseq_current.queue_temp(tmp_to_s);
        }
        else {
          res.push(this.SELF + '.i$' + part[1] + '.$to_s(self)');
        }
      }
      res.push(')');
    }
    
    return res.join("");
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
    for (var i = 0; i < stmt[1][2].length; i++) {
      var rescue = stmt[1][2][i];
      res.push('if (__err__){');
      // console.log(rescue);
      // if we have a var, then assign error to it:
      if (rescue[2]) {
        if (!(local = this.iseq_current.lookup_local(rescue[2]))) {
          local = this.iseq_current.push_local(rescue[2]);
        }
        res.push(local + ' = __err__;');
      }
      res.push('return ' + this.generate_compstmt(rescue[3][1]) + ';');
      res.push('}');
    }
    // console.log(stmt[1][2]);
    // res.push(this.generate(stmt[1][2]));
    // console.log(re)
    res.push('}');
    console.log(stmt);
    res.push('})()')
    return res.join('');
  },
  
  generate_gvar: function(stmt) {
    return ("'gvar'");
  },
  
  generate_colon2: function(stmt) {
    return this.generate(stmt[1]) + '.cg("' + stmt[2] + '")';
  },
  
  generate_return: function(stmt) {
    var res = [];
    // for now assume not in block
    res.push(this.SELF + '.rbReturn(');
    if (stmt[1]) {
      var arg, args = stmt[1][0];
      // norm args
      if (args && args.length > 0) {
        if (args.length == 1) {
          res.push(this.generate(args[0]));
        } else {
          res.push('[');
          for (var i = 0; i < args.length; i++) {
            arg = args[i];
            if (i > 0) res.push(', ');
            res.push(this.generate(arg));
          }
          res.push(']');
        }
      }
    } else {
      res.push(this.NIL);
    }
    res.push(')');
    return res.join("");
  },
  
  generate_next: function(stmt, o) {
    this.write(this.SELF + '.rbNext(');
    if (stmt[1]) {
      for (var i = 0; i < stmt[1][0].length; i++) {
        if (i > 0) this.write(', ');
        this.generate(stmt[1][0][i], {});
      }
    }
    this.write(');\n');
  },
  
  generate_break: function(stmt) {
    var res = [];
    res.push(this.SELF + '.rbBreak(');
    if (stmt[1]) {
      for (var i = 0; i < stmt[1][0].length; i++) {
        if (i > 0) res.push(', ');
        res.push(this.generate(stmt[1][0][i]));
      }
    }
    res.push(')');
    return res.join('');
  },
  
  generate_super: function(stmt) {
    var res = [];
    res.push(this.SELF + '.opal_super(arguments.callee, ');
    if (!stmt[1]) {
      res.push("Array.prototype.slice.call(arguments)");
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
    return '(' + name + ' !== ' + this.NIL + ')';
  },
  
  generate_yield: function(stmt, o) {
    this.iseq_current.uses_block();
    var block = this.iseq_current.block_arg;
    var res = [block + "(" + block + ".__self__, ''"];
    // args
    if (stmt[1]) {
      for (var i = 0; i < stmt[1][0].length; i++) {
        res.push(', ');
        res.push(this.generate(stmt[1][0][i]));
      }
    }
    res.push(')');
    return res.join("");
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
  
  generate_require: function(stmt) {
    this._dependencies.push(stmt[1]);
    return "require('" + stmt[1] + "')";
  }
};



exports.Generator = RubyGenerator;
