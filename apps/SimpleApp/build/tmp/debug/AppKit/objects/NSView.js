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

