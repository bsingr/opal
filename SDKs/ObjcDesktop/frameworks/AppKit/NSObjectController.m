// 
//  NSObjectController.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSObjectController.h"

@implementation NSObjectController

- (id)init
{
	[super init];
	return self;
}

- (void)setContent:(id)content
{
	_content = content;
}

- (id)content
{
	return _content;
}

- (void)setAutomaticallyPreparesContent:(BOOL)flag
{
	_automaticallyPreparesContent = flag;
}

- (BOOL)automaticallyPreparesContent
{
	return _automaticallyPreparesContent;
}

- (void)prepareContent
{
	
}

- (void)setObjectClass:(NSString *)objectClass
{
	_objectClass = objectClass;
}

- (NSString *)objectClass
{
	return _objectClass;
}

- (id)newObject
{
	Class theClass = eval (_objectClass);
	id theObject = [[theClass alloc] init];
	return theObject;
}

- (void)addObject:(id)object
{
}

- (void)removeObject:(id)object
{
}

- (void)add:(id)sender
{
}

- (BOOL)canAdd
{
}

- (void)remove:(id)sender
{
}

- (BOOL)canRemove
{
	return (_editable && [[self selectedObjects] count]);
}

- (void)setEditable:(BOOL)flag
{
	_editable = flag;
}

- (BOOL)isEditable
{
	return _editable;
}

- (NSArray *)selectedObjects
{
	return [NSArray arrayWithObject:_content];
}

- (id)selection
{
	return _selection;
}


@end

