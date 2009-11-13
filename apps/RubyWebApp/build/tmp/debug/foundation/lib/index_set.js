(function(self) {
(function(self) {
_I(self,s$n,function(self,_,obj){
self.$i_s(i$q,0);
return self.$i_s(i$r,[]);
});
self.$def_s(s$dj,function(self,_){
return _E(self,s$aq);
});
self.$def_s(s$dk,function(self,_,value){
var obj=_E(self,s$aq);
_E(obj,s$dl,value);
return obj;
});
self.$def_s(s$dm,function(self,_,range){
var obj=_E(self,s$aq);
_E(obj,s$dn,range);
return obj;
});
_I(self,s$do,function(self,_,index_set){
return false;
});
_I(self,s$dp,function(self,_){
return _H(self,i$q);
});
_I(self,s$dq,function(self,_){
return _H(self,i$r);
});
_I(self,s$dr,function(self,_){
if(_A((_E(_E(_H(self,i$r),s$cr),s$ad,0)))){
return _E((1),s$ds);
}
var first_index=_E(_E(_H(self,i$r),s$j,0),s$dt);
_E(_E(_H(self,i$r),s$cr),s$du,function(range){
if(_A(_E(_E(_E(_H(self,i$r),s$j,range),s$dt),s$dv,first_index))){
first_index=_E(_E(_H(self,i$r),s$j,range),s$dt);
}
});
return first_index;
});
_I(self,s$dw,function(self,_){
if(_A((_E(_E(_H(self,i$r),s$cr),s$ad,0)))){
return _E((1),s$ds);
}
var last_index=_E(_E(_E(_H(self,i$r),s$j,0),s$dx),s$dy,1);
_E(_E(_H(self,i$r),s$cr),s$du,function(range){
if(_A(_E((_E(_E(_E(_H(self,i$r),s$j,range),s$dx),s$dy,1)),s$dz,last_index))){
last_index=_E(_E(_E(_H(self,i$r),s$j,range),s$dx),s$dy,1);
}
});
return last_index;
});
_I(self,s$ea,function(self,_,index){
return _E(self,s$eb,index);
});
_I(self,s$eb,function(self,_,index){
var result=false;
if(_A(_E(_E(_H(self,i$r),s$cr),s$ad,0))){
return result;
}
_E(_E(_H(self,i$r),s$cr),s$du,function(range){
if(_A(ANDTEST((_E(index,s$ec,_E(_E(_H(self,i$r),s$j,range),s$dt))),(_E(_E(_E(_H(self,i$r),s$j,range),s$dx),s$dz,index))))){
result=true;
}
});
return result;
});
_I(self,s$dl,function(self,_,index){
return _E(self,s$dn,VN.$r(index,_E(index,s$ed,1),false));
});
_I(self,s$dn,function(self,_,range){
return _E(_H(self,i$r),s$e,range);
});
_I(self,s$ee,function(self,_,indexes){
});
})(_N(self,c$q,cObject));
})(_K(c$b));
