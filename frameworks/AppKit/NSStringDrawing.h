// 
//  NSStringDrawing.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSString.h>
#import <AppKit/NSAttributedString.h>

@interface NSString (NSStringDrawing)

- (NSSize)sizeWithAttributes:(NSDictionary *)attrs;
- (void)drawAtPoint:(NSPoint)point withAttributes:(NSDictionary *)attrs;
- (void)drawInRect:(NSRect)rect withAttributes:(NSDictionary *)attrs;

@end

@interface NSAttributedString (NSStringDrawing)

- (NSSize)size;
- (void)drawAtPoint:(NSPoint)point;
- (void)drawInRect:(NSRect)rect;

@end

enum {
    NSStringDrawingTruncatesLastVisibleLine         = (1 << 5),
    NSStringDrawingUsesLineFragmentOrigin           = (1 << 0),
    NSStringDrawingUsesFontLeading                  = (1 << 1),
    NSStringDrawingDisableScreenFontSubstitution    = (1 << 2),
    NSStringDrawingUsesDeviceMetrics                = (1 << 3),
    NSStringDrawingOneShot                          = (1 << 4) 
};
typedef NSInteger NSStringDrawingOptions;

@interface NSString (NSExtendedStringDrawing)

- (void)drawWithRect:(NSRect)rect options:(NSStringDrawingOptions)options attributes:(NSDictionary *)attributes;
- (NSRect)boundingRectWithSize:(NSSize)size options:(NSStringDrawingOptions)options attributes:(NSDictionary *)attributes;

@end

@interface NSAttributedString (NSExtendedStringDrawing)

- (void)drawWithRect:(NSRect)rect options:(NSStringDrawingOptions)options;
- (NSRect)boundingRectWithSize:(NSSize)size options:(NSStringDrawingOptions)options;

@end
