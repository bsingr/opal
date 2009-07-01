// 
//  NSButtonImageSource.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-11.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>
#import <AppKit/NSImage.h>
#import <AppKit/NSButton.h>

@interface NSButtonImageSource : NSObject
{
    NSImage             *_imageName;
    NSMutableDictionary *_images;
}

+ (id)buttonImageSourceWithName:(NSString*)name;
- (id)initWithCoder:(NSCoder*)aCoder;

- (NSImage *)normalImage;
- (NSImage *)alternateImage;

@end
