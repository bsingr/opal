// 
//  NSView.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSView.h"

@class CGAffineTransform;
@class NSComparisonResult;
@class NSBitmapImageRep;
@class NSCursor;
@class CALayer;
@class CIFilter;
@class NSShadow;
@class NSTrackingArea;
@class NSScrollView;
@class NSWindow;

@implementation NSView

- (id)initWithFrame:(NSRect)frameRect
{
    self = [self init];
    if (self) {
        _frame = frameRect;
        _bounds = NSMakeRect (0, 0, _frame.size.width, _frame.size.height);
        _subviews = [NSMutableArray arrayWithCapacity:0];
        [self setFrame:frameRect];
    }
    
    return self;
}

- (id)initWithCoder:(NSCoder *)aCoder
{
    [super initWithCoder:aCoder];
    
    _frame = NSMakeRect (0,0,0,0);
    _bounds = NSMakeRect (0,0,0,0);
    
    if ([aCoder containsValueForKey:@"NSFrame"])
        _frame = [aCoder decodeRectForKey:@"NSFrame"];
    else if ([aCoder containsValueForKey:@"NSFrameSize"])
        _frame.size = [aCoder decodeSizeForKey:@"NSFrameSize"];
    
    _bounds.origin = NSMakePoint (0,0);
    _bounds.size = _frame.size;
    
    _superview = nil;
    _window = nil;
}

- (NSWindow *)window
{
    return _window;
}

- (NSView *)superview
{
    return _superview;
}

- (NSArray *)subviews
{
    return _subviews;
}

- (BOOL)isDescendantOf:(NSView *)aView
{
    // TODO: Need to implement
}

- (NSView *)ancestorSharedWithView:(NSView *)aView
{
    // TODO: Need to implement
}

- (NSView *)opaqueAncestor
{
    // TODO: Need to implement
}

- (void)setHidden:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)isHidden
{
    // TODO: Need to implement
}

- (BOOL)isHiddenOrHasHiddenAncestor
{
    // TODO: Need to implement
}

- (void)getRectsBeingDrawn:(const NSRect **)rects count:(NSInteger *)count
{
    // TODO: Need to implement
}

- (BOOL)needsToDrawRect:(NSRect)aRect
{
    // TODO: Need to implement
}

- (BOOL)wantsDefaultClipping
{
    // TODO: Need to implement
}

- (void)viewDidHide
{
    // TODO: Need to implement
}

- (void)viewDidUnhide
{
    // TODO: Need to implement
}

- (void)setSubviews:(NSArray *)newSubviews
{
    // TODO: Need to implement
}

- (void)addSubview:(NSView *)aView
{
    [aView viewWillMoveToSuperview:self];
    [aView viewWillMoveToWindow:_window];
    [aView viewDidMoveToSuperview:self];
    [aView viewDidMoveToWindow:_window];
    [self didAddSubview:aView];
    [_subviews addObject:aView];
}

- (void)addSubview:(NSView *)aView positioned:(NSWindowOrderingMode)place relativeTo:(NSView *)otherView
{
    // TODO: Need to implement
}

- (void)sortSubviewsUsingFunction:(NSComparisonResult (*)(id, id, void *))compare context:(void *)context
{
    // TODO: Need to implement
}

- (void)viewWillMoveToWindow:(NSWindow *)newWindow
{
    // TODO: Need to implement
}

- (void)viewDidMoveToWindow
{
    // TODO: Need to implement
}

- (void)viewWillMoveToSuperview:(NSView *)newSuperview
{
    // TODO: Need to implement
}

- (void)viewDidMoveToSuperview
{
    // TODO: Need to implement
}

- (void)didAddSubview:(NSView *)subview
{
    // TODO: Need to implement
}

- (void)willRemoveSubview:(NSView *)subview
{
    // TODO: Need to implement
}

- (void)removeFromSuperview
{
    // TODO: Need to implement
}

- (void)replaceSubview:(NSView *)oldView with:(NSView *)newView
{
    // TODO: Need to implement
}

- (void)removeFromSuperviewWithoutNeedingDisplay
{
    // TODO: Need to implement
}


- (void)setPostsFrameChangedNotifications:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)postsFrameChangedNotifications
{
    // TODO: Need to implement
}

- (void)resizeSubviewsWithOldSize:(NSSize)oldSize
{
    // TODO: Need to implement
}

- (void)resizeWithOldSuperviewSize:(NSSize)oldSize
{
    // TODO: Need to implement
}

- (void)setAutoresizesSubviews:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)autoresizesSubviews
{
    // TODO: Need to implement
}

- (void)setAutoresizingMask:(NSUInteger)mask
{
    // TODO: Need to implement
}

- (NSUInteger)autoresizingMask
{
    // TODO: Need to implement
}

- (void)setFrameOrigin:(NSPoint)newOrigin
{
    // TODO: Need to implement
}

- (void)setFrameSize:(NSSize)newSize
{
    // TODO: Need to implement
}

- (void)setFrame:(NSRect)frameRect
{
    // TODO: Need to implement
}

- (NSRect)frame
{
    // TODO: Need to implement
}

- (void)setFrameRotation:(CGFloat)angle
{
    // TODO: Need to implement
}

- (CGFloat)frameRotation
{
    // TODO: Need to implement
}

- (void)setFrameCenterRotation:(CGFloat)angle
{
    // TODO: Need to implement
}

- (CGFloat)frameCenterRotation
{
    // TODO: Need to implement
}


- (void)setBoundsOrigin:(NSPoint)newOrigin
{
    // TODO: Need to implement
}

- (void)setBoundsSize:(NSSize)newSize
{
    // TODO: Need to implement
}

- (void)setBoundsRotation:(CGFloat)angle
{
    // TODO: Need to implement
}

- (CGFloat)boundsRotation
{
    // TODO: Need to implement
}

- (void)translateOriginToPoint:(NSPoint)translation
{
    // TODO: Need to implement
}

- (void)scaleUnitSquareToSize:(NSSize)newUnitSize
{
    // TODO: Need to implement
}

- (void)rotateByAngle:(CGFloat)angle
{
    // TODO: Need to implement
}

- (void)setBounds:(NSRect)aRect
{
    // TODO: Need to implement
}

- (NSRect)bounds
{
    // TODO: Need to implement
}


- (BOOL)isFlipped
{
    // TODO: Need to implement
}

- (BOOL)isRotatedFromBase
{
    // TODO: Need to implement
}

- (BOOL)isRotatedOrScaledFromBase
{
    // TODO: Need to implement
}

- (BOOL)isOpaque
{
    // TODO: Need to implement
}


- (NSPoint)convertPoint:(NSPoint)aPoint fromView:(NSView *)aView
{
    // TODO: Need to implement
}

- (NSPoint)convertPoint:(NSPoint)aPoint toView:(NSView *)aView
{
    // TODO: Need to implement
}

- (NSSize)convertSize:(NSSize)aSize fromView:(NSView *)aView
{
    // TODO: Need to implement
}

- (NSSize)convertSize:(NSSize)aSize toView:(NSView *)aView
{
    // TODO: Need to implement
}

- (NSRect)convertRect:(NSRect)aRect fromView:(NSView *)aView
{
    // TODO: Need to implement
}

- (NSRect)convertRect:(NSRect)aRect toView:(NSView *)aView
{
    // TODO: Need to implement
}

- (NSRect)centerScanRect:(NSRect)aRect
{
    // TODO: Need to implement
}


- (NSPoint)convertPointToBase:(NSPoint)aPoint
{
    // TODO: Need to implement
}

- (NSPoint)convertPointFromBase:(NSPoint)aPoint
{
    // TODO: Need to implement
}

- (NSSize)convertSizeToBase:(NSSize)aSize
{
    // TODO: Need to implement
}

- (NSSize)convertSizeFromBase:(NSSize)aSize
{
    // TODO: Need to implement
}

- (NSRect)convertRectToBase:(NSRect)aRect
{
    // TODO: Need to implement
}

- (NSRect)convertRectFromBase:(NSRect)aRect
{
    // TODO: Need to implement
}


- (BOOL)canDraw
{
    // TODO: Need to implement
}

- (void)setNeedsDisplay:(BOOL)flag
{
    // TODO: Need to implement
}

- (void)setNeedsDisplayInRect:(NSRect)invalidRect
{
    // TODO: Need to implement
}

- (BOOL)needsDisplay
{
    // TODO: Need to implement
}

- (void)lockFocus
{
    // TODO: Need to implement
}

- (void)unlockFocus
{
    // TODO: Need to implement
}

- (BOOL)lockFocusIfCanDraw
{
    // TODO: Need to implement
}

- (BOOL)lockFocusIfCanDrawInContext:(NSGraphicsContext *)context
{
    // TODO: Need to implement
}


+ (NSView *)focusView
{
    // TODO: Need to implement
}

- (NSRect)visibleRect
{
    // TODO: Need to implement
}


- (void)display
{
    // TODO: Need to implement
}

- (void)displayIfNeeded
{
    // TODO: Need to implement
}

- (void)displayIfNeededIgnoringOpacity
{
    // TODO: Need to implement
}

- (void)displayRect:(NSRect)rect
{
    // TODO: Need to implement
}

- (void)displayIfNeededInRect:(NSRect)rect
{
    // TODO: Need to implement
}

- (void)displayRectIgnoringOpacity:(NSRect)rect
{
    // TODO: Need to implement
}

- (void)displayIfNeededInRectIgnoringOpacity:(NSRect)rect
{
    // TODO: Need to implement
}

- (void)drawRect:(NSRect)rect
{
    // TODO: Need to implement
}

- (void)displayRectIgnoringOpacity:(NSRect)aRect inContext:(NSGraphicsContext *)context
{
    // TODO: Need to implement
}


- (NSBitmapImageRep *)bitmapImageRepForCachingDisplayInRect:(NSRect)rect
{
    // TODO: Need to implement
}

- (void)cacheDisplayInRect:(NSRect)rect toBitmapImageRep:(NSBitmapImageRep *)bitmapImageRep
{
    // TODO: Need to implement
}


- (void)viewWillDraw
{
    
}

- (NSGraphicsContext *)graphicsContext
{
    
}

- (NSInteger)gState
{
    // TODO: Need to implement
}

- (void)allocateGState
{
    // TODO: Need to implement
}

- (void)releaseGState
{
    // TODO: Need to implement
}

- (void)setUpGState
{
    // TODO: Need to implement
}

- (void)renewGState
{
    // TODO: Need to implement
}


- (void)scrollPoint:(NSPoint)aPoint
{
    // TODO: Need to implement
}

- (BOOL)scrollRectToVisible:(NSRect)aRect
{
    // TODO: Need to implement
}

- (BOOL)autoscroll:(NSEvent *)theEvent
{
    // TODO: Need to implement
}

- (NSRect)adjustScroll:(NSRect)newVisible
{
    // TODO: Need to implement
}

- (void)scrollRect:(NSRect)aRect by:(NSSize)delta
{
    // TODO: Need to implement
}

- (void)translateRectsNeedingDisplayInRect:(NSRect)clipRect by:(NSSize)delta
{
    // TODO: Need to implement
}


- (NSView *)hitTest:(NSPoint)aPoint
{
    // TODO: Need to implement
}

- (BOOL)mouse:(NSPoint)aPoint inRect:(NSRect)aRect
{
    // TODO: Need to implement
}

- (id)viewWithTag:(NSInteger)aTag
{
    // TODO: Need to implement
}

- (NSInteger)tag
{
    // TODO: Need to implement
}

- (BOOL)performKeyEquivalent:(NSEvent *)theEvent
{
    // TODO: Need to implement
}

- (BOOL)acceptsFirstMouse:(NSEvent *)theEvent
{
    // TODO: Need to implement
}

- (BOOL)shouldDelayWindowOrderingForEvent:(NSEvent *)theEvent
{
    // TODO: Need to implement
}

- (BOOL)needsPanelToBecomeKey
{
    // TODO: Need to implement
}

- (BOOL)mouseDownCanMoveWindow
{
    // TODO: Need to implement
}



- (void)addCursorRect:(NSRect)aRect cursor:(NSCursor *)anObj
{
    // TODO: Need to implement
}

- (void)removeCursorRect:(NSRect)aRect cursor:(NSCursor *)anObj
{
    // TODO: Need to implement
}

- (void)discardCursorRects
{
    // TODO: Need to implement
}

- (void)resetCursorRects
{
    // TODO: Need to implement
}


- (NSTrackingRectTag)addTrackingRect:(NSRect)aRect owner:(id)anObject userData:(void *)data assumeInside:(BOOL)flag
{
    // TODO: Need to implement
}

- (void)removeTrackingRect:(NSTrackingRectTag)tag
{
    // TODO: Need to implement
}


- (void)setWantsLayer:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)wantsLayer
{
    // TODO: Need to implement
}


- (void)setLayer:(CALayer *)newLayer
{
    // TODO: Need to implement
}

- (CALayer *)layer
{
    // TODO: Need to implement
}


- (void)setAlphaValue:(CGFloat)viewAlpha
{
    // TODO: Need to implement
}

- (CGFloat)alphaValue
{
    // TODO: Need to implement
}


- (void)setBackgroundFilters:(NSArray *)filters
{
    // TODO: Need to implement
}

- (NSArray *)backgroundFilters
{
    // TODO: Need to implement
}


- (void)setCompositingFilter:(CIFilter *)filter
{
    // TODO: Need to implement
}

- (CIFilter *)compositingFilter
{
    // TODO: Need to implement
}


- (void)setContentFilters:(NSArray *)filters
{
    // TODO: Need to implement
}

- (NSArray *)contentFilters
{
    // TODO: Need to implement
}


- (void)setShadow:(NSShadow *)shadow
{
    // TODO: Need to implement
}

- (NSShadow *)shadow
{
    // TODO: Need to implement
}



- (void)addTrackingArea:(NSTrackingArea *)trackingArea
{
    // TODO: Need to implement
}

- (void)removeTrackingArea:(NSTrackingArea *)trackingArea
{
    // TODO: Need to implement
}

- (NSArray *)trackingAreas
{
    // TODO: Need to implement
}



- (void)updateTrackingAreas
{
    // TODO: Need to implement
}



- (BOOL)shouldDrawColor;
{
    // TODO: Need to implement
}

- (void)setPostsBoundsChangedNotifications:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)postsBoundsChangedNotifications
{
    // TODO: Need to implement
}


- (NSScrollView *)enclosingScrollView
{
    // TODO: Need to implement
}


- (NSMenu *)menuForEvent:(NSEvent *)event
{
    // TODO: Need to implement
}

+ (NSMenu *)defaultMenu
{
    // TODO: Need to implement
}


- (void)setToolTip:(NSString *)string
{
    // TODO: Need to implement
}

- (NSString *)toolTip
{
    // TODO: Need to implement
}

- (NSToolTipTag)addToolTipRect:(NSRect)aRect owner:(id)anObject userData:(void *)data
{
    // TODO: Need to implement
}

- (void)removeToolTip:(NSToolTipTag)tag
{
    // TODO: Need to implement
}

- (void)removeAllToolTips
{
    // TODO: Need to implement
}


- (void)viewWillStartLiveResize
{
    // TODO: Need to implement
}

- (void)viewDidEndLiveResize
{
    // TODO: Need to implement
}

- (BOOL)inLiveResize
{
    // TODO: Need to implement
}

- (BOOL)preservesContentDuringLiveResize
{
    // TODO: Need to implement
}

- (NSRect)rectPreservedDuringLiveResize
{
    // TODO: Need to implement
}

- (void)getRectsExposedDuringLiveResize:(NSRect[4])exposedRects count:(NSInteger *)count
{
    // TODO: Need to implement
}

@end


@implementation NSView (NSKeyboardUI)

- (BOOL)performMnemonic:(NSString *)theString
{
    // TODO: Need to implement
}

- (void)setNextKeyView:(NSView *)next
{
    // TODO: Need to implement
}

- (NSView *)nextKeyView
{
    // TODO: Need to implement
}

- (NSView *)previousKeyView
{
    // TODO: Need to implement
}

- (NSView *)nextValidKeyView
{
    // TODO: Need to implement
}

- (NSView *)previousValidKeyView
{
    
}

- (BOOL)canBecomeKeyView
{
    // TODO: Need to implement
}


- (void)setKeyboardFocusRingNeedsDisplayInRect:(NSRect)rect
{
    // TODO: Need to implement
}


- (void)setFocusRingType:(NSFocusRingType)focusRingType
{
    // TODO: Need to implement
}

- (NSFocusRingType)focusRingType
{
    // TODO: Need to implement
}

+ (NSFocusRingType)defaultFocusRingType
{
    // TODO: Need to implement
}

@end


@implementation NSView (NSDrag)

- (void)dragImage:(NSImage *)anImage at:(NSPoint)viewLocation offset:(NSSize)initialOffset event:(NSEvent *)event pasteboard:(NSPasteboard *)pboard source:(id)sourceObj slideBack:(BOOL)slideFlag
{
    // TODO: Need to implement
}


- (NSArray *)registeredDraggedTypes
{
    // TODO: Need to implement
}

- (void)registerForDraggedTypes:(NSArray *)newTypes
{
    // TODO: Need to implement
}

- (void)unregisterDraggedTypes
{
    // TODO: Need to implement
}


- (BOOL)dragFile:(NSString *)filename fromRect:(NSRect)rect slideBack:(BOOL)aFlag event:(NSEvent *)event
{
    // TODO: Need to implement
}

- (BOOL)dragPromisedFilesOfTypes:(NSArray *)typeArray fromRect:(NSRect)rect source:(id)sourceObject slideBack:(BOOL)aFlag event:(NSEvent *)event
{
    // TODO: Need to implement
}

@end

NSString *NSViewFrameDidChangeNotification = @"NSViewFrameDidChangeNotification";
NSString *NSViewFocusDidChangeNotification = @"NSViewFocusDidChangeNotification";
NSString *NSViewBoundsDidChangeNotification = @"NSViewBoundsDidChangeNotification";
NSString *NSViewGlobalFrameDidChangeNotification = @"NSViewGlobalFrameDidChangeNotification";
NSString *NSViewDidUpdateTrackingAreasNotification = @"NSViewDidUpdateTrackingAreasNotification";