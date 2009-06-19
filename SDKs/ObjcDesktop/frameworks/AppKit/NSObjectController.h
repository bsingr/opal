// 
//  NSObjectController.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <AppKit/NSController.h>
#import <AppKit/NSMenu.h>

@class NSArray, NSPredicate, NSError;

@interface NSObjectController : NSController
{
    NSString       *_objectClass;
	id              _content;
	id              _selection;
	BOOL            _editable;
	BOOL            _automaticallyPreparesContent;
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