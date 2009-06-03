var the_class = objc_allocateClassPair(NSObject, "NSResponder");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_nextResponder", "id");

class_addMethod(the_class, "nextResponder", function(self, _cmd) {
return _nextResponder;

}, "void");

class_addMethod(the_class, "setNextResponder:", function(self, _cmd, aResponder) {
_nextResponder = aResponder;

}, "void");

class_addMethod(the_class, "tryToPerform:with:", function(self, _cmd, anAction, anObject) {
if (objc_msgSend(self, "respondsToSelector:", anAction))
{
objc_msgSend(self, "performSelector:with:", anAction, anObject);
return YES;

}

return objc_msgSend(_nextResponder, "tryToPerform:with:", anAction, anObject);

}, "void");

class_addMethod(the_class, "performKeyEquivalent:", function(self, _cmd, theEvent) {
return NO;

}, "void");

class_addMethod(the_class, "validRequestorForSendType:returnType:", function(self, _cmd, sendType, returnType) {

}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "mouseDown:", theEvent);

}, "void");

class_addMethod(the_class, "rightMouseDown:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "rightMouseDown:", theEvent);

}, "void");

class_addMethod(the_class, "otherMouseDown:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "otherMouseDown:", theEvent);

}, "void");

class_addMethod(the_class, "mouseUp:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "mouseUp:", theEvent);

}, "void");

class_addMethod(the_class, "rightMouseUp:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "rightMouseUp:", theEvent);

}, "void");

class_addMethod(the_class, "otherMouseUp:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "otherMouseUp:", theEvent);

}, "void");

class_addMethod(the_class, "mouseMoved:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "mouseMoved:", theEvent);

}, "void");

class_addMethod(the_class, "mouseDragged:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "mouseDragged:", theEvent);

}, "void");

class_addMethod(the_class, "scrollWheel:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "scrollWheel:", theEvent);

}, "void");

class_addMethod(the_class, "rightMouseDragged:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "rightMouseDragged:", theEvent);

}, "void");

class_addMethod(the_class, "otherMouseDragged:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "otherMouseDragged:", theEvent);

}, "void");

class_addMethod(the_class, "mouseEntered:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "mouseEntered:", theEvent);

}, "void");

class_addMethod(the_class, "mouseExited:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "mouseExited:", theEvent);

}, "void");

class_addMethod(the_class, "keyDown:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "keyDown:", theEvent);

}, "void");

class_addMethod(the_class, "keyUp:", function(self, _cmd, theEvent) {
objc_msgSend(_nextResponder, "keyUp:", theEvent);

}, "void");

class_addMethod(the_class, "flagsChanged:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "tabletPoint:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "tabletProximity:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "cursorUpdate:", function(self, _cmd, event) {

}, "void");

class_addMethod(the_class, "noResponderFor:", function(self, _cmd, eventSelector) {
if (eventSelector == "selector:")
{

}


}, "void");

class_addMethod(the_class, "acceptsFirstResponder", function(self, _cmd) {
return NO;

}, "void");

class_addMethod(the_class, "becomeFirstResponder", function(self, _cmd) {
return YES;

}, "void");

class_addMethod(the_class, "resignFirstResponder", function(self, _cmd) {
return YES;

}, "void");

class_addMethod(the_class, "interpretKeyEvents:", function(self, _cmd, eventArray) {
var eventsCount = objc_msgSend(eventArray, "count");
FOR (FOR)
}, "void");

class_addMethod(the_class, "flushBufferedKeyEvents", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setMenu:", function(self, _cmd, menu) {

}, "void");

class_addMethod(the_class, "menu", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "showContextHelp:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "helpRequested:", function(self, _cmd, eventPtr) {

}, "void");

class_addMethod(the_class, "shouldBeTreatedAsInkEvent:", function(self, _cmd, theEvent) {

}, "void");

var the_class = NSResponder;
var meta_class = the_class.isa;

class_addMethod(the_class, "undoManager", function(self, _cmd) {

}, "void");

var the_class = NSResponder;
var meta_class = the_class.isa;

class_addMethod(the_class, "presentError:modalForWindow:delegate:didPresentSelector:contextInfo:", function(self, _cmd, error, window, delegate, didPresentSelector, contextInfo) {

}, "void");

class_addMethod(the_class, "presentError:", function(self, _cmd, error) {

}, "void");

class_addMethod(the_class, "willPresentError:", function(self, _cmd, error) {

}, "void");

