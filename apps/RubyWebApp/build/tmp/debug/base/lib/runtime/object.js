
var RObject=function(klass,type){this.$klass=klass;this.$type=type;this.$iv_tbl={};return this;};RObject.prototype.$i_s=function(id,val){this.$iv_tbl[id]=val;return val;};RObject.prototype.$i_g=function(id){if(this.$iv_tbl[id]==undefined||this.$iv_tbl[id]==null){return nil;}
return this.$iv_tbl[id];};RObject.prototype.$=function(id,args){var method=this.$klass.$search_method(id);if(!method){console.log(this);throw'RObject#call cannot find method: '+id;}
return method.apply(this,args);};var VN$=function VN$(self,id){if(!self.$klass){console.log(self);console.log(id);}
var method=self.$klass.$search_method(id);if(!method){console.log(self);throw'RObject#call cannot find method: '+id;}
switch(arguments.length){case 2:return method(self,id);case 3:return method(self,id,arguments[2]);case 4:return method(self,id,arguments[2],arguments[3]);case 5:return method(self,id,arguments[2],arguments[3],arguments[4]);}
return method.apply(self,arguments);};var VN$sup=function(from,self,id,args){var method=self.$klass.$search_super_method(from,id);if(!method)throw'RObject#call cannot find super method for: '+id;switch(args.length){case 0:return method(self,id);case 1:return method(self,id,args[0]);case 2:return method(self,id,args[0],args[1]);case 3:return method(self,id,args[0],args[1],args[2]);case 4:return method(self,id,args[0],args[1],args[2],args[3]);}
return method.apply(self,arguments);};RObject.prototype.$sup=function(from,id,args){var method=this.$klass.$search_super_method(from,id);if(!method)throw'RObject#call cannot find super method for: '+id;return method.apply(this,args);};RObject.prototype.$def_s=RClass.prototype.$def_s;RObject.prototype.$make_metaclass=RClass.prototype.$make_metaclass;