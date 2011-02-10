(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, Qtrue = Opal.Qtrue, Qfalse = Opal.Qfalse, $range = Opal.G, $block = Opal.P, $cg = Opal.cg;
return ($class(self, nil, "Module", function() {
var self = this;return ($def(self, "name", function() {
var self = this;
return self['__classid__'];}, 0), $def(self, "===", function(obj) {
var self = this;
return (obj["m$kind_of?"](self));}, 0), $def(self, "define_method", function(method_id) {
var self = this;
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return ((!((block !== nil ? Qtrue : Qfalse).$r) ? self.m$raise($cg(self, "LocalJumpError"), "no block given"):nil), console.log("self is:"), console.log(self), $def(self, method_id.m$to_s(), block), nil);}, 0), $def(self, "attr_accessor", function(attrs) {
var self = this;
attrs = Array.prototype.slice.call(arguments, 1);
return (self.m$attr_reader.apply(nil, [].concat(attrs)), self.m$attr_writer.apply(nil, [].concat(attrs)));}, 0), $def(self, "attr_reader", function(attrs) {
var self = this;
attrs = Array.prototype.slice.call(arguments, 1);
for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var method_id = attr.m$to_s();

      $def(self, method_id, 
            new Function('self', 'return rb_ivar_get(self, "@' + method_id + '");'));

    }

    return nil;}, 0), $def(self, "attr_writer", function(attrs) {
var self = this;
attrs = Array.prototype.slice.call(arguments, 1);
for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      var method_id = attr.m$to_s();

      $def(self, method_id + '=', 
        new Function('self', 'val', 'return rb_ivar_set(self, "@' + method_id + '", val);'));

    }

    return nil;}, 0), $def(self, "alias_method", function(new_name, old_name) {
var self = this;
return (new_name = new_name.m$to_s(), old_name = old_name.m$to_s(), $opal.am(self, new_name, old_name), self);}, 0), $def(self, "to_s", function() {
var self = this;
return self['__classid__'];}, 0), $def(self, "const_set", function(id, value) {
var self = this;
return rb_vm_cs(self, id.m$to_s(), value);}, 0), $def(self, "class_eval", function(str) {
var self = this;
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return (((block !== nil ? Qtrue : Qfalse).$r ? (block(self)) : (self.m$raise("need to compile str"))));}, 0), $def(self, "module_eval", function(str) {
var self = this;
var block = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return (($block.p = block, $block.f = self.m$class_eval)(str));}, 0), $def(self, "private", function() {
var self = this;
return (self);}, 0), $def(self, "public", function() {
var self = this;
return (self);}, 0), $def(self, "protected", function() {
var self = this;
return (self);}, 0), $def(self, "include", function(mod) {
var self = this;
return (self.include(mod), nil);}, 0), $def(self, "extend", function(mod) {
var self = this;
return (self.extend(mod), nil);}, 0));}, 0));})();