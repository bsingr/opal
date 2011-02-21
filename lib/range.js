(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R, $super = Opal.S;
return ($class(self, nil, "Range", function(self) {
return ($def(self, "to_s", function() {
var self = this;var str = self.$beg.m$to_s();
    var str2 = self.$end.m$to_s();
    var join = self.$exc ? '...' : '..';
    return str + join + str2;}, 0), $def(self, "inspect", function() {
var self = this;var str = self.$beg.m$inspect();
    var str2 = self.$end.m$inspect();
    var join = self.$exc ? '...' : '..';
    return str + join + str2;}, 0));}, 0));})();