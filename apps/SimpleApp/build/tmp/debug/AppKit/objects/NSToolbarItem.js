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
with(self) {
objc_msgSend(self, "init");
if (self)
{
_itemIdentifier = itemIdentifier;
_minSize = null;
_maxSize = null;

}

return self;
}
}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, dirtyRect) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setNeedsDisplay:", function(self, _cmd, flag) {
with(self) {
objc_msgSend(self, "drawRect:", null);
}
}, "void");

class_addMethod(the_class, "setNeedsDisplayInRect:", function(self, _cmd, invalidRect) {
with(self) {
objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "setLeftOffset:", function(self, _cmd, left) {
with(self) {
}
}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
with(self) {
NSLog("[NSToolbarItem mouseDown]");
}
}, "void");

class_addMethod(the_class, "mouseUp:", function(self, _cmd, theEvent) {
with(self) {
NSLog("[NSToolbarItem mouseDown]");
}
}, "void");

class_addMethod(the_class, "displayMode", function(self, _cmd) {
with(self) {
return _displayMode;
}
}, "void");

class_addMethod(the_class, "setDisplayMode:", function(self, _cmd, displayMode) {
with(self) {
_displayMode = displayMode;
}
}, "void");

class_addMethod(the_class, "itemIdentifier", function(self, _cmd) {
with(self) {
return _itemIdentifier;
}
}, "void");

class_addMethod(the_class, "toolbar", function(self, _cmd) {
with(self) {
return _toolBar;
}
}, "void");

class_addMethod(the_class, "setToolbar:", function(self, _cmd, toolbar) {
with(self) {
_toolBar = toolbar;
objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "label", function(self, _cmd) {
with(self) {
return _label;
}
}, "void");

class_addMethod(the_class, "setLabel:", function(self, _cmd, label) {
with(self) {
_label = label;
objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "toolTip", function(self, _cmd) {
with(self) {
return _toolTip;
}
}, "void");

class_addMethod(the_class, "setToolTip:", function(self, _cmd, toolTip) {
with(self) {
_toolTip = toolTip;
}
}, "void");

class_addMethod(the_class, "tag", function(self, _cmd) {
with(self) {
return _tag;
}
}, "void");

class_addMethod(the_class, "setTag:", function(self, _cmd, tag) {
with(self) {
_tag = tag;
}
}, "void");

class_addMethod(the_class, "target", function(self, _cmd) {
with(self) {
return _target;
}
}, "void");

class_addMethod(the_class, "setTarget:", function(self, _cmd, target) {
with(self) {
_target = target;
}
}, "void");

class_addMethod(the_class, "action", function(self, _cmd) {
with(self) {
return _action;
}
}, "void");

class_addMethod(the_class, "setAction:", function(self, _cmd, action) {
with(self) {
_action = action;
}
}, "void");

class_addMethod(the_class, "isEnabled", function(self, _cmd) {
with(self) {
return _isEnabled;
}
}, "void");

class_addMethod(the_class, "setEnabled:", function(self, _cmd, enabled) {
with(self) {
_isEnabled = enabled;
objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "image", function(self, _cmd) {
with(self) {
return _image;
}
}, "void");

class_addMethod(the_class, "setImage:", function(self, _cmd, image) {
with(self) {
_image = image;
objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "view", function(self, _cmd) {
with(self) {
return _view;
}
}, "void");

class_addMethod(the_class, "setView:", function(self, _cmd, view) {
with(self) {
_view = view;
}
}, "void");

class_addMethod(the_class, "minSize", function(self, _cmd) {
with(self) {
return _minSize;
}
}, "void");

class_addMethod(the_class, "setMinSize:", function(self, _cmd, size) {
with(self) {
_minSize = size;
}
}, "void");

class_addMethod(the_class, "maxSize", function(self, _cmd) {
with(self) {
return _maxSize;
}
}, "void");

class_addMethod(the_class, "setMaxSize:", function(self, _cmd, size) {
with(self) {
_maxSize = size;
}
}, "void");

