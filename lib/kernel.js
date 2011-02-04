(function(self) {self.$M(['raise', 'new', 'kind_of?', 'to_s', 'inspect', '==', '__send__']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Kernel", function(self) {
return (rb_vm_defn(self, "require", function(self, path) {
var nil = Qnil;
return rb_require(path);}, 0), rb_vm_defn(self, "loop", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;while (true) {
      try {
        __block__(__block__.$self);
      } catch (e) {
        switch (e.$keyword) {
          case 2:
            return e['@exit_value'];
          default:
            throw e;
        }
      }
    }

    return self;}, 0), rb_vm_defn(self, "proc", function(self) {
var nil = Qnil;
var block = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return ((!((block !== nil ? Qtrue : Qfalse).$r) ? self.$m.raise(self, rb_vm_cg(self, "ArgumentError"), "block required"):nil), block);}, 0), rb_vm_defn(self, "lambda", function(self) {
var nil = Qnil;
var block = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return ((!((block !== nil ? Qtrue : Qfalse).$r) ? self.$m.raise(self, rb_vm_cg(self, "ArgumentError"), "block required"):nil), block);}, 0), rb_vm_defn(self, "raise", function(self, exception, string) {
var nil = Qnil;
var __a;
if (string === undefined) string = nil;
var msg = nil, exc;

    if (typeof exception == 'string') {
      msg = exception;
      exc = (__a = rb_vm_cg(self, "RuntimeError"), __a.$m.new)(__a, msg);
    } else if ((__a = exception, __a.$m["kind_of?"])(__a, rb_vm_cg(self, "Exception"))) {
      exc = exception;
    } else {
      if (string != nil) msg = string;

      exc = (__a = exception, __a.$m.new)(__a, msg);
    }

    rb_vm_raise(exc);}, 0), rb_vm_defn(self, "fail", function(self, exception, string) {
var nil = Qnil;
if (string === undefined) string = nil;
return (self.$m.raise(self, exception, string));}, 0), rb_vm_defn(self, "instance_variable_defined?", function(self, name) {
var nil = Qnil;
var __a;
name = (__a = name, __a.$m.to_s)(__a);
    return self[name] == undefined ? Qfalse : Qtrue;}, 0), rb_vm_defn(self, "instance_variable_get", function(self, name) {
var nil = Qnil;
var __a;
name = (__a = name, __a.$m.to_s)(__a);
    return self[name] == undefined ? nil : self[name];}, 0), rb_vm_defn(self, "instance_variable_set", function(self, name, value) {
var nil = Qnil;
var __a;
name = (__a = name, __a.$m.to_s)(__a);
    return self[name] = value;}, 0), rb_vm_defn(self, "block_given?", function(self) {
var nil = Qnil;
return (Qfalse);}, 0), rb_vm_defn(self, "method_missing", function(self, sym, args) {
var nil = Qnil;
var __a, __b;
args = Array.prototype.slice.call(arguments, 2);
return (self.$m.raise(self, rb_vm_cg(self, "NoMethodError"), ("undefined method `" + (__a = sym, __a.$m.to_s(__a)) + "` for " + (__a = (__b = self, __b.$m.inspect)(__b), __a.$m.to_s(__a)))));}, 0), rb_vm_defn(self, "to_a", function(self) {
var nil = Qnil;
return ([self]);}, 0), rb_vm_defn(self, "tap", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return ((!((__block__ !== nil ? Qtrue : Qfalse).$r) ? self.$m.raise(self, rb_vm_cg(self, "LocalJumpError"), "no block given"):nil), __block__(__block__.$self, self), self);}, 0), rb_vm_defn(self, "kind_of?", function(self, klass) {
var nil = Qnil;
var search = self.$klass;

    while (search) {
      if (search == klass) {
        return Qtrue;
      }

      search = search.$super;
    }

    return Qfalse;}, 0), rb_vm_defn(self, "is_a?", function(self, klass) {
var nil = Qnil;
return (self.$m["kind_of?"](self, klass));}, 0), rb_vm_defn(self, "nil?", function(self) {
var nil = Qnil;
return (Qfalse);}, 0), rb_vm_defn(self, "respond_to?", function(self, method_id) {
var nil = Qnil;
var __a;
if (self.$m[(__a = method_id, __a.$m.to_s)(__a)]) {
      return Qtrue;
    }

    return Qfalse;}, 0), rb_vm_defn(self, "===", function(self, other) {
var nil = Qnil;
var __a;
return ((__a = self, __a.$m["=="])(__a, other));}, 0), rb_vm_defn(self, "__send__", function(self, method_id, args) {
var nil = Qnil;
var __a;
args = Array.prototype.slice.call(arguments, 2);
args.unshift(self);
    return self.$m[(__a = method_id, __a.$m.to_s)(__a)].apply(null, args);}, 0), rb_vm_defn(self, "send", function(self, method_id, args) {
var nil = Qnil;
args = Array.prototype.slice.call(arguments, 2);
return (self.$m.__send__.apply(nil, [selfmethod_id].concat(args)));}, 0), rb_vm_defn(self, "class", function(self) {
var nil = Qnil;
return rb_class_real(self.$klass);}, 0), rb_vm_defn(self, "rand", function(self, max) {
var nil = Qnil;
if (max === undefined) max = undefined;
if (max != undefined) 
        return Math.floor(Math.random() * max);
    else
      return Math.random();}, 0), rb_vm_defn(self, "__id__", function(self) {
var nil = Qnil;
return self.$hash();}, 0), rb_vm_defn(self, "object_id", function(self) {
var nil = Qnil;
return self.$hash();}, 0), rb_vm_defn(self, "to_s", function(self) {
var nil = Qnil;
var __a, __b;
return (("#" + "<" + (__a = (__b = rb_class_real(self.$klass), __b.$m.to_s)(__b), __a.$m.to_s(__a)) + ":" + (__a = self.$hash(), __a.$m.to_s(__a)) + ">"));}, 0), rb_vm_defn(self, "inspect", function(self) {
var nil = Qnil;
return (self.$m.to_s(self));}, 0), rb_vm_defn(self, "instance_eval", function(self) {
var nil = Qnil;
var block = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return ((((block !== nil ? Qtrue : Qfalse).$r) ? block(self):nil), self);}, 0), rb_vm_defn(self, "const_set", function(self, name, value) {
var nil = Qnil;
return rb_const_set(rb_class_real(self.$klass), name, value);}, 0), rb_vm_defn(self, "const_defined?", function(self, name) {
var nil = Qnil;
return (Qfalse);}, 0));}, 2));})(rb_top_self);