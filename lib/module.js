(function(self) {self.$M(['kind_of?', 'raise', 'to_s', 'attr_reader', 'attr_writer']);
var nil = Qnil;
return (rb_vm_class(self, nil, "Module", function(self) {
return (rb_vm_defn(self, "name", function(self) {
var nil = Qnil;
return self['__classid__'];}, 0), rb_vm_defn(self, "===", function(self, obj) {
var nil = Qnil;
var __a;
return ((__a = obj, __a.$m["kind_of?"])(__a, self));}, 0), rb_vm_defn(self, "define_method", function(self, method_id) {
var nil = Qnil;
var __a;
var block = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return ((!((block !== nil ? Qtrue : Qfalse).$r) ? self.$m.raise(self, rb_vm_cg(self, "LocalJumpError"), "no block given"):nil), rb_define_method(self, (__a = method_id, __a.$m.to_s)(__a), block), nil);}, 0), rb_vm_defn(self, "attr_accessor", function(self, attrs) {
var nil = Qnil;
attrs = Array.prototype.slice.call(arguments, 1);
return (self.$m.attr_reader.apply(nil, [self].concat(attrs)), self.$m.attr_writer.apply(nil, [self].concat(attrs)));}, 0), rb_vm_defn(self, "attr_reader", function(self, attrs) {
var nil = Qnil;
var __a;
attrs = Array.prototype.slice.call(arguments, 1);
for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var method_id = (__a = attr, __a.$m.to_s)(__a);

      rb_define_method(self, method_id, 
            new Function('self', 'return rb_ivar_get(self, "@' + method_id + '");'));

    }

    return nil;}, 0), rb_vm_defn(self, "attr_writer", function(self, attrs) {
var nil = Qnil;
var __a;
attrs = Array.prototype.slice.call(arguments, 1);
for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var method_id = (__a = attr, __a.$m.to_s)(__a);

      rb_define_method(self, method_id + '=', 
        new Function('self', 'val', 'return rb_ivar_set(self, "@' + method_id + '", val);'));

    }

    return nil;}, 0), rb_vm_defn(self, "alias_method", function(self, new_name, old_name) {
var nil = Qnil;
var __a;
return (new_name = (__a = new_name, __a.$m.to_s)(__a), old_name = (__a = old_name, __a.$m.to_s)(__a), rb_define_method_raw(self, new_name, self.$m_tbl[old_name]), self);}, 0), rb_vm_defn(self, "to_s", function(self) {
var nil = Qnil;
return self['__classid__'];}, 0), rb_vm_defn(self, "const_set", function(self, id, value) {
var nil = Qnil;
var __a;
return rb_vm_cs(self, (__a = id, __a.$m.to_s)(__a), value);}, 0), rb_vm_defn(self, "class_eval", function(self, str) {
var nil = Qnil;
var block = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return (((block !== nil ? Qtrue : Qfalse).$r ? (block(self)) : (self.$m.raise(self, "need to compile str"))));}, 0), rb_vm_defn(self, "module_eval", function(self, str) {
var nil = Qnil;
var block = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return (self.$B("class_eval", block, str));}, 0), rb_vm_defn(self, "private", function(self) {
var nil = Qnil;
return (self);}, 0), rb_vm_defn(self, "public", function(self) {
var nil = Qnil;
return (self);}, 0), rb_vm_defn(self, "protected", function(self) {
var nil = Qnil;
return (self);}, 0), rb_vm_defn(self, "include", function(self, mod) {
var nil = Qnil;
return (rb_include_module(self, mod), nil);}, 0), rb_vm_defn(self, "extend", function(self, mod) {
var nil = Qnil;
return (rb_extend_module(self, mod), nil);}, 0));}, 0));})(rb_top_self);