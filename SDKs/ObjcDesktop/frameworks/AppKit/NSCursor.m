// 
//  NSCursor.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSCursor.h"


@implementation NSCursor

- (id)initWithCursorString:(NSString *)cursor {
  [self init];
  if (self) {
    _cursor = cursor;
  }
  return self;
}

- (void)set {
  // document.body.style.cursor = _cursor;
}

+ (NSCursor *)currentCursor {
  
}

+ (NSCursor *)arrowCursor {
  return [[NSCursor alloc] initWithCursorString:@"default"];
}

+ (NSCursor *)closedHandCursor {
  
}

+ (NSCursor *)crosshairCursor {
  
}

+ (NSCursor *)disappearingItemCursor {
  
}

+ (NSCursor *)IBeamCursor {
  return [[NSCursor alloc] initWithCursorString:@"text"];
}

+ (NSCursor *)openHandCursor {
  
}

+ (NSCursor *)pointingHandCursor {
  
}

+ (NSCursor *)resizeDownCursor {
  
}

+ (NSCursor *)resizeLeftCursor {
  
}

+ (NSCursor *)resizeLeftRightCursor {
  
}

+ (NSCursor *)resizeRightCursor {
  
}

+ (NSCursor *)resizeUpCursor {
  
}

+ (NSCursor *)resizeUpDownCursor {
  
}

@end
