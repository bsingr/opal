#import <AppKit/NSControl.m>
#import <AppKit/NSButtonCell.m>

@implementation NSButton : NSControl
{
    
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

- (NSImage *)image
{
    
}

- (void)setImage:(NSImage *)image
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

- (void)setButtonType:(NSButtonType)aType
{
    
}

- (NSInteger)state
{
    
}

- (void)setState:(NSInteger)value
{
    
}

- (BOOL)isBordered
{
    
}

- (void)setBordered:(BOOL)flag
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

- (void)setKeyEquivalent:(NSString *)charCode
{
    
}

- (NSUInteger)keyEquivalentModifierMask
{
    
}

- (void)setKeyEquivalentModifierMask:(NSUInteger)mask
{
    
}

- (void)highlight:(BOOL)flag
{
    
}

- (BOOL)performKeyEquivalent:(NSEvent *)key
{
    
}


@end

@implementation NSButton (NSKeyboardUI)

- (void)setTitleWithMnemonic:(NSString *)stringWithAmpersand
{
    
}


@end

@implementation NSButton (NSButtonAttributedStringMethods)

- (NSAttributedString *)attributedTitle
{
    
}

- (void)setAttributedTitle:(NSAttributedString *)aString
{
    
}

- (NSAttributedString *)attributedAlternateTitle
{
    
}

- (void)setAttributedAlternateTitle:(NSAttributedString *)obj
{
    
}

@end


@implementation NSButton (NSButtonBezelStyles)

- (void) setBezelStyle:(NSBezelStyle)bezelStyle
{
    
}

- (NSBezelStyle)bezelStyle
{
    
}

@end

@implementation NSButton (NSButtonMixedState)

- (void)setAllowsMixedState:(BOOL)flag
{
    
}

- (BOOL)allowsMixedState
{
    
}

- (void)setNextState
{
    
}


@end

@implementation NSButton (NSButtonBorder)

- (void) setShowsBorderOnlyWhileMouseInside:(BOOL)show
{
    
}

- (BOOL) showsBorderOnlyWhileMouseInside
{
    
}


@end