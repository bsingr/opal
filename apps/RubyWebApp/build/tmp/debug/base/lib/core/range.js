
VN.$r = function(start, ending, exclusive) {
  return VN$(cRange, 'new', start, ending, exclusive);
};
(function(self) {
self.$def(s$as,function(self,_cmd,start,ending,exclusive){
self.$i_s(i$a,start);
return self.$i_s(i$b,ending);
});
self.$def(s$i,function(self,_cmd){
});
self.$def(s$ai,function(self,_cmd,obj){
});
self.$def(s$b,function(self,_cmd,obj){
});
self.$def(s$e,function(self,_cmd,obj){
});
self.$def(s$bj,function(self,_cmd){
});
self.$def(s$ga,function(self,_cmd,block){
for (var i = self.$i_g(i$a); i <= self.$i_g(i$b); i++) {
      VN$(block, 'call', i);
    }return self;
});
self.$def(s$ey,function(self,_cmd){
});
self.$def(s$im,function(self,_cmd){
});
self.$def(s$in,function(self,_cmd){
});
self.$def(s$fu,function(self,_cmd){
});
self.$def(s$fv,function(self,_cmd){
});
self.$def(s$io,function(self,_cmd){
});
self.$def(s$ip,function(self,_cmd){
});
self.$def(s$r,function(self,_cmd){
});
self.$def(s$s,function(self,_cmd){
});
self.$def(s$iq,function(self,_cmd){
});
self.$def(s$if,function(self,_cmd){
});
self.$def(s$al,function(self,_cmd){
});
self.$def(s$ir,function(self,_cmd){
});
})(RClass.define('Range',cObject));
