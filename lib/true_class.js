(function(self) {self.$M([]);
var nil = Qnil;
return (rb_vm_class(self, nil, "TrueClass", function(self) {
return (rb_vm_defn(self, "to_s", function(self) {
var nil = Qnil;
return ("true");}, 0), rb_vm_defn(self, "&", function(self, other) {
var nil = Qnil;
return other.$r ? Qtrue : Qfalse;}, 0), rb_vm_defn(self, "|", function(self, other) {
var nil = Qnil;
return (Qtrue);}, 0), rb_vm_defn(self, "^", function(self, other) {
var nil = Qnil;
return other.$r ? Qfalse : Qtrue;}, 0));}, 0), rb_vm_cs(self, "TRUE", Qtrue));})(rb_top_self);