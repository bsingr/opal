// 
//  NSColorWell.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <AppKit/NSControl.h>
#import <AppKit/NSBezierPath.h>

@interface NSColorWell : NSControl
{
}

- (void)deactivate;
- (void)activate:(BOOL)exclusive;
- (BOOL)isActive;

- (void)drawWellInside:(NSRect)insideRect;

- (BOOL)isBordered;
- (void)setBordered:(BOOL)flag;

- (void)takeColorFrom:(id)sender;
- (void)setColor:(NSColor *)color;
- (NSColor *)color;

@end