(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
return ($class(self, nil, "Module", function(self) {
return ($def(self, "name", function() {
var self = this;return self['__classid__'];}, 0), $def(self, "===", function(obj) {
var self = this;return (obj["m$kind_of?"](self));}, 0), $def(self, "define_method", function(method_id) {
var self = this;var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((!((block !== nil ? Qtrue : Qfalse).$r) ? self.m$raise(rb_vm_cg(self, "LocalJumpError"), "no block given"):nil), rb_define_method(self, method_id.m$to_s(), block), nil);}, 0), $def(self, "attr_accessor", function(attrs) {
var self = this;attrs = Array.prototype.slice.call(arguments, 0);
return (self.m$attr_reader.apply(self, [].concat(attrs)), self.m$attr_writer.apply(self, [].concat(attrs)));}, 0), $def(self, "attr_reader", function(attrs) {
var self = this;attrs = Array.prototype.slice.call(arguments, 0);
for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var method_id = attr.m$to_s();

      rb_define_method(self, method_id, 
            new Function('return rb_ivar_get(this, "@' + method_id + '");'));

    }

    return nil;}, 0), $def(self, "attr_writer", function(attrs) {
var self = this;attrs = Array.prototype.slice.call(arguments, 0);
for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var method_id = attr.m$to_s();

      rb_define_method(self, method_id + '=', 
        new Function('val', 'return rb_ivar_set(this, "@' + method_id + '", val);'));

    }

    return nil;}, 0), $def(self, "alias_method", function(new_name, old_name) {
var self = this;return (new_name = new_name.m$to_s(), old_name = old_name.m$to_s(), rb_define_method(self, new_name, self.$method_table[old_name]), self);}, 0), $def(self, "to_s", function() {
var self = this;return self['__classid__'];}, 0), $def(self, "const_set", function(id, value) {
var self = this;return rb_vm_cs(self, id.m$to_s(), value);}, 0), $def(self, "class_eval", function(str) {
var self = this;var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return (((block !== nil ? Qtrue : Qfalse).$r ? (block.call(self)) : (self.m$raise("need to compile str"))));}, 0), $def(self, "module_eval", function(str) {
var self = this;var __a;
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((($block.p = block), $block.f = (__a = self).m$class_eval).call(__a, str));}, 0), $def(self, "private", function() {
var self = this;return (self);}, 0), $def(self, "public", function() {
var self = this;return (self);}, 0), $def(self, "protected", function() {
var self = this;return (self);}, 0), $def(self, "include", function(mod) {
var self = this;return (rb_include_module(self, mod), nil);}, 0), $def(self, "extend", function(mod) {
var self = this;return (rb_extend_module(self, mod), nil);}, 0));}, 0));})();