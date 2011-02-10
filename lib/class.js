(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, Qtrue = Opal.Qtrue, Qfalse = Opal.Qfalse, $range = Opal.G, $block = Opal.P, $cg = Opal.cg;
return ($class(self, nil, "Class", function() {
var self = this;return ($def(self, "new", function(args) {
var self = this;
args = Array.prototype.slice.call(arguments, 1);
var obj = self.m$allocate();
    obj.m$initialize.apply(obj, args);
    return obj;}, 0), $def(self, "allocate", function() {
var self = this;
return new self.allocator();}, 0), $def(self, "superclass", function() {
var self = this;
var sup = self.$super;

    if (!sup) {
      if (self == $opal.BasicObject) return Qnil;
      throw new Error("uninitialized class");
    }

    return sup;}, 0));}, 0));})();