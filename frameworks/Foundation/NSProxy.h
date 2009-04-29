#import <Foundation/NSObject.m>

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