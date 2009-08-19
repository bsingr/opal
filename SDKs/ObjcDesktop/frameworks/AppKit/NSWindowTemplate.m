// 
//  NSWindowTemplate.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-08.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#include "NSWindowTemplate.h"

@implementation NSWindowTemplate

- (id)initWithCoder:(NSCoder *)aCoder
{
  _maxSize = [aCoder decodeSizeForKey:@"NSMaxSize"];
  _minSize = [aCoder decodeSizeForKey:@"NSMinSize"];
  _screenRect = [aCoder decodeRectForKey:@"NSScreenRect"];
  
  _viewClass = [aCoder decodeObjectForKey:@"NSViewClass"];
  _wtFlags = [aCoder decodeIntForKey:@"NSWTFlags"];
  _windowBacking = [aCoder decodeIntForKey:@"NSWindowBacking"];
  _windowClass = [aCoder decodeObjectForKey:@"NSWindowClass"];
  _windowRect = [aCoder decodeRectForKey:@"NSWindowRect"];
  
  _windowTitle = [aCoder decodeObjectForKey:@"NSWindowTitle"];
  _windowView = [aCoder decodeObjectForKey:@"NSWindowView"];
  
  _styleMask = [aCoder decodeIntForKey:@"NSWindowStyleMask"];
  _windowAutosave = [aCoder decodeObjectForKey:@"NSFrameAutosaveName"];
  
  return self;
}

- (id)awakeAfterUsingCoder:(NSCoder *)aCoder
{
  Class theClass = NSClassFromString(_windowClass);   
  
  NSWindow *theWindow = [[theClass alloc] initWithContentRect:_windowRect styleMask:_styleMask backing:1 defer:NO];
  
  [theWindow setContentView:_windowView];
  
  return theWindow;
}

@end