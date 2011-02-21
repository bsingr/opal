(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
return ($class(self, nil, "String", function(self) {
return ($def(self, "new", function(str) {
var self = this;if (str === undefined) str = "";
return new String(str);}, 1), $def(self, "*", function(count) {
var self = this;var result = [];

    for (var i = 0; i < count; i++) {
      result.push(self);
    }

    return result.join('');}, 0), $def(self, "+", function(other) {
var self = this;return self + other;}, 0), $def(self, "capitalize", function() {
var self = this;return self.charAt(0).toUpperCase() + self.substr(1).toLowerCase();}, 0), $def(self, "downcase", function() {
var self = this;return self.toLowerCase();}, 0), $def(self, "to_s", function() {
var self = this;return (self);}, 0), $def(self, "inspect", function() {
var self = this;return '"' + self + '"';}, 0), $def(self, "length", function() {
var self = this;return self.length;}, 0), $def(self, "to_sym", function() {
var self = this;return $opal.Y(self);}, 0), $def(self, "intern", function() {
var self = this;return $opal.Y(self);}, 0), $def(self, "reverse", function() {
var self = this;return self.split('').reverse().join('');}, 0), $def(self, "sub", function(pattern) {
var self = this;var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;return self.replace(pattern, function(str) {
      return __block__.call(__block__.$self, str);
    });}, 0), $def(self, "gsub", function(pattern) {
var self = this;var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;var r = pattern.toString();
    r = r.substr(1, r.lastIndexOf('/') - 1);
    r = new RegExp(r, 'g');
    return self.replace(pattern, function(str) {
      return __block__.call(__block__.$self, str);
    });}, 0), $def(self, "slice", function(start, finish) {
var self = this;if (finish === undefined) finish = nil;
return self.substr(start, finish);}, 0), $def(self, "split", function(split) {
var self = this;return self.split(split);}, 0), $def(self, "<=>", function(other) {
var self = this;if (typeof other != 'string') return nil;
    else if (self > other) return 1;
    else if (self < other) return -1;
    return 0;}, 0), $def(self, "==", function(other) {
var self = this;return self.valueOf() === other.valueOf() ? Qtrue : Qfalse;}, 0), $def(self, "=~", function(obj) {
var self = this;return (obj.m$match(self), nil);}, 0), $def(self, "casecmp", function(other) {
var self = this;if (typeof other != 'string') return nil;
    var a = self.toLowerCase(), b = other.toLowerCase();
    if (a > b) return 1;
    else if (a < b) return -1;
    return 0;}, 0), $def(self, "empty?", function() {
var self = this;return self.length == 0 ? Qtrue : Qfalse;}, 0), $def(self, "end_with?", function(suffix) {
var self = this;if (self.lastIndexOf(suffix) == self.length - suffix.length) {
      return Qtrue;
    }

    return Qfalse;}, 0), $def(self, "eql?", function(other) {
var self = this;return self == other ? Qtrue : Qfalse;}, 0), $def(self, "include?", function(other) {
var self = this;return self.indexOf(other) == -1 ? Qfalse : Qtrue;}, 0), $def(self, "index", function(substr) {
var self = this;var res = self.indexOf(substr);

    return res == -1 ? nil : res;}, 0), $def(self, "lstrip", function() {
var self = this;return self.replace(/^\s*/, '');}, 0));}, 0));})();