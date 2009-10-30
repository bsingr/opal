cModule.$define_alloc_func(function(module_s_alloc) {
  
});(function(self) {
self.$def(s$p,function(self,_cmd){
});
self.$def(s$b,function(self,_cmd){
});
self.$def(s$ai,function(self,_cmd){
});
self.$def(s$aj,function(self,_cmd){
});
self.$def(s$i,function(self,_cmd){
});
self.$def(s$r,function(self,_cmd){
});
self.$def(s$ak,function(self,_cmd){
});
self.$def(s$al,function(self,_cmd){
});
self.$def(s$am,function(self,_cmd){
return self.$iv_tbl['__classid__'];});
self.$def(s$an,function(self,_cmd){
});
self.$def(s$ao,function(self,_cmd){
});
self.$def(s$ap,function(self,_cmd){
var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < args.length; i++) {
      
      var body = new Function('self', '_cmd', 'return self.$i_g("@' + args[i] + '");')
      self.$def(args[i], body);
    }});
self.$def(s$aq,function(self,_cmd){
var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < args.length; i++) {
      
      var body = new Function('self', '_cmd', 'val', 'VN$(self, "will_change_value_for_key","' + args[i] + '"); var ret = self.$i_s("@' + args[i] + '",val); VN$(self, "did_change_value_for_key","' + args[i] + '"); return ret;');
      self.$def(args[i] + '=', body);
    }});
self.$def(s$ar,function(self,_cmd){
var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < args.length; i++) {
      VN$(self, 'attr_reader', args[i]);
      VN$(self, 'attr_writer', args[i]);
    }});
self.$def(s$as,function(self,_cmd){
});
self.$def(s$at,function(self,_cmd){
});
self.$def(s$au,function(self,_cmd){
});
self.$def(s$av,function(self,_cmd){
});
self.$def(s$aw,function(self,_cmd){
});
self.$def(s$ax,function(self,_cmd){
});
self.$def(s$ay,function(self,_cmd){
});
self.$def(s$az,function(self,_cmd){
});
self.$def(s$ba,function(self,_cmd){
});
self.$def(s$bb,function(self,_cmd){
});
self.$def(s$bc,function(self,_cmd){
});
self.$def(s$bd,function(self,_cmd){
});
self.$def(s$be,function(self,_cmd){
});
self.$def(s$bf,function(self,_cmd){
});
self.$def(s$bg,function(self,_cmd){
});
self.$def(s$bh,function(self,_cmd){
});
})(RClass.define('Module',cObject));
