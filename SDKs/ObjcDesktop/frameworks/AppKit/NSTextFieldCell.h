// 
//  NSTextFieldCell.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <AppKit/NSCell.h>

enum {
  NSTextFieldSquareBezel  = 0,
  NSTextFieldRoundedBezel = 1
};
typedef NSUInteger NSTextFieldBezelStyle;

@class NSColor, NSBezierPath, NSGradient;

@interface NSTextFieldCell : NSCell
{
  NSString   *_placeholderString;
  BOOL    _drawsBackground;
  BOOL    _bezeled;
  NSUInteger  _bezelStyle;
  NSUInteger  _gBorderType;
  NSColor  *_textColor;
}

- (void)setBackgroundColor:(NSColor *)color;
- (NSColor *)backgroundColor;
- (void)setDrawsBackground:(BOOL)flag;
- (BOOL)drawsBackground;
- (void)setTextColor:(NSColor *)color;
- (NSColor *)textColor;
- (NSText *)setUpFieldEditorAttributes:(NSText *)textObj;

- (void)setBezelStyle:(NSTextFieldBezelStyle)style;
- (NSTextFieldBezelStyle)bezelStyle;

- (void)setPlaceholderString:(NSString*)string;
- (NSString*)placeholderString;
- (void)setPlaceholderAttributedString:(NSAttributedString*)string;
- (NSAttributedString*)placeholderAttributedString;

- (void)setWantsNotificationForMarkedText:(BOOL)flag;
- (NSArray *)allowedInputSourceLocales;
- (void)setAllowedInputSourceLocales:(NSArray *)localeIdentifiers;

@end
