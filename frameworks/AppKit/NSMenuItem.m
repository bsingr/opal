// 
//  NSMenuItem.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSMenuItem.h"


@implementation NSMenuItem

// MARK: Creating a menu item
- (id)init
{
    [super init];
    _title = @"";
    _action = nil;
    _keyEquivalent = nil;
    return self;
}

- (id)initWithTitle:(NSString *)itemName action:(SEL)anAction keyEquivalent:(NSString *)charCode
{
    [self init];
    
    if (self)
    {
        _title = itemName;
        _action = anAction;
        _keyEquivalent = charCode;
        _keyEquivalentModifierMask = 0;
        
        _menu = nil;
        _subMenu = nil;
        _tag = -1;
        _target = nil;
        
        _isEnabled = YES;
        _isHidden = NO;
    }
    
    return self;
}

- (id)initWithCoder:(NSCoder *)aCoder
{
    _title = [aCoder decodeStringForKey:@"NSTitle"];
    _keyEquivalent = [aCoder decodeStringForKey:@"NSKeyEquiv"];
    _action = [aCoder decodeStringForKey:@"NSAction"];
    _target = [aCoder decodeObjectForKey:@"NSTarget"];
    _menu = [aCoder decodeObjectForKey:@"NSMenu"];
    _subMenu = [aCoder decodeObjectForKey:@"NSSubmenu"];
    
    _isEnabled = YES;
    _isHidden = NO;
    
    return self;
}

// MARK: Enabling a menu item
- (void)setEnabled:(BOOL)flag
{
    if (flag == 0)
        flag = NO;
    
    _isEnabled = flag;
}

- (BOOL)isEnabled
{
    return _isEnabled;
}

// MARK: Handling hidden status
- (void)setHidden:(BOOL)hidden{}
- (BOOL)isHidden{}
- (BOOL)isHiddenOrHasHiddenAncestor{}

// MARK: Managing the target and action
- (void)setTarget:(id)anObject
{
    _target = anObject;
}

- (id)target
{
    return _target;
}

- (void)setAction:(SEL)aSelector
{
    _action = aSelector;
}

- (SEL)action
{
    return _action;
}

// MARK: Managing the title
- (void)setTitle:(NSString *)aString
{
    _title = aString;
}

- (NSString *)title
{
    return _title;
}

- (void)setAttributedTitle:(NSAttributedString *)string{}
- (NSAttributedString *)attributedTitle{}

// MARK: Managing the tag
- (void)setTag:(NSInteger)anInt
{
    _tag = anInt;
}

- (NSInteger)tag
{
    return _tag;
}

// MARK: Managing the state
- (void)setState:(NSInteger)itemState
{
    _state = itemState;
}

- (NSInteger)state
{
    return _state;
}

// MARK: Managing the image
- (void)setImage:(NSImage *)menuImage{}
- (NSImage *)image{}
- (void)setOnStateImage:(NSImage *)itemImage{}
- (NSImage *)onStateImage{}
- (void)setOffStateImage:(NSImage *)itemImage{}
- (NSImage *)offStateImage{}
- (void)setMixedStateImage:(NSImage *)itemImage{}
- (NSImage *)mixedStateImage{}

// MARK: Managing submens
- (void)setSubmenu:(NSMenu *)aSubmenu
{
    _subMenu = aSubmenu;
}

- (NSMenu *)submenu
{
    return _subMenu;
}

- (BOOL)hasSubmenu
{
    if (_subMenu)
        return YES;
    
    return NO;
}

// MARK: Getting a seperator item
+ (NSMenuItem *)separatorItem
{
    return [[NSMenuItem alloc] initWithTitle:@"" action:nil keyEquivalent:nil];
}

- (BOOL)isSeparatorItem
{
    if ((_title == @"") || (_title == nil))
        return YES;
    
    return NO;
}

// MARK: Managing the owner menu
- (void)setMenu:(NSMenu *)aMenu
{
    _menu = aMenu;
}

- (NSMenu *)menu
{
    return _menu;
}

// MARK: Managing key equivalents
- (void)setKeyEquivalent:(NSString *)aString{}
- (NSString *)keyEquivalent{}
- (void)setKeyEquivalentModifierMask:(NSUInteger)mask{}
- (NSUInteger)keyEquivalentModifierMask{}

// MARK: Managing mnenomics
- (void)setMnemonicLocation:(NSUInteger)location{}
- (NSUInteger)mnemonicLocation{}
- (void)setTitleWithMnemonic:(NSString *)aString{}
- (NSString *)mnemonic{}

// MARK: Managing user key equivalents
+ (void)setUsesUserKeyEquivalents:(BOOL)flag{}
+ (BOOL)usesUserKeyEquivalents{}
- (NSString *)userKeyEquivalent{}

// MARK: Managing alternates
- (void)setAlternate:(BOOL)isAlternate{}
- (BOOL)isAlternate{}

// MARK: Managing indentation levels
- (void)setIndentationLevel:(NSInteger)indentationLevel{}
- (NSInteger)indentationLevel{}

// MARK: Managing tooltips
- (void)setToolTip:(NSString *)toolTip{}
- (NSString *)toolTip{}

// MARK: Representing an object
- (void)setRepresentedObject:(id)anObject{}
- (id)representedObject{}

// MARK: Managing the View
- (void)setView:(NSView *)view{}
- (NSView *)view{}

// MARK: Getting highlight status
- (BOOL)isHighlighted{}


@end


