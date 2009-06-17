// 
//  NSTextContainer.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-17.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>
#import <Foundation/NSGeometry.h>

@class NSLayoutManager, NSTextView, NSArray;

enum {
    NSLineSweepLeft     = 0,
    NSLineSweepRight    = 1,
    NSLineSweepDown     = 2,
    NSLineSweepUp       = 3
};
typedef NSUInteger NSLineSweepDirection;

enum {
    NSLineDoesntMove    = 0, 
    NSLineMovesLeft     = 1,
    NSLineMovesRight    = 2,
    NSLineMovesDown     = 3,
    NSLineMovesUp       = 4
};
typedef NSUInteger NSLineMovementDirection;

@interface NSTextContainer : NSObject
{
    NSLayoutManager     *_layoutManager;
    NSTextView          *_textView;
    NSSize               _size;
    CGFloat              _lineFragmentPadding;
}

- (id)initWithContainerSize:(NSSize)size;

- (NSLayoutManager *)layoutManager;
- (void)setLayoutManager:(NSLayoutManager *)layoutManager;

- (void)replaceLayoutManager:(NSLayoutManager *)newLayoutManager;

- (NSTextView *)textView;
- (void)setTextView:(NSTextView *)textView;

- (void)setWidthTracksTextView:(BOOL)flag;
- (BOOL)widthTracksTextView;
- (void)setHeightTracksTextView:(BOOL)flag;
- (BOOL)heightTracksTextView;

- (void)setContainerSize:(NSSize)size;
- (NSSize)containerSize;

- (void)setLineFragmentPadding:(CGFloat)pad;
- (CGFloat)lineFragmentPadding;

- (NSRect)lineFragmentRectForProposedRect:(NSRect)proposedRect sweepDirection:(NSLineSweepDirection)sweepDirection movementDirection:(NSLineMovementDirection)movementDirection remainingRect:(NSArray)remainingRect;

- (BOOL)isSimpleRectangularTextContainer;

- (BOOL)containsPoint:(NSPoint)point;

@end
