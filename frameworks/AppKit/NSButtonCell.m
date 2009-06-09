// 
//  NSButtonCell.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSButtonCell.h"

@class NSCoder, NSInteger, NSUInteger, NSString, NSImage, NSCellImagePosition, NSImageScaling, NSGraphicsContext, NSFont;

@implementation NSButtonCell

- (id)initWithCoder:(NSCoder *)aCoder
{
    [super initWithCoder:aCoder];
    
    NSUInteger flags = [aCoder decodeIntForKey:@"NSButtonFlags"];
    NSUInteger flags2 = [aCoder decodeIntForKey:@"NSButtonFlags2"];
    
    _isBordered = (flags & 0x00800000) ? YES : NO;
    _bezelStyle = ((flags2 & 0x7) | ((flags2 & 0x20) >> 2));
    
    return self;
}
// 
// - (NSString *)title
// {
//     
// }
// 
// - (void)setTitle:(NSString *)aString
// {
//     
// }
// 
// - (NSString *)alternateTitle
// {
//     
// }
// 
// - (void)setAlternateTitle:(NSString *)aString
// {
//     
// }
// 
// 
// - (NSImage *)alternateImage
// {
//     
// }
// 
// - (void)setAlternateImage:(NSImage *)image
// {
//     
// }
// 
// - (NSCellImagePosition)imagePosition
// {
//     
// }
// 
// - (void)setImagePosition:(NSCellImagePosition)aPosition
// {
//     
// }
// 
// - (NSImageScaling)imageScaling
// {
//     
// }
// 
// - (void)setImageScaling:(NSImageScaling)scaling
// {
//     
// }
// 
// 
// - (NSInteger)highlightsBy
// {
//     
// }
// 
// - (void)setHighlightsBy:(NSInteger)aType
// {
//     
// }
// 
// - (NSInteger)showsStateBy
// {
//     
// }
// 
// - (void)setShowsStateBy:(NSInteger)aType
// {
//     
// }
// 
// - (void)setButtonType:(NSButtonType)aType
// {
//     
// }
// 
// - (BOOL)isOpaque
// {
//     
// }
// 
// - (void)setFont:(NSFont *)fontObj
// {
//     
// }
// 
// - (BOOL)isTransparent
// {
//     
// }
// 
// - (void)setTransparent:(BOOL)flag
// {
//     
// }
// 
// - (void)setPeriodicDelay:(float)delay interval:(float)interval
// {
//     
// }
// 
// - (void)getPeriodicDelay:(float *)delay interval:(float *)interval
// {
//     
// }
// 
// - (NSString *)keyEquivalent
// {
//     
// }
// 
// - (void)setKeyEquivalent:(NSString *)aKeyEquivalent
// {
//     
// }
// 
// - (NSUInteger)keyEquivalentModifierMask
// {
//     
// }
// 
// - (void)setKeyEquivalentModifierMask:(NSUInteger)mask
// {
//     
// }
// 
// - (NSFont *)keyEquivalentFont
// {
//     
// }
// 
// - (void)setKeyEquivalentFont:(NSFont *)fontObj
// {
//     
// }
// 
// - (void)setKeyEquivalentFont:(NSString *)fontName size:(CGFloat)fontSize
// {
//     
// }
// 
// 
// - (void)performClick:(id)sender
// {
//     
// }
// 
// - (void)drawInteriorWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
// {
//     [self drawBezelWithFrame:cellFrame inView:controlView];
//     [self drawTitle:_value withFrame:cellFrame inView:controlView];
// }
// 
// - (void)drawImage:(NSImage*)image withFrame:(NSRect)frame inView:(NSView*)controlView
// {
//     
// }
// 
// - (NSRect)drawTitle:(NSAttributedString*)title withFrame:(NSRect)frame inView:(NSView*)controlView
// {
//     [NSGraphicsContext saveGraphicsState];
//     
//     [[NSColor controlTextColor] set];
//     [[NSFont systemFontOfSize:[NSFont systemFontSize]] set];
//     
//     NSInteger titleOffset = frame.size.width - [_value sizeWithAttributes:nil].width;
//     NSInteger actualOffset = titleOffset / 2;
//     
//     [_value drawWithRect:NSMakeRect(actualOffset, 7, 40, 0) options:nil attributes:nil];
//     
//     [NSGraphicsContext restoreGraphicsState];
// }
// 
// - (void)drawBezelWithFrame:(NSRect)frame inView:(NSView*)controlView
// {
//     
// }
// 
// @end
// 
// 
// @implementation NSButtonCell(NSKeyboardUI)
// 
// - (void)setTitleWithMnemonic:(NSString *)stringWithAmpersand
// {
//     
// }
// 
// - (void)setAlternateTitleWithMnemonic:(NSString *)stringWithAmpersand
// {
//     
// }
// 
// - (void)setAlternateMnemonicLocation:(NSUInteger)location
// {
//     
// }
// 
// - (NSUInteger)alternateMnemonicLocation
// {
//     
// }
// 
// - (NSString *)alternateMnemonic
// {
//     
// }
// 
// @end
// 
// 
// 
// @implementation NSButtonCell (NSButtonCellExtensions)
// 
// - (NSGradientType)gradientType
// {
//     
// }
// 
// - (void)setGradientType:(NSGradientType)type
// {
//     
// }
// 
// 
// - (void)setImageDimsWhenDisabled:(BOOL)flag
// {
//     
// }
// 
// - (BOOL)imageDimsWhenDisabled
// {
//     
// }
// 
// - (void) setShowsBorderOnlyWhileMouseInside:(BOOL)show
// {
//     
// }
// 
// - (BOOL) showsBorderOnlyWhileMouseInside
// {
//     
// }
// 
// 
// - (void) mouseEntered:(NSEvent*)event
// {
//     
// }
// 
// - (void) mouseExited:(NSEvent*)event
// {
//     
// }
// 
// 
// - (NSColor *)backgroundColor
// {
//     
// }
// 
// - (void)setBackgroundColor:(NSColor*)color
// {
//     
// }
// 
// 
// @end
// 
// @implementation NSButtonCell (NSButtonCellAttributedStringMethods)
// 
// - (NSAttributedString *)attributedTitle
// {
//     
// }
// 
// - (void)setAttributedTitle:(NSAttributedString *)obj
// {
//     
// }
// 
// - (NSAttributedString *)attributedAlternateTitle
// {
//     
// }
// 
// - (void)setAttributedAlternateTitle:(NSAttributedString *)obj
// {
//     
// }
// 
// @end
// 
// @implementation NSButtonCell (NSButtonCellBezelStyles)
// 
// - (void) setBezelStyle:(NSBezelStyle)bezelStyle
// {
//     
// }
// 
// - (NSBezelStyle)bezelStyle
// {
//     
// }

@end