function NSMakeRange(loc,len)
{
var r = {location:0,length:0,};
r.location = loc;
r.length = len;
return r;
}
function NSMaxRange(range)
{
return (range.location + range.length);
}
function NSLocationInRange(loc,range)
{
return (loc - range.location < range.length);
}
function NSEqualRanges(range1,range2)
{
return (range1.location == range2.location && range1.length == range2.length);
}
function NSUnionRange(range1,range2)
{
}
function NSIntersectionRange(range1,range2)
{
}
function d()
{
}
function NSRangeFromString(aString)
{
}
var the_class = NSValue;
var meta_class = the_class.isa;

class_addMethod(the_class, "rangeValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "valueWithRange:", function(self, _cmd, range) {
with(self) {
}
}, "void");

