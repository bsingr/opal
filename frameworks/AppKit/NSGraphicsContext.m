// 
//  NSGraphicsContext.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSGraphicsContext.h"

id NSGraphicsContextCurrent = nil;

@implementation NSGraphicsContext

+ (NSGraphicsContext *)graphicsContextWithGraphicsPort:(void *)graphicsPort flipped:(BOOL)initialFlippedState
{
    return [[NSGraphicsContext alloc] initWithGraphicsPort:graphicsPort flipped:initialFlippedState];
}

- (NSGraphicsContext *)initWithGraphicsPort:(void *)graphicsPort flipped:(BOOL)initialFlippedState
{
    [self init];
    
    if (self) {
        _graphicsPort = graphicsPort;
    }
    
    return self;
}

- (void *)graphicsPort
{
    return _graphicsPort;
}

+ (NSGraphicsContext *)currentContext
{
    // return NSGraphicsContextCurrent;
}

+ (void)setCurrentContext:(NSGraphicsContext *)context
{
    // NSGraphicsContextCurrent = context;
}

+ (void)saveGraphicsState {
    id ctx = [[NSGraphicsContext currentContext] graphicsPort];
    // ctx.save();
}

+ (void)restoreGraphicsState {
    id ctx = [[NSGraphicsContext currentContext] graphicsPort];
    // ctx.restore();
}

@end
