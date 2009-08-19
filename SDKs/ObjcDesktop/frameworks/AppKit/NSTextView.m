// 
//  NSTextView.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSTextView.h"

NSString *NSTextViewWillChangeNotifyingTextViewNotification = @"NSTextViewWillChangeNotifyingTextViewNotification";
NSString *NSTextViewDidChangeSelectionNotification = @"NSTextViewDidChangeSelectionNotification";
NSString *NSTextViewDidChangeTypingAttributesNotification = @"NSTextViewDidChangeTypingAttributesNotification";

@implementation NSTextView

- (id)initWithFrame:(NSRect)frameRect textContainer:(NSTextContainer *)container
{
  self = [super initWithFrame:frameRect];
  
  _textStorage = [[container layoutManager] textStorage];
  _textContainer = container;
  [_textContainer setTextView:self];
  
  _isEditable = YES;
  _isSelectable = YES;
  _isRichText = YES;
  _drawsBackground = YES;
  _textAlignment = NSLeftTextAlignment;
  _selectedRange = NSMakeRange(0, 0);

  return self;
}

- (id)initWithFrame:(NSRect)frameRect
{
  NSTextStorage *storage = [[NSTextStorage alloc] init];
  NSLayoutManager *layout = [[NSLayoutManager alloc] init];
  NSTextContainer *container = [[NSTextContainer alloc] initWithContainerSize:frameRect.size];
  
  [storage addLayoutManager:layout];
  [layout addTextContainer:container];
  
  self = [self initWithFrame:frameRect textContainer:container];
  
  return self;
}

- (void)mouseDown:(NSEvent *)theEvent
{
  
}

- (NSTextContainer *)textContainer
{
  
}

- (void)setTextContainer:(NSTextContainer *)container
{
  
}

- (void)replaceTextContainer:(NSTextContainer *)newContainer
{
  
}

- (void)setTextContainerInset:(NSSize)inset
{
  
}

- (NSSize)textContainerInset
{
  
}

- (NSPoint)textContainerOrigin
{
  
}

- (void)invalidateTextContainerOrigin
{
  
}

- (NSLayoutManager *)layoutManager
{
  
}

- (NSTextStorage *)textStorage
{
  
}

- (void)insertText:(id)insertString
{
  
}


- (void)setConstrainedFrameSize:(NSSize)desiredSize
{
  
}



- (void)setAlignment:(NSTextAlignment)alignment range:(NSRange)range
{
  
}

- (void)setBaseWritingDirection:(NSWritingDirection)writingDirection range:(NSRange)range
{
  
}



- (void)turnOffKerning:(id)sender
{
  
}

- (void)tightenKerning:(id)sender
{
  
}

- (void)loosenKerning:(id)sender
{
  
}

- (void)useStandardKerning:(id)sender
{
  
}

- (void)turnOffLigatures:(id)sender
{
  
}

- (void)useStandardLigatures:(id)sender
{
  
}

- (void)useAllLigatures:(id)sender
{
  
}

- (void)raiseBaseline:(id)sender
{
  
}

- (void)lowerBaseline:(id)sender
{
  
}

- (void)toggleTraditionalCharacterShape:(id)sender
{
  
}

- (void)outline:(id)sender
{
  
}


- (void)performFindPanelAction:(id)sender
{
  
}


- (void)alignJustified:(id)sender
{
  
}

- (void)changeColor:(id)sender
{
  
}

- (void)changeAttributes:(id)sender
{
  
}

- (void)changeDocumentBackgroundColor:(id)sender
{
  
}

- (void)toggleBaseWritingDirection:(id)sender
{
  
}

- (void)orderFrontSpacingPanel:(id)sender
{
  
}

- (void)orderFrontLinkPanel:(id)sender
{
  
}

- (void)orderFrontListPanel:(id)sender
{
  
}

- (void)orderFrontTablePanel:(id)sender
{
  
}



- (void)rulerView:(NSRulerView *)ruler didMoveMarker:(NSRulerMarker *)marker
{
  
}

- (void)rulerView:(NSRulerView *)ruler didRemoveMarker:(NSRulerMarker *)marker
{
  
}

- (void)rulerView:(NSRulerView *)ruler didAddMarker:(NSRulerMarker *)marker
{
  
}

- (BOOL)rulerView:(NSRulerView *)ruler shouldMoveMarker:(NSRulerMarker *)marker
{
  
}

- (BOOL)rulerView:(NSRulerView *)ruler shouldAddMarker:(NSRulerMarker *)marker
{
  
}

- (CGFloat)rulerView:(NSRulerView *)ruler willMoveMarker:(NSRulerMarker *)marker toLocation:(CGFloat)location
{
  
}

- (BOOL)rulerView:(NSRulerView *)ruler shouldRemoveMarker:(NSRulerMarker *)marker
{
  
}

- (CGFloat)rulerView:(NSRulerView *)ruler willAddMarker:(NSRulerMarker *)marker atLocation:(CGFloat)location
{
  
}

- (void)rulerView:(NSRulerView *)ruler handleMouseDown:(NSEvent *)event
{
  
}


- (void)setNeedsDisplayInRect:(NSRect)rect avoidAdditionalLayout:(BOOL)flag
{
  
}

- (BOOL)shouldDrawInsertionPoint
{
  
}

- (void)drawInsertionPointInRect:(NSRect)rect color:(NSColor *)color turnedOn:(BOOL)flag
{
  
}


- (void)drawViewBackgroundInRect:(NSRect)rect
{
  
}



- (void)updateRuler
{
  
}

- (void)updateFontPanel
{
  
}


- (void)updateDragTypeRegistration
{
  
}

- (NSRange)selectionRangeForProposedRange:(NSRange)proposedCharRange granularity:(NSSelectionGranularity)granularity
{
  
}

- (void)clickedOnLink:(id)link atIndex:(NSUInteger)charIndex
{
  
}

- (NSUInteger)characterIndexForInsertionAtPoint:(NSPoint)point
{
  
}

@end
