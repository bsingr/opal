
Object.extend(String,Object.VNCoreMethods);String.extend({capitalize:function(){return this.charAt(0).toUpperCase()+this.substr(1);},w:function(){return this.split(' ');},toArray:function(){return this.split('');},format:function(){var i=0,args=arguments;return this.replace(/%@/g,function(s){if(i<args.length){var ret=args[i];i++;return ret.toString();}
else{return'(null)';}});}});