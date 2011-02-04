(function(self) {self.$M([]);
var nil = Qnil;
return (rb_vm_class(self, nil, "Symbol", function(self) {
return (rb_vm_defn(self, "inspect", function(self) {
var nil = Qnil;
return ':' + self.__ptr__;}, 0), rb_vm_defn(self, "to_s", function(self) {
var nil = Qnil;
return self.__ptr__;}, 0), rb_vm_defn(self, "to_sym", function(self) {
var nil = Qnil;
return (self);}, 0));}, 0));})(rb_top_self);