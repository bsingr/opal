// 
//  NSSliderCell.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-11.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSSliderCell.h"

@implementation NSSliderCell

+ (void)load
{
  CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSSliderHorizontalLeft", @"png", @"");
  CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSSliderHorizontalMiddle", @"png", @"");
  CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSSliderHorizontalRight", @"png", @"");
  CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSSliderHorizontalKnobNormal", @"png", @"");
}

- (id)initWithCoder:(NSCoder *)aCoder
{
  [super initWithCoder:aCoder];
  
  _minValue = [aCoder decodeDoubleForKey:@"NSMinValue"];
  _maxValue = [aCoder decodeDoubleForKey:@"NSMaxValue"];
  _value = [aCoder decodeDoubleForKey:@"NSValue"];
  
  return aCoder;
}

- (void)drawWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
  NSUInteger SLIDER_PADDING = 8.5;
  NSUInteger KNOB_PADDING = 2;
  
  CGContextRef c = [[NSGraphicsContext currentContext] graphicsPort];
  CGContextSaveGState(c);
  
  if(!_isEnabled)
    CGContextSetAlpha(c, 0.8);
    
  CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSSliderHorizontalLeft.png");
  CGContextDrawImage(c, CGRectMake(KNOB_PADDING, 8, 5, 5), theImage);
  CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSSliderHorizontalMiddle.png");
  CGContextDrawImage(c, CGRectMake(5 + KNOB_PADDING, 8, (cellFrame.size.width - 10) - (2 * KNOB_PADDING), 5), theImage);
  CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSSliderHorizontalRight.png");
  CGContextDrawImage(c, CGRectMake((cellFrame.size.width-5) - KNOB_PADDING, 8 ,5 ,5), theImage);


  NSUInteger knobPosition = (((_value / (_maxValue - _minValue)) * ((cellFrame.size.width - (2 * SLIDER_PADDING)))));

  CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSSliderHorizontalKnobNormal.png");
  CGContextDrawImage(c, CGRectMake(knobPosition,2,17,17), theImage);
  
  CGContextRestoreGState(c);
}

- (void)drawBarInside:(NSRect)cellFrame flipped:(BOOL)flipped
{
  
}

- (void)drawKnob:(NSRect)rect
{
  
}

- (BOOL)startTrackingAt:(NSPoint)startPoint inView:(NSView *)controlView
{
  if([self isEnabled])
  {
    NSUInteger SLIDER_PADDING = 8.5;
     
    NSPoint location = [controlView convertPoint:startPoint fromView:nil];
    
    [self setDoubleValue:((location.x - SLIDER_PADDING) / ([controlView bounds].size.width - (2 * SLIDER_PADDING))) * (_maxValue - _minValue)];
    [self drawWithFrame:[controlView bounds] inView:controlView];
    
    return YES;
  }
    

  return NO;
}

- (void)setDoubleValue:(double)aDouble
{
  if(aDouble < _minValue)
    _value = _minValue;
  else if(aDouble > _maxValue)
    _value = _maxValue;
  else
    _value = aDouble;
  
  NSLog(_value);
}

- (BOOL)continueTracking:(NSPoint)lastPoint at:(NSPoint)currentPoint inView:(NSView *)controlView
{
  NSUInteger SLIDER_PADDING = 8.5;

  NSPoint location = [controlView convertPoint:currentPoint fromView:nil];
  
  [self setDoubleValue:((location.x - SLIDER_PADDING) / ([controlView bounds].size.width - (2 * SLIDER_PADDING))) * (_maxValue - _minValue)];
  
  [self drawWithFrame:[controlView bounds] inView:controlView];
  return YES;
}

- (void)stopTracking:(NSPoint)lastPoint at:(NSPoint)stopPoint inView:(NSView *)controlView mouseIsUp:(BOOL)flag
{
  // empty implementation
}

+ (BOOL)prefersTrackingUntilMouseUp
{
  
}

- (double)minValue
{
  return _minValue;
}

- (void)setMinValue:(double)aDouble
{
  _minValue = aDouble;
}

- (double)maxValue
{
  return _maxValue;
}

- (void)setMaxValue:(double)aDouble
{
  _maxValue = aDouble;
}

- (void)setAltIncrementValue:(double)incValue
{
  
}

- (double)altIncrementValue
{
  
}

- (NSInteger)isVertical
{
  
}

- (void)setTitleColor:(NSColor *)newColor
{
  
}

- (NSColor *)titleColor
{
  
}

- (void)setTitleFont:(NSFont *)fontObj
{
  
}

- (NSFont *)titleFont
{
  
}

- (NSString *)title
{
  
}

- (void)setTitle:(NSString *)aString
{
  
}

- (void)setTitleCell:(NSCell *)aCell
{
  
}

- (id)titleCell
{
  
}

- (void)setKnobThickness:(CGFloat)aFloat
{
  
}

- (CGFloat)knobThickness
{
  
}

- (NSRect)knobRectFlipped:(BOOL)flipped
{
  
}

- (void)drawKnob:(NSRect)knobRect
{
  
}

- (void)drawKnob
{
  
}

- (void)drawBarInside:(NSRect)aRect flipped:(BOOL)flipped
{
  
}

- (NSRect)trackRect
{
  
}


- (void) setSliderType:(NSSliderType)sliderType
{
  
}

- (NSSliderType)sliderType
{
  
}

@end
