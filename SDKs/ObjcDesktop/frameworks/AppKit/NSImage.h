// 
//  NSImage.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>
#import <Foundation/NSGeometry.h>
#import <Foundation/NSBundle.h>
#import <AppKit/NSGraphics.h>
// #import <AppKit/NSBitmapImageRep.h>

@class NSArray, NSColor;
@class NSImageRep;
@class NSPasteboard, NSURL;

enum {
  NSImageLoadStatusCompleted,
  NSImageLoadStatusCancelled,
  NSImageLoadStatusInvalidData,
  NSImageLoadStatusUnexpectedEOF,
  NSImageLoadStatusReadError
};
typedef NSUInteger NSImageLoadStatus;

enum {
  NSImageCacheDefault,
  NSImageCacheAlways,
  NSImageCacheBySize,
  NSImageCacheNever
};
typedef NSUInteger NSImageCacheMode;

@interface NSImage : NSObject <NSCopying, NSCoding>
{
}

+ (id)imageNamed:(NSString *)name;

- (id)initWithSize:(NSSize)aSize;
- (id)initWithData:(NSData *)data;
- (id)initWithContentsOfFile:(NSString *)fileName;
- (id)initWithContentsOfURL:(NSURL *)url;
- (id)initByReferencingFile:(NSString *)fileName;
- (id)initByReferencingURL:(NSURL *)url;

- (id)initWithPasteboard:(NSPasteboard *)pasteboard;

- (void)setSize:(NSSize)aSize;
- (NSSize)size;
- (BOOL)setName:(NSString *)string;
- (NSString *)name;

- (void)setBackgroundColor:(NSColor *)aColor;
- (NSColor *)backgroundColor;
- (void)dissolveToPoint:(NSPoint)point fraction:(CGFloat)aFloat;
- (void)dissolveToPoint:(NSPoint)point fromRect:(NSRect)rect fraction:(CGFloat)aFloat;
- (void)compositeToPoint:(NSPoint)point operation:(NSCompositingOperation)op;
- (void)compositeToPoint:(NSPoint)point fromRect:(NSRect)rect operation:(NSCompositingOperation)op;
- (void)compositeToPoint:(NSPoint)point operation:(NSCompositingOperation)op fraction:(CGFloat)delta;
- (void)compositeToPoint:(NSPoint)point fromRect:(NSRect)rect operation:(NSCompositingOperation)op fraction:(CGFloat)delta;
- (void)drawAtPoint:(NSPoint)point fromRect:(NSRect)fromRect operation:(NSCompositingOperation)op fraction:(CGFloat)delta;
- (void)drawInRect:(NSRect)rect fromRect:(NSRect)fromRect operation:(NSCompositingOperation)op fraction:(CGFloat)delta;

- (BOOL)isValid;
- (void)lockFocus;
- (void)lockFocusOnRepresentation:(NSImageRep *)imageRepresentation;
- (void)unlockFocus;

- (NSImageRep *)bestRepresentationForDevice:(NSDictionary *)deviceDescription;

- (void)setDelegate:(id)anObject;
- (id)delegate;

- (void)setFlipped:(BOOL)flag;
- (BOOL)isFlipped;

- (NSRect)alignmentRect;
- (void)setAlignmentRect:(NSRect)rect;

@end

@interface NSObject (NSImageDelegate)

- (NSImage *)imageDidNotDraw:(id)sender inRect:(NSRect)aRect;

- (void)image:(NSImage*)image willLoadRepresentation:(NSImageRep*)rep;
- (void)image:(NSImage*)image didLoadRepresentationHeader:(NSImageRep*)rep;
- (void)image:(NSImage*)image didLoadPartOfRepresentation:(NSImageRep*)rep withValidRows:(NSInteger)rows; 
- (void)image:(NSImage*)image didLoadRepresentation:(NSImageRep*)rep withStatus:(NSImageLoadStatus)status;

@end

@interface NSBundle(NSBundleImageExtension)

- (NSString *)pathForImageResource:(NSString *)name;

@end