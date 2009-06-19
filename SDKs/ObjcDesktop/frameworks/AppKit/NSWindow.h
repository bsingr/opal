// 
//  NSWindow.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSGeometry.h>
#import <AppKit/NSResponder.h>
#import <AppKit/NSGraphics.h>
#import <AppKit/NSText.h>
#import <AppKit/NSApplication.h>
#import <AppKit/NSGradient.h>

@class NSToolbar, NSButton, NSButtonCell;
@class NSWindowTitleButton;
@class NSWindowDepth;
@class NSScreen;
@class NSWindowController;
@class NSSelectionDirection;

enum {
    NSBorderlessWindowMask              = 0,
    NSTitledWindowMask                  = 1 << 0,
    NSClosableWindowMask                = 1 << 1,
    NSMiniaturizableWindowMask          = 1 << 2,
    NSResizableWindowMask               = 1 << 3,
    NSTexturedBackgroundWindowMask      = 1 << 8,
    NSUnifiedTitleAndToolbarWindowMask  = 1 << 12
};

enum {
    NSNormalWindowLevel =  10,
    NSFloatingWindowLevel = 10,
    NSSubmenuWindowLevel = 10,
    NSTornOffMenuWindowLevel = 10,
    NSMainMenuWindowLevel = 10,
    NSStatusWindowLevel =	10,
    NSModalPanelWindowLevel = 10,
    NSPopUpMenuWindowLevel = 10,
    NSScreenSaverWindowLevel = 10
};

enum {
    NSWindowCloseButton,
    NSWindowMiniaturizeButton,
    NSWindowZoomButton,
    NSWindowToolbarButton,
    NSWindowDocumentIconButton
};
typedef NSUInteger NSWindowButton;

@interface NSWindow : NSResponder
{
    id                   _gState;
    id                   _gCanvas;
    id                   _gBuffer;
    
    NSPoint              _contentRectOrigin;
	NSSize               _contentRectSize;
	
    BOOL                 _isVisible;
	
	BOOL                 _hasShadow;
	BOOL                 _hidesOnDeactivate;
	BOOL                 _releasedWhenClosed;
	NSUInteger          *_styleMask;
	NSString            *_title;
	BOOL                 _visibleAtLaunch;
	BOOL                 _resizable;
	
	BOOL                 _showNormalTitlebar;
	BOOL                 _unifiedTitleAndToolbar;
	
	NSToolbar           *_toolbar;
	
	NSView              *_contentView;
	
	id                   _delegate;
	NSUInteger           _windowNumber;
	
	NSRect               _frame;
    NSRect               _bounds;
	BOOL                 _visible;
	
	int                  _level;
	BOOL                 _keyWindow;
	BOOL                 _mainWindow;
	NSResponder         *_firstResponder;
	
	BOOL                 _movableByWindowBackground;
    
    id                   _eventBindingCurrentX;
    id                   _eventBindingCurrentY;
    
    NSWindowTitleButton *_windowCloseButton;
    NSText              *_fieldEditor;
    
    NSSize               _maxSize;
    NSSize               _minSize;
    NSUInteger           _wtFlags;
    id                  *_windowClass;
    
    
    CGDOMElementRef      _DOMContainer;         // Usually an "outer div" to hold the graphics context aswell as subviews' containers
    CGDOMElementRef      _DOMGraphicsContext;   // Rendering context: usually a canvas (exceptions for DOM rendering and VML)
	NSGraphicsContext   *_graphicsContext;      // a cache of the actual graphics context (from canvas, or VML representation).
}

+ (NSRect)frameRectForContentRect:(NSRect)cRect styleMask:(NSUInteger)aStyle;
+ (NSRect)contentRectForFrameRect:(NSRect)fRect styleMask:(NSUInteger)aStyle;
+ (CGFloat)minFrameWidthWithTitle:(NSString *)aTitle styleMask:(NSUInteger)aStyle;
+ (NSWindowDepth)defaultDepthLimit;
- (NSRect)frameRectForContentRect:(NSRect)contentRect;
- (NSRect)contentRectForFrameRect:(NSRect)frameRect;

- (id)initWithContentRect:(NSRect)contentRect styleMask:(NSUInteger)aStyle backing:(NSBackingStoreType)bufferingType defer:(BOOL)flag;

- (NSString *)title;
- (void)setTitle:(NSString *)aString;
- (void)setRepresentedURL:(NSURL *)url;
- (NSURL *)representedURL;
- (NSString *)representedFilename;
- (void)setRepresentedFilename:(NSString *)aString;
- (void)setTitleWithRepresentedFilename:(NSString *)filename;
- (void)setExcludedFromWindowsMenu:(BOOL)flag;
- (BOOL)isExcludedFromWindowsMenu;
- (void)setContentView:(NSView *)aView;
- (id)contentView;
- (void)setDelegate:(id)anObject;
- (id)delegate;
- (NSInteger)windowNumber;
- (NSUInteger)styleMask;
- (NSText *)fieldEditor:(BOOL)createFlag forObject:(id)anObject;
- (void)endEditingFor:(id)anObject;

- (NSRect)constrainFrameRect:(NSRect)frameRect toScreen:(NSScreen *)screen;
- (void)setFrame:(NSRect)frameRect display:(BOOL)flag;
- (void)setContentSize:(NSSize)aSize;
- (void)setFrameOrigin:(NSPoint)aPoint;
- (void)setFrameTopLeftPoint:(NSPoint)aPoint;
- (NSPoint)cascadeTopLeftFromPoint:(NSPoint)topLeftPoint;
- (NSRect)frame;

- (NSTimeInterval)animationResizeTime:(NSRect)newFrame;
- (void)setFrame:(NSRect)frameRect display:(BOOL)displayFlag animate:(BOOL)animateFlag;
- (void)setShowsResizeIndicator:(BOOL)show;
- (BOOL)showsResizeIndicator;

- (void)setResizeIncrements:(NSSize)increments;
- (NSSize)resizeIncrements;
- (void)setAspectRatio:(NSSize)ratio;
- (NSSize)aspectRatio;
- (void)setContentResizeIncrements:(NSSize)increments;
- (NSSize)contentResizeIncrements;
- (void)setContentAspectRatio:(NSSize)ratio;
- (NSSize)contentAspectRatio;
- (void)useOptimizedDrawing:(BOOL)flag;
- (void)setViewsNeedDisplay:(BOOL)flag;
- (BOOL)viewsNeedDisplay;
- (void)displayIfNeeded;
- (void)display;
- (void)setAutodisplay:(BOOL)flag;
- (BOOL)isAutodisplay;
- (BOOL)preservesContentDuringLiveResize;
- (void)setPreservesContentDuringLiveResize:(BOOL)flag;
- (void)update;
- (BOOL)makeFirstResponder:(NSResponder *)aResponder;
- (NSResponder *)firstResponder;
- (NSInteger)resizeFlags;
- (void)keyDown:(NSEvent *)theEvent;
- (void)close;
- (void)setReleasedWhenClosed:(BOOL)flag;
- (BOOL)isReleasedWhenClosed;
- (void)miniaturize:(id)sender;
- (void)deminiaturize:(id)sender;
- (BOOL)isZoomed;
- (void)zoom:(id)sender;
- (BOOL)isMiniaturized;
- (BOOL)tryToPerform:(SEL)anAction with:(id)anObject;
- (id)validRequestorForSendType:(NSString *)sendType returnType:(NSString *)returnType;
- (void)setBackgroundColor:(NSColor *)color;
- (NSColor *)backgroundColor;

- (void)setContentBorderThickness:(CGFloat)thickness forEdge:(NSRectEdge)edge;
- (CGFloat)contentBorderThicknessForEdge:(NSRectEdge)edge;

- (void)setAutorecalculatesContentBorderThickness:(BOOL)flag forEdge:(NSRectEdge)edge;
- (BOOL)autorecalculatesContentBorderThicknessForEdge:(NSRectEdge)edge;

- (void)setMovableByWindowBackground:(BOOL)flag;
- (BOOL)isMovableByWindowBackground;

- (void)setHidesOnDeactivate:(BOOL)flag;
- (BOOL)hidesOnDeactivate;

- (void)center;
- (void)makeKeyAndOrderFront:(id)sender;
- (void)orderFront:(id)sender;
- (void)orderBack:(id)sender;
- (void)orderOut:(id)sender;
- (void)orderWindow:(NSWindowOrderingMode)place relativeTo:(NSInteger)otherWin;
- (void)orderFrontRegardless;

- (void)setMiniwindowImage:(NSImage *)image;
- (void)setMiniwindowTitle:(NSString *)title;
- (NSImage *)miniwindowImage;
- (NSString *)miniwindowTitle;

- (void)setDocumentEdited:(BOOL)flag;
- (BOOL)isDocumentEdited;
- (BOOL)isVisible;
- (BOOL)isKeyWindow;
- (BOOL)isMainWindow;
- (BOOL)canBecomeKeyWindow;
- (BOOL)canBecomeMainWindow;
- (void)makeKeyWindow;
- (void)makeMainWindow;
- (void)becomeKeyWindow;
- (void)resignKeyWindow;
- (void)becomeMainWindow;
- (void)resignMainWindow;

- (BOOL)worksWhenModal;
- (NSPoint)convertBaseToScreen:(NSPoint)aPoint;
- (NSPoint)convertScreenToBase:(NSPoint)aPoint;
- (void)performClose:(id)sender;
- (void)performMiniaturize:(id)sender;
- (void)performZoom:(id)sender;
- (NSInteger)gState;
- (void)setOneShot:(BOOL)flag;
- (BOOL)isOneShot;
- (void)disableCursorRects;
- (void)enableCursorRects;
- (void)discardCursorRects;
- (BOOL)areCursorRectsEnabled;
- (void)invalidateCursorRectsForView:(NSView *)aView;
- (void)resetCursorRects;


- (void)setBackingType:(NSBackingStoreType)bufferingType;
- (NSBackingStoreType)backingType;
- (void)setLevel:(NSInteger)newLevel;
- (NSInteger)level;
- (void)setDepthLimit:(NSWindowDepth)limit;
- (NSWindowDepth)depthLimit;
- (void)setDynamicDepthLimit:(BOOL)flag;
- (BOOL)hasDynamicDepthLimit;
- (NSScreen *)screen;
- (NSScreen *)deepestScreen;
- (BOOL)canStoreColor;
- (void)setHasShadow:(BOOL)hasShadow;
- (BOOL)hasShadow;
- (void)invalidateShadow;

- (void)setAlphaValue:(CGFloat)windowAlpha;
- (CGFloat)alphaValue;
- (void)setOpaque:(BOOL)isOpaque;
- (BOOL)isOpaque;

- (void)cacheImageInRect:(NSRect)aRect;
- (void)restoreCachedImage;
- (void)discardCachedImage;

- (NSSize)minSize;
- (NSSize)maxSize;
- (void)setMinSize:(NSSize)size;
- (void)setMaxSize:(NSSize)size;
- (NSSize)contentMinSize;
- (NSSize)contentMaxSize;
- (void)setContentMinSize:(NSSize)size;
- (void)setContentMaxSize:(NSSize)size;
- (NSEvent *)nextEventMatchingMask:(NSUInteger)mask;
- (NSEvent *)nextEventMatchingMask:(NSUInteger)mask untilDate:(NSDate *)expiration inMode:(NSString *)mode dequeue:(BOOL)deqFlag;
- (void)discardEventsMatchingMask:(NSUInteger)mask beforeEvent:(NSEvent *)lastEvent;
- (void)postEvent:(NSEvent *)event atStart:(BOOL)flag;
- (NSEvent *)currentEvent;
- (void)setAcceptsMouseMovedEvents:(BOOL)flag;
- (BOOL)acceptsMouseMovedEvents;
- (void)setIgnoresMouseEvents:(BOOL)flag;
- (BOOL)ignoresMouseEvents;
- (void)sendEvent:(NSEvent *)theEvent;
- (NSPoint)mouseLocationOutsideOfEventStream;
+ (void)menuChanged:(NSMenu *)menu;

- (id)windowController;
- (void)setWindowController:(NSWindowController *)windowController;

- (BOOL)isSheet;
- (NSWindow *)attachedSheet;

+ (NSButton *)standardWindowButton:(NSWindowButton)b forStyleMask:(NSUInteger)styleMask;
- (NSButton *)standardWindowButton:(NSWindowButton)b;

- (void)addChildWindow:(NSWindow *)childWin ordered:(NSWindowOrderingMode)place;
- (void)removeChildWindow:(NSWindow *)childWin;
- (NSArray *)childWindows;

- (NSWindow *)parentWindow;
- (void)setParentWindow:(NSWindow *)window;
- (NSGraphicsContext *)graphicsContext;

@end


@interface NSWindow (NSKeyboardUI)

- (void)setInitialFirstResponder:(NSView *)view;
- (NSView *)initialFirstResponder;
- (void)selectNextKeyView:(id)sender;
- (void)selectPreviousKeyView:(id)sender;
- (void)selectKeyViewFollowingView:(NSView *)aView;
- (void)selectKeyViewPrecedingView:(NSView *)aView;
- (NSSelectionDirection)keyViewSelectionDirection;
- (void)setDefaultButtonCell:(NSButtonCell *)defButt;
- (NSButtonCell *)defaultButtonCell;
- (void)disableKeyEquivalentForDefaultButtonCell;
- (void)enableKeyEquivalentForDefaultButtonCell;
- (void)setAutorecalculatesKeyViewLoop:(BOOL)flag;
- (BOOL)autorecalculatesKeyViewLoop;
- (void)recalculateKeyViewLoop;
@end


@interface NSWindow (NSToolbarSupport)

- (void)setToolbar:(NSToolbar*)toolbar;
- (NSToolbar *)toolbar;
- (void)toggleToolbarShown:(id)sender;
- (void)runToolbarCustomizationPalette:(id)sender;
- (void)setShowsToolbarButton:(BOOL)show;
- (BOOL)showsToolbarButton;
@end


@interface NSWindow (NSDrag)

- (void)dragImage:(NSImage *)anImage at:(NSPoint)baseLocation offset:(NSSize)initialOffset event:(NSEvent *)event pasteboard:(NSPasteboard *)pboard source:(id)sourceObj slideBack:(BOOL)slideFlag;
- (void)registerForDraggedTypes:(NSArray *)newTypes;
- (void)unregisterDraggedTypes;

@end


@interface NSObject (NSWindowNotifications)

- (void)windowDidResize:(NSNotification *)notification;
- (void)windowDidExpose:(NSNotification *)notification;
- (void)windowWillMove:(NSNotification *)notification;
- (void)windowDidMove:(NSNotification *)notification;
- (void)windowDidBecomeKey:(NSNotification *)notification;
- (void)windowDidResignKey:(NSNotification *)notification;
- (void)windowDidBecomeMain:(NSNotification *)notification;
- (void)windowDidResignMain:(NSNotification *)notification;
- (void)windowWillClose:(NSNotification *)notification;
- (void)windowWillMiniaturize:(NSNotification *)notification;
- (void)windowDidMiniaturize:(NSNotification *)notification;
- (void)windowDidDeminiaturize:(NSNotification *)notification;
- (void)windowDidUpdate:(NSNotification *)notification;
- (void)windowDidChangeScreen:(NSNotification *)notification;
- (void)windowDidChangeScreenProfile:(NSNotification *)notification;
- (void)windowWillBeginSheet:(NSNotification *)notification;
- (void)windowDidEndSheet:(NSNotification *)notification;

@end


@interface NSObject (NSWindowDelegate)

- (BOOL)windowShouldClose:(id)sender;
- (id)windowWillReturnFieldEditor:(NSWindow *)sender toObject:(id)client;
- (NSSize)windowWillResize:(NSWindow *)sender toSize:(NSSize)frameSize;
- (NSRect)windowWillUseStandardFrame:(NSWindow *)window defaultFrame:(NSRect)newFrame;
- (BOOL)windowShouldZoom:(NSWindow *)window toFrame:(NSRect)newFrame;
- (NSUndoManager *)windowWillReturnUndoManager:(NSWindow *)window;
- (NSRect)window:(NSWindow *)window willPositionSheet:(NSWindow *)sheet usingRect:(NSRect)rect;

- (BOOL)window:(NSWindow *)window shouldPopUpDocumentPathMenu:(NSMenu *)menu;

- (BOOL)window:(NSWindow *)window shouldDragDocumentWithEvent:(NSEvent *)event from:(NSPoint)dragImageLocation withPasteboard:(NSPasteboard *)pasteboard;

@end


extern NSString *NSWindowDidBecomeKeyNotification;
extern NSString *NSWindowDidBecomeMainNotification;
extern NSString *NSWindowDidChangeScreenNotification;
extern NSString *NSWindowDidDeminiaturizeNotification;
extern NSString *NSWindowDidExposeNotification;
extern NSString *NSWindowDidMiniaturizeNotification;
extern NSString *NSWindowDidMoveNotification;
extern NSString *NSWindowDidResignKeyNotification;
extern NSString *NSWindowDidResignMainNotification;
extern NSString *NSWindowDidResizeNotification;
extern NSString *NSWindowDidUpdateNotification;
extern NSString *NSWindowWillCloseNotification;
extern NSString *NSWindowWillMiniaturizeNotification;
extern NSString *NSWindowWillMoveNotification;
extern NSString *NSWindowWillBeginSheetNotification;
extern NSString *NSWindowDidEndSheetNotification;
extern NSString *NSWindowDidChangeScreenProfileNotification;