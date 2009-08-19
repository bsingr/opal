// 
//  NSGraphicsContext.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <CoreGraphics/CoreGraphics.h>
#import <AppKit/NSGraphics.h>
#import <Foundation/NSGeometry.h>
#import <Foundation/NSObject.h>

@class NSDictionary, NSString, NSWindow, NSBitmapImageRep;

extern id NSGraphicsContextCurrent;

@interface NSGraphicsContext : NSObject
{
  CGContextRef  _graphicsPort;
}

+ (NSGraphicsContext *)graphicsContextWithAttributes:(NSDictionary *)attributes;

+ (NSGraphicsContext *)graphicsContextWithWindow:(NSWindow *)window;

// Added for Vienaa: more efficient than drawing all views to a window.
+ (NSGraphicsContext *)graphicsContextWithWindow:(NSView *)view;

+ (NSGraphicsContext *)graphicsContextWithBitmapImageRep:(NSBitmapImageRep *)bitmapRep;

+ (NSGraphicsContext *)graphicsContextWithGraphicsPort:(void *)graphicsPort flipped:(BOOL)initialFlippedState;

+ (NSGraphicsContext *)currentContext;
+ (void)setCurrentContext:(NSGraphicsContext *)context;

+ (BOOL)currentContextDrawingToScreen;

+ (void)saveGraphicsState;

+ (void)restoreGraphicsState;

+ (void)setGraphicsState:(NSInteger)gState;

- (NSDictionary *)attributes;

- (BOOL)isDrawingToScreen;

- (void)saveGraphicsState;
- (void)restoreGraphicsState;

- (void)flushGraphics;

- (id)focusStack;
- (void)setFocusStack:(id)stack;

- (void *)graphicsPort;

- (BOOL)isFlipped;

@end