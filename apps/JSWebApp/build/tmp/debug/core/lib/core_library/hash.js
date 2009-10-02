
var Hash=new Class('Hash',{initialize:function(props){this.$keys=[];this.$values={};this.merge(props);},merge:function(other,block){if(other.klass===Hash){var self=this;other.each(function(key,val){self.store(key,val);});}
else{for(var key in other){this.store(key,other[key]);}}},each:function(block){for(var i=0;i<this.$keys.length;i++){block(this.$keys[i],this.$values[this.$keys[i]]);}},store:function(key,val){if(this.$keys.indexOf(key)==-1){this.$keys.push(key);}
this.$values[key]=val;},set:function(key,val){this.store(key,val);},get:function(key){return this.$values[key];}});