cObject.$c_s('VNKeyValueObservingOptionNew',1);
cObject.$c_s('VNKeyValueObservingOptionOld',2);
cObject.$c_s('VNKeyValueObservingOptionInitial',4);
cObject.$c_s('VNKeyValueObservingOptionPrior',8);
cObject.$c_s('VNKeyValueChangeKindKey','');
cObject.$c_s('VNKeyValueChangeNewKey','');
cObject.$c_s('VNKeyValueChangeOldKey','');
cObject.$c_s('VNKeyValueChangeIndexesKey','');
cObject.$c_s('VNKeyValueChangeNotificationIsPriorKey','');
var $VN_1 = RClass.define('VNObject', cObject);
$VN_1.$def('observeValueForKeyPath:ofObject:change:context:',function(keyPath,object,change,context){
var self=this;
});
$VN_1.$def('addObserver:forKeyPath:options:context:',function(observer,keyPath,options,context){
var self=this;
});
$VN_1.$def('removeObserver:forKeyPath:',function(observer,keyPath){
var self=this;
});
var $VN_1 = RClass.define('VNArray', cObject);
$VN_1.$def('addObserver:toObjectsAtIndexes:forKeyPath:options:context:',function(observer,indexes,keyPath,options,context){
var self=this;
});
$VN_1.$def('removeObserver:fromObjectsAtIndexes:forKeyPath:',function(observer,indexes,keyPath){
var self=this;
});
$VN_1.$def('addObserver:forKeyPath:options:context:',function(observer,keyPath,options,context){
var self=this;
});
$VN_1.$def('removeObserver:forKeyPath:',function(observer,keyPath){
var self=this;
});
var $VN_1 = RClass.define('VNObject', cObject);
$VN_1.$def('willChangeValueForKey',function(key){
var self=this;
});
$VN_1.$def('didChangeValueForKey',function(key){
var self=this;
});
$VN_1.$def('willChange:valuesAtIndexes:forKey:',function(changeKind,indexes,key){
var self=this;
});
$VN_1.$def('didChange:valuesAtIndexes:forKey:',function(changeKind,indexes,key){
var self=this;
});
$VN_1.$def_s('keyPathsForValuesAffectingValueForKey',function(key){
var self=this;
});
$VN_1.$def('automaticallyNotifiesObserversForKey',function(key){
var self=this;
true});
$VN_1.$def('observationInfo=',function(observationInfo){
var self=this;
return self.$i_s('@observationInfo',observationInfo);
});
$VN_1.$def('observationInfo',function(){
var self=this;
self.$i_g('@observationInfo')});
