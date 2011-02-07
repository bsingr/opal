(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['kind_of?', 'raise', 'to_s', 'attr_reader', 'attr_writer', 'class_eval']);
return ($class(self, nil, "Module", function(self) {
return ($def(self, "name", function(self) {
return self['__classid__'];}, 0), $def(self, "===", function(self, obj) {
var __a;
return ((__a = obj).$m["kind_of?"](__a, self));}, 0), $def(self, "define_method", function(self, method_id) {
var __a;
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((!((block !== nil ? Qtrue : Qfalse).$r) ? self.$m.raise(self, rb_vm_cg(self, "LocalJumpError"), "no block given"):nil), rb_define_method(self, (__a = method_id).$m.to_s(__a), block), nil);}, 0), $def(self, "attr_accessor", function(self, attrs) {
attrs = Array.prototype.slice.call(arguments, 1);
return (self.$m.attr_reader.apply(nil, [self].concat(attrs)), self.$m.attr_writer.apply(nil, [self].concat(attrs)));}, 0), $def(self, "attr_reader", function(self, attrs) {
var __a;
attrs = Array.prototype.slice.call(arguments, 1);
for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var method_id = (__a = attr).$m.to_s(__a);

      rb_define_method(self, method_id, 
            new Function('self', 'return rb_ivar_get(self, "@' + method_id + '");'));

    }

    return nil;}, 0), $def(self, "attr_writer", function(self, attrs) {
var __a;
attrs = Array.prototype.slice.call(arguments, 1);
for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var method_id = (__a = attr).$m.to_s(__a);

      rb_define_method(self, method_id + '=', 
        new Function('self', 'val', 'return rb_ivar_set(self, "@' + method_id + '", val);'));

    }

    return nil;}, 0), $def(self, "alias_method", function(self, new_name, old_name) {
var __a;
return (new_name = (__a = new_name).$m.to_s(__a), old_name = (__a = old_name).$m.to_s(__a), rb_define_method_raw(self, new_name, self.$m_tbl[old_name]), self);}, 0), $def(self, "to_s", function(self) {
return self['__classid__'];}, 0), $def(self, "const_set", function(self, id, value) {
var __a;
return rb_vm_cs(self, (__a = id).$m.to_s(__a), value);}, 0), $def(self, "class_eval", function(self, str) {
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return (((block !== nil ? Qtrue : Qfalse).$r ? (block(self)) : (self.$m.raise(self, "need to compile str"))));}, 0), $def(self, "module_eval", function(self, str) {
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return (($block.p = block, $block.f = self.$m.class_eval)(self, str));}, 0), $def(self, "private", function(self) {
return (self);}, 0), $def(self, "public", function(self) {
return (self);}, 0), $def(self, "protected", function(self) {
return (self);}, 0), $def(self, "include", function(self, mod) {
return (rb_include_module(self, mod), nil);}, 0), $def(self, "extend", function(self, mod) {
return (rb_extend_module(self, mod), nil);}, 0));}, 0));})();