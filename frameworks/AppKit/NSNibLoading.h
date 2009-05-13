// 
//  NSNibLoading.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSBundle.h>

@class NSString;
@class NSDictionary;

@interface NSBundle (NSNibLoading)

+ (BOOL)loadNibFile:(NSString *)fileName externalNameTable:(NSDictionary *)context;
+ (BOOL)loadNibNamed:(NSString *)nibName owner:(id)owner;
- (BOOL)loadNibFile:(NSString *)fileName externalNameTable:(NSDictionary *)context;

@end

@interface NSObject (NSNibAwaking)

- (void)awakeFromNib;

@end