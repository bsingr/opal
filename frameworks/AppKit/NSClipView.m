// 
//  NSClipView.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 


#import "NSClipView.h"

@implementation NSClipView

- (id)initWithCoder:(NSCoder *)aCoder
{
   [super initWithCoder:aCoder];
   _docView = [aCoder decodeObjectForKey:@"NSDocView"];
   return self;
}

- (id)initWithFrame:(NSRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        
    }
    return self;
}

- (void)drawRect:(NSRect)aRect
{
}

@end
