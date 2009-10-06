
var nil=null;var VN={CLASS:0,MODULE:1,OBJECT:2,BOOLEAN:3,STRING:4,ARRAY:5,NUMBER:6,PROC:7};VN.warning=function(msg){console.log('Vienna warning: '+msg);};VN.type_error=function(msg){throw'Vienna TypeError: '+msg;};VN.name_error=function(msg){throw'Vienna NameError: '+msg;}
VN.top_const_get=function(id){return undefined;};VN.define_global_const=function(id,val){cObject.$define_const(id,val);};VN.class_tbl={};VN.global_tbl={};VN.gvar_get=function(id){};VN.gvar_set=function(id,val){};VN.boot_defclass=function(id,super_klass){var obj=RClass.boot(super_klass);obj.$name(id);(cObject?cObject:obj).$c_s(id,obj);return obj;};VN.boot_defmetametaclass=function(klass,metametaclass){klass.$klass.$klass=metametaclass;};VN.obj_alloc=function(klass){var obj=klass.$('allocate',[]);return obj;};VN.class_allocate_instance=function(){var obj=new RObject(this,VN.OBJECT);return obj;};VN.obj_dummy=function(){return nil;};VN.equal=function(obj){if(obj==this)return true;var result=this.$funcall('==',[obj]);if(result)return true;return false;};VN.eql=function(obj){return this.$funcall('==',[obj]);};VN.obj_equal=function(obj){return(obj==this)?true:false;};
VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/runtime/class.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/runtime/module.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/runtime/object.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/object.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/kernel.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/module.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/class.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/top_self.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/comparable.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/enumerable.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/string.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/numeric.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/boolean.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/core/hash.js');
