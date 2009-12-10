
function rb_ivar_set(obj,id,val){obj.iv_tbl[id]=val;return val;}
function rb_ivar_get(obj,id){return obj.iv_tbl[id];}
function rb_funcall(self,id){if(!self.klass){console.log('ERROR: rb_funcall');console.log(self);console.log(id);}
var method=rb_search_method(self.klass,id);if(!method){console.log(self);throw'RObject#call cannot find method: '+id;}
switch(arguments.length){case 2:return method(self,id);case 3:return method(self,id,arguments[2]);case 4:return method(self,id,arguments[2],arguments[3]);case 5:return method(self,id,arguments[2],arguments[3],arguments[4]);}
return method.apply(self,arguments);}
var VN$=rb_funcall;var rb_supcall=function rb_supcall(from,self,id,args){var method=self.$klass.$search_super_method(from,id);if(!method)throw'RObject#call cannot find super method for: '+id;switch(args.length){case 0:return method(self,id);case 1:return method(self,id,args[0]);case 2:return method(self,id,args[0],args[1]);case 3:return method(self,id,args[0],args[1],args[2]);case 4:return method(self,id,args[0],args[1],args[2],args[3]);}
return method.apply(self,arguments);};function rb_search_method(klass,id){var f,k=klass;while(!(f=k.m_tbl[id])){k=k.sup;if(!k)return undefined;}
return f;};