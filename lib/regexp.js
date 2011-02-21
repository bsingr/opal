(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
return ($class(self, nil, "Regexp", function(self) {
return ($def(self, "inspect", function() {
var self = this;return self.toString();}, 0), $def(self, "==", function(other) {
var self = this;return self.toString() === other.toString() ? Qtrue : Qfalse;}, 0), $def(self, "eql?", function(other) {
var self = this;return (self["m$=="](other));}, 0), $def(self, "match", function(pattern) {
var self = this;return (nil);}, 0));}, 0));})();