// 
//  NSKeyValueObserving.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSArray.h>
#import <Foundation/NSSet.h>

@class NSIndexSet, NSString;

enum {
    NSKeyValueObservingOptionOld        = 0x01,
    NSKeyValueObservingOptionNew        = 0x02,
    NSKeyValueObservingOptionInitial    = 0x04,
    NSKeyValueObservingOptionPrior      = 0x08
};
typedef NSInteger NSKeyValueObservingOptions;

enum {
    NSKeyValueChangeSetting             = 1,
    NSKeyValueChangeInsertion           = 2,
    NSKeyValueChangeRemoval             = 3,
    NSKeyValueChangeReplacement         = 4
};
typedef NSInteger NSKeyValueChange;

enum {
    NSKeyValueUnionSetMutation          = 1,
    NSKeyValueMinusSetMutation          = 2,
    NSKeyValueIntersectSetMutation      = 3,
    NSKeyValueSetSetMutation            = 4
};
typedef NSUInteger NSKeyValueSetMutationKind;

NSString *NSKeyValueChangeKindKey = @"NSKeyValueChangeKindKey";
NSString *NSKeyValueChangeNewKey = @"NSKeyValueChangeNewKey";
NSString *NSKeyValueChangeOldKey = @"NSKeyValueChangeOldKey";
NSString *NSKeyValueChangeIndexesKey = @"NSKeyValueChangeIndexesKey";
NSString *NSKeyValueChangeNotificationIsPriorKey = @"NSKeyValueChangeNotificationIsPriorKey";

// @implementation NSObject (NSKeyValueObserving)
// 
// - (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
// {
//     // TODO: Need to implement
// }
// 
// @end
// 
// @implementation NSObject (NSKeyValueObserverRegistration)
// 
// - (void)addObserver:(NSObject *)observer forKeyPath:(NSString *)keyPath options:(NSKeyValueObservingOptions)options context:(void *)context
// {
//     // TODO: Need to implement
// }
// 
// - (void)removeObserver:(NSObject *)observer forKeyPath:(NSString *)keyPath
// {
//     // TODO: Need to implement
// }
// 
// @end
// 
// @implementation NSArray (NSKeyValueObserverRegistration)
// 
// - (void)addObserver:(NSObject *)observer toObjectsAtIndexes:(NSIndexSet *)indexes forKeyPath:(NSString *)keyPath options:(NSKeyValueObservingOptions)options context:(void *)context
// {
//     // TODO: Need to implement
// }
// 
// - (void)removeObserver:(NSObject *)observer fromObjectsAtIndexes:(NSIndexSet *)indexes forKeyPath:(NSString *)keyPath
// {
//     // TODO: Need to implement
// }
// 
// - (void)addObserver:(NSObject *)observer forKeyPath:(NSString *)keyPath options:(NSKeyValueObservingOptions)options context:(void *)context
// {
//     // this should throw an error
// }
// 
// - (void)removeObserver:(NSObject *)observer forKeyPath:(NSString *)keyPath
// {
//     // this should throw an error
// }
// 
// @end
// 
// 
// @implementation NSSet (NSKeyValueObserverRegistration)
// 
// - (void)addObserver:(NSObject *)observer forKeyPath:(NSString *)keyPath options:(NSKeyValueObservingOptions)options context:(void *)context
// {
//     // TODO: Need to implement
// }
// 
// - (void)removeObserver:(NSObject *)observer forKeyPath:(NSString *)keyPath
// {
//     // TODO: Need to implement
// }
// 
// @end
// 
// 
// @interface NSObject(NSKeyValueObserverNotification)
// 
// - (void)willChangeValueForKey:(NSString *)key
// {
//     // TODO: Need to implement
// }
// 
// - (void)didChangeValueForKey:(NSString *)key
// {
//     // TODO: Need to implement
// }
// 
// - (void)willChange:(NSKeyValueChange)changeKind valuesAtIndexes:(NSIndexSet *)indexes forKey:(NSString *)key
// {
//     // TODO: Need to implement
// }
// 
// - (void)didChange:(NSKeyValueChange)changeKind valuesAtIndexes:(NSIndexSet *)indexes forKey:(NSString *)key
// {
//     // TODO: Need to implement
// }
// 
// - (void)willChangeValueForKey:(NSString *)key withSetMutation:(NSKeyValueSetMutationKind)mutationKind usingObjects:(NSSet *)objects
// {
//     // TODO: Need to implement
// }
// 
// - (void)didChangeValueForKey:(NSString *)key withSetMutation:(NSKeyValueSetMutationKind)mutationKind usingObjects:(NSSet *)objects
// {
//     // TODO: Need to implement
// }
// 
// @end
// 
// @implementation NSObject(NSKeyValueObservingCustomization)
// 
// + (NSSet *)keyPathsForValuesAffectingValueForKey:(NSString *)key
// {
//     // TODO: Need to implement
// }
// 
// + (BOOL)automaticallyNotifiesObserversForKey:(NSString *)key
// {
//     // TODO: Need to implement
// }
// 
// - (void)setObservationInfo:(void *)observationInfo
// {
//     // TODO: Need to implement
// }
// 
// - (void *)observationInfo
// {
//     // TODO: Need to implement
// }
// 
// @end