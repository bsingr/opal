(function(undefined) {
var Opal = $opal, self = Opal.top, $def = Opal.dm, $class = Opal.dc, nil = Opal.Qnil, $hash = Opal.H, $symbol = Opal.Y, $break = Opal.B, $range = Opal.G, $block = Opal.P, $return = Opal.R;
Opal.mm(['to_s', 'inspect']);
return ($class(self, nil, "Range", function(self) {
return ($def(self, "to_s", function(self) {
var __a;
var str = (__a = self.$beg).$m.to_s(__a);
    var str2 = (__a = self.$end).$m.to_s(__a);
    var join = self.$exc ? '...' : '..';
    return str + join + str2;}, 0), $def(self, "inspect", function(self) {
var __a;
var str = (__a = self.$beg).$m.inspect(__a);
    var str2 = (__a = self.$end).$m.inspect(__a);
    var join = self.$exc ? '...' : '..';
    return str + join + str2;}, 0));}, 0));})();