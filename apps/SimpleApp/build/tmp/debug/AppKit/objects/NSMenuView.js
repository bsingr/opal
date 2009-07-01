var the_class = objc_allocateClassPair(NSView, "NSMenuView");
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
class_addIvar(the_class, "_DOMContainer", "CGDOMElementRef");
class_addIvar(the_class, "_DOMGraphicsContext", "CGDOMElementRef");
class_addIvar(the_class, "_graphicsContext", "CGContextRef");
class_addIvar(the_class, "_menu", "NSMenu");
class_addIvar(the_class, "_isHorizontal", "BOOL");
class_addIvar(the_class, "_highlightedItemIndex", "NSInteger");
class_addIvar(the_class, "_menuItemCell", "NSMenuItemCell");
class_addIvar(the_class, "_attatchedMenuView", "NSMenuView");
class_addIvar(the_class, "_attatchedMenu", "NSMenu");
class_addIvar(the_class, "_innerRect", "NSRect");
class_addIvar(the_class, "_eventBindingMenuArray", "NSMutableArray");

class_addMethod(the_class, "initWithMenu:", function(self, _cmd, aMenu) {
with(self) {
objc_msgSend(self, "initWithFrame:", NSMakeRect(0,0,0,0));
_menu = aMenu;
_highlightedItemIndex = -1;
objc_msgSend(self, "setMenuItemCell:forItemAtIndex:", objc_msgSend(objc_msgSend(NSMenuItemCell, "alloc"), "init"), 0);
return self;
}
}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, aRect) {
with(self) {
if (_menu)
{
for(var i = 0;
i < objc_msgSend(objc_msgSend(_menu, "itemArray"), "count");
i++){
var currentItemCell = objc_msgSend(self, "menuItemCellForItemAtIndex:", i);
objc_msgSend(currentItemCell, "setMenuItem:", objc_msgSend(objc_msgSend(_menu, "itemArray"), "objectAtIndex:", i));
objc_msgSend(currentItemCell, "setMenuView:", self);
if (i == objc_msgSend(self, "highlightedItemIndex"))
objc_msgSend(currentItemCell, "setHighlighted:", YES);
else
objc_msgSend(currentItemCell, "setHighlighted:", NO);

objc_msgSend(currentItemCell, "drawWithFrame:inView:", objc_msgSend(self, "rectOfItemAtIndex:", i), self);

}

}

}
}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
with(self) {
var aPoint = objc_msgSend(self, "convertPoint:fromView:", objc_msgSend(theEvent, "locationInWindow"), _superview);
var selectedIndex = objc_msgSend(self, "indexOfItemAtPoint:", aPoint);
_eventBindingMenuArray = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
objc_msgSend(_eventBindingMenuArray, "addObject:", self);
objc_msgSend(self, "setHighlightedItemIndex:", selectedIndex);
objc_msgSend(_eventBindingMenuArray, "addObject:", objc_msgSend(self, "attachSubmenuForItemAtIndex:", selectedIndex));
objc_msgSend(self, "setNeedsDisplay:", YES);
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", (4 | 32), null, null, null, self, "_mouseDownMenuHandle:");
}
}, "void");

class_addMethod(the_class, "_mouseDownMenuHandle:", function(self, _cmd, theEvent) {
with(self) {
var visibleMenus = objc_msgSend(_eventBindingMenuArray, "count");
for(var i = (visibleMenus - 1);
-1 < i;
i--){
var menuToCheck = objc_msgSend(_eventBindingMenuArray, "objectAtIndex:", i);
var pointInMenuView = objc_msgSend(menuToCheck, "convertPoint:fromView:", objc_msgSend(theEvent, "locationInWindow"), null);
if (NSPointInRect(objc_msgSend(theEvent, "locationInBase"),objc_msgSend(objc_msgSend(menuToCheck, "window"), "frame")))
{
var theItemIndex = objc_msgSend(menuToCheck, "indexOfItemAtPoint:", pointInMenuView);
if (objc_msgSend(theEvent, "type") == 2)
{
var theSelectedItem = objc_msgSend(objc_msgSend(menuToCheck, "menu"), "itemAtIndex:", theItemIndex);
if (objc_msgSend(theSelectedItem, "isEnabled") && !objc_msgSend(theSelectedItem, "hasSubmenu"))
{
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "sendAction:to:from:", objc_msgSend(theSelectedItem, "action"), objc_msgSend(theSelectedItem, "target"), self);

}

objc_msgSend(self, "detachSubmenu");
_eventBindingMenuArray = null;
objc_msgSend(self, "setHighlightedItemIndex:", (-1));
objc_msgSend(self, "setNeedsDisplay:", YES);
return ;

}
else
if (objc_msgSend(theEvent, "type") == 5)
{
if (theItemIndex != objc_msgSend(menuToCheck, "highlightedItemIndex"))
{
objc_msgSend(_eventBindingMenuArray, "removeObject:", objc_msgSend(menuToCheck, "attachedMenuView"));
objc_msgSend(menuToCheck, "detachSubmenu");
objc_msgSend(menuToCheck, "setHighlightedItemIndex:", theItemIndex);
if (theItemIndex != -1)
{
if (objc_msgSend(objc_msgSend(objc_msgSend(menuToCheck, "menu"), "itemAtIndex:", theItemIndex), "hasSubmenu"))
{
objc_msgSend(_eventBindingMenuArray, "addObject:", objc_msgSend(menuToCheck, "attachSubmenuForItemAtIndex:", theItemIndex));

}


}

objc_msgSend(menuToCheck, "setNeedsDisplay:", YES);

}

objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", (4 | 32), null, null, null, self, "_mouseDownMenuHandle:");

}


return ;

}
else
if (objc_msgSend(theEvent, "type") == 2)
{
objc_msgSend(self, "detachSubmenu");
objc_msgSend(self, "setHighlightedItemIndex:", (-1));
objc_msgSend(self, "setNeedsDisplay:", YES);

}



}
if (objc_msgSend(theEvent, "type") == 5)
{
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", (4 | 32), null, null, null, self, "_mouseDownMenuHandle:");

}

}
}, "void");

class_addMethod(the_class, "setMenu:", function(self, _cmd, menu) {
with(self) {
_menu = menu;
}
}, "void");

class_addMethod(the_class, "menu", function(self, _cmd) {
with(self) {
return _menu;
}
}, "void");

class_addMethod(the_class, "setHorizontal:", function(self, _cmd, flag) {
with(self) {
_isHorizontal = flag;
}
}, "void");

class_addMethod(the_class, "isHorizontal", function(self, _cmd) {
with(self) {
return _isHorizontal;
}
}, "void");

class_addMethod(the_class, "setFont:", function(self, _cmd, font) {
with(self) {
}
}, "void");

class_addMethod(the_class, "font", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setHighlightedItemIndex:", function(self, _cmd, index) {
with(self) {
_highlightedItemIndex = index;
}
}, "void");

class_addMethod(the_class, "highlightedItemIndex", function(self, _cmd) {
with(self) {
return _highlightedItemIndex;
}
}, "void");

class_addMethod(the_class, "setMenuItemCell:forItemAtIndex:", function(self, _cmd, cell, index) {
with(self) {
_menuItemCell = cell;
objc_msgSend(cell, "setMenuView:", self);
}
}, "void");

class_addMethod(the_class, "menuItemCellForItemAtIndex:", function(self, _cmd, index) {
with(self) {
return _menuItemCell;
}
}, "void");

class_addMethod(the_class, "attachedMenuView", function(self, _cmd) {
with(self) {
return _attatchedMenuView;
}
}, "void");

class_addMethod(the_class, "attachedMenu", function(self, _cmd) {
with(self) {
return _attatchedMenu;
}
}, "void");

class_addMethod(the_class, "isAttached", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isTornOff", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "horizontalEdgePadding", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setHorizontalEdgePadding:", function(self, _cmd, pad) {
with(self) {
}
}, "void");

class_addMethod(the_class, "itemChanged:", function(self, _cmd, notification) {
with(self) {
}
}, "void");

class_addMethod(the_class, "itemAdded:", function(self, _cmd, notification) {
with(self) {
}
}, "void");

class_addMethod(the_class, "itemRemoved:", function(self, _cmd, notification) {
with(self) {
}
}, "void");

class_addMethod(the_class, "detachSubmenu", function(self, _cmd) {
with(self) {
if (objc_msgSend(self, "attachedMenu"))
{
objc_msgSend(_attatchedMenuView, "detachSubmenu");
objc_msgSend(objc_msgSend(_attatchedMenuView, "window"), "close");
_attatchedMenu = null;
_attatchedMenuView = null;

}

}
}, "void");

class_addMethod(the_class, "attachSubmenuForItemAtIndex:", function(self, _cmd, index) {
with(self) {
var theMenuItem = objc_msgSend(objc_msgSend(_menu, "itemArray"), "objectAtIndex:", index);
var theSubmenu = objc_msgSend(theMenuItem, "submenu");
if (!theSubmenu)
return ;

_attatchedMenu = theSubmenu;
_attatchedMenuView = objc_msgSend(objc_msgSend(NSMenuView, "alloc"), "initWithMenu:", _attatchedMenu);
objc_msgSend(_attatchedMenuView, "sizeToFit");
var screenRect = objc_msgSend(objc_msgSend(NSScreen, "mainScreen"), "frame");
var windowFrame = NSMakeRect(objc_msgSend(self, "rectOfItemAtIndex:", index).origin.x + 12,screenRect.size.height - objc_msgSend(_attatchedMenuView, "frame").size.height - objc_msgSend(NSMenu, "menuBarHeight") + 1,objc_msgSend(_attatchedMenuView, "frame").size.width,objc_msgSend(_attatchedMenuView, "frame").size.height);
var _menuWindow = objc_msgSend(objc_msgSend(NSMenuWindow, "alloc"), "initWithContentRect:styleMask:backing:defer:", windowFrame, 0, null, NO);
objc_msgSend(_menuWindow, "setLevel:", 10);
objc_msgSend(_menuWindow, "setContentView:", _attatchedMenuView);
return _attatchedMenuView;
}
}, "void");

class_addMethod(the_class, "update", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setNeedsSizing:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "needsSizing", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sizeToFit", function(self, _cmd) {
with(self) {
var boundsRect = NSMakeRect(0,0,0,0);
for(var i = 0;
i < objc_msgSend(objc_msgSend(_menu, "itemArray"), "count");
i++){
var currentMenuBounds = objc_msgSend(self, "rectOfItemAtIndex:", i);
if (objc_msgSend(self, "isHorizontal"))
{
boundsRect.size.width = boundsRect.size.width + currentMenuBounds.size.width;
boundsRect.size.height = objc_msgSend(NSMenu, "menuBarHeight");

}
else
{
boundsRect.size.height = boundsRect.size.height + currentMenuBounds.size.height;
boundsRect.size.width = 200;

}


}
_innerRect = boundsRect;
objc_msgSend(self, "setFrame:", NSMakeRect(12,1,_innerRect.size.width,_innerRect.size.height));
}
}, "void");

class_addMethod(the_class, "stateImageOffset", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "stateImageWidth", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "imageAndTitleOffset", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "imageAndTitleWidth", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "keyEquivalentOffset", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "keyEquivalentWidth", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "innerRect", function(self, _cmd) {
with(self) {
return _innerRect;
}
}, "void");

class_addMethod(the_class, "rectOfItemAtIndex:", function(self, _cmd, index) {
with(self) {
var itemRect = {origin:{x:0,y:0,},size:{width:0,height:0,},};
if (objc_msgSend(self, "isHorizontal"))
{
var yOffset = 0;
var xOffset = index * 85;
itemRect = NSMakeRect(xOffset,yOffset,85,objc_msgSend(NSMenu, "menuBarHeight"));

}
else
{
var totalHeight = objc_msgSend(_menu, "numberOfItems") * 22;
var yOffset = totalHeight - ((index + 1) * 22);
var xOffset = 0;
itemRect = NSMakeRect(xOffset,yOffset,200,22);

}

return itemRect;
}
}, "void");

class_addMethod(the_class, "indexOfItemAtPoint:", function(self, _cmd, point) {
with(self) {
if (objc_msgSend(self, "isHorizontal"))
{
for(var i = 0;
i < objc_msgSend(objc_msgSend(_menu, "itemArray"), "count");
i++){
if (NSPointInRect(point,objc_msgSend(self, "rectOfItemAtIndex:", i)))
return i;


}
return -1;

}
else
{
for(var i = 0;
i < objc_msgSend(objc_msgSend(_menu, "itemArray"), "count");
i++){
if (NSPointInRect(point,objc_msgSend(self, "rectOfItemAtIndex:", i)))
return i;


}
return -1;

}

}
}, "void");

class_addMethod(the_class, "setNeedsDisplayForItemAtIndex:", function(self, _cmd, index) {
with(self) {
}
}, "void");

class_addMethod(the_class, "locationForSubmenu:", function(self, _cmd, aSubmenu) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setWindowFrameForAttachingToRect:onScreen:preferredEdge:popUpSelectedItem:", function(self, _cmd, screenRect, screen, edge, selectedItemIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "performActionWithHighlightingForItemAtIndex:", function(self, _cmd, index) {
with(self) {
}
}, "void");

class_addMethod(the_class, "trackWithEvent:", function(self, _cmd, event) {
with(self) {
}
}, "void");

