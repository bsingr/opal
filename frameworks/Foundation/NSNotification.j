#import <Foudation/NSObject.j>
#import <Foundation/NSArray.j>
#import <Foundation/NSDictionary.j>

@class NSString;

// NSNotification default center

@implementation	NSNotification : NSObject
{
    NSString        *_name;
    id               _object;
    NSDictionary    *_userInfo;
}

- (id)initWithName:(NSString *)aName object:(id)anObject userInfo:(NSDictionary *)userInfo
{
    self = [self init];
    if (self) {
        _name = aName;
        _object = anObject;
        _userInfo = userInfo;
    }
    return self;
}

- (NSString *)name
{
    return _name;
}

- (id)object
{
    return _object;
}

- (NSDictionary *)userInfo
{
    return _userInfo;
}

+ (id)notificationWithName:(NSString *)aName object:(id)anObject;
+ (id)notificationWithName:(NSString *)aName object:(id)anObject userInfo:(NSDictionary *)userInfo;

@end

/* Notification Center */

@implementation NSNotificationCenter : NSObject
{
	NSMutableArray *_dispatchTable;
}

- (id)init;

- (void)addObserver:(id)notificationObserver selector:(SEL)notificationSelector name:(NSString *)notificationName object:(id)notificationSender;
- (void)removeObserver:(id)notificationObserver;
- (void)removeObserver:(id)notificationObserver name:(NSString *)notificationName object:(id)notificationSender;

- (void)postNotification:(NSNotification *)notification;
- (void)postNotificationName:(NSString *)notificationName object:(id)notificationSender;
- (void)postNotificationName:(NSString *)notificationName object:(id)notificationSender userInfo:(NSDictionary *)userInfo;

+ (id)defaultCenter;

@end

/* NSNotificationCenterDispatchElement */

@implementation NSNotificationCenterDispatchElement : NSObject
{
	id _observer;
	SEL _selector;
	NSString *_name;
	id _sender;
	
	BOOL _working;
}

- (id)initWithObserver:(id)notificationObserver selector:(SEL)notificationSelector name:(NSString *)notificationName object:(id)notificationSender;

@end

NSNotificationCenter *NSNotificationDefaultCenter = nil;
