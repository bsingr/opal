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
    
    NSLog(_windowRect);
    
    NSWindow *theWindow = [[theClass alloc] initWithContentRect:NSMakeRect(300,300,300,300) styleMask:23 backing:1 defer:NO];
    return theWindow;
}

@end