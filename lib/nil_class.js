(function(self) {self.$M([]);
var nil = Qnil;
return (rb_vm_class(self, nil, "NilClass", function(self) {
return (rb_vm_defn(self, "to_i", function(self) {
var nil = Qnil;
return (0);}, 0), rb_vm_defn(self, "to_f", function(self) {
var nil = Qnil;
return (0.0);}, 0), rb_vm_defn(self, "to_s", function(self) {
var nil = Qnil;
return ("");}, 0), rb_vm_defn(self, "to_a", function(self) {
var nil = Qnil;
return ([]);}, 0), rb_vm_defn(self, "inspect", function(self) {
var nil = Qnil;
return ("nil");}, 0), rb_vm_defn(self, "nil?", function(self) {
var nil = Qnil;
return (Qtrue);}, 0), rb_vm_defn(self, "&", function(self, other) {
var nil = Qnil;
return (Qfalse);}, 0), rb_vm_defn(self, "|", function(self, other) {
var nil = Qnil;
return other.$r ? Qtrue : Qfalse;}, 0), rb_vm_defn(self, "^", function(self, other) {
var nil = Qnil;
return other.$r ? Qtrue : Qfalse;}, 0));}, 0), rb_vm_cs(self, "NIL", nil));})(rb_top_self);