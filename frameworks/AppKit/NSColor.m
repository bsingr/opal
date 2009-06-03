// 
//  NSColor.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 


#import "NSColor.h"

@implementation NSColor

- (id)initWithCalibratedRed:(void)red green:(void)green blue:(void)blue alpha:(void)alpha
{
    [self init];
    
    if (self) {
        _red = red;
        _green = green;
        _blue = blue;
        _alpha = alpha;
    }
    
    return self;
}

+ (NSColor *)colorWithCalibratedRed:(void)red green:(void)green blue:(void)blue alpha:(void)alpha
{
    return [[NSColor alloc] initWithCalibratedRed:red green:green blue:blue alpha:alpha];
}

+ (NSColor *)blackColor
{
    return [NSColor colorWithCalibratedRed:0.0 green:0.0 blue:0.0 alpha:1.0];
}

+ (NSColor *)blueColor
{
    return [NSColor colorWithCalibratedRed:0.0 green:0.0 blue:1.0 alpha:1.0];    
}

+ (NSColor *)brownColor
{
    return [NSColor colorWithCalibratedRed:0.6 green:0.4 blue:0.2 alpha:1.0];
}

+ (NSColor *)clearColor
{
    return [NSColor colorWithCalibratedRed:0.0 green:0.0 blue:0.0 alpha:0.0];
}

+ (NSColor *)cyanColor
{
    return [NSColor colorWithCalibratedRed:0.0 green:1.0 blue:1.0 alpha:1.0];
}

+ (NSColor *)darkGrayColor
{
    return [NSColor colorWithCalibratedRed:0.33 green:0.33 blue:0.33 alpha:1.0];
}

+ (NSColor *)grayColor
{
    return [NSColor colorWithCalibratedRed:0.5 green:0.5 blue:0.5 alpha:1.0];
}

+ (NSColor *)greenColor
{
    return [NSColor colorWithCalibratedRed:0.0 green:1.0 blue:0.0 alpha:1.0];
}

+ (NSColor *)lightGrayColor
{
    return [NSColor colorWithCalibratedRed:0.66 green:0.66 blue:0.66 alpha:1.0];
}

+ (NSColor *)magentaColor
{
    return [NSColor colorWithCalibratedRed:1.0 green:0.0 blue:1.0 alpha:1.0];
}

+ (NSColor *)orangeColor
{
    return [NSColor colorWithCalibratedRed:1.0 green:0.5 blue:0.0 alpha:1.0];
}

+ (NSColor *)purpleColor
{
    return [NSColor colorWithCalibratedRed:0.5 green:0.0 blue:0.5 alpha:1.0];
}

+ (NSColor *)redColor
{
    return [NSColor colorWithCalibratedRed:1.0 green:0.0 blue:0.0 alpha:1.0];
}

+ (NSColor *)whiteColor
{
    return [NSColor colorWithCalibratedRed:1.0 green:1.0 blue:1.0 alpha:1.0];
}

+ (NSColor *)yellowColor
{
    return [NSColor colorWithCalibratedRed:1.0 green:1.0 blue:0.0 alpha:1.0];
}

+ (NSColor *)controlTextColor {
    return [NSColor colorWithCalibratedRed:0.251 green:0.278 blue:0.302 alpha:1.0];
}

+ (NSColor *)disabledControlTextColor {
    return [NSColor colorWithCalibratedRed:0.6 green:0.6 blue:0.6 alpha:1.0];
}

+ (NSColor *)textColor {
    return [NSColor colorWithCalibratedRed:0.251 green:0.251 blue:0.251 alpha:1.0];
}

+ (NSColor *)selectedTextColor {
    return [NSColor colorWithCalibratedRed:1.0 green:1.0 blue:1.0 alpha:1.0];
}

+ (NSColor *)windowBackgroundColor {
    return [NSColor colorWithCalibratedRed:0.91 green:0.91 blue:0.91 alpha:1.0];
}

+ (NSColor *)windowFrameColor {
    return [NSColor colorWithCalibratedRed:0.533 green:0.533 blue:0.533 alpha:1.0];
}

+ (NSColor *)windowFrameTextColor {
    return [NSColor colorWithCalibratedRed:0.01 green:0.01 blue:0.01 alpha:1.0];
}

+ (NSArray *)controlAlternatingRowBackgroundColors {
    NSColor *firstColor = [NSColor colorWithCalibratedRed:0.945 green:0.961 blue:0.980 alpha:1.0];
    NSColor *secondColor = [NSColor colorWithCalibratedRed:1.00 green:1.00 blue:1.00 alpha:1.0];
    NSArray *colors = [NSMutableArray arrayWithCapacity:0];
    [colors addObject:firstColor];
    [colors addObject:secondColor];
    return colors;
}

- (void)set
{
    [self setFill];
    [self setStroke];
}

- (void)setFill
{
    id ctx = [[NSGraphicsContext currentContext] graphicsPort];
    ctx.fillStyle = [self rgbaString];
}

- (void)setStroke
{
    id ctx = [[NSGraphicsContext currentContext] graphicsPort];
    ctx.strokeStyle = [self rgbaString];
}

- (NSString *)rgbString {
    int redComponent = _red * 255;
    int blueComponent = _blue * 255;
    int greenComponent = _green * 255;
    return @"rgb";
}

- (NSString *)rgbaString {
    int redComponent = _red * 255;
    int blueComponent = _blue * 255;
    int greenComponent = _green * 255;
    return @"rgb";
}

@end
