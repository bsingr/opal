(function(self) {self.$M([]);
var nil = Qnil;
return (rb_vm_class(self, nil, "Numeric", function(self) {
return (rb_vm_defn(self, "+@", function(self) {
var nil = Qnil;
return self;}, 0), rb_vm_defn(self, "-@", function(self) {
var nil = Qnil;
return -self;}, 0), rb_vm_defn(self, "%", function(self, other) {
var nil = Qnil;
return self % other;}, 0), rb_vm_defn(self, "modulo", function(self, other) {
var nil = Qnil;
return self % other;}, 0), rb_vm_defn(self, "&", function(self, num2) {
var nil = Qnil;
return self & num2;}, 0), rb_vm_defn(self, "*", function(self, other) {
var nil = Qnil;
return self * other;}, 0), rb_vm_defn(self, "**", function(self, other) {
var nil = Qnil;
return Math.pow(self, other);}, 0), rb_vm_defn(self, "+", function(self, other) {
var nil = Qnil;
return self + other;}, 0), rb_vm_defn(self, "-", function(self, other) {
var nil = Qnil;
return self - other;}, 0), rb_vm_defn(self, "", function(self, other) {
var nil = Qnil;
return self / other;}, 0), rb_vm_defn(self, "<", function(self, other) {
var nil = Qnil;
return self < other ? Qtrue : Qfalse;}, 0), rb_vm_defn(self, "<=", function(self, other) {
var nil = Qnil;
return self <= other ? Qtrue : Qfalse;}, 0), rb_vm_defn(self, ">", function(self, other) {
var nil = Qnil;
return self > other ? Qtrue : Qfalse;}, 0), rb_vm_defn(self, ">=", function(self, other) {
var nil = Qnil;
return self >= other ? Qtrue : Qfalse;}, 0), rb_vm_defn(self, "<<", function(self, count) {
var nil = Qnil;
return self << count;}, 0), rb_vm_defn(self, ">>", function(self, count) {
var nil = Qnil;
return self >> count;}, 0), rb_vm_defn(self, "<=>", function(self, other) {
var nil = Qnil;
if (typeof other != 'number') return nil;
    else if (self < other) return -1;
    else if (self > other) return 1;
    return 0;}, 0), rb_vm_defn(self, "==", function(self, other) {
var nil = Qnil;
return self.valueOf() === other.valueOf() ? Qtrue : Qfalse;}, 0), rb_vm_defn(self, "^", function(self, other) {
var nil = Qnil;
return self ^ other;}, 0), rb_vm_defn(self, "abs", function(self) {
var nil = Qnil;
return Math.abs(self);}, 0), rb_vm_defn(self, "magnitude", function(self) {
var nil = Qnil;
return Math.abs(self);}, 0), rb_vm_defn(self, "even?", function(self) {
var nil = Qnil;
return (self % 2 == 0) ? Qtrue : Qfalse;}, 0), rb_vm_defn(self, "odd?", function(self) {
var nil = Qnil;
return (self % 2 == 0) ? Qfalse : Qtrue;}, 0), rb_vm_defn(self, "succ", function(self) {
var nil = Qnil;
return self + 1;}, 0), rb_vm_defn(self, "next", function(self) {
var nil = Qnil;
return self + 1;}, 0), rb_vm_defn(self, "pred", function(self) {
var nil = Qnil;
return self - 1;}, 0), rb_vm_defn(self, "upto", function(self, finish) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;for (var i = self; i <= finish; i++) {
      __block__(__block__.$self, i);
    }

    return self;}, 0), rb_vm_defn(self, "downto", function(self, finish) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;for (var i = self; i >= finish; i--) {
      __block__(__block__.$self, i);
    }

    return self;}, 0), rb_vm_defn(self, "times", function(self) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;for (var i = 0; i < self; i++) {
      __block__(__block__.$self, i);
    }

    return self;}, 0), rb_vm_defn(self, "|", function(self, other) {
var nil = Qnil;
return self | other;}, 0), rb_vm_defn(self, "zero?", function(self) {
var nil = Qnil;
return self == 0 ? Qtrue : Qfalse;}, 0), rb_vm_defn(self, "nonzero?", function(self) {
var nil = Qnil;
return self == 0 ? nil : self;}, 0), rb_vm_defn(self, "~", function(self) {
var nil = Qnil;
return ~self;}, 0), rb_vm_defn(self, "ceil", function(self) {
var nil = Qnil;
return Math.ceil(self);}, 0), rb_vm_defn(self, "floor", function(self) {
var nil = Qnil;
return Math.floor(self);}, 0), rb_vm_defn(self, "integer?", function(self) {
var nil = Qnil;
return self % 1 == 0 ? Qtrue : Qfalse;}, 0), rb_vm_defn(self, "inspect", function(self) {
var nil = Qnil;
return self.toString();}, 0), rb_vm_defn(self, "to_s", function(self) {
var nil = Qnil;
return self.toString();}, 0), rb_vm_defn(self, "to_i", function(self) {
var nil = Qnil;
return parseInt(self);}, 0));}, 0));})(rb_top_self);