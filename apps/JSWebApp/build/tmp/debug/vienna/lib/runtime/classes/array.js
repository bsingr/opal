
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(item,i){i||(i=0);var len=this.length;if(i<0)i=len+i;for(;i<len;i++)
if(this[i]===item)return i;return-1;};}
Object.extend(Array,Object.VNCoreMethods);Array.extend({wow:function(){}});