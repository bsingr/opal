// 
//  NSColor.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>
#import <Foundation/NSGeometry.h>
#import <AppKit/NSCell.h>

@class NSDictionary, NSPasteBoard, NSImage, NSColorSpace;

@interface NSColor : NSObject <NSCopying, NSCoding>
{
}

+ (NSColor *)colorWithCalibratedWhite:(CGFloat)white alpha:(CGFloat)alpha;
+ (NSColor *)colorWithCalibratedHue:(CGFloat)hue saturation:(CGFloat)saturation brightness:(CGFloat)brightness alpha:(CGFloat)alpha;
+ (NSColor *)colorWithCalibratedRed:(CGFloat)red green:(CGFloat)green blue:(CGFloat)blue alpha:(CGFloat)alpha;

+ (NSColor *)colorWithDeviceWhite:(CGFloat)white alpha:(CGFloat)alpha;
+ (NSColor *)colorWithDeviceHue:(CGFloat)hue saturation:(CGFloat)saturation brightness:(CGFloat)brightness alpha:(CGFloat)alpha;
+ (NSColor *)colorWithDeviceRed:(CGFloat)red green:(CGFloat)green blue:(CGFloat)blue alpha:(CGFloat)alpha;
+ (NSColor *)colorWithDeviceCyan:(CGFloat)cyan magenta:(CGFloat)magenta yellow:(CGFloat)yellow black:(CGFloat)black alpha:(CGFloat)alpha;

+ (NSColor *)colorWithCatalogName:(NSString *)listName colorName:(NSString *)colorName;
+ (NSColor *)colorWithColorSpace:(NSColorSpace *)space components:(const CGFloat *)components count:(NSInteger)numberOfComponents;

+ (NSColor *)blackColor;
+ (NSColor *)darkGrayColor;
+ (NSColor *)lightGrayColor;
+ (NSColor *)whiteColor;
+ (NSColor *)grayColor;
+ (NSColor *)redColor;
+ (NSColor *)greenColor;
+ (NSColor *)blueColor;
+ (NSColor *)cyanColor;
+ (NSColor *)yellowColor;
+ (NSColor *)magentaColor;
+ (NSColor *)orangeColor;
+ (NSColor *)purpleColor;
+ (NSColor *)brownColor;
+ (NSColor *)clearColor;

+ (NSColor *)controlShadowColor;
+ (NSColor *)controlDarkShadowColor;
+ (NSColor *)controlColor;
+ (NSColor *)controlHighlightColor;
+ (NSColor *)controlLightHighlightColor;
+ (NSColor *)controlTextColor;
+ (NSColor *)controlBackgroundColor;
+ (NSColor *)selectedControlColor;
+ (NSColor *)secondarySelectedControlColor;
+ (NSColor *)selectedControlTextColor;
+ (NSColor *)disabledControlTextColor;
+ (NSColor *)textColor;
+ (NSColor *)textBackgroundColor;
+ (NSColor *)selectedTextColor;
+ (NSColor *)selectedTextBackgroundColor;
+ (NSColor *)gridColor;
+ (NSColor *)keyboardFocusIndicatorColor;
+ (NSColor *)windowBackgroundColor;

+ (NSColor *)scrollBarColor;
+ (NSColor *)knobColor;
+ (NSColor *)selectedKnobColor;

+ (NSColor *)windowFrameColor;
+ (NSColor *)windowFrameTextColor;

+ (NSColor *)selectedMenuItemColor;
+ (NSColor *)selectedMenuItemTextColor;

+ (NSColor *)highlightColor;
+ (NSColor *)shadowColor;

+ (NSColor *)headerColor;
+ (NSColor *)headerTextColor;

+ (NSColor *)alternateSelectedControlColor;
+ (NSColor *)alternateSelectedControlTextColor;

+ (NSArray *)controlAlternatingRowBackgroundColors;

- (NSColor *)highlightWithLevel:(CGFloat)val;
- (NSColor *)shadowWithLevel:(CGFloat)val;

+ (NSColor *)colorForControlTint:(NSControlTint)controlTint;

+ (NSControlTint) currentControlTint;

- (void)set;
- (void)setFill;
- (void)setStroke;

- (NSString *)colorSpaceName;
- (NSColor *)colorUsingColorSpaceName:(NSString *)colorSpace;
- (NSColor *)colorUsingColorSpaceName:(NSString *)colorSpace device:(NSDictionary *)deviceDescription;
- (NSColor *)colorUsingColorSpace:(NSColorSpace *)space;

- (NSColor *)blendedColorWithFraction:(CGFloat)fraction ofColor:(NSColor *)color;
- (NSColor *)colorWithAlphaComponent:(CGFloat)alpha;
- (NSString *)catalogNameComponent;
- (NSString *)colorNameComponent;
- (NSString *)localizedCatalogNameComponent;
- (NSString *)localizedColorNameComponent;
- (CGFloat)redComponent;
- (CGFloat)greenComponent;
- (CGFloat)blueComponent;
- (void)getRed:(CGFloat *)red green:(CGFloat *)green blue:(CGFloat *)blue alpha:(CGFloat *)alpha;
- (CGFloat)hueComponent;
- (CGFloat)saturationComponent;
- (CGFloat)brightnessComponent;
- (void)getHue:(CGFloat *)hue saturation:(CGFloat *)saturation brightness:(CGFloat *)brightness alpha:(CGFloat *)alpha;
- (CGFloat)whiteComponent;
- (void)getWhite:(CGFloat *)white alpha:(CGFloat *)alpha;

- (CGFloat)cyanComponent;
- (CGFloat)magentaComponent;
- (CGFloat)yellowComponent;
- (CGFloat)blackComponent;
- (void)getCyan:(CGFloat *)cyan magenta:(CGFloat *)magenta yellow:(CGFloat *)yellow black:(CGFloat *)black alpha:(CGFloat *)alpha;

- (NSColorSpace *)colorSpace;
- (NSInteger)numberOfComponents;
- (void)getComponents:(CGFloat *)components;

- (CGFloat)alphaComponent;

+ (NSColor *)colorFromPasteboard:(NSPasteboard *)pasteBoard;
- (void)writeToPasteboard:(NSPasteboard *)pasteBoard;

+ (NSColor *)colorWithPatternImage:(NSImage*)image;
- (NSImage *)patternImage; 

- (void)drawSwatchInRect:(NSRect)rect;

+ (void)setIgnoresAlpha:(BOOL)flag;
+ (BOOL)ignoresAlpha;

@end