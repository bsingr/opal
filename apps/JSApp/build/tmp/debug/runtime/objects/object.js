
var initializing=false,fnTest=/xyz/.test(function(){xyz;})?/b_superb/:/.*/;this.Class=function(){};Class.extend=function(prop){var _super=this.prototype;initializing=true;var prototype=new this();initializing=false;for(var name in prop){prototype[name]=typeof prop[name]=="function"&&typeof _super[name]=="function"&&fnTest.test(prop[name])?(function(name,fn){return function(){var tmp=this._super;this._super=_super[name];var ret=fn.apply(this,arguments);this._super=tmp;return ret;};})(name,prop[name]):prop[name];}
function Class(){if(!initializing){if(arguments.length==0){this.init.apply(this,arguments);}
else{var args=[],idx=1;for(;idx<arguments.length;idx++){args.push(arguments[idx])}
this[arguments[0]].apply(this,args);}}}
Class.prototype=prototype;Class.constructor=Class;Class.extend=arguments.callee;return Class;};