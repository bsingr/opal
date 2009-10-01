

var require=function require(){};if(typeof console==='undefined'){var console=console||window.console||{};console.log=console.info=console.warn=console.error=function(){};}
Object.extend=function(target,props){for(var key in props){target[key]=props[key];}
return target;};

var Class=function(){return this.initialize.apply(this,arguments);};Object.extend(Class.prototype,{initialize:function(name,superklass,props){console.log(name);if(typeof name==='string'){this.__classid__=this.displayName=name;}
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

var Module=function(){return this.initialize.apply(this,arguments);};Object.extend(Module.prototype,{initialize:function(name,props){if(typeof name==='string'){this.__classid__=this.displayName=name;}
else{this.__classid__=this.displayName='';props=name;}
var module={};module.prototype={};for(var key in this){module[key]=this[key];}
module.extend(props);return module;},include:function(){},extend:Class.prototype.extend});

var BasicObject=function(){this.initialize.apply(this,arguments);};BasicObject.attrAccessor=function(){this.attrWriter.apply(this,arguments);this.attrReader.apply(this,arguments);};BasicObject.attrWriter=function(){for(var i=0;i<arguments.length;i++){var name=arguments[i];this.prototype['set'+name]=new Function('val','this.$'+name+' = val;');};};BasicObject.attrReader=function(){for(var i=0;i<arguments.length;i++){var name=arguments[i];this.prototype[name]=new Function('return this.$'+name+';');};};BasicObject.prototype.klass=BasicObject;BasicObject.prototype.superklass=BasicObject;BasicObject.prototype.initialize=function(){return this;};BasicObject.extend=Class.prototype.extend;BasicObject.addSetterMethod=function(key,funcName,func){var methodBody='';methodBody+='this._$'+funcName+'(val);';this.prototype[funcName]=new Function('val',methodBody);this.prototype['_$'+funcName]=func;};

var Kernel=new Module('Kernel',{});


var Hash=new Class('Hash',{initialize:function(){}});


var Ajax=new Class('Ajax',{initialize:function(options){console.log('Yeahhh');}});

var Element=new Class('Element',{$find:function(name){},initialize:function(options){options=new Hash({type:'div',className:'',id:''}).merge(options);}});

var JSON=new Class('JSON',{});

var Vienna=new Module('Vienna',{VERSION:'0.0.1',$version:function(){return this.VERSION;}});var VN=Vienna;var YES=true;var NO=false;


BasicObject.extend({respondsTo:function(name){return(this[name]&&(typeof this[name]=='function'))?true:false;},perform:function(name,obj1,obj2){if(this.respondsTo(name)){return this[name].call(this,obj1,obj2);}
else{return null;}}});


Vienna.extend({KEY_BINDINGS:{escape:'cancel',backspace:'deleteBackward','delete':'deleteForward','return':'insertNewline',tab:'insertTab',left:'moveLeft',right:'moveRight',up:'moveUp',down:'moveDown',home:'moveToBeginningOfDocument',end:'moveToEndOfDocument',pagedown:'pageDown',pageup:'pageUp',shift_tab:'insertBacktab',shift_left:'moveLeftAndModifySelection',shift_right:'moveRightAndModifySelection',shift_up:'moveUpAndModifySelection',shift_down:'moveDownAndModifySelection',alt_left:'moveLeftAndModifySelection',alt_right:'moveRightAndModifySelection',alt_up:'moveUpAndModifySelection',alt_down:'moveDownAndModifySelection',ctrl_a:'selectAll'},Responder:new Class('Responder',{tryToPerform:function(action,object){if(this.respondsTo(action)){this.perform(action,object);return true;}
return this.nextResponder().tryToPerform(action,object);},})});

Vienna.extend({View:new Class('View',Vienna.Responder,{$displayProperties:function(){console.log(arguments);},displayProperties:['frame','frameOrigin','frameSize'],initialize:function(frame){frame=frame.toRect();},bobobobob:function(){}})});

VN.extend({MIXED_STATE:'mixed',OFF_STATE:'off',ON_STATE:'on',REGULAR_CONTROL_SIZE:'regular',SMALL_CONTROL_SIZE:'small',MINI_CONTROL_SIZE:'mini',CONTROL_TEXT_DID_BEGIN_EDITING_NOTIFICATION:"VNControlTextDidBeginEditingNotification",CONTROL_TEXT_DID_END_EDITING_NOTIFICATION:"VNControlTextDidEndEditingNotification",CONTROL_TEXT_DID_CHANGE_NOTIFICATION:"VNControlTextDidChangeNotification",Control:new Class('Control',VN.View,{displayProperties:['enabled','selected','state'],initialize:function(frame){this.callSuper(frame);return this;},sizeToFit:function(){},calcSize:function(){},bind:function(binding,toObject,keyPath,options){},sendAction:function(action,target){if(action&&target){VN.App.sendAction(action,target,this);return true;}
return false;},takeValueFrom:function(sender){this.setValue(sender.value());}})});