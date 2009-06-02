// 
//  NSMenuBar.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSMenuBar.h"


@implementation NSMenuBar

- (id)initWithContentRect:(NSRect)contentRect styleMask:(NSUInteger)windowStyle backing:(int)bufferingType defer:(BOOL)deferCreation
{
	[self init];
    
    if (self) {
        [self setFrame:contentRect display:YES];
        
        _styleMask = windowStyle;
        
        _resizable = NO;
        _firstResponder = self;
        //_nextResponder = [NSApplication sharedApplication];
        _movableByWindowBackground = YES;
        
        _applicationTitleName = @"Hello :D";
        
        [self setHasShadow:YES];
        [self setVisible:YES];
        
        [self setContentView:[[NSView alloc] initWithFrame:[self contentRectForFrameRect:contentRect]]];
        
        [self setFrame:contentRect display:YES];
        
        NSWindowServerCreateCanvas(self);
        NSWindowServerAddCanvas (_gCanvas);
        
    }
    
	return self;
}

- (void)setApplicationTitleName:(NSString *)aString
{
    _applicationTitleName = aString;
    [self setNeedsDisplay:YES];
}

- (NSString *)applicationTitleName
{
    return _applicationTitleName;
}

- (void)drawRect:(NSRect)rect
{
    NSColor *backgroundColorTop = [NSColor colorWithCalibratedRed:1 green:1 blue:1 alpha:1.0];
    NSColor *backgroundColorBottom = [NSColor colorWithCalibratedRed:0.902 green:0.902 blue:0.902 alpha:1.0];
    
    NSGradient *backgroundGradient = [[NSGradient alloc] initWithStartingColor:backgroundColorTop endingColor:backgroundColorBottom];
    [backgroundGradient drawInRect:rect angle:0];
    
    [[NSColor colorWithCalibratedRed:0.702 green:0.702 blue:0.702 alpha:1.0] set];
    NSBezierPath *menuBarBottom = [NSBezierPath bezierPath];
    
    [menuBarBottom moveToPoint:NSMakePoint (rect.origin.x, rect.origin.y + 0.5)];
    [menuBarBottom lineToPoint:NSMakePoint (rect.origin.x + rect.size.width, rect.origin.y + 0.5)];
    [menuBarBottom stroke];
    
    // Draw window title
    if (_applicationTitleName) {
        [NSGraphicsContext saveGraphicsState];
        // Shaodw for title
        NSShadow *titleShadow = [[NSShadow alloc] init];
        [titleShadow setShadowOffset:NSMakeSize (1,1)];
        [titleShadow setShadowBlurRadius:1];
        [titleShadow setShadowColor:[NSColor colorWithCalibratedRed:1 green:1 blue:1 alpha:0.5]];
        [titleShadow set];
        
        [[NSColor controlTextColor] set];
        [[NSFont titleBarFontOfSize:([NSFont systemFontSize] + 1)] set];
        NSUInteger theWidth = [_applicationTitleName sizeWithAttributes:nil].width;
        NSUInteger xTitleOffset = _frame.size.width - theWidth;
        NSUInteger actualTitleOffset = xTitleOffset / 2;
        [_applicationTitleName drawWithRect:NSMakeRect(actualTitleOffset, _frame.size.height - 18, 40, 0) options:nil attributes: nil];
        [NSGraphicsContext restoreGraphicsState];
    }
    
}

- (void)setMainMenuView:(NSMenuView *)aView
{
    _mainMenuView = aView;
    [[self contentView] addSubview:aView];
    [_mainMenuView setHorizontal:YES];
    [_mainMenuView sizeToFit];
}

- (NSMenuView *)mainMenuView
{
    return _mainMenuView;
}

- (void)setApplicationTitleView:(NSApplicationTitleView *)aView
{
    _applicationTitleView = aView;
    [[self contentView] addSubview:aView];
}

- (NSApplicationTitleView *)applicationTitleView
{
    return _applicationTitleView;
}

- (void)setStatusBarView:(NSStatusBarView *)aView
{
    _statusBarView = aView;
    [[self contentView] addSubview:aView];
}

- (NSStatusBarView *)statusBarView
{
    return _statusBarView;
}

- (void)becomeKeyWindow
{
    if ([[NSApplication sharedApplication] keyWindow])
        [[[NSApplication sharedApplication] keyWindow] resignKeyWindow];
    
    _keyWindow = YES;
}

- (void)resignKeyWindow
{
    _keyWindow = NO;
}

- (void)becomeMainWindow
{
    if ([[NSApplication sharedApplication] mainWindow])
        [[[NSApplication sharedApplication] mainWindow] resignMainWindow];
    
    _mainWindow = YES;
}

- (void)resignMainWindow
{
    _mainWindow = NO;
}

@end


