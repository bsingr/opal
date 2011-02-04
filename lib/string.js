(function(self) {self.$M(['match']);
var nil = Qnil;
return (rb_vm_class(self, nil, "String", function(self) {
return (rb_vm_defn(self, "*", function(self, count) {
var nil = Qnil;
var result = [];

    for (var i = 0; i < count; i++) {
      result.push(self);
    }

    return result.join('');}, 0), rb_vm_defn(self, "+", function(self, other) {
var nil = Qnil;
return self + other;}, 0), rb_vm_defn(self, "capitalize", function(self) {
var nil = Qnil;
return self.charAt(0).toUpperCase() + self.substr(1).toLowerCase();}, 0), rb_vm_defn(self, "downcase", function(self) {
var nil = Qnil;
return self.toLowerCase();}, 0), rb_vm_defn(self, "to_s", function(self) {
var nil = Qnil;
return (self);}, 0), rb_vm_defn(self, "inspect", function(self) {
var nil = Qnil;
return '"' + self + '"';}, 0), rb_vm_defn(self, "length", function(self) {
var nil = Qnil;
return self.length;}, 0), rb_vm_defn(self, "to_sym", function(self) {
var nil = Qnil;
return opalsym(self);}, 0), rb_vm_defn(self, "intern", function(self) {
var nil = Qnil;
return opalsym(self);}, 0), rb_vm_defn(self, "reverse", function(self) {
var nil = Qnil;
return self.split('').reverse().join('');}, 0), rb_vm_defn(self, "sub", function(self, pattern) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;return self.replace(pattern, function(str) {
      return __block__(__block__.$self, str);
    });}, 0), rb_vm_defn(self, "gsub", function(self, pattern) {
var nil = Qnil;
var __block__ = (rb_block_func == arguments.callee)? rb_block_proc : Qnil;rb_block_proc = rb_block_func = Qnil;var r = pattern.toString();
    r = r.substr(1, r.lastIndexOf('/') - 1);
    r = new RegExp(r, 'g');
    return self.replace(pattern, function(str) {
      return __block__(__block__.$self, str);
    });}, 0), rb_vm_defn(self, "slice", function(self, start, finish) {
var nil = Qnil;
if (finish === undefined) finish = nil;
return self.substr(start, finish);}, 0), rb_vm_defn(self, "split", function(self, split) {
var nil = Qnil;
return self.split(split);}, 0), rb_vm_defn(self, "<=>", function(self, other) {
var nil = Qnil;
if (typeof other != 'string') return nil;
    else if (self > other) return 1;
    else if (self < other) return -1;
    return 0;}, 0), rb_vm_defn(self, "==", function(self, other) {
var nil = Qnil;
return self.valueOf() === other.valueOf() ? Qtrue : Qfalse;}, 0), rb_vm_defn(self, "=~", function(self, obj) {
var nil = Qnil;
var __a;
return ((__a = obj, __a.$m.match)(__a, self), nil);}, 0), rb_vm_defn(self, "casecmp", function(self, other) {
var nil = Qnil;
if (typeof other != 'string') return nil;
    var a = self.toLowerCase(), b = other.toLowerCase();
    if (a > b) return 1;
    else if (a < b) return -1;
    return 0;}, 0), rb_vm_defn(self, "empty?", function(self) {
var nil = Qnil;
return self.length == 0 ? Qtrue : Qfalse;}, 0), rb_vm_defn(self, "end_with?", function(self, suffix) {
var nil = Qnil;
if (self.lastIndexOf(suffix) == self.length - suffix.length) {
      return Qtrue;
    }

    return Qfalse;}, 0), rb_vm_defn(self, "eql?", function(self, other) {
var nil = Qnil;
return self == other ? Qtrue : Qfalse;}, 0), rb_vm_defn(self, "include?", function(self, other) {
var nil = Qnil;
return self.indexOf(other) == -1 ? Qfalse : Qtrue;}, 0), rb_vm_defn(self, "index", function(self, substr) {
var nil = Qnil;
var res = self.indexOf(substr);

    return res == -1 ? nil : res;}, 0), rb_vm_defn(self, "lstrip", function(self) {
var nil = Qnil;
return self.replace(/^\s*/, '');}, 0));}, 0));})(rb_top_self);