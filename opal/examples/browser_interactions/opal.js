
var rb_cArray;if(!Array.prototype.indexOf){Array.prototype.indexOf=function(obj){for(var i=0;i<this.length;i++){if(this[i]==obj)return i;}
return-1;};};function rb_ary_reject(ary){var _=opal_block;opal_block=nil;var res=[],v;for(var i=0;i<ary.length;i++){v=vm_yield(_,[ary[i]]);if(!RTEST(v))res.push(ary[i]);}
return rest;};function rb_ary_plus(a,b){var c=[];for(var i=0;i<a.length;i++){c.push(a[i]);}
for(var i=0;i<b.length;i++){c.push(b[i]);}
return c;};function Init_Array(){rb_cArray=rb_define_class("Array",rb_cObject);Array.prototype.klass=rb_cArray;Array.prototype.flags=T_ARRAY|T_OBJECT;rb_define_method(rb_cArray,"reject",rb_ary_reject,0);rb_define_method(rb_cArray,"+",rb_ary_plus,1);};
function rb_class_inherited(super_class,klass){if(!super_class)super_class=rb_cObject;};function rb_define_class(id,super_class){var k;if(rb_const_defined(rb_cObject,id)){k=rb_const_get(rb_cObject,id);if(!(k.flags&T_CLASS)){throw id+" is not a class"}
if(k.sup!=super_class){if(k!=rb_cObject){throw id+" is already defined"}}
return k}
if(!super_class){console.log("no superclass given for "+id+" . Object assumed");}
k=rb_define_class_id(id,super_class);rb_class_tbl[id]=k;rb_name_class(k,id);rb_const_set(rb_cObject,id,k);rb_class_inherited(super_class,k);return k;}
function rb_define_class_under(outer,id,super_klass){var klass;if(rb_const_defined_at(outer,id)){klass=rb_const_get_at(outer,id);return klass;}
if(!super_klass){VN.warning('no super class for `'+VN.class2name(outer),+'::'+id+'`, Object assumed');}
klass=rb_define_class_id(id,super_klass);var class_name;if(outer===rb_cObject){class_name=id;}
else{class_name=outer.iv_tbl.__classid__+"::"+id;}
rb_name_class(klass,class_name);rb_const_set(outer,id,klass);rb_class_inherited(super_klass,klass);return klass;};RClass.class2name=function(klass){return klass.$class_name();};RClass.obj_classname=function(obj){return VN.class2name(obj.$klass);};function make_metametaclass(metaclass){console.log("wwowow");var metametaclass,super_of_metaclass;if(metaclass.klass==metaclass){metametaclass=rb_class_boot(null);metametaclass.klass=metametaclass;}
else{metametaclass=rb_class_boot(null);metametaclass.klass=metaclass.klass.klass==metaclass.klass?make_metametaclass(metaclass.klass):metaclass.klass.klass;}
FL_SET(metametaclass,FL_SINGLETON);rb_singleton_class_attached(metametaclass,metaclass);metaclass.klass=metametaclass;super_of_metaclass=metaclass.sup;while(FL_TEST(super_of_metaclass,T_ICLASS)){super_of_metaclass=super_of_metaclass.sup;}
metametaclass.sup=rb_ivar_get(super_of_metaclass.klass,'__attached__')==super_of_metaclass?super_of_metaclass.klass:make_metametaclass(super_of_metaclass);return metametaclass;};function rb_class_real(klass){while(klass.flags&FL_SINGLETON)klass=klass.sup;return klass;}
RClass.real=function(klass){while((klass.$singleton==true)||(klass.$type==VN.ICLASS)){klass=klass.$super}
return klass};function class_alloc(type,klass){var o=new RClass();o.klass=klass;o.flags=type;return o;}
function rb_class_boot(super_class){var k=class_alloc(T_CLASS,rb_cClass);k.sup=super_class;return k;}
function rb_check_inheritable(super_class){if(!FL_TEST(super_class,T_CLASS)){throw'super class must be a Class ('+VN.obj_classname(super_klass)+' given)';}
if(super_class.flags&FL_SINGLETON){throw'can\'t make a subclass of singleton class';}};function rb_class_create(super_klass){rb_check_inheritable(super_klass);if(super_klass==rb_cClass){VN.raise(VN.TypeError,"can't make subclass of Class")}
return rb_class_boot(super_klass);};function rb_define_class_id(id,super_klass){var klass;if(!super_klass)super_klass=rb_cObject;klass=rb_class_create(super_klass);rb_make_metaclass(klass,super_klass.klass);return klass;};function rb_singleton_class(obj){var klass;if(FL_TEST(obj,T_NUMBER)||FL_TEST(obj,T_SYMBOL)){console.log(obj);throw'can\'t define singleton';}
if(FL_TEST(obj.klass,FL_SINGLETON)&&rb_ivar_get(obj.klass,'__attached__')==obj){klass=obj.klass;}
else{var class_id=obj.klass.iv_tbl.__classid__;klass=rb_make_metaclass(obj,obj.klass);obj.klass.iv_tbl.__classid__=class_id;}
if(FL_TEST(obj,T_CLASS)){if(rb_ivar_get(klass.klass,'__attached__')!=klass){}}
return klass;};function rb_name_class(klass,id){rb_ivar_set(klass,'__classid__',id);}
function rb_make_metaclass(klass,super_class){if(FL_TEST(klass,T_CLASS)&&FL_TEST(klass,FL_SINGLETON)){return make_metametaclass(klass);}
else{var meta=rb_class_boot(super_class);FL_SET(meta,FL_SINGLETON);klass.klass=meta;rb_singleton_class_attached(meta,klass);var metasuper=meta.klass;if(metasuper){meta.klass=metasuper;}
return meta;}};function rb_singleton_class_attached(klass,obj){if(FL_TEST(klass,FL_SINGLETON)){rb_ivar_set(klass,'__attached__',obj);}};function rb_define_method(klass,name,func,argc){var m=new rb_method_t();m.argc=argc;m.body=func;rb_add_method(klass,name,m,NOEX_PUBLIC);};function rb_define_private_method(klass,name,func,argc){var m=new rb_method_t();m.argc=argc;m.body=func;rb_add_method(klass,name,m,NOEX_PRIVATE);};function rb_define_private_method(klass,name,func,argc){var m=new rb_method_t();m.argc=argc;m.body=func;rb_add_method(klass,name,m,NOEX_PROTECTED);};function rb_define_singleton_method(klass,name,func,argc){rb_define_method(rb_singleton_class(klass),name,func,argc);};function rb_add_method(klass,name,method){klass.m_tbl[name]=method;};function rb_define_alloc_func(klass,func){rb_define_method(rb_singleton_class(klass),'allocate',func,0);};function rb_define_alias(cls,name,old){var m=rb_search_method(cls,old);if(!m)throw"rb_define_alias: no existing method '"+old+"'"
return rb_define_method(cls,name,m.body,m.argc);};
var rb_mComparable;function rb_cmp_equal(x,y){if(x==y)return true;return false;};function rb_cmp_gt(x,y){var c=rb_funcall(x,"<=>",1,y);if(c>0)return true;return false;};function rb_cmp_ge(x,y){var c=rb_funcall(x,"<=>",1,y);if(c>=0)return true;return false;};function rb_cmp_lt(x,y){var c=rb_funcall(x,"<=>",1,y);if(c<0)return true;return false;};function rb_cmp_le(x,y){var c=rb_funcall(x,"<=>",1,y);if(c<=0)return true;return false;};function rb_cmp_between(obj,min,max){if(RTEST(rb_cmp_lt(obj,min)))return false;if(RTEST(rb_cmp_gt(obj,max)))return false;return true;};function Init_Comparable(){rb_mComparable=rb_define_module("Comparable");rb_define_method(rb_mComparable,"==",rb_cmp_equal,1);rb_define_method(rb_mComparable,">",rb_cmp_gt,1);rb_define_method(rb_mComparable,">=",rb_cmp_ge,1);rb_define_method(rb_mComparable,"<",rb_cmp_lt,1);rb_define_method(rb_mComparable,"<=",rb_cmp_le,1);rb_define_method(rb_mComparable,"between?",rb_cmp_between,2);};
var rb_cDir;function rb_dir_s_glob(dir,id,_){if(arguments.length>4)throw"unsupported Dir.glob.. FIXME"
var result=[],eof=false;var scanner=new vn_ruby_string_scanner(arguments[3]);while(!eof){if(scanner.scan(/^\*\*\//)){result.push('.*');}
else if(scanner.scan(/^\*\*/)){result.push('.*');}
else if(scanner.scan(/^\//)){result.push('\\/');}
else if(scanner.scan(/^\*/)){result.push('[^\\/]*');}
else if(scanner.scan(/^[a-zA-Z_]+/)){result.push(scanner.matched);}
else if(scanner.scan(/^\./)){result.push('\\.');}
else{eof=true;}}
var reg=new RegExp('^'+result.join("")+'$');var matching=[];for(prop in opal_files){if(reg.exec(prop)){matching.push(prop);}}
return matching;}
function Init_Dir(){rb_cDir=rb_define_class("Dir",rb_cObject);rb_define_singleton_method(rb_cDir,"glob",rb_dir_s_glob,-1);rb_define_singleton_method(rb_cDir,"[]",rb_dir_s_glob,-1);}
var rb_mEnumerable;function Init_Enumerable(){rb_mEnumerable=rb_define_module("Enumerable");}
var rb_cEnumerator;function Init_Enumerator(){};
var rb_eException,rb_eSystemExit,rb_eFatal,rb_eSignal,rb_eInterrupt,rb_eStandardError,rb_eTypeError,rb_eArgError,rb_eIndexError,rb_eKeyError,rb_eRangeError,rb_eScriptError,rb_eSyntaxError,rb_eLoadError,rb_eNotImpError,rb_eNameError,rb_eNoMethodError,rb_eRuntimeError;function rb_exc_initialize(exc,id,_){if(arguments[3]&&arguments[3].klass==rb_cString){exc.iv_tbl.message=arguments[3];}
else{exc.iv_tbl.message=exc.klass.iv_tbl.__classid__;}
exc.toString=function(){return exc.klass.iv_tbl.__classid__+": "+exc.iv_tbl.message;};};function rb_exc_inspect(exc){return"#<"+exc.klass.iv_tbl.__classid__+": "+exc.iv_tbl.message+">";};function rb_exc_to_s(exc){return rb_exc_message(exc);};function rb_exc_message(exc){var m;if(!exc.iv_tbl.hasOwnProperty('message')){m="NativeError: "+exc.message;}
else{m=exc.iv_tbl.message;}
exc.iv_tbl={message:m};return m;};function rb_raise(exc,message){var e=rb_obj_alloc(exc);rb_exc_initialize(e,"",nil,message);return rb_exc_raise(e);};function rb_jump_raise(exc,type,message,args){var e=rb_obj_alloc(exc);rb_exc_initialize(e,"",nil,message);e.iv_tbl.args=args;e.iv_tbl.type=type;return rb_exc_raise(e);};function rb_exc_raise(exc){throw exc};function Init_Exception(){rb_eException=rb_define_class("Exception",rb_cObject);Error.prototype.klass=rb_eException;Error.prototype.iv_tbl={};rb_define_singleton_method(rb_eException,"exception",rb_class_new_instance,-1);rb_define_method(rb_eException,"initialize",rb_exc_initialize,-1);rb_define_method(rb_eException,"to_s",rb_exc_to_s,0);rb_define_method(rb_eException,"message",rb_exc_message,0);rb_define_method(rb_eException,"inspect",rb_exc_inspect,0);rb_eSystemExit=rb_define_class("SystemExit",rb_eException);rb_eFatal=rb_define_class("fatal",rb_eException);rb_eSignal=rb_define_class("SignalException",rb_eException);rb_eInterrupt=rb_define_class("Interrupt",rb_eSignal);rb_eStandardError=rb_define_class("StandardError",rb_eException);rb_eTypeError=rb_define_class("TypeError",rb_eStandardError);rb_eArgError=rb_define_class("ArgumentError",rb_eStandardError);rb_eIndexError=rb_define_class("IndexError",rb_eStandardError);rb_eKeyError=rb_define_class("KeyError",rb_eIndexError);rb_eRangeError=rb_define_class("RangeError",rb_eStandardError);rb_eScriptError=rb_define_class("ScriptError",rb_eException);rb_eSyntaxError=rb_define_class("SyntaxError",rb_eScriptError);rb_eLoadError=rb_define_class("LoadError",rb_eScriptError);rb_eNotImpError=rb_define_class("NotImplementedError",rb_eScriptError);rb_eNameError=rb_define_class("NameError",rb_eStandardError);rb_eNoMethodError=rb_define_class("NoMethodError",rb_eNameError);rb_eRuntimeError=rb_define_class("RuntimeError",rb_eStandardError);};
var rb_cFile;function opal_file(){this.content="";this.path="";this.included=false;this.klass=rb_cFile;};var vn_fs_root={};vn_fs_root[".."]=vn_fs_root["."]=vn_fs_root;vn_fs_root['$']="";var opal_files={"/":vn_fs_root};function vn_fs_define_file(f,content){var file=new opal_file();file.content=content;file.path=f;opal_files[f]=file;var p=f.split("/");var i,c=vn_fs_root,b;for(i=1;i<p.length-1;i++){b=p[i];if(c[b]===undefined){c[b]={};c[b]['.']=c[b];c[b]['..']=c;c[b]['$']=b;}
c=c[b];}
c[p[p.length-1]]=content;};function rb_file_s_dirname(cls,id,_,dirname){return dirname.substr(0,dirname.lastIndexOf('/'));};function rb_file_s_join(cls,id,_){return Array.prototype.slice.call(arguments,3).join("/");};function rb_file_s_expand_path(argc,args,obj){var res_stack=[],cur;args=args[0].split("/")
for(var i=0;i<args.length;i++){cur=args[i];if(cur=='..'){res_stack.pop();}
else if(cur=='.'||cur==''){}
else{res_stack.push(cur);}}
return res_stack.join("/");};function Init_File(){rb_cFile=rb_define_class("File",rb_cObject);rb_define_singleton_method(rb_cFile,"expand_path",rb_file_s_expand_path,-1);rb_define_singleton_method(rb_cFile,"dirname",rb_file_s_dirname,1);rb_define_singleton_method(rb_cFile,"join",rb_file_s_join,-1);}
function vn_gem(){this.name="";this.path="";this.content="";this.loaded=false;};function opal_gem_load_at_path(path,callback){var r=new XMLHttpRequest();r.open("GET",path,false);r.onreadystatechange=function(){if(r.readyState==4){if(r.responseText==""||r.status!=200){console.log(path+" failed.");}
else{var g=vn_gem_boot(path,r.responseText);callback(g);}}}
r.send(null);};var vn_gem_all={};function vn_gem_preload(path,name){}
function vn_gem_boot(path,content){var g=new vn_gem();g.path=path;g.content=content;vn_gem_all[path]=g;vm_gem_load(g);return g;}
function vm_gem_load(gem){if(gem.loaded)throw"Cannot load gem twice... something silly happened"
var at=0;var ch='';var text=gem.content;function parse_directory(){var f=get_next(marker_count());console.log("directory is "+f);}
function parse_file(){var f=get_next(marker_count());var c=get_next(marker_count());vn_fs_define_file(f,c);}
function parse_gem_def(){var g=get_next(marker_count());var p=get_next(marker_count());console.log('found '+g+' at '+p);}
function parse_locales(){}
function parse_css(){var content=get_next(marker_count());var style=document.createElement('style');style.setAttribute("type","text/css");if(style.styleSheet){style.styleSheet.cssText=content;}
else{style.appendChild(document.createTextNode(content));}
document.getElementsByTagName('head')[0].appendChild(style);}
var gem_format=(function(){var marker=text.indexOf(';',at);var format=text.substr(at,marker-at);at=marker+1;return format;})();var gem_version=(function(){var marker=text.indexOf(';',at);var version=text.substr(at,marker-at);at=marker+1;return version;})();var next=function(c){if(c&&c!==ch){console.log('bundle parse error: Expected '+c+', but instead got '+ch);}
ch=text.charAt(at);at+=1;return ch;};var get_next=function(i){var result=text.substr(at,i);at+=i;return result;};var marker_count=function(){var len='';next();while(ch>='0'&&ch<='9'){len+=ch;next();}
return parseInt(len);};while(next()){switch(ch){case'd':parse_directory();break;case'f':parse_file();break;case'g':parse_gem_def();break;case'l':parse_locales();break;case's':parse_string_table();break;case'p':parse_platform_list();break;case'c':parse_css();break;default:throw"unknown bundle part "+ch}}
gem.loaded=true;return gem;}
var rb_cHash,rb_envtbl;function RHash(){this.hash=opal_yield_hash();this.klass=nil;this.flags=T_OBJECT|T_HASH;this.ifnone=nil;this.keys=[];this.dict={};return this;};RHash.prototype={toString:function(){return"#<Hash:"+this.hash+">";},hasKey:function(k){return this.keys.indexOf(k)!==-1;},set:function(k,v){if(!this.hasKey(k))this.keys.push(k);this.dict[k]=v;return v;},get:function(k){if(this.hasKey(k))return this.dict[k];return this.ifnone;}};function rb_hash_alloc(klass){var hash=new RHash();hash.klass=klass;hash.ifnone=nil;return hash;};function rb_hash_new(){var k,v,h=rb_hash_alloc(rb_cHash);for(var i=0;i<arguments.length;i++){k=arguments[i],v=arguments[i+1];i++;h.set(k,v);}
return h;};function Init_Hash(){rb_cHash=rb_define_class("Hash",rb_cObject);};
var opal_boot_files=[];function ruby_init(){rb_call_inits();for(var i=0;i<opal_boot_files.length;i++){(opal_boot_files[i])(opal_top_self);}};function ruby_script(name){};function rb_call_inits(){Init_Object();Init_BuiltInConstants();Init_top_self();Init_Array();Init_Comparable();Init_Enumerable();Init_Number();Init_String();Init_Exception();Init_Hash();Init_Range();Init_Proc();Init_Regexp();Init_IO();Init_File();Init_Dir();Init_Time();Init_VM();Init_vm_eval();Init_load();Init_Math();Init_JSON();Init_Net();};function Init_BuiltInConstants(){rb_const_set(rb_cObject,"RUBY_VERSION","1.9.1");rb_const_set(rb_cObject,"RUBY_PATCHLEVEL",191);rb_const_set(rb_cObject,"RUBY_PLATFORM","opal");rb_const_set(rb_cObject,"RUBY_RELEASE_DATE","2010.02.27");};
var rb_eIOError,rb_cIO;var rb_stdout;var opal_oIOAjax;function opal_oIOAjax_puts(ajax,id,_,str){console.log("need to write to ajax stdout: "+str);};var opal_oIOConsole;function opal_oIOConsole_puts(cons,id,_,str){console.log(vm_send(str,"inspect",[],nil,8));};function rb_f_puts(recv,id,_){var argv=Array.prototype.slice.call(arguments,3)
for(var i=0;i<argv.length;i++){vm_send(rb_stdout,"puts",[argv[i]],nil,8);}};function Init_IO(){rb_eIOError=rb_define_class("IOError",rb_eStandardError);rb_define_method(rb_mKernel,"puts",rb_f_puts,-1);rb_cIO=rb_define_class("IO",rb_cObject);rb_include_module(rb_cIO,rb_mEnumerable);opal_oIOAjax=rb_obj_alloc(rb_cIO);rb_define_singleton_method(opal_oIOAjax,"puts",opal_oIOAjax_puts,1);opal_oIOConsole=rb_obj_alloc(rb_cIO);rb_define_singleton_method(opal_oIOConsole,"puts",opal_oIOConsole_puts,1);rb_stdout=opal_oIOConsole;};
var opal_mJSON;function opal_json_s_parse(cls,source){};function opal_json_2_ruby_json(json){if(json.klass&&json.klass===rb_cArray){var ary=[];for(var i=0;i<json.length;i++){if(json[i].constructor===Object){ary.push(opal_json_2_ruby_json(json[i]));}
else{ary.push(json[i]);}}
return ary;}
var result=rb_hash_new();for(var key in json){if(!json.hasOwnProperty(key))continue;var val=json[key];if(val===null){val=nil;}
else if(val.constructor===Object){val=opal_json_2_ruby_json(val);}
else if(val.klass===rb_cArray){var ary=[];for(var i=0;i<val.length;i++){if(val[i].constructor===Object){ary.push(opal_json_2_ruby_json(val[i]));}
else{ary.push(val[i]);}}
val=ary;}
rb_hash_aset(result,key,val);}
return result;};function Init_JSON(){opal_mJSON=rb_define_module("JSON");rb_define_singleton_method(opal_mJSON,"parse",opal_json_s_parse,1);};if(!this.JSON){this.JSON={};}
(function(){function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());
var ruby_loadpath;function ruby_init_loadpath(){ruby_loadpath=[""];};function ruby_incpush(path){ruby_loadpath.push(path);};function rb_require_file(file_path){var f=opal_files[file_path];if(f.included){return;}
else{f.included=true;f.content(opal_top_self);}};function rb_f_require(obj,id,_,path){path=rb_file_s_expand_path(1,[path],nil);var correct_path;var found=rb_find_require_path(path);if(found===nil){rb_raise(rb_eLoadError,"no such file to load -- "+path);}
else{rb_require_file(found);return true;}};function rb_find_require_path(path){var try_path;for(var i=0;i<ruby_loadpath.length;i++){try_path=ruby_loadpath[i]+path+'.rb';if(opal_files[try_path]){return try_path;}
try_path=ruby_loadpath[i]+path;if(opal_files[try_path]){return try_path;}}
return nil;};function rb_loadpath(path){var found=rb_find_require_path(path);if(found===nil){throw"cannot find require: "+path+", called from "+called_from_file;}
else{rb_require_file(found);return true;}};function rb_eval_raw(str,filename){var parser=vn_parser(filename,str);var iseq=parser.parse();console.log(iseq);rb_iseq_eval(iseq);};function Init_load(){rb_define_method(rb_cBasicObject,"require",rb_f_require,1);};
var rb_mMath;function rb_math_atan2(m,y,x){return Math.atan2(y,x);};function rb_math_cos(m,x){return Math.cos(x);};function rb_math_sin(m,x){return Math.sin(x);};function rb_math_tan(m,x){return Math.tan(x);};function rb_math_acos(m,x){return Math.acos(x);};function rb_math_asin(m,x){return Math.asin(x);};function rb_math_atan(m,x){return Math.atan(x);};function rb_math_exp(m,x){return Math.exp(x);};function rb_math_log(m,x){return Math.log(x);};function rb_math_sqrt(m,x){return Math.sqrt(x);};function Init_Math(){rb_mMath=rb_define_module("Math");rb_const_set(rb_mMath,"PI",Math.PI);rb_const_set(rb_mMath,"E",Math.E);rb_define_singleton_method(rb_mMath,"atan2",rb_math_atan2,2);rb_define_singleton_method(rb_mMath,"cos",rb_math_cos,1);rb_define_singleton_method(rb_mMath,"sin",rb_math_sin,1);rb_define_singleton_method(rb_mMath,"tan",rb_math_tan,1);rb_define_singleton_method(rb_mMath,"acos",rb_math_acos,1);rb_define_singleton_method(rb_mMath,"asin",rb_math_asin,1);rb_define_singleton_method(rb_mMath,"atan",rb_math_atan,1);rb_define_singleton_method(rb_mMath,"exp",rb_math_exp,1);rb_define_singleton_method(rb_mMath,"log",rb_math_log,1);rb_define_singleton_method(rb_mMath,"sqrt",rb_math_sqrt,1);};
var RModule={};function rb_define_module(id){var module;if(rb_const_defined(rb_cObject,id)){module=rb_const_get(rb_cObject,id);if(FL_TEST(module,T_MODULE)){return module;}
throw id+' is not a module';}
module=rb_define_module_id(id);rb_class_tbl[id]=module;rb_const_set(rb_cObject,id,module);return module;};function rb_define_module_under(outer,id){var module;if(VN.const_defined_at(outer,id)){module=VN.const_get_at(outer,id);if(module.type==VN.MODULE){return module;}
VN.type_error(id+' is not a module');}
module=VN.define_module_id(id);VN.const_set(outer,id,module);VN.set_class_path(module,outer,name);return module;};function rb_define_module_id(id){var mdl=rb_mod_create();rb_name_class(mdl,id);return mdl;};function rb_mod_create(){var m=class_alloc(T_MODULE,rb_cModule);m.sup=rb_cObject;return m;}
function rb_include_module(klass,module){var c=klass;while(module){if(module==rb_cObject)break;c=c.sup=rb_include_class_new(module,c);module=module.sup;}
return;klass.sup=rb_include_class_new(module,klass);};function rb_include_class_new(mod,sup){var klass=class_alloc(T_ICLASS,rb_cClass);if(mod.flags&T_ICLASS)mod=mod.klass;klass.iv_tbl=mod.iv_tbl;klass.m_tbl=mod.m_tbl;klass.sup=sup.sup;klass.klass=mod;return klass;};
var rb_mNet,rb_cNetHTTP;function opal_http_request_new(){try{return new XMLHttpRequest();}catch(e){try{return new ActiveXObject('MSXML2.XMLHTTP');}catch(e){return new ActiveXObject('Microsoft.XMLHTTP');}}};function rb_cNetHTTP_initialize(http,id,_,address,port){http._address=address;http._port=port||80;http._started=false;http._async=true;};function rb_cNetHTTP_inspect(h,id,_){return"#<Net::HTTP "+h._address+":"+h._port+" open="+h._started+">";};function rb_cNetHTTP_started_q(http,id,_){return http._started;};function rb_cNetHTTP_start(http,id,_){if(http._started){rb_raise(rb_eArgError,"HTTP session already opened");}
if(_!==nil){http._do_block=_;rb_cNetHTTP_do_start(http,"do_start",nil);}
else{rb_raise(rb_eArgError,"no block given to Net::HTTP#start");}
return http;};function rb_cNetHTTP_do_start(http,id,_){http._started=true;return rb_cNetHTTP_connect(http,"connect",nil);};function rb_cNetHTTP_connect(http,id,_){var r=http._request=opal_http_request_new();r.open("GET","http://www.google.com",true);r.onreadystatechange=function(){if(r.readyState==4){http._body=r.responseText
rb_cNetHTTP_finish(http,"finish",nil);}};r.send(null);return http;};function rb_cNetHTTP_finish(http,id,_){if(!http._started){rb_raise(rb_eArgError,"HTTP session not yet started");}
return vm_yield(http._do_block,[http]);};function rb_cNetHTTP_body(http,id,_){return http._body;};function Init_Net(){rb_mNet=rb_define_module("Net");rb_cNetHTTP=rb_define_class_under(rb_mNet,"HTTP",rb_cObject);rb_define_method(rb_cNetHTTP,"initialize",rb_cNetHTTP_initialize,-1);rb_define_method(rb_cNetHTTP,"inspect",rb_cNetHTTP_inspect,0);rb_define_method(rb_cNetHTTP,"started?",rb_cNetHTTP_started_q,0);rb_define_method(rb_cNetHTTP,"start",rb_cNetHTTP_start,0);rb_define_method(rb_cNetHTTP,"body",rb_cNetHTTP_body,0);};
var rb_cNumber;function rb_num_plus(a,b){return a+b;};function rb_num_minus(a,b){return a-b;};function rb_num_mul(a,b){return a*b;};function rb_num_div(a,b){return a/b;};function rb_num_modulo(a,b){return a%b;};function rb_num_pow(a,b){return Math.pow(a,b);};function rb_num_gt(a,id,_,b){return a>b;};function rb_num_ge(a,id,_,b){return a>=b;};function rb_num_lt(a,id,_,b){return a<b;};function rb_num_le(a,id,_,b){return a<=b;};function rb_num_to_s(num){return num.toString();};function rb_num_inspect(num){return num.toString();};function rb_num_dotimes(num){var _=opal_block;opal_block=nil;for(var i=0;i<num;i++){vm_yield(_,[i]);}
return num;};function rb_num_downto(num,to){var _=opal_block;opal_block=nil;for(var i=num;i>=to;i--){vm_yield(_,[i]);}
return num;};function rb_num_upto(num,id,_,stop){console.log("from "+num+" to "+stop);if(stop<num)return num;for(var i=num;i<=stop;i++){vm_yield(_,[i]);}
return num;};function rb_num_floor(num){return Math.floor(num);};function rb_num_ceil(num){return Math.ceil(num);};function rb_num_round(num){return Math.round(num);};function rb_num_truncate(num){return Math.round(num);};function rb_num_step(num,limit,step){var _=opal_block;opal_block=nil;for(var i=num;i<=limit;i+=step){vm_yield(_,[i]);}
return num;};function rb_num_to_i(num){return parseInt(num);};function rb_num_to_f(num){return parseFloat(num);};function rb_num_rev(num){return~num;};function rb_num_and(num,a){return num&a;};function rb_num_or(num,a){return num|a;};function rb_num_xor(num,a){return num^a;};function rb_num_lshift(a,b){return a<<b;};function rb_num_rshift(a,b){return a>>b;};function rb_num_succ(a){return++a;};function rb_num_pred(a){return--a;};function rb_num_odd_p(a){if(a%2==0)return false;return true;};function rb_num_even_p(a){if(a%2==0)return true;return false;};function rb_num_equal(a,id,_,b){return a===b;};function rb_num_eql(a,id,_,b){return a===b;};function rb_num_zero_p(a){return a===0;};function rb_num_nonzero_p(a){return a!==0;};function rb_num_int_p(a){return a==Math.round(a);};function rb_num_real_p(a){return a!=Math.round(a);};function rb_num_cmp(a,b){if(a<b)return-1;if(a===b)return 0;return 1;};function rb_num_uplus(a){return a;};function rb_num_uminus(a){return-a;};function Init_Number(){rb_cNumber=rb_define_class("Number",rb_cObject);rb_const_set(rb_cObject,"Fixnum",rb_cNumber);rb_const_set(rb_cObject,"Float",rb_cNumber);Number.prototype.klass=rb_cNumber;Number.prototype.flags=T_NUMBER|T_OBJECT;rb_include_module(rb_cNumber,rb_mComparable);rb_define_method(rb_cNumber,"+@",rb_num_uplus,0);rb_define_method(rb_cNumber,"-@",rb_num_uminus,0);rb_define_method(rb_cNumber,"eql?",rb_num_eql,1);rb_define_method(rb_cNumber,"to_int",rb_num_to_i,0);rb_define_method(rb_cNumber,"real?",rb_num_real_p,0);rb_define_method(rb_cNumber,"integer?",rb_num_int_p,0);rb_define_method(rb_cNumber,"zero?",rb_num_zero_p,0);rb_define_method(rb_cNumber,"nonzero?",rb_num_nonzero_p,0);rb_define_method(rb_cNumber,"floor",rb_num_floor,0);rb_define_method(rb_cNumber,"ceil",rb_num_ceil,0);rb_define_method(rb_cNumber,"round",rb_num_round,-1);rb_define_method(rb_cNumber,"truncate",rb_num_truncate,0);rb_define_method(rb_cNumber,"step",rb_num_step,-1);rb_define_method(rb_cNumber,"odd?",rb_num_odd_p,0);rb_define_method(rb_cNumber,"even?",rb_num_even_p,0);rb_define_method(rb_cNumber,"upto",rb_num_upto,1);rb_define_method(rb_cNumber,"downto",rb_num_downto,1);rb_define_method(rb_cNumber,"times",rb_num_dotimes,0);rb_define_method(rb_cNumber,"succ",rb_num_succ,0);rb_define_method(rb_cNumber,"next",rb_num_succ,0);rb_define_method(rb_cNumber,"pred",rb_num_pred,0);rb_define_method(rb_cNumber,"to_i",rb_num_to_i,0);rb_define_method(rb_cNumber,"to_s",rb_num_to_s,-1);rb_define_method(rb_cNumber,"inspect",rb_num_inspect,0);rb_define_method(rb_cNumber,"to_f",rb_num_to_f,0);rb_define_method(rb_cNumber,"+",rb_num_plus,1);rb_define_method(rb_cNumber,"-",rb_num_minus,1);rb_define_method(rb_cNumber,"*",rb_num_mul,1);rb_define_method(rb_cNumber,"/",rb_num_div,1);rb_define_method(rb_cNumber,"%",rb_num_modulo,1);rb_define_method(rb_cNumber,"**",rb_num_pow,1);rb_define_method(rb_cNumber,"==",rb_num_equal,1);rb_define_method(rb_cNumber,"<=>",rb_num_cmp,1);rb_define_method(rb_cNumber,">",rb_num_gt,1);rb_define_method(rb_cNumber,">=",rb_num_ge,1);rb_define_method(rb_cNumber,"<",rb_num_lt,1);rb_define_method(rb_cNumber,"<=",rb_num_le,1);rb_define_method(rb_cNumber,"~",rb_num_rev,0);rb_define_method(rb_cNumber,"&",rb_num_and,1);rb_define_method(rb_cNumber,"|",rb_num_or,1);rb_define_method(rb_cNumber,"^",rb_num_xor,1);rb_define_method(rb_cNumber,"<<",rb_num_lshift,1);rb_define_method(rb_cNumber,">>",rb_num_rshift,1);};
var rb_cBasicObject,rb_cObject,rb_cModule,rb_cClass;var rb_cNilClass,rb_cBoolean;function rb_obj_alloc(klass,id,_){return rb_class_allocate_instance(klass);};function rb_class_allocate_instance(klass,id,_){var o=new RObject();o.klass=klass;FL_SET(o,T_OBJECT);return o;};function rb_obj_dummy(){return nil;};function rb_obj_equal($,id,_,obj){if($==obj)return true;return false;};function rb_obj_not($,id,_){return RTEST($)?false:true;};function rb_obj_not_equal($,id,_,obj){return RTEST(rb_funcall($,"==",obj))?false:true;};function rb_false(){return false;};function rb_true(){return true;};function rb_equal($,id,_,obj){var r;if($==obj)return true;r=rb_funcall($,"==",obj);if(RTEST(r))return true;return false;};function rb_obj_match(){return nil;};function rb_obj_not_match($,id,_,obj){var r=rb_funcall($,"=~",obj);return RTEST(r)?false:true;};function rb_class_real(klass){if(!klass)return nil;while(FL_TEST(klass,FL_SINGLETON)||FL_TEST(klass,T_ICLASS)){klass=klass.sup;}
return klass;};function rb_obj_class(self){return rb_class_real(self.klass);};function rb_obj_clone(self){return self;};function rb_obj_dup(self){return self;};function rb_obj_init_copy(self){return self;};function rb_any_to_s(self,id,_){var c=rb_obj_classname(self);if(self.flags&T_OBJECT){return"#<"+c+":"+self.hash+">";}
else{return c;}};function rb_obj_classname(obj,id,_){var klass;if(obj.flags&T_OBJECT)
klass=rb_class_real(obj.klass);else
klass=obj;return klass.iv_tbl.__classid__;};function rb_obj_inspect(self,id,_){return rb_any_to_s(self);};function rb_class_new_instance(klass,id,_){var o=rb_obj_alloc(klass);var argv=Array.prototype.slice.call(arguments,3);rb_funcall3(o,"initialize",_,argv);return o;};function rb_mod_attr_reader(recv,id,_){var argv=Array.prototype.slice.call(arguments,3);for(var i=0;i<argv.length;i++){var s=argv[i].ptr;var f=new Function('r','id','_','return rb_ivar_get(r, "@'+s+'");');rb_define_method(recv,s,f,0);}
return nil;};function rb_mod_attr_writer(recv,id,_){var argv=Array.prototype.slice.call(arguments,3);for(var i=0;i<argv.length;i++){var s=argv[i].ptr;var f=new Function('r','id','_','v','return rb_ivar_set(r, "@'+s+'", v);');rb_define_method(recv,s+'=',f,1);}
return nil;};function rb_mod_attr_accessor(recv,id,_){rb_mod_attr_reader.apply(recv,arguments);rb_mod_attr_writer.apply(recv,arguments);return nil;};function rb_mod_const_set(mod,id,_,name,val){rb_const_set(mod,name,val);return val;};function rb_obj_respond_to(obj,id,_,sym){var f=rb_search_method(obj.klass,(sym.klass==rb_cString)?sym:sym.ptr);if(f)return true;return false;};function rb_obj_is_instance_of(obj,id,_,c){if(rb_class_real(obj.klass)==c){return true;}
return false;};function rb_obj_is_kind_of(obj,id,_,c){var k=obj.klass;while(k){if(k==c)return true;k=k.sup;}
return false;};function rb_obj_tap(obj,id,_){vm_yield(_,[obj]);return obj;};function rb_obj_instance_eval(obj,id,_,str){if(str){return rb_vm_eval_str(obj,str);}
if(_==nil)throw"no block given for instance_eval."
return _.call(_,obj,nil,nil,obj);};function rb_obj_mod_eval(obj,id,_){if(_==nil)throw"no block given for module_eval."
return _.call(_,obj);};function rb_obj_instance_exec(obj,id,_){if(_==nil)throw"no block given for instance_exec"
var args=Array.prototype.slice.call(arguments,3);args.unshift(nil);args.unshift(nil);args.unshift(obj);return _.apply(_,args);};function rb_bool_to_s(bool){return bool?"true":"false";};function rb_bool_and(bool,id,_,other){return bool?RTEST(other):false;};function rb_bool_or(bool,id,_,other){return bool?true:RTEST(other);};function rb_bool_xor(bool,id,_,other){return bool?!RTEST(other):RTEST(other);};function rb_nil_nil_q(){return true;};function rb_mod_include(cls,id,_,mod){return rb_include_module(cls,mod);};function rb_mod_extend(cls,id,_,mod){return rb_include_module(rb_singleton_class(cls),mod);};function rb_obj_send(recv,id,_,mid){var args=Array.prototype.slice.call(arguments,4);return vm_send(recv,mid,args,nil,8);};function rb_class_initialize(cls,id,_){var sup=(arguments.length>3)?arguments[3]:rb_cObject;cls.m_tbl={};cls.sup=sup;rb_make_metaclass(cls,sup.klass);rb_class_inherited(sup,cls);return cls;};function rb_mod_alias_method(cls,id,_,new_name,old_name){return rb_define_alias(cls,new_name.ptr,old_name.ptr);};function rb_f_raise($,id,_){var exc,msg="";if(arguments.length>3){if(arguments[3].klass==rb_cString){msg=arguments[3];exc=vm_send(rb_eRuntimeError,"new",[msg],nil,0);}
else if(arguments[3].flags&T_OBJECT){exc=arguments[3];}
else{if(arguments[4]&&arguments[4].klass==rb_cString){msg=arguments[2];}
exc=vm_send(arguments[3],"new",[msg],nil,0);}}
else{throw"rb_f_raise needs atleast 3 args!!"}
throw exc};function rb_mod_ancestors(cls){var a=[],k=cls;while(k){a.push(k);k=k.sup;}
return a;};function rb_mod_eqq(mod,id,_,arg){return rb_obj_is_kind_of(arg,"",nil,mod);};function rb_obj_object_id(obj){if(obj.hash!=undefined)return obj.hash;var hash=opal_yield_hash();obj.hash=hash;return hash;};function rb_mod_to_s(mod){return mod.iv_tbl.__classid__;};function rb_class_superclass(klass){return klass.sup;};function Init_Object(){var metaclass;rb_cBasicObject=boot_defclass('BasicObject',null);rb_cObject=boot_defclass('Object',rb_cBasicObject);rb_cModule=boot_defclass('Module',rb_cObject);rb_cClass=boot_defclass('Class',rb_cModule);rb_const_set(rb_cObject,"BaiscObject",rb_cBasicObject);metaclass=rb_make_metaclass(rb_cBasicObject,rb_cClass);metaclass=rb_make_metaclass(rb_cObject,metaclass);metaclass=rb_make_metaclass(rb_cModule,metaclass);metaclass=rb_make_metaclass(rb_cClass,metaclass);boot_defmetametaclass(rb_cModule,metaclass);boot_defmetametaclass(rb_cObject,metaclass);boot_defmetametaclass(rb_cBasicObject,metaclass);rb_define_private_method(rb_cBasicObject,"initialize",rb_obj_dummy,0);rb_define_method(rb_cBasicObject,"==",rb_obj_equal,1);rb_define_method(rb_cBasicObject,"equal?",rb_obj_equal,1);rb_define_method(rb_cBasicObject,"!",rb_obj_not,0);rb_define_method(rb_cBasicObject,"!=",rb_obj_not_equal,1);rb_define_private_method(rb_cBasicObject,"singleton_method_added",rb_obj_dummy,1);rb_define_private_method(rb_cBasicObject,"singleton_method_removed",rb_obj_dummy,1);rb_define_private_method(rb_cBasicObject,"singleton_method_undefined",rb_obj_dummy,1);rb_mKernel=rb_define_module("Kernel");rb_include_module(rb_cObject,rb_mKernel);rb_define_private_method(rb_cClass,"inherited",rb_obj_dummy,1);rb_define_private_method(rb_cModule,"included",rb_obj_dummy,1);rb_define_private_method(rb_cModule,"extended",rb_obj_dummy,1);rb_define_private_method(rb_cModule,"method_added",rb_obj_dummy,1);rb_define_private_method(rb_cModule,"method_removed",rb_obj_dummy,1);rb_define_private_method(rb_cModule,"method_undefined",rb_obj_dummy,1);rb_define_method(rb_mKernel,"=~",rb_obj_match,1);rb_define_method(rb_mKernel,"!~",rb_obj_not_match,1);rb_define_method(rb_mKernel,"eql?",rb_obj_equal,1);rb_define_method(rb_mKernel,"class",rb_obj_class,0);rb_define_method(rb_mKernel,"clone",rb_obj_clone,0);rb_define_method(rb_mKernel,"dup",rb_obj_dup,0);rb_define_method(rb_mKernel,"initialize_copy",rb_obj_init_copy,1);rb_define_method(rb_mKernel,"raise",rb_f_raise,-1);rb_define_method(rb_mKernel,"fail",rb_f_raise,-1);rb_define_method(rb_mKernel,"object_id",rb_obj_object_id,0);rb_define_method(rb_mKernel,"module_eval",rb_obj_mod_eval,0);rb_define_method(rb_cModule,"module_eval",rb_obj_mod_eval,0);rb_define_method(rb_mKernel,"instance_eval",rb_obj_instance_eval,0);rb_define_method(rb_mKernel,"instance_exec",rb_obj_instance_exec,0);rb_define_method(rb_mKernel,"send",rb_obj_send,-1);rb_define_method(rb_mKernel,"__send__",rb_obj_send,-1);rb_define_method(rb_mKernel,"respond_to?",rb_obj_respond_to,-1);rb_define_method(rb_mKernel,"to_s",rb_any_to_s,0);rb_define_method(rb_mKernel,"inspect",rb_obj_inspect,0);rb_define_method(rb_mKernel,"instance_of?",rb_obj_is_instance_of,1);rb_define_method(rb_mKernel,"kind_of?",rb_obj_is_kind_of,1);rb_define_method(rb_mKernel,"is_a?",rb_obj_is_kind_of,1);rb_define_method(rb_mKernel,"tap",rb_obj_tap,0);rb_cNilClass=rb_define_class("NilClass",rb_cObject);nil={flags:T_OBJECT,klass:rb_cNilClass,toString:function(){return"nil";}};rb_define_method(rb_cModule,"===",rb_mod_eqq,1);rb_define_method(rb_cModule,"to_s",rb_mod_to_s,0);rb_define_method(rb_cModule,"extend",rb_mod_extend,1);rb_define_method(rb_cModule,"include",rb_mod_include,1);rb_define_method(rb_cModule,"ancestors",rb_mod_ancestors,0);rb_define_private_method(rb_cModule,"attr_reader",rb_mod_attr_reader,-1);rb_define_private_method(rb_cModule,"attr_writer",rb_mod_attr_writer,-1);rb_define_private_method(rb_cModule,"attr_accessor",rb_mod_attr_accessor,-1);rb_define_method(rb_cModule,"alias_method",rb_mod_alias_method,2);rb_define_method(rb_cModule,"const_set",rb_mod_const_set,2);rb_define_method(rb_cClass,"allocate",rb_obj_alloc,0);rb_define_method(rb_cClass,"new",rb_class_new_instance,-1);rb_define_method(rb_cClass,"initialize",rb_class_initialize,-1);rb_define_method(rb_cClass,"superclass",rb_class_superclass,0);rb_cBoolean=rb_define_class("Boolean",rb_cObject);Boolean.prototype.klass=rb_cBoolean;Boolean.prototype.flags=T_OBJECT|T_BOOLEAN;rb_define_method(rb_cBoolean,"to_s",rb_bool_to_s,0);rb_define_method(rb_cBoolean,"inspect",rb_bool_to_s,0);rb_define_method(rb_cBoolean,"&",rb_bool_and,1);rb_define_method(rb_cBoolean,"|",rb_bool_or,1);rb_define_method(rb_cBoolean,"^",rb_bool_xor,1);}
var opal_hash_yield=0;function opal_yield_hash(){return opal_hash_yield++};var nil;var NOEX_PUBLIC=0,NOEX_NOSUPER=1,NOEX_PRIVATE=2,NOEX_PROTECTED=4,NOEX_MASK=6,NOEX_BASIC=8;function require(){};function RTEST(val){return(val!==null&&val!==undefined&&val!==nil&&val!==false)?true:false;};ORTEST=function(lhs,rhs){var res=lhs();if(RTEST(res))return res;return rhs();};ANDTEST=function(lhs,rhs){var res=lhs();if(RTEST(res))return rhs();return res;};function NOTTEST(expr){if(expr==null||expr==undefined||expr==nil||expr==false)return true;return false;};function RObject(klass,type){this.hash=opal_yield_hash();this.toString=function(){return"#<"+this.klass.iv_tbl.__classid__+":"+this.hash+">";};this.klass=klass;this.flags=type;this.iv_tbl={};return this;};function RClass(klass,super_klass){this.hash=opal_yield_hash();this.toString=function(){return this.iv_tbl.__classid__;};this.klass=klass;this.sup=super_klass;this.flags=T_CLASS;this.m_tbl={};this.iv_tbl={};return this;};function rb_method_t(){this.argc=0;this.body=nil;return this;};var T_CLASS=1,T_MODULE=2,T_OBJECT=4,T_BOOLEAN=8,T_STRING=16,T_ARRAY=32,T_NUMBER=64,T_PROC=128,T_SYMBOL=256,T_HASH=512,T_ICLASS=1024;var FL_SINGLETON=2056;function FL_TEST(x,f){return x.flags&f;}
function FL_SET(x,f){x.flags|=f;}
function FL_UNSET(x,f){x.flags&=(~f);}
rb_class_tbl={};rb_global_tbl={};function rb_define_hooked_variable(id,ptr){return rb_gvar_set(id,ptr);};function rb_gvar_get(id){if(id=="$:")return ruby_loadpath;return nil;};function rb_gvar_set(id,val){return rb_global_tbl[id]=val;};function boot_defclass(id,super_class){var o=rb_class_boot(super_class);rb_name_class(o,id);rb_class_tbl[id]=o;rb_const_set((rb_cObject?rb_cObject:o),id,o);return o;};boot_defmetametaclass=function(klass,metametaclass){klass.klass.klass=metametaclass;};obj_alloc=function(klass){var obj=VN$(klass,'allocate');return obj;};class_allocate_instance=function(){var obj=new RObject(this,T_OBJECT);return obj;};obj_dummy=function(){return nil;};equal=function(obj){if(obj==this)return true;var result=this.$funcall('==',[obj]);if(result)return true;return false;};eql=function(obj){return this.$funcall('==',[obj]);};obj_equal=function(obj){return(obj==this)?true:false;};
var EXPR_BEG=0,EXPR_END=1,EXPR_ENDARG=2,EXPR_ARG=3,EXPR_CMDARG=4,EXPR_MID=5,EXPR_FNAME=6,EXPR_DOT=7,EXPR_CLASS=8,EXPR_VALUE=9;var kCLASS=0,kMODULE=1,kDEF=2,kUNDEF=3,kBEGIN=4,kRESCUE=5,kENSURE=6,kEND=7,kIF=8,kUNLESS=9,kTHEN=10,kELSIF=11,kELSE=12,kCASE=13,kWHEN=14,kWHILE=15,kUNTIL=16,kFOR=17,kBREAK=18,kNEXT=19,kREDO=20,kELSIF=21,kELSE=22,kCASE=23,kWHEN=24,kWHILE=25,kUNTIL=26,kFOR=27,kBREAK=28,kNEXT=29,kREDO=30,kRETRY=31,kIN=32,kDO_COND=33,kDO_BLOCK=34,kDO_LAMBDA=35,kRETURN=36,kYIELD=37,kSUPER=38,kSELF=39,kNIL=40,kTRUE=41,kFALSE=42,kAND=43,kOR=44,kNOT=45,kIF_MOD=46,kUNLESS_MOD=47,kWHILE_MOD=48,kUNTIL_MOD=49,kRESCUE_MOD=50,kALIAS=51,kDEFINED=52,klBEGIN=53,klEND=54,k__LINE__=55,k__FILE__=56,kDO=57,kDEFined=58,tIDENTIFIER=59,tFID=60,tGVAR=61,tIVAR=62,tCONSTANT=63,tCVAR=64,tLABEL=65,tINTEGER=66,tFLOAT=67,tSTR_CONTENT=68,tCHAR=69,tNTH_REF=70,tBACK_REF=71,tREGEXP_END=72,tUPLUS=73,tUMINUS=74,tPOW=75,tCMP=76,tEQ=77,tEQQ=78,tNEQ=79,tGEQ=80,tLEQ=81,tANDOP=82,tOROP=83,tMATCH=84,tNMATCH=85,tDOT2=86,tDOT3=87,tAREF=88,tASET=89,tLSHFT=90,tRSHFT=91,tCOLON2=92,tCOLON3=93,tOP_ASGN=94,tASSOC=95,tLPAREN=96,tLPAREN_ARG=97,tRPAREN=98,tLBRACK=99,tLBRACE=100,tLBRACE_ARG=101,tSTAR=102,tAMPER=103,tLAMBDA=104,tSYMBEG=105,tSTRING_BEG=106,tXSTRING_BEG=107,tREGEXP_BEG=108,tWORDS_BEG=109,tQWORDS_BEG=110,tSTRING_DBEG=111,tSTRING_DVAR=112,tSTRING_END=113,tLAMBEG=114,tUMINUS_NUM=115,tSTRING=116,tXSTRING_END=117,tPLUS=118,tMINUS=119,tNL=120,tSEMI=121;var tCALL=150,tMLHS=151,tOPT_PLUS=152,tOPT_MINUS=153,tOPT_MULT=154,tOPT_DIV=155;var ISEQ_TYPE_TOP=1,ISEQ_TYPE_METHOD=2,ISEQ_TYPE_BLOCK=3,ISEQ_TYPE_CLASS=4,ISEQ_TYPE_RESCUE=5,ISEQ_TYPE_ENSURE=6,ISEQ_TYPE_EVAL=7,ISEQ_TYPE_MAIN=8;var vn_parser=function(filename,str){var line_number=1;var lex_state=EXPR_BEG;var last_state;var scanner;var token={type:false,value:false};var last_token={type:false,value:false};var sym_tbl={};var eval_arr=[];var valid_cmd_args=[tIDENTIFIER,tINTEGER,tCONSTANT,tSTRING_BEG,kDO,'{',tSYMBEG,tIVAR,kSELF,tLBRACK];var cmd_start=false;var contexts=[];var string_parse_stack=[];var push_string_parse=function(o){string_parse_stack.push(o);};var pop_string_parse=function(){string_parse_stack.pop();};var current_string_parse=function(){if(string_parse_stack.length==0){return null;}
return string_parse_stack[string_parse_stack.length-1];};var object_create=function(obj){var targ={};for(var prop in obj){targ[prop]=obj[prop];}
return targ;};var original_symbol={nud:function(){return this;},led:function(left){throw'led unimplemented';}};var symbol=function(id,binding_power){var sym=sym_tbl[id];binding_power=binding_power||0;if(sym){if(binding_power>=sym.lbp){sym.lbp=binding_power;}}
else{sym=object_create(original_symbol);sym.type=sym.value=id;sym.lbp=binding_power;sym_tbl[id]=sym;}
return sym;};var sym_stmt=function(id,bp,block){if(!block){block=bp;bp=0;}
var sym=symbol(id);sym.std=block;return sym;};var infixr=function(id,bp,led){var s=symbol(id,bp);s.led=led||function(left){this.first=left;this.second=expr(bp-1);this.arity="binary";return this;};return s;};var infix=function(id,bp,led){var s=symbol(id,bp);s.led=led||function(left){this.$lhs=left;this.$rhs=expr(bp);this.type=id;return this;};return s;};var prefix=function(id,nud){var s=symbol(id);s.nud=nud||function(){scope.reserve(this);this.first=expression(70);this.arity="unary";return this;};return s;};var assignment=function(id){return infixr(id,10,function(left){if(left.type!=="."&&left.type!=="["&&left.type!==tIDENTIFIER&&left.type!=tIVAR&&left.type!==tMLHS&&left.type!==tCONSTANT&&left.type!==tCALL){console.log(left.type);throw'bad lhs'}
this.$lhs=left;this.$rhs=stmt();this.assignment=true;return this;});};assignment("=");symbol(kDO).nud=function(){if(token.type=='|'){var e;this.$args=[];next_token();e=expr();this.$args.push(e);while(true){if(token.type=="|"){next_token();break;}
else if(token.type==","){next_token();continue;}
else{this.$args.push(expr());}}}
this.$stmts=stmts([kEND]);next_token();return this;};symbol('{').nud=function(){this.$stmt=stmt();next_token('}');return this;};symbol(kSELF).nud=function(){return this;};symbol(kRETURN).nud=function(){return this;};symbol(kNIL).nud=function(){return this;};symbol(kSUPER).nud=function(){return this;};symbol(kTRUE).nud=function(){return this;};symbol(kFALSE).nud=function(){return this;};symbol(tSTRING_BEG).nud=function(){this.$parts=[];while(true){if(token.type===false){throw'Parsing string error: not expecting EOF before end of string'}
else{if(token.type===tSTRING_END){next_token();break;}
else{if(token.type===tSTR_CONTENT){this.$parts.push(token)
next_token();}
else if(token.type===tSTRING_DBEG){var d=token;next_token();d.$value=stmt();this.$parts.push(d);next_token();}}}}
return this;};symbol(tIDENTIFIER).nud=function(){if((valid_cmd_args.indexOf(token.type)!=-1)&&(last_state==EXPR_CMDARG)){gather_command_args(this);this.type=tCALL;this.$recv=null;this.$meth=this.value;}
return this;};symbol(tCONSTANT).nud=function(){if(token.type==="."){var t=token;t.type=tCALL;t.$recv=this;next_token();if(token.type!==tIDENTIFIER){rb_raise(rb_eSyntaxError,"Expecting identifier as constant method name");}
t.$meth=token.value;next_token();if(token.type==='('){next_token();if(token.type===')'){next_token();}
else{gather_command_args(t);next_token(')');}}
if(token.type===kDO){t.$brace_block=stmt();}
else if(token.type==='{'){t.$brace_block=stmt();}
return t;}
else if(token.type==='['){var t=token;next_token();t.type=tCALL;t.$recv=this;t.$meth='[]';console.log("toekn is "+token.value);var aref_args=[expr()];t.$call_args={args:aref_args};next_token(']');return t;}
return this;};var gather_command_args=function(cmd){cmd.$call_args={args:[]};if((token.type!==kDO)&&(token.type!=='{')&&(token.type!==')')){var s=expr();if(token.type===tASSOC){var a_keys=[],a_values=[];cmd.$assocs={'$keys':a_keys,'$values':a_values};a_keys.push(s);next_token();a_values.push(expr());}
else{cmd.$call_args.args.push(s);}}
if(token.type===','){next_token();while(true){s=expr();if(token.type===tASSOC){if(!cmd.$assocs){var a_keys=[],a_values=[];cmd.$assocs={'$keys':a_keys,'$values':a_values};}
a_keys.push(s);next_token();a_values.push(expr());while(true){if(token.type!==','){break;}
next_token(',');a_keys.push(expr());next_token(tASSOC);a_values.push(expr());}}
else{cmd.$call_args.args.push(s);}
if(token.type!==','){break;}
next_token(',');if([kDEF,kCLASS,kMODULE,kIF].indexOf(token.type)!==-1){throw'Command Args: Not expecting token "'+token.type+'". Perhaps a trailing commar?'}}}
if(token.type===kDO){cmd.$brace_block=stmt();}
else if(token.type==='{'){cmd.$brace_block=stmt();}};var gather_do_block=function(){var result=token;next_token();result.$stmts=stmts([kEND]);next_token();return result;}
symbol(tINTEGER).nud=function(){return this;};symbol(tSYMBEG).nud=function(){this.$name=stmt();return this;};symbol(tIVAR).nud=function(){return this;};symbol(tCVAR).nud=function(){return this;};symbol(tGVAR).nud=function(){return this;};symbol("&").nud=function(){this.$name=stmt();return this;}
infix(",",80,function(left){this.type=tMLHS;if(left.type==tMLHS){throw"in here.."+token.value}
else{this.$parts=[];this.$parts.push(left);this.$parts.push(expr(10));}
return this;});infix(".",80,function(left){this.$recv=left;this.$meth=token.value;this.type=tCALL;next_token();if((valid_cmd_args.indexOf(token.type)!=-1)&&(last_state===EXPR_CMDARG)){gather_command_args(this);}
else if(token.type==="="){next_token();this.$meth=this.$meth+"=";var eql_expr=[expr()];this.$call_args={args:eql_expr};console.log(this);}
return this;});function meth_call(m,b,t){return infix(m,b,function(left){this.type=t||tCALL;this.$recv=left;this.$meth=this;this.$call_args={args:[stmt()]}
return this;});}
meth_call(tPLUS,80,tOPT_PLUS);meth_call(tMINUS,80,tOPT_MINUS);meth_call("*",80,tOPT_MULT);meth_call("/",80,tOPT_DIV);infix("(",80,function(left){var args={args:[]};if(left.type==='.'){left.$call_args=args;}
else if(left.type===tIDENTIFIER||left.type===tCONSTANT){left.type=tCALL;left.$meth=left.value;left.$call_args=args;}
else if(left.type===tCALL){left.$call_args=args;}
else{throw left.value+' is not a valid receiver'}
if(token.type!==')'){while(true){args.args.push(expr());if(token.type!==','){break;}
next_token(',');}}
next_token(')');if(token.type===kDO){left.$block=stmt();}
else if(token.type==='{'){left.$block=stmt();}
return left;});prefix(tLBRACK,function(){var arr=[];if(token.type!==']'){while(true){arr.push(expr());if(token.type!==','){break;}
next_token(',');}}
next_token(']');this.$values=arr;return this;});prefix(tLBRACE,function(){this.$keys=[];this.$values=[];if(token.type!=='}'){while(true){var t=expr();next_token();this.$keys.push(t);this.$values.push(expr());if(token.type=='}'){break;}
else if(token.type==tNL||token.type==tSEMI){next_token();break;}
next_token(',');}}
next_token('}');return this;});prefix(kCASE,function(){this.$expr=stmt();this.$body=[];if(token.type==tNL||token.type==tSEMI)next_token();while(true){if(token.type==kEND){next_token();break;}
else if(token.type==kWHEN){var s,t=token;t.$args=[];next_token();if([tNL,tSEMI,","].indexOf(token.type)!=-1)
throw"kCASE: not expecting given token type"
while(true){s=stmt();t.$args.push(s);if(token.type==",")next_token();else break;}
t.$stmts=stmts([kEND,kELSE,kWHEN]);}
else if(token.type==kELSE){var t=token;next_token();t.$stmts=stmts([kEND]);}}
return this;});prefix(kIF,function(){this.$expr=stmt();this.$tail=[];if(token.type==tNL||token.type==tSEMI){next_token();if(token.type==kTHEN)next_token();}
else if(token.type==kTHEN){next_token();}
else{throw"kIF: expecting either term or kTHEN"}
this.$stmts=stmts([kEND,kELSE,kELSIF]);while(true){if(token.type==kEND){next_token();break;}
else if(token.type==kELSIF){var t=token;next_token();t.$expr=stmt();if(token.type==tNL||token.type==tSEMI){next_token();if(token.type==kTHEN)next_token();}
else if(token.type==kTHEN){next_token();}
else{throw"kIF: expecting either term or kTHEN"}
t.$stmts=stmts([kEND,kELSIF,kELSE]);this.$tail.push(t);}
else if(token.type==kELSE){var t=token;next_token();t.$stmts=stmts([kEND]);this.$tail.push(t);}
else{throw"kIF: unexpected token: "+token.type+", "+token.value}}
return this;});sym_stmt(kDEF,function(){if(token.type===tIDENTIFIER||token.type===tCONSTANT||token.type===kSELF){this.$fname=token;}
else{throw'Method Defintion: expected identifier or constant as def name.'}
next_token();if(token.type==='.'||token.type===tCOLON2){this.$sname=this.$fname;this.$stype=token.type;next_token();this.$fname=token;next_token();}
else{if(this.$fname.type===kSELF){throw"Cannot use keyword 'self' as method name"}}
if(token.type===tNL||token.type===tSEMI){}
else{this.$arglist={arg:[],rest_arg:[],opt_arg:[],opt_block_arg:null};if(token.type==='('){this.$paran=true;next_token();}
while(true){if(token.type===')'){next_token();break;}
else{var s=stmt();this.$arglist.arg.push(s);if(token.type==','){next_token();}
else{if(token.type===')')continue;else if(token.type==tNL||token.type==tSEMI)break;else throw"Error: def, unsupported param type "+token.type}}}}
this.$stmts=stmts([kEND]);next_token();return this;});sym_stmt(kCLASS,function(){if(token.type===tIDENTIFIER){throw'Class defintion: cannot use tIDENTIFIER as a class name. Expected tCONSTANT'}
else if(token.type===tCONSTANT){this.$kname=token;}
else{throw'Class definition: expected constant as class name'}
next_token();if(token.type=='<'){next_token();if(token.type==tCONSTANT){this.$super=stmt();next_token();}
else{throw"Class error: supername?"}}
this.$stmts=stmts([kEND]);next_token();return this;});sym_stmt(kMODULE,function(){if(token.type===tIDENTIFIER){throw"Module definition: cannot use tIDENTIFIER as a module name. Expected tCONSTANT"}
else if(token.type===tCONSTANT){this.$kname=token;}
else{throw"Module definition: Expected tCONSTANT for module name"}
next_token();this.$stmts=stmts([kEND]);next_token();return this;});var stmts=function(t){var s;var r=[];t=t||[];while(true){if(token.type===false){if(t.indexOf(false)===-1){break;}
else{throw'stmts: got to EOF before reaching end of statements'}}
else if(t.indexOf(token.type)!=-1){break;}
else{if(token.type===tNL||token.type===tSEMI){next_token();}
else{s=stmt();r.push(s);}}}
return r;};var stmt=function(){var c=token;if(c.std){next_token();return c.std();}
var e=expr(0);return e;};var expr=function(right_binding_power){var old=token;next_token();var left=old.nud();while(right_binding_power<token.lbp){old=token;next_token();left=old.led(left);}
return left;};var get_next_string_token=function(){var str_parse=current_string_parse();if(scanner.scan(new RegExp('^\\'+str_parse.beg))){pop_string_parse();if(str_parse.beg=='"'||str_parse.beg=="'"){lex_state=EXPR_END;return[tSTRING_END,scanner.matched];}
else{return[tXSTRING_END,scanner.matched]}}
var str_buffer=[];if(scanner.scan(/^#(\$|\@)/)){return[tSTRING_DVAR,scanner.matched];}
else if(scanner.scan(/^#\{/)){str_parse.content=false;return[tSTRING_DBEG,scanner.matched];}
else if(scanner.scan(/^#/)){str_buffer.push('#');}
var reg_exp=(str_parse.beg=='`')?new RegExp('[^\\'+str_parse.beg+'\#\0\\]+|.'):new RegExp('[^\\'+str_parse.beg+'\#\0\\\n]+|.');scanner.scan(reg_exp);str_buffer.push(scanner.matched);return[tSTR_CONTENT,str_buffer.join('')];};var next_token=function(id){last_token=token;if(current_string_parse()&&current_string_parse().content){var t=get_next_string_token();token={};token.type=t[0];token.value=t[1];return token;}
var t=get_next_token();if(id&&(id!==token.type)){throw'Unexpected value "'+token.value+'". Expecting: '+id}
token=object_create(sym_tbl[t[0]]);token.type=t[0];token.value=t[1];return token;};var get_next_token=function(){var c='',space_seen=false;last_state=lex_state;cmd_start=false;while(true){if(scanner.scan(/^(\ |\t|\r)/)){space_seen=true;continue;}
else if(scanner.scan(/^(\n|#)/)){c=scanner.matched;if(c=='#'){scanner.scan(/^(.*\n)/);}
line_number++;scanner.scan(/^(\n+)/);line_number+=scanner.matched.length;if(lex_state==EXPR_BEG){continue;}
cmd_start=true;lex_state=EXPR_BEG;return[tNL,'\n'];}
else if(scanner.scan(/^[+-]/)){var result=scanner.matched=='+'?tPLUS:tMINUS;var sign=(result==tPLUS)?tUPLUS:tUMINUS;if(lex_state==EXPR_FNAME||lex_state==EXPR_DOT){lex_state=EXPR_ARG;if(scanner.scan(/^@/)){return[sign,result+'@'];}
else{return[sign,result];}}
if(scanner.scan(/^\=/)){lex_state=EXPR_BEG;return[tOP_ASGN,result];}
if(lex_state==EXPR_BEG||lex_state==EXPR_MID){lex_state=EXPR_BEG;return[sign,result];}
lex_state=EXPR_BEG;return[result,scanner.matched];}
else if(scanner.scan(/^\//)){lex_state=EXPR_BEG;return['/',scanner.matched];}
else if(scanner.scan(/^\*\*\=/)){lex_state=EXPR_BEG;return[tOP_ASGN,"**"];}
else if(scanner.scan(/^\*\*/)){return[tPOW,"**"];}
else if(scanner.scan(/^\*\=/)){lex_state=EXPR_BEG;return[tOP_ASGN,"*"];}
else if(scanner.scan(/^\*/)){var r;if(lex_state==EXPR_FNAME){lex_state=EXPR_BEG;r="*";}
else if(lex_state==EXPR_BEG||lex_state==EXPR_MID){r=tSTAR;}
else{lex_state=EXPR_BEG;r="*"}
return[r,scanner.matched];}
else if(scanner.scan(/^\<\=\>/)){return[tCMP,scanner.matched];}
else if(scanner.scan(/^\<\=/)){return[tLEQ,"<="];}
else if(scanner.scan(/^\<\<\=/)){lex_state=EXPR_BEG;return[tOP_ASGN,"<<"];}
else if(scanner.scan(/^\<\</)){if(([EXPR_END,EXPR_DOT,EXPR_ENDARG,EXPR_CLASS].indexOf(lex_state)!=-1)&&space_seen){return[tLSHFT,"<<"];}
lex_state=EXPR_BEG;return[tLSHFT,"<<"];}
else if(scanner.scan(/^\</)){lex_state=EXPR_BEG;return["<","<"];}
else if(scanner.scan(/^\&\&\=/)){lex_state=EXPR_BEG;return[tOP_ASGN,"&&"];}
else if(scanner.scan(/^\&\&/)){lex_state=EXPR_BEG;return[tANDOP,"&&"];}
else if(scanner.scan(/^\&\=/)){lex_state=EXPR_BEG;return[tOP_ASGN,"&"];}
else if(scanner.scan(/^\&/)){var r;if(space_seen&&!scanner.check(/^\s/)){if(lex_state==EXPR_CMDARG)r=tAMPER;else r="&";}
else if(lex_state==EXPR_BEG||lex_state==EXPR_MID){r=tAMPER;}
else{r="&";}
return[r,"&"];}
else if(scanner.scan(/^\"/)){push_string_parse({beg:'"',content:true});return[tSTRING_BEG,scanner.matched];}
else if(scanner.scan(/^\'/)){push_string_parse({beg:"'",content:true});return[tSTRING_BEG,scanner.matched];}
else if(scanner.scan(/^\`/)){push_string_parse({beg:"`",content:true});return[tXSTRING_BEG,scanner.matched];}
else if(scanner.check(/^[0-9]/)){lex_state=EXPR_END;if(scanner.scan(/^[\d_]+\.[\d_]+\b/)){return[tFLOAT,scanner.matched];}
else if(scanner.scan(/^[\d_]+\b/)){return[tINTEGER,scanner.matched];}
else if(scanner.scan(/^0(x|X)(\d|[a-f]|[A-F])+/)){return[tINTEGER,scanner.matched];}
else{console.log('unexpected number type');return[false,false];}}
else if(scanner.scan(/^\|\|\=/)){lex_state=EXPR_BEG;return[tOP_ASGN,'||'];}
else if(scanner.scan(/^\|\|/)){lex_state=EXPR_BEG;return[tOROP,scanner.matched];}
else if(scanner.scan(/^\|\=/)){lex_state=EXPR_BEG;return[tOP_ASGN,'|'];}
else if(scanner.scan(/^\|/)){lex_state=EXPR_BEG;return["|",scanner.matched];}
else if(scanner.scan(/^\:/)){if(lex_state===EXPR_END||lex_state===EXPR_ENDARG||scanner.check(/^\s/)){if(!scanner.check(/^\w/)){return[':',scanner.matched];}
lex_state=EXPR_BEG;return[tSYMBEG,scanner.matched];}
lex_state=EXPR_FNAME;return[tSYMBEG,':'];}
else if(scanner.scan(/^\[/)){result=scanner.matched;if(lex_state==EXPR_FNAME||lex_state==EXPR_DOT){lex_state=EXPR_ARG
if(scanner.scan(/^\]\=/)){return[tASET,'[]='];}
else if(scanner.scan(/^\]/)){return[tAREF,'[]'];}
else{throw"error, unexpecrted '[]' token"}}
else if(lex_state==EXPR_BEG||lex_state==EXPR_MID||space_seen){return[tLBRACK,scanner.matched]}
return['[',scanner.matched]}
else if(scanner.scan(/^\{/)){var result;if([EXPR_END,EXPR_CMDARG].indexOf(lex_state)!==-1){result='{';}
else if(lex_state==EXPR_ENDARG){result=tLBRACE_ARG;}
else{result=tLBRACE;}
return[result,scanner.matched];}
else if(scanner.scan(/^\]/)){lex_state=EXPR_END;return[']',scanner.matched];}
else if(scanner.scan(/^\;/)){lex_state=EXPR_BEG;return[tSEMI,';'];}
else if(scanner.scan(/^\(/)){var result='(';if(lex_state==EXPR_BEG||lex_state==EXPR_MID){result=tLPAREN;}
else if(space_seen){if(lex_state==EXPR_CMDARG){result=tLPAREN_ARG;}
else if(lex_state==EXPR_ARG){result=tLPAREN2;}}
lex_state=EXPR_BEG;return[result,scanner.matched];}
else if(scanner.scan(/^\)/)){lex_state=EXPR_END;return[')',scanner.matched];}
else if(scanner.scan(/^\}/)){lex_state=EXPR_END;if(current_string_parse()){current_string_parse().content=true}
return['}',scanner.matched];}
else if(scanner.scan(/^\./)){lex_state=EXPR_DOT;return['.',scanner.matched];}
else if(scanner.scan(/^\,/)){lex_state=EXPR_BEG;return[',',scanner.matched];}
else if(scanner.scan(/^\@\@\w*/)){lex_state=EXPR_END;return[tCVAR,scanner.matched];}
else if(scanner.scan(/^\@\w*/)){lex_state=EXPR_END;return[tIVAR,scanner.matched];}
else if(scanner.scan(/^\=\>/)){lex_state=EXPR_BEG;return[tASSOC,scanner.matched];}
else if(scanner.scan(/^\=/)){lex_state=EXPR_BEG;return['=',scanner.matched];}
else if(scanner.scan(/^\w+[\?\!]?/)){switch(scanner.matched){case'def':lex_state=EXPR_FNAME;return[kDEF,scanner.matched];case'end':lex_state=EXPR_END;return[kEND,scanner.matched];case'class':console.log(lex_state);if(lex_state==EXPR_DOT||lex_state==EXPR_FNAME){return[tIDENTIFIER,scanner.matched];}
lex_state=EXPR_CLASS;return[kCLASS,scanner.matched];case'module':lex_state=EXPR_BEG;return[kMODULE,scanner.matched];case'do':if(lex_state==EXPR_ENDARG){lex_state=EXPR_BEG;return[kDO_BLOCK,scanner.matched];}
return[kDO,scanner.matched];case'if':if(lex_state==EXPR_BEG){return[kIF,scanner.matched];}
lex_state=EXPR_BEG;return[kIF_MOD,scanner.matched];case'then':return[kTHEN,scanner.matched];case'else':return[kELSE,scanner.matched];case'elsif':return[kELSIF,scanner.matched];case'unless':if(lex_state==EXPR_BEG){return[kUNLESS,scanner.matched];}
lex_state=EXPR_BEG;return[kUNLESS_MOD,scanner.matched];case'self':if(lex_state!=EXPR_FNAME){lex_state=EXPR_END;}
return[kSELF,scanner.matched];case'super':lex_state=EXPR_ARG;return[kSUPER,scanner.matched];case'true':lex_state=EXPR_END;return[kTRUE,scanner.matched];case'false':lex_state=EXPR_END;return[kFALSE,scanner.matched];case'nil':lex_state=EXPR_END;return[kNIL,scanner.matched];case'return':lex_state=EXPR_MID;return[kRETURN,scanner.matched];case'case':lex_state=EXPR_BEG;return[kCASE,scanner.matched];case'when':lex_state=EXPR_BEG;return[kWHEN,scanner.matched];case'yield':lex_state=EXPR_ARG;return[kYIELD,scanner.matched];}
var matched=scanner.matched;if((scanner.peek(2)!='::')&&(scanner.scan(/^\:/))){return[tLABEL,matched+scanner.matched];}
if(lex_state==EXPR_FNAME){if(scanner.scan(/^=(?:(?![~>=])|(?==>))/)){lex_state=EXPR_END;return[tIDENTIFIER,matched+scanner.matched];}}
if([EXPR_BEG,EXPR_DOT,EXPR_MID,EXPR_ARG,EXPR_CMDARG].indexOf(lex_state)!==-1){lex_state=EXPR_CMDARG;}
else{lex_state=EXPR_END;}
return[matched.match(/^[A-Z]/)?tCONSTANT:tIDENTIFIER,matched];}
else{return[false,false];}}};var iseq_current=null;var iseq_stack=[];function iseq_stack_push(type){iseq_current=new Iseq(type);iseq_stack.push(iseq_current);return iseq_current;};function iseq_stack_pop(){var iseq=iseq_current;iseq_stack.pop();iseq_current=iseq_stack[iseq_stack.length-1];iseq.finalize();return iseq.toString();};function write(opcode){iseq_current.write(opcode);};function write_label(label){iseq_current.write_label(label);};function generate_tree(tree){var top_iseq=iseq_stack_push(ISEQ_TYPE_TOP);for(var i=0;i<tree.length;i++){generate_stmt(tree[i],{full_stmt:true,last_stmt:false});}
return iseq_stack_pop();};function generate_stmt(stmt,context){switch(stmt.type){case kCLASS:generate_class(stmt,context);break;case kMODULE:generate_module(stmt,context);break;case kDEF:generate_def(stmt,context);break;case tCALL:generate_call(stmt,context);break;case tSYMBEG:generate_symbol(stmt,context);break;case tCONSTANT:generate_constant(stmt,context);break;case tIDENTIFIER:generate_identifier(stmt,context);break;case tIVAR:generate_ivar(stmt,context);break;case tINTEGER:generate_integer(stmt,context);break;case tSTRING_BEG:generate_string(stmt,context);break;case kSELF:generate_self(stmt,context);break;case kIF:generate_if(stmt,context);break;case'=':generate_assign(stmt,context);break;case kFALSE:generate_false(stmt,context);break;case kTRUE:generate_true(stmt,context);break;case tLBRACE:generate_assoc_list(stmt,context);break;case tLBRACK:generate_array(stmt,context);break;default:console.log("unknown generate_stmt type: "+stmt.type+", "+stmt.value);}};function generate_ivar(stmt,context){if(context.full_stmt&&context.last_stmt)write("return ");write('vm_ivarget($,"'+stmt.value+'")');if(context.full_stmt)write(";");};function generate_assoc_list(list,context){for(var i=0;i<list.$keys.length;i++){generate_stmt(list.$keys[i],{});generate_stmt(list.$values[i],{});}
write([iNEWHASH,list.$keys.length*2]);};function generate_array(stmt,context){write("[");if(stmt.$values){var i;for(i=0;i<stmt.$values.length;i++){if(i>0)write(",");generate_stmt(stmt.$values[i],{full_stmt:false,last_stmt:false});}}
write("]");}
function generate_assign(stmt,context){if(context.last_stmt&&context.full_stmt)write("return ");if(stmt.$lhs.type==tIDENTIFIER){var local=iseq_current.lookup_local(stmt.$lhs.value);if(local===null){local=iseq_current.push_local_name(stmt.$lhs.value);}
write(local+"=");generate_stmt(stmt.$rhs,{});}
else{rb_raise(rb_eSyntaxError,"unsupported lhs, for now");}
if(context.full_stmt)write(";");}
function generate_if(stmt,context){generate_stmt(stmt.$expr,{instance:context.instance,full_stmt:false,last_stmt:false});var jmp_label=iseq_jump_idx();iseq_opcode_push([iBRANCHUNLESS,jmp_label]);if(stmt.$stmts){var i,s=stmt.$stmts;for(i=0;i<s.length;i++){generate_stmt(s[i],{instance:context.instance,full_stmt:true,last_stmt:false});}}
iseq_opcode_push(jmp_label);}
function generate_false(stmt,context){iseq_opcode_push([iPUTOBJECT,false]);if(context.last_stmt&&context.full_stmt){iseq_opcode_push([iLEAVE]);}}
function generate_true(stmt,context){iseq_opcode_push([iPUTOBJECT,true]);if(context.last_stmt&&context.full_stmt){iseq_opcode_push([iLEAVE]);}}
function generate_self(stmt,context){if(context.last_stmt&&context.full_stmt)write("return ");write("$");if(context.full_stmt)write(";");}
function generate_string(stmt,context){if(context.last_stmt&&context.full_stmt)write("return ");write('"'+stmt.$parts[0].value+'"');if(context.full_stmt)write(";");}
function generate_integer(stmt,context){if(context.last_stmt&&context.full_stmt)write("return ");write(stmt.value);if(context.full_stmt)write(";");}
function generate_constant(stmt,context){if(context.last_stmt&&context.full_stmt)write("return ");write("vm_getconstant($,'"+stmt.value+"')");if(context.full_stmt)write(";");}
function generate_identifier(identifier,context){if(context.last_stmt&&context.full_stmt)write("return ");var local=iseq_current.lookup_local(identifier.value);if(local){write(local);}
else{write("vm_send($,'"+identifier.value+"',[],nil,8)");}
if(context.full_stmt)write(";");};function generate_symbol(sym,context){if(context.last_stmt&&context.full_stmt)write("return ");write('ID2SYM("'+sym.$name.value+'")');if(context.full_stmt)write(";");};function generate_call(call,context){var call_bit;if(context.last_stmt&&context.full_stmt)write("return ");write("vm_send(");if(call.$recv){call_bit=0;generate_stmt(call.$recv,{full_stmt:false,last_stmt:false});}
else{call_bit=8;write("$");}
write(',"'+call.$meth+'",');write("[")
if(call.$call_args&&call.$call_args.args){var args=call.$call_args.args;for(var i=0;i<args.length;i++){if(i>0)write(",");generate_stmt(args[i],{});}}
write("],");if(call.$brace_block){var current_iseq=iseq_current;var block_iseq=iseq_stack_push(ISEQ_TYPE_BLOCK);block_iseq.set_parent_iseq(current_iseq);if(call.$brace_block.$args){for(var i=0;i<call.$brace_block.$args.length;i++){block_iseq.push_arg_name(call.$brace_block.$args[i].value);}}
for(var i=0;i<call.$brace_block.$stmts.length;i++){generate_stmt(call.$brace_block.$stmts[i],{full_stmt:true,last_stmt:(i===call.$brace_block.$stmts.length-1)});}
iseq_stack_pop();write(block_iseq.toString());}
else{write("nil");}
write(",");write(call_bit);write(")");if(context.full_stmt)write(";");return;var block_iseq,call_bit,arg_length;if(false){}
else{block_iseq=nil;}
if(call.$recv){call_bit=0;generate_stmt(call.$recv,{full_stmt:false,last_stmt:false});}
else{call_bit=8;write([iPUTNIL]);}
if(call.$call_args&&call.$call_args.args){arg_length=call.$call_args.args.length;var args=call.$call_args.args;for(var i=0;i<args.length;i++){generate_stmt(args[i],{});}}
else{arg_length=0;}
write([iSEND,call.$meth,arg_length,block_iseq,call_bit,nil]);};function generate_def(definition,context){if(context.full_stmt&&context.last_stmt)write("return ");var is_singleton=definition.$sname?1:0;var current_iseq=iseq_current;var def_iseq=iseq_stack_push(ISEQ_TYPE_METHOD);def_iseq.set_parent_iseq(current_iseq);def_iseq.set_method_id(definition.$fname.value);for(var i=0;i<definition.$stmts.length;i++){generate_stmt(definition.$stmts[i],{full_stmt:true,last_stmt:(definition.$stmts.length-1===i)});}
iseq_stack_pop();write("vm_definemethod(");if(is_singleton){generate_stmt(definition.$sname,{});}
else{write("$");}
write(",'"+definition.$fname.value+"',"+def_iseq.toString()+",");write(""+is_singleton+","+0+")");if(context.full_stmt)write(";");};function generate_class(cls,context){if(context.last_stmt&&context.full_stmt)write("return ");var current_iseq=iseq_current;var class_iseq=iseq_stack_push(ISEQ_TYPE_CLASS);class_iseq.set_parent_iseq(current_iseq);if(stmt.$stmts){for(var i=0;i<cls.$stmts.length;i++){generate_stmt(cls.$stmts[i],{full_stmt:true,last_stmt:(i===cls.$stmts.length-1)});}}
else{write("return nil;");}
iseq_stack_pop();write("vm_defineclass($,");write("nil");console.log(cls);write(",'"+cls.$kname.value+"',"+class_iseq.toString()+",0)");if(context.full_stmt)write(";");};function generate_module(mod,context){write("(function(self) {\n");push_nametable();current_self_push("self");if(mod.$stmts){var i,m=mod.$stmts;for(i=0;i<m.length;i++){generate_stmt(m[i],{instance:false,full_stmt:false,last_stmt:(m[m.length-1]==m[i]?true:false),nested:true});}}
pop_nametable();current_self_pop();write("})(");if(context.top_level){write("rb_define_module('");write(mod.$kname.value);write("'));\n");}
else{write("rb_define_module_under("+current_self()+",'");write(mod.$kname.value);write("'));\n")}}
this.parse=function(){scanner=new vn_ruby_string_scanner(str);next_token();var s=stmts();return generate_tree(s);}
this.contexts=function(){return contexts;}
return this;};function Iseq(type){this.type=type;this.locals={};this.args={};this.norm_arg_names=[];this.opt_arg_names=[];this.rest_arg_names=[];this.post_arg_names=[];this.block_arg_name=nil;this.local_current="a";this.code=[];this.method_id=null;return this;};Iseq.prototype={push_local_name:function(name){var id=this.local_current;this.local_current=String.fromCharCode(this.local_current.charCodeAt(0)+1);this.locals[name]="_"+id;return"_"+id;},lookup_local:function(name){if(name===null||name===undefined)return null;if(this.locals[name])return this.locals[name];if(this.args[name])return this.args[name];if(this.block_arg_name===name)return"_";return null;},set_method_id:function(method_id){this.method_id=method_id;},push_arg_name:function(arg_name){var id=this.local_current;this.local_current=String.fromCharCode(this.local_current.charCodeAt(0)+1);this.args[arg_name]="_"+id;this.norm_arg_names.push(arg_name);return"_"+id;},set_parent_iseq:function(parent_iseq){},finalize:function(){},write:function(str){this.code.push(str);},toString:function(){var r=[];switch(this.type){case ISEQ_TYPE_TOP:r.push("function($){");r.push("var _ = nil;");if(this.locals.length>0){r.push("var ");for(var i=0;i<this.locals.length;i++){if(i!=0)r.push(",");r.push(this.locals[i]);}
r.push(";");}
r.push(this.code.join(""));r.push("}");break;case ISEQ_TYPE_CLASS:r.push("function($){");r.push(this.code.join(""));r.push("}");break;case ISEQ_TYPE_METHOD:this.deal_with_method_args(r);r.push(this.code.join(""));r.push("}");break;case ISEQ_TYPE_BLOCK:r.push("function($$,__,ID");for(var i=0;i<this.norm_arg_names.length;i++){r.push(",");r.push(this.args[this.norm_arg_names[i]]);}
r.push("){")
r.push("with({$:($$==nil?$:$$),_:(__==nil?_:__)}){");r.push(this.code.join(""));r.push("}");r.push("}");break;default:throw"unknown iseq type in parse.js"}
return r.join("");},deal_with_method_args:function(r){r.push("function($,id,_");r.push("){");}};var vn_ruby_string_scanner=function(str){this.str=str;this.at=0;this.matched="";this.working_string=str;};vn_ruby_string_scanner.prototype.scan=function(reg){var res=reg.exec(this.working_string);if(res==null){return false;}
else if(typeof res=="object"){this.at+=res[0].length;this.working_string=this.working_string.substr(res[0].length);this.matched=res[0];return res;}
else if(typeof res=="string"){this.at+=res.length;this.working_string=this.working_string.substr(res.length);return res;}
return false;};vn_ruby_string_scanner.prototype.check=function(reg){var res=reg.exec(this.working_string);return res;};vn_ruby_string_scanner.prototype.matched=function(){};vn_ruby_string_scanner.prototype.peek=function(len){return this.working_string.substr(0,len);};
var rb_cProc,rb_eLocalJumpError;function rb_js_func_to_proc(func){return function($){var args=Array.prototype.slice.call(arguments,1);return func.apply($,args);};};function rb_proc_to_proc(proc){return proc;};function rb_proc_call(proc,id,_){var args=Array.prototype.slice.call(arguments,3);args.unshift(nil);args.unshift(nil);args.unshift(nil);try{return proc.apply(proc,args);}
catch(e){console.log("trying to catch an error "+e);if(e.klass===rb_eLocalJumpError){if(e.iv_tbl.type==="return"){console.log("WOWOW!!! caught it!");return e.iv_tbl.args;}}
throw e}};function rb_proc_s_new(cls,id,_){if(_==nil)throw"Proc#new no block given"
return _;};function rb_proc_lambda(cls,id,_){if(_==nil)throw"#lambda no block given"
return _;};function rb_obj_define_method(obj){var klass=rb_singleton_class(obj);return rb_mod_define_method(obj);};function rb_mod_define_method(obj,id,_,sym){var id;if(_==nil)throw"#define_method no block given"
if(sym.klass==rb_cString){id=sym;}
else if(sym.klass==rb_cSymbol){id=sym.ptr;}
else{throw"#define_method expects a sym for name"}
return rb_define_method(obj,id,_,-1);};function Init_Proc(){rb_cProc=rb_define_class("Proc",rb_cObject);Function.prototype.klass=rb_cProc;Function.prototype.flags=T_OBJECT|T_PROC;rb_define_singleton_method(rb_cProc,"new",rb_proc_s_new,0);rb_define_method(rb_cProc,"===",rb_proc_call,-1);rb_define_method(rb_cProc,"yield",rb_proc_call,-1);rb_define_method(rb_cProc,"call",rb_proc_call,-1);rb_define_method(rb_cProc,"[]",rb_proc_call,-1);rb_define_method(rb_cProc,"to_proc",rb_proc_to_proc,0);rb_define_method(rb_mKernel,"lambda",rb_proc_lambda,0);rb_define_method(rb_mKernel,"proc",rb_proc_s_new,0);rb_define_method(rb_mKernel,"define_singleton_method",rb_obj_define_method,-1);rb_define_method(rb_cModule,"define_method",rb_mod_define_method,-1);rb_eLocalJumpError=rb_define_class("LocalJumpError",rb_eStandardError);};
var rb_cRange;var RRange=function(beg,end,exc){this.hash=opal_yield_hash();this.klass=rb_cRange;this.flags=T_OBJECT;this.iv_tbl={};this.beg=beg;this.end=end;this.exc=RTEST(exc);return this;};function rb_range_initialize(range,id,_,beg,end,exc){range.beg=beg;range.end=end;range.exc=RTEST(exc);};function rb_range_eqq(range,id,_,other){if(other.klass!==rb_cNumber&&other.klass!==rb_cString){rb_raise(rb_eArgError,"bad value for range");}
var beg=range.beg;var end=range.exc?range.end:range.end-1;if(other>=beg&&other<=end)return true;return false;};function rb_range_eq(range,id,_,other){if(other.klass!==rb_cRange)return false;if(range.beg!==other.beg)return false;if(range.end!==other.end)return false;if(range.exc!==range.exc)return false;return true;};function rb_range_first(range){return range.beg;};function rb_range_last(range){return range.end;};function rb_range_to_a(range){var res=[],end;if(range.beg.klass==rb_cString){end=range.exc?range.end.charCodeAt(0)-1:range.end.charCodeAt(0);for(var i=range.beg.charCodeAt(0);i<=end;i++){res.push(String.fromCharCode(i));}}
if(range.beg.klass==rb_cNumber){end=range.exc?range.end-1:range.end;for(var i=range.beg;i<=end;i++){res.push(i);}}
return res;};function rb_range_to_s(range){return range.beg+(range.exc?"..":"...")+range.end;};function rb_range_inspect(range){return vm_send(range.beg,"inspect",[],nil,8)+(range.exc?"..":"...")+vm_send(range.end,"inspect",[],nil,8);};function rb_range_exclude_end_p(range){return!range.exc;};function Init_Range(){rb_cRange=rb_define_class("Range",rb_cObject);rb_define_method(rb_cRange,"initialize",rb_range_initialize,-1);rb_define_method(rb_cRange,"==",rb_range_eq,1);rb_define_method(rb_cRange,"===",rb_range_eqq,1);rb_define_method(rb_cRange,"first",rb_range_first,-1);rb_define_method(rb_cRange,"last",rb_range_last,-1);rb_define_method(rb_cRange,"to_s",rb_range_to_s,0);rb_define_method(rb_cRange,"inspect",rb_range_inspect,0);rb_define_method(rb_cRange,"to_a",rb_range_to_a,0);rb_define_method(rb_cRange,"exclude_end?",rb_range_exclude_end_p,0);}
var rb_cRegexp,rb_eRegexpError,rb_cMatch;function rb_reg_match_m(reg,str){var m=reg.exec(str);if(m==null)return nil;return rb_match_new(rb_cMatch,m);};function rb_match_new(match,data){var o=rb_obj_alloc(match);o.iv_tbl.data=data;return o;};function rb_match_inspect(match){return'#<MatchData "'+match.iv_tbl.data[0]+'">';};function rb_match_to_s(match){return match.iv_tbl.data[0];};function rb_match_size(match){return match.iv_tbl.data[0];};function rb_match_aref(match,idx){return match.iv_tbl.data[idx];};function rb_reg_eqq(reg,id,_,str){var m=reg.exec(str);if(m==null)return false;return true;};function Init_Regexp(){rb_cRegexp=rb_define_class("Regexp",rb_cObject);RegExp.prototype.klass=rb_cRegexp;rb_define_method(rb_cRegexp,"===",rb_reg_eqq,1);rb_define_method(rb_cRegexp,"match",rb_reg_match_m,-1);rb_cMatch=rb_define_class("MatchData",rb_cObject);rb_define_singleton_method(rb_cMatch,"new",rb_match_new,1);rb_define_method(rb_cMatch,"size",rb_match_size,0);rb_define_method(rb_cMatch,"length",rb_match_size,0);rb_define_method(rb_cMatch,"[]",rb_match_aref,-1);rb_define_method(rb_cMatch,"to_s",rb_match_to_s,0);rb_define_method(rb_cMatch,"inspect",rb_match_inspect,0);};
String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,'');};var rb_cString,rb_cSymbol;var RSymbol=function(ptr){this.hash=opal_yield_hash();this.flags=T_OBJECT|T_SYMBOL;this.klass=rb_cSymbol;this.toString=function(){return"#<Symbol:0x000000 @ptr=\""+this.ptr+"\">";};this.ptr=ptr;return this;};var rb_sym_table={};function ID2SYM(id){if(rb_sym_table.hasOwnProperty(id)){return rb_sym_table[id];}
var sym=new RSymbol(id);rb_sym_table[id]=sym
return sym;};function Init_String(){rb_cString=rb_define_class("String",rb_cObject);String.prototype.klass=rb_cString;String.prototype.flags=T_OBJECT|T_STRING;rb_include_module(rb_cString,rb_mComparable);rb_cSymbol=rb_define_class("Symbol",rb_cObject);rb_include_module(rb_cSymbol,rb_mComparable);};
var rb_cTime;function rb_time_init(time){time.native=new Date();};function rb_time_to_s(time){return time.native.toString();};function rb_time_minus(a,id,_,b){return a.native-b.native;};function Init_Time(){rb_cTime=rb_define_class("Time",rb_cObject);rb_include_module(rb_cTime,rb_mComparable);rb_define_singleton_method(rb_cTime,"now",rb_class_new_instance,-1);rb_define_method(rb_cTime,"initialize",rb_time_init,0);rb_define_method(rb_cTime,"to_s",rb_time_to_s,0);rb_define_method(rb_cTime,"inspect",rb_time_to_s,0);rb_define_method(rb_cTime,"-",rb_time_minus,1);};
function rb_ivar_set(obj,id,val){obj.iv_tbl[id]=val;return val;};function rb_ivar_get(obj,id){if(obj.iv_tbl.hasOwnProperty(id)){return obj.iv_tbl[id];}
return nil;}
function rb_const_set(k,id,val){return rb_mod_av_set(k,id,val,true);}
function rb_mod_av_set(k,id,val,isconst){return k.iv_tbl[id]=val;}
function rb_const_set(k,id,val){return k.iv_tbl[id]=val;}
function rb_const_get(k,id){var v,t=k;while(t){if(v=t.iv_tbl[id])return v;t=t.sup;}
t=k.parent;while(t){if(v=t.iv_tbl[id])return v;t=t.parent;}
console.log("raising name error for "+id);rb_raise(rb_eNameError,"uninitialized constant "+id+" in "+k.iv_tbl.__classid__);return nil;}
function rb_const_get_full(k,id){var v,t=k;while(t){if(v=t.iv_tbl[id])return v;t=t.sup;}
t=k.parent;while(t){if(v=t.iv_tbl[id])return v;t=t.parent;}
console.log("raising name error for "+id);throw"NameError: uninitialized constant "+id+" in "+k.name
return nil;}
function rb_const_defined(k,id){var v,t=k;while(t){if(v=t.iv_tbl[id])return true;t=t.sup;}
return false;}
function rb_const_defined_full(k,id){var v,t=k;while(t){if(v=t.iv_tbl[id])return true;t=t.sup;}
t=k.parent;while(t){if(v=t.iv_tbl[id])return true;t=t.parent;}
return false;}
function rb_const_defined_at(k,id){return(k.iv_tbl[id])?true:false;}
function rb_const_get_at(k,id){return(k.iv_tbl[id])?k.iv_tbl[id]:nil;}
function Init_VM(){};var opal_top_self;function opal_main_to_s(){return"main";};function opal_main_include(top,id,_,inc){return rb_include_module(rb_cObject,inc);};function Init_top_self(){opal_top_self=new RObject();opal_top_self.klass=rb_cObject;FL_SET(opal_top_self,T_OBJECT);rb_define_singleton_method(opal_top_self,"to_s",opal_main_to_s,0);rb_define_singleton_method(opal_top_self,"inspect",opal_main_to_s,0);rb_define_singleton_method(opal_top_self,"include",opal_main_include,1);};function rb_method_missing(recv,id,_,mid,args){var obj_type;if(recv.flags&T_OBJECT)obj_type=":Object";else if(recv.flags&T_CLASS)obj_type=":Class";else if(recv.flags&T_MODULE)obj_type=":Module";else obj_type="";return rb_raise(rb_eNameError,"undefined method `"+mid.ptr+"` for "+rb_funcall(recv,"inspect")+obj_type);};function rb_vm_eval_str(obj,str){var parser=vn_parser("<main>",str);var iseq=parser.parse();console.log(iseq);if(window.execScript){window.execScript("window.opal_tmp_func = "+iseq+";");return window.opal_tmp_func(obj);}
else{with(window){return eval("("+iseq+")")(obj);}}};function Init_vm_eval(){rb_define_private_method(rb_cBasicObject,"method_missing",rb_method_missing,-1);rb_define_method(rb_mKernel,"eval",rb_vm_eval_str,1);};function rb_search_method(klass,id){var f,k=klass;while(!(f=k.m_tbl[id])){k=k.sup;if(!k)return undefined;}
return f;};function rb_super(recv,id,func){var args=Array.prototype.slice.call(arguments,3);if(recv===null||recv===undefined)recv=nil;var body=rb_search_super_method(recv.klass,id,func);if(!body){return rb_raise(rb_eNoMethodError,"super: no superclass method '"+id+"'");}
var imp=body.body,len=args.length;switch(len){case 0:return imp(recv,id,nil);case 1:return imp(recv,id,nil,args[0]);case 2:return imp(recv,id,nil,args[0],args[1]);case 3:return imp(recv,id,nil,args[0],args[1],args[2]);case 4:return imp(recv,id,nil,args[0],args[1],args[2],args[3]);case 5:return imp(recv,id,nil,args[0],args[1],args[2],args[3],args[4]);default:throw"currently unsupported argc length "+len}
return nil;};function rb_search_super_method(klass,id,func){var f,k=klass;while(!((f=k.m_tbl[id])&&f!=func)){if(!(k=k.sup))return undefined;}
if(!(k=k.sup))return undefined;while(!(f=k.m_tbl[id])){if(!(k=k.sup))return undefined;}
return f;};function rb_funcall(recv,id){var args=Array.prototype.slice.call(arguments,2);return rb_funcall2(recv,id,args);}
function rb_funcall2(recv,id,args){if(recv===null||recv===undefined)recv=nil;var body=rb_search_method(recv.klass,id);if(!body){args.unshift(ID2SYM(id));return rb_funcall2(recv,"method_missing",args);}
var imp=body.body,len=args.length;switch(len){case 0:return imp(recv,id,nil);case 1:return imp(recv,id,nil,args[0]);case 2:return imp(recv,id,nil,args[0],args[1]);case 3:return imp(recv,id,nil,args[0],args[1],args[2]);case 4:return imp(recv,id,nil,args[0],args[1],args[2],args[3]);case 5:return imp(recv,id,nil,args[0],args[1],args[2],args[3],args[4]);default:rb_raise(rb_eArgError,"currently unsupported argc length "+len);}};function rb_funcall3(recv,id,_,args){try{if(recv===null||recv===undefined)recv=nil;var body=rb_search_method(recv.klass,id);if(!body){args.unshift(ID2SYM(id));return rb_funcall2(recv,"method_missing",args);}
var imp=body.body,len=args.length;switch(len){case 0:return imp(recv,id,_);case 1:return imp(recv,id,_,args[0]);case 2:return imp(recv,id,_,args[0],args[1]);case 3:return imp(recv,id,_,args[0],args[1],args[2]);case 4:return imp(recv,id,_,args[0],args[1],args[2],args[3]);case 5:return imp(recv,id,_,args[0],args[1],args[2],args[3],args[4]);default:rb_raise(rb_eArgError,"currently unsupported argc length "+len);}}
catch(e){if(e.klass===rb_eLocalJumpError){if(e.iv_tbl.type==="return"){return e.iv_tbl.args;}
if(e.iv_tbl.type==="break"){if(_!==nil)return e.iv_tbl.args;}}
throw e}};function vm_defineclass(base,sup,id,body,type){var klass;switch(type){case 0:if(sup==nil)sup=rb_cObject;if(base.flags&T_OBJECT)base=rb_class_real(base.klass);if(rb_const_defined_at(base,id)){klass=rb_const_get_at(base,id);}
else{klass=rb_define_class_id(id,sup);rb_name_class(klass,id);rb_const_set(base,id,klass);klass.parent=base;}
break;case 1:klass=rb_singleton_class(base);break;case 2:if(base.flags&T_OBJECT)base=rb_class_real(base.klass);if(rb_const_defined_at(base,id)){klass=rb_const_get_at(base,id);}
else{klass=rb_define_module_id(id);rb_name_class(klass,id);rb_const_set(base,id,klass);klass.parent=base;}
break;default:throw"unknown vm_defineclass type: "+type}
return body(klass);};function vm_definemethod(base,id,body,is_singleton){if(is_singleton){return rb_define_method(rb_singleton_class(base),id,body);}
else{if(base.flags&T_OBJECT)base=base.klass;return rb_define_method(base,id,body);}};function vm_send(obj,id,args,block,flags){var r=rb_funcall3(obj,id,block,args);return r;};function vm_getconstant(base,id){if(base===undefined||base===null)base=nil;if(base.flags&T_OBJECT)base=rb_class_real(base.klass);return rb_const_get(base,id);};function vm_setconstant(base,id,val){if(base.flags&T_OBJECT)base=rb_class_real(base.klass);return rb_const_set(base,id,val);};function vm_newhash(){var ary=Array.prototype.slice.call(arguments),res=rb_hash_new();for(var i=0;i<ary.length;i+=2){res.set(ary[i],ary[i+1]);}
return res;};function vm_newrange(beg,end,inc){return new RRange(beg,end,inc);};function rb_break(args){rb_jump_raise(rb_eLocalJumpError,"break","unexpected break",args);};function rb_return(args){rb_jump_raise(rb_eLocalJumpError,"return","unexpected return",args);};function vm_yield(block,args){if(block==nil)rb_raise(rb_eArgError,"yield: no block given");args.unshift(nil);args.unshift(nil);args.unshift(nil);return block.apply(block,args);};function vm_ivarset(obj,id,val){return rb_ivar_set(obj,id,val);};function vm_ivarget(obj,id){return rb_ivar_get(obj,id);};function vm_optplus(a,b){if(typeof a=="number"&&typeof b=="number")return a+b;return vm_send(a,"+",[b],nil,8);};function vm_optminus(a,b){if(typeof a=="number"&&typeof b=="number")return a-b;return vm_send(a,"-",[b],nil,8);};function vm_optmult(a,b){if(typeof a=="number"&&typeof b=="number")return a*b;return vm_send(a,"*",[b],nil,8);};function vm_optdiv(a,b){if(typeof a=="number"&&typeof b=="number")return a/b;return vm_send(a,"/",[b],nil,8);};function vm_alias(cls,a,b){return rb_define_alias(cls.klass,a.ptr,b.ptr);};opal_boot_file(function($){var _ = nil;vm_defineclass($,nil,"Array",function($){vm_definemethod($,"to_a",function($,id,_){return $;},0,0);vm_definemethod($,"length",function($,id,_){return $.length;},0,0);vm_send($,"alias_method",[ID2SYM("size"),ID2SYM("length")],nil,8);vm_definemethod($,"each",function($,id,_){for (var i = 0; i < $.length; i++){vm_yield(_,[$[i]]);}return $;},0,0);vm_definemethod($,"include?",function($,id,_,_a){return $.indexOf(_a) != -1 ? true : false;},0,1);vm_definemethod($,"push",function($,id,_,_a){$.push(_a);return $;},0,1);vm_send($,"alias_method",[ID2SYM("<<"),ID2SYM("push")],nil,8);vm_definemethod($,"empty?",function($,id,_){return $.length == 0;},0,0);vm_definemethod($,"at",function($,id,_,_a){if (_a >= 0) {
      if (_a > $.length) return nil;
      return $[_a];
    }
    else {
      if (_a < -$.length) return nil;
      return $[$.length + _a];
    }},0,1);vm_definemethod($,"join",function($,id,_,_a){if(RTEST(vm_send(_a,"nil?",[],nil,0))){_a="";};return $.join(_a);},0,1);vm_definemethod($,"last",function($,id,_,_a){if ($.length == 0) {
      if (_a != undefined) {
        return [];
      }
      else {
        return nil;
      }
    }
    if (_a != undefined) {
      return $.slice($.length - _a, $.length);
    }
    return $[$.length - 1];},0,1);vm_definemethod($,"first",function($,id,_){return $[0];},0,0);vm_definemethod($,"collect",function($,id,_){var i, res = [];
    for (i = 0; i < $.length; i++) {
      res.push(vm_yield(_, [$[i]]));
    }
    return res;},0,0);vm_send($,"alias_method",[ID2SYM("map"),ID2SYM("collect")],nil,8);vm_definemethod($,"[]",function($,id,_,_a){return $[_a];},0,1);vm_definemethod($,"[]=",function($,id,_,_a,_b){return $[_a]=_b;},0,2);vm_definemethod($,"unshift",function($,id,_,_a){return $.unshift(_a);},0,1);vm_definemethod($,"==",function($,id,_,_a){if ($ === _a) return true;
    if (_a.klass !== rb_cArray) return false;
    if ($.length !== _a.length) return false;
    for (var i = 0; i < $.length; i++) {
      if (!rb_funcall($[i], "==", _a[i])) return false;
    }
    return true;},0,1);vm_definemethod($,"to_s",function($,id,_){var res = [];
    for (var i = 0; i < $.length; i++) {
      res.push(vm_send($[i], "to_s", [], nil, 0));
    }
    return res.join("");},0,0);vm_definemethod($,"inspect",function($,id,_){var res = ["["]
    for (var i = 0; i < $.length; i++) {
      if (i > 0) res.push(", ");
      res.push(vm_send($[i], "inspect", [], nil, 0));
    }
    res.push("]");
    return res.join("");},0,0);vm_definemethod($,"pop",function($,id,_,_a){if (_a === undefined) {
      return $.pop();
    }
    else if ($.length == 0) {
      return [];
    }
    else {
      var r = $.slice($.length - _a, $.length);
      $.splice($.length - _a, $.length);
      return r;
    }},0,1);vm_definemethod($,"select",function($,id,_){var res = [], v;
    for (var i = 0; i < $.length; i++) {
      v = vm_yield(_, [$[i]]);
      if (RTEST(v)) res.push($[i]);
    }
    return res;},0,0);return vm_definemethod($,"*",function($,id,_,_a){if (_a.klass == rb_cString) {
      return $.join(_a);
    }
    else {
      var res = [];
      for (var i = 0; i < _a; i++) {
        for (var j = 0; j < $.length; j++) {
          res.push(ary[j]);
        }
      }
      return res;
    }},0,1);},0);});opal_boot_file(function($){var _ = nil;vm_defineclass($,nil,"Hash",function($){vm_definemethod($,"[]=",function($,id,_,_a,_b){return $.set(_a,_b);},0,2);vm_definemethod($,"[]",function($,id,_,_a){return $.get(_a);},0,1);vm_definemethod($,"size",function($,id,_){return $.keys.length;},0,0);vm_send($,"alias_method",[ID2SYM("length"),ID2SYM("size")],nil,8);vm_definemethod($,"include?",function($,id,_,_a){return $.hasKey(_a);},0,1);vm_send($,"alias_method",[ID2SYM("member?"),ID2SYM("include?")],nil,8);vm_send($,"alias_method",[ID2SYM("has_key?"),ID2SYM("include?")],nil,8);vm_send($,"alias_method",[ID2SYM("key?"),ID2SYM("include?")],nil,8);vm_definemethod($,"delete",function($,id,_,_a){$.keys.splice($.keys.indexOf(_a), 1);
    var r = $.dict[_a];
    delete $.dict[_a];
    return r;},0,1);return vm_definemethod($,"==",function($,id,_,_a){if ($ === _a) return true;
    if (_a.klass != rb_cHash) return false;
    if ($.keys.length != _a.keys.length) return false;
    for (var i = 0; i < $.keys.length; i++) {
      var k = $.keys[i];
      var v = $.get(k);
      if(!vm_send(v,"==",[_a.get(_a.keys[i])],nil,0)) return false;
    }
    return true;},0,1);},0);});opal_boot_file(function($){var _ = nil;vm_defineclass($,nil,"Kernel",function($){vm_definemethod($,"nil?",function($,id,_){return false;},0,0);return vm_definemethod($,"===",function($,id,_,_a){return vm_send($,"==",[_a],nil,0);},0,1);},2);});opal_boot_file(function($){var _ = nil;vm_defineclass($,nil,"NilClass",function($){vm_definemethod($,"to_s",function($,id,_){return "";},0,0);vm_definemethod($,"inspect",function($,id,_){return "nil";},0,0);vm_definemethod($,"&",function($,id,_,_a){return false;},0,1);vm_definemethod($,"|",function($,id,_,_a){return RTEST(_a)? true : false;},0,1);vm_definemethod($,"^",function($,id,_,_a){return RTEST(_a)? true : false;},0,1);vm_definemethod($,"to_a",function($,id,_){return [];},0,0);vm_definemethod($,"to_f",function($,id,_){return 0.0;},0,0);vm_definemethod($,"to_i",function($,id,_){return 0;},0,0);vm_definemethod($,"==",function($,id,_,_a){return (_a === nil || _a === null || _a === undefined);},0,1);return vm_definemethod($,"nil?",function($,id,_){return true;},0,0);},0);});opal_boot_file(function($){var _ = nil;vm_defineclass($,nil,"String",function($){vm_definemethod($,"==",function($,id,_,_a){return $===_a;},0,1);vm_definemethod($,"eql?",function($,id,_,_a){return $===_a;},0,1);vm_definemethod($,"empty?",function($,id,_){return $.length==0;},0,0);vm_definemethod($,"reverse",function($,id,_){return $.split("").reverse().join("");},0,0);vm_definemethod($,"intern",function($,id,_){return ID2SYM($);},0,0);vm_send($,"alias_method",[ID2SYM("to_sym"),ID2SYM("intern")],nil,8);vm_definemethod($,"length",function($,id,_){return $.length;},0,0);vm_send($,"alias_method",[ID2SYM("size"),ID2SYM("length")],nil,8);vm_definemethod($,"+",function($,id,_,_a){return $+_a;},0,1);vm_definemethod($,"to_s",function($,id,_){return new String($);},0,0);vm_send($,"alias_method",[ID2SYM("to_str"),ID2SYM("to_s")],nil,8);vm_definemethod($,"inspect",function($,id,_){return '"'+$+'"';},0,0);vm_definemethod($,"upcase",function($,id,_){return $.toUpperCase();},0,0);vm_definemethod($,"downcase",function($,id,_){return $.toLowerCase();},0,0);vm_definemethod($,"capitalize",function($,id,_){return $[0].toUpperCase() + $.substr(1).toLowerCase();},0,0);vm_definemethod($,"*",function($,id,_,_a){var res=[];
    for(var i=0;i<_a;i++){res.push($);}
    return res.join("");},0,1);vm_definemethod($,"each",function($,id,_){return vm_send($,"raise",[["String","#each not yet implemented"].join('')],nil,8);},0,0);return vm_send($,"alias_method",[ID2SYM("each_line"),ID2SYM("each")],nil,8);},0);});opal_boot_file(function($){var _ = nil;vm_defineclass($,nil,"Symbol",function($){vm_definemethod($,"==",function($,id,_,_a){return ($===_a)?true:false;},0,1);vm_definemethod($,"inspect",function($,id,_){return ":" + $.ptr;},0,0);vm_definemethod($,"to_s",function($,id,_){return $.ptr;},0,0);vm_send($,"alias_method",[ID2SYM("id2name"),ID2SYM("to_s")],nil,8);vm_definemethod($,"to_sym",function($,id,_){return $;},0,0);vm_send($,"alias_method",[ID2SYM("intern"),ID2SYM("to_sym")],nil,8);vm_definemethod($,"to_proc",function($,id,_){var id = $.ptr;
    var f = function($$, id, _, o) {
      var args = Array.prototype.slice.call(arguments, 3);
      return vm_send(o, id, args, nil, 8);
    };
    return f;},0,0);vm_definemethod($,"succ",function($,id,_){return $;},0,0);vm_send($,"alias_method",[ID2SYM("next"),ID2SYM("succ")],nil,8);vm_definemethod($,"length",function($,id,_){return $.ptr.length;},0,0);vm_send($,"alias_method",[ID2SYM("size"),ID2SYM("length")],nil,8);vm_definemethod($,"upcase",function($,id,_){return ID2SYM($.ptr.toUpperCase());},0,0);vm_definemethod($,"downcase",function($,id,_){return ID2SYM($.ptr.toLowerCase());},0,0);return vm_definemethod($,"capitalize",function($,id,_){return ID2SYM($.ptr[0].toUpperCase() + $.ptr.substr(1).toLowerCase());},0,0);},0);});
var opal_cAjax;var opal_jsonp_prefix="opal_jsonp_";var opal_jsonp_counter=0;var opal_ajax_k_data_types=['xml','html','script','json','jsonp','text'];function opal_ajax_request(ajax,url,options){var _=opal_block;opal_block=nil;var data_type;if(rb_hash_has_key(options,ID2SYM('data_type'))){data_type=rb_hash_delete(options,ID2SYM('data_type'));if(opal_ajax_k_data_types.indexOf(data_type)==-1){throw data_type+" is a bad data type for Ajax#request"}}
else{}
switch(data_type){case'jsonp':var callback=opal_jsonp_prefix+(opal_jsonp_counter++);url+="?callback="+callback;window[callback]=function(r){if(_!==nil){vm_yield(_,[opal_json_2_ruby_json(r)]);}};var script=document.createElement("script");script.setAttribute("src",url);script.setAttribute("type","text/javascript");document.body.appendChild(script);break;default:throw"unimplemented datatype for ajax#request"}};function opal_ajax_s_get(ajax,url,options){return opal_ajax_request(ajax,url,options);};function Init_Ajax(){opal_cAjax=rb_define_class("Ajax",rb_cObject);rb_define_singleton_method(opal_cAjax,"get",opal_ajax_s_get,1);};
function opal_define_file(name,body){vn_fs_define_file(name,body);};function opal_boot_file(file){opal_boot_files.push(file);};function opal_browser_main(name){ruby_init();opal_browser_init();ruby_script("embedded");ruby_init_loadpath();ruby_incpush("");ruby_incpush("vendor/");rb_loadpath(name);};function opal_require_main(file_name){file_name=file_name+"?"+Math.floor(Math.random()*1000);ruby_init();opal_browser_init();ruby_script("embedded");ruby_init_loadpath();ruby_incpush("");var http=opal_http_request_new();http.open("GET",file_name,true);http.onreadystatechange=function(){if(http.readyState==4){rb_vm_eval_str(opal_top_self,http.responseText);}};http.send(null);};function opal_run_tags(){ruby_init();opal_browser_init();ruby_script("embedded");ruby_init_loadpath();ruby_incpush("");var src_contents={};var src_filenames=[];opal_document_ready_q(opal_oDocument,nil,function(){var tags=document.getElementsByTagName("script");for(var i=0;i<tags.length;i++){if(tags[i].type==="text/ruby"){if(tags[i].src){console.log(tags[i].src+" text");console.log(tags[i].innerText);src_filenames.push(tags[i].src);var http=opal_http_request_new();http.open("GET",tags[i].src,false);http.onreadystatechange=function(){if(http.readyState==4){src_contents[tags[i].src]=http.responseText;}};http.send(null);}
else{var filename="inline_"+src_filesnames.length;src_filesnames.push(filename);src_contents[filename]=tags[i].text;}}}});};function opal_browser_init(){Init_Ajax();};function opal_require(path){opal_require_main(path);};opal_boot_file(function($){var _ = nil;vm_defineclass($,nil,"Document",function($){var _a,_c;_a=vm_send(vm_getconstant($,"Proc"),"new",[],function($$,__,ID){with({$:($$==nil?$:$$),_:(__==nil?_:__)}){vm_ivarset($,"@ready",true);return vm_send(vm_ivarget($, '@ready_blocks'),"each",[],function($$,__,ID,_b){with({$:($$==nil?$:$$),_:(__==nil?_:__)}){return vm_send(_b,"call",[],nil,0);}},0);}},0);_c=function() { vm_send(_a,"call",[],nil,0) };;if (window.addEventListener) {window.addEventListener('load', _c, false);}else {window.attachEvent('onload', _c);}vm_ivarset($,"@ready",false);vm_ivarset($,"@ready_blocks",[]);vm_definemethod($,"ready?",function($,id,_){(function(){if(RTEST(((_ == nil) ? false : true))){return (function(){if(RTEST(vm_ivarget($, '@ready'))){return vm_yield(_,[]);}else{return vm_send(vm_ivarget($, '@ready_blocks'),"<<",[_],nil,0);}})();}})();return vm_ivarget($, '@ready');},1,0);vm_definemethod($,"title",function($,id,_){return document.title;},1,0);vm_definemethod($,"title=",function($,id,_,_a){return document.title=_a;},1,1);vm_definemethod($,"window",function($,id,_){return vm_getconstant($,"Window");},1,0);vm_definemethod($,"body",function($,id,_){return opal_element_wrap(document.body);},1,0);vm_definemethod($,"head",function($,id,_){return opal_element_wrap(document.getElementsByTagName('head')[0]);},1,0);vm_definemethod($,"html",function($,id,_){return opal_element_wrap(document.getElementsByTagName('html')[0]);},1,0);return vm_definemethod($,"<<",function($,id,_,_a){return document.body.appendChild(_a);},1,1);},2);});opal_boot_file(function($){var _ = nil;vm_defineclass($,nil,"Element",function($){window.opal_element_wrap=function(wrap) {if (wrap.klass) return wrap;wrap.hash = opal_yield_hash();wrap.klass = $;wrap.flags = T_OBJECT;return wrap;};function element_has_class(el, name) {return (" " + el.className + " ").indexOf(" " + name + " ") > -1;};function element_visible(el) {return (el.style || el).display != 'none';};vm_definemethod($,"find",function($,id,_,_a){var _b;if(RTEST(vm_send(vm_getconstant($,"Symbol"),"===",[_a],nil,0))){_a=vm_send(_a,"to_s",[],nil,0);};_b=document.getElementById(_a);if(RTEST(_b)){opal_element_wrap(_b)};if(RTEST(((_ == nil) ? false : true))){vm_send(_b,"instance_eval",[],vm_send(_,"to_proc",[],nil,0),0);};return _b;},1,1);vm_definemethod($,"[]",function($,id,_,_a){return vm_send($,"find",[_a],nil,8);},1,1);vm_definemethod($,"body",function($,id,_){return opal_element_wrap(document.body);},1,0);vm_definemethod($,"new",function($,id,_,_a,_b){_a=vm_send(_a,"to_s",[],nil,0);return opal_element_wrap(document.createElement(_a));},1,2);vm_definemethod($,"find",function($,id,_,_a){},0,1);vm_definemethod($,"==",function($,id,_,_a){return $===_a;},0,1);vm_send($,"alias_method",[ID2SYM("eql?"),ID2SYM("==")],nil,8);vm_send($,"alias_method",[ID2SYM("==="),ID2SYM("==")],nil,8);vm_definemethod($,"method_missing",function($,id,_,_a,_b){_a=arguments[3];_b=Array.prototype.slice.call(arguments,4);var _d,_c;_c=vm_send(_a,"to_s",[],nil,0);_d=document.createElement(_c);;vm_send(_b,"each",[],function($$,__,ID,_e){with({$:($$==nil?$:$$),_:(__==nil?_:__)}){return (function($c){if(vm_send(vm_getconstant($,"String"),'===',[$c],nil,0)) {_d.appendChild(document.createTextNode(_e));}else if(vm_send(vm_getconstant($,"Hash"),'===',[$c],nil,0)) {return (function(){if(RTEST(vm_send(_e,"has_key?",[ID2SYM("class")],nil,0))){_d.className = vm_send(_e,"[]",[ID2SYM("class")],nil,0);}})();}})(_e);}},0);$.appendChild(_d);return opal_element_wrap(_d);},0,1);vm_definemethod($,"add_listener",function($,id,_,_a){var func = function(evt) { return rb_proc_call(_, "", nil, evt); };if ($.addEventListener) {$.addEventListener(type, func, false);}else {$.attachEvent('on' + type, func);}return $;},0,1);vm_definemethod($,"on_click",function($,id,_){return vm_send($,"add_listener",["click"],vm_send(_,"to_proc",[],nil,0),8);},0,0);vm_definemethod($,"empty",function($,id,_){while ($.firstChild) { $.removeChild($.firstChild); }
    return $;},0,0);vm_definemethod($,"has_class?",function($,id,_,_a){return element_has_class($,_a);},0,1);vm_definemethod($,"add_class",function($,id,_,_a){if(!element_has_class($,_a)) {
      $.className = $.className + " " + _a;
    }return $;},0,1);vm_definemethod($,"remove_class",function($,id,_,_a){return vm_send($,"raise",[["Element","#remove_class not yet implemented"].join('')],nil,8);},0,1);vm_definemethod($,"toggle_class",function($,id,_,_a){return (function(){if(RTEST(vm_send($,"has_class?",[_a],nil,8))){return vm_send($,"remove_class",[_a],nil,8);}else{return vm_send($,"add_class",[_a],nil,8);}})();},0,1);vm_definemethod($,"opacity=",function($,id,_,_a){($.style || $).opacity = (_a === 1 || _a === '') ? "" : _a;return $;},0,1);vm_definemethod($,"opacity",function($,id,_){var o = ($.style || $).opacity;
    return o ? parseFloat(o) : 1.0;},0,0);vm_definemethod($,"remove",function($,id,_){$.parentNode.removeChild($);return $;},0,0);vm_definemethod($,"visible?",function($,id,_){return element_visible(vm_send($,"element",[],nil,8));},0,0);vm_definemethod($,"show",function($,id,_){return vm_send($,"css",[vm_newhash(ID2SYM("display"),"")],nil,8);},0,0);vm_definemethod($,"hide",function($,id,_){return vm_send($,"css",[vm_newhash(ID2SYM("display"),"none")],nil,8);},0,0);vm_definemethod($,"toggle",function($,id,_){RTEST(vm_send($,"visible?",[],nil,8))? vm_send($,"hide",[],nil,8) : vm_send($,"show",[],nil,8);return $;},0,0);vm_setconstant($,"SET_OPTIONS",rb_hash_new());vm_definemethod($,"set",function($,id,_,_a){return vm_send(_a,"each",[],function($$,__,ID,_b,_c){with({$:($$==nil?$:$$),_:(__==nil?_:__)}){return vm_send($,"send",[vm_send(vm_getconstant($,"SET_OPTIONS"),"[]",[_b],nil,0),_c],nil,8);}},0);},0,1);vm_definemethod($,"id=",function($,id,_,_a){$.id=_a;return $;},0,1);vm_definemethod($,"class_name=",function($,id,_,_a){$.className=_a;return $;},0,1);vm_definemethod($,"class_name",function($,id,_){return $.className},0,0);vm_definemethod($,"text",function($,id,_,_a){return ($.textContent !== undefined) ? $.textContent : $.innerText;},0,1);vm_definemethod($,"text=",function($,id,_,_a){if ($.textContent !== undefined) {$.textContent = _a;}else {$.innerText = _a;}return $;},0,1);vm_definemethod($,"css",function($,id,_,_a){return (function($c){if(vm_send(vm_getconstant($,"Hash"),'===',[$c],nil,0)) {}else if(vm_send(vm_getconstant($,"Symbol"),'===',[$c],nil,0) || vm_send(vm_getconstant($,"String"),'===',[$c],nil,0)) {return _a=vm_send(_a,"to_s",[],nil,0);}})(_a);},0,1);return vm_send($,"alias_method",[ID2SYM("style"),ID2SYM("css")],nil,8);},0);});opal_boot_file(function($){var _ = nil;vm_defineclass($,nil,"Window",function($){vm_definemethod($,"title",function($,id,_){return window.title;},1,0);return vm_definemethod($,"title=",function($,id,_,_a){return window.title=_a;},1,1);},2);});