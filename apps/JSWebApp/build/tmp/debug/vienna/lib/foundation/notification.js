
Vienna.extend({Notification:Class.create({attrAccessor:'name obj info'.w(),initialize:function(name,obj,info){this.$name=name;this.$obj=obj;this.$info=info;}}),NotificationCenter:Class.create({initialize:function(){this.callSuper();this.$dispatchTable=[];},addObserver:function(observer,action,name,sender){this.$dispatchTable.push({observer:observer,action:action,name:name,sender:sender,working:true});},postNotification:function(name,sender,info){for(var i=0;i<this.$dispatchTable.length;i++){var obj=this.$dispatchTable[i];if(obj.name===name){obj.observer.perform(obj.action,sender,info);}}},$defaultCenter:function(){if(!this.$defaultCenter){this.$defaultCenter=new VN.NotificationCenter();}
return this.$defaultCenter;}})});