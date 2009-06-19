// 
//  NSGradient.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSGradient.h"


@implementation NSGradient

- (id)initWithStartingColor:(NSColor *)startingColor endingColor:(NSColor *)endingColor
{
    NSMutableArray *theArray = [NSMutableArray arrayWithCapacity:2];
    [theArray addObject:startingColor];
    [theArray addObject:endingColor];
    return [self initWithColors:theArray];
}

- (id)initWithColors:(NSArray *)colorArray
{
    [self init];
    if (self) {
        _theColors = colorArray;
    }
    return self;
}

- (void)drawInRect:(NSRect)rect angle:(int)angle
{
    // id *ctx = [[NSGraphicsContext currentContext] graphicsPort];
    //     int newY = [[NSGraphicsContext currentContext] graphicsPort].canvas.height - rect.origin.y - rect.size.height;
    //     
    //     id linearGradient = ctx.createLinearGradient(rect.origin.x, newY, rect.origin.x, rect.size.height + newY);
    //     linearGradient.addColorStop(0, [[theColors objectAtIndex:0] rgbaString]);
    //     linearGradient.addColorStop(1, [[theColors objectAtIndex:1] rgbaString]);
    //     
    //     ctx.fillStyle = linearGradient;
    //     ctx.fillRect (rect.origin.x, newY, rect.size.width, rect.size.height);
}

- (void)drawInBezierPath:(NSBezierPath *)path angle:(int)angle
{
    // id ctx = [[NSGraphicsContext currentContext] graphicsPort];
    //     id linearGradient = ctx.createLinearGradient(0,0,0,35);
    //     linearGradient.addColorStop(0, [[theColors objectAtIndex:0] rgbaString]);
    //     linearGradient.addColorStop(1, [[theColors objectAtIndex:1] rgbaString]);
    //     ctx.fillStyle = linearGradient;
    //     ctx.fill();
}

@end

