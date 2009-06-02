var the_class = NSObject;
var meta_class = the_class.isa;

class_addMethod(the_class, "exposedBindings", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "valueClassForBinding:", function(self, _cmd, binding) {

}, "void");

class_addMethod(the_class, "bind:toObject:withKeyPath:options:", function(self, _cmd, binding, observable, keyPath, options) {

}, "void");

class_addMethod(the_class, "unbind:", function(self, _cmd, binding) {

}, "void");

class_addMethod(the_class, "infoForBinding:", function(self, _cmd, binding) {

}, "void");

class_addMethod(the_class, "optionDescriptionsForBinding:", function(self, _cmd, aBinding) {

}, "void");

class_addMethod(meta_class, "exposeBinding:", function(self, _cmd, binding) {

}, "void");

