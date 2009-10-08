

var nil=null;var VN={CLASS:0,MODULE:1,OBJECT:2,BOOLEAN:3,STRING:4,ARRAY:5,NUMBER:6,PROC:7};VN.warning=function(msg){console.log('Vienna warning: '+msg);};VN.type_error=function(msg){throw'Vienna TypeError: '+msg;};VN.name_error=function(msg){throw'Vienna NameError: '+msg;}
VN.top_const_get=function(id){return undefined;};VN.define_global_const=function(id,val){cObject.$define_const(id,val);};VN.class_tbl={};VN.global_tbl={};VN.gvar_get=function(id){};VN.gvar_set=function(id,val){};VN.boot_defclass=function(id,super_klass){var obj=RClass.boot(super_klass);obj.$name(id);(cObject?cObject:obj).$c_s(id,obj);return obj;};VN.boot_defmetametaclass=function(klass,metametaclass){klass.$klass.$klass=metametaclass;};VN.obj_alloc=function(klass){var obj=klass.$('allocate',[]);return obj;};VN.class_allocate_instance=function(){var obj=new RObject(this,VN.OBJECT);return obj;};VN.obj_dummy=function(){return nil;};VN.equal=function(obj){if(obj==this)return true;var result=this.$funcall('==',[obj]);if(result)return true;return false;};VN.eql=function(obj){return this.$funcall('==',[obj]);};VN.obj_equal=function(obj){return(obj==this)?true:false;};

var RClass=function(klass,super_klass){this.$klass=klass;this.$super=super_klass;this.$type=VN.CLASS;this.$singleton=false;return this;};RClass.inherited=function(super_klass,klass){if(!super_klass)super_klass=cObject;return super_klass.$('inherited',[klass]);};RClass.define=function(id,super_klass){var klass;if(cObject.$c_d(id)){klass=cObject.$c_g(id);if(klass.$type!=VN.CLASS){VN.type_error(id+' is not a class');}
if(klass.$super!=super_klass){if(klass!=cObject){VN.name_error(id+' is already defined');}}
return klass;}
if(!super_klass){VN.warning('no super class for `'+id+'`, Object assumed')}
klass=RClass.define_class_id(id,super_klass);VN.class_tbl[id]=klass;klass.$name(id);cObject.$c_s(id,klass);RClass.inherited(super_klass,klass);return klass;};RClass.define_under=function(outer,id,super_klass){var klass;if(outer.$c_d_a(id)){klass=outer.$c_g_a(id);if(klass.$type!=VN.CLASS){VN.type_error(id+' is not a class');}
if(RClass.real(klass.$super)!=super_klass){if(klass!=cObject){VN.name_error(id+' is already defined');}}
return klass;}
if(!super_klass){VN.warning('no super class for `'+VN.class2name(outer),+'::'+id+'`, Object assumed');}
klass=RClass.define_class_id(id,super_klass);outer.$c_s(id,klass);RClass.inherited(super_klass,klass);return klass;};RClass.class2name=function(klass){return klass.$class_name();};RClass.obj_classname=function(obj){return VN.class2name(obj.$klass);};RClass.make_metametaclass=function(metaclass){var metametaclass,super_of_metaclass;if(metaclass.$klass==metaclass){metametaclass=RClass.boot(null);metametaclass.$klass=metametaclass;}
else{metametaclass=RClass.boot(null);metametaclass.$klass=metaclass.$klass.$klass==metaclass.$klass?VN.make_metametaclass(metaclass.$klass):metaclass.$klass.$klass;}
metametaclass.$singleton=true;metametaclass.$singleton_class_attached(metaclass);metaclass.$klass=metametaclass;super_of_metaclass=metaclass.$super;while(super_of_metaclass.$type==VN.ICLASS){super_of_metaclass=super_of_metaclass.$super;}
metametaclass.$super=super_of_metaclass.$klass.$ivar_get('__attached__')==super_of_metaclass?super_of_metaclass.$klass:RClass.make_metametaclass(super_of_metaclass);return metametaclass;};RClass.real=function(klass){return klass;};RClass.alloc=function(type,klass){var obj=new RClass();obj.$klass=klass;obj.$type=type;return obj;};RClass.boot=function(super_klass){var klass=RClass.alloc(VN.CLASS,cClass);klass.$super=super_klass;return klass;};RClass.check_inheritable=function(super_klass){if(super_klass.$type!=VN.CLASS){VN.type_error('super class must be a Class ('+VN.obj_classname(super_klass)+' given)');}
if(super_klass.singleton){VN.type_error('can\'t make a subclass of singleton class');}};RClass.create=function(super_klass){RClass.check_inheritable(super_klass);if(super_klass==cClass){VN.raise(VN.TypeError,"can't make subclass of Class")}
return RClass.boot(super_klass);};RClass.define_class_id=function(id,super_klass){var klass;if(!super_klass)super_klass=cObject;klass=RClass.create(super_klass);klass.$make_metaclass(super_klass.$klass);return klass;};RClass.singleton_class=function(obj){var klass;if(obj.$type==VN.T_FIXNUM||obj.$type==VN.T_SYMBOL){VN.type_error('can\'t define singleton');}
if(obj.$klass.$singleton&&obj.$klass['__attached__']==obj){klass=obj.$klass;}
else{klass=obj.$make_metaclass(obj.$klass);}
if(obj.$type==VN.CLASS){if(klass.$klass.$ivar_get('__attached__')!=klass){RClass.make_metametaclass(klass);}}
return klass;};RClass.prototype.$name=function(id){this['__classid__']=id;};RClass.prototype.$class_name=function(){return VN.class_path(klass.$real());};RClass.prototype.$make_metaclass=function(super_klass){if(this.$type==VN.CLASS&&this.$singleton==true){return this.$make_metametaclass();}
else{var klass=RClass.boot(super_klass);klass.$singleton=true;this.$klass=klass;klass.$singleton_class_attached(this);var metasuper=klass.$klass;if(metasuper){klass.$klass=metasuper;}
return klass;}};RClass.prototype.$singleton_class_attached=function(obj){if(this.$singleton==true){this['__attached__']=obj;}};RClass.prototype.$=function(id,args){var method=this.$klass.$search_method(id);if(!method)throw'VN#funcall cannot find method: '+id;return method.apply(this,args);};RClass.prototype.$k_g=function(id){var tmp=this;var value;while(tmp){if(value=tmp[id]){return value;}
tmp=tmp.$super;}
VN.name_error('uninitialized class variable '+id+' in '+this);return nil;};RClass.prototype.$k_d=function(id){var tmp=this;var value;while(tmp){if(value=tmp[id]){return true;}
tmp=tmp.$super;}
return false;}
RClass.prototype.$k_s=function(id,val){return this[id]=val;};RClass.prototype.$ivar_get=function(id){return this[id];};RClass.prototype.$ivar_set=function(id,val){this[id]=val;return val;}
RClass.prototype.$def=function(name,func){this.$add_method(name,func);};RClass.prototype.$define_protected_method=function(name,func){this.$add_method(name,func);};RClass.prototype.$define_private_method=function(name,func){this.$add_method(name,func);};RClass.prototype.$undef_method=function(name,func){this.$add_method(name,func);};RClass.prototype.$add_method=function(name,func){this[name]=func;};RClass.prototype.$def_s=function(name,func){RClass.singleton_class(this).$def(name,func);};RClass.prototype.$define_alias=function(id1,id2){};RClass.prototype.$define_alloc_func=function(func){RClass.singleton_class(this).$add_method('allocate',func);};RClass.prototype.$undef_alloc_func=function(){RClass.singleton_class(this).$add_method('allocate',null);};RClass.prototype.$search_method=function(id){var klass=this;var func;while(!(func=klass[id])){klass=klass.$super;if(!klass)return undefined;}
return func;};RClass.prototype.$=function(id,args){var method=this.$klass.$search_method(id);if(!method)throw'VN#funcall cannot find method: '+id;return method.apply(this,args);};RClass.prototype.$c_s=function(id,val){this.$mod_av_set(id,val,true);};RClass.prototype.$mod_av_set=function(id,val,isconst){this[id]=val;};RClass.prototype.$c_g=function(id){var tmp=this;var value;while(tmp){if(value=tmp[id]){return value;}
tmp=tmp.$super;}
VN.name_error(id,'uninitialized constant '+id+' in '+klass.name);return nil;};RClass.prototype.$c_d=function(id){var tmp=this;var value;while(tmp){if(value=tmp[id]){return true;}
tmp=tmp.$super;}
return false;};RClass.prototype.$c_d_a=function(id){return(this[id])?true:false;};RClass.prototype.$c_g_a=function(id){return(this[id])?this[id]:nil;};RClass.prototype.$define_const=function(id,val){};

var RModule={};RModule.define=function(id){var module;if(cObject.$c_d(id)){module=cObject.$c_g(id);if(module.$type==VN.MODULE){return module;}
VN.type_error(id+' is not a module');}
module=RModule.define_module_id(id);VN.class_tbl[id]=module;cObject.$c_s(id,module);return module;};RModule.define_module_under=function(){var module;if(VN.const_defined_at(outer,id)){module=VN.const_get_at(outer,id);if(module.type==VN.MODULE){return module;}
VN.type_error(id+' is not a module');}
module=VN.define_module_id(id);VN.const_set(outer,id,module);VN.set_class_path(module,outer,name);return module;};RModule.define_module_id=function(id){var mdl=RModule.create();mdl.$name(id);return mdl;};RModule.create=function(){var mdl=RClass.alloc(VN.MODULE,cModule);mdl.$super=cObject;return mdl;};RModule.include=function(klass,module){RModule.include_class_new(module,klass);};RModule.include_class_new=function(mod,sup){var klass=RClass.alloc(VN.T_ICLASS,cClass);klass.iv_tbl=mod.iv_tbl;klass.m_tbl=mod.m_tbl;klass.$super=sup;klass.$klass=mod;return klass;};

var RObject=function(klass,type){this.$klass=klass;this.$type=type;return this;};RObject.prototype.$i_s=function(id,val){this[id]=val;return val;};RObject.prototype.$i_g=function(id){return this[id];};RObject.prototype.$=function(id,args){var method=this.$klass.$search_method(id);if(!method)throw'RObject#call cannot find method: '+id;return method.apply(this,args);};RObject.prototype.$def_s=RClass.prototype.$def_s;RObject.prototype.$make_metaclass=RClass.prototype.$make_metaclass;

var metaclass;var cBasicObject=VN.boot_defclass('BasicObject',null);var cObject=VN.boot_defclass('Object',cBasicObject);var cModule=VN.boot_defclass('Module',cObject);var cClass=VN.boot_defclass('Class',cModule);metaclass=cBasicObject.$make_metaclass(cClass);metaclass=cObject.$make_metaclass(metaclass);metaclass=cModule.$make_metaclass(metaclass);metaclass=cClass.$make_metaclass(metaclass);VN.boot_defmetametaclass(cModule,metaclass);VN.boot_defmetametaclass(cObject,metaclass);VN.boot_defmetametaclass(cBasicObject,metaclass);cBasicObject.$define_private_method('initialize',function(){return nil;});cBasicObject.$define_alloc_func(function(){var obj=new RObject(this,VN.OBJECT);return obj;});cBasicObject.$def('==',function(obj){return(obj==this)?true:false;});cBasicObject.$def('equal?',function(obj){return(obj==this)?true:false;});cBasicObject.$def('!',function(){});cBasicObject.$def('!=',function(){});cBasicObject.$define_private_method('singleton_method_added',function(){return nil;});cBasicObject.$define_private_method('singleton_method_removed',function(){return nil;});cBasicObject.$define_private_method('singleton_method_undefined',function(){return nil;});cBasicObject.$def('puts',function(val){console.log(val);});mKernel=RModule.define("Kernel");RModule.include(cObject,mKernel);cClass.$define_private_method('inherited',function(){return nil;});cModule.$define_private_method('included',function(){return nil;});cModule.$define_private_method('extended',function(){return nil;});cModule.$define_private_method('method_added',function(){return nil;});cModule.$define_private_method('method_removed',function(){return nil;});cModule.$define_private_method('method_undefined',function(){return nil;});var cNilClass=RClass.define('NilClass',cObject);var cBoolean=RClass.define('Boolean',cObject);var cArray=RClass.define('Array',cObject);var cString=RClass.define('String',cObject);var cNumeric=RClass.define('Numeric',cObject);

mKernel.$def('nil?',function(){return false;});mKernel.$def('===',function(){});mKernel.$def('=~',function(obj){return nil;});mKernel.$def('!=',function(obj){return this.$call('=~',obj)?false:true;});mKernel.$def('eql?',function(){});mKernel.$def('class',VN.obj_class,0);mKernel.$def('clone',VN.obj_clone,0);mKernel.$def('dup',VN.obj_dup,0);mKernel.$def('initialize_copy',function(orig){if(orig==this)return this;if(this.$type!=orig.$type||this.$klass!=orig.$klass){VN.type_error('initialize_copy should take same class object');}
return this;});mKernel.$def('taint',VN.obj_taint,0);mKernel.$def('tainted?',VN.obj_tainted,0);mKernel.$def('untaint',VN.obj_untaint,0);mKernel.$def('untrust',VN.obj_untrust,0);mKernel.$def('untrusted?',VN.obj_untrusted,0);mKernel.$def('trust',VN.obj_trust,0);mKernel.$def('freeze',VN.obj_freeze,0);mKernel.$def('frozen?',VN.obj_frozen_p,0);mKernel.$def('to_s',function(){return"#<"+RClass.obj_classname(this)+":0x00000000>";});mKernel.$def('inspect',function(){return"";});mKernel.$def('methods',function(){});mKernel.$def('singleton_methods',function(){});mKernel.$def('protected_methods',function(){});mKernel.$def('private_methods',function(){});mKernel.$def('public_methods',function(){});mKernel.$def('instance_variables',function(){});mKernel.$def('instance_variables_get',function(iv){return this.$ivar_get(iv);});mKernel.$def('instance_variables_set',function(iv,val){return this.$ivar_set(iv,val);});mKernel.$def('instance_variables_defined?',function(iv){return this.$ivar_defined(iv);});mKernel.$define_private_method('remove_instance_variable',function(iv){});mKernel.$def('instance_of?',function(klass){switch(klass.$type){case VN.MODULE:case VN.CLASS:case VN.ICLASS:break;default:VN.type_error('class or module required');}
if(this.$klass==klass)return true;return false;});mKernel.$def('kind_of?',function(klass){switch(klass.$type){case VN.MODULE:case VN.CLASS:case VN.ICLASS:break;default:VN.type_error('class or module required');}
var k=self.$klass;while(k){if(k==klass){return true;}
k=k.$super;}
return false;});mKernel.$def('is_a?',function(klass){switch(klass.$type){case VN.MODULE:case VN.CLASS:case VN.ICLASS:break;default:VN.type_error('class or module required');}
var k=self.$klass;while(k){if(k==klass){return true;}
k=k.$super;}
return false;});mKernel.$def('puts',function(val){console.log(101010101);});mKernel.$def('tap',function(){VN.warning('Kernel#tap is unimplemented');});

cModule.$def('freeze',function(mod_freeze){});cModule.$def('===',function(mod_eqq){});cModule.$def('==',function(obj_equal){});cModule.$def('<=>',function(mod_cmp){});cModule.$def('<',function(mod_lt){});cModule.$def('<=',function(class_inherited_p){});cModule.$def('>',function(mod_gt){});cModule.$def('>=',function(mod_ge){});cModule.$def('initialize_copy',function(mod_init_copy){});cModule.$def('to_s',function(mod_to_s){});cModule.$def('included_modules',function(mod_included_modules){});cModule.$def('include?',function(mod_include_p){});cModule.$def('name',function(mod_name){});cModule.$def('ancestors',function(mod_ancestors){});cModule.$define_private_method('attr',function(mod_attr){});cModule.$define_private_method('attr_reader',function(mod_attr_reader){});cModule.$define_private_method('attr_writer',function(mod_attr_writer){});cModule.$define_private_method('attr_accessor',function(mod_attr_accessor){});cModule.$define_alloc_func(function(module_s_alloc){});cModule.$def('initialize',function(mod_initialize){});cModule.$def('instance_methods',function(class_instance_methods){});cModule.$def('public_instance_methods',function(class_public_instance_methods){});cModule.$def('protected_instance_methods',function(class_protected_instance_methods){});cModule.$def('private_instance_methods',function(class_private_instance_methods){});cModule.$def('constants',function(mod_constants){});cModule.$def('const_get',function(mod_const_get){});cModule.$def('const_set',function(mod_const_set){});cModule.$def('const_defined?',function(mod_const_defined){});cModule.$define_private_method('remove_const',function(mod_remove_const){});cModule.$def('const_missing',function(mod_const_missing){});cModule.$def('class_variables',function(mod_class_variables){});cModule.$def('remove_class_variable',function(mod_remove_cvar){});cModule.$def('class_variable_get',function(mod_cvar_get){});cModule.$def('class_variable_set',function(mod_cvar_set){});cModule.$def('class_variable_defined?',function(mod_cvar_defined){});

cClass.$def('new',function(){var obj=this.$('allocate',[]);obj.$('initialize',arguments);return obj;});cClass.$def('allocate',function(obj_alloc){});cClass.$def('initialize',function(class_initialize){});cClass.$def('initialize_copy',function(class_init_copy){});cClass.$def('superclass',function(class_superclass){});cClass.$define_alloc_func(function(class_s_alloc){});
VN.self = VN.obj_alloc(cObject);
VN.self.$def_s('to_s', function() { 
  return 'main' ;}
);

var mComparable=RModule.define('Comparable');mComparable.$def('==',function(obj){if(this==obj)return true;return false;});mComparable.$def('>',function(cmp_gt){});mComparable.$def('>=',function(cmp_ge){});mComparable.$def('<',function(cmp_lt){});mComparable.$def('<=',function(cmp_le){});mComparable.$def('between?',function(cmp_between){});

var mEnumerable=RModule.define('Enumerable');mEnumerable.$def('to_a',function(enum_to_a){});mEnumerable.$def('entries',function(enum_to_a){});mEnumerable.$def('sort',function(enum_sort){});mEnumerable.$def('sort_by',function(enum_sort_by){});mEnumerable.$def('grep',function(enum_grep){});mEnumerable.$def('count',function(enum_count){});mEnumerable.$def('find',function(enum_find){});mEnumerable.$def('detect',function(enum_find){});mEnumerable.$def('find_index',function(enum_find_index){});mEnumerable.$def('find_all',function(enum_find_all){});mEnumerable.$def('select',function(enum_find_all){});mEnumerable.$def('reject',function(enum_reject){});mEnumerable.$def('collect',function(enum_collect){});mEnumerable.$def('map',function(enum_collect){});mEnumerable.$def('inject',function(enum_inject){});mEnumerable.$def('reduce',function(enum_inject){});mEnumerable.$def('partition',function(enum_partition){});mEnumerable.$def('group_by',function(enum_group_by){});mEnumerable.$def('first',function(enum_first){});mEnumerable.$def('all',function(enum_all){});mEnumerable.$def('any?',function(enum_any){});mEnumerable.$def('one?',function(enum_one){});mEnumerable.$def('none?',function(enum_none){});mEnumerable.$def('min',function(enum_min){});mEnumerable.$def('max',function(enum_max){});mEnumerable.$def('minmax',function(enum_minmax){});mEnumerable.$def('min_by',function(enum_min_by){});mEnumerable.$def('max_by',function(enum_max_by){});mEnumerable.$def('minmax_by',function(enum_minmax_by){});mEnumerable.$def('include?',function(enum_member){});mEnumerable.$def('member?',function(enum_member){});mEnumerable.$def('each_with_index',function(enum_each_with_index){});mEnumerable.$def('reverse_each',function(enum_reverse_each){});mEnumerable.$def('zip',function(enum_zip){});mEnumerable.$def('take',function(enum_take){});mEnumerable.$def('take_while',function(enum_take_while){});mEnumerable.$def('drop',function(enum_drop){});mEnumerable.$def('drop_while',function(enum_drop_while){});mEnumerable.$def('cycle',function(enum_cycle){});
String.prototype.$klass = cString
String.prototype.$type = VN.STRING;

String.prototype.$ = RObject.prototype.$;

cString.$define_alloc_func(function() {
  return new String();
}); var $VN_1 = RClass.define('String', cObject);
$VN_1.$def('try_convert',function(){
var self=this;
});
$VN_1.$def('initialize',function(){
var self=this;
});
$VN_1.$def('initialize_copy',function(){
var self=this;
});
$VN_1.$def('<=>',function(obj){
var self=this;
});
$VN_1.$def('==',function(obj){
var self=this;
});
$VN_1.$def('eql?',function(obj){
var self=this;
});
$VN_1.$def('hash',function(obj){
var self=this;
});
$VN_1.$def('casecmp',function(obj){
var self=this;
});
$VN_1.$def('+',function(obj){
var self=this;
self.$('puts',['wow']);
});
$VN_1.$def('(',function(obj){
var self=this;
});
$VN_1.$def('%',function(obj){
var self=this;
});
$VN_1.$def('[]',function(key){
var self=this;
});
$VN_1.$def('[]=',function(key,val){
var self=this;
});
$VN_1.$def('insert',function(){
var self=this;
});
$VN_1.$def('length',function(){
var self=this;
return this.length;});
$VN_1.$def('size',function(){
var self=this;
return this.length});
$VN_1.$def('empty?',function(){
var self=this;
});
$VN_1.$def('=~',function(match){
var self=this;
});
$VN_1.$def('match',function(match){
var self=this;
});
$VN_1.$def('succ',function(){
var self=this;
});
$VN_1.$def('next',function(){
var self=this;
});
$VN_1.$def('upto',function(){
var self=this;
});
$VN_1.$def('index',function(){
var self=this;
});
$VN_1.$def('rindex',function(){
var self=this;
});
$VN_1.$def('replace',function(){
var self=this;
});
$VN_1.$def('clear',function(){
var self=this;
});
$VN_1.$def('chr',function(){
var self=this;
});
$VN_1.$def('to_i',function(){
var self=this;
});
$VN_1.$def('to_f',function(){
var self=this;
});
$VN_1.$def('to_s',function(){
var self=this;
return new String(this);});
$VN_1.$def('to_str',function(){
var self=this;
return self.$('to_s', []);
});
$VN_1.$def('inspect',function(){
var self=this;
return new String('"' + this + '"');});
$VN_1.$def('dump',function(){
var self=this;
});
$VN_1.$def('upcase',function(){
var self=this;
});
$VN_1.$def('downcase',function(){
var self=this;
});
$VN_1.$def('capitalize',function(){
var self=this;
});
$VN_1.$def('swapcase',function(){
var self=this;
});
$VN_1.$def('hex',function(){
var self=this;
});
$VN_1.$def('oct',function(){
var self=this;
});
$VN_1.$def('split',function(){
var self=this;
});
$VN_1.$def('lines',function(){
var self=this;
});
$VN_1.$def('bytes',function(){
var self=this;
});
$VN_1.$def('chars',function(){
var self=this;
});
$VN_1.$def('codepoints',function(){
var self=this;
});
$VN_1.$def('reverse',function(){
var self=this;
});
$VN_1.$def('concat',function(){
var self=this;
});
$VN_1.$def('<<',function(){
var self=this;
});
$VN_1.$def('crypt',function(){
var self=this;
});
$VN_1.$def('intern',function(){
var self=this;
});
$VN_1.$def('to_sym',function(){
var self=this;
return new String(this);});
$VN_1.$def('ord',function(){
var self=this;
});
$VN_1.$def('include?',function(){
var self=this;
});
$VN_1.$def('start_with?',function(){
var self=this;
});
$VN_1.$def('end_with?',function(){
var self=this;
});
$VN_1.$def('scan',function(){
var self=this;
});
$VN_1.$def('ljust',function(){
var self=this;
});
$VN_1.$def('rjust',function(){
var self=this;
});
$VN_1.$def('center',function(){
var self=this;
});
$VN_1.$def('sub',function(){
var self=this;
});
$VN_1.$def('gsub',function(){
var self=this;
});
$VN_1.$def('chop',function(){
var self=this;
});
$VN_1.$def('chomp',function(){
var self=this;
});
$VN_1.$def('strip',function(){
var self=this;
});
$VN_1.$def('lstrip',function(){
var self=this;
});
$VN_1.$def('rstrip',function(){
var self=this;
});
$VN_1.$def('tr',function(){
var self=this;
});
$VN_1.$def('tr_s',function(){
var self=this;
});
$VN_1.$def('delete',function(){
var self=this;
});
$VN_1.$def('squeeze',function(){
var self=this;
});
$VN_1.$def('count',function(){
var self=this;
});
$VN_1.$def('each_line',function(){
var self=this;
});
$VN_1.$def('each_byte',function(){
var self=this;
});
$VN_1.$def('each_char',function(){
var self=this;
});
$VN_1.$def('each_codepoint',function(){
var self=this;
});
$VN_1.$def('sum',function(){
var self=this;
});
$VN_1.$def('slice!',function(){
var self=this;
});
$VN_1.$def('partition',function(){
var self=this;
});
$VN_1.$def('rpartition',function(){
var self=this;
});


Number.prototype.$klass=cNumeric;Number.prototype.$type=VN.NUMBER;Number.prototype.$=RObject.prototype.$;RModule.include(cNumeric,mComparable);cNumeric.$def('singleton_method_added',function(){});cNumeric.$def('initialize_copy',function(){});cNumeric.$def('coerce',function(){});cNumeric.$def('+@',function(){});cNumeric.$def('-@',function(){});cNumeric.$def('<=>',function(){});cNumeric.$def('eql?',function(){});cNumeric.$def('quo',function(){});cNumeric.$def('fdiv',function(){});cNumeric.$def('div',function(){});cNumeric.$def('divmod',function(){});cNumeric.$def('modulo',function(){});cNumeric.$def('remainder',function(){});cNumeric.$def('abs',function(){});cNumeric.$def('magnitude',function(){});cNumeric.$def('to_int',function(){});cNumeric.$def('real?',function(){});cNumeric.$def('integer?',function(){});cNumeric.$def('zero?',function(){});cNumeric.$def('nonzero?',function(){});cNumeric.$def('floor',function(){});cNumeric.$def('ceil',function(){});cNumeric.$def('round',function(){});cNumeric.$def('truncate',function(){});cNumeric.$def('step',function(){});cNumeric.$def('odd?',function(){});cNumeric.$def('even?',function(){});cNumeric.$def('upto',function(){});cNumeric.$def('downto',function(){});cNumeric.$def('times',function(){});cNumeric.$def('succ',function(){});cNumeric.$def('next',function(){});cNumeric.$def('pred',function(){});cNumeric.$def('chr',function(){});cNumeric.$def('ord',function(){});cNumeric.$def('to_i',function(){});cNumeric.$def('to_s',function(){});cNumeric.$def('+',function(i){return this+i;});cNumeric.$def('-',function(i){return this-i;});cNumeric.$def('*',function(){});cNumeric.$def('/',function(){});cNumeric.$def('%',function(){});cNumeric.$def('**',function(){});cNumeric.$def('==',function(){});cNumeric.$def('>',function(){});cNumeric.$def('>=',function(){});cNumeric.$def('<',function(){});cNumeric.$def('<=',function(){});cNumeric.$def('~',function(){});cNumeric.$def('&',function(){});cNumeric.$def('|',function(){});cNumeric.$def('^',function(){});cNumeric.$def('[]',function(){});cNumeric.$def('<<',function(){});cNumeric.$def('>>',function(){});cNumeric.$def('to_f',function(){});

Array.prototype.$klass = cArray
Array.prototype.$type = VN.T_ARRAY;

Array.prototype.$ = RObject.prototype.$;

RModule.include(cArray, mEnumerable);

cArray.$define_alloc_func(function() {
  return new Array();
});

cArray.$def_s('[]', function() {
  
});

cArray.$def_s('try_convert', function() {
  
});
var $VN_1 = RClass.define('Array', cObject);
$VN_1.$def('initialize',function(){
var self=this;
for (var i = 0; i < arguments.length; i++) {
      this.push(arguments[i]);
    }});
$VN_1.$def('initialize_copy',function(){
var self=this;
});
$VN_1.$def('to_s',function(){
var self=this;
if (this.length == 0) return '[]';
    var str = '[';
    for (var i = 0; i < (this.length - 1); i++) {
      str += (this[i].$('inspect', []) + ', ');
    }
    str += (this[this.length - 1].$('inspect', []) + ']');
    return str ;});
$VN_1.$def('inspect',function(){
var self=this;
return self.$('to_s', []);
});
$VN_1.$def('to_a',function(){
var self=this;
return self;
});
$VN_1.$def('to_ary',function(){
var self=this;
return self;
});
$VN_1.$def('==',function(ary){
var self=this;
if (ary == this) return true;
    if (ary.$type != VN.T_ARRAY) {
      if (ary.$('respond_to?', ['to_a'])) {
        return false;
      }
    }
    if (this.length != ary.length) return false ;
    return true;});
$VN_1.$def('eql?',function(other){
var self=this;
});
$VN_1.$def('hash',function(){
var self=this;
});

Boolean.prototype.$klass = cBoolean;
Boolean.prototype.$type = VN.T_BOOLEAN;
Boolean.prototype.$ = RObject.prototype.$;var $VN_1 = RClass.define('Boolean', cObject);
$VN_1.$def('to_s',function(){
var self=this;
return this ? 'true' : 'false';});
$VN_1.$def('&',function(obj){
var self=this;
if (this) {
      return obj ? true : false ;
    }
    else {
      return false;
    }});
$VN_1.$def('|',function(obj){
var self=this;
if (this) {
      return true ;
    }
    else {
      return obj ? true : false ;
    }});
$VN_1.$def('^',function(obj){
var self=this;
if (this) {
      return obj ? false : true ;
    }
    else {
      return obj ? true : false ;
    }});

var RHash = function() {
  this.$klass = cHash ;
  this.$type = VN.HASH ;
  this.$keys = [] ;
  this.$values = { } ;
  this.$ifnone = nil ;
  return this;
};

RHash.prototype.$ivar_set = RObject.prototype.$ivar_set;
RHash.prototype.$ivar_get = RObject.prototype.$ivar_get;
RHash.prototype.$call = RObject.prototype.$call;
RHash.prototype.$define_singleton_method = RObject.prototype.$define_singleton_method;
RHash.prototype.$make_metaclass = RObject.prototype.$make_metaclass;

VN.$h = function() {
  var hash = cHash.$call('new', []) ;
  for (var i = 0; i < arguments.length; i++) {
    hash.$call('[]=', [arguments[i][0], arguments[i][1]]);
  }
  return hash;
};

var cHash = RClass.define('Hash', cObject) ;

RModule.include(cHash, mEnumerable);

cHash.$define_alloc_func(function() {
  return new RHash();
}); var $VN_1 = RClass.define('Hash', cObject);
$VN_1.$def_s('[]',function(){
var self=this;
});
$VN_1.$def_s('try_convert',function(){
var self=this;
});
$VN_1.$def('initialize',function(){
var self=this;
if (arguments.length > 0) {
      this.$ifnone = arguments[0] ;
    } });
$VN_1.$def('initialize_copy',function(){
var self=this;
});
$VN_1.$def('rehash',function(){
var self=this;
});
$VN_1.$def('to_hash',function(){
var self=this;
return self;
});
$VN_1.$def('to_a',function(){
var self=this;
var ary = [];
    for (var i = 0; i < this.$keys.length; i++) {
      ary.push([this.$keys[i], this.$values[this.$keys[i]]]);
    }
    return ary; });
$VN_1.$def('to_s',function(){
var self=this;
if (this.$keys.length == 0) return '{...}';
  
    var str = '{' + this.$keys[0].$call('inspect', []) + '=>' + this.$values[this.$keys[0]].$call('inspect', []);
    for (var i = 1; i < this.$keys.length; i++) {
      str += (', ' + this.$keys[i].$call('inspect', []) + '=>' + this.$values[this.$keys[i]].$call('inspect', []))
    }
    str += '}';
    return str;});
$VN_1.$def('inspect',function(){
var self=this;
return self.$('to_s', []);
});
$VN_1.$def('==',function(obj){
var self=this;
});
$VN_1.$def('[]',function(key){
var self=this;
if (!this.$values.hasOwnProperty(key)) {
      return this.$call('default', [key]);
    }
    return this.$values[key] ;});
$VN_1.$def('hash',function(){
var self=this;
});
$VN_1.$def('eql?',function(){
var self=this;
});
$VN_1.$def('fetch',function(){
var self=this;
});
$VN_1.$def('[]=',function(key,val){
var self=this;
self.$('store',[key,val]);
});
$VN_1.$def('store',function(key,val){
var self=this;
if (!this.$values.hasOwnProperty(key)) {
      this.$keys.push(key);
    }
  
    this.$values[key] = val ;
    return val ;});
$VN_1.$def('default',function(){
var self=this;
return self.$ifnone});
$VN_1.$def('default=',function(def_obj){
var self=this;
this.$ifnone = ifnone;
    return ifnone;});
$VN_1.$def('default_proc',function(){
var self=this;
});
$VN_1.$def('default_proc=',function(proc){
var self=this;
});
$VN_1.$def('key',function(){
var self=this;
});
$VN_1.$def('index',function(){
var self=this;
});
$VN_1.$def('size',function(){
var self=this;
});
$VN_1.$def('length',function(){
var self=this;
return self.$('size', []);
});
$VN_1.$def('empty?',function(){
var self=this;
});
$VN_1.$def('each_value',function(){
var self=this;
});
$VN_1.$def('each_key',function(){
var self=this;
});
$VN_1.$def('each_pair',function(){
var self=this;
});
$VN_1.$def('each',function(){
var self=this;
});
$VN_1.$def('keys',function(){
var self=this;
});
$VN_1.$def('values',function(){
var self=this;
});
$VN_1.$def('values_at',function(){
var self=this;
});
$VN_1.$def('shift',function(){
var self=this;
});
$VN_1.$def('delete',function(){
var self=this;
});
$VN_1.$def('delete_if',function(){
var self=this;
});
$VN_1.$def('select',function(){
var self=this;
});
$VN_1.$def('reject',function(){
var self=this;
});
$VN_1.$def('reject!',function(){
var self=this;
});
$VN_1.$def('clear',function(){
var self=this;
});
$VN_1.$def('invert',function(){
var self=this;
});
$VN_1.$def('update',function(){
var self=this;
});
$VN_1.$def('replace',function(){
var self=this;
});
$VN_1.$def('merge!',function(){
var self=this;
});
$VN_1.$def('merge',function(){
var self=this;
});
$VN_1.$def('assoc',function(){
var self=this;
});
$VN_1.$def('rassoc',function(){
var self=this;
});
$VN_1.$def('flatten',function(){
var self=this;
});
$VN_1.$def('include?',function(obj){
var self=this;
});
$VN_1.$def('member?',function(obj){
var self=this;
self.$('include?',[obj]);
});
$VN_1.$def('has_key?',function(key){
var self=this;
});
$VN_1.$def('has_value?',function(val){
var self=this;
});
$VN_1.$def('key?',function(key){
var self=this;
self.$('has_key?',[key]);
});
$VN_1.$def('value?',function(val){
var self=this;
self.$('has_value?',[val]);
});
$VN_1.$def('compare_by_identity',function(){
var self=this;
});
$VN_1.$def('compare_by_identity?',function(){
var self=this;
});

String.prototype.$klass = cString
String.prototype.$type = VN.STRING;

String.prototype.$ = RObject.prototype.$;

cString.$define_alloc_func(function() {
  return new String();
}); var $VN_1 = RClass.define('String', cObject);
$VN_1.$def('try_convert',function(){
var self=this;
});
$VN_1.$def('initialize',function(){
var self=this;
});
$VN_1.$def('initialize_copy',function(){
var self=this;
});
$VN_1.$def('<=>',function(obj){
var self=this;
});
$VN_1.$def('==',function(obj){
var self=this;
});
$VN_1.$def('eql?',function(obj){
var self=this;
});
$VN_1.$def('hash',function(obj){
var self=this;
});
$VN_1.$def('casecmp',function(obj){
var self=this;
});
$VN_1.$def('+',function(obj){
var self=this;
self.$('puts',['wow']);
});
$VN_1.$def('(',function(obj){
var self=this;
});
$VN_1.$def('%',function(obj){
var self=this;
});
$VN_1.$def('[]',function(key){
var self=this;
});
$VN_1.$def('[]=',function(key,val){
var self=this;
});
$VN_1.$def('insert',function(){
var self=this;
});
$VN_1.$def('length',function(){
var self=this;
return this.length;});
$VN_1.$def('size',function(){
var self=this;
return this.length});
$VN_1.$def('empty?',function(){
var self=this;
});
$VN_1.$def('=~',function(match){
var self=this;
});
$VN_1.$def('match',function(match){
var self=this;
});
$VN_1.$def('succ',function(){
var self=this;
});
$VN_1.$def('next',function(){
var self=this;
});
$VN_1.$def('upto',function(){
var self=this;
});
$VN_1.$def('index',function(){
var self=this;
});
$VN_1.$def('rindex',function(){
var self=this;
});
$VN_1.$def('replace',function(){
var self=this;
});
$VN_1.$def('clear',function(){
var self=this;
});
$VN_1.$def('chr',function(){
var self=this;
});
$VN_1.$def('to_i',function(){
var self=this;
});
$VN_1.$def('to_f',function(){
var self=this;
});
$VN_1.$def('to_s',function(){
var self=this;
return new String(this);});
$VN_1.$def('to_str',function(){
var self=this;
return self.$('to_s', []);
});
$VN_1.$def('inspect',function(){
var self=this;
return new String('"' + this + '"');});
$VN_1.$def('dump',function(){
var self=this;
});
$VN_1.$def('upcase',function(){
var self=this;
});
$VN_1.$def('downcase',function(){
var self=this;
});
$VN_1.$def('capitalize',function(){
var self=this;
});
$VN_1.$def('swapcase',function(){
var self=this;
});
$VN_1.$def('hex',function(){
var self=this;
});
$VN_1.$def('oct',function(){
var self=this;
});
$VN_1.$def('split',function(){
var self=this;
});
$VN_1.$def('lines',function(){
var self=this;
});
$VN_1.$def('bytes',function(){
var self=this;
});
$VN_1.$def('chars',function(){
var self=this;
});
$VN_1.$def('codepoints',function(){
var self=this;
});
$VN_1.$def('reverse',function(){
var self=this;
});
$VN_1.$def('concat',function(){
var self=this;
});
$VN_1.$def('<<',function(){
var self=this;
});
$VN_1.$def('crypt',function(){
var self=this;
});
$VN_1.$def('intern',function(){
var self=this;
});
$VN_1.$def('to_sym',function(){
var self=this;
return new String(this);});
$VN_1.$def('ord',function(){
var self=this;
});
$VN_1.$def('include?',function(){
var self=this;
});
$VN_1.$def('start_with?',function(){
var self=this;
});
$VN_1.$def('end_with?',function(){
var self=this;
});
$VN_1.$def('scan',function(){
var self=this;
});
$VN_1.$def('ljust',function(){
var self=this;
});
$VN_1.$def('rjust',function(){
var self=this;
});
$VN_1.$def('center',function(){
var self=this;
});
$VN_1.$def('sub',function(){
var self=this;
});
$VN_1.$def('gsub',function(){
var self=this;
});
$VN_1.$def('chop',function(){
var self=this;
});
$VN_1.$def('chomp',function(){
var self=this;
});
$VN_1.$def('strip',function(){
var self=this;
});
$VN_1.$def('lstrip',function(){
var self=this;
});
$VN_1.$def('rstrip',function(){
var self=this;
});
$VN_1.$def('tr',function(){
var self=this;
});
$VN_1.$def('tr_s',function(){
var self=this;
});
$VN_1.$def('delete',function(){
var self=this;
});
$VN_1.$def('squeeze',function(){
var self=this;
});
$VN_1.$def('count',function(){
var self=this;
});
$VN_1.$def('each_line',function(){
var self=this;
});
$VN_1.$def('each_byte',function(){
var self=this;
});
$VN_1.$def('each_char',function(){
var self=this;
});
$VN_1.$def('each_codepoint',function(){
var self=this;
});
$VN_1.$def('sum',function(){
var self=this;
});
$VN_1.$def('slice!',function(){
var self=this;
});
$VN_1.$def('partition',function(){
var self=this;
});
$VN_1.$def('rpartition',function(){
var self=this;
});


var $VN_1 = RClass.define('Document', cObject);
$VN_1.$def_s('ready?',function(block){
var self=this;
});

var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('VERSION','0.0.1');
$VN_1.$def_s('version',function(){
var self=this;
return self.$c_g('VERSION');
});
$VN_1.$def('app',function(){
var self=this;
});
cObject.$c_s('VN',cObject.$c_g('Vienna'));
cObject.$c_s('YES',true);
cObject.$c_s('NO',false);

var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('Object',$VN_1.$c_g('Object'));
$VN_1.$c_s('Array',$VN_1.$c_g('Array'));
$VN_1.$c_s('Dictionary',$VN_1.$c_g('Hash'));

var $VN_1 = RModule.define('Vienna');
$VN_1.$c_s('UNDEFINED_KEY_EXCEPTION','VNUndefinedKeyException');
var $VN_2 = RClass.define_under($VN_1, 'Object', cObject);
$VN_2.$def_s('access_instance_variables_directly?',function(){
var self=this;
return true;
});
$VN_2.$def('value_for_key',function(key){
var self=this;
});
$VN_2.$def('set_value:for_key:',function(value,key){
var self=this;
self.$('puts',[['Setting value for ',(key)].join('')]);
});
$VN_2.$def('validate_value:for_key:error:',function(value,key,out_error){
var self=this;
});
$VN_2.$def('array_value_for_key',function(key){
var self=this;
});
$VN_2.$def('set_value_for_key',function(key){
var self=this;
});
$VN_2.$def('value_for_key_path',function(path){
var self=this;
});
$VN_2.$def('set_value:for_key_path:',function(value,path){
var self=this;
});
$VN_2.$def('validate_value:for_key_path:error:',function(value,path,out_error){
var self=this;
});
$VN_2.$def('array_value_for_key_path',function(path){
var self=this;
});
$VN_2.$def('set_value_for_key_path',function(path){
var self=this;
});
$VN_2.$def('value_for_undefined_key',function(key){
var self=this;
});
$VN_2.$def('set_value:for_undefined_key:',function(value,key){
var self=this;
});
$VN_2.$def('set_nil_value_for_key',function(key){
var self=this;
});
$VN_2.$def('dictionary_with_values_for_keys',function(keys){
var self=this;
});
$VN_2.$def('set_values_for_keys_with_dictionary',function(keyed_values){
var self=this;
});
var $VN_2 = RClass.define_under($VN_1, 'Array', cObject);
$VN_2.$def('value_for_key',function(key){
var self=this;
});
$VN_2.$def('set_value:for_key:',function(value,key){
var self=this;
});
var $VN_2 = RClass.define_under($VN_1, 'Dictionary', cObject);
$VN_2.$def('value_for_key',function(key){
var self=this;
});
$VN_2.$def('set_value:for_key:',function(value,key){
var self=this;
});
var $VN_2 = RClass.define_under($VN_1, 'Set', cObject);
$VN_2.$def('value_for_key',function(key){
var self=this;
});
$VN_2.$def('set_value:for_key:',function(value,key){
var self=this;
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Object', cObject);
$VN_2.$def('observe_value_for_key_path:of_object:change:context:',function(path,object,change,context){
var self=this;
});
$VN_2.$def('add_observer:for_key_path:options:context:',function(observer,key_path,options,context){
var self=this;
});
$VN_2.$def('remove_observer:for_key_path:',function(observer,key_path){
var self=this;
});

var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Notification', cObject);
$VN_2.$('attr_reader',['name','object','user_info']);
$VN_2.$def('initialize',function(name,obj,info){
var self=this;
self.$i_s('@name',name);
self.$i_s('@object',obj);
return self.$i_s('@user_info',info);
});
$VN_2.$def_s('notification_with_name:object:',function(name,obj){
var self=this;
self.$('notification_with_name:object:user_info:',[name,obj,nil]);
});
$VN_2.$def_s('notification_with_name:object:user_info:',function(name,obj,info){
var self=this;
self.$('new',[name,obj,info]);
});
var $VN_2 = RClass.define_under($VN_1, 'NotificationCenter', cObject);
$VN_2.$def_s('default_center',function(){
var self=this;
return (self.$k_d('@@default_center') ? self.$k_g('@@default_center') : self.$k_s('@@default_center',self.$('new',[])));
});
$VN_2.$def('add_observer:selector:name:object:',function(observer,selector,name,obj){
var self=this;
});
$VN_2.$def('post_notification',function(notification){
var self=this;
});
$VN_2.$def('post_notification_name:object:',function(name,obj){
var self=this;
});
$VN_2.$def('post_notification_name:object:user_info:',function(name,obj,info){
var self=this;
});
$VN_2.$def('remove_observer',function(observer){
var self=this;
});
$VN_2.$def('remove_observer:name:object:',function(observer,name,obj){
var self=this;
});
$VN_2.$def('add_observer_for_name:object:queue:',function(name,obj,queue){
var self=this;
});
var $VN_1 = RModule.define('RubyWebApp');
$VN_1.$c_s('VERSION','0.0.1');
var $VN_2 = RClass.define_under($VN_1, 'AppDelegate', cObject);
$VN_2.$def('initialize_with:john:assign:key:',function(bob,adam,fors,adam){
var self=this;
self.$i_s('@adam',(10));
self.$('bob',[(10),(34),self.$i_g('@benny')]);
});
$VN_2.$def('will_finish_launching',function(notification){
var self=this;
self.$('puts',['Application will finish launching!']);
});
$VN_2.$def('did_finish_launching',function(notification){
var self=this;
self.$('puts',['Application did finish launching!!']);
});
VN.self.$('set_value:for_key:',[(10),'bob']);
VN.self.$('set_value:for_key:',[(100),'adam']);
var adam = cObject.$c_g('Object').$('allocate',[]);
VN.self.$('puts',[adam]);
(4).$('+',[(2)]);
VN.self.$('puts',[(4).$('-',[(45)])]);
'bob'.$('+',[(10)]);
adam = [(12),(14),(15)];
VN.self.$def_s('something',function(){
var self=this;
return (4);
});
