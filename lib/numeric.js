(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm([]);
return ($class(self, nil, "Numeric", function(self) {
return ($def(self, "+@", function(self) {
return self;}, 0), $def(self, "-@", function(self) {
return -self;}, 0), $def(self, "%", function(self, other) {
return self % other;}, 0), $def(self, "modulo", function(self, other) {
return self % other;}, 0), $def(self, "&", function(self, num2) {
return self & num2;}, 0), $def(self, "*", function(self, other) {
return self * other;}, 0), $def(self, "**", function(self, other) {
return Math.pow(self, other);}, 0), $def(self, "+", function(self, other) {
return self + other;}, 0), $def(self, "-", function(self, other) {
return self - other;}, 0), $def(self, "", function(self, other) {
return self / other;}, 0), $def(self, "<", function(self, other) {
return self < other ? Qtrue : Qfalse;}, 0), $def(self, "<=", function(self, other) {
return self <= other ? Qtrue : Qfalse;}, 0), $def(self, ">", function(self, other) {
return self > other ? Qtrue : Qfalse;}, 0), $def(self, ">=", function(self, other) {
return self >= other ? Qtrue : Qfalse;}, 0), $def(self, "<<", function(self, count) {
return self << count;}, 0), $def(self, ">>", function(self, count) {
return self >> count;}, 0), $def(self, "<=>", function(self, other) {
if (typeof other != 'number') return nil;
    else if (self < other) return -1;
    else if (self > other) return 1;
    return 0;}, 0), $def(self, "==", function(self, other) {
return self.valueOf() === other.valueOf() ? Qtrue : Qfalse;}, 0), $def(self, "^", function(self, other) {
return self ^ other;}, 0), $def(self, "abs", function(self) {
return Math.abs(self);}, 0), $def(self, "magnitude", function(self) {
return Math.abs(self);}, 0), $def(self, "even?", function(self) {
return (self % 2 == 0) ? Qtrue : Qfalse;}, 0), $def(self, "odd?", function(self) {
return (self % 2 == 0) ? Qfalse : Qtrue;}, 0), $def(self, "succ", function(self) {
return self + 1;}, 0), $def(self, "next", function(self) {
return self + 1;}, 0), $def(self, "pred", function(self) {
return self - 1;}, 0), $def(self, "upto", function(self, finish) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = self; i <= finish; i++) {
      __block__(__block__.$self, i);
    }

    return self;}, 0), $def(self, "downto", function(self, finish) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = self; i >= finish; i--) {
      __block__(__block__.$self, i);
    }

    return self;}, 0), $def(self, "times", function(self) {
var __block__ = ($block.f == arguments.callee)? $block.p : nil;$block.p = $block.f = nil;for (var i = 0; i < self; i++) {
      __block__(__block__.$self, i);
    }

    return self;}, 0), $def(self, "|", function(self, other) {
return self | other;}, 0), $def(self, "zero?", function(self) {
return self == 0 ? Qtrue : Qfalse;}, 0), $def(self, "nonzero?", function(self) {
return self == 0 ? nil : self;}, 0), $def(self, "~", function(self) {
return ~self;}, 0), $def(self, "ceil", function(self) {
return Math.ceil(self);}, 0), $def(self, "floor", function(self) {
return Math.floor(self);}, 0), $def(self, "integer?", function(self) {
return self % 1 == 0 ? Qtrue : Qfalse;}, 0), $def(self, "inspect", function(self) {
return self.toString();}, 0), $def(self, "to_s", function(self) {
return self.toString();}, 0), $def(self, "to_i", function(self) {
return parseInt(self);}, 0));}, 0));})();