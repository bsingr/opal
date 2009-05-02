// 
//  NSMenuView.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <AppKit/NSView.h>
#import <AppKit/NSMenu.h>
#import <AppKit/NSMenuItem.h>
#import <AppKit/NSMenuItemCell.h>

@class NSScreen;

@interface NSMenuView : NSView
{
}

+ (CGFloat)menuBarHeight;

- (id)initWithFrame:(NSRect)frame;
- (id)initAsTearOff;

- (void)setMenu:(NSMenu *)menu;
- (NSMenu *)menu;

- (void)itemChanged:(NSNotification *)notification;
- (void)itemAdded:(NSNotification *)notification;
- (void)itemRemoved:(NSNotification *)notification;

- (void)update;

- (void)setHorizontal:(BOOL)flag;
- (BOOL)isHorizontal;

- (void)setFont:(NSFont *)font;
- (NSFont *)font;

- (NSRect)innerRect;
- (NSRect)rectOfItemAtIndex:(NSInteger)index;
- (NSInteger)indexOfItemAtPoint:(NSPoint)point;
- (void)setNeedsDisplayForItemAtIndex:(NSInteger)index;

- (void)setHighlightedItemIndex:(NSInteger)index;
- (NSInteger)highlightedItemIndex;

- (CGFloat)stateImageOffset;
- (CGFloat)stateImageWidth;
- (CGFloat)imageAndTitleOffset;
- (CGFloat)imageAndTitleWidth;
- (CGFloat)keyEquivalentOffset;
- (CGFloat)keyEquivalentWidth;

- (void)setMenuItemCell:(NSMenuItemCell *)cell forItemAtIndex:(NSInteger)index;
- (NSMenuItemCell *)menuItemCellForItemAtIndex:(NSInteger)index;

- (NSMenuView *)attachedMenuView;

- (void)setNeedsSizing:(BOOL)flag;
- (BOOL)needsSizing;

- (void)sizeToFit;
- (NSMenu *)attachedMenu;
- (BOOL)isAttached;
- (BOOL)isTornOff;
- (NSPoint)locationForSubmenu:(NSMenu *)aSubmenu;

- (void)setWindowFrameForAttachingToRect:(NSRect)screenRect onScreen:(NSScreen *)screen preferredEdge:(NSRectEdge)edge popUpSelectedItem:(NSInteger)selectedItemIndex;
- (void)detachSubmenu;
- (void)attachSubmenuForItemAtIndex:(NSInteger)index;

- (void)performActionWithHighlightingForItemAtIndex:(NSInteger)index;

- (BOOL)trackWithEvent:(NSEvent *)event;

- (CGFloat)horizontalEdgePadding;
- (void)setHorizontalEdgePadding:(CGFloat)pad;

@end