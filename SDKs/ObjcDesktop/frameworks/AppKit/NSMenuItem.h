// 
//  NSMenuItem.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>
#import <AppKit/NSView.h>

@class NSMenu, NSImage, NSAttributedString, NSView;

@interface NSMenuItem : NSObject
{
    NSMenu      *_menu;
    NSMenu      *_subMenu;
    NSString    *_title;
    NSString    *_keyEquivalent;
    NSUInteger   _keyEquivalentModifierMask;
    NSInteger    _mnenomicLocation;
    NSInteger    _state;
    NSImage     *_onStateImage;
    NSImage     *_offStateImage;
    id           _target;
    SEL          _action;
    NSInteger    _tag;
    id           _extraData;
    
    BOOL         _isEnabled;
    BOOL         _isHidden;
}

+ (void)setUsesUserKeyEquivalents:(BOOL)flag;
+ (BOOL)usesUserKeyEquivalents;

+ (NSMenuItem *)separatorItem;

- (id)initWithTitle:(NSString *)aString action:(SEL)aSelector keyEquivalent:(NSString *)charCode;

- (void)setMenu:(NSMenu *)menu;
- (NSMenu *)menu;

- (BOOL)hasSubmenu;
- (void)setSubmenu:(NSMenu *)submenu;
- (NSMenu *)submenu;

- (void)setTitle:(NSString *)aString;
- (NSString *)title;
- (void)setAttributedTitle:(NSAttributedString*)string;
- (NSAttributedString*)attributedTitle;

- (BOOL)isSeparatorItem;

- (void)setKeyEquivalent:(NSString *)aKeyEquivalent;
- (NSString *)keyEquivalent;
- (void)setKeyEquivalentModifierMask:(NSUInteger)mask;
- (NSUInteger)keyEquivalentModifierMask;

- (NSString *)userKeyEquivalent;

- (void)setMnemonicLocation:(NSUInteger)location;
- (NSUInteger)mnemonicLocation;
- (NSString *)mnemonic;
- (void)setTitleWithMnemonic:(NSString *)stringWithAmpersand;

- (void)setImage:(NSImage *)menuImage;
- (NSImage *)image;

- (void)setState:(NSInteger)state;
- (NSInteger)state;
- (void)setOnStateImage:(NSImage *)image;
- (NSImage *)onStateImage;
- (void)setOffStateImage:(NSImage *)image;
- (NSImage *)offStateImage;
- (void)setMixedStateImage:(NSImage *)image;
- (NSImage *)mixedStateImage;

- (void)setEnabled:(BOOL)flag;
- (BOOL)isEnabled;


- (void) setAlternate:(BOOL)isAlternate;
- (BOOL) isAlternate;

- (void) setIndentationLevel:(NSInteger)indentationLevel;
- (NSInteger) indentationLevel;

- (void)setTarget:(id)anObject;
- (id)target;
- (void)setAction:(SEL)aSelector;
- (SEL)action;

- (void)setTag:(NSInteger)anInt;
- (NSInteger)tag;

- (void)setRepresentedObject:(id)anObject;
- (id)representedObject;

- (void)setView:(NSView *)view;
- (NSView *)view;

- (BOOL)isHighlighted;

- (void)setHidden:(BOOL)hidden;
- (BOOL)isHidden;
- (BOOL)isHiddenOrHasHiddenAncestor;

- (void) setToolTip:(NSString*)toolTip;
- (NSString*)toolTip;

@end


@interface NSView (NSViewEnclosingMenuItem)

- (NSMenuItem *)enclosingMenuItem;

@end
