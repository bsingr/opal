
var Class=function(){return this.initialize.apply(this,arguments);};Object.extend(Class.prototype,{initialize:function(name,superklass,props){console.log(name);if(typeof name==='string'){this.__classid__=this.displayName=name;}
else{this.__classid__=this.displayName='';props=superklass;superklass=name;}
var klass=function(){this.initialize.apply(this,arguments);};for(var key in this){klass[key]=this[key];}
if(typeof superklass!=='function'){props=superklass;superklass=BasicObject;}
klass.inherit(superklass);klass.klass=klass.constructor=this.klass;klass.extend(props);return klass;},inherit:function(klass){for(var prop in klass){this[prop]=klass[prop];}
this.superklass=klass;var bridge=function(){};bridge.prototype=klass.prototype;this.prototype=new bridge();this.prototype.klass=this.prototype.constructor=this;},allocate:function(){var bridge=function(){};bridge.prototype=this.prototype;return new bridge();},include:function(){},extend:function(props){var result;for(var prop in props){if(result=prop.match(/^[A-Z][a-zA-Z_]*/)){this[prop]=props[prop];this.prototype[prop]=props[prop];}
else if(result=prop.match(/^\$([A-Za-z_]*)/)){this[result[1]]=props[prop];}
else if(typeof props[prop]!='function'){console.log('Found meta: '+prop);if(props[prop]instanceof Array){this[prop].apply(this,props[prop]);}
else{this[prop].call(this,props[prop]);}}
else if(result=prop.match(/^set([A-Za-z_]*)/)){this.addSetterMethod(result[1],result[0],props[prop]);}
else{this.prototype[prop]=props[prop];}}
return this;}});