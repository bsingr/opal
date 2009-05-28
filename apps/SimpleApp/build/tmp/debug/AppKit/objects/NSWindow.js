var the_class = objc_allocateClassPair(NSResponder, "NSWindow");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_nextResponder", "id");
class_addIvar(the_class, "_gState", "id");
class_addIvar(the_class, "_gCanvas", "id");
class_addIvar(the_class, "_gBuffer", "id");
class_addIvar(the_class, "_contentRectOrigin", "NSPoint");
class_addIvar(the_class, "_contentRectSize", "NSSize");
class_addIvar(the_class, "_isVisible", "BOOL");
class_addIvar(the_class, "_hasShadow", "BOOL");
class_addIvar(the_class, "_hidesOnDeactivate", "BOOL");
class_addIvar(the_class, "_releasedWhenClosed", "BOOL");
class_addIvar(the_class, "_styleMask", "NSUInteger");
class_addIvar(the_class, "_title", "NSString");
class_addIvar(the_class, "_visibleAtLaunch", "BOOL");
class_addIvar(the_class, "_resizable", "BOOL");
class_addIvar(the_class, "_showNormalTitlebar", "BOOL");
class_addIvar(the_class, "_unifiedTitleAndToolbar", "BOOL");
class_addIvar(the_class, "_toolbar", "NSToolbar");
class_addIvar(the_class, "_contentView", "NSView");
class_addIvar(the_class, "_delegate", "id");
class_addIvar(the_class, "_windowNumber", "NSUInteger");
class_addIvar(the_class, "_frame", "NSRect");
class_addIvar(the_class, "_bounds", "NSRect");
class_addIvar(the_class, "_visible", "BOOL");
class_addIvar(the_class, "_level", "int");
class_addIvar(the_class, "_keyWindow", "BOOL");
class_addIvar(the_class, "_mainWindow", "BOOL");
class_addIvar(the_class, "_firstResponder", "NSResponder");
class_addIvar(the_class, "_movableByWindowBackground", "BOOL");
class_addIvar(the_class, "_eventBindingCurrentX", "id");
class_addIvar(the_class, "_eventBindingCurrentY", "id");
class_addIvar(the_class, "_windowCloseButton", "NSWindowTitleButton");
class_addIvar(the_class, "_fieldEditor", "NSText");
class_addIvar(the_class, "_maxSize", "NSSize");
class_addIvar(the_class, "_minSize", "NSSize");
class_addIvar(the_class, "_wtFlags", "NSUInteger");
class_addIvar(the_class, "_windowClass", "id");

class_addMethod(the_class, "frameRectForContentRect:", function(self, _cmd, contentRect) {
if (Unhandled output_expression: [EQ_OP(), _styleMask (IDENTIFIER), 0 (CONSTANT)])
return contentRect;

var xOffset = 0;
var yOffset = 0;
var widthOffset = 0;
var heightOffset = 0;
Unhandled output_expression: [SUB_ASSIGN(SUB_ASSIGN), xOffset (IDENTIFIER), WINDOW_BORDER_SIZE (IDENTIFIER)];
Unhandled output_expression: [SUB_ASSIGN(SUB_ASSIGN), yOffset (IDENTIFIER), WINDOW_BORDER_SIZE (IDENTIFIER)];
Unhandled output_expression: [ADD_ASSIGN(ADD_ASSIGN), widthOffset (IDENTIFIER), [*(), 2 (CONSTANT), WINDOW_BORDER_SIZE (IDENTIFIER)]];
Unhandled output_expression: [ADD_ASSIGN(ADD_ASSIGN), heightOffset (IDENTIFIER), [*(), 2 (CONSTANT), WINDOW_BORDER_SIZE (IDENTIFIER)]];
Unhandled output_expression: [ADD_ASSIGN(ADD_ASSIGN), heightOffset (IDENTIFIER), WINDOW_TITLEBAR_SIZE (IDENTIFIER)];
return NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), contentRect (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], xOffset (IDENTIFIER)]Unhandled output_expression: [+(), [.(.), [.(.), contentRect (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], yOffset (IDENTIFIER)]Unhandled output_expression: [+(), [.(.), [.(.), contentRect (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], widthOffset (IDENTIFIER)]Unhandled output_expression: [+(), [.(.), [.(.), contentRect (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], heightOffset (IDENTIFIER)]);

}, "void");

class_addMethod(the_class, "contentRectForFrameRect:", function(self, _cmd, frameRect) {
return NSMakeRect(00frameRect.sihe.widthframeRect.size.height);

}, "void");

class_addMethod(the_class, "init", function(self, _cmd) {
self = objc_msgSendSuper({super_class:NSResponder, receiver:self}, "init");
if (self)
{

}


}, "void");

class_addMethod(the_class, "initWithContentRect:styleMask:backing:defer:", function(self, _cmd, contentRect, aStyle, bufferingType, flag) {
self = objc_msgSend(self, "init");
if (self)
{
objc_msgSend(self, "setFrame:display:", contentRect, YES);
_styleMask = aStyle;
_resizable = NO;
_firstResponder = self;
_movableByWindowBackground = YES;
_hasShadow = YES;
_isVisible = YES;
_contentView = objc_msgSend(objc_msgSend(NSView, "alloc"), "initWithFrame:", contentRect);
objc_msgSend(self, "setFrame:display:", contentRect, YES);
_windowNumber = objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "addWindow:", self);

}

return self;

}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSResponder, receiver:self}, "initWithCoder:", aCoder);
_maxSize = objc_msgSend(aCoder, "decodeSizeForKey:", "NSWindowContentSizeMax");
_minSize = objc_msgSend(aCoder, "decodeSizeForKey:", "NSWindowContentSizeMin");
_wtFlags = objc_msgSend(aCoder, "decodeIntForKey:", "NSWTFlags");
_windowClass = objc_msgSend(aCoder, "decodeStringForKey:", "NSWindowClass");
_styleMask = objc_msgSend(aCoder, "decodeIntForKey:", "NSWindowStyleMask");
_title = objc_msgSend(aCoder, "decodeStringForKey:", "NSWindowTitle");
_frame = objc_msgSend(self, "frameRectForContentRect:", objc_msgSend(aCoder, "decodeRectForKey:", "NSWindowRect"));
_contentView = objc_msgSend(aCoder, "decodeObjectForKey:", "NSWindowView");
objc_msgSend(self, "awakeAfterUsingCoder:", aCoder);
return self;

}, "void");

class_addMethod(the_class, "awakeAfterUsingCoder:", function(self, _cmd, aCoder) {
_gCanvas = NSWindowServerCreateCanvas(self);
_gCanvas.width = _frame.size.width;
_gCanvas.height = _frame.size.height;
_windowNumber = objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "addWindow:", self);
objc_msgSend(_contentView, "viewWillMoveToWindow:", self);
objc_msgSend(_contentView, "viewDidMoveToWindow:", self);
NSWindowServerSetOrigin(_gCanvas_frame.origin);
objc_msgSend(self, "makeKeyAndOrderFront:", self);

}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
objc_msgSend(self, "makeMainWindow");
_eventBindingCurrentX = objc_msgSend(theEvent, "locationInBase").x;
_eventBindingCurrentY = objc_msgSend(theEvent, "locationInBase").y;
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", Unhandled output_expression: [((), [|(), NSLeftMouseUpMask (IDENTIFIER), NSMouseMovedMask (IDENTIFIER)], ], nil, nil, nil, self, Unhandled output_expression: [AT_SELECTOR(AT_SELECTOR), _mouseDownHandle (IDENTIFIER), ]);

}, "void");

class_addMethod(the_class, "_mouseDownHandle:", function(self, _cmd, theEvent) {
if (Unhandled output_expression: [EQ_OP(), [M(), theEvent (IDENTIFIER), type (IDENTIFIER)], NSLeftMouseUp (IDENTIFIER)])
{

}
else
{
var newX = Unhandled output_expression: [+(), [((), [-(), [.(.), [M(), theEvent (IDENTIFIER), locationInBase (IDENTIFIER)], x (IDENTIFIER)], _eventBindingCurrentX (IDENTIFIER)], ], [.(.), [.(.), _frame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)]];
var newY = Unhandled output_expression: [+(), [((), [-(), [.(.), [M(), theEvent (IDENTIFIER), locationInBase (IDENTIFIER)], y (IDENTIFIER)], _eventBindingCurrentY (IDENTIFIER)], ], [.(.), [.(.), _frame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)]];
objc_msgSend(self, "setFrameOrigin:", NSMakePoint(newXnewY));
_eventBindingCurrentX = objc_msgSend(theEvent, "locationInBase").x;
_eventBindingCurrentY = objc_msgSend(theEvent, "locationInBase").y;
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", Unhandled output_expression: [((), [|(), NSLeftMouseUpMask (IDENTIFIER), NSMouseMovedMask (IDENTIFIER)], ], nil, nil, nil, self, Unhandled output_expression: [AT_SELECTOR(AT_SELECTOR), _mouseDownHandle (IDENTIFIER), ]);

}


}, "void");

class_addMethod(the_class, "title", function(self, _cmd) {
return _title;

}, "void");

class_addMethod(the_class, "setTitle:", function(self, _cmd, aString) {
_title = objc_msgSend(aString, "copy");
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "setRepresentedURL:", function(self, _cmd, url) {

}, "void");

class_addMethod(the_class, "representedURL", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "representedFilename", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setRepresentedFilename:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "setTitleWithRepresentedFilename:", function(self, _cmd, filename) {

}, "void");

class_addMethod(the_class, "setExcludedFromWindowsMenu:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isExcludedFromWindowsMenu", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setContentView:", function(self, _cmd, aView) {
if (_contentView)
objc_msgSend(_contentView, "removeFromSuperview");

_contentView = aView;
objc_msgSend(_contentView, "viewWillMoveToSuperview:", nil);
objc_msgSend(_contentView, "viewWillMoveToWindow:", self);
objc_msgSend(_contentView, "setFrame:", objc_msgSend(self, "contentRectForFrameRect:", _frame));
objc_msgSend(_contentView, "viewDidMoveToSuperview:", nil);
objc_msgSend(_contentView, "viewDidMoveToWindow:", self);
objc_msgSend(_contentView, "setNextResponder:", self);

}, "void");

class_addMethod(the_class, "contentView", function(self, _cmd) {
return _contentView;

}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "delegate", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "windowNumber", function(self, _cmd) {
return _windowNumber;

}, "void");

class_addMethod(the_class, "styleMask", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "fieldEditor:forObject:", function(self, _cmd, createFlag, anObject) {

}, "void");

class_addMethod(the_class, "endEditingFor:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "constrainFrameRect:toScreen:", function(self, _cmd, frameRect, screen) {

}, "void");

class_addMethod(the_class, "setFrame:display:", function(self, _cmd, frameRect, flag) {

}, "void");

class_addMethod(the_class, "setContentSize:", function(self, _cmd, aSize) {

}, "void");

class_addMethod(the_class, "setFrameOrigin:", function(self, _cmd, aPoint) {
_frame.origin.x = aPoint.x;
_frame.origin.y = aPoint.y;
NSWindowServerSetOrigin(_gCanvasaPoint);

}, "void");

class_addMethod(the_class, "setFrameTopLeftPoint:", function(self, _cmd, aPoint) {

}, "void");

class_addMethod(the_class, "cascadeTopLeftFromPoint:", function(self, _cmd, topLeftPoint) {

}, "void");

class_addMethod(the_class, "frame", function(self, _cmd) {
return _frame;

}, "void");

class_addMethod(the_class, "animationResizeTime:", function(self, _cmd, newFrame) {

}, "void");

class_addMethod(the_class, "setFrame:display:animate:", function(self, _cmd, frameRect, displayFlag, animateFlag) {

}, "void");

class_addMethod(the_class, "setShowsResizeIndicator:", function(self, _cmd, show) {

}, "void");

class_addMethod(the_class, "showsResizeIndicator", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setResizeIncrements:", function(self, _cmd, increments) {

}, "void");

class_addMethod(the_class, "resizeIncrements", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAspectRatio:", function(self, _cmd, ratio) {

}, "void");

class_addMethod(the_class, "aspectRatio", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setContentResizeIncrements:", function(self, _cmd, increments) {

}, "void");

class_addMethod(the_class, "contentResizeIncrements", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setContentAspectRatio:", function(self, _cmd, ratio) {

}, "void");

class_addMethod(the_class, "contentAspectRatio", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "useOptimizedDrawing:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "setViewsNeedDisplay:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "viewsNeedDisplay", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "displayIfNeeded", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "display", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAutodisplay:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isAutodisplay", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "preservesContentDuringLiveResize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setPreservesContentDuringLiveResize:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "update", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "makeFirstResponder:", function(self, _cmd, aResponder) {

}, "void");

class_addMethod(the_class, "firstResponder", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "resizeFlags", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "keyDown:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "close", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setReleasedWhenClosed:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isReleasedWhenClosed", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "miniaturize:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "deminiaturize:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "isZoomed", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "zoom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "isMiniaturized", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "tryToPerform:with:", function(self, _cmd, anAction, anObject) {

}, "void");

class_addMethod(the_class, "validRequestorForSendType:returnType:", function(self, _cmd, sendType, returnType) {

}, "void");

class_addMethod(the_class, "setBackgroundColor:", function(self, _cmd, color) {

}, "void");

class_addMethod(the_class, "backgroundColor", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setContentBorderThickness:forEdge:", function(self, _cmd, thickness, edge) {

}, "void");

class_addMethod(the_class, "contentBorderThicknessForEdge:", function(self, _cmd, edge) {

}, "void");

class_addMethod(the_class, "setAutorecalculatesContentBorderThickness:forEdge:", function(self, _cmd, flag, edge) {

}, "void");

class_addMethod(the_class, "autorecalculatesContentBorderThicknessForEdge:", function(self, _cmd, edge) {

}, "void");

class_addMethod(the_class, "setMovableByWindowBackground:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isMovableByWindowBackground", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setHidesOnDeactivate:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "hidesOnDeactivate", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "center", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "makeKeyAndOrderFront:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "orderFront:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "orderBack:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "orderOut:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "orderWindow:relativeTo:", function(self, _cmd, place, otherWin) {

}, "void");

class_addMethod(the_class, "orderFrontRegardless", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setMiniwindowImage:", function(self, _cmd, image) {

}, "void");

class_addMethod(the_class, "setMiniwindowTitle:", function(self, _cmd, title) {

}, "void");

class_addMethod(the_class, "miniwindowImage", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "miniwindowTitle", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setDocumentEdited:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isDocumentEdited", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isVisible", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isKeyWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isMainWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "canBecomeKeyWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "canBecomeMainWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "makeKeyWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "makeMainWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "becomeKeyWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "resignKeyWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "becomeMainWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "resignMainWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "worksWhenModal", function(self, _cmd) {
return NO;

}, "void");

class_addMethod(the_class, "convertBaseToScreen:", function(self, _cmd, aPoint) {

}, "void");

class_addMethod(the_class, "convertScreenToBase:", function(self, _cmd, aPoint) {

}, "void");

class_addMethod(the_class, "performClose:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "performMiniaturize:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "performZoom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "gState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setOneShot:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isOneShot", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "disableCursorRects", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "enableCursorRects", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "discardCursorRects", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "areCursorRectsEnabled", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "invalidateCursorRectsForView:", function(self, _cmd, aView) {

}, "void");

class_addMethod(the_class, "resetCursorRects", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBackingType:", function(self, _cmd, bufferingType) {

}, "void");

class_addMethod(the_class, "backingType", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setLevel:", function(self, _cmd, newLevel) {

}, "void");

class_addMethod(the_class, "level", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setDepthLimit:", function(self, _cmd, limit) {

}, "void");

class_addMethod(the_class, "depthLimit", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setDynamicDepthLimit:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "hasDynamicDepthLimit", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "screen", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "deepestScreen", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "canStoreColor", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setHasShadow:", function(self, _cmd, hasShadow) {

}, "void");

class_addMethod(the_class, "hasShadow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "invalidateShadow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAlphaValue:", function(self, _cmd, windowAlpha) {

}, "void");

class_addMethod(the_class, "alphaValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setOpaque:", function(self, _cmd, isOpaque) {

}, "void");

class_addMethod(the_class, "isOpaque", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "cacheImageInRect:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "restoreCachedImage", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "discardCachedImage", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "minSize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "maxSize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setMinSize:", function(self, _cmd, size) {

}, "void");

class_addMethod(the_class, "setMaxSize:", function(self, _cmd, size) {

}, "void");

class_addMethod(the_class, "contentMinSize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "contentMaxSize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setContentMinSize:", function(self, _cmd, size) {

}, "void");

class_addMethod(the_class, "setContentMaxSize:", function(self, _cmd, size) {

}, "void");

class_addMethod(the_class, "nextEventMatchingMask:", function(self, _cmd, mask) {

}, "void");

class_addMethod(the_class, "nextEventMatchingMask:untilDate:inMode:dequeue:", function(self, _cmd, mask, expiration, mode, deqFlag) {

}, "void");

class_addMethod(the_class, "discardEventsMatchingMask:beforeEvent:", function(self, _cmd, mask, lastEvent) {

}, "void");

class_addMethod(the_class, "postEvent:atStart:", function(self, _cmd, event, flag) {

}, "void");

class_addMethod(the_class, "currentEvent", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAcceptsMouseMovedEvents:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "acceptsMouseMovedEvents", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setIgnoresMouseEvents:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "ignoresMouseEvents", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "sendEvent:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "mouseLocationOutsideOfEventStream", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "windowController", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setWindowController:", function(self, _cmd, windowController) {

}, "void");

class_addMethod(the_class, "isSheet", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "attachedSheet", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "standardWindowButton:", function(self, _cmd, b) {

}, "void");

class_addMethod(the_class, "addChildWindow:ordered:", function(self, _cmd, childWin, place) {

}, "void");

class_addMethod(the_class, "removeChildWindow:", function(self, _cmd, childWin) {

}, "void");

class_addMethod(the_class, "childWindows", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "parentWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setParentWindow:", function(self, _cmd, window) {

}, "void");

class_addMethod(the_class, "graphicsContext", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "frameRectForContentRect:styleMask:", function(self, _cmd, cRect, aStyle) {

}, "void");

class_addMethod(meta_class, "contentRectForFrameRect:styleMask:", function(self, _cmd, fRect, aStyle) {

}, "void");

class_addMethod(meta_class, "minFrameWidthWithTitle:styleMask:", function(self, _cmd, aTitle, aStyle) {

}, "void");

class_addMethod(meta_class, "defaultDepthLimit", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "menuChanged:", function(self, _cmd, menu) {

}, "void");

class_addMethod(meta_class, "standardWindowButton:forStyleMask:", function(self, _cmd, b, styleMask) {

}, "void");

var the_class = NSWindow;
var meta_class = the_class.isa;

class_addMethod(the_class, "setInitialFirstResponder:", function(self, _cmd, view) {

}, "void");

class_addMethod(the_class, "initialFirstResponder", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "selectNextKeyView:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "selectPreviousKeyView:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "selectKeyViewFollowingView:", function(self, _cmd, aView) {

}, "void");

class_addMethod(the_class, "selectKeyViewPrecedingView:", function(self, _cmd, aView) {

}, "void");

class_addMethod(the_class, "keyViewSelectionDirection", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setDefaultButtonCell:", function(self, _cmd, defButt) {

}, "void");

class_addMethod(the_class, "defaultButtonCell", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "disableKeyEquivalentForDefaultButtonCell", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "enableKeyEquivalentForDefaultButtonCell", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAutorecalculatesKeyViewLoop:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "autorecalculatesKeyViewLoop", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "recalculateKeyViewLoop", function(self, _cmd) {

}, "void");

var the_class = NSWindow;
var meta_class = the_class.isa;

class_addMethod(the_class, "setToolbar:", function(self, _cmd, toolbar) {

}, "void");

class_addMethod(the_class, "toolbar", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "toggleToolbarShown:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "runToolbarCustomizationPalette:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "setShowsToolbarButton:", function(self, _cmd, show) {

}, "void");

class_addMethod(the_class, "showsToolbarButton", function(self, _cmd) {

}, "void");

var the_class = NSWindow;
var meta_class = the_class.isa;

class_addMethod(the_class, "dragImage:at:offset:event:pasteboard:source:slideBack:", function(self, _cmd, anImage, baseLocation, initialOffset, event, pboard, sourceObj, slideFlag) {

}, "void");

class_addMethod(the_class, "registerForDraggedTypes:", function(self, _cmd, newTypes) {

}, "void");

class_addMethod(the_class, "unregisterDraggedTypes", function(self, _cmd) {

}, "void");

