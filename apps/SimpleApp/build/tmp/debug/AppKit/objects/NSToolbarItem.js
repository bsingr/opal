var the_class = objc_allocateClassPair(NSObject, "NSToolbarItem");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_itemIdentifier", "NSString");
class_addIvar(the_class, "_toolBar", "NSToolbar");
class_addIvar(the_class, "_label", "NSString");
class_addIvar(the_class, "_toolTip", "NSString");
class_addIvar(the_class, "_tag", "NSUInteger");
class_addIvar(the_class, "_target", "id");
class_addIvar(the_class, "_action", "SEL");
class_addIvar(the_class, "_isEnabled", "BOOL");
class_addIvar(the_class, "_image", "NSImage");
class_addIvar(the_class, "_view", "NSView");
class_addIvar(the_class, "_minSize", "NSSize");
class_addIvar(the_class, "_maxSize", "NSSize");
class_addIvar(the_class, "_displayMode", "NSUInteger");

class_addMethod(the_class, "initWithItemIdentifier:", function(self, _cmd, itemIdentifier) {
objc_msgSend(self, "init");
if (self)
{
_itemIdentifier = itemIdentifier;
_minSize = NULL;
_maxSize = NULL;

}

return self;

}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, dirtyRect) {

}, "void");

class_addMethod(the_class, "setNeedsDisplay:", function(self, _cmd, flag) {
objc_msgSend(self, "drawRect:", nil);

}, "void");

class_addMethod(the_class, "setNeedsDisplayInRect:", function(self, _cmd, invalidRect) {
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "setLeftOffset:", function(self, _cmd, left) {

}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
NSLog(Unhandled output_expression: "[NSToolbarItem mouseDown]" (STRING_LITERAL));

}, "void");

class_addMethod(the_class, "mouseUp:", function(self, _cmd, theEvent) {
NSLog(Unhandled output_expression: "[NSToolbarItem mouseDown]" (STRING_LITERAL));

}, "void");

class_addMethod(the_class, "displayMode", function(self, _cmd) {
return _displayMode;

}, "void");

class_addMethod(the_class, "setDisplayMode:", function(self, _cmd, displayMode) {
_displayMode = displayMode;

}, "void");

class_addMethod(the_class, "itemIdentifier", function(self, _cmd) {
return _itemIdentifier;

}, "void");

class_addMethod(the_class, "toolbar", function(self, _cmd) {
return _toolBar;

}, "void");

class_addMethod(the_class, "setToolbar:", function(self, _cmd, toolbar) {
_toolBar = toolbar;
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "label", function(self, _cmd) {
return _label;

}, "void");

class_addMethod(the_class, "setLabel:", function(self, _cmd, label) {
_label = label;
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "toolTip", function(self, _cmd) {
return _toolTip;

}, "void");

class_addMethod(the_class, "setToolTip:", function(self, _cmd, toolTip) {
_toolTip = toolTip;

}, "void");

class_addMethod(the_class, "tag", function(self, _cmd) {
return _tag;

}, "void");

class_addMethod(the_class, "setTag:", function(self, _cmd, tag) {
_tag = tag;

}, "void");

class_addMethod(the_class, "target", function(self, _cmd) {
return _target;

}, "void");

class_addMethod(the_class, "setTarget:", function(self, _cmd, target) {
_target = target;

}, "void");

class_addMethod(the_class, "action", function(self, _cmd) {
return _action;

}, "void");

class_addMethod(the_class, "setAction:", function(self, _cmd, action) {
_action = action;

}, "void");

class_addMethod(the_class, "isEnabled", function(self, _cmd) {
return _isEnabled;

}, "void");

class_addMethod(the_class, "setEnabled:", function(self, _cmd, enabled) {
_isEnabled = enabled;
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "image", function(self, _cmd) {
return _image;

}, "void");

class_addMethod(the_class, "setImage:", function(self, _cmd, image) {
_image = image;
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "view", function(self, _cmd) {
return _view;

}, "void");

class_addMethod(the_class, "setView:", function(self, _cmd, view) {
_view = view;

}, "void");

class_addMethod(the_class, "minSize", function(self, _cmd) {
return _minSize;

}, "void");

class_addMethod(the_class, "setMinSize:", function(self, _cmd, size) {
_minSize = size;

}, "void");

class_addMethod(the_class, "maxSize", function(self, _cmd) {
return _maxSize;

}, "void");

class_addMethod(the_class, "setMaxSize:", function(self, _cmd, size) {
_maxSize = size;

}, "void");

