// 
//  NSControl.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/Foundation.m>
#import <AppKit/NSView.m>
#import <AppKit/NSCell.m>
#import <AppKit/NSText.m>

@implementation NSControl : NSView
{
    NSInteger       _tag;
    NSCell         *_cell;
}

+ (void)setCellClass:(Class)factoryId
{
    // TODO: Need to implement
}

+ (Class)cellClass
{
    return NSCell;
}


- (id)initWithFrame:(NSRect)frameRect
{
    self = [super initWithFrame:frameRect];
    if (self) {
        [self setCell:[[[self cellClass] alloc] init]];
    }
    
    return self;
}

- (id)initWithCoder:(NSCoder *)aCoder
{
    self = [super initWithCoder];
    _cell = [aCoder decodeObjectForKey:@"NSCell"];
    return self;
}

- (void)sizeToFit
{
    // TODO: Need to implement
}

- (void)calcSize
{
    // TODO: Need to implement
}

- (id)cell
{
    return _cell;
}

- (void)setCell:(NSCell *)aCell
{
    _cell = aCell;
    [_cell setControlView:self];
    [self setNeedsDisplay:YES];
}

- (id)selectedCell
{
    // TODO: Need to implement
}

- (id)target
{
    return [_cell target];
}

- (void)setTarget:(id)anObject
{
    [_cell setTarget:anObject];
}

- (SEL)action
{
    return [_cell action];
}

- (void)setAction:(SEL)aSelector
{
    [_cell setAction:aSelector];
}

- (NSInteger)tag
{
    // TODO: Need to implement
}

- (void)setTag:(NSInteger)anInt
{
    // TODO: Need to implement
}

- (NSInteger)selectedTag
{
    // TODO: Need to implement
}

- (void)setIgnoresMultiClick:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)ignoresMultiClick
{
    // TODO: Need to implement
}

- (NSInteger)sendActionOn:(NSInteger)mask
{
    // TODO: Need to implement
}

- (BOOL)isContinuous
{
    // TODO: Need to implement
}

- (void)setContinuous:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)isEnabled
{
    return [_cell isEnabled];
}

- (void)setEnabled:(BOOL)flag
{
    [_cell setEnabled:flag];
}

- (void)setFloatingPointFormat:(BOOL)autoRange left:(NSUInteger)leftDigits right:(NSUInteger)rightDigits
{
    // TODO: Need to implement
}

- (NSTextAlignment)alignment
{
    return [_cell alignment];
}

- (void)setAlignment:(NSTextAlignment)mode
{
    [_cell setAlignment:mode];
    [self setNeedsDisplay:YES];
}

- (NSFont *)font
{
    // TODO: Need to implement
}

- (void)setFont:(NSFont *)fontObj
{
    // TODO: Need to implement
}

- (void)setFormatter:(NSFormatter *)newFormatter
{
    // TODO: Need to implement
}

- (id)formatter
{
    // TODO: Need to implement
}

- (void)setObjectValue:(id<NSCopying>)obj
{
    [_cell setObjectValue:aString];
}

- (void)setStringValue:(NSString *)aString
{
    [_cell setStringValue:aString];
}

- (void)setIntValue:(int)anInt
{
    [_cell setIntValue:anInt];
}

- (void)setFloatValue:(float)aFloat
{
    [_cell setFloatValue:aFloat];
}

- (void)setDoubleValue:(double)aDouble
{
    [_cell setDoubleValue:aDouble];
}

- (id)objectValue
{
    return [_cell objectValue];
}

- (NSString *)stringValue
{
    return [_cell stringValue];
}

- (int)intValue
{
    return [_cell intValue];
}

- (float)floatValue
{
    return [_cell floatValue];
}

- (double)doubleValue
{
    return [_cell doubleValue];
}

- (void)setNeedsDisplay
{
    // TODO: Need to implement
}

- (void)updateCell:(NSCell *)aCell
{
    // TODO: Need to implement
}

- (void)updateCellInside:(NSCell *)aCell
{
    // TODO: Need to implement
}

- (void)drawCellInside:(NSCell *)aCell
{
    // TODO: Need to implement
}

- (void)drawCell:(NSCell *)aCell
{
    // TODO: Need to implement
}

- (void)selectCell:(NSCell *)aCell
{
    // TODO: Need to implement
}


- (BOOL)sendAction:(SEL)theAction to:(id)theTarget
{
    if (theAction && theTarget) {
        [[NSApplication sharedApplication] sendAction:theAction to:theTarget from:self];
        return YES;
    }
    
    return NO;
}

- (void)takeIntValueFrom:(id)sender
{
    // TODO: Need to implement
}

- (void)takeFloatValueFrom:(id)sender
{
    // TODO: Need to implement
}

- (void)takeDoubleValueFrom:(id)sender
{
    // TODO: Need to implement
}

- (void)takeStringValueFrom:(id)sender
{
    // TODO: Need to implement
}

- (void)takeObjectValueFrom:(id)sender
{
    // TODO: Need to implement
}

- (NSText *)currentEditor
{
    // TODO: Need to implement
}

- (BOOL)abortEditing
{
    if (_currentEditor) {
        [[self window] endEditingFor:self];
        _currentEditor = nil;
    }
    
    return NO;
}

- (void)validateEditing
{
    // TODO: Need to implement
}

- (void)mouseDown:(NSEvent *)theEvent
{
    if (![self isEnabled])
        return;
        
    [self lockFocus];
    
    NSPoint location = [self convertPoint:[theEvent locationInWindow] fromView:nil];
    
    if (NSPointInRect (location, _bounds))
        [_cell highlight:YES withFrame:_bounds inView:self];
        
    [[NSApplication sharedApplication] nextEventMatchingMask(NSLeftMouseUpMask | NSMouseMovedMask) untilDate:nil inMode:nil dequeue:nil withTarget:self withSelector:@selector(_mouseDownHandle:)];
    
    [self unlockFocus];
}

// Private method used for handlign events until mouse leaves interest scope of control
- (void)_mouseDownHandle:(NSEvent *)theEvent
{
    NSPoint location = [self convertPoint:[theEvent locationInWindow] fromView:nil];
    
    if (NSPointInRect (location, _bounds)) {
        if ([theEvent type] == NSLeftMouseUp) {
            [self sendAction:[self action] to:[self target]];
            [self lockFocus];
            [_cell highlight:NO withFrame:_bounds inView:self];
            [self unlockFocus];
            return;
        }
        else if ([theEvent type] == NSMouseMoved) {
            [[NSApplication sharedApplication] nextEventMatchingMask(NSLeftMouseUpMask | NSMouseMovedMask) untilDate:nil inMode:nil dequeue:nil withTarget:self withSelector:@selector(_mouseDownHandle:)];
            return;
        }
    }
    
    [self lockFocus];
    [_cell highlight:NO withFrame:_bounds inView:self];
    [self unlockFocus];
}


- (NSWritingDirection)baseWritingDirection
{
    // TODO: Need to implement
}

- (void)setBaseWritingDirection:(NSWritingDirection)writingDirection
{
    // TODO: Need to implement
}


- (NSInteger)integerValue
{
    // TODO: Need to implement
}

- (void)setIntegerValue:(NSInteger)anInteger
{
    // TODO: Need to implement
}

- (void)takeIntegerValueFrom:(id)sender
{
    // TODO: Need to implement
}

@end

@implementation NSControl (NSKeyboardUI)

- (void)performClick:sender
{
    // TODO: Need to implement
}

- (void)setRefusesFirstResponder:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)refusesFirstResponder
{
    // TODO: Need to implement
}

@end

@implementation NSObject (NSControlSubclassNotifications)

- (void)controlTextDidBeginEditing:(NSNotification *)obj
{
    // TODO: Need to implement
}

- (void)controlTextDidEndEditing:(NSNotification *)obj
{
    // TODO: Need to implement
}

- (void)controlTextDidChange:(NSNotification *)obj
{
    // TODO: Need to implement
}

@end

@interface NSObject (NSControlSubclassDelegate)

- (BOOL)control:(NSControl *)control textShouldBeginEditing:(NSText *)fieldEditor;
- (BOOL)control:(NSControl *)control textShouldEndEditing:(NSText *)fieldEditor;
- (BOOL)control:(NSControl *)control didFailToFormatString:(NSString *)string errorDescription:(NSString *)error;
- (void)control:(NSControl *)control didFailToValidatePartialString:(NSString *)string errorDescription:(NSString *)error;
- (BOOL)control:(NSControl *)control isValidObject:(id)obj;

- (BOOL)control:(NSControl *)control textView:(NSTextView *)textView doCommandBySelector:(SEL)commandSelector;
- (NSArray *)control:(NSControl *)control textView:(NSTextView *)textView completions:(NSArray *)words forPartialWordRange:(NSRange)charRange indexOfSelectedItem:(NSInteger *)index;

@end

NSString *NSControlTextDidBeginEditingNotification = @"NSControlTextDidBeginEditingNotification";
NSString *NSControlTextDidEndEditingNotification = @"NSControlTextDidEndEditingNotification";
NSString *NSControlTextDidChangeNotification = @"NSControlTextDidChangeNotification";

@implementation NSControl (NSControlAttributedStringMethods)

- (NSAttributedString *)attributedStringValue
{
    // TODO: Need to implement
}

- (void)setAttributedStringValue:(NSAttributedString *)obj
{
    // TODO: Need to implement
}


@end
