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
    self = [super initWithCoder:aCoder];
    
    _value = [aCoder decodeStringForKey:@"NSContents"];
    NSInteger _flags = [aCoder decodeIntForKey:@"NSCellFlags"];
    NSInteger _flags2 = [aCoder decodeIntForKey:@"NSCellFlags2"];
    
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
    // TODO: Need to implement
}

- (void)setState:(NSInteger)value
{
    // TODO: Need to implement
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
    // TODO: Need to implement
}

- (void)setEnabled:(BOOL)flag
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
    // TODO: Need to implement
}

- (void)setSelectable:(BOOL)flag
{
    // TODO: Need to implement
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
    // TODO: Need to implement
}

- (void)setHighlighted:(BOOL)flag
{
    // TODO: Need to implement
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

- (void)setObjectValue:(id <NSCopying>)obj
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
    // TODO: Need to implement
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
    // TODO: Need to implement
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
    // TODO: Need to implement
}

- (void)drawInteriorWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
    // TODO: Need to implement
}

- (void)drawWithFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
    // TODO: Need to implement
}

- (void)highlight:(BOOL)flag withFrame:(NSRect)cellFrame inView:(NSView *)controlView
{
    // TODO: Need to implement
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
    // TODO: Need to implement
}

- (BOOL)continueTracking:(NSPoint)lastPoint at:(NSPoint)currentPoint inView:(NSView *)controlView
{
    // TODO: Need to implement
}

- (void)stopTracking:(NSPoint)lastPoint at:(NSPoint)stopPoint inView:(NSView *)controlView mouseIsUp:(BOOL)flag
{
    // TODO: Need to implement
}

- (BOOL)trackMouse:(NSEvent *)theEvent inRect:(NSRect)cellFrame ofView:(NSView *)controlView untilMouseUp:(BOOL)flag
{
    // TODO: Need to implement
}

- (void)editWithFrame:(NSRect)aRect inView:(NSView *)controlView editor:(NSText *)textObj delegate:(id)anObject event:(NSEvent *)theEvent
{
    // TODO: Need to implement
}

- (void)selectWithFrame:(NSRect)aRect inView:(NSView *)controlView editor:(NSText *)textObj delegate:(id)anObject start:(NSInteger)selStart length:(NSInteger)selLength
{
    // TODO: Need to implement
}

- (void)endEditing:(NSText *)textObj
{
    // TODO: Need to implement
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

void NSDrawThreePartImage(NSRect frame, NSImage *startCap, NSImage *centerFill, NSImage *endCap, BOOL vertical, NSCompositingOperation op, CGFloat alphaFraction, BOOL flipped)
{
    
}

void NSDrawNinePartImage(NSRect frame, NSImage *topLeftCorner, NSImage *topEdgeFill, NSImage *topRightCorner, NSImage *leftEdgeFill, NSImage *centerFill, NSImage *rightEdgeFill, NSImage *bottomLeftCorner, NSImage *bottomEdgeFill, NSImage *bottomRightCorner, NSCompositingOperation op, CGFloat alphaFraction, BOOL flipped)
{
    
}
