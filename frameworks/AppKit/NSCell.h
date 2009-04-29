#import <Foundation/NSObject.m>
#import <Foundation/NSGeometry.m>
#import <AppKit/NSText.h>

enum {
    NSAnyType				        = 0,
    NSIntType				        = 1,
    NSPositiveIntType			    = 2,
    NSFloatType				        = 3,
    NSPositiveFloatType			    = 4,
    NSDoubleType			        = 6,
    NSPositiveDoubleType		    = 7
};

enum {
    NSNullCellType			        = 0,
    NSTextCellType			        = 1,
    NSImageCellType			        = 2
};
typedef NSUInteger NSCellType;

enum {
    NSCellDisabled			        = 0,
    NSCellState				        = 1,
    NSPushInCell			        = 2,
    NSCellEditable			        = 3,
    NSChangeGrayCell			    = 4,
    NSCellHighlighted			    = 5,
    NSCellLightsByContents		    = 6,
    NSCellLightsByGray			    = 7,
    NSChangeBackgroundCell		    = 8,
    NSCellLightsByBackground		= 9,
    NSCellIsBordered			    = 10,
    NSCellHasOverlappingImage		= 11,
    NSCellHasImageHorizontal		= 12,
    NSCellHasImageOnLeftOrBottom	= 13,
    NSCellChangesContents		    = 14,
    NSCellIsInsetButton			    = 15,
    NSCellAllowsMixedState		    = 16
};
typedef NSUInteger NSCellAttribute;

enum {
    NSNoImage				        = 0,
    NSImageOnly				        = 1,
    NSImageLeft				        = 2,
    NSImageRight			        = 3,
    NSImageBelow			        = 4,
    NSImageAbove			        = 5,
    NSImageOverlaps			        = 6
};
typedef NSUInteger NSCellImagePosition;


enum {
    NSImageScaleProportionallyDown  = 0,
    NSImageScaleAxesIndependently,
    NSImageScaleNone,
    NSImageScaleProportionallyUpOrDown
};
typedef NSUInteger NSImageScaling;

enum {
    NSMixedState                    = -1,
    NSOffState                      = 0,
    NSOnState                       = 1    
};
typedef NSInteger NSCellStateValue;

enum {
    NSNoCellMask			        = 0,
    NSContentsCellMask			    = 1,
    NSPushInCellMask			    = 2,
    NSChangeGrayCellMask		    = 4,
    NSChangeBackgroundCellMask		= 8
};

enum {
    NSDefaultControlTint            = 0,
    NSBlueControlTint               = 1,
    NSGraphiteControlTint           = 6,
    NSClearControlTint              = 7
};
typedef NSUInteger NSControlTint;

enum {
    NSRegularControlSize,
    NSSmallControlSize,
    NSMiniControlSize
};
typedef NSUInteger NSControlSize;

@interface NSCell : NSObject <NSCopying, NSCoding>
{
    
}

+ (BOOL)prefersTrackingUntilMouseUp;

- (id)initTextCell:(NSString *)aString;
- (id)initImageCell:(NSImage *)image;

- (NSView *)controlView;
- (void)setControlView:(NSView*)view;
- (NSCellType)type;
- (void)setType:(NSCellType)aType;
- (NSInteger)state;
- (void)setState:(NSInteger)value;
- (id)target;
- (void)setTarget:(id)anObject;
- (SEL)action;
- (void)setAction:(SEL)aSelector;
- (NSInteger)tag;
- (void)setTag:(NSInteger)anInt;
- (NSString*)title;
- (void)setTitle:(NSString*)aString;
- (BOOL)isOpaque;
- (BOOL)isEnabled;
- (void)setEnabled:(BOOL)flag;
- (NSInteger)sendActionOn:(NSInteger)mask;
- (BOOL)isContinuous;
- (void)setContinuous:(BOOL)flag;
- (BOOL)isEditable;
- (void)setEditable:(BOOL)flag;
- (BOOL)isSelectable;
- (void)setSelectable:(BOOL)flag;
- (BOOL)isBordered;
- (void)setBordered:(BOOL)flag;
- (BOOL)isBezeled;
- (void)setBezeled:(BOOL)flag;
- (BOOL)isScrollable;
- (void)setScrollable:(BOOL)flag;
- (BOOL)isHighlighted;
- (void)setHighlighted:(BOOL)flag;
- (NSTextAlignment)alignment;
- (void)setAlignment:(NSTextAlignment)mode;
- (BOOL)wraps;
- (void)setWraps:(BOOL)flag;
- (NSFont *)font;
- (void)setFont:(NSFont *)fontObj;
- (NSInteger)entryType;
- (void)setEntryType:(NSInteger)aType;
- (BOOL)isEntryAcceptable:(NSString *)aString;
- (void)setFloatingPointFormat:(BOOL)autoRange left:(NSUInteger)leftDigits right:(NSUInteger)rightDigits;
- (NSString *)keyEquivalent;
- (void)setFormatter:(NSFormatter *)newFormatter;
- (id)formatter;
- (id)objectValue;
- (void)setObjectValue:(id <NSCopying>)obj;
- (BOOL)hasValidObjectValue;
- (NSString *)stringValue;
- (void)setStringValue:(NSString *)aString;
- (NSComparisonResult)compare:(id)otherCell;
- (int)intValue;
- (void)setIntValue:(int)anInt;
- (float)floatValue;
- (void)setFloatValue:(float)aFloat;
- (double)doubleValue;
- (void)setDoubleValue:(double)aDouble;
- (void)takeIntValueFrom:(id)sender;
- (void)takeFloatValueFrom:(id)sender;
- (void)takeDoubleValueFrom:(id)sender;
- (void)takeStringValueFrom:(id)sender;
- (void)takeObjectValueFrom:(id)sender;
- (NSImage *)image;
- (void)setImage:(NSImage *)image;
- (void)setControlTint:(NSControlTint)controlTint;
- (NSControlTint)controlTint;
- (void)setControlSize:(NSControlSize)size;
- (NSControlSize)controlSize;
- (id)representedObject;
- (void)setRepresentedObject:(id)anObject;
- (NSInteger)cellAttribute:(NSCellAttribute)aParameter;
- (void)setCellAttribute:(NSCellAttribute)aParameter to:(NSInteger)value;
- (NSRect)imageRectForBounds:(NSRect)theRect;
- (NSRect)titleRectForBounds:(NSRect)theRect;
- (NSRect)drawingRectForBounds:(NSRect)theRect;
- (NSSize)cellSize;
- (NSSize)cellSizeForBounds:(NSRect)aRect;
- (NSColor *)highlightColorWithFrame:(NSRect)cellFrame inView:(NSView *)controlView;
- (void)calcDrawInfo:(NSRect)aRect;
- (NSText *)setUpFieldEditorAttributes:(NSText *)textObj;
- (void)drawInteriorWithFrame:(NSRect)cellFrame inView:(NSView *)controlView;
- (void)drawWithFrame:(NSRect)cellFrame inView:(NSView *)controlView;
- (void)highlight:(BOOL)flag withFrame:(NSRect)cellFrame inView:(NSView *)controlView;
- (NSInteger)mouseDownFlags;
- (void)getPeriodicDelay:(float *)delay interval:(float *)interval;
- (BOOL)startTrackingAt:(NSPoint)startPoint inView:(NSView *)controlView;
- (BOOL)continueTracking:(NSPoint)lastPoint at:(NSPoint)currentPoint inView:(NSView *)controlView;
- (void)stopTracking:(NSPoint)lastPoint at:(NSPoint)stopPoint inView:(NSView *)controlView mouseIsUp:(BOOL)flag;
- (BOOL)trackMouse:(NSEvent *)theEvent inRect:(NSRect)cellFrame ofView:(NSView *)controlView untilMouseUp:(BOOL)flag;
- (void)editWithFrame:(NSRect)aRect inView:(NSView *)controlView editor:(NSText *)textObj delegate:(id)anObject event:(NSEvent *)theEvent;
- (void)selectWithFrame:(NSRect)aRect inView:(NSView *)controlView editor:(NSText *)textObj delegate:(id)anObject start:(NSInteger)selStart length:(NSInteger)selLength;
- (void)endEditing:(NSText *)textObj;
- (void)resetCursorRect:(NSRect)cellFrame inView:(NSView *)controlView;

- (void)setMenu:(NSMenu *)aMenu;
- (NSMenu *)menu;
- (NSMenu *)menuForEvent:(NSEvent *)event inRect:(NSRect)cellFrame ofView:(NSView *)view;
+ (NSMenu *)defaultMenu;

- (void)setSendsActionOnEndEditing:(BOOL)flag;
- (BOOL)sendsActionOnEndEditing;

- (NSWritingDirection)baseWritingDirection;
- (void)setBaseWritingDirection:(NSWritingDirection)writingDirection;

- (void)setLineBreakMode:(NSLineBreakMode)mode;
- (NSLineBreakMode)lineBreakMode;

- (void)setAllowsUndo:(BOOL)allowsUndo;
- (BOOL)allowsUndo;

- (NSInteger)integerValue;
- (void)setIntegerValue:(NSInteger)anInteger;
- (void)takeIntegerValueFrom:(id)sender;

- (BOOL)truncatesLastVisibleLine;
- (void)setTruncatesLastVisibleLine:(BOOL)flag;

@end


@interface NSCell (NSKeyboardUI)

- (void)setRefusesFirstResponder:(BOOL)flag;
- (BOOL)refusesFirstResponder;
- (BOOL)acceptsFirstResponder;
- (void)setShowsFirstResponder:(BOOL)showFR;
- (BOOL)showsFirstResponder;
- (void)setMnemonicLocation:(NSUInteger)location;
- (NSUInteger)mnemonicLocation;
- (NSString *)mnemonic;
- (void)setTitleWithMnemonic:(NSString *)stringWithAmpersand;
- (void)performClick:(id)sender;

- (void)setFocusRingType:(NSFocusRingType)focusRingType;
- (NSFocusRingType)focusRingType;
+ (NSFocusRingType)defaultFocusRingType;

- (BOOL)wantsNotificationForMarkedText;

@end


@interface NSCell (NSCellAttributedStringMethods)

- (NSAttributedString *)attributedStringValue;
- (void)setAttributedStringValue:(NSAttributedString *)obj;
- (BOOL)allowsEditingTextAttributes;
- (void)setAllowsEditingTextAttributes:(BOOL)flag;
- (BOOL)importsGraphics;
- (void)setImportsGraphics:(BOOL)flag;

@end


@interface NSCell (NSCellMixedState)

- (void)setAllowsMixedState:(BOOL)flag;
- (BOOL)allowsMixedState;
- (NSInteger)nextState;
- (void)setNextState;

@end

extern NSString *NSControlTintDidChangeNotification;

enum {
    NSCellHitNone               = 0,
    NSCellHitContentArea        = 1 << 0,
    NSCellHitEditableTextArea   = 1 << 1,
    NSCellHitTrackableArea      = 1 << 2,
};

@interface NSCell (NSCellHitTest)

- (NSUInteger)hitTestForEvent:(NSEvent *)event inRect:(NSRect)cellFrame ofView:(NSView *)controlView;

@end


@interface NSCell (NSCellExpansion)

- (NSRect)expansionFrameWithFrame:(NSRect)cellFrame inView:(NSView *)view;
- (void)drawWithExpansionFrame:(NSRect)cellFrame inView:(NSView *)view;

@end


enum {
    NSBackgroundStyleLight = 0,
    NSBackgroundStyleDark,
    NSBackgroundStyleRaised,
    NSBackgroundStyleLowered
};
typedef NSInteger NSBackgroundStyle;

@interface NSCell (NSCellBackgroundStyle)

- (NSBackgroundStyle)backgroundStyle;
- (void)setBackgroundStyle:(NSBackgroundStyle)style;
- (NSBackgroundStyle)interiorBackgroundStyle;

@end


extern void NSDrawThreePartImage(NSRect frame, NSImage *startCap, NSImage *centerFill, NSImage *endCap, BOOL vertical, NSCompositingOperation op, CGFloat alphaFraction, BOOL flipped);
extern void NSDrawNinePartImage(NSRect frame, NSImage *topLeftCorner, NSImage *topEdgeFill, NSImage *topRightCorner, NSImage *leftEdgeFill, NSImage *centerFill, NSImage *rightEdgeFill, NSImage *bottomLeftCorner, NSImage *bottomEdgeFill, NSImage *bottomRightCorner, NSCompositingOperation op, CGFloat alphaFraction, BOOL flipped);