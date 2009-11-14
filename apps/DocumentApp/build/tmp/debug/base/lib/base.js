
var nil=null;var RTEST=function RTEST(val){return(val!=null&&val!=undefined&&val!=nil&&val!=false)?true:false;};var ORTEST=function ORTEST(lhs,rhs){if(lhs==null||lhs==undefined)lhs=nil;if(rhs==null||rhs==undefined)rhs=nil;if(lhs==nil||lhs==false){return rhs;}
return lhs;};var ANDTEST=function ANDTEST(lhs,rhs){if(lhs==null||lhs==undefined)lhs=nil;if(rhs==null||rhs==undefined)rhs=nil;if(lhs==nil||lhs==false){return lhs;}
return rhs;};var NOTTEST=function NOTTEST(expr){if(expr==null||expr==undefined||expr==nil||expr==false)return true;return false;};if(typeof console==='undefined'){var console=console||window.console||{};console.log=console.info=console.warn=console.error=function(){};}
var VN={CLASS:0,MODULE:1,OBJECT:2,BOOLEAN:3,STRING:4,ARRAY:5,NUMBER:6,PROC:7};var T_CLASS=0,T_MODULE=1,T_OBJECT=2,T_BOOLEAN=3,T_STRING=4,T_ARRAY=5,T_NUMBER=6,T_PROC=7,T_SYMBOL=8,T_HASH=9;VN.warning=function(msg){console.log('Vienna warning: '+msg);};VN.type_error=function(msg){throw'Vienna TypeError: '+msg;};VN.name_error=function(msg){throw'Vienna NameError: '+msg;}
VN.top_const_get=function(id){return undefined;};VN.define_global_const=function(id,val){cObject.$define_const(id,val);};VN.class_tbl={};VN.global_tbl={};VN.gvar_get=function(id){};VN.gvar_set=function(id,val){};VN.boot_defclass=function(id,super_klass){var obj=RClass.boot(super_klass);obj.$name(id);(cObject?cObject:obj).$c_s(id,obj);return obj;};VN.boot_defmetametaclass=function(klass,metametaclass){klass.$klass.$klass=metametaclass;};VN.obj_alloc=function(klass){var obj=VN$(klass,'allocate');return obj;};VN.class_allocate_instance=function(){var obj=new RObject(this,VN.OBJECT);return obj;};VN.obj_dummy=function(){return nil;};VN.equal=function(obj){if(obj==this)return true;var result=this.$funcall('==',[obj]);if(result)return true;return false;};VN.eql=function(obj){return this.$funcall('==',[obj]);};VN.obj_equal=function(obj){return(obj==this)?true:false;};
VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/runtime/class.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/runtime/module.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/runtime/object.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/runtime/system.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/object.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/module.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/class.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/comparable.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/enumerable.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/string.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/symbol.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/number.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/array.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/boolean.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/hash.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/string.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/range.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/proc.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/math.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/resources.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/top_self.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/nil_class.js');

nil=VN$(cObject.$k_g('NilClass'),'new');nil.toString=function(){return'nil';};
VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/bundle.js');

VN.require('/Users/adam/Development/vienna/apps/DocumentApp/build/tmp/debug/base/lib/core/json.js');
