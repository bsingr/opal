(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, Qtrue = Opal.Qtrue, Qfalse = Opal.Qfalse, $range = Opal.G, $block = Opal.P, $cg = Opal.cg;
return ($class(self, nil, "Numeric", function() {
var self = this;return ($def(self, "+@", function() {
var self = this;
return self;}, 0), $def(self, "-@", function() {
var self = this;
return -self;}, 0), $def(self, "%", function(other) {
var self = this;
return self % other;}, 0), $def(self, "modulo", function(other) {
var self = this;
return self % other;}, 0), $def(self, "&", function(num2) {
var self = this;
return self & num2;}, 0), $def(self, "*", function(other) {
var self = this;
return self * other;}, 0), $def(self, "**", function(other) {
var self = this;
return Math.pow(self, other);}, 0), $def(self, "+", function(other) {
var self = this;
return self + other;}, 0), $def(self, "-", function(other) {
var self = this;
return self - other;}, 0), $def(self, "", function(other) {
var self = this;
return self / other;}, 0), $def(self, "<", function(other) {
var self = this;
return self < other ? Qtrue : Qfalse;}, 0), $def(self, "<=", function(other) {
var self = this;
return self <= other ? Qtrue : Qfalse;}, 0), $def(self, ">", function(other) {
var self = this;
return self > other ? Qtrue : Qfalse;}, 0), $def(self, ">=", function(other) {
var self = this;
return self >= other ? Qtrue : Qfalse;}, 0), $def(self, "<<", function(count) {
var self = this;
return self << count;}, 0), $def(self, ">>", function(count) {
var self = this;
return self >> count;}, 0), $def(self, "<=>", function(other) {
var self = this;
if (typeof other != 'number') return nil;
    else if (self < other) return -1;
    else if (self > other) return 1;
    return 0;}, 0), $def(self, "==", function(other) {
var self = this;
return self.valueOf() === other.valueOf() ? Qtrue : Qfalse;}, 0), $def(self, "^", function(other) {
var self = this;
return self ^ other;}, 0), $def(self, "abs", function() {
var self = this;
return Math.abs(self);}, 0), $def(self, "magnitude", function() {
var self = this;
return Math.abs(self);}, 0), $def(self, "even?", function() {
var self = this;
return (self % 2 == 0) ? Qtrue : Qfalse;}, 0), $def(self, "odd?", function() {
var self = this;
return (self % 2 == 0) ? Qfalse : Qtrue;}, 0), $def(self, "succ", function() {
var self = this;
return self + 1;}, 0), $def(self, "next", function() {
var self = this;
return self + 1;}, 0), $def(self, "pred", function() {
var self = this;
return self - 1;}, 0), $def(self, "upto", function(finish) {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = self; i <= finish; i++) {
      __block__.call(__block__.$self, i);
    }

    return self;}, 0), $def(self, "downto", function(finish) {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = self; i >= finish; i--) {
      __block__.call(__block__.$self, i);
    }

    return self;}, 0), $def(self, "times", function() {
var self = this;
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = 0; i < self; i++) {
      __block__.call(__block__.$self, i);
    }

    return self;}, 0), $def(self, "|", function(other) {
var self = this;
return self | other;}, 0), $def(self, "zero?", function() {
var self = this;
return self == 0 ? Qtrue : Qfalse;}, 0), $def(self, "nonzero?", function() {
var self = this;
return self == 0 ? nil : self;}, 0), $def(self, "~", function() {
var self = this;
return ~self;}, 0), $def(self, "ceil", function() {
var self = this;
return Math.ceil(self);}, 0), $def(self, "floor", function() {
var self = this;
return Math.floor(self);}, 0), $def(self, "integer?", function() {
var self = this;
return self % 1 == 0 ? Qtrue : Qfalse;}, 0), $def(self, "inspect", function() {
var self = this;
return self.toString();}, 0), $def(self, "to_s", function() {
var self = this;
return self.toString();}, 0), $def(self, "to_i", function() {
var self = this;
return parseInt(self);}, 0));}, 0));})();