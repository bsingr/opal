// 
//  NSButtonCell.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <AppKit/NSCell.h>

enum {
    NSMomentaryLightButton		    = 0,
    NSPushOnPushOffButton		    = 1,
    NSToggleButton			        = 2,
    NSSwitchButton			        = 3,
    NSRadioButton			        = 4,
    NSMomentaryChangeButton		    = 5,
    NSOnOffButton			        = 6,
    NSMomentaryPushInButton		    = 7
    
};
typedef NSUInteger NSButtonType;

enum {

    NSRoundedBezelStyle             = 1,
    NSRegularSquareBezelStyle       = 2,
    NSThickSquareBezelStyle         = 3,
    NSThickerSquareBezelStyle       = 4,
    NSDisclosureBezelStyle          = 5,
    NSShadowlessSquareBezelStyle    = 6,
    NSCircularBezelStyle            = 7,
    NSTexturedSquareBezelStyle      = 8,
    NSHelpButtonBezelStyle          = 9,
    NSSmallSquareBezelStyle         = 10,
    NSTexturedRoundedBezelStyle     = 11,
    NSRoundRectBezelStyle           = 12,
    NSRecessedBezelStyle            = 13,
    NSRoundedDisclosureBezelStyle   = 14    
};
typedef NSUInteger NSBezelStyle;

enum {
    NSGradientNone                  = 0,
    NSGradientConcaveWeak           = 1,
    NSGradientConcaveStrong         = 2,
    NSGradientConvexWeak            = 3,
    NSGradientConvexStrong          = 4
};
typedef NSUInteger NSGradientType;

@interface NSButtonCell : NSCell
{
    
}

- (NSString *)title;
- (void)setTitle:(NSString *)aString;
- (NSString *)alternateTitle;
- (void)setAlternateTitle:(NSString *)aString;

- (NSImage *)alternateImage;
- (void)setAlternateImage:(NSImage *)image;
- (NSCellImagePosition)imagePosition;
- (void)setImagePosition:(NSCellImagePosition)aPosition;
- (NSImageScaling)imageScaling;
- (void)setImageScaling:(NSImageScaling)scaling;

- (NSInteger)highlightsBy;
- (void)setHighlightsBy:(NSInteger)aType;
- (NSInteger)showsStateBy;
- (void)setShowsStateBy:(NSInteger)aType;
- (void)setButtonType:(NSButtonType)aType;
- (BOOL)isOpaque;
- (void)setFont:(NSFont *)fontObj;
- (BOOL)isTransparent;
- (void)setTransparent:(BOOL)flag;
- (void)setPeriodicDelay:(float)delay interval:(float)interval;
- (void)getPeriodicDelay:(float *)delay interval:(float *)interval;
- (NSString *)keyEquivalent;
- (void)setKeyEquivalent:(NSString *)aKeyEquivalent;
- (NSUInteger)keyEquivalentModifierMask;
- (void)setKeyEquivalentModifierMask:(NSUInteger)mask;
- (NSFont *)keyEquivalentFont;
- (void)setKeyEquivalentFont:(NSFont *)fontObj;
- (void)setKeyEquivalentFont:(NSString *)fontName size:(CGFloat)fontSize;

- (void)performClick:(id)sender;

- (void)drawImage:(NSImage*)image withFrame:(NSRect)frame inView:(NSView*)controlView;
- (NSRect)drawTitle:(NSAttributedString*)title withFrame:(NSRect)frame inView:(NSView*)controlView;

- (void)drawBezelWithFrame:(NSRect)frame inView:(NSView*)controlView;

@end


@interface NSButtonCell(NSKeyboardUI)

- (void)setTitleWithMnemonic:(NSString *)stringWithAmpersand;
- (void)setAlternateTitleWithMnemonic:(NSString *)stringWithAmpersand;
- (void)setAlternateMnemonicLocation:(NSUInteger)location;
- (NSUInteger)alternateMnemonicLocation;
- (NSString *)alternateMnemonic;

@end


@interface NSButtonCell (NSButtonCellExtensions)

- (NSGradientType)gradientType;
- (void)setGradientType:(NSGradientType)type;

- (void)setImageDimsWhenDisabled:(BOOL)flag;
- (BOOL)imageDimsWhenDisabled;
- (void)setShowsBorderOnlyWhileMouseInside:(BOOL)show;
- (BOOL)showsBorderOnlyWhileMouseInside;

- (void)mouseEntered:(NSEvent*)event;
- (void)mouseExited:(NSEvent*)event;

- (NSColor *)backgroundColor;
- (void)setBackgroundColor:(NSColor*)color;

@end


@interface NSButtonCell (NSButtonCellAttributedStringMethods)

- (NSAttributedString *)attributedTitle;
- (void)setAttributedTitle:(NSAttributedString *)obj;
- (NSAttributedString *)attributedAlternateTitle;
- (void)setAttributedAlternateTitle:(NSAttributedString *)obj;

@end


@interface NSButtonCell (NSButtonCellBezelStyles)

- (void)setBezelStyle:(NSBezelStyle)bezelStyle;
- (NSBezelStyle)bezelStyle;

@end