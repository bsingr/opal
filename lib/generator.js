
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

  handle_method_return: function() {
    var iseq = this;

    while (iseq && iseq instanceof BlockIseq) {
      iseq = iseq.parent_iseq;
    }

    if (iseq instanceof DefIseq) {
      this._ensure_return = true;
      this._handle_errors = true;
    } else {
      // error? no, we need top level iseq to generate fake var just to avoid
      // undefined error.
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
  res.push('$range = Opal.G, $block = Opal.P, $return = Opal.R;\n');


  
 
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

      this.iseq_current.use_method_id(stmt[1][2] + '=');
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
    res.push('$hash(');
    
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
      code.push('var $vm_return_func = arguments.callee;');
      code.push(def_code);
      code.push('} catch(__err__) {\n');
      // code.push("print('caught..' + __err__.$keyword);");
     
      // new return: this handles all return situations
      if (this.iseq_current._ensure_return) {
        code.push('if (__err__.$keyword == 1 && __err__.$func == $vm_return_func) {\n');
        code.push('return __err__.$value;');
        code.push('\n}');
      }

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
  
    // return always defines out of the method is was defined in. If in a block, then it
    // returns out the the method that the block is in. So this works nicely, as in the
    // method we define our var: $vm_return_func, and through javascript scope, we pass
    // that into the block return vm function. If a return propogates all the way to the
    // top scope, then it just throws as a regular error, and our mainiseq will output a 
    // correct var to avoid undefined errors... this will work, trust me ;)

    // find nearest method, and make sure it block returns
    this.iseq_current.handle_method_return();
    return '$return(' + return_arg + ', $vm_return_func)'; 
  

    // if we are in block (part of an iteration for example..)
    // if (this.iseq_current instanceof BlockIseq && !this.iseq_current._in_while_loop) {
    //   this.iseq_current.ensure_block_return();
    //   return 'rb_vm_block_return(' + return_arg + ', __vm_jump_function__)';
    // }
    // // if we are in a while loop itself. We return out of while loop and into
    // // the method containing the while loop itself. We do not return back into
    // // calling method (this is handled above: "block" part)
    // else if (this.iseq_current._in_while_loop) {
    //   // inform the method containing the while loop that we need to handle it
    //   this.iseq_current.ensure_loop_return();
    //   // throw a loop return statement..
    //   return 'rb_vm_loop_return(' + return_arg + ')';
    // }
    // // normal return in a normal method context
    // else {
    //   // inform current iseq to capture thrown return
    //   this.iseq_current.ensure_block_return();
    //   return 'rb_vm_block_return(' + return_arg + ', __vm_jump_function__)';
    // }
    // return return_arg + "aaaaa";
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
    res.push('rb_super(arguments.callee, ' + this.SELF + ',');
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
