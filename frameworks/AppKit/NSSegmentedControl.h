// 
//  NSSegmentedControl.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-12.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <AppKit/NSControl.h>
#import <AppKit/NSCell.h>

@class NSImage;

enum {
    NSSegmentStyleAutomatic         = 0,
    NSSegmentStyleRounded           = 1,
    NSSegmentStyleTexturedRounded   = 2,
    NSSegmentStyleRoundRect         = 3,
    NSSegmentStyleTexturedSquare    = 4,
    NSSegmentStyleCapsule           = 5,
    NSSegmentStyleSmallSquare       = 6
};
typedef NSInteger NSSegmentStyle;

@interface NSSegmentedControl : NSControl
{
}

- (void)setSegmentCount:(NSInteger)count;
- (NSInteger)segmentCount;

- (void)setSelectedSegment:(NSInteger)selectedSegment;
- (NSInteger)selectedSegment;

- (BOOL)selectSegmentWithTag:(NSInteger)tag;

- (void)setWidth:(CGFloat)width forSegment:(NSInteger)segment;
- (CGFloat)widthForSegment:(NSInteger)segment;

- (void)setImage:(NSImage *)image forSegment:(NSInteger)segment;
- (NSImage *)imageForSegment:(NSInteger)segment;


- (void)setImageScaling:(NSImageScaling)scaling forSegment:(NSInteger)segment;
- (NSImageScaling)imageScalingForSegment:(NSInteger)segment;


- (void)setLabel:(NSString *)label forSegment:(NSInteger)segment;
- (NSString *)labelForSegment:(NSInteger)segment;

- (void)setMenu:(NSMenu *)menu forSegment:(NSInteger)segment;
- (NSMenu *)menuForSegment:(NSInteger)segment;

- (void)setSelected:(BOOL)selected forSegment:(NSInteger)segment;
- (BOOL)isSelectedForSegment:(NSInteger)segment;

- (void)setEnabled:(BOOL)enabled forSegment:(NSInteger)segment;
- (BOOL)isEnabledForSegment:(NSInteger)segment;

- (void)setSegmentStyle:(NSSegmentStyle)segmentStyle;
- (NSSegmentStyle)segmentStyle;

@end
