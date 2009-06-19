// 
//  NSScreen.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSScreen.h"

@implementation NSScreen

+ (NSScreen *)mainScreen
{
    NSScreen *mainScreen = [[NSScreen alloc] init];
    return mainScreen;
}

- (NSRect)frame
{
    return NSMakeRect(0,0,100,100);
}

- (NSRect)visibleFrame
{
    return NSMakeRect(0,0,100,100);
}

@end

