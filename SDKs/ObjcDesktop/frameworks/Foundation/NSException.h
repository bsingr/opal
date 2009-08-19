// 
//  NSException.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-10.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <objc/objc-exception.h>
#import <Foundation/NSObject.h>

@class NSString, NSDictionary, NSArray;

extern NSString *NSGenericException;
extern NSString *NSRangeException;
extern NSString *NSInvalidArgumentException;
extern NSString *NSInternalInconsistencyException;

extern NSString *NSMallocException;

extern NSString *NSObjectInaccessibleException;
extern NSString *NSObjectNotAvailableException;
extern NSString *NSDestinationInvalidException;
  
extern NSString *NSPortTimeoutException;
extern NSString *NSInvalidSendPortException;
extern NSString *NSInvalidReceivePortException;
extern NSString *NSPortSendException;
extern NSString *NSPortReceiveException;

@interface NSException : NSObject
{
}

+ (NSException *)exceptionWithName:(NSString *)name reason:(NSString *)reason userInfo:(NSDictionary *)userInfo;
- (id)initWithName:(NSString *)aName reason:(NSString *)aReason userInfo:(NSDictionary *)aUserInfo;

- (NSString *)name;
- (NSString *)reason;
- (NSDictionary *)userInfo;

- (NSArray *)callStackReturnAddresses;

- (void)raise;

@end


@interface NSException (NSExceptionRaisingConveniences)

+ (void)raise:(NSString *)name format:(NSString *)format, ...;
+ (void)raise:(NSString *)name format:(NSString *)format arguments:(va_list)argList;

@end
