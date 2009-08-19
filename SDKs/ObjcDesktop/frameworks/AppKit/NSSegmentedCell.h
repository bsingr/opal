// 
//  NSSegmentedCell.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-12.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSGeometry.h>
#import <AppKit/NSCell.h>
#import <AppKit/NSSegmentedControl.h>

enum {
  NSSegmentSwitchTrackingSelectOne  = 0,
  NSSegmentSwitchTrackingSelectAny  = 1,
  NSSegmentSwitchTrackingMomentary  = 2
};
typedef NSUInteger NSSegmentSwitchTracking;

@class NSMutableArray;

@interface NSSegmentedCell : NSCell
{
}

- (void)setSegmentCount:(NSInteger)count;
- (NSInteger)segmentCount;

- (void)setSelectedSegment:(NSInteger)selectedSegment;
- (NSInteger)selectedSegment;

- (BOOL)selectSegmentWithTag:(NSInteger)tag;

- (void)makeNextSegmentKey;
- (void)makePreviousSegmentKey;

- (void)setTrackingMode:(NSSegmentSwitchTracking)trackingMode;
- (NSSegmentSwitchTracking)trackingMode;


- (void)setWidth:(CGFloat)width forSegment:(NSInteger)segment;
- (CGFloat)widthForSegment:(NSInteger)segment;

- (void)setImage:(NSImage *)image forSegment:(NSInteger)segment;
- (NSImage *)imageForSegment:(NSInteger)segment;

- (void)setImageScaling:(NSImageScaling)scaling forSegment:(NSInteger)segment;
- (NSImageScaling)imageScalingForSegment:(NSInteger)segment;


- (void)setLabel:(NSString *)label forSegment:(NSInteger)segment;
- (NSString *)labelForSegment:(NSInteger)segment;

- (void)setSelected:(BOOL)selected forSegment:(NSInteger)segment;
- (BOOL)isSelectedForSegment:(NSInteger)segment;

- (void)setEnabled:(BOOL)enabled forSegment:(NSInteger)segment;
- (BOOL)isEnabledForSegment:(NSInteger)segment;

- (void)setMenu:(NSMenu *)menu forSegment:(NSInteger)segment;
- (NSMenu *)menuForSegment:(NSInteger)segment;

- (void)setToolTip:(NSString *)toolTip forSegment:(NSInteger)segment;
- (NSString *)toolTipForSegment:(NSInteger)segment;

- (void)setTag:(NSInteger)tag forSegment:(NSInteger)segment;
- (NSInteger)tagForSegment:(NSInteger)segment;

- (void)setSegmentStyle:(NSSegmentStyle)segmentStyle;
- (NSSegmentStyle)segmentStyle;

- (void)drawSegment:(NSInteger)segment inFrame:(NSRect)frame withView:(NSView *)controlView;

@end


@interface NSSegmentedCell (NSSegmentBackgroundStyle)

- (NSBackgroundStyle)interiorBackgroundStyleForSegment:(NSInteger)segment;

@end
