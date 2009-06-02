// 
//  NSTextView.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSTextView.h"


@implementation NSTextView

- (id)init
{
    [super init];
    _selectedRange = NSMakeRange(0,0);
}

- (void)insertText:(id *)aString
{
    [self replaceCharactersInRange:[self selectedRange] withString:aString];
    [self setSelectedRange:NSMakeRange(_selectedRange.location + 1, 0)];
}

- (void)deleteBackward:(id)sender
{
    [self replaceCharactersInRange:NSMakeRange ([self selectedRange].location -1, 1) withString:@""];
    [self setSelectedRange:NSMakeRange(_selectedRange.location - 1, 0)];
    //_string = _string.slice(0, _string.length - 1);
    [self postTextDidChangeNotification];
    [self setNeedsDisplay:YES];
}

- (void)moveLeft:(id)sender
{
    if (_selectedRange.location == 0)
        return;
    
    [self setSelectedRange:NSMakeRange(_selectedRange.location - 1, 0)];
}

- (void)moveRight:(id)sender
{
    if (_selectedRange.location == _string.length)
        return;
    
    [self setSelectedRange:NSMakeRange(_selectedRange.location + _selectedRange.length + 1, 0)];
}

- (void)scrollPageDown:(id)sender
{
    [self setSelectedRange:NSMakeRange(_string.length, 0)];
}

- (void)scrollPageUp:(id)sender
{
    [self setSelectedRange:NSMakeRange(0, 0)];
}

- (void)insertTab:(id)sender
{
    [[self window] makeFirstResponder:[self window]];
}

- (void)keyDown:(NSEvent *)theEvent
{
    [self interpretKeyEvents:[NSArray arrayWithObject:theEvent]];
}

- (BOOL)resignFirstResponder
{
    if (_isEditable) {
        if ([_delegate respondsToSelector:@selector(textShouldEndEditing:)]) {
            if ([_delegate textShouldEndEditing:self] == NO)
                return NO;
        }
    }
    
    // NSNotification *notification = [NSNotification notificationWithName:NSTextDidEndEditingNotification object:self userInfo:nil];
    //    [[NSNotificationCenter defaultCenter] postNotification:notification];
    //    
    return YES;
}

- (void)acceptsFirstResponder
{
    return YES;
}

- (NSUInteger)glyphIndexForPoint:(NSPoint)point
{
    [self lockFocus];
    
    for (int i = 0; i < _string.length; i++)
    {
        NSString *stringToCheck = _string.substr (0, i);
        NSString *nextStringToCheck = _string.substr (0,i + 1);
        
        NSInteger theGlyphLength = [stringToCheck sizeWithAttributes:nil];
        NSInteger nextGlyphLength = [nextStringToCheck sizeWithAttributes:nil];
        
        if ((theGlyphLength.width <= point.x) && (point.x <=nextGlyphLength.width))
        {
            return i;
        }
        
        //NSLog(theGlyphLength.width + "  " + nextGlyphLength.width + "  " + point.x);
    }
    
    [self unlockFocus];
    
    return _string.length;
}

- (void)mouseDown:(NSEvent *)theEvent
{
    NSPoint location = [self convertPoint:[theEvent locationInWindow] fromView:nil];

    NSRange theRange = NSMakeRange([self glyphIndexForPoint:location], 0);
    
    [self setSelectedRange:theRange];
}

- (void)mouseUp:(NSEvent *)theEvent
{
    
}

- (void)drawRect:(NSRect)rect
{
    if (_drawsBackground) {
        //[_backgroundColor setFill];
        //[[NSColor colorWithCalibratedRed:0.710 green:0.835 blue:1.0 alpha:0.5] set];
        
        rect = NSMakeRect(rect.origin.x+3, rect.origin.y + 3, rect.size.width - 6, rect.size.height - 6);

        
        [[NSColor colorWithCalibratedRed:1 green:1 blue:1 alpha:1] set];
        [NSBezierPath fillRect:rect];   
    }
    [[NSColor textColor] set];
    [[NSFont systemFontOfSize:[NSFont systemFontSize]] set];

    NSRect textRect = NSMakeRect(rect.origin.x, rect.origin.y + 1, 0, 0);
    
    [_string drawWithRect:textRect options:nil attributes: nil];
    
    NSInteger fullStringWidth = [_string sizeWithAttributes:nil];
    
    
    // selected range: show either beam, or highlight
    if (_selectedRange.length == 0)
    {
        NSString *stringBeforeLocation = _string.substr(0, _selectedRange.location);
        NSInteger stringBeforeWidth = [stringBeforeLocation sizeWithAttributes:nil];
        
        [[NSColor textColor] set];
        NSBezierPath *blinkingCursor = [NSBezierPath bezierPath];
        [blinkingCursor moveToPoint:NSMakePoint (rect.origin.x + stringBeforeWidth.width + 0.5, rect.origin.y - 1)];
        [blinkingCursor lineToPoint:NSMakePoint (rect.origin.x + stringBeforeWidth.width + 0.5, rect.origin.y + rect.size.height)];
        [blinkingCursor stroke];
    }
    
}

- (NSString *)string
{
    return _string;
}

- (void)setBackgroundColor:(NSColor *)aColor
{
    _backgroundColor = aColor;
}

- (NSColor *)backgroundColor
{
    return _backgroundColor;
}

- (void)setDrawsBackground:(BOOL)flag
{
    _drawsBackground = flag;
}

- (BOOL)drawsBackground
{
    return _drawsBackground;
}

- (void)setEditable:(BOOL)flag
{
    _isEditable = flag;
}

- (BOOL)isEditable
{
    return _isEditable;
}

- (void)setSelectable:(BOOL)flag
{
    _isSelectable = flag;
}

- (BOOL)isSelectable
{
    return _isSelectable;
}

- (void)setFieldEditor:(BOOL)flag
{
    _isFieldEditor = flag;
}

- (BOOL)isFieldEditor
{
    return _isFieldEditor;
}

- (void)setRichText:(BOOL)flag
{
    _isRichText = flag;
}

- (BOOL)isRichText
{
    return _isRichText;
}

- (void)setImportsGraphics:(BOOL)flag
{
    _importsGraphics = flag;
}

- (BOOL)importsGraphics
{
    return _importsGraphics;
}

- (void)setUsesFontPanel:(BOOL)flag
{
    _usesFontPanel = flag;
}

- (BOOL)usesFontPanel
{
    return _usesFontPanel;
}

- (void)toggleRuler:(id)sender
{
    // TODO
}

- (BOOL)isRulerVisible
{
    // TODO
}

- (void)setSelectedRange:(NSRange)aRange
{
    _selectedRange = aRange;
    [self setNeedsDisplay:YES];
}

- (NSRange)selectedRange
{
    return _selectedRange;
}

- (void)replaceCharactersInRange:(NSRange)aRange withRTF:(NSData *)rtfData
{
    // TODO
}

- (void)replaceCharactersInRange:(NSRange)aRange withRTFD:(NSData *)rtfdData
{
    // TODO
}

- (void)replaceCharactersInRange:(NSRange)aRange withString:(NSString *)aString
{
    _string = _string.substr(0, aRange.location) + aString + _string.substr(aRange.location + aRange.length, _string.length);
    [self postTextDidChangeNotification];
    [self setNeedsDisplay:YES];
}

- (void)setString:(NSString *)aString
{
    _string = aString;
}

- (void)selectAll:(id)sender
{
    // TODO
}

- (void)copy:(id)sender
{
    // TODO
}

- (void)cut:(id)sender
{
    // TODO
}

- (void)paste:(id)sender
{
    // TODO
}

- (void)copyFont:(id)sender
{
    // TODO
}

- (void)pasteFont:(id)sender
{
    // TODO
}

- (void)copyRuler:(id)sender
{
    // TODO
}

- (void)pasteRuler:(id)sender
{
    // TODO
}

- (void)changeFont:(id)sender
{
    // TODO
}

- (void)setFont:(NSFont *)aFont
{
    _font = aFont;
}

- (void)setFont:(NSFont *)aFont range:(NSRange)aRange
{
    // TODO
}

- (NSFont *)font
{
    return _font;
}

- (void)setAlignment:(NSTextAlignment)mode
{
    _textAlignment = mode;
}

- (void)alignCenter:(id)sender
{
    [self setAlignment:NSCenterTextAlignment];
}

- (void)alignLeft:(id)sender
{
    [self setAlignment:NSLeftTextAlignment];
}

- (void)alignRight:(id)sender
{
    [self setAlignment:NSRightTextAlignment];
}

- (NSTextAlignment)alignment
{
    return _textAlignment;
}

- (void)setTextColor:(NSColor *)aColor
{
    _textColor = aColor;
}

- (void)setTextColor:(NSColor *)aColor range:(NSRange)aRange
{
    // TODO
}

- (NSColor *)textColor
{
    return _textColor;
}

- (NSWritingDirection)baseWritingDirection
{
    // TODO
}

- (void)setBaseWritingDirection:(NSWritingDirection)writingDirection
{
    // TODO
}

- (void)superscript:(id)sender
{
    // TODO
}

- (void)subscript:(id)sender
{
    // TODO
}

- (void)unscript:(id)sender
{
    // TODO
}

- (void)underline:(id)sender
{
    // TODO
}

- (void)setMaxSize:(NSSize)aSize
{
    _maxSize = aSize;
}

- (NSSize)maxSize
{
    return _maxSize;
}

- (void)setMinSize:(NSSize)aSize
{
    _minSize = aSize;
}

- (NSSize)minSize
{
    return _minSize;
}

- (void)setVerticallyResizable:(BOOL)flag
{
    // TODO
}

- (BOOL)isVerticallyResizable
{
    // TODO
}

- (void)setHorizontallyResizable:(BOOL)flag
{
    // TODO
}

- (BOOL)isHorizontallyResizable
{
    // TODO
}

- (void)sizeToFit
{
    // TODO
}

- (void)scrollRangeToVisible:(NSRange)aRange
{
    // TODO
}

- (void)setDelegate:(id)anObject
{
    // NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
    //     
    //     if (_delegate == anObject)
    //         return;
    //     
    //     if (_delegate)
    //     {
    //         [nc removeObserver:_delegate name:NSTextDidBeginEditingNotification object:self];
    //         [nc removeObserver:_delegate name:NSTextDidEndEditingNotification object:self];
    //         [nc removeObserver:_delegate name:NSTextDidChangeNotification object:self];
    //         [nc removeObserver:_delegate name:NSTextViewDidChangeSelectionNotification object:self];
    //     }
    //     
    //     _delegate = anObject;
    //     
    //     if ([_delegate respondsToSelector:@selector(textDidBeginEditing:)])
    //         [nc addObserver:_delegate selector:@selector(textDidBeginEditing:) name:NSTextDidBeginEditingNotification object:self];
    // 
    //     if ([_delegate respondsToSelector:@selector(textDidEndEditing:)])
    //         [nc addObserver:_delegate selector:@selector(textDidEndEditing:) name:NSTextDidEndEditingNotification object:self];
    //     
    //     if ([_delegate respondsToSelector:@selector(textDidChange:)])
    //         [nc addObserver:_delegate selector:@selector(textDidChange:) name:NSTextDidChangeNotification object:self];
    //     
    //     if ([_delegate respondsToSelector:@selector(textViewDidChangeSelection:)])
    //         [nc addObserver:_delegate selector:@selector(textViewDidChangeSelection:) name:NSTextViewDidChangeSelectionNotification object:self];
}

- (id)delegate
{
    return _delegate;
}

// MARK: Posting notifications
- (void)postTextDidChangeNotification
{
    // [[NSNotificationCenter defaultCenter] postNotificationName:NSTextDidChangeNotification object:self];
}

@end

