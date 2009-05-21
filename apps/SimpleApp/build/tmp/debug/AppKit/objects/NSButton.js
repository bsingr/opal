var the_class = objc_allocateClassPair(NSControl, "NSButton");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_nextResponder", "id");
class_addIvar(the_class, "_frame", "NSRect");
class_addIvar(the_class, "_bounds", "NSRect");
class_addIvar(the_class, "_window", "NSWindow");
class_addIvar(the_class, "_gState", "id");
class_addIvar(the_class, "_menu", "NSMenu");
class_addIvar(the_class, "_superview", "NSView");
class_addIvar(the_class, "_subviews", "NSMutableArray");
class_addIvar(the_class, "_nextKeyView", "NSView");
class_addIvar(the_class, "_previousKeyView", "NSView");
class_addIvar(the_class, "_isHidden", "BOOL");
class_addIvar(the_class, "_postsNotificationOnFrameChange", "BOOL");
class_addIvar(the_class, "_postsNotificationOnBoundsChange", "BOOL");
class_addIvar(the_class, "_autoresizesSubviews", "BOOL");
class_addIvar(the_class, "_inLiveResize", "BOOL");
class_addIvar(the_class, "_autoresizingMask", "int");
class_addIvar(the_class, "_tag", "int");
class_addIvar(the_class, "_draggedTypes", "NSArray");
class_addIvar(the_class, "_defaultToolTipTag", "NSToolTipTag");
class_addIvar(the_class, "_toolTip", "NSString");
class_addIvar(the_class, "_invalidRect", "NSRect");
class_addIvar(the_class, "_validTransforms", "BOOL");
class_addIvar(the_class, "_transformFromWindow", "CGAffineTransform");
class_addIvar(the_class, "_transformToWindow", "CGAffineTransform");
class_addIvar(the_class, "_visibleRect", "NSRect");
class_addIvar(the_class, "_DOMContainer", "id");
class_addIvar(the_class, "_DOMGraphicsContext", "id");
class_addIvar(the_class, "_tag", "NSInteger");
class_addIvar(the_class, "_cell", "NSCell");
class_addIvar(the_class, "_currentEditor", "NSText");

class_addMethod(the_class, "title", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setTitle:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "alternateTitle", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAlternateTitle:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "image", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setImage:", function(self, _cmd, image) {

}, "void");

class_addMethod(the_class, "alternateImage", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAlternateImage:", function(self, _cmd, image) {

}, "void");

class_addMethod(the_class, "imagePosition", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setImagePosition:", function(self, _cmd, aPosition) {

}, "void");

class_addMethod(the_class, "setButtonType:", function(self, _cmd, aType) {

}, "void");

class_addMethod(the_class, "state", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setState:", function(self, _cmd, value) {

}, "void");

class_addMethod(the_class, "isBordered", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBordered:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isTransparent", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setTransparent:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "setPeriodicDelay:interval:", function(self, _cmd, delay, interval) {

}, "void");

class_addMethod(the_class, "getPeriodicDelay:interval:", function(self, _cmd, delay, interval) {

}, "void");

class_addMethod(the_class, "keyEquivalent", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setKeyEquivalent:", function(self, _cmd, charCode) {

}, "void");

class_addMethod(the_class, "keyEquivalentModifierMask", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setKeyEquivalentModifierMask:", function(self, _cmd, mask) {

}, "void");

class_addMethod(the_class, "highlight:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "performKeyEquivalent:", function(self, _cmd, key) {

}, "void");

var the_class = NSButton;
var meta_class = the_class.isa;

class_addMethod(the_class, "setTitleWithMnemonic:", function(self, _cmd, stringWithAmpersand) {

}, "void");

var the_class = NSButton;
var meta_class = the_class.isa;

class_addMethod(the_class, "attributedTitle", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAttributedTitle:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "attributedAlternateTitle", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAttributedAlternateTitle:", function(self, _cmd, obj) {

}, "void");

var the_class = NSButton;
var meta_class = the_class.isa;

class_addMethod(the_class, "setBezelStyle:", function(self, _cmd, bezelStyle) {

}, "void");

class_addMethod(the_class, "bezelStyle", function(self, _cmd) {

}, "void");

var the_class = NSButton;
var meta_class = the_class.isa;

class_addMethod(the_class, "setAllowsMixedState:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "allowsMixedState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setNextState", function(self, _cmd) {

}, "void");

var the_class = NSButton;
var meta_class = the_class.isa;

class_addMethod(the_class, "setShowsBorderOnlyWhileMouseInside:", function(self, _cmd, show) {

}, "void");

class_addMethod(the_class, "showsBorderOnlyWhileMouseInside", function(self, _cmd) {

}, "void");

