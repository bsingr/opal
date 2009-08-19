// 
//  NSPropertyList.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>
#import <CoreFoundation/CFPropertyList.h>

@class NSData, NSString;

enum {
  NSPropertyListImmutable           = kCFPropertyListImmutable,
  NSPropertyListMutableContainers       = kCFPropertyListMutableContainers,
  NSPropertyListMutableContainersAndLeaves  = kCFPropertyListMutableContainersAndLeaves
};
typedef NSUInteger NSPropertyListMutabilityOptions;

enum {
  NSPropertyListOpenStepFormat    = kCFPropertyListOpenStepFormat,
  NSPropertyListXMLFormat_v1_0    = kCFPropertyListXMLFormat_v1_0,
  NSPropertyListBinaryFormat_v1_0   = kCFPropertyListBinaryFormat_v1_0,
  NSPropertyListJSONFormat_v1_0     = kCFPropertyListJSONFormat_v1_0
};
typedef NSUInteger NSPropertyListFormat;

@interface NSPropertyListSerialization : NSObject
{
}

+ (BOOL)propertyList:(id)plist isValidForFormat:(NSPropertyListFormat)format;
+ (NSData *)dataFromPropertyList:(id)plist format:(NSPropertyListFormat)format errorDescription:(NSString **)errorString;
+ (id)propertyListFromData:(NSData *)data mutabilityOption:(NSPropertyListMutabilityOptions)opt format:(NSPropertyListFormat *)format errorDescription:(NSString **)errorString;

@end
