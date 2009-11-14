
VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/app_kit/lib/vib/window_template.js');
(function(self) {
(function(self) {
self.$def_s(s$aso,function(self,_,name){
var vib_name=[(name),".vib"].join('');
if(vn_resource_stack.hasOwnProperty(vib_name)) {var file=vn_resource_stack[vib_name];
var obj=_E(self,s$as,file);
return obj;
}alert('cannot find nib vib_name');});
_I(self,s$n,function(self,_,js_object){
self.$i_s(i$jb,js_object);
self.$i_s(i$jc,[js_object]);
return self.$i_s(i$jd,VN.$h());
});
_I(self,s$asp,function(self,_,name_table){
self.$i_s(i$je,name_table);
return _E(self,s$asq);
});
_I(self,s$asq,function(self,_){
var top_level=_E(self,s$tu,_$ko);
self.$i_s(i$jf,_E(self,s$tu,_$kp));
_E(self,s$ao,["version is ",(_H(self,i$jf))].join(''));
_E(self,s$ao,"top level is:");
return _E(self,s$ao,top_level);
});
_I(self,s$ib,function(self,_){
return _E(_H(self,i$jc),s$dz);
});
_I(self,s$asr,function(self,_,context){
return _E(_H(self,i$jc),s$e,context);
});
_I(self,s$ass,function(self,_){
return _E(_H(self,i$jc),s$se);
});
_I(self,s$mx,function(self,_,key){
if(_A(_E(self,s$ib).hasOwnProperty(_E(key,s$h)))){
return true;
}
return false;
});
_I(self,s$tu,function(self,_,key){
var context=_E(self,s$ib);
if(_A(context.hasOwnProperty(_E(key,s$h)))){
var prop=context[_E(key,s$h)];
if(!_A(prop.$klass)){
_E(self,s$asr,prop);
var result=_E(self,s$ast);
_E(self,s$ass);
return result;
}
if(_A(_E(prop,s$vf,self.$klass.$c_g_full(c$d)))){
return prop;
}
else if(_A(_E(prop,s$vf,self.$klass.$c_g_full(c$k)))){
result=[];
_E(prop,s$r,function(array_item){
_E(self,s$asr,array_item);
_E(result,s$e,_E(self,s$ast));
return _E(self,s$ass);
});
return result;
}
else{
_E(self,s$asu,prop);
result=_E(self,s$ast);
_E(self,s$ass);
return result;
}
return '';
}
return nil;
});
_I(self,s$ast,function(self,_){
var context=_E(self,s$ib);
var id=context['id'];
var class_str=context['class'];
var obj_class=_E(self.$klass.$c_g_full(c$j),s$asv,class_str);
var keys=context['keys'];
var obj=_E(obj_class,s$sy);
_E(self,s$asr,keys);
_E(obj,s$ts,self);
_E(self,s$ass);
obj=_E(obj,s$asn,self);
_E(_H(self,i$jd),s$g,id,obj);
return obj;
});
_I(self,s$tt,function(self,_,key){
var context=_E(self,s$ib);
return _E(self.$klass.$c_g_full(c$ag),s$md,context[key]);
});
_I(self,s$asw,function(self,_,key){
var context=_E(self,s$ib);
return _E(self.$klass.$c_g_full(c$af),s$md,context[key]);
});
_I(self,s$asx,function(self,_,key){
var context=_E(self,s$ib);
return _E(self.$klass.$c_g_full(c$aa),s$md,context[key]);
});
})(_N(self,c$cp,cObject));
(function(self) {
_I(self,s$asn,function(self,_,coder){
return self;
});
_I(self,s$ts,function(self,_,coder){
return self;
});
})(_N(self,c$j,cObject));
})(_K(c$b));
