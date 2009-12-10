
function require(){}
var nil=null;function RTEST(val){return(val!=null&&val!=undefined&&val!=nil&&val!=false)?true:false;};function ORTEST(lhs,rhs){if(lhs==null||lhs==undefined)lhs=nil;if(rhs==null||rhs==undefined)rhs=nil;if(lhs==nil||lhs==false){return rhs;}
return lhs;};function ANDTEST(lhs,rhs){if(lhs==null||lhs==undefined)lhs=nil;if(rhs==null||rhs==undefined)rhs=nil;if(lhs==nil||lhs==false){return nil;}
return rhs;};function NOTTEST(expr){if(expr==null||expr==undefined||expr==nil||expr==false)return true;return false;};if(typeof console==='undefined'){var console=console||window.console||{};console.log=console.info=console.warn=console.error=function(){};}
function RObject(klass,type){this.klass=klass;this.flags=type;this.iv_tbl={};return this;}
function RClass(klass,super_klass){this.klass=klass;this.sup=super_klass;this.flags=T_CLASS;this.m_tbl={};this.iv_tbl={};return this;};var T_CLASS=1,T_MODULE=2,T_OBJECT=4,T_BOOLEAN=8,T_STRING=16,T_ARRAY=32,T_NUMBER=64,T_PROC=128,T_SYMBOL=256,T_HASH=512,T_ICLASS=1024;var FL_SINGLETON=2056;function FL_TEST(x,f){return x.flags&f;}
function FL_SET(x,f){x.flags|=f;}
function FL_UNSET(x,f){x.flags&=(~f);}
rb_class_tbl={};rb_global_tbl={};function rb_gvar_get(id){};function rb_gvar_set(id,val){};function boot_defclass(id,super_class){var o=rb_class_boot(super_class);rb_name_class(o,id);rb_class_tbl[id]=o;rb_const_set((rb_cObject?rb_cObject:o),id,o);return o;};boot_defmetametaclass=function(klass,metametaclass){klass.klass.klass=metametaclass;};obj_alloc=function(klass){var obj=VN$(klass,'allocate');return obj;};class_allocate_instance=function(){var obj=new RObject(this,T_OBJECT);return obj;};obj_dummy=function(){return nil;};equal=function(obj){if(obj==this)return true;var result=this.$funcall('==',[obj]);if(result)return true;return false;};eql=function(obj){return this.$funcall('==',[obj]);};obj_equal=function(obj){return(obj==this)?true:false;};

function rb_class_inherited(super_class,klass){if(!super_class)super_class=rb_cObject;return rb_funcall(super_class,"inherited",klass);};function rb_define_class(id,super_class){var k;if(rb_const_defined(rb_cObject,id)){k=rb_const_get(rb_cObject,id);if(!(k.flags&T_CLASS)){throw id+" is not a class"}
if(k.sup!=super_class){if(k!=rb_cObject){throw id+" is already defined"}}
return k}
if(!super_class){console.log("no superclass given for "+id+" . Object assumed");}
k=rb_define_class_id(id,super_class);rb_class_tbl[id]=k;rb_ivar_set(k,'__bundle__',window.vn_current_bundle);rb_name_class(k,id);rb_const_set(rb_cObject,id,k);rb_class_inherited(super_class,k);return k;}
function rb_define_class_under(outer,id,super_klass){var klass;if(outer.$c_d_a(id)){klass=outer.$c_g_a(id);if(klass.$type!=VN.CLASS){VN.type_error(id+' is not a class');}
if(RClass.real(klass.$super)!=super_klass){if(klass!=cObject){VN.name_error(id+' is already defined');}}
return klass;}
if(!super_klass){VN.warning('no super class for `'+VN.class2name(outer),+'::'+id+'`, Object assumed');}
klass=RClass.define_class_id(id,super_klass);klass.$parent=outer;rb_ivar_set(klass,'__bundle__',window.vn_current_bundle);outer.$c_s(id,klass);RClass.inherited(super_klass,klass);klass.$name(id);return klass;};RClass.class2name=function(klass){return klass.$class_name();};RClass.obj_classname=function(obj){return VN.class2name(obj.$klass);};function make_metametaclass(metaclass){var metametaclass,super_of_metaclass;if(metaclass.klass==metaclass){metametaclass=rb_class_boot(null);metametaclass.klass=metametaclass;}
else{metametaclass=rb_class_boot(null);metametaclass.klass=metaclass.klass.klass==metaclass.klass?make_metametaclass(metaclass.klass):metaclass.klass.klass;}
FL_SET(metametaclass,FL_SINGLETON);rb_singleton_class_attached(metametaclass,metaclass);metaclass.klass=metametaclass;super_of_metaclass=metaclass.sup;while(FL_TEST(super_of_metaclass,T_ICLASS)){super_of_metaclass=super_of_metaclass.sup;}
metametaclass.sup=rb_ivar_get(super_of_metaclass.klass,'__attached__')==super_of_metaclass?super_of_metaclass.klass:make_metametaclass(super_of_metaclass);return metametaclass;};RClass.real=function(klass){while((klass.$singleton==true)||(klass.$type==VN.ICLASS)){klass=klass.$super}
return klass};function class_alloc(type,klass){var o=new RClass();o.klass=klass;o.flags|=type;return o;}
function rb_class_boot(super_class){var k=class_alloc(T_CLASS,rb_cClass);k.sup=super_class;return k;}
function rb_check_inheritable(super_class){if(TYPE(super_class)!=T_CLASS){throw'super class must be a Class ('+VN.obj_classname(super_klass)+' given)';}
if(super_class.flags&FL_SINGLETON){throw'can\'t make a subclass of singleton class';}};RClass.create=function(super_klass){RClass.check_inheritable(super_klass);if(super_klass==cClass){VN.raise(VN.TypeError,"can't make subclass of Class")}
return RClass.boot(super_klass);};RClass.define_class_id=function(id,super_klass){var klass;if(!super_klass)super_klass=cObject;klass=RClass.create(super_klass);klass.$make_metaclass(super_klass.$klass);return klass;};function rb_singleton_class(obj){var klass;if(FL_TEST(obj,T_NUMBER)||FL_TEST(obj,T_SYMBOL)){console.log(obj);throw'can\'t define singleton';}
if(FL_TEST(obj.klass,FL_SINGLETON)&&rb_ivar_get(obj.klass,'__attached__')==obj){klass=obj.klass;}
else{klass=rb_make_metaclass(obj,obj.klass);}
if(FL_TEST(obj,T_CLASS)){if(rb_ivar_get(klass.klass,'__attached__')!=klass){make_metametaclass(klass);}}
return klass;};function rb_name_class(klass,id){rb_ivar_set(klass,'__classid__',id);}
function rb_make_metaclass(klass,super_class){if(FL_TEST(klass,T_CLASS)&&FL_TEST(klass,FL_SINGLETON)){return make_metametaclass(klass);}
else{var meta=rb_class_boot(super_class);FL_SET(meta,FL_SINGLETON);klass.klass=meta;rb_singleton_class_attached(meta,klass);var metasuper=meta.klass;if(metasuper){meta.klass=metasuper;}
return meta;}}
function rb_singleton_class_attached(klass,obj){if(FL_TEST(klass,FL_SINGLETON)){rb_ivar_set(klass,'__attached__',obj);}}
function rb_define_method(klass,name,func){rb_add_method(klass,name,func);}
function rb_define_private_method(klass,name,func){rb_add_method(klass,name,func);}
function rb_define_singleton_method(klass,name,func){rb_define_method(rb_singleton_class(klass),name,func);}
function rb_add_method(klass,name,func){klass.m_tbl[name]=func;func.displayName=klass.iv_tbl.__classid__+"#"+name;}
function rb_define_alloc_func(klass,func){rb_define_method(rb_singleton_class(klass),'allocate',func);}

function rb_ivar_set(obj,id,val){ibj.iv_tbl[id]=val;return val;};function rb_ivar_get(obj,id){return obj[id];}
function rb_const_set(k,id,val){return rb_mod_av_set(k,id,val,true);}
function rb_mod_av_set(k,id,val,isconst){return k.iv_tbl[id]=val;}
function rb_const_set(k,id,val){return k.iv_tbl[id]=val;}
function rb_const_get(k,id){var v,t=k;while(t){if(v=t.iv_tbl[id])return v;t=t.sup;}
throw"NameError: uninitialized constant "+id+" in "+k.name
return nil;}
function rb_const_get_full(k,id){var v,t=k;while(t){if(v=t.iv_tbl[id])return v;t=t.sup;}
t=k.parent;while(t){if(v=t.iv_tbl[id])return v;t=t.parent;}
throw"NameError: uninitialized constant "+id+" in "+k.name
return nil;}
function rb_const_defined(k,id){var v,t=k;while(t){if(v=t.iv_tbl[id])return true;t=t.sup;}
return false;}
function rb_const_defined_full(k,id){var v,t=k;while(t){if(v=t.iv_tbl[id])return true;t=t.sup;}
t=k.parent;while(t){if(v=t.iv_tbl[id])return true;t=t.parent;}
return false;}
function rb_const_defined_at(k,id){return(k.iv_tbl[id])?true:false;}
function rb_const_get_at(k,id){return(k.iv_tbl[id])?k.iv_tbl[id]:nil;}

var RModule={};function rb_define_module(id){var module;if(rb_const_defined(rb_cObject,id)){module=rb_const_get(rb_cObject,id);if(FL_TEST(module,T_MODULE)){return module;}
throw id+' is not a module';}
module=rb_define_module_id(id);rb_class_tbl[id]=module;rb_const_set(rb_cObject,id,module);return module;};function rb_define_module_under(outer,id){var module;if(VN.const_defined_at(outer,id)){module=VN.const_get_at(outer,id);if(module.type==VN.MODULE){return module;}
VN.type_error(id+' is not a module');}
module=VN.define_module_id(id);VN.const_set(outer,id,module);VN.set_class_path(module,outer,name);return module;};function rb_define_module_id(id){var mdl=rb_mod_create();rb_name_class(mdl,id);return mdl;};function rb_mod_create(){var m=class_alloc(T_MODULE,rb_cModule);m.sup=rb_cObject;return m;}
function rb_include_module(klass,module){rb_include_class_new(module,klass);}
function rb_include_class_new(mod,sup){var klass=class_alloc(T_ICLASS,rb_cClass);klass.iv_tbl=mod.iv_tbl;klass.m_tbl=mod.m_tbl;klass.sup=sup;klass.klass=mod;return klass;};

function rb_ivar_set(obj,id,val){obj.iv_tbl[id]=val;return val;}
function rb_ivar_get(obj,id){return obj.iv_tbl[id];}
function rb_funcall(self,id){if(!self.klass){console.log('ERROR: rb_funcall');console.log(self);console.log(id);}
var method=rb_search_method(self.klass,id);if(!method){console.log(self);throw'RObject#call cannot find method: '+id;}
switch(arguments.length){case 2:return method(self,id);case 3:return method(self,id,arguments[2]);case 4:return method(self,id,arguments[2],arguments[3]);case 5:return method(self,id,arguments[2],arguments[3],arguments[4]);}
return method.apply(self,arguments);}
var VN$=rb_funcall;var rb_supcall=function rb_supcall(from,self,id,args){var method=self.$klass.$search_super_method(from,id);if(!method)throw'RObject#call cannot find super method for: '+id;switch(args.length){case 0:return method(self,id);case 1:return method(self,id,args[0]);case 2:return method(self,id,args[0],args[1]);case 3:return method(self,id,args[0],args[1],args[2]);case 4:return method(self,id,args[0],args[1],args[2],args[3]);}
return method.apply(self,arguments);};function rb_search_method(klass,id){var f,k=klass;while(!(f=k.m_tbl[id])){k=k.sup;if(!k)return undefined;}
return f;};

var metaclass;var rb_cBasicObject=boot_defclass('BasicObject',null);var rb_cObject=boot_defclass('Object',rb_cBasicObject);var rb_cModule=boot_defclass('Module',rb_cObject);var rb_cClass=boot_defclass('Class',rb_cModule);metaclass=rb_make_metaclass(rb_cBasicObject,rb_cClass);metaclass=rb_make_metaclass(rb_cObject,metaclass);metaclass=rb_make_metaclass(rb_cModule,metaclass);metaclass=rb_make_metaclass(rb_cClass,metaclass);boot_defmetametaclass(rb_cModule,metaclass);boot_defmetametaclass(rb_cObject,metaclass);boot_defmetametaclass(rb_cBasicObject,metaclass);var RSymbol=function(ptr){this.$klass=rb_cSymbol;this.$type=T_SYMBOL;this.toString=function(){return this.ptr;};this.ptr=ptr;return this;};var rb_sym_table={};function ID2SYM(id){if(rb_sym_table.hasOwnProperty(id)){return rb_sym_table[id];}
var sym=new RSymbol(id);rb_sym_table[id]=sym
return sym;};