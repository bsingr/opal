
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