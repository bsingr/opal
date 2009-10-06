
var Class=function(){return this.initialize.apply(this,arguments);};Class.create=function(){var c=(new this);return c.initialize.apply(c,arguments);};Object.extend(Class.prototype,{initialize:function(name,superklass,props){var classid;if(typeof name==='string'){classid=name;}
else{classid='';props=superklass;superklass=name;}
var klass=function(){this.initialize.apply(this,arguments);};for(var key in this){klass[key]=this[key];}
if(typeof superklass!=='function'){props=superklass;superklass=BasicObject;}
klass.inherit(superklass);klass.klass=klass.constructor=this.klass;klass.extend(props);klass.__classid__=klass.displayName=classid;return klass;},});Object.extend(Class.prototype,Object.VNCoreMethods);