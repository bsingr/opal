// 
//  NSButton.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSButton.h"

@implementation NSButton

- (id)initWithCoder:(NSCoder *)aCoder
{
    [super initWithCoder:aCoder];
    
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
    return [_cell state];
}

- (void)setState:(NSInteger)value
{
    [_cell setState:value];
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

- (void)setBezelStyle:(NSBezelStyle)bezelStyle
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

- (void)setShowsBorderOnlyWhileMouseInside:(BOOL)show
{
    
}

- (BOOL)showsBorderOnlyWhileMouseInside
{
    
}

@end