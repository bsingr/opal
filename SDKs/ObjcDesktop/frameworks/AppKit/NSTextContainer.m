// 
//  NSTextContainer.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-17.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSTextContainer.h"

@implementation NSTextContainer

- (id)initWithContainerSize:(NSSize)size
{
  _size = size;
  _textView = nil;
  _layoutManager = nil;
  return self;
}

- (NSLayoutManager *)layoutManager{}
- (void)setLayoutManager:(NSLayoutManager *)layoutManager{}

- (void)replaceLayoutManager:(NSLayoutManager *)newLayoutManager{}

- (NSTextView *)textView{}
- (void)setTextView:(NSTextView *)textView{}

- (void)setWidthTracksTextView:(BOOL)flag{}
- (BOOL)widthTracksTextView{}
- (void)setHeightTracksTextView:(BOOL)flag{}
- (BOOL)heightTracksTextView{}

- (void)setContainerSize:(NSSize)size{}
- (NSSize)containerSize{}

- (void)setLineFragmentPadding:(CGFloat)pad{}
- (CGFloat)lineFragmentPadding{}

- (NSRect)lineFragmentRectForProposedRect:(NSRect)proposedRect sweepDirection:(NSLineSweepDirection)sweepDirection movementDirection:(NSLineMovementDirection)movementDirection remainingRect:(NSArray)remainingRect{}

- (BOOL)isSimpleRectangularTextContainer{}

- (BOOL)containsPoint:(NSPoint)point{}

@end
