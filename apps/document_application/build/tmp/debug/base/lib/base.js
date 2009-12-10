
function require(){}
var nil=null;function RTEST(val){return(val!=null&&val!=undefined&&val!=nil&&val!=false)?true:false;};function ORTEST(lhs,rhs){if(lhs==null||lhs==undefined)lhs=nil;if(rhs==null||rhs==undefined)rhs=nil;if(lhs==nil||lhs==false){return rhs;}
return lhs;};function ANDTEST(lhs,rhs){if(lhs==null||lhs==undefined)lhs=nil;if(rhs==null||rhs==undefined)rhs=nil;if(lhs==nil||lhs==false){return nil;}
return rhs;};function NOTTEST(expr){if(expr==null||expr==undefined||expr==nil||expr==false)return true;return false;};if(typeof console==='undefined'){var console=console||window.console||{};console.log=console.info=console.warn=console.error=function(){};}
function RObject(klass,type){this.klass=klass;this.flags=type;this.iv_tbl={};return this;}
function RClass(klass,super_klass){this.klass=klass;this.sup=super_klass;this.flags=T_CLASS;this.m_tbl={};this.iv_tbl={};return this;};var T_CLASS=1,T_MODULE=2,T_OBJECT=4,T_BOOLEAN=8,T_STRING=16,T_ARRAY=32,T_NUMBER=64,T_PROC=128,T_SYMBOL=256,T_HASH=512,T_ICLASS=1024;var FL_SINGLETON=2056;function FL_TEST(x,f){return x.flags&f;}
function FL_SET(x,f){x.flags|=f;}
function FL_UNSET(x,f){x.flags&=(~f);}
rb_class_tbl={};rb_global_tbl={};function rb_gvar_get(id){};function rb_gvar_set(id,val){};function boot_defclass(id,super_class){var o=rb_class_boot(super_class);rb_name_class(o,id);rb_class_tbl[id]=o;rb_const_set((rb_cObject?rb_cObject:o),id,o);return o;};boot_defmetametaclass=function(klass,metametaclass){klass.klass.klass=metametaclass;};obj_alloc=function(klass){var obj=VN$(klass,'allocate');return obj;};class_allocate_instance=function(){var obj=new RObject(this,T_OBJECT);return obj;};obj_dummy=function(){return nil;};equal=function(obj){if(obj==this)return true;var result=this.$funcall('==',[obj]);if(result)return true;return false;};eql=function(obj){return this.$funcall('==',[obj]);};obj_equal=function(obj){return(obj==this)?true:false;};
VN.require('/Users/adam/Development/vienna/apps/document_application/build/tmp/debug/base/lib/runtime/class.js');

VN.require('/Users/adam/Development/vienna/apps/document_application/build/tmp/debug/base/lib/runtime/variable.js');

VN.require('/Users/adam/Development/vienna/apps/document_application/build/tmp/debug/base/lib/runtime/module.js');

VN.require('/Users/adam/Development/vienna/apps/document_application/build/tmp/debug/base/lib/runtime/object.js');

VN.require('/Users/adam/Development/vienna/apps/document_application/build/tmp/debug/base/lib/runtime/system.js');
