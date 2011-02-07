(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P;
Opal.mm(['match']);
return ($class(self, nil, "String", function(self) {
return ($def(self, "*", function(self, count) {
var result = [];

    for (var i = 0; i < count; i++) {
      result.push(self);
    }

    return result.join('');}, 0), $def(self, "+", function(self, other) {
return self + other;}, 0), $def(self, "capitalize", function(self) {
return self.charAt(0).toUpperCase() + self.substr(1).toLowerCase();}, 0), $def(self, "downcase", function(self) {
return self.toLowerCase();}, 0), $def(self, "to_s", function(self) {
return (self);}, 0), $def(self, "inspect", function(self) {
return '"' + self + '"';}, 0), $def(self, "length", function(self) {
return self.length;}, 0), $def(self, "to_sym", function(self) {
return opalsym(self);}, 0), $def(self, "intern", function(self) {
return opalsym(self);}, 0), $def(self, "reverse", function(self) {
return self.split('').reverse().join('');}, 0), $def(self, "sub", function(self, pattern) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return self.replace(pattern, function(str) {
      return __block__(__block__.$self, str);
    });}, 0), $def(self, "gsub", function(self, pattern) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var r = pattern.toString();
    r = r.substr(1, r.lastIndexOf('/') - 1);
    r = new RegExp(r, 'g');
    return self.replace(pattern, function(str) {
      return __block__(__block__.$self, str);
    });}, 0), $def(self, "slice", function(self, start, finish) {
if (finish === undefined) finish = nil;
return self.substr(start, finish);}, 0), $def(self, "split", function(self, split) {
return self.split(split);}, 0), $def(self, "<=>", function(self, other) {
if (typeof other != 'string') return nil;
    else if (self > other) return 1;
    else if (self < other) return -1;
    return 0;}, 0), $def(self, "==", function(self, other) {
return self.valueOf() === other.valueOf() ? Qtrue : Qfalse;}, 0), $def(self, "=~", function(self, obj) {
var __a;
return ((__a = obj).$m.match(__a, self), nil);}, 0), $def(self, "casecmp", function(self, other) {
if (typeof other != 'string') return nil;
    var a = self.toLowerCase(), b = other.toLowerCase();
    if (a > b) return 1;
    else if (a < b) return -1;
    return 0;}, 0), $def(self, "empty?", function(self) {
return self.length == 0 ? Qtrue : Qfalse;}, 0), $def(self, "end_with?", function(self, suffix) {
if (self.lastIndexOf(suffix) == self.length - suffix.length) {
      return Qtrue;
    }

    return Qfalse;}, 0), $def(self, "eql?", function(self, other) {
return self == other ? Qtrue : Qfalse;}, 0), $def(self, "include?", function(self, other) {
return self.indexOf(other) == -1 ? Qfalse : Qtrue;}, 0), $def(self, "index", function(self, substr) {
var res = self.indexOf(substr);

    return res == -1 ? nil : res;}, 0), $def(self, "lstrip", function(self) {
return self.replace(/^\s*/, '');}, 0));}, 0));})();