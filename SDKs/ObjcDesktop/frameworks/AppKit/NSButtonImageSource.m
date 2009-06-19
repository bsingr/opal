// 
//  NSButtonImageSource.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-11.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSButtonImageSource.h"

@implementation NSButtonImageSource

- (id)initWithCoder:(NSCoder *)aCoder
{
    _imageName = [aCoder decodeObjectForKey:@"NSImageName"];
    return self;
}

- (NSImage *)normalImage
{
    id theImage = CGImageCreateWithURLDataProvider(@"Resources/" + _imageName + @"Normal.png");
    return theImage;
    // return [NSImage imageNamed:theImage];
}

- (NSImage *)alternateImage
{
    id theImage = CGImageCreateWithURLDataProvider(@"Resources/" + _imageName + @"Alternate.png");
    return theImage;
    // return [NSImage imageNamed:theImage];
}

@end