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

var the_class = objc_allocateClassPair(NSResponder, "NSView");
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

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
self = objc_msgSend(self, "init");
if (self)
{
_frame = frameRect;
_bounds = NSMakeRect(00_frame.size.width_frame.size.height);
_subviews = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
objc_msgSend(self, "setFrame:", frameRect);

}

return self;

}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSResponder, receiver:self}, "initWithCoder:", aCoder);
_frame = NSMakeRect(0000);
_bounds = NSMakeRect(0000);
if (objc_msgSend(aCoder, "containsValueForKey:", "NSFrame"))
_frame = objc_msgSend(aCoder, "decodeRectForKey:", "NSFrame");
else
if (objc_msgSend(aCoder, "containsValueForKey:", "NSFrameSize"))
_frame.size = objc_msgSend(aCoder, "decodeSizeForKey:", "NSFrameSize");


_bounds.origin = NSMakePoint(00);
_bounds.size = _frame.size;
_superview = nil;
_window = nil;

}, "void");

class_addMethod(the_class, "window", function(self, _cmd) {
return _window;

}, "void");

class_addMethod(the_class, "superview", function(self, _cmd) {
return _superview;

}, "void");

class_addMethod(the_class, "subviews", function(self, _cmd) {
return _subviews;

}, "void");

class_addMethod(the_class, "isDescendantOf:", function(self, _cmd, aView) {

}, "void");

class_addMethod(the_class, "ancestorSharedWithView:", function(self, _cmd, aView) {

}, "void");

class_addMethod(the_class, "opaqueAncestor", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setHidden:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isHidden", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isHiddenOrHasHiddenAncestor", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "getRectsBeingDrawn:count:", function(self, _cmd, rects, count) {

}, "void");

class_addMethod(the_class, "needsToDrawRect:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "wantsDefaultClipping", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "viewDidHide", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "viewDidUnhide", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setSubviews:", function(self, _cmd, newSubviews) {

}, "void");

class_addMethod(the_class, "addSubview:", function(self, _cmd, aView) {
objc_msgSend(aView, "viewWillMoveToSuperview:", self);
objc_msgSend(aView, "viewWillMoveToWindow:", _window);
objc_msgSend(aView, "viewDidMoveToSuperview:", self);
objc_msgSend(aView, "viewDidMoveToWindow:", _window);
objc_msgSend(self, "didAddSubview:", aView);
objc_msgSend(_subviews, "addObject:", aView);

}, "void");

class_addMethod(the_class, "addSubview:positioned:relativeTo:", function(self, _cmd, aView, place, otherView) {

}, "void");

class_addMethod(the_class, "sortSubviewsUsingFunction:context:", function(self, _cmd, compare, context) {

}, "void");

class_addMethod(the_class, "viewWillMoveToWindow:", function(self, _cmd, newWindow) {

}, "void");

class_addMethod(the_class, "viewDidMoveToWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "viewWillMoveToSuperview:", function(self, _cmd, newSuperview) {

}, "void");

class_addMethod(the_class, "viewDidMoveToSuperview", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "didAddSubview:", function(self, _cmd, subview) {

}, "void");

class_addMethod(the_class, "willRemoveSubview:", function(self, _cmd, subview) {

}, "void");

class_addMethod(the_class, "removeFromSuperview", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "replaceSubview:with:", function(self, _cmd, oldView, newView) {

}, "void");

class_addMethod(the_class, "removeFromSuperviewWithoutNeedingDisplay", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setPostsFrameChangedNotifications:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "postsFrameChangedNotifications", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "resizeSubviewsWithOldSize:", function(self, _cmd, oldSize) {

}, "void");

class_addMethod(the_class, "resizeWithOldSuperviewSize:", function(self, _cmd, oldSize) {

}, "void");

class_addMethod(the_class, "setAutoresizesSubviews:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "autoresizesSubviews", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAutoresizingMask:", function(self, _cmd, mask) {

}, "void");

class_addMethod(the_class, "autoresizingMask", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setFrameOrigin:", function(self, _cmd, newOrigin) {

}, "void");

class_addMethod(the_class, "setFrameSize:", function(self, _cmd, newSize) {

}, "void");

class_addMethod(the_class, "setFrame:", function(self, _cmd, frameRect) {

}, "void");

class_addMethod(the_class, "frame", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setFrameRotation:", function(self, _cmd, angle) {

}, "void");

class_addMethod(the_class, "frameRotation", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setFrameCenterRotation:", function(self, _cmd, angle) {

}, "void");

class_addMethod(the_class, "frameCenterRotation", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBoundsOrigin:", function(self, _cmd, newOrigin) {

}, "void");

class_addMethod(the_class, "setBoundsSize:", function(self, _cmd, newSize) {

}, "void");

class_addMethod(the_class, "setBoundsRotation:", function(self, _cmd, angle) {

}, "void");

class_addMethod(the_class, "boundsRotation", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "translateOriginToPoint:", function(self, _cmd, translation) {

}, "void");

class_addMethod(the_class, "scaleUnitSquareToSize:", function(self, _cmd, newUnitSize) {

}, "void");

class_addMethod(the_class, "rotateByAngle:", function(self, _cmd, angle) {

}, "void");

class_addMethod(the_class, "setBounds:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "bounds", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isFlipped", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isRotatedFromBase", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isRotatedOrScaledFromBase", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isOpaque", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "convertPoint:fromView:", function(self, _cmd, aPoint, aView) {

}, "void");

class_addMethod(the_class, "convertPoint:toView:", function(self, _cmd, aPoint, aView) {

}, "void");

class_addMethod(the_class, "convertSize:fromView:", function(self, _cmd, aSize, aView) {

}, "void");

class_addMethod(the_class, "convertSize:toView:", function(self, _cmd, aSize, aView) {

}, "void");

class_addMethod(the_class, "convertRect:fromView:", function(self, _cmd, aRect, aView) {

}, "void");

class_addMethod(the_class, "convertRect:toView:", function(self, _cmd, aRect, aView) {

}, "void");

class_addMethod(the_class, "centerScanRect:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "convertPointToBase:", function(self, _cmd, aPoint) {

}, "void");

class_addMethod(the_class, "convertPointFromBase:", function(self, _cmd, aPoint) {

}, "void");

class_addMethod(the_class, "convertSizeToBase:", function(self, _cmd, aSize) {

}, "void");

class_addMethod(the_class, "convertSizeFromBase:", function(self, _cmd, aSize) {

}, "void");

class_addMethod(the_class, "convertRectToBase:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "convertRectFromBase:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "canDraw", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setNeedsDisplay:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "setNeedsDisplayInRect:", function(self, _cmd, invalidRect) {

}, "void");

class_addMethod(the_class, "needsDisplay", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "lockFocus", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "unlockFocus", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "lockFocusIfCanDraw", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "lockFocusIfCanDrawInContext:", function(self, _cmd, context) {

}, "void");

class_addMethod(the_class, "visibleRect", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "display", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "displayIfNeeded", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "displayIfNeededIgnoringOpacity", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "displayRect:", function(self, _cmd, rect) {

}, "void");

class_addMethod(the_class, "displayIfNeededInRect:", function(self, _cmd, rect) {

}, "void");

class_addMethod(the_class, "displayRectIgnoringOpacity:", function(self, _cmd, rect) {

}, "void");

class_addMethod(the_class, "displayIfNeededInRectIgnoringOpacity:", function(self, _cmd, rect) {

}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, rect) {

}, "void");

class_addMethod(the_class, "displayRectIgnoringOpacity:inContext:", function(self, _cmd, aRect, context) {

}, "void");

class_addMethod(the_class, "bitmapImageRepForCachingDisplayInRect:", function(self, _cmd, rect) {

}, "void");

class_addMethod(the_class, "cacheDisplayInRect:toBitmapImageRep:", function(self, _cmd, rect, bitmapImageRep) {

}, "void");

class_addMethod(the_class, "viewWillDraw", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "graphicsContext", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "gState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "allocateGState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "releaseGState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setUpGState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "renewGState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "scrollPoint:", function(self, _cmd, aPoint) {

}, "void");

class_addMethod(the_class, "scrollRectToVisible:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "autoscroll:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "adjustScroll:", function(self, _cmd, newVisible) {

}, "void");

class_addMethod(the_class, "scrollRect:by:", function(self, _cmd, aRect, delta) {

}, "void");

class_addMethod(the_class, "translateRectsNeedingDisplayInRect:by:", function(self, _cmd, clipRect, delta) {

}, "void");

class_addMethod(the_class, "hitTest:", function(self, _cmd, aPoint) {

}, "void");

class_addMethod(the_class, "mouse:inRect:", function(self, _cmd, aPoint, aRect) {

}, "void");

class_addMethod(the_class, "viewWithTag:", function(self, _cmd, aTag) {

}, "void");

class_addMethod(the_class, "tag", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "performKeyEquivalent:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "acceptsFirstMouse:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "shouldDelayWindowOrderingForEvent:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "needsPanelToBecomeKey", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "mouseDownCanMoveWindow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "addCursorRect:cursor:", function(self, _cmd, aRect, anObj) {

}, "void");

class_addMethod(the_class, "removeCursorRect:cursor:", function(self, _cmd, aRect, anObj) {

}, "void");

class_addMethod(the_class, "discardCursorRects", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "resetCursorRects", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "addTrackingRect:owner:userData:assumeInside:", function(self, _cmd, aRect, anObject, data, flag) {

}, "void");

class_addMethod(the_class, "removeTrackingRect:", function(self, _cmd, tag) {

}, "void");

class_addMethod(the_class, "setWantsLayer:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "wantsLayer", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setLayer:", function(self, _cmd, newLayer) {

}, "void");

class_addMethod(the_class, "layer", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAlphaValue:", function(self, _cmd, viewAlpha) {

}, "void");

class_addMethod(the_class, "alphaValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBackgroundFilters:", function(self, _cmd, filters) {

}, "void");

class_addMethod(the_class, "backgroundFilters", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setCompositingFilter:", function(self, _cmd, filter) {

}, "void");

class_addMethod(the_class, "compositingFilter", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setContentFilters:", function(self, _cmd, filters) {

}, "void");

class_addMethod(the_class, "contentFilters", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setShadow:", function(self, _cmd, shadow) {

}, "void");

class_addMethod(the_class, "shadow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "addTrackingArea:", function(self, _cmd, trackingArea) {

}, "void");

class_addMethod(the_class, "removeTrackingArea:", function(self, _cmd, trackingArea) {

}, "void");

class_addMethod(the_class, "trackingAreas", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "updateTrackingAreas", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "shouldDrawColor", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setPostsBoundsChangedNotifications:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "postsBoundsChangedNotifications", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "enclosingScrollView", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "menuForEvent:", function(self, _cmd, event) {

}, "void");

class_addMethod(the_class, "setToolTip:", function(self, _cmd, string) {

}, "void");

class_addMethod(the_class, "toolTip", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "addToolTipRect:owner:userData:", function(self, _cmd, aRect, anObject, data) {

}, "void");

class_addMethod(the_class, "removeToolTip:", function(self, _cmd, tag) {

}, "void");

class_addMethod(the_class, "removeAllToolTips", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "viewWillStartLiveResize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "viewDidEndLiveResize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "inLiveResize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "preservesContentDuringLiveResize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "rectPreservedDuringLiveResize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "getRectsExposedDuringLiveResize:count:", function(self, _cmd, exposedRects, count) {

}, "void");

class_addMethod(meta_class, "focusView", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "defaultMenu", function(self, _cmd) {

}, "void");

var the_class = NSView;
var meta_class = the_class.isa;

class_addMethod(the_class, "performMnemonic:", function(self, _cmd, theString) {

}, "void");

class_addMethod(the_class, "setNextKeyView:", function(self, _cmd, next) {

}, "void");

class_addMethod(the_class, "nextKeyView", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "previousKeyView", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "nextValidKeyView", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "previousValidKeyView", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "canBecomeKeyView", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setKeyboardFocusRingNeedsDisplayInRect:", function(self, _cmd, rect) {

}, "void");

class_addMethod(the_class, "setFocusRingType:", function(self, _cmd, focusRingType) {

}, "void");

class_addMethod(the_class, "focusRingType", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "defaultFocusRingType", function(self, _cmd) {

}, "void");

var the_class = NSView;
var meta_class = the_class.isa;

class_addMethod(the_class, "dragImage:at:offset:event:pasteboard:source:slideBack:", function(self, _cmd, anImage, viewLocation, initialOffset, event, pboard, sourceObj, slideFlag) {

}, "void");

class_addMethod(the_class, "registeredDraggedTypes", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "registerForDraggedTypes:", function(self, _cmd, newTypes) {

}, "void");

class_addMethod(the_class, "unregisterDraggedTypes", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "dragFile:fromRect:slideBack:event:", function(self, _cmd, filename, rect, aFlag, event) {

}, "void");

class_addMethod(the_class, "dragPromisedFilesOfTypes:fromRect:source:slideBack:event:", function(self, _cmd, typeArray, rect, sourceObject, aFlag, event) {

}, "void");

var the_class = objc_allocateClassPair(NSView, "_NSCornerView");
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

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithCoder:", aCoder);
return self;

}, "void");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frame) {
self = objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithFrame:", frame);
if (self)
{

}

return self;

}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, rect) {

}, "void");

var the_class = objc_allocateClassPair(NSResponder, "NSApplication");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_nextResponder", "id");
class_addIvar(the_class, "_delegate", "id");
class_addIvar(the_class, "_windows", "NSMutableArray");
class_addIvar(the_class, "_currentEvent", "NSEvent");
class_addIvar(the_class, "_eventQueue", "NSMutableArray");
class_addIvar(the_class, "_eventBindingQueued", "BOOL");
class_addIvar(the_class, "_eventBindingTarget", "id");
class_addIvar(the_class, "_eventBindingSelector", "SEL");
class_addIvar(the_class, "_eventBindingMask", "NSUInteger");
class_addIvar(the_class, "_menuBar", "NSMenuBar");

class_addMethod(the_class, "init", function(self, _cmd) {
self = objc_msgSendSuper({super_class:NSResponder, receiver:self}, "init");
if (self)
{
_windows = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
_eventQueue = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
_eventBindingQueued = NO;
var mainBundle = objc_msgSend(NSBundle, "mainBundle");
var productName = objc_msgSend(mainBundle, "objectForInfoDictionaryKey:", "CFBundleName");
var menuBarRect = NSMakeRect(0Unhandled output_expression: [-(), [.(.), [.(.), [M(), [M(), NSScreen (TYPE_NAME), mainScreen (IDENTIFIER)], frame (IDENTIFIER)], size (IDENTIFIER)], height (IDENTIFIER)], [M(), NSMenu (TYPE_NAME), menuBarHeight (IDENTIFIER)]]objc_msgSend(objc_msgSend(NSScreen, "mainScreen"), "frame").size.widthobjc_msgSend(NSMenu, "menuBarHeight"));
_menuBar = objc_msgSend(objc_msgSend(NSMenuBar, "alloc"), "initWithContentRect:styleMask:backing:defer:", menuBarRect, 0, nil, NO);
objc_msgSend(_menuBar, "setLevel:", 10);
return self;

}


}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, anObject) {
if (_delegate == anObject)
return ;

var nc = objc_msgSend(NSNotificationCenter, "defaultCenter");
_delegate = anObject;

}, "void");

class_addMethod(the_class, "delegate", function(self, _cmd) {
return _delegate;

}, "void");

class_addMethod(the_class, "context", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "windowWithWindowNumber:", function(self, _cmd, windowNum) {
return objc_msgSend(_windows, "objectAtIndex:", windowNum);

}, "void");

class_addMethod(the_class, "mainWindow", function(self, _cmd) {
FOR (FOR)return nil;

}, "void");

class_addMethod(the_class, "keyWindow", function(self, _cmd) {
FOR (FOR)return nil;

}, "void");

class_addMethod(the_class, "isRunning", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "finishLaunching", function(self, _cmd) {
var nc = objc_msgSend(NSNotificationCenter, "defaultCenter");

}, "void");

class_addMethod(the_class, "run", function(self, _cmd) {
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "finishLaunching");

}, "void");

class_addMethod(the_class, "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", function(self, _cmd, mask, expiration, mode, deqFlag, aTarget, aSelector) {
_eventBindingQueued = YES;
_eventBindingTarget = aTarget;
_eventBindingSelector = aSelector;
_eventBindingMask = mask;

}, "void");

class_addMethod(the_class, "discardEventsMatchingMask:beforeEvent:", function(self, _cmd, mask, lastEvent) {

}, "void");

class_addMethod(the_class, "postEvent:atStart:", function(self, _cmd, event, flag) {
objc_msgSend(self, "sendEvent:", event);

}, "void");

class_addMethod(the_class, "currentEvent", function(self, _cmd) {
return _currentEvent;

}, "void");

class_addMethod(the_class, "sendEvent:", function(self, _cmd, theEvent) {
_currentEvent = theEvent;
if (_eventBindingQueued)
{
if (Unhandled output_expression: [NE_OP(), [((), [&(), [((), [LEFT_OP(), 1 (CONSTANT), [M(), theEvent (IDENTIFIER), type (IDENTIFIER)]], ], _eventBindingMask (IDENTIFIER)], ], 0 (CONSTANT)])
{
_eventBindingQueued = NO;
objc_msgSend(_eventBindingTarget, "performSelector:withObject:", _eventBindingSelector, theEvent);

}
else
{

}

return ;

}

if (objc_msgSend(theEvent, "type") == NSLeftMouseDown)
objc_msgSend(objc_msgSend(theEvent, "window"), "makeKeyAndOrderFront:", self);
else
if (Unhandled output_expression: [OR_OP(), [((), [EQ_OP(), [M(), theEvent (IDENTIFIER), type (IDENTIFIER)], NSKeyDown (IDENTIFIER)], ], [((), [EQ_OP(), [M(), theEvent (IDENTIFIER), type (IDENTIFIER)], NSKeyUp (IDENTIFIER)], ]])
objc_msgSend(objc_msgSend(self, "keyWindow"), "sendEvent:", theEvent);
else
objc_msgSend(objc_msgSend(theEvent, "window"), "sendEvent:", theEvent);



}, "void");

class_addMethod(the_class, "preventWindowOrdering", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "makeWindowsPerform:inOrder:", function(self, _cmd, aSelector, flag) {

}, "void");

class_addMethod(the_class, "windows", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setWindowsNeedUpdate:", function(self, _cmd, needUpdate) {

}, "void");

class_addMethod(the_class, "updateWindows", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setMainMenu:", function(self, _cmd, aMenu) {

}, "void");

class_addMethod(the_class, "mainMenu", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setApplicationIconImage:", function(self, _cmd, image) {

}, "void");

class_addMethod(the_class, "applicationIconImage", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "sendAction:to:from:", function(self, _cmd, theAction, theTarget, sender) {

}, "void");

class_addMethod(the_class, "targetForAction:", function(self, _cmd, theAction) {

}, "void");

class_addMethod(the_class, "targetForAction:to:from:", function(self, _cmd, theAction, theTarget, sender) {

}, "void");

class_addMethod(the_class, "tryToPerform:with:", function(self, _cmd, anAction, anObject) {

}, "void");

class_addMethod(the_class, "validRequestorForSendType:returnType:", function(self, _cmd, sendType, returnType) {

}, "void");

class_addMethod(the_class, "reportException:", function(self, _cmd, theException) {

}, "void");

class_addMethod(meta_class, "sharedApplication", function(self, _cmd) {
if (Unhandled output_expression: [,(), ! (!), NSApp (IDENTIFIER)])
NSApp = objc_msgSend(objc_msgSend(NSApplication, "alloc"), "init");

return NSApp;

}, "void");

class_addMethod(meta_class, "detachDrawingThread:toTarget:withObject:", function(self, _cmd, selector, target, argument) {

}, "void");

var the_class = NSApplication;
var meta_class = the_class.isa;

class_addMethod(the_class, "setWindowsMenu:", function(self, _cmd, aMenu) {

}, "void");

class_addMethod(the_class, "windowsMenu", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "arrangeInFront:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "removeWindowsItem:", function(self, _cmd, win) {

}, "void");

class_addMethod(the_class, "addWindowsItem:title:filename:", function(self, _cmd, win, aString, isFilename) {

}, "void");

class_addMethod(the_class, "changeWindowsItem:title:filename:", function(self, _cmd, win, aString, isFilename) {

}, "void");

class_addMethod(the_class, "updateWindowsItem:", function(self, _cmd, win) {

}, "void");

class_addMethod(the_class, "miniaturizeAll:", function(self, _cmd, sender) {

}, "void");

var the_class = NSApplication;
var meta_class = the_class.isa;

class_addMethod(the_class, "orderFrontStandardAboutPanel:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "orderFrontStandardAboutPanelWithOptions:", function(self, _cmd, optionsDictionary) {

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSController");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "objectDidBeginEditing:", function(self, _cmd, editor) {

}, "void");

class_addMethod(the_class, "objectDidEndEditing:", function(self, _cmd, editor) {

}, "void");

class_addMethod(the_class, "commitEditing", function(self, _cmd) {
return NO;

}, "void");

class_addMethod(the_class, "commitEditingWithDelegate:didCommitSelector:contentInfo:", function(self, _cmd, delegate, didCommitSelector, contextInfo) {

}, "void");

class_addMethod(the_class, "discardEditing", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isEditing", function(self, _cmd) {
return NO;

}, "void");

var the_class = objc_allocateClassPair(NSController, "NSObjectController");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_objectClass", "NSString");
class_addIvar(the_class, "_content", "id");
class_addIvar(the_class, "_selection", "id");
class_addIvar(the_class, "_editable", "BOOL");
class_addIvar(the_class, "_automaticallyPreparesContent", "BOOL");

class_addMethod(the_class, "init", function(self, _cmd) {
objc_msgSendSuper({super_class:NSController, receiver:self}, "init");
return self;

}, "void");

class_addMethod(the_class, "setContent:", function(self, _cmd, content) {
_content = content;

}, "void");

class_addMethod(the_class, "content", function(self, _cmd) {
return _content;

}, "void");

class_addMethod(the_class, "setAutomaticallyPreparesContent:", function(self, _cmd, flag) {
_automaticallyPreparesContent = flag;

}, "void");

class_addMethod(the_class, "automaticallyPreparesContent", function(self, _cmd) {
return _automaticallyPreparesContent;

}, "void");

class_addMethod(the_class, "prepareContent", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setObjectClass:", function(self, _cmd, objectClass) {
_objectClass = objectClass;

}, "void");

class_addMethod(the_class, "objectClass", function(self, _cmd) {
return _objectClass;

}, "void");

class_addMethod(the_class, "newObject", function(self, _cmd) {
var theClass = eval(_objectClass);
var theObject = objc_msgSend(objc_msgSend(theClass, "alloc"), "init");
return theObject;

}, "void");

class_addMethod(the_class, "addObject:", function(self, _cmd, object) {

}, "void");

class_addMethod(the_class, "removeObject:", function(self, _cmd, object) {

}, "void");

class_addMethod(the_class, "add:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "canAdd", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "remove:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "canRemove", function(self, _cmd) {
return Unhandled output_expression: [((), [AND_OP(), _editable (IDENTIFIER), [M(), [M(), self (IDENTIFIER), selectedObjects (IDENTIFIER)], count (IDENTIFIER)]], ];

}, "void");

class_addMethod(the_class, "setEditable:", function(self, _cmd, flag) {
_editable = flag;

}, "void");

class_addMethod(the_class, "isEditable", function(self, _cmd) {
return _editable;

}, "void");

class_addMethod(the_class, "selectedObjects", function(self, _cmd) {
return objc_msgSend(NSArray, "arrayWithObject:", _content);

}, "void");

class_addMethod(the_class, "selection", function(self, _cmd) {
return _selection;

}, "void");

var the_class = objc_allocateClassPair(NSObjectController, "NSArrayController");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_objectClass", "NSString");
class_addIvar(the_class, "_content", "id");
class_addIvar(the_class, "_selection", "id");
class_addIvar(the_class, "_editable", "BOOL");
class_addIvar(the_class, "_automaticallyPreparesContent", "BOOL");
class_addIvar(the_class, "_selectionIndex", "NSUInteger");
class_addIvar(the_class, "_preservesSelection", "BOOL");

class_addMethod(the_class, "init", function(self, _cmd) {
if (Unhandled output_expression: [((), [=(=), self (IDENTIFIER), [M(), super (IDENTIFIER), init (IDENTIFIER)]], ])
{

}

return self;

}, "void");

class_addMethod(the_class, "prepareContent", function(self, _cmd) {
var anArray = objc_msgSend(objc_msgSend(NSMutableArray, "alloc"), "initWithCapacity:", 1);
objc_msgSend(anArray, "addObject:", objc_msgSend(self, "newObject"));
objc_msgSend(self, "setContent:", anArray);

}, "void");

class_addMethod(the_class, "arrangedObjects", function(self, _cmd) {
return _content;

}, "void");

class_addMethod(the_class, "add:", function(self, _cmd, sender) {
if (objc_msgSend(self, "canAdd"))
objc_msgSend(self, "insert:", sender);


}, "void");

class_addMethod(the_class, "preservesSelection", function(self, _cmd) {
return _preservesSelection;

}, "void");

class_addMethod(the_class, "setPreservesSelection:", function(self, _cmd, flag) {
_preservesSelection = flag;

}, "void");

class_addMethod(the_class, "selectionIndex", function(self, _cmd) {
return _selectionIndex;

}, "void");

class_addMethod(the_class, "setSelectionIndex:", function(self, _cmd, index) {
objc_msgSend(self, "setSelectionIndexes:", index);

}, "void");

class_addMethod(the_class, "setSelectionIndexes:", function(self, _cmd, indexes) {
_selectionIndex = indexes;
return YES;

}, "void");

class_addMethod(the_class, "selectionIndexes", function(self, _cmd) {
return _selectionIndex;

}, "void");

class_addMethod(the_class, "selectedObjects", function(self, _cmd) {
var theObjects = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
objc_msgSend(theObjects, "addObject:", objc_msgSend(_content, "objectAtIndex:", objc_msgSend(self, "selectionIndex")));
return theObjects;

}, "void");

class_addMethod(the_class, "selectNext:", function(self, _cmd, sender) {
var currentSelection = objc_msgSend(self, "selectionIndex");
if (objc_msgSend(self, "canSelectNext"))
objc_msgSend(self, "setSelectionIndex:", Unhandled output_expression: [((), [+(), currentSelection (IDENTIFIER), 1 (CONSTANT)], ]);


}, "void");

class_addMethod(the_class, "canSelectNext", function(self, _cmd) {
if (Unhandled output_expression: [AND_OP(), [((), [>(), [M(), _content (IDENTIFIER), count (IDENTIFIER)], 1 (CONSTANT)], ], [((), [<(), [M(), self (IDENTIFIER), selectionIndex (IDENTIFIER)], [((), [-(), [M(), _content (IDENTIFIER), count (IDENTIFIER)], 1 (CONSTANT)], ]], ]])
return YES;

return NO;

}, "void");

class_addMethod(the_class, "selectPrevious:", function(self, _cmd, sender) {
var currentSelection = objc_msgSend(self, "selectionIndex");
if (objc_msgSend(self, "canSelectPrevious"))
objc_msgSend(self, "setSelectionIndex:", Unhandled output_expression: [((), [-(), currentSelection (IDENTIFIER), 1 (CONSTANT)], ]);


}, "void");

class_addMethod(the_class, "canSelectPrevious", function(self, _cmd) {
return NO;

}, "void");

class_addMethod(the_class, "canInsert", function(self, _cmd) {
return objc_msgSend(self, "isEditable");

}, "void");

class_addMethod(the_class, "insert:", function(self, _cmd, sender) {
if (Unhandled output_expression: [,(), ! (!), [M(), self (IDENTIFIER), canInsert (IDENTIFIER)]])
return ;

objc_msgSend(self, "addObject:", objc_msgSend(self, "newObject"));

}, "void");

class_addMethod(the_class, "addObject:", function(self, _cmd, object) {
if (Unhandled output_expression: [,(), ! (!), [M(), self (IDENTIFIER), canAdd (IDENTIFIER)]])
return ;

objc_msgSend(_content, "addObject:", object);

}, "void");

class_addMethod(the_class, "addObjects:", function(self, _cmd, objects) {

}, "void");

class_addMethod(the_class, "removeObjectAtArrangedObjectIndex:", function(self, _cmd, index) {

}, "void");

class_addMethod(the_class, "removeObjectsAtArrangedObjectIndexes:", function(self, _cmd, indexes) {

}, "void");

class_addMethod(the_class, "remove:", function(self, _cmd, sender) {
NSLog("[NSArrayController remove] - Need to implement");
objc_msgSend(self, "removeObjectsAtArrangedObjectIndexes:", objc_msgSend(self, "selectionIndexes"));

}, "void");

class_addMethod(the_class, "removeObject:", function(self, _cmd, object) {
if (Unhandled output_expression: [,(), ! (!), [M(), self (IDENTIFIER), canRemove (IDENTIFIER)]])
return ;

objc_msgSend(_content, "removeObject:", object);

}, "void");

class_addMethod(the_class, "removeObjects:", function(self, _cmd, objects) {

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSBezierPath");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

var the_class = objc_allocateClassPair(NSView, "NSControl");
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
class_addIvar(the_class, "_value", "id");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
self = objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithFrame:", frameRect);
if (self)
{
objc_msgSend(self, "setCell:", objc_msgSend(objc_msgSend(objc_msgSend(self, "cellClass"), "alloc"), "init"));

}

return self;

}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
self = objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithCoder");
_cell = objc_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
return self;

}, "void");

class_addMethod(the_class, "sizeToFit", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "calcSize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "cell", function(self, _cmd) {
return _cell;

}, "void");

class_addMethod(the_class, "setCell:", function(self, _cmd, aCell) {
_cell = aCell;
objc_msgSend(_cell, "setControlView:", self);
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "selectedCell", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "target", function(self, _cmd) {
return objc_msgSend(_cell, "target");

}, "void");

class_addMethod(the_class, "setTarget:", function(self, _cmd, anObject) {
objc_msgSend(_cell, "setTarget:", anObject);

}, "void");

class_addMethod(the_class, "action", function(self, _cmd) {
return objc_msgSend(_cell, "action");

}, "void");

class_addMethod(the_class, "setAction:", function(self, _cmd, aSelector) {
objc_msgSend(_cell, "setAction:", aSelector);

}, "void");

class_addMethod(the_class, "tag", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setTag:", function(self, _cmd, anInt) {

}, "void");

class_addMethod(the_class, "selectedTag", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setIgnoresMultiClick:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "ignoresMultiClick", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "sendActionOn:", function(self, _cmd, mask) {

}, "void");

class_addMethod(the_class, "isContinuous", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setContinuous:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isEnabled", function(self, _cmd) {
return objc_msgSend(_cell, "isEnabled");

}, "void");

class_addMethod(the_class, "setEnabled:", function(self, _cmd, flag) {
objc_msgSend(_cell, "setEnabled:", flag);

}, "void");

class_addMethod(the_class, "setFloatingPointFormat:left:right:", function(self, _cmd, autoRange, leftDigits, rightDigits) {

}, "void");

class_addMethod(the_class, "alignment", function(self, _cmd) {
return objc_msgSend(_cell, "alignment");

}, "void");

class_addMethod(the_class, "setAlignment:", function(self, _cmd, mode) {
objc_msgSend(_cell, "setAlignment:", mode);
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "font", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setFont:", function(self, _cmd, fontObj) {

}, "void");

class_addMethod(the_class, "setFormatter:", function(self, _cmd, newFormatter) {

}, "void");

class_addMethod(the_class, "formatter", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setObjectValue:", function(self, _cmd, obj) {
objc_msgSend(_cell, "setObjectValue:", obj);

}, "void");

class_addMethod(the_class, "setStringValue:", function(self, _cmd, aString) {
objc_msgSend(_cell, "setStringValue:", aString);

}, "void");

class_addMethod(the_class, "setIntValue:", function(self, _cmd, anInt) {
objc_msgSend(_cell, "setIntValue:", anInt);

}, "void");

class_addMethod(the_class, "setFloatValue:", function(self, _cmd, aFloat) {
objc_msgSend(_cell, "setFloatValue:", aFloat);

}, "void");

class_addMethod(the_class, "setDoubleValue:", function(self, _cmd, aDouble) {
objc_msgSend(_cell, "setDoubleValue:", aDouble);

}, "void");

class_addMethod(the_class, "objectValue", function(self, _cmd) {
return objc_msgSend(_cell, "objectValue");

}, "void");

class_addMethod(the_class, "stringValue", function(self, _cmd) {
return objc_msgSend(_cell, "stringValue");

}, "void");

class_addMethod(the_class, "intValue", function(self, _cmd) {
return objc_msgSend(_cell, "intValue");

}, "void");

class_addMethod(the_class, "floatValue", function(self, _cmd) {
return objc_msgSend(_cell, "floatValue");

}, "void");

class_addMethod(the_class, "doubleValue", function(self, _cmd) {
return objc_msgSend(_cell, "doubleValue");

}, "void");

class_addMethod(the_class, "setNeedsDisplay", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "updateCell:", function(self, _cmd, aCell) {

}, "void");

class_addMethod(the_class, "updateCellInside:", function(self, _cmd, aCell) {

}, "void");

class_addMethod(the_class, "drawCellInside:", function(self, _cmd, aCell) {

}, "void");

class_addMethod(the_class, "drawCell:", function(self, _cmd, aCell) {

}, "void");

class_addMethod(the_class, "selectCell:", function(self, _cmd, aCell) {

}, "void");

class_addMethod(the_class, "sendAction:to:", function(self, _cmd, theAction, theTarget) {
if (Unhandled output_expression: [AND_OP(), theAction (IDENTIFIER), theTarget (IDENTIFIER)])
{
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "sendAction:to:from:", theAction, theTarget, self);
return YES;

}

return NO;

}, "void");

class_addMethod(the_class, "takeIntValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "takeFloatValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "takeDoubleValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "takeStringValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "takeObjectValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "currentEditor", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "abortEditing", function(self, _cmd) {
if (_currentEditor)
{
objc_msgSend(objc_msgSend(self, "window"), "endEditingFor:", self);
_currentEditor = nil;

}

return NO;

}, "void");

class_addMethod(the_class, "validateEditing", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
if (Unhandled output_expression: [,(), ! (!), [M(), self (IDENTIFIER), isEnabled (IDENTIFIER)]])
return ;

objc_msgSend(self, "lockFocus");
var location = objc_msgSend(self, "convertPoint:fromView:", objc_msgSend(theEvent, "locationInWindow"), nil);
if (NSPointInRect(location_bounds))
objc_msgSend(_cell, "highlight:withFrame:inView:", YES, _bounds, self);

objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", Unhandled output_expression: [((), [|(), NSLeftMouseUpMask (IDENTIFIER), NSMouseMovedMask (IDENTIFIER)], ], nil, nil, nil, self, "selector:");
objc_msgSend(self, "unlockFocus");

}, "void");

class_addMethod(the_class, "_mouseDownHandle:", function(self, _cmd, theEvent) {
var location = objc_msgSend(self, "convertPoint:fromView:", objc_msgSend(theEvent, "locationInWindow"), nil);
if (NSPointInRect(location_bounds))
{
if (objc_msgSend(theEvent, "type") == NSLeftMouseUp)
{
objc_msgSend(self, "sendAction:to:", objc_msgSend(self, "action"), objc_msgSend(self, "target"));
objc_msgSend(self, "lockFocus");
objc_msgSend(_cell, "highlight:withFrame:inView:", NO, _bounds, self);
objc_msgSend(self, "unlockFocus");
return ;

}
else
if (objc_msgSend(theEvent, "type") == NSMouseMoved)
{
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", Unhandled output_expression: [((), [|(), NSLeftMouseUpMask (IDENTIFIER), NSMouseMovedMask (IDENTIFIER)], ], nil, nil, nil, self, "selector:");
return ;

}



}

objc_msgSend(self, "lockFocus");
objc_msgSend(_cell, "highlight:withFrame:inView:", NO, _bounds, self);
objc_msgSend(self, "unlockFocus");

}, "void");

class_addMethod(the_class, "baseWritingDirection", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBaseWritingDirection:", function(self, _cmd, writingDirection) {

}, "void");

class_addMethod(the_class, "integerValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setIntegerValue:", function(self, _cmd, anInteger) {

}, "void");

class_addMethod(the_class, "takeIntegerValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(meta_class, "setCellClass:", function(self, _cmd, factoryId) {

}, "void");

class_addMethod(meta_class, "cellClass", function(self, _cmd) {

}, "void");

var the_class = NSControl;
var meta_class = the_class.isa;

class_addMethod(the_class, "performClick:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "setRefusesFirstResponder:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "refusesFirstResponder", function(self, _cmd) {

}, "void");

var the_class = NSObject;
var meta_class = the_class.isa;

class_addMethod(the_class, "controlTextDidBeginEditing:", function(self, _cmd, obj) {

}, "void");

class_addMethod(the_class, "controlTextDidEndEditing:", function(self, _cmd, obj) {

}, "void");

class_addMethod(the_class, "controlTextDidChange:", function(self, _cmd, obj) {

}, "void");

var the_class = NSControl;
var meta_class = the_class.isa;

class_addMethod(the_class, "attributedStringValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAttributedStringValue:", function(self, _cmd, obj) {

}, "void");

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
class_addIvar(the_class, "_value", "id");

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

var the_class = objc_allocateClassPair(NSObject, "NSCell");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_value", "id");
class_addIvar(the_class, "_state", "NSCellStateValue");
class_addIvar(the_class, "_isHighlighted", "BOOL");
class_addIvar(the_class, "_isEnabled", "BOOL");
class_addIvar(the_class, "_isEditable", "BOOL");
class_addIvar(the_class, "_isBordered", "BOOL");
class_addIvar(the_class, "_isBezeled", "BOOL");
class_addIvar(the_class, "_isSelectable", "BOOL");
class_addIvar(the_class, "_isScrollable", "BOOL");
class_addIvar(the_class, "_alignment", "NSUInteger");
class_addIvar(the_class, "_controlSize", "NSSize");
class_addIvar(the_class, "_controlView", "NSView");
class_addIvar(the_class, "_target", "id");
class_addIvar(the_class, "_action", "SEL");

class_addMethod(the_class, "initTextCell:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "initImageCell:", function(self, _cmd, image) {

}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSObject, receiver:self}, "initWithCoder:", aCoder);
_value = objc_msgSend(aCoder, "decodeStringForKey:", "NSContents");
var _flags = objc_msgSend(aCoder, "decodeIntForKey:", "NSCellFlags");
var _flags2 = objc_msgSend(aCoder, "decodeIntForKey:", "NSCellFlags2");
_state = Unhandled output_expression: [((), [&(), flags (IDENTIFIER), 0x80000000 (CONSTANT)], ] ? 1 : 0;
_isHighlighted = Unhandled output_expression: [((), [&(), flags (IDENTIFIER), 0x40000000 (CONSTANT)], ] ? YES : NO;
_isEnabled = Unhandled output_expression: [((), [&(), flags (IDENTIFIER), 0x20000000 (CONSTANT)], ] ? NO : YES;
_isEditable = Unhandled output_expression: [((), [&(), flags (IDENTIFIER), 0x10000000 (CONSTANT)], ] ? YES : NO;
_isBordered = Unhandled output_expression: [((), [&(), flags (IDENTIFIER), 0x00800000 (CONSTANT)], ] ? YES : NO;
_isBezeled = Unhandled output_expression: [((), [&(), flags (IDENTIFIER), 0x00400000 (CONSTANT)], ] ? YES : NO;
_isSelectable = Unhandled output_expression: [((), [&(), flags (IDENTIFIER), 0x00200000 (CONSTANT)], ] ? YES : NO;
_isScrollable = Unhandled output_expression: [((), [&(), flags (IDENTIFIER), 0x00100000 (CONSTANT)], ] ? YES : NO;
_alignment = Unhandled output_expression: [RIGHT_OP(), [((), [&(), flags2 (IDENTIFIER), 0x1c000000 (CONSTANT)], ], 26 (CONSTANT)];
_controlSize = Unhandled output_expression: [RIGHT_OP(), [((), [&(), flags2 (IDENTIFIER), 0xE0000 (CONSTANT)], ], 17 (CONSTANT)];
return self;

}, "void");

class_addMethod(the_class, "controlView", function(self, _cmd) {
return _controlView;

}, "void");

class_addMethod(the_class, "setControlView:", function(self, _cmd, view) {
_controlView = view;

}, "void");

class_addMethod(the_class, "type", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setType:", function(self, _cmd, aType) {

}, "void");

class_addMethod(the_class, "state", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setState:", function(self, _cmd, value) {

}, "void");

class_addMethod(the_class, "target", function(self, _cmd) {
return _target;

}, "void");

class_addMethod(the_class, "setTarget:", function(self, _cmd, anObject) {
_target = anObject;

}, "void");

class_addMethod(the_class, "action", function(self, _cmd) {
return _action;

}, "void");

class_addMethod(the_class, "setAction:", function(self, _cmd, aSelector) {
_action = aSelector;

}, "void");

class_addMethod(the_class, "tag", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setTag:", function(self, _cmd, anInt) {

}, "void");

class_addMethod(the_class, "title", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setTitle:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "isOpaque", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isEnabled", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setEnabled:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "sendActionOn:", function(self, _cmd, mask) {

}, "void");

class_addMethod(the_class, "isContinuous", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setContinuous:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isEditable", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setEditable:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isSelectable", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setSelectable:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isBordered", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBordered:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isBezeled", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBezeled:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isScrollable", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setScrollable:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isHighlighted", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setHighlighted:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "alignment", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAlignment:", function(self, _cmd, mode) {

}, "void");

class_addMethod(the_class, "wraps", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setWraps:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "font", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setFont:", function(self, _cmd, fontObj) {

}, "void");

class_addMethod(the_class, "entryType", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setEntryType:", function(self, _cmd, aType) {

}, "void");

class_addMethod(the_class, "isEntryAcceptable:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "setFloatingPointFormat:left:right:", function(self, _cmd, autoRange, leftDigits, rightDigits) {

}, "void");

class_addMethod(the_class, "keyEquivalent", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setFormatter:", function(self, _cmd, newFormatter) {

}, "void");

class_addMethod(the_class, "formatter", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "objectValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setObjectValue:", function(self, _cmd, obj) {

}, "void");

class_addMethod(the_class, "hasValidObjectValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "stringValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setStringValue:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "compare:", function(self, _cmd, otherCell) {

}, "void");

class_addMethod(the_class, "intValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setIntValue:", function(self, _cmd, anInt) {

}, "void");

class_addMethod(the_class, "floatValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setFloatValue:", function(self, _cmd, aFloat) {

}, "void");

class_addMethod(the_class, "doubleValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setDoubleValue:", function(self, _cmd, aDouble) {

}, "void");

class_addMethod(the_class, "takeIntValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "takeFloatValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "takeDoubleValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "takeStringValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "takeObjectValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "image", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setImage:", function(self, _cmd, image) {

}, "void");

class_addMethod(the_class, "setControlTint:", function(self, _cmd, controlTint) {

}, "void");

class_addMethod(the_class, "controlTint", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setControlSize:", function(self, _cmd, size) {

}, "void");

class_addMethod(the_class, "controlSize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "representedObject", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setRepresentedObject:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "cellAttribute:", function(self, _cmd, aParameter) {

}, "void");

class_addMethod(the_class, "setCellAttribute:to:", function(self, _cmd, aParameter, value) {

}, "void");

class_addMethod(the_class, "imageRectForBounds:", function(self, _cmd, theRect) {

}, "void");

class_addMethod(the_class, "titleRectForBounds:", function(self, _cmd, theRect) {
return theRect;

}, "void");

class_addMethod(the_class, "drawingRectForBounds:", function(self, _cmd, theRect) {

}, "void");

class_addMethod(the_class, "cellSize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "cellSizeForBounds:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "highlightColorWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {

}, "void");

class_addMethod(the_class, "calcDrawInfo:", function(self, _cmd, aRect) {

}, "void");

class_addMethod(the_class, "setUpFieldEditorAttributes:", function(self, _cmd, textObj) {
objc_msgSend(textObj, "setAlignment:", objc_msgSend(self, "alignment"));
objc_msgSend(textObj, "setString:", objc_msgSend(self, "stringValue"));
objc_msgSend(textObj, "setSelectable:", objc_msgSend(self, "isSelectable"));
objc_msgSend(self, "setEditable:", objc_msgSend(self, "isEditable"));
if (objc_msgSend(self, "respondsToSelector:", "selector:"))
objc_msgSend(textObj, "setDrawsBackground:", objc_msgSend(self, "drawsBackground"));

if (objc_msgSend(self, "respondsToSelector:", "selector:"))
objc_msgSend(textObj, "setBackgroundColor:", objc_msgSend(self, "backgroundColor"));

return textObj;

}, "void");

class_addMethod(the_class, "drawInteriorWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {

}, "void");

class_addMethod(the_class, "drawWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
objc_msgSend(self, "drawInteriorWithFrame:inView:", cellFrame, controlView);

}, "void");

class_addMethod(the_class, "highlight:withFrame:inView:", function(self, _cmd, flag, cellFrame, controlView) {
if (Unhandled output_expression: [NE_OP(), [M(), self (IDENTIFIER), isHighlighted (IDENTIFIER)], flag (IDENTIFIER)])
{
objc_msgSend(self, "setHighlighted:", flag);
objc_msgSend(self, "drawWithFrame:inView:", cellFrame, controlView);

}


}, "void");

class_addMethod(the_class, "mouseDownFlags", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "getPeriodicDelay:interval:", function(self, _cmd, delay, interval) {

}, "void");

class_addMethod(the_class, "startTrackingAt:inView:", function(self, _cmd, startPoint, controlView) {

}, "void");

class_addMethod(the_class, "continueTracking:at:inView:", function(self, _cmd, lastPoint, currentPoint, controlView) {

}, "void");

class_addMethod(the_class, "stopTracking:at:inView:mouseIsUp:", function(self, _cmd, lastPoint, stopPoint, controlView, flag) {

}, "void");

class_addMethod(the_class, "trackMouse:inRect:ofView:untilMouseUp:", function(self, _cmd, theEvent, cellFrame, controlView, flag) {

}, "void");

class_addMethod(the_class, "editWithFrame:inView:editor:delegate:event:", function(self, _cmd, aRect, controlView, textObj, anObject, theEvent) {
if (Unhandled output_expression: [AND_OP(), [,(), ! (!), _isEditable (IDENTIFIER)], [,(), ! (!), _isSelectable (IDENTIFIER)]])
return ;

objc_msgSend(textObj, "setFrame:", objc_msgSend(self, "titleRectForBounds:", aRect));
objc_msgSend(controlView, "addSubview:", textObj);
objc_msgSend(objc_msgSend(controlView, "window"), "makeFirstResponder:", textObj);
objc_msgSend(textObj, "setDelegate:", anObject);
objc_msgSend(textObj, "mouseDown:", theEvent);

}, "void");

class_addMethod(the_class, "selectWithFrame:inView:editor:delegate:start:length:", function(self, _cmd, aRect, controlView, textObj, anObject, selStart, selLength) {
if (Unhandled output_expression: [AND_OP(), [,(), ! (!), _isEditable (IDENTIFIER)], [,(), ! (!), _isSelectable (IDENTIFIER)]])
return ;

objc_msgSend(textObj, "setFrame:", objc_msgSend(self, "titleRectForBounds:", aRect));
objc_msgSend(controlView, "addSubview:", textObj);
objc_msgSend(objc_msgSend(controlView, "window"), "makeFirstResponder:", textObj);
objc_msgSend(textObj, "setDelegate:", anObject);
objc_msgSend(textObj, "setSelectedRange:", nil);

}, "void");

class_addMethod(the_class, "endEditing:", function(self, _cmd, textObj) {
objc_msgSend(self, "setStringValue:", objc_msgSend(textObj, "string"));

}, "void");

class_addMethod(the_class, "resetCursorRect:inView:", function(self, _cmd, cellFrame, controlView) {

}, "void");

class_addMethod(the_class, "setMenu:", function(self, _cmd, aMenu) {

}, "void");

class_addMethod(the_class, "menu", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "menuForEvent:inRect:ofView:", function(self, _cmd, event, cellFrame, view) {

}, "void");

class_addMethod(the_class, "setSendsActionOnEndEditing:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "sendsActionOnEndEditing", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "baseWritingDirection", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBaseWritingDirection:", function(self, _cmd, writingDirection) {

}, "void");

class_addMethod(the_class, "setLineBreakMode:", function(self, _cmd, mode) {

}, "void");

class_addMethod(the_class, "lineBreakMode", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAllowsUndo:", function(self, _cmd, allowsUndo) {

}, "void");

class_addMethod(the_class, "allowsUndo", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "integerValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setIntegerValue:", function(self, _cmd, anInteger) {

}, "void");

class_addMethod(the_class, "takeIntegerValueFrom:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "truncatesLastVisibleLine", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setTruncatesLastVisibleLine:", function(self, _cmd, flag) {

}, "void");

class_addMethod(meta_class, "prefersTrackingUntilMouseUp", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "defaultMenu", function(self, _cmd) {

}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "setRefusesFirstResponder:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "refusesFirstResponder", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "acceptsFirstResponder", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setShowsFirstResponder:", function(self, _cmd, showFR) {

}, "void");

class_addMethod(the_class, "showsFirstResponder", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setMnemonicLocation:", function(self, _cmd, location) {

}, "void");

class_addMethod(the_class, "mnemonicLocation", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "mnemonic", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setTitleWithMnemonic:", function(self, _cmd, stringWithAmpersand) {

}, "void");

class_addMethod(the_class, "performClick:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "setFocusRingType:", function(self, _cmd, focusRingType) {

}, "void");

class_addMethod(the_class, "focusRingType", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "wantsNotificationForMarkedText", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "defaultFocusRingType", function(self, _cmd) {

}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "attributedStringValue", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAttributedStringValue:", function(self, _cmd, obj) {

}, "void");

class_addMethod(the_class, "allowsEditingTextAttributes", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAllowsEditingTextAttributes:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "importsGraphics", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setImportsGraphics:", function(self, _cmd, flag) {

}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "setAllowsMixedState:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "allowsMixedState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "nextState", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setNextState", function(self, _cmd) {

}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "hitTestForEvent:inRect:ofView:", function(self, _cmd, event, cellFrame, controlView) {

}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "expansionFrameWithFrame:inView:", function(self, _cmd, cellFrame, view) {

}, "void");

class_addMethod(the_class, "drawWithExpansionFrame:inView:", function(self, _cmd, cellFrame, view) {

}, "void");

var the_class = NSCell;
var meta_class = the_class.isa;

class_addMethod(the_class, "backgroundStyle", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBackgroundStyle:", function(self, _cmd, style) {

}, "void");

class_addMethod(the_class, "interiorBackgroundStyle", function(self, _cmd) {

}, "void");

var the_class = objc_allocateClassPair(NSCell, "NSButtonCell");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_value", "id");
class_addIvar(the_class, "_state", "NSCellStateValue");
class_addIvar(the_class, "_isHighlighted", "BOOL");
class_addIvar(the_class, "_isEnabled", "BOOL");
class_addIvar(the_class, "_isEditable", "BOOL");
class_addIvar(the_class, "_isBordered", "BOOL");
class_addIvar(the_class, "_isBezeled", "BOOL");
class_addIvar(the_class, "_isSelectable", "BOOL");
class_addIvar(the_class, "_isScrollable", "BOOL");
class_addIvar(the_class, "_alignment", "NSUInteger");
class_addIvar(the_class, "_controlSize", "NSSize");
class_addIvar(the_class, "_controlView", "NSView");
class_addIvar(the_class, "_target", "id");
class_addIvar(the_class, "_action", "SEL");

var the_class = objc_allocateClassPair(NSObject, "NSClipView");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_docView", "NSView");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSObject, receiver:self}, "initWithCoder:", aCoder);
_docView = objc_msgSend(aCoder, "decodeObjectForKey:", "NSDocView");
return self;

}, "void");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frame) {
self = objc_msgSendSuper({super_class:NSObject, receiver:self}, "initWithFrame:", frame);
if (self)
{

}

return self;

}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, aRect) {

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSColor");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_red", "CGFloat");
class_addIvar(the_class, "_green", "CGFloat");
class_addIvar(the_class, "_blue", "CGFloat");
class_addIvar(the_class, "_alpha", "CGFloat");

class_addMethod(the_class, "initWithCalibratedRed:green:blue:alpha:", function(self, _cmd, red, green, blue, alpha) {
objc_msgSend(self, "init");
if (self)
{
_red = red;
_green = green;
_blue = blue;
_alpha = alpha;

}

return self;

}, "void");

class_addMethod(the_class, "set", function(self, _cmd) {
objc_msgSend(self, "setFill");
objc_msgSend(self, "setStroke");

}, "void");

class_addMethod(the_class, "setFill", function(self, _cmd) {
var ctx = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
ctx.fillStyle = objc_msgSend(self, "rgbaString");

}, "void");

class_addMethod(the_class, "setStroke", function(self, _cmd) {
var ctx = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
ctx.strokeStyle = objc_msgSend(self, "rgbaString");

}, "void");

class_addMethod(the_class, "rgbString", function(self, _cmd) {
var redComponent = Unhandled output_expression: [*(), _red (IDENTIFIER), 255 (CONSTANT)];
var blueComponent = Unhandled output_expression: [*(), _blue (IDENTIFIER), 255 (CONSTANT)];
var greenComponent = Unhandled output_expression: [*(), _green (IDENTIFIER), 255 (CONSTANT)];
return Unhandled output_expression: [+(), [+(), [+(), [+(), [+(), [+(), "rgb(" (STRING_LITERAL), [f(), [.(.), Math (IDENTIFIER), round (IDENTIFIER)], redComponent (IDENTIFIER)]], "," (STRING_LITERAL)], [f(), [.(.), Math (IDENTIFIER), round (IDENTIFIER)], greenComponent (IDENTIFIER)]], "," (STRING_LITERAL)], [f(), [.(.), Math (IDENTIFIER), round (IDENTIFIER)], blueComponent (IDENTIFIER)]], ")" (STRING_LITERAL)];

}, "void");

class_addMethod(the_class, "rgbaString", function(self, _cmd) {
var redComponent = Unhandled output_expression: [*(), _red (IDENTIFIER), 255 (CONSTANT)];
var blueComponent = Unhandled output_expression: [*(), _blue (IDENTIFIER), 255 (CONSTANT)];
var greenComponent = Unhandled output_expression: [*(), _green (IDENTIFIER), 255 (CONSTANT)];
return Unhandled output_expression: [+(), [+(), [+(), [+(), [+(), [+(), [+(), [+(), "rgba(" (STRING_LITERAL), [f(), [.(.), Math (IDENTIFIER), round (IDENTIFIER)], redComponent (IDENTIFIER)]], "," (STRING_LITERAL)], [f(), [.(.), Math (IDENTIFIER), round (IDENTIFIER)], greenComponent (IDENTIFIER)]], "," (STRING_LITERAL)], [f(), [.(.), Math (IDENTIFIER), round (IDENTIFIER)], blueComponent (IDENTIFIER)]], "," (STRING_LITERAL)], _alpha (IDENTIFIER)], ")" (STRING_LITERAL)];

}, "void");

class_addMethod(meta_class, "colorWithCalibratedRed:green:blue:alpha:", function(self, _cmd, red, green, blue, alpha) {
return objc_msgSend(objc_msgSend(NSColor, "alloc"), "initWithCalibratedRed:green:blue:alpha:", red, green, blue, alpha);

}, "void");

class_addMethod(meta_class, "blackColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.0, 0.0, 0.0, 1.0);

}, "void");

class_addMethod(meta_class, "blueColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.0, 0.0, 1.0, 1.0);

}, "void");

class_addMethod(meta_class, "brownColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.6, 0.4, 0.2, 1.0);

}, "void");

class_addMethod(meta_class, "clearColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.0, 0.0, 0.0, 0.0);

}, "void");

class_addMethod(meta_class, "cyanColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.0, 1.0, 1.0, 1.0);

}, "void");

class_addMethod(meta_class, "darkGrayColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.33, 0.33, 0.33, 1.0);

}, "void");

class_addMethod(meta_class, "grayColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.5, 0.5, 0.5, 1.0);

}, "void");

class_addMethod(meta_class, "greenColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.0, 1.0, 0.0, 1.0);

}, "void");

class_addMethod(meta_class, "lightGrayColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.66, 0.66, 0.66, 1.0);

}, "void");

class_addMethod(meta_class, "magentaColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1.0, 0.0, 1.0, 1.0);

}, "void");

class_addMethod(meta_class, "orangeColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1.0, 0.5, 0.0, 1.0);

}, "void");

class_addMethod(meta_class, "purpleColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.5, 0.0, 0.5, 1.0);

}, "void");

class_addMethod(meta_class, "redColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1.0, 0.0, 0.0, 1.0);

}, "void");

class_addMethod(meta_class, "whiteColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1.0, 1.0, 1.0, 1.0);

}, "void");

class_addMethod(meta_class, "yellowColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1.0, 1.0, 0.0, 1.0);

}, "void");

class_addMethod(meta_class, "controlTextColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.251, 0.278, 0.302, 1.0);

}, "void");

class_addMethod(meta_class, "disabledControlTextColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.6, 0.6, 0.6, 1.0);

}, "void");

class_addMethod(meta_class, "textColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.251, 0.251, 0.251, 1.0);

}, "void");

class_addMethod(meta_class, "selectedTextColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1.0, 1.0, 1.0, 1.0);

}, "void");

class_addMethod(meta_class, "windowBackgroundColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.91, 0.91, 0.91, 1.0);

}, "void");

class_addMethod(meta_class, "windowFrameColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.533, 0.533, 0.533, 1.0);

}, "void");

class_addMethod(meta_class, "windowFrameTextColor", function(self, _cmd) {
return objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.01, 0.01, 0.01, 1.0);

}, "void");

class_addMethod(meta_class, "controlAlternatingRowBackgroundColors", function(self, _cmd) {
var firstColor = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.945, 0.961, 0.980, 1.0);
var secondColor = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1.00, 1.00, 1.00, 1.0);
var colors = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
objc_msgSend(colors, "addObject:", firstColor);
objc_msgSend(colors, "addObject:", secondColor);
return colors;

}, "void");

var the_class = objc_allocateClassPair(NSControl, "NSColorWell");
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
class_addIvar(the_class, "_value", "id");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
_value = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0, 0.3, 0.8, 1.0);
objc_msgSendSuper({super_class:NSControl, receiver:self}, "initWithCoder:", aCoder);
return self;

}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, sender) {
NSLog("NSColorWell - orderFront color picker");

}, "void");

class_addMethod(the_class, "mouseUp:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, bounds) {
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.851, 0.851, 0.851, 1.0), "set");
objc_msgSend(NSBezierPath, "strokeRect:", NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), bounds (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 0.5 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), bounds (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 0.5 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), bounds (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), bounds (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 1 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), bounds (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), bounds (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 1 (CONSTANT)]));
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.996, 0.996, 0.996, 1.0), "set");
objc_msgSend(NSBezierPath, "fillRect:", NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), bounds (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 1 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), bounds (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 1 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), bounds (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), bounds (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 2 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), bounds (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), bounds (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 2 (CONSTANT)]));
objc_msgSend(_value, "set");
objc_msgSend(NSBezierPath, "fillRect:", NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), bounds (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 4 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), bounds (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 4 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), bounds (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), bounds (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 8 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), bounds (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), bounds (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 8 (CONSTANT)]));

}, "void");

class_addMethod(the_class, "observeValueForKeyPath:ofObject:change:context:", function(self, _cmd, keyPath, object, change, context) {
if (context == "value")
{
_value = objc_msgSend(object, "valueForKey:", keyPath);
objc_msgSend(self, "setNeedsDisplay:", YES);

}
else
if (context == "hidden")
{
objc_msgSend(_cell, "setHidden:", objc_msgSend(object, "valueForKey:", keyPath));
objc_msgSend(self, "setNeedsDisplay:", YES);

}
else
if (context == "enabled")
{
objc_msgSend(_cell, "setEnabled:", objc_msgSend(object, "valueForKey:", keyPath));
objc_msgSend(self, "setNeedsDisplay:", YES);

}
else
{
objc_msgSendSuper({super_class:NSControl, receiver:self}, "observeValueForKeyPath:ofObject:change:context:", keyPath, object, change, context);

}




}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSCursor");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_cursor", "NSString");

class_addMethod(the_class, "initWithCursorString:", function(self, _cmd, cursor) {
objc_msgSend(self, "init");
if (self)
{
_cursor = cursor;

}

return self;

}, "void");

class_addMethod(the_class, "set", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "currentCursor", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "arrowCursor", function(self, _cmd) {
return objc_msgSend(objc_msgSend(NSCursor, "alloc"), "initWithCursorString:", "default");

}, "void");

class_addMethod(meta_class, "closedHandCursor", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "crosshairCursor", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "disappearingItemCursor", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "IBeamCursor", function(self, _cmd) {
return objc_msgSend(objc_msgSend(NSCursor, "alloc"), "initWithCursorString:", "text");

}, "void");

class_addMethod(meta_class, "openHandCursor", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "pointingHandCursor", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "resizeDownCursor", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "resizeLeftCursor", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "resizeLeftRightCursor", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "resizeRightCursor", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "resizeUpCursor", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "resizeUpDownCursor", function(self, _cmd) {

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSEvent");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_type", "id");
class_addIvar(the_class, "_locationInWindow", "id");
class_addIvar(the_class, "_modifierFlags", "id");
class_addIvar(the_class, "_timestamp", "id");
class_addIvar(the_class, "_windowNumber", "id");
class_addIvar(the_class, "_context", "id");
class_addIvar(the_class, "_characters", "id");
class_addIvar(the_class, "_charactersIgnoringModifiers", "id");
class_addIvar(the_class, "_isARepeat", "id");
class_addIvar(the_class, "_keyCode", "id");
class_addIvar(the_class, "_window", "id");
class_addIvar(the_class, "_clickCount", "id");
class_addIvar(the_class, "_locationInBase", "id");
class_addIvar(the_class, "_eventRef", "id");
class_addIvar(the_class, "_buttonNumber", "id");
class_addIvar(the_class, "_deltaX", "id");
class_addIvar(the_class, "_deltaY", "id");
class_addIvar(the_class, "_deltaZ", "id");

class_addMethod(the_class, "initKeyEventWithType:location:modifierFlags:timestamp:windowNumber:context:characters:charactersIgnoringModifiers:isARepeat:keyCode:", function(self, _cmd, type, location, flags, time, windowNum, context, characters, unmodCharacters, repeatKey, code) {
objc_msgSend(self, "init");
if (self)
{
_type = type;
_locationInWindow = location;
_modifierFlags = flags;
_timestamp = time;
_windowNumber = windowNum;
_context = context;
_characters = characters;
_charactersIgnoringModifiers = unmodCharacters;
_isARepeat = repeatKey;
_keyCode = code;

}

return self;

}, "void");

class_addMethod(the_class, "initMouseEventWithType:location:modifierFlags:timestamp:windowNumber:context:eventNumber:clickCount:pressure:", function(self, _cmd, type, location, flags, time, windowNum, context, eventNumber, clickNumber, pressure) {
objc_msgSend(self, "init");
if (self)
{
_type = type;
_locationInWindow = location;
_modifierFlags = flags;
_timestamp = time;
_windowNumber = windowNum;
_context = context;
_clickCount = clickNumber;
_window = objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "windowWithWindowNumber:", _windowNumber);
if (Unhandled output_expression: [&(), _modifierFlags (IDENTIFIER), 1048576 (CONSTANT)])
NSLog("Command key was pressed");

if (Unhandled output_expression: [&(), _modifierFlags (IDENTIFIER), 131072 (CONSTANT)])
NSLog("Shift key was pressed");

if (Unhandled output_expression: [&(), _modifierFlags (IDENTIFIER), 524288 (CONSTANT)])
NSLog("Alt key was pressed");

if (Unhandled output_expression: [&(), _modifierFlags (IDENTIFIER), 262144 (CONSTANT)])
NSLog("Control key was pressed");


}

return self;

}, "void");

class_addMethod(the_class, "context", function(self, _cmd) {
return _context;

}, "void");

class_addMethod(the_class, "locationInWindow", function(self, _cmd) {
return _locationInWindow;

}, "void");

class_addMethod(the_class, "modifierFlags", function(self, _cmd) {
return _modifierFlags;

}, "void");

class_addMethod(the_class, "timestamp", function(self, _cmd) {
return _timestamp;

}, "void");

class_addMethod(the_class, "type", function(self, _cmd) {
return _type;

}, "void");

class_addMethod(the_class, "window", function(self, _cmd) {
return _window;

}, "void");

class_addMethod(the_class, "setWindow:", function(self, _cmd, aWindow) {
_window = aWindow;

}, "void");

class_addMethod(the_class, "setLocationInBase:", function(self, _cmd, aPoint) {
_locationInBase = aPoint;

}, "void");

class_addMethod(the_class, "locationInBase", function(self, _cmd) {
return _locationInBase;

}, "void");

class_addMethod(the_class, "windowNumber", function(self, _cmd) {
return _windowNumber;

}, "void");

class_addMethod(the_class, "eventRef", function(self, _cmd) {
return _eventRef;

}, "void");

class_addMethod(the_class, "characters", function(self, _cmd) {
return _characters;

}, "void");

class_addMethod(the_class, "charactersIgnoringModifiers", function(self, _cmd) {
return _charactersIgnoringModifiers;

}, "void");

class_addMethod(the_class, "isARepeat", function(self, _cmd) {
return _isARepeat;

}, "void");

class_addMethod(the_class, "keyCode", function(self, _cmd) {
return _keyCode;

}, "void");

class_addMethod(the_class, "buttonNumber", function(self, _cmd) {
return _buttonNumber;

}, "void");

class_addMethod(the_class, "clickCount", function(self, _cmd) {
return _clickCount;

}, "void");

class_addMethod(the_class, "deltaX", function(self, _cmd) {
return _deltaX;

}, "void");

class_addMethod(the_class, "deltaY", function(self, _cmd) {
return _deltaY;

}, "void");

class_addMethod(the_class, "deltaZ", function(self, _cmd) {
return _deltaZ;

}, "void");

class_addMethod(meta_class, "keyEventWithType:location:modifierFlags:timestamp:windowNumber:context:characters:charactersIgnoringModifiers:isARepeat:keyCode:", function(self, _cmd, type, location, flags, time, windowNum, context, characters, unmodCharacters, repeatKey, code) {
return objc_msgSend(objc_msgSend(NSEvent, "alloc"), "initKeyEventWithType:location:modifierFlags:timestamp:windowNumber:context:characters:charactersIgnoringModifiers:isARepeat:keyCode:", type, location, flags, time, windowNum, context, characters, unmodCharacters, repeatKey, code);

}, "void");

class_addMethod(meta_class, "mouseEventWithType:location:modifierFlags:timestamp:windowNumber:context:eventNumber:clickCount:pressure:", function(self, _cmd, type, location, flags, time, windowNum, context, eventNumber, clickNumber, pressure) {
return objc_msgSend(objc_msgSend(NSEvent, "alloc"), "initMouseEventWithType:location:modifierFlags:timestamp:windowNumber:context:eventNumber:clickCount:pressure:", type, location, flags, time, windowNum, context, eventNumber, clickNumber, pressure);

}, "void");

class_addMethod(meta_class, "mouseLocation", function(self, _cmd) {
return NSMakePoint(00);

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSFont");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_name", "NSString");
class_addIvar(the_class, "_size", "CGFloat");

class_addMethod(the_class, "initWithName:size:", function(self, _cmd, fontName, fontSize) {
objc_msgSend(self, "init");
if (self)
{
_name = fontName;
_size = fontSize;

}

return self;

}, "void");

class_addMethod(the_class, "set", function(self, _cmd) {
var ctx = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
ctx.font = Unhandled output_expression: [+(), [+(), _size (IDENTIFIER), "px " (STRING_LITERAL)], _name (IDENTIFIER)];

}, "void");

class_addMethod(meta_class, "fontWithName:size:", function(self, _cmd, fontName, fontSize) {
return objc_msgSend(objc_msgSend(NSFont, "alloc"), "initWithName:size:", fontName, fontSize);

}, "void");

class_addMethod(meta_class, "systemFontOfSize:", function(self, _cmd, fontSize) {
return objc_msgSend(NSFont, "fontWithName:size:", "Helvetica", fontSize);

}, "void");

class_addMethod(meta_class, "titleBarFontOfSize:", function(self, _cmd, fontSize) {
return objc_msgSend(NSFont, "fontWithName:size:", "Helvetica", fontSize);

}, "void");

class_addMethod(meta_class, "systemFontSize", function(self, _cmd) {
return 12;

}, "void");

class_addMethod(meta_class, "smallSystemFontSize", function(self, _cmd) {
return 11;

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSGradient");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_theColors", "NSMutableArray");

class_addMethod(the_class, "initWithStartingColor:endingColor:", function(self, _cmd, startingColor, endingColor) {
var theArray = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 2);
objc_msgSend(theArray, "addObject:", startingColor);
objc_msgSend(theArray, "addObject:", endingColor);
return objc_msgSend(self, "initWithColors:", theArray);

}, "void");

class_addMethod(the_class, "initWithColors:", function(self, _cmd, colorArray) {
objc_msgSend(self, "init");
if (self)
{
_theColors = colorArray;

}

return self;

}, "void");

class_addMethod(the_class, "drawInRect:angle:", function(self, _cmd, rect, angle) {

}, "void");

class_addMethod(the_class, "drawInBezierPath:angle:", function(self, _cmd, path, angle) {

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSGraphicsContext");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_graphicsPort", "CGContextRef");

class_addMethod(the_class, "initWithGraphicsPort:flipped:", function(self, _cmd, graphicsPort, initialFlippedState) {
objc_msgSend(self, "init");
if (self)
{
_graphicsPort = graphicsPort;

}

return self;

}, "void");

class_addMethod(the_class, "graphicsPort", function(self, _cmd) {
return _graphicsPort;

}, "void");

class_addMethod(meta_class, "graphicsContextWithGraphicsPort:flipped:", function(self, _cmd, graphicsPort, initialFlippedState) {
return objc_msgSend(objc_msgSend(NSGraphicsContext, "alloc"), "initWithGraphicsPort:flipped:", graphicsPort, initialFlippedState);

}, "void");

class_addMethod(meta_class, "currentContext", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "setCurrentContext:", function(self, _cmd, context) {

}, "void");

class_addMethod(meta_class, "saveGraphicsState", function(self, _cmd) {
var ctx = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
.();

}, "void");

class_addMethod(meta_class, "restoreGraphicsState", function(self, _cmd) {
var ctx = objc_msgSend(objc_msgSend(NSGraphicsContext, "currentContext"), "graphicsPort");
.();

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSImage");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "init", function(self, _cmd) {
if (Unhandled output_expression: [((), [=(=), self (IDENTIFIER), [M(), super (IDENTIFIER), init (IDENTIFIER)]], ])
{

}

return self;

}, "void");

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

var the_class = objc_allocateClassPair(NSObject, "NSMenu");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_superMenu", "NSMenu");
class_addIvar(the_class, "_title", "NSString");
class_addIvar(the_class, "_itemArray", "id");
class_addIvar(the_class, "_name", "NSString");

class_addMethod(the_class, "init", function(self, _cmd) {
objc_msgSendSuper({super_class:NSObject, receiver:self}, "init");
_title = "";
_itemArray = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
return self;

}, "void");

class_addMethod(the_class, "initWithTitle:", function(self, _cmd, aTitle) {
objc_msgSend(self, "init");
_title = aTitle;
return self;

}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
_title = objc_msgSend(aCoder, "decodeStringForKey:", "NSTitle");
_name = objc_msgSend(aCoder, "decodeStringForKey:", "NSName");
_itemArray = objc_msgSend(aCoder, "decodeObjectForKey:", "NSMenuItems");
return self;

}, "void");

class_addMethod(the_class, "insertItem:atIndex:", function(self, _cmd, newItem, index) {
objc_msgSend(self, "addItem:", newItem);

}, "void");

class_addMethod(the_class, "insertItemWithTitle:action:keyEquivalent:atIndex:", function(self, _cmd, aString, aSelector, keyEquiv, index) {
objc_msgSend(self, "addItemWithTitle:action:keyEquivalent:", aString, aSelector, keyEquiv);

}, "void");

class_addMethod(the_class, "addItem:", function(self, _cmd, newItem) {
objc_msgSend(_itemArray, "addObject:", newItem);
objc_msgSend(newItem, "setMenu:", self);

}, "void");

class_addMethod(the_class, "addItemWithTitle:action:keyEquivalent:", function(self, _cmd, aString, aSelector, keyEquiv) {
var newItem = objc_msgSend(objc_msgSend(NSMenuItem, "alloc"), "initWithTitle:action:keyEquivalent:", aString, aSelector, keyEquiv);
objc_msgSend(self, "addItem:", newItem);
return newItem;

}, "void");

class_addMethod(the_class, "removeItem:", function(self, _cmd, anItem) {

}, "void");

class_addMethod(the_class, "removeItemAtIndex:", function(self, _cmd, index) {

}, "void");

class_addMethod(the_class, "itemChanged:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "itemWithTag:", function(self, _cmd, aTag) {

}, "void");

class_addMethod(the_class, "itemWithTitle:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "itemAtIndex:", function(self, _cmd, index) {
return objc_msgSend(_itemArray, "objectAtIndex:", index);

}, "void");

class_addMethod(the_class, "numberOfItems", function(self, _cmd) {
return objc_msgSend(_itemArray, "count");

}, "void");

class_addMethod(the_class, "itemArray", function(self, _cmd) {
return _itemArray;

}, "void");

class_addMethod(the_class, "indexOfItem:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "indexOfItemWithTitle:", function(self, _cmd, aTitle) {

}, "void");

class_addMethod(the_class, "indexOfItemWithTag:", function(self, _cmd, aTag) {

}, "void");

class_addMethod(the_class, "indexOfItemWithTarget:andAction:", function(self, _cmd, anObject, actionSelector) {

}, "void");

class_addMethod(the_class, "indexOfItemWithRepresentedObject:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "indexOfItemWithSubmenu:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "setSubmenu:forItem:", function(self, _cmd, aMenu, anItem) {

}, "void");

class_addMethod(the_class, "submenuAction:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "attachedMenu", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isAttached", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "locationForSubmenu:", function(self, _cmd, aSubmenu) {

}, "void");

class_addMethod(the_class, "supermenu", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setSupermenu:", function(self, _cmd, supermenu) {

}, "void");

class_addMethod(the_class, "isTornOff", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "autoenablesItems", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAutoenablesItems:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "update", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "performKeyEquivalent:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "performActionForItemAtIndex:", function(self, _cmd, index) {

}, "void");

class_addMethod(the_class, "setTitle:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "title", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "menuChangedMessagesEnabled", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setMenuChangedMessagesEnabled:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "sizeToFit", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "helpRequested:", function(self, _cmd, event) {

}, "void");

class_addMethod(the_class, "setShowsStateColumn:", function(self, _cmd, showsState) {

}, "void");

class_addMethod(the_class, "showsStateColumn", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "highlightedItem", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "delegate", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "menuBarVisible", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "setMenuBarVisible:", function(self, _cmd, visible) {

}, "void");

class_addMethod(meta_class, "menuBarHeight", function(self, _cmd) {
return 29;

}, "void");

class_addMethod(meta_class, "popUpContextMenu:withEvent:forView:", function(self, _cmd, menu, event, view) {

}, "void");

class_addMethod(meta_class, "popUpContextMenu:withEvent:forView:withFont:", function(self, _cmd, menu, event, view, font) {

}, "void");

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
if (_styleMask == 0)
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
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", Unhandled output_expression: [((), [|(), NSLeftMouseUpMask (IDENTIFIER), NSMouseMovedMask (IDENTIFIER)], ], nil, nil, nil, self, "selector:");

}, "void");

class_addMethod(the_class, "_mouseDownHandle:", function(self, _cmd, theEvent) {
if (objc_msgSend(theEvent, "type") == NSLeftMouseUp)
{

}
else
{
var newX = Unhandled output_expression: [+(), [((), [-(), [.(.), [M(), theEvent (IDENTIFIER), locationInBase (IDENTIFIER)], x (IDENTIFIER)], _eventBindingCurrentX (IDENTIFIER)], ], [.(.), [.(.), _frame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)]];
var newY = Unhandled output_expression: [+(), [((), [-(), [.(.), [M(), theEvent (IDENTIFIER), locationInBase (IDENTIFIER)], y (IDENTIFIER)], _eventBindingCurrentY (IDENTIFIER)], ], [.(.), [.(.), _frame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)]];
objc_msgSend(self, "setFrameOrigin:", NSMakePoint(newXnewY));
_eventBindingCurrentX = objc_msgSend(theEvent, "locationInBase").x;
_eventBindingCurrentY = objc_msgSend(theEvent, "locationInBase").y;
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", Unhandled output_expression: [((), [|(), NSLeftMouseUpMask (IDENTIFIER), NSMouseMovedMask (IDENTIFIER)], ], nil, nil, nil, self, "selector:");

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

var the_class = objc_allocateClassPair(NSWindow, "NSMenuBar");
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
class_addIvar(the_class, "_mainMenuView", "NSMenuView");
class_addIvar(the_class, "_statusBarView", "NSView");
class_addIvar(the_class, "_applicationTitleName", "NSString");
class_addIvar(the_class, "_applicationTitleView", "NSView");

class_addMethod(the_class, "initWithContentRect:styleMask:backing:defer:", function(self, _cmd, contentRect, windowStyle, bufferingType, deferCreation) {
objc_msgSend(self, "init");
if (self)
{
objc_msgSend(self, "setFrame:display:", contentRect, YES);
_styleMask = windowStyle;
_resizable = NO;
_firstResponder = self;
_movableByWindowBackground = YES;
_applicationTitleName = "Hello :D";
objc_msgSend(self, "setHasShadow:", YES);
objc_msgSend(self, "setVisible:", YES);
objc_msgSend(self, "setContentView:", objc_msgSend(objc_msgSend(NSView, "alloc"), "initWithFrame:", objc_msgSend(self, "contentRectForFrameRect:", contentRect)));
objc_msgSend(self, "setFrame:display:", contentRect, YES);
NSWindowServerCreateCanvas(self);
NSWindowServerAddCanvas(_gCanvas);

}

return self;

}, "void");

class_addMethod(the_class, "setApplicationTitleName:", function(self, _cmd, aString) {
_applicationTitleName = aString;
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "applicationTitleName", function(self, _cmd) {
return _applicationTitleName;

}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, rect) {
var backgroundColorTop = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 1.0);
var backgroundColorBottom = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.902, 0.902, 0.902, 1.0);
var backgroundGradient = objc_msgSend(objc_msgSend(NSGradient, "alloc"), "initWithStartingColor:endingColor:", backgroundColorTop, backgroundColorBottom);
objc_msgSend(backgroundGradient, "drawInRect:angle:", rect, 0);
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.702, 0.702, 0.702, 1.0), "set");
var menuBarBottom = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(menuBarBottom, "moveToPoint:", NSMakePoint(rect.origin.xUnhandled output_expression: [+(), [.(.), [.(.), rect (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 0.5 (CONSTANT)]));
objc_msgSend(menuBarBottom, "lineToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), rect (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), rect (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]]Unhandled output_expression: [+(), [.(.), [.(.), rect (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 0.5 (CONSTANT)]));
objc_msgSend(menuBarBottom, "stroke");
if (_applicationTitleName)
{
objc_msgSend(NSGraphicsContext, "saveGraphicsState");
var titleShadow = objc_msgSend(objc_msgSend(NSShadow, "alloc"), "init");
objc_msgSend(titleShadow, "setShadowOffset:", NSMakeSize(11));
objc_msgSend(titleShadow, "setShadowBlurRadius:", 1);
objc_msgSend(titleShadow, "setShadowColor:", objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 0.5));
objc_msgSend(titleShadow, "set");
objc_msgSend(objc_msgSend(NSColor, "controlTextColor"), "set");
objc_msgSend(objc_msgSend(NSFont, "titleBarFontOfSize:", Unhandled output_expression: [((), [+(), [M(), NSFont (TYPE_NAME), systemFontSize (IDENTIFIER)], 1 (CONSTANT)], ]), "set");
var theWidth = objc_msgSend(_applicationTitleName, "sizeWithAttributes:", nil).width;
var xTitleOffset = Unhandled output_expression: [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], theWidth (IDENTIFIER)];
var actualTitleOffset = Unhandled output_expression: [/(), xTitleOffset (IDENTIFIER), 2 (CONSTANT)];
objc_msgSend(_applicationTitleName, "drawWithRect:options:attributes:", NSMakeRect(actualTitleOffsetUnhandled output_expression: [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 18 (CONSTANT)]400), nil, nil);
objc_msgSend(NSGraphicsContext, "restoreGraphicsState");

}


}, "void");

class_addMethod(the_class, "setMainMenuView:", function(self, _cmd, aView) {
_mainMenuView = aView;
objc_msgSend(objc_msgSend(self, "contentView"), "addSubview:", aView);
objc_msgSend(_mainMenuView, "setHorizontal:", YES);
objc_msgSend(_mainMenuView, "sizeToFit");

}, "void");

class_addMethod(the_class, "mainMenuView", function(self, _cmd) {
return _mainMenuView;

}, "void");

class_addMethod(the_class, "setApplicationTitleView:", function(self, _cmd, aView) {
_applicationTitleView = aView;
objc_msgSend(objc_msgSend(self, "contentView"), "addSubview:", aView);

}, "void");

class_addMethod(the_class, "applicationTitleView", function(self, _cmd) {
return _applicationTitleView;

}, "void");

class_addMethod(the_class, "setStatusBarView:", function(self, _cmd, aView) {
_statusBarView = aView;
objc_msgSend(objc_msgSend(self, "contentView"), "addSubview:", aView);

}, "void");

class_addMethod(the_class, "statusBarView", function(self, _cmd) {
return _statusBarView;

}, "void");

class_addMethod(the_class, "becomeKeyWindow", function(self, _cmd) {
if (objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "keyWindow"))
objc_msgSend(objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "keyWindow"), "resignKeyWindow");

_keyWindow = YES;

}, "void");

class_addMethod(the_class, "resignKeyWindow", function(self, _cmd) {
_keyWindow = NO;

}, "void");

class_addMethod(the_class, "becomeMainWindow", function(self, _cmd) {
if (objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "mainWindow"))
objc_msgSend(objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "mainWindow"), "resignMainWindow");

_mainWindow = YES;

}, "void");

class_addMethod(the_class, "resignMainWindow", function(self, _cmd) {
_mainWindow = NO;

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSMenuItem");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_menu", "NSMenu");
class_addIvar(the_class, "_subMenu", "NSMenu");
class_addIvar(the_class, "_title", "NSString");
class_addIvar(the_class, "_keyEquivalent", "NSString");
class_addIvar(the_class, "_keyEquivalentModifierMask", "NSUInteger");
class_addIvar(the_class, "_mnenomicLocation", "NSInteger");
class_addIvar(the_class, "_state", "NSInteger");
class_addIvar(the_class, "_onStateImage", "NSImage");
class_addIvar(the_class, "_offStateImage", "NSImage");
class_addIvar(the_class, "_target", "id");
class_addIvar(the_class, "_action", "SEL");
class_addIvar(the_class, "_tag", "NSInteger");
class_addIvar(the_class, "_extraData", "id");
class_addIvar(the_class, "_isEnabled", "BOOL");
class_addIvar(the_class, "_isHidden", "BOOL");

class_addMethod(the_class, "init", function(self, _cmd) {
objc_msgSendSuper({super_class:NSObject, receiver:self}, "init");
_title = "";
_action = nil;
_keyEquivalent = nil;
return self;

}, "void");

class_addMethod(the_class, "initWithTitle:action:keyEquivalent:", function(self, _cmd, itemName, anAction, charCode) {
objc_msgSend(self, "init");
if (self)
{
_title = itemName;
_action = anAction;
_keyEquivalent = charCode;
_keyEquivalentModifierMask = 0;
_menu = nil;
_subMenu = nil;
_tag = Unhandled output_expression: [,(), - (-), 1 (CONSTANT)];
_target = nil;
_isEnabled = YES;
_isHidden = NO;

}

return self;

}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
_title = objc_msgSend(aCoder, "decodeStringForKey:", "NSTitle");
_keyEquivalent = objc_msgSend(aCoder, "decodeStringForKey:", "NSKeyEquiv");
_action = objc_msgSend(aCoder, "decodeStringForKey:", "NSAction");
_target = objc_msgSend(aCoder, "decodeObjectForKey:", "NSTarget");
_menu = objc_msgSend(aCoder, "decodeObjectForKey:", "NSMenu");
_subMenu = objc_msgSend(aCoder, "decodeObjectForKey:", "NSSubmenu");
_isEnabled = YES;
_isHidden = NO;
return self;

}, "void");

class_addMethod(the_class, "setEnabled:", function(self, _cmd, flag) {
if (flag == 0)
flag = NO;

_isEnabled = flag;

}, "void");

class_addMethod(the_class, "isEnabled", function(self, _cmd) {
return _isEnabled;

}, "void");

class_addMethod(the_class, "setHidden:", function(self, _cmd, hidden) {

}, "void");

class_addMethod(the_class, "isHidden", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isHiddenOrHasHiddenAncestor", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setTarget:", function(self, _cmd, anObject) {
_target = anObject;

}, "void");

class_addMethod(the_class, "target", function(self, _cmd) {
return _target;

}, "void");

class_addMethod(the_class, "setAction:", function(self, _cmd, aSelector) {
_action = aSelector;

}, "void");

class_addMethod(the_class, "action", function(self, _cmd) {
return _action;

}, "void");

class_addMethod(the_class, "setTitle:", function(self, _cmd, aString) {
_title = aString;

}, "void");

class_addMethod(the_class, "title", function(self, _cmd) {
return _title;

}, "void");

class_addMethod(the_class, "setAttributedTitle:", function(self, _cmd, string) {

}, "void");

class_addMethod(the_class, "attributedTitle", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setTag:", function(self, _cmd, anInt) {
_tag = anInt;

}, "void");

class_addMethod(the_class, "tag", function(self, _cmd) {
return _tag;

}, "void");

class_addMethod(the_class, "setState:", function(self, _cmd, itemState) {
_state = itemState;

}, "void");

class_addMethod(the_class, "state", function(self, _cmd) {
return _state;

}, "void");

class_addMethod(the_class, "setImage:", function(self, _cmd, menuImage) {

}, "void");

class_addMethod(the_class, "image", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setOnStateImage:", function(self, _cmd, itemImage) {

}, "void");

class_addMethod(the_class, "onStateImage", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setOffStateImage:", function(self, _cmd, itemImage) {

}, "void");

class_addMethod(the_class, "offStateImage", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setMixedStateImage:", function(self, _cmd, itemImage) {

}, "void");

class_addMethod(the_class, "mixedStateImage", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setSubmenu:", function(self, _cmd, aSubmenu) {
_subMenu = aSubmenu;

}, "void");

class_addMethod(the_class, "submenu", function(self, _cmd) {
return _subMenu;

}, "void");

class_addMethod(the_class, "hasSubmenu", function(self, _cmd) {
if (_subMenu)
return YES;

return NO;

}, "void");

class_addMethod(the_class, "isSeparatorItem", function(self, _cmd) {
if (Unhandled output_expression: [OR_OP(), [((), [EQ_OP(), _title (IDENTIFIER), @"" (AT_STRING_LITERAL)], ], [((), [EQ_OP(), _title (IDENTIFIER), nil (IDENTIFIER)], ]])
return YES;

return NO;

}, "void");

class_addMethod(the_class, "setMenu:", function(self, _cmd, aMenu) {
_menu = aMenu;

}, "void");

class_addMethod(the_class, "menu", function(self, _cmd) {
return _menu;

}, "void");

class_addMethod(the_class, "setKeyEquivalent:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "keyEquivalent", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setKeyEquivalentModifierMask:", function(self, _cmd, mask) {

}, "void");

class_addMethod(the_class, "keyEquivalentModifierMask", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setMnemonicLocation:", function(self, _cmd, location) {

}, "void");

class_addMethod(the_class, "mnemonicLocation", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setTitleWithMnemonic:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "mnemonic", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "userKeyEquivalent", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAlternate:", function(self, _cmd, isAlternate) {

}, "void");

class_addMethod(the_class, "isAlternate", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setIndentationLevel:", function(self, _cmd, indentationLevel) {

}, "void");

class_addMethod(the_class, "indentationLevel", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setToolTip:", function(self, _cmd, toolTip) {

}, "void");

class_addMethod(the_class, "toolTip", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setRepresentedObject:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "representedObject", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setView:", function(self, _cmd, view) {

}, "void");

class_addMethod(the_class, "view", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isHighlighted", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "separatorItem", function(self, _cmd) {
return objc_msgSend(objc_msgSend(NSMenuItem, "alloc"), "initWithTitle:action:keyEquivalent:", "", nil, nil);

}, "void");

class_addMethod(meta_class, "setUsesUserKeyEquivalents:", function(self, _cmd, flag) {

}, "void");

class_addMethod(meta_class, "usesUserKeyEquivalents", function(self, _cmd) {

}, "void");

var the_class = objc_allocateClassPair(NSButtonCell, "NSMenuItemCell");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_value", "id");
class_addIvar(the_class, "_state", "NSCellStateValue");
class_addIvar(the_class, "_isHighlighted", "BOOL");
class_addIvar(the_class, "_isEnabled", "BOOL");
class_addIvar(the_class, "_isEditable", "BOOL");
class_addIvar(the_class, "_isBordered", "BOOL");
class_addIvar(the_class, "_isBezeled", "BOOL");
class_addIvar(the_class, "_isSelectable", "BOOL");
class_addIvar(the_class, "_isScrollable", "BOOL");
class_addIvar(the_class, "_alignment", "NSUInteger");
class_addIvar(the_class, "_controlSize", "NSSize");
class_addIvar(the_class, "_controlView", "NSView");
class_addIvar(the_class, "_target", "id");
class_addIvar(the_class, "_action", "SEL");
class_addIvar(the_class, "_menuItem", "NSMenuItem");
class_addIvar(the_class, "_menuView", "NSMenuView");

class_addMethod(the_class, "menuItem", function(self, _cmd) {
return _menuItem;

}, "void");

class_addMethod(the_class, "setMenuItem:", function(self, _cmd, item) {
_menuItem = item;

}, "void");

class_addMethod(the_class, "menuView", function(self, _cmd) {
return _menuView;

}, "void");

class_addMethod(the_class, "setMenuView:", function(self, _cmd, menuView) {
_menuView = menuView;

}, "void");

class_addMethod(the_class, "calcSize", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "needsSizing", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setNeedsSizing:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "imageWidth", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "titleWidth", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "keyEquivalentWidth", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "stateImageWidth", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "keyEquivalentRectForBounds:", function(self, _cmd, cellFrame) {

}, "void");

class_addMethod(the_class, "stateImageRectForBounds:", function(self, _cmd, cellFrame) {

}, "void");

class_addMethod(the_class, "titleRectForBounds:", function(self, _cmd, cellFrame) {

}, "void");

class_addMethod(the_class, "drawWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
if (Unhandled output_expression: [,(), ! (!), [M(), [M(), self (IDENTIFIER), menuItem (IDENTIFIER)], title (IDENTIFIER)]])
{
objc_msgSend(self, "drawSeparatorItemWithFrame:inView:", cellFrame, controlView);
return ;

}

objc_msgSend(NSGraphicsContext, "saveGraphicsState");
objc_msgSend(self, "drawBorderAndBackgroundWithFrame:inView:", cellFrame, controlView);
objc_msgSend(self, "drawImageWithFrame:inView:", cellFrame, controlView);
objc_msgSend(self, "drawKeyEquivalentWithFrame:inView:", cellFrame, controlView);
objc_msgSend(self, "drawTitleWithFrame:inView:", cellFrame, controlView);
objc_msgSend(NSGraphicsContext, "restoreGraphicsState");

}, "void");

class_addMethod(the_class, "drawBorderAndBackgroundWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
if (objc_msgSend(self, "isHighlighted"))
{
var highlightTop = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.663, 0.714, 0.765, 1.0);
var highlightBottom = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.506, 0.569, 0.639, 1.0);
var highlightGradient = objc_msgSend(objc_msgSend(NSGradient, "alloc"), "initWithStartingColor:endingColor:", highlightTop, highlightBottom);
objc_msgSend(highlightGradient, "drawInRect:angle:", cellFrame, 0);
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.529, 0.573, 0.612, 1), "set");
var topBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(topBorder, "moveToPoint:", NSMakePoint(cellFrame.origin.xUnhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 0.5 (CONSTANT)]));
objc_msgSend(topBorder, "lineToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]]Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 0.5 (CONSTANT)]));
objc_msgSend(topBorder, "stroke");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.737, 0.776, 0.816, 1), "set");
var topBorderInner = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(topBorderInner, "moveToPoint:", NSMakePoint(cellFrame.origin.xUnhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 1.5 (CONSTANT)]));
objc_msgSend(topBorderInner, "lineToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]]Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 1.5 (CONSTANT)]));
objc_msgSend(topBorderInner, "stroke");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.404, 0.455, 0.510, 1), "set");
var bottomBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(bottomBorder, "moveToPoint:", NSMakePoint(cellFrame.origin.xUnhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 0.5 (CONSTANT)]));
objc_msgSend(bottomBorder, "lineToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 0.5 (CONSTANT)]));
objc_msgSend(bottomBorder, "stroke");

}


}, "void");

class_addMethod(the_class, "drawImageWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {

}, "void");

class_addMethod(the_class, "drawKeyEquivalentWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {

}, "void");

class_addMethod(the_class, "drawSeparatorItemWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {

}, "void");

class_addMethod(the_class, "drawStateImageWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {

}, "void");

class_addMethod(the_class, "drawTitleWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
var _title = objc_msgSend(objc_msgSend(self, "menuItem"), "title");
if (Unhandled output_expression: [,(), ! (!), _title (IDENTIFIER)])
return ;

if (objc_msgSend(self, "isHighlighted"))
{
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.953, 0.953, 0.953, 1), "set");
var titleShadow = objc_msgSend(objc_msgSend(NSShadow, "alloc"), "init");
objc_msgSend(titleShadow, "setShadowOffset:", NSMakeSize(11));
objc_msgSend(titleShadow, "setShadowBlurRadius:", 1);
objc_msgSend(titleShadow, "setShadowColor:", objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.396, 0.435, 0.510, 0.5));
objc_msgSend(titleShadow, "set");

}
else
{
objc_msgSend(objc_msgSend(NSColor, "controlTextColor"), "set");
var titleShadow = objc_msgSend(objc_msgSend(NSShadow, "alloc"), "init");
objc_msgSend(titleShadow, "setShadowOffset:", NSMakeSize(11));
objc_msgSend(titleShadow, "setShadowBlurRadius:", 1);
objc_msgSend(titleShadow, "setShadowColor:", objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 0.5));
objc_msgSend(titleShadow, "set");

}

objc_msgSend(objc_msgSend(NSFont, "systemFontOfSize:", objc_msgSend(NSFont, "systemFontSize")), "set");
if (objc_msgSend(_menuView, "isHorizontal"))
objc_msgSend(_title, "drawWithRect:options:attributes:", NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 25 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 9 (CONSTANT)]400), nil, nil);
else
objc_msgSend(_title, "drawWithRect:options:attributes:", NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 25 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 6 (CONSTANT)]400), nil, nil);


}, "void");

class_addMethod(the_class, "needsDisplay", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setNeedsDisplay:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "tag", function(self, _cmd) {

}, "void");

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
FOR (FOR)
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
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", Unhandled output_expression: [((), [|(), NSLeftMouseUpMask (IDENTIFIER), NSMouseMovedMask (IDENTIFIER)], ], nil, nil, nil, self, "selector:");

}, "void");

class_addMethod(the_class, "_mouseDownMenuHandle:", function(self, _cmd, theEvent) {
var visibleMenus = objc_msgSend(_eventBindingMenuArray, "count");
FOR (FOR)if (objc_msgSend(theEvent, "type") == NSMouseMoved)
{
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", Unhandled output_expression: [((), [|(), NSLeftMouseUpMask (IDENTIFIER), NSMouseMovedMask (IDENTIFIER)], ], nil, nil, nil, self, "selector:");

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
FOR (FOR)_innerRect = boundsRect;
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
FOR (FOR)return Unhandled output_expression: [,(), - (-), 1 (CONSTANT)];

}
else
{
FOR (FOR)return Unhandled output_expression: [,(), - (-), 1 (CONSTANT)];

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

var the_class = objc_allocateClassPair(NSWindow, "NSMenuWindow");
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

class_addMethod(the_class, "drawRect:", function(self, _cmd, aRect) {
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 0.95), "set");
objc_msgSend(NSBezierPath, "fillRect:", aRect);
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.698, 0.698, 0.698, 0.95), "set");
objc_msgSend(NSBezierPath, "strokeRect:", NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), aRect (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 0.5 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), aRect (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 0.5 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), aRect (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), aRect (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 1 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), aRect (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), aRect (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 1 (CONSTANT)]));

}, "void");

class_addMethod(the_class, "isReleasedWhenClosed", function(self, _cmd) {
return YES;

}, "void");

class_addMethod(the_class, "becomeKeyWindow", function(self, _cmd) {
if (objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "keyWindow"))
objc_msgSend(objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "keyWindow"), "resignKeyWindow");

_keyWindow = YES;

}, "void");

class_addMethod(the_class, "resignKeyWindow", function(self, _cmd) {
_keyWindow = NO;

}, "void");

class_addMethod(the_class, "becomeMainWindow", function(self, _cmd) {
if (objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "mainWindow"))
objc_msgSend(objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "mainWindow"), "resignMainWindow");

_mainWindow = YES;

}, "void");

class_addMethod(the_class, "resignMainWindow", function(self, _cmd) {
_mainWindow = NO;

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSNib");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_data", "NSData");
class_addIvar(the_class, "_connections", "NSDictionary");
class_addIvar(the_class, "_hierarchy", "NSDictionary");
class_addIvar(the_class, "_objects", "NSDictionary");
class_addIvar(the_class, "_topLevelObjects", "NSArray");

class_addMethod(the_class, "initWithNibNamed:bundle:", function(self, _cmd, nibName, bundle) {
var fullPathURL = Unhandled output_expression: [+(), nibName (IDENTIFIER), @".xib" (AT_STRING_LITERAL)];
_data = objc_msgSend(objc_msgSend(NSData, "alloc"), "initWithContentsOfFile:", fullPathURL);
return self;

}, "void");

class_addMethod(the_class, "instantiateNibWithOwner:topLevelObjects:", function(self, _cmd, owner, topLevelObjects) {
var nameTable = objc_msgSend(NSMutableDictionary, "dictionaryWithCapacity:", 2);
objc_msgSend(nameTable, "setObject:forKey:", owner, "NSNibOwner");
objc_msgSend(nameTable, "setObject:forKey:", topLevelObjects, "NSTopLevelObjects");
_topLevelObjects = topLevelObjects;
return objc_msgSend(self, "instantiateNibWithExternalNameTable:", nameTable);

}, "void");

class_addMethod(the_class, "instantiateNibWithExternalNameTable:", function(self, _cmd, externalNameTable) {
var unarchiver = objc_msgSend(objc_msgSend(NSKeyedUnarchiver, "alloc"), "initForReadingWithData:", _data);
_data = unarchiver.data;
_objects = objc_msgSend(NSMutableDictionary, "dictionaryWithCapacity:", 0);
_topLevelObjects = objc_msgSend(unarchiver, "decodeObjectForKey:", "IBDocument.RootObjects");
_connections = objc_msgSend(unarchiver, "decodeConnectionObjects");
FOR (FOR)return YES;

}, "void");

var the_class = objc_allocateClassPair(NSControl, "NSTableView");
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
class_addIvar(the_class, "_value", "id");
class_addIvar(the_class, "_dataSource", "id");
class_addIvar(the_class, "_delegate", "id");
class_addIvar(the_class, "_scrollView", "NSScrollView");
class_addIvar(the_class, "_headerView", "NSTableHeaderView");
class_addIvar(the_class, "_cornerView", "NSView");
class_addIvar(the_class, "_tableColumns", "NSMutableArray");
class_addIvar(the_class, "_tableColumnViews", "NSMutableArray");
class_addIvar(the_class, "_numberOfRows", "NSUInteger");
class_addIvar(the_class, "_numberOfColumns", "NSUInteger");
class_addIvar(the_class, "_tableCells", "NSMutableArray");
class_addIvar(the_class, "_intercellSpacing", "NSSize");
class_addIvar(the_class, "_rowHeight", "NSUInteger");
class_addIvar(the_class, "_selectedRowIndexes", "NSMutableIndexSet");
class_addIvar(the_class, "_editedColumn", "NSUInteger");
class_addIvar(the_class, "_editedRow", "NSUInteger");
class_addIvar(the_class, "_drawsGrid", "BOOL");
class_addIvar(the_class, "_alternatingRowBackground", "BOOL");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSControl, receiver:self}, "initWithCoder:", aCoder);
var flags = objc_msgSend(aCoder, "decodeIntForKey:", "NSTvFlags");
if (Unhandled output_expression: [&(), flags (IDENTIFIER), 0x20000000 (CONSTANT)])
_drawsGrid = YES;
else
_drawsGrid = NO;

if (Unhandled output_expression: [&(), flags (IDENTIFIER), 0x00800000 (CONSTANT)])
_alternatingRowBackground = YES;
else
_alternatingRowBackground = NO;

_headerView = objc_msgSend(aCoder, "decodeObjectForKey:", "NSHeaderView");
if (_headerView)
objc_msgSend(_headerView, "setTableView:", self);

_cornerView = objc_msgSend(aCoder, "decodeObjectForKey:", "NSCornerView");
_tableColumns = objc_msgSend(aCoder, "decodeObjectForKey:", "NSTableColumns");
_numberOfRows = 0;
_numberOfColumns = objc_msgSend(_tableColumns, "count");
FOR (FOR)return self;

}, "void");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
objc_msgSendSuper({super_class:NSControl, receiver:self}, "initWithFrame:", frameRect);
if (self)
{
_rowHeight = 16;
_numberOfRows = 0;
_numberOfColumns = 0;
_selectedRowIndexes = objc_msgSend(objc_msgSend(NSMutableIndexSet, "alloc"), "init");
objc_msgSend(self, "setIntercellSpacing:", NSMakeSize(32));
_tableCells = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
_tableColumns = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
_tableColumnViews = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);

}

return self;

}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, dirtyRect) {
if (_alternatingRowBackground)
{
var backgroundColors = objc_msgSend(NSColor, "controlAlternatingRowBackgroundColors");
if (_rowHeight)
{
var rowsToDraw = Unhandled output_expression: [+(), [f(), [.(.), Math (IDENTIFIER), round (IDENTIFIER)], [/(), [.(.), [.(.), _bounds (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], _rowHeight (IDENTIFIER)]], 1 (CONSTANT)];
var oddRow = YES;
var colorToDraw;
FOR (FOR)
}


}
else
{
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 1), "set");
objc_msgSend(NSBezierPath, "fillRect:", dirtyRect);

}

if (_selectedRowIndexes)
{
var theHighlightedRows = objc_msgSend(_selectedRowIndexes, "indexes");
FOR (FOR)
}

if (Unhandled output_expression: [AND_OP(), _tableColumns (IDENTIFIER), _drawsGrid (IDENTIFIER)])
{
FOR (FOR)
}

FOR (FOR)
}, "void");

class_addMethod(the_class, "preparedCellAtColumn:row:", function(self, _cmd, column, row) {
var column = objc_msgSend(_tableColumns, "objectAtIndex:", column);
var dataCell = objc_msgSend(column, "dataCellForRow:", row);
objc_msgSend(dataCell, "setObjectValue:", objc_msgSend(_dataSource, "tableView:objectValueForTableColumn:row:", self, column, row));
if (objc_msgSend(self, "isRowSelected:", row))
{
objc_msgSend(dataCell, "setTextColor:", objc_msgSend(NSColor, "selectedTextColor"));

}
else
{
objc_msgSend(dataCell, "setTextColor:", objc_msgSend(NSColor, "textColor"));

}

return dataCell;

}, "void");

class_addMethod(the_class, "isRowSelected:", function(self, _cmd, rowIndex) {
if (objc_msgSend(_selectedRowIndexes, "containsIndex:", rowIndex))
return YES;
else
return NO;


}, "void");

class_addMethod(the_class, "tile", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setIntercellSpacing:", function(self, _cmd, aSize) {
_intercellSpacing = aSize;

}, "void");

class_addMethod(the_class, "intercellSpacing", function(self, _cmd) {
return _intercellSpacing;

}, "void");

class_addMethod(the_class, "setRowHeight:", function(self, _cmd, rowHeight) {
_rowHeight = rowHeight;

}, "void");

class_addMethod(the_class, "rowHeight", function(self, _cmd) {
return _rowHeight;

}, "void");

class_addMethod(the_class, "addTableColumn:", function(self, _cmd, aColumn) {
var i;
var xOffset = 0;
FOR (FOR)objc_msgSend(_tableColumns, "addObject:", aColumn);
_numberOfColumns = objc_msgSend(_tableColumns, "count");
objc_msgSend(self, "reloadData");

}, "void");

class_addMethod(the_class, "removeTableColumn:", function(self, _cmd, aTableColumn) {

}, "void");

class_addMethod(the_class, "tableColumns", function(self, _cmd) {
return _tableColumns;

}, "void");

class_addMethod(the_class, "numberOfRows", function(self, _cmd) {
return _numberOfRows;

}, "void");

class_addMethod(the_class, "numberOfColumns", function(self, _cmd) {
return _numberOfColumns;

}, "void");

class_addMethod(the_class, "setDataSource:", function(self, _cmd, anObject) {
_dataSource = anObject;
objc_msgSend(self, "reloadData");

}, "void");

class_addMethod(the_class, "dataSource", function(self, _cmd) {
return _dataSource;

}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, anObject) {
_delegate = anObject;

}, "void");

class_addMethod(the_class, "delegate", function(self, _cmd) {
return _delegate;

}, "void");

class_addMethod(the_class, "reloadData", function(self, _cmd) {
if (Unhandled output_expression: [,(), ! (!), _dataSource (IDENTIFIER)])
return ;

if (Unhandled output_expression: [,(), ! (!), [M(), _dataSource (IDENTIFIER), [:(), respondsToSelector (IDENTIFIER), [AT_SELECTOR(AT_SELECTOR), numberOfRowsInTableView (IDENTIFIER), ]]]])
return ;

_numberOfRows = objc_msgSend(_dataSource, "numberOfRowsInTableView:", self);
objc_msgSend(self, "setNeedsDisplay:", YES);
if (_headerView)
objc_msgSend(_headerView, "setNeedsDisplay:", YES);


}, "void");

class_addMethod(the_class, "setHeaderView:", function(self, _cmd, aHeaderView) {
_headerView = aHeaderView;
objc_msgSend(_headerView, "setTableView:", self);

}, "void");

class_addMethod(the_class, "headerView", function(self, _cmd) {
return _headerView;

}, "void");

class_addMethod(the_class, "frameOfCellAtColumn:row:", function(self, _cmd, columnIndex, rowIndex) {
var columnRect = objc_msgSend(self, "rectOfColumn:", columnIndex);
var rowRect = objc_msgSend(self, "rectOfRow:", rowIndex);
return NSMakeRect(columnRect.origin.xrowRect.origin.ycolumnRect.size.widthrowRect.size.height);

}, "void");

class_addMethod(the_class, "rectOfColumn:", function(self, _cmd, columnIndex) {
var columnRect = NSMakeRect(_bounds.origin.x_bounds.origin.y0_bounds.size.height);
FOR (FOR)columnRect.size.width = Unhandled output_expression: [+(), [M(), [M(), _tableColumns (IDENTIFIER), [:(), objectAtIndex (IDENTIFIER), columnIndex (IDENTIFIER)]], width (IDENTIFIER)], [.(.), _intercellSpacing (IDENTIFIER), width (IDENTIFIER)]];
return columnRect;

}, "void");

class_addMethod(the_class, "rectOfRow:", function(self, _cmd, rowIndex) {
var rowRect = NSMakeRect(_bounds.origin.xUnhandled output_expression: [+(), [.(.), [.(.), _bounds (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], [.(.), [.(.), _bounds (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)]]_bounds.size.width_rowHeight);
var eachRowHeight = 18;
var yOffset = Unhandled output_expression: [*(), eachRowHeight (IDENTIFIER), rowIndex (IDENTIFIER)];
rowRect.origin.y = Unhandled output_expression: [-(), [-(), [-(), [.(.), [.(.), _bounds (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], yOffset (IDENTIFIER)], eachRowHeight (IDENTIFIER)], 1 (CONSTANT)];
rowRect.size.height = Unhandled output_expression: [+(), eachRowHeight (IDENTIFIER), [.(.), _intercellSpacing (IDENTIFIER), height (IDENTIFIER)]];
return rowRect;

}, "void");

class_addMethod(the_class, "observeValueForKeyPath:ofObject:change:context:", function(self, _cmd, keyPath, object, change, context) {
if (context == "selectionIndexes")
{
if (Unhandled output_expression: [,(), ! (!), [M(), _selectedRowIndexes (IDENTIFIER), [:(), isEqualToIndexSet (IDENTIFIER), [M(), object (IDENTIFIER), [:(), valueForKeyPath (IDENTIFIER), keyPath (IDENTIFIER)]]]]])
{
objc_msgSend(self, "selectRowIndexes:byExtendingSelection:", objc_msgSend(object, "valueForKeyPath:", keyPath), NO);

}


}
else
{

}


}, "void");

class_addMethod(the_class, "columnAtPoint:", function(self, _cmd, aPoint) {
FOR (FOR)return Unhandled output_expression: [,(), - (-), 1 (CONSTANT)];

}, "void");

class_addMethod(the_class, "rowAtPoint:", function(self, _cmd, aPoint) {
FOR (FOR)return Unhandled output_expression: [,(), - (-), 1 (CONSTANT)];

}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
objc_msgSend(_window, "makeFirstResponder:", self);
var location = objc_msgSend(self, "convertPoint:fromView:", objc_msgSend(theEvent, "locationInWindow"), nil);
var clickedColumnIndex = objc_msgSend(self, "columnAtPoint:", location);
var clickedRowIndex = objc_msgSend(self, "rowAtPoint:", location);
var clickedColumn = objc_msgSend(_tableColumns, "objectAtIndex:", clickedColumnIndex);
var clickedCell = objc_msgSend(clickedColumn, "dataCellForRow:", clickedRowIndex);
if (Unhandled output_expression: [<(), [M(), theEvent (IDENTIFIER), clickCount (IDENTIFIER)], 2 (CONSTANT)])
{
if (Unhandled output_expression: [&(), [M(), theEvent (IDENTIFIER), modifierFlags (IDENTIFIER)], NSShiftKeyMask (IDENTIFIER)])
{

}
else
if (Unhandled output_expression: [&(), [M(), theEvent (IDENTIFIER), modifierFlags (IDENTIFIER)], [((), [|(), NSCommandKeyMask (IDENTIFIER), NSAlternateKeyMask (IDENTIFIER)], ]])
{
if (objc_msgSend(self, "isRowSelected:", clickedRowIndex))
{
objc_msgSend(self, "deselectRow:", clickedRowIndex);

}
else
{
objc_msgSend(self, "selectRowIndexes:byExtendingSelection:", objc_msgSend(objc_msgSend(NSIndexSet, "alloc"), "initWithIndex:", clickedRowIndex), YES);

}


}
else
{
NSLog("here");
objc_msgSend(self, "selectRowIndexes:byExtendingSelection:", objc_msgSend(objc_msgSend(NSIndexSet, "alloc"), "initWithIndex:", clickedRowIndex), NO);

}



}
else
if (objc_msgSend(theEvent, "clickCount") == 2)
{
if (objc_msgSend(objc_msgSend(_tableColumns, "objectAtIndex:", clickedColumnIndex), "isEditable"))
{
objc_msgSend(self, "editColumn:row:withEvent:select:", clickedColumnIndex, clickedRowIndex, theEvent, NO);

}


}



}, "void");

class_addMethod(the_class, "mouseUp:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "selectRowIndexes:byExtendingSelection:", function(self, _cmd, indexes, extend) {
if (extend)
{
objc_msgSend(_selectedRowIndexes, "addIndexes:", indexes);

}
else
{
objc_msgSend(_selectedRowIndexes, "removeAllIndexes");
objc_msgSend(_selectedRowIndexes, "addIndexes:", indexes);

}

objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "deselectRow:", function(self, _cmd, rowIndex) {
objc_msgSend(_selectedRowIndexes, "removeIndex:", rowIndex);
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "editColumn:row:withEvent:select:", function(self, _cmd, columnIndex, rowIndex, theEvent, flag) {
NSLog("editing tableview");
var columnToEdit = objc_msgSend(_tableColumns, "objectAtIndex:", columnIndex);
var cellToEdit;
if (Unhandled output_expression: [,(), ! (!), columnToEdit (IDENTIFIER)])
return ;

if (Unhandled output_expression: [<(), rowIndex (IDENTIFIER), 0 (CONSTANT)])
return ;

_editedColumn = columnIndex;
_editedRow = rowIndex;
var editingFrame = objc_msgSend(self, "frameOfCellAtColumn:row:", columnIndex, rowIndex);
cellToEdit = objc_msgSend(columnToEdit, "dataCellForRow:", rowIndex);
NSLog(editingFrame);
objc_msgSend(cellToEdit, "setDrawsBackground:", YES);
objc_msgSend(cellToEdit, "setBezeled:", NO);
objc_msgSend(cellToEdit, "setBordered:", YES);
objc_msgSend(cellToEdit, "setObjectValue:", objc_msgSend(_dataSource, "tableView:objectValueForTableColumn:row:", self, columnIndex, rowIndex));
_currentEditor = objc_msgSend(objc_msgSend(self, "window"), "fieldEditor:forObject:", YES, self);
_currentEditor = objc_msgSend(cellToEdit, "setUpFieldEditorAttributes:", _currentEditor);
if (flag)
objc_msgSend(cellToEdit, "selectWithFrame:inView:editor:delegate:start:length:", editingFrame, self, _currentEditor, self, 0, 0);
else
objc_msgSend(cellToEdit, "editWithFrame:inView:editor:delegate:event:", editingFrame, self, _currentEditor, self, theEvent);

objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "editedColumn", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "editedRow", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "textDidEndEditing:", function(self, _cmd, aNotification) {
NSLog("i was called...");

}, "void");

class_addMethod(the_class, "moveUp:", function(self, _cmd, sender) {
if (Unhandled output_expression: [<(), [M(), _selectedRowIndexes (IDENTIFIER), firstIndex (IDENTIFIER)], 1 (CONSTANT)])
return ;

var newIndex = Unhandled output_expression: [-(), [M(), _selectedRowIndexes (IDENTIFIER), firstIndex (IDENTIFIER)], 1 (CONSTANT)];
objc_msgSend(self, "selectRowIndexes:byExtendingSelection:", objc_msgSend(objc_msgSend(NSIndexSet, "alloc"), "initWithIndex:", newIndex), NO);

}, "void");

class_addMethod(the_class, "moveUpAndModifySelection:", function(self, _cmd, sender) {
if (Unhandled output_expression: [<(), [M(), _selectedRowIndexes (IDENTIFIER), firstIndex (IDENTIFIER)], 1 (CONSTANT)])
return ;

var newIndex = Unhandled output_expression: [-(), [M(), _selectedRowIndexes (IDENTIFIER), firstIndex (IDENTIFIER)], 1 (CONSTANT)];
objc_msgSend(self, "selectRowIndexes:byExtendingSelection:", objc_msgSend(objc_msgSend(NSIndexSet, "alloc"), "initWithIndex:", newIndex), YES);

}, "void");

class_addMethod(the_class, "moveDown:", function(self, _cmd, sender) {
if (Unhandled output_expression: [<(), _numberOfRows (IDENTIFIER), [((), [+(), [M(), _selectedRowIndexes (IDENTIFIER), firstIndex (IDENTIFIER)], 2 (CONSTANT)], ]])
return ;

var newIndex = Unhandled output_expression: [+(), [M(), _selectedRowIndexes (IDENTIFIER), firstIndex (IDENTIFIER)], 1 (CONSTANT)];
objc_msgSend(self, "selectRowIndexes:byExtendingSelection:", objc_msgSend(objc_msgSend(NSIndexSet, "alloc"), "initWithIndex:", newIndex), NO);

}, "void");

class_addMethod(the_class, "moveDownAndModifySelection:", function(self, _cmd, sender) {
if (Unhandled output_expression: [<(), _numberOfRows (IDENTIFIER), [((), [+(), [M(), _selectedRowIndexes (IDENTIFIER), lastIndex (IDENTIFIER)], 2 (CONSTANT)], ]])
return ;

var newIndex = Unhandled output_expression: [+(), [M(), _selectedRowIndexes (IDENTIFIER), lastIndex (IDENTIFIER)], 1 (CONSTANT)];
objc_msgSend(self, "selectRowIndexes:byExtendingSelection:", objc_msgSend(objc_msgSend(NSIndexSet, "alloc"), "initWithIndex:", newIndex), YES);

}, "void");

class_addMethod(the_class, "selectAll:", function(self, _cmd, sender) {
var newIndexSet = objc_msgSend(objc_msgSend(NSMutableIndexSet, "alloc"), "initWithIndex:", 0);
FOR (FOR)objc_msgSend(self, "selectRowIndexes:byExtendingSelection:", newIndexSet, NO);

}, "void");

var the_class = objc_allocateClassPair(NSTableView, "NSOutlineView");
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
class_addIvar(the_class, "_value", "id");
class_addIvar(the_class, "_dataSource", "id");
class_addIvar(the_class, "_delegate", "id");
class_addIvar(the_class, "_scrollView", "NSScrollView");
class_addIvar(the_class, "_headerView", "NSTableHeaderView");
class_addIvar(the_class, "_cornerView", "NSView");
class_addIvar(the_class, "_tableColumns", "NSMutableArray");
class_addIvar(the_class, "_tableColumnViews", "NSMutableArray");
class_addIvar(the_class, "_numberOfRows", "NSUInteger");
class_addIvar(the_class, "_numberOfColumns", "NSUInteger");
class_addIvar(the_class, "_tableCells", "NSMutableArray");
class_addIvar(the_class, "_intercellSpacing", "NSSize");
class_addIvar(the_class, "_rowHeight", "NSUInteger");
class_addIvar(the_class, "_selectedRowIndexes", "NSMutableIndexSet");
class_addIvar(the_class, "_editedColumn", "NSUInteger");
class_addIvar(the_class, "_editedRow", "NSUInteger");
class_addIvar(the_class, "_drawsGrid", "BOOL");
class_addIvar(the_class, "_alternatingRowBackground", "BOOL");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
objc_msgSendSuper({super_class:NSTableView, receiver:self}, "initWithFrame:", frameRect);
return self;

}, "void");

var the_class = objc_allocateClassPair(NSWindow, "NSPanel");
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

class_addMethod(the_class, "initWithContentRect:styleMask:backing:defer:", function(self, _cmd, contentRect, windowStyle, bufferingType, deferCreation) {
objc_msgSendSuper({super_class:NSWindow, receiver:self}, "initWithContentRect:styleMask:backing:defer:", contentRect, windowStyle, bufferingType, deferCreation);
return self;

}, "void");

class_addMethod(the_class, "becomeKeyWindow", function(self, _cmd) {
if (objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "keyWindow"))
objc_msgSend(objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "keyWindow"), "resignKeyWindow");

_keyWindow = YES;
objc_msgSend(self, "setLevel:", Unhandled output_expression: [((), [+(), 10 (CONSTANT), 5 (CONSTANT)], ]);

}, "void");

class_addMethod(the_class, "resignKeyWindow", function(self, _cmd) {
_keyWindow = NO;
objc_msgSend(self, "setLevel:", 10);

}, "void");

class_addMethod(the_class, "makeKeyAndOrderFront:", function(self, _cmd, sender) {
objc_msgSend(self, "makeKeyWindow");

}, "void");

class_addMethod(the_class, "canBecomeMainWindow", function(self, _cmd) {
return NO;

}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, dirtyRect) {
var NSWindowBorderSize = 20;
var NSPanelUtilityTitleBarSize = 22;
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0, 0, 0, 0.7), "set");
objc_msgSend(NSBezierPath, "fillRect:", NSMakeRect(0.50.5Unhandled output_expression: [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], 1 (CONSTANT)]Unhandled output_expression: [-(), [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 1.5 (CONSTANT)], NSPanelUtilityTitleBarSize (IDENTIFIER)]));
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.6, 0.6, 0.6, 0.9), "set");
objc_msgSend(NSBezierPath, "strokeRect:", NSMakeRect(0.50.5Unhandled output_expression: [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], 1 (CONSTANT)]Unhandled output_expression: [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 1 (CONSTANT)]));
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.351, 0.351, 0.351, 0.7), "set");
var titlebarBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(titlebarBorder, "setLineWidth:", 1);
objc_msgSend(titlebarBorder, "moveToPoint:", NSMakePoint(Unhandled output_expression: [+(), 0.5 (CONSTANT), NSWindowBorderSize (IDENTIFIER)]Unhandled output_expression: [-(), [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 1.5 (CONSTANT)], NSPanelUtilityTitleBarSize (IDENTIFIER)]));
objc_msgSend(titlebarBorder, "lineToPoint:", NSMakePoint(Unhandled output_expression: [-(), [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], NSWindowBorderSize (IDENTIFIER)], 0.5 (CONSTANT)]Unhandled output_expression: [-(), [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 1.5 (CONSTANT)], NSPanelUtilityTitleBarSize (IDENTIFIER)]));
objc_msgSend(titlebarBorder, "stroke");
var titlebarBackground1 = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.4, 0.4, 0.4, 0.8);
var titlebarBackground2 = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.2, 0.2, 0.2, 0.8);
var titlebarGradient = objc_msgSend(objc_msgSend(NSGradient, "alloc"), "initWithStartingColor:endingColor:", titlebarBackground1, titlebarBackground2);
objc_msgSend(titlebarGradient, "drawInRect:angle:", NSMakeRect(NSWindowBorderSizeUnhandled output_expression: [-(), [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 1.0 (CONSTANT)], NSPanelUtilityTitleBarSize (IDENTIFIER)]Unhandled output_expression: [-(), [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], NSWindowBorderSize (IDENTIFIER)], 1.0 (CONSTANT)]NSPanelUtilityTitleBarSize), 0);
if (_title)
{
objc_msgSend(NSGraphicsContext, "saveGraphicsState");
var titleShadow = objc_msgSend(objc_msgSend(NSShadow, "alloc"), "init");
objc_msgSend(titleShadow, "setShadowOffset:", NSMakeSize(11));
objc_msgSend(titleShadow, "setShadowBlurRadius:", 1);
objc_msgSend(titleShadow, "setShadowColor:", objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0, 0, 0, 0.5));
objc_msgSend(titleShadow, "set");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.9, 0.9, 0.9, 1.0), "set");
objc_msgSend(objc_msgSend(NSFont, "titleBarFontOfSize:", objc_msgSend(NSFont, "smallSystemFontSize")), "set");
var theWidth = objc_msgSend(_title, "sizeWithAttributes:", nil).width;
var xTitleOffset = Unhandled output_expression: [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], theWidth (IDENTIFIER)];
var actualTitleOffset = Unhandled output_expression: [/(), xTitleOffset (IDENTIFIER), 2 (CONSTANT)];
objc_msgSend(_title, "drawWithRect:options:attributes:", NSMakeRect(actualTitleOffsetUnhandled output_expression: [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 15 (CONSTANT)]400), nil, nil);
objc_msgSend(NSGraphicsContext, "restoreGraphicsState");

}


}, "void");

class_addMethod(the_class, "frameRectForContentRect:", function(self, _cmd, windowContent) {
var xOffset = 0;
var yOffset = 0;
var widthOffset = 0;
var heightOffset = 0;
xOffset = Unhandled output_expression: [-(), xOffset (IDENTIFIER), NSWindowBorderSize (IDENTIFIER)];
yOffset = Unhandled output_expression: [-(), yOffset (IDENTIFIER), NSWindowBorderSize (IDENTIFIER)];
widthOffset = Unhandled output_expression: [+(), widthOffset (IDENTIFIER), [((), [*(), 2 (CONSTANT), NSWindowBorderSize (IDENTIFIER)], ]];
heightOffset = Unhandled output_expression: [+(), heightOffset (IDENTIFIER), [((), [*(), 2 (CONSTANT), NSWindowBorderSize (IDENTIFIER)], ]];
heightOffset = Unhandled output_expression: [+(), heightOffset (IDENTIFIER), NSPanelUtilityTitleBarSize (IDENTIFIER)];
var frameRect = NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), windowContent (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], xOffset (IDENTIFIER)]Unhandled output_expression: [+(), [.(.), [.(.), windowContent (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], yOffset (IDENTIFIER)]Unhandled output_expression: [+(), [.(.), [.(.), windowContent (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], widthOffset (IDENTIFIER)]Unhandled output_expression: [+(), [.(.), [.(.), windowContent (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], heightOffset (IDENTIFIER)]);
return frameRect;

}, "void");

class_addMethod(the_class, "canBecomeMainWindow", function(self, _cmd) {
return NO;

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSScreen");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "frame", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "visibleFrame", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "mainScreen", function(self, _cmd) {
var mainScreen = objc_msgSend(objc_msgSend(NSScreen, "alloc"), "init");
return mainScreen;

}, "void");

var the_class = objc_allocateClassPair(NSControl, "NSScroller");
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
class_addIvar(the_class, "_value", "id");
class_addIvar(the_class, "_isVertical", "BOOL");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSControl, receiver:self}, "initWithCoder:", aCoder);
if (Unhandled output_expression: [<(), [.(.), [.(.), _bounds (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], [.(.), [.(.), _bounds (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]])
_isVertical = YES;
else
_isVertical = NO;

return self;

}, "void");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
objc_msgSendSuper({super_class:NSControl, receiver:self}, "initWithFrame:", frameRect);
if (self)
{

}

return self;

}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, rect) {
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.4, 0.5, 0.4, 1), "set");
objc_msgSend(NSBezierPath, "fillRect:", rect);

}, "void");

class_addMethod(the_class, "isVertical", function(self, _cmd) {
return _isVertical;

}, "void");

var the_class = objc_allocateClassPair(NSView, "NSScrollView");
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
class_addIvar(the_class, "_verticalScroller", "NSView");
class_addIvar(the_class, "_horizontalScroller", "NSView");
class_addIvar(the_class, "_clipView", "NSView");
class_addIvar(the_class, "_headerClipView", "NSView");
class_addIvar(the_class, "_cornerView", "NSView");
class_addIvar(the_class, "_hasVerticalScroller", "BOOL");
class_addIvar(the_class, "_hasHorizontalScroller", "BOOL");
class_addIvar(the_class, "_borderType", "NSInteger");
class_addIvar(the_class, "_contentView", "NSView");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithCoder:", aCoder);
var flags = objc_msgSend(aCoder, "decodeIntForKey:", "NSsFlags");
if (Unhandled output_expression: [&(), flags (IDENTIFIER), 0x10 (CONSTANT)])
_hasVerticalScroller = YES;
else
_hasVerticalScroller = NO;

if (Unhandled output_expression: [&(), flags (IDENTIFIER), 0x20 (CONSTANT)])
_hasHorizontalScroller = YES;
else
_hasHorizontalScroller = NO;

_borderType = Unhandled output_expression: [&(), flags (IDENTIFIER), 0x303 (CONSTANT)];
FOR (FOR)objc_msgSend(self, "tile");
return self;

}, "void");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithFrame:", frameRect);
_contentView = objc_msgSend(objc_msgSend(NSView, "alloc"), "initWithFrame:", NSMakeRect(0000));
return self;

}, "void");

class_addMethod(the_class, "resizeSubviewsWithOldSize:", function(self, _cmd, oldBoundsSize) {
objc_msgSend(self, "tile");

}, "void");

class_addMethod(the_class, "tile", function(self, _cmd) {
var tilingFrame;
if (_headerClipView)
{
NSLog("got header clip view");
tilingFrame = NSMakeRect(1Unhandled output_expression: [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], [.(.), [.(.), [M(), _headerClipView (IDENTIFIER), bounds (IDENTIFIER)], size (IDENTIFIER)], height (IDENTIFIER)]]_frame.size.widthobjc_msgSend(_headerClipView, "bounds").size.height);
objc_msgSend(_headerClipView, "setFrame:", tilingFrame);

}

if (_clipView)
{
NSLog("got header clip view");
tilingFrame = NSMakeRect(11_frame.size.widthobjc_msgSend(_clipView, "bounds").size.height);
objc_msgSend(_clipView, "setFrame:", tilingFrame);

}


}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, dirtyRect) {
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.851, 0.851, 0.851, 1.0), "set");
objc_msgSend(NSBezierPath, "strokeRect:", NSMakeRect(0.50.5Unhandled output_expression: [-(), [.(.), [.(.), _bounds (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], 1 (CONSTANT)]Unhandled output_expression: [-(), [.(.), [.(.), _bounds (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 1 (CONSTANT)]));

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSShadow");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_shadowBlurRadius", "int");
class_addIvar(the_class, "_shadowColor", "NSColor");
class_addIvar(the_class, "_shadowOffset", "NSSize");

class_addMethod(the_class, "set", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setShadowBlurRadius:", function(self, _cmd, val) {
_shadowBlurRadius = val;

}, "void");

class_addMethod(the_class, "setShadowColor:", function(self, _cmd, color) {
_shadowColor = color;

}, "void");

class_addMethod(the_class, "setShadowOffset:", function(self, _cmd, offset) {
_shadowOffset = offset;

}, "void");

class_addMethod(the_class, "shadowBlurRadius", function(self, _cmd) {
return _shadowBlurRadius;

}, "void");

class_addMethod(the_class, "shadowColor", function(self, _cmd) {
return _shadowColor;

}, "void");

class_addMethod(the_class, "shadowOffset", function(self, _cmd) {
return _shadowOffset;

}, "void");

var the_class = objc_allocateClassPair(NSControl, "NSSlider");
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
class_addIvar(the_class, "_value", "id");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, aFrame) {
objc_msgSendSuper({super_class:NSControl, receiver:self}, "initWithFrame:", aFrame);
if (self)
{

}

return self;

}, "void");

var the_class = objc_allocateClassPair(NSCell, "NSSliderCell");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_value", "id");
class_addIvar(the_class, "_state", "NSCellStateValue");
class_addIvar(the_class, "_isHighlighted", "BOOL");
class_addIvar(the_class, "_isEnabled", "BOOL");
class_addIvar(the_class, "_isEditable", "BOOL");
class_addIvar(the_class, "_isBordered", "BOOL");
class_addIvar(the_class, "_isBezeled", "BOOL");
class_addIvar(the_class, "_isSelectable", "BOOL");
class_addIvar(the_class, "_isScrollable", "BOOL");
class_addIvar(the_class, "_alignment", "NSUInteger");
class_addIvar(the_class, "_controlSize", "NSSize");
class_addIvar(the_class, "_controlView", "NSView");
class_addIvar(the_class, "_target", "id");
class_addIvar(the_class, "_action", "SEL");

var the_class = objc_allocateClassPair(NSObject, "NSStatusBar");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

var the_class = objc_allocateClassPair(NSObject, "NSTableColumn");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_identifier", "NSString");
class_addIvar(the_class, "_tableView", "NSTableView");
class_addIvar(the_class, "_width", "NSUInteger");
class_addIvar(the_class, "_minWidth", "NSUInteger");
class_addIvar(the_class, "_maxWidth", "NSUInteger");
class_addIvar(the_class, "_headerCell", "NSCell");
class_addIvar(the_class, "_dataCell", "NSCell");
class_addIvar(the_class, "_editable", "BOOL");
class_addIvar(the_class, "_hidden", "BOOL");

class_addMethod(the_class, "initWithIdentifier:", function(self, _cmd, identifier) {
objc_msgSend(self, "init");
if (self)
{
objc_msgSend(self, "setIdentifier:", identifier);
_headerCell = objc_msgSend(objc_msgSend(NSTableHeaderCell, "alloc"), "init");
_dataCell = objc_msgSend(objc_msgSend(NSTextFieldCell, "alloc"), "init");
objc_msgSend(_dataCell, "setEditable:", YES);
objc_msgSend(_dataCell, "setSelectable:", YES);

}

return self;

}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSObject, receiver:self}, "initWithCoder:", aCoder);
_identifier = objc_msgSend(aCoder, "decodeStringForKey:", "NSIdentifier");
_headerCell = objc_msgSend(aCoder, "decodeObjectForKey:", "NSHeaderCell");
_dataCell = objc_msgSend(aCoder, "decodeObjectForKey:", "NSDataCell");
_width = objc_msgSend(aCoder, "decodeIntForKey:", "NSWidth");
_minWidth = objc_msgSend(aCoder, "decodeIntForKey:", "NSMinWidth");
_maxWidth = objc_msgSend(aCoder, "decodeIntForKey:", "NSMaxWidth");
NSLog(_width);
return self;

}, "void");

class_addMethod(the_class, "setTableView:", function(self, _cmd, aTableView) {
_tableView = aTableView;

}, "void");

class_addMethod(the_class, "tableView", function(self, _cmd) {
return _tableView;

}, "void");

class_addMethod(the_class, "setWidth:", function(self, _cmd, newWidth) {
_width = newWidth;

}, "void");

class_addMethod(the_class, "width", function(self, _cmd) {
return _width;

}, "void");

class_addMethod(the_class, "setHeaderCell:", function(self, _cmd, aCell) {
_headerCell = aCell;

}, "void");

class_addMethod(the_class, "headerCell", function(self, _cmd) {
return _headerCell;

}, "void");

class_addMethod(the_class, "setDataCell:", function(self, _cmd, aCell) {
_dataCell = aCell;

}, "void");

class_addMethod(the_class, "dataCell", function(self, _cmd) {
return _dataCell;

}, "void");

class_addMethod(the_class, "dataCellForRow:", function(self, _cmd, row) {
return _dataCell;

}, "void");

class_addMethod(the_class, "setIdentifier:", function(self, _cmd, anObject) {
_identifier = anObject;

}, "void");

class_addMethod(the_class, "identifier", function(self, _cmd) {
return _identifier;

}, "void");

class_addMethod(the_class, "setEditable:", function(self, _cmd, flag) {
if (flag == 0)
flag = NO;

_editable = flag;

}, "void");

class_addMethod(the_class, "isEditable", function(self, _cmd) {
return _editable;

}, "void");

class_addMethod(the_class, "isHidden", function(self, _cmd) {
return _hidden;

}, "void");

class_addMethod(the_class, "setHidden:", function(self, _cmd, hidden) {
_hidden = hidden;

}, "void");

var the_class = objc_allocateClassPair(NSCell, "NSTextFieldCell");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_value", "id");
class_addIvar(the_class, "_state", "NSCellStateValue");
class_addIvar(the_class, "_isHighlighted", "BOOL");
class_addIvar(the_class, "_isEnabled", "BOOL");
class_addIvar(the_class, "_isEditable", "BOOL");
class_addIvar(the_class, "_isBordered", "BOOL");
class_addIvar(the_class, "_isBezeled", "BOOL");
class_addIvar(the_class, "_isSelectable", "BOOL");
class_addIvar(the_class, "_isScrollable", "BOOL");
class_addIvar(the_class, "_alignment", "NSUInteger");
class_addIvar(the_class, "_controlSize", "NSSize");
class_addIvar(the_class, "_controlView", "NSView");
class_addIvar(the_class, "_target", "id");
class_addIvar(the_class, "_action", "SEL");
class_addIvar(the_class, "_placeholderString", "NSString");
class_addIvar(the_class, "_drawsBackground", "BOOL");
class_addIvar(the_class, "_bezeled", "BOOL");
class_addIvar(the_class, "_bezelStyle", "NSUInteger");
class_addIvar(the_class, "_gBorderType", "NSUInteger");
class_addIvar(the_class, "_textColor", "NSColor");

class_addMethod(the_class, "init", function(self, _cmd) {
objc_msgSendSuper({super_class:NSCell, receiver:self}, "init");
if (self)
{
_textColor = objc_msgSend(NSColor, "controlTextColor");

}

return self;

}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSCell, receiver:self}, "initWithCoder:", aCoder);
_value = objc_msgSend(aCoder, "decodeStringForKey:", "NSContents");
if (Unhandled output_expression: [,(), ! (!), _value (IDENTIFIER)])
_value = " ";

_drawsBackground = objc_msgSend(aCoder, "decodeBoolForKey:", "NSDrawsBackground");
return self;

}, "void");

class_addMethod(the_class, "setGBorderType:", function(self, _cmd, type) {
_gBorderType = type;

}, "void");

class_addMethod(the_class, "drawInteriorWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
var *;
if (_value == "")
{
textToDraw = _placeholderString;

}
else
{
textToDraw = _value;

}

if (textToDraw)
{
objc_msgSend(_textColor, "set");
objc_msgSend(objc_msgSend(NSFont, "systemFontOfSize:", objc_msgSend(NSFont, "systemFontSize")), "set");
var titleRect = objc_msgSend(self, "titleRectForBounds:", cellFrame);
titleRect.origin.y = Unhandled output_expression: [+(), [((), [/(), [((), [-(), [.(.), [.(.), titleRect (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 10 (CONSTANT)], ], 2 (CONSTANT)], ], [.(.), [.(.), titleRect (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)]];
titleRect.origin.x = Unhandled output_expression: [+(), [.(.), [.(.), titleRect (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 2 (CONSTANT)];
objc_msgSend(textToDraw, "drawWithRect:options:attributes:", titleRect, nil, nil);

}


}, "void");

class_addMethod(the_class, "drawWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
objc_msgSend(NSGraphicsContext, "saveGraphicsState");
_controlView = controlView;
if (_isBezeled)
{
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.439, 0.439, 0.439, 1.0), "set");
var topOuterBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(topOuterBorder, "setLineWidth:", 1);
objc_msgSend(topOuterBorder, "moveToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 3.5 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 3.5 (CONSTANT)]));
objc_msgSend(topOuterBorder, "lineToPoint:", NSMakePoint(Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 3.5 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 3.5 (CONSTANT)]));
objc_msgSend(topOuterBorder, "stroke");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.851, 0.851, 0.851, 1.0), "set");
var topInnerBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(topInnerBorder, "setLineWidth:", 1);
objc_msgSend(topInnerBorder, "moveToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 3.5 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 4.5 (CONSTANT)]));
objc_msgSend(topInnerBorder, "lineToPoint:", NSMakePoint(Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 3.5 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 4.5 (CONSTANT)]));
objc_msgSend(topInnerBorder, "stroke");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.808, 0.808, 0.808, 1.0), "set");
var bottomOuterBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(bottomOuterBorder, "setLineWidth:", 1);
objc_msgSend(bottomOuterBorder, "moveToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 3.5 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 3.5 (CONSTANT)]));
objc_msgSend(bottomOuterBorder, "lineToPoint:", NSMakePoint(Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 3.5 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 3.5 (CONSTANT)]));
objc_msgSend(bottomOuterBorder, "stroke");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.671, 0.671, 0.671, 1.0), "set");
var sideBorders = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(sideBorders, "setLineWidth:", 1);
objc_msgSend(sideBorders, "moveToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 3.5 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 3.5 (CONSTANT)]));
objc_msgSend(sideBorders, "lineToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 3.5 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 3.5 (CONSTANT)]));
objc_msgSend(sideBorders, "moveToPoint:", NSMakePoint(Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 3.5 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 3.5 (CONSTANT)]));
objc_msgSend(sideBorders, "lineToPoint:", NSMakePoint(Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 3.5 (CONSTANT)]Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 3.5 (CONSTANT)]));
objc_msgSend(sideBorders, "stroke");

}

if (objc_msgSend(self, "drawsBackground"))
{
objc_msgSend(NSGraphicsContext, "saveGraphicsState");
if (objc_msgSend(self, "isHighlighted"))
{
var highlightShadow = objc_msgSend(objc_msgSend(NSShadow, "alloc"), "init");
objc_msgSend(highlightShadow, "setShadowColor:", objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.239, 0.502, 0.875, 1.0));
objc_msgSend(highlightShadow, "setShadowBlurRadius:", 6);
objc_msgSend(highlightShadow, "setShadowOffset:", NSMakeSize(00));
objc_msgSend(highlightShadow, "set");

}

objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 1.0), "set");
objc_msgSend(NSBezierPath, "fillRect:", NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 4 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 4 (CONSTANT)]Unhandled output_expression: [-(), [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], 8 (CONSTANT)]Unhandled output_expression: [-(), [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 9 (CONSTANT)]));
;
objc_msgSend(NSGraphicsContext, "restoreGraphicsState");

}

objc_msgSend(NSGraphicsContext, "restoreGraphicsState");
objc_msgSend(self, "drawInteriorWithFrame:inView:", cellFrame, controlView);

}, "void");

class_addMethod(the_class, "drawsBackground", function(self, _cmd) {
return _drawsBackground;

}, "void");

class_addMethod(the_class, "setDrawsBackground:", function(self, _cmd, flag) {
_drawsBackground = flag;
if (_drawsBackground == 0)
_drawsBackground = NO;


}, "void");

class_addMethod(the_class, "setBezeled:", function(self, _cmd, flag) {
_bezeled = flag;

}, "void");

class_addMethod(the_class, "isBezeled", function(self, _cmd) {
return _bezeled;

}, "void");

class_addMethod(the_class, "setBezelStyle:", function(self, _cmd, style) {
_bezelStyle = style;

}, "void");

class_addMethod(the_class, "bezelStyle", function(self, _cmd) {
return _bezelStyle;

}, "void");

class_addMethod(the_class, "setTextColor:", function(self, _cmd, aColor) {
_textColor = aColor;

}, "void");

class_addMethod(the_class, "textColor", function(self, _cmd) {
return _textColor;

}, "void");

class_addMethod(the_class, "titleRectForBounds:", function(self, _cmd, theRect) {
if (_isEditable)
{
var titleRect = NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), theRect (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 4 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), theRect (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 4 (CONSTANT)]Unhandled output_expression: [-(), [.(.), [.(.), theRect (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], 8 (CONSTANT)]Unhandled output_expression: [-(), [.(.), [.(.), theRect (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 9 (CONSTANT)]);
return titleRect;

}

return theRect;

}, "void");

var the_class = objc_allocateClassPair(NSTextFieldCell, "NSTableHeaderCell");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_value", "id");
class_addIvar(the_class, "_state", "NSCellStateValue");
class_addIvar(the_class, "_isHighlighted", "BOOL");
class_addIvar(the_class, "_isEnabled", "BOOL");
class_addIvar(the_class, "_isEditable", "BOOL");
class_addIvar(the_class, "_isBordered", "BOOL");
class_addIvar(the_class, "_isBezeled", "BOOL");
class_addIvar(the_class, "_isSelectable", "BOOL");
class_addIvar(the_class, "_isScrollable", "BOOL");
class_addIvar(the_class, "_alignment", "NSUInteger");
class_addIvar(the_class, "_controlSize", "NSSize");
class_addIvar(the_class, "_controlView", "NSView");
class_addIvar(the_class, "_target", "id");
class_addIvar(the_class, "_action", "SEL");
class_addIvar(the_class, "_placeholderString", "NSString");
class_addIvar(the_class, "_drawsBackground", "BOOL");
class_addIvar(the_class, "_bezeled", "BOOL");
class_addIvar(the_class, "_bezelStyle", "NSUInteger");
class_addIvar(the_class, "_gBorderType", "NSUInteger");
class_addIvar(the_class, "_textColor", "NSColor");
class_addIvar(the_class, "_value", "id");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSTextFieldCell, receiver:self}, "initWithCoder:", aCoder);
_value = objc_msgSend(aCoder, "decodeStringForKey:", "NSContents");
return self;

}, "void");

class_addMethod(the_class, "drawInteriorWithFrame:inView:", function(self, _cmd, cellFrame, controlView) {
var borderBottom = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.702, 0.702, 0.702, 1.0), "set");
objc_msgSend(borderBottom, "setLineWidth:", 1.0);
objc_msgSend(borderBottom, "moveToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 0.5 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 0.5 (CONSTANT)]));
objc_msgSend(borderBottom, "lineToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 0.5 (CONSTANT)]));
objc_msgSend(borderBottom, "stroke");
var borderRight = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.702, 0.702, 0.702, 1.0), "set");
objc_msgSend(borderRight, "setLineWidth:", 1.0);
objc_msgSend(borderRight, "moveToPoint:", NSMakePoint(Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 0.5 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 1.5 (CONSTANT)]));
objc_msgSend(borderRight, "lineToPoint:", NSMakePoint(Unhandled output_expression: [-(), [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]], 0.5 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), cellFrame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]]));
objc_msgSend(borderRight, "stroke");
objc_msgSend(NSGraphicsContext, "saveGraphicsState");
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.325, 0.325, 0.325, 1.0), "set");
objc_msgSend(objc_msgSend(NSFont, "systemFontOfSize:", objc_msgSend(NSFont, "smallSystemFontSize")), "set");
var titleShadow = objc_msgSend(objc_msgSend(NSShadow, "alloc"), "init");
objc_msgSend(titleShadow, "setShadowOffset:", NSMakeSize(11));
objc_msgSend(titleShadow, "setShadowBlurRadius:", 1);
objc_msgSend(titleShadow, "setShadowColor:", objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 0.5));
objc_msgSend(titleShadow, "set");
objc_msgSend(_value, "drawWithRect:options:attributes:", NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 4 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), cellFrame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 4 (CONSTANT)]cellFrame.size.width0), nil, nil);
objc_msgSend(NSGraphicsContext, "restoreGraphicsState");

}, "void");

class_addMethod(the_class, "highlight:withFrame:inView:", function(self, _cmd, flag, cellFrame, controlView) {

}, "void");

var the_class = objc_allocateClassPair(NSView, "NSTableHeaderView");
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
class_addIvar(the_class, "_tableView", "NSTableView");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithCoder:", aCoder);
return self;

}, "void");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithFrame:", frameRect);
if (self)
{

}

return self;

}, "void");

class_addMethod(the_class, "setTableView:", function(self, _cmd, aTableView) {
_tableView = aTableView;
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "tableView", function(self, _cmd) {
return _tableView;

}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, rect) {
var gradientTop = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 1.0);
var gradientBottom = objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.902, 0.902, 0.902, 1.0);
var backgroundGradient = objc_msgSend(objc_msgSend(NSGradient, "alloc"), "initWithStartingColor:endingColor:", gradientTop, gradientBottom);
objc_msgSend(backgroundGradient, "drawInRect:angle:", NSMakeRect(rect.origin.xrect.origin.yrect.size.widthrect.size.height), 0);
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.851, 0.851, 0.851, 1), "set");
var topBorder = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(topBorder, "moveToPoint:", NSMakePoint(rect.origin.xUnhandled output_expression: [-(), [+(), [.(.), [.(.), rect (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), rect (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 0.5 (CONSTANT)]));
objc_msgSend(topBorder, "lineToPoint:", NSMakePoint(Unhandled output_expression: [+(), [.(.), [.(.), rect (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), [.(.), rect (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)]]Unhandled output_expression: [-(), [+(), [.(.), [.(.), rect (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), rect (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]], 0.5 (CONSTANT)]));
objc_msgSend(topBorder, "stroke");
if (_tableView)
{
var tableColumns = objc_msgSend(_tableView, "tableColumns");
var count = objc_msgSend(tableColumns, "count");
var spacing = objc_msgSend(_tableView, "intercellSpacing");
var columnRect = NSMakeRect(_bounds.origin.x_bounds.origin.y_bounds.size.width_bounds.size.height);
FOR (FOR)
}


}, "void");

class_addMethod(the_class, "headerRectOfColumn:", function(self, _cmd, columnIndex) {

}, "void");

var the_class = objc_allocateClassPair(NSView, "NSText");
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
class_addIvar(the_class, "_string", "NSString");
class_addIvar(the_class, "_backgroundColor", "NSColor");
class_addIvar(the_class, "_drawsBackground", "BOOL");
class_addIvar(the_class, "_isEditable", "BOOL");
class_addIvar(the_class, "_isSelectable", "BOOL");
class_addIvar(the_class, "_isFieldEditor", "BOOL");
class_addIvar(the_class, "_isRichText", "BOOL");
class_addIvar(the_class, "_importsGraphics", "BOOL");
class_addIvar(the_class, "_usesFontPanel", "BOOL");
class_addIvar(the_class, "_selectedRange", "NSRange");
class_addIvar(the_class, "_font", "NSFont");
class_addIvar(the_class, "_textAlignment", "NSTextAlignment");
class_addIvar(the_class, "_textColor", "NSColor");
class_addIvar(the_class, "_maxSize", "NSSize");
class_addIvar(the_class, "_minSize", "NSSize");
class_addIvar(the_class, "_delegate", "id");
class_addIvar(the_class, "_gCanvas", "CGContextRef");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, anObject) {
_delegate = anObject;

}, "void");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, aFrame) {
objc_msgSend(self, "init");
_frame = aFrame;
_bounds = NSMakeRect(00_frame.size.width_frame.size.height);
_gCanvas = NSWindowServerCreateCanvas(self);
_subviews = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
return self;

}, "void");

var the_class = objc_allocateClassPair(NSControl, "NSTextField");
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
class_addIvar(the_class, "_value", "id");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSControl, receiver:self}, "initWithCoder:", aCoder);
if (objc_msgSend(self, "isEditable"))
{
_frame.origin.x = Unhandled output_expression: [-(), [.(.), [.(.), _frame (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 3 (CONSTANT)];
_frame.origin.y = Unhandled output_expression: [-(), [.(.), [.(.), _frame (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 3 (CONSTANT)];
_frame.size.width = Unhandled output_expression: [+(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], 6 (CONSTANT)];
_frame.size.height = Unhandled output_expression: [+(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 6 (CONSTANT)];
objc_msgSend(self, "setFrame:", _frame);

}

return self;

}, "void");

class_addMethod(the_class, "observeValueForKeyPath:ofObject:change:context:", function(self, _cmd, keyPath, object, change, context) {
if (context == "value")
{
objc_msgSend(_cell, "setValue:", objc_msgSend(object, "valueForKeyPath:", keyPath));
objc_msgSend(self, "setNeedsDisplay:", YES);

}
else
if (context == "hidden")
{
objc_msgSend(_cell, "setHidden:", objc_msgSend(object, "valueForKey:", keyPath));
objc_msgSend(self, "setNeedsDisplay:", YES);

}
else
if (context == "enabled")
{
objc_msgSend(_cell, "setEnabled:", objc_msgSend(object, "valueForKey:", keyPath));
objc_msgSend(self, "setNeedsDisplay:", YES);

}
else
if (context == "editable")
{
objc_msgSend(_cell, "setEditable:", objc_msgSend(object, "valueForKey:", keyPath));
objc_msgSend(self, "setNeedsDisplay:", YES);

}
else
{
objc_msgSendSuper({super_class:NSControl, receiver:self}, "observeValueForKeyPath:ofObject:change:context:", keyPath, object, change, context);

}





}, "void");

class_addMethod(the_class, "becomeFirstResponder", function(self, _cmd) {
objc_msgSend(self, "selectText:", nil);
return YES;

}, "void");

class_addMethod(the_class, "acceptsFirstResponder", function(self, _cmd) {
return YES;

}, "void");

class_addMethod(the_class, "selectText:", function(self, _cmd, sender) {
NSLog("oh yeah");
if (Unhandled output_expression: [,(), ! (!), [M(), _cell (IDENTIFIER), isEnabled (IDENTIFIER)]])
return ;

if (Unhandled output_expression: [OR_OP(), [M(), _cell (IDENTIFIER), isSelectable (IDENTIFIER)], [M(), _cell (IDENTIFIER), isEditable (IDENTIFIER)]])
{
if (Unhandled output_expression: [,(), ! (!), _currentEditor (IDENTIFIER)])
{
_currentEditor = objc_msgSend(objc_msgSend(self, "window"), "fieldEditor:forObject:", YES, self);
_currentEditor = objc_msgSend(_cell, "setUpFieldEditorAttributes:", _currentEditor);

}

objc_msgSend(_cell, "selectWithFrame:inView:editor:delegate:start:length:", _bounds, self, _currentEditor, self, 0, 0);

}


}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
NSLog("hmm");
if (Unhandled output_expression: [,(), ! (!), [M(), _cell (IDENTIFIER), isEnabled (IDENTIFIER)]])
return ;

if (Unhandled output_expression: [OR_OP(), [M(), _cell (IDENTIFIER), isSelectable (IDENTIFIER)], [M(), _cell (IDENTIFIER), isEditable (IDENTIFIER)]])
{
if (Unhandled output_expression: [,(), ! (!), _currentEditor (IDENTIFIER)])
{
NSLog("first one");
_currentEditor = objc_msgSend(objc_msgSend(self, "window"), "fieldEditor:forObject:", YES, self);
NSLog("second one");
_currentEditor = objc_msgSend(_cell, "setUpFieldEditorAttributes:", _currentEditor);

}

objc_msgSend(_cell, "setHighlighted:", YES);
objc_msgSend(_cell, "editWithFrame:inView:editor:delegate:event:", _bounds, self, _currentEditor, self, theEvent);

}


}, "void");

class_addMethod(the_class, "mouseUp:", function(self, _cmd, theEvent) {
objc_msgSend(_cell, "setHighlighted:", NO);
objc_msgSend(self, "setNeedsDisplay:", YES);
if (Unhandled output_expression: [AND_OP(), [M(), _cell (IDENTIFIER), action (IDENTIFIER)], [M(), _cell (IDENTIFIER), target (IDENTIFIER)]])
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "sendAction:to:from:", objc_msgSend(_cell, "action"), objc_msgSend(_cell, "target"), self);


}, "void");

class_addMethod(the_class, "drawsBackground", function(self, _cmd) {
if (_cell)
return objc_msgSend(_cell, "drawsBackground");


}, "void");

class_addMethod(the_class, "setDrawsBackground:", function(self, _cmd, flag) {
if (_cell)
objc_msgSend(_cell, "setDrawsBackground:", flag);

objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "setBezeled:", function(self, _cmd, flag) {
objc_msgSend(_cell, "setBezeled:", flag);
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "isBezeled", function(self, _cmd) {
return objc_msgSend(_cell, "isBezeled");

}, "void");

class_addMethod(the_class, "setBezelStyle:", function(self, _cmd, style) {
objc_msgSend(_cell, "setBezelStyle:", style);
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "bezelStyle", function(self, _cmd) {
return objc_msgSend(_cell, "bezelStyle");

}, "void");

class_addMethod(the_class, "textDidEndEditing:", function(self, _cmd, aNotification) {
NSLog("first");
objc_msgSendSuper({super_class:NSControl, receiver:self}, "textDidEndEditing:", aNotification);
NSLog("second");
_currentEditor = nil;
NSLog("third");
objc_msgSend(self, "lockFocus");
NSLog("fourth");
objc_msgSend(_cell, "highlight:withFrame:inView:", NO, _bounds, self);
NSLog("fifth");
objc_msgSend(self, "unlockFocus");

}, "void");

var the_class = objc_allocateClassPair(NSText, "NSTextView");
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
class_addIvar(the_class, "_string", "NSString");
class_addIvar(the_class, "_backgroundColor", "NSColor");
class_addIvar(the_class, "_drawsBackground", "BOOL");
class_addIvar(the_class, "_isEditable", "BOOL");
class_addIvar(the_class, "_isSelectable", "BOOL");
class_addIvar(the_class, "_isFieldEditor", "BOOL");
class_addIvar(the_class, "_isRichText", "BOOL");
class_addIvar(the_class, "_importsGraphics", "BOOL");
class_addIvar(the_class, "_usesFontPanel", "BOOL");
class_addIvar(the_class, "_selectedRange", "NSRange");
class_addIvar(the_class, "_font", "NSFont");
class_addIvar(the_class, "_textAlignment", "NSTextAlignment");
class_addIvar(the_class, "_textColor", "NSColor");
class_addIvar(the_class, "_maxSize", "NSSize");
class_addIvar(the_class, "_minSize", "NSSize");
class_addIvar(the_class, "_delegate", "id");
class_addIvar(the_class, "_gCanvas", "CGContextRef");

class_addMethod(the_class, "init", function(self, _cmd) {
objc_msgSendSuper({super_class:NSText, receiver:self}, "init");
_selectedRange = NSMakeRange(00);

}, "void");

class_addMethod(the_class, "insertText:", function(self, _cmd, aString) {
objc_msgSend(self, "replaceCharactersInRange:withString:", objc_msgSend(self, "selectedRange"), aString);
objc_msgSend(self, "setSelectedRange:", NSMakeRange(Unhandled output_expression: [+(), [.(.), _selectedRange (IDENTIFIER), location (IDENTIFIER)], 1 (CONSTANT)]0));

}, "void");

class_addMethod(the_class, "deleteBackward:", function(self, _cmd, sender) {
objc_msgSend(self, "replaceCharactersInRange:withString:", NSMakeRange(Unhandled output_expression: [-(), [.(.), [M(), self (IDENTIFIER), selectedRange (IDENTIFIER)], location (IDENTIFIER)], 1 (CONSTANT)]1), "");
objc_msgSend(self, "setSelectedRange:", NSMakeRange(Unhandled output_expression: [-(), [.(.), _selectedRange (IDENTIFIER), location (IDENTIFIER)], 1 (CONSTANT)]0));
objc_msgSend(self, "postTextDidChangeNotification");
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "moveLeft:", function(self, _cmd, sender) {
if (_selectedRange.location == 0)
return ;

objc_msgSend(self, "setSelectedRange:", NSMakeRange(Unhandled output_expression: [-(), [.(.), _selectedRange (IDENTIFIER), location (IDENTIFIER)], 1 (CONSTANT)]0));

}, "void");

class_addMethod(the_class, "moveRight:", function(self, _cmd, sender) {
if (_selectedRange.location == _string.length)
return ;

objc_msgSend(self, "setSelectedRange:", NSMakeRange(Unhandled output_expression: [+(), [+(), [.(.), _selectedRange (IDENTIFIER), location (IDENTIFIER)], [.(.), _selectedRange (IDENTIFIER), length (IDENTIFIER)]], 1 (CONSTANT)]0));

}, "void");

class_addMethod(the_class, "scrollPageDown:", function(self, _cmd, sender) {
objc_msgSend(self, "setSelectedRange:", NSMakeRange(_string.length0));

}, "void");

class_addMethod(the_class, "scrollPageUp:", function(self, _cmd, sender) {
objc_msgSend(self, "setSelectedRange:", NSMakeRange(00));

}, "void");

class_addMethod(the_class, "insertTab:", function(self, _cmd, sender) {
objc_msgSend(objc_msgSend(self, "window"), "makeFirstResponder:", objc_msgSend(self, "window"));

}, "void");

class_addMethod(the_class, "keyDown:", function(self, _cmd, theEvent) {
objc_msgSend(self, "interpretKeyEvents:", objc_msgSend(NSArray, "arrayWithObject:", theEvent));

}, "void");

class_addMethod(the_class, "resignFirstResponder", function(self, _cmd) {
if (_isEditable)
{
if (objc_msgSend(_delegate, "respondsToSelector:", "selector:"))
{
if (objc_msgSend(_delegate, "textShouldEndEditing:", self) == NO)
return NO;


}


}

return YES;

}, "void");

class_addMethod(the_class, "acceptsFirstResponder", function(self, _cmd) {
return YES;

}, "void");

class_addMethod(the_class, "glyphIndexForPoint:", function(self, _cmd, point) {
objc_msgSend(self, "lockFocus");
FOR (FOR)objc_msgSend(self, "unlockFocus");
return _string.length;

}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
var location = objc_msgSend(self, "convertPoint:fromView:", objc_msgSend(theEvent, "locationInWindow"), nil);
var theRange = NSMakeRange(objc_msgSend(self, "glyphIndexForPoint:", location)0);
objc_msgSend(self, "setSelectedRange:", theRange);

}, "void");

class_addMethod(the_class, "mouseUp:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, rect) {
if (_drawsBackground)
{
rect = NSMakeRect(Unhandled output_expression: [+(), [.(.), [.(.), rect (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], 3 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), rect (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 3 (CONSTANT)]Unhandled output_expression: [-(), [.(.), [.(.), rect (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], 6 (CONSTANT)]Unhandled output_expression: [-(), [.(.), [.(.), rect (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 6 (CONSTANT)]);
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 1, 1, 1, 1), "set");
objc_msgSend(NSBezierPath, "fillRect:", rect);

}

objc_msgSend(objc_msgSend(NSColor, "textColor"), "set");
objc_msgSend(objc_msgSend(NSFont, "systemFontOfSize:", objc_msgSend(NSFont, "systemFontSize")), "set");
var textRect = NSMakeRect(rect.origin.xUnhandled output_expression: [+(), [.(.), [.(.), rect (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 1 (CONSTANT)]00);
objc_msgSend(_string, "drawWithRect:options:attributes:", textRect, nil, nil);
var fullStringWidth = objc_msgSend(_string, "sizeWithAttributes:", nil);
if (_selectedRange.length == 0)
{
var stringBeforeLocation = .(0_selectedRange.location);
var stringBeforeWidth = objc_msgSend(stringBeforeLocation, "sizeWithAttributes:", nil);
objc_msgSend(objc_msgSend(NSColor, "textColor"), "set");
var blinkingCursor = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(blinkingCursor, "moveToPoint:", NSMakePoint(Unhandled output_expression: [+(), [+(), [.(.), [.(.), rect (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), stringBeforeWidth (IDENTIFIER), width (IDENTIFIER)]], 0.5 (CONSTANT)]Unhandled output_expression: [-(), [.(.), [.(.), rect (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], 1 (CONSTANT)]));
objc_msgSend(blinkingCursor, "lineToPoint:", NSMakePoint(Unhandled output_expression: [+(), [+(), [.(.), [.(.), rect (IDENTIFIER), origin (IDENTIFIER)], x (IDENTIFIER)], [.(.), stringBeforeWidth (IDENTIFIER), width (IDENTIFIER)]], 0.5 (CONSTANT)]Unhandled output_expression: [+(), [.(.), [.(.), rect (IDENTIFIER), origin (IDENTIFIER)], y (IDENTIFIER)], [.(.), [.(.), rect (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)]]));
objc_msgSend(blinkingCursor, "stroke");

}


}, "void");

class_addMethod(the_class, "string", function(self, _cmd) {
return _string;

}, "void");

class_addMethod(the_class, "setBackgroundColor:", function(self, _cmd, aColor) {
_backgroundColor = aColor;

}, "void");

class_addMethod(the_class, "backgroundColor", function(self, _cmd) {
return _backgroundColor;

}, "void");

class_addMethod(the_class, "setDrawsBackground:", function(self, _cmd, flag) {
_drawsBackground = flag;

}, "void");

class_addMethod(the_class, "drawsBackground", function(self, _cmd) {
return _drawsBackground;

}, "void");

class_addMethod(the_class, "setEditable:", function(self, _cmd, flag) {
_isEditable = flag;

}, "void");

class_addMethod(the_class, "isEditable", function(self, _cmd) {
return _isEditable;

}, "void");

class_addMethod(the_class, "setSelectable:", function(self, _cmd, flag) {
_isSelectable = flag;

}, "void");

class_addMethod(the_class, "isSelectable", function(self, _cmd) {
return _isSelectable;

}, "void");

class_addMethod(the_class, "setFieldEditor:", function(self, _cmd, flag) {
_isFieldEditor = flag;

}, "void");

class_addMethod(the_class, "isFieldEditor", function(self, _cmd) {
return _isFieldEditor;

}, "void");

class_addMethod(the_class, "setRichText:", function(self, _cmd, flag) {
_isRichText = flag;

}, "void");

class_addMethod(the_class, "isRichText", function(self, _cmd) {
return _isRichText;

}, "void");

class_addMethod(the_class, "setImportsGraphics:", function(self, _cmd, flag) {
_importsGraphics = flag;

}, "void");

class_addMethod(the_class, "importsGraphics", function(self, _cmd) {
return _importsGraphics;

}, "void");

class_addMethod(the_class, "setUsesFontPanel:", function(self, _cmd, flag) {
_usesFontPanel = flag;

}, "void");

class_addMethod(the_class, "usesFontPanel", function(self, _cmd) {
return _usesFontPanel;

}, "void");

class_addMethod(the_class, "toggleRuler:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "isRulerVisible", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setSelectedRange:", function(self, _cmd, aRange) {
_selectedRange = aRange;
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "selectedRange", function(self, _cmd) {
return _selectedRange;

}, "void");

class_addMethod(the_class, "replaceCharactersInRange:withRTF:", function(self, _cmd, aRange, rtfData) {

}, "void");

class_addMethod(the_class, "replaceCharactersInRange:withRTFD:", function(self, _cmd, aRange, rtfdData) {

}, "void");

class_addMethod(the_class, "replaceCharactersInRange:withString:", function(self, _cmd, aRange, aString) {
_string = Unhandled output_expression: [+(), [+(), [f(), [.(.), _string (IDENTIFIER), substr (IDENTIFIER)], [,(), 0 (CONSTANT), [.(.), aRange (IDENTIFIER), location (IDENTIFIER)]]], aString (IDENTIFIER)], [f(), [.(.), _string (IDENTIFIER), substr (IDENTIFIER)], [,(), [+(), [.(.), aRange (IDENTIFIER), location (IDENTIFIER)], [.(.), aRange (IDENTIFIER), length (IDENTIFIER)]], [.(.), _string (IDENTIFIER), length (IDENTIFIER)]]]];
objc_msgSend(self, "postTextDidChangeNotification");
objc_msgSend(self, "setNeedsDisplay:", YES);

}, "void");

class_addMethod(the_class, "setString:", function(self, _cmd, aString) {
_string = aString;

}, "void");

class_addMethod(the_class, "selectAll:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "copy:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "cut:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "paste:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "copyFont:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "pasteFont:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "copyRuler:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "pasteRuler:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "changeFont:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "setFont:", function(self, _cmd, aFont) {
_font = aFont;

}, "void");

class_addMethod(the_class, "setFont:range:", function(self, _cmd, aFont, aRange) {

}, "void");

class_addMethod(the_class, "font", function(self, _cmd) {
return _font;

}, "void");

class_addMethod(the_class, "setAlignment:", function(self, _cmd, mode) {
_textAlignment = mode;

}, "void");

class_addMethod(the_class, "alignCenter:", function(self, _cmd, sender) {
objc_msgSend(self, "setAlignment:", 2);

}, "void");

class_addMethod(the_class, "alignLeft:", function(self, _cmd, sender) {
objc_msgSend(self, "setAlignment:", 0);

}, "void");

class_addMethod(the_class, "alignRight:", function(self, _cmd, sender) {
objc_msgSend(self, "setAlignment:", 1);

}, "void");

class_addMethod(the_class, "alignment", function(self, _cmd) {
return _textAlignment;

}, "void");

class_addMethod(the_class, "setTextColor:", function(self, _cmd, aColor) {
_textColor = aColor;

}, "void");

class_addMethod(the_class, "setTextColor:range:", function(self, _cmd, aColor, aRange) {

}, "void");

class_addMethod(the_class, "textColor", function(self, _cmd) {
return _textColor;

}, "void");

class_addMethod(the_class, "baseWritingDirection", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setBaseWritingDirection:", function(self, _cmd, writingDirection) {

}, "void");

class_addMethod(the_class, "superscript:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "subscript:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "unscript:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "underline:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "setMaxSize:", function(self, _cmd, aSize) {
_maxSize = aSize;

}, "void");

class_addMethod(the_class, "maxSize", function(self, _cmd) {
return _maxSize;

}, "void");

class_addMethod(the_class, "setMinSize:", function(self, _cmd, aSize) {
_minSize = aSize;

}, "void");

class_addMethod(the_class, "minSize", function(self, _cmd) {
return _minSize;

}, "void");

class_addMethod(the_class, "setVerticallyResizable:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isVerticallyResizable", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setHorizontallyResizable:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "isHorizontallyResizable", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "sizeToFit", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "scrollRangeToVisible:", function(self, _cmd, aRange) {

}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "delegate", function(self, _cmd) {
return _delegate;

}, "void");

class_addMethod(the_class, "postTextDidChangeNotification", function(self, _cmd) {

}, "void");

var the_class = objc_allocateClassPair(NSObject, "NSToolbar");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_identifier", "NSString");
class_addIvar(the_class, "_displayMode", "NSToolbarDisplayMode");
class_addIvar(the_class, "_showsBaselineSeparator", "BOOL");
class_addIvar(the_class, "_visible", "BOOL");
class_addIvar(the_class, "_delegate", "id");
class_addIvar(the_class, "_toolbarView", "NSView");
class_addIvar(the_class, "_itemIdentifiers", "NSMutableArray");
class_addIvar(the_class, "_items", "NSMutableArray");
class_addIvar(the_class, "_labels", "NSMutableArray");
class_addIvar(the_class, "_height", "NSUInteger");

class_addMethod(the_class, "initWithIdentifier:", function(self, _cmd, identifier) {
objc_msgSend(self, "init");
if (self)
{
_toolbarView = objc_msgSend(objc_msgSend(NSToolbarView, "alloc"), "initWithFrame:", NSMakeRect(001010));
_identifier = identifier;
_visible = YES;
_items = objc_msgSend(objc_msgSend(NSMutableArray, "alloc"), "initWithCapacity:", 0);
_labels = objc_msgSend(objc_msgSend(NSMutableArray, "alloc"), "initWithCapacity:", 0);

}

return self;

}, "void");

class_addMethod(the_class, "height", function(self, _cmd) {
return _height;

}, "void");

class_addMethod(the_class, "reloadToolbarItems", function(self, _cmd) {
if (objc_msgSend(_delegate, "respondsToSelector:", "selector:"))
_itemIdentifiers = objc_msgSend(_delegate, "toolbarDefaultItemIdentifiers:", self);
else
_itemIdentifiers = nil;

var totalItems = objc_msgSend(_itemIdentifiers, "count");
var i;
FOR (FOR)
}, "void");

class_addMethod(the_class, "displayMode", function(self, _cmd) {
return _displayMode;

}, "void");

class_addMethod(the_class, "setDisplayMode:", function(self, _cmd, displayMode) {
_displayMode = displayMode;
_height = 56;

}, "void");

class_addMethod(the_class, "showsBaselineSeparator", function(self, _cmd) {
return _showsBaselineSeparator;

}, "void");

class_addMethod(the_class, "setShowsBaselineSeparator:", function(self, _cmd, flag) {
_showsBaselineSeparator = flag;

}, "void");

class_addMethod(the_class, "identifier", function(self, _cmd) {
return _identifier;

}, "void");

class_addMethod(the_class, "items", function(self, _cmd) {
return _items;

}, "void");

class_addMethod(the_class, "visibleItems", function(self, _cmd) {
return _items;

}, "void");

class_addMethod(the_class, "delegate", function(self, _cmd) {
return _delegate;

}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, delegate) {
_delegate = delegate;
objc_msgSend(self, "reloadToolbarItems");

}, "void");

class_addMethod(the_class, "insertItemWithItemIdentifier:atIndex:", function(self, _cmd, itemIdentifier, index) {

}, "void");

class_addMethod(the_class, "removeItemAtIndex:", function(self, _cmd, index) {

}, "void");

class_addMethod(the_class, "setSelectedItemIdentifier:", function(self, _cmd, itemIdentifier) {

}, "void");

class_addMethod(the_class, "selectedItemIdentifier", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isVisible", function(self, _cmd) {
return _visible;

}, "void");

class_addMethod(the_class, "setVisible:", function(self, _cmd, shown) {
_visible = shown;

}, "void");

class_addMethod(the_class, "toolbarView", function(self, _cmd) {
return _toolbarView;

}, "void");

var the_class = objc_allocateClassPair(NSView, "NSToolbarView");
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
class_addIvar(the_class, "name", "NSString");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithFrame:", frameRect);
if (self)
{
objc_msgSend(self, "setFrameSize:", NSMakeSize(30056));

}

return self;

}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, dirtyRect) {
var bottomPath = objc_msgSend(NSBezierPath, "bezierPath");
objc_msgSend(bottomPath, "setLineWidth:", 1);
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.322, 0.322, 0.322, 1.0), "set");
objc_msgSend(bottomPath, "moveToPoint:", NSMakePoint(0_frame.size.height));
objc_msgSend(bottomPath, "lineToPoint:", NSMakePoint(_frame.size.width_frame.size.height));
objc_msgSend(bottomPath, "stroke");

}, "void");

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

var the_class = objc_allocateClassPair(NSResponder, "NSWindowController");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_nextResponder", "id");
class_addIvar(the_class, "_window", "NSWindow");
class_addIvar(the_class, "_owner", "id");

class_addMethod(the_class, "initWithWindowNibName:", function(self, _cmd, windowNibName) {
return objc_msgSend(objc_msgSend(NSWindowController, "alloc"), "initWithWindowNibName:owner:", windowNibName, self);

}, "void");

class_addMethod(the_class, "initWithWindowNibName:owner:", function(self, _cmd, windowNibName, owner) {
objc_msgSend(self, "init");
if (self)
{
_owner = owner;
objc_msgSend(NSBundle, "loadNibNamed:owner:", windowNibName, owner);

}

return self;

}, "void");

class_addMethod(the_class, "window", function(self, _cmd) {
return _window;

}, "void");

class_addMethod(the_class, "close", function(self, _cmd) {
if (_window)
objc_msgSend(_window, "close");


}, "void");

class_addMethod(the_class, "owner", function(self, _cmd) {
return _owner;

}, "void");

