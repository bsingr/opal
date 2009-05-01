#import <AppKit/NSController.h>
#import <AppKit/NSMenu.h>

@class NSArray, NSPredicate, NSError;

@interface NSObjectController : NSController
{
}

- (id)initWithContent:(id)content;

- (void)setContent:(id)content;
- (id)content;

- (id)selection;
- (NSArray *)selectedObjects;

- (void)setAutomaticallyPreparesContent:(BOOL)flag;
- (BOOL)automaticallyPreparesContent;
- (void)prepareContent;

- (void)setObjectClass:(Class)objectClass;
- (Class)objectClass;
- (id)newObject;
- (void)addObject:(id)object;
- (void)removeObject:(id)object;

- (void)setEditable:(BOOL)flag; 
- (BOOL)isEditable;
- (void)add:(id)sender;
- (BOOL)canAdd;
- (void)remove:(id)sender;
- (BOOL)canRemove;

@end