// 
//  NSObject.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSObject.h"

@implementation NSObject

+ (void)load
{
}

+ (void)initialize
{   
}

- (id)init
{
    return self;
}

+ (id)new
{
    return [[self alloc] init];
}

+ (id)alloc
{
    return class_createInstance(self);
}

- (void)dealloc
{
    // Set self = NULL; ??   
}

- (void)finalize
{   
}

- (id)copy
{
    return self;
}

- (id)mutableCopy
{
    return [self copy];
}

+ (Class)superclass
{
    // return super_class;
}

+ (Class)class
{
    return isa;
}

+ (BOOL)instancesRespondToSelector:(SEL)aSelector
{
    return class_respondToSelector(self, aSelector);
}

+ (BOOL)conformsToProtocol:(Protocol *)protocol
{
    return class_conformsToProtocol(self, protocol);
}

- (IMP)methodForSelector:(SEL)aSelector
{
    return class_getMethodImplementation(self, aSelector);
}

+ (IMP)instanceMethodForSelector:(SEL)aSelector
{
    return class_getInstanceMethod(self, aSelector);
}

- (void)doesNotRecognizeSelector:(SEL)aSelector
{
    // Raise an NSException
}

- (void)forwardInvocation:(NSInvocation *)anInvocation
{
    // Should call [self doesNotRecognizeSelector] with selector from anInvocation
}

- (NSMethodSignature *)methodSignatureForSelector:(SEL)aSelector
{
    // Should return readble signature for selector
}

+ (NSMethodSignature *)instanceMethodSignatureForSelector:(SEL)aSelector
{
    // Should return readable sig for selector
}

+ (BOOL)isSubclassOfClass:(Class)aClass
{
    
}


+ (BOOL)resolveClassMethod:(SEL)sel
{
    
}

+ (BOOL)resolveInstanceMethod:(SEL)sel
{
    
}

- (BOOL)isEqual:(id)object
{
    
}

- (NSUInteger)hash
{
    
}

- (id)self
{
    return self;
}

- (id)performSelector:(SEL)aSelector
{
    return objc_msgSend(self, aSelector);
}

- (id)performSelector:(SEL)aSelector withObject:(id)object
{
    return objc_msgSend(self, aSelector, object);
}

- (id)performSelector:(SEL)aSelector withObject:(id)object1 withObject:(id)object2
{
    return objc_msgSend(self, aSelector, object1, object2);
}

- (BOOL)isProxy
{
    return NO;
}

- (BOOL)isKindOfClass:(Class)aClass
{
    
}

- (BOOL)isMemberOfClass:(Class)aClass
{
    
}

- (BOOL)conformsToProtocol:(Protocol *)aProtocol
{
    return class_conformsToProtocol(self, aProtocol);
}

- (BOOL)respondsToSelector:(SEL)aSelector
{
    return class_respondsToSelector(self.isa, aSelector);
}

- (id)retain
{
    return self;
}

- (void)release
{
    return self;
}

- (id)autorelease
{
    return self;
}

- (NSUInteger)retainCount
{
    return 1;
}

- (NSString *)description
{
    return @"NSObject class description";
}

@end

@implementation NSObject (NSCoderExtended)

- (id)initWithCoder:(NSCoder *)aCoder
{
	return self;
}

@end
