(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
return ($class(self, nil, "Exception", function(self) {
return ($def(self, "allocate", function() {
var self = this;var err = new Error();
    err.$klass = self;
    return err;}, 1), $def(self, "initialize", function(message) {
var self = this;if (message === undefined) message = "";
return self.message = message;}, 0), $def(self, "message", function() {
var self = this;return self.message;}, 0), $def(self, "inspect", function() {
var self = this;return "#<" + self.$klass.__classid__ + ": '" + self.message + "'>";}, 0), $def(self, "to_s", function() {
var self = this;return self.message;}, 0));}, 0), $class(self, rb_vm_cg(self, "Exception"), "StandardError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "Exception"), "RuntimeError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "StandardError"), "LocalJumpError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "StandardError"), "TypeError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "StandardError"), "NameError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "NameError"), "NoMethodError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "StandardError"), "ArgumentError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "Exception"), "ScriptError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "ScriptError"), "LoadError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "StandardError"), "IndexError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "IndexError"), "KeyError", function(self) {
return (nil);}, 0), $class(self, rb_vm_cg(self, "StandardError"), "RangeError", function(self) {
return (nil);}, 0));})();