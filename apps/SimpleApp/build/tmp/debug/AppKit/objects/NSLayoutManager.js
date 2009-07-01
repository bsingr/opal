var the_class = objc_allocateClassPair(NSObject, "NSLayoutManager");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "init", function(self, _cmd) {
with(self) {
_typeSetter = objc_msgSend(objc_msgSend(NSTypesetter, "alloc"), "init");
_glyphGenerator = objc_msgSend(NSGlyphGenerator, "sharedGlyphGenerator");
_textContainers = objc_msgSend(NSMutableArray, "array");
_layoutInvalid = YES;
return self;
}
}, "void");

class_addMethod(the_class, "textStorage", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTextStorage:", function(self, _cmd, textStorage) {
with(self) {
}
}, "void");

class_addMethod(the_class, "attributedString", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceTextStorage:", function(self, _cmd, newTextStorage) {
with(self) {
}
}, "void");

class_addMethod(the_class, "glyphGenerator", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setGlyphGenerator:", function(self, _cmd, glyphGenerator) {
with(self) {
}
}, "void");

class_addMethod(the_class, "typesetter", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTypesetter:", function(self, _cmd, typesetter) {
with(self) {
}
}, "void");

class_addMethod(the_class, "delegate", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, delegate) {
with(self) {
}
}, "void");

class_addMethod(the_class, "textContainers", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "addTextContainer:", function(self, _cmd, container) {
with(self) {
}
}, "void");

class_addMethod(the_class, "insertTextContainer:atIndex:", function(self, _cmd, container, index) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeTextContainerAtIndex:", function(self, _cmd, index) {
with(self) {
}
}, "void");

class_addMethod(the_class, "textContainerChangedGeometry:", function(self, _cmd, container) {
with(self) {
}
}, "void");

class_addMethod(the_class, "textContainerChangedTextView:", function(self, _cmd, container) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setBackgroundLayoutEnabled:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "backgroundLayoutEnabled", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setUsesScreenFonts:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "usesScreenFonts", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setShowsInvisibleCharacters:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "showsInvisibleCharacters", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setShowsControlCharacters:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "showsControlCharacters", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setHyphenationFactor:", function(self, _cmd, factor) {
with(self) {
}
}, "void");

class_addMethod(the_class, "hyphenationFactor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setDefaultAttachmentScaling:", function(self, _cmd, scaling) {
with(self) {
}
}, "void");

class_addMethod(the_class, "defaultAttachmentScaling", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "layoutOptions", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAllowsNonContiguousLayout:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "allowsNonContiguousLayout", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "hasNonContiguousLayout", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "invalidateGlyphsForCharacterRange:changeInLength:actualCharacterRange:", function(self, _cmd, charRange, delta, actualCharRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "invalidateLayoutForCharacterRange:actualCharacterRange:", function(self, _cmd, charRange, actualCharRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "invalidateLayoutForCharacterRange:isSoft:actualCharacterRange:", function(self, _cmd, charRange, flag, actualCharRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "invalidateDisplayForCharacterRange:", function(self, _cmd, charRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "invalidateDisplayForGlyphRange:", function(self, _cmd, glyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "textStorage:edited:range:changeInLength:invalidatedRange:", function(self, _cmd, str, editedMask, newCharRange, delta, invalidatedCharRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "ensureGlyphsForCharacterRange:", function(self, _cmd, charRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "ensureGlyphsForGlyphRange:", function(self, _cmd, glyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "ensureLayoutForCharacterRange:", function(self, _cmd, charRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "ensureLayoutForGlyphRange:", function(self, _cmd, glyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "ensureLayoutForTextContainer:", function(self, _cmd, container) {
with(self) {
}
}, "void");

class_addMethod(the_class, "ensureLayoutForBoundingRect:inTextContainer:", function(self, _cmd, bounds, container) {
with(self) {
}
}, "void");

class_addMethod(the_class, "insertGlyphs:length:forStartingGlyphAtIndex:characterIndex:", function(self, _cmd, glyphs, length, glyphIndex, charIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "insertGlyph:atGlyphIndex:characterIndex:", function(self, _cmd, glyph, glyphIndex, charIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "replaceGlyphAtIndex:withGlyph:", function(self, _cmd, glyphIndex, newGlyph) {
with(self) {
}
}, "void");

class_addMethod(the_class, "deleteGlyphsInRange:", function(self, _cmd, glyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setCharacterIndex:forGlyphAtIndex:", function(self, _cmd, charIndex, glyphIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setIntAttribute:value:forGlyphAtIndex:", function(self, _cmd, attributeTag, val, glyphIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "invalidateGlyphsOnLayoutInvalidationForGlyphRange:", function(self, _cmd, glyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "numberOfGlyphs", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "glyphAtIndex:isValidIndex:", function(self, _cmd, glyphIndex, isValidIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "glyphAtIndex:", function(self, _cmd, glyphIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isValidGlyphIndex:", function(self, _cmd, glyphIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "characterIndexForGlyphAtIndex:", function(self, _cmd, glyphIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "glyphIndexForCharacterAtIndex:", function(self, _cmd, charIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "intAttribute:forGlyphAtIndex:", function(self, _cmd, attributeTag, glyphIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getGlyphs:range:", function(self, _cmd, glyphArray, glyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTextContainer:forGlyphRange:", function(self, _cmd, container, glyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setLineFragmentRect:forGlyphRange:usedRect:", function(self, _cmd, fragmentRect, glyphRange, usedRect) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setExtraLineFragmentRect:usedRect:textContainer:", function(self, _cmd, fragmentRect, usedRect, container) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setLocation:forStartOfGlyphRange:", function(self, _cmd, location, glyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setLocations:startingGlyphIndexes:count:forGlyphRange:", function(self, _cmd, locations, glyphIndexes, count, glyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setNotShownAttribute:forGlyphAtIndex:", function(self, _cmd, flag, glyphIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setDrawsOutsideLineFragment:forGlyphAtIndex:", function(self, _cmd, flag, glyphIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAttachmentSize:forGlyphRange:", function(self, _cmd, attachmentSize, glyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getFirstUnlaidCharacterIndex:glyphIndex:", function(self, _cmd, charIndex, glyphIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "firstUnlaidCharacterIndex", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "firstUnlaidGlyphIndex", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "textContainerForGlyphAtIndex:effectiveRange:", function(self, _cmd, glyphIndex, effectiveGlyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "usedRectForTextContainer:", function(self, _cmd, container) {
with(self) {
}
}, "void");

class_addMethod(the_class, "lineFragmentRectForGlyphAtIndex:effectiveRange:", function(self, _cmd, glyphIndex, effectiveGlyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "lineFragmentUsedRectForGlyphAtIndex:effectiveRange:", function(self, _cmd, glyphIndex, effectiveGlyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "lineFragmentRectForGlyphAtIndex:effectiveRange:withoutAdditionalLayout:", function(self, _cmd, glyphIndex, effectiveGlyphRange, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "lineFragmentUsedRectForGlyphAtIndex:effectiveRange:withoutAdditionalLayout:", function(self, _cmd, glyphIndex, effectiveGlyphRange, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "textContainerForGlyphAtIndex:effectiveRange:withoutAdditionalLayout:", function(self, _cmd, glyphIndex, effectiveGlyphRange, flag) {
with(self) {
}
}, "void");

class_addMethod(the_class, "extraLineFragmentRect", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "extraLineFragmentUsedRect", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "extraLineFragmentTextContainer", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "locationForGlyphAtIndex:", function(self, _cmd, glyphIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "notShownAttributeForGlyphAtIndex:", function(self, _cmd, glyphIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "drawsOutsideLineFragmentForGlyphAtIndex:", function(self, _cmd, glyphIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "attachmentSizeForGlyphAtIndex:", function(self, _cmd, glyphIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setLayoutRect:forTextBlock:glyphRange:", function(self, _cmd, rect, block, glyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setBoundsRect:forTextBlock:glyphRange:", function(self, _cmd, rect, block, glyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "layoutRectForTextBlock:glyphRange:", function(self, _cmd, block, glyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "boundsRectForTextBlock:glyphRange:", function(self, _cmd, block, glyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "layoutRectForTextBlock:atIndex:effectiveRange:", function(self, _cmd, block, glyphIndex, effectiveGlyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "boundsRectForTextBlock:atIndex:effectiveRange:", function(self, _cmd, block, glyphIndex, effectiveGlyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "glyphRangeForCharacterRange:actualCharacterRange:", function(self, _cmd, charRange, actualCharRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "characterRangeForGlyphRange:actualGlyphRange:", function(self, _cmd, glyphRange, actualGlyphRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "glyphRangeForTextContainer:", function(self, _cmd, container) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rangeOfNominallySpacedGlyphsContainingIndex:", function(self, _cmd, glyphIndex) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rectArrayForCharacterRange:withinSelectedCharacterRange:inTextContainer:rectCount:", function(self, _cmd, charRange, selCharRange, container, rectCount) {
with(self) {
}
}, "void");

class_addMethod(the_class, "rectArrayForGlyphRange:withinSelectedGlyphRange:inTextContainer:rectCount:", function(self, _cmd, glyphRange, selGlyphRange, container, rectCount) {
with(self) {
}
}, "void");

class_addMethod(the_class, "boundingRectForGlyphRange:inTextContainer:", function(self, _cmd, glyphRange, container) {
with(self) {
}
}, "void");

class_addMethod(the_class, "glyphRangeForBoundingRect:inTextContainer:", function(self, _cmd, bounds, container) {
with(self) {
}
}, "void");

class_addMethod(the_class, "glyphRangeForBoundingRectWithoutAdditionalLayout:inTextContainer:", function(self, _cmd, bounds, container) {
with(self) {
}
}, "void");

class_addMethod(the_class, "glyphIndexForPoint:inTextContainer:fractionOfDistanceThroughGlyph:", function(self, _cmd, point, container, partialFraction) {
with(self) {
}
}, "void");

class_addMethod(the_class, "glyphIndexForPoint:inTextContainer:", function(self, _cmd, point, container) {
with(self) {
}
}, "void");

class_addMethod(the_class, "fractionOfDistanceThroughGlyphForPoint:inTextContainer:", function(self, _cmd, point, container) {
with(self) {
}
}, "void");

class_addMethod(the_class, "getLineFragmentInsertionPointsForCharacterAtIndex:alternatePositions:inDisplayOrder:positions:characterIndexes:", function(self, _cmd, charIndex, aFlag, dFlag, positions, charIndexes) {
with(self) {
}
}, "void");

class_addMethod(the_class, "temporaryAttributesAtCharacterIndex:effectiveRange:", function(self, _cmd, charIndex, effectiveCharRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTemporaryAttributes:forCharacterRange:", function(self, _cmd, attrs, charRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "addTemporaryAttributes:forCharacterRange:", function(self, _cmd, attrs, charRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "removeTemporaryAttribute:forCharacterRange:", function(self, _cmd, attrName, charRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "temporaryAttribute:atCharacterIndex:effectiveRange:", function(self, _cmd, attrName, location, range) {
with(self) {
}
}, "void");

class_addMethod(the_class, "temporaryAttribute:atCharacterIndex:longestEffectiveRange:inRange:", function(self, _cmd, attrName, location, range, rangeLimit) {
with(self) {
}
}, "void");

class_addMethod(the_class, "temporaryAttributesAtCharacterIndex:longestEffectiveRange:inRange:", function(self, _cmd, location, range, rangeLimit) {
with(self) {
}
}, "void");

class_addMethod(the_class, "addTemporaryAttribute:value:forCharacterRange:", function(self, _cmd, attrName, value, charRange) {
with(self) {
}
}, "void");

class_addMethod(the_class, "substituteFontForFont:", function(self, _cmd, originalFont) {
with(self) {
}
}, "void");

class_addMethod(the_class, "defaultLineHeightForFont:", function(self, _cmd, theFont) {
with(self) {
}
}, "void");

class_addMethod(the_class, "defaultBaselineOffsetForFont:", function(self, _cmd, theFont) {
with(self) {
}
}, "void");

class_addMethod(the_class, "usesFontLeading", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setUsesFontLeading:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

