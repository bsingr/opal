
Vienna.extend({MIXED_STATE:'mixed',OFF_STATE:'off',ON_STATE:'on',REGULAR_CONTROL_SIZE:'regular',SMALL_CONTROL_SIZE:'small',MINI_CONTROL_SIZE:'mini',CONTROL_TEXT_DID_BEGIN_EDITING:"VNControlTextDidBeginEditingNotification",CONTROL_TEXT_DID_END_EDITING:"VNControlTextDidEndEditingNotification",CONTROL_TEXT_DID_CHANGE:"VNControlTextDidChangeNotification",Control:Class.create(Vienna.View,{displayProperties:['enabled','selected','state'],initialize:function(frame){console.log('control calling super');this.callSuper(frame);return this;},sizeToFit:function(){},calcSize:function(){},bind:function(binding,toObject,keyPath,options){},sendAction:function(action,target){if(action&&target){VN.App.sendAction(action,target,this);return true;}
return false;},takeValueFrom:function(sender){this.setValue(sender.value());}})});
VN.require('/Users/adam/Development/vienna/apps/JSWebApp/build/tmp/debug/vienna/lib/views/controls/button.js');

VN.require('/Users/adam/Development/vienna/apps/JSWebApp/build/tmp/debug/vienna/lib/views/controls/slider.js');
