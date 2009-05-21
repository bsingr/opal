// 
//  NSView.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <AppKit/NSResponder.h>
#import <Foundation/NSGeometry.h>
#import <Foundation/NSRange.h>
#import <AppKit/NSGraphics.h>
#import <AppKit/NSAnimation.h>

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

enum {
    NSViewNotSizable    = 0,
    NSViewMinXMargin    = 1,
    NSViewWidthSizable  = 2,
    NSViewMaxXMargin    = 4,
    NSViewMinYMargin    = 8,
    NSViewHeightSizable = 16,
    NSViewMaxYMargin    = 32
};

enum {
    NSNoBorder          = 0,
    NSLineBorder        = 1,
    NSBezelBorder       = 2,
    NSGrooveBorder      = 3
};
typedef NSUInteger NSBorderType;

typedef NSInteger NSTrackingRectTag;
typedef NSInteger NSToolTipTag;

@interface NSView : NSResponder
{
    NSRect          _frame;
    NSRect          _bounds;
    NSWindow       *_window;
    id              _gState;
    
    NSMenu         *_menu;
    NSView         *_superview;
    NSMutableArray *_subviews;
    
    NSView         *_nextKeyView;
    NSView         *_previousKeyView;
    
    BOOL            _isHidden;
    BOOL            _postsNotificationOnFrameChange;
    BOOL            _postsNotificationOnBoundsChange;
    BOOL            _autoresizesSubviews;
    BOOL            _inLiveResize;
    unsigned int    _autoresizingMask;
    
    int             _tag;
    NSArray        *_draggedTypes;
    NSToolTipTag    _defaultToolTipTag;
    NSString       *_toolTip;

    NSRect          _invalidRect;

    BOOL              _validTransforms;
    CGAffineTransform _transformFromWindow;
    CGAffineTransform _transformToWindow;
    NSRect            _visibleRect;
   
    // Usually an "outer div" to hold the graphics context aswell as subviews' containers
    id              _DOMContainer;
    // Rendering context. mainly canvas. could be a nested DIV tree if DOM drawing. or could be a textfield for nstextfield etc. but default it is a canvas
    id              _DOMGraphicsContext;
}

- (id)initWithFrame:(NSRect)frameRect;

- (NSWindow *)window;
- (NSView *)superview;
- (NSArray *)subviews;
- (BOOL)isDescendantOf:(NSView *)aView;
- (NSView *)ancestorSharedWithView:(NSView *)aView;
- (NSView *)opaqueAncestor;
- (void)setHidden:(BOOL)flag;
- (BOOL)isHidden;
- (BOOL)isHiddenOrHasHiddenAncestor;
- (void)getRectsBeingDrawn:(const NSRect **)rects count:(NSInteger *)count;
- (BOOL)needsToDrawRect:(NSRect)aRect;
- (BOOL)wantsDefaultClipping;
- (void)viewDidHide;
- (void)viewDidUnhide;
- (void)setSubviews:(NSArray *)newSubviews;
- (void)addSubview:(NSView *)aView;
- (void)addSubview:(NSView *)aView positioned:(NSWindowOrderingMode)place relativeTo:(NSView *)otherView;
- (void)sortSubviewsUsingFunction:(NSComparisonResult (*)(id, id, void *))compare context:(void *)context;
- (void)viewWillMoveToWindow:(NSWindow *)newWindow;
- (void)viewDidMoveToWindow;
- (void)viewWillMoveToSuperview:(NSView *)newSuperview;
- (void)viewDidMoveToSuperview;
- (void)didAddSubview:(NSView *)subview;
- (void)willRemoveSubview:(NSView *)subview;
- (void)removeFromSuperview;
- (void)replaceSubview:(NSView *)oldView with:(NSView *)newView;
- (void)removeFromSuperviewWithoutNeedingDisplay;

- (void)setPostsFrameChangedNotifications:(BOOL)flag;
- (BOOL)postsFrameChangedNotifications;
- (void)resizeSubviewsWithOldSize:(NSSize)oldSize;
- (void)resizeWithOldSuperviewSize:(NSSize)oldSize;
- (void)setAutoresizesSubviews:(BOOL)flag;
- (BOOL)autoresizesSubviews;
- (void)setAutoresizingMask:(NSUInteger)mask;
- (NSUInteger)autoresizingMask;
- (void)setFrameOrigin:(NSPoint)newOrigin;
- (void)setFrameSize:(NSSize)newSize;
- (void)setFrame:(NSRect)frameRect;
- (NSRect)frame;
- (void)setFrameRotation:(CGFloat)angle;
- (CGFloat)frameRotation;
- (void)setFrameCenterRotation:(CGFloat)angle;
- (CGFloat)frameCenterRotation;

- (void)setBoundsOrigin:(NSPoint)newOrigin;
- (void)setBoundsSize:(NSSize)newSize;
- (void)setBoundsRotation:(CGFloat)angle;
- (CGFloat)boundsRotation;
- (void)translateOriginToPoint:(NSPoint)translation;
- (void)scaleUnitSquareToSize:(NSSize)newUnitSize;
- (void)rotateByAngle:(CGFloat)angle;
- (void)setBounds:(NSRect)aRect;
- (NSRect)bounds;

- (BOOL)isFlipped;
- (BOOL)isRotatedFromBase;
- (BOOL)isRotatedOrScaledFromBase;
- (BOOL)isOpaque;

- (NSPoint)convertPoint:(NSPoint)aPoint fromView:(NSView *)aView;
- (NSPoint)convertPoint:(NSPoint)aPoint toView:(NSView *)aView;
- (NSSize)convertSize:(NSSize)aSize fromView:(NSView *)aView;
- (NSSize)convertSize:(NSSize)aSize toView:(NSView *)aView;
- (NSRect)convertRect:(NSRect)aRect fromView:(NSView *)aView;
- (NSRect)convertRect:(NSRect)aRect toView:(NSView *)aView;
- (NSRect)centerScanRect:(NSRect)aRect;

- (NSPoint)convertPointToBase:(NSPoint)aPoint;
- (NSPoint)convertPointFromBase:(NSPoint)aPoint;
- (NSSize)convertSizeToBase:(NSSize)aSize;
- (NSSize)convertSizeFromBase:(NSSize)aSize;
- (NSRect)convertRectToBase:(NSRect)aRect;
- (NSRect)convertRectFromBase:(NSRect)aRect;

- (BOOL)canDraw;
- (void)setNeedsDisplay:(BOOL)flag;
- (void)setNeedsDisplayInRect:(NSRect)invalidRect;
- (BOOL)needsDisplay;
- (void)lockFocus;
- (void)unlockFocus;
- (BOOL)lockFocusIfCanDraw;
- (BOOL)lockFocusIfCanDrawInContext:(NSGraphicsContext *)context;

+ (NSView *)focusView;
- (NSRect)visibleRect;

- (void)display;
- (void)displayIfNeeded;
- (void)displayIfNeededIgnoringOpacity;
- (void)displayRect:(NSRect)rect;
- (void)displayIfNeededInRect:(NSRect)rect;
- (void)displayRectIgnoringOpacity:(NSRect)rect;
- (void)displayIfNeededInRectIgnoringOpacity:(NSRect)rect;
- (void)drawRect:(NSRect)rect;
- (void)displayRectIgnoringOpacity:(NSRect)aRect inContext:(NSGraphicsContext *)context;

- (NSBitmapImageRep *)bitmapImageRepForCachingDisplayInRect:(NSRect)rect;
- (void)cacheDisplayInRect:(NSRect)rect toBitmapImageRep:(NSBitmapImageRep *)bitmapImageRep;

- (NSGraphicsContext *)graphicsContext;

- (void)viewWillDraw;

- (NSInteger)gState;
- (void)allocateGState;
- (void)releaseGState;
- (void)setUpGState;
- (void)renewGState;

- (void)scrollPoint:(NSPoint)aPoint;
- (BOOL)scrollRectToVisible:(NSRect)aRect;
- (BOOL)autoscroll:(NSEvent *)theEvent;
- (NSRect)adjustScroll:(NSRect)newVisible;
- (void)scrollRect:(NSRect)aRect by:(NSSize)delta;
- (void)translateRectsNeedingDisplayInRect:(NSRect)clipRect by:(NSSize)delta;

- (NSView *)hitTest:(NSPoint)aPoint;
- (BOOL)mouse:(NSPoint)aPoint inRect:(NSRect)aRect;
- (id)viewWithTag:(NSInteger)aTag;
- (NSInteger)tag;
- (BOOL)performKeyEquivalent:(NSEvent *)theEvent;
- (BOOL)acceptsFirstMouse:(NSEvent *)theEvent;
- (BOOL)shouldDelayWindowOrderingForEvent:(NSEvent *)theEvent;
- (BOOL)needsPanelToBecomeKey;
- (BOOL)mouseDownCanMoveWindow;

- (void)addCursorRect:(NSRect)aRect cursor:(NSCursor *)anObj;
- (void)removeCursorRect:(NSRect)aRect cursor:(NSCursor *)anObj;
- (void)discardCursorRects;
- (void)resetCursorRects;

- (NSTrackingRectTag)addTrackingRect:(NSRect)aRect owner:(id)anObject userData:(void *)data assumeInside:(BOOL)flag;
- (void)removeTrackingRect:(NSTrackingRectTag)tag;

- (void)setWantsLayer:(BOOL)flag;
- (BOOL)wantsLayer;

- (void)setLayer:(CALayer *)newLayer;
- (CALayer *)layer;

- (void)setAlphaValue:(CGFloat)viewAlpha;
- (CGFloat)alphaValue;

- (void)setBackgroundFilters:(NSArray *)filters;
- (NSArray *)backgroundFilters;

- (void)setCompositingFilter:(CIFilter *)filter;
- (CIFilter *)compositingFilter;

- (void)setContentFilters:(NSArray *)filters;
- (NSArray *)contentFilters;

- (void)setShadow:(NSShadow *)shadow;
- (NSShadow *)shadow;


- (void)addTrackingArea:(NSTrackingArea *)trackingArea;
- (void)removeTrackingArea:(NSTrackingArea *)trackingArea;
- (NSArray *)trackingAreas;


- (void)updateTrackingAreas;


- (BOOL)shouldDrawColor;

- (void)setPostsBoundsChangedNotifications:(BOOL)flag;
- (BOOL)postsBoundsChangedNotifications;

- (NSScrollView *)enclosingScrollView;

- (NSMenu *)menuForEvent:(NSEvent *)event;
+ (NSMenu *)defaultMenu;

- (void)setToolTip:(NSString *)string;
- (NSString *)toolTip;
- (NSToolTipTag)addToolTipRect:(NSRect)aRect owner:(id)anObject userData:(void *)data;
- (void)removeToolTip:(NSToolTipTag)tag;
- (void)removeAllToolTips;

- (void)viewWillStartLiveResize;
- (void)viewDidEndLiveResize;
- (BOOL)inLiveResize;
- (BOOL)preservesContentDuringLiveResize;
- (NSRect)rectPreservedDuringLiveResize;
- (void)getRectsExposedDuringLiveResize:(NSRect[4])exposedRects count:(NSInteger *)count;

@end


@interface NSObject (NSToolTipOwner)

- (NSString *)view:(NSView *)view stringForToolTip:(NSToolTipTag)tag point:(NSPoint)point userData:(void *)data;

@end

@interface NSView(NSKeyboardUI)

- (BOOL)performMnemonic:(NSString *)theString;
- (void)setNextKeyView:(NSView *)next;
- (NSView *)nextKeyView;
- (NSView *)previousKeyView;
- (NSView *)nextValidKeyView;
- (NSView *)previousValidKeyView;

- (BOOL)canBecomeKeyView;

- (void)setKeyboardFocusRingNeedsDisplayInRect:(NSRect)rect;

- (void)setFocusRingType:(NSFocusRingType)focusRingType;
- (NSFocusRingType)focusRingType;
+ (NSFocusRingType)defaultFocusRingType;

@end


@interface NSView (NSDrag)

- (void)dragImage:(NSImage *)anImage at:(NSPoint)viewLocation offset:(NSSize)initialOffset event:(NSEvent *)event pasteboard:(NSPasteboard *)pboard source:(id)sourceObj slideBack:(BOOL)slideFlag;

- (NSArray *)registeredDraggedTypes;
- (void)registerForDraggedTypes:(NSArray *)newTypes;
- (void)unregisterDraggedTypes;

- (BOOL)dragFile:(NSString *)filename fromRect:(NSRect)rect slideBack:(BOOL)aFlag event:(NSEvent *)event;
- (BOOL)dragPromisedFilesOfTypes:(NSArray *)typeArray fromRect:(NSRect)rect source:(id)sourceObject slideBack:(BOOL)aFlag event:(NSEvent *)event;

@end

extern NSString *NSViewFrameDidChangeNotification;
extern NSString *NSViewFocusDidChangeNotification;
extern NSString *NSViewBoundsDidChangeNotification;
extern NSString *NSViewGlobalFrameDidChangeNotification;
extern NSString *NSViewDidUpdateTrackingAreasNotification;
