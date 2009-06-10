// 
//  NSException.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-10.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSException.h"

@implementation NSException

+ (id)alloc
{
    return objc_exception_create();
}

+ (NSException *)exceptionWithName:(NSString *)name reason:(NSString *)reason userInfo:(NSDictionary *)userInfo
{
    return [[self alloc] initWithName:name reason:reason userInfo:userInfo];
}

- (id)initWithName:(NSString *)aName reason:(NSString *)aReason userInfo:(NSDictionary *)aUserInfo
{
    _name = aName;
    _reason = aReason;
    _userInfo = aUserInfo;
    return self;
}

- (NSString *)name
{
    return _name;
}

- (NSString *)reason
{
    return _reason;
}

- (NSDictionary *)userInfo
{
    return _userInfo;
}

- (void)raise
{
    objc_exception_throw(self);
}

@end


@implementation NSException (NSExceptionRaisingConveniences)

+ (void)raise:(NSString *)name format:(NSString *)format, ...
{
    
}

+ (void)raise:(NSString *)name format:(NSString *)format arguments:(va_list)argList
{
    
}

@end
