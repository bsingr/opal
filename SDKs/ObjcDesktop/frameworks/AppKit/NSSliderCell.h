// 
//  NSSliderCell.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-11.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <AppKit/NSCell.h>

enum {
    NSTickMarkBelow = 0,
    NSTickMarkAbove = 1,
    NSTickMarkLeft  = 1,
    NSTickMarkRight = 0
};
typedef NSUInteger NSTickMarkPosition;

enum {
    NSLinearSlider   = 0,
    NSCircularSlider = 1
};
typedef NSUInteger NSSliderType;

@interface NSSliderCell : NSCell
{
    double      _minValue;
    double      _maxValue;
}

+ (BOOL)prefersTrackingUntilMouseUp;

- (double)minValue;
- (void)setMinValue:(double)aDouble;
- (double)maxValue;
- (void)setMaxValue:(double)aDouble;
- (void)setAltIncrementValue:(double)incValue;
- (double)altIncrementValue;
- (NSInteger)isVertical;
- (void)setTitleColor:(NSColor *)newColor;
- (NSColor *)titleColor;
- (void)setTitleFont:(NSFont *)fontObj;
- (NSFont *)titleFont;
- (NSString *)title;
- (void)setTitle:(NSString *)aString;
- (void)setTitleCell:(NSCell *)aCell;
- (id)titleCell;
- (void)setKnobThickness:(CGFloat)aFloat;
- (CGFloat)knobThickness;
- (NSRect)knobRectFlipped:(BOOL)flipped;
- (void)drawKnob:(NSRect)knobRect;
- (void)drawKnob;
- (void)drawBarInside:(NSRect)aRect flipped:(BOOL)flipped;
- (NSRect)trackRect;

- (void) setSliderType:(NSSliderType)sliderType;
- (NSSliderType)sliderType;

@end


@interface NSSliderCell(NSTickMarkSupport)

- (void)setNumberOfTickMarks:(NSInteger)count;
- (NSInteger)numberOfTickMarks;
- (void)setTickMarkPosition:(NSTickMarkPosition)position;
- (NSTickMarkPosition)tickMarkPosition;
- (void)setAllowsTickMarkValuesOnly:(BOOL)yorn;
- (BOOL)allowsTickMarkValuesOnly;
- (double)tickMarkValueAtIndex:(NSInteger)index;
- (NSRect)rectOfTickMarkAtIndex:(NSInteger)index;
- (NSInteger)indexOfTickMarkAtPoint:(NSPoint)point;
- (double)closestTickMarkValueToValue:(double)value;

@end
