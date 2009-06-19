// 
//  NSScreen.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>
#import <Foundation/NSGeometry.h>
#import <AppKit/NSGraphics.h>

@class NSArray;

@interface NSScreen : NSObject
{
}

+ (NSScreen *)mainScreen;

- (NSRect)frame;
- (NSRect)visibleFrame;

@end
