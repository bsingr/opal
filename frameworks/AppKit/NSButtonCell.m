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

+ (void)load
{
    CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSButtonNormalLeft", @"png", @"");
    CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSButtonNormalMiddle", @"png", @"");
    CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSButtonNormalRight", @"png", @"");

    CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSButtonHighlightedLeft", @"png", @"");
    CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSButtonHighlightedMiddle", @"png", @"");
    CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSButtonHighlightedRight", @"png", @"");
    
    // NSSwitch (checkbox)
    CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSSwitchNormal", @"png", @"");
    CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSSwitchAlternate", @"png", @"");
    // NSRadioButton
    CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSRadioButtonNormal", @"png", @"");
    CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSRadioButtonAlternate", @"png", @"");
    
    // Now just dimming image with Coire Graphics..
    // CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSButtonDisabledLeft", @"png", @"");
    // CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSButtonDisabledMiddle", @"png", @"");
    // CFBundlePreloadResource(CFBundleGetBundleForClass(self), @"NSButtonDisabledRight", @"png", @"");
}

- (id)initWithCoder:(NSCoder *)aCoder
{
    [super initWithCoder:aCoder];
    
    NSUInteger flags = [aCoder decodeIntForKey:@"NSButtonFlags"];
    NSUInteger flags2 = [aCoder decodeIntForKey:@"NSButtonFlags2"];

    _isBordered = (flags & 0x00800000) ? YES : NO;
    _bezelStyle = ((flags2 & 0x7) | ((flags2 & 0x20) >> 2));
    
    _alternateImage = [aCoder decodeObjectForKey:@"NSAlternateImage"];
    if(_alternateImage)
    {
        _image = [_alternateImage normalImage];
        _alternateImage = [_alternateImage alternateImage];
    }
    
    return self;
}

- (NSString *)title
{
    
}

- (void)setTitle:(NSString *)aString
{
    
}

- (NSString *)alternateTitle
{
    
}

- (void)setAlternateTitle:(NSString *)aString
{
    
}


- (NSImage *)alternateImage
{
    
}

- (void)setAlternateImage:(NSImage *)image
{
    
}

- (NSCellImagePosition)imagePosition
{
    
}

- (void)setImagePosition:(NSCellImagePosition)aPosition
{
    
}

- (NSImageScaling)imageScaling
{
    
}

- (void)setImageScaling:(NSImageScaling)scaling
{
    
}


- (NSInteger)highlightsBy
{
    
}

- (void)setHighlightsBy:(NSInteger)aType
{
    
}

- (NSInteger)showsStateBy
{
    
}

- (void)setShowsStateBy:(NSInteger)aType
{
    
}

- (void)setButtonType:(NSButtonType)aType
{
    
}

- (BOOL)isOpaque
{
    
}

- (void)setFont:(NSFont *)fontObj
{
    
}

- (BOOL)isTransparent
{
    
}

- (void)setTransparent:(BOOL)flag
{
    
}

- (void)setPeriodicDelay:(float)delay interval:(float)interval
{
    
}

- (void)getPeriodicDelay:(float *)delay interval:(float *)interval
{
    
}

- (NSString *)keyEquivalent
{
    
}

- (void)setKeyEquivalent:(NSString *)aKeyEquivalent
{
    
}

- (NSUInteger)keyEquivalentModifierMask
{
    
}

- (void)setKeyEquivalentModifierMask:(NSUInteger)mask
{
    
}

- (NSFont *)keyEquivalentFont
{
    
}

- (void)setKeyEquivalentFont:(NSFont *)fontObj
{
    
}

- (void)setKeyEquivalentFont:(NSString *)fontName size:(CGFloat)fontSize
{
    
}


- (void)performClick:(id)sender
{
    
}

- (void)drawWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{    
    CGContextRef c = [[NSGraphicsContext currentContext] graphicsPort];
    CGContextClearRect(c, cellFrame);
    
    [self drawBezelWithFrame:cellFrame inView:controlView];
    [self drawInteriorWithFrame:cellFrame inView:controlView];
    [self drawTitle:_value withFrame:cellFrame inView:controlView];
}

- (void)drawInteriorWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{        
    if(_image)
    {        
        if(_state == NSOnState)
            [self drawImage:_alternateImage withFrame:CGRectMake(1,1,17,17) inView:controlView];
        else
            [self drawImage:_image withFrame:CGRectMake(1,1,17,17) inView:controlView];
    }
}

- (void)drawImage:(NSImage*)image withFrame:(NSRect)frame inView:(NSView*)controlView
{
    CGContextRef c = [[NSGraphicsContext currentContext] graphicsPort];
    CGContextSaveGState(c);
    
    if(!_isEnabled)
        CGContextSetAlpha(c, 0.8);
    
    CGContextDrawImage(c, frame, image);
    CGContextRestoreGState(c);
}

- (NSRect)drawTitle:(NSAttributedString*)title withFrame:(NSRect)rect inView:(NSView*)controlView
{
    CGContextRef c = [[NSGraphicsContext currentContext] graphicsPort];
    CGContextSaveGState(c);
    
    // background
    
    // text
    if(_isEnabled)
    {
        CGContextSetFillColorWithColor(c, CGColorCreateGenericRGB(0.204, 0.204, 0.204, 1.0));

        CGContextSetShadowWithColor(c, CGSizeMake(1,1), 1, CGColorCreateGenericRGB(1,1,1,1));

        CGFontRef theFont = CGFontCreate(@"Arial", 12, NO);
        CGContextSetFont(c, theFont);
        CGContextShowTextAtPoint(c, 20, ((rect.size.height + 12) / 2) - 1, title, 14);
    }
    else
    {
        CGContextSetFillColorWithColor(c, CGColorCreateGenericRGB(0.704, 0.704, 0.704, 1.0));

        CGContextSetShadowWithColor(c, CGSizeMake(1,1), 1, CGColorCreateGenericRGB(1,1,1,1));

        CGFontRef theFont = CGFontCreate(@"Arial", 12, NO);
        CGContextSetFont(c, theFont);
        // 12 being the size of the text, although this could change
        CGContextShowTextAtPoint(c, 20, ((rect.size.height + 12) / 2) - 1, title, 14);
    }
    
    
    CGContextRestoreGState(c);
}

- (void)drawBezelWithFrame:(NSRect)frame inView:(NSView*)controlView
{
    CGContextRef c = [[NSGraphicsContext currentContext] graphicsPort];
    CGContextSaveGState(c);
    
    if(_isEnabled && _isBordered)
    {
        if(_isHighlighted)
        {
            CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonHighlightedLeft.png");
            CGContextDrawImage(c, CGRectMake(0,0,6,24), theImage);
            CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonHighlightedMiddle.png");
            CGContextDrawImage(c, CGRectMake(6,0,frame.size.width - 12,24), theImage);
            CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonHighlightedRight.png");
            CGContextDrawImage(c, CGRectMake(frame.size.width-6,0,6,24), theImage);
        }
        else
        {
            CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonNormalLeft.png");
            CGContextDrawImage(c, CGRectMake(0,0,6,24), theImage);
            CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonNormalMiddle.png");
            CGContextDrawImage(c, CGRectMake(6,0,frame.size.width - 12,24), theImage);
            CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonNormalRight.png");
            CGContextDrawImage(c, CGRectMake(frame.size.width-6,0,6,24), theImage);
        }
    }
    else if(_isBordered)
    {
        CGContextSaveGState(c);
        CGContextSetAlpha(c, 0.8);
        
        CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonNormalLeft.png");
        CGContextDrawImage(c, CGRectMake(0,0,6,24), theImage);
        CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonNormalMiddle.png");
        CGContextDrawImage(c, CGRectMake(6,0,frame.size.width - 12,24), theImage);
        CGImageRef theImage = CGImageCreateWithURLDataProvider(@"Resources/NSButtonNormalRight.png");
        CGContextDrawImage(c, CGRectMake(frame.size.width-6,0,6,24), theImage);
        CGContextRestoreGState(c);
    }
    
    CGContextRestoreGState(c);
}

@end


@implementation NSButtonCell(NSKeyboardUI)

- (void)setTitleWithMnemonic:(NSString *)stringWithAmpersand
{
    
}

- (void)setAlternateTitleWithMnemonic:(NSString *)stringWithAmpersand
{
    
}

- (void)setAlternateMnemonicLocation:(NSUInteger)location
{
    
}

- (NSUInteger)alternateMnemonicLocation
{
    
}

- (NSString *)alternateMnemonic
{
    
}

@end



@implementation NSButtonCell (NSButtonCellExtensions)

- (NSGradientType)gradientType
{
    
}

- (void)setGradientType:(NSGradientType)type
{
    
}


- (void)setImageDimsWhenDisabled:(BOOL)flag
{
    
}

- (BOOL)imageDimsWhenDisabled
{
    
}

- (void) setShowsBorderOnlyWhileMouseInside:(BOOL)show
{
    
}

- (BOOL) showsBorderOnlyWhileMouseInside
{
    
}


- (void) mouseEntered:(NSEvent*)event
{
    
}

- (void) mouseExited:(NSEvent*)event
{
    
}


- (NSColor *)backgroundColor
{
    
}

- (void)setBackgroundColor:(NSColor*)color
{
    
}


@end

@implementation NSButtonCell (NSButtonCellAttributedStringMethods)

- (NSAttributedString *)attributedTitle
{
    
}

- (void)setAttributedTitle:(NSAttributedString *)obj
{
    
}

- (NSAttributedString *)attributedAlternateTitle
{
    
}

- (void)setAttributedAlternateTitle:(NSAttributedString *)obj
{
    
}

@end

@implementation NSButtonCell (NSButtonCellBezelStyles)

- (void) setBezelStyle:(NSBezelStyle)bezelStyle
{
    
}

- (NSBezelStyle)bezelStyle
{
    
}

@end