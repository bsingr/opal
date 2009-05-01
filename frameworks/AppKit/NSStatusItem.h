#import <Foundation/NSObject.h>
#import <Foundation/NSGeometry.h>

@class NSAttributedString, NSImage, NSMenu, NSStatusBar, NSString, NSView, NSWindow;


@interface NSStatusItem : NSObject
{
}

- (NSStatusBar* )statusBar;

- (CGFloat)length;
- (void)setLength:(CGFloat)length;

@end


@interface NSStatusItem (NSStatusItemCommon)

- (SEL)action;
- (void)setAction:(SEL)action;

- (SEL)doubleAction;
- (void)setDoubleAction:(SEL)action;

- (id)target;
- (void)setTarget:(id)target;

- (NSString* )title;
- (void)setTitle:(NSString*)title;

- (NSAttributedString* )attributedTitle;
- (void)setAttributedTitle:(NSAttributedString*)title;

- (NSImage* )image;
- (void)setImage:(NSImage*)image;

- (NSImage *)alternateImage;
- (void)setAlternateImage:(NSImage*)image;

- (NSMenu* )menu;
- (void)setMenu:(NSMenu*)menu;

- (BOOL)isEnabled;
- (void)setEnabled:(BOOL)enabled;

- (NSString* )toolTip;
- (void)setToolTip:(NSString*)toolTip;

- (void)setHighlightMode:(BOOL)highlightMode;
- (BOOL)highlightMode;

- (NSInteger)sendActionOn:(NSInteger)mask;

- (void)popUpStatusItemMenu:(NSMenu*)menu;
- (void)drawStatusBarBackgroundInRect:(NSRect)rect withHighlight:(BOOL)highlight;

@end


@interface NSStatusItem (NSStatusItemView)

- (NSView* )view;
- (void)setView:(NSView*)view;

@end
