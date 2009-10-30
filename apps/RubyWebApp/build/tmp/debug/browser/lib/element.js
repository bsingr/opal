(function(self) {
VN$(self,s$ar,_$a);
self.$def_s(s$je,function(self,_cmd,the_id){
document.getElementById(the_id)});
self.$def(s$as,function(self,_cmd,type,options){
self.$i_s(i$d,document.createElement(type));
return self.$i_s(i$e,type);
});
self.$def(s$jf,function(self,_cmd){
return self.$i_g(i$d);
});
self.$def(s$jg,function(self,_cmd,name){
VN$(self, s$jf).className = name;});
self.$def(s$jh,function(self,_cmd,options){
VN$(options,s$ga,function(key,value){
VN$(self, s$jf).style[VN$(key,s$cl)] = value;});
return self;
});
self.$def(s$ji,function(self,_cmd,key,value){
VN$(self, s$jf).setAttribute(key, value);});
self.$def(s$jj,function(self,_cmd,obj){
VN$(self, s$jf).src = obj;});
self.$def(s$jk,function(self,_cmd,str){
VN$(self, s$jf).innerHTML = str;});
self.$def(s$jl,function(self,_cmd,new_frame){
VN$(self,'origin=',VN$(new_frame,s$jm));
return VN$(self,'size=',VN$(new_frame,s$bs));
});
self.$def(s$jn,function(self,_cmd,new_origin){
VN$(self, s$jf).style.left = VN$(new_origin,s$jo) + 'px';VN$(self, s$jf).style.top = VN$(new_origin,s$jp) + 'px';});
self.$def(s$jq,function(self,_cmd,new_size){
if(RTEST(VN$(self.$i_g(i$e),s$ai,_$b))){
VN$(self, s$jf).width = VN$(new_size,s$jr);VN$(self, s$jf).height = VN$(new_size,s$js);}
else{
VN$(self, s$jf).style.width = VN$(new_size,s$jr) + 'px';VN$(self, s$jf).style.height = VN$(new_size,s$js) + 'px';}
});
self.$def(s$cv,function(self,_cmd,other){
if(RTEST(VN$(other,s$ad,self.$klass.$c_g_full('String')))){
VN$(self, s$jf).innerHTML += other;}
else{
VN$(self, s$jf).appendChild(VN$(other,s$jf));}
});
self.$def(s$jt,function(self,_cmd,str){
VN$(self, s$jf).innerHTML = str;});
self.$def(s$jb,function(self,_cmd,type,listener){
if (document.addEventListener) {
      VN$(self, s$jf).addEventListener(type, listener, false);
    }
    else {
      VN$(self, s$jf).attachEvent('on' + type, listener);
    }});
})(RClass.define('Element',cObject));
