

var require=function require(){};if(typeof console==='undefined'){var console=console||window.console||{};console.log=console.info=console.warn=console.error=function(){};}
Object.extend=function(target,props){for(var key in props){target[key]=options[key];}
return target;};

Object.extend=function(target,props){for(var key in props){target[key]=props[key];}
return target;};var Class=function(){return this.initialize.apply(this,arguments);};Object.extend(Class.prototype,{initialize:function(name,superklass,props){if(typeof name==='string'){this.__classid__=this.displayName=name;}
else{this.__classid__=this.displayName='';props=superklass;superklass=name;}
var klass=function(){this.initialize.apply(this,arguments);};for(var key in this){klass[key]=this[key];}
if(typeof superklass!=='function'){props=superklass;superklass=BasicObject;}
klass.inherit(superklass);klass.klass=klass.constructor=this.klass;klass.extend(props);return klass;},inherit:function(klass){for(var prop in klass){this[prop]=klass[prop];}
this.superklass=klass;var bridge=function(){};bridge.prototype=klass.prototype;this.prototype=new bridge();this.prototype.klass=this.prototype.constructor=this;},include:function(){},extend:function(props){var result;for(var prop in props){if(result=prop.match(/^[A-Z][a-zA-Z_]*/)){this[prop]=props[prop];this.prototype[prop]=props[prop];}
else if(result=prop.match(/^\$([A-Za-z_]*)/)){this[result[1]]=props[prop];}
else if(typeof props[prop]!='function'){console.log('Found meta: '+prop);if(props[prop]instanceof Array){this[prop].apply(this,props[prop]);}
else{this[prop].call(this,props[prop]);}}
else if(result=prop.match(/^set([A-Za-z_]*)/)){this.addSetterMethod(result[1],result[0],props[prop]);}
else{this.prototype[prop]=props[prop];}}}});

var Module=function(){};

var BasicObject=function(){this.initialize.apply(this,arguments);};BasicObject.attrAccessor=function(){this.attrWriter.apply(this,arguments);this.attrReader.apply(this,arguments);};BasicObject.attrWriter=function(){for(var i=0;i<arguments.length;i++){var name=arguments[i];this.prototype['set'+name]=new Function('val','this.$'+name+' = val;');};};BasicObject.attrReader=function(){for(var i=0;i<arguments.length;i++){var name=arguments[i];this.prototype[name]=new Function('return this.$'+name+';');};};BasicObject.prototype.klass=BasicObject;BasicObject.prototype.superklass=BasicObject;BasicObject.prototype.initialize=function(){return this;};BasicObject.addSetterMethod=function(key,funcName,func){var methodBody='';methodBody+='this._$'+funcName+'(val);';this.prototype[funcName]=new Function('val',methodBody);this.prototype['_$'+funcName]=func;};

var Kernel=new Module('Kernel',{});var Adam=new Class('Adam',{$sharedApplication:function(){return VN.App;},attrAccessor:['width','height'],attrReader:'knowledge',VERSION:10,SubClass:new Class('SubClass',{}),initialize:function(){return this;},log:function(){},setAge:function(age){},_privateMethod:function(alignment){}});var Ben=new Class('Ben',Adam,{});


var Hash=new Class('Hash',{initialize:function(){}});


var Ajax=new Class('Ajax',{});

var Element=new Class('Element',{$find:function(name){},initialize:function(options){options=new Hash({type:'div',className:'',id:''}).merge(options);}});

var JSON=new Class('JSON',{});