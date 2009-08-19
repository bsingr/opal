// 
//  NSTextFieldCell.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSTextFieldCell.h"

@implementation NSTextFieldCell

+ (void)load
{
  CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSTextFieldBezelTopLeft", @"png", @"");
  CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSTextFieldBezelTopMiddle", @"png", @"");
  CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSTextFieldBezelTopRight", @"png", @"");
  CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSTextFieldBezelSides", @"png", @"");
  CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSTextFieldBezelBottom", @"png", @"");
}

- (id)init
{
  [super init];
  if (self) {
    _textColor= [NSColor controlTextColor];
  }
  
  return self;
}

- (id)initWithCoder:(NSCoder *)aCoder
{
  [super initWithCoder:aCoder];
  
  _drawsBackground = [aCoder decodeBoolForKey:@"NSDrawsBackground"];
  
  return self;
}

- (void)setGBorderType:(int)type
{
  _gBorderType = type;
}

- (void)drawInteriorWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
  CGContextRef c = [[NSGraphicsContext currentContext] graphicsPort];
  CGContextSaveGState(c);
    
  // text
  if(_isEnabled)
  {
    CGContextSetFillColorWithColor(c, CGColorCreateGenericRGB(0.204, 0.204, 0.204, 1.0));

    CGContextSetShadowWithColor(c, CGSizeMake(1,1), 1, CGColorCreateGenericRGB(1,1,1,1));

    CGFontRef theFont = CGFontCreate(@"Arial", 12, NO);
    CGContextSetFont(c, theFont);
    CGContextShowTextAtPoint(c, 5, ((cellFrame.size.height + 12) / 2), _value, 14);
  }
  else
  {
    CGContextSetFillColorWithColor(c, CGColorCreateGenericRGB(0.704, 0.704, 0.704, 1.0));

    CGContextSetShadowWithColor(c, CGSizeMake(1,1), 1, CGColorCreateGenericRGB(1,1,1,1));

    CGFontRef theFont = CGFontCreate(@"Arial", 12, NO);
    CGContextSetFont(c, theFont);
    // 12 being the size of the text, although this could change
    CGContextShowTextAtPoint(c, 5, ((cellFrame.size.height + 12) / 2), _value, 14);
  }
  
  
  CGContextRestoreGState(c);
}

- (void)drawWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
  CGContextRef c = [[NSGraphicsContext currentContext] graphicsPort];
  
  // background
  if([self drawsBackground])
  {
    CGContextSetFillColorWithColor(c, CGColorCreateGenericRGB(1, 1, 1, 1.0));
    CGContextFillRect(c, cellFrame);
  }
  
  // bezel
  if(_isBezeled)
  {
    // top (left, middle, right)
    CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSTextFieldBezelTopLeft.png");
    CGContextDrawImage(c, CGRectMake(0,0,2,2), theImage);
    CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSTextFieldBezelTopMiddle.png");
    CGContextDrawImage(c, CGRectMake(2,0,cellFrame.size.width - 4,2), theImage);
    CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSTextFieldBezelTopRight.png");
    CGContextDrawImage(c, CGRectMake(cellFrame.size.width-2,0,2,2), theImage);
    // sides(left, right)
    CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSTextFieldBezelSides.png");
    CGContextDrawImage(c, CGRectMake(0, 2, 1, cellFrame.size.height - 2), theImage);
    CGContextDrawImage(c, CGRectMake(cellFrame.size.width - 1, 2, 1, cellFrame.size.height - 2), theImage);
    // bottom
    CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSTextFieldBezelBottom.png");
    CGContextDrawImage(c, CGRectMake(1, cellFrame.size.height - 1, cellFrame.size.width - 2, 1), theImage);
  }
  
  
  // @"NSTextFieldBezelTopLeft", @"png", @"");
  // @"NSTextFieldBezelTopMiddle", @"png", @"");
  // @"NSTextFieldBezelTopRight", @"png", @"");
  // @"NSTextFieldBezelSides", @"png", @"");
  // @"NSTextFieldBezelBottom", @"png", @"");
  
  
  [self drawInteriorWithFrame:cellFrame inView:controlView];
}

- (BOOL)drawsBackground
{
  return _drawsBackground;
}

- (void)setDrawsBackground:(BOOL)flag
{
  _drawsBackground = flag;
  
  if (_drawsBackground == 0)
    _drawsBackground = NO;
}

- (void)setBezeled:(BOOL)flag
{
  _bezeled = flag;
}

- (BOOL)isBezeled
{
  return _bezeled;
}

- (void)setBezelStyle:(NSTextFieldBezelStyle)style
{
  _bezelStyle = style;
}

- (NSTextFieldBezelStyle)bezelStyle
{
  return _bezelStyle;
}

- (void)setTextColor:(NSColor *)aColor
{   
  _textColor = aColor;
}

- (NSColor *)textColor
{
  return _textColor;
}

- (NSRect)titleRectForBounds:(NSRect)theRect
{
  if (_isEditable)
  {
    NSRect *titleRect = NSMakeRect (theRect.origin.x + 4, theRect.origin.y + 4, theRect.size.width - 8, theRect.size.height - 9);
    return titleRect;
  }
    
  return theRect;
}

- (NSText *)setUpFieldEditorAttributes:(NSText *)textObj
{
  return textObj;
}

- (void)setPlaceholderString:(NSString*)string
{
  
}

- (NSString*)placeholderString
{
  
}

- (void)setPlaceholderAttributedString:(NSAttributedString*)string
{
  
}

- (NSAttributedString*)placeholderAttributedString
{
  
}

- (void)setWantsNotificationForMarkedText:(BOOL)flag
{
  
}

- (NSArray *)allowedInputSourceLocales
{
  
}

- (void)setAllowedInputSourceLocales:(NSArray *)localeIdentifiers
{
  
}

@end

