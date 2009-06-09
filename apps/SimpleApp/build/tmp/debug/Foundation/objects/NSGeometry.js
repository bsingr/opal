function NSMakePoint(x,y)
{
var p = {x:0,y:0,};
p.x = x;
p.y = y;
return p;
}
function NSMakeSize(w,h)
{
var s = {width:0,height:0,};
s.width = w;
s.height = h;
return s;
}
function NSMakeRect(x,y,w,h)
{
var r = {origin:{x:0,y:0,},size:{width:0,height:0,},};
r.origin.x = x;
r.origin.y = y;
r.size.width = w;
r.size.height = h;
return r;
}
function NSMaxX(aRect)
{
}
function NSMaxY(aRect)
{
}
function NSMidX(aRect)
{
}
function NSMidY(aRect)
{
}
function NSMinX(aRect)
{
}
function NSMinY(aRect)
{
}
function NSWidth(aRect)
{
}
function NSHeight(aRect)
{
}
function NSRectFromCGRect(cgrect)
{
}
function NSRectToCGRect(nsrect)
{
}
function NSPointFromCGPoint(cgpoint)
{
}
function NSPointToCGPoint(nspoint)
{
}
function NSSizeFromCGSize(cgsize)
{
}
function NSSizeToCGSize(nssize)
{
}
function NSEqualPoints(aPoint,bPoint)
{
}
function NSEqualSizes(aSize,bSize)
{
}
function NSEqualRects(aRect,bRect)
{
}
function NSIsEmptyRect(aRect)
{
}
function NSInsetRect(aRect,dX,dY)
{
}
function NSIntegralRect(aRect)
{
}
function NSUnionRect(aRect,bRect)
{
}
function NSIntersectionRect(aRect,bRect)
{
}
function NSOffsetRect(aRect,dX,dY)
{
}
function NSDivideRect(inRect,slice,rem,amount,edge)
{
}
function NSPointInRect(aPoint,aRect)
{
}
function NSMouseInRect(aPoint,aRect,flipped)
{
}
function NSContainsRect(aRect,bRect)
{
}
function NSIntersectsRect(aRect,bRect)
{
}
function d()
{
}
function d()
{
}
function d()
{
}
function NSPointFromString(aString)
{
if (!aString)
return NSMakePoint(0,0);

return CGPointFromString(aString);
}
function NSSizeFromString(aString)
{
if (!aString)
return NSMakeSize(0,0);

return CGSizeFromString(aString);
}
function NSRectFromString(aString)
{
if (!aString)
return NSMakeRect(0,0,0,0);

return CGRectFromString(aString);
}
