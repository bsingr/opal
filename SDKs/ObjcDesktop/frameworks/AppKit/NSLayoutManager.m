// 
//  NSLayoutManager.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-17.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSLayoutManager.h"

@implementation NSLayoutManager

- (id)init
{
    _typeSetter = [[NSTypesetter alloc] init];
    _glyphGenerator = [NSGlyphGenerator sharedGlyphGenerator];
    _textContainers = [NSMutableArray array];
    _layoutInvalid = YES;
    
    return self;
}

- (NSTextStorage *)textStorage{}
- (void)setTextStorage:(NSTextStorage *)textStorage{}

- (NSAttributedString *)attributedString{}

- (void)replaceTextStorage:(NSTextStorage *)newTextStorage{}
    
- (NSGlyphGenerator *)glyphGenerator{}
- (void)setGlyphGenerator:(NSGlyphGenerator *)glyphGenerator{}

- (NSTypesetter *)typesetter{}
- (void)setTypesetter:(NSTypesetter *)typesetter{}

- (id)delegate{}
- (void)setDelegate:(id)delegate{}

- (NSArray *)textContainers{}

- (void)addTextContainer:(NSTextContainer *)container{}
- (void)insertTextContainer:(NSTextContainer *)container atIndex:(NSUInteger)index{}
- (void)removeTextContainerAtIndex:(NSUInteger)index{}

- (void)textContainerChangedGeometry:(NSTextContainer *)container{}

- (void)textContainerChangedTextView:(NSTextContainer *)container{}


- (void)setBackgroundLayoutEnabled:(BOOL)flag{}
- (BOOL)backgroundLayoutEnabled{}

- (void)setUsesScreenFonts:(BOOL)flag{}
- (BOOL)usesScreenFonts{}

- (void)setShowsInvisibleCharacters:(BOOL)flag{}
- (BOOL)showsInvisibleCharacters{}

- (void)setShowsControlCharacters:(BOOL)flag{}
- (BOOL)showsControlCharacters{}

- (void)setHyphenationFactor:(float)factor{}
- (float)hyphenationFactor{}

- (void)setDefaultAttachmentScaling:(NSImageScaling)scaling{}
- (NSImageScaling)defaultAttachmentScaling{}

// - (void)setTypesetterBehavior:(NSTypesetterBehavior)theBehavior{}
// - (NSTypesetterBehavior)typesetterBehavior{}

- (NSUInteger)layoutOptions{}

- (void)setAllowsNonContiguousLayout:(BOOL)flag{}
- (BOOL)allowsNonContiguousLayout{}
- (BOOL)hasNonContiguousLayout{}

- (void)invalidateGlyphsForCharacterRange:(NSRange)charRange changeInLength:(NSInteger)delta actualCharacterRange:(NSRangePointer)actualCharRange{}

- (void)invalidateLayoutForCharacterRange:(NSRange)charRange actualCharacterRange:(NSRangePointer)actualCharRange{}
- (void)invalidateLayoutForCharacterRange:(NSRange)charRange isSoft:(BOOL)flag actualCharacterRange:(NSRangePointer)actualCharRange{}

- (void)invalidateDisplayForCharacterRange:(NSRange)charRange{}
- (void)invalidateDisplayForGlyphRange:(NSRange)glyphRange{}

- (void)textStorage:(NSTextStorage *)str edited:(NSUInteger)editedMask range:(NSRange)newCharRange changeInLength:(NSInteger)delta invalidatedRange:(NSRange)invalidatedCharRange{}


- (void)ensureGlyphsForCharacterRange:(NSRange)charRange{}
- (void)ensureGlyphsForGlyphRange:(NSRange)glyphRange{}
- (void)ensureLayoutForCharacterRange:(NSRange)charRange{}
- (void)ensureLayoutForGlyphRange:(NSRange)glyphRange{}
- (void)ensureLayoutForTextContainer:(NSTextContainer *)container{}
- (void)ensureLayoutForBoundingRect:(NSRect)bounds inTextContainer:(NSTextContainer *)container{}

- (void)insertGlyphs:(const NSGlyph *)glyphs length:(NSUInteger)length forStartingGlyphAtIndex:(NSUInteger)glyphIndex characterIndex:(NSUInteger)charIndex{}

- (void)insertGlyph:(NSGlyph)glyph atGlyphIndex:(NSUInteger)glyphIndex characterIndex:(NSUInteger)charIndex{}

- (void)replaceGlyphAtIndex:(NSUInteger)glyphIndex withGlyph:(NSGlyph)newGlyph{}

- (void)deleteGlyphsInRange:(NSRange)glyphRange{}

- (void)setCharacterIndex:(NSUInteger)charIndex forGlyphAtIndex:(NSUInteger)glyphIndex{}

- (void)setIntAttribute:(NSInteger)attributeTag value:(NSInteger)val forGlyphAtIndex:(NSUInteger)glyphIndex{}

- (void)invalidateGlyphsOnLayoutInvalidationForGlyphRange:(NSRange)glyphRange{}

- (NSUInteger)numberOfGlyphs{}

- (NSGlyph)glyphAtIndex:(NSUInteger)glyphIndex isValidIndex:(BOOL *)isValidIndex{}
- (NSGlyph)glyphAtIndex:(NSUInteger)glyphIndex{}
- (BOOL)isValidGlyphIndex:(NSUInteger)glyphIndex{}

- (NSUInteger)characterIndexForGlyphAtIndex:(NSUInteger)glyphIndex{}

- (NSUInteger)glyphIndexForCharacterAtIndex:(NSUInteger)charIndex{}

- (NSInteger)intAttribute:(NSInteger)attributeTag forGlyphAtIndex:(NSUInteger)glyphIndex{}

// - (NSUInteger)getGlyphsInRange:(NSRange)glyphRange glyphs:(NSGlyph *)glyphBuffer characterIndexes:(NSUInteger *)charIndexBuffer glyphInscriptions:(NSGlyphInscription *)inscribeBuffer elasticBits:(BOOL *)elasticBuffer{}
// - (NSUInteger)getGlyphsInRange:(NSRange)glyphRange glyphs:(NSGlyph *)glyphBuffer characterIndexes:(NSUInteger *)charIndexBuffer glyphInscriptions:(NSGlyphInscription *)inscribeBuffer elasticBits:(BOOL *)elasticBuffer bidiLevels:(unsigned char *)bidiLevelBuffer{}
    
- (NSUInteger)getGlyphs:(NSGlyph *)glyphArray range:(NSRange)glyphRange{}

- (void)setTextContainer:(NSTextContainer *)container forGlyphRange:(NSRange)glyphRange{}

- (void)setLineFragmentRect:(NSRect)fragmentRect forGlyphRange:(NSRange)glyphRange usedRect:(NSRect)usedRect{}

- (void)setExtraLineFragmentRect:(NSRect)fragmentRect usedRect:(NSRect)usedRect textContainer:(NSTextContainer *)container{}

- (void)setLocation:(NSPoint)location forStartOfGlyphRange:(NSRange)glyphRange{}

- (void)setLocations:(NSArray)locations startingGlyphIndexes:(NSUInteger *)glyphIndexes count:(NSUInteger)count forGlyphRange:(NSRange)glyphRange{}

- (void)setNotShownAttribute:(BOOL)flag forGlyphAtIndex:(NSUInteger)glyphIndex{}

- (void)setDrawsOutsideLineFragment:(BOOL)flag forGlyphAtIndex:(NSUInteger)glyphIndex{}

- (void)setAttachmentSize:(NSSize)attachmentSize forGlyphRange:(NSRange)glyphRange{}

- (void)getFirstUnlaidCharacterIndex:(NSUInteger *)charIndex glyphIndex:(NSUInteger *)glyphIndex{}
- (NSUInteger)firstUnlaidCharacterIndex{}
- (NSUInteger)firstUnlaidGlyphIndex{}

- (NSTextContainer *)textContainerForGlyphAtIndex:(NSUInteger)glyphIndex effectiveRange:(NSRangePointer)effectiveGlyphRange{}

- (NSRect)usedRectForTextContainer:(NSTextContainer *)container{}

- (NSRect)lineFragmentRectForGlyphAtIndex:(NSUInteger)glyphIndex effectiveRange:(NSRangePointer)effectiveGlyphRange{}

- (NSRect)lineFragmentUsedRectForGlyphAtIndex:(NSUInteger)glyphIndex effectiveRange:(NSRangePointer)effectiveGlyphRange{}

- (NSRect)lineFragmentRectForGlyphAtIndex:(NSUInteger)glyphIndex effectiveRange:(NSRangePointer)effectiveGlyphRange withoutAdditionalLayout:(BOOL)flag{}
- (NSRect)lineFragmentUsedRectForGlyphAtIndex:(NSUInteger)glyphIndex effectiveRange:(NSRangePointer)effectiveGlyphRange withoutAdditionalLayout:(BOOL)flag{}
- (NSTextContainer *)textContainerForGlyphAtIndex:(NSUInteger)glyphIndex effectiveRange:(NSRangePointer)effectiveGlyphRange withoutAdditionalLayout:(BOOL)flag{}

- (NSRect)extraLineFragmentRect{}
- (NSRect)extraLineFragmentUsedRect{}
- (NSTextContainer *)extraLineFragmentTextContainer{}

- (NSPoint)locationForGlyphAtIndex:(NSUInteger)glyphIndex{}

- (BOOL)notShownAttributeForGlyphAtIndex:(NSUInteger)glyphIndex{}

- (BOOL)drawsOutsideLineFragmentForGlyphAtIndex:(NSUInteger)glyphIndex{}

- (NSSize)attachmentSizeForGlyphAtIndex:(NSUInteger)glyphIndex{}


- (void)setLayoutRect:(NSRect)rect forTextBlock:(NSTextBlock *)block glyphRange:(NSRange)glyphRange{}
- (void)setBoundsRect:(NSRect)rect forTextBlock:(NSTextBlock *)block glyphRange:(NSRange)glyphRange{}
- (NSRect)layoutRectForTextBlock:(NSTextBlock *)block glyphRange:(NSRange)glyphRange{}
- (NSRect)boundsRectForTextBlock:(NSTextBlock *)block glyphRange:(NSRange)glyphRange{}
- (NSRect)layoutRectForTextBlock:(NSTextBlock *)block atIndex:(NSUInteger)glyphIndex effectiveRange:(NSRangePointer)effectiveGlyphRange{}
- (NSRect)boundsRectForTextBlock:(NSTextBlock *)block atIndex:(NSUInteger)glyphIndex effectiveRange:(NSRangePointer)effectiveGlyphRange{}

- (NSRange)glyphRangeForCharacterRange:(NSRange)charRange actualCharacterRange:(NSRangePointer)actualCharRange{}

- (NSRange)characterRangeForGlyphRange:(NSRange)glyphRange actualGlyphRange:(NSRangePointer)actualGlyphRange{}

- (NSRange)glyphRangeForTextContainer:(NSTextContainer *)container{}

- (NSRange)rangeOfNominallySpacedGlyphsContainingIndex:(NSUInteger)glyphIndex{}
    
- (NSArray)rectArrayForCharacterRange:(NSRange)charRange withinSelectedCharacterRange:(NSRange)selCharRange inTextContainer:(NSTextContainer *)container rectCount:(NSUInteger *)rectCount{}
- (NSArray)rectArrayForGlyphRange:(NSRange)glyphRange withinSelectedGlyphRange:(NSRange)selGlyphRange inTextContainer:(NSTextContainer *)container rectCount:(NSUInteger *)rectCount{}

- (NSRect)boundingRectForGlyphRange:(NSRange)glyphRange inTextContainer:(NSTextContainer *)container{}

- (NSRange)glyphRangeForBoundingRect:(NSRect)bounds inTextContainer:(NSTextContainer *)container{}
- (NSRange)glyphRangeForBoundingRectWithoutAdditionalLayout:(NSRect)bounds inTextContainer:(NSTextContainer *)container{}

- (NSUInteger)glyphIndexForPoint:(NSPoint)point inTextContainer:(NSTextContainer *)container fractionOfDistanceThroughGlyph:(CGFloat *)partialFraction{}
- (NSUInteger)glyphIndexForPoint:(NSPoint)point inTextContainer:(NSTextContainer *)container{}
- (CGFloat)fractionOfDistanceThroughGlyphForPoint:(NSPoint)point inTextContainer:(NSTextContainer *)container{}

- (NSUInteger)getLineFragmentInsertionPointsForCharacterAtIndex:(NSUInteger)charIndex alternatePositions:(BOOL)aFlag inDisplayOrder:(BOOL)dFlag positions:(CGFloat *)positions characterIndexes:(NSUInteger *)charIndexes{}


- (NSDictionary *)temporaryAttributesAtCharacterIndex:(NSUInteger)charIndex effectiveRange:(NSRangePointer)effectiveCharRange{}
- (void)setTemporaryAttributes:(NSDictionary *)attrs forCharacterRange:(NSRange)charRange{}
- (void)addTemporaryAttributes:(NSDictionary *)attrs forCharacterRange:(NSRange)charRange{}
- (void)removeTemporaryAttribute:(NSString *)attrName forCharacterRange:(NSRange)charRange{}

- (id)temporaryAttribute:(NSString *)attrName atCharacterIndex:(NSUInteger)location effectiveRange:(NSRangePointer)range{}
- (id)temporaryAttribute:(NSString *)attrName atCharacterIndex:(NSUInteger)location longestEffectiveRange:(NSRangePointer)range inRange:(NSRange)rangeLimit{}
- (NSDictionary *)temporaryAttributesAtCharacterIndex:(NSUInteger)location longestEffectiveRange:(NSRangePointer)range inRange:(NSRange)rangeLimit{}
- (void)addTemporaryAttribute:(NSString *)attrName value:(id)value forCharacterRange:(NSRange)charRange{}


- (NSFont *)substituteFontForFont:(NSFont *)originalFont{}

- (CGFloat)defaultLineHeightForFont:(NSFont *)theFont{}
- (CGFloat)defaultBaselineOffsetForFont:(NSFont *)theFont{}
- (BOOL)usesFontLeading{}
- (void)setUsesFontLeading:(BOOL)flag{}

@end
