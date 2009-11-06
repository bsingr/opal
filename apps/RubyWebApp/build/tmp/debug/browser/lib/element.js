(function(self) {
_E(self,s$l,_$a);
self.$def_s(s$m,function(self,_,the_id){
document.getElementById(the_id)});
_I(self,s$n,function(self,_,type,options){
self.$i_s(i$b,document.createElement(_E(type,s$h)));
return self.$i_s(i$c,type);
});
_I(self,s$o,function(self,_){
return _H(self,i$b);
});
_I(self,s$p,function(self,_,name){
_E(self,s$o).className = name;});
_I(self,s$q,function(self,_,options){
_E(options,s$r,function(key,value){
_E(self,s$o).style[_E(_E(key,s$h),s$s)] = value;});
return self;
});
_I(self,s$t,function(self,_,key,value){
_E(self,s$o).setAttribute(key, value);});
_I(self,s$u,function(self,_,obj){
_E(self,s$o).src = obj;});
_I(self,s$v,function(self,_,str){
_E(self,s$o).innerHTML = str;});
_I(self,s$w,function(self,_,new_frame){
_E(self,s$x,_E(new_frame,s$y));
return _E(self,s$z,_E(new_frame,s$aa));
});
_I(self,s$x,function(self,_,new_origin){
_E(self,s$o).style.left = _E(new_origin,s$ab) + 'px';_E(self,s$o).style.top = _E(new_origin,s$ac) + 'px';});
_I(self,s$z,function(self,_,new_size){
if(_A(_E(_H(self,i$c),s$ad,'canvas'))){
_E(self,s$o).width = _E(new_size,s$ae);_E(self,s$o).height = _E(new_size,s$af);}
else{
_E(self,s$o).style.width = _E(new_size,s$ae) + 'px';_E(self,s$o).style.height = _E(new_size,s$af) + 'px';}
});
_I(self,s$e,function(self,_,other){
if(_A(_E(other,s$ag,self.$klass.$c_g_full(c$d)))){
_E(self,s$o).innerHTML += other;}
else{
_E(self,s$o).appendChild(_E(other,s$o));}
});
_I(self,s$ah,function(self,_,str){
_E(self,s$o).innerHTML = str;});
_I(self,s$ai,function(self,_,type,block){
self.$i_s(i$a,ORTEST(_H(self,i$a),VN.$h()));
_E(_H(self,i$a),s$g,type,block);
if (document.addEventListener) {
      _E(self,s$o).addEventListener(_E(type,s$h), _E(self,s$aj), false);
    }
    else {
      _E(self,s$o).attachEvent('on' + _E(type,s$h), _E(self,s$aj));
    }});
_I(self,s$f,function(self,_,type,listener){
if (document.addEventListener) {
      _E(self,s$o).addEventListener(_E(type,s$h), listener, false);
    }
    else {
      _E(self,s$o).attachEvent('on' + _E(type,s$h), listener);
    }});
})(_M(c$e,cObject));
