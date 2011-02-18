(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm(['raise', 'new', 'kind_of?', 'to_s', 'inspect', '==', '__send__']);
return ($class(self, nil, "Kernel", function(self) {
return ($def(self, "require", function(self, path) {
return $opal.require(path);}, 0), $def(self, "loop", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;while (true) {
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

    return self;}, 0), $def(self, "proc", function(self) {
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((!((block !== nil ? Qtrue : Qfalse).$r) ? self.$m.raise(self, rb_vm_cg(self, "ArgumentError"), "block required"):nil), block);}, 0), $def(self, "lambda", function(self) {
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((!((block !== nil ? Qtrue : Qfalse).$r) ? self.$m.raise(self, rb_vm_cg(self, "ArgumentError"), "block required"):nil), block);}, 0), $def(self, "raise", function(self, exception, string) {
var __a;
if (string === undefined) string = nil;
var msg = nil, exc;

    if (typeof exception == 'string') {
      msg = exception;
      exc = (__a = rb_vm_cg(self, "RuntimeError")).$m.new(__a, msg);
    } else if ((__a = exception).$m["kind_of?"](__a, rb_vm_cg(self, "Exception")).$r) {
      exc = exception;
    } else {
      if (string != nil) msg = string;

      exc = (__a = exception).$m.new(__a, msg);
    }

    rb_vm_raise(exc);}, 0), $def(self, "fail", function(self, exception, string) {
if (string === undefined) string = nil;
return (self.$m.raise(self, exception, string));}, 0), $def(self, "instance_variable_defined?", function(self, name) {
var __a;
name = (__a = name).$m.to_s(__a);
    return self[name] == undefined ? Qfalse : Qtrue;}, 0), $def(self, "instance_variable_get", function(self, name) {
var __a;
name = (__a = name).$m.to_s(__a);
    return self[name] == undefined ? nil : self[name];}, 0), $def(self, "instance_variable_set", function(self, name, value) {
var __a;
name = (__a = name).$m.to_s(__a);
    return self[name] = value;}, 0), $def(self, "block_given?", function(self) {
return (Qfalse);}, 0), $def(self, "method_missing", function(self, sym, args) {
var __a, __b;
args = Array.prototype.slice.call(arguments, 2);
return (self.$m.raise(self, rb_vm_cg(self, "NoMethodError"), ("undefined method `" + (__a = sym, __a.$m.to_s(__a)) + "` for " + (__a = (__b = self).$m.inspect(__b), __a.$m.to_s(__a)))));}, 0), $def(self, "to_a", function(self) {
return ([self]);}, 0), $def(self, "tap", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((!((__block__ !== nil ? Qtrue : Qfalse).$r) ? self.$m.raise(self, rb_vm_cg(self, "LocalJumpError"), "no block given"):nil), __block__(__block__.$self, self), self);}, 0), $def(self, "kind_of?", function(self, klass) {
var search = self.$klass;

    while (search) {
      if (search == klass) {
        return Qtrue;
      }

      search = search.$super;
    }

    return Qfalse;}, 0), $def(self, "is_a?", function(self, klass) {
return (self.$m["kind_of?"](self, klass));}, 0), $def(self, "nil?", function(self) {
return (Qfalse);}, 0), $def(self, "respond_to?", function(self, method_id) {
var __a;
if (self.$m[(__a = method_id).$m.to_s(__a)]) {
      return Qtrue;
    }

    return Qfalse;}, 0), $def(self, "===", function(self, other) {
var __a;
return ((__a = self).$m["=="](__a, other));}, 0), $def(self, "__send__", function(self, method_id, args) {
var __a;
args = Array.prototype.slice.call(arguments, 2);
args.unshift(self);
    return self.$m[(__a = method_id).$m.to_s(__a)].apply(null, args);}, 0), $def(self, "send", function(self, method_id, args) {
args = Array.prototype.slice.call(arguments, 2);
return (self.$m.__send__.apply(nil, [selfmethod_id].concat(args)));}, 0), $def(self, "class", function(self) {
return rb_class_real(self.$klass);}, 0), $def(self, "rand", function(self, max) {
if (max === undefined) max = undefined;
if (max != undefined)
        return Math.floor(Math.random() * max);
    else
      return Math.random();}, 0), $def(self, "__id__", function(self) {
return self.$hash();}, 0), $def(self, "object_id", function(self) {
return self.$hash();}, 0), $def(self, "to_s", function(self) {
var __a, __b;
return (("#" + "<" + (__a = (__b = rb_class_real(self.$klass)).$m.to_s(__b), __a.$m.to_s(__a)) + ":0x" + (__a = (self.$hash() * 4000487).toString(16), __a.$m.to_s(__a)) + ">"));}, 0), $def(self, "inspect", function(self) {
return (self.$m.to_s(self));}, 0), $def(self, "instance_eval", function(self) {
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((((block !== nil ? Qtrue : Qfalse).$r) ? block(self):nil), self);}, 0), $def(self, "const_set", function(self, name, value) {
return rb_const_set(rb_class_real(self.$klass), name, value);}, 0), $def(self, "const_defined?", function(self, name) {
return (Qfalse);}, 0));}, 2));})();