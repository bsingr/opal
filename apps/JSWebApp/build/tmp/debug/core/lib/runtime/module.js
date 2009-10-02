
var Module=function(){return this.initialize.apply(this,arguments);};Object.extend(Module.prototype,{initialize:function(name,props){if(typeof name==='string'){this.__classid__=this.displayName=name;}
else{this.__classid__=this.displayName='';props=name;}
var module={};module.prototype={};for(var key in this){module[key]=this[key];}
module.extend(props);return module;},include:function(){},extend:Class.prototype.extend,setConst:Class.prototype.setConst});