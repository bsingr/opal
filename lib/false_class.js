(function(self) {self.$M([]);
var nil = Qnil;
return (rb_vm_class(self, nil, "FalseClass", function(self) {
return (rb_vm_defn(self, "to_s", function(self) {
var nil = Qnil;
return ("false");}, 0), rb_vm_defn(self, "&", function(self, other) {
var nil = Qnil;
return (Qfalse);}, 0), rb_vm_defn(self, "|", function(self, other) {
var nil = Qnil;
return other.$r ? Qtrue : Qfalse;}, 0), rb_vm_defn(self, "^", function(self, other) {
var nil = Qnil;
return other.$r ? Qtrue : Qfalse;}, 0));}, 0), rb_vm_cs(self, "FALSE", Qfalse));})(rb_top_self);