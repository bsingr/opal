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
class_addIvar(the_class, "_DOMContainer", "id");
class_addIvar(the_class, "_DOMGraphicsContext", "id");
class_addIvar(the_class, "_menu", "NSMenu");
class_addIvar(the_class, "_isHorizontal", "BOOL");
class_addIvar(the_class, "_highlightedItemIndex", "NSInteger");
class_addIvar(the_class, "_menuItemCell", "NSMenuItemCell");
class_addIvar(the_class, "_attatchedMenuView", "NSMenuView");
class_addIvar(the_class, "_attatchedMenu", "NSMenu");
class_addIvar(the_class, "_innerRect", "NSRect");
class_addIvar(the_class, "_eventBindingMenuArray", "NSMutableArray");

class_addMethod(the_class, "initWithMenu:", function(self, _cmd, aMenu) {
objc_msgSend(self, "initWithFrame:", NSMakeRect(0000));
_menu = aMenu;
_highlightedItemIndex = Unhandled output_expression: [,(), - (-), 1 (CONSTANT)];
objc_msgSend(self, "setMenuItemCell:forItemAtIndex:", objc_msgSend(objc_msgSend(NSMenuItemCell, "alloc"), "init"), 0);
return self;

}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, aRect) {
if (_menu)
{
Unhandled output_statement_list: FOR (FOR)
}


}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
var aPoint = objc_msgSend(self, "convertPoint:fromView:", objc_msgSend(theEvent, "locationInWindow"), _superview);
var selectedIndex = objc_msgSend(self, "indexOfItemAtPoint:", aPoint);
_eventBindingMenuArray = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
objc_msgSend(_eventBindingMenuArray, "addObject:", self);
objc_msgSend(self, "setHighlightedItemIndex:", selectedIndex);
objc_msgSend(_eventBindingMenuArray, "addObject:", objc_msgSend(self, "attachSubmenuForItemAtIndex:", selectedIndex));
objc_msgSend(self, "setNeedsDisplay:", YES);
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", Unhandled output_expression: [((), [|(), NSLeftMouseUpMask (IDENTIFIER), NSMouseMovedMask (IDENTIFIER)], ], nil, nil, nil, self, Unhandled output_expression: [AT_SELECTOR(AT_SELECTOR), _mouseDownMenuHandle (IDENTIFIER), ]);

}, "void");

class_addMethod(the_class, "_mouseDownMenuHandle:", function(self, _cmd, theEvent) {
var visibleMenus = objc_msgSend(_eventBindingMenuArray, "count");
Unhandled output_statement_list: FOR (FOR)if (Unhandled output_expression: [EQ_OP(), [M(), theEvent (IDENTIFIER), type (IDENTIFIER)], NSMouseMoved (IDENTIFIER)])
{
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", Unhandled output_expression: [((), [|(), NSLeftMouseUpMask (IDENTIFIER), NSMouseMovedMask (IDENTIFIER)], ], nil, nil, nil, self, Unhandled output_expression: [AT_SELECTOR(AT_SELECTOR), _mouseDownMenuHandle (IDENTIFIER), ]);

}


}, "void");

class_addMethod(the_class, "setMenu:", function(self, _cmd, menu) {
_menu = menu;

}, "void");

class_addMethod(the_class, "menu", function(self, _cmd) {
return _menu;

}, "void");

class_addMethod(the_class, "setHorizontal:", function(self, _cmd, flag) {
_isHorizontal = flag;

}, "void");

class_addMethod(the_class, "isHorizontal", function(self, _cmd) {
return _isHorizontal;

}, "void");

class_addMethod(the_class, "setFont:", function(self, _cmd, font) {

}, "void");

class_addMethod(the_class, "font", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setHighlightedItemIndex:", function(self, _cmd, index) {
_highlightedItemIndex = index;

}, "void");

class_addMethod(the_class, "highlightedItemIndex", function(self, _cmd) {
return _highlightedItemIndex;

}, "void");

class_addMethod(the_class, "setMenuItemCell:forItemAtIndex:", function(self, _cmd, cell, index) {
_menuItemCell = cell;
objc_msgSend(cell, "setMenuView:", self);

}, "void");

class_addMethod(the_class, "menuItemCellForItemAtIndex:", function(self, _cmd, index) {
return _menuItemCell;

}, "void");

class_addMethod(the_class, "attachedMenuView", function(self, _cmd) {
return _attatchedMenuView;

}, "void");

class_addMethod(the_class, "attachedMenu", function(self, _cmd) {
return _attatchedMenu;

}, "void");

class_addMethod(the_class, "isAttached", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isTornOff", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "horizontalEdgePadding", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setHorizontalEdgePadding:", function(self, _cmd, pad) {

}, "void");

class_addMethod(the_class, "itemChanged:", function(self, _cmd, notification) {

}, "void");

class_addMethod(the_class, "itemAdded:", function(self, _cmd, notification) {

}, "void");

class_addMethod(the_class, "itemRemoved:", function(self, _cmd, notification) {

}, "void");

class_addMethod(the_class, "detachSubmenu", function(self, _cmd) {
if (objc_msgSend(self, "attachedMenu"))
{
objc_msgSend(_attatchedMenuView, "detachSubmenu");
objc_msgSend(objc_msgSend(_attatchedMenuView, "window"), "close");
_attatchedMenu = nil;
_attatchedMenuView = nil;

}


}, "void");

class_addMethod(the_class, "attachSubmenuForItemAtIndex:", function(self, _cmd, index) {
var theMenuItem = objc_msgSend(objc_msgSend(_menu, "itemArray"), "objectAtIndex:", index);
var theSubmenu = objc_msgSend(theMenuItem, "submenu");
if (Unhandled output_expression: [,(), ! (!), theSubmenu (IDENTIFIER)])
return ;

_attatchedMenu = theSubmenu;
_attatchedMenuView = objc_msgSend(objc_msgSend(NSMenuView, "alloc"), "initWithMenu:", _attatchedMenu);
objc_msgSend(_attatchedMenuView, "sizeToFit");
var screenRect = objc_msgSend(objc_msgSend(NSScreen, "mainScreen"), "frame");
var windowFrame = NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), [M(), self (IDENTIFIER), [:(), rectOfItemAtIndex (IDENTIFIER), index (IDENTIFIER)]], origin (IDENTIFIER)], x (IDENTIFIER)], 12 (CONSTANT)]Unhandled output_expression: [+(), [-(), [-(), [.(.), [.(.), screenRect (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], [.(.), [.(.), [M(), _attatchedMenuView (IDENTIFIER), frame (IDENTIFIER)], size (IDENTIFIER)], height (IDENTIFIER)]], [M(), NSMenu (TYPE_NAME), menuBarHeight (IDENTIFIER)]], 1 (CONSTANT)]objc_msgSend(_attatchedMenuView, "frame").size.widthobjc_msgSend(_attatchedMenuView, "frame").size.height);
var _menuWindow = objc_msgSend(objc_msgSend(NSMenuWindow, "alloc"), "initWithContentRect:styleMask:backing:defer:", windowFrame, 0, nil, NO);
objc_msgSend(_menuWindow, "setLevel:", 10);
objc_msgSend(_menuWindow, "setContentView:", _attatchedMenuView);
return _attatchedMenuView;

}, "void");

class_addMethod(the_class, "update", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setNeedsSizing:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "needsSizing", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "sizeToFit", function(self, _cmd) {
var boundsRect = NSMakeRect(0000);
Unhandled output_statement_list: FOR (FOR)_innerRect = boundsRect;
objc_msgSend(self, "setFrame:", NSMakeRect(121_innerRect.size.width_innerRect.size.height));

}, "void");

class_addMethod(the_class, "stateImageOffset", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "stateImageWidth", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "imageAndTitleOffset", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "imageAndTitleWidth", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "keyEquivalentOffset", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "keyEquivalentWidth", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "innerRect", function(self, _cmd) {
return _innerRect;

}, "void");

class_addMethod(the_class, "rectOfItemAtIndex:", function(self, _cmd, index) {
var itemRect;
if (objc_msgSend(self, "isHorizontal"))
{
var yOffset = 0;
var xOffset = Unhandled output_expression: [*(), index (IDENTIFIER), 85 (CONSTANT)];
itemRect = NSMakeRect(xOffsetyOffset85objc_msgSend(NSMenu, "menuBarHeight"));

}
else
{
var totalHeight = Unhandled output_expression: [*(), [M(), _menu (IDENTIFIER), numberOfItems (IDENTIFIER)], 22 (CONSTANT)];
var yOffset = Unhandled output_expression: [-(), totalHeight (IDENTIFIER), [((), [*(), [((), [+(), index (IDENTIFIER), 1 (CONSTANT)], ], 22 (CONSTANT)], ]];
var xOffset = 0;
itemRect = NSMakeRect(xOffsetyOffset20022);

}

return itemRect;

}, "void");

class_addMethod(the_class, "indexOfItemAtPoint:", function(self, _cmd, point) {
if (objc_msgSend(self, "isHorizontal"))
{
Unhandled output_statement_list: FOR (FOR)return Unhandled output_expression: [,(), - (-), 1 (CONSTANT)];

}
else
{
Unhandled output_statement_list: FOR (FOR)return Unhandled output_expression: [,(), - (-), 1 (CONSTANT)];

}


}, "void");

class_addMethod(the_class, "setNeedsDisplayForItemAtIndex:", function(self, _cmd, index) {

}, "void");

class_addMethod(the_class, "locationForSubmenu:", function(self, _cmd, aSubmenu) {

}, "void");

class_addMethod(the_class, "setWindowFrameForAttachingToRect:onScreen:preferredEdge:popUpSelectedItem:", function(self, _cmd, screenRect, screen, edge, selectedItemIndex) {

}, "void");

class_addMethod(the_class, "performActionWithHighlightingForItemAtIndex:", function(self, _cmd, index) {

}, "void");

class_addMethod(the_class, "trackWithEvent:", function(self, _cmd, event) {

}, "void");

