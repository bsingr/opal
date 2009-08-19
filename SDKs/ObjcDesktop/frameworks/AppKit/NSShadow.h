// 
//  NSShadow.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>
#import <Foundation/NSGeometry.h>

@class NSColor;


@interface NSShadow : NSObject <NSCopying, NSCoding>
{
  int      _shadowBlurRadius;
  NSColor   *_shadowColor;
  NSSize    *_shadowOffset;
}

- (id)init;

- (NSSize)shadowOffset;
- (void)setShadowOffset:(NSSize)offset;

- (CGFloat)shadowBlurRadius;
- (void)setShadowBlurRadius:(CGFloat)val;

- (NSColor *)shadowColor;
- (void)setShadowColor:(NSColor *)color;

- (void)set;

@end
