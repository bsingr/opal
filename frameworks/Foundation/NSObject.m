@protocol NSObject

- (BOOL)isEqual:(id)object;
- (NSUInteger)hash;

- (Class)superclass;
- (Class)class;
- (id)self;

- (id)performSelector:(SEL)aSelector;
- (id)performSelector:(SEL)aSelector withObject:(id)object;
- (id)performSelector:(SEL)aSelector withObject:(id)object1 withObject:(id)object2;

- (BOOL)isProxy;

- (BOOL)isKindOfClass:(Class)aClass;
- (BOOL)isMemberOfClass:(Class)aClass;
- (BOOL)conformsToProtocol:(Protocol *)aProtocol;

- (BOOL)respondsToSelector:(SEL)aSelector;

- (id)retain;
- (void)release;
- (id)autorelease;
- (NSUInteger)retainCount;

- (NSString *)description;

@end

@protocol NSCoding

- (void)encodeWithCoder:(NSCoder *)aCoder;
- (id)initWithCoder:(NSCoder *)aDecoder;

@end

@implementation NSObject <NSObject> {
    Class isa;
}

+ (void)load;

+ (void)initialize;
- (id)init;

+ (id)new;
+ (id)alloc;
- (void)dealloc;

- (void)finalize;

- (id)copy;
- (id)mutableCopy;

+ (Class)superclass;
+ (Class)class;
+ (BOOL)instancesRespondToSelector:(SEL)aSelector;
+ (BOOL)conformsToProtocol:(Protocol *)protocol;
- (IMP)methodForSelector:(SEL)aSelector;
+ (IMP)instanceMethodForSelector:(SEL)aSelector;
- (void)doesNotRecognizeSelector:(SEL)aSelector;

- (void)forwardInvocation:(NSInvocation *)anInvocation;
- (NSMethodSignature *)methodSignatureForSelector:(SEL)aSelector;

+ (NSMethodSignature *)instanceMethodSignatureForSelector:(SEL)aSelector;

+ (NSString *)description;

+ (BOOL)isSubclassOfClass:(Class)aClass;

+ (BOOL)resolveClassMethod:(SEL)sel;
+ (BOOL)resolveInstanceMethod:(SEL)sel;

@end

@implementation NSObject