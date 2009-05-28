// 
//  NSFont.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSFont.h"


@implementation NSFont

- (NSFont *)initWithName:(NSString *)fontName size:(int)fontSize {
    [self init];
    if (self) {
        _name = fontName;
        _size = fontSize;
    }
    return self;
}

+ (NSFont *)fontWithName:(NSString *)fontName size:(int)fontSize {
    return [[NSFont alloc] initWithName:fontName size:fontSize];
}

+ (NSFont *)systemFontOfSize:(int)fontSize {
    return [NSFont fontWithName:@"Helvetica" size:fontSize];
}

+ (NSFont *)titleBarFontOfSize:(int)fontSize {
    return [NSFont fontWithName:@"Helvetica" size:fontSize];
}

- (void)set {
    id ctx = [[NSGraphicsContext currentContext] graphicsPort];
    ctx.font = _size + "px " + _name;
}

+ (int)systemFontSize {
    return 12;
}

+ (int)smallSystemFontSize {
    return 11;
}

@end

