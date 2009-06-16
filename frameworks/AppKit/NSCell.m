// 
//  NSCell.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSCell.h"

@implementation NSCell

+ (BOOL)prefersTrackingUntilMouseUp
{
    // TODO: Need to implement
}


- (id)initTextCell:(NSString *)aString
{
    // TODO: Need to implement
}

- (id)initImageCell:(NSImage *)image
{
    // TODO: Need to implement
}

- (id)initWithCoder:(NSCoder *)aCoder
{
    [super initWithCoder:aCoder];
    
    _value = [aCoder decodeObjectForKey:@"NSContents"];
    NSInteger flags = [aCoder decodeIntForKey:@"NSCellFlags"];
    NSInteger flags2 = [aCoder decodeIntForKey:@"NSCellFlags2"];
    
    _state = (flags & 0x80000000) ? NSOnState : NSOffState;
    _isHighlighted = (flags & 0x40000000) ? YES : NO;
    _isEnabled = (flags & 0x20000000) ? NO : YES;
    
    _isEditable = (flags & 0x10000000) ? YES : NO;
    _isBordered = (flags & 0x00800000) ? YES : NO;
    _isBezeled = (flags & 0x00400000) ? YES : NO;
    _isSelectable = (flags & 0x00200000) ? YES : NO;
    _isScrollable = (flags & 0x00100000) ? YES : NO;
    _alignment = (flags2 & 0x1c000000) >> 26;
    _controlSize = (flags2 & 0xE0000) >> 17;
    
    return self;
}


- (NSView *)controlView
{
    return _controlView;
}

- (void)setControlView:(NSView*)view
{
    _controlView = view;
}

- (NSCellType)type
{
    // TODO: Need to implement
}

- (void)setType:(NSCellType)aType
{
    // TODO: Need to implement
}

- (NSInteger)state
{
    return _state;
}

- (void)setState:(NSInteger)value
{
    _state = value;
}

- (id)target
{
    return _target;
}

- (void)setTarget:(id)anObject
{
    _target = anObject;
}

- (SEL)action
{
    return _action;
}

- (void)setAction:(SEL)aSelector
{
    _action = aSelector;
}

- (NSInteger)tag
{
    // TODO: Need to implement
}

- (void)setTag:(NSInteger)anInt
{
    // TODO: Need to implement
}

- (NSString*)title
{
    // TODO: Need to implement
}

- (void)setTitle:(NSString*)aString
{
    // TODO: Need to implement
}

- (BOOL)isOpaque
{
    // TODO: Need to implement
}

- (BOOL)isEnabled
{
    return _isEnabled;
}

- (void)setEnabled:(BOOL)flag
{
    _isEnabled = flag;
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

- (BOOL)isEditable
{
    // TODO: Need to implement
}

- (void)setEditable:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)isSelectable
{
    return _isSelectable;
}

- (void)setSelectable:(BOOL)flag
{
    _isSelectable = flag;
}

- (BOOL)isBordered
{
    // TODO: Need to implement
}

- (void)setBordered:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)isBezeled
{
    // TODO: Need to implement
}

- (void)setBezeled:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)isScrollable
{
    // TODO: Need to implement
}

- (void)setScrollable:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)isHighlighted
{
    return _isHighlighted;
}

- (void)setHighlighted:(BOOL)flag
{
    _isHighlighted = flag;
}

- (NSTextAlignment)alignment
{
    // TODO: Need to implement
}

- (void)setAlignment:(NSTextAlignment)mode
{
    // TODO: Need to implement
}

- (BOOL)wraps
{
    // TODO: Need to implement
}

- (void)setWraps:(BOOL)flag
{
    // TODO: Need to implement
}

- (NSFont *)font
{
    // TODO: Need to implement
}

- (void)setFont:(NSFont *)fontObj
{
    // TODO: Need to implement
}

- (NSInteger)entryType
{
    // TODO: Need to implement
}

- (void)setEntryType:(NSInteger)aType
{
    // TODO: Need to implement
}

- (BOOL)isEntryAcceptable:(NSString *)aString
{
    // TODO: Need to implement
}

- (void)setFloatingPointFormat:(BOOL)autoRange left:(NSUInteger)leftDigits right:(NSUInteger)rightDigits
{
    // TODO: Need to implement
}

- (NSString *)keyEquivalent
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

- (id)objectValue
{
    // TODO: Need to implement
}

- (void)setObjectValue:(id)obj
{
    // TODO: Need to implement
}

- (BOOL)hasValidObjectValue
{
    // TODO: Need to implement
}

- (NSString *)stringValue
{
    // TODO: Need to implement
}

- (void)setStringValue:(NSString *)aString
{
    // TODO: Need to implement
}

- (NSComparisonResult)compare:(id)otherCell
{
    // TODO: Need to implement
}

- (int)intValue
{
    // TODO: Need to implement
}

- (void)setIntValue:(int)anInt
{
    // TODO: Need to implement
}

- (float)floatValue
{
    // TODO: Need to implement
}

- (void)setFloatValue:(float)aFloat
{
    // TODO: Need to implement
}

- (double)doubleValue
{
    // TODO: Need to implement
}

- (void)setDoubleValue:(double)aDouble
{
    _value = aDouble;
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

- (NSImage *)image
{
    // TODO: Need to implement
}

- (void)setImage:(NSImage *)image
{
    // TODO: Need to implement
}

- (void)setControlTint:(NSControlTint)controlTint
{
    // TODO: Need to implement
}

- (NSControlTint)controlTint
{
    // TODO: Need to implement
}

- (void)setControlSize:(NSControlSize)size
{
    // TODO: Need to implement
}

- (NSControlSize)controlSize
{
    // TODO: Need to implement
}

- (id)representedObject
{
    // TODO: Need to implement
}

- (void)setRepresentedObject:(id)anObject
{
    // TODO: Need to implement
}

- (NSInteger)cellAttribute:(NSCellAttribute)aParameter
{
    // TODO: Need to implement
}

- (void)setCellAttribute:(NSCellAttribute)aParameter to:(NSInteger)value
{
    // TODO: Need to implement
}

- (NSRect)imageRectForBounds:(NSRect)theRect
{
    // TODO: Need to implement
}

- (NSRect)titleRectForBounds:(NSRect)theRect
{
    return theRect;
}

- (NSRect)drawingRectForBounds:(NSRect)theRect
{
    // TODO: Need to implement
}

- (NSSize)cellSize
{
    // TODO: Need to implement
}

- (NSSize)cellSizeForBounds:(NSRect)aRect
{
    // TODO: Need to implement
}

- (NSColor *)highlightColorWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
    // TODO: Need to implement
}

- (void)calcDrawInfo:(NSRect)aRect
{
    // TODO: Need to implement
}

- (NSText *)setUpFieldEditorAttributes:(NSText *)textObj
{
    // [textObj setFont:[self font]];
    [textObj setAlignment:[self alignment]];
    [textObj setString:[self stringValue]];
    [textObj setSelectable:[self isSelectable]];
    [self setEditable:[self isEditable]];
    
    if ([self respondsToSelector:@selector(drawsBackground)])
        [textObj setDrawsBackground:[self drawsBackground]];
    if ([self respondsToSelector:@selector(backgroundColor)])
        [textObj setBackgroundColor:[self backgroundColor]];
        
    return textObj;
}

- (void)drawInteriorWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
    // TODO: Need to implement
}

- (void)drawWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
    [self drawInteriorWithFrame:cellFrame inView:controlView];
}

- (void)highlight:(BOOL)flag withFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
    if ([self isHighlighted] != flag)
    {
        [self setHighlighted:flag];
        [self drawWithFrame:cellFrame inView:controlView];
    }
}

- (NSInteger)mouseDownFlags
{
    // TODO: Need to implement
}

- (void)getPeriodicDelay:(float *)delay interval:(float *)interval
{
    // TODO: Need to implement
}

- (BOOL)startTrackingAt:(NSPoint)startPoint inView:(NSView *)controlView
{
    // NSLog(@"Starting tracking at: " + CGStringFromPoint(startPoint));
    if([self isEnabled])
        return YES;

    return NO;
}

- (BOOL)continueTracking:(NSPoint)lastPoint at:(NSPoint)currentPoint inView:(NSView *)controlView
{
    return YES;
}

- (void)stopTracking:(NSPoint)lastPoint at:(NSPoint)stopPoint inView:(NSView *)controlView mouseIsUp:(BOOL)flag
{
    // empty implementation
}

- (BOOL)trackMouse:(NSEvent *)theEvent inRect:(NSRect)cellFrame ofView:(NSView *)controlView untilMouseUp:(BOOL)flag
{
    [controlView lockFocus];
    
    NSPoint location = [controlView convertPoint:[theEvent locationInWindow] fromView:nil];
    
    if(![self startTrackingAt:[theEvent locationInWindow] inView:controlView])
    {
        [self drawWithFrame:cellFrame inView:controlView];
        [controlView unlockFocus];
        return NO;
    }
        
    [self highlight:YES withFrame:[controlView bounds] inView:controlView];
    [controlView unlockFocus];
     
    // for each event...
    [[NSApplication sharedApplication] nextEventMatchingMask:(NSLeftMouseUpMask | NSMouseMovedMask) forObject:self withBlock:^(id object, NSEvent *theEvent) {

        [controlView lockFocus];
        
        NSPoint location = [controlView convertPoint:[theEvent locationInWindow] fromView:nil];
        
        if(flag)
        {
            if([theEvent type] == NSLeftMouseUp)
            {
                [self stopTracking:[theEvent locationInWindow] at:[theEvent locationInWindow] inView:controlView mouseIsUp:YES];
                [[NSApplication sharedApplication] discardEventsMatchingMaskRequest];
                
                if([self state] == NSOffState)
                    _state = NSOnState;
                else
                    _state = NSOffState;
                
                [self setHighlighted:NO];
            }
            else
            {
                if(NSPointInRect(location, cellFrame))
                {
                    [self setHighlighted:YES];
                }
                else
                {
                    [self setHighlighted:NO];
                }
                
                if(![self continueTracking:[theEvent locationInWindow] at:[theEvent locationInWindow] inView:controlView])
                {
                    [[NSApplication sharedApplication] discardEventsMatchingMaskRequest];
                }
                
                // if([self isContinous])
                // {
                //     // should keep sending action (values from slider, click on button etc)
                // }
            } 
        }
        else if(NSPointInRect(location, cellFrame))
        {
            NSLog(@"Got here thought... in frame");
        }
        else
        {
            NSLog(@"Moved out of frame");
            [self stopTracking:[theEvent locationInWindow] at:[theEvent locationInWindow] inView:controlView mouseIsUp:NO];
            [[NSApplication sharedApplication] discardEventsMatchingMaskRequest];
        }
        
        [self drawWithFrame:cellFrame inView:controlView];
        
        [controlView unlockFocus];
    }];
}

- (void)editWithFrame:(NSRect)aRect inView:(NSView *)controlView editor:(NSText *)textObj delegate:(id)anObject event:(NSEvent *)theEvent
{
    if (!_isEditable && !_isSelectable)
        return;
    
    [textObj setFrame:[self titleRectForBounds:aRect]];
    [controlView addSubview:textObj];
    
    [[controlView window] makeFirstResponder:textObj];
    [textObj setDelegate:anObject];
    [textObj mouseDown:theEvent];
}

- (void)selectWithFrame:(NSRect)aRect inView:(NSView *)controlView editor:(NSText *)textObj delegate:(id)anObject start:(NSInteger)selStart length:(NSInteger)selLength
{
    if (!_isEditable && !_isSelectable)
        return;
    
    [textObj setFrame:[self titleRectForBounds:aRect]];
    [controlView addSubview:textObj];
    
    [[controlView window] makeFirstResponder:textObj];
    [textObj setDelegate:anObject];
    [textObj setSelectedRange:nil];
}

- (void)endEditing:(NSText *)textObj
{
    [self setStringValue:[textObj string]];
}

- (void)resetCursorRect:(NSRect)cellFrame inView:(NSView *)controlView
{
    // TODO: Need to implement
}


- (void)setMenu:(NSMenu *)aMenu
{
    // TODO: Need to implement
}

- (NSMenu *)menu
{
    // TODO: Need to implement
}

- (NSMenu *)menuForEvent:(NSEvent *)event inRect:(NSRect)cellFrame ofView:(NSView *)view
{
    // TODO: Need to implement
}

+ (NSMenu *)defaultMenu
{
    // TODO: Need to implement
}


- (void)setSendsActionOnEndEditing:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)sendsActionOnEndEditing
{
    // TODO: Need to implement
}


- (NSWritingDirection)baseWritingDirection
{
    // TODO: Need to implement
}

- (void)setBaseWritingDirection:(NSWritingDirection)writingDirection
{
    // TODO: Need to implement
}


- (void)setLineBreakMode:(NSLineBreakMode)mode
{
    // TODO: Need to implement
}

- (NSLineBreakMode)lineBreakMode
{
    // TODO: Need to implement
}


- (void)setAllowsUndo:(BOOL)allowsUndo
{
    // TODO: Need to implement
}

- (BOOL)allowsUndo
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


- (BOOL)truncatesLastVisibleLine
{
    // TODO: Need to implement
}

- (void)setTruncatesLastVisibleLine:(BOOL)flag
{
    // TODO: Need to implement
}

@end


@implementation NSCell (NSKeyboardUI)

- (void)setRefusesFirstResponder:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)refusesFirstResponder
{
    // TODO: Need to implement
}

- (BOOL)acceptsFirstResponder
{
    // TODO: Need to implement
}

- (void)setShowsFirstResponder:(BOOL)showFR
{
    // TODO: Need to implement
}

- (BOOL)showsFirstResponder
{
    // TODO: Need to implement
}

- (void)setMnemonicLocation:(NSUInteger)location
{
    // TODO: Need to implement
}

- (NSUInteger)mnemonicLocation
{
    // TODO: Need to implement
}

- (NSString *)mnemonic
{
    // TODO: Need to implement
}

- (void)setTitleWithMnemonic:(NSString *)stringWithAmpersand
{
    // TODO: Need to implement
}

- (void)performClick:(id)sender
{
    // TODO: Need to implement
}


- (void)setFocusRingType:(NSFocusRingType)focusRingType
{
    // TODO: Need to implement
}

- (NSFocusRingType)focusRingType
{
    // TODO: Need to implement
}

+ (NSFocusRingType)defaultFocusRingType
{
    // TODO: Need to implement
}


- (BOOL)wantsNotificationForMarkedText
{
    // TODO: Need to implement
}

@end


@implementation NSCell (NSCellAttributedStringMethods)

- (NSAttributedString *)attributedStringValue
{
    // TODO: Need to implement
}

- (void)setAttributedStringValue:(NSAttributedString *)obj
{
    // TODO: Need to implement
}

- (BOOL)allowsEditingTextAttributes
{
    // TODO: Need to implement
}

- (void)setAllowsEditingTextAttributes:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)importsGraphics
{
    // TODO: Need to implement
}

- (void)setImportsGraphics:(BOOL)flag
{
    // TODO: Need to implement
}

@end


@implementation NSCell (NSCellMixedState)

- (void)setAllowsMixedState:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)allowsMixedState
{
    // TODO: Need to implement
}

- (NSInteger)nextState
{
    // TODO: Need to implement
}

- (void)setNextState
{
    // TODO: Need to implement
}

@end

NSString *NSControlTintDidChangeNotification = @"NSControlTintDidChangeNotification";

@implementation NSCell (NSCellHitTest)

- (NSUInteger)hitTestForEvent:(NSEvent *)event inRect:(NSRect)cellFrame ofView:(NSView *)controlView
{
    // TODO: Need to implement
}

@end


@implementation NSCell (NSCellExpansion)

- (NSRect)expansionFrameWithFrame:(NSRect)cellFrame inView:(NSView *)view
{
    // TODO: Need to implement
}

- (void)drawWithExpansionFrame:(NSRect)cellFrame inView:(NSView *)view
{
    // TODO: Need to implement
}

@end


@implementation NSCell (NSCellBackgroundStyle)

- (NSBackgroundStyle)backgroundStyle
{
    // TODO: Need to implement
}

- (void)setBackgroundStyle:(NSBackgroundStyle)style
{
    // TODO: Need to implement
}

- (NSBackgroundStyle)interiorBackgroundStyle
{
    // TODO: Need to implement
}

@end

// void NSDrawThreePartImage(NSRect frame, NSImage *startCap, NSImage *centerFill, NSImage *endCap, BOOL vertical, NSCompositingOperation op, CGFloat alphaFraction, BOOL flipped)
// {
//     
// }
// 
// void NSDrawNinePartImage(NSRect frame, NSImage *topLeftCorner, NSImage *topEdgeFill, NSImage *topRightCorner, NSImage *leftEdgeFill, NSImage *centerFill, NSImage *rightEdgeFill, NSImage *bottomLeftCorner, NSImage *bottomEdgeFill, NSImage *bottomRightCorner, NSCompositingOperation op, CGFloat alphaFraction, BOOL flipped)
// {
//     
// }
