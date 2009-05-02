// 
//  NSMenuItemCell.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <AppKit/NSButtonCell.h>
#import <AppKit/NSMenu.h>
#import <AppKit/NSMenuItem.h>

@interface NSMenuItemCell : NSButtonCell
{
}

- (void)setMenuItem:(NSMenuItem *)item;
- (NSMenuItem *)menuItem;

- (void)setMenuView:(NSMenuView *)menuView;
- (NSMenuView *)menuView;

- (void)setNeedsSizing:(BOOL)flag;
- (BOOL)needsSizing;
- (void)calcSize;

- (void)setNeedsDisplay:(BOOL)flag;
- (BOOL)needsDisplay;

- (CGFloat)stateImageWidth;
- (CGFloat)imageWidth;
- (CGFloat)titleWidth;
- (CGFloat)keyEquivalentWidth;

- (NSRect)stateImageRectForBounds:(NSRect)cellFrame;
- (NSRect)titleRectForBounds:(NSRect)cellFrame;
- (NSRect)keyEquivalentRectForBounds:(NSRect)cellFrame;

- (void)drawSeparatorItemWithFrame:(NSRect)cellFrame inView:(NSView *)controlView;
- (void)drawStateImageWithFrame:(NSRect)cellFrame inView:(NSView *)controlView;
- (void)drawImageWithFrame:(NSRect)cellFrame inView:(NSView *)controlView;
- (void)drawTitleWithFrame:(NSRect)cellFrame inView:(NSView *)controlView;
- (void)drawKeyEquivalentWithFrame:(NSRect)cellFrame inView:(NSView *)controlView;
- (void)drawBorderAndBackgroundWithFrame:(NSRect)cellFrame inView:(NSView *)controlView;

- (NSInteger)tag;

@end