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
