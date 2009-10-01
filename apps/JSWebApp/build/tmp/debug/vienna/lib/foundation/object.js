
BasicObject.extend({respondsTo:function(name){return(this[name]&&(typeof this[name]=='function'))?true:false;},perform:function(name,obj1,obj2){if(this.respondsTo(name)){return this[name].call(this,obj1,obj2);}
else{return null;}}});