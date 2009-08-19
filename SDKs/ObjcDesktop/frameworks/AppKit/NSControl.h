// 
//  NSControl.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/Foundation.h>
#import <AppKit/NSView.h>
#import <AppKit/NSCell.h>
#import <AppKit/NSText.h>
#import <AppKit/NSApplication.h>

@interface NSControl : NSView
{
  NSInteger     _tag;
  NSCell     *_cell;
  
  NSText     *_currentEditor;
  BOOL      _isEnabled;
  id        _value;
}

+ (void)setCellClass:(Class)factoryId;
+ (Class)cellClass;

- (void)sizeToFit;
- (void)calcSize;
- (id)cell;
- (void)setCell:(NSCell *)aCell;
- (id)selectedCell;
- (id)target;
- (void)setTarget:(id)anObject;
- (SEL)action;
- (void)setAction:(SEL)aSelector;
- (NSInteger)tag;
- (void)setTag:(NSInteger)anInt;
- (NSInteger)selectedTag;
- (void)setIgnoresMultiClick:(BOOL)flag;
- (BOOL)ignoresMultiClick;
- (NSInteger)sendActionOn:(NSInteger)mask;
- (BOOL)isContinuous;
- (void)setContinuous:(BOOL)flag;
- (BOOL)isEnabled;
- (void)setEnabled:(BOOL)flag;
- (void)setFloatingPointFormat:(BOOL)autoRange left:(NSUInteger)leftDigits right:(NSUInteger)rightDigits;
- (NSTextAlignment)alignment;
- (void)setAlignment:(NSTextAlignment)mode;
- (NSFont *)font;
- (void)setFont:(NSFont *)fontObj;
- (void)setFormatter:(NSFormatter *)newFormatter;
- (id)formatter;
- (void)setObjectValue:(id)obj;
- (void)setStringValue:(NSString *)aString;
- (void)setIntValue:(int)anInt;
- (void)setFloatValue:(float)aFloat;
- (void)setDoubleValue:(double)aDouble;
- (id)objectValue;
- (NSString *)stringValue;
- (int)intValue;
- (float)floatValue;
- (double)doubleValue;
- (void)setNeedsDisplay;
- (void)updateCell:(NSCell *)aCell;
- (void)updateCellInside:(NSCell *)aCell;
- (void)drawCellInside:(NSCell *)aCell;
- (void)drawCell:(NSCell *)aCell;
- (void)selectCell:(NSCell *)aCell;

- (BOOL)sendAction:(SEL)theAction to:(id)theTarget;
- (void)takeIntValueFrom:(id)sender;
- (void)takeFloatValueFrom:(id)sender;
- (void)takeDoubleValueFrom:(id)sender;
- (void)takeStringValueFrom:(id)sender;
- (void)takeObjectValueFrom:(id)sender;
- (NSText *)currentEditor;
- (BOOL)abortEditing;
- (void)validateEditing;
- (NSWritingDirection)baseWritingDirection;
- (void)setBaseWritingDirection:(NSWritingDirection)writingDirection;

- (NSInteger)integerValue;
- (void)setIntegerValue:(NSInteger)anInteger;
- (void)takeIntegerValueFrom:(id)sender;

@end


@interface NSControl (NSKeyboardUI)

- (void)performClick:(id)sender;
- (void)setRefusesFirstResponder:(BOOL)flag;
- (BOOL)refusesFirstResponder;

@end


@interface NSObject (NSControlSubclassNotifications)

- (void)controlTextDidBeginEditing:(NSNotification *)obj;
- (void)controlTextDidEndEditing:(NSNotification *)obj;
- (void)controlTextDidChange:(NSNotification *)obj;

@end


@interface NSObject (NSControlSubclassDelegate)

- (BOOL)control:(NSControl *)control textShouldBeginEditing:(NSText *)fieldEditor;
- (BOOL)control:(NSControl *)control textShouldEndEditing:(NSText *)fieldEditor;
- (BOOL)control:(NSControl *)control didFailToFormatString:(NSString *)string errorDescription:(NSString *)error;
- (void)control:(NSControl *)control didFailToValidatePartialString:(NSString *)string errorDescription:(NSString *)error;
- (BOOL)control:(NSControl *)control isValidObject:(id)obj;

// - (BOOL)control:(NSControl *)control textView:(NSTextView *)textView doCommandBySelector:(SEL)commandSelector;
// - (NSArray *)control:(NSControl *)control textView:(NSTextView *)textView completions:(NSArray *)words forPartialWordRange:(NSRange)charRange indexOfSelectedItem:(NSInteger *)index;

@end

extern NSString *NSControlTextDidBeginEditingNotification;
extern NSString *NSControlTextDidEndEditingNotification;
extern NSString *NSControlTextDidChangeNotification;

@interface NSControl (NSControlAttributedStringMethods)

// - (NSAttributedString *)attributedStringValue;
// - (void)setAttributedStringValue:(NSAttributedString *)obj;

@end