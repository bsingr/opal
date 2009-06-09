var NSWindowDidBecomeKeyNotification = "NSWindowDidBecomeKeyNotification";
var NSWindowDidBecomeMainNotification = "NSWindowDidBecomeMainNotification";
var NSWindowDidChangeScreenNotification = "NSWindowDidChangeScreenNotification";
var NSWindowDidDeminiaturizeNotification = "NSWindowDidDeminiaturizeNotification";
var NSWindowDidExposeNotification = "NSWindowDidExposeNotification";
var NSWindowDidMiniaturizeNotification = "NSWindowDidMiniaturizeNotification";
var NSWindowDidMoveNotification = "NSWindowDidMoveNotification";
var NSWindowDidResignKeyNotification = "NSWindowDidResignKeyNotification";
var NSWindowDidResignMainNotification = "NSWindowDidResignMainNotification";
var NSWindowDidResizeNotification = "NSWindowDidResizeNotification";
var NSWindowDidUpdateNotification = "NSWindowDidUpdateNotification";
var NSWindowWillCloseNotification = "NSWindowWillCloseNotification";
var NSWindowWillMiniaturizeNotification = "NSWindowWillMiniaturizeNotification";
var NSWindowWillMoveNotification = "NSWindowWillMoveNotification";
var NSWindowWillBeginSheetNotification = "NSWindowWillBeginSheetNotification";
var NSWindowDidEndSheetNotification = "NSWindowDidEndSheetNotification";
var NSWindowDidChangeScreenProfileNotification = "NSWindowDidChangeScreenProfileNotification";
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
class_addIvar(the_class, "_DOMContainer", "CGDOMElementRef");
class_addIvar(the_class, "_DOMGraphicsContext", "CGDOMElementRef");
class_addIvar(the_class, "_graphicsContext", "NSGraphicsContext");

class_addMethod(the_class, "DOMContainer", function(self, _cmd) {
with(self) {
return _DOMContainer;
}
}, "void");

class_addMethod(the_class, "frameRectForContentRect:", function(self, _cmd, contentRect) {
with(self) {
return contentRect;
var WINDOW_BORDER_SIZE = 1;
var WINDOW_TITLEBAR_SIZE = 20;
if (_styleMask == 0)
return contentRect;

var xOffset = 0;
var yOffset = 0;
var widthOffset = 0;
var heightOffset = 0;
xOffset -= WINDOW_BORDER_SIZE;
yOffset -= WINDOW_BORDER_SIZE;
widthOffset += 2 * WINDOW_BORDER_SIZE;
heightOffset += 2 * WINDOW_BORDER_SIZE;
heightOffset += WINDOW_TITLEBAR_SIZE;
return NSMakeRect(contentRect.origin.x + xOffset,contentRect.origin.y + yOffset,contentRect.size.width + widthOffset,contentRect.size.height + heightOffset);
}
}, "void");

class_addMethod(the_class, "contentRectForFrameRect:", function(self, _cmd, frameRect) {
with(self) {
return frameRect;
}
}, "void");

class_addMethod(the_class, "init", function(self, _cmd) {
with(self) {
self = objc_msgSendSuper({super_class:NSResponder, receiver:self}, "init");
if (self)
{

}

return self;
}
}, "void");

class_addMethod(the_class, "initWithContentRect:styleMask:backing:defer:", function(self, _cmd, contentRect, aStyle, bufferingType, flag) {
with(self) {
self = objc_msgSendSuper({super_class:NSResponder, receiver:self}, "init");
if (self)
{
_DOMContainer = CGDOMElementCreate("div");
_DOMGraphicsContext = CGDOMElementCreate("canvas");
CGDOMElementAppendChild(_DOMContainer,_DOMGraphicsContext);
CGDOMElementAppendChild(CGDOMElementGetRootElement(),_DOMContainer);
_windowNumber = objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "addWindow:", self);
_styleMask = aStyle;
_level = 10;
_minSize = NSMakeSize(0.0,0.0);
_maxSize = NSMakeSize(9999.0,9999.0);
_frame = objc_msgSend(self, "frameRectForContentRect:", contentRect);
objc_msgSend(self, "setContentView:", objc_msgSend(objc_msgSend(NSView, "alloc"), "initWithFrame:", contentRect));
_firstResponder = self;
objc_msgSend(self, "setNextResponder:", objc_msgSend(NSApplication, "sharedApplication"));
objc_msgSend(self, "setFrame:display:", objc_msgSend(self, "frameRectForContentRect:", contentRect), NO);
objc_msgSend(self, "setNeedsDisplay:", YES);

}

return self;
}
}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
objc_msgSendSuper({super_class:NSResponder, receiver:self}, "initWithCoder:", aCoder);
_maxSize = objc_msgSend(aCoder, "decodeSizeForKey:", "NSWindowContentSizeMax");
_minSize = objc_msgSend(aCoder, "decodeSizeForKey:", "NSWindowContentSizeMin");
_wtFlags = objc_msgSend(aCoder, "decodeIntForKey:", "NSWTFlags");
_windowClass = objc_msgSend(aCoder, "decodeObjectForKey:", "NSWindowClass");
_styleMask = objc_msgSend(aCoder, "decodeIntForKey:", "NSWindowStyleMask");
_title = objc_msgSend(aCoder, "decodeObjectForKey:", "NSWindowTitle");
_frame = objc_msgSend(self, "frameRectForContentRect:", objc_msgSend(aCoder, "decodeRectForKey:", "NSWindowRect"));
_contentView = objc_msgSend(aCoder, "decodeObjectForKey:", "NSWindowView");
objc_msgSend(self, "awakeAfterUsingCoder:", aCoder);
return self;
}
}, "void");

class_addMethod(the_class, "awakeAfterUsingCoder:", function(self, _cmd, aCoder) {
with(self) {
_gCanvas = NSWindowServerCreateCanvas(self);
_gCanvas.width = _frame.size.width;
_gCanvas.height = _frame.size.height;
_windowNumber = objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "addWindow:", self);
objc_msgSend(_contentView, "viewWillMoveToWindow:", self);
objc_msgSend(_contentView, "viewDidMoveToWindow:", self);
NSWindowServerSetOrigin(_gCanvas,_frame.origin);
objc_msgSend(self, "makeKeyAndOrderFront:", self);
}
}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
with(self) {
objc_msgSend(self, "makeMainWindow");
_eventBindingCurrentX = objc_msgSend(theEvent, "locationInBase").x;
_eventBindingCurrentY = objc_msgSend(theEvent, "locationInBase").y;
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", (NSLeftMouseUpMask | NSMouseMovedMask), null, null, null, self, "selector:");
}
}, "void");

class_addMethod(the_class, "_mouseDownHandle:", function(self, _cmd, theEvent) {
with(self) {
if (objc_msgSend(theEvent, "type") == NSLeftMouseUp)
{

}
else
{
var newX = (objc_msgSend(theEvent, "locationInBase").x - _eventBindingCurrentX) + _frame.origin.x;
var newY = (objc_msgSend(theEvent, "locationInBase").y - _eventBindingCurrentY) + _frame.origin.y;
objc_msgSend(self, "setFrameOrigin:", NSMakePoint(newX,newY));
_eventBindingCurrentX = objc_msgSend(theEvent, "locationInBase").x;
_eventBindingCurrentY = objc_msgSend(theEvent, "locationInBase").y;
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", (NSLeftMouseUpMask | NSMouseMovedMask), null, null, null, self, "selector:");

}

}
}, "void");

class_addMethod(the_class, "title", function(self, _cmd) {
with(self) {
return _title;
}
}, "void");

class_addMethod(the_class, "setTitle:", function(self, _cmd, aString) {
with(self) {
_title = objc_msgSend(aString, "copy");
objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "setRepresentedURL:", function(self, _cmd, url) {
with(self) {
}
}, "void");

class_addMethod(the_class, "representedURL", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "representedFilename", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setRepresentedFilename:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTitleWithRepresentedFilename:", function(self, _cmd, filename) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setExcludedFromWindowsMenu:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isExcludedFromWindowsMenu", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setContentView:", function(self, _cmd, aView) {
with(self) {
if (_contentView)
objc_msgSend(_contentView, "removeFromSuperview");

_contentView = aView;
objc_msgSend(_contentView, "viewWillMoveToSuperview:", null);
objc_msgSend(_contentView, "viewWillMoveToWindow:", self);
objc_msgSend(_contentView, "setFrame:", objc_msgSend(self, "contentRectForFrameRect:", _frame));
objc_msgSend(_contentView, "viewDidMoveToSuperview");
objc_msgSend(_contentView, "viewDidMoveToWindow");
objc_msgSend(_contentView, "setNextResponder:", self);
CGDOMElementAppendChild(objc_msgSend(self, "DOMContainer"),objc_msgSend(_contentView, "DOMContainer"));
}
}, "void");

class_addMethod(the_class, "contentView", function(self, _cmd) {
with(self) {
return _contentView;
}
}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, anObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "delegate", function(self, _cmd) {
with(self) {
return _delegate;
}
}, "void");

class_addMethod(the_class, "windowNumber", function(self, _cmd) {
with(self) {
return _windowNumber;
}
}, "void");

class_addMethod(the_class, "styleMask", function(self, _cmd) {
with(self) {
return _styleMask;
}
}, "void");

class_addMethod(the_class, "fieldEditor:forObject:", function(self, _cmd, createFlag, anObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "endEditingFor:", function(self, _cmd, anObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "constrainFrameRect:toScreen:", function(self, _cmd, frameRect, screen) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setFrame:display:", function(self, _cmd, frameRect, flag) {
with(self) {
_frame = frameRect;
CGDOMElementSetFrame(_DOMContainer,_frame);
CGDOMElementSetFrame(_DOMGraphicsContext,_frame);
objc_msgSend(self, "setNeedsDisplay:", YES);
}
}, "void");

class_addMethod(the_class, "setContentSize:", function(self, _cmd, aSize) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setFrameOrigin:", function(self, _cmd, aPoint) {
with(self) {
_frame.origin.x = aPoint.x;
_frame.origin.y = aPoint.y;
NSWindowServerSetOrigin(_gCanvas,aPoint);
}
}, "void");

class_addMethod(the_class, "setFrameTopLeftPoint:", function(self, _cmd, aPoint) {
with(self) {
}
}, "void");

class_addMethod(the_class, "cascadeTopLeftFromPoint:", function(self, _cmd, topLeftPoint) {
with(self) {
}
}, "void");

class_addMethod(the_class, "frame", function(self, _cmd) {
with(self) {
return _frame;
}
}, "void");

class_addMethod(the_class, "bounds", function(self, _cmd) {
with(self) {
return NSMakeRect(0,0,_frame.size.width,_frame.size.height);
}
}, "void");

class_addMethod(the_class, "animationResizeTime:", function(self, _cmd, newFrame) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setFrame:display:animate:", function(self, _cmd, frameRect, displayFlag, animateFlag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setShowsResizeIndicator:", function(self, _cmd, show) {
with(self) {
}
}, "void");

class_addMethod(the_class, "showsResizeIndicator", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setResizeIncrements:", function(self, _cmd, increments) {
with(self) {
}
}, "void");

class_addMethod(the_class, "resizeIncrements", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAspectRatio:", function(self, _cmd, ratio) {
with(self) {
}
}, "void");

class_addMethod(the_class, "aspectRatio", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setContentResizeIncrements:", function(self, _cmd, increments) {
with(self) {
}
}, "void");

class_addMethod(the_class, "contentResizeIncrements", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setContentAspectRatio:", function(self, _cmd, ratio) {
with(self) {
}
}, "void");

class_addMethod(the_class, "contentAspectRatio", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "useOptimizedDrawing:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setViewsNeedDisplay:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "viewsNeedDisplay", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "displayIfNeeded", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "display", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAutodisplay:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isAutodisplay", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "preservesContentDuringLiveResize", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setPreservesContentDuringLiveResize:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "update", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "makeFirstResponder:", function(self, _cmd, aResponder) {
with(self) {
}
}, "void");

class_addMethod(the_class, "firstResponder", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "resizeFlags", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "keyDown:", function(self, _cmd, theEvent) {
with(self) {
}
}, "void");

class_addMethod(the_class, "close", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setReleasedWhenClosed:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isReleasedWhenClosed", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "miniaturize:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "deminiaturize:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isZoomed", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "zoom:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isMiniaturized", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "tryToPerform:with:", function(self, _cmd, anAction, anObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "validRequestorForSendType:returnType:", function(self, _cmd, sendType, returnType) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setBackgroundColor:", function(self, _cmd, color) {
with(self) {
}
}, "void");

class_addMethod(the_class, "backgroundColor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setContentBorderThickness:forEdge:", function(self, _cmd, thickness, edge) {
with(self) {
}
}, "void");

class_addMethod(the_class, "contentBorderThicknessForEdge:", function(self, _cmd, edge) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAutorecalculatesContentBorderThickness:forEdge:", function(self, _cmd, flag, edge) {
with(self) {
}
}, "void");

class_addMethod(the_class, "autorecalculatesContentBorderThicknessForEdge:", function(self, _cmd, edge) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setMovableByWindowBackground:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isMovableByWindowBackground", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setHidesOnDeactivate:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "hidesOnDeactivate", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "center", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "makeKeyAndOrderFront:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "orderFront:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "orderBack:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "orderOut:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "orderWindow:relativeTo:", function(self, _cmd, place, otherWin) {
with(self) {
}
}, "void");

class_addMethod(the_class, "orderFrontRegardless", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setMiniwindowImage:", function(self, _cmd, image) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setMiniwindowTitle:", function(self, _cmd, title) {
with(self) {
}
}, "void");

class_addMethod(the_class, "miniwindowImage", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "miniwindowTitle", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setDocumentEdited:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isDocumentEdited", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isVisible", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isKeyWindow", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isMainWindow", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "canBecomeKeyWindow", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "canBecomeMainWindow", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "makeKeyWindow", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "makeMainWindow", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "becomeKeyWindow", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "resignKeyWindow", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "becomeMainWindow", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "resignMainWindow", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "worksWhenModal", function(self, _cmd) {
with(self) {
return NO;
}
}, "void");

class_addMethod(the_class, "convertBaseToScreen:", function(self, _cmd, aPoint) {
with(self) {
}
}, "void");

class_addMethod(the_class, "convertScreenToBase:", function(self, _cmd, aPoint) {
with(self) {
}
}, "void");

class_addMethod(the_class, "performClose:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "performMiniaturize:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "performZoom:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "gState", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setOneShot:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isOneShot", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "disableCursorRects", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "enableCursorRects", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "discardCursorRects", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "areCursorRectsEnabled", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "invalidateCursorRectsForView:", function(self, _cmd, aView) {
with(self) {
}
}, "void");

class_addMethod(the_class, "resetCursorRects", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setBackingType:", function(self, _cmd, bufferingType) {
with(self) {
}
}, "void");

class_addMethod(the_class, "backingType", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setLevel:", function(self, _cmd, newLevel) {
with(self) {
}
}, "void");

class_addMethod(the_class, "level", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setDepthLimit:", function(self, _cmd, limit) {
with(self) {
}
}, "void");

class_addMethod(the_class, "depthLimit", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setDynamicDepthLimit:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "hasDynamicDepthLimit", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "screen", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "deepestScreen", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "canStoreColor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setHasShadow:", function(self, _cmd, hasShadow) {
with(self) {
}
}, "void");

class_addMethod(the_class, "hasShadow", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "invalidateShadow", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAlphaValue:", function(self, _cmd, windowAlpha) {
with(self) {
}
}, "void");

class_addMethod(the_class, "alphaValue", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setOpaque:", function(self, _cmd, isOpaque) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isOpaque", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "cacheImageInRect:", function(self, _cmd, aRect) {
with(self) {
}
}, "void");

class_addMethod(the_class, "restoreCachedImage", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "discardCachedImage", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "minSize", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "maxSize", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setMinSize:", function(self, _cmd, size) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setMaxSize:", function(self, _cmd, size) {
with(self) {
}
}, "void");

class_addMethod(the_class, "contentMinSize", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "contentMaxSize", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setContentMinSize:", function(self, _cmd, size) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setContentMaxSize:", function(self, _cmd, size) {
with(self) {
}
}, "void");

class_addMethod(the_class, "nextEventMatchingMask:", function(self, _cmd, mask) {
with(self) {
}
}, "void");

class_addMethod(the_class, "nextEventMatchingMask:untilDate:inMode:dequeue:", function(self, _cmd, mask, expiration, mode, deqFlag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "discardEventsMatchingMask:beforeEvent:", function(self, _cmd, mask, lastEvent) {
with(self) {
}
}, "void");

class_addMethod(the_class, "postEvent:atStart:", function(self, _cmd, event, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "currentEvent", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAcceptsMouseMovedEvents:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "acceptsMouseMovedEvents", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setIgnoresMouseEvents:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "ignoresMouseEvents", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "sendEvent:", function(self, _cmd, theEvent) {
with(self) {
}
}, "void");

class_addMethod(the_class, "mouseLocationOutsideOfEventStream", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "windowController", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setWindowController:", function(self, _cmd, windowController) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isSheet", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "attachedSheet", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "standardWindowButton:", function(self, _cmd, b) {
with(self) {
}
}, "void");

class_addMethod(the_class, "addChildWindow:ordered:", function(self, _cmd, childWin, place) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeChildWindow:", function(self, _cmd, childWin) {
with(self) {
}
}, "void");

class_addMethod(the_class, "childWindows", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "parentWindow", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setParentWindow:", function(self, _cmd, window) {
with(self) {
}
}, "void");

class_addMethod(the_class, "graphicsContext", function(self, _cmd) {
with(self) {
return CGDOMElementGetContext(_DOMGraphicsContext);
}
}, "void");

class_addMethod(meta_class, "frameRectForContentRect:styleMask:", function(self, _cmd, cRect, aStyle) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "contentRectForFrameRect:styleMask:", function(self, _cmd, fRect, aStyle) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "minFrameWidthWithTitle:styleMask:", function(self, _cmd, aTitle, aStyle) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "defaultDepthLimit", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "menuChanged:", function(self, _cmd, menu) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "standardWindowButton:forStyleMask:", function(self, _cmd, b, styleMask) {
with(self) {
}
}, "void");

var the_class = NSWindow;
var meta_class = the_class.isa;

class_addMethod(the_class, "setInitialFirstResponder:", function(self, _cmd, view) {
with(self) {
}
}, "void");

class_addMethod(the_class, "initialFirstResponder", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "selectNextKeyView:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "selectPreviousKeyView:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "selectKeyViewFollowingView:", function(self, _cmd, aView) {
with(self) {
}
}, "void");

class_addMethod(the_class, "selectKeyViewPrecedingView:", function(self, _cmd, aView) {
with(self) {
}
}, "void");

class_addMethod(the_class, "keyViewSelectionDirection", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setDefaultButtonCell:", function(self, _cmd, defButt) {
with(self) {
}
}, "void");

class_addMethod(the_class, "defaultButtonCell", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "disableKeyEquivalentForDefaultButtonCell", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "enableKeyEquivalentForDefaultButtonCell", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAutorecalculatesKeyViewLoop:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "autorecalculatesKeyViewLoop", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "recalculateKeyViewLoop", function(self, _cmd) {
with(self) {
}
}, "void");

var the_class = NSWindow;
var meta_class = the_class.isa;

class_addMethod(the_class, "setToolbar:", function(self, _cmd, toolbar) {
with(self) {
}
}, "void");

class_addMethod(the_class, "toolbar", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "toggleToolbarShown:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "runToolbarCustomizationPalette:", function(self, _cmd, sender) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setShowsToolbarButton:", function(self, _cmd, show) {
with(self) {
}
}, "void");

class_addMethod(the_class, "showsToolbarButton", function(self, _cmd) {
with(self) {
}
}, "void");

var the_class = NSWindow;
var meta_class = the_class.isa;

class_addMethod(the_class, "dragImage:at:offset:event:pasteboard:source:slideBack:", function(self, _cmd, anImage, baseLocation, initialOffset, event, pboard, sourceObj, slideFlag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "registerForDraggedTypes:", function(self, _cmd, newTypes) {
with(self) {
}
}, "void");

class_addMethod(the_class, "unregisterDraggedTypes", function(self, _cmd) {
with(self) {
}
}, "void");

var the_class = NSWindow;
var meta_class = the_class.isa;

class_addMethod(the_class, "canDraw", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setNeedsDisplay:", function(self, _cmd, flag) {
with(self) {
if (flag)
objc_msgSend(self, "setNeedsDisplayInRect:", objc_msgSend(self, "bounds"));

}
}, "void");

class_addMethod(the_class, "setNeedsDisplayInRect:", function(self, _cmd, invalidRect) {
with(self) {
objc_msgSend(self, "displayRect:", invalidRect);
}
}, "void");

class_addMethod(the_class, "needsDisplay", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "lockFocus", function(self, _cmd) {
with(self) {
if (!_graphicsContext)
_graphicsContext = objc_msgSend(NSGraphicsContext, "graphicsContextWithGraphicsPort:flipped:", CGDOMElementGetContext(_DOMGraphicsContext), NO);

objc_msgSend(NSGraphicsContext, "setCurrentContext:", _graphicsContext);
CGContextSaveGState(objc_msgSend(_graphicsContext, "graphicsPort"));
}
}, "void");

class_addMethod(the_class, "unlockFocus", function(self, _cmd) {
with(self) {
CGContextRestoreGState(objc_msgSend(_graphicsContext, "graphicsPort"));
objc_msgSend(NSGraphicsContext, "setCurrentContext:", null);
}
}, "void");

class_addMethod(the_class, "lockFocusIfCanDraw", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "lockFocusIfCanDrawInContext:", function(self, _cmd, context) {
with(self) {
}
}, "void");

class_addMethod(the_class, "display", function(self, _cmd) {
with(self) {
objc_msgSend(self, "displayRect:", objc_msgSend(self, "bounds"));
}
}, "void");

class_addMethod(the_class, "displayIfNeeded", function(self, _cmd) {
with(self) {
if (objc_msgSend(self, "needsDisplay"))
objc_msgSend(self, "displayRect:", objc_msgSend(self, "bounds"));

}
}, "void");

class_addMethod(the_class, "displayIfNeededIgnoringOpacity", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "displayRect:", function(self, _cmd, rect) {
with(self) {
objc_msgSend(self, "displayRectIgnoringOpacity:inContext:", rect, null);
}
}, "void");

class_addMethod(the_class, "displayIfNeededInRect:", function(self, _cmd, rect) {
with(self) {
if (objc_msgSend(self, "needsDisplay"))
objc_msgSend(self, "displayRect:", objc_msgSend(self, "bounds"));

}
}, "void");

class_addMethod(the_class, "displayRectIgnoringOpacity:", function(self, _cmd, rect) {
with(self) {
}
}, "void");

class_addMethod(the_class, "displayIfNeededInRectIgnoringOpacity:", function(self, _cmd, rect) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, rect) {
with(self) {
var context = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
CGContextFillRect(context,rect);
}
}, "void");

class_addMethod(the_class, "displayRectIgnoringOpacity:inContext:", function(self, _cmd, aRect, context) {
with(self) {
objc_msgSend(self, "lockFocus");
objc_msgSend(self, "drawRect:", aRect);
objc_msgSend(self, "unlockFocus");
}
}, "void");

class_addMethod(the_class, "bitmapImageRepForCachingDisplayInRect:", function(self, _cmd, rect) {
with(self) {
}
}, "void");

class_addMethod(the_class, "cacheDisplayInRect:toBitmapImageRep:", function(self, _cmd, rect, bitmapImageRep) {
with(self) {
}
}, "void");

