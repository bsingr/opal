// 
//  NSPanel.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSPanel.h"

@implementation NSPanel

- (id)initWithContentRect:(NSRect)contentRect styleMask:(NSUInteger)windowStyle backing:(int)bufferingType defer:(BOOL)deferCreation
{
    [super initWithContentRect:contentRect styleMask:windowStyle backing:bufferingType defer:deferCreation];
    return self;
}

- (void)becomeKeyWindow
{
    if ([[NSApplication sharedApplication] keyWindow])
        [[[NSApplication sharedApplication] keyWindow] resignKeyWindow];
    
    _keyWindow = YES;
    [self setLevel:(NSFloatingWindowLevel + 5)];
}

- (void)resignKeyWindow
{
    _keyWindow = NO;
    [self setLevel:NSFloatingWindowLevel];
}

- (void)makeKeyAndOrderFront:(id)sender
{
    // Cannot become main window, only key window
    [self makeKeyWindow];
}

- (BOOL)canBecomeMainWindow
{
    // Cannot become main window
    return NO;
}

- (void)drawRect:(NSRect)dirtyRect
{   
    // Window background
    [[NSColor colorWithCalibratedRed:0 green:0 blue:0 alpha:0.7] set];
    [NSBezierPath fillRect:NSMakeRect(0.5, 0.5, _frame.size.width - 1, _frame.size.height - 1.5 - NSPanelUtilityTitleBarSize)];
    
    // Window frame
    [[NSColor colorWithCalibratedRed:0.6 green:0.6 blue:0.6 alpha:0.9] set];
    [NSBezierPath strokeRect:NSMakeRect(0.5, 0.5, _frame.size.width - 1, _frame.size.height - 1)];
    
    //Titlebar bottom border
    [[NSColor colorWithCalibratedRed:0.351 green:0.351 blue:0.351 alpha:0.7] set];
    NSBezierPath *titlebarBorder = [NSBezierPath bezierPath];
    [titlebarBorder setLineWidth:1];
    [titlebarBorder moveToPoint:NSMakePoint (0.5 + NSWindowBorderSize, _frame.size.height - 1.5 - NSPanelUtilityTitleBarSize)];
    [titlebarBorder lineToPoint:NSMakePoint (_frame.size.width - NSWindowBorderSize - 0.5, _frame.size.height - 1.5 - NSPanelUtilityTitleBarSize)];
    [titlebarBorder stroke];
    
    // Titlebar background
    NSColor *titlebarBackground1 = [NSColor colorWithCalibratedRed:0.4 green:0.4 blue:0.4 alpha:0.8];
    NSColor *titlebarBackground2 = [NSColor colorWithCalibratedRed:0.2 green:0.2 blue:0.2 alpha:0.8];
    NSGradient *titlebarGradient = [[NSGradient alloc] initWithStartingColor:titlebarBackground1 endingColor:titlebarBackground2];
    [titlebarGradient drawInRect:NSMakeRect (NSWindowBorderSize, _frame.size.height - 1.0 - NSPanelUtilityTitleBarSize, _frame.size.width - NSWindowBorderSize - 1.0, NSPanelUtilityTitleBarSize) angle:0];
    
    // Draw window title
    if (_title) {
        [NSGraphicsContext saveGraphicsState];
        // Shaodw for title
        NSShadow *titleShadow = [[NSShadow alloc] init];
        [titleShadow setShadowOffset:NSMakeSize (1,1)];
        [titleShadow setShadowBlurRadius:1];
        [titleShadow setShadowColor:[NSColor colorWithCalibratedRed:0 green:0 blue:0 alpha:0.5]];
        [titleShadow set];
        
        [[NSColor colorWithCalibratedRed:0.9 green:0.9 blue:0.9 alpha:1.0] set];
        [[NSFont titleBarFontOfSize:[NSFont smallSystemFontSize]] set];
        NSUInteger theWidth = [_title sizeWithAttributes:nil].width;
        NSUInteger xTitleOffset = _frame.size.width - theWidth;
        NSUInteger actualTitleOffset = xTitleOffset / 2;
        [_title drawWithRect:NSMakeRect(actualTitleOffset, _frame.size.height - 15, 40, 0) options:nil attributes: nil];
        [NSGraphicsContext restoreGraphicsState];
    }    
}

- (NSRect)frameRectForContentRect:(NSRect)windowContent
{    
    // When the content view is known, work out the window position.
    // Takes into account titlebar, shadow, border.
    NSUInteger xOffset = 0;
    NSUInteger yOffset = 0;
    NSUInteger widthOffset = 0;
    NSUInteger heightOffset = 0;
    
    // Account for borders
    xOffset = xOffset - NSWindowBorderSize;
    yOffset = yOffset - NSWindowBorderSize;
    widthOffset = widthOffset + (2 * NSWindowBorderSize);
    heightOffset = heightOffset + (2 * NSWindowBorderSize);
    
    // Account for titlebar
    heightOffset = heightOffset + NSPanelUtilityTitleBarSize;
    
    NSRect frameRect = NSMakeRect (windowContent.origin.x + xOffset, 
                                   windowContent.origin.y + yOffset, 
                                   windowContent.size.width + widthOffset, 
                                   windowContent.size.height + heightOffset);
    
    return frameRect;
}


- (BOOL)canBecomeMainWindow {
	return NO;
}

@end

