// 
//  NSAttributedString.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-17.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSAttributedString.h>
#import <AppKit/NSText.h>

@class NSTextBlock, NSTextTable, NSTextList, NSFileWrapper, NSFontTraitMask;

extern NSString *NSFontAttributeName;
extern NSString *NSParagraphStyleAttributeName;
extern NSString *NSForegroundColorAttributeName;
extern NSString *NSUnderlineStyleAttributeName;
extern NSString *NSSuperscriptAttributeName;
extern NSString *NSBackgroundColorAttributeName;
extern NSString *NSAttachmentAttributeName;
extern NSString *NSLigatureAttributeName;
extern NSString *NSBaselineOffsetAttributeName;
extern NSString *NSKernAttributeName;                // implement kerning? probably not... minaly use text system for monospace anyway...
extern NSString *NSLinkAttributeName;

extern NSString *NSStrokeWidthAttributeName;
extern NSString *NSStrokeColorAttributeName;
extern NSString *NSUnderlineColorAttributeName;
extern NSString *NSStrikethroughStyleAttributeName;
extern NSString *NSStrikethroughColorAttributeName;
extern NSString *NSShadowAttributeName;
extern NSString *NSObliquenessAttributeName;
extern NSString *NSExpansionAttributeName;
extern NSString *NSCursorAttributeName;
extern NSString *NSToolTipAttributeName;

enum {
    NSUnderlineStyleNone                = 0x00,
    NSUnderlineStyleSingle              = 0x01,
    NSUnderlineStyleThick               = 0x02,
    NSUnderlineStyleDouble              = 0x09
};

enum {
    NSUnderlinePatternSolid             = 0x0000,
    NSUnderlinePatternDot               = 0x0100,
    NSUnderlinePatternDash              = 0x0200,
    NSUnderlinePatternDashDot           = 0x0300,
    NSUnderlinePatternDashDotDot        = 0x0400
};

extern NSUInteger NSUnderlineByWordMask;

@interface NSAttributedString (NSAttributedStringKitAdditions)

- (NSDictionary *)fontAttributesInRange:(NSRange)range;

- (NSDictionary *)rulerAttributesInRange:(NSRange)range;

- (BOOL)containsAttachments;

- (NSUInteger)lineBreakBeforeIndex:(NSUInteger)location withinRange:(NSRange)aRange;
- (NSUInteger)lineBreakByHyphenatingBeforeIndex:(NSUInteger)location withinRange:(NSRange)aRange;

- (NSRange)doubleClickAtIndex:(NSUInteger)location;
- (NSUInteger)nextWordFromIndex:(NSUInteger)location forward:(BOOL)isForward;

- (NSURL *)URLAtIndex:(NSUInteger)location effectiveRange:(NSRangePointer)effectiveRange;

+ (NSArray *)textTypes;
+ (NSArray *)textUnfilteredTypes;

- (NSRange)rangeOfTextBlock:(NSTextBlock *)block atIndex:(NSUInteger)location;
- (NSRange)rangeOfTextTable:(NSTextTable *)table atIndex:(NSUInteger)location;
- (NSRange)rangeOfTextList:(NSTextList *)list atIndex:(NSUInteger)location;
- (NSInteger)itemNumberInTextList:(NSTextList *)list atIndex:(NSUInteger)location;

- (id)initWithURL:(NSURL *)url options:(NSDictionary *)options documentAttributes:(NSDictionary **)dict error:(NSError **)error;
- (id)initWithData:(NSData *)data options:(NSDictionary *)options documentAttributes:(NSDictionary **)dict error:(NSError **)error;

- (id)initWithPath:(NSString *)path documentAttributes:(NSDictionary **)dict;
- (id)initWithURL:(NSURL *)url documentAttributes:(NSDictionary **)dict;

- (id)initWithRTF:(NSData *)data documentAttributes:(NSDictionary **)dict;
- (id)initWithRTFD:(NSData *)data documentAttributes:(NSDictionary **)dict;
- (id)initWithHTML:(NSData *)data documentAttributes:(NSDictionary **)dict;
- (id)initWithHTML:(NSData *)data baseURL:(NSURL *)base documentAttributes:(NSDictionary **)dict;
- (id)initWithDocFormat:(NSData *)data documentAttributes:(NSDictionary **)dict;
- (id)initWithHTML:(NSData *)data options:(NSDictionary *)options documentAttributes:(NSDictionary **)dict;

- (id)initWithRTFDFileWrapper:(NSFileWrapper *)wrapper documentAttributes:(NSDictionary **)dict;

- (NSData *)dataFromRange:(NSRange)range documentAttributes:(NSDictionary *)dict error:(NSError **)error;
- (NSFileWrapper *)fileWrapperFromRange:(NSRange)range documentAttributes:(NSDictionary *)dict error:(NSError **)error;

- (NSData *)RTFFromRange:(NSRange)range documentAttributes:(NSDictionary *)dict;
- (NSData *)RTFDFromRange:(NSRange)range documentAttributes:(NSDictionary *)dict;
- (NSFileWrapper *)RTFDFileWrapperFromRange:(NSRange)range documentAttributes:(NSDictionary *)dict;
- (NSData *)docFormatFromRange:(NSRange)range documentAttributes:(NSDictionary *)dict;

@end


@interface NSMutableAttributedString (NSMutableAttributedStringKitAdditions)

- (BOOL)readFromURL:(NSURL *)url options:(NSDictionary *)opts documentAttributes:(NSDictionary **)dict error:(NSError **)error;
- (BOOL)readFromData:(NSData *)data options:(NSDictionary *)opts documentAttributes:(NSDictionary **)dict error:(NSError **)error;

- (BOOL)readFromURL:(NSURL *)url options:(NSDictionary *)options documentAttributes:(NSDictionary **)dict;
- (BOOL)readFromData:(NSData *)data options:(NSDictionary *)options documentAttributes:(NSDictionary **)dict;

- (void)superscriptRange:(NSRange)range;
- (void)subscriptRange:(NSRange)range;
- (void)unscriptRange:(NSRange)range;
- (void)applyFontTraits:(NSFontTraitMask)traitMask range:(NSRange)range;
- (void)setAlignment:(NSTextAlignment)alignment range:(NSRange)range;
- (void)setBaseWritingDirection:(NSWritingDirection)writingDirection range:(NSRange)range;

- (void)fixAttributesInRange:(NSRange)range;
- (void)fixFontAttributeInRange:(NSRange)range;
- (void)fixParagraphStyleAttributeInRange:(NSRange)range;
- (void)fixAttachmentAttributeInRange:(NSRange)range;

@end
