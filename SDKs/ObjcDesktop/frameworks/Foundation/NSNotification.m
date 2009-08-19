// 
//  NSNotification.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSNotification.h"

@implementation NSNotification

- (NSString *)name
{
  
}

- (id)object
{
  
}

- (NSDictionary *)userInfo
{
  
}

@end


@implementation NSNotification (NSNotificationCreation)

+ (id)notificationWithName:(NSString *)aName object:(id)anObject
{
  
}

+ (id)notificationWithName:(NSString *)aName object:(id)anObject userInfo:(NSDictionary *)aUserInfo
{
  
}

@end

id NSNotificationCenterDefault = nil;

@implementation NSNotificationCenter

+ (id)defaultCenter
{
  
}
  
- (void)addObserver:(id)observer selector:(SEL)aSelector name:(NSString *)aName object:(id)anObject
{
  
}

- (void)postNotification:(NSNotification *)notification
{
  
}

- (void)postNotificationName:(NSString *)aName object:(id)anObject
{
  
}

- (void)postNotificationName:(NSString *)aName object:(id)anObject userInfo:(NSDictionary *)aUserInfo
{
  
}

- (void)removeObserver:(id)observer
{
  
}

- (void)removeObserver:(id)observer name:(NSString *)aName object:(id)anObject
{
  
}

@end
