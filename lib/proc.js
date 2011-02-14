(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
Opal.mm([]);
return ($class(self, nil, "Proc", function(self) {
return ($def(self, "to_proc", function(self) {
return (self);}, 0), $def(self, "call", function(self, args) {
args = Array.prototype.slice.call(arguments, 1);
args.unshift(self.$self);
    return self.apply(null, args);}, 0));}, 0));})();