#import <Foundation/NSGeometry.m>
#import <AppKit/NSResponder.m>
#import <AppKit/NSGraphics.m>

enum {
    NSBorderlessWindowMask              = 0,
    NSTitledWindowMask                  = 1 << 0,
    NSClosableWindowMask                = 1 << 1,
    NSMiniaturizableWindowMask          = 1 << 2,
    NSResizableWindowMask               = 1 << 3,
    NSTexturedBackgroundWindowMask      = 1 << 8,
    NSUnifiedTitleAndToolbarWindowMask  = 1 << 12
};

#define NSNormalWindowLevel 10
#define NSFloatingWindowLevel 10
#define NSSubmenuWindowLevel 10
#define NSTornOffMenuWindowLevel 10
#define NSMainMenuWindowLevel 10
#define NSStatusWindowLevel	10
#define NSModalPanelWindowLevel 10
#define NSPopUpMenuWindowLevel 10
#define NSScreenSaverWindowLevel 10

enum {
    NSWindowCloseButton,
    NSWindowMiniaturizeButton,
    NSWindowZoomButton,
    NSWindowToolbarButton,
    NSWindowDocumentIconButton
};
typedef NSUInteger NSWindowButton;

@implementation NSWindow : NSResponder
{
    
}

+ (NSRect)frameRectForContentRect:(NSRect)cRect styleMask:(NSUInteger)aStyle
{
    // TODO: Need to implement
}

+ (NSRect)contentRectForFrameRect:(NSRect)fRect styleMask:(NSUInteger)aStyle
{
    // TODO: Need to implement
}

+ (CGFloat)minFrameWidthWithTitle:(NSString *)aTitle styleMask:(NSUInteger)aStyle
{
    // TODO: Need to implement
}

+ (NSWindowDepth)defaultDepthLimit
{
    // TODO: Need to implement
}

- (NSRect)frameRectForContentRect:(NSRect)contentRect
{
    // TODO: Need to implement
}

- (NSRect)contentRectForFrameRect:(NSRect)frameRect
{
    // TODO: Need to implement
}

- (id)init
{
    self = [super init];
    if (self) {
        // create gCanvas?
    }
    
    return self;
}

- (id)initWithContentRect:(NSRect)contentRect styleMask:(NSUInteger)aStyle backing:(NSBackingStoreType)bufferingType defer:(BOOL)flag
{
    self = [self init];
    
    if (self) {
        
    }
    
    return self;
}

- (id)initWithCoder:(NSCoder *)aCoder
{
    
}

- (NSString *)title
{
    // TODO: Need to implement
}

- (void)setTitle:(NSString *)aString
{
    // TODO: Need to implement
}

- (void)setRepresentedURL:(NSURL *)url
{
    // TODO: Need to implement
}

- (NSURL *)representedURL
{
    // TODO: Need to implement
}

- (NSString *)representedFilename
{
    // TODO: Need to implement
}

- (void)setRepresentedFilename:(NSString *)aString
{
    // TODO: Need to implement
}

- (void)setTitleWithRepresentedFilename:(NSString *)filename
{
    // TODO: Need to implement
}

- (void)setExcludedFromWindowsMenu:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)isExcludedFromWindowsMenu
{
    // TODO: Need to implement
}

- (void)setContentView:(NSView *)aView
{
    // TODO: Need to implement
}

- (id)contentView
{
    // TODO: Need to implement
}

- (void)setDelegate:(id)anObject
{
    // TODO: Need to implement
}

- (id)delegate
{
    // TODO: Need to implement
}

- (NSInteger)windowNumber
{
    // TODO: Need to implement
}

- (NSUInteger)styleMask
{
    // TODO: Need to implement
}

- (NSText *)fieldEditor:(BOOL)createFlag forObject:(id)anObject
{
    // TODO: Need to implement
}

- (void)endEditingFor:(id)anObject
{
    // TODO: Need to implement
}


- (NSRect)constrainFrameRect:(NSRect)frameRect toScreen:(NSScreen *)screen
{
    // TODO: Need to implement
}

- (void)setFrame:(NSRect)frameRect display:(BOOL)flag
{
    // TODO: Need to implement
}

- (void)setContentSize:(NSSize)aSize
{
    // TODO: Need to implement
}

- (void)setFrameOrigin:(NSPoint)aPoint
{
    // TODO: Need to implement
}

- (void)setFrameTopLeftPoint:(NSPoint)aPoint
{
    // TODO: Need to implement
}

- (NSPoint)cascadeTopLeftFromPoint:(NSPoint)topLeftPoint
{
    // TODO: Need to implement
}

- (NSRect)frame
{
    // TODO: Need to implement
}


- (NSTimeInterval)animationResizeTime:(NSRect)newFrame
{
    // TODO: Need to implement
}

- (void)setFrame:(NSRect)frameRect display:(BOOL)displayFlag animate:(BOOL)animateFlag
{
    // TODO: Need to implement
}

- (void)setShowsResizeIndicator:(BOOL)show
{
    // TODO: Need to implement
}

- (BOOL)showsResizeIndicator
{
    // TODO: Need to implement
}


- (void)setResizeIncrements:(NSSize)increments
{
    // TODO: Need to implement
}

- (NSSize)resizeIncrements
{
    // TODO: Need to implement
}

- (void)setAspectRatio:(NSSize)ratio
{
    // TODO: Need to implement
}

- (NSSize)aspectRatio
{
    // TODO: Need to implement
}


- (void)setContentResizeIncrements:(NSSize)increments
{
    // TODO: Need to implement
}

- (NSSize)contentResizeIncrements
{
    // TODO: Need to implement
}

- (void)setContentAspectRatio:(NSSize)ratio
{
    // TODO: Need to implement
}

- (NSSize)contentAspectRatio
{
    // TODO: Need to implement
}

- (void)useOptimizedDrawing:(BOOL)flag
{
    // TODO: Need to implement
}

- (void)setViewsNeedDisplay:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)viewsNeedDisplay
{
    // TODO: Need to implement
}

- (void)displayIfNeeded
{
    // TODO: Need to implement
}

- (void)display
{
    // TODO: Need to implement
}

- (void)setAutodisplay:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)isAutodisplay
{
    // TODO: Need to implement
}

- (BOOL)preservesContentDuringLiveResize
{
    // TODO: Need to implement
}

- (void)setPreservesContentDuringLiveResize:(BOOL)flag
{
    // TODO: Need to implement
}

- (void)update
{
    // TODO: Need to implement
}

- (BOOL)makeFirstResponder:(NSResponder *)aResponder
{
    // TODO: Need to implement
}

- (NSResponder *)firstResponder
{
    // TODO: Need to implement
}

- (NSInteger)resizeFlags
{
    // TODO: Need to implement
}

- (void)keyDown:(NSEvent *)theEvent
{
    // TODO: Need to implement
}

- (void)close
{
    // TODO: Need to implement
}

- (void)setReleasedWhenClosed:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)isReleasedWhenClosed
{
    // TODO: Need to implement
}

- (void)miniaturize:(id)sender
{
    // TODO: Need to implement
}

- (void)deminiaturize:(id)sender
{
    // TODO: Need to implement
}

- (BOOL)isZoomed
{
    // TODO: Need to implement
}

- (void)zoom:(id)sender
{
    // TODO: Need to implement
}

- (BOOL)isMiniaturized
{
    // TODO: Need to implement
}

- (BOOL)tryToPerform:(SEL)anAction with:(id)anObject
{
    // TODO: Need to implement
}

- (id)validRequestorForSendType:(NSString *)sendType returnType:(NSString *)returnType
{
    // TODO: Need to implement
}

- (void)setBackgroundColor:(NSColor *)color
{
    // TODO: Need to implement
}

- (NSColor *)backgroundColor
{
    // TODO: Need to implement
}


- (void)setContentBorderThickness:(CGFloat)thickness forEdge:(NSRectEdge)edge
{
    // TODO: Need to implement
}

- (CGFloat)contentBorderThicknessForEdge:(NSRectEdge)edge
{
    // TODO: Need to implement
}


- (void)setAutorecalculatesContentBorderThickness:(BOOL)flag forEdge:(NSRectEdge)edge
{
    // TODO: Need to implement
}

- (BOOL)autorecalculatesContentBorderThicknessForEdge:(NSRectEdge)edge
{
    // TODO: Need to implement
}

- (void)setMovableByWindowBackground:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)isMovableByWindowBackground
{
    // TODO: Need to implement
}



- (void)setHidesOnDeactivate:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)hidesOnDeactivate
{
    // TODO: Need to implement
}


- (void)center
{
    // TODO: Need to implement
}

- (void)makeKeyAndOrderFront:(id)sender
{
    // TODO: Need to implement
}

- (void)orderFront:(id)sender
{
    // TODO: Need to implement
}

- (void)orderBack:(id)sender
{
    // TODO: Need to implement
}

- (void)orderOut:(id)sender
{
    // TODO: Need to implement
}

- (void)orderWindow:(NSWindowOrderingMode)place relativeTo:(NSInteger)otherWin
{
    // TODO: Need to implement
}

- (void)orderFrontRegardless
{
    // TODO: Need to implement
}


- (void)setMiniwindowImage:(NSImage *)image
{
    // TODO: Need to implement
}

- (void)setMiniwindowTitle:(NSString *)title
{
    // TODO: Need to implement
}

- (NSImage *)miniwindowImage
{
    // TODO: Need to implement
}

- (NSString *)miniwindowTitle
{
    // TODO: Need to implement
}


- (void)setDocumentEdited:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)isDocumentEdited
{
    // TODO: Need to implement
}

- (BOOL)isVisible
{
    // TODO: Need to implement
}

- (BOOL)isKeyWindow
{
    // TODO: Need to implement
}

- (BOOL)isMainWindow
{
    // TODO: Need to implement
}

- (BOOL)canBecomeKeyWindow
{
    // TODO: Need to implement
}

- (BOOL)canBecomeMainWindow
{
    // TODO: Need to implement
}

- (void)makeKeyWindow
{
    // TODO: Need to implement
}

- (void)makeMainWindow
{
    // TODO: Need to implement
}

- (void)becomeKeyWindow
{
    // TODO: Need to implement
}

- (void)resignKeyWindow
{
    // TODO: Need to implement
}

- (void)becomeMainWindow
{
    // TODO: Need to implement
}

- (void)resignMainWindow
{
    // TODO: Need to implement
}


- (BOOL)worksWhenModal
{
    // TODO: Need to implement
}

- (NSPoint)convertBaseToScreen:(NSPoint)aPoint
{
    // TODO: Need to implement
}

- (NSPoint)convertScreenToBase:(NSPoint)aPoint
{
    // TODO: Need to implement
}

- (void)performClose:(id)sender
{
    // TODO: Need to implement
}

- (void)performMiniaturize:(id)sender
{
    // TODO: Need to implement
}

- (void)performZoom:(id)sender
{
    // TODO: Need to implement
}

- (NSInteger)gState
{
    // TODO: Need to implement
}

- (void)setOneShot:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)isOneShot
{
    // TODO: Need to implement
}

- (void)disableCursorRects
{
    // TODO: Need to implement
}

- (void)enableCursorRects
{
    // TODO: Need to implement
}

- (void)discardCursorRects
{
    // TODO: Need to implement
}

- (BOOL)areCursorRectsEnabled
{
    // TODO: Need to implement
}

- (void)invalidateCursorRectsForView:(NSView *)aView
{
    // TODO: Need to implement
}

- (void)resetCursorRects
{
    // TODO: Need to implement
}



- (void)setBackingType:(NSBackingStoreType)bufferingType
{
    // TODO: Need to implement
}

- (NSBackingStoreType)backingType
{
    // TODO: Need to implement
}

- (void)setLevel:(NSInteger)newLevel
{
    // TODO: Need to implement
}

- (NSInteger)level
{
    // TODO: Need to implement
}

- (void)setDepthLimit:(NSWindowDepth)limit
{
    // TODO: Need to implement
}

- (NSWindowDepth)depthLimit
{
    // TODO: Need to implement
}

- (void)setDynamicDepthLimit:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)hasDynamicDepthLimit
{
    // TODO: Need to implement
}

- (NSScreen *)screen
{
    // TODO: Need to implement
}

- (NSScreen *)deepestScreen
{
    // TODO: Need to implement
}

- (BOOL)canStoreColor
{
    // TODO: Need to implement
}

- (void)setHasShadow:(BOOL)hasShadow
{
    // TODO: Need to implement
}

- (BOOL)hasShadow
{
    // TODO: Need to implement
}

- (void)invalidateShadow
{
    // TODO: Need to implement
}


- (void)setAlphaValue:(CGFloat)windowAlpha
{
    // TODO: Need to implement
}

- (CGFloat)alphaValue
{
    // TODO: Need to implement
}

- (void)setOpaque:(BOOL)isOpaque
{
    // TODO: Need to implement
}

- (BOOL)isOpaque
{
    // TODO: Need to implement
}


- (void)cacheImageInRect:(NSRect)aRect
{
    // TODO: Need to implement
}

- (void)restoreCachedImage
{
    // TODO: Need to implement
}

- (void)discardCachedImage
{
    // TODO: Need to implement
}


- (NSSize)minSize
{
    // TODO: Need to implement
}

- (NSSize)maxSize
{
    // TODO: Need to implement
}

- (void)setMinSize:(NSSize)size
{
    // TODO: Need to implement
}

- (void)setMaxSize:(NSSize)size
{
    // TODO: Need to implement
}

- (NSSize)contentMinSize
{
    // TODO: Need to implement
}

- (NSSize)contentMaxSize
{
    // TODO: Need to implement
}

- (void)setContentMinSize:(NSSize)size
{
    // TODO: Need to implement
}

- (void)setContentMaxSize:(NSSize)size
{
    // TODO: Need to implement
}

- (NSEvent *)nextEventMatchingMask:(NSUInteger)mask
{
    // TODO: Need to implement
}

- (NSEvent *)nextEventMatchingMask:(NSUInteger)mask untilDate:(NSDate *)expiration inMode:(NSString *)mode dequeue:(BOOL)deqFlag
{
    // TODO: Need to implement
}

- (void)discardEventsMatchingMask:(NSUInteger)mask beforeEvent:(NSEvent *)lastEvent
{
    // TODO: Need to implement
}

- (void)postEvent:(NSEvent *)event atStart:(BOOL)flag
{
    // TODO: Need to implement
}

- (NSEvent *)currentEvent
{
    // TODO: Need to implement
}

- (void)setAcceptsMouseMovedEvents:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)acceptsMouseMovedEvents
{
    // TODO: Need to implement
}

- (void)setIgnoresMouseEvents:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)ignoresMouseEvents
{
    // TODO: Need to implement
}

- (void)sendEvent:(NSEvent *)theEvent
{
    // TODO: Need to implement
}

- (NSPoint)mouseLocationOutsideOfEventStream
{
    // TODO: Need to implement
}

+ (void)menuChanged:(NSMenu *)menu
{
    // TODO: Need to implement
}


- (id)windowController
{
    // TODO: Need to implement
}

- (void)setWindowController:(NSWindowController *)windowController
{
    // TODO: Need to implement
}


- (BOOL)isSheet
{
    // TODO: Need to implement
}

- (NSWindow *)attachedSheet
{
    // TODO: Need to implement
}


+ (NSButton *)standardWindowButton:(NSWindowButton)b forStyleMask:(NSUInteger)styleMask
{
    // TODO: Need to implement
}

- (NSButton *)standardWindowButton:(NSWindowButton)b
{
    // TODO: Need to implement
}

- (void)addChildWindow:(NSWindow *)childWin ordered:(NSWindowOrderingMode)place
{
    // TODO: Need to implement
}

- (void)removeChildWindow:(NSWindow *)childWin
{
    // TODO: Need to implement
}

- (NSArray *)childWindows
{
    // TODO: Need to implement
}


- (NSWindow *)parentWindow
{
    // TODO: Need to implement
}

- (void)setParentWindow:(NSWindow *)window
{
    // TODO: Need to implement
}

- (NSGraphicsContext *)graphicsContext
{
    // TODO: Need to implement
}

@end

@implementation NSWindow (NSKeyboardUI)

- (void)setInitialFirstResponder:(NSView *)view
{
    // TODO: Need to implement
}

- (NSView *)initialFirstResponder
{
    // TODO: Need to implement
}

- (void)selectNextKeyView:(id)sender
{
    // TODO: Need to implement
}

- (void)selectPreviousKeyView:(id)sender
{
    // TODO: Need to implement
}

- (void)selectKeyViewFollowingView:(NSView *)aView
{
    // TODO: Need to implement
}

- (void)selectKeyViewPrecedingView:(NSView *)aView
{
    // TODO: Need to implement
}

- (NSSelectionDirection)keyViewSelectionDirection
{
    // TODO: Need to implement
}

- (void)setDefaultButtonCell:(NSButtonCell *)defButt
{
    // TODO: Need to implement
}

- (NSButtonCell *)defaultButtonCell
{
    // TODO: Need to implement
}

- (void)disableKeyEquivalentForDefaultButtonCell
{
    // TODO: Need to implement
}

- (void)enableKeyEquivalentForDefaultButtonCell
{
    // TODO: Need to implement
}

- (void)setAutorecalculatesKeyViewLoop:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)autorecalculatesKeyViewLoop
{
    // TODO: Need to implement
}

- (void)recalculateKeyViewLoop
{
    // TODO: Need to implement
}

@end

@implementation NSWindow (NSToolbarSupport)

- (void)setToolbar:(NSToolbar*)toolbar
{
    // TODO: Need to implement
}

- (NSToolbar *)toolbar
{
    // TODO: Need to implement
}

- (void)toggleToolbarShown:(id)sender
{
    // TODO: Need to implement
}

- (void)runToolbarCustomizationPalette:(id)sender
{
    // TODO: Need to implement
}

- (void)setShowsToolbarButton:(BOOL)show
{
    // TODO: Need to implement
}

- (BOOL)showsToolbarButton
{
    // TODO: Need to implement
}

@end


@implementation NSWindow (NSDrag)

- (void)dragImage:(NSImage *)anImage at:(NSPoint)baseLocation offset:(NSSize)initialOffset event:(NSEvent *)event pasteboard:(NSPasteboard *)pboard source:(id)sourceObj slideBack:(BOOL)slideFlag
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


NSString *NSWindowDidBecomeKeyNotification;
NSString *NSWindowDidBecomeMainNotification;
NSString *NSWindowDidChangeScreenNotification;
NSString *NSWindowDidDeminiaturizeNotification;
NSString *NSWindowDidExposeNotification;
NSString *NSWindowDidMiniaturizeNotification;
NSString *NSWindowDidMoveNotification;
NSString *NSWindowDidResignKeyNotification;
NSString *NSWindowDidResignMainNotification;
NSString *NSWindowDidResizeNotification;
NSString *NSWindowDidUpdateNotification;
NSString *NSWindowWillCloseNotification;
NSString *NSWindowWillMiniaturizeNotification;
NSString *NSWindowWillMoveNotification;
NSString *NSWindowWillBeginSheetNotification;
NSString *NSWindowDidEndSheetNotification;
NSString *NSWindowDidChangeScreenProfileNotification;