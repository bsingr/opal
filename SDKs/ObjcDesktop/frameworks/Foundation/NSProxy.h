// 
//  NSProxy.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>

@interface NSProxy <NSObject>
{
  Class isa;
}

+ (id)alloc;
+ (Class)class;
- (void)forwardInvocation:(NSInvocation *)invocation;
- (NSMethodSignature *)methodSignatureForSelector:(SEL)sel;
- (void)dealloc;
- (void)finalize;
- (NSString *)description;
+ (BOOL)respondsToSelector:(SEL)aSelector;

@end