// 
//  NSStatusBar.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>
#import <Foundation/NSGeometry.h>

@class NSColor, NSFont, NSStatusItem, NSMutableArray;

@interface NSStatusBar : NSObject
{
}

+ (NSStatusBar*)systemStatusBar;

- (NSStatusItem*)statusItemWithLength:(CGFloat)length;
- (void)removeStatusItem:(NSStatusItem*)item;

- (BOOL)isVertical;
- (CGFloat)thickness;

@end
