#import "NSButtonCell.h"

@implementation NSButtonCell

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


- (void)drawImage:(NSImage*)image withFrame:(NSRect)frame inView:(NSView*)controlView
{
    
}

- (NSRect)drawTitle:(NSAttributedString*)title withFrame:(NSRect)frame inView:(NSView*)controlView
{
    
}


- (void)drawBezelWithFrame:(NSRect)frame inView:(NSView*)controlView
{
    
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