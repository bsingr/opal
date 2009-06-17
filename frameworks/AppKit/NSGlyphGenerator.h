// 
//  NSGlyphGenerator.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-17.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSAttributedString.h>
#import <AppKit/NSFont.h>

@protocol NSGlyphStorage

- (void)insertGlyphs:(const NSGlyph *)glyphs length:(NSUInteger)length forStartingGlyphAtIndex:(NSUInteger)glyphIndex characterIndex:(NSUInteger)charIndex;

- (void)setIntAttribute:(NSInteger)attributeTag value:(NSInteger)val forGlyphAtIndex:(NSUInteger)glyphIndex;

- (NSAttributedString *)attributedString;
- (NSUInteger)layoutOptions;

@end


@interface NSGlyphGenerator : NSObject

- (void)generateGlyphsForGlyphStorage:(id <NSGlyphStorage>)glyphStorage desiredNumberOfCharacters:(NSUInteger)nChars glyphIndex:(NSUInteger *)glyphIndex characterIndex:(NSUInteger *)charIndex;
+ (id) sharedGlyphGenerator;

@end