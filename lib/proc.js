(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, Qtrue = Opal.Qtrue, Qfalse = Opal.Qfalse, $range = Opal.G, $block = Opal.P, $cg = Opal.cg;
return ($class(self, nil, "Proc", function() {
var self = this;return ($def(self, "to_proc", function() {
var self = this;
return (self);}, 0), $def(self, "call", function(args) {
var self = this;
args = Array.prototype.slice.call(arguments, 0);
args.unshift(self.$self);
    return self.apply(null, args);}, 0));}, 0));})();