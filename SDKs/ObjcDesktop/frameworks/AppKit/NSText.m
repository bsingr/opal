// 
//  NSText.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSText.h"

@implementation NSText

- (void)setDelegate:(id)anObject
{
  _delegate = anObject;
}

- (id)initWithFrame:(NSRect)aFrame
{
  self = [super initWithFrame:aFrame];
  // _frame = aFrame;
  // _bounds = NSMakeRect (0, 0, _frame.size.width, _frame.size.height);
  // _subviews = [NSMutableArray arrayWithCapacity:0];
  return self;
}

@end

