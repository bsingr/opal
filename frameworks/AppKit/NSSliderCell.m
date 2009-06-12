// 
//  NSSliderCell.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-11.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSSliderCell.h"

@implementation NSSliderCell

+ (void)load
{
    CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSSliderHorizontalLeft", @"png", @"");
    CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSSliderHorizontalMiddle", @"png", @"");
    CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSSliderHorizontalRight", @"png", @"");
    CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSSliderHorizontalKnobNormal", @"png", @"");
}

- (void)drawWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
    CGContextRef c = [[NSGraphicsContext currentContext] graphicsPort];
    CGContextSaveGState(c);
    
    if(!_isEnabled)
        CGContextSetAlpha(c, 0.8);
        
    CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSSliderHorizontalLeft.png");
    CGContextDrawImage(c, CGRectMake(0,8,5,5), theImage);
    CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSSliderHorizontalMiddle.png");
    CGContextDrawImage(c, CGRectMake(5,8,cellFrame.size.width - 10,5), theImage);
    CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSSliderHorizontalRight.png");
    CGContextDrawImage(c, CGRectMake(cellFrame.size.width-5,8,5,5), theImage);

    CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSSliderHorizontalKnobNormal.png");
    CGContextDrawImage(c, CGRectMake(20,2,17,17), theImage);
    
    CGContextRestoreGState(c);
}

@end
