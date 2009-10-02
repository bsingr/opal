
Vienna.extend({View:new Class('View',Vienna.Responder,{$displayProperties:function(){},$defaultOptions:function(options){},$build:function(options,block){var obj=this.allocate();obj.initWithOptions(options);if(typeof block!='undefined'){block.call(obj,obj);}
return obj;},initialize:function(frame){console.log('init frame');},initWithOptions:function(options){return this.initialize(options.remove('frame'));}})});Vienna.View.extend({displayProperties:['frame','frameOrigin','frameSize'],defaultOptions:{frame:new VN.Rect(0,0,0,0),toolTip:'Vienna.View',hidden:false,flipped:false},});
VN.require('/Users/adam/Development/vienna/apps/JSWebApp/build/tmp/debug/vienna/lib/views/controls/control.js');
