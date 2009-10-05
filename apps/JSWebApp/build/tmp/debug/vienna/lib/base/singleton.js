
Vienna.extend({SingletonObject:Class.create({$create:function(props){var obj=Vienna.Object.create();obj.setConst=function(name,val){if(val.__classid__!=undefined&&!val.__classid__){val.__classid__=name;}
obj[name]=val;};obj.define=function(name,meth){obj[name]=meth;}
console.log("HERE");var result;for(var prop in props){if(result=prop.match(/^[A-Z][a-zA-Z_]*/)){obj.setConst(prop,props[prop]);}
else if(typeof props[prop]!='function'){if(props[prop]instanceof Array){obj[prop].apply(obj,props[prop]);}else{obj[prop].call(obj,props[prop]);}}
else if(result=prop.match(/^set([A-Za-z_]*)/)){obj.addSetterMethod(result[1],result[0],props[prop]);}
else{obj.define(prop,props[prop]);}}
return obj;}})});