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
    
}

- (void)dealloc
{
    
}

- (void)finalize
{
    
}

- (id)copy
{
    
}

- (id)mutableCopy
{
    
}

+ (Class)superclass
{
    
}

+ (Class)class
{
    
}

+ (BOOL)instancesRespondToSelector:(SEL)aSelector
{
    
}

+ (BOOL)conformsToProtocol:(Protocol *)protocol
{
    
}

- (IMP)methodForSelector:(SEL)aSelector
{
    
}

+ (IMP)instanceMethodForSelector:(SEL)aSelector
{
    
}

- (void)doesNotRecognizeSelector:(SEL)aSelector
{
    
}

- (void)forwardInvocation:(NSInvocation *)anInvocation
{
    
}

- (NSMethodSignature *)methodSignatureForSelector:(SEL)aSelector
{
    
}

+ (NSMethodSignature *)instanceMethodSignatureForSelector:(SEL)aSelector
{
    
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
    
}

- (id)performSelector:(SEL)aSelector withObject:(id)object
{
    
}

- (id)performSelector:(SEL)aSelector withObject:(id)object1 withObject:(id)object2
{
    
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
    
}

- (BOOL)respondsToSelector:(SEL)aSelector
{
    
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
    return @"NSObject class description"
}

@end