// 
//  NSNibLoading.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-06.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSNibLoading.h"

@implementation NSBundle (NSNibLoading)

+ (BOOL)loadNibFile:(NSString *)fileName externalNameTable:(NSDictionary *)context
{
  
}

+ (BOOL)loadNibNamed:(NSString *)nibName owner:(id)owner
{
  NSLog(@"loading nib...");
  
  NSBundle *theBundle = [NSBundle mainBundle];
  NSNib *theNib = [[NSNib alloc] initWithNibNamed:nibName bundle:theBundle];
  return [theNib instantiateNibWithOwner:owner topLevelObjects:[NSMutableArray array]];
}

- (BOOL)loadNibFile:(NSString *)fileName externalNameTable:(NSDictionary *)context
{
  
}

@end

@implementation NSCustomObject

@end
