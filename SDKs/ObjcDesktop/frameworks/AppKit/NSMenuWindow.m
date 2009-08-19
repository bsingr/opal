// 
//  NSMenuWindow.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 
  
#import "NSMenuWindow.h"


@implementation NSMenuWindow

- (void)drawRect:(NSRect)aRect
{
  [[NSColor colorWithCalibratedRed:1 green:1 blue:1 alpha:0.95] set];
  
  [NSBezierPath fillRect:aRect];
  
  [[NSColor colorWithCalibratedRed:0.698 green:0.698 blue:0.698 alpha:0.95] set];
  [NSBezierPath strokeRect:NSMakeRect(aRect.origin.x + 0.5, aRect.origin.y + 0.5, aRect.origin.x + aRect.size.width - 1, aRect.origin.y + aRect.size.height - 1)];
}

- (BOOL)isReleasedWhenClosed
{
	return YES;
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

