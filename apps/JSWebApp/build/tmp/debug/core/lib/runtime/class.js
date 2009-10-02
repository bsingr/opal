
var Class=function(){return this.initialize.apply(this,arguments);};Object.extend(Class.prototype,{initialize:function(name,superklass,props){if(typeof name==='string'){this.__classid__=this.displayName=name;}
else{this.__classid__=this.displayName='';props=superklass;superklass=name;}
var klass=function(){this.initialize.apply(this,arguments);};for(var key in this){klass[key]=this[key];}
if(typeof superklass!=='function'){props=superklass;superklass=BasicObject;}
klass.inherit(superklass);klass.klass=klass.constructor=this.klass;klass.extend(props);return klass;},});Object.extend(Class.prototype,Object.VNCoreMethods);